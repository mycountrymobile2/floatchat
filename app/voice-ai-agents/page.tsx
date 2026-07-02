"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  PhoneCall,
  PhoneOutgoing,
  PhoneForwarded,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Mic,
  AudioLines,
  Volume2,
  Brain,
  Languages,
  Clock,
  ShieldCheck,
  Inbox,
  FileText,
  BarChart3,
  GitBranch,
  Users,
  Workflow,
  ListChecks,
  Radio,
  Waypoints,
  MessageSquare,
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
  title: "Agentic AI Voice Agent for Inbound and Outbound Calls | FloatChat",
  description:
    "Automate phone calls with an agentic AI voice agent: STT, NLU, TTS, transcription, IVR automation, and routing to live agents. One inbox for voice and chat.",
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
   Animated waveform bars — the signature "voice" motif
─────────────────────────────────────────────────────────────── */

function Waveform({
  active,
  bars = 22,
  className = "",
  color = "#3B82F6",
}: {
  active: boolean
  bars?: number
  className?: string
  color?: string
}) {
  return (
    <div className={`flex items-center gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        // A deterministic pseudo-random height profile so bars differ.
        const base = 5 + ((i * 37) % 17)
        const peak = 10 + ((i * 53) % 26)
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full"
            style={{ background: color }}
            animate={
              active
                ? { height: [base, peak, base * 0.7, peak * 0.85, base] }
                : { height: base * 0.6 }
            }
            transition={
              active
                ? {
                    duration: 1.1 + (i % 5) * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.05,
                  }
                : { duration: 0.3 }
            }
          />
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO VISUAL — a live AI voice-agent call surface.
   Cycles: caller speaks → STT → NLU → TTS reply (waveform)
   → transcript streams → a hard call branches to a live agent.
   This is the AI voice agent HANDLING the call itself — distinct
   from a human click-to-call dialer panel.
─────────────────────────────────────────────────────────────── */

type PipeStage = "listen" | "understand" | "speak" | "route"

const pipeMeta: Record<
  PipeStage,
  { label: string; sub: string; Icon: typeof Mic; caller: boolean }
> = {
  listen: { label: "STT", sub: "Transcribing speech", Icon: Mic, caller: true },
  understand: { label: "NLU", sub: "Understanding intent", Icon: Brain, caller: false },
  speak: { label: "TTS", sub: "Speaking reply", Icon: Volume2, caller: false },
  route: { label: "Route", sub: "Live agent branch", Icon: PhoneForwarded, caller: false },
}

type TranscriptLine = { who: "caller" | "ai"; text: string; stage: PipeStage }

const transcript: TranscriptLine[] = [
  { who: "caller", text: "Hi, I need to reschedule my delivery for order 4471.", stage: "listen" },
  { who: "ai", text: "Sure — I can see order 4471 is out for delivery tomorrow.", stage: "understand" },
  { who: "ai", text: "I can move it to Friday morning. Does 9–11am work for you?", stage: "speak" },
  { who: "caller", text: "Actually, I also have a billing dispute I want to raise.", stage: "listen" },
  { who: "ai", text: "That needs a specialist — connecting you now with your context.", stage: "route" },
]

function VoiceCallVisual() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < transcript.length; i++) {
          if (cancelled) return
          setStep(i)
          await wait(i === transcript.length - 1 ? 3200 : 2100)
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const current = transcript[step]
  const stage = current.stage
  const routing = stage === "route"
  const callerSpeaking = current.who === "caller"

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

      {/* Floating "live call" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Live call · AI voice agent
        </span>
      </motion.div>

      {/* Floating one-inbox chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Inbox className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Lands in one inbox
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
            app.floatchat.com · voice-agent
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <Clock className="h-2.5 w-2.5" />
            00:38
          </span>
        </div>

        {/* Caller strip + live waveform */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
              <PhoneCall className="h-4 w-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight">
              +1 (415) 555-0148
            </p>
            <p className="text-[9.5px] text-slate-500">Inbound · returning caller</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <span className="text-[8.5px] uppercase tracking-wider text-slate-400 font-medium">
              {callerSpeaking ? "Caller speaking" : "Agent speaking"}
            </span>
            <Waveform
              active
              bars={16}
              color={callerSpeaking ? "#94A3B8" : "#3B82F6"}
              className="h-5"
            />
          </div>
        </div>

        {/* STT → NLU → TTS → Route pipeline strip */}
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center justify-between gap-1">
            {(["listen", "understand", "speak", "route"] as PipeStage[]).map(
              (s, i) => {
                const meta = pipeMeta[s]
                const isActive = stage === s
                const idx = ["listen", "understand", "speak", "route"].indexOf(stage)
                const isDone = i < idx
                return (
                  <div key={s} className="flex items-center gap-1 flex-1 last:flex-none">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.04 : 1,
                        borderColor: isActive
                          ? "rgba(59,130,246,0.5)"
                          : isDone
                          ? "rgba(16,185,129,0.4)"
                          : "rgba(226,232,240,1)",
                        backgroundColor: isActive
                          ? "rgba(234,242,255,1)"
                          : "rgba(255,255,255,1)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-1 rounded-lg border px-2 py-1.5 w-full"
                    >
                      <div
                        className={`h-6 w-6 rounded-md flex items-center justify-center ${
                          isActive
                            ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white"
                            : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-3 w-3" strokeWidth={3} />
                        ) : (
                          <meta.Icon className="h-3 w-3" />
                        )}
                      </div>
                      <span
                        className={`text-[9px] font-semibold ${
                          isActive
                            ? "text-[#1D4ED8]"
                            : isDone
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {meta.label}
                      </span>
                    </motion.div>
                    {i < 3 && (
                      <ArrowRight
                        className={`h-3 w-3 shrink-0 ${
                          i < idx ? "text-emerald-400" : "text-slate-300"
                        }`}
                      />
                    )}
                  </div>
                )
              }
            )}
          </div>
          <p className="mt-2 h-3.5 leading-[14px] text-center text-[9.5px] text-slate-500 truncate">
            {pipeMeta[stage].sub}
          </p>
        </div>

        {/* Streaming transcript — fixed height, bottom-anchored, clipped so
            the card never changes size as lines stream in (no layout jerk). */}
        <div className="relative h-[196px] px-4 py-3 bg-white flex flex-col">
          <div className="flex items-center gap-1.5 mb-2 shrink-0">
            <FileText className="h-3 w-3 text-slate-400" />
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
              Real-time transcript
            </span>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col justify-end space-y-1.5">
            <AnimatePresence initial={false}>
              {transcript.slice(0, step + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${line.who === "caller" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[11px] leading-snug ${
                      line.who === "caller"
                        ? "bg-slate-100 text-[#0F2A4A] rounded-bl-sm"
                        : "bg-[#3B82F6] text-white rounded-br-sm"
                    }`}
                  >
                    <span className="block text-[8px] uppercase tracking-wide opacity-60 mb-0.5">
                      {line.who === "caller" ? "Caller" : "AI voice agent"}
                    </span>
                    {line.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Route-to-live-agent branch — absolute overlay pinned to the
              transcript's bottom edge, so it never resizes the card. */}
          <AnimatePresence>
            {routing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-slate-50/95 backdrop-blur-sm px-4 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5 text-slate-700" />
                  <span className="text-[10px] font-semibold text-slate-800">
                    Routed to live agent · Priya N.
                  </span>
                  <img
                    src="https://i.pravatar.cc/40?img=45"
                    alt="Priya N."
                    loading="lazy"
                    className="ml-auto h-5 w-5 rounded-full object-cover ring-2 ring-white"
                  />
                </div>
                <p className="mt-1 text-[9.5px] text-slate-900 leading-snug">
                  Warm transfer with transcript, intent, and account context —
                  no repeated verification.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer status bar */}
        <div className="border-t border-slate-200 bg-white px-3 py-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#EAF2FF] px-2 py-1 text-[9px] font-medium text-[#1D4ED8]">
            <Radio className="h-2.5 w-2.5" /> Recording
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-600">
            <Languages className="h-2.5 w-2.5" /> Auto · EN
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[9px] font-medium text-emerald-700">
            <CheckCircle2 className="h-2.5 w-2.5" /> Summary on hangup
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function InboundVisual() {
  const rows = [
    { label: "Order status", note: "resolved", ok: true },
    { label: "Reschedule delivery", note: "resolved", ok: true },
    { label: "Reset password", note: "resolved", ok: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[9.5px] font-semibold text-[#0F2A4A]">
          <PhoneCall className="h-3 w-3 text-[#1D4ED8]" /> Inbound queue
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          answered in &lt;1 ring
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <Mic className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <span className="ml-auto text-[9px] text-emerald-600 font-medium">{r.note}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function OutboundVisual() {
  const steps = [
    { label: "Payment reminders", pct: 100 },
    { label: "Appointment confirms", pct: 72 },
    { label: "Renewal outreach", pct: 41 },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2.5">
      <div className="flex items-center gap-1.5">
        <PhoneOutgoing className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Outbound campaign
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">live dialing</span>
      </div>
      {steps.map((s) => (
        <div key={s.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
            <span className="text-[9px] font-medium text-[#1D4ED8] tabular-nums">
              {s.pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
              initial={{ width: 0 }}
              whileInView={{ width: `${s.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function IvrRoutingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Waypoints className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Intent-based routing
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">no phone tree</span>
      </div>
      <div className="rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1 text-[10px] text-[#0F2A4A] mb-2 flex items-center gap-1.5">
        <Brain className="h-3 w-3 text-[#1D4ED8] shrink-0" />
        &quot;I think my invoice is wrong&quot;
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Billing", Icon: FileText, hot: true },
          { label: "Support", Icon: PhoneCall, hot: false },
          { label: "Sales", Icon: Users, hot: false },
        ].map((q) => (
          <div
            key={q.label}
            className={`rounded-md border px-1.5 py-1.5 flex flex-col items-center gap-1 ${
              q.hot
                ? "border-emerald-300 bg-emerald-50/70"
                : "border-slate-200 bg-slate-50/40"
            }`}
          >
            <q.Icon
              className={`h-3.5 w-3.5 ${q.hot ? "text-emerald-600" : "text-slate-400"}`}
            />
            <span
              className={`text-[8.5px] font-medium ${
                q.hot ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              {q.label}
            </span>
            {q.hot && (
              <PhoneForwarded className="h-2.5 w-2.5 text-emerald-600" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <BarChart3 className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Call summary
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700">
          <CheckCircle2 className="h-2.5 w-2.5" /> positive
        </span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <p className="text-[9.5px] text-[#0F2A4A] leading-snug">
          Caller rescheduled delivery to Friday and raised a billing dispute,
          transferred to Priya.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { k: "Duration", v: "1m 12s" },
          { k: "Sentiment", v: "0.82" },
          { k: "Intent", v: "Reschedule" },
          { k: "Outcome", v: "Resolved" },
        ].map((m) => (
          <div
            key={m.k}
            className="rounded-md border border-slate-200 bg-white px-2 py-1 flex items-center justify-between"
          >
            <span className="text-[8.5px] text-slate-500">{m.k}</span>
            <span className="text-[9px] font-semibold text-[#1D4ED8]">{m.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data
─────────────────────────────────────────────────────────────── */

const results = [
  { Icon: AudioLines, value: "Natural", label: "voice conversations, not menus" },
  { Icon: Waypoints, value: "Dynamic", label: "routing by real caller intent" },
  { Icon: FileText, value: "100%", label: "calls transcribed & summarized" },
  { Icon: Languages, value: "100+", label: "languages, auto-detected" },
]

const capabilities = [
  {
    Icon: PhoneCall,
    title: "Inbound call automation.",
    body:
      "The voice agent answers on the first ring, understands what the caller needs, and resolves routine requests — order status, rescheduling, resets, FAQs — end to end, 24/7, with zero hold music.",
    visual: <InboundVisual />,
  },
  {
    Icon: PhoneOutgoing,
    title: "Outbound campaigns.",
    body:
      "Launch proactive voice campaigns for reminders, confirmations, and renewals. The agent dials, holds a natural conversation, captures the response, and books the follow-up — at a scale a human dialer team can't match.",
    visual: <OutboundVisual />,
  },
  {
    Icon: Waypoints,
    title: "IVR automation + routing.",
    body:
      "Replace the rigid phone tree. The agent listens to the caller's actual words, classifies intent, manages voice queues, and routes to the right live agent — with everything it has already gathered attached.",
    visual: <IvrRoutingVisual />,
  },
  {
    Icon: BarChart3,
    title: "Transcription + analytics.",
    body:
      "Every call is transcribed, summarized, sentiment-scored, and recorded — dropped into the same inbox as your chat conversations so nothing lives in a separate silo you never open.",
    visual: <AnalyticsVisual />,
  },
]

const pipeline = [
  {
    Icon: Mic,
    tag: "STT",
    title: "Speech-to-text",
    body:
      "Streaming transcription turns the caller's speech into text in real time — accurately, across accents and 100+ languages, even over noisy lines.",
  },
  {
    Icon: Brain,
    tag: "NLU",
    title: "Natural-language understanding",
    body:
      "The same agentic reasoning that powers your chat agents interprets intent, pulls live data from your connected systems, and decides the next action.",
  },
  {
    Icon: Volume2,
    tag: "TTS",
    title: "Text-to-speech",
    body:
      "A natural, low-latency voice speaks the reply back — human-like back-and-forth with barge-in, so callers can interrupt and be understood.",
  },
  {
    Icon: PhoneForwarded,
    tag: "Route",
    title: "Route to a live agent",
    body:
      "When a call needs a person, it warm-transfers with the transcript, intent, and account context — so the human never starts from a cold hello.",
  },
]

const whyPoints = [
  {
    Icon: Sparkles,
    title: "One brain across every channel.",
    body:
      "The voice agent runs on the same agentic AI, business data, and guardrails as your chat agents. A caller and a chatter get the same answer — because it's the same agent underneath.",
  },
  {
    Icon: Inbox,
    title: "One inbox for voice and chat.",
    body:
      "A handled call lands beside your WhatsApp, SMS, and email threads. A follow-up message picks up exactly where the call ended, with the transcript already attached.",
  },
  {
    Icon: ShieldCheck,
    title: "Guardrails, recording, and grounding.",
    body:
      "It answers from your knowledge base, records and logs every call, and stays inside the boundaries you set — so automation never means losing control or compliance.",
  },
  {
    Icon: Workflow,
    title: "Live today, agentic on the roadmap.",
    body:
      "Voice calling, IVR, transcription, and routing are live now. The autonomous AI voice agent layers on top of the same platform — no rip-and-replace when it arrives.",
  },
]

const relatedLinks = [
  {
    to: "/channels/voice",
    Icon: Phone,
    title: "Voice channel",
    body: "The human click-to-call panel your agents use for live calls.",
  },
  {
    to: "/numbers/did",
    Icon: PhoneForwarded,
    title: "Phone numbers (DID)",
    body: "Provision local and toll-free numbers for inbound and outbound.",
  },
  {
    to: "/agentic-ai",
    Icon: Brain,
    title: "Agentic AI",
    body: "The reasoning engine behind every FloatChat agent.",
  },
  {
    to: "/ai-agents",
    Icon: Sparkles,
    title: "AI agents",
    body: "The full family of agents — support, sales, booking, and more.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel inbox",
    body: "Where voice calls land next to every chat channel.",
  },
  {
    to: "/industry/telecom",
    Icon: Radio,
    title: "Telecom",
    body: "Voice AI built for high-volume telecom operations.",
  },
]

const faqs: FAQItem[] = [
  {
    question: "What is an agentic AI voice agent?",
    answer:
      "It's an AI that handles phone calls the way a capable person would: it hears the caller (speech-to-text), understands what they actually need (natural-language understanding), takes real actions against your connected systems, and speaks a natural reply back (text-to-speech). Because it's agentic, it resolves multi-step requests on its own instead of reading from a rigid script — and it hands off to a human the moment a call needs one.",
  },
  {
    question: "How is this different from the /channels/voice panel?",
    answer:
      "The voice channel is a human surface — a click-to-call panel your live agents use to make and take calls themselves. This page is about the AI voice agent that handles the call for you: it answers, converses, resolves, and only routes to that human panel when the conversation genuinely needs a person. One is a tool your team uses; the other is an agent that works alongside them.",
  },
  {
    question: "Does it handle both inbound and outbound calls?",
    answer:
      "Yes. Inbound, the agent answers immediately, resolves routine requests, and routes the rest with context. Outbound, it runs proactive campaigns — payment reminders, appointment confirmations, renewal outreach — dialing, holding a natural conversation, capturing the response, and booking any follow-up.",
  },
  {
    question: "What languages does the voice agent support?",
    answer:
      "Over 100, detected automatically. A caller can speak Spanish, Portuguese, or Arabic and get an accurate, grounded answer in the same language — so you can cover global markets without staffing a call center for each one.",
  },
  {
    question: "Does it route to a human agent?",
    answer:
      "Yes, with full context. When a call needs a specialist, the agent warm-transfers to a live agent and passes along the transcript, the detected intent, and the caller's account context — so there are no repeated security questions and no starting over.",
  },
  {
    question: "Are calls logged, transcribed, and summarized?",
    answer:
      "Every call is transcribed in real time, recorded, sentiment-scored, and summarized on hangup — then dropped into the same shared inbox as your WhatsApp, SMS, and email conversations, so voice isn't stuck in a silo you never open.",
  },
  {
    question: "Is the AI voice agent live today?",
    answer:
      "Voice calling, IVR automation, transcription, and routing to live agents are live now. The fully autonomous AI voice bot is a roadmap addition built on the same platform, data, and guardrails — so adopting voice today means you're already set up for it.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI Voice Agent",
  serviceType: "AI voice agent for inbound and outbound calls",
  description:
    "An agentic AI voice agent that automates phone calls with speech-to-text, natural-language understanding, text-to-speech, transcription, IVR automation, and routing to live agents — with voice and chat in one inbox.",
  url: "https://www.floatchat.com/voice-ai-agents",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Contact center, support, and telecom teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function VoiceAiAgentsPage() {
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
                  <AudioLines className="h-3.5 w-3.5" />
                  AI Voice Agent · voice that understands, not a phone tree
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  An agentic AI voice agent that{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    handles the call.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Natural voice conversations that resolve inbound and outbound
                  calls — speech-to-text, understanding, and text-to-speech — and
                  route the rest to a live agent with context already gathered.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Inbound + outbound",
                    "STT · NLU · TTS",
                    "Transcribed & summarized",
                    "Routes with context",
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
                  Voice that understands, not a phone tree — one inbox for voice
                  and chat.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <VoiceCallVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {results.map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
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
                  Phone queues burn time on both sides.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Callers wait on hold, press 1, press 2, and repeat themselves
                    to three different people. Meanwhile your agents spend their
                    day on the same routine calls — order status, rescheduling,
                    resets — that never needed a human in the first place.
                  </p>
                  <p>
                    Legacy IVR made it worse, not better. A rigid phone tree
                    frustrates the caller, mis-routes the ones with real problems,
                    and still can&apos;t resolve anything on its own.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI voice agent
                    </span>{" "}
                    answers naturally, resolves what it can, and routes the rest
                    with the context already gathered — so the human who picks up
                    starts halfway to done.
                  </p>
                </div>
              </BlurFade>

              {/* phone tree vs voice agent */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A phone tree
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Press 1, press 2, still on hold",
                        "Mis-routes real problems",
                        "Resolves nothing on its own",
                        "Caller repeats the story each transfer",
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
                      A voice agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Natural back-and-forth, answered instantly",
                        "Routes by real intent",
                        "Resolves routine calls end to end",
                        "Warm transfer with full context",
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
                  Four jobs, one voice agent.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Inbound and outbound calling, intent-based routing, and
                  transcription — all grounded in your business and logged in one
                  inbox.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {capabilities.map((f, i) => (
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

        {/* ───── HOW IT WORKS · PIPELINE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Every call runs the same pipeline.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Speech in, understanding in the middle, natural speech out — and
                  a clean handoff whenever a human is the right answer.
                </p>
              </BlurFade>
            </div>

            {/* live waveform divider */}
            <BlurFade delay={0.1}>
              <div className="mb-10 rounded-2xl border border-slate-200 bg-white px-5 py-4 flex items-center gap-4 shadow-[0_15px_30px_-20px_rgba(15,42,74,0.25)]">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1D4ED8] shrink-0">
                  <AudioLines className="h-4 w-4" /> Live audio
                </span>
                <Waveform active bars={40} className="h-8 flex-1 justify-between" />
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 shrink-0">
                  <CheckCircle2 className="h-4 w-4" /> &lt;300ms latency
                </span>
              </div>
            </BlurFade>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {pipeline.map((p, i) => (
                <BlurFade key={p.tag} delay={0.05 + i * 0.08} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <span className="absolute top-5 right-5 font-mono text-[10px] uppercase tracking-wider text-slate-300">
                      0{i + 1}
                    </span>
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <p.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <span className="mt-4 inline-flex items-center rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      {p.tag}
                    </span>
                    <h3 className="mt-2 text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-5">
                <BlurFade>
                  <SectionEyebrow num="04" label="Why FloatChat" />
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                    Voice, on the same platform as everything else.
                  </h2>
                  <p className="mt-5 text-base text-slate-500 leading-relaxed max-w-md">
                    The voice agent isn&apos;t a bolt-on. It shares the same agentic
                    AI, business data, and guardrails as your chat agents — so the
                    experience stays consistent across every channel a customer
                    reaches you on.
                  </p>
                  <div className="mt-7 rounded-2xl border border-[#3B82F6]/20 bg-[#EAF2FF] p-4 flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[13px] text-[#0F2A4A] leading-relaxed">
                      A call ends, a WhatsApp follows — and it picks up right where
                      the call left off, transcript attached. One inbox for voice
                      and chat.
                    </p>
                  </div>
                </BlurFade>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  {whyPoints.map((w, i) => (
                    <BlurFade key={w.title} delay={0.05 + i * 0.08} className="h-full">
                      <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                          <w.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                        </div>
                        <h3 className="mt-4 text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                          {w.title}
                        </h3>
                        <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                          {w.body}
                        </p>
                      </div>
                    </BlurFade>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Put an AI voice agent on your phone lines."
          body="Automate inbound and outbound calls with STT, NLU, TTS, and full-context routing — voice and chat in one inbox."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything the voice agent connects to.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((r, i) => (
                <BlurFade key={r.to} delay={0.04 + i * 0.06} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.3)] transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0 group-hover:bg-[#3B82F6]/15 transition-colors">
                      <r.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F2A4A] flex items-center gap-1">
                        {r.title}
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </p>
                      <p className="mt-1 text-[12.5px] text-slate-500 leading-snug">
                        {r.body}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-slate-400">More:</span>
                {[
                  { to: "/integrations", label: "Integrations" },
                  { to: "/pricing", label: "Pricing" },
                  { to: "/contact", label: "Contact sales" },
                  { to: "/demo", label: "Book a demo" },
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
              title="Voice AI agent questions"
              description="What an agentic AI voice agent does — and how it fits your phone lines."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#0F2A4A] via-[#123258] to-[#1D4ED8]">
          <div
            className="absolute inset-0 -z-10 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 90%)",
            }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,165,250,0.7), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 mb-6">
                <AudioLines className="h-3.5 w-3.5" />
                Automate your phone calls with agentic AI
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                Let an AI voice agent pick up the next call.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
                Resolve inbound and outbound calls with natural conversation,
                transcribe and summarize every one, and route the rest to your
                team with context already in hand.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-[15px] font-semibold text-[#1D4ED8] bg-white hover:bg-blue-50 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-all"
                >
                  Start Free
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full text-[15px] font-medium border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-blue-100/70">
                {[
                  "Inbound + outbound",
                  "100+ languages",
                  "One inbox for voice and chat",
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
