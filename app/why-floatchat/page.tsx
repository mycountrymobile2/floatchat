"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Sparkles,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Workflow,
  Radio,
  Phone,
  Puzzle,
  DollarSign,
  Unplug,
  X,
  Boxes,
  MessageSquare,
  Megaphone,
  ShieldCheck,
  Zap,
  Building2,
  ShoppingBag,
  Landmark,
  Plug,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiSlack,
  SiHubspot,
  SiZapier,
  SiShopify,
  SiSalesforce,
} from "react-icons/si"
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
  title: "Why FloatChat — One Platform for Agentic AI and Broadcasting",
  description:
    "FloatChat combines agentic AI, every channel, numbers, and broadcasting in one product, with 200+ integrations and transparent USD pricing.",
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
   HERO VISUAL — "stitched stack" vs "one FloatChat hub"
   Left: a tangle of disconnected vendors with broken connectors.
   Right: a single clean FloatChat hub with clean spokes.
─────────────────────────────────────────────────────────────── */

function StackVsHub() {
  const stitched = [
    { Icon: Sparkles, label: "AI vendor", color: "#7C3AED" },
    { Icon: SiWhatsapp, label: "Messaging", color: "#25D366", isSi: true },
    { Icon: Phone, label: "SMS / numbers", color: "#0EA5E9" },
    { Icon: Megaphone, label: "Broadcast tool", color: "#F97316" },
    { Icon: SiHubspot, label: "CRM", color: "#FF7A59", isSi: true },
    { Icon: MessageSquare, label: "Inbox app", color: "#64748B" },
  ]

  const spokes = [
    { Icon: Workflow, label: "Agentic AI" },
    { Icon: Boxes, label: "Every channel" },
    { Icon: Phone, label: "Numbers" },
    { Icon: Megaphone, label: "Broadcasting" },
    { Icon: Puzzle, label: "200+ apps" },
    { Icon: MessageSquare, label: "Shared inbox" },
  ]

  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.4), transparent 70%)",
        }}
      />

      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            one platform vs the stitched-together stack
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[440px]">
          {/* LEFT — stitched stack */}
          <div className="relative border-b sm:border-b-0 sm:border-r border-slate-200 bg-slate-50/40 p-5">
            <div className="flex items-center gap-1.5 mb-4">
              <Unplug className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-600">
                Four vendors, stitched
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {stitched.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                  className="relative rounded-lg border border-dashed border-slate-300 bg-white px-2 py-2 flex items-center gap-2"
                >
                  <span
                    className="h-6 w-6 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}1A` }}
                  >
                    {s.isSi ? (
                      <s.Icon style={{ color: s.color, width: 13, height: 13 }} />
                    ) : (
                      <s.Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                    )}
                  </span>
                  <span className="text-[10px] font-medium text-[#0F2A4A] truncate">
                    {s.label}
                  </span>
                  {/* broken connector nub */}
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <span className="h-px w-2 bg-slate-300" />
                    <X className="h-2.5 w-2.5 text-slate-400" strokeWidth={3} />
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 space-y-1.5">
              {[
                "4 bills · 4 logins · 4 support queues",
                "Context lost between tools",
                "Glue code you maintain forever",
              ].map((t) => (
                <div key={t} className="flex items-start gap-1.5">
                  <X className="h-3 w-3 text-slate-400 mt-0.5 shrink-0" strokeWidth={3} />
                  <span className="text-[10.5px] text-slate-500 leading-snug">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — one FloatChat hub */}
          <div className="relative p-5 bg-gradient-to-br from-white to-[#F5F9FF]">
            <div className="flex items-center gap-1.5 mb-4">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1D4ED8]">
                One FloatChat hub
              </span>
            </div>

            <div className="relative h-[300px]">
              {/* clean spokes */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 300 300"
                fill="none"
                aria-hidden="true"
              >
                {spokes.map((_, i) => {
                  const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2
                  const x = 150 + Math.cos(angle) * 110
                  const y = 150 + Math.sin(angle) * 110
                  return (
                    <motion.line
                      key={i}
                      x1={150}
                      y1={150}
                      x2={x}
                      y2={y}
                      stroke="#3B82F6"
                      strokeWidth={1.5}
                      strokeOpacity={0.35}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                    />
                  )
                })}
              </svg>

              {/* center hub */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex flex-col items-center justify-center shadow-[0_10px_24px_-6px_rgba(37,99,235,0.6)]">
                  <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
                  <span className="text-[7.5px] font-semibold text-white mt-0.5">
                    FloatChat
                  </span>
                </div>
              </motion.div>

              {/* spoke nodes */}
              {spokes.map((s, i) => {
                const angle = (i / spokes.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + Math.cos(angle) * 36.5
                const y = 50 + Math.sin(angle) * 36.5
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="h-9 w-9 rounded-xl bg-white border border-[#3B82F6]/25 flex items-center justify-center shadow-[0_6px_14px_-8px_rgba(15,42,74,0.35)]">
                      <s.Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <span className="text-[8px] font-medium text-[#0F2A4A] whitespace-nowrap">
                      {s.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-3 rounded-lg bg-[#EAF2FF] border border-[#3B82F6]/20 px-2.5 py-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[#1D4ED8] shrink-0" />
              <span className="text-[10px] text-[#0F2A4A] leading-snug">
                One bill, one login, one customer record everywhere.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-30 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Layers className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          4 tools → 1 product
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-30 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <DollarSign className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Transparent USD pricing
        </span>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini-visuals for the reason cards
─────────────────────────────────────────────────────────────── */

function OnePlatformVisual() {
  const parts = ["Agentic AI", "Channels", "Numbers", "Broadcasting", "Inbox"]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Everything, one product
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Layers className="h-2.5 w-2.5" /> unified
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {parts.map((p) => (
          <span
            key={p}
            className="inline-flex items-center gap-1 rounded-md border border-[#3B82F6]/20 bg-[#EAF2FF] px-1.5 py-1 text-[9px] font-medium text-[#1D4ED8]"
          >
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

function AgenticVisual() {
  const steps = [
    { label: "Read the request", done: true },
    { label: "Look up the order", done: true },
    { label: "Update + confirm", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Takes multi-step action
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not scripted</span>
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

function ChannelsVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
    { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
    { Icon: SiMessenger, bg: "#0084FF", label: "Messenger" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Channels + carrier numbers
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Phone className="h-2.5 w-2.5" /> owned #s
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0 ml-auto" />
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Radio className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Campaign · 12,480 sent
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          live
        </span>
      </div>
      {[
        { label: "Delivered", val: "98.4%", w: "98%" },
        { label: "Opened", val: "71.2%", w: "71%" },
        { label: "Replied → agent", val: "18.9%", w: "19%" },
      ].map((b) => (
        <div key={b.label} className="space-y-1">
          <div className="flex items-center justify-between text-[9px] text-slate-500">
            <span>{b.label}</span>
            <span className="font-semibold text-[#1D4ED8]">{b.val}</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
              style={{ width: b.w }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function IntegrationsVisual() {
  const apps = [
    { Icon: SiSlack, color: "#4A154B" },
    { Icon: SiHubspot, color: "#FF7A59" },
    { Icon: SiShopify, color: "#7AB55C" },
    { Icon: SiSalesforce, color: "#00A1E0" },
    { Icon: SiZapier, color: "#FF4A00" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          200+ integrations
        </span>
        <span className="text-[8.5px] text-slate-400">native, no glue code</span>
      </div>
      <div className="flex items-center gap-1.5">
        {apps.map((a, i) => (
          <span
            key={i}
            className="h-8 w-8 rounded-lg border border-slate-200 bg-slate-50/60 flex items-center justify-center shrink-0"
          >
            <a.Icon style={{ color: a.color, width: 15, height: 15 }} />
          </span>
        ))}
        <span className="h-8 flex-1 min-w-0 rounded-lg border border-[#3B82F6]/20 bg-[#EAF2FF] flex items-center justify-center text-[10px] font-semibold text-[#1D4ED8]">
          +195 more
        </span>
      </div>
    </div>
  )
}

function PricingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <DollarSign className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Transparent USD plans
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">on the website</span>
      </div>
      {[
        { label: "Bundled, not per-seat surprises", ok: true },
        { label: "No per-resolution fees", ok: true },
        { label: "One invoice, not four", ok: true },
      ].map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Reasons FloatChat is different
─────────────────────────────────────────────────────────────── */

const reasons = [
  {
    Icon: Layers,
    title: "One platform, not four.",
    body: "The AI, the channels, the numbers, the campaigns, and the shared inbox live in a single product. One customer record follows every conversation — nothing to stitch, nothing to sync.",
    visual: <OnePlatformVisual />,
    to: "/platform",
    linkLabel: "See the platform",
  },
  {
    Icon: Workflow,
    title: "Agentic AI that acts.",
    body: "FloatChat agents take multi-step action across your connected tools — look up an order, change a booking, issue an eligible refund — with guardrails and clean human handoff. Not a scripted decision tree.",
    visual: <AgenticVisual />,
    to: "/agentic-ai",
    linkLabel: "How agentic AI works",
  },
  {
    Icon: Boxes,
    title: "Every channel — plus the numbers.",
    body: "WhatsApp, Instagram, Messenger, SMS, email, voice, and web from one inbox. FloatChat also gives you the carrier layer — real numbers to send and receive on — that AI-only vendors leave out.",
    visual: <ChannelsVisual />,
    to: "/channels/whatsapp",
    linkLabel: "Explore channels",
  },
  {
    Icon: Megaphone,
    title: "Broadcasting is built in.",
    body: "Run opt-in campaigns to thousands, then let the same agent handle every reply in-thread. Broadcast and conversation share one product, so a campaign reply never falls into a dead-end blast tool.",
    visual: <BroadcastVisual />,
    to: "/channels/whatsapp",
    linkLabel: "Broadcast on WhatsApp",
  },
  {
    Icon: Puzzle,
    title: "200+ integrations, natively.",
    body: "Connect your CRM, help desk, store, and data with 200+ native integrations — no brittle middleware to maintain. The agent reads and writes real data instead of guessing.",
    visual: <IntegrationsVisual />,
    to: "/integrations",
    linkLabel: "Browse integrations",
  },
  {
    Icon: DollarSign,
    title: "Transparent USD pricing.",
    body: "Bundled plans you can read on the website — priced in USD, with no per-resolution fees and no four separate invoices. You pay for one product, not a patchwork of vendors.",
    visual: <PricingVisual />,
    to: "/pricing",
    linkLabel: "See pricing",
  },
]

/* ─────────────────────────────────────────────────────────────
   Who it's for
─────────────────────────────────────────────────────────────── */

const audiences = [
  {
    to: "/industry/retail",
    Icon: ShoppingBag,
    title: "Retail & e-commerce",
    body: "Recover carts, answer order questions, and broadcast drops — all resolved by one agent.",
  },
  {
    to: "/voice-ai-agents",
    Icon: Phone,
    title: "Teams that need voice",
    body: "Deflect calls with voice AI agents on real numbers, on the same platform as chat.",
  },
  {
    to: "/platform",
    Icon: Building2,
    title: "Growing support teams",
    body: "Absorb repetitive volume across every channel without hiring for every spike.",
  },
  {
    to: "/compare",
    Icon: Landmark,
    title: "Buyers replacing a stack",
    body: "Consolidate an AI vendor, a messaging vendor, and a contact-center tool into one.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What makes FloatChat different from an AI chatbot vendor?",
    answer:
      "Most vendors sell one slice. An AI-only tool answers questions but has no numbers and no broadcasting. A messaging vendor moves texts but has no agent. A blast tool sends campaigns but drops every reply. FloatChat combines all of it — agentic AI, every channel, real carrier numbers, and broadcasting — in one product, so you buy and manage one thing instead of four.",
  },
  {
    question: "What does 'agentic' actually mean here?",
    answer:
      "It means the AI takes multi-step action, not just answers. Within the guardrails you set, a FloatChat agent can look up an order, change a shipping method, book or reschedule, issue an eligible refund, and update records across your connected tools — then hand off to a human with full context when it hits its limit.",
  },
  {
    question: "Do I need engineers to launch?",
    answer:
      "No. FloatChat is no-code to build and run, with an API available when you want it. Connect your channels, point the agent at your knowledge base, wire up integrations from the library, and go live — there are no conversation journeys to hand-map and no glue code to maintain.",
  },
  {
    question: "What does FloatChat replace?",
    answer:
      "Typically three or four line items: a standalone AI vendor, a messaging or WhatsApp provider, a broadcasting or campaign tool, and a contact-center or shared-inbox app. Consolidating them removes duplicate bills, lost context between tools, and the integration code you would otherwise own forever.",
  },
  {
    question: "How many integrations are there, and is pricing really transparent?",
    answer:
      "There are 200+ native integrations covering CRMs, help desks, stores, and data sources, so the agent reads and writes real data instead of guessing. Pricing is bundled and published on the website in USD — no per-resolution fees and no surprise per-vendor invoices.",
  },
  {
    question: "Does broadcasting and conversation live in the same place?",
    answer:
      "Yes. You can broadcast an opt-in campaign to thousands and let the same agent handle every reply in the same thread. Because broadcast and conversation share one product, a campaign reply never lands in a dead-end blast tool that can't respond.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FloatChat",
  description:
    "FloatChat combines agentic AI, every channel, numbers, and broadcasting in one product, with 200+ integrations and transparent USD pricing.",
  url: "https://www.floatchat.com/why-floatchat",
  brand: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  category: "Agentic AI customer engagement platform",
  audience: {
    "@type": "Audience",
    audienceType:
      "Support, sales, and customer experience teams consolidating their tooling",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function WhyFloatChatPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={[productSchema, faqSchema]} />

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
                  <Sparkles className="h-3.5 w-3.5" />
                  Why FloatChat · one platform instead of four vendors
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI, every channel, and broadcasting —{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    in one product.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Most teams bolt an AI vendor onto a messaging tool onto a
                  broadcasting tool — and maintain the glue forever. FloatChat puts
                  the agent, the channels, the numbers, and the campaigns in a
                  single platform, with 200+ integrations and transparent USD
                  pricing.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Agentic AI + broadcasting",
                    "No developer required",
                    "200+ integrations",
                    "Transparent USD pricing",
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
                  One platform instead of four vendors.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <StackVsHub />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Radio, value: "AI + broadcast", label: "in a single product" },
                { Icon: Zap, value: "No-code", label: "no developer required" },
                { Icon: Puzzle, value: "200+", label: "native integrations" },
                { Icon: DollarSign, value: "USD", label: "transparent, bundled pricing" },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-semibold text-[#0F2A4A] leading-none">
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

        {/* ───── THE REASONS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="The case for FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Six reasons FloatChat is a different kind of tool.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Each of these is usually a separate purchase. FloatChat ships
                  them as one product — so they actually work together.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {reasons.map((r, i) => (
                <BlurFade key={r.title} delay={0.05 + i * 0.06} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <r.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {r.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {r.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">{r.visual}</div>
                    <Link
                      to={r.to}
                      className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8] hover:gap-2.5 transition-all"
                    >
                      {r.linkLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── BEFORE / AFTER ───── */}
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
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="Stitched stack vs FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The same job, two very different setups.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  You can wire four vendors together and maintain the seams — or
                  run the whole thing on one platform.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Before */}
              <BlurFade delay={0.1} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-4">
                    The stitched-together stack
                  </p>
                  <ul className="space-y-3">
                    {[
                      "An AI vendor that answers but owns no numbers",
                      "A separate messaging or WhatsApp provider",
                      "A blast tool that can't handle the replies",
                      "A contact-center app for the human inbox",
                      "Glue code and syncs you maintain forever",
                      "Four bills, four logins, four support queues",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-slate-900/80 leading-relaxed"
                      >
                        <X
                          className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0"
                          strokeWidth={3}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              {/* Arrow */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <span className="h-12 w-px bg-gradient-to-b from-slate-300 to-[#93C5FD]" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="h-12 w-px bg-gradient-to-b from-[#93C5FD] to-emerald-300" />
                </div>
              </div>

              {/* After */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">
                    FloatChat, one product
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Agentic AI that acts, not just answers",
                      "Every channel plus real carrier numbers",
                      "Broadcasting and replies in the same thread",
                      "One shared inbox for AI and humans",
                      "200+ native integrations, no glue code",
                      "One bill, one login, transparent USD pricing",
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

            {/* consolidation band */}
            <BlurFade delay={0.25}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Sparkles, title: "AI vendor", note: "→ FloatChat" },
                    { Icon: MessageSquare, title: "Messaging vendor", note: "→ FloatChat" },
                    { Icon: Megaphone, title: "Broadcast tool", note: "→ FloatChat" },
                    { Icon: Boxes, title: "Contact-center app", note: "→ FloatChat" },
                  ].map((step) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight truncate">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-[#1D4ED8] truncate">
                            {step.note}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── PROOF / RESULTS STRIP ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why it matters" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  You move faster, pay less, and manage one tool.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Consolidation isn&apos;t just tidier — it changes what your team
                  can ship and what your customers experience.
                </p>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Zap,
                  title: "Faster to launch and change.",
                  body: "One product to configure means no cross-vendor integration project. Connect channels, point the agent at your data, and ship in days.",
                },
                {
                  Icon: DollarSign,
                  title: "Lower total cost.",
                  body: "One bundled USD plan replaces three or four subscriptions — plus the hidden cost of the glue code and the people who maintain it.",
                },
                {
                  Icon: ShieldCheck,
                  title: "One consistent experience.",
                  body: "Because the AI, channels, numbers, and campaigns share one customer record, every conversation stays consistent across every touchpoint.",
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

            {/* dark emphasis strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      The bottom line
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      Agentic AI, every channel, real numbers, and broadcasting —
                      on one platform, with 200+ integrations and pricing you can
                      read on the website.
                    </p>
                  </div>
                  <Link
                    to="/compare"
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-[#1D4ED8] text-[15px] font-medium hover:bg-white/90 transition-colors shrink-0"
                  >
                    Compare FloatChat
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHO IT'S FOR ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Who it's for" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built for teams that are done stitching tools together.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((a, i) => (
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

            {/* related quick links */}
            <BlurFade delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Explore
                </span>
                {[
                  { to: "/platform", label: "Platform", Icon: Layers },
                  { to: "/agentic-ai", label: "Agentic AI", Icon: Workflow },
                  { to: "/integrations", label: "Integrations", Icon: Plug },
                  { to: "/voice-ai-agents", label: "Voice AI", Icon: Phone },
                  { to: "/industry/retail", label: "Retail", Icon: ShoppingBag },
                  { to: "/pricing", label: "Pricing", Icon: DollarSign },
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

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="One platform instead of four vendors."
          body="Agentic AI, every channel, numbers, and broadcasting — with 200+ integrations and transparent USD pricing."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Why FloatChat — the questions buyers ask"
              description="Straight answers about what makes FloatChat one product instead of four."
              footer={
                <p className="text-sm text-muted-foreground">
                  Still weighing it up?{" "}
                  <Link
                    to="/compare"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Compare FloatChat
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    talk to us
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 45%, rgba(191,219,254,0.55) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 30%, #60A5FA 50%, #93C5FD 70%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.4), rgba(96,165,250,0.15) 50%, transparent 75%)",
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
                  Agentic AI + broadcasting on one platform
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
                  Transparent USD pricing
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                See why teams run on{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  one FloatChat.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Replace the stitched-together stack with agentic AI, every channel,
                numbers, and broadcasting in a single product.
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
                "Agentic AI + broadcasting",
                "No developer required",
                "200+ integrations",
                "Transparent USD pricing",
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
