"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Mic,
  MicOff,
  StickyNote,
  Clock,
  ShieldCheck,
  Users,
  Inbox,
  GitBranch,
  MessageSquare,
  MessageCircle,
  Workflow,
  ListChecks,
  Hash,
  Voicemail,
  UserRound,
  History,
  Layers,
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
  title: "Voice Calling in Your Agentic AI Inbox | FloatChat",
  description:
    "Make and receive calls inside the same inbox as your chats, with click-to-call and notes tied to each customer, on one agentic AI platform.",
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
   HERO MOCKUP — a live voice-call panel INSIDE the shared inbox.
   The left rail shows the customer record + prior chat history;
   the right panel is a live call (caller, ringing → connected
   timer, mute/notes controls, a note being typed). It cycles:
   idle click-to-call → ringing → connected + note → wrapped.
─────────────────────────────────────────────────────────────── */

type CallPhase = "idle" | "ringing" | "connected" | "noting" | "wrapped"

function VoiceCallMockup() {
  const [phase, setPhase] = useState<CallPhase>("idle")
  const [seconds, setSeconds] = useState(0)
  const [muted, setMuted] = useState(false)

  // phase machine
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("idle")
        setSeconds(0)
        setMuted(false)
        await wait(1900)
        if (cancelled) return
        setPhase("ringing")
        await wait(1700)
        if (cancelled) return
        setPhase("connected")
        await wait(2600)
        if (cancelled) return
        setMuted(true)
        setPhase("noting")
        await wait(3200)
        if (cancelled) return
        setPhase("wrapped")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  // live timer while the call is up
  useEffect(() => {
    if (phase !== "connected" && phase !== "noting") return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [phase])

  const onCall = phase === "connected" || phase === "noting"
  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`

  const statusLabel =
    phase === "idle"
      ? "Ready to call"
      : phase === "ringing"
      ? "Ringing…"
      : phase === "wrapped"
      ? "Call ended · logged"
      : "On call"

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

      {/* Floating "one inbox" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Inbox className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Same inbox as chat
        </span>
      </motion.div>

      {/* Floating note-logged chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Notes tied to the record
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
            app.floatchat.com · voice
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[452px]">
          {/* Customer record + prior chat history — hidden on phones */}
          <aside className="hidden md:flex md:col-span-5 border-r border-slate-200 bg-slate-50/50 flex-col">
            {/* record header */}
            <div className="px-3 py-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Customer"
                    loading="lazy"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight truncate">
                    Elena Rossi
                  </p>
                  <p className="text-[9.5px] text-slate-500 truncate">
                    Customer · Order #A-4417
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                  <UserRound className="h-2.5 w-2.5" /> record
                </span>
              </div>
              {/* record fields */}
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                <RecordField Icon={Phone} label="+1 (415) 555-0148" />
                <RecordField Icon={SiGmail} label="elena@shopmail.co" brand />
                <RecordField Icon={Hash} label="LTV $2,140" />
                <RecordField Icon={ShieldCheck} label="VIP · since ’22" />
              </div>
            </div>

            {/* prior chat history */}
            <div className="px-3 py-2.5 flex items-center gap-1.5 border-b border-slate-200/70">
              <History className="h-3 w-3 text-slate-400" />
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Prior conversation
              </p>
            </div>
            <div className="flex-1 px-3 py-3 space-y-2 overflow-hidden">
              {/* WhatsApp inbound */}
              <div className="flex justify-start">
                <div className="max-w-[86%]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="h-3 w-3 rounded-[3px] bg-[#25D366] flex items-center justify-center">
                      <SiWhatsapp style={{ color: "#fff", width: 7, height: 7 }} />
                    </span>
                    <span className="text-[8px] text-slate-400">WhatsApp · Tue</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 shadow-sm">
                    <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                      Hi! My order #A-4417 still shows “processing” — is it stuck?
                    </p>
                  </div>
                </div>
              </div>
              {/* agent reply */}
              <div className="flex justify-end">
                <div className="max-w-[86%]">
                  <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 shadow-sm">
                    <p className="text-[10.5px] text-white leading-snug">
                      It cleared payment this morning — I can call you with the
                      exact ship date if that’s easier?
                    </p>
                  </div>
                  <p className="text-[8px] text-slate-400 mt-0.5 text-right">
                    Agent · 2m ago
                  </p>
                </div>
              </div>
              {/* customer accepts call */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[86%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                    Yes please — a quick call works great 🙏
                  </p>
                </div>
              </div>
            </div>

            {/* channel timeline footer */}
            <div className="mt-auto px-3 py-2.5 border-t border-slate-200 flex items-center gap-2">
              <span className="text-[9px] text-slate-400">This thread:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[8.5px] text-slate-600">
                <SiWhatsapp style={{ color: "#25D366", width: 9, height: 9 }} />
                chat
              </span>
              <ArrowRight className="h-2.5 w-2.5 text-slate-300" />
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                <Phone className="h-2.5 w-2.5" />
                voice
              </span>
            </div>
          </aside>

          {/* LIVE CALL PANEL */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-gradient-to-b from-white to-[#F5F8FF]">
            {/* panel header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {onCall ? (
                  <PhoneCall className="h-3.5 w-3.5 text-[#1D4ED8]" />
                ) : phase === "ringing" ? (
                  <PhoneOutgoing className="h-3.5 w-3.5 text-[#1D4ED8]" />
                ) : (
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                )}
                <span className="text-[11px] font-semibold text-[#0F2A4A]">
                  Voice call
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={statusLabel}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.25 }}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium ${
                    onCall
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : phase === "wrapped"
                      ? "bg-slate-100 border-slate-200 text-slate-600"
                      : "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#1D4ED8]"
                  }`}
                >
                  {onCall && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  {statusLabel}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* caller card */}
            <div className="px-5 pt-6 pb-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* pulsing ring while ringing / on call */}
                {(phase === "ringing" || onCall) && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#60A5FA]"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#3B82F6]"
                      animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                    />
                  </>
                )}
                <img
                  src="https://i.pravatar.cc/120?img=32"
                  alt="Elena Rossi"
                  loading="lazy"
                  className="relative h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-md"
                />
                <span
                  className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center ring-2 ring-white ${
                    onCall
                      ? "bg-emerald-500"
                      : phase === "ringing"
                      ? "bg-[#3B82F6]"
                      : phase === "wrapped"
                      ? "bg-slate-400"
                      : "bg-[#1D4ED8]"
                  }`}
                >
                  {phase === "wrapped" ? (
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  ) : (
                    <Phone className="h-3 w-3 text-white" />
                  )}
                </span>
              </div>

              <p className="mt-3 text-[15px] font-semibold text-[#0F2A4A]">
                Elena Rossi
              </p>
              <p className="text-[11px] text-slate-500">+1 (415) 555-0148</p>

              {/* timer / substatus */}
              <div className="mt-2 h-5 flex items-center">
                <AnimatePresence mode="wait">
                  {onCall ? (
                    <motion.span
                      key="timer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[13px] font-semibold text-[#1D4ED8] tabular-nums"
                    >
                      {mmss}
                    </motion.span>
                  ) : phase === "ringing" ? (
                    <motion.span
                      key="dots"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: d * 0.2,
                          }}
                        />
                      ))}
                    </motion.span>
                  ) : phase === "wrapped" ? (
                    <motion.span
                      key="dur"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-slate-500"
                    >
                      Duration {mmss} · saved to timeline
                    </motion.span>
                  ) : (
                    <motion.span
                      key="ready"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-slate-400"
                    >
                      One click to dial from this record
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* live note being typed during the call */}
            <div className="px-4">
              <AnimatePresence>
                {(phase === "noting" || phase === "wrapped") && (
                  <motion.div
                    key="note"
                    initial={{ opacity: 0, y: 8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-[#3B82F6]/25 bg-white px-2.5 py-2 shadow-sm"
                  >
                    <div className="flex items-center gap-1.5">
                      <StickyNote className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Call note · tied to Elena
                      </span>
                      {phase === "wrapped" && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-600">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} /> saved
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[10.5px] text-[#0F2A4A] leading-snug">
                      Confirmed ship date Thu; offered express upgrade — declined.
                      {phase === "noting" && (
                        <motion.span
                          className="inline-block w-1 h-3 -mb-0.5 ml-0.5 bg-[#3B82F6]"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                      )}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* call controls */}
            <div className="mt-auto px-4 py-4 border-t border-slate-200 bg-white/70">
              <div className="flex items-center justify-center gap-3">
                {/* mute */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center border transition-colors ${
                      muted
                        ? "bg-[#0F2A4A] border-[#0F2A4A] text-white"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    {muted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-[8.5px] text-slate-500">
                    {muted ? "Muted" : "Mute"}
                  </span>
                </div>

                {/* main call / hang-up button (click-to-call) */}
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={
                      phase === "idle"
                        ? { scale: [1, 1.06, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg ${
                      onCall || phase === "ringing"
                        ? "bg-slate-500 shadow-slate-500/30"
                        : "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shadow-[#3B82F6]/40"
                    }`}
                  >
                    {onCall || phase === "ringing" ? (
                      <Phone className="h-5 w-5 text-white rotate-[135deg]" />
                    ) : (
                      <PhoneOutgoing className="h-5 w-5 text-white" />
                    )}
                  </motion.div>
                  <span className="text-[8.5px] font-medium text-slate-600">
                    {onCall || phase === "ringing" ? "End" : "Click to call"}
                  </span>
                </div>

                {/* notes */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center border transition-colors ${
                      phase === "noting"
                        ? "bg-[#3B82F6] border-[#3B82F6] text-white"
                        : "bg-white border-slate-200 text-slate-600"
                    }`}
                  >
                    <StickyNote className="h-4 w-4" />
                  </div>
                  <span className="text-[8.5px] text-slate-500">Notes</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function RecordField({
  Icon,
  label,
  brand,
}: {
  Icon: React.ComponentType<{ style?: React.CSSProperties; className?: string }>
  label: string
  brand?: boolean
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-1.5 py-1">
      {brand ? (
        <Icon style={{ color: "#EA4335", width: 10, height: 10 }} />
      ) : (
        <Icon className="h-2.5 w-2.5 text-[#1D4ED8]" />
      )}
      <span className="text-[8.5px] text-slate-600 truncate">{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function InInboxVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", note: "chat", brand: true },
    { Icon: SiGmail, bg: "#EA4335", label: "Email", note: "thread", brand: true },
    { Icon: Phone, bg: "#1D4ED8", label: "Voice", note: "live call", brand: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One shared inbox
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Layers className="h-2.5 w-2.5" /> same thread
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className={`flex items-center gap-2 rounded-md border px-2 py-1 ${
            r.label === "Voice"
              ? "border-[#3B82F6]/30 bg-[#EAF2FF]"
              : "border-slate-200 bg-slate-50/40"
          }`}
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            {r.brand ? (
              <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
            ) : (
              <r.Icon className="h-3 w-3 text-white" />
            )}
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <span className="ml-auto text-[9px] text-slate-500">{r.note}</span>
        </div>
      ))}
    </div>
  )
}

function ClickToCallVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <img
          src="https://i.pravatar.cc/40?img=32"
          alt=""
          loading="lazy"
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-medium text-[#0F2A4A] leading-tight">
            Elena Rossi
          </p>
          <p className="text-[8.5px] text-slate-500 leading-tight">
            +1 (415) 555-0148
          </p>
        </div>
        <button className="ml-auto inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] px-2 py-1 text-[9px] font-semibold text-white shadow-sm">
          <PhoneOutgoing className="h-2.5 w-2.5" />
          Call
        </button>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1.5 flex items-center gap-1.5">
        <PhoneCall className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] text-[#0F2A4A]">
          Dialing from the record — no copy-paste
        </span>
      </div>
    </div>
  )
}

function LoggedNotesVisual() {
  const items = [
    { Icon: PhoneIncoming, label: "Inbound call · 3m 12s", meta: "Mon" },
    { Icon: StickyNote, label: "Note: confirmed refund", meta: "tied to record" },
    { Icon: PhoneOutgoing, label: "Outbound follow-up", meta: "Tue" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Customer timeline
        </span>
        <span className="text-[8.5px] text-slate-400">nothing lost</span>
      </div>
      {items.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-5 w-5 rounded-md bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <s.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] text-[#0F2A4A] truncate">{s.label}</span>
          <span className="ml-auto text-[8.5px] text-slate-400 shrink-0">
            {s.meta}
          </span>
        </div>
      ))}
    </div>
  )
}

function AiVoiceVisual() {
  const steps = [
    { label: "Human answers today", done: true },
    { label: "Notes + transcripts build up", done: true },
    { label: "AI voice agent takes tier-1", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          A path to AI voice
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">same platform</span>
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
              when you scale
            </span>
          )}
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
    question: "Can I make and receive calls inside FloatChat?",
    answer:
      "Yes — both. Voice is a first-class channel in the same inbox as your chats and email, so your team places outbound calls with click-to-call and picks up inbound calls without leaving the conversation. Every call opens against the customer record it belongs to, with the full prior history already in view.",
  },
  {
    question: "Are calls tied to the customer record?",
    answer:
      "Always. A call is never a stray line item in a separate phone tool. It attaches to the same conversation and customer profile as the WhatsApp thread, the email, and the order lookup — and the notes your team writes during or after the call are saved right there on the timeline for anyone who opens the record next.",
  },
  {
    question: "How does click-to-call work?",
    answer:
      "Any record with a phone number gets a call button. One click dials — no copying numbers into a softphone, no switching apps. Because the call starts from inside the record, the caller ID, prior messages, order, and account details are on screen before the customer even answers.",
  },
  {
    question: "Is there an AI voice agent?",
    answer:
      "Yes. Voice starts human-led, and because everything lives on one agentic AI platform you can add AI voice agents as you scale — for after-hours coverage or tier-1 volume — on the same customer records and the same guardrails. Explore it on the Voice AI Agents page when you’re ready.",
  },
  {
    question: "Does voice share context with my other channels?",
    answer:
      "Completely. The whole point is that a call isn’t siloed. A customer can message on WhatsApp, take a call, then get a follow-up email — and it’s all one thread on one record. The next teammate to open it sees the call, the notes, and every message without asking the customer to repeat anything.",
  },
  {
    question: "Can I follow up by text or email after a call?",
    answer:
      "Yes, and it stays on the same conversation. End the call, drop a note, and send a WhatsApp or email confirmation from the same screen. The follow-up picks up exactly where the call left off, so nothing about the customer is siloed across tools.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Voice Calling in the Agentic AI Inbox",
  serviceType: "Inbound and outbound voice calling in a unified customer inbox",
  description:
    "Make and receive calls inside the same inbox as your chats, with click-to-call from any record and notes tied to each customer, on one agentic AI platform.",
  url: "https://www.floatchat.com/channels/voice",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer support, sales, and customer experience teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/voice-ai-agents",
    Icon: Sparkles,
    title: "Voice AI Agents",
    body: "Add an AI voice agent for after-hours and tier-1 calls — same records.",
  },
  {
    to: "/numbers/did",
    Icon: Hash,
    title: "Phone Numbers (DID)",
    body: "Get local and toll-free numbers to make and receive calls on.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "The one inbox where voice sits beside chat, email, and DMs.",
  },
  {
    to: "/agentic-ai",
    Icon: Workflow,
    title: "Agentic AI Platform",
    body: "The platform that runs your agents, inbox, numbers, and campaigns.",
  },
]

const relatedPills = [
  { to: "/integrations", label: "Integrations", Icon: Layers },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: ListChecks },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function VoiceChannelPage() {
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
                  <Phone className="h-3.5 w-3.5" />
                  Voice channel · calls inside the shared inbox
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Voice calls inside your{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI platform.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Inbound and outbound calling tied to the same conversations —
                  and the same agentic AI — as your chats. Click to call from any
                  record, keep notes on the customer, and never lose the context
                  your team already has.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Inbound + outbound",
                    "Click-to-call from any record",
                    "Notes tied to the conversation",
                    "A path to AI voice",
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
                  One inbox for voice and everything else.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <VoiceCallMockup />
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
                  Icon: PhoneCall,
                  value: "In + out",
                  label: "inbound and outbound calling",
                },
                {
                  Icon: PhoneOutgoing,
                  value: "1 click",
                  label: "to call from any record",
                },
                {
                  Icon: StickyNote,
                  value: "Every call",
                  label: "notes tied to the conversation",
                },
                {
                  Icon: Sparkles,
                  value: "Ready",
                  label: "a path to AI voice agents",
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
                  A phone in a separate system loses the context you already have.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Most teams run voice in one tool and everything else in
                    another. The rep picks up a call with a bare number on screen —
                    no chat history, no order, no idea the customer already
                    explained the whole thing over WhatsApp an hour ago.
                  </p>
                  <p>
                    So the customer repeats themselves, the rep scrambles across
                    tabs, and whatever gets said on the call disappears the moment
                    they hang up. The next teammate to open the account has no idea
                    it happened.
                  </p>
                  <p>
                    Voice on FloatChat closes that gap. It shares the{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      same inbox and the same customer record
                    </span>{" "}
                    as your chats — so a call is just another part of one
                    continuous conversation.
                  </p>
                </div>
              </BlurFade>

              {/* siloed vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A separate phone system
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Call opens with just a number",
                        "Chat and order live in other tabs",
                        "Customer re-explains from scratch",
                        "Notes vanish when the call ends",
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
                      Voice in your inbox
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Call opens against the full record",
                        "Prior chat + order right there",
                        "Zero repeat questions",
                        "Notes saved to the timeline",
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
                  Everything a call should carry, in one place.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four things you get the moment voice lives beside your chats —
                  one inbox, one customer record, no siloed phone tool.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: PhoneCall,
                  title: "Calls in the inbox.",
                  body:
                    "Inbound and outbound calling sit alongside WhatsApp, email, and web chat — one shared inbox, one thread. A call is never a stray event in a separate app.",
                  visual: <InInboxVisual />,
                },
                {
                  Icon: PhoneOutgoing,
                  title: "Click-to-call.",
                  body:
                    "Start a call from any contact record in one click. The caller ID, prior messages, and order details are on screen before the customer answers — no copy-paste into a softphone.",
                  visual: <ClickToCallVisual />,
                },
                {
                  Icon: StickyNote,
                  title: "Logged context.",
                  body:
                    "Call notes save inside the conversation, tied to the customer. Duration, direction, and what was said land on the timeline so the next teammate is never starting cold.",
                  visual: <LoggedNotesVisual />,
                },
                {
                  Icon: Sparkles,
                  title: "Path to AI voice.",
                  body:
                    "Start human-led, then add agentic AI voice agents as you scale — for after-hours or tier-1 volume — on the same platform, records, and guardrails.",
                  visual: <AiVoiceVisual />,
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

        {/* ───── WHY IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The call and the follow-up are one conversation.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Your team handles calls with full history in view — and a
                  follow-up text or email picks up exactly where the call left off.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Before */}
              <BlurFade delay={0.1} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-4">
                    Voice bolted on
                  </p>
                  <p className="text-base text-slate-900/80 leading-relaxed mb-5">
                    A call is an island. Nothing before it is visible, and nothing
                    after it connects.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Rep dials blind, no context loaded",
                      "Customer repeats the whole story",
                      "Notes stay in the phone tool, if at all",
                      "Follow-up email has no idea a call happened",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-slate-900/80 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              {/* Arrow */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <span className="h-12 w-px bg-gradient-to-b from-slate-300 to-emerald-300" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="h-12 w-px bg-gradient-to-b from-emerald-300 to-slate-300" />
                </div>
              </div>

              {/* After */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">
                    Voice in the inbox
                  </p>
                  <p className="text-base text-emerald-900/85 leading-relaxed mb-5">
                    The call inherits the thread, and the thread inherits the call —
                    it’s all one record.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Rep sees the full history before hello",
                      "One click to dial from the record",
                      "Notes land on the shared timeline",
                      "Follow-up text or email continues the thread",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-emerald-900/85 leading-relaxed"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                          strokeWidth={3}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>

            {/* flow band */}
            <BlurFade delay={0.25}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: MessageCircle, title: "Chat comes in", note: "WhatsApp or web" },
                    { Icon: PhoneOutgoing, title: "Click to call", note: "from the record" },
                    { Icon: StickyNote, title: "Note the call", note: "on the timeline" },
                    { Icon: MessageSquare, title: "Follow up", note: "text or email" },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
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
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Voice is one channel on a platform that runs the rest.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Inbox,
                  title: "One inbox, every channel.",
                  body:
                    "Voice sits beside WhatsApp, email, web chat, and DMs — same shared inbox, same customer record, one thread the whole team can see.",
                },
                {
                  Icon: UserRound,
                  title: "One record follows everything.",
                  body:
                    "The call, the chat, the order, and the notes all attach to the same profile. Nothing about the customer is siloed across separate tools.",
                },
                {
                  Icon: Sparkles,
                  title: "Same agentic AI throughout.",
                  body:
                    "The platform that runs your AI agent, your inbox, and your campaigns runs your voice too — so a path to AI voice agents is already there when you scale.",
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

            {/* dark strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      One platform
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      Voice is one channel on a platform that also runs your AI
                      agent, your inbox, and your campaigns — so nothing about the
                      customer is siloed, and every call is part of the same story.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                      <Voicemail className="h-5 w-5 text-white/90" />
                      <span className="text-sm font-medium">Inbound + outbound</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                      <ShieldCheck className="h-5 w-5 text-white/90" />
                      <span className="text-sm font-medium">Same guardrails</span>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Bring voice into the same inbox as everything else."
          body="Add calling beside your chats — click-to-call, notes on the record, no siloed phone tool."
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
                <SectionEyebrow num="05" label="Explore next" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything voice connects to.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Numbers to call on, the inbox it lives in, and the agentic AI
                  that can take calls when you scale.
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

            {/* pills */}
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
              description="Straight answers about calling, notes, and context inside the inbox."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or see{" "}
                  <Link
                    to="/pricing"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    pricing
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 40%, rgba(191,219,254,0.55) 70%, rgba(207,250,254,0.6) 100%)",
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
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.4), rgba(96,165,250,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
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
                  Calls and chats in one inbox right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">go live fast</span>
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
                  Voice + everything else
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Bring voice into the same platform as{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  everything else.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Make and receive calls inside the same inbox as your chats, with
                click-to-call and notes tied to each customer — on one agentic AI
                platform.
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
                "Inbound + outbound",
                "Click-to-call",
                "Notes on the record",
                "A path to AI voice",
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
