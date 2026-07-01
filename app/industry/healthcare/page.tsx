"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  HeartPulse,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CalendarDays,
  CalendarCheck,
  BellRing,
  ShieldCheck,
  Lock,
  Clock,
  MessageCircle,
  Phone,
  Stethoscope,
  ClipboardList,
  FileText,
  Users,
  Repeat,
  ScrollText,
  Building2,
} from "lucide-react"
import { SiWhatsapp } from "react-icons/si"
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
  title: "Agentic AI for Healthcare | FloatChat",
  description:
    "Handle appointments, reminders, and patient support with agentic AI across channels, with consent-aware conversations and access controls.",
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
   HERO VISUAL — a clinical "appointment surface" that cycles:
   patient asks → consent gate clears → slot picker → slot booked
   → reminder message queued. Trustworthy, calendar-driven.
─────────────────────────────────────────────────────────────── */

type BookPhase = "ask" | "consent" | "picking" | "booked" | "reminder"

const slots = [
  { day: "Tue", date: "8", time: "9:30 AM" },
  { day: "Tue", date: "8", time: "11:00 AM" },
  { day: "Wed", date: "9", time: "2:15 PM" },
  { day: "Thu", date: "10", time: "4:45 PM" },
]

function AppointmentMockup() {
  const [phase, setPhase] = useState<BookPhase>("ask")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("ask")
        await wait(1600)
        if (cancelled) return
        setPhase("consent")
        await wait(2000)
        if (cancelled) return
        setPhase("picking")
        await wait(2200)
        if (cancelled) return
        setPhase("booked")
        await wait(2200)
        if (cancelled) return
        setPhase("reminder")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showConsent = phase === "consent"
  const consentCleared =
    phase === "picking" || phase === "booked" || phase === "reminder"
  const showPicker =
    phase === "picking" || phase === "booked" || phase === "reminder"
  const selectedIdx = phase === "booked" || phase === "reminder" ? 2 : -1
  const showBooked = phase === "booked" || phase === "reminder"
  const showReminder = phase === "reminder"

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

      {/* Floating consent badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Lock className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Consent required
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#25D366] flex items-center justify-center">
          <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Reminders · SMS &amp; WhatsApp
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
            app.floatchat.com · front desk
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Access / record rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Patient record
              </p>
            </div>
            <div className="px-3 py-3 space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
                <img
                  src="https://i.pravatar.cc/80?img=32"
                  alt="Patient"
                  loading="lazy"
                  className="h-7 w-7 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
                    A. Morgan
                  </p>
                  <p className="text-[9px] text-slate-400 truncate">
                    MRN · 44-1082
                  </p>
                </div>
              </div>
              <AccessRow
                Icon={Lock}
                label="Consent on file"
                meta={consentCleared ? "verified · 2:04 PM" : "pending"}
                active={consentCleared}
              />
              <AccessRow
                Icon={ShieldCheck}
                label="Role · Front desk"
                meta="scheduling only"
                active={showPicker}
              />
              <AccessRow
                Icon={ScrollText}
                label="Audit log"
                meta="every action recorded"
                active={showBooked}
              />
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                This conversation
              </p>
              <RailStat
                label="Status"
                value={
                  showReminder
                    ? "Reminder set"
                    : showBooked
                    ? "Booked"
                    : consentCleared
                    ? "Scheduling"
                    : "Verifying"
                }
                tone={showBooked ? "emerald" : "blue"}
              />
              <RailStat label="Type" value="Non-clinical" tone="blue" />
              <RailStat label="Channel" value="WhatsApp" tone="blue" />
            </div>
          </aside>

          {/* Conversation pane */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Stethoscope className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Riverside Family Clinic
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Scheduling assistant
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Consent-aware
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              {/* Patient asks */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi — I need to book a follow-up with Dr. Ellis this week.
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">2:03 PM</p>
                </div>
              </div>

              {/* Consent gate */}
              <AnimatePresence>
                {showConsent && (
                  <motion.div
                    key="consent"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Lock className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Consent check
                      </span>
                      <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                        access-controlled
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                      Confirming identity and consent before sharing any
                      appointment details…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slot picker */}
              <AnimatePresence>
                {showPicker && (
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-2 w-full max-w-[92%] shadow-sm">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <CalendarDays className="h-3 w-3 text-[#1D4ED8]" />
                        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
                          Open slots · Dr. Ellis
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {slots.map((s, i) => {
                          const isSel = selectedIdx === i
                          return (
                            <motion.div
                              key={s.day + s.time}
                              animate={
                                isSel
                                  ? {
                                      borderColor: "rgba(29,78,216,0.55)",
                                      backgroundColor: "rgba(234,242,255,1)",
                                    }
                                  : {
                                      borderColor: "rgba(226,232,240,1)",
                                      backgroundColor: "rgba(248,250,252,0.6)",
                                    }
                              }
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-1.5 rounded-md border px-1.5 py-1"
                            >
                              <div className="flex flex-col items-center leading-none">
                                <span className="text-[7.5px] uppercase text-slate-400 font-semibold">
                                  {s.day}
                                </span>
                                <span
                                  className={`text-[11px] font-bold ${
                                    isSel ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                                  }`}
                                >
                                  {s.date}
                                </span>
                              </div>
                              <span
                                className={`text-[9px] font-medium ${
                                  isSel ? "text-[#1D4ED8]" : "text-slate-600"
                                }`}
                              >
                                {s.time}
                              </span>
                              {isSel && (
                                <CheckCircle2 className="ml-auto h-3 w-3 text-emerald-500" />
                              )}
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Booked confirmation */}
              <AnimatePresence>
                {showBooked && (
                  <motion.div
                    key="booked"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck className="h-3 w-3 text-emerald-600" />
                      <span className="text-[9.5px] font-semibold text-emerald-800">
                        Appointment confirmed
                      </span>
                      <span className="ml-auto font-mono text-[8.5px] text-emerald-700">
                        Wed 9 · 2:15 PM
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-emerald-900/85 leading-snug">
                      Booked with Dr. Ellis and written to the schedule — logged
                      to the audit trail.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reminder queued */}
              <AnimatePresence>
                {showReminder && (
                  <motion.div
                    key="reminder"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-center gap-1.5 pl-1"
                  >
                    <div className="flex items-center gap-1.5 rounded-full border border-[#3B82F6]/25 bg-white px-2 py-1">
                      <BellRing className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-medium text-[#0F2A4A]">
                        Reminder scheduled · 24h &amp; 2h before
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Consent-aware · book, remind, or route to staff…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function AccessRow({
  Icon,
  label,
  meta,
  active,
}: {
  Icon: typeof Lock
  label: string
  meta: string
  active?: boolean
}) {
  return (
    <motion.div
      animate={
        active
          ? {
              borderColor: "rgba(59,130,246,0.4)",
              boxShadow: "0 0 0 3px rgba(59,130,246,0.08)",
            }
          : {
              borderColor: "rgba(226,232,240,1)",
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1.5"
    >
      <div
        className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-[#3B82F6]/10" : "bg-slate-100"
        }`}
      >
        <Icon
          className={`h-3 w-3 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
          {label}
        </p>
        <p className="text-[9px] text-slate-400 truncate">{meta}</p>
      </div>
      {active && (
        <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
      )}
    </motion.div>
  )
}

function RailStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "blue" | "emerald"
}) {
  const toneClass = {
    blue: "text-[#1D4ED8]",
    emerald: "text-emerald-600",
  }
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${toneClass[tone]}`}>
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function AppointmentsVisual() {
  const days = [
    { d: "Mon", n: "6", free: false },
    { d: "Tue", n: "7", free: true },
    { d: "Wed", n: "8", free: true },
    { d: "Thu", n: "9", free: false },
    { d: "Fri", n: "10", free: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <CalendarDays className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Book, reschedule, confirm
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">in chat</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((day) => (
          <div
            key={day.d}
            className={`rounded-md border px-1 py-1.5 flex flex-col items-center gap-0.5 ${
              day.free
                ? "border-[#3B82F6]/30 bg-[#EAF2FF]"
                : "border-slate-200 bg-slate-50/50"
            }`}
          >
            <span className="text-[7.5px] uppercase text-slate-400 font-semibold">
              {day.d}
            </span>
            <span
              className={`text-[11px] font-bold ${
                day.free ? "text-[#1D4ED8]" : "text-slate-400"
              }`}
            >
              {day.n}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                day.free ? "bg-emerald-500" : "bg-slate-300"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function RemindersVisual() {
  const rows = [
    { label: "24h before", channel: "WhatsApp", done: true },
    { label: "2h before", channel: "SMS", done: true },
    { label: "Refill due", channel: "SMS", done: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Reminders that cut no-shows
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <BellRing className="h-2.5 w-2.5" /> auto
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <BellRing className="h-3 w-3 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] font-medium text-[#0F2A4A]">
            {r.label}
          </span>
          <span className="ml-auto text-[9px] text-slate-500">{r.channel}</span>
          {r.done ? (
            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          ) : (
            <Clock className="h-3 w-3 text-slate-400 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function SupportVisual() {
  const qs = [
    { q: "What are your hours?", tag: "answered" },
    { q: "Where do I park?", tag: "answered" },
    { q: "Change my dosage?", tag: "routed" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <MessageCircle className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Patient questions · 24/7
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">non-clinical</span>
      </div>
      {qs.map((item) => {
        const clinical = item.tag === "routed"
        return (
          <div
            key={item.q}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
          >
            <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
              {item.q}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-medium ${
                clinical
                  ? "bg-slate-50 text-slate-700 border border-slate-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {clinical ? (
                <Users className="h-2.5 w-2.5" />
              ) : (
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              )}
              {clinical ? "to staff" : "answered"}
            </span>
          </div>
        )
      })}
    </div>
  )
}

function ConsentVisual() {
  const rows = [
    { Icon: Lock, label: "Consent verified", meta: "before any detail" },
    { Icon: ShieldCheck, label: "Role-based access", meta: "least privilege" },
    { Icon: ScrollText, label: "Audit log", meta: "every action" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Consent &amp; access controls
        </span>
        <span className="text-[8.5px] text-slate-400">GDPR · CCPA aligned</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <div className="h-6 w-6 rounded-md bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <r.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
              {r.label}
            </p>
            <p className="text-[9px] text-slate-400 truncate">{r.meta}</p>
          </div>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
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
    question: "Is patient data handled securely?",
    answer:
      "Yes. Conversations are consent-aware, access is role-based, and every action the agent takes is written to an audit log. Scheduling, reminders, and support all share one record with least-privilege access, and the platform is aligned with GDPR and CCPA. HIPAA coverage is available on a custom Enterprise contract — talk to us before relying on any HIPAA claim.",
  },
  {
    question: "Can it actually book and reschedule appointments?",
    answer:
      "Yes. The agent checks live availability, books, reschedules, and cancels appointments directly in the chat, then confirms the slot and writes it back to your schedule. Confirmations and appointment reminders go out automatically over SMS and WhatsApp, which is what drives no-shows down.",
  },
  {
    question: "How does it reduce no-shows?",
    answer:
      "Every booking triggers an automatic reminder sequence — typically 24 hours and 2 hours before the visit — over the channel the patient already uses. Patients can confirm or reschedule from the same thread, so slots that would have been missed get freed up or rebooked instead of sitting empty.",
  },
  {
    question: "What happens with clinical questions?",
    answer:
      "The agent handles the routine, non-clinical volume — hours, directions, scheduling, refill reminders, intake — and recognizes when a question is clinical or sensitive. Those are routed to your staff with the full conversation and patient context attached, so a person handles anything that needs judgment.",
  },
  {
    question: "How does consent work in a conversation?",
    answer:
      "The agent verifies identity and consent before it shares or collects any appointment or patient detail. Intake and follow-up flows are consent-aware by design, so information is only exchanged once the patient has agreed and access is authorized for that role.",
  },
  {
    question: "What about HIPAA?",
    answer:
      "HIPAA is available only on a custom Enterprise contract. Reach out to sales to scope a HIPAA-eligible configuration before publishing or relying on any HIPAA claim for your deployment.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Healthcare",
  serviceType: "Agentic AI patient engagement and scheduling automation",
  description:
    "Handle appointments, reminders, and patient support with agentic AI across channels — with consent-aware conversations, role-based access controls, and audit logs for clinics, providers, and health services.",
  url: "https://www.floatchat.com/industry/healthcare",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Clinics, providers, and health services teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "How the agent reasons, acts, and completes multi-step tasks — not just replies.",
  },
  {
    to: "/platform/security",
    Icon: ShieldCheck,
    title: "Security & access controls",
    body: "Role-based access, audit logs, and the controls behind consent-aware conversations.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: ClipboardList,
    title: "Omnichannel Inbox",
    body: "One shared inbox and one patient record across every channel your clinic uses.",
  },
  {
    to: "/channels/whatsapp",
    Icon: MessageCircle,
    title: "WhatsApp",
    body: "Two-way appointment booking and reminders on the channel patients already use.",
  },
]

const relatedPills = [
  { to: "/channels/voice", label: "Voice", Icon: Phone },
  { to: "/integrations", label: "Integrations", Icon: Repeat },
  { to: "/compare", label: "Compare FloatChat", Icon: FileText },
  { to: "/pricing", label: "Pricing", Icon: Building2 },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function HealthcareIndustryPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div
            className="absolute inset-0 -z-20 pointer-events-none"
            aria-hidden="true"
          >
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
                  <HeartPulse className="h-3.5 w-3.5" />
                  Healthcare · consent-aware patient engagement
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    healthcare.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Handle appointments, reminders, and patient questions across
                  channels — with consent-aware conversations, role-based access,
                  and clinical questions routed to your staff.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Consent-aware by design",
                    "Reminders that cut no-shows",
                    "Role-based access & audit logs",
                    "Clinical questions to staff",
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
                  Built for clinics, providers, and health services.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <AppointmentMockup />
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
                  value: "Self-serve",
                  label: "appointment scheduling in chat",
                },
                {
                  Icon: BellRing,
                  value: "Fewer",
                  label: "no-shows with auto reminders",
                },
                {
                  Icon: Clock,
                  value: "24/7",
                  label: "answers to patient questions",
                },
                {
                  Icon: ShieldCheck,
                  value: "Audit",
                  label: "logs & role-based access",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-[28px] font-semibold text-[#0F2A4A] leading-none">
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
                  Patients want it easy. Privacy is non-negotiable.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Patients want quick answers and easy scheduling — at 10pm, on
                    the channel they already use, without waiting on hold. Your
                    front desk wants fewer no-shows and fewer repeat calls about
                    hours, directions, and rebooking.
                  </p>
                  <p>
                    But healthcare can&apos;t treat every message the same. Consent
                    and access controls aren&apos;t optional, and a clinical
                    question should never be answered by a bot guessing.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI for healthcare
                    </span>{" "}
                    handles the routine securely — verifying consent, staying
                    inside role-based access, logging every action — and routes
                    clinical questions to your staff.
                  </p>
                </div>
              </BlurFade>

              {/* bot vs consent-aware agent contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A generic bot
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Answers FAQs, can't book anything",
                        "Shares details with no consent check",
                        "Guesses at clinical questions",
                        "No role controls, no audit trail",
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
                      A consent-aware agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Books, reschedules, and confirms visits",
                        "Verifies consent before any detail",
                        "Routes clinical questions to staff",
                        "Role-based access with full audit logs",
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
                  Front-desk work, handled securely.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one agent, one patient record — consent-aware and
                  working around the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: CalendarDays,
                  title: "Appointments.",
                  body:
                    "Book, reschedule, and confirm appointments right in the chat. The agent checks live availability, writes the slot back to your schedule, and confirms with the patient.",
                  visual: <AppointmentsVisual />,
                },
                {
                  Icon: BellRing,
                  title: "Reminders.",
                  body:
                    "Automatic appointment and refill reminders over SMS and WhatsApp — timed 24 hours and 2 hours out — so fewer slots go empty and no-shows drop.",
                  visual: <RemindersVisual />,
                },
                {
                  Icon: MessageCircle,
                  title: "Patient support.",
                  body:
                    "Answer common, non-clinical questions around the clock — hours, directions, prep, and rebooking — and route anything clinical or sensitive to your staff with context.",
                  visual: <SupportVisual />,
                },
                {
                  Icon: ShieldCheck,
                  title: "Consent & access controls.",
                  body:
                    "Consent-aware intake and follow-up, role-based access with least privilege, and an audit log for every action — all aligned with GDPR and CCPA.",
                  visual: <ConsentVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <f.Icon
                          className="h-5 w-5 text-white"
                          strokeWidth={2.25}
                        />
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

        {/* ───── HOW IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From patient message to booked and confirmed.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Consent is checked first. The routine is resolved. Anything
                  clinical goes to your team.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: MessageCircle,
                      title: "Patient messages",
                      note: "any channel, any hour",
                    },
                    {
                      Icon: Lock,
                      title: "Consent verified",
                      note: "before any detail",
                    },
                    {
                      Icon: CalendarCheck,
                      title: "Booked & reminded",
                      note: "written to the schedule",
                    },
                    {
                      Icon: Stethoscope,
                      title: "Clinical to staff",
                      note: "routed with context",
                    },
                  ].map((step, i, arr) => (
                    <div
                      key={step.title}
                      className="flex-1 flex items-center gap-3"
                    >
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
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

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Repeat,
                  title: "Patients self-serve",
                  body: "Scheduling and answers happen without a phone call — on the channel they already use.",
                },
                {
                  Icon: Users,
                  title: "Staff focus on care",
                  body: "The routine volume is absorbed, so your people spend time on the patients who need them.",
                },
                {
                  Icon: BellRing,
                  title: "Reminders fill the gaps",
                  body: "Automatic reminders reduce missed appointments and free up slots that would have gone empty.",
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
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Support patients with secure agentic AI."
          body="Handle appointments, reminders, and questions across channels — consent-aware, with role-based access and audit logs."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One record. One set of controls.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: ClipboardList,
                  title: "One shared record.",
                  body: "Scheduling, reminders, and support all read and write the same patient record — no fragmented tools or lost context.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Access built in.",
                  body: "Role-based access and audit logs are part of every conversation, so who saw what and who did what is always recoverable.",
                },
                {
                  Icon: Lock,
                  title: "Consent-aware everywhere.",
                  body: "Consent is verified before details are shared or collected — across chat, voice, and every connected channel.",
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

            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                    Why FloatChat
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Scheduling, reminders, and support share one record with
                    role-based access and audit logs — so patients self-serve
                    securely and your staff stays focused on care.
                  </p>
                  <p className="mt-4 text-[13px] text-white/70 max-w-3xl leading-relaxed">
                    Note: HIPAA is available only on a custom Enterprise
                    contract — talk to us before relying on any HIPAA claim.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything that powers it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same platform, the same controls — dig into the pieces
                  behind consent-aware patient engagement.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCards.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
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

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedPills.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    <p.Icon className="h-3.5 w-3.5" />
                    {p.label}
                  </Link>
                ))}
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
              description="Straight answers about scheduling, reminders, consent, and access."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or explore{" "}
                  <Link
                    to="/platform/security"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    security &amp; access controls
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 25%, #93C5FD 50%, #60A5FA 75%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(96,165,250,0.16) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(96,165,250,0.3), transparent 70%)",
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
                  Booking and reminding patients right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">
                  consent-aware
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">
                  / START
                </span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Built for healthcare
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Support patients with{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  secure agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Appointments, reminders, and patient questions — handled across
                channels with consent-aware conversations and access controls.
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
            >
              {[
                "Consent-aware conversations",
                "Role-based access & audit logs",
                "Reminders that cut no-shows",
                "Clinical questions to staff",
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
