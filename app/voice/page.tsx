"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  PhoneIncoming,
  PhoneOff,
  Mic,
  MicOff,
  X,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Pause,
  ChevronRight,
  Volume2,
  Search,
  Star,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: softphone window with live incoming/active call
─────────────────────────────────────────────────────────────── */

type CallPhase = "ringing" | "connected" | "ended"

function SoftphoneMockup() {
  const [phase, setPhase] = useState<CallPhase>("ringing")
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("ringing")
        setSeconds(0)
        await wait(1800)
        if (cancelled) return
        setPhase("connected")
        for (let s = 0; s < 28; s++) {
          if (cancelled) return
          setSeconds(s)
          await wait(180)
        }
        if (cancelled) return
        setPhase("ended")
        await wait(1500)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const recents = [
    { name: "Jessica Chen", dir: "in", time: "9:41 AM", dur: "2m 14s" },
    { name: "Marcus Williams", dir: "out", time: "8:55 AM", dur: "5m 02s" },
    { name: "Ashley Rodriguez", dir: "in", time: "Yesterday", dur: "1m 47s" },
    { name: "Tyler Brooks", dir: "out", time: "Yesterday", dur: "4m 11s" },
  ]

  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating local-DID chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Phone className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Local DID <span className="text-[#1D4ED8]">$5/mo</span>
        </span>
      </motion.div>

      {/* Floating outbound rate chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Outbound <span className="text-emerald-600">$0.008/min</span>
        </span>
      </motion.div>

      {/* Window */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · voice
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[9px] text-emerald-700 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[360px]">
          {/* Recents rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-5 border-r border-slate-200 bg-slate-50/40 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Phone className="h-3 w-3 text-slate-400" />
                <span className="text-[11px] font-semibold text-[#0F2A4A]">
                  Recent calls
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-md px-2 py-1">
                <Search className="h-2.5 w-2.5 text-slate-400" />
                <span className="text-[10px] text-slate-400">
                  Search number or contact…
                </span>
              </div>
            </div>
            <div className="flex-1 px-2 py-2 space-y-0.5">
              {recents.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white"
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      r.dir === "in"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-[#3B82F6]/10 text-[#1D4ED8]"
                    }`}
                  >
                    <Phone className="h-2.5 w-2.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#0F2A4A] truncate">
                      {r.name}
                    </p>
                    <p className="text-[9.5px] text-slate-500">
                      {r.dir === "in" ? "Incoming" : "Outgoing"} · {r.time}
                    </p>
                  </div>
                  <span className="text-[9.5px] text-slate-400">{r.dur}</span>
                </div>
              ))}
            </div>

            {/* Number picker preview */}
            <div className="px-3 py-2.5 border-t border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2">
                Your numbers
              </p>
              <div className="space-y-1.5">
                <NumberRow areaCode="(415)" rest="555-0142" label="SF · Local" />
                <NumberRow
                  areaCode="(800)"
                  rest="555-9100"
                  label="Toll-free"
                  tone="violet"
                />
              </div>
            </div>
          </aside>

          {/* Active call panel */}
          <section className="col-span-12 md:col-span-7 relative flex flex-col bg-gradient-to-br from-[#0F2A4A] via-[#1E3A8A] to-[#1D4ED8] text-white">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-[#60A5FA]/20 blur-3xl" />
            </div>

            <div className="relative flex-1 flex flex-col items-center justify-center px-5 py-5">
              <AnimatePresence mode="wait">
                {phase === "ringing" && (
                  <motion.div
                    key="ringing"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative h-14 w-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center mb-3">
                      <PhoneIncoming className="h-6 w-6 text-white animate-pulse" />
                      <motion.span
                        className="absolute inset-0 rounded-full border border-white/40"
                        animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      <motion.span
                        className="absolute inset-0 rounded-full border border-white/40"
                        animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                      Incoming · Live Chat caller
                    </p>
                    <p className="text-base font-semibold tracking-tight">
                      +1 (415) 555-0142
                    </p>
                    <p className="text-[11px] text-white/70 mt-1">
                      Jessica Chen · VIP customer
                    </p>
                  </motion.div>
                )}

                {phase === "connected" && (
                  <motion.div
                    key="connected"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center w-full max-w-[260px]"
                  >
                    <div className="h-12 w-12 rounded-full bg-emerald-500/20 backdrop-blur flex items-center justify-center mb-3">
                      <Phone className="h-5 w-5 text-emerald-300" />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 mb-1">
                      Connected
                    </p>
                    <p className="text-base font-semibold tracking-tight">
                      Jessica Chen
                    </p>
                    <p className="font-mono text-[11px] text-white/70 mt-1">
                      00:
                      {seconds.toString().padStart(2, "0")}
                    </p>

                    {/* Waveform */}
                    <div className="mt-4 flex items-end gap-1 h-8">
                      {[3, 6, 9, 5, 11, 7, 8, 6, 12, 5, 9, 7, 10, 4, 8].map(
                        (h, i) => (
                          <motion.span
                            key={i}
                            animate={{ scaleY: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.05,
                            }}
                            className="w-[3px] rounded-full bg-white/80 origin-bottom"
                            style={{ height: `${h * 2}px` }}
                          />
                        ),
                      )}
                    </div>
                  </motion.div>
                )}

                {phase === "ended" && (
                  <motion.div
                    key="ended"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-14 w-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center mb-3">
                      <PhoneOff className="h-6 w-6 text-white/80" />
                    </div>
                    <p className="text-sm font-semibold">Call ended</p>
                    <p className="text-[11px] text-white/70 mt-1">
                      Duration · 4m 52s
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="relative border-t border-white/10 px-4 py-2.5 flex items-center justify-center gap-2.5">
              <button
                aria-label="Mute"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                {phase === "connected" ? (
                  <Mic className="h-3.5 w-3.5 text-white/90" />
                ) : (
                  <MicOff className="h-3.5 w-3.5 text-white/50" />
                )}
              </button>
              <button
                aria-label="Hold"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Pause className="h-3.5 w-3.5 text-white/90" />
              </button>
              <button
                aria-label="Volume"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Volume2 className="h-3.5 w-3.5 text-white/90" />
              </button>
              <button
                aria-label={phase === "ringing" ? "Answer" : "Hang up"}
                className={`h-10 w-10 rounded-full flex items-center justify-center shadow-lg ${
                  phase === "ringing"
                    ? "bg-emerald-500 hover:bg-emerald-400"
                    : "bg-red-500 hover:bg-red-400"
                }`}
              >
                {phase === "ringing" ? (
                  <Phone className="h-4 w-4 text-white" />
                ) : (
                  <PhoneOff className="h-4 w-4 text-white" />
                )}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function NumberRow({
  areaCode,
  rest,
  label,
  tone = "blue",
}: {
  areaCode: string
  rest: string
  label: string
  tone?: "blue" | "violet"
}) {
  const toneClass =
    tone === "blue"
      ? "bg-[#3B82F6]/10 text-[#1D4ED8] border-[#3B82F6]/20"
      : "bg-violet-100 text-violet-700 border-violet-200"
  return (
    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5">
      <Phone className="h-3 w-3 text-slate-400" />
      <span className="font-mono text-[10.5px] text-[#0F2A4A] flex-1">
        {areaCode} {rest}
      </span>
      <span
        className={`text-[8.5px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded border ${toneClass}`}
      >
        {label}
      </span>
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
   Phone-screen carousel (pattern unique to Voice)
─────────────────────────────────────────────────────────────── */

function PhoneScreenCard({
  num,
  title,
  body,
  screen,
}: {
  num: string
  title: string
  body: string
  screen: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center group">
      {/* Phone frame */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(closest-side, rgba(96,165,250,0.45), transparent 70%)",
          }}
        />
        <div className="relative w-[200px] h-[380px] rounded-[28px] border-[6px] border-slate-900 bg-white shadow-[0_25px_50px_-20px_rgba(15,42,74,0.4)] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-slate-900 z-10" />
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-4 pt-2 text-[9px] font-medium text-slate-600">
            <span>9:41</span>
            <div className="flex items-center gap-0.5">
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1 w-1 rounded-full bg-slate-400" />
              <span className="h-1.5 w-2 rounded-sm bg-slate-500" />
            </div>
          </div>
          {/* Screen content */}
          <div className="absolute inset-0 pt-7 pb-2 px-2">{screen}</div>
        </div>
      </div>

      {/* Title + body */}
      <div className="mt-6 max-w-[240px]">
        <div className="inline-flex items-center gap-1.5 mb-2">
          <span className="text-[10px] font-mono text-slate-400">/ {num}</span>
          <span className="h-px w-4 bg-slate-300" />
        </div>
        <h3 className="text-base font-semibold text-[#0F2A4A] leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-[12.5px] text-slate-500 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  )
}

function ScreenInboundCall() {
  return (
    <div className="h-full flex flex-col items-center justify-between bg-gradient-to-b from-[#0F2A4A] to-[#1D4ED8] rounded-2xl -mx-1.5 p-3 text-white">
      <div className="flex flex-col items-center pt-4">
        <div className="relative h-14 w-14 rounded-full bg-white/15 backdrop-blur flex items-center justify-center mb-3">
          <PhoneIncoming className="h-6 w-6 text-white animate-pulse" />
          <motion.span
            className="absolute inset-0 rounded-full border border-white/40"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
        <p className="text-[9px] uppercase tracking-wider text-white/60">
          Incoming
        </p>
        <p className="mt-1 text-sm font-semibold tracking-tight">
          (415) 555-0142
        </p>
        <p className="text-[10px] text-white/70 mt-0.5">Jessica Chen</p>
      </div>
      <div className="flex items-center gap-4 pb-1">
        <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
          <PhoneOff className="h-4 w-4 text-white" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
        >
          <Phone className="h-4 w-4 text-white" />
        </motion.div>
      </div>
    </div>
  )
}

function ScreenClickToCall() {
  const contacts = [
    { name: "Jessica Chen", num: "(415) 555-0142", img: 47, active: true },
    { name: "Marcus Williams", num: "(212) 555-9981", img: 12 },
    { name: "Ashley Rodriguez", num: "(310) 555-7740", img: 44 },
    { name: "Tyler Brooks", num: "(617) 555-3322", img: 15 },
  ]
  return (
    <div className="h-full flex flex-col bg-slate-50 rounded-2xl -mx-1.5 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 bg-white">
        <p className="text-[10px] font-semibold text-[#0F2A4A]">Contacts</p>
      </div>
      <div className="flex-1 px-2 py-2 space-y-1.5">
        {contacts.map((c) => (
          <div
            key={c.name}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
              c.active ? "bg-white shadow-sm" : ""
            }`}
          >
            <img
              src={`https://i.pravatar.cc/40?img=${c.img}`}
              alt=""
              className="h-7 w-7 rounded-full object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
                {c.name}
              </p>
              <p className="font-mono text-[9px] text-slate-500">{c.num}</p>
            </div>
            <motion.button
              animate={c.active ? { scale: [1, 1.1, 1] } : {}}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className={`h-7 w-7 rounded-full flex items-center justify-center ${
                c.active
                  ? "bg-emerald-500 shadow-md shadow-emerald-500/40"
                  : "bg-slate-200"
              }`}
            >
              <Phone
                className={`h-3 w-3 ${
                  c.active ? "text-white" : "text-slate-500"
                }`}
              />
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenNumberPicker() {
  const numbers = [
    { code: "(212)", type: "Local · NYC", price: "$5", active: true },
    { code: "(415)", type: "Local · SF", price: "$5" },
    { code: "(800)", type: "Toll-free", price: "$15", tone: "violet" },
    { code: "(310)", type: "Local · LA", price: "$5" },
  ]
  return (
    <div className="h-full flex flex-col bg-slate-50 rounded-2xl -mx-1.5 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 bg-white">
        <p className="text-[10px] font-semibold text-[#0F2A4A]">Pick a number</p>
      </div>
      <div className="flex-1 px-2 py-2 space-y-1.5">
        {numbers.map((n) => (
          <div
            key={n.code + n.type}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 border ${
              n.active
                ? "border-[#3B82F6] bg-[#3B82F6]/5"
                : "border-transparent bg-white"
            }`}
          >
            <div
              className={`h-6 w-6 rounded-md flex items-center justify-center ${
                n.tone === "violet"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-[#3B82F6]/10 text-[#1D4ED8]"
              }`}
            >
              <Phone className="h-3 w-3" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] font-semibold text-[#0F2A4A]">
                {n.code}
              </p>
              <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">
                {n.type}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-[#0F2A4A]">
              {n.price}
              <span className="text-[8px] text-slate-400">/mo</span>
            </span>
            {n.active ? (
              <Check className="h-3 w-3 text-[#1D4ED8]" strokeWidth={3} />
            ) : (
              <ChevronRight className="h-3 w-3 text-slate-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenMinutesMeter() {
  return (
    <div className="h-full flex flex-col bg-slate-50 rounded-2xl -mx-1.5 overflow-hidden">
      <div className="px-3 py-2 border-b border-slate-200 bg-white">
        <p className="text-[10px] font-semibold text-[#0F2A4A]">
          Minutes · This month
        </p>
      </div>
      <div className="flex-1 px-3 py-4 flex flex-col items-center justify-center">
        {/* Circular progress */}
        <div className="relative h-24 w-24">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#minutes-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              whileInView={{
                strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.684),
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="minutes-gradient">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-base font-bold text-[#0F2A4A] leading-none">
              342
            </p>
            <p className="text-[9px] text-slate-500">of 500</p>
          </div>
        </div>
        <p className="mt-3 text-[10px] uppercase tracking-wider font-medium text-[#1D4ED8]">
          Growth plan
        </p>
        <div className="mt-3 w-full space-y-1">
          {[
            { label: "Inbound", val: "182m" },
            { label: "Outbound", val: "160m" },
            { label: "Overage", val: "$0.008/min" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-[9.5px]"
            >
              <span className="text-slate-500">{s.label}</span>
              <span className="font-semibold text-[#0F2A4A]">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ items — preserved
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can I record calls?",
    answer:
      "No. FloatChat voice does not have native call recording. Compliance-heavy use cases should keep their existing telephony.",
  },
  {
    question: "Do you support international calling?",
    answer:
      "Outbound to US and Canada is supported at $0.008-0.012/min. Other countries are not supported on FloatChat.",
  },
  {
    question: "Is my voice data sent to AI for transcription?",
    answer: "No. There is no AI transcription on FloatChat voice.",
  },
  {
    question:
      "Do I need a separate phone number from my main business line?",
    answer:
      "Yes. FloatChat voice numbers are for the support inbox. They don't replace your main company phone number unless you want them to.",
  },
]

const notAvailable = [
  "No IVR menus",
  "No voicemail",
  "No call recording",
  "No call queues or hold music",
  "No AI voice bot or call transcription",
]

const rightFor = [
  "Small B2B sales teams doing click-to-call follow-up",
  "D2C brands that get occasional support calls",
  "Healthcare clinics that take patient calls (HIPAA on Enterprise)",
  "Service businesses with one main phone line",
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function VoicePage() {
  useEffect(() => {
    document.title =
      "Voice Calls in Your Support Inbox. Numbers from $5 | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "US local + toll-free numbers from $5/month. Outbound at $0.008/min. Twilio retail charges $0.013. Basic calling, no PBX features.",
      )
  }, [])

  return (
    <>
      <Header />
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Voice · numbers and minutes inside your inbox
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Voice numbers from{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    $5.
                  </span>{" "}
                  Outbound at $0.008.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Inbound and outbound calling inside your support inbox. Twilio
                  retail charges $0.013/min outbound. We don't.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "$5/mo local DID",
                    "$15/mo toll-free",
                    "$0.008 outbound",
                    "30–40% below Twilio retail",
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
                      Add Voice
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
                  Voice unlocks on Starter ($19.99/month). Numbers and minutes
                  priced separately.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <SoftphoneMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT VOICE IS — phone screen carousel ───── */}
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
            <div className="max-w-3xl mb-16">
              <BlurFade>
                <SectionEyebrow num="01" label="What voice is" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What FloatChat voice is.
                </h2>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
              <BlurFade delay={0.05}>
                <PhoneScreenCard
                  num="01"
                  title="Inbound calls land in your inbox."
                  body="Customer dials your number. Call rings to an available agent. Agent picks up, talks, logs notes."
                  screen={<ScreenInboundCall />}
                />
              </BlurFade>
              <BlurFade delay={0.12}>
                <PhoneScreenCard
                  num="02"
                  title="Click-to-call from any contact."
                  body="See a contact, click the call button, agent's headset rings the customer. No dialer app needed."
                  screen={<ScreenClickToCall />}
                />
              </BlurFade>
              <BlurFade delay={0.19}>
                <PhoneScreenCard
                  num="03"
                  title="US local + toll-free + virtual mobile."
                  body="Pick the number type your customers expect. All US area codes available."
                  screen={<ScreenNumberPicker />}
                />
              </BlurFade>
              <BlurFade delay={0.26}>
                <PhoneScreenCard
                  num="04"
                  title="Bundled minutes per plan."
                  body="Growth: 500 free min/month. Pro: 2,000. Enterprise: 10,000. Pay overage at $0.008/min."
                  screen={<ScreenMinutesMeter />}
                />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT VOICE IS NOT — dark callout ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="The honest list" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What voice is{" "}
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    NOT.
                  </span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  For full PBX features, keep your existing telephony or use
                  RingCentral/Dialpad alongside FloatChat.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0F2A4A] via-[#1E1B4B] to-[#1F2937] p-7 lg:p-9 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(15,42,74,0.5)]">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 bg-red-500" />
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20 bg-rose-400" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-red-300 mb-5">
                      Not included
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {notAvailable.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-0.5 h-5 w-5 rounded-full bg-red-500/15 border border-red-400/40 flex items-center justify-center shrink-0">
                            <X className="h-3 w-3 text-red-300" strokeWidth={3} />
                          </span>
                          <span className="text-sm text-white/85 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RATE COMPARISON ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Apples-to-apples" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Rate{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    comparison.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Numbers from each vendor's published telecom retail pricing.
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
                            Local DID
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Toll-free
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Outbound US
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Inbound
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Twilio",
                            local: "~$5",
                            toll: "~$15",
                            out: "$0.013",
                            inb: "$0.0085",
                          },
                          {
                            name: "RingCentral Engage",
                            local: "$24.99",
                            toll: "$24.99",
                            out: "$0.020+",
                            inb: "$0.020+",
                          },
                        ].map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 hover:bg-slate-50/40 transition-colors"
                          >
                            <td className="p-4 font-medium text-[#0F2A4A]">
                              {row.name}
                            </td>
                            <td className="p-4 text-slate-500">{row.local}</td>
                            <td className="p-4 text-slate-500">{row.toll}</td>
                            <td className="p-4 text-slate-500">{row.out}</td>
                            <td className="p-4 text-slate-500">{row.inb}</td>
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
                            $5
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $15
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $0.008
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-semibold">
                            $0.005
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              {/* Pull-quote */}
              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Savings
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      80<span className="text-3xl lg:text-4xl text-white/70">%</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Savings on number rental vs RingCentral.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Wholesale telecom rates, passed through
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHO VOICE IS FOR ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="04" label="Right fit" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Who voice is{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    right for.
                  </span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Designed for teams that want calling inside their support inbox
                  — not a full enterprise PBX.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-5">
                    {rightFor.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="flex items-start gap-2.5"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm shadow-[#3B82F6]/40">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-[#0F2A4A] leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 flex items-start gap-2.5">
                    <Star className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[12.5px] text-amber-900 leading-relaxed">
                      <span className="font-semibold">Not a fit for:</span>{" "}
                      enterprise contact centers needing IVR, call queues, recording
                      compliance, or AI voice agents.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Add a US phone number from $5"
          body="Inbound and outbound on a number you pick. Native to your inbox."
          primaryLabel="Add Voice"
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
              description="Numbers, minutes, recording — straight answers."
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
                  Number provisioning in seconds
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">live in 5 min</span>
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
                  Ready to dial
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Get a number in{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  5 minutes.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                $19.99/month plan + $5/month for a US local DID.
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
                  Add Voice to Starter
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
                "$5/mo local DID",
                "$0.008/min outbound",
                "30–40% below Twilio",
                "DigitalOcean NYC3",
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
