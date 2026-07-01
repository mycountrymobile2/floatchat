"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Home,
  BedDouble,
  Bath,
  MapPin,
  CalendarClock,
  CalendarCheck,
  Users,
  MessageSquare,
  Megaphone,
  Clock,
  Repeat,
  Filter,
  Key,
  Ruler,
  Send,
  Phone,
  MessageCircle,
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
  title: "Agentic AI for Real Estate | FloatChat",
  description:
    "Capture leads, recommend properties, and book viewings with agentic AI that works 24/7 across chat, WhatsApp, and SMS.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow
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
   HERO MOCKUP — a real-estate surface. Left: two matched listing
   cards the agent surfaces. Right: a lead-capture chat that cycles
   through capturing a lead → recommending a property → offering a
   viewing slot → the buyer booking it. Slot picker fills in live.
─────────────────────────────────────────────────────────────── */

type FlowPhase = "capture" | "recommend" | "offer" | "booked"

const listings = [
  {
    title: "Maple Court · 2-bed loft",
    location: "Riverside, Unit 4B",
    price: "$2,400/mo",
    beds: 2,
    baths: 2,
    sqft: "1,180 sqft",
    tint: "from-[#DCE8FF] to-[#BFD4FF]",
    match: "96% match",
  },
  {
    title: "Oakview Terrace · 3-bed home",
    location: "Northgate, 12 Elm St",
    price: "$3,150/mo",
    beds: 3,
    baths: 2,
    sqft: "1,640 sqft",
    tint: "from-[#E3EEFF] to-[#CBDCFF]",
    match: "91% match",
  },
]

const slots = ["Thu 10:00", "Thu 2:30", "Fri 11:00", "Fri 4:00", "Sat 9:30", "Sat 1:00"]

function RealEstateMockup() {
  const [phase, setPhase] = useState<FlowPhase>("capture")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("capture")
        await wait(2000)
        if (cancelled) return
        setPhase("recommend")
        await wait(2400)
        if (cancelled) return
        setPhase("offer")
        await wait(2400)
        if (cancelled) return
        setPhase("booked")
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showRecommend = phase === "recommend" || phase === "offer" || phase === "booked"
  const showOffer = phase === "offer" || phase === "booked"
  const showBooked = phase === "booked"
  const bookedSlot = "Fri 11:00"

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

      {/* Floating stat chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Viewing booked · 40s
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
          WhatsApp · 24/7
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
            app.floatchat.com · listings
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Listings rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-5 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-1.5">
              <Home className="h-3 w-3 text-[#1D4ED8]" />
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Matched to buyer
              </p>
            </div>
            <div className="px-3 py-3 space-y-2.5">
              {listings.map((l, i) => (
                <motion.div
                  key={l.title}
                  animate={
                    showRecommend && i === 0
                      ? {
                          borderColor: "rgba(59,130,246,0.5)",
                          boxShadow: "0 0 0 3px rgba(59,130,246,0.10)",
                        }
                      : {
                          borderColor: "rgba(226,232,240,1)",
                          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                        }
                  }
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border bg-white overflow-hidden"
                >
                  {/* Photo placeholder */}
                  <div
                    className={`relative h-16 bg-gradient-to-br ${l.tint} flex items-center justify-center`}
                  >
                    <Home className="h-5 w-5 text-[#1D4ED8]/40" />
                    <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-[#1D4ED8]">
                      <Sparkles className="h-2 w-2" /> {l.match}
                    </span>
                  </div>
                  <div className="px-2.5 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10.5px] font-semibold text-[#0F2A4A] truncate">
                        {l.title}
                      </p>
                      <p className="text-[10.5px] font-bold text-[#1D4ED8] shrink-0">
                        {l.price}
                      </p>
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-[8.5px] text-slate-500">
                      <MapPin className="h-2.5 w-2.5" /> {l.location}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2.5 text-[9px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <BedDouble className="h-2.5 w-2.5 text-slate-400" />
                        {l.beds} bd
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-2.5 w-2.5 text-slate-400" />
                        {l.baths} ba
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="h-2.5 w-2.5 text-slate-400" />
                        {l.sqft}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Book a viewing — calendar slot picker */}
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5 mb-2">
                <CalendarClock className="h-3 w-3 text-[#1D4ED8]" />
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                  Book a viewing
                </p>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {slots.map((s) => {
                  const isBooked = showBooked && s === bookedSlot
                  const isOffered = showOffer && (s === bookedSlot || s === "Fri 4:00")
                  return (
                    <motion.div
                      key={s}
                      animate={
                        isBooked
                          ? { scale: [1, 1.05, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.4 }}
                      className={`rounded-md border px-1 py-1 text-center text-[8.5px] font-medium ${
                        isBooked
                          ? "border-emerald-300 bg-emerald-500 text-white"
                          : isOffered
                          ? "border-[#3B82F6]/40 bg-[#EAF2FF] text-[#1D4ED8]"
                          : "border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      {isBooked ? (
                        <span className="inline-flex items-center gap-0.5">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} /> {s}
                        </span>
                      ) : (
                        s
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Lead-capture chat pane */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white">
            {/* Buyer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Buyer"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Aisha Rahman
                  </p>
                  <p className="text-[9px] text-slate-500">
                    New lead · WhatsApp
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Agent working
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              {/* Buyer opener */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi — is the 2-bed on Maple Court still available? Budget is
                    around $2.5k.
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">6:41 PM</p>
                </div>
              </div>

              {/* Agent captures + qualifies */}
              <div className="flex items-start gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                  <p className="text-[11px] text-white leading-snug">
                    It is! To match you well — how many bedrooms, and when do you
                    want to move in?
                  </p>
                </div>
              </div>

              {/* Qualification chip */}
              <div className="flex items-center gap-1.5 pl-7">
                <Filter className="h-2.5 w-2.5 text-[#1D4ED8]" />
                <span className="text-[9px] font-medium text-[#1D4ED8]">
                  Captured: 2 bd · $2.5k · move-in 30d
                </span>
              </div>

              {/* Recommendation card */}
              <AnimatePresence>
                {showRecommend && (
                  <motion.div
                    key="rec"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="ml-7 rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Home className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Recommended · 96% match
                      </span>
                      <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                        Maple Court
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                      2-bed loft, Riverside — <span className="font-semibold">$2,400/mo</span>,
                      under budget, available now.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Viewing offer */}
              <AnimatePresence>
                {showOffer && (
                  <motion.div
                    key="offer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[11px] text-white leading-snug">
                        Want to see it? I have Fri 11:00 or Fri 4:00 open — which
                        works?
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buyer books */}
              <AnimatePresence>
                {showBooked && (
                  <motion.div
                    key="pick"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-end"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl rounded-br-sm px-2.5 py-1.5 shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Friday 11 is perfect 🙌
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Booked confirmation */}
              <AnimatePresence>
                {showBooked && (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex items-center gap-1.5 pl-7"
                  >
                    <CalendarCheck className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9.5px] font-medium text-emerald-600">
                      Viewing booked · Fri 11:00 · reminder scheduled
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Agent on · capture, recommend, or book…
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

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function LeadCaptureVisual() {
  const rows = [
    { label: "Budget", value: "$2.5k/mo" },
    { label: "Bedrooms", value: "2 bd" },
    { label: "Move-in", value: "Within 30d" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Lead qualified in chat
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Filter className="h-2.5 w-2.5" /> auto
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="text-[10px] text-slate-500">{r.label}</span>
          <span className="ml-auto text-[10px] font-semibold text-[#0F2A4A]">
            {r.value}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function RecommendVisual() {
  const props = [
    { name: "Maple Court · 2 bd", price: "$2,400", match: "96%", top: true },
    { name: "Cedar Row · 2 bd", price: "$2,550", match: "88%", top: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Home className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Matched to their criteria
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">ranked</span>
      </div>
      {props.map((p) => (
        <div
          key={p.name}
          className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${
            p.top ? "border-[#3B82F6]/40 bg-[#EAF2FF]" : "border-slate-200 bg-slate-50/40"
          }`}
        >
          <div
            className={`h-6 w-6 rounded bg-gradient-to-br from-[#DCE8FF] to-[#BFD4FF] flex items-center justify-center shrink-0`}
          >
            <Home className="h-3 w-3 text-[#1D4ED8]/60" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-[#0F2A4A] truncate">{p.name}</p>
            <p className="text-[9px] text-slate-500">{p.price}/mo</p>
          </div>
          <span
            className={`text-[9px] font-semibold shrink-0 ${
              p.top ? "text-[#1D4ED8]" : "text-slate-400"
            }`}
          >
            {p.match}
          </span>
        </div>
      ))}
    </div>
  )
}

function ViewingVisual() {
  const days = [
    { day: "Fri", slots: ["11:00", "4:00"], picked: "11:00" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Viewing booked
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
          <CalendarCheck className="h-2.5 w-2.5" /> confirmed
        </span>
      </div>
      {days.map((d) => (
        <div key={d.day} className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-[#0F2A4A] w-7">{d.day}</span>
          <div className="flex gap-1.5">
            {d.slots.map((s) => (
              <span
                key={s}
                className={`rounded-md border px-2 py-1 text-[9px] font-medium ${
                  s === d.picked
                    ? "border-emerald-300 bg-emerald-500 text-white"
                    : "border-slate-200 bg-slate-50/40 text-slate-400"
                }`}
              >
                {s === d.picked ? (
                  <span className="inline-flex items-center gap-0.5">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} /> {s}
                  </span>
                ) : (
                  s
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <Clock className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Reminder sent 2h before · no phone tag
        </span>
      </div>
    </div>
  )
}

function CampaignVisual() {
  const channels = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", react: true },
    { Icon: MessageSquare, bg: "#0F2A4A", label: "SMS", react: false },
    { Icon: MessageCircle, bg: "#3B82F6", label: "Web", react: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          New listing broadcast
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">142 buyers</span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <p className="text-[10px] text-[#0F2A4A] leading-snug">
          New: Oakview Terrace, 3-bed home — matched to your saved search.
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        {channels.map((c) => (
          <span
            key={c.label}
            className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1"
          >
            <span
              className="h-3.5 w-3.5 rounded flex items-center justify-center"
              style={{ background: c.bg }}
            >
              {c.react ? (
                <c.Icon style={{ color: "#fff", width: 9, height: 9 }} />
              ) : (
                <c.Icon className="h-2.5 w-2.5 text-white" />
              )}
            </span>
            <span className="text-[9px] font-medium text-[#0F2A4A]">{c.label}</span>
          </span>
        ))}
        <Send className="h-3 w-3 text-[#1D4ED8] ml-auto" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can it qualify real-estate leads on its own?",
    answer:
      "Yes. The agent asks dynamic, buyer-specific questions right in the conversation — budget, number of bedrooms, preferred neighborhoods, move-in timing, buy versus rent — and captures the answers to a single lead record. Every inbound inquiry gets an instant, useful response instead of sitting in an inbox until an agent is free, so you stop losing warm leads to whoever replies first.",
  },
  {
    question: "Can it actually book viewings?",
    answer:
      "It does more than suggest times. The agent checks live availability, offers open slots, confirms the viewing, writes it to your calendar, and schedules reminders before the appointment — no phone tag and no double-booking. If a buyer needs to reschedule, they just message back and the agent moves the slot.",
  },
  {
    question: "Which channels does it work across?",
    answer:
      "WhatsApp, SMS, web chat, and more — the buyer picks the channel, not you. Lead capture, property recommendations, viewing bookings, and follow-up campaigns all share one customer record, so a conversation that starts on your website can continue on WhatsApp without the buyer repeating themselves.",
  },
  {
    question: "How does it recommend the right properties?",
    answer:
      "The agent matches what it captured — budget, size, location, and must-haves — against your live inventory and surfaces the closest fits, ranked. It only recommends properties that actually exist in your listings, so buyers never get pointed at a unit that's already gone.",
  },
  {
    question: "Can it run new-listing campaigns to my buyer list?",
    answer:
      "Yes. When a new property matches a buyer's saved search, the agent can broadcast it over SMS, WhatsApp, and web — and then handle the replies, qualify interest, and book viewings automatically. It turns a listing announcement into booked appointments instead of a one-way blast.",
  },
  {
    question: "Who is this built for?",
    answer:
      "Agencies, brokers, and property platforms that get more inbound interest than their team can answer in real time. If speed-to-lead, viewing coordination, and keeping buyers warm between touchpoints are eating your hours, an agentic AI works those jobs around the clock so your people focus on closing.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Real Estate",
  serviceType: "Agentic AI lead capture, property recommendations, and viewing booking",
  description:
    "Capture leads, recommend properties, and book viewings with agentic AI that works 24/7 across chat, WhatsApp, and SMS — built for agencies, brokers, and property platforms.",
  url: "https://www.floatchat.com/industry/real-estate",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Real estate agencies, brokers, and property platforms",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/ai-agents/lead-generation",
    Icon: Filter,
    title: "Lead Generation Agent",
    body: "Capture and qualify property leads before they go cold.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "See how agents reason, act, and finish the job end to end.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: MessageSquare,
    title: "Omnichannel Inbox",
    body: "One record and history across every channel a buyer uses.",
  },
  {
    to: "/channels/whatsapp",
    Icon: Phone,
    title: "WhatsApp",
    body: "Meet buyers where they already message about listings.",
  },
  {
    to: "/channels/sms-broadcasting",
    Icon: Megaphone,
    title: "SMS Broadcasting",
    body: "Blast new listings to matched buyers and book the replies.",
  },
  {
    to: "/integrations",
    Icon: Repeat,
    title: "Integrations",
    body: "Connect your CRM, calendar, and listing system.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RealEstateIndustryPage() {
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
                  <Building2 className="h-3.5 w-3.5" />
                  Real Estate · lead capture, recommendations & viewings
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    real estate.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Capture leads and book viewings around the clock with agents
                  that qualify buyers, recommend the right listings, and follow
                  up — across chat, WhatsApp, and SMS.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Instant lead response",
                    "Property recommendations",
                    "Viewings booked 24/7",
                    "Follow-up that keeps buyers warm",
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
                  Built for agencies, brokers, and property platforms.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <RealEstateMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Filter, value: "Capture", label: "leads qualified in the conversation" },
                { Icon: Home, value: "Match", label: "property recommendations that fit" },
                { Icon: CalendarCheck, value: "Book", label: "viewings scheduled 24/7" },
                { Icon: Megaphone, value: "Broadcast", label: "listing campaigns to matched buyers" },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-semibold text-[#0F2A4A] leading-none">
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
                  The first agent to reply usually wins the deal.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Property leads expect an instant response. A buyer who
                    messages about a listing at 9pm won&apos;t wait until morning
                    — they&apos;ll DM three other agents while they&apos;re still
                    excited, and go with whoever answers first.
                  </p>
                  <p>
                    But you can&apos;t staff a person on every channel, around the
                    clock, ready to qualify, recommend, and coordinate a viewing.
                    So leads go cold, calendars fill with phone tag, and warm
                    buyers drift between the moment they inquire and the moment
                    they visit.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI for real estate
                    </span>{" "}
                    closes that gap. It captures the lead, qualifies them,
                    recommends the right property, and books the viewing — the
                    moment a buyer reaches out.
                  </p>
                </div>
              </BlurFade>

              {/* slow vs instant contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A slow reply
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Lead waits hours for a first response",
                        "Buyer messages three other agents",
                        "Viewing coordination becomes phone tag",
                        "Warm interest goes cold before the visit",
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
                      An instant agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Replies and qualifies in seconds",
                        "Recommends matching listings on the spot",
                        "Books the viewing without phone tag",
                        "Follows up to keep the buyer warm",
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
                  Four jobs, one agent.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From first message to booked viewing to the next new listing —
                  all on one record, across every channel.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Filter,
                  title: "Capture and qualify leads.",
                  body:
                    "The agent replies instantly and asks the right questions — budget, bedrooms, location, move-in timing — turning a cold inquiry into a qualified lead in the conversation itself.",
                  visual: <LeadCaptureVisual />,
                },
                {
                  Icon: Home,
                  title: "Recommend the right properties.",
                  body:
                    "It matches what it captured against your live inventory and suggests the closest fits, ranked — only recommending listings that actually exist and are still available.",
                  visual: <RecommendVisual />,
                },
                {
                  Icon: CalendarCheck,
                  title: "Book and remind for viewings.",
                  body:
                    "The agent checks availability, confirms a slot, writes it to your calendar, and sends reminders before the appointment — no phone tag, no double-booking, no no-shows.",
                  visual: <ViewingVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Run follow-up campaigns.",
                  body:
                    "When a new property matches a buyer's saved search, the agent broadcasts it over SMS, WhatsApp, and web — then handles the replies and books the viewings.",
                  visual: <CampaignVisual />,
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
                  Inquiry to booked viewing, without a human in the loop.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every step happens in one thread, on the buyer&apos;s channel of
                  choice — <span className="font-semibold text-[#0F2A4A]">in
                  under a minute</span>.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  Icon: MessageSquare,
                  title: "Buyer reaches out",
                  body: "A lead messages about a listing on WhatsApp, SMS, or web — day or night.",
                },
                {
                  step: "02",
                  Icon: Filter,
                  title: "Agent qualifies",
                  body: "It asks budget, size, and timing, capturing everything to one lead record.",
                },
                {
                  step: "03",
                  Icon: Home,
                  title: "Matches a property",
                  body: "It recommends the closest available listings, ranked to the buyer's criteria.",
                },
                {
                  step: "04",
                  Icon: CalendarCheck,
                  title: "Books the viewing",
                  body: "It offers open slots, confirms one, and schedules reminders — no phone tag.",
                },
              ].map((s, i) => (
                <BlurFade key={s.step} delay={0.05 + i * 0.08} className="h-full">
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.2)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                        <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <span className="font-mono text-[11px] text-slate-300">{s.step}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#0F2A4A]">{s.title}</h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                    {i < 3 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 h-4 w-4 text-slate-300" />
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One record. Every channel. Nothing dropped.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Lead capture, property recommendations, viewing bookings, and
                    listing campaigns don&apos;t live in four different tools —
                    they share one buyer record. A conversation that starts on
                    your website continues on WhatsApp without the buyer ever
                    repeating themselves.
                  </p>
                  <p>
                    That means every follow-up is informed, every recommendation
                    is grounded in what the buyer actually told you, and every
                    viewing lands on the right calendar the first time.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: Clock,
                      title: "Instant, 24/7",
                      body: "Every lead gets a real response the moment they message — nights and weekends included.",
                    },
                    {
                      Icon: Repeat,
                      title: "Shared context",
                      body: "One record follows the buyer across channels, so nobody re-asks and nothing gets lost.",
                    },
                    {
                      Icon: Key,
                      title: "Grounded in your inventory",
                      body: "It only recommends listings that exist and are available — never a unit that's already gone.",
                    },
                    {
                      Icon: CalendarClock,
                      title: "No phone tag",
                      body: "Viewings are checked, confirmed, and reminded automatically — no back-and-forth calls.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.2)] transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-3">
                        <c.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#0F2A4A]">{c.title}</h3>
                      <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Capture more property leads with agentic AI."
          body="Reply instantly, recommend the right listings, and book viewings 24/7 — across chat, WhatsApp, and SMS."
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
                  Build the rest of the stack.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The agents, channels, and tools that power a real-estate
                  conversation from first touch to signed lease.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((l, i) => (
                <BlurFade key={l.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={l.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                        <l.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#0F2A4A]">{l.title}</h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {l.body}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-slate-400">More:</span>
                {[
                  { to: "/channels/web-chat", label: "Web Chat" },
                  { to: "/compare", label: "Compare FloatChat" },
                  { to: "/pricing", label: "Pricing" },
                  { to: "/contact", label: "Talk to sales" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Real estate, answered."
              description="How agentic AI captures leads, recommends properties, and books viewings for your team."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0F2A4A] via-[#12386B] to-[#1D4ED8]">
          <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,165,250,0.6), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90">
                <Building2 className="h-3.5 w-3.5" />
                Agentic AI for Real Estate
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                Capture more property leads with agentic AI.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
                Reply the instant a buyer reaches out, recommend the right
                listings, and book viewings around the clock — across every
                channel your buyers use.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-[15px] font-medium text-[#0F2A4A] bg-white hover:bg-blue-50 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.4)] transition-all"
                >
                  Start Free
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full text-[15px] font-medium border border-white/30 bg-transparent text-white hover:bg-white/10 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-100/70">
                {[
                  "Built for agencies & brokers",
                  "24/7 across every channel",
                  "Live in days, not months",
                ].map((b) => (
                  <span key={b} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {b}
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
