"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Send,
  Image as ImageIcon,
  Calendar,
  Megaphone,
  Shield,
  DollarSign,
  Paperclip,
  TrendingDown,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: phone with SMS thread + reply animation
─────────────────────────────────────────────────────────────── */

function SmsThreadMockup() {
  // 0 empty · 1 business intro · 2 business tracking · 3 customer reply · 4 typing · 5 final reply
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(600)
        if (cancelled) return
        setPhase(1)
        await wait(900)
        if (cancelled) return
        setPhase(2)
        await wait(1400)
        if (cancelled) return
        setPhase(3)
        await wait(1700)
        if (cancelled) return
        setPhase(4)
        await wait(1100)
        if (cancelled) return
        setPhase(5)
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative flex justify-center">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[40px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating cost-summary card (left of phone, desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="hidden lg:flex absolute left-0 top-16 z-30 flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_15px_40px_-15px_rgba(15,42,74,0.25)]"
      >
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
            <DollarSign className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
            Per segment
          </span>
        </div>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[28px] font-semibold text-[#1D4ED8] tabular-nums leading-none">
            $0.005
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
          <span className="text-slate-400 line-through">$0.0079 Twilio</span>
        </div>
        <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
          <TrendingDown className="h-2.5 w-2.5" />
          ~37% savings
        </div>
      </motion.div>

      {/* Floating inbound-free pill (right of phone, desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="hidden lg:flex absolute right-0 bottom-20 z-30 items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.2)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Inbound <span className="text-emerald-600">free</span>
        </span>
      </motion.div>

      {/* Phone */}
      <div className="relative w-[260px] sm:w-[290px] h-[520px] sm:h-[560px] rounded-[40px] border-[8px] border-slate-900 bg-white shadow-[0_30px_60px_-25px_rgba(15,42,74,0.4)] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1.5 w-20 rounded-full bg-slate-900 z-20" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-6 pt-2 text-[10px] font-semibold text-slate-700 z-10">
          <span>9:41</span>
          <span className="font-mono text-[9px]">5G</span>
        </div>

        {/* Thread header */}
        <div className="absolute top-8 left-0 right-0 px-3 pt-3 pb-2.5 border-b border-slate-100 bg-white flex items-center gap-2 z-10">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-1 ring-white" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#0F2A4A]">
              Atelier Linen
            </p>
            <p className="text-[9px] text-slate-500">(800) 555-9100</p>
          </div>
          <div className="inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-700">
            <span className="h-1 w-1 rounded-full bg-emerald-500" />
            Live
          </div>
        </div>

        {/* Messages — flex-col with justify-end so bubbles stack from the bottom up */}
        <div
          className="absolute top-[88px] bottom-[60px] left-0 right-0 px-3 py-3 overflow-hidden bg-[#F2F2F7] flex flex-col justify-end gap-2"
        >
          <AnimatePresence initial={false}>
            {phase >= 1 && (
              <motion.div
                key="m1"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-[#E5E5EA] text-[#0F2A4A] px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[11px] leading-snug">
                    Hi Jessica — your order #4421 ships tomorrow morning 📦
                  </p>
                </div>
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                key="m2"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-[#E5E5EA] text-[#0F2A4A] px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[11px] leading-snug">
                    Tracking: 1Z999AA10123456784
                  </p>
                  <p className="text-[8.5px] text-slate-500 mt-0.5">10:24 AM</p>
                </div>
              </motion.div>
            )}

            {phase >= 3 && (
              <motion.div
                key="m3"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex justify-end"
              >
                <div className="rounded-2xl rounded-br-md bg-[#3B82F6] text-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[11px] leading-snug">
                    Awesome — can you add a note to leave at the door?
                  </p>
                </div>
              </motion.div>
            )}

            {phase === 4 && (
              <motion.div
                key="typing"
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.25 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-[#E5E5EA] px-3 py-2 flex items-center gap-1 shadow-sm">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-slate-500"
                      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: d * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {phase >= 5 && (
              <motion.div
                key="m5"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                  mass: 0.6,
                }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-[#E5E5EA] text-[#0F2A4A] px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[11px] leading-snug">
                    Done ✓ Note added. Delivered tomorrow.
                  </p>
                  <p className="text-[8.5px] text-slate-500 mt-0.5">10:25 AM</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
          <button className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <ImageIcon className="h-3 w-3 text-slate-500" />
          </button>
          <div className="flex-1 h-7 rounded-full bg-slate-100 border border-slate-200 px-3 flex items-center">
            <span className="text-[10px] text-slate-400">iMessage</span>
          </div>
          <button className="h-7 w-7 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0">
            <Send className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
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
   Interactive cost calculator (the SMS centerpiece)
─────────────────────────────────────────────────────────────── */

const CALC_TIERS = [
  { messages: 1000, label: "1k" },
  { messages: 5000, label: "5k" },
  { messages: 10000, label: "10k" },
  { messages: 25000, label: "25k" },
  { messages: 50000, label: "50k" },
  { messages: 100000, label: "100k" },
]

function CostCalculator() {
  const [idx, setIdx] = useState(2) // default 10k

  const msgs = CALC_TIERS[idx].messages
  const fc = msgs * 0.005
  const tw = msgs * 0.0079
  const savings = tw - fc
  const pct = Math.round((1 - fc / tw) * 100)
  const percent = (idx / (CALC_TIERS.length - 1)) * 100

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_-30px_rgba(15,42,74,0.25)]">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            / calculator
          </p>
          <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-[#0F2A4A]">
            How much you'd send.{" "}
            <span className="text-slate-400 font-normal">
              How much you'd save.
            </span>
          </h3>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      {/* Volume slider */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[12px] uppercase tracking-wider font-medium text-slate-400">
            Monthly segments
          </span>
          <span className="text-2xl sm:text-3xl font-semibold text-[#0F2A4A] tabular-nums">
            {msgs.toLocaleString()}
          </span>
        </div>

        <div className="relative">
          <div className="relative h-2 rounded-full bg-slate-100">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] transition-all duration-150"
              style={{ width: `${percent}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-white border-2 border-[#3B82F6] shadow-md pointer-events-none transition-[left] duration-150"
              style={{ left: `${percent}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={CALC_TIERS.length - 1}
            step={1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            aria-label="Monthly SMS volume"
            className="absolute inset-0 w-full h-6 -top-2 opacity-0 cursor-pointer"
          />
        </div>

        {/* Tick marks */}
        <div className="mt-3 flex items-center justify-between">
          {CALC_TIERS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setIdx(i)}
              className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                idx === i
                  ? "bg-[#3B82F6]/10 text-[#1D4ED8]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <CostCard
          label="FloatChat"
          rate="$0.005 / seg"
          value={`$${fmt(fc)}`}
          highlight
        />
        <CostCard
          label="Twilio retail"
          rate="$0.0079 / seg"
          value={`$${fmt(tw)}`}
          strike
        />
        <CostCard
          label="You save"
          rate={`${pct}% off Twilio`}
          value={`$${fmt(savings)}`}
          tone="emerald"
        />
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#EAF2FF] to-[#F5F9FF] border border-[#3B82F6]/15 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
          <p className="text-sm text-[#0F2A4A]">
            <span className="font-semibold">
              ${fmt(savings * 12)} saved per year
            </span>{" "}
            at this volume — vs Twilio retail.
          </p>
        </div>
        <Link
          to="/signup?plan=starter"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:gap-2 transition-all"
        >
          Lock in this rate <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

function CostCard({
  label,
  rate,
  value,
  highlight,
  strike,
  tone = "default",
}: {
  label: string
  rate: string
  value: string
  highlight?: boolean
  strike?: boolean
  tone?: "default" | "emerald"
}) {
  const borderClass = highlight
    ? "border-[#3B82F6]/40 bg-gradient-to-br from-white to-[#EAF2FF]"
    : "border-slate-200 bg-white"
  const valueColor =
    tone === "emerald"
      ? "text-emerald-600"
      : highlight
      ? "text-[#1D4ED8]"
      : strike
      ? "text-slate-400 line-through"
      : "text-[#0F2A4A]"
  return (
    <div className={`rounded-2xl border p-4 ${borderClass}`}>
      <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-[10px] text-slate-400 font-mono">{rate}</p>
      <p
        className={`mt-2 text-2xl sm:text-3xl font-semibold tabular-nums ${valueColor}`}
      >
        {value}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function ConvoVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex justify-start">
        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-[#0F2A4A]">
            Hey! Is order #4421 shipped?
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-[#3B82F6] rounded-2xl rounded-br-md px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-white">Yes — ships tomorrow 📦</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="text-[9px] font-mono text-slate-400">
          (415) 555-0142 ↔ Atelier
        </span>
      </div>
    </div>
  )
}

function BroadcastVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Megaphone className="h-3 w-3 text-orange-500" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
            Spring promo
          </span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-600">85%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "85%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[47, 12, 44, 15, 49].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/30?img=${i}`}
              alt=""
              className="h-6 w-6 rounded-full ring-2 ring-white object-cover"
              loading="lazy"
            />
          ))}
          <span className="h-6 w-6 rounded-full ring-2 ring-white bg-orange-100 flex items-center justify-center text-[9px] font-semibold text-orange-700">
            +4k
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          4,238 / 5,000
        </span>
      </div>
    </div>
  )
}

function MmsVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex justify-start">
        <div className="rounded-2xl rounded-bl-md bg-white border border-slate-200 overflow-hidden max-w-[80%] shadow-sm">
          <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200 via-emerald-100 to-emerald-300 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="h-7 w-7 text-emerald-700/50" />
            </div>
            <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-800">
              <Paperclip className="h-2 w-2" />
              MMS
            </span>
          </div>
          <p className="px-2.5 py-1.5 text-[11px] text-[#0F2A4A]">
            Preview of your order 👀
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-slate-500">1 segment · image</span>
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
          $0.015{" "}
          <span className="text-slate-400 font-normal line-through">$0.020</span>
        </span>
      </div>
    </div>
  )
}

function ScheduleVisual() {
  const days = Array.from({ length: 14 }).map((_, i) => i + 1)
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="grid grid-cols-7 gap-1 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="text-[8px] uppercase font-semibold text-slate-400"
          >
            {d}
          </span>
        ))}
        {days.map((day) => {
          const isHighlight = day === 8
          return (
            <span
              key={day}
              className={`text-[9px] py-0.5 rounded transition-colors ${
                isHighlight
                  ? "bg-violet-500 text-white font-semibold shadow-sm"
                  : "text-slate-500"
              }`}
            >
              {day}
            </span>
          )
        })}
      </div>
      <div className="flex items-center gap-2 rounded-md bg-white border border-violet-200 px-2 py-1.5">
        <Calendar className="h-3 w-3 text-violet-600" />
        <span className="text-[10px] font-medium text-[#0F2A4A]">
          Tomorrow · 9:00 AM
        </span>
        <span className="ml-auto text-[8.5px] text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
          Reminder
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ + content
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Do you support short codes?",
    answer:
      "Yes, on Pro and Enterprise as a paid add-on. Short codes require separate carrier approval, 6-12 weeks.",
  },
  {
    question: "Can I send to international numbers?",
    answer: "No. FloatChat SMS is US-only currently.",
  },
  {
    question: "What's the segment count for a long message?",
    answer:
      "SMS is 160 chars per segment (140 with emoji). MMS is 1,600 chars + media. Long messages get split and billed per segment.",
  },
  {
    question: "Is SMS included in any bundle?",
    answer:
      "Yes. Growth includes 500 SMS/month, Pro 2,000/month, Enterprise 10,000/month. Overage at $0.005 + carrier fees.",
  },
]

const compliance = [
  "STOP, START, HELP keywords auto-handled",
  "Quiet hours per recipient",
  "TCPA opt-in tracking",
  "Profanity filter on outbound",
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function SmsPage() {
  useEffect(() => {
    document.title = "Business SMS at $0.005 per Segment | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Two-way text messaging at $0.005 per segment. Twilio retail charges $0.0079. STOP/HELP auto-handled. 10DLC self-service.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Business SMS · $0.005/segment
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Business SMS without the{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    Twilio markup.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Outbound at $0.005 per segment. Twilio retail charges $0.0079.
                  Built into your support inbox on Starter.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "$0.005 per segment",
                    "Inbound free",
                    "MMS supported",
                    "10DLC ready",
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
                      to="/signup?plan=starter"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Add SMS
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
                    Book a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  SMS unlocks on Starter ($19.99/month). 10DLC brand registration
                  is self-service via carrier.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <SmsThreadMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── COST CALCULATOR (centerpiece) ───── */}
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
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="Live pricing" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Drag the slider.{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    See your savings.
                  </span>
                </h2>
              </BlurFade>
            </div>

            <BlurFade delay={0.15}>
              <CostCalculator />
            </BlurFade>
          </div>
        </section>

        {/* ───── WHAT YOU GET — 4 feature row ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="The basics" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What you get.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: MessageCircle,
                  title: "Two-way conversations.",
                  body:
                    "Customers text your toll-free or local number. Reply from the same inbox you use for chat and email.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <ConvoVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Broadcast to lists.",
                  body:
                    "Send announcements, appointment reminders, order updates to thousands at once.",
                  accent: "from-amber-400 to-orange-500",
                  shadow: "shadow-orange-500/40",
                  visual: <BroadcastVisual />,
                },
                {
                  Icon: ImageIcon,
                  title: "MMS at $0.015 per segment.",
                  body: "Image, video, audio, GIF. Twilio retail charges $0.020.",
                  accent: "from-emerald-400 to-emerald-600",
                  shadow: "shadow-emerald-500/40",
                  visual: <MmsVisual />,
                },
                {
                  Icon: Calendar,
                  title: "Scheduling and triggers.",
                  body:
                    "Send a reminder 24 hours before an appointment. Send order confirmations on Shopify webhook.",
                  accent: "from-violet-400 to-violet-600",
                  shadow: "shadow-violet-500/40",
                  visual: <ScheduleVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-md ${f.shadow} shrink-0`}
                      >
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

        {/* ───── COMPARISON TABLE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Apples-to-apples" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Rate comparison.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Published retail SMS pricing across the major US providers.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8 h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Provider
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Outbound SMS
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Inbound
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            MMS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Twilio",
                            out: "$0.0079",
                            inb: "$0.0075",
                            mms: "$0.020",
                          },
                          {
                            name: "EZ Texting",
                            out: "$0.025 (per credit)",
                            inb: "n/a",
                            mms: "$0.025",
                          },
                          {
                            name: "SimpleTexting",
                            out: "$0.030+",
                            inb: "$0.030",
                            mms: "$0.040+",
                          },
                        ].map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                          >
                            <td className="p-4 font-medium text-[#0F2A4A]">
                              {row.name}
                            </td>
                            <td className="p-4 text-slate-500">{row.out}</td>
                            <td className="p-4 text-slate-500">{row.inb}</td>
                            <td className="p-4 text-slate-500">{row.mms}</td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-[#EAF2FF] to-[#F5F9FF]">
                          <td className="p-4 font-semibold text-[#1D4ED8]">
                            <span className="inline-flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              FloatChat
                            </span>
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $0.005
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            Free
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $0.015
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Savings
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      35<span className="text-3xl lg:text-4xl text-white/70">%</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Savings on outbound SMS vs Twilio retail.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Carrier fees passed through at cost
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── 10DLC + Compliance combined ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* 10DLC */}
              <BlurFade className="col-span-12 lg:col-span-7">
                <SectionEyebrow num="04" label="10DLC" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05] mb-8">
                  What about 10DLC?
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_15px_40px_-25px_rgba(15,42,74,0.15)]">
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider mb-3">
                      Self-service
                    </div>
                    <h3 className="text-base font-semibold text-[#0F2A4A]">
                      Free, Lite, Starter, Growth
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      Self-service via carrier portal. Takes 2–7 days.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#EAF2FF] to-white p-6 shadow-[0_15px_40px_-25px_rgba(15,42,74,0.15)]">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 text-[#1D4ED8] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider mb-3">
                      We handle it
                    </div>
                    <h3 className="text-base font-semibold text-[#0F2A4A]">
                      Pro, Enterprise
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      Our onboarding team handles registration for you. Takes 2–3
                      days.
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-500 max-w-md">
                  FloatChat doesn't charge an extra fee for 10DLC. Carrier fees are
                  passed through at cost.
                </p>
              </BlurFade>

              {/* Compliance checklist */}
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-5">
                <div className="h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#F5F9FF] p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                      Compliance built in
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold text-[#0F2A4A] mb-4">
                    Defaults that keep you out of trouble.
                  </h3>
                  <ul className="space-y-2.5">
                    {compliance.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#0F2A4A] leading-relaxed"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm shadow-[#3B82F6]/40">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Start sending business SMS at $0.005"
          body="Two-way SMS native to FloatChat. 10DLC compliance included."
          primaryLabel="Start SMS"
          primaryHref="/signup?plan=starter"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Segments, 10DLC, bundles — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or check the{" "}
                  <Link
                    to="/help"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Help Center
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(237,233,254,0.65) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #C4B5FD 60%, #F0ABFC 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(196,181,253,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(240,171,252,0.35), transparent 70%)",
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
                  ~37% savings vs Twilio retail
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">10DLC ready</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-8 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Live in minutes
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  Business SMS.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Starter $19.99/month. Add a toll-free number for $15/month.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=starter"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Add SMS to Starter
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Demo
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
                "$0.005 / segment",
                "Inbound free",
                "MMS $0.015",
                "10DLC pass-through",
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
