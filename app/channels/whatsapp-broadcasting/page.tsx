"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Megaphone,
  Check,
  CheckCircle2,
  CheckCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Send,
  Users,
  Image as ImageIcon,
  MousePointerClick,
  ListChecks,
  Layers,
  ShieldCheck,
  Gauge,
  Filter,
  ShoppingBag,
  Inbox,
  GitBranch,
  Zap,
  BadgeCheck,
  Eye,
  Clock,
  Bot,
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
  title: "WhatsApp Broadcasting on the Business API | FloatChat",
  description:
    "Send WhatsApp template campaigns with media, buttons, and Flows to opted-in audiences, then answer replies with agentic AI.",
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
   HERO VISUAL — a WhatsApp broadcast CAMPAIGN composer.
   Three coordinated panels:
     1. Template message preview (media header + body + buttons)
     2. Audience-segment selector (opted-in cohorts, count adds up)
     3. Live delivery-receipts panel that counts up:
        sent → delivered → read as the campaign "runs".
   Distinct from a plain chat mockup: this is a send console.
─────────────────────────────────────────────────────────────── */

type SendPhase = "compose" | "sending" | "delivering" | "reading" | "replies"

function BroadcastComposer() {
  const [phase, setPhase] = useState<SendPhase>("compose")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("compose")
        await wait(1900)
        if (cancelled) return
        setPhase("sending")
        await wait(1600)
        if (cancelled) return
        setPhase("delivering")
        await wait(1800)
        if (cancelled) return
        setPhase("reading")
        await wait(2000)
        if (cancelled) return
        setPhase("replies")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const audience = 12480
  const started = phase !== "compose"
  const sentCount = started ? audience : 0
  const deliveredCount =
    phase === "delivering" || phase === "reading" || phase === "replies"
      ? 12291
      : 0
  const readCount =
    phase === "reading" || phase === "replies" ? 9427 : 0
  const showReplies = phase === "replies"

  const statusLabel =
    phase === "compose"
      ? "Ready to send"
      : phase === "sending"
      ? "Sending campaign…"
      : phase === "delivering"
      ? "Delivering"
      : phase === "reading"
      ? "Opened by audience"
      : "Replies arriving"

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

      {/* Floating "opted-in" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <ShieldCheck className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          100% opted-in audience
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
          Official Business API
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
            app.floatchat.com · broadcast
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {statusLabel}
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[452px]">
          {/* LEFT: audience-segment selector — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-1.5">
              <Filter className="h-3 w-3 text-slate-400" />
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Audience
              </p>
            </div>
            <div className="px-3 py-3 space-y-2">
              <SegmentRow
                label="Cart abandoners · 30d"
                meta="4,120 opted in"
                selected
              />
              <SegmentRow
                label="VIP buyers"
                meta="2,860 opted in"
                selected
              />
              <SegmentRow
                label="Newsletter subscribers"
                meta="5,500 opted in"
                selected
              />
              <SegmentRow
                label="Trial · never purchased"
                meta="3,240 opted in"
                selected={false}
              />
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <div className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2">
                <p className="text-[9px] uppercase tracking-wider text-[#1D4ED8] font-semibold">
                  Reaching
                </p>
                <p className="mt-0.5 text-xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
                  {audience.toLocaleString()}
                </p>
                <p className="mt-1 text-[9px] text-slate-500">
                  contacts · 3 segments merged
                </p>
              </div>
            </div>
          </aside>

          {/* MIDDLE + RIGHT stacked on phones */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Template preview header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-[#25D366] flex items-center justify-center">
                  <SiWhatsapp style={{ color: "#fff", width: 13, height: 13 }} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Template · summer_launch_v3
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Marketing · approved
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                <BadgeCheck className="h-2.5 w-2.5" /> Quality: High
              </span>
            </div>

            {/* Message preview + receipts */}
            <div className="flex-1 px-4 py-3 bg-slate-50/40 overflow-hidden">
              {/* Template bubble */}
              <div className="flex justify-end">
                <div className="max-w-[86%] rounded-xl rounded-br-sm bg-[#DCF8C6] border border-[#c8ecab] overflow-hidden shadow-sm">
                  {/* Media header */}
                  <div className="relative h-20 w-full bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-white/85" />
                    <span className="absolute bottom-1 right-1.5 rounded bg-black/25 px-1 py-0.5 text-[8px] font-medium text-white">
                      header · image
                    </span>
                  </div>
                  {/* Body with merge field */}
                  <div className="px-2.5 py-2">
                    <p className="text-[11px] text-[#0F2A4A] leading-snug">
                      Hi{" "}
                      <span className="rounded bg-[#3B82F6]/15 px-1 font-mono text-[9.5px] text-[#1D4ED8]">
                        {"{{first_name}}"}
                      </span>
                      , your summer picks just dropped — early access ends
                      Sunday. Tap below to shop or ask us anything.
                    </p>
                    <p className="mt-1 text-right text-[8px] text-slate-500">
                      10:00 AM
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="border-t border-[#c8ecab]">
                    <div className="flex items-center justify-center gap-1 px-2 py-1.5 text-[10px] font-medium text-[#1D4ED8]">
                      <ShoppingBag className="h-3 w-3" /> Shop the drop
                    </div>
                    <div className="flex items-center justify-center gap-1 border-t border-[#c8ecab] px-2 py-1.5 text-[10px] font-medium text-[#1D4ED8]">
                      <MousePointerClick className="h-3 w-3" /> Get sizing help
                    </div>
                  </div>
                </div>
              </div>

              {/* Live delivery-receipts panel */}
              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Send className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
                    Delivery receipts
                  </span>
                  <span className="ml-auto font-mono text-[8.5px] text-slate-400">
                    live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ReceiptStat
                    Icon={Check}
                    label="Sent"
                    value={sentCount}
                    tone="slate"
                    active={started}
                  />
                  <ReceiptStat
                    Icon={CheckCheck}
                    label="Delivered"
                    value={deliveredCount}
                    tone="blue"
                    active={deliveredCount > 0}
                  />
                  <ReceiptStat
                    Icon={Eye}
                    label="Read"
                    value={readCount}
                    tone="emerald"
                    active={readCount > 0}
                  />
                </div>
                {/* Progress bar */}
                <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8]"
                    animate={{
                      width:
                        phase === "compose"
                          ? "0%"
                          : phase === "sending"
                          ? "40%"
                          : phase === "delivering"
                          ? "72%"
                          : "100%",
                    }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Replies handled by AI */}
              <AnimatePresence>
                {showReplies && (
                  <motion.div
                    key="reply"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-3 flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="rounded-xl rounded-tl-sm border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-1.5">
                      <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                        142 customers replied &ldquo;what&rsquo;s my size?&rdquo;
                        — AI answered each automatically, in-thread.
                      </p>
                      <span className="mt-0.5 inline-flex items-center gap-1 text-[8.5px] font-medium text-[#1D4ED8]">
                        <Bot className="h-2.5 w-2.5" /> agentic AI · no queue
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Send bar */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Clock className="h-3 w-3 text-slate-400" />
                Send now · or schedule
              </div>
              <button className="ml-auto inline-flex items-center gap-1 text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-3 py-1 rounded-md">
                {phase === "compose" ? "Send broadcast" : "Sending"}
                <Send className="h-3 w-3" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function SegmentRow({
  label,
  meta,
  selected,
}: {
  label: string
  meta: string
  selected: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 transition-colors ${
        selected
          ? "border-[#3B82F6]/40 bg-white shadow-[0_0_0_3px_rgba(59,130,246,0.06)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <span
        className={`h-4 w-4 rounded flex items-center justify-center shrink-0 ${
          selected ? "bg-[#3B82F6] text-white" : "bg-slate-100 text-slate-400"
        }`}
      >
        {selected ? (
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[#0F2A4A] truncate">{label}</p>
        <p className="text-[8.5px] text-slate-400 truncate">{meta}</p>
      </div>
    </div>
  )
}

function ReceiptStat({
  Icon,
  label,
  value,
  tone,
  active,
}: {
  Icon: typeof Check
  label: string
  value: number
  tone: "slate" | "blue" | "emerald"
  active: boolean
}) {
  const toneClass = {
    slate: {
      icon: "text-slate-500",
      value: "text-[#0F2A4A]",
      ring: "border-slate-200 bg-slate-50/60",
    },
    blue: {
      icon: "text-[#1D4ED8]",
      value: "text-[#1D4ED8]",
      ring: "border-[#3B82F6]/25 bg-[#EAF2FF]",
    },
    emerald: {
      icon: "text-emerald-600",
      value: "text-emerald-700",
      ring: "border-emerald-200 bg-emerald-50/60",
    },
  }[tone]

  return (
    <div className={`rounded-lg border px-2 py-1.5 ${toneClass.ring}`}>
      <div className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${toneClass.icon}`} strokeWidth={2.5} />
        <span className="text-[8.5px] uppercase tracking-wider text-slate-500 font-medium">
          {label}
        </span>
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: active ? 1 : 0.35 }}
        className={`mt-0.5 text-[15px] font-semibold tabular-nums leading-none ${toneClass.value}`}
      >
        {value.toLocaleString()}
      </motion.p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you can send" cards
─────────────────────────────────────────────────────────────── */

function TemplateVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Personalized template
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
          <BadgeCheck className="h-2.5 w-2.5" /> approved
        </span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <p className="text-[10px] text-[#0F2A4A] leading-snug">
          Hi{" "}
          <span className="rounded bg-[#3B82F6]/15 px-1 font-mono text-[9px] text-[#1D4ED8]">
            {"{{name}}"}
          </span>
          , order{" "}
          <span className="rounded bg-[#3B82F6]/15 px-1 font-mono text-[9px] text-[#1D4ED8]">
            {"{{order_id}}"}
          </span>{" "}
          is on its way.
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <Users className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9px] text-slate-500">
          Merged for 12,480 recipients
        </span>
      </div>
    </div>
  )
}

function RichVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] h-12 flex items-center justify-center">
        <ImageIcon className="h-4 w-4 text-white/85" />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { Icon: ShoppingBag, label: "Shop now" },
          { Icon: MousePointerClick, label: "Book a call" },
          { Icon: ListChecks, label: "Pick a plan" },
          { Icon: ArrowUpRight, label: "Visit site" },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1 text-[9px] font-medium text-[#1D4ED8]"
          >
            <b.Icon className="h-2.5 w-2.5" /> {b.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowsVisual() {
  const steps = [
    { label: "Ask goal", done: true },
    { label: "Collect details", done: true },
    { label: "Confirm booking", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Layers className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          In-chat Flow
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">no app switch</span>
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
              active
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function CommerceVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <MousePointerClick className="h-3 w-3 text-[#3B82F6]" />
        <span className="text-[9.5px] text-[#0F2A4A] flex-1 truncate">
          Click-to-WhatsApp ad tapped
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-emerald-200 bg-emerald-50/50 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <ShoppingBag className="h-3 w-3 text-emerald-700" />
          <span className="text-[9.5px] font-semibold text-emerald-800">
            Catalog message sent
          </span>
        </div>
        <p className="mt-1 text-[9px] text-emerald-900 leading-snug">
          Product cards open a conversation, not a landing page.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Related broadcasting channels (brand tiles)
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  detail: string
  to: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof Send
}

const relatedChannels: ChannelTile[] = [
  {
    name: "WhatsApp",
    detail: "two-way inbox",
    to: "/channels/whatsapp",
    bg: "#25D366",
    Icon: SiWhatsapp,
  },
  {
    name: "SMS broadcasting",
    detail: "text campaigns",
    to: "/channels/sms-broadcasting",
    bg: "#0F2A4A",
    Lucide: Send,
  },
  {
    name: "RCS broadcasting",
    detail: "rich Android",
    to: "/channels/rcs-broadcasting",
    bg: "#1D4ED8",
    Lucide: Sparkles,
  },
  {
    name: "Omnichannel inbox",
    detail: "one shared queue",
    to: "/products/omnichannel-inbox",
    bg: "#3B82F6",
    Lucide: Inbox,
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is this the official WhatsApp Business API?",
    answer:
      "Yes. FloatChat sends every campaign through the official WhatsApp Business Platform (Cloud API) with a verified business sender and your approved message templates. That means the green tick where you qualify, higher trust with recipients, and none of the ban risk that comes with grey-market broadcast tools that automate the consumer app.",
  },
  {
    question: "Can the AI actually answer broadcast replies?",
    answer:
      "Automatically. The moment a customer replies to a campaign, the reply opens a 24-hour service window and your agentic AI agent picks it up — answering questions, looking up orders, and completing tasks grounded in your data. Your team only steps in for the conversations that genuinely need a human, and the agent hands those off in-thread with full context.",
  },
  {
    question: "What can a template message contain?",
    answer:
      "Approved templates support a media header (image, video, or document), a personalized body with merge fields, and interactive buttons — quick replies, call-to-action links, list menus, and copy-code offers. You can also trigger a WhatsApp Flow for multi-step forms like bookings, onboarding, or lead capture, all inside the chat.",
  },
  {
    question: "How do opt-outs, quality rating, and messaging limits work?",
    answer:
      "FloatChat only sends to contacts who opted in, honors opt-out keywords automatically, and suppresses anyone who has left. As you scale, the platform monitors your quality rating and messaging limit tier in real time and warns you before a campaign puts your sender at risk — so a big send never quietly downgrades your number.",
  },
  {
    question: "Can I personalize and segment large audiences?",
    answer:
      "Yes. Build segments from contact attributes, tags, lifecycle stage, and past behavior, then merge fields personalize each message per recipient. You can send now or schedule for the recipient's local send-time, and every delivery and read receipt flows back into your reporting.",
  },
  {
    question: "Do broadcasts and conversations live in the same place?",
    answer:
      "They do — that's the point. Broadcasting, the AI agent, and the shared inbox are one platform. A campaign reply doesn't vanish into a separate tool; it becomes a real conversation your AI and your team can carry forward, with the full campaign and customer history attached.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WhatsApp Broadcasting",
  serviceType: "WhatsApp Business API broadcasting and campaigns",
  description:
    "Send WhatsApp template campaigns with media, buttons, and Flows to opted-in audiences on the official WhatsApp Business API, then answer every reply automatically with agentic AI.",
  url: "https://www.floatchat.com/channels/whatsapp-broadcasting",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Marketing, growth, and customer engagement teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/channels/whatsapp",
    Icon: SiWhatsapp,
    brand: true,
    title: "WhatsApp inbox",
    body: "Two-way conversations and the AI agent on the same number.",
  },
  {
    to: "/channels/sms-broadcasting",
    Icon: Send,
    brand: false,
    title: "SMS broadcasting",
    body: "Reach anyone with a phone number — no app required.",
  },
  {
    to: "/channels/rcs-broadcasting",
    Icon: Sparkles,
    brand: false,
    title: "RCS broadcasting",
    body: "Rich, branded messaging for Android audiences.",
  },
  {
    to: "/agentic-ai",
    Icon: Bot,
    brand: false,
    title: "Agentic AI",
    body: "The agent that answers every broadcast reply on its own.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    brand: false,
    title: "Omnichannel inbox",
    body: "Every campaign reply in one shared, AI-assisted queue.",
  },
  {
    to: "/integrations",
    Icon: Zap,
    brand: false,
    title: "Integrations",
    body: "Sync segments and events from the tools you already use.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function WhatsAppBroadcastingPage() {
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
                  <Megaphone className="h-3.5 w-3.5" />
                  WhatsApp Broadcasting · official Business API
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  WhatsApp broadcasting at scale,{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    answered by agentic AI.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Send template campaigns with media, buttons, and Flows to
                  opted-in audiences on the WhatsApp Business API — then let
                  agentic AI handle every reply, automatically.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Official Business API",
                    "Media, buttons & Flows",
                    "Opted-in audiences only",
                    "Replies handled by AI",
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
                  Campaigns and conversations on one platform.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <BroadcastComposer />
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
                  Icon: ShieldCheck,
                  value: "Official",
                  label: "WhatsApp Business API sender",
                },
                {
                  Icon: ImageIcon,
                  value: "Rich",
                  label: "templates with media & buttons",
                },
                {
                  Icon: Layers,
                  value: "Flows",
                  label: "in-chat forms & journeys",
                },
                {
                  Icon: Bot,
                  value: "AI",
                  label: "handles every broadcast reply",
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
                  A broadcast no one can answer is a missed opportunity.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    WhatsApp gets opened. That&apos;s the whole appeal — open
                    rates that dwarf email, on a channel your customers already
                    live in. So you send a campaign, thousands of people read it
                    in minutes, and hundreds of them tap reply with a real
                    question.
                  </p>
                  <p>
                    Most broadcast tools have no idea what to do next. They blast
                    the message and treat the reply as someone else&apos;s
                    problem — piling up in an inbox nobody watches, going cold
                    while the customer&apos;s intent evaporates.
                  </p>
                  <p>
                    FloatChat turns every broadcast into a{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      conversation your agentic AI can carry forward
                    </span>{" "}
                    — so the reply that a blast tool would drop becomes a
                    booking, an order, or an answered question, automatically.
                  </p>
                </div>
              </BlurFade>

              {/* blast tool vs FloatChat contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A blast-only tool
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Sends, then abandons the reply",
                        "Grey-market API risks your number",
                        "No AI — replies pile up unanswered",
                        "Campaign lives apart from your inbox",
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
                      FloatChat broadcasting
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Every reply becomes a conversation",
                        "Official Business API, verified sender",
                        "Agentic AI answers replies on its own",
                        "Campaigns and inbox on one platform",
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

        {/* ───── WHAT YOU CAN SEND ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What you can send" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  More than a message. A moment to act.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four ways to reach opted-in audiences — each one built to start
                  a conversation, not just deliver a notification.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Users,
                  title: "Template campaigns.",
                  body:
                    "Broadcast approved templates to large opted-in audiences with merge-field personalization — every recipient gets a message that reads like it was written for them, at any scale.",
                  visual: <TemplateVisual />,
                },
                {
                  Icon: ImageIcon,
                  title: "Rich messages.",
                  body:
                    "Add a media header, quick-reply and call-to-action buttons, and list or CTA replies so customers act without ever leaving the chat — shop, book, or ask in one tap.",
                  visual: <RichVisual />,
                },
                {
                  Icon: Layers,
                  title: "WhatsApp Flows.",
                  body:
                    "Run in-chat forms and guided journeys for onboarding, bookings, and lead capture. Multi-step, structured, and native to WhatsApp — no landing page, no drop-off.",
                  visual: <FlowsVisual />,
                },
                {
                  Icon: ShoppingBag,
                  title: "Click-to-WhatsApp & commerce.",
                  body:
                    "Use ad entry points and catalog messages to turn interest into conversation. A tap on an ad opens a thread; product cards turn browsing into buying, right inside chat.",
                  visual: <CommerceVisual />,
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

        {/* ───── BROADCASTING MEETS AGENTIC AI ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* copy */}
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="03" label="Broadcasting meets AI" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The reply is where the value is.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    When customers reply to a campaign, the agentic AI answers
                    automatically — grounded in your data, completing tasks like
                    order lookups and bookings, and handing off to a human only
                    when it truly matters. Your team gets a copilot that drafts
                    and suggests, so even the escalations move faster.
                  </p>
                  <p>
                    And because a big send is only as good as a healthy sender,
                    FloatChat monitors your{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      quality rating and messaging-limit tier
                    </span>{" "}
                    in real time — warning you before a campaign puts your number
                    at risk, and honoring opt-outs and suppression automatically.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      Icon: Bot,
                      title: "AI answers replies",
                      body: "Automatic, grounded, in-thread.",
                    },
                    {
                      Icon: Sparkles,
                      title: "Copilot for your team",
                      body: "Drafts and suggests on escalations.",
                    },
                    {
                      Icon: Gauge,
                      title: "Quality monitoring",
                      body: "Rating & limit tier watched live.",
                    },
                    {
                      Icon: ShieldCheck,
                      title: "Opt-outs handled",
                      body: "Suppression built in, always.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5"
                    >
                      <div className="h-9 w-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center shrink-0">
                        <c.Icon className="h-4 w-4 text-[#1D4ED8]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                          {c.title}
                        </p>
                        <p className="mt-0.5 text-[11.5px] text-slate-500 leading-snug">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </BlurFade>

              {/* sender-health panel */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-7 shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)]">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-[#25D366] flex items-center justify-center">
                        <SiWhatsapp
                          style={{ color: "#fff", width: 16, height: 16 }}
                        />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                          Sender health
                        </p>
                        <p className="text-[11px] text-slate-500">
                          +1 (415) ••• · verified
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <BadgeCheck className="h-3 w-3" /> Healthy
                    </span>
                  </div>

                  <div className="space-y-3">
                    <HealthBar
                      label="Quality rating"
                      value="High"
                      pct={92}
                      tone="emerald"
                    />
                    <HealthBar
                      label="Messaging limit tier"
                      value="100K / day"
                      pct={68}
                      tone="blue"
                    />
                    <HealthBar
                      label="Opt-out rate"
                      value="0.3%"
                      pct={12}
                      tone="blue"
                    />
                  </div>

                  <div className="mt-5 rounded-xl border border-[#3B82F6]/25 bg-[#EAF2FF] px-3 py-2.5 flex items-start gap-2">
                    <Gauge className="h-4 w-4 text-[#1D4ED8] mt-0.5 shrink-0" />
                    <p className="text-[11.5px] text-[#0F2A4A] leading-snug">
                      Next tier unlocks at{" "}
                      <span className="font-semibold">1M messages / day</span> —
                      keep quality High and FloatChat requests the upgrade for
                      you.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { Icon: CheckCheck, label: "98.5%", note: "delivered" },
                      { Icon: Eye, label: "75.6%", note: "read" },
                      { Icon: Bot, label: "1.1%", note: "AI-answered" },
                    ].map((m) => (
                      <div
                        key={m.note}
                        className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-2 text-center"
                      >
                        <m.Icon className="h-3.5 w-3.5 text-[#1D4ED8] mx-auto" />
                        <p className="mt-1 text-[13px] font-semibold text-[#0F2A4A] tabular-nums leading-none">
                          {m.label}
                        </p>
                        <p className="text-[9px] text-slate-500 mt-0.5">
                          {m.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One platform, so a reply is never a dead end.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Broadcasting, the AI agent, and the inbox share the same
                  foundation. That&apos;s what separates a campaign reply that
                  converts from one that goes cold in a tool nobody opens.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Send,
                  title: "Campaign meets conversation",
                  body:
                    "The same message that broadcasts to thousands opens a real, two-way thread the instant someone replies — no export, no separate tool, no lost context.",
                },
                {
                  Icon: Bot,
                  title: "Answered, not just delivered",
                  body:
                    "The agentic AI that powers your inbox answers broadcast replies on its own, so a send that drives volume doesn't bury your team.",
                },
                {
                  Icon: Inbox,
                  title: "Everything in one queue",
                  body:
                    "Replies land in the shared omnichannel inbox alongside every other channel, with the campaign and customer history attached.",
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.07} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_24px_50px_-28px_rgba(15,42,74,0.22)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-4">
                      <f.Icon className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2.25} />
                    </div>
                    <h3 className="text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Send your first WhatsApp campaign this week."
          body="Broadcast approved templates to opted-in audiences and let agentic AI answer every reply — all on one platform."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── RELATED CHANNELS (brand tiles) ───── */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-10">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="More channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Broadcast anywhere your customers are.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Reach the same audiences on the channels that fit — every one
                  wired to the same AI and the same inbox.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {relatedChannels.map((c) => (
                  <Link
                    key={c.name}
                    to={c.to}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: c.bg }}
                    >
                      {c.Icon ? (
                        <c.Icon
                          style={{ color: "#FFFFFF", width: 18, height: 18 }}
                        />
                      ) : c.Lucide ? (
                        <c.Lucide className="h-[18px] w-[18px] text-white" />
                      ) : null}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate flex items-center gap-1">
                        {c.name}
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {c.detail}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-16 lg:py-24 bg-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <SectionEyebrow num="06" label="Keep exploring" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05] mb-10">
                Related products and channels.
              </h2>
            </BlurFade>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((l, i) => (
                <BlurFade key={l.to} delay={0.04 + i * 0.06} className="h-full">
                  <Link
                    to={l.to}
                    className="group h-full flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
                        l.brand
                          ? "bg-[#25D366]"
                          : "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]"
                      }`}
                    >
                      {l.brand ? (
                        <l.Icon
                          style={{ color: "#FFFFFF", width: 20, height: 20 }}
                        />
                      ) : (
                        <l.Icon
                          className="h-5 w-5 text-white"
                          style={{ color: "#FFFFFF" }}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-[#0F2A4A] flex items-center gap-1">
                        {l.title}
                        <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#1D4ED8] transition-colors" />
                      </p>
                      <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                        {l.body}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <span className="text-slate-500">Also useful:</span>
                <Link
                  to="/compare"
                  className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:text-[#1E40AF]"
                >
                  <GitBranch className="h-3.5 w-3.5" /> Compare FloatChat
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:text-[#1E40AF]"
                >
                  <Gauge className="h-3.5 w-3.5" /> Pricing
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:text-[#1E40AF]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" /> Talk to sales
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="WhatsApp broadcasting, answered"
              description="How campaigns, compliance, and agentic AI fit together on FloatChat."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#0F2A4A] via-[#12325A] to-[#0F2A4A]">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.6), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#60A5FA] mb-6">
                <Megaphone className="h-3.5 w-3.5" />
                WhatsApp Broadcasting
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.08]">
                Broadcast on WhatsApp and let{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#93C5FD] bg-clip-text text-transparent">
                  AI handle the replies.
                </span>
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Send template campaigns with media, buttons, and Flows to your
                opted-in audiences — then watch agentic AI turn every reply into
                a conversation that moves.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/20 transition-all"
                >
                  Start Free
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-slate-400">
                {[
                  "Official Business API",
                  "Opted-in audiences",
                  "Replies handled by AI",
                ].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#60A5FA]" />
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

/* ─────────────────────────────────────────────────────────────
   Sender-health bar
─────────────────────────────────────────────────────────────── */

function HealthBar({
  label,
  value,
  pct,
  tone,
}: {
  label: string
  value: string
  pct: number
  tone: "blue" | "emerald"
}) {
  const barClass =
    tone === "emerald"
      ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
      : "bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] text-slate-500">{label}</span>
        <span
          className={`text-[12px] font-semibold ${
            tone === "emerald" ? "text-emerald-700" : "text-[#1D4ED8]"
          }`}
        >
          {value}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barClass}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
