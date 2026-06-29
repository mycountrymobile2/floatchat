"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  Clock,
  BellRing,
  Check,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Phone,
  PhoneOff,
  Repeat,
  Plane,
  Stethoscope,
  Scissors,
  UtensilsCrossed,
  MailCheck,
  Smartphone,
  Send,
  Users,
  Bot,
  Workflow,
  TrendingDown,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "Agentic AI Booking Agent for Appointments and Reservations | FloatChat",
  description:
    "Schedule appointments and reservations inside the chat with an agentic AI booking agent that checks availability, confirms, and sends reminders.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow (local, blue-accented)
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-slate-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Hero mockup: chat + mini availability calendar widget
─────────────────────────────────────────────────────────────── */

const SLOT_GRID: { time: string; open: boolean }[] = [
  { time: "9:00", open: false },
  { time: "9:30", open: true },
  { time: "10:00", open: true },
  { time: "10:30", open: false },
  { time: "11:00", open: true },
  { time: "11:30", open: true },
  { time: "1:00", open: true },
  { time: "1:30", open: false },
  { time: "2:00", open: true },
]

function BookingMockup() {
  // Cycle the selected slot to make the widget feel alive.
  const [selected, setSelected] = useState(4)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setConfirmed(true), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const openSlots = SLOT_GRID.map((s, i) => (s.open ? i : -1)).filter((i) => i >= 0)
    const cycle = setInterval(() => {
      setSelected((prev) => {
        const idx = openSlots.indexOf(prev)
        return openSlots[(idx + 1) % openSlots.length]
      })
    }, 2600)
    return () => clearInterval(cycle)
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.40), transparent 70%)",
        }}
      />

      {/* Floating availability chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(29,78,216,0.22)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <CalendarClock className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Live availability
        </span>
      </motion.div>

      {/* Floating reminder chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <BellRing className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Reminder scheduled
        </span>
      </motion.div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(29,78,216,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · booking agent
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Conversation thread */}
          <section className="col-span-12 md:col-span-7 flex flex-col md:border-r border-slate-200">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#0F2A4A]">
                  Booking Agent
                </p>
                <p className="text-[9.5px] text-slate-500">
                  Online · replies instantly
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-semibold text-blue-700">
                <Sparkles className="h-2.5 w-2.5" />
                Agentic
              </span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2.5 bg-slate-50/30 overflow-hidden">
              <div className="flex justify-end">
                <div className="bg-[#1D4ED8] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                  <p className="text-[10.5px] text-white">
                    Hi! Can I book a consultation for Thursday?
                  </p>
                  <p className="text-[8.5px] text-white/70 mt-0.5 text-right">
                    2:14 PM
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A]">
                    Absolutely. Here's what's open on{" "}
                    <span className="font-semibold text-[#1D4ED8]">
                      Thu, Jul 3
                    </span>
                    . Pick a time and I'll lock it in.
                  </p>
                </div>
              </div>

              {/* Availability mini-calendar widget */}
              <div className="rounded-xl border border-blue-200 bg-white px-3 py-2.5 shadow-[0_10px_24px_-16px_rgba(29,78,216,0.5)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-[#1D4ED8]" />
                    <span className="text-[10px] font-semibold text-[#0F2A4A]">
                      Thursday, July 3
                    </span>
                  </div>
                  <span className="text-[8.5px] text-slate-400">
                    America / New York
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {SLOT_GRID.map((slot, i) => {
                    const isSelected = i === selected
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.open}
                        className={`relative rounded-md px-1 py-1.5 text-[10px] font-medium transition-colors ${
                          !slot.open
                            ? "bg-slate-100 text-slate-300 line-through cursor-not-allowed"
                            : isSelected
                              ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white shadow-sm"
                              : "bg-blue-50 text-[#1D4ED8] hover:bg-blue-100"
                        }`}
                      >
                        {slot.time}
                        {isSelected && (
                          <motion.span
                            layoutId="slot-ring"
                            className="absolute inset-0 rounded-md ring-2 ring-[#1D4ED8]/40"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2 text-[8.5px] text-slate-400">
                  Checked against your calendar in real time · 6 of 9 open
                </p>
              </div>

              {/* Confirmation bubble */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: confirmed ? 1 : 0, y: confirmed ? 0 : 6 }}
                transition={{ duration: 0.4 }}
                className="flex justify-start"
              >
                <div className="rounded-xl rounded-bl-sm border border-emerald-200 bg-emerald-50/70 px-3 py-2 max-w-[88%] shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                    </span>
                    <span className="text-[10.5px] font-semibold text-emerald-800">
                      Confirmed · 11:00 AM
                    </span>
                  </div>
                  <p className="text-[9.5px] text-emerald-900/80 mt-1 leading-snug">
                    Calendar invite sent. I'll text a reminder 24h before and 1h
                    before.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-slate-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Type a message…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                <Send className="h-2.5 w-2.5" />
                Send
              </button>
            </div>
          </section>

          {/* Booking summary panel */}
          <aside className="hidden md:flex md:col-span-5 flex-col bg-blue-50/40">
            <div className="px-3 py-2.5 border-b border-blue-100 bg-white">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Booking summary
              </p>
            </div>

            <div className="flex-1 px-3 py-3 space-y-3 overflow-hidden">
              {/* Appointment card */}
              <div className="rounded-lg border border-blue-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <CalendarCheck className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    Appointment
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-[#0F2A4A]">
                  Consultation · 30 min
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Thu, Jul 3 · 11:00 AM EDT
                </p>
              </div>

              {/* Reminder schedule */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <BellRing className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    Reminders
                  </span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { Icon: Smartphone, label: "SMS · 24h before", on: true },
                    { Icon: MessageSquare, label: "WhatsApp · 1h before", on: true },
                    { Icon: MailCheck, label: "Email · receipt now", on: true },
                  ].map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center gap-2 rounded-md bg-slate-50/70 border border-slate-100 px-2 py-1"
                    >
                      <r.Icon className="h-3 w-3 text-slate-500" />
                      <span className="text-[9.5px] text-[#0F2A4A] flex-1">
                        {r.label}
                      </span>
                      <span className="h-3.5 w-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check className="h-2 w-2 text-white" strokeWidth={3} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-emerald-700">
                    Status
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700">
                    Booked
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                  />
                </div>
                <p className="mt-1.5 text-[9px] text-emerald-800">
                  No staff touched this booking
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for "what it does" cards
─────────────────────────────────────────────────────────────── */

function BooksInChatVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex justify-start">
        <div className="bg-blue-50 border border-blue-100 rounded-lg rounded-bl-sm px-2 py-1 max-w-[85%]">
          <span className="text-[9.5px] text-[#0F2A4A]">
            Book me a table for 4 tonight?
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] rounded-lg rounded-br-sm px-2 py-1 max-w-[85%]">
          <span className="text-[9.5px] text-white">
            Done — 7:30 PM, party of 4 ✓
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 pt-0.5">
        <CalendarCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9px] text-slate-500">
          Appointments, reservations, demos
        </span>
      </div>
    </div>
  )
}

function AvailabilityVisual() {
  const cells = [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-[#0F2A4A]">This week</span>
        <span className="font-semibold text-[#1D4ED8]">8 slots open</span>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {cells.map((open, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className={`h-5 rounded-md ${
              open
                ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]"
                : "bg-slate-100"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9px] text-slate-500">
          Synced live with your calendar
        </span>
      </div>
    </div>
  )
}

function RemindersVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      {[
        { Icon: Smartphone, label: "SMS", time: "24h before" },
        { Icon: MessageSquare, label: "WhatsApp", time: "1h before" },
        { Icon: MailCheck, label: "Email", time: "confirmation" },
      ].map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span className="h-5 w-5 rounded-md bg-blue-100 flex items-center justify-center">
            <r.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A] flex-1">
            {r.label}
          </span>
          <span className="text-[8.5px] text-slate-500">{r.time}</span>
        </div>
      ))}
    </div>
  )
}

function RescheduleVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <span className="text-[10px] text-slate-400 line-through flex-1">
          Tue · 3:00 PM
        </span>
        <Repeat className="h-3 w-3 text-[#1D4ED8]" />
      </div>
      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50/50 px-2 py-1.5">
        <CalendarCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] font-semibold text-[#0F2A4A] flex-1">
          Wed · 10:30 AM
        </span>
        <span className="text-[8.5px] font-medium text-emerald-600">moved</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Content data
─────────────────────────────────────────────────────────────── */

const stats = [
  { value: "In-chat", label: "Books inside the conversation", Icon: MessageSquare },
  { value: "Real-time", label: "Availability checked live", Icon: CalendarClock },
  { value: "−38%", label: "Fewer no-shows with reminders", Icon: TrendingDown },
  { value: "0", label: "Reschedules needing a human", Icon: Repeat },
]

const flowSteps = [
  {
    num: "1",
    Icon: MessageSquare,
    title: "Request",
    body: "A customer asks to book — in chat, on WhatsApp, over SMS, or by voice. The agent captures intent the moment they're ready.",
  },
  {
    num: "2",
    Icon: CalendarClock,
    title: "Check availability",
    body: "It reads your calendar or booking system in real time, applies your rules, buffers, and hours, and surfaces only the slots that actually work.",
  },
  {
    num: "3",
    Icon: CalendarCheck,
    title: "Confirm",
    body: "The customer picks a time, the agent locks it in, writes the event to your calendar, and sends a confirmation with all the details.",
  },
  {
    num: "4",
    Icon: BellRing,
    title: "Remind",
    body: "Automated reminders go out over SMS, WhatsApp, and email so people show up — and reschedule themselves if plans change.",
  },
]

const features = [
  {
    Icon: MessageSquare,
    title: "Books in the chat.",
    body: "Appointments, reservations, and demos are captured inside the conversation — no forms, no redirect to a separate booking page, no waiting for the office to open.",
    visual: <BooksInChatVisual />,
  },
  {
    Icon: CalendarClock,
    title: "Checks availability in real time.",
    body: "The AI booking agent queries your calendar or scheduling system live, respects buffers, business hours, and double-booking rules, and only offers slots that are genuinely free.",
    visual: <AvailabilityVisual />,
  },
  {
    Icon: BellRing,
    title: "Sends reminders that cut no-shows.",
    body: "Timely nudges over SMS, WhatsApp, and email keep your bookings on the calendar and your chairs full — automatically, on the channels customers actually read.",
    visual: <RemindersVisual />,
  },
  {
    Icon: Repeat,
    title: "Reschedules and cancels.",
    body: "Changes happen without a phone call. The agent moves, cancels, and re-books on its own — and routes anything genuinely complex to your team with the full thread attached.",
    visual: <RescheduleVisual />,
  },
]

const industries = [
  {
    Icon: Plane,
    title: "Travel & Hospitality",
    body: "Take room reservations, tours, and check-in times around the clock, in any timezone, without a front-desk call.",
    href: null as string | null,
  },
  {
    Icon: Stethoscope,
    title: "Healthcare",
    body: "Book and confirm patient appointments, send reminders that reduce no-shows, and route clinical questions to staff.",
    href: "/solutions/healthcare",
  },
  {
    Icon: Scissors,
    title: "Salons & Services",
    body: "Fill the chair. Customers book a cut, color, or service in chat and get reminders so the slot doesn't go empty.",
    href: null,
  },
  {
    Icon: UtensilsCrossed,
    title: "Restaurants",
    body: "Take reservations inside the conversation, manage party sizes and waitlists, and confirm tables automatically.",
    href: "/solutions/restaurants",
  },
]

const agentFamily = [
  {
    Icon: Users,
    title: "Customer Service Agent",
    body: "Resolve questions and tickets across every channel.",
    href: "/ai-agents/customer-service",
  },
  {
    Icon: TrendingDown,
    title: "Sales Agent",
    body: "Turn conversations into pipeline and closed deals.",
    href: "/ai-agents/sales",
  },
  {
    Icon: Sparkles,
    title: "Lead Qualification Agent",
    body: "Score and route leads before they hit your team.",
    href: "/ai-agents/lead-qualification",
  },
  {
    Icon: Workflow,
    title: "Agent Builder",
    body: "Design your own agent with custom tools and rules.",
    href: "/ai-agents/agent-builder",
  },
]

const relatedLinks = [
  { label: "All AI agents", href: "/ai-agents" },
  { label: "Restaurants", href: "/solutions/restaurants" },
  { label: "Healthcare", href: "/solutions/healthcare" },
  { label: "Automation", href: "/automation" },
]

const faqs: FAQItem[] = [
  {
    question: "Does the AI booking agent connect to my calendar?",
    answer:
      "Yes. It connects to your calendar and scheduling tools through native integrations and the open API, then reads availability in real time so it only ever offers slots that are genuinely free.",
  },
  {
    question: "Can it send reminders?",
    answer:
      "Yes — over SMS, WhatsApp, and email. You choose the cadence (for example a confirmation now, a reminder 24 hours before, and a nudge one hour before). Timely reminders are the single biggest lever for cutting no-shows.",
  },
  {
    question: "Can it reschedule or cancel a booking?",
    answer:
      "It handles both automatically. A customer can ask to move or cancel right in the conversation, and the agent updates your calendar, frees the slot, and confirms the change — no phone tag required.",
  },
  {
    question: "What happens with a request it can't handle?",
    answer:
      "Anything outside its scope — a complex multi-leg booking, a special accommodation, an edge-case policy question — is routed straight to your team with the full conversation and booking context attached, so a person can pick up exactly where the agent left off.",
  },
  {
    question: "Which industries is it built for?",
    answer:
      "Travel and hospitality, healthcare, salons and personal services, restaurants, and any services business that runs on appointments or reservations. The same agent adapts to your booking rules, hours, and buffers.",
  },
  {
    question: "How is this different from a standalone booking widget?",
    answer:
      "A widget is a form. The AI booking agent is a conversation: it understands natural requests, checks live availability, confirms, reminds, and reschedules — and it runs on the same FloatChat platform as your support and sales agents, so every booking flows from one customer record.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Booking Agent",
  serviceType: "Agentic AI booking and appointment scheduling agent",
  url: "https://www.floatchat.com/ai-agents/booking",
  description:
    "An agentic AI booking agent that schedules appointments and reservations inside the chat, checks availability in real time, confirms bookings, and sends reminders over SMS, WhatsApp, and email.",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com",
  },
  areaServed: "Global",
  audience: {
    "@type": "Audience",
    audienceType: "Travel, hospitality, healthcare, and services teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function BookingAgentPage() {
  usePageMeta({
    title:
      "Agentic AI Booking Agent for Appointments and Reservations | FloatChat",
    description:
      "Schedule appointments and reservations inside the chat with an agentic AI booking agent that checks availability, confirms, and sends reminders.",
  })

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
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1D4ED8]/5 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  AI Booking Agent · scheduling that runs itself
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  An agentic AI booking agent that{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                    fills your calendar.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Schedule appointments and reservations inside the chat. The
                  agent checks availability, confirms, and sends reminders — all
                  automatically, on every channel your customers already use.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Books in the chat",
                    "Real-time availability",
                    "Automatic reminders",
                    "Reschedules itself",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#1D4ED8]" />
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
                          "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
                      }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(29,78,216,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
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
                  className="mt-6 text-[12.5px] text-slate-400"
                >
                  Built for travel, hospitality, healthcare, and services teams.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <BookingMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200">
              {stats.map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex flex-col items-start gap-2 px-5 py-8 lg:px-8">
                    <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <s.Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-[12.5px] text-slate-500 leading-snug">
                      {s.label}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE PROBLEM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.08]">
                  Every booking that needs a phone call is a booking you might{" "}
                  <span className="text-[#1D4ED8]">lose.</span>
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A customer is ready to book at 9 p.m. on a Sunday. Your phone
                    line is closed and your inbox won't be checked until Monday.
                    By the time someone calls them back, they've booked with
                    whoever answered first. The intent was there — the moment
                    wasn't captured.
                  </p>
                  <p>
                    Back-and-forth email is no better. "Does Tuesday work?" "No,
                    how about Thursday?" Three messages later the slot you were
                    holding is gone and so is the customer's patience. Manual
                    scheduling leaks revenue at exactly the point your business
                    can least afford it.
                  </p>
                  <p>
                    An agentic AI booking agent captures the request the moment a
                    customer is ready, confirms on the spot, and reduces no-shows
                    with timely reminders — so the slot gets filled, kept, and
                    shown up for.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-[0_30px_60px_-30px_rgba(29,78,216,0.25)]">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 mb-5">
                    Where bookings leak
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        Icon: PhoneOff,
                        label: "After-hours requests",
                        sub: "No one to answer when intent is highest",
                        pct: "63%",
                      },
                      {
                        Icon: Phone,
                        label: "Phone tag",
                        sub: "Callbacks that never connect",
                        pct: "41%",
                      },
                      {
                        Icon: Clock,
                        label: "Slow email replies",
                        sub: "The slot's gone by the time you respond",
                        pct: "35%",
                      },
                    ].map((row, i) => (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
                          <row.Icon className="h-4 w-4 text-rose-500" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-[13px] font-semibold text-[#0F2A4A]">
                              {row.label}
                            </p>
                            <span className="text-[12px] font-semibold text-rose-500 tabular-nums">
                              {row.pct}
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: row.pct }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                              className="h-full rounded-full bg-gradient-to-r from-rose-300 to-rose-500"
                            />
                          </div>
                          <p className="mt-1 text-[10.5px] text-slate-400">
                            {row.sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50/50 px-4 py-3 flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      The booking agent answers all three — instantly, on every
                      channel.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── BOOKING FLOW TIMELINE ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <BlurFade>
                <SectionEyebrow num="02" label="The flow" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From request to reminder, on its own.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four steps, zero handoffs. The AI booking agent runs the whole
                  loop while your team stays focused on the work only people can
                  do.
                </p>
              </BlurFade>
            </div>

            <div className="relative">
              {/* connecting line */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200"
              />
              <div className="grid gap-8 lg:gap-6 lg:grid-cols-4">
                {flowSteps.map((step, i) => (
                  <BlurFade key={step.num} delay={i * 0.1}>
                    <div className="relative">
                      <div className="flex items-center gap-3 lg:block">
                        <div className="relative z-10 h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(29,78,216,0.6)] ring-4 ring-white">
                          <step.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                        </div>
                        <span className="lg:mt-4 lg:block text-[11px] font-mono text-blue-400">
                          Step {step.num}
                        </span>
                      </div>
                      <h3 className="mt-2 lg:mt-1 text-lg font-semibold text-[#0F2A4A]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── WHAT IT DOES ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF] overflow-hidden">
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
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="What it does" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A scheduler that works the way customers talk.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Customers book when they're ready, not when your office is
                  open. You fill more slots, reduce no-shows, and free staff from
                  manual scheduling.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.28)] transition-all duration-300">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
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

        {/* ───── NO-SHOW REDUCTION SPOTLIGHT ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="No-shows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.08]">
                  Reminders are the cheapest way to{" "}
                  <span className="text-[#1D4ED8]">fill the chair.</span>
                </h2>
                <p className="mt-5 text-base text-slate-500 leading-relaxed max-w-lg">
                  An empty slot you booked is worse than one you never had — you
                  turned away someone else to hold it. Automated reminders over
                  SMS, WhatsApp, and email keep bookings on the calendar and let
                  customers reschedule themselves before the slot goes to waste.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    { Icon: Smartphone, label: "SMS" },
                    { Icon: MessageSquare, label: "WhatsApp" },
                    { Icon: MailCheck, label: "Email" },
                  ].map((c) => (
                    <span
                      key={c.label}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/60 px-3.5 py-1.5 text-[13px] font-medium text-[#1D4ED8]"
                    >
                      <c.Icon className="h-3.5 w-3.5" />
                      {c.label}
                    </span>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-[#F8FAFF] to-white p-6 lg:p-8 shadow-[0_30px_60px_-30px_rgba(29,78,216,0.25)]">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-400">
                      No-show rate
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      <TrendingDown className="h-3 w-3" />
                      −38% with reminders
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8 items-end">
                    {/* Without */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-44 flex items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="w-20 rounded-t-xl bg-gradient-to-t from-rose-300 to-rose-400 flex items-start justify-center pt-3"
                        >
                          <span className="text-[15px] font-bold text-white">
                            29%
                          </span>
                        </motion.div>
                      </div>
                      <p className="mt-3 text-[12px] font-semibold text-[#0F2A4A]">
                        Without reminders
                      </p>
                      <p className="text-[10.5px] text-slate-400">
                        Manual or none
                      </p>
                    </div>

                    {/* With */}
                    <div className="flex flex-col items-center">
                      <div className="relative w-full h-44 flex items-end justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: "38%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          className="w-20 rounded-t-xl bg-gradient-to-t from-[#60A5FA] to-[#1D4ED8] flex items-start justify-center pt-3"
                        >
                          <span className="text-[15px] font-bold text-white">
                            11%
                          </span>
                        </motion.div>
                      </div>
                      <p className="mt-3 text-[12px] font-semibold text-[#0F2A4A]">
                        With the agent
                      </p>
                      <p className="text-[10.5px] text-slate-400">
                        Auto reminders, all channels
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-center">
                    {[
                      { v: "3", l: "reminders per booking" },
                      { v: "24/7", l: "self-serve reschedule" },
                      { v: "1-click", l: "confirm or cancel" },
                    ].map((m) => (
                      <div key={m.l}>
                        <p className="text-xl font-semibold text-[#1D4ED8] tracking-tight">
                          {m.v}
                        </p>
                        <p className="text-[10.5px] text-slate-500 leading-snug mt-0.5">
                          {m.l}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INDUSTRIES ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="Industries" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built for businesses that live on bookings.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  The same agent adapts to your rules, hours, and buffers — no
                  matter what you're scheduling.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind, i) => {
                const card = (
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.28)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <ind.Icon className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A]">
                      {ind.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed flex-1">
                      {ind.body}
                    </p>
                    {ind.href && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8] group-hover:gap-2 transition-all">
                        Explore solution
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                )
                return (
                  <BlurFade key={ind.title} delay={i * 0.08} className="h-full">
                    {ind.href ? (
                      <Link to={ind.href} className="block h-full">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </BlurFade>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-[#F5F7FF] via-white to-[#F8FAFF] p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <BlurFade className="lg:col-span-7">
                  <SectionEyebrow num="06" label="Why FloatChat" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0F2A4A] leading-[1.1]">
                    One platform. One customer record. Every booking connected.
                  </h2>
                  <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-2xl">
                    The booking agent runs on the same platform as your support
                    and sales agents. Reminders, confirmations, and follow-ups
                    all flow from one customer record — so a reservation, a
                    support question, and a sales conversation are never strangers
                    to each other.
                  </p>
                </BlurFade>
                <BlurFade delay={0.15} className="lg:col-span-5">
                  <div className="space-y-3">
                    {[
                      {
                        Icon: Bot,
                        label: "Shared with your other agents",
                        sub: "Support, sales, and booking on one stack",
                      },
                      {
                        Icon: Workflow,
                        label: "Open API + integrations",
                        sub: "Connect your calendar and scheduling tools",
                      },
                      {
                        Icon: Users,
                        label: "Clean human handoff",
                        sub: "Complex cases route with full context",
                      },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5"
                      >
                        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                          <r.Icon className="h-4 w-4 text-white" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13.5px] font-semibold text-[#0F2A4A]">
                            {r.label}
                          </p>
                          <p className="text-[11.5px] text-slate-500 mt-0.5">
                            {r.sub}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Fill your calendar without the phone tag."
          body="Let the agent check availability, confirm, and remind — automatically, on every channel."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── AGENT FAMILY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="07" label="Agent family" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The booking agent has siblings.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Pair it with the rest of the FloatChat agent family, all on one
                  platform.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agentFamily.map((a, i) => (
                <BlurFade key={a.href} delay={i * 0.08} className="h-full">
                  <Link to={a.href} className="block h-full">
                    <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.28)] transition-all duration-300">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <a.Icon className="h-4.5 w-4.5 text-[#1D4ED8]" strokeWidth={2} />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#0F2A4A]">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] text-slate-500 leading-relaxed flex-1">
                        {a.body}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#1D4ED8] group-hover:gap-2 transition-all">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12.5px] font-medium text-slate-400">
                  Related:
                </span>
                {relatedLinks.map((r) => (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#0F2A4A] hover:border-blue-300 hover:text-[#1D4ED8] transition-colors"
                  >
                    {r.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-[#F5F7FF] to-white"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Booking agent questions"
              description="Calendars, reminders, reschedules — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/demo"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Get a demo
                  </Link>{" "}
                  or browse the{" "}
                  <Link
                    to="/ai-agents"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    agent family
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.7) 40%, rgba(207,232,254,0.6) 70%, rgba(234,242,255,0.7) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5C8FF 20%, #60A5FA 45%, #3B82F6 65%, #BFD4FF 85%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(96,165,250,0.38), rgba(191,219,254,0.25) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(191,219,254,0.4), transparent 70%)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Books, confirms, and reminds — on its own
                </span>
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
                  AI Booking Agent
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Fill your calendar without the{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                  phone tag.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Let the agent check availability, confirm, and remind —
                automatically, on every channel your customers use.
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
                "Real-time availability",
                "SMS · WhatsApp · email reminders",
                "Self-serve reschedule",
                "Open API + integrations",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
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
