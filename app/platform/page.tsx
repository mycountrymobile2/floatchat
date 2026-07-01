"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Layers,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Globe,
  MessageSquare,
  Users,
  Inbox,
  ShieldCheck,
  Phone,
  MessageCircle,
  Workflow,
  Bot,
  Megaphone,
  Code2,
  Webhook,
  Key,
  Lock,
  FileText,
  Radio,
  Braces,
  User,
  Boxes,
  Building2,
  Fingerprint,
  Plug,
  ArrowLeftRight,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiGmail,
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
  title: "FloatChat Platform — Agentic AI, Omnichannel, and Broadcasting",
  description:
    "One platform for agentic AI agents, an omnichannel inbox, broadcasting, and developer tools. Everything your customer experience needs in one product.",
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
   HERO VISUAL — the PLATFORM DIAGRAM.

   A central "one platform" core (a single customer record) with four
   labeled pillars radiating out (Agentic AI, Omnichannel Inbox,
   Broadcasting, Developer Tools). Channel logos feed into the core.
   A pulse cycles which pillar is "active" so the whole thing reads as
   a live system, not a static graphic. Distinct from the single-
   conversation mockups on the channel pages.
─────────────────────────────────────────────────────────────── */

type Pillar = {
  key: string
  label: string
  sub: string
  Icon: typeof Bot
  corner: string
}

const pillars: Pillar[] = [
  { key: "ai", label: "Agentic AI", sub: "answers + acts", Icon: Bot, corner: "top-left" },
  { key: "inbox", label: "Omnichannel Inbox", sub: "one shared view", Icon: Inbox, corner: "top-right" },
  { key: "broadcast", label: "Broadcasting", sub: "SMS · WhatsApp · RCS", Icon: Megaphone, corner: "bottom-left" },
  { key: "dev", label: "Developer Tools", sub: "API · webhooks · SSO", Icon: Code2, corner: "bottom-right" },
]

const feedChannels = [
  { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
  { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
  { Icon: SiMessenger, bg: "#0084FF", label: "Messenger" },
  { Icon: SiGmail, bg: "#EA4335", label: "Email" },
] as const

function PlatformDiagram() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % pillars.length)
    }, 1800)
    return () => clearInterval(id)
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

      {/* Floating "one platform" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Layers className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Four products · one platform
        </span>
      </motion.div>

      {/* Floating "replaces vendors" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Replaces 4 vendors
        </span>
      </motion.div>

      {/* Main frame */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · platform
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* Diagram body */}
        <div className="relative px-5 py-6 sm:px-7 sm:py-8 bg-gradient-to-b from-white to-slate-50/60">
          {/* Channel intake rail */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-[9.5px] uppercase tracking-wider text-slate-400 font-medium mr-1">
              Channels in
            </span>
            {feedChannels.map((c, i) => (
              <motion.span
                key={c.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="h-6 w-6 rounded-md flex items-center justify-center shadow-sm ring-1 ring-black/5"
                style={{ background: c.bg }}
                title={c.label}
              >
                <c.Icon style={{ color: "#fff", width: 12, height: 12 }} />
              </motion.span>
            ))}
            <span className="h-6 w-6 rounded-md bg-[#0F2A4A] flex items-center justify-center ring-1 ring-black/5">
              <Phone className="h-3 w-3 text-white" />
            </span>
            <span className="h-6 w-6 rounded-md bg-[#3B82F6] flex items-center justify-center ring-1 ring-black/5">
              <MessageCircle className="h-3 w-3 text-white" />
            </span>
          </div>

          {/* down-feed lines into the grid */}
          <div className="flex items-center justify-center mb-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="mx-4 h-4 w-px bg-gradient-to-b from-[#93C5FD] to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          {/* Pillar grid with the core in the center */}
          <div className="relative grid grid-cols-2 gap-x-16 gap-y-16 sm:gap-x-24">
            {pillars.map((p, i) => (
              <PillarNode key={p.key} pillar={p} active={active === i} />
            ))}

            {/* Center core — the one customer record */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* orbit ring */}
                <motion.span
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full border border-dashed border-[#3B82F6]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                />
                <div className="relative h-[104px] w-[104px] sm:h-[116px] sm:w-[116px] rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] shadow-[0_18px_40px_-18px_rgba(29,78,216,0.7)] flex flex-col items-center justify-center text-center px-2">
                  <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center mb-1.5">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-[10px] font-semibold text-white leading-tight">
                    One customer
                  </p>
                  <p className="text-[8.5px] text-white/70 leading-tight">
                    record at the core
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-1.5 py-0.5 text-[7.5px] font-medium text-white">
                    <span className="h-1 w-1 rounded-full bg-emerald-300 animate-pulse" />
                    synced
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* bottom status bar */}
          <div className="mt-6 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
            <div className="flex items-center gap-1.5">
              <ArrowLeftRight className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[9.5px] text-slate-500">
                Every product shares the same record, history, and guardrails.
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
              <ShieldCheck className="h-2.5 w-2.5" /> enterprise-secure
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PillarNode({ pillar, active }: { pillar: Pillar; active: boolean }) {
  return (
    <motion.div
      animate={
        active
          ? {
              borderColor: "rgba(59,130,246,0.55)",
              boxShadow: "0 0 0 4px rgba(59,130,246,0.10)",
            }
          : {
              borderColor: "rgba(226,232,240,1)",
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ duration: 0.35 }}
      className="relative z-10 flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 shadow-sm"
    >
      <div
        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          active
            ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white shadow-md shadow-[#3B82F6]/30"
            : "bg-[#EAF2FF] text-[#1D4ED8]"
        }`}
      >
        <pillar.Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </div>
      <div className="min-w-0">
        <p className="text-[11.5px] font-semibold text-[#0F2A4A] leading-tight truncate">
          {pillar.label}
        </p>
        <p className="text-[9px] text-slate-500 truncate">{pillar.sub}</p>
      </div>
      {active && (
        <motion.span
          layoutId="pillar-dot"
          className="ml-auto h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0"
        />
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the four pillar blocks
─────────────────────────────────────────────────────────────── */

function AgenticVisual() {
  const steps = [
    { label: "Look up order #A-2291", done: true },
    { label: "Switch to express shipping", done: true },
    { label: "Send confirmation", current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Agent completes the task
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not just a reply</span>
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
                : "bg-[#3B82F6] text-white"
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

function InboxVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", name: "Daniela Cruz", note: "Order #A-2291", tag: "AI" },
    { Icon: SiInstagram, bg: "#E4405F", name: "Marcus Webb", note: "Sizing help", tag: "Priya" },
    { Icon: SiGmail, bg: "#EA4335", name: "Ken Ito", note: "Invoice copy", tag: "AI" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One shared inbox
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> 7 channels
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-[#0F2A4A] truncate leading-tight">
              {r.name}
            </p>
            <p className="text-[8.5px] text-slate-400 truncate">{r.note}</p>
          </div>
          <span className="text-[8px] font-medium text-[#1D4ED8] bg-[#EAF2FF] rounded px-1 py-0.5 shrink-0">
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", pct: "48%" },
    { Icon: MessageSquare, bg: "#0F2A4A", label: "SMS", pct: "34%" },
    { Icon: Radio, bg: "#1D4ED8", label: "RCS", pct: "18%" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Campaign · Spring sale
        </span>
        <span className="ml-auto text-[8.5px] text-emerald-600 font-medium">
          delivered
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            <r.Icon className="h-[11px] w-[11px] text-white" />
          </span>
          <span className="text-[10px] text-[#0F2A4A] w-16 shrink-0">{r.label}</span>
          <span className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
              style={{ width: r.pct }}
            />
          </span>
          <span className="text-[9px] font-medium text-slate-500 w-8 text-right tabular-nums">
            {r.pct}
          </span>
        </div>
      ))}
    </div>
  )
}

function DeveloperVisual() {
  const lines = [
    { t: "POST /v1/messages", c: "text-[#1D4ED8]" },
    { t: '  "channel": "whatsapp",', c: "text-slate-500" },
    { t: '  "to": "+1 415 555 0132",', c: "text-slate-500" },
    { t: '  "agent": "cx-resolver"', c: "text-slate-500" },
    { t: "→ 200 · queued", c: "text-emerald-600" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-[#0F2A4A] p-3 space-y-1.5 font-mono">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-white/10">
        <Braces className="h-3 w-3 text-[#60A5FA]" />
        <span className="text-[9px] font-semibold text-white/80">REST API</span>
        <span className="ml-auto text-[8px] text-white/40">webhooks · SSO</span>
      </div>
      {lines.map((l) => (
        <p key={l.t} className={`text-[9px] leading-tight ${l.c}`}>
          {l.t}
        </p>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Pillar blocks data
─────────────────────────────────────────────────────────────── */

const pillarBlocks = [
  {
    key: "ai",
    eyebrow: "Pillar 01",
    Icon: Bot,
    title: "Agentic AI agents and a copilot",
    body: "A no-code agent that answers and acts — it looks up orders, changes shipping, issues eligible refunds, and books appointments, all inside the guardrails you set. When a human is needed, a copilot drafts replies and surfaces the right knowledge so your team moves twice as fast.",
    bullets: [
      "Resolves multi-step tasks, not just FAQs",
      "Grounded in your help center, PDFs, and site",
      "Escalates in-thread with full context",
      "Voice agents answer and deflect calls too",
    ],
    visual: <AgenticVisual />,
    links: [
      { to: "/agentic-ai", label: "How agentic AI works" },
      { to: "/ai-agents", label: "Meet the agents" },
      { to: "/voice-ai-agents", label: "Voice AI agents" },
    ],
    reverse: false,
  },
  {
    key: "inbox",
    eyebrow: "Pillar 02",
    Icon: Inbox,
    title: "One omnichannel inbox for the whole team",
    body: "Every channel, every conversation, and the full customer history in a single shared view. Routing, SLAs, macros, private notes, and CSAT live where your team already works — and the AI shares that same inbox, so nothing falls through the cracks between bot and human.",
    bullets: [
      "WhatsApp, SMS, email, voice, web, IG, Messenger",
      "Routing, SLAs, macros, and CSAT built in",
      "A copilot that drafts and suggests in real time",
      "One record follows the customer everywhere",
    ],
    visual: <InboxVisual />,
    links: [
      { to: "/products/omnichannel-inbox", label: "Explore the inbox" },
      { to: "/products/agent-copilot", label: "See the agent copilot" },
      { to: "/channels/whatsapp", label: "WhatsApp channel" },
    ],
    reverse: true,
  },
  {
    key: "broadcast",
    eyebrow: "Pillar 03",
    Icon: Megaphone,
    title: "Broadcasting on SMS, WhatsApp, and RCS",
    body: "Launch A2P SMS, WhatsApp, and RCS campaigns from the same dashboard that runs your support. Segment your audience, personalize at scale, and see delivery and replies land right back in the shared inbox — because a broadcast should start a conversation, not end one.",
    bullets: [
      "A2P SMS, WhatsApp, and RCS in one place",
      "Segment and personalize at scale",
      "Replies flow straight into the inbox",
      "Carrier plumbing and numbers included",
    ],
    visual: <BroadcastVisual />,
    links: [
      { to: "/numbers/did", label: "Get numbers (DID)" },
      { to: "/channels/whatsapp", label: "WhatsApp broadcasts" },
    ],
    reverse: false,
  },
  {
    key: "dev",
    eyebrow: "Pillar 04",
    Icon: Code2,
    title: "Developer tools to make it yours",
    body: "A clean REST API, real-time webhooks, a white-label UI, SSO and SAML, and audit logs. Build FloatChat into your product, sync it with your stack, and ship on your own terms — no waiting on a roadmap. Everything the no-code side does is a documented endpoint away.",
    bullets: [
      "REST API and real-time webhooks",
      "White-label UI for your brand",
      "SSO, SAML, and role-based access",
      "Audit logs for every action",
    ],
    visual: <DeveloperVisual />,
    links: [
      { to: "/integrations", label: "Browse integrations" },
      { to: "/contact", label: "Talk to our team" },
    ],
    reverse: true,
  },
]

/* ─────────────────────────────────────────────────────────────
   Developer capability tiles
─────────────────────────────────────────────────────────────── */

const devTiles = [
  { Icon: Code2, title: "REST API", body: "Send messages, manage contacts, and drive agents from your own code." },
  { Icon: Webhook, title: "Webhooks", body: "Real-time events push to your stack the moment something happens." },
  { Icon: Boxes, title: "White-label UI", body: "Ship the inbox and widget under your own brand and domain." },
  { Icon: Key, title: "SSO & SAML", body: "Enterprise sign-on with the identity provider you already use." },
  { Icon: FileText, title: "Audit logs", body: "A complete, exportable trail of every action across the platform." },
  { Icon: Plug, title: "200+ integrations", body: "Connect the tools you already run — CRMs, commerce, and more." },
]

/* ─────────────────────────────────────────────────────────────
   Security teaser tiles
─────────────────────────────────────────────────────────────── */

const securityTiles = [
  { Icon: Lock, title: "Encrypted in transit & at rest" },
  { Icon: Fingerprint, title: "SSO, SAML & granular roles" },
  { Icon: FileText, title: "Audit logs on every action" },
  { Icon: ShieldCheck, title: "GDPR & CCPA-aligned handling" },
]

/* ─────────────────────────────────────────────────────────────
   Integration logos for the teaser
─────────────────────────────────────────────────────────────── */

const integrationChips = [
  { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
  { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
  { Icon: SiMessenger, bg: "#0084FF", label: "Messenger" },
  { Icon: SiGmail, bg: "#EA4335", label: "Email" },
] as const

/* ─────────────────────────────────────────────────────────────
   FAQs + Product schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is FloatChat really one platform, or several products bolted together?",
    answer:
      "One platform. The agentic AI agents, the omnichannel inbox, broadcasting, and the developer tools are a single product with one login, one bill, and — most importantly — one customer record that follows every conversation, call, and campaign. You're not stitching four vendors together with integrations; it's the same system end to end.",
  },
  {
    question: "Do I need a developer to use it?",
    answer:
      "No. Everything the platform does can be configured with no code — connect your channels, point the AI at your knowledge base, build campaigns, and manage the shared inbox from the dashboard. A full REST API, webhooks, white-label UI, and SSO are there when your team wants to build deeper, but they're optional, not required.",
  },
  {
    question: "How many channels and what kind of broadcasting does it cover?",
    answer:
      "Agentic AI runs across seven channels — WhatsApp, SMS, email, voice, web chat, Instagram, and Messenger — from one shared inbox. Broadcasting covers A2P SMS, WhatsApp, and RCS campaigns from the same dashboard, and because it's one platform, replies to a broadcast land right back in that inbox for your team or the AI to pick up.",
  },
  {
    question: "Is it secure and enterprise-ready?",
    answer:
      "Yes. FloatChat ships with SSO and SAML, role-based access, audit logs on every action, encryption in transit and at rest, and GDPR/CCPA-aligned data handling, with SOC 2 on the roadmap. You can dig into the details on our security page.",
  },
  {
    question: "What can I replace by moving to FloatChat?",
    answer:
      "Most teams consolidate a chatbot vendor, a shared-inbox or helpdesk tool, an SMS/WhatsApp campaign tool, and a separate voice or carrier setup into this one platform. That means one contract instead of four, and — because everything shares a customer record — no more reconciling four disconnected views of the same person.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Days, not months. Connect your channels, point the AI at your help center and docs, and you're deflecting real conversations in the first week. There are no pre-built journeys to map, and the broadcasting and developer tools are ready the moment you are — nothing to procure separately.",
  },
]

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FloatChat Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "One platform for agentic AI agents, an omnichannel inbox, broadcasting, and developer tools. Everything your customer experience needs in one product.",
  url: "https://www.floatchat.com/platform",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Start free — no per-resolution fees.",
  },
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function PlatformPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={productSchema} />

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
                  <Layers className="h-3.5 w-3.5" />
                  The FloatChat Platform · four products, one system
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  One platform for agentic AI, channels, and{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    broadcasting.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  The agentic AI agent, the omnichannel inbox, the campaigns, and
                  the developer tools in a single product — sharing one customer
                  record so your team and your AI always have the full picture.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Agentic AI across 7 channels",
                    "Broadcasting on SMS, WhatsApp, RCS",
                    "200+ integrations",
                    "Enterprise security built in",
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
                  Replace four vendors with one platform.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <PlatformDiagram />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / SCALE STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Globe, value: "7", label: "channels, one shared inbox" },
                { Icon: Megaphone, value: "3", label: "broadcast rails: SMS, WhatsApp, RCS" },
                { Icon: Plug, value: "200+", label: "integrations, ready to connect" },
                { Icon: ShieldCheck, value: "Enterprise", label: "security built in from day one" },
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
                  Buying customer experience in pieces breaks the customer.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A chatbot from one vendor. A shared inbox from another. An
                    SMS tool for campaigns. A carrier for voice. Four bills, four
                    logins, and four half-views of the same person.
                  </p>
                  <p>
                    So the AI doesn&apos;t know what your team said yesterday, the
                    campaign tool doesn&apos;t see the open support ticket, and the
                    customer repeats themselves at every seam. The integrations
                    that are supposed to fix this quietly drift out of sync.
                  </p>
                  <p>
                    FloatChat unifies the{" "}
                    <span className="font-semibold text-[#0F2A4A]">AI</span>, the{" "}
                    <span className="font-semibold text-[#0F2A4A]">channels</span>,
                    the{" "}
                    <span className="font-semibold text-[#0F2A4A]">campaigns</span>,
                    and the{" "}
                    <span className="font-semibold text-[#0F2A4A]">team</span> in
                    one place, around one record.
                  </p>
                </div>
              </BlurFade>

              {/* four-vendors vs one-platform contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Four vendors
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Four bills, four logins, four roadmaps",
                        "No single view of the customer",
                        "Integrations that drift out of sync",
                        "Customer repeats themselves at every seam",
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
                      One platform
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "One bill, one login, one roadmap",
                        "One customer record across everything",
                        "AI, inbox, and campaigns share state",
                        "The customer is never asked twice",
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

        {/* ───── THE FOUR PILLARS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <BlurFade>
                <SectionEyebrow num="02" label="What's inside" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Four products. One product.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Agentic AI, an omnichannel inbox, broadcasting, and developer
                  tools — each strong on its own, unbeatable together because they
                  share the same customer record.
                </p>
              </BlurFade>
            </div>

            <div className="space-y-8 lg:space-y-10">
              {pillarBlocks.map((p, idx) => (
                <BlurFade key={p.key} delay={0.05 + idx * 0.05}>
                  <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/40 p-6 lg:p-9 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.22)] transition-all duration-300">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                        p.reverse ? "" : ""
                      }`}
                    >
                      {/* Text side */}
                      <div
                        className={`lg:col-span-7 ${
                          p.reverse ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[11px] font-mono text-slate-400">
                            / {p.eyebrow}
                          </span>
                          <span className="h-px w-6 bg-slate-300" />
                        </div>
                        <div className="flex items-start gap-3.5">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                            <p.Icon className="h-6 w-6 text-white" strokeWidth={2.25} />
                          </div>
                          <div>
                            <h3 className="text-xl lg:text-2xl font-semibold text-[#0F2A4A] leading-tight">
                              {p.title}
                            </h3>
                          </div>
                        </div>
                        <p className="mt-4 text-[15px] text-slate-500 leading-relaxed max-w-2xl">
                          {p.body}
                        </p>
                        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {p.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-[13.5px] text-[#0F2A4A]"
                            >
                              <Check
                                className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                                strokeWidth={3}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                          {p.links.map((l) => (
                            <Link
                              key={l.to}
                              to={l.to}
                              className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                            >
                              {l.label}
                              <ArrowRight className="h-3.5 w-3.5 text-[#1D4ED8] group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Visual side */}
                      <div
                        className={`lg:col-span-5 ${
                          p.reverse ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <div className="relative">
                          <div
                            aria-hidden="true"
                            className="absolute -inset-4 -z-10 rounded-3xl blur-2xl opacity-50"
                            style={{
                              background:
                                "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
                            }}
                          />
                          {p.visual}
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── HOW IT FITS TOGETHER ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it fits together" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One record. Every conversation, call, and campaign.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The reason four products behave like one: they all read and
                  write the same customer record — so context never has to be
                  re-created at a handoff.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Inbox, title: "A message arrives", note: "any of 7 channels" },
                    { Icon: Bot, title: "The agent resolves", note: "grounded in your data" },
                    { Icon: Users, title: "A human steps in", note: "with full context, in-thread" },
                    { Icon: Megaphone, title: "A campaign follows up", note: "reply lands back in inbox" },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-slate-50/60 border border-slate-200 px-4 py-3 w-full">
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

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#0F2A4A] to-[#1D4ED8] p-6 lg:p-7 text-white relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <ArrowLeftRight className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-lg lg:text-xl font-medium leading-snug max-w-3xl">
                      The same platform handles the AI brain and the carrier
                      plumbing — so you launch faster, pay less, and manage one
                      tool instead of five.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── DEVELOPER TOOLS / API ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Developer tools" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  No-code by default. Fully programmable when you want it.
                </h2>
                <p className="mt-5 text-base text-slate-500 leading-relaxed max-w-xl">
                  Everything the dashboard does is a documented endpoint away.
                  Build FloatChat into your product, sync it with your stack, and
                  ship on your own terms — no waiting on a roadmap.
                </p>
                <div className="mt-6">
                  <DeveloperVisual />
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Link
                    to="/integrations"
                    className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] px-5 py-2.5 text-[13.5px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] transition-all"
                  >
                    Browse integrations
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[13.5px] font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to our team
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.12} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {devTiles.map((t) => (
                    <div
                      key={t.title}
                      className="rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-slate-300 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.25)] transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-3.5">
                        <t.Icon className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2.25} />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#0F2A4A]">
                        {t.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                        {t.body}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── SECURITY TEASER ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 lg:p-12 text-white shadow-[0_30px_70px_-30px_rgba(29,78,216,0.55)]">
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-white/90 mb-5">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Security & compliance
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.08]">
                      Enterprise security, built into the platform.
                    </h2>
                    <p className="mt-4 text-white/80 leading-relaxed max-w-xl">
                      Not an add-on. SSO and SAML, role-based access, audit logs
                      on every action, encryption in transit and at rest, and
                      GDPR/CCPA-aligned handling — with SOC 2 on the roadmap.
                    </p>
                    <Link
                      to="/platform/security"
                      className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-medium text-[#0F2A4A] hover:bg-slate-100 transition-colors"
                    >
                      Explore platform security
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                  <div className="lg:col-span-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {securityTiles.map((t) => (
                        <div
                          key={t.title}
                          className="flex items-center gap-3 rounded-2xl bg-white/10 border border-white/15 px-4 py-3.5 backdrop-blur-sm"
                        >
                          <div className="h-9 w-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                            <t.Icon className="h-[18px] w-[18px] text-white" />
                          </div>
                          <span className="text-[13px] font-medium text-white leading-snug">
                            {t.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INTEGRATIONS TEASER ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="05" label="Integrations" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Plugs into the stack you already run.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  Connect your CRM, commerce platform, and helpdesk so the AI and
                  the inbox act on live data — orders, tickets, and customer
                  profiles included. Over 200 integrations, plus a REST API for
                  anything not on the list.
                </p>
                <Link
                  to="/integrations"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] px-6 py-3 text-[14px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] transition-all"
                >
                  See all integrations
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </BlurFade>

              <BlurFade delay={0.12} className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-[12px] font-semibold text-[#0F2A4A]">
                      Channels & tools, connected
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white border border-[#3B82F6]/20 px-2 py-0.5 text-[10px] font-medium text-[#1D4ED8]">
                      <Plug className="h-2.5 w-2.5" /> 200+
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {integrationChips.map((c) => (
                      <div
                        key={c.label}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3"
                      >
                        <span
                          className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5"
                          style={{ background: c.bg }}
                        >
                          <c.Icon style={{ color: "#fff", width: 18, height: 18 }} />
                        </span>
                        <span className="text-[10px] font-medium text-[#0F2A4A] truncate w-full text-center">
                          {c.label}
                        </span>
                      </div>
                    ))}
                    {[
                      { Icon: MessageSquare, label: "SMS", bg: "#0F2A4A" },
                      { Icon: Phone, label: "Voice", bg: "#1D4ED8" },
                      { Icon: MessageCircle, label: "Web chat", bg: "#3B82F6" },
                      { Icon: Plug, label: "200+ more", bg: "#60A5FA" },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3"
                      >
                        <span
                          className="h-10 w-10 rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5"
                          style={{ background: c.bg }}
                        >
                          <c.Icon className="h-[18px] w-[18px] text-white" />
                        </span>
                        <span className="text-[10px] font-medium text-[#0F2A4A] truncate w-full text-center">
                          {c.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Run your customer experience from one platform."
          body="Agentic AI, an omnichannel inbox, broadcasting, and developer tools — go live in days, no per-resolution fees."
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
              title="Common questions"
              description="Straight answers about the platform, security, and going live."
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
                    to="/pricing"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    plans and pricing
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 35%, rgba(191,219,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #60A5FA 60%, #3B82F6 80%, transparent)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Four products, one platform, live right now
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
                  No per-resolution fees
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Run everything from{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  one platform.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Agentic AI, an omnichannel inbox, broadcasting, and developer
                tools — sharing one customer record, so your team and your AI
                always have the full picture.
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
                "Agentic AI across 7 channels",
                "SMS · WhatsApp · RCS broadcasting",
                "200+ integrations",
                "Enterprise security built in",
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
