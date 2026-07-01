"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  CheckCheck,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BadgeCheck,
  MessageSquare,
  Image as ImageIcon,
  Gauge,
  Radio,
  Inbox,
  GitBranch,
  Layers,
  Send,
  Paperclip,
  Smile,
  Mic,
  Signal,
  Wifi,
  BatteryFull,
  Users,
  Clock,
} from "lucide-react"
import { SiWhatsapp } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

/* ─────────────────────────────────────────────────────────────
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "WhatsApp Business API Messaging with Agentic AI | FloatChat",
  description:
    "Run two-way WhatsApp conversations and campaigns on the official Business API, with templates, media, and agentic AI answering automatically.",
}

const WHATSAPP_GREEN = "#25D366"
const WHATSAPP_TEAL = "#075E54"

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
   UNIQUE HERO VISUAL — a realistic WhatsApp phone mockup.

   A verified business inbox with:
     • the recognizable WhatsApp doodle wallpaper + teal header
     • a green "verified business" badge on the account name
     • a two-way conversation with delivered/read ticks
     • a template message with quick-reply buttons
     • an agentic-AI auto-reply that resolves the request
─────────────────────────────────────────────────────────────── */

type ChatPhase = "inbound" | "typing" | "reply" | "template" | "picked"

function WhatsAppPhoneMockup() {
  const [phase, setPhase] = useState<ChatPhase>("inbound")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("inbound")
        await wait(1500)
        if (cancelled) return
        setPhase("typing")
        await wait(1600)
        if (cancelled) return
        setPhase("reply")
        await wait(2200)
        if (cancelled) return
        setPhase("template")
        await wait(2600)
        if (cancelled) return
        setPhase("picked")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showTyping = phase === "typing"
  const showReply =
    phase === "reply" || phase === "template" || phase === "picked"
  const showTemplate = phase === "template" || phase === "picked"
  const showPicked = phase === "picked"

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* Glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[48px] blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.45), transparent 72%)",
        }}
      />

      {/* Floating "official API" chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute -top-4 -left-5 z-30 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_10px_26px_-10px_rgba(15,42,74,0.28)]"
      >
        <span
          className="h-4 w-4 rounded-full flex items-center justify-center"
          style={{ background: WHATSAPP_GREEN }}
        >
          <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Official Business API
        </span>
      </motion.div>

      {/* Floating agentic-AI chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-4 -right-5 z-30 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_10px_26px_-10px_rgba(15,42,74,0.28)]"
      >
        <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Agentic AI auto-reply
        </span>
      </motion.div>

      {/* Phone frame */}
      <div className="relative rounded-[42px] border-[10px] border-[#0F2A4A] bg-[#0F2A4A] shadow-[0_40px_80px_-30px_rgba(15,42,74,0.55)]">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-5 w-28 rounded-full bg-[#0F2A4A]" />

        <div className="relative overflow-hidden rounded-[32px] bg-[#ECE5DD]">
          {/* Status bar */}
          <div
            className="flex items-center justify-between px-5 pt-3 pb-1 text-white text-[10px] font-medium"
            style={{ background: WHATSAPP_TEAL }}
          >
            <span className="tabular-nums">9:41</span>
            <div className="flex items-center gap-1">
              <Signal className="h-2.5 w-2.5" />
              <Wifi className="h-2.5 w-2.5" />
              <BatteryFull className="h-3 w-3" />
            </div>
          </div>

          {/* Chat header — verified business */}
          <div
            className="flex items-center gap-2.5 px-3 py-2.5"
            style={{ background: WHATSAPP_TEAL }}
          >
            <ArrowRight className="h-4 w-4 text-white/80 rotate-180" />
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/20">
                <SiWhatsapp style={{ color: "#fff", width: 18, height: 18 }} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-[13px] font-semibold text-white truncate">
                  Northwind Goods
                </p>
                {/* Green verified business badge */}
                <span
                  className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full shrink-0"
                  style={{ background: WHATSAPP_GREEN }}
                  title="Verified business"
                >
                  <Check className="h-2 w-2 text-white" strokeWidth={4} />
                </span>
              </div>
              <p className="text-[9.5px] text-white/70 leading-tight">
                Business account · online
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[8.5px] font-medium text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Live
            </span>
          </div>

          {/* Verified banner */}
          <div className="px-3 py-1.5 bg-[#DCF8C6]/60 flex items-center justify-center gap-1.5 border-b border-black/5">
            <BadgeCheck className="h-3 w-3 text-[#075E54]" />
            <span className="text-[9px] text-[#075E54] font-medium">
              This is an official business account on the WhatsApp Business API
            </span>
          </div>

          {/* Conversation — doodle wallpaper */}
          <div
            className="relative px-3 py-3 min-h-[356px] space-y-2"
            style={{
              backgroundColor: "#ECE5DD",
              backgroundImage:
                "radial-gradient(circle at 20% 15%, rgba(15,42,74,0.05) 1.5px, transparent 1.5px), radial-gradient(circle at 70% 60%, rgba(15,42,74,0.04) 1.5px, transparent 1.5px), radial-gradient(circle at 45% 85%, rgba(15,42,74,0.045) 1.5px, transparent 1.5px)",
              backgroundSize: "48px 48px, 60px 60px, 54px 54px",
            }}
          >
            {/* Day divider */}
            <div className="flex justify-center">
              <span className="rounded-md bg-white/80 px-2 py-0.5 text-[8.5px] font-medium text-slate-500 shadow-sm">
                TODAY
              </span>
            </div>

            {/* Inbound customer message */}
            <div className="flex justify-end">
              <div className="relative max-w-[78%] rounded-lg rounded-tr-sm bg-[#DCF8C6] px-2.5 py-1.5 shadow-sm">
                <p className="text-[11.5px] text-[#0F2A4A] leading-snug">
                  Hi! Is order #NW-4821 shipped yet? I need it before Friday.
                </p>
                <div className="mt-0.5 flex items-center justify-end gap-1">
                  <span className="text-[8px] text-slate-500">9:41 AM</span>
                  <CheckCheck className="h-3 w-3 text-[#34B7F1]" />
                </div>
              </div>
            </div>

            {/* AI typing indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-end gap-1.5"
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 mb-1">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="rounded-lg rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400"
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Agentic AI auto-reply */}
            <AnimatePresence>
              {showReply && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-end gap-1.5"
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 mb-1">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="relative max-w-[80%] rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 shadow-sm">
                    <div className="mb-1 inline-flex items-center gap-1 rounded bg-[#EAF2FF] px-1.5 py-0.5">
                      <Sparkles className="h-2 w-2 text-[#1D4ED8]" />
                      <span className="text-[7.5px] font-semibold text-[#1D4ED8] uppercase tracking-wide">
                        FloatChat AI · answered
                      </span>
                    </div>
                    <p className="text-[11.5px] text-[#0F2A4A] leading-snug">
                      Good news, Priya — #NW-4821 shipped this morning via
                      express and is out for delivery{" "}
                      <span className="font-semibold">Thursday</span>. Here&apos;s
                      your tracking:
                    </p>
                    <div className="mt-0.5 flex items-center justify-end gap-1">
                      <span className="text-[8px] text-slate-400">9:41 AM</span>
                      <CheckCheck className="h-3 w-3 text-[#34B7F1]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Template message with quick-reply buttons */}
            <AnimatePresence>
              {showTemplate && (
                <motion.div
                  key="template"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-end gap-1.5"
                >
                  <div className="w-5 shrink-0" />
                  <div className="max-w-[82%] w-full rounded-lg rounded-tl-sm bg-white shadow-sm overflow-hidden">
                    {/* Media header */}
                    <div className="h-16 bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex items-center justify-center relative">
                      <div className="flex items-center gap-1.5 text-white">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-[10px] font-semibold">
                          Shipment update
                        </span>
                      </div>
                      <span className="absolute top-1 right-1.5 rounded bg-black/20 px-1 py-0.5 text-[7px] font-medium text-white">
                        TEMPLATE
                      </span>
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Track your parcel in real time, or ask me anything else
                        about this order.
                      </p>
                    </div>
                    {/* Quick-reply buttons */}
                    <div className="border-t border-slate-100">
                      {[
                        { Icon: ArrowUpRight, label: "Track parcel" },
                        { Icon: MessageSquare, label: "Talk to a human" },
                      ].map((b, i) => (
                        <button
                          key={b.label}
                          className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-[10.5px] font-semibold text-[#1D4ED8] transition-colors hover:bg-[#EAF2FF] ${
                            i === 1 ? "border-t border-slate-100" : ""
                          } ${
                            showPicked && i === 0
                              ? "bg-[#EAF2FF]"
                              : ""
                          }`}
                        >
                          <b.Icon className="h-3 w-3" />
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick-reply chosen → resolved */}
            <AnimatePresence>
              {showPicked && (
                <motion.div
                  key="picked"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div className="rounded-lg rounded-tr-sm bg-[#DCF8C6] px-2.5 py-1.5 shadow-sm">
                    <p className="text-[11px] text-[#0F2A4A] leading-snug">
                      Perfect, thank you! 🙌
                    </p>
                    <div className="mt-0.5 flex items-center justify-end gap-1">
                      <span className="text-[8px] text-slate-500">9:42 AM</span>
                      <CheckCheck className="h-3 w-3 text-[#34B7F1]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resolved chip */}
            <AnimatePresence>
              {showPicked && (
                <motion.div
                  key="resolved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="flex justify-center"
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[8.5px] font-medium text-emerald-700 shadow-sm">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                    Resolved by AI · no agent needed · 38s
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2 px-2.5 py-2 bg-[#F0F0F0]">
            <div className="flex-1 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <Smile className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[10px] text-slate-400 flex-1">
                Message
              </span>
              <Paperclip className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <button
              className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: WHATSAPP_GREEN }}
            >
              {showPicked ? (
                <Mic className="h-4 w-4 text-white" />
              ) : (
                <Send className="h-3.5 w-3.5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function ApiVisual() {
  const rows = [
    { label: "Quality rating", value: "High", tone: "emerald" as const },
    { label: "Messaging tier", value: "100K / 24h", tone: "blue" as const },
    { label: "Sender", value: "Verified", tone: "emerald" as const },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Sender health
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Gauge className="h-2.5 w-2.5" /> monitored
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
          <span
            className={`text-[10px] font-semibold ${
              r.tone === "emerald" ? "text-emerald-600" : "text-[#1D4ED8]"
            }`}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function TwoWayVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Inbox className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Shared inbox · one thread
        </span>
      </div>
      <div className="flex justify-start">
        <div className="rounded-md rounded-bl-sm bg-slate-100 px-2 py-1 max-w-[80%]">
          <p className="text-[9.5px] text-[#0F2A4A]">Can I change my address?</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-md rounded-br-sm bg-[#DCF8C6] px-2 py-1 max-w-[80%]">
          <p className="text-[9.5px] text-[#0F2A4A]">Updated — anything else?</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 pt-1">
        <span className="inline-flex items-center gap-1 rounded bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
          <Sparkles className="h-2 w-2" /> AI
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-50 px-1.5 py-0.5 text-[8px] font-medium text-slate-700">
          <Users className="h-2 w-2" /> team
        </span>
        <span className="ml-auto text-[8px] text-slate-400">same thread</span>
      </div>
    </div>
  )
}

function TemplateVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Layers className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Rich template
        </span>
        <span className="ml-auto rounded bg-slate-100 px-1 py-0.5 text-[7.5px] font-medium text-slate-500">
          approved
        </span>
      </div>
      <div className="rounded-md border border-slate-200 overflow-hidden">
        <div className="h-8 bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center px-2 gap-1">
          <ImageIcon className="h-3 w-3 text-white" />
          <span className="text-[8.5px] font-medium text-white">Media header</span>
        </div>
        <div className="px-2 py-1.5">
          <p className="text-[9px] text-[#0F2A4A] leading-snug">
            Your appointment is confirmed for {"{{date}}"}.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["Reschedule", "Confirm", "Add note"].map((b) => (
          <span
            key={b}
            className="rounded border border-[#3B82F6]/25 bg-[#EAF2FF] px-1 py-1 text-center text-[8px] font-semibold text-[#1D4ED8]"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  )
}

function AiAnswersVisual() {
  const steps = [
    { label: "Read the message", done: true },
    { label: "Look up order + policy", done: true },
    { label: "Reply on WhatsApp", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Agent handles it
        </span>
        <span className="text-[8.5px] text-slate-400">then hands off</span>
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
              sending
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Results strip items
─────────────────────────────────────────────────────────────── */

const results = [
  { Icon: ShieldCheck, value: "Official", label: "WhatsApp Business API" },
  { Icon: BadgeCheck, value: "Verified", label: "green-badge sender" },
  { Icon: Sparkles, value: "24/7", label: "AI answers automatically" },
  { Icon: Layers, value: "Rich", label: "templates, media & buttons" },
]

/* ─────────────────────────────────────────────────────────────
   Feature cards
─────────────────────────────────────────────────────────────── */

const features = [
  {
    Icon: ShieldCheck,
    title: "Official Business API.",
    body:
      "A verified sender with the green business badge, real messaging limits, and a quality rating you can watch in the dashboard. No unofficial workarounds, no risk of a banned number — just WhatsApp the way Meta intends it to run.",
    visual: <ApiVisual />,
  },
  {
    Icon: MessageSquare,
    title: "Two-way conversations.",
    body:
      "Every WhatsApp chat lands in the same shared inbox as your other channels, tied to one customer record. Your agentic AI and your human team work the exact same thread — no silos, no copy-pasting, no lost context.",
    visual: <TwoWayVisual />,
  },
  {
    Icon: Layers,
    title: "Rich templates & media.",
    body:
      "Send pre-approved template messages with media headers, quick-reply buttons, and list pickers — order confirmations, shipping updates, appointment reminders — each with a clear next step the customer can tap.",
    visual: <TemplateVisual />,
  },
  {
    Icon: Sparkles,
    title: "AI that actually answers.",
    body:
      "The agentic AI reads the message, checks your knowledge base and connected systems, and replies on WhatsApp in seconds. It resolves the routine volume on its own and hands off to a person with full context when it should.",
    visual: <AiAnswersVisual />,
  },
]

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/channels/whatsapp-broadcasting",
    Icon: Radio,
    title: "WhatsApp Broadcasting",
    body: "Run opt-in campaigns and bulk sends on the same verified number.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The reasoning engine that reads, resolves, and hands off on WhatsApp.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox where WhatsApp meets every other channel.",
  },
  {
    to: "/integrations",
    Icon: GitBranch,
    title: "Integrations",
    body: "Connect your store, CRM, and helpdesk so replies are grounded.",
  },
]

const relatedPills = [
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: Gauge },
  { to: "/contact", label: "Talk to sales", Icon: MessageSquare },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is this the official WhatsApp Business API?",
    answer:
      "Yes. FloatChat runs on the official WhatsApp Business API with a verified business sender — the green-badge account your customers already trust. You get real, Meta-sanctioned messaging with monitored quality ratings and messaging tiers, not a scraped or unofficial workaround that risks getting your number banned.",
  },
  {
    question: "Can the AI answer WhatsApp chats automatically?",
    answer:
      "Yes, automatically. The agentic AI reads each incoming message, grounds itself in your help center and connected systems, and replies on WhatsApp in seconds — no pre-built conversation trees to map. It resolves routine questions like order status, returns, and appointment changes on its own, and escalates to a human in the same thread when a conversation genuinely needs one.",
  },
  {
    question: "What are WhatsApp templates and when do I need them?",
    answer:
      "Templates are pre-approved message formats you use to start a conversation or message a customer outside the 24-hour customer-service window — order confirmations, shipping updates, appointment reminders. FloatChat lets you build them with media headers, quick-reply buttons, and list pickers, submit them for approval, and send them at scale. Inside an open 24-hour window, the AI can reply freely with regular messages.",
  },
  {
    question: "Can I broadcast or run campaigns on WhatsApp?",
    answer:
      "Yes. WhatsApp Broadcasting runs on the same verified number and platform, so you can send opt-in campaigns, promotions, and announcements — then let the agentic AI handle every reply that comes back in the shared inbox. See the WhatsApp Broadcasting page for the campaign side of the product.",
  },
  {
    question: "How does the human handoff work?",
    answer:
      "When the AI reaches the edge of what it should resolve, it hands the conversation to your team inside the exact same WhatsApp thread. The agent who picks it up inherits the full history, the relevant order or account data, and the customer's sentiment — so there are no repeat questions and the customer never notices a seam between AI and human.",
  },
  {
    question: "How is WhatsApp different from FloatChat's other channels?",
    answer:
      "WhatsApp is one channel on a platform that also runs your broadcasting, voice, SMS, web chat, and social messaging — all tied to a single customer record and one shared inbox. The same agentic AI and the same guardrails work everywhere, so a customer who starts on WhatsApp and moves to email is still one continuous conversation.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WhatsApp Business API Messaging with Agentic AI",
  serviceType: "WhatsApp Business API messaging and automation",
  description:
    "Two-way WhatsApp conversations and campaigns on the official WhatsApp Business API, with a verified sender, rich templates, media and quick-reply buttons, and agentic AI answering automatically with full-context human handoff.",
  url: "https://www.floatchat.com/channels/whatsapp",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer support, sales, and marketing teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function WhatsAppChannelPage() {
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
              className="absolute top-24 -right-44 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #B7F5D0 0%, transparent 70%)",
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
                  <span
                    className="h-4 w-4 rounded-full flex items-center justify-center"
                    style={{ background: WHATSAPP_GREEN }}
                  >
                    <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
                  </span>
                  WhatsApp Channel · official Business API
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  WhatsApp Business messaging powered by{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Run two-way conversations and campaigns on the official WhatsApp
                  Business API — verified sender, rich templates, and an agentic
                  AI that reads every message and answers automatically.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Official Business API",
                    "Verified green badge",
                    "Templates, media & buttons",
                    "AI answers, human handoff",
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
                  Real WhatsApp business messaging — not a workaround.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <WhatsAppPhoneMockup />
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
                  Customers live on WhatsApp. Running it at scale is the hard part.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    WhatsApp is where your customers actually want to talk — it&apos;s
                    faster and more personal than email, and open rates dwarf every
                    other channel. But doing it properly means wrestling with the{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      WhatsApp Business API
                    </span>
                    : sender verification, message templates, approval flows, quality
                    ratings, and messaging tiers.
                  </p>
                  <p>
                    Get any of that wrong and you&apos;re rate-limited or, worse, your
                    number gets flagged. Meanwhile the conversations still pile up —
                    two-way threads that a small team can&apos;t answer around the
                    clock, and unofficial &quot;WhatsApp bots&quot; that put your
                    account at risk.
                  </p>
                  <p>
                    FloatChat manages all of the API plumbing for you and puts an
                    agentic AI on top — so WhatsApp becomes a channel you can actually
                    scale, not a compliance headache.
                  </p>
                </div>
              </BlurFade>

              {/* workaround vs official contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Unofficial workaround
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "No green badge — customers hesitate",
                        "Numbers get flagged or banned",
                        "No templates, no media, no buttons",
                        "A bot that stalls on anything real",
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
                      FloatChat on the official API
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Verified green-badge sender",
                        "Quality rating monitored for you",
                        "Templates with media & quick replies",
                        "Agentic AI resolves and hands off",
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
                  Everything WhatsApp does — run for you.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The official WhatsApp Business API, a shared inbox, rich
                  templates, and an agentic AI that answers — no plumbing to
                  manage.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((f, i) => (
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

        {/* ───── WHY IT WORKS / WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Fast answers on the channel customers already prefer.
                </h2>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Why it works panel */}
              <BlurFade delay={0.1} className="lg:col-span-6">
                <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                      <Clock className="h-4.5 w-4.5 text-[#1D4ED8]" />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                      For your customers
                    </span>
                  </div>
                  <p className="text-lg text-[#0F2A4A] font-medium leading-snug mb-5">
                    Customers get fast, accurate WhatsApp replies around the clock —
                    and your team handles only what genuinely needs a person, all from
                    one inbox.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Replies in seconds, day or night, in their language",
                      "Answers grounded in your orders, policies, and help center",
                      "A tap-to-act experience with buttons, not a wall of text",
                      "Seamless handoff — the human sees the whole thread",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[14px] text-slate-600 leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              {/* Why FloatChat panel */}
              <BlurFade delay={0.2} className="lg:col-span-6">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                        <Layers className="h-4.5 w-4.5 text-white" />
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/70">
                        Why FloatChat
                      </span>
                    </div>
                    <p className="text-lg lg:text-xl font-medium leading-snug mb-6 max-w-md">
                      WhatsApp is one channel on a platform that also runs your
                      broadcasting, voice, and everything else — all tied to a single
                      customer record.
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          Icon: Radio,
                          label: "Broadcasting on the same number",
                          note: "campaigns + replies in one place",
                        },
                        {
                          Icon: Inbox,
                          label: "One shared omnichannel inbox",
                          note: "WhatsApp beside every channel",
                        },
                        {
                          Icon: Sparkles,
                          label: "The same agentic AI everywhere",
                          note: "one brain, one set of guardrails",
                        },
                      ].map((r) => (
                        <div
                          key={r.label}
                          className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/10 px-4 py-3"
                        >
                          <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                            <r.Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13.5px] font-semibold leading-tight">
                              {r.label}
                            </p>
                            <p className="text-[11.5px] text-white/70 truncate">
                              {r.note}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Bring agentic AI to WhatsApp."
          body="Connect your verified WhatsApp Business API sender and go live in days — no per-resolution fees."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Keep exploring" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  WhatsApp is one piece of the platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  See how broadcasting, the agentic AI, and the shared inbox fit
                  together around your verified number.
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

            {/* related pills */}
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
              title="WhatsApp Business API questions"
              description="Straight answers about the official API, templates, and agentic AI."
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
                    to="/channels/whatsapp-broadcasting"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    WhatsApp Broadcasting
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(207,250,254,0.55) 70%, rgba(220,248,198,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 25%, #60A5FA 50%, #34D399 75%, transparent)",
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
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(52,211,153,0.28), transparent 70%)",
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
                  Answering WhatsApp chats automatically right now
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
                  Official WhatsApp Business API
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Bring agentic AI to{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  WhatsApp.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Connect your verified sender on the official WhatsApp Business API
                and let agentic AI handle two-way conversations and campaigns —
                automatically, with human handoff when it matters.
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
                "Official Business API",
                "Verified sender",
                "Templates, media & buttons",
                "AI answers automatically",
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
