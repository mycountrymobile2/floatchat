"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { format, addMinutes, startOfDay, isWeekend, isBefore } from "date-fns"
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Clock,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe,
  User as UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

/* -------- Schema -------- */
const detailsSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid work email required"),
  countryCode: z.string(),
  phone: z.string().min(6, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  team_size: z.string(),
  interest: z.string(),
  notes: z.string().optional(),
})
type DetailsForm = z.infer<typeof detailsSchema>

/* -------- Timezones + slots -------- */
type Tz = "ET" | "PT" | "IST" | "GMT"
const timezones: { value: Tz; label: string; sublabel: string }[] = [
  { value: "ET", label: "US Eastern", sublabel: "New York · GMT−5" },
  { value: "PT", label: "US Pacific", sublabel: "San Francisco · GMT−8" },
  { value: "IST", label: "India IST", sublabel: "Mumbai · GMT+5:30" },
  { value: "GMT", label: "UK / GMT", sublabel: "London · GMT" },
]

function makeSlots(tz: Tz) {
  // 30-min slots, 9am–5:30pm local. India runs until 6:30pm to cover both audiences.
  const last = tz === "IST" ? 18.5 : 17.5
  const slots: string[] = []
  for (let t = 9; t <= last; t += 0.5) {
    const h = Math.floor(t)
    const m = t % 1 === 0 ? "00" : "30"
    const ampm = h < 12 ? "AM" : "PM"
    const h12 = h === 12 ? 12 : h % 12
    slots.push(`${h12}:${m} ${ampm}`)
  }
  return slots
}

/** UTC offsets for the four timezones — used to make a slot's absolute-instant key. */
const TZ_OFFSET: Record<Tz, number> = { ET: -5, PT: -8, IST: 5.5, GMT: 0 }

/** Canonical absolute-instant key for a slot — must match api/book-demo.ts. */
function slotKey(dateStr: string, timeStr: string, tz: Tz): string | null {
  const dm = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const tm = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!dm || !tm) return null
  let hour = parseInt(tm[1], 10) % 12
  if (/PM/i.test(tm[3])) hour += 12
  const utcMs = Date.UTC(+dm[1], +dm[2] - 1, +dm[3], hour, parseInt(tm[2], 10)) - TZ_OFFSET[tz] * 3600000
  return new Date(utcMs).toISOString()
}

/* -------- Country codes -------- */
const countryCodes = [
  { code: "+1",  flag: "🇺🇸", country: "US" },
  { code: "+1",  flag: "🇨🇦", country: "CA" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+61", flag: "🇦🇺", country: "AU" },
  { code: "+91", flag: "🇮🇳", country: "IN" },
  { code: "+49", flag: "🇩🇪", country: "DE" },
  { code: "+33", flag: "🇫🇷", country: "FR" },
  { code: "+65", flag: "🇸🇬", country: "SG" },
  { code: "+81", flag: "🇯🇵", country: "JP" },
  { code: "+971",flag: "🇦🇪", country: "AE" },
]

const teamSizes = ["Just me", "2–10", "11–50", "51–200", "201–1000", "1000+"]
const roles = ["Founder / CEO", "Head of Support / CX", "Support Manager", "Engineer", "Operations", "Other"]
const interests = [
  "AI Agent walkthrough",
  "Live Chat + Inbox setup",
  "Voice / IVR setup",
  "WhatsApp Business",
  "Automation & macros",
  "Migration from current tool",
  "Pricing & contract",
]

/* -------- Component -------- */
type Step = 0 | 1 | 2 | 3
const steps = ["Pick a date", "Your details", "Pick a time", "Confirmed"] as const

export default function DemoPage() {
  useEffect(() => {
    document.title = "Book a Demo — FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Schedule a 30-minute demo with the FloatChat team. Pick a date, time, and tell us what you'd like to see.")
  }, [])

  const [step, setStep] = useState<Step>(0)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | null>(null)
  const [tz, setTz] = useState<Tz>("ET")
  const [tzOpen, setTzOpen] = useState(false)
  const [booked, setBooked] = useState<Set<string>>(new Set())

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      countryCode: "+1",
      team_size: "2–10",
      role: "Head of Support / CX",
      interest: interests[0],
    },
  })

  const details = watch()

  const slots = useMemo(() => makeSlots(tz), [tz])

  /* Already-booked slots — refreshed on each step so the time grid stays current. */
  useEffect(() => {
    let cancelled = false
    fetch("/api/slots")
      .then((r) => (r.ok ? r.json() : { booked: [] }))
      .then((d) => {
        if (!cancelled) setBooked(new Set<string>(Array.isArray(d.booked) ? d.booked : []))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [step])

  /* Disable past dates and weekends */
  function isDateDisabled(d: Date) {
    const today = startOfDay(new Date())
    if (isBefore(d, today)) return true
    if (isWeekend(d)) return true
    const max = addMinutes(today, 60 * 24 * 60) // ~60 days out
    if (isBefore(max, d)) return true
    return false
  }

  function goNext() {
    if (step === 0 && !date) return toast.error("Pick a date first.")
    setStep((s) => Math.min(3, s + 1) as Step)
  }
  function goBack() {
    setStep((s) => Math.max(0, s - 1) as Step)
  }

  function onSubmitDetails() {
    setStep(2)
  }

  async function confirmBooking() {
    if (!time) return toast.error("Pick a time slot.")
    try {
      const res = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: `${details.countryCode} ${details.phone}`,
          company: details.company,
          role: details.role,
          team_size: details.team_size,
          interest: details.interest,
          notes: details.notes || "",
          booking_date: date ? format(date, "yyyy-MM-dd") : "",
          booking_time: time,
          timezone: tz,
        }),
      })
      if (res.status === 409) {
        const d = await res.json().catch(() => ({}))
        toast.error(d.error || "That time slot was just booked. Please pick another.")
        setTime(null)
        const s = await fetch("/api/slots")
          .then((r) => (r.ok ? r.json() : { booked: [] }))
          .catch(() => ({ booked: [] }))
        setBooked(new Set<string>(Array.isArray(s.booked) ? s.booked : []))
        return
      }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.error || "Booking failed")
      }
      setStep(3)
    } catch {
      toast.error("Couldn't confirm the booking. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-10 lg:py-16">
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3B82F6] mb-2">Book a demo</p>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              See FloatChat live <span className="text-[#3B82F6]">in 30 minutes.</span>
            </h1>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Walkthrough tailored to your stack. Real product, real numbers — no slideware.
            </p>
          </div>

          {/* Progress */}
          <ol className="mx-auto flex items-center justify-center gap-2 sm:gap-4 mb-8 max-w-2xl">
            {steps.map((label, i) => {
              const active = step === i
              const done = step > i
              return (
                <li key={label} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center ring-1 transition-colors",
                        active
                          ? "bg-[#3B82F6] text-white ring-[#3B82F6]"
                          : done
                          ? "bg-emerald-500 text-white ring-emerald-500"
                          : "bg-white text-slate-400 ring-slate-200"
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className={cn("text-[12px] sm:text-sm font-medium hidden sm:inline", active ? "text-slate-900" : done ? "text-emerald-700" : "text-slate-400")}>
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && <span className="h-px w-6 sm:w-12 bg-slate-200" />}
                </li>
              )
            })}
          </ol>

          {/* Step card */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 lg:p-8"
                >
                  <header className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Pick a date</h2>
                      <p className="text-sm text-slate-500">Mon–Fri · next 60 days · weekends greyed out</p>
                    </div>
                  </header>

                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="rounded-xl ring-1 ring-slate-200 p-3 lg:p-4 bg-white">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isDateDisabled}
                        numberOfMonths={2}
                        className="mx-auto"
                      />
                    </div>
                    <aside className="flex-1 rounded-xl bg-slate-50 ring-1 ring-slate-200 p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Selected</p>
                      {date ? (
                        <p className="text-lg font-semibold text-slate-900">{format(date, "EEEE, MMMM d, yyyy")}</p>
                      ) : (
                        <p className="text-base text-slate-500">No date picked yet — choose a weekday from the calendar.</p>
                      )}
                      <ul className="mt-6 space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> 30-minute Zoom walkthrough</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Live product · not a deck</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Real pricing for your team size</li>
                        <li className="flex items-start gap-2"><Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" /> Q&A specific to your stack</li>
                      </ul>
                    </aside>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button onClick={goNext} disabled={!date} size="lg" className="gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB]">
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.form
                  key="step1"
                  onSubmit={handleSubmit(onSubmitDetails)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 lg:p-8"
                >
                  <header className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <UserIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Your details</h2>
                      <p className="text-sm text-slate-500">
                        Booking for <span className="font-medium text-slate-700">{date && format(date, "EEE, MMM d")}</span> — we'll pick a time next.
                      </p>
                    </div>
                  </header>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" error={errors.name?.message}>
                      <Input placeholder="Sarah Khan" {...register("name")} />
                    </Field>
                    <Field label="Work email" error={errors.email?.message}>
                      <Input type="email" placeholder="sarah@acme.com" {...register("email")} />
                    </Field>

                    <Field label="Phone" error={errors.phone?.message}>
                      <div className="flex gap-2">
                        <select
                          {...register("countryCode")}
                          className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
                        >
                          {countryCodes.map((c) => (
                            <option key={`${c.country}-${c.code}`} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        <Input className="flex-1" type="tel" placeholder="555 123 4567" {...register("phone")} />
                      </div>
                    </Field>

                    <Field label="Company" error={errors.company?.message}>
                      <Input placeholder="Acme Co." {...register("company")} />
                    </Field>

                    <Field label="Your role" error={errors.role?.message}>
                      <select
                        {...register("role")}
                        className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
                      >
                        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </Field>

                    <Field label="Team size">
                      <select
                        {...register("team_size")}
                        className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
                      >
                        {teamSizes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>

                    <Field label="What would you like to see?" className="sm:col-span-2">
                      <select
                        {...register("interest")}
                        className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
                      >
                        {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </Field>

                    <Field label="Anything else? (optional)" className="sm:col-span-2">
                      <Textarea rows={3} placeholder="Current tool, must-have integrations, deadlines…" {...register("notes")} />
                    </Field>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button type="button" variant="ghost" onClick={goBack} className="gap-1.5 text-slate-600">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" size="lg" className="gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB]">
                      Continue <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 lg:p-8"
                >
                  <header className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Pick a time</h2>
                        <p className="text-sm text-slate-500">
                          {date && format(date, "EEEE, MMMM d")} · 30-minute slots
                        </p>
                      </div>
                    </div>

                    {/* Timezone selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setTzOpen((o) => !o)}
                        className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-slate-200 bg-white text-sm font-medium hover:bg-slate-50"
                      >
                        <Globe className="h-4 w-4 text-[#3B82F6]" />
                        <span>{timezones.find((t) => t.value === tz)?.label}</span>
                        <span className="text-xs text-slate-500">{timezones.find((t) => t.value === tz)?.sublabel}</span>
                        <ChevronDown className={cn("h-3.5 w-3.5 text-slate-500 transition-transform", tzOpen && "rotate-180")} />
                      </button>
                      {tzOpen && (
                        <div className="absolute right-0 mt-1.5 w-64 rounded-lg ring-1 ring-slate-200 bg-white shadow-lg z-10 overflow-hidden">
                          {timezones.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() => { setTz(t.value); setTzOpen(false); setTime(null) }}
                              className={cn(
                                "w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between text-sm",
                                tz === t.value && "bg-[#3B82F6]/5 text-[#3B82F6] font-medium"
                              )}
                            >
                              <div>
                                <p className="font-medium">{t.label}</p>
                                <p className="text-[11px] text-slate-500">{t.sublabel}</p>
                              </div>
                              {tz === t.value && <Check className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </header>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {slots.map((s) => {
                      const sel = time === s
                      const key = date ? slotKey(format(date, "yyyy-MM-dd"), s, tz) : null
                      const taken = !!key && booked.has(key)
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => !taken && setTime(s)}
                          disabled={taken}
                          aria-label={taken ? `${s} — already booked` : s}
                          className={cn(
                            "h-11 rounded-lg text-sm font-medium transition-all ring-1 flex flex-col items-center justify-center leading-none",
                            taken
                              ? "bg-slate-100 text-slate-400 ring-slate-200 cursor-not-allowed"
                              : sel
                                ? "bg-[#3B82F6] text-white ring-[#3B82F6] shadow-sm"
                                : "bg-white text-slate-700 ring-slate-200 hover:ring-[#3B82F6]/40 hover:bg-[#3B82F6]/5"
                          )}
                        >
                          {taken ? (
                            <>
                              <span className="text-[12px] line-through">{s}</span>
                              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide">Booked</span>
                            </>
                          ) : (
                            s
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <p className="mt-5 text-xs text-slate-500 inline-flex items-center gap-1.5">
                    <Globe className="h-3 w-3" /> All times shown in {timezones.find((t) => t.value === tz)?.label} ({timezones.find((t) => t.value === tz)?.sublabel}). Crossed-out times are already booked.
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <Button type="button" variant="ghost" onClick={goBack} className="gap-1.5 text-slate-600">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <Button onClick={confirmBooking} disabled={!time} size="lg" className="gap-1.5 bg-[#3B82F6] hover:bg-[#2563EB]">
                      Confirm booking <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 lg:p-12 text-center"
                >
                  <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">You're booked!</h2>
                  <p className="mt-2 text-slate-600">
                    A calendar invite is on its way to <span className="font-semibold text-slate-900">{details.email}</span>.
                  </p>

                  <div className="mt-6 mx-auto max-w-md rounded-xl bg-slate-50 ring-1 ring-slate-200 p-5 text-left">
                    <SummaryRow icon={<CalendarIcon className="h-3.5 w-3.5" />} label="Date" value={date ? format(date, "EEEE, MMMM d, yyyy") : ""} />
                    <SummaryRow icon={<Clock className="h-3.5 w-3.5" />} label="Time" value={`${time} ${timezones.find((t) => t.value === tz)?.label}`} />
                    <SummaryRow icon={<UserIcon className="h-3.5 w-3.5" />} label="Host" value="FloatChat Solutions team" />
                    <SummaryRow icon={<Globe className="h-3.5 w-3.5" />} label="Where" value="Zoom (link in invite)" />
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                    <Button asChild variant="outline" size="sm">
                      <a href="#" className="gap-1.5"><CalendarIcon className="h-4 w-4" /> Add to Google Calendar</a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href="#" className="gap-1.5"><CalendarIcon className="h-4 w-4" /> Download .ics</a>
                    </Button>
                  </div>

                  <p className="mt-8 text-sm text-slate-500">
                    Need to reschedule? <Link to="/contact" className="text-[#3B82F6] hover:underline">Get in touch.</Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function Field({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="text-xs font-medium text-slate-700 mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
    </div>
  )
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 first:pt-0 last:pb-0 border-b border-slate-200 last:border-0">
      <div className="h-7 w-7 rounded-md bg-white ring-1 ring-slate-200 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">{label}</p>
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  )
}
