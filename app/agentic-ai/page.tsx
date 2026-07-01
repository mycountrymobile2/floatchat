"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Brain,
  Workflow,
  Package,
  MessageSquare,
  Users,
  ShieldCheck,
  Phone,
  MessageCircle,
  GitBranch,
  ListChecks,
  Database,
  Calendar,
  CreditCard,
  Mail,
  Boxes,
  Zap,
  Plug,
  Inbox,
  BarChart3,
  Target,
  HandHelping,
  ScanSearch,
  Lock,
  Truck,
  RefreshCw,
  CalendarCheck,
  Server,
  UserCheck,
  Globe,
  Clock,
  Languages,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiGmail,
  SiSalesforce,
  SiHubspot,
  SiZendesk,
  SiShopify,
  SiSlack,
  SiStripe,
  SiZapier,
  SiNotion,
} from "react-icons/si"
import { FaWhatsapp } from "react-icons/fa"
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
  title: "Agentic AI for Customer Experience | FloatChat",
  description:
    "Deploy autonomous agentic AI that completes multi-step tasks across your tools and channels, with guardrails and human handoff built in.",
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
   Brand tiles for the "works with your stack" logo strip
   (these are INTEGRATIONS, not customer logos — labeled honestly)
─────────────────────────────────────────────────────────────── */

type StackBrandIcon = React.ComponentType<{ style?: React.CSSProperties }>

type StackBrand = {
  name: string
  initial: string
  bg: string
  fg?: string
  Icon?: StackBrandIcon
}

const STACK_BRANDS: StackBrand[] = [
  { name: "Salesforce", initial: "S", bg: "#00A1E0", fg: "#FFFFFF", Icon: SiSalesforce },
  { name: "HubSpot", initial: "H", bg: "#FF7A59", fg: "#FFFFFF", Icon: SiHubspot },
  { name: "Zendesk", initial: "Z", bg: "#03363D", fg: "#FFFFFF", Icon: SiZendesk },
  { name: "Shopify", initial: "S", bg: "#95BF47", fg: "#FFFFFF", Icon: SiShopify },
  { name: "Slack", initial: "S", bg: "#4A154B", fg: "#FFFFFF", Icon: SiSlack },
  { name: "Stripe", initial: "S", bg: "#635BFF", fg: "#FFFFFF", Icon: SiStripe },
  { name: "Zapier", initial: "Z", bg: "#FF4F00", fg: "#FFFFFF", Icon: SiZapier },
  { name: "Notion", initial: "N", bg: "#0F0F0F", fg: "#FFFFFF", Icon: SiNotion },
  { name: "WhatsApp", initial: "W", bg: "#25D366", fg: "#FFFFFF", Icon: FaWhatsapp },
]

function StackTile({ brand }: { brand: StackBrand }) {
  const fg = brand.fg ?? "#FFFFFF"
  return (
    <div className="group flex flex-col items-center gap-2">
      <div
        className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-[15px] shadow-[0_8px_18px_-8px_rgba(15,42,74,0.25)] ring-1 ring-black/5 transition-transform group-hover:-translate-y-0.5"
        style={{ background: brand.bg, color: fg }}
        aria-label={brand.name}
        title={brand.name}
      >
        {brand.Icon ? (
          <brand.Icon style={{ color: fg, width: 22, height: 22 }} />
        ) : (
          brand.initial
        )}
      </div>
      <span className="text-[11px] font-medium text-slate-500">{brand.name}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   "By the numbers" capability metrics (honest framing — these are
   product capabilities, NOT fabricated customer results)
─────────────────────────────────────────────────────────────── */

const capabilityMetrics = [
  { Icon: CheckCircle2, value: "Up to 60%", label: "of routine tickets resolved autonomously" },
  { Icon: Globe, value: "7 channels", label: "chat, voice & messaging — one agent" },
  { Icon: Languages, value: "100+", label: "languages, out of the box" },
  { Icon: Clock, value: "24/7", label: "no queue, no wait, no off-hours" },
]

/* ─────────────────────────────────────────────────────────────
   "See it act" — real multi-step conversations the agent completes
   end to end, each with a green "action taken" chip naming the tool
─────────────────────────────────────────────────────────────── */

type SeeItActCard = {
  channel: string
  channelBg: string
  ChannelIcon: StackBrandIcon | typeof MessageSquare
  channelIsBrand?: boolean
  customer: string
  agent: string
  ActionIcon: typeof Truck
  action: string
  ref: string
}

const seeItActCards: SeeItActCard[] = [
  {
    channel: "WhatsApp",
    channelBg: "#25D366",
    ChannelIcon: SiWhatsapp,
    channelIsBrand: true,
    customer: "Where's my order? It still says processing and I needed it for the weekend.",
    agent:
      "I found order #A-4471 — it was stuck on a warehouse hold. I've released it, upgraded you to express at no charge, and a replacement is shipping today. New ETA: tomorrow by 6pm.",
    ActionIcon: Truck,
    action: "Order looked up · hold cleared · replacement shipped",
    ref: "#A-4471",
  },
  {
    channel: "Voice",
    channelBg: "#3B82F6",
    ChannelIcon: Phone,
    customer: "I need to move my Thursday appointment — something came up at work.",
    agent:
      "No problem. Thursday 2pm is now open on Friday at 10am or Monday at 9am. I've booked you Friday 10am and texted a confirmation with the calendar invite.",
    ActionIcon: CalendarCheck,
    action: "Calendar checked · slot rebooked · booking confirmed",
    ref: "Fri 10:00",
  },
  {
    channel: "Email",
    channelBg: "#EA4335",
    ChannelIcon: SiGmail,
    channelIsBrand: true,
    customer: "The blender stopped working after two weeks. I'd like a refund, please.",
    agent:
      "That's covered by your 30-day return policy. I've issued a full $89.00 refund to your original card and emailed the return label. You'll see it in 3–5 business days.",
    ActionIcon: RefreshCw,
    action: "Policy checked · refund issued · label sent",
    ref: "$89.00",
  },
]

/* ─────────────────────────────────────────────────────────────
   Trust & security badges
─────────────────────────────────────────────────────────────── */

const trustBadges = [
  { Icon: ShieldCheck, label: "SOC 2 Type II" },
  { Icon: Lock, label: "GDPR + CCPA" },
  { Icon: ListChecks, label: "Your guardrails, enforced" },
  { Icon: UserCheck, label: "Human handoff built in" },
  { Icon: Server, label: "Data stays yours" },
]

/* ─────────────────────────────────────────────────────────────
   HERO VISUAL — Dialpad-style layered composition. A main "AI agent
   conversation" product panel anchors the scene, with three smaller
   AI cards floating over its corners (plan · action taken · metric).
   Everything is absolutely positioned inside a fixed-height container
   so nothing reflows; each card gently drifts (parallax) via
   transform/opacity only.
─────────────────────────────────────────────────────────────── */

function AgenticTaskMockup() {
  return (
    <div className="relative w-full max-w-[480px] lg:ml-auto h-[460px]">
      {/* Soft blue radial glow behind the composition */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.45), transparent 72%)",
        }}
      />

      {/* ── MAIN PANEL (back layer, anchor) ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 z-10 w-[300px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.4)]">
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2.5 font-mono text-[9.5px] text-slate-400 truncate">
              app.floatchat.com · AI agent
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700 shrink-0">
              <CheckCircle2 className="h-2.5 w-2.5" />
              Resolved
            </span>
          </div>

          {/* Conversation */}
          <div className="px-4 py-4 space-y-3">
            {/* Customer message */}
            <div className="flex items-start gap-2.5">
              <img
                src="https://i.pravatar.cc/80?img=5"
                alt="Customer avatar"
                loading="lazy"
                className="h-8 w-8 rounded-full object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
                  <p className="text-[12px] text-[#0F2A4A] leading-snug">
                    My order arrived damaged — can you replace it and refund
                    the shipping?
                  </p>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 ml-1">10:02 AM</p>
              </div>
            </div>

            {/* Agent reply */}
            <div className="flex items-start justify-end gap-2.5">
              <div className="min-w-0 flex flex-col items-end">
                <div className="max-w-[210px] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] px-3 py-2 shadow-[0_10px_24px_-12px_rgba(29,78,216,0.7)]">
                  <p className="text-[12px] text-white leading-snug">
                    Done! I've shipped a replacement and refunded your $6.99
                    shipping. Tracking is on the way.
                  </p>
                </div>
                <p className="text-[9px] text-slate-400 mt-1 mr-1">10:02 AM</p>
              </div>
              <div className="h-8 w-8 rounded-full shrink-0 flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] shadow-sm">
                <Bot className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING CARD A — top-left: reasoning / plan ────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10, rotate: -3 }}
        animate={{ opacity: 1, y: [0, -6, 0], rotate: -3 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
        }}
        className="absolute left-0 top-6 z-20 w-[200px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_34px_-16px_rgba(15,42,74,0.35)]"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3B82F6]/10 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1D4ED8]">
            Plan
          </span>
        </div>
        <p className="mt-1.5 text-[11px] text-[#0F2A4A] leading-snug">
          look up → refund → confirm
        </p>
      </motion.div>

      {/* ── FLOATING CARD B — bottom-right: action taken ────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12, rotate: 2.5 }}
        animate={{ opacity: 1, y: [0, -7, 0], rotate: 2.5 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.5 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
        }}
        className="absolute bottom-4 right-0 z-30 w-[200px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_18px_38px_-16px_rgba(15,42,74,0.4)]"
      >
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
            style={{ backgroundColor: "#635BFF" }}
          >
            <SiStripe className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight">
                Refund issued
              </p>
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 shrink-0">
                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5">$6.99 · instant</p>
          </div>
        </div>
      </motion.div>

      {/* ── FLOATING CARD C — upper-right: resolved metric ──────── */}
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.7 },
          scale: { duration: 0.5, delay: 0.7 },
          y: { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
        }}
        className="absolute right-1 top-2 z-30 w-[168px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_34px_-16px_rgba(15,42,74,0.35)]"
      >
        <div className="flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-[12px] font-semibold text-[#0F2A4A]">
            Resolved in 14s
          </p>
        </div>
        <p className="mt-1 text-[10px] text-slate-500">3 tools · 0 humans</p>
      </motion.div>

      {/* ── Small "Live" avatar chip — bottom-left touch ────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.9 },
          y: { duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute bottom-10 left-2 z-30 inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/25 bg-white px-2.5 py-1 shadow-[0_10px_22px_-10px_rgba(15,42,74,0.3)]"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]">
          <Bot className="h-2.5 w-2.5 text-white" />
        </span>
        <span className="text-[10px] font-medium text-[#0F2A4A]">Live</span>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What makes it agentic" feature cards
─────────────────────────────────────────────────────────────── */

function CompletesVisual() {
  const steps = [
    { label: "Look up order", done: true },
    { label: "Update shipping", done: true },
    { label: "Send receipt", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One request, end to end
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not just an answer</span>
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

function OrchestrateVisual() {
  const tools = [
    { Icon: Database, label: "CRM" },
    { Icon: CreditCard, label: "Billing" },
    { Icon: Calendar, label: "Calendar" },
    { Icon: Mail, label: "Email" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One workflow across tools
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Plug className="h-2.5 w-2.5" /> connected
        </span>
      </div>
      <div className="relative flex items-center justify-between">
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1"
            >
              <t.Icon className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[8.5px] font-medium text-[#0F2A4A]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-0.5 px-1 text-slate-300">
          <ArrowRight className="h-3 w-3" />
          <ArrowRight className="h-3 w-3" />
        </div>
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shrink-0">
          <Bot className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function DecideVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Brain className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          New request · within policy?
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-emerald-200 bg-emerald-50/60 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <Zap className="h-2.5 w-2.5 text-emerald-700" />
            <span className="text-[9px] font-semibold text-emerald-800">
              Act
            </span>
          </div>
          <p className="mt-0.5 text-[8.5px] text-emerald-900/80 leading-snug">
            Complete it autonomously
          </p>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50/60 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <HandHelping className="h-2.5 w-2.5 text-amber-700" />
            <span className="text-[9px] font-semibold text-amber-800">
              Ask
            </span>
          </div>
          <p className="mt-0.5 text-[8.5px] text-amber-900/80 leading-snug">
            Hand to a human, with context
          </p>
        </div>
      </div>
    </div>
  )
}

function GuardrailsVisual() {
  const rules = [
    { label: "Refunds ≤ $200", ok: true },
    { label: "Grounded in your data", ok: true },
    { label: "No off-policy actions", ok: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Operates inside your bounds
        </span>
        <Lock className="h-3 w-3 text-[#1D4ED8]" />
      </div>
      {rules.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
        </div>
      ))}
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <ShieldCheck className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          You set the limits — it never crosses them
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Channels
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  detail: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof Phone
}

const channels: ChannelTile[] = [
  { name: "WhatsApp", detail: "two-way", bg: "#25D366", Icon: SiWhatsapp },
  { name: "RCS", detail: "rich text", bg: "#1D4ED8", Lucide: MessageSquare },
  { name: "SMS", detail: "text", bg: "#0F2A4A", Lucide: MessageCircle },
  { name: "Voice", detail: "calls", bg: "#3B82F6", Lucide: Phone },
  { name: "Email", detail: "inbox", bg: "#EA4335", Icon: SiGmail },
  { name: "Instagram", detail: "DMs", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", detail: "DMs", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   Orchestration node graph — apps the agent connects into one flow
─────────────────────────────────────────────────────────────── */

const orchestrationNodes = [
  { Icon: Database, label: "CRM", note: "look up the customer" },
  { Icon: Package, label: "Orders", note: "read & update" },
  { Icon: CreditCard, label: "Billing", note: "charge or refund" },
  { Icon: Calendar, label: "Scheduling", note: "book or reschedule" },
  { Icon: Mail, label: "Email & receipts", note: "confirm the change" },
  { Icon: Boxes, label: "Inventory", note: "check availability" },
]

/* ─────────────────────────────────────────────────────────────
   Agents this powers
─────────────────────────────────────────────────────────────── */

const poweredAgents = [
  {
    to: "/ai-agents/customer-service",
    Icon: HandHelping,
    title: "Support Agent",
    body: "Resolves tickets end to end across every channel.",
  },
  {
    to: "/ai-agents/sales",
    Icon: Target,
    title: "Sales Agent",
    body: "Turns inbound interest into booked, qualified pipeline.",
  },
  {
    to: "/ai-agents/booking",
    Icon: Calendar,
    title: "Booking Agent",
    body: "Checks availability and confirms slots automatically.",
  },
  {
    to: "/ai-agents/lead-qualification",
    Icon: ListChecks,
    title: "Lead Qualification Agent",
    body: "Scores and routes new leads before they go cold.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Related products
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/ai-agents",
    Icon: Bot,
    title: "All AI Agents",
    body: "Every prebuilt agent agentic AI powers, in one place.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox where the agent and your team work together.",
  },
  {
    to: "/products/agent-copilot",
    Icon: Sparkles,
    title: "Agent Copilot",
    body: "Agentic AI assisting your human agents in real time.",
  },
  {
    to: "/integrations",
    Icon: Plug,
    title: "Integrations",
    body: "200+ apps, plus REST API and webhooks for the rest.",
  },
  {
    to: "/compare",
    Icon: GitBranch,
    title: "Compare FloatChat",
    body: "See how agentic AI here stacks up against scripted bots.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How is agentic AI different from a chatbot?",
    answer:
      "A chatbot answers a question — it matches what a customer says to a canned reply or a help article. Agentic AI takes multi-step action across your systems: it can look up an order, update a record, issue an eligible refund, and confirm the change in a single flow. The difference is between recognizing intent and actually completing the task behind it.",
  },
  {
    question: "Is it safe to let AI take actions on its own?",
    answer:
      "Yes. The agent only ever operates inside the guardrails you set — spending limits, the actions it's allowed to take, the tools it can touch, and the policies it must follow. It stays grounded in your data instead of improvising, and when a request falls outside its bounds it hands off to a human with full context rather than guessing.",
  },
  {
    question: "What can the agentic AI connect to?",
    answer:
      "Over 200 native integrations — CRMs, order and billing systems, calendars, help desks, and more — plus a REST API and webhooks so you can wire it into anything custom. That's what lets it orchestrate a real workflow instead of living in a silo.",
  },
  {
    question: "When does it decide to act versus ask a human?",
    answer:
      "It acts autonomously when the request is clear, in policy, and inside the limits you've defined. It escalates — to a human, in the same thread, with the order data, history, and a short summary attached — when the request is ambiguous, sensitive, or out of bounds. You decide where that line sits.",
  },
  {
    question: "Which channels does the agent work across?",
    answer:
      "WhatsApp, RCS, SMS, voice, email, and social — from one agent and one shared inbox. The same customer record and conversation history follow the customer across every channel, so context never resets when someone switches from chat to a call.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Days, not months — and no developer required. Connect your channels, point the agent at your knowledge base and tools, and set your guardrails. There are no conversation journeys to map and no code to write, so most teams have agentic AI taking real action within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Customer Experience",
  serviceType: "Autonomous agentic AI automation",
  description:
    "Autonomous agentic AI that completes multi-step tasks across your tools and channels — orchestrating systems, deciding when to act or ask, and operating inside your guardrails, with human handoff built in.",
  url: "https://www.floatchat.com/agentic-ai",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer experience, support, and revenue teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AgenticAiPage() {
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
                  <Bot className="h-3.5 w-3.5" />
                  Agentic AI · action, not just answers
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI that takes{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    action, not just answers.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Autonomous AI agents that resolve requests end to end — looking
                  up, updating, and confirming across your tools and channels.
                  Built to act inside your guardrails, and scale without adding
                  headcount.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Multi-step actions",
                    "Orchestrates your tools",
                    "Acts or asks, on its own",
                    "Chat, voice & messaging",
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
                  The difference between a chatbot and a teammate.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <AgenticTaskMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── LOGO STRIP — works with your stack ───── */}
        <section className="relative bg-white py-12 lg:py-14 border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <p className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-400">
                Connects the tools you already run
              </p>
            </BlurFade>
            <BlurFade delay={0.08}>
              <div className="mt-8 flex flex-wrap items-start justify-center gap-x-8 gap-y-7 sm:gap-x-12">
                {STACK_BRANDS.map((b) => (
                  <StackTile key={b.name} brand={b} />
                ))}
              </div>
            </BlurFade>
            <BlurFade delay={0.16}>
              <p className="mt-8 text-center text-[12.5px] text-slate-500">
                Plus 200+ native integrations, a REST API, and webhooks —{" "}
                <Link
                  to="/integrations"
                  className="font-medium text-[#1D4ED8] underline underline-offset-2 hover:no-underline"
                >
                  see all integrations
                </Link>
                .
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── RESULTS / BY THE NUMBERS ───── */}
        <section className="relative bg-gradient-to-b from-white to-[#F5F7FF] py-16 lg:py-20 border-b border-slate-200/70 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(59,130,246,0.10), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <p className="text-center text-[11px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                By the numbers
              </p>
              <h2 className="mt-3 text-center text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-[#0F2A4A] leading-tight">
                What an agent that acts — not just answers — changes.
              </h2>
            </BlurFade>
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {capabilityMetrics.map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="mx-auto h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <p className="mt-4 text-3xl lg:text-[42px] font-semibold tracking-tight text-[#0F2A4A] leading-none">
                      <span className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                        {s.value}
                      </span>
                    </p>
                    <p className="mt-3 mx-auto max-w-[200px] text-[13px] text-slate-500 leading-snug">
                      {s.label}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
            <BlurFade delay={0.36}>
              <p className="mt-10 text-center text-[12.5px] text-slate-400">
                Capabilities of the platform — your results depend on your setup,
                volume, and policies.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── CHATBOT vs AGENTIC ───── */}
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
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="01" label="The gap" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A chatbot answers. Agentic AI acts.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A scripted chatbot can answer a question. It cannot look up
                    an order, update a record, and confirm a change in one flow —
                    so the moment a customer wants something{" "}
                    <span className="font-semibold text-[#0F2A4A]">done</span>,
                    it stalls and hands off.
                  </p>
                  <p>
                    Agentic AI closes that gap by acting on the customer&apos;s
                    intent, not just matching it to a canned reply. It reasons
                    about the request, calls the right tools in the right order,
                    and finishes the job — then knows when to bring in a human.
                  </p>
                </div>
              </BlurFade>

              {/* scripted vs agentic contrast */}
              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-7 w-7 rounded-lg bg-rose-100 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-rose-600" />
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700">
                        Scripted chatbot · answers
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Matches intent to a canned reply",
                        "Points to a help article, then stops",
                        "Needs a journey built for every path",
                        "Hands off the moment work is involved",
                        "Lives in a silo, blind to your systems",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#3B82F6]/30 bg-[#EAF2FF]/60 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8]">
                        Agentic AI · acts
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13px] text-[#0F2A4A]/85 leading-relaxed">
                      {[
                        "Completes the task end to end",
                        "Looks up, updates, and confirms",
                        "Reasons from your data, no journeys",
                        "Acts autonomously inside guardrails",
                        "Orchestrates every connected tool",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-[#1D4ED8] mt-0.5 shrink-0"
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

        {/* ───── WHAT MAKES IT AGENTIC ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What makes it agentic" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Four things a chatbot can&apos;t do.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Completing tasks, orchestrating systems, deciding when to act,
                  and staying inside your bounds — that&apos;s what makes agentic
                  AI a teammate instead of a script.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Workflow,
                  title: "Completes tasks.",
                  body:
                    "Multi-step actions from a single request, end to end. The agent looks up the order, makes the change, and sends the confirmation — instead of pointing the customer at a help article.",
                  visual: <CompletesVisual />,
                },
                {
                  Icon: Plug,
                  title: "Orchestrates systems.",
                  body:
                    "It connects disconnected tools and databases into one workflow — your CRM, billing, calendar, and email working together for a single request, all coordinated by the agent.",
                  visual: <OrchestrateVisual />,
                },
                {
                  Icon: Brain,
                  title: "Decides and escalates.",
                  body:
                    "It knows when to act autonomously and when to bring in a human — escalating ambiguous or sensitive requests in the same thread, with full context already attached.",
                  visual: <DecideVisual />,
                },
                {
                  Icon: ShieldCheck,
                  title: "Stays in bounds.",
                  body:
                    "It operates inside the guardrails you set — spending limits, allowed actions, policy — and stays grounded in your data, so it never improvises or crosses a line you've drawn.",
                  visual: <GuardrailsVisual />,
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

        {/* ───── SEE IT ACT — real conversations ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 40%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 40%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="See it act" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Watch it actually do the work.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Not a canned reply, not a help-article link. Each of these is a
                  real multi-step task — looked up, acted on, and confirmed in one
                  go. The green chip is the action the agent actually took.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {seeItActCards.map((c, i) => (
                <BlurFade key={c.channel + c.ref} delay={0.05 + i * 0.1} className="h-full">
                  <div className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.3)] hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.3)] transition-all duration-300">
                    {/* Chrome + channel label */}
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-2 py-0.5">
                        <span
                          className="h-3.5 w-3.5 rounded-[5px] flex items-center justify-center"
                          style={{ background: c.channelBg }}
                        >
                          {c.channelIsBrand ? (
                            <c.ChannelIcon style={{ color: "#FFFFFF", width: 9, height: 9 }} />
                          ) : (
                            <c.ChannelIcon className="h-2.5 w-2.5 text-white" />
                          )}
                        </span>
                        <span className="text-[9.5px] font-medium text-[#0F2A4A]">
                          {c.channel}
                        </span>
                      </span>
                    </div>

                    {/* Conversation */}
                    <div className="flex-1 p-4 space-y-3 bg-white">
                      {/* Customer bubble */}
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[88%] shadow-sm">
                          <p className="text-[12px] text-[#0F2A4A] leading-snug">
                            {c.customer}
                          </p>
                        </div>
                      </div>

                      {/* Action chip — the tool action */}
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          <span className="text-[10px] font-semibold text-emerald-800 leading-snug">
                            Action taken
                          </span>
                          <span className="ml-auto font-mono text-[9px] text-emerald-700/80">
                            {c.ref}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <c.ActionIcon className="h-3 w-3 text-emerald-700 shrink-0" />
                          <span className="text-[10.5px] text-emerald-900/85 leading-snug">
                            {c.action}
                          </span>
                        </div>
                      </div>

                      {/* Agent bubble */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-2xl rounded-br-sm px-3 py-2 max-w-[88%] shadow-sm">
                          <p className="text-[12px] text-white leading-snug">
                            {c.agent}
                          </p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                      </div>

                      {/* Resolved footer */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span className="text-[9.5px] font-medium text-emerald-600">
                          Resolved · no human needed
                        </span>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  See it for
                </span>
                {[
                  { to: "/ai-agents/customer-service", label: "Customer service" },
                  { to: "/ai-agents/booking", label: "Booking" },
                  { to: "/ai-agents/sales", label: "Sales" },
                ].map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    {p.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── ORCHESTRATION DIAGRAM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Orchestration" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent, every system, one workflow.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Your tools don&apos;t talk to each other. The agent does the
                  talking — pulling each one into a single, coordinated flow so a
                  request becomes a completed task.
                </p>
              </BlurFade>
            </div>

            <OrchestrationDiagram />
          </div>
        </section>

        {/* ───── WHERE IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="Where it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Every channel. Every agent.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Agentic AI runs across chat, voice, and messaging — and powers
                  the prebuilt agents you already use.
                </p>
              </BlurFade>
            </div>

            {/* channels */}
            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {channels.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: c.bg }}
                    >
                      {c.Icon ? (
                        <c.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : c.Lucide ? (
                        <c.Lucide className="h-[18px] w-[18px] text-white" />
                      ) : null}
                    </div>
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
              </div>
            </BlurFade>

            {/* powered agents */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {poweredAgents.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed flex-1">
                      {a.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Explore
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Also
                </span>
                {[
                  { to: "/ai-agents/agent-builder", label: "Build your own agent" },
                  { to: "/voice", label: "Voice AI" },
                  { to: "/ai-agents", label: "See all agents" },
                ].map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    {p.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Agentic AI plus the platform to run it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The intelligence is only half of it. You also get the channels,
                  numbers, and broadcasting to put it to work — in one platform,
                  without a developer and without an enterprise contract.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Boxes,
                  title: "One platform, not a stack.",
                  body:
                    "Agentic AI, the channels, your numbers, and broadcasting live together — so you're not gluing five vendors and a Twilio account into a workflow.",
                },
                {
                  Icon: Zap,
                  title: "Live in days, no developer.",
                  body:
                    "Connect your tools, point the agent at your data, set your guardrails. No conversation journeys to map, no code to write, no months-long build.",
                },
                {
                  Icon: BarChart3,
                  title: "Priced for real teams.",
                  body:
                    "No per-resolution fees and no enterprise contract to put agentic AI to work. Start free and scale on capacity, not per-seat surprises.",
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

            {/* dark panel */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="lg:flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      The whole point
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      You get agentic AI plus the channels, numbers, and
                      broadcasting to put it to work — one platform, one customer
                      record, and one place to set the guardrails it runs inside.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col gap-3">
                    {[
                      { Icon: Plug, label: "200+ integrations + API" },
                      { Icon: ShieldCheck, label: "Your guardrails, enforced" },
                      { Icon: Users, label: "Human handoff built in" },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5"
                      >
                        <r.Icon className="h-4 w-4 text-white/90 shrink-0" />
                        <span className="text-[13px] font-medium text-white/90">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── TRUST & SECURITY ───── */}
        <section className="relative bg-white py-14 lg:py-16 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="text-center max-w-2xl mx-auto">
                <SectionEyebrow num="07" label="Trust & security" />
                <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0F2A4A] leading-tight">
                  Agentic doesn&apos;t mean unsupervised.
                </h2>
                <p className="mt-3 text-[14px] text-slate-500 leading-relaxed">
                  The agent only ever acts inside the limits you set — and every
                  action stays on the rails, audited, and yours.
                </p>
              </div>
            </BlurFade>
            <BlurFade delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                {trustBadges.map((b) => (
                  <div
                    key={b.label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/60 px-4 py-2"
                  >
                    <b.Icon className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                    <span className="text-[13px] font-medium text-[#0F2A4A]">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Put agentic AI to work across every channel."
          body="Agentic AI plus the channels, numbers, and broadcasting to use it — one platform, no developer required."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="08" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Where agentic AI shows up next.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same intelligence powers your agents, your inbox, your
                  copilot, and everything you connect it to.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCards.map((c, i) => (
                <BlurFade key={c.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {c.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}

              <BlurFade delay={0.05 + relatedCards.length * 0.06} className="h-full">
                <Link
                  to="/pricing"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">See pricing</h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      No per-resolution fees, no enterprise contract. Start free.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    View plans
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
            </div>
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
              description="Straight answers about what agentic AI does, how it stays safe, and what it connects to."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or compare{" "}
                  <Link
                    to="/compare"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    FloatChat vs. scripted bots
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,219,254,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #3B82F6 80%, transparent)",
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
                    "radial-gradient(closest-side, rgba(59,130,246,0.3), transparent 70%)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3B82F6]" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Agents taking action across every channel right now
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
                  No developer required
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Put agentic AI to work across{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  every channel.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Deploy autonomous AI that completes multi-step tasks across your
                tools and channels — with guardrails and human handoff built in.
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
                "Multi-step actions",
                "Orchestrates your tools",
                "Acts or asks, on its own",
                "Guardrails + human handoff",
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

/* ─────────────────────────────────────────────────────────────
   Orchestration node tile
─────────────────────────────────────────────────────────────── */

function NodeTile({
  Icon,
  label,
  note,
  align,
  active,
}: {
  Icon: typeof Database
  label: string
  note: string
  align: "left" | "right"
  active?: boolean
}) {
  return (
    <motion.div
      animate={{
        borderColor: active
          ? "rgba(59,130,246,0.55)"
          : "rgba(226,232,240,1)",
        boxShadow: active
          ? "0 18px 36px -18px rgba(29,78,216,0.5)"
          : "0 0 0 0 rgba(0,0,0,0)",
        scale: active ? 1.03 : 1,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`group relative flex items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 ${
        align === "right" ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
    >
      {/* data pulse travelling toward the hub while active */}
      {active && (
        <motion.span
          aria-hidden="true"
          className="hidden lg:block absolute top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full bg-[#3B82F6] shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"
          style={align === "right" ? { left: -4 } : { right: -4 }}
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: align === "right" ? [-2, -26] : [2, 26],
          }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.div
        animate={{
          backgroundColor: active
            ? "rgba(59,130,246,0.16)"
            : "rgba(234,242,255,1)",
        }}
        transition={{ duration: 0.35 }}
        className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
      >
        <Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
      </motion.div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0F2A4A] truncate">
          {label}
        </p>
        <p className="text-[11px] text-slate-500 truncate">{note}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Orchestration diagram — the agent hub pulses with a rotating halo
   while it "reaches" each connected system in sequence.
─────────────────────────────────────────────────────────────── */

function OrchestrationDiagram() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    const id = setInterval(
      () => setPhase((p) => (p + 1) % orchestrationNodes.length),
      900,
    )
    return () => clearInterval(id)
  }, [])

  return (
    <BlurFade delay={0.1}>
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-10 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.25)]">
        {/* glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(96,165,250,0.12), transparent 70%)",
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
          {/* left column nodes */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {orchestrationNodes.slice(0, 3).map((n, i) => (
              <NodeTile key={n.label} {...n} align="left" active={phase === i} />
            ))}
          </div>

          {/* hub */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-4">
            <div className="relative">
              {/* pulsing glow */}
              <motion.span
                aria-hidden="true"
                className="absolute -inset-6 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.45), transparent 70%)",
                }}
                animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* rotating halo ring */}
              <motion.span
                aria-hidden="true"
                className="absolute -inset-[3px] rounded-[28px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(96,165,250,0.7) 55deg, transparent 130deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                animate={{ scale: [1, 1.045, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex flex-col items-center justify-center shadow-[0_20px_40px_-15px_rgba(29,78,216,0.6)]"
              >
                <Bot className="h-9 w-9 text-white" />
                <span className="mt-1 text-[10px] font-semibold text-white/90 uppercase tracking-wider">
                  Agent
                </span>
              </motion.div>
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/25 bg-[#EAF2FF] px-3 py-1">
              <motion.span
                animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
              </motion.span>
              <span className="text-[11px] font-medium text-[#1D4ED8]">
                Plans · calls tools · verifies
              </span>
            </div>
            <p className="mt-3 max-w-xs text-center text-[12.5px] text-slate-500 leading-relaxed">
              The agent decides which systems to touch, in what order, and checks
              the result before it replies.
            </p>
          </div>

          {/* right column nodes */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {orchestrationNodes.slice(3).map((n, i) => (
              <NodeTile
                key={n.label}
                {...n}
                align="right"
                active={phase === i + 3}
              />
            ))}
          </div>
        </div>

        {/* connector legend */}
        <div className="relative mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
          {[
            "200+ native integrations",
            "REST API",
            "Webhooks",
            "Your data, grounded",
          ].map((t, i) => (
            <span key={t} className="flex items-center gap-1.5">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
              {t}
            </span>
          ))}
        </div>
      </div>
    </BlurFade>
  )
}
