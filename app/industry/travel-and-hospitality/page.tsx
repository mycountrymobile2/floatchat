"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plane,
  Hotel,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Globe,
  Languages,
  Clock,
  CalendarClock,
  CalendarCheck,
  MapPin,
  BellRing,
  Megaphone,
  Ticket,
  Users,
  Workflow,
  ShieldCheck,
  Compass,
  Palmtree,
  Star,
  GitBranch,
} from "lucide-react"
import { SiWhatsapp, SiGmail } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

/* ─────────────────────────────────────────────────────────────
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Agentic AI for Travel & Hospitality | FloatChat",
  description:
    "Handle bookings, itinerary updates, and 24/7 multilingual support for travel and hospitality with agentic AI and omnichannel broadcasting.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow — matches the rest of the site
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-slate-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO MOCKUP — a travel booking agent thread that cycles through:
   an itinerary/booking card (flight + hotel with dates) → a booking
   confirmation message → a multilingual toggle showing the SAME
   reply in two languages. Agentic AI handling bookings + 24/7
   multilingual support.
─────────────────────────────────────────────────────────────── */

type TripPhase = "request" | "building" | "itinerary" | "confirmed" | "multilingual"

function TravelBookingMockup() {
  const [phase, setPhase] = useState<TripPhase>("request")
  const [lang, setLang] = useState<"EN" | "ES">("EN")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("request")
        await wait(1500)
        if (cancelled) return
        setPhase("building")
        await wait(1700)
        if (cancelled) return
        setPhase("itinerary")
        await wait(2600)
        if (cancelled) return
        setPhase("confirmed")
        await wait(2400)
        if (cancelled) return
        setLang("EN")
        setPhase("multilingual")
        await wait(1900)
        if (cancelled) return
        setLang("ES")
        await wait(2200)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showBuilding = phase === "building"
  const showItinerary =
    phase === "itinerary" || phase === "confirmed" || phase === "multilingual"
  const showConfirmed = phase === "confirmed" || phase === "multilingual"
  const showMultilingual = phase === "multilingual"

  const reply =
    lang === "EN"
      ? "You're all set, Amara! Flight LX318 and 3 nights at Hotel Rivage are confirmed. I'll text you a reminder the day before."
      : "¡Todo listo, Amara! El vuelo LX318 y 3 noches en Hotel Rivage están confirmados. Te enviaré un recordatorio el día anterior."

  return (
    <div className="relative">
      {/* Glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.4), transparent 70%)",
        }}
      />

      {/* Floating booking chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Booked in the chat
        </span>
      </motion.div>

      {/* Floating language chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Languages className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          100+ languages · 24/7
        </span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · travel desk
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* Traveler header */}
        <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/80?img=32"
                alt="Traveler"
                loading="lazy"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#25D366] ring-1 ring-white flex items-center justify-center">
                <SiWhatsapp style={{ color: "#fff", width: 7, height: 7 }} />
              </span>
            </div>
            <div>
              <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                Amara Diallo
              </p>
              <p className="text-[9px] text-slate-500">
                WhatsApp · Zürich → Lisbon
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <Sparkles className="h-2.5 w-2.5" /> Booking agent
          </span>
        </div>

        {/* Conversation */}
        <div className="px-4 py-3 space-y-2.5 bg-slate-50/40 min-h-[420px]">
          {/* Traveler request */}
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
              <p className="text-[11px] text-[#0F2A4A] leading-snug">
                Need a flight to Lisbon on Jun 14 and a hotel near the old town
                for 3 nights.
              </p>
              <p className="text-[8px] text-slate-400 mt-0.5">08:41</p>
            </div>
          </div>

          {/* Building indicator */}
          <AnimatePresence>
            {showBuilding && (
              <motion.div
                key="building"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-1.5"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[8.5px] text-slate-500">
                    Checking flight availability + hotels…
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Itinerary / booking card — flight + hotel with dates */}
          <AnimatePresence>
            {showItinerary && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="ml-6"
              >
                <div className="rounded-xl border border-[#3B82F6]/25 bg-white overflow-hidden shadow-[0_12px_28px_-14px_rgba(15,42,74,0.25)]">
                  <div className="flex items-center gap-1.5 bg-[#EAF2FF] px-3 py-1.5 border-b border-[#3B82F6]/15">
                    <Compass className="h-3 w-3 text-[#1D4ED8]" />
                    <span className="text-[9.5px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                      Proposed itinerary
                    </span>
                    <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                      Ref TR-4471
                    </span>
                  </div>

                  {/* Flight leg */}
                  <div className="flex items-center gap-2.5 px-3 py-2 border-b border-slate-100">
                    <div className="h-7 w-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                      <Plane className="h-3.5 w-3.5 text-[#1D4ED8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[#0F2A4A]">
                          ZRH
                        </span>
                        <ArrowRight className="h-3 w-3 text-slate-400" />
                        <span className="text-[11px] font-semibold text-[#0F2A4A]">
                          LIS
                        </span>
                        <span className="text-[9px] text-slate-500">· LX318</span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        Sat, Jun 14 · 09:35 – 11:20 · direct
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#0F2A4A]">
                      €212
                    </span>
                  </div>

                  {/* Hotel leg */}
                  <div className="flex items-center gap-2.5 px-3 py-2">
                    <div className="h-7 w-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                      <Hotel className="h-3.5 w-3.5 text-[#1D4ED8]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[#0F2A4A] truncate">
                          Hotel Rivage
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[8.5px] text-slate-600">
                          <Star className="h-2.5 w-2.5 fill-slate-500 text-slate-500" />
                          4.6
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        Jun 14 – 17 · 3 nights · Alfama, old town
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#0F2A4A]">
                      €327
                    </span>
                  </div>

                  {/* Confirm bar */}
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50/70 border-t border-slate-100">
                    <span className="text-[9px] text-slate-500">Total</span>
                    <span className="text-[11px] font-semibold text-[#0F2A4A]">
                      €539
                    </span>
                    <AnimatePresence mode="wait">
                      {showConfirmed ? (
                        <motion.span
                          key="done"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="ml-auto inline-flex items-center gap-1 rounded-md bg-emerald-500 px-2 py-1 text-[9.5px] font-semibold text-white"
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          Confirmed
                        </motion.span>
                      ) : (
                        <motion.span
                          key="cta"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="ml-auto inline-flex items-center gap-1 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] px-2 py-1 text-[9.5px] font-semibold text-white"
                        >
                          Book now
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Booking confirmation message + multilingual toggle */}
          <AnimatePresence>
            {showConfirmed && (
              <motion.div
                key="confirm-msg"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="flex items-start gap-1.5"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="max-w-[86%] space-y-1.5">
                  {/* Language toggle — same reply in 2 languages */}
                  <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm">
                    {(["EN", "ES"] as const).map((l) => (
                      <span
                        key={l}
                        className={`rounded-full px-2 py-0.5 text-[8.5px] font-semibold transition-colors ${
                          lang === l
                            ? "bg-[#3B82F6] text-white"
                            : "text-slate-500"
                        }`}
                      >
                        {l === "EN" ? "English" : "Español"}
                      </span>
                    ))}
                  </div>
                  <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 shadow-sm">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={lang}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="text-[11px] text-white leading-snug"
                      >
                        {reply}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  {showMultilingual && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 pl-0.5"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      <span className="text-[9px] font-medium text-emerald-600">
                        Reminder scheduled · Jun 13 · same language
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
          <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
            <span className="text-[10px] text-slate-400">
              Agent on · books, updates, reminds…
            </span>
          </div>
          <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function BookingsVisual() {
  const steps = [
    { label: "Check availability · Jun 14", done: true },
    { label: "Hold seat + room", done: true },
    { label: "Confirm & send voucher", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <CalendarCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Book inside the chat
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">no forms</span>
      </div>
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
              s.done
                ? "bg-emerald-500 text-white"
                : s.current
                ? "bg-[#3B82F6] text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {s.done ? (
              <Check className="h-2 w-2" strokeWidth={3} />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </span>
          <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
          {s.current && (
            <span className="ml-auto text-[8.5px] font-medium text-[#1D4ED8]">
              running
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ItineraryVisual() {
  const events = [
    { Icon: Plane, label: "Flight LX318 · gate B12", meta: "on time" },
    { Icon: Hotel, label: "Hotel Rivage · check-in 15:00", meta: "confirmed" },
    { Icon: MapPin, label: "Old-town walking tour", meta: "Jun 15 · 10:00" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Live itinerary
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <BellRing className="h-2.5 w-2.5" /> reminders on
        </span>
      </div>
      {events.map((e) => (
        <div
          key={e.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <e.Icon className="h-3 w-3 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
            {e.label}
          </span>
          <span className="text-[8.5px] text-slate-500 shrink-0">{e.meta}</span>
        </div>
      ))}
    </div>
  )
}

function MultilingualVisual() {
  const langs = [
    { code: "EN", text: "Your check-in is confirmed." },
    { code: "ES", text: "Tu registro está confirmado." },
    { code: "FR", text: "Votre enregistrement est confirmé." },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One agent · every language
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Clock className="h-2.5 w-2.5" /> 24/7
        </span>
      </div>
      {langs.map((l) => (
        <div
          key={l.code}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-5 w-6 rounded bg-[#0F2A4A] text-white text-[8px] font-bold flex items-center justify-center shrink-0">
            {l.code}
          </span>
          <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
            {l.text}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", note: "flash upgrade" },
    { Icon: SiGmail, bg: "#EA4335", label: "Email", note: "seasonal offer" },
    { Icon: null, bg: "#0F2A4A", label: "SMS", note: "last-minute deal" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Broadcast a campaign
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">segmented</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            {r.Icon ? (
              <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
            ) : (
              <Ticket className="h-3 w-3 text-white" />
            )}
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">
            {r.label}
          </span>
          <span className="ml-auto text-[9px] text-slate-500 truncate">
            {r.note}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is the travel agent multilingual?",
    answer:
      "Yes — over 100 languages, detected automatically. A traveler can message in Spanish, Portuguese, Arabic, or Mandarin and get an accurate, on-brand answer in the same language, at any hour and in any time zone. You don't have to staff a night desk or hire for every market you sell into.",
  },
  {
    question: "Can it actually make a booking, or just answer questions?",
    answer:
      "It books. Because it's agentic, it checks real availability, holds the seat or room, confirms the reservation, and sends the voucher — completing the task end to end inside the same conversation. It can also modify, upgrade, or cancel within the rules you set, instead of pointing the traveler at a form.",
  },
  {
    question: "Can it send itinerary updates and reminders?",
    answer:
      "Yes. The agent keeps a live itinerary for every traveler and proactively sends changes, gate updates, check-in windows, and pre-trip reminders over WhatsApp, SMS, or email. Timely reminders are one of the simplest ways to cut no-shows and missed check-ins.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "WhatsApp, SMS, email, voice, and web chat from one shared inbox. The same traveler record and trip context follow the conversation across every channel, so a question that starts on WhatsApp can be finished on email without anyone repeating themselves.",
  },
  {
    question: "Can I run upsell and marketing campaigns through it?",
    answer:
      "Yes. Broadcast room upgrades, add-ons, seasonal offers, and last-minute deals to segmented traveler lists across WhatsApp, SMS, and email — then let the agent handle every reply and booking that comes back, all on the same platform.",
  },
  {
    question: "When a request needs a person, what happens?",
    answer:
      "The agent escalates in the same thread and hands your team the full trip context — booking reference, itinerary, sentiment, and a short summary — so a human takes over without asking the traveler to start over. Routine volume is resolved automatically; only the genuine edge cases reach your staff.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Travel & Hospitality",
  serviceType: "Agentic AI booking, itinerary, and multilingual support automation",
  description:
    "An agentic AI platform for travel and hospitality that handles bookings and reservations, itinerary updates and reminders, and 24/7 multilingual support across WhatsApp, SMS, email, voice, and web chat — with omnichannel broadcasting for upsells and campaigns.",
  url: "https://www.floatchat.com/industry/travel-and-hospitality",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Airlines, hotels, OTAs, and tour operators",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/ai-agents/customer-service",
    Icon: Users,
    title: "Customer Service Agent",
    body: "Resolve repetitive traveler questions across every channel.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Compass,
    title: "Omnichannel Inbox",
    body: "One shared inbox and one traveler record, every channel.",
  },
  {
    to: "/channels/whatsapp",
    Icon: SiWhatsapp,
    title: "WhatsApp",
    body: "Book, confirm, and remind on the app travelers already use.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "See how agents act — booking and completing tasks, not just chatting.",
  },
]

const relatedChips = [
  { to: "/channels/voice", label: "Voice", Icon: Clock },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function TravelHospitalityIndustryPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Palmtree className="h-3.5 w-3.5" />
                  Travel &amp; Hospitality · agents that act, not just answer
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    travel and hospitality.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Handle bookings, itineraries, and support around the clock with
                  agents that check availability, complete the reservation, and
                  reply in the traveler&apos;s language — across every channel.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Books in the chat",
                    "24/7 in 100+ languages",
                    "Itinerary reminders",
                    "Omnichannel broadcasts",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#1B6BFF]" />
                      {b}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70"
                      style={{
                        background:
                          "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
                      }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Start Free
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Get a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  Built for airlines, hotels, OTAs, and tour operators.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <TravelBookingMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: CalendarCheck,
                  value: "Bookings",
                  label: "made inside the chat",
                },
                {
                  Icon: BellRing,
                  value: "Reminders",
                  label: "cut no-shows and missed check-ins",
                },
                {
                  Icon: Languages,
                  value: "24/7",
                  label: "multilingual, 100+ languages",
                },
                {
                  Icon: Megaphone,
                  value: "Upsells",
                  label: "broadcast across every channel",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] leading-none">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-slate-500 leading-snug">
                        {s.label}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE PROBLEM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#EEF2FF] via-white to-[#F5F7FF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Travelers ask at all hours, in every language.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A guest in another time zone messages at 2 a.m. to change a
                    flight. A traveler asks about availability in Portuguese
                    while your desk is closed. Every one of those moments is a
                    booking — and a{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      missed message is a lost one
                    </span>
                    .
                  </p>
                  <p>
                    You can&apos;t staff a live agent for every language, every
                    channel, and every hour. So questions pile up overnight,
                    reminders don&apos;t go out, no-shows creep up, and the
                    upsells you meant to send never leave the drafts folder.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI travel desk
                    </span>{" "}
                    closes that gap. It books, updates, and supports instantly —
                    in the traveler&apos;s language — and only brings a human in
                    when a request genuinely needs one.
                  </p>
                </div>
              </BlurFade>

              {/* missed vs handled contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Without an agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "After-hours messages wait until morning",
                        "Only your staffed languages get answered",
                        "Reminders slip, no-shows climb",
                        "Booking intent goes cold in the queue",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                      With FloatChat
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Books and confirms 24/7, instantly",
                        "Replies in 100+ languages automatically",
                        "Sends itinerary updates and reminders",
                        "Captures the booking while intent is hot",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT YOU GET ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What you get" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A travel desk that never closes.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one agent, one traveler record — booking, updating,
                  supporting, and selling across every channel.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: CalendarCheck,
                  title: "Bookings and reservations.",
                  body:
                    "The agent checks live availability, holds the seat or room, and confirms the reservation right inside the conversation — completing the booking instead of handing over a link.",
                  visual: <BookingsVisual />,
                },
                {
                  Icon: CalendarClock,
                  title: "Itinerary management.",
                  body:
                    "Changes, gate updates, check-in windows, and pre-trip reminders go out over SMS, WhatsApp, or email — keeping every traveler on schedule and cutting no-shows.",
                  visual: <ItineraryVisual />,
                },
                {
                  Icon: Languages,
                  title: "24/7 multilingual support.",
                  body:
                    "Answers in 100+ languages, auto-detected, in any time zone. A traveler messaging in Spanish gets the same accurate, on-brand reply a traveler messaging in English does.",
                  visual: <MultilingualVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Upsells and campaigns.",
                  body:
                    "Broadcast room upgrades, add-ons, and seasonal offers to segmented traveler lists across WhatsApp, SMS, and email — then let the agent handle every reply and booking.",
                  visual: <BroadcastVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {f.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex-1 flex items-end">
                      <div className="w-full">{f.visual}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── HOW IT FLOWS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From first message to confirmed trip.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  One conversation carries the traveler from a question to a
                  booking to a reminder — no hand-typed forms, no lost context.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: SiWhatsapp,
                      isBrand: true,
                      title: "Traveler messages",
                      note: "any channel, any language",
                    },
                    {
                      Icon: Compass,
                      isBrand: false,
                      title: "Agent checks & books",
                      note: "availability + confirmation",
                    },
                    {
                      Icon: BellRing,
                      isBrand: false,
                      title: "Itinerary + reminders",
                      note: "sent automatically",
                    },
                    {
                      Icon: Megaphone,
                      isBrand: false,
                      title: "Upsell at the right time",
                      note: "broadcast, then handled",
                    },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          {step.isBrand ? (
                            <step.Icon
                              style={{ color: "#1D4ED8", width: 17, height: 17 }}
                            />
                          ) : (
                            <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {step.note}
                          </p>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="hidden md:block h-4 w-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Why it works band */}
            <BlurFade delay={0.2}>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {[
                  {
                    Icon: Clock,
                    title: "Instant help, any hour.",
                    body:
                      "Travelers get answers and bookings in their own language the moment they ask — no waiting for your desk to open.",
                  },
                  {
                    Icon: Ticket,
                    title: "More bookings captured.",
                    body:
                      "Because the agent completes the reservation while intent is hot, fewer travelers drift off to a competitor mid-question.",
                  },
                  {
                    Icon: BellRing,
                    title: "Fewer no-shows.",
                    body:
                      "Automatic itinerary updates and pre-trip reminders keep travelers on schedule and protect your revenue.",
                  },
                ].map((b, i) => (
                  <BlurFade key={b.title} delay={0.05 + i * 0.08} className="h-full">
                    <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                        <b.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-[#0F2A4A]">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                        {b.body}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One record for the whole trip.
                </h2>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <BlurFade className="lg:col-span-7">
                <div className="h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 lg:p-10 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-4">
                      One platform
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-2xl">
                      Bookings, reminders, and campaigns all share one traveler
                      record — so every touch already knows the trip. The agent
                      that confirmed the reservation is the same one that sends
                      the gate change and the upgrade offer.
                    </p>
                    <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 max-w-lg">
                      {[
                        "One record follows the traveler",
                        "Book, update, and sell in one place",
                        "Same context across every channel",
                        "Human handoff with full trip history",
                      ].map((b) => (
                        <div key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5 shrink-0" />
                          <span className="text-[13.5px] text-white/90 leading-snug">
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-5">
                <div className="h-full flex flex-col gap-6">
                  {[
                    {
                      Icon: ShieldCheck,
                      title: "Grounded and on-brand.",
                      body:
                        "The agent answers from your fares, policies, and property details — accurate, in every language, without inventing anything.",
                    },
                    {
                      Icon: Users,
                      title: "Clean human handoff.",
                      body:
                        "When a case needs a person, it escalates in-thread with the booking reference, itinerary, and sentiment attached — no repeat questions.",
                    },
                    {
                      Icon: Workflow,
                      title: "Live in days.",
                      body:
                        "Connect your channels and point the agent at your knowledge — no journeys to map and no code to write.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <c.Icon className="h-5 w-5 text-[#1D4ED8]" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-[#0F2A4A]">
                            {c.title}
                          </h3>
                          <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                            {c.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Serve travelers with agentic AI."
          body="Connect your channels and go live in days — bookings, reminders, and 24/7 multilingual support on one platform."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Build the rest of your travel stack.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The travel desk shares an inbox, a customer record, and the
                  same guardrails with the rest of the platform.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      {a.Icon === SiWhatsapp ? (
                        <a.Icon
                          style={{ color: "#FFFFFF", width: 19, height: 19 }}
                        />
                      ) : (
                        <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {a.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* related chips */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedChips.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    <p.Icon className="h-3.5 w-3.5" />
                    {p.label}
                  </Link>
                ))}
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  Pricing
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Straight answers about bookings, languages, reminders, and going live."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/demo"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    book a demo
                  </Link>
                  .
                </p>
              }
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
          <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-14 lg:py-20 text-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 40%, rgba(191,212,255,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #93C5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(96,165,250,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(165,243,252,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Booking travelers in 100+ languages right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">live in days</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  For airlines, hotels, OTAs &amp; tour operators
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Serve travelers with{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Handle bookings, itinerary updates, and 24/7 multilingual support
                — with omnichannel broadcasting for every upsell and campaign.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Get a Demo
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="relative text-[13px] text-slate-500"
              >
                Prefer to talk it through first?{" "}
                <Link
                  to="/contact"
                  className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                >
                  Contact sales
                </Link>
                .
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
            >
              {[
                "Books in the chat",
                "24/7 in 100+ languages",
                "Itinerary reminders",
                "Omnichannel broadcasts",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
