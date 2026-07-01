"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Share2,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Inbox,
  MessageSquare,
  MessageCircle,
  Users,
  Phone,
  Mail,
  Layers,
  Gauge,
  Timer,
  Smile,
  GitBranch,
  Workflow,
  BarChart3,
  Search,
  Star,
} from "lucide-react"
import { SiInstagram, SiMessenger, SiWhatsapp } from "react-icons/si"
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
  title: "Omnichannel Social Media Inbox with Agentic AI | FloatChat",
  description:
    "Unify Instagram and Messenger DMs with chat, voice, SMS, and email in one inbox, answered by agentic AI across every platform.",
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
   Small brand-logo chip (the ONLY place real brand colors appear)
─────────────────────────────────────────────────────────────── */

type ChannelKind = "instagram" | "messenger" | "chat" | "sms" | "whatsapp"

function ChannelChip({
  kind,
  size = 18,
}: {
  kind: ChannelKind
  size?: number
}) {
  const map: Record<
    ChannelKind,
    { bg: string; render: (s: number) => React.ReactNode }
  > = {
    instagram: {
      bg: "#E4405F",
      render: (s) => <SiInstagram style={{ color: "#fff", width: s, height: s }} />,
    },
    messenger: {
      bg: "#0084FF",
      render: (s) => <SiMessenger style={{ color: "#fff", width: s, height: s }} />,
    },
    whatsapp: {
      bg: "#25D366",
      render: (s) => <SiWhatsapp style={{ color: "#fff", width: s, height: s }} />,
    },
    chat: {
      bg: "#3B82F6",
      render: (s) => <MessageCircle style={{ color: "#fff", width: s, height: s }} />,
    },
    sms: {
      bg: "#0F2A4A",
      render: (s) => <MessageSquare style={{ color: "#fff", width: s, height: s }} />,
    },
  }
  const c = map[kind]
  const box = size + 10
  return (
    <span
      className="rounded-lg flex items-center justify-center shrink-0 ring-1 ring-black/5"
      style={{ background: c.bg, width: box, height: box }}
    >
      {c.render(size)}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO MOCKUP — a UNIFIED social inbox.
   Left: one conversation list where every row mixes channels
   (Instagram / Messenger / chat / SMS). Right: the selected thread
   with an agentic-AI reply. The selection cycles to reinforce the
   "everything in one inbox" idea.
─────────────────────────────────────────────────────────────── */

type ThreadRow = {
  id: string
  name: string
  handle: string
  channel: ChannelKind
  preview: string
  time: string
  unread?: number
  img: string
}

const inboxRows: ThreadRow[] = [
  {
    id: "r1",
    name: "Priya Menon",
    handle: "@priya.styles",
    channel: "instagram",
    preview: "Is the linen set back in stock in size M?",
    time: "2m",
    unread: 2,
    img: "https://i.pravatar.cc/80?img=32",
  },
  {
    id: "r2",
    name: "Daniel Osei",
    handle: "Messenger",
    channel: "messenger",
    preview: "Where's my order #A-2291? Says shipped 3 days ago",
    time: "5m",
    img: "https://i.pravatar.cc/80?img=13",
  },
  {
    id: "r3",
    name: "Website visitor",
    handle: "Web chat · live",
    channel: "chat",
    preview: "Do you ship to Canada, and how long?",
    time: "6m",
    unread: 1,
    img: "https://i.pravatar.cc/80?img=47",
  },
  {
    id: "r4",
    name: "Lucia Ferrari",
    handle: "SMS · +39",
    channel: "sms",
    preview: "Can I change my delivery address?",
    time: "11m",
    img: "https://i.pravatar.cc/80?img=5",
  },
  {
    id: "r5",
    name: "Marcus Webb",
    handle: "@marcuswebb",
    channel: "instagram",
    preview: "Loved the new drop — any discount for a bundle?",
    time: "18m",
    img: "https://i.pravatar.cc/80?img=68",
  },
]

const channelLabel: Record<ChannelKind, string> = {
  instagram: "Instagram DM",
  messenger: "Messenger",
  chat: "Web chat",
  sms: "SMS",
  whatsapp: "WhatsApp",
}

function UnifiedInboxMockup() {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSelected((s) => (s + 1) % inboxRows.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  const active = inboxRows[selected]

  // agent reply text keyed to the selected thread
  const agentReply: Record<string, string> = {
    r1: "Yes! The linen set is back in size M — I've reserved one and dropped the checkout link in your DMs. 🌿",
    r2: "Order #A-2291 is out for delivery today by 6pm. Here's your live tracking link — no action needed on your end.",
    r3: "We do ship to Canada — 3–5 business days, free over $75. Want me to start your cart?",
    r4: "Done — I've updated the delivery address on your open order and sent an SMS confirmation.",
    r5: "Bundles get 15% off automatically at checkout — I've applied it to your cart. Want the link?",
  }

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
          One inbox · every platform
        </span>
      </motion.div>

      {/* Floating resolved chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          AI answered · 18s
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
            app.floatchat.com · social inbox
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Conversation list — mixed channels per row */}
          <aside className="col-span-12 md:col-span-5 border-r border-slate-200 bg-slate-50/40 flex flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                All conversations
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                <Layers className="h-2.5 w-2.5" /> 4 channels
              </span>
            </div>
            <div className="px-2.5 py-2 border-b border-slate-200">
              <div className="flex items-center gap-1.5 h-6 rounded-md bg-white border border-slate-200 px-2">
                <Search className="h-3 w-3 text-slate-400" />
                <span className="text-[9.5px] text-slate-400">Search everyone…</span>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {inboxRows.map((r, i) => {
                const isActive = i === selected
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelected(i)}
                    className={`w-full text-left flex items-start gap-2 px-2.5 py-2 border-b border-slate-100 transition-colors ${
                      isActive ? "bg-white" : "hover:bg-white/60"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="inbox-active-bar"
                        className="absolute left-0 h-9 w-[3px] rounded-r bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8]"
                      />
                    )}
                    <div className="relative shrink-0">
                      <img
                        src={r.img}
                        alt={r.name}
                        loading="lazy"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      {/* per-channel brand chip badge */}
                      <span className="absolute -bottom-1 -right-1">
                        <ChannelChip kind={r.channel} size={9} />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[11px] font-semibold text-[#0F2A4A] truncate">
                          {r.name}
                        </p>
                        <span className="ml-auto text-[8.5px] text-slate-400 shrink-0">
                          {r.time}
                        </span>
                      </div>
                      <p className="text-[8.5px] text-slate-400 truncate">
                        {channelLabel[r.channel]} · {r.handle}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500 truncate leading-snug">
                        {r.preview}
                      </p>
                    </div>
                    {r.unread ? (
                      <span className="mt-4 h-4 min-w-4 px-1 rounded-full bg-[#1D4ED8] text-white text-[8px] font-semibold flex items-center justify-center shrink-0">
                        {r.unread}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Selected thread */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white">
            {/* Thread header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={active.img}
                    alt={active.name}
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-1 -right-1">
                    <ChannelChip kind={active.channel} size={8} />
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    {active.name}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {channelLabel[active.channel]} · {active.handle}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Agent on
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {/* channel context banner */}
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2.5 py-0.5 text-[8.5px] text-slate-500">
                      <ChannelChip kind={active.channel} size={8} />
                      Started on {channelLabel[active.channel]}
                    </span>
                  </div>

                  {/* incoming */}
                  <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        {active.preview}
                      </p>
                      <p className="text-[8px] text-slate-400 mt-0.5">
                        {active.time} ago
                      </p>
                    </div>
                  </div>

                  {/* agent reply */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                    className="flex items-start gap-1.5 justify-end"
                  >
                    <div className="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[11px] text-white leading-snug">
                        {agentReply[active.id]}
                      </p>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                  </motion.div>

                  {/* resolved line */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex items-center justify-end gap-1.5 pr-7"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9px] font-medium text-emerald-600">
                      Answered on {channelLabel[active.channel]} · same inbox
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Reply on {channelLabel[active.channel]}, add a note, or hand off…
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

function SocialInOneVisual() {
  const rows: { kind: ChannelKind; label: string; note: string }[] = [
    { kind: "instagram", label: "Instagram", note: "DMs + story replies" },
    { kind: "messenger", label: "Messenger", note: "Page inbox" },
    { kind: "chat", label: "Web chat", note: "on-site widget" },
    { kind: "sms", label: "SMS", note: "two-way text" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Every platform · one thread list
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> unified
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <ChannelChip kind={r.kind} size={11} />
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <span className="ml-auto text-[9px] text-slate-500 truncate">{r.note}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function AiAnswersVisual() {
  const steps = [
    { label: "Read the Instagram DM", done: true },
    { label: "Check stock + policy", done: true },
    { label: "Reply in-platform", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Agentic AI · answers automatically
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">24/7</span>
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
              running
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function OperationsVisual() {
  const metrics = [
    { Icon: Timer, label: "First response", value: "18s", tone: "blue" as const },
    { Icon: Gauge, label: "SLA on track", value: "98%", tone: "emerald" as const },
    { Icon: Smile, label: "CSAT", value: "4.8", tone: "blue" as const },
    { Icon: GitBranch, label: "Routed", value: "auto", tone: "blue" as const },
  ]
  const toneClass = {
    blue: "text-[#1D4ED8]",
    emerald: "text-emerald-600",
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Managed like every other channel
        </span>
        <BarChart3 className="h-3 w-3 text-slate-400" />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
          >
            <div className="flex items-center gap-1.5">
              <m.Icon className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[8.5px] text-slate-500 truncate">{m.label}</span>
            </div>
            <p className={`mt-0.5 text-[13px] font-semibold ${toneClass[m.tone]}`}>
              {m.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function UnifiedRecordVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/80?img=32"
          alt="Customer record"
          loading="lazy"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-[#0F2A4A] leading-tight">
            Priya Menon
          </p>
          <p className="text-[8.5px] text-slate-400">One record · all history</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700">
          <Users className="h-2.5 w-2.5" /> merged
        </span>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {(["instagram", "messenger", "chat", "sms"] as ChannelKind[]).map((k) => (
          <ChannelChip key={k} kind={k} size={9} />
        ))}
        <span className="text-[8.5px] text-slate-500">3 past orders · VIP</span>
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          The same identity follows every DM
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Cross-links: individual channels + platform
─────────────────────────────────────────────────────────────── */

type ChannelLink = {
  to: string
  name: string
  detail: string
  kind: ChannelKind
}

const channelLinks: ChannelLink[] = [
  {
    to: "/channels/instagram",
    name: "Instagram",
    detail: "DMs, story replies & comments, answered by AI.",
    kind: "instagram",
  },
  {
    to: "/channels/messenger",
    name: "Messenger",
    detail: "Your Facebook Page inbox on autopilot.",
    kind: "messenger",
  },
  {
    to: "/channels/web-chat",
    name: "Web chat",
    detail: "The on-site widget that greets every visitor.",
    kind: "chat",
  },
  {
    to: "/channels/whatsapp",
    name: "WhatsApp",
    detail: "Two-way conversations at scale.",
    kind: "whatsapp",
  },
]

const relatedProducts = [
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: Inbox },
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Which social platforms does the inbox cover?",
    answer:
      "Instagram and Messenger direct messages today, unified in a single inbox alongside web chat, SMS, voice, and email. Every DM lands in the same conversation list as the rest of your channels, so your team never opens a separate app to reply to a comment or story reply again.",
  },
  {
    question: "Can the agentic AI actually answer social DMs on its own?",
    answer:
      "Yes — automatically, across every platform. The agent reads the incoming DM, grounds its answer in your knowledge base and connected systems, and replies in-platform in the customer's language. It handles the repetitive social questions — sizing, availability, order status, shipping — and only escalates the conversations that genuinely need a person.",
  },
  {
    question: "Is social support measurable, or is it a black box?",
    answer:
      "It's measured exactly like every other channel. Instagram and Messenger conversations run through the same routing rules, SLA timers, and CSAT surveys as chat and email — so you can finally report on social response times, resolution rates, and satisfaction next to everything else instead of guessing.",
  },
  {
    question: "Do conversations stay tied to the customer across channels?",
    answer:
      "Yes. When someone DMs you on Instagram and later texts or opens a web chat, it's one customer record with the full history attached. Your agents — human or AI — see every past order and message, so nobody asks the customer to repeat themselves just because they switched apps.",
  },
  {
    question: "How does a human take over a social conversation?",
    answer:
      "In the same thread, with full context. When the AI reaches the edge of what it should resolve, it hands the DM to a teammate along with the order data, the customer's history, and a short summary — so the handoff feels seamless to the customer and there are no repeat questions.",
  },
  {
    question: "How quickly can we go live on social?",
    answer:
      "Days, not months. Connect your Instagram and Messenger accounts, point the agent at your help center and policies, and it starts answering. There are no conversation trees to map and no code to write, so most teams are resolving real social DMs within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Omnichannel Social Media Inbox",
  serviceType: "Agentic AI social media customer support",
  description:
    "Unify Instagram and Messenger DMs with web chat, voice, SMS, and email in one inbox, answered automatically by agentic AI with routing, SLA, and CSAT built in.",
  url: "https://www.floatchat.com/channels/social",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Social media, community, and customer support teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function SocialChannelPage() {
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
                  <Share2 className="h-3.5 w-3.5" />
                  Omnichannel Social · one inbox for every DM
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  All your social conversations,{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    one agentic AI inbox.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Bring Instagram and Messenger DMs together with chat, voice,
                  SMS, and email — answered by agentic AI on every platform, from
                  a single inbox your whole team shares.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Instagram + Messenger DMs",
                    "AI answers across platforms",
                    "Routing, SLA & CSAT",
                    "One customer record",
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
                  Social support without switching apps.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <UnifiedInboxMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Inbox, value: "1", label: "inbox for every social DM" },
                { Icon: Sparkles, value: "AI", label: "answers across platforms" },
                { Icon: Gauge, value: "SLA", label: "routing + CSAT on social" },
                { Icon: Users, value: "1", label: "record per customer" },
              ].map((s, i) => (
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
                  Social lives in a dozen apps — and none of them talk.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A question arrives in an Instagram DM. The next one is a
                    Messenger reply. A third is a comment, a fourth an SMS. Your
                    team hops between apps all day, and every switch is a chance
                    to miss a message, lose the thread, or answer too late.
                  </p>
                  <p>
                    Because none of those apps share history, the same customer
                    looks like three different strangers. And because there are no
                    SLA timers or reports, social support is impossible to measure
                    — you only find out it&apos;s slow when someone complains
                    publicly.
                  </p>
                  <p>
                    A single{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      omnichannel social inbox
                    </span>{" "}
                    brings every DM into one place with the rest of your channels,
                    with agentic AI answering the routine ones and full context on
                    every handoff.
                  </p>
                </div>
              </BlurFade>

              {/* scattered vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Scattered across apps
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "One tab per platform, all day",
                        "DMs slip through and go unanswered",
                        "Same customer, three separate chats",
                        "No SLA, no CSAT, no reporting",
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
                      One unified inbox
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Every DM in one conversation list",
                        "Agentic AI answers the routine ones",
                        "One customer record, full history",
                        "Routing, SLA timers, and CSAT built in",
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
                  A social inbox that actually runs itself.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four things you get on day one — social unified with the rest of
                  your channels, answered by AI, and measured like everything else.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Inbox,
                  title: "Social in one place.",
                  body:
                    "Instagram and Messenger DMs sit in the same conversation list as chat, voice, SMS, and email. No more tab-hopping — every message your brand receives lands in one shared inbox.",
                  visual: <SocialInOneVisual />,
                },
                {
                  Icon: Sparkles,
                  title: "AI that answers.",
                  body:
                    "The agentic AI handles routine social questions automatically — sizing, availability, order status, returns — replying in-platform in the customer's language and only escalating what needs a person.",
                  visual: <AiAnswersVisual />,
                },
                {
                  Icon: Gauge,
                  title: "Built for operations.",
                  body:
                    "Route DMs to the right team, hold them to SLA timers, and survey CSAT — so social support scales like a real channel instead of a side project buried in someone's phone.",
                  visual: <OperationsVisual />,
                },
                {
                  Icon: Users,
                  title: "Unified customer.",
                  body:
                    "One record ties every Instagram DM, Messenger message, and web chat to the same person and their full order history — so nobody repeats themselves and nothing gets lost between platforms.",
                  visual: <UnifiedRecordVisual />,
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

        {/* ───── CHANNELS IN THE INBOX STRIP ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="In the inbox" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Social DMs, sitting next to every other channel.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Instagram and Messenger DMs share the same list — and the same
                  AI, routing, and history — as chat, SMS, voice, and email.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {(
                  [
                    { kind: "instagram", name: "Instagram", detail: "DMs" },
                    { kind: "messenger", name: "Messenger", detail: "Page inbox" },
                    { kind: "chat", name: "Web chat", detail: "on-site" },
                    { kind: "sms", name: "SMS", detail: "two-way" },
                    { kind: "whatsapp", name: "WhatsApp", detail: "at scale" },
                  ] as { kind: ChannelKind; name: string; detail: string }[]
                ).map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <ChannelChip kind={c.kind} size={18} />
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                ))}
                {/* email tile — no brand color, stays in the blue system */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5">
                  <span className="h-7 w-7 rounded-lg bg-[#1D4ED8] flex items-center justify-center ring-1 ring-black/5">
                    <Mail className="h-[18px] w-[18px] text-white" />
                  </span>
                  <div className="min-w-0 w-full">
                    <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                      Email
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      shared inbox
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Stop juggling apps. Start measuring social.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  When every DM shares one inbox, three things change at once —
                  for your team, your customers, and your reporting.
                </p>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Layers,
                  title: "Your team stops app-hopping.",
                  body:
                    "No more bouncing between the Instagram app, the Page inbox, and a chat tool. One screen holds every social conversation, so nothing slips and nobody wastes a shift switching windows.",
                },
                {
                  Icon: Timer,
                  title: "Customers get fast replies.",
                  body:
                    "Wherever someone messages you, agentic AI is already there to answer instantly — and when a human is needed, the handoff carries full context so the reply still feels effortless.",
                },
                {
                  Icon: BarChart3,
                  title: "You finally measure it.",
                  body:
                    "Social response times, resolution rates, and CSAT sit right next to your other channels — so social support becomes a number you can manage, not a blind spot you hope is fine.",
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

            {/* Why FloatChat strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                    Why FloatChat
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Social is part of a platform that runs your AI, your campaigns,
                    and your numbers — not a bolt-on social tool. One inbox, one
                    customer record, and the same agentic AI answering everywhere
                    your customers reach out.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Unify your social conversations with agentic AI."
          body="Connect Instagram and Messenger, point the AI at your knowledge base, and go live in days — no per-message fees."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED / CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Go deeper on each platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every channel below feeds the same unified inbox — pick one to
                  see how agentic AI handles it in detail.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {channelLinks.map((c, i) => (
                <BlurFade key={c.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <ChannelChip kind={c.kind} size={18} />
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {c.detail}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Explore
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* platform-level cross-links */}
            <BlurFade delay={0.3}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 lg:p-7">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                  <div className="lg:flex-1">
                    <h3 className="text-lg font-semibold text-[#0F2A4A]">
                      One platform behind every channel
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-xl">
                      The social inbox rides on the same omnichannel inbox,
                      agentic AI, and integrations that power the rest of
                      FloatChat.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {relatedProducts.map((p) => (
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
                </div>
              </div>
            </BlurFade>

            {/* quick nav row */}
            <BlurFade delay={0.35}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  More
                </span>
                {[
                  { to: "/pricing", label: "Pricing", Icon: Star },
                  { to: "/contact", label: "Talk to sales", Icon: Phone },
                  { to: "/demo", label: "Book a demo", Icon: MessageCircle },
                ].map((p) => (
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
              description="Straight answers about unifying social, AI replies, and going live."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/demo"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    book a demo
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
                  Answering social DMs across platforms right now
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
                  One inbox for every DM
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Unify your social conversations with{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Bring Instagram and Messenger DMs into one inbox with chat, voice,
                SMS, and email — answered automatically, measured properly, and
                shared by your whole team.
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
                "Instagram + Messenger DMs",
                "AI answers across platforms",
                "Routing, SLA & CSAT",
                "One customer record",
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
