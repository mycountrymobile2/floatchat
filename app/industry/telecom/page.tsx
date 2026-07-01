"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Signal,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Radio,
  CreditCard,
  Receipt,
  Zap,
  Users,
  Gauge,
  Bell,
  Megaphone,
  Wifi,
  Phone,
  MessageSquare,
  Layers,
  TrendingUp,
  AlertTriangle,
  Clock,
  ShieldCheck,
  ArrowUpCircle,
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
  title: "Agentic AI for Telecom | FloatChat",
  description:
    "Handle support, billing, and notifications at scale for telecom with agentic AI and omnichannel broadcasting across every channel.",
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
   HERO VISUAL — telecom support-at-scale surface:
   a data-usage/billing card, a plan-upgrade offer, and a live
   support-queue dashboard (waiting vs AI-resolved) showing scale.
─────────────────────────────────────────────────────────────── */

function TelecomScaleSurface() {
  // Animate the "AI-resolved" counter climbing to show scale.
  const [resolved, setResolved] = useState(11840)
  const [waiting, setWaiting] = useState(214)

  useEffect(() => {
    const id = setInterval(() => {
      setResolved((r) => r + Math.floor(Math.random() * 7) + 2)
      setWaiting((w) => {
        const next = w + (Math.random() > 0.55 ? -1 : 1) * (Math.floor(Math.random() * 4))
        return Math.max(180, Math.min(260, next))
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const total = resolved + waiting
  const resolvedPct = Math.round((resolved / total) * 100)

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

      {/* Floating scale chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          {resolvedPct}% resolved by AI
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
          SMS · WhatsApp · RCS
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
            app.floatchat.com · telecom
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="p-4 space-y-3 bg-slate-50/30">
          {/* Row 1: data-usage / billing card + plan-upgrade offer */}
          <div className="grid grid-cols-12 gap-3">
            {/* Data usage + pay bill */}
            <div className="col-span-12 sm:col-span-7 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-md bg-[#3B82F6]/10 flex items-center justify-center">
                    <Gauge className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#0F2A4A]">
                    My plan · Unlimited 40GB
                  </span>
                </div>
                <span className="font-mono text-[9px] text-slate-400">#88-2214</span>
              </div>

              {/* Usage meter */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Data used</span>
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    82% of plan used
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                  />
                </div>
                <p className="mt-1 text-[9px] text-slate-400">32.8 GB of 40 GB · renews in 6 days</p>
              </div>

              {/* Billing line */}
              <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <Receipt className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  <div>
                    <p className="text-[10px] font-medium text-[#0F2A4A] leading-tight">
                      Invoice · Jun
                    </p>
                    <p className="text-[9px] text-slate-600">Due in 3 days · $54.00</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] px-2.5 py-1.5 text-[10px] font-medium text-white shadow-sm">
                  <CreditCard className="h-3 w-3" /> Pay bill
                </button>
              </div>
            </div>

            {/* Plan-upgrade offer */}
            <div className="col-span-12 sm:col-span-5 rounded-xl border border-[#3B82F6]/25 bg-gradient-to-br from-[#EAF2FF] to-white p-3.5 shadow-sm flex flex-col">
              <div className="flex items-center gap-1.5">
                <ArrowUpCircle className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                  Suggested upgrade
                </span>
              </div>
              <p className="mt-2 text-[11px] text-[#0F2A4A] leading-snug">
                You&apos;re near your cap. Move to{" "}
                <span className="font-semibold">Unlimited 100GB</span> for{" "}
                <span className="font-semibold">+$8/mo</span>.
              </p>
              <ul className="mt-2 space-y-1">
                {["No overage fees", "5G priority", "Applies this cycle"].map((b) => (
                  <li key={b} className="flex items-center gap-1.5 text-[9.5px] text-[#0F2A4A]">
                    <Check className="h-2.5 w-2.5 text-emerald-600" strokeWidth={3} />
                    {b}
                  </li>
                ))}
              </ul>
              <button className="mt-auto pt-2.5 inline-flex items-center justify-center gap-1 rounded-md border border-[#3B82F6]/30 bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#1D4ED8] hover:bg-[#EAF2FF] transition-colors">
                Upgrade in chat <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Row 2: live support-queue dashboard (waiting vs AI-resolved) */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span className="text-[11px] font-semibold text-[#0F2A4A]">
                  Support queue · today
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <TrendingUp className="h-2.5 w-2.5" /> at scale
              </span>
            </div>

            {/* Split bar: waiting vs AI-resolved */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[9px] font-medium text-slate-600 w-16 shrink-0">
                Waiting
              </span>
              <div className="flex-1 h-6 rounded-md bg-slate-100 overflow-hidden flex">
                <motion.div
                  animate={{ width: `${100 - resolvedPct}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="h-full bg-slate-400/80 flex items-center justify-end pr-1.5"
                >
                  <span className="text-[8.5px] font-semibold text-white tabular-nums">
                    {waiting}
                  </span>
                </motion.div>
                <motion.div
                  animate={{ width: `${resolvedPct}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] flex items-center justify-end pr-1.5"
                >
                  <span className="text-[8.5px] font-semibold text-white tabular-nums">
                    {resolved.toLocaleString()}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Stat trio */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { Icon: Zap, label: "Auto-resolved", value: `${resolvedPct}%`, tone: "blue" as const },
                { Icon: Clock, label: "Avg first reply", value: "3s", tone: "blue" as const },
                { Icon: Users, label: "To humans", value: `${100 - resolvedPct}%`, tone: "amber" as const },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-1.5"
                >
                  <div className="flex items-center gap-1">
                    <s.Icon
                      className={`h-3 w-3 ${s.tone === "amber" ? "text-slate-600" : "text-[#1D4ED8]"}`}
                    />
                    <span className="text-[8.5px] text-slate-500">{s.label}</span>
                  </div>
                  <p
                    className={`mt-0.5 text-[13px] font-semibold tabular-nums ${
                      s.tone === "amber" ? "text-slate-600" : "text-[#0F2A4A]"
                    }`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function SupportScaleVisual() {
  const rows = [
    { label: "Plan questions", pct: 92 },
    { label: "SIM & activation", pct: 88 },
    { label: "Coverage checks", pct: 79 },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Absorbing the flood
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Zap className="h-2.5 w-2.5" /> auto
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
            <span className="text-[9px] font-semibold text-[#1D4ED8] tabular-nums">
              {r.pct}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
              style={{ width: `${r.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function BillingVisual() {
  const steps = [
    { label: "Read invoice #Jun-4402", done: true },
    { label: "Explain roaming charge", done: true },
    { label: "Take $54 payment", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <CreditCard className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Billing action
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not just an FAQ</span>
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

function NotificationsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-slate-200 bg-slate-50/60 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-slate-700" />
          <span className="text-[9.5px] font-semibold text-slate-800">
            Outage · Sector 12
          </span>
          <span className="ml-auto text-[8px] text-slate-700">ETA 40m</span>
        </div>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { Icon: MessageSquare, label: "SMS" },
          { Icon: SiWhatsapp, label: "WhatsApp", brand: true },
          { Icon: Radio, label: "RCS" },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center gap-1"
          >
            {c.brand ? (
              <SiWhatsapp style={{ color: "#25D366", width: 14, height: 14 }} />
            ) : (
              <c.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            )}
            <span className="text-[8px] font-medium text-[#0F2A4A]">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          48,200 affected subscribers notified
        </span>
      </div>
    </div>
  )
}

function BroadcastVisual() {
  const segments = [
    { label: "Prepaid · low balance", count: "22.1k" },
    { label: "Upgrade eligible", count: "8.4k" },
    { label: "Renewal in 7 days", count: "13.9k" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Broadcast campaign
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Megaphone className="h-2.5 w-2.5" /> segmented
        </span>
      </div>
      {segments.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <Users className="h-3 w-3 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] text-[#0F2A4A] truncate flex-1">{s.label}</span>
          <span className="text-[9px] font-semibold text-[#1D4ED8] tabular-nums shrink-0">
            {s.count}
          </span>
        </div>
      ))}
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Two-way replies flow back to one inbox
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can agentic AI actually handle telecom-scale volume?",
    answer:
      "Yes. That's the point. Carriers, MVNOs, and ISPs field enormous, repetitive contact volume — plan questions, SIM activations, coverage checks, and bill lookups — and an agentic AI absorbs it 24/7 without a queue. Because each request is handled independently and instantly, spikes from a promotion, a billing cycle, or an outage don't overwhelm your team. The repetitive contacts get resolved automatically; only true exceptions reach a human.",
  },
  {
    question: "Can the agent send outage and service alerts?",
    answer:
      "Yes, across every channel. When there's an outage, maintenance window, or service disruption, FloatChat broadcasts proactive notifications over SMS, WhatsApp, and RCS to exactly the affected subscribers — and because it's two-way, customers can reply to ask about ETAs or check status right in the same thread. Proactive alerts cut inbound volume before it hits your queue.",
  },
  {
    question: "Can the agent take billing and payment actions?",
    answer:
      "Yes, through your integrations. Connected to your billing and CRM systems, the agent can look up an invoice, explain a roaming or overage charge, process a payment, and confirm it — all inside the conversation. It doesn't just point customers at a help article; it completes the task, within the guardrails you set.",
  },
  {
    question: "Can it recommend and process plan upgrades?",
    answer:
      "Yes. The agent can see usage context — for example, a subscriber near their data cap — recommend the right plan, explain the price difference, and complete the upgrade in the chat. Plan and upgrade help becomes self-serve, which lifts conversion while taking load off your retention team.",
  },
  {
    question: "Which channels does it cover for telecom?",
    answer:
      "Support, billing, and broadcasting all run across SMS, WhatsApp, RCS, voice, and web chat from one place. Whether a customer texts you, messages on WhatsApp, or you push an RCS campaign, it's the same customer record and the same conversation history following them everywhere.",
  },
  {
    question: "How does one record work across channels and campaigns?",
    answer:
      "In FloatChat, support, billing, and notifications share a single customer record across every channel and campaign. So an outage alert you broadcast over SMS, a billing question that comes back over WhatsApp, and a plan upgrade in web chat are all the same conversation — no silos, no repeated questions, and full context on every human handoff.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Telecom",
  serviceType: "Agentic AI support, billing, and notification automation for telecom",
  description:
    "Handle support, billing, and notifications at scale for telecom with agentic AI and omnichannel broadcasting over SMS, WhatsApp, RCS, voice, and web chat — one customer record across every channel and campaign.",
  url: "https://www.floatchat.com/industry/telecom",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Telecom carriers, MVNOs, and ISPs",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The reasoning engine that resolves and acts — not just answers.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Layers,
    title: "Omnichannel Inbox",
    body: "One record and one inbox across every channel and campaign.",
  },
  {
    to: "/channels/sms-broadcasting",
    Icon: Megaphone,
    title: "SMS Broadcasting",
    body: "Push outage alerts and offers to targeted subscriber segments.",
  },
  {
    to: "/channels/rcs",
    Icon: Radio,
    title: "RCS",
    body: "Rich, branded, two-way messaging for notifications at scale.",
  },
  {
    to: "/channels/voice",
    Icon: Phone,
    title: "Voice",
    body: "Deflect and resolve calls with the same grounded agent.",
  },
  {
    to: "/integrations",
    Icon: Zap,
    title: "Integrations",
    body: "Connect billing and CRM so the agent can take real actions.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function TelecomIndustryPage() {
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
                  <Signal className="h-3.5 w-3.5" />
                  Telecom · support, billing & notifications at scale
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    Telecom.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Handle support, billing, and notifications at scale with agents
                  that act across every channel — resolving plan, bill, and
                  outage requests instantly instead of stacking them in a queue.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "24/7 high-volume support",
                    "Billing actions, not just answers",
                    "Outage alerts across channels",
                    "One record everywhere",
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
                  Built for carriers, MVNOs, and ISPs.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <TelecomScaleSurface />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: ArrowUpCircle, value: "Plans", label: "recommend & upgrade in chat" },
                { Icon: CreditCard, value: "Billing", label: "answer & take payment" },
                { Icon: Bell, value: "Outages", label: "proactive alerts to subscribers" },
                { Icon: Gauge, value: "At scale", label: "high-volume automation, 24/7" },
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
                  Telecom support runs at massive volume.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Millions of subscribers, three questions each, all at once:
                    what plan am I on, why is my bill higher this month, and when
                    will the outage clear. Customers expect instant answers on
                    plans, bills, and coverage — and every promotion or billing
                    cycle sends volume spiking past what any team can staff for.
                  </p>
                  <p>
                    Traditional IVRs and scripted bots deflect a handful of FAQs,
                    then dump everything else into a queue with no context. The
                    routine floods the same lines as the genuinely hard cases, and
                    wait times climb exactly when customers are most frustrated.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI for telecom
                    </span>{" "}
                    absorbs the volume and acts on each request — resolving the
                    common ones instantly and leaving your team the exceptions.
                  </p>
                </div>
              </BlurFade>

              {/* IVR/bot vs agent contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Scripted IVR & bots
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Deflect a few FAQs, queue the rest",
                        "Can't read a bill or take a payment",
                        "No proactive outage alerts",
                        "Volume spikes crush wait times",
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
                      Agentic AI for telecom
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Resolves plans, bills, coverage instantly",
                        "Explains and takes billing actions",
                        "Broadcasts outage alerts proactively",
                        "Absorbs spikes — no queue, 24/7",
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
                  Four telecom jobs, one agentic platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Support at scale, billing, notifications, and broadcasting —
                  grounded in your systems and running around the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Gauge,
                  title: "Support at scale.",
                  body:
                    "Plan questions, SIM activations, and coverage checks are the contacts that flood your queues. The agent handles the repetitive volume automatically, 24/7, so spikes from a promotion or billing cycle never overwhelm your team.",
                  visual: <SupportScaleVisual />,
                },
                {
                  Icon: CreditCard,
                  title: "Billing that takes action.",
                  body:
                    "Connected to your billing and CRM, the agent looks up an invoice, explains a roaming or overage charge, and processes the payment in the conversation — completing the task, not pointing at a help article.",
                  visual: <BillingVisual />,
                },
                {
                  Icon: Bell,
                  title: "Proactive notifications.",
                  body:
                    "Push outage and service updates to affected subscribers over SMS, WhatsApp, and RCS before they even call. Two-way replies flow back to the same inbox, cutting inbound volume at the source.",
                  visual: <NotificationsVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Omnichannel broadcasting.",
                  body:
                    "Target subscriber segments — low-balance prepaid, upgrade-eligible, renewals due — with campaigns across every channel. Replies come back as real conversations the same agent can resolve.",
                  visual: <BroadcastVisual />,
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

        {/* ───── HOW IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Self-serve the common. Escalate the rest.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Customers self-serve common requests instantly, your team
                  handles exceptions, and proactive notifications cut inbound
                  volume before it ever reaches a queue.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  Icon: Zap,
                  title: "Customer self-serves, instantly",
                  body:
                    "A subscriber asks about their plan, bill, or coverage on any channel. The agent reads the context, resolves it, and takes the action — an upgrade, a payment, a status check — in seconds.",
                },
                {
                  step: "02",
                  Icon: Users,
                  title: "Your team handles exceptions",
                  body:
                    "When a case is genuinely hard — a disputed charge, a complex fault — the agent hands off in-thread with the full record and history, so a human never starts from zero.",
                },
                {
                  step: "03",
                  Icon: Bell,
                  title: "Proactive alerts cut inbound",
                  body:
                    "Outage and service notifications go out over SMS, WhatsApp, and RCS to affected subscribers first — so the calls that would have flooded your queue never come in.",
                },
              ].map((s, i) => (
                <BlurFade key={s.step} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-slate-400">/ {s.step}</span>
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                        <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {s.body}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One record across every channel and campaign.
                </h2>
                <p className="mt-6 text-base text-slate-500 leading-relaxed max-w-xl">
                  Support, billing, and notifications aren&apos;t separate tools
                  bolted together — they share a single customer record across
                  every channel and every campaign. An outage alert broadcast
                  over SMS, a billing question that returns over WhatsApp, and a
                  plan upgrade in web chat are all one conversation, with full
                  context on every handoff.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/compare"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Compare FloatChat <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    See pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: Layers,
                      title: "Unified customer record",
                      body: "Every channel and campaign reads and writes the same profile — no silos, no repeats.",
                    },
                    {
                      Icon: Wifi,
                      title: "Omnichannel by default",
                      body: "SMS, WhatsApp, RCS, voice, and web chat — support and broadcasting share the stack.",
                    },
                    {
                      Icon: ShieldCheck,
                      title: "Actions within guardrails",
                      body: "Billing, upgrades, and lookups run inside the limits and approvals you configure.",
                    },
                    {
                      Icon: TrendingUp,
                      title: "Built for volume",
                      body: "Absorbs promotion, billing-cycle, and outage spikes without a growing queue.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-slate-300 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.3)] transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-3">
                        <c.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#0F2A4A] leading-tight">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Scale telecom support with agentic AI."
          body="Support, billing, and notifications at scale across SMS, WhatsApp, RCS, voice, and web chat."
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
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Build the telecom stack.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The channels, products, and reasoning that power support,
                  billing, and broadcasting at scale.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((l, i) => (
                <BlurFade key={l.to} delay={0.04 + i * 0.06} className="h-full">
                  <Link
                    to={l.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.3)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                        <l.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#1D4ED8] transition-colors" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2A4A]">
                      {l.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {l.body}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <p className="mt-8 text-sm text-slate-500">
                Also useful:{" "}
                <Link to="/contact" className="font-medium text-[#1D4ED8] hover:underline">
                  Talk to sales
                </Link>{" "}
                ·{" "}
                <Link to="/demo" className="font-medium text-[#1D4ED8] hover:underline">
                  Book a demo
                </Link>{" "}
                ·{" "}
                <Link to="/integrations" className="font-medium text-[#1D4ED8] hover:underline">
                  Browse integrations
                </Link>
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Telecom, answered"
              description="How agentic AI handles support, billing, and notifications at scale."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#0F2A4A] to-[#0B1E38]">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(96,165,250,0.25) 1px, transparent 1px)",
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
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.6), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#BFD4FF] mb-6">
                <Signal className="h-3.5 w-3.5" />
                Carriers · MVNOs · ISPs
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                Scale telecom support with agentic AI.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Support, billing, and notifications at scale — one agent, one
                record, across every channel and campaign.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                >
                  Get a Demo
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Or{" "}
                <Link to="/signup?plan=free" className="font-medium text-[#BFD4FF] hover:underline">
                  start free
                </Link>{" "}
                — no credit card required.
              </p>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
