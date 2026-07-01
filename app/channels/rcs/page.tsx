"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquareText,
  Check,
  CheckCircle2,
  CheckCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Image as ImageIcon,
  MousePointerClick,
  Signal,
  SignalLow,
  Inbox,
  ShieldCheck,
  Store,
  Megaphone,
  Layers,
  Phone,
  MessageCircle,
  Workflow,
  Star,
} from "lucide-react"
import { SiWhatsapp, SiInstagram, SiGoogle } from "react-icons/si"
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
  title: "RCS Business Messaging with Agentic AI | FloatChat",
  description:
    "Send branded RCS messages with rich cards and suggested replies, with automatic SMS fallback, answered by agentic AI, all in one inbox.",
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
   HERO MOCKUP — a phone showing a branded, verified RCS rich card:
   verified sender header → rich card (image + title + body) →
   suggested-reply chips → a customer tap → an agentic AI reply →
   and an "SMS fallback" indicator that flips when RCS is unavailable.
─────────────────────────────────────────────────────────────── */

type RcsPhase = "card" | "tapped" | "aiReply" | "fallback"

function RcsCardMockup() {
  const [phase, setPhase] = useState<RcsPhase>("card")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("card")
        await wait(2200)
        if (cancelled) return
        setPhase("tapped")
        await wait(1500)
        if (cancelled) return
        setPhase("aiReply")
        await wait(2800)
        if (cancelled) return
        setPhase("fallback")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isFallback = phase === "fallback"
  const showTap = phase === "tapped" || phase === "aiReply"
  const showAiReply = phase === "aiReply"

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

      {/* Floating verified chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <BadgeCheck className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Verified sender
        </span>
      </motion.div>

      {/* Floating fallback / RCS status chip */}
      <motion.div
        key={isFallback ? "fb" : "rcs"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
        style={{ borderColor: isFallback ? "#FDE68A" : "rgba(59,130,246,0.25)" }}
      >
        {isFallback ? (
          <>
            <SignalLow className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-[11px] font-medium text-[#0F2A4A]">
              SMS fallback active
            </span>
          </>
        ) : (
          <>
            <Signal className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[11px] font-medium text-[#0F2A4A]">
              RCS delivered
            </span>
          </>
        )}
      </motion.div>

      {/* Phone frame */}
      <div className="relative mx-auto w-full max-w-[360px] rounded-[38px] border-[10px] border-[#0F2A4A] bg-[#0F2A4A] shadow-[0_40px_80px_-30px_rgba(15,42,74,0.55)]">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-28 rounded-full bg-[#0F2A4A] z-10" />
        <div className="rounded-[28px] overflow-hidden bg-[#EEF3FB]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1.5 text-[10px] text-slate-500">
            <span className="font-medium tabular-nums">9:41</span>
            <span className="flex items-center gap-1">
              <Signal className="h-3 w-3" />
              <span className="font-mono">RCS</span>
            </span>
          </div>

          {/* Conversation header — branded, verified */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-slate-200 bg-white">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-sm">
              <Store className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <p className="text-[12px] font-semibold text-[#0F2A4A] truncate">
                  Northline Outfitters
                </p>
                <BadgeCheck className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
              </div>
              <p className="text-[9px] text-slate-500">
                Verified business · RCS
              </p>
            </div>
            <Phone className="h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Message body */}
          <div className="px-3 py-3 space-y-2.5 min-h-[420px] bg-[#EEF3FB]">
            <AnimatePresence mode="wait">
              {!isFallback ? (
                <motion.div
                  key="rich"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2.5"
                >
                  {/* Rich card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl rounded-tl-md bg-white border border-slate-200 overflow-hidden shadow-[0_10px_24px_-14px_rgba(15,42,74,0.3)] max-w-[85%]"
                  >
                    {/* Card image */}
                    <div className="relative h-28 bg-gradient-to-br from-[#1D4ED8] via-[#3B82F6] to-[#60A5FA] flex items-center justify-center">
                      <ImageIcon className="h-7 w-7 text-white/70" />
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[8.5px] font-semibold text-[#1D4ED8]">
                        <Sparkles className="h-2.5 w-2.5" /> New arrivals
                      </span>
                      <span className="absolute bottom-2 right-2 rounded-md bg-[#0F2A4A]/80 px-1.5 py-0.5 text-[8px] font-medium text-white">
                        Rich card
                      </span>
                    </div>
                    {/* Card content */}
                    <div className="px-3 py-2.5">
                      <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight">
                        Your winter collection just dropped
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500 leading-snug">
                        Insulated shells, wool base layers, and the trail
                        boots you saved. Members get early access today.
                      </p>
                    </div>
                    {/* Card action bar */}
                    <div className="border-t border-slate-100 px-3 py-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1D4ED8]">
                        <MousePointerClick className="h-3 w-3" /> Shop the drop
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-slate-400" />
                    </div>
                  </motion.div>

                  {/* Suggested-reply chips */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex flex-wrap gap-1.5 max-w-[85%]"
                  >
                    {[
                      { label: "Track my order", active: showTap },
                      { label: "See sizes", active: false },
                      { label: "Talk to us", active: false },
                    ].map((chip) => (
                      <span
                        key={chip.label}
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors ${
                          chip.active
                            ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                            : "border-[#3B82F6]/40 bg-white text-[#1D4ED8]"
                        }`}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </motion.div>

                  {/* Customer taps a suggested reply → becomes a message */}
                  <AnimatePresence>
                    {showTap && (
                      <motion.div
                        key="tap"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-end"
                      >
                        <div className="rounded-2xl rounded-br-md bg-[#3B82F6] px-3 py-1.5 max-w-[75%] shadow-sm">
                          <p className="text-[11px] text-white leading-snug">
                            Track my order
                          </p>
                          <span className="mt-0.5 flex items-center justify-end gap-0.5 text-[8px] text-white/70">
                            9:42 <CheckCheck className="h-2.5 w-2.5" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Agentic AI reply */}
                  <AnimatePresence>
                    {showAiReply && (
                      <motion.div
                        key="ai"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-1.5"
                      >
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                        <div className="rounded-2xl rounded-tl-md bg-white border border-slate-200 px-3 py-2 max-w-[80%] shadow-sm">
                          <p className="text-[11px] text-[#0F2A4A] leading-snug">
                            Order <span className="font-semibold">#NL-4821</span>{" "}
                            shipped this morning — it&apos;s out for delivery and
                            arrives by 6 PM today.
                          </p>
                          <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-[#EAF2FF] px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                            <BadgeCheck className="h-2.5 w-2.5" /> Answered by
                            agentic AI
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                /* SMS fallback state — same message, plain text */
                <motion.div
                  key="fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[9px] font-medium text-slate-700">
                      <SignalLow className="h-3 w-3" />
                      Device can&apos;t receive RCS · sent as SMS
                    </span>
                  </div>
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-tl-md bg-white border border-slate-200 px-3 py-2 max-w-[85%] shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Northline Outfitters: Your winter collection just
                        dropped — members get early access today. Shop:
                        nrth.ln/drop · Reply STOP to opt out.
                      </p>
                      <span className="mt-0.5 block text-[8px] text-slate-400">
                        SMS · same campaign, delivered anyway
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-[#3B82F6]/20 bg-[#EAF2FF] px-2.5 py-2 flex items-start gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <p className="text-[9.5px] text-[#0F2A4A] leading-snug">
                      No message lost. FloatChat detects RCS support per device
                      and falls back to SMS automatically — one send, every
                      customer reached.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
            <div className="flex-1 h-7 rounded-full bg-slate-100 border border-slate-200 px-3 flex items-center">
              <span className="text-[10px] text-slate-400">
                {isFallback ? "Text message" : "RCS message"}
              </span>
            </div>
            <button className="h-7 w-7 rounded-full bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white flex items-center justify-center">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function BrandedVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
          <Store className="h-3 w-3 text-white" />
        </div>
        <span className="text-[10px] font-semibold text-[#0F2A4A]">
          Northline Outfitters
        </span>
        <BadgeCheck className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="ml-auto text-[8.5px] text-slate-400">verified</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["Logo", "Name", "Brand color"].map((t) => (
          <div
            key={t}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1.5 text-center"
          >
            <span className="text-[8.5px] font-medium text-[#0F2A4A]">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChipsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <MousePointerClick className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Tap to reply — no typing
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Track order", "Book a slot", "See sizes", "Talk to a human"].map(
          (c, i) => (
            <span
              key={c}
              className={`inline-flex items-center rounded-full border px-2 py-1 text-[9px] font-medium ${
                i === 0
                  ? "border-[#1D4ED8] bg-[#1D4ED8] text-white"
                  : "border-[#3B82F6]/35 bg-white text-[#1D4ED8]"
              }`}
            >
              {c}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

function FallbackVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1.5">
        <Signal className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-medium text-[#0F2A4A] flex-1">
          RCS supported
        </span>
        <span className="text-[8.5px] font-semibold text-[#1D4ED8]">
          rich card
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/60 px-2 py-1.5">
        <SignalLow className="h-3 w-3 text-slate-600" />
        <span className="text-[9.5px] font-medium text-slate-900 flex-1">
          No RCS on device
        </span>
        <span className="text-[8.5px] font-semibold text-slate-700">
          SMS auto
        </span>
      </div>
      <div className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
        <span className="text-[9px] text-emerald-800">
          One send · every customer reached
        </span>
      </div>
    </div>
  )
}

function AiInboxVisual() {
  const rows = [
    { label: "Track my order", note: "answered · 3s", ai: true },
    { label: "Do you ship to PR?", note: "answered · 2s", ai: true },
    { label: "Damaged item, upset", note: "handed to Priya", ai: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          RCS replies land in the inbox
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> shared
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
              r.ai
                ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]"
                : "bg-slate-100"
            }`}
          >
            {r.ai ? (
              <Sparkles className="h-2.5 w-2.5 text-white" />
            ) : (
              <ShieldCheck className="h-2.5 w-2.5 text-slate-600" />
            )}
          </span>
          <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
            {r.label}
          </span>
          <span
            className={`text-[8.5px] font-medium shrink-0 ${
              r.ai ? "text-emerald-600" : "text-slate-600"
            }`}
          >
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
    question: "What is RCS business messaging?",
    answer:
      "RCS (Rich Communication Services) is the modern successor to SMS built into the default messaging app on most Android phones. Instead of plain grey texts, it lets your brand show up with a verified name, logo, and brand color, and send rich cards, carousels, images, and tappable suggested replies. It turns a one-line text into a branded, interactive experience — and with FloatChat, every reply is answered by agentic AI in your shared inbox.",
  },
  {
    question: "What happens if a phone can't receive RCS?",
    answer:
      "It falls back to SMS automatically — no message is lost. FloatChat checks RCS capability per device at send time. Where RCS is supported, the customer gets the branded rich card; where it isn't, the same campaign is delivered as a standard SMS. You compose once, and every customer on your list is reached on the best format their device supports.",
  },
  {
    question: "Can agentic AI answer RCS conversations?",
    answer:
      "Yes. When a customer taps a suggested reply or types back, the reply lands in the same shared inbox as your other channels, where agentic AI reads it, grounds an answer in your data, and can complete multi-step tasks like order lookups or booking changes. It resolves the routine volume on its own and hands the rest to your team with full context — so RCS becomes a two-way conversation, not a dead end.",
  },
  {
    question: "Do I need a verified sender to use RCS?",
    answer:
      "To unlock the branded experience — your verified name, logo, and the blue verified checkmark — yes, your business goes through a verification step with the carriers and Google. FloatChat guides you through registration so your messages arrive as a trusted, recognizable sender rather than an unknown number. Verification is what makes RCS feel like your brand instead of a random text.",
  },
  {
    question: "How is RCS different from WhatsApp or SMS?",
    answer:
      "SMS is universal but plain: no branding, no media, no buttons. WhatsApp is rich and interactive but requires customers to have the app and opt in there. RCS gives you WhatsApp-style richness — cards, images, suggested replies — directly inside the phone's native messaging app, with automatic SMS fallback when RCS isn't available. On FloatChat, all three run side by side under one customer record and one AI brain.",
  },
  {
    question: "Which use cases work best for RCS?",
    answer:
      "Anything where a branded, tappable message beats a plain text: product launches and promotions with rich cards, order and delivery updates with tracking buttons, appointment reminders with reschedule chips, and post-purchase support that continues into an AI-answered conversation. Because it falls back to SMS, it's safe to use RCS as your default for high-value, high-visibility campaigns.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "RCS Business Messaging with Agentic AI",
  serviceType: "RCS business messaging",
  description:
    "Send branded RCS messages with a verified sender, rich cards, and suggested replies, with automatic SMS fallback, answered by agentic AI in one shared inbox.",
  url: "https://www.floatchat.com/channels/rcs",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Marketing, e-commerce, and customer experience teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedChannels = [
  { to: "/channels/rcs-broadcasting", Icon: Megaphone, title: "RCS Broadcasting", body: "Send branded RCS campaigns to your whole list at scale, with SMS fallback built in." },
  { to: "/channels/sms-broadcasting", Icon: MessageSquareText, title: "SMS Broadcasting", body: "Reliable, universal text campaigns — the safety net RCS falls back to automatically." },
  { to: "/agentic-ai", Icon: Sparkles, title: "Agentic AI", body: "The AI brain that reads every reply, grounds answers in your data, and completes tasks." },
  { to: "/products/omnichannel-inbox", Icon: Inbox, title: "Omnichannel Inbox", body: "Every RCS reply, alongside WhatsApp, SMS, and social, in one shared team inbox." },
]

const relatedLinks = [
  { to: "/integrations", label: "Integrations", Icon: Layers }, { to: "/compare", label: "Compare FloatChat", Icon: Workflow }, { to: "/pricing", label: "Pricing", Icon: Star },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RcsChannelPage() {
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
                  "radial-gradient(closest-side, #93C5FD 0%, transparent 70%)",
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/5 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  RCS Business Messaging · your brand in the default texting app
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Branded RCS messaging with{" "}
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
                  A verified sender, rich cards, and tappable suggested replies
                  that turn texts into experiences — with automatic SMS
                  fallback, and every reply answered by agentic AI.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Verified brand sender",
                    "Rich cards & carousels",
                    "Automatic SMS fallback",
                    "AI answers replies",
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
                  Your brand, in the messaging app customers already use.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <RcsCardMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: BadgeCheck, value: "Verified", label: "brand sender with logo & name" },
                { Icon: ImageIcon, value: "Rich", label: "cards, carousels & media" },
                { Icon: SignalLow, value: "Auto", label: "SMS fallback, no message lost" },
                { Icon: Sparkles, value: "AI", label: "answers every reply in one inbox" },
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
                  Plain SMS gets read — and instantly forgotten.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Text messages open at rates email can only dream of, but
                    they all look the same: a grey bubble from an unknown
                    number, 160 characters, and a link the customer has to
                    trust blind. There&apos;s no logo, no image, no button, and
                    no way to tell your brand apart from a spammer.
                  </p>
                  <p>
                    So the message that could have driven a sale becomes a
                    forgettable one-way blast. And when a customer does reply,
                    it lands nowhere useful — a dead end instead of the start of
                    a conversation.
                  </p>
                  <p>
                    RCS fixes the format:{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      your brand shows up verified
                    </span>
                    , with rich media and tappable actions. FloatChat adds the
                    other half — agentic AI that carries the conversation
                    forward the moment someone taps back.
                  </p>
                </div>
              </BlurFade>

              {/* plain SMS vs branded RCS contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Plain SMS
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Unknown number, no branding",
                        "Text only — no images or cards",
                        "Bare link the customer must trust",
                        "Replies go nowhere useful",
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
                      Branded RCS
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Verified sender with logo & name",
                        "Rich cards, carousels & media",
                        "Tappable suggested-reply chips",
                        "Replies answered by agentic AI",
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
                  A richer text — and a real conversation.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four things RCS gives you on FloatChat: a branded experience,
                  tappable actions, a safety net, and an AI that never lets a
                  reply go unanswered.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                { Icon: BadgeCheck, title: "A branded experience.", body: "A verified sender puts your name, logo, and brand color in the customer's messaging app — plus rich cards and carousels that make a text feel like a mini landing page.", visual: <BrandedVisual /> },
                { Icon: MousePointerClick, title: "Suggested replies & actions.", body: "Give customers tappable chips and buttons so they can respond, track an order, or book a slot in one touch — no typing, no friction, more people who actually act.", visual: <ChipsVisual /> },
                { Icon: SignalLow, title: "Automatic SMS fallback.", body: "When a device can't receive RCS, the same message is delivered as SMS automatically. You compose once and reach everyone on the best format their phone supports.", visual: <FallbackVisual /> },
                { Icon: Sparkles, title: "AI in the conversation.", body: "Every reply lands in the shared inbox, where agentic AI answers, grounds itself in your data, and completes tasks — stepping your team in only when it's truly needed.", visual: <AiInboxVisual /> },
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
                  One send. Every device. A live conversation.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  You compose once. FloatChat decides the best format per
                  device, delivers it, and turns whatever comes back into an
                  AI-answered thread.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Layers, title: "Compose once", note: "rich card + fallback copy" },
                    { Icon: Signal, title: "Detect per device", note: "RCS-capable or not" },
                    { Icon: MessageSquareText, title: "Deliver best format", note: "RCS card or SMS" },
                    { Icon: Sparkles, title: "AI answers replies", note: "in your shared inbox" },
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

            {/* Channel siblings row */}
            <BlurFade delay={0.2}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "RCS", detail: "branded + rich", bg: "#1D4ED8", Lucide: BadgeCheck, Icon: undefined },
                  { name: "SMS", detail: "universal fallback", bg: "#0F2A4A", Lucide: MessageSquareText, Icon: undefined },
                  { name: "WhatsApp", detail: "two-way", bg: "#25D366", Icon: SiWhatsapp, Lucide: undefined },
                  { name: "Instagram", detail: "DMs", bg: "#E4405F", Icon: SiInstagram, Lucide: undefined },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex items-center gap-3"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-md ring-1 ring-black/5 shrink-0"
                      style={{ background: c.bg }}
                    >
                      {c.Icon ? (
                        <c.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : c.Lucide ? (
                        <c.Lucide className="h-[18px] w-[18px] text-white" />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Turn your texts into branded experiences."
          body="Verify your sender, send rich RCS with SMS fallback, and let agentic AI answer every reply."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY IT WORKS / WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Branded, interactive, and never a dead end.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Customers engage more with messages that look like your brand
                  and let them tap to act — and on FloatChat, every one of those
                  taps becomes a conversation your AI can carry.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { Icon: ImageIcon, title: "Higher engagement.", body: "A verified sender with rich media and one-tap actions earns more attention and more clicks than a plain grey text ever could." },
                { Icon: ShieldCheck, title: "Trust by default.", body: "The verified checkmark tells customers it's really you — not a spammer — so they open, tap, and act with confidence." },
                { Icon: Workflow, title: "Every reply lives on.", body: "When someone taps back, agentic AI picks it up in the inbox and keeps the conversation moving instead of leaving it to die." },
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

            {/* Why FloatChat strip */}
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
                    RCS sits alongside WhatsApp, SMS, voice, and social on one
                    platform — one customer record and one AI brain across every
                    channel. So a branded RCS card and the conversation it
                    starts never live in a silo; they&apos;re part of the same
                    thread your whole team can see.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-white/80">
                    {[
                      "One shared inbox",
                      "One customer record",
                      "One AI brain",
                      "Verified sender included",
                    ].map((t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Related" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything RCS connects to.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  RCS is one channel in a bigger system — broadcasting at scale,
                  an SMS safety net, agentic AI, and a shared inbox that ties it
                  all together.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedChannels.map((a, i) => (
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

            {/* pill links */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Also explore
                </span>
                {relatedLinks.map((p) => (
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
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Contact us
                </Link>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-400">
                  <SiGoogle style={{ width: 13, height: 13 }} />
                  RCS via Google & carriers
                </span>
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
              description="Straight answers about branded RCS, SMS fallback, and AI-answered replies."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or see how we{" "}
                  <Link
                    to="/compare"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    compare
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 40%, rgba(191,219,254,0.55) 70%, rgba(207,232,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 25%, #60A5FA 50%, #3B82F6 75%, transparent)",
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
                    "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D4ED8]" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Branded RCS, delivered — with SMS fallback
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
                <span className="text-[11px] font-mono text-slate-400">
                  / START
                </span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Your brand, their messages
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Message customers with{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  branded RCS.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Send verified, rich messages with suggested replies and
                automatic SMS fallback — and let agentic AI answer every
                conversation they start.
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
                "Verified brand sender",
                "Rich cards & carousels",
                "Automatic SMS fallback",
                "AI answers replies",
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
