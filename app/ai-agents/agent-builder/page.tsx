"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Wand2,
  Workflow,
  GitBranch,
  Rocket,
  Code2,
  Database,
  Plug,
  Play,
  MousePointerClick,
  Boxes,
  Check,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Globe,
  Phone,
  Instagram,
  Send,
  FileText,
  ShoppingBag,
  Clock,
  Webhook,
  Eye,
  Layers,
  Zap,
  Headphones,
  TrendingUp,
  CalendarCheck,
  Filter,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "No-Code Agentic AI Agent Builder | FloatChat",
  description:
    "Create, train, and launch agentic AI agents without code. Ground them in your data, add logic and handoff, and deploy across every channel.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow — FloatChat blue accent
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-blue-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO MOCKUP — the signature visual: a no-code flow builder canvas.
   Absolutely-positioned node boxes + SVG connector lines, a side panel,
   a Deploy button and a "Live on 3 channels" chip.
─────────────────────────────────────────────────────────────── */

type BuilderNode = {
  id: string
  left: string
  top: string
  Icon: React.ComponentType<{ className?: string }>
  type: string
  title: string
  subtitle: string
  accent: string
  highlighted?: boolean
  muted?: boolean
}

const BUILDER_NODES: BuilderNode[] = [
  {
    id: "trigger",
    left: "21%",
    top: "16%",
    Icon: MessageSquare,
    type: "Trigger",
    title: "New conversation",
    subtitle: "Any channel",
    accent: "#1D4ED8",
  },
  {
    id: "intent",
    left: "21%",
    top: "48%",
    Icon: Filter,
    type: "Intent check",
    title: "Classify request",
    subtitle: "support · sales · other",
    accent: "#1E40AF",
  },
  {
    id: "knowledge",
    left: "55%",
    top: "32%",
    Icon: Database,
    type: "Knowledge",
    title: "Look up answer",
    subtitle: "Help center · PDFs",
    accent: "#1D4ED8",
    highlighted: true,
  },
  {
    id: "branch",
    left: "55%",
    top: "70%",
    Icon: GitBranch,
    type: "Condition",
    title: "Confident answer?",
    subtitle: "score ≥ 0.7",
    accent: "#1E40AF",
  },
  {
    id: "handoff",
    left: "85%",
    top: "70%",
    Icon: Headphones,
    type: "Handoff",
    title: "Route to human",
    subtitle: "Round-robin · team",
    accent: "#475569",
    muted: true,
  },
]

function BuilderNodeCard({ node }: { node: BuilderNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{ left: node.left, top: node.top }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-[140px] rounded-xl border bg-white px-2.5 py-2 shadow-[0_10px_25px_-12px_rgba(29,78,216,0.35)] ${
        node.highlighted
          ? "ring-2 ring-blue-400/50 border-blue-200"
          : node.muted
          ? "border-slate-200 opacity-75"
          : "border-slate-200"
      }`}
    >
      {/* Ports */}
      <span
        className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full ring-2 ring-white"
        style={{ background: node.accent }}
      />
      <span
        className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full ring-2 ring-white"
        style={{ background: node.accent }}
      />
      <div className="flex items-center gap-1.5 mb-1">
        <node.Icon
          className="h-3 w-3"
          {...({ style: { color: node.accent } } as Record<string, unknown>)}
        />
        <span
          className="text-[8.5px] font-semibold uppercase tracking-wider"
          style={{ color: node.accent }}
        >
          {node.type}
        </span>
      </div>
      <p className="text-[10.5px] font-semibold text-[#0F2A4A] leading-tight">
        {node.title}
      </p>
      <p className="text-[9px] text-slate-500 mt-0.5 truncate">{node.subtitle}</p>
    </motion.div>
  )
}

function FlowBuilderMockup() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.4), transparent 70%)",
        }}
      />

      {/* Floating "Live on 3 channels" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(29,78,216,0.25)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Live on <span className="text-[#1D4ED8]">3 channels</span>
        </span>
      </motion.div>

      {/* Floating "No code" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(29,78,216,0.25)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <MousePointerClick className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Built without <span className="text-[#1D4ED8]">code</span>
        </span>
      </motion.div>

      {/* Builder window */}
      <div className="relative w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(8,42,74,0.4)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            builder · support-agent
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
            <Rocket className="h-3 w-3" />
            Deploy
          </span>
        </div>

        <div className="grid grid-cols-12">
          {/* Canvas */}
          <div
            className="col-span-12 md:col-span-9 relative h-[400px] sm:h-[460px] overflow-hidden border-b md:border-b-0 md:border-r border-slate-200"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(29,78,216,0.1) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              backgroundColor: "#FAFBFF",
            }}
          >
            {/* Connector edges */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="builder-edge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>

              {/* Trigger -> Intent (vertical) */}
              <motion.path
                d="M 21 24 C 21 34, 21 38, 21 46"
                fill="none"
                stroke="url(#builder-edge)"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              {/* Intent -> Knowledge */}
              <motion.path
                d="M 28 48 C 42 48, 42 33, 49 33"
                fill="none"
                stroke="url(#builder-edge)"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.3,
                }}
              />
              {/* Knowledge -> Branch */}
              <motion.path
                d="M 55 39 C 55 54, 55 60, 55 67"
                fill="none"
                stroke="url(#builder-edge)"
                strokeWidth="2"
                strokeDasharray="3 2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                animate={{ strokeDashoffset: [0, -10] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.6,
                }}
              />
              {/* Branch -> Handoff (false path, muted) */}
              <path
                d="M 62 70 C 72 70, 74 70, 79 70"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeDasharray="2 3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Branch labels */}
            <span
              className="absolute text-[9px] font-mono font-semibold text-[#1D4ED8] pointer-events-none"
              style={{ left: "57%", top: "53%" }}
            >
              yes → reply
            </span>
            <span
              className="absolute text-[9px] font-mono font-semibold text-slate-400 pointer-events-none"
              style={{ left: "70%", top: "63%" }}
            >
              no
            </span>

            {/* Nodes */}
            {BUILDER_NODES.map((node) => (
              <BuilderNodeCard key={node.id} node={node} />
            ))}
          </div>

          {/* Right inspector / step library panel */}
          <aside className="col-span-12 md:col-span-3 bg-slate-50/60 px-3 py-3">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Add a step
            </p>
            <div className="space-y-1.5">
              {[
                { Icon: Filter, label: "Condition" },
                { Icon: Clock, label: "Delay" },
                { Icon: Database, label: "Knowledge" },
                { Icon: Webhook, label: "Webhook" },
                { Icon: Headphones, label: "Handoff" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 hover:border-blue-300 transition-colors"
                >
                  <s.Icon className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-medium text-[#0F2A4A]">
                    {s.label}
                  </span>
                  <span className="ml-auto text-slate-300 text-[12px] leading-none">
                    +
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-blue-200 bg-white px-2.5 py-2">
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
                <p className="text-[9px] uppercase tracking-wider text-[#1D4ED8] font-semibold">
                  Preview
                </p>
              </div>
              <p className="text-[9.5px] text-slate-500 leading-snug">
                Test the flow before you ship — no deploy required.
              </p>
            </div>
          </aside>
        </div>

        {/* Bottom toolbar */}
        <div className="px-3 py-2 border-t border-slate-200 bg-white flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-500">5 steps</span>
          <span className="text-slate-300">·</span>
          <span className="text-[10px] text-slate-500">
            Trigger → Intent → Knowledge → Branch → Handoff
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-blue-50 text-[#1D4ED8] px-2 py-0.5 text-[10px] font-semibold">
            <Eye className="h-2.5 w-2.5" />
            Auto-saved
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOW IT WORKS — per-step visuals
─────────────────────────────────────────────────────────────── */

function TrainVisual() {
  const sources = [
    { Icon: FileText, label: "Help center", count: "184 articles" },
    { Icon: FileText, label: "Product PDFs", count: "32 docs" },
    { Icon: ShoppingBag, label: "Catalog", count: "1,240 SKUs" },
    { Icon: Globe, label: "Website", count: "crawled" },
  ]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          Data sources
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1D4ED8]">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          Synced
        </span>
      </div>
      <div className="space-y-2">
        {sources.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2"
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
              <s.Icon className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[12px] font-medium text-[#0F2A4A]">
              {s.label}
            </span>
            <span className="ml-auto text-[10px] text-slate-500">{s.count}</span>
            <Check className="h-3.5 w-3.5 text-blue-600" strokeWidth={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

function LogicVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Workflow className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          Flow logic
        </span>
      </div>
      {[
        { Icon: Filter, label: "If intent is", value: "refund", tone: "blue" },
        { Icon: Clock, label: "Wait", value: "2 minutes", tone: "slate" },
        { Icon: GitBranch, label: "If unresolved", value: "branch", tone: "blue" },
        { Icon: Headphones, label: "Else", value: "hand off to agent", tone: "amber" },
      ].map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2"
        >
          <r.Icon
            className={`h-3.5 w-3.5 shrink-0 ${
              r.tone === "amber" ? "text-amber-600" : "text-[#1D4ED8]"
            }`}
          />
          <span className="text-[11.5px] text-slate-500">{r.label}</span>
          <span
            className={`ml-auto rounded-md px-2 py-0.5 text-[10.5px] font-semibold ${
              r.tone === "amber"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : r.tone === "slate"
                ? "bg-slate-100 text-slate-600"
                : "bg-blue-50 text-[#1D4ED8] border border-blue-200"
            }`}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function LaunchVisual() {
  const channels = [
    { Icon: MessageSquare, label: "WhatsApp", on: true },
    { Icon: Globe, label: "Web", on: true },
    { Icon: Send, label: "SMS", on: true },
    { Icon: Phone, label: "Voice", on: false },
    { Icon: Instagram, label: "Instagram", on: false },
  ]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
          Deploy to channels
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] px-2 py-0.5 text-[10px] font-semibold text-white">
          <Rocket className="h-2.5 w-2.5" />
          Live
        </span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {channels.map((c) => (
          <div
            key={c.label}
            className={`flex flex-col items-center gap-1 rounded-lg border px-1 py-2 ${
              c.on
                ? "border-blue-200 bg-blue-50/60"
                : "border-slate-200 bg-slate-50/40 opacity-60"
            }`}
          >
            <c.Icon
              className={`h-4 w-4 ${c.on ? "text-[#1D4ED8]" : "text-slate-400"}`}
            />
            <span
              className={`text-[8.5px] font-medium ${
                c.on ? "text-[#0F2A4A]" : "text-slate-400"
              }`}
            >
              {c.label}
            </span>
            <span
              className={`h-1 w-1 rounded-full ${
                c.on ? "bg-blue-500" : "bg-slate-300"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50/60 border border-slate-200 px-3 py-2">
        <Play className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[10.5px] text-slate-500">
          Preview, then flip live in a click — no redeploy.
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Static data
─────────────────────────────────────────────────────────────── */

const STATS = [
  { Icon: MousePointerClick, value: "No-code", label: "Point & click, drag to connect" },
  { Icon: Database, value: "Your data", label: "Trained on your business" },
  { Icon: GitBranch, value: "Logic", label: "Branching, delays & handoff" },
  { Icon: Rocket, value: "Every channel", label: "Deploys in clicks" },
]

const HOW_STEPS = [
  {
    num: "01",
    eyebrow: "Train",
    Icon: Database,
    title: "Train it on your data.",
    body:
      "Connect your help center, product PDFs, catalog, and website. FloatChat reads and indexes everything, so your agent answers from your business — not a generic model. Add or remove a source and the agent re-grounds automatically, no retraining cycle and no engineering ticket.",
    points: [
      "Help center, PDFs, catalog & website",
      "Re-grounds the moment you add a source",
      "Cited answers your team can trust",
    ],
    visual: <TrainVisual />,
  },
  {
    num: "02",
    eyebrow: "Build",
    Icon: Workflow,
    title: "Add logic and guardrails.",
    body:
      "Drag triggers, conditions, branches, delays, and human-handoff steps onto a visual canvas. Decide exactly when the agent answers on its own, when it asks for more, and when it routes to a person. Guardrails keep it on-script for the moments that matter — refunds, escalations, compliance.",
    points: [
      "Triggers, conditions & branching",
      "Delays and multi-step sequences",
      "Human-handoff with routing rules",
    ],
    visual: <LogicVisual />,
  },
  {
    num: "03",
    eyebrow: "Launch",
    Icon: Rocket,
    title: "Test, then launch everywhere.",
    body:
      "Preview the full flow in the builder, watch it reason through real questions, and tweak until it feels right. When it does, deploy to WhatsApp, web, SMS, voice, and social in clicks. The same agent runs on every channel and shares one inbox, so nothing falls through the cracks.",
    points: [
      "Live preview before you ship",
      "Deploy to every channel in clicks",
      "One inbox across all surfaces",
    ],
    visual: <LaunchVisual />,
  },
]

const CAPABILITIES = [
  {
    Icon: Filter,
    title: "Triggers & conditions",
    body:
      "Fire steps on a new message, an intent, a keyword, or a customer attribute. Branch the flow on anything you can read.",
  },
  {
    Icon: Clock,
    title: "Branching & delays",
    body:
      "Split into parallel paths, wait for a reply, or pause between steps to pace a follow-up sequence naturally.",
  },
  {
    Icon: Database,
    title: "Knowledge grounding",
    body:
      "Drop a knowledge-lookup step anywhere so the agent answers from your docs, catalog, and help center with citations.",
  },
  {
    Icon: Webhook,
    title: "API & webhook steps",
    body:
      "Call your own endpoints mid-flow to check an order, create a ticket, or trigger a downstream automation.",
  },
  {
    Icon: Headphones,
    title: "Human handoff",
    body:
      "Route to the right team with round-robin or skills-based rules, passing the full context along so no one repeats themselves.",
  },
  {
    Icon: Eye,
    title: "Preview & test",
    body:
      "Run the agent against real questions inside the builder, inspect every step, and ship only when you are happy.",
  },
]

const DEPLOY_CHANNELS = [
  { Icon: MessageSquare, label: "WhatsApp", tint: "#25D366" },
  { Icon: Globe, label: "Web", tint: "#1D4ED8" },
  { Icon: Send, label: "SMS", tint: "#1E40AF" },
  { Icon: Phone, label: "Voice", tint: "#2563EB" },
  { Icon: Instagram, label: "Instagram", tint: "#E1306C" },
  { Icon: Send, label: "Messenger", tint: "#0084FF" },
]

const AGENT_LINKS = [
  {
    href: "/ai-agents/customer-service",
    Icon: Headphones,
    title: "Customer Service Agent",
    body: "Resolve tickets, answer FAQs, and escalate cleanly.",
  },
  {
    href: "/ai-agents/sales",
    Icon: TrendingUp,
    title: "Sales Agent",
    body: "Recommend, answer objections, and move buyers forward.",
  },
  {
    href: "/ai-agents/booking",
    Icon: CalendarCheck,
    title: "Booking Agent",
    body: "Capture intent and book appointments around the clock.",
  },
  {
    href: "/ai-agents/lead-qualification",
    Icon: Filter,
    title: "Lead Qualification Agent",
    body: "Score, qualify, and route inbound leads to the right rep.",
  },
]

const faqs: FAQItem[] = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. The agent builder is fully no-code — you train it on your data, drag in logic and handoff steps, preview, and deploy without touching a line of code. A REST API and webhooks are there when you want them, but they are entirely optional.",
  },
  {
    question: "Can the agent actually take actions, not just chat?",
    answer:
      "Yes. Add API and webhook steps to make it agentic: check an order, create a ticket, update a record, or trigger a downstream automation as part of a multi-step flow. The builder scales from a simple FAQ bot to a full agentic workflow.",
  },
  {
    question: "What can I train it on?",
    answer:
      "Connect your help center, product PDFs, catalog, and website. FloatChat indexes the content so the agent answers from your business, with citations. Add or remove a source any time and the agent re-grounds automatically.",
  },
  {
    question: "Which channels can I deploy to?",
    answer:
      "The same agent deploys to WhatsApp, web chat, SMS, voice, Instagram, and Messenger. It shares one inbox across every channel, so conversations and context stay in one place.",
  },
  {
    question: "How fast can I launch?",
    answer:
      "Most teams go from idea to a live agent in days, not weeks — no engineering sprint required. Because the people who own the customer experience build it directly, it also improves fast after launch.",
  },
  {
    question: "What's the difference between the builder and a use-case agent?",
    answer:
      "The agent builder is the tool. The use-case agents — customer service, sales, booking, lead qualification — are starting points you can build, customize, and ship from it, all sharing the same inbox, data, and guardrails.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FloatChat Agent Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.floatchat.com/ai-agents/agent-builder",
  description:
    "A no-code, visual builder to create, train, and launch agentic AI agents. Ground them in your data, add logic and handoff, and deploy across every channel.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
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

export default function AgentBuilderPage() {
  usePageMeta({
    title: "No-Code Agentic AI Agent Builder | FloatChat",
    description:
      "Create, train, and launch agentic AI agents without code. Ground them in your data, add logic and handoff, and deploy across every channel.",
  })

  return (
    <>
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />
      <Header />
      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F5F7FF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-55"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(29,78,216,0.1) 1px, transparent 1px)",
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-300/50 bg-blue-50 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  No-code agent builder
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Build your agentic AI agent{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                    without code.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  A visual, no-code builder to create, train, and launch agentic
                  AI agents across every channel. Ground them in your data, add
                  logic and handoff, and ship in days.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Fully no-code",
                    "Trained on your data",
                    "Logic & handoff",
                    "Every channel",
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
                          "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
                      }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Build Your AI Agent
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
                  From idea to live agent in days, no developers required.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <FlowBuilderMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-slate-200 lg:divide-y-0">
              {STATS.map((s, i) => (
                <BlurFade key={s.value} delay={i * 0.06}>
                  <div className="flex items-start gap-3 px-2 py-8 lg:px-6">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                      <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-slate-500 leading-snug">
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
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Most teams wait{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                    weeks on engineering
                  </span>{" "}
                  to launch a real AI agent.
                </h2>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="space-y-5 text-[15px] lg:text-base text-slate-500 leading-relaxed">
                  <p>
                    Launching a genuinely useful AI agent usually means filing a
                    ticket and joining a queue. The roadmap is full, the sprint
                    is booked, and the people who actually know your customers —
                    support leads, sales managers, ops — are stuck waiting for
                    developer time they do not control.
                  </p>
                  <p>
                    By the time the work ships, the requirements have moved on.
                    Every tweak to a prompt, a flow, or a handoff rule becomes
                    another ticket, another review, another week. The backlog
                    grows, momentum dies, and the agent never gets the rapid
                    iteration it needs to actually get good.
                  </p>
                  <p>
                    FloatChat puts the builder in the hands of the people who own
                    the customer experience. They train the agent on your data,
                    shape its logic, and ship it themselves — then keep refining
                    it daily, with no engineering sprint standing in the way.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      Icon: Layers,
                      bad: "Before",
                      text: "Backlog of agent requests, weeks of waiting.",
                    },
                    {
                      Icon: Zap,
                      bad: "After",
                      text: "Owners build and refine the agent directly.",
                    },
                  ].map((c) => (
                    <div
                      key={c.bad}
                      className="rounded-2xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <c.Icon className="h-4 w-4 text-[#1D4ED8]" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1D4ED8]">
                          {c.bad}
                        </span>
                      </div>
                      <p className="text-[13.5px] text-slate-600 leading-snug">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS (centerpiece) ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(29,78,216,0.08) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <BlurFade>
                <SectionEyebrow num="02" label="How it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From blank canvas to live agent in three moves.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Train it, shape its logic, and launch it — all in one visual,
                  no-code builder.
                </p>
              </BlurFade>
            </div>

            <div className="space-y-16 lg:space-y-24">
              {HOW_STEPS.map((step, i) => {
                const flip = i % 2 === 1
                return (
                  <BlurFade key={step.num} delay={0.05}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                      <div
                        className={`lg:col-span-6 ${
                          flip ? "lg:order-2" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-5xl lg:text-6xl font-semibold tracking-tight bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                            {step.num}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                            <step.Icon className="h-3.5 w-3.5" />
                            {step.eyebrow}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-4 text-[15px] text-slate-500 leading-relaxed">
                          {step.body}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {step.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5">
                              <span className="mt-0.5 h-5 w-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                                <Check
                                  className="h-3 w-3 text-[#1D4ED8]"
                                  strokeWidth={3}
                                />
                              </span>
                              <span className="text-[14px] text-slate-600">
                                {p}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        className={`lg:col-span-6 ${
                          flip ? "lg:order-1" : ""
                        }`}
                      >
                        <div className="relative">
                          <div
                            aria-hidden="true"
                            className="absolute -inset-4 -z-10 rounded-3xl blur-2xl opacity-40"
                            style={{
                              background:
                                "radial-gradient(closest-side, rgba(59,130,246,0.35), transparent 70%)",
                            }}
                          />
                          {step.visual}
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───── BUILDER CAPABILITIES ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] via-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="In the builder" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything you need to drag in.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Composable steps that turn a simple bot into a full agentic
                  workflow.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c, i) => (
                <BlurFade key={c.title} delay={0.05 + i * 0.06} className="h-full">
                  <div className="group h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-blue-200 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.3)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-500/30 mb-4">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── DEPLOY ANYWHERE ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Deploy anywhere" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent, every channel.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Build once, then turn the agent on wherever your customers
                  already are. Same flow, same data, same inbox.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {DEPLOY_CHANNELS.map((c) => (
                  <div
                    key={c.label}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 flex flex-col items-center gap-3 hover:border-blue-200 hover:shadow-[0_15px_30px_-15px_rgba(29,78,216,0.3)] transition-all duration-300"
                  >
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center ring-1 ring-black/5"
                      style={{ background: `${c.tint}1A` }}
                    >
                      <c.Icon
                        className="h-6 w-6"
                        {...({ style: { color: c.tint } } as Record<string, unknown>)}
                      />
                    </div>
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── GO DEEPER / API ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] via-[#1E3A8A] to-[#1D4ED8] p-8 sm:p-12 lg:p-16 shadow-[0_30px_70px_-30px_rgba(29,78,216,0.6)]">
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-300/10 blur-3xl"
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium text-blue-100 mb-5">
                      <Code2 className="h-3.5 w-3.5" />
                      Go deeper
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white leading-[1.1]">
                      No-code by default. An API when you want it.
                    </h2>
                    <p className="mt-5 text-[15px] text-blue-50/80 leading-relaxed">
                      A REST API and webhooks are there for custom steps and
                      integrations, so the builder scales from a simple bot to a
                      full agentic workflow. Call your own services mid-flow,
                      push events to your stack, and wire the agent into the
                      tools you already run.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {[
                        { Icon: Plug, label: "REST API" },
                        { Icon: Webhook, label: "Webhooks" },
                        { Icon: Boxes, label: "Custom steps" },
                      ].map((t) => (
                        <span
                          key={t.label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-blue-50"
                        >
                          <t.Icon className="h-3.5 w-3.5 text-blue-300" />
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="rounded-2xl border border-white/10 bg-[#06121F]/80 backdrop-blur overflow-hidden shadow-2xl">
                      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
                        <span className="h-2 w-2 rounded-full bg-red-400/60" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                        <span className="ml-2 text-[10px] font-mono text-slate-400">
                          POST /v1/agents/&#123;id&#125;/steps
                        </span>
                      </div>
                      <pre className="text-[11px] sm:text-[12px] font-mono leading-relaxed text-slate-300 whitespace-pre p-4 overflow-x-auto">
                        {`{
  "type": `}
                        <span className="text-blue-300">{`"webhook"`}</span>
                        {`,
  "on":   `}
                        <span className="text-blue-300">{`"intent:order_status"`}</span>
                        {`,
  "call": {
    "url":    `}
                        <span className="text-emerald-300">{`"https://api.acme.com/orders"`}</span>
                        {`,
    "method": `}
                        <span className="text-emerald-300">{`"GET"`}</span>
                        {`
  },
  "then": `}
                        <span className="text-blue-300">{`"reply_with_result"`}</span>
                        {`
}`}
                      </pre>
                    </div>
                    <p className="mt-3 text-[11px] text-blue-100/50 font-mono">
                      Illustrative — not a live endpoint.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── ONE BUILDER, MANY AGENTS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="One builder" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One builder,{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                    many agents.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Produce agents for support, sales, booking, and lead
                  qualification — all sharing the same inbox, data, and
                  guardrails.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {AGENT_LINKS.map((a, i) => (
                <BlurFade key={a.href} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.href}
                    className="group h-full flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-blue-200 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.3)] transition-all duration-300"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                      <a.Icon className="h-6 w-6 text-white" strokeWidth={2.25} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                          {a.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#1D4ED8] transition-colors" />
                      </div>
                      <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                        {a.body}
                      </p>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/ai-agents"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-[#0F2A4A] hover:border-blue-300 hover:text-[#1D4ED8] transition-colors"
                >
                  <Boxes className="h-4 w-4" />
                  Explore all AI agents
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Build and launch your agent this week."
          body="Train on your data, add logic and handoff, and deploy across every channel — no code required."
          primaryLabel="Build Your AI Agent"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F7FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Builder questions, answered"
              description="No-code, agentic actions, data, channels, and speed — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or check the{" "}
                  <Link
                    to="/help"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Help Center
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.7) 35%, rgba(191,212,255,0.55) 65%, rgba(219,234,254,0.55) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A8C8FF 20%, #60A5FA 45%, #1D4ED8 65%, #93C5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(59,130,246,0.3), rgba(147,197,253,0.16) 50%, transparent 75%)",
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
                    "radial-gradient(closest-side, rgba(191,212,255,0.4), transparent 70%)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  No-code · live in days
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">every channel</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ BUILD</span>
                <span className="h-px w-8 bg-blue-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
                  Start free
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Build and launch your agent{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                  this week.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Train on your data, add logic and handoff, and deploy across
                every channel — no code required.
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
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)]"
                >
                  <Wand2 className="h-4 w-4" />
                  Build Your AI Agent
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
                "No-code builder",
                "Trained on your data",
                "Logic & handoff",
                "Every channel",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
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
