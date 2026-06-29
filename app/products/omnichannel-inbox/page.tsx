"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Inbox,
  MessageSquare,
  Phone,
  Users,
  Tag,
  Clock,
  Bot,
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Star,
  Search,
  Filter,
  Gauge,
  Layers,
  ListChecks,
  SlidersHorizontal,
  ShieldCheck,
  Zap,
  Megaphone,
  UserCircle2,
  Smile,
  GitBranch,
  BarChart3,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiGmail,
  SiGooglemessages,
} from "react-icons/si"
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
  title: "Omnichannel Shared Inbox with Agentic AI | FloatChat",
  description:
    "One shared inbox for WhatsApp, RCS, SMS, voice, email, and social, with routing, SLA, macros, CSAT, and agentic AI plus copilot built in.",
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
   Channel glyph — a small rounded brand dot used everywhere
─────────────────────────────────────────────────────────────── */

type Glyph =
  | { kind: "si"; Icon: React.ComponentType<{ style?: React.CSSProperties }> }
  | { kind: "lucide"; Icon: typeof Phone }

function ChannelDot({
  glyph,
  bg,
  size = 18,
}: {
  glyph: Glyph
  bg: string
  size?: number
}) {
  const inner = Math.round(size * 0.58)
  return (
    <span
      className="rounded-md flex items-center justify-center shrink-0 ring-1 ring-black/5"
      style={{ background: bg, width: size, height: size }}
    >
      {glyph.kind === "si" ? (
        <glyph.Icon style={{ color: "#fff", width: inner, height: inner }} />
      ) : (
        <glyph.Icon className="text-white" style={{ width: inner, height: inner }} />
      )}
    </span>
  )
}

/* Channel registry — single source of truth for logos + brand colors */

const CH = {
  whatsapp: { name: "WhatsApp", bg: "#25D366", glyph: { kind: "si", Icon: SiWhatsapp } as Glyph },
  rcs: { name: "RCS", bg: "#1A73E8", glyph: { kind: "si", Icon: SiGooglemessages } as Glyph },
  sms: { name: "SMS", bg: "#0F2A4A", glyph: { kind: "lucide", Icon: MessageSquare } as Glyph },
  voice: { name: "Voice", bg: "#1D4ED8", glyph: { kind: "lucide", Icon: Phone } as Glyph },
  email: { name: "Email", bg: "#EA4335", glyph: { kind: "si", Icon: SiGmail } as Glyph },
  instagram: { name: "Instagram", bg: "#E4405F", glyph: { kind: "si", Icon: SiInstagram } as Glyph },
  messenger: { name: "Messenger", bg: "#0084FF", glyph: { kind: "si", Icon: SiMessenger } as Glyph },
} as const

type ChannelKey = keyof typeof CH

/* ─────────────────────────────────────────────────────────────
   HERO MOCKUP — the SIGNATURE three-pane shared inbox:
   left = channel/conversation list, center = thread, right =
   customer-profile / context panel with an AI suggestion.
─────────────────────────────────────────────────────────────── */

type ConvRow = {
  id: string
  name: string
  channel: ChannelKey
  preview: string
  time: string
  unread?: number
  online?: boolean
  active?: boolean
}

const conversations: ConvRow[] = [
  {
    id: "c1",
    name: "Daniela Cruz",
    channel: "whatsapp",
    preview: "Can I switch #A-2291 to express?",
    time: "now",
    unread: 2,
    online: true,
    active: true,
  },
  {
    id: "c2",
    name: "Marcus Webb",
    channel: "voice",
    preview: "Missed call · callback queued",
    time: "1m",
    unread: 1,
  },
  {
    id: "c3",
    name: "Priya Nair",
    channel: "instagram",
    preview: "Does the M fit a 32\" waist?",
    time: "4m",
    online: true,
  },
  {
    id: "c4",
    name: "Tom Becker",
    channel: "email",
    preview: "Re: invoice copy for March",
    time: "12m",
  },
  {
    id: "c5",
    name: "Aisha Khan",
    channel: "rcs",
    preview: "Got the offer — how do I redeem?",
    time: "18m",
    unread: 3,
  },
  {
    id: "c6",
    name: "Leo Martins",
    channel: "messenger",
    preview: "Thanks, that worked!",
    time: "26m",
  },
  {
    id: "c7",
    name: "Sara Lund",
    channel: "sms",
    preview: "STOP… jk, where's my order?",
    time: "33m",
  },
]

function HeroInboxMockup() {
  // cycle the AI suggestion in/out so the panel feels live
  const [showSuggestion, setShowSuggestion] = useState(false)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setShowSuggestion(false)
        await wait(1400)
        if (cancelled) return
        setShowSuggestion(true)
        await wait(3400)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

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

      {/* Floating "7 channels" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Inbox className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          7 channels · one inbox
        </span>
      </motion.div>

      {/* Floating "one record" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          One customer record
        </span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · inbox
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[470px]">
          {/* ── Pane 1: channel / conversation list ── */}
          <aside className="col-span-5 md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex flex-col">
            <div className="px-2.5 py-2 border-b border-slate-200 flex items-center gap-1.5">
              <div className="flex-1 h-6 rounded-md bg-white border border-slate-200 px-2 flex items-center gap-1.5">
                <Search className="h-3 w-3 text-slate-400" />
                <span className="text-[9px] text-slate-400">Search inbox</span>
              </div>
              <span className="h-6 w-6 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                <Filter className="h-3 w-3 text-slate-500" />
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              {conversations.map((c) => {
                const ch = CH[c.channel]
                return (
                  <div
                    key={c.id}
                    className={`relative flex items-center gap-2 px-2.5 py-2 border-b border-slate-100 ${
                      c.active ? "bg-white" : "hover:bg-white/60"
                    }`}
                  >
                    {c.active && (
                      <span className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8]" />
                    )}
                    <div className="relative shrink-0">
                      <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-semibold text-slate-600">
                        {c.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5">
                        <ChannelDot glyph={ch.glyph} bg={ch.bg} size={13} />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-[10.5px] font-semibold text-[#0F2A4A] truncate">
                          {c.name}
                        </p>
                        {c.online && (
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        )}
                        <span className="ml-auto text-[8px] text-slate-400 shrink-0">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 truncate">
                        {c.preview}
                      </p>
                    </div>
                    {c.unread ? (
                      <span className="shrink-0 h-4 min-w-4 px-1 rounded-full bg-[#1D4ED8] text-white text-[8px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </aside>

          {/* ── Pane 2: conversation thread ── */}
          <section className="col-span-7 md:col-span-5 flex flex-col bg-white border-r border-slate-200">
            {/* thread header */}
            <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-semibold text-slate-600">
                    DC
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5">
                    <ChannelDot glyph={CH.whatsapp.glyph} bg={CH.whatsapp.bg} size={12} />
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#0F2A4A] leading-tight">
                    Daniela Cruz
                  </p>
                  <p className="text-[8.5px] text-slate-500">
                    WhatsApp · Order #A-2291
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                  <Tag className="h-2.5 w-2.5" /> VIP
                </span>
                <span className="h-6 w-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <SlidersHorizontal className="h-3 w-3 text-slate-500" />
                </span>
              </div>
            </div>

            {/* messages */}
            <div className="flex-1 px-3 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi! I changed my mind — can you switch order #A-2291 to express
                    shipping before it ships?
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">10:02 AM</p>
                </div>
              </div>

              {/* AI agent reply */}
              <div className="flex items-start gap-1.5 justify-end">
                <div className="bg-[#3B82F6] rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Bot className="h-2.5 w-2.5 text-white/80" />
                    <span className="text-[7.5px] uppercase tracking-wider text-white/70 font-semibold">
                      AI agent
                    </span>
                  </div>
                  <p className="text-[11px] text-white leading-snug">
                    Done! #A-2291 is now express, no extra charge. It leaves today.
                  </p>
                  <p className="text-[8px] text-white/70 mt-0.5">10:02 AM</p>
                </div>
              </div>

              {/* internal note */}
              <div className="flex justify-start">
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-2.5 py-1.5 max-w-[88%]">
                  <div className="flex items-center gap-1">
                    <span className="text-[7.5px] uppercase tracking-wider font-semibold text-amber-700">
                      Internal note
                    </span>
                  </div>
                  <p className="text-[10px] text-amber-900 leading-snug mt-0.5">
                    Repeat buyer — flag for the loyalty upgrade this quarter.
                  </p>
                </div>
              </div>

              {/* customer follow-up */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Amazing, thank you so much 🙌
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">10:03 AM</p>
                </div>
              </div>
            </div>

            {/* composer with macro chips */}
            <div className="border-t border-slate-200 bg-white px-2.5 py-2 space-y-1.5">
              <div className="flex items-center gap-1">
                {["/refund", "/track", "/hours"].map((m) => (
                  <span
                    key={m}
                    className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[8.5px] font-mono text-slate-500"
                  >
                    {m}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] text-[#1D4ED8] font-medium">
                  <Sparkles className="h-2.5 w-2.5" /> Copilot
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                  <span className="text-[9.5px] text-slate-400">
                    Reply, add a note, or run a macro…
                  </span>
                </div>
                <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                  Send
                </button>
              </div>
            </div>
          </section>

          {/* ── Pane 3: customer profile / context ── */}
          <aside className="hidden md:flex md:col-span-3 bg-slate-50/50 flex-col">
            <div className="px-3 py-2 border-b border-slate-200">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                Customer
              </p>
            </div>
            <div className="px-3 py-3 flex flex-col items-center text-center border-b border-slate-200">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center text-white text-sm font-semibold">
                DC
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-[#0F2A4A]">
                Daniela Cruz
              </p>
              <div className="mt-1 flex items-center gap-0.5">
                {[0, 1, 2, 3].map((s) => (
                  <Star key={s} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                ))}
                <Star className="h-2.5 w-2.5 text-slate-300" />
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[8px] font-medium text-emerald-700">
                CSAT 4.8 · happy
              </span>
            </div>

            {/* attributes */}
            <div className="px-3 py-2.5 space-y-1.5 border-b border-slate-200">
              {[
                { k: "Lifetime", v: "$2,140" },
                { k: "Orders", v: "11" },
                { k: "Plan", v: "Pro" },
                { k: "City", v: "Lisbon" },
              ].map((a) => (
                <div key={a.k} className="flex items-center justify-between">
                  <span className="text-[9px] text-slate-500">{a.k}</span>
                  <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
                    {a.v}
                  </span>
                </div>
              ))}
              <div className="flex flex-wrap gap-1 pt-1">
                {["VIP", "express", "loyalty"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* AI suggestion */}
            <div className="px-3 py-3 mt-auto">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Copilot suggestion
              </p>
              <AnimatePresence mode="wait">
                {showSuggestion ? (
                  <motion.div
                    key="sugg"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9px] font-semibold text-[#1D4ED8]">
                        Suggested reply
                      </span>
                    </div>
                    <p className="mt-1 text-[9.5px] text-[#0F2A4A] leading-snug">
                      Offer free express on her next order — she&apos;s 1 away from
                      loyalty tier.
                    </p>
                    <button className="mt-1.5 w-full rounded-md bg-white border border-[#3B82F6]/30 py-1 text-[9px] font-medium text-[#1D4ED8]">
                      Insert
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 flex items-center gap-1.5"
                  >
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                    <span className="text-[8.5px] text-slate-400 ml-1">
                      Reading context…
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function EveryChannelVisual() {
  const rows: { ch: ChannelKey; note: string }[] = [
    { ch: "whatsapp", note: "ETA question" },
    { ch: "email", note: "invoice copy" },
    { ch: "instagram", note: "size help" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One thread per customer
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> shared inbox
        </span>
      </div>
      {rows.map((r) => {
        const c = CH[r.ch]
        return (
          <div
            key={r.ch}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
          >
            <ChannelDot glyph={c.glyph} bg={c.bg} size={20} />
            <span className="text-[10px] font-medium text-[#0F2A4A]">
              {c.name}
            </span>
            <span className="ml-auto text-[9px] text-slate-500 truncate">
              {r.note}
            </span>
          </div>
        )
      })}
      <div className="flex items-center gap-1 pt-0.5">
        {["history", "notes", "labels", "macros"].map((t) => (
          <span
            key={t}
            className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-medium text-slate-500"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function OperationsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <GitBranch className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Smart routing
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">by skill + load</span>
      </div>
      {[
        { team: "Billing", agent: "Priya N.", sla: "2m", tone: "emerald" as const },
        { team: "Returns", agent: "Auto-assign", sla: "5m", tone: "blue" as const },
        { team: "VIP", agent: "Marco D.", sla: "1m", tone: "amber" as const },
      ].map((r) => (
        <div
          key={r.team}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-4 w-4 rounded bg-[#EAF2FF] flex items-center justify-center shrink-0">
            <Users className="h-2.5 w-2.5 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.team}</span>
          <span className="text-[9px] text-slate-500 truncate">→ {r.agent}</span>
          <span
            className={`ml-auto inline-flex items-center gap-0.5 text-[8.5px] font-semibold ${
              r.tone === "emerald"
                ? "text-emerald-600"
                : r.tone === "amber"
                ? "text-amber-600"
                : "text-[#1D4ED8]"
            }`}
          >
            <Clock className="h-2.5 w-2.5" /> {r.sla}
          </span>
        </div>
      ))}
    </div>
  )
}

function AiInboxVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1.5">
        <Bot className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A] flex-1 truncate">
          Agent handled 312 chats today
        </span>
        <span className="text-[8.5px] font-semibold text-emerald-600">68%</span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-[#3B82F6]" />
          <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
            Copilot · drafts for humans
          </span>
        </div>
        <p className="mt-1 text-[9px] text-slate-500 leading-snug">
          Suggests replies, summarizes threads, rewrites tone — your agents click
          to send.
        </p>
      </div>
    </div>
  )
}

function CsatVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          CSAT this week
        </span>
        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
          <Smile className="h-3 w-3" /> 4.7 / 5
        </span>
      </div>
      <div className="flex items-end gap-1 h-12">
        {[60, 72, 65, 80, 74, 88, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <UserCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Tied to each contact profile + custom attributes
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Channels grid + features
─────────────────────────────────────────────────────────────── */

const channelOrder: { key: ChannelKey; detail: string }[] = [
  { key: "whatsapp", detail: "two-way business" },
  { key: "rcs", detail: "rich Android" },
  { key: "sms", detail: "universal text" },
  { key: "voice", detail: "calls + callbacks" },
  { key: "email", detail: "full inbox" },
  { key: "instagram", detail: "DMs + comments" },
  { key: "messenger", detail: "Facebook DMs" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Which channels does the omnichannel shared inbox cover?",
    answer:
      "Seven, all in one view: WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger. The same customer record and conversation history follow each person across every channel, so a customer who calls, then messages on WhatsApp, then emails is still one thread — not three disconnected tickets.",
  },
  {
    question: "Is there a mobile app?",
    answer:
      "FloatChat is web-based and works in any modern browser — desktop, tablet, or phone. There is nothing to install. Your team signs in, the inbox loads, and routing, SLA timers, macros, and the AI all work the same everywhere.",
  },
  {
    question: "Does the AI actually work inside the inbox?",
    answer:
      "Yes — both the agent and the copilot. The agentic AI agent can pick up conversations and resolve routine volume on its own, while the copilot rides alongside your human agents: drafting replies, summarizing long threads, suggesting next steps, and rewriting tone. Humans stay in control and your agentic agent handles the repetitive load.",
  },
  {
    question: "How does routing, SLA, and CSAT work?",
    answer:
      "Conversations route by skill, team, capacity, and schedule, so the right person gets the right ticket. SLA timers track first-response and resolution targets and surface anything at risk. CSAT is collected on every conversation and attached to the customer's profile, so satisfaction is measured per interaction, not just in a quarterly survey.",
  },
  {
    question: "Can I keep one customer record across campaigns, calls, and chat?",
    answer:
      "That's the point. The inbox sits on the same platform as your broadcasting, your numbers, and your AI. A campaign reply, a phone call, and a web chat all land in the same inbox tied to the same customer — so nothing about a person ever lives in a separate silo.",
  },
  {
    question: "What about notes, labels, and canned responses?",
    answer:
      "Every conversation supports internal notes that customers never see, labels for organizing and reporting, and canned responses and macros so common answers and multi-step actions are one click away. Profiles carry custom attributes you define, so your inbox matches how your business actually works.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Omnichannel Shared Inbox with Agentic AI",
  serviceType: "Omnichannel customer messaging inbox",
  description:
    "One shared inbox for WhatsApp, RCS, SMS, voice, email, Instagram, and Messenger, with smart routing, SLA timers, macros, CSAT, contact profiles, and agentic AI plus copilot built in.",
  url: "https://www.floatchat.com/products/omnichannel-inbox",
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
   Related products
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/agentic-ai",
    Icon: Bot,
    title: "Agentic AI",
    body: "The agent that works your inbox and resolves on its own.",
  },
  {
    to: "/products/agent-copilot",
    Icon: Sparkles,
    title: "Agent Copilot",
    body: "AI that drafts, summarizes, and assists every human agent.",
  },
  {
    to: "/products/analytics",
    Icon: BarChart3,
    title: "Analytics",
    body: "CSAT, SLA, volume, and resolution metrics in one place.",
  },
  {
    to: "/ai-agents",
    Icon: Layers,
    title: "AI Agents",
    body: "Sales, booking, support — agents for every job.",
  },
  {
    to: "/voice",
    Icon: Phone,
    title: "Voice",
    body: "Calls and callbacks land in the same shared inbox.",
  },
  {
    to: "/compare",
    Icon: GitBranch,
    title: "Compare FloatChat",
    body: "See how the inbox stacks up against the alternatives.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function OmnichannelInboxPage() {
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
                  <Inbox className="h-3.5 w-3.5" />
                  Omnichannel Shared Inbox · seven channels, one view
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Seven channels and agentic AI in{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    one shared inbox.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live agents and agentic AI work WhatsApp, RCS, SMS, voice, email,
                  Instagram, and Messenger from one place — with routing, SLA, macros,
                  and CSAT built in.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "7 channels, one view",
                    "AI agent + copilot built in",
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
                  Stop switching tabs between channels.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <HeroInboxMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Inbox, value: "7", label: "channels in one view" },
                { Icon: Bot, value: "AI", label: "agent + copilot built in" },
                { Icon: Gauge, value: "SLA", label: "routing, timers & CSAT" },
                { Icon: UserCircle2, value: "1", label: "customer record, everywhere" },
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
                  Every channel in its own tool means context gets lost.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    When WhatsApp lives in one app, email in another, voice in a
                    phone system, and your social DMs in three separate inboxes, a
                    single customer is scattered across half a dozen tools. Nobody
                    sees the whole picture, and the customer feels it.
                  </p>
                  <p>
                    So they repeat themselves. They explain the order number again,
                    re-tell the story again, and wait while an agent digs for context
                    that already exists somewhere else. Every tab-switch is a
                    chance to drop the thread.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      omnichannel shared inbox
                    </span>{" "}
                    keeps every conversation, and every customer, in a single place.
                    One thread, one record, one team — no matter how the message
                    arrived.
                  </p>
                </div>
              </BlurFade>

              {/* scattered vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                      Channels in separate tools
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Six tabs, six logins, six inboxes",
                        "Customer repeats their story each time",
                        "No shared history or notes",
                        "Handoffs lose order and context",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                      One shared inbox
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Seven channels in a single view",
                        "One customer record follows everywhere",
                        "Shared notes, labels, and macros",
                        "Handoffs carry full history",
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
                  Everything an inbox should be — and an AI that lives in it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Built for real operations: every channel, full history, smart
                  routing, SLA timers, satisfaction, and agentic AI plus copilot —
                  all in one place.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Layers,
                  title: "Every channel, one view.",
                  body:
                    "Full conversation history, internal notes, canned responses, labels, and macros — across WhatsApp, RCS, SMS, voice, email, and social, in a single thread per customer.",
                  visual: <EveryChannelVisual />,
                },
                {
                  Icon: SlidersHorizontal,
                  title: "Built for real operations.",
                  body:
                    "Smart routing by skill and load, SLA timers that flag risk, capacity and scheduling, teams, and granular permissions — so the right person gets the right ticket, on time.",
                  visual: <OperationsVisual />,
                },
                {
                  Icon: Bot,
                  title: "AI in the inbox.",
                  body:
                    "Agentic AI handles routine volume on its own, while the copilot assists your humans — drafting replies, summarizing threads, and suggesting next steps. Both live where you already work.",
                  visual: <AiInboxVisual />,
                },
                {
                  Icon: Smile,
                  title: "CSAT & profiles.",
                  body:
                    "Satisfaction is collected on every conversation, and contact profiles carry custom attributes you define — so you measure how each interaction landed and who it landed with.",
                  visual: <CsatVisual />,
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

        {/* ───── CHANNELS GRID ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Seven channels. One inbox.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Wherever your customers message, you reply from the same place —
                  same context, same history, same team.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {channelOrder.map(({ key, detail }) => {
                  const c = CH[key]
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                    >
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5"
                        style={{ background: c.bg }}
                      >
                        {c.glyph.kind === "si" ? (
                          <c.glyph.Icon
                            style={{ color: "#FFFFFF", width: 18, height: 18 }}
                          />
                        ) : (
                          <c.glyph.Icon
                            className="text-white"
                            style={{ width: 18, height: 18 }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 w-full">
                        <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {detail}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <p className="mt-6 text-sm text-slate-500 max-w-2xl">
                Every channel is two-way and lands in the same shared inbox — so a
                reply on RCS, a WhatsApp message, and an Instagram DM from the same
                person all sit in one thread, not three.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── CHAT + VOICE + CAMPAIGNS TOGETHER ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="One record" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Chat, voice, and campaigns — together.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A campaign reply, a phone call, and a web chat all land in the same
                  inbox, tied to{" "}
                  <span className="font-semibold text-[#0F2A4A]">
                    the same customer
                  </span>
                  .
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* three sources */}
              <BlurFade delay={0.1} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                  {[
                    {
                      Icon: Megaphone,
                      tint: "from-[#60A5FA] to-[#1D4ED8]",
                      head: "Campaign reply",
                      note: "She replies YES to a WhatsApp broadcast.",
                      ch: "whatsapp" as ChannelKey,
                    },
                    {
                      Icon: Phone,
                      tint: "from-[#3B82F6] to-[#1D4ED8]",
                      head: "Phone call",
                      note: "Two days later she calls about delivery.",
                      ch: "voice" as ChannelKey,
                    },
                    {
                      Icon: MessageSquare,
                      tint: "from-[#60A5FA] to-[#2563EB]",
                      head: "Web chat",
                      note: "Then opens a chat on your site to confirm.",
                      ch: "sms" as ChannelKey,
                    },
                  ].map((s) => {
                    const c = CH[s.ch]
                    return (
                      <div
                        key={s.head}
                        className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col"
                      >
                        <div
                          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.tint} flex items-center justify-center shadow-md`}
                        >
                          <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                        </div>
                        <p className="mt-4 text-sm font-semibold text-[#0F2A4A]">
                          {s.head}
                        </p>
                        <p className="mt-1 text-[12.5px] text-slate-500 leading-relaxed flex-1">
                          {s.note}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5">
                          <ChannelDot glyph={c.glyph} bg={c.bg} size={16} />
                          <span className="text-[10px] text-slate-400">
                            → one inbox
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </BlurFade>

              {/* unified record card */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-4">
                      One customer record
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center text-base font-semibold">
                        DC
                      </div>
                      <div>
                        <p className="text-base font-semibold">Daniela Cruz</p>
                        <p className="text-[12px] text-white/70">
                          3 channels · 1 timeline
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 space-y-2">
                      {[
                        { ch: "whatsapp" as ChannelKey, label: "Replied to spring campaign" },
                        { ch: "voice" as ChannelKey, label: "Called about delivery" },
                        { ch: "sms" as ChannelKey, label: "Confirmed on web chat" },
                      ].map((r) => {
                        const c = CH[r.ch]
                        return (
                          <div
                            key={r.label}
                            className="flex items-center gap-2.5 rounded-xl bg-white/10 px-3 py-2"
                          >
                            <ChannelDot glyph={c.glyph} bg={c.bg} size={18} />
                            <span className="text-[12.5px] text-white/90">
                              {r.label}
                            </span>
                            <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-emerald-300" />
                          </div>
                        )
                      })}
                    </div>
                    <p className="mt-5 text-[13px] text-white/80 leading-relaxed">
                      No silos. The campaign, the call, and the chat are one
                      conversation history on one profile.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Put every conversation in one inbox."
          body="WhatsApp, RCS, SMS, voice, email, and social — with routing, SLA, CSAT, and agentic AI plus copilot built in."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The inbox lives where your AI, numbers, and broadcasts already are.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Bot,
                  title: "Same platform as your AI.",
                  body:
                    "The agentic agent and the copilot aren't a bolt-on — they run inside the inbox, on the same data your team sees, with the same guardrails.",
                },
                {
                  Icon: Megaphone,
                  title: "Same numbers and broadcasts.",
                  body:
                    "Your WhatsApp numbers and campaign broadcasting share the inbox, so every reply to a blast lands as a real conversation, not a dead-end.",
                },
                {
                  Icon: ShieldCheck,
                  title: "No silos, ever.",
                  body:
                    "Nothing about a customer lives in a separate tool. One record, one timeline, one source of truth across every channel and team.",
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
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      Why FloatChat
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      The inbox sits on the same platform as your AI, your numbers,
                      and your broadcasting — so nothing about a customer is ever in
                      a separate silo.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:w-56 shrink-0">
                    {[
                      { Icon: Zap, t: "Live in days, not months" },
                      { Icon: ListChecks, t: "Macros + canned replies" },
                      { Icon: Tag, t: "Labels, notes & attributes" },
                    ].map((p) => (
                      <span
                        key={p.t}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/90"
                      >
                        <p.Icon className="h-3.5 w-3.5 text-white" />
                        {p.t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything connects to the inbox.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The shared inbox is the hub — your AI, your copilot, your
                  analytics, and your channels all plug into it.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  Also
                </span>
                {[
                  { to: "/inbox", label: "Shared Inbox", Icon: Inbox },
                  { to: "/integrations", label: "Integrations", Icon: Layers },
                  { to: "/pricing", label: "Pricing", Icon: Tag },
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
              description="Straight answers about channels, AI, routing, and going live."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,212,255,0.5) 70%, rgba(168,200,255,0.55) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #BFD4FF 25%, #60A5FA 50%, #3B82F6 75%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(96,165,250,0.35), rgba(59,130,246,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(168,200,255,0.45), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(191,212,255,0.5), transparent 70%)",
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
                  Seven channels live in one inbox right now
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
                  No more tab-switching
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Put every conversation in{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  one inbox.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                WhatsApp, RCS, SMS, voice, email, and social — with routing, SLA,
                CSAT, and agentic AI plus copilot built in. One shared inbox, one
                customer record.
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
                "7 channels, one view",
                "AI agent + copilot",
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
