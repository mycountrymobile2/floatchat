"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Workflow,
  Bot,
  Clock,
  MessageSquare,
  Tag,
  AtSign,
  Webhook,
  Code2,
  Key,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ArrowUpRight,
  Zap,
  PlayCircle,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: live flow canvas with animated edges + particle
─────────────────────────────────────────────────────────────── */

function FlowCanvas() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating runs/week chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Live · ran <span className="text-emerald-600">2,341×</span> this week
        </span>
      </motion.div>

      {/* Floating cost chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Zap className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Avg run <span className="text-[#1D4ED8]">0.4s</span>
        </span>
      </motion.div>

      {/* Canvas */}
      <div className="relative w-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            flow · refund-keyword-responder
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[9px] text-emerald-700 font-medium">
            <PlayCircle className="h-3 w-3" />
            Running
          </span>
        </div>

        {/* Canvas body */}
        <div
          className="relative h-[440px] sm:h-[480px] overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            backgroundColor: "#FAFBFF",
          }}
        >
          {/* SVG edges — percent-based so they line up with node positions */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="edge-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>

            {/* Trigger right port (~27, 22) -> Condition left port (~40, 50) */}
            <motion.path
              d="M 27 22 C 36 22, 32 50, 40 50"
              fill="none"
              stroke="url(#edge-grad)"
              strokeWidth="2"
              strokeDasharray="3 2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />

            {/* Condition right port (~60, 50) -> Action True left port (~73, 22) */}
            <motion.path
              d="M 60 50 C 68 50, 65 22, 73 22"
              fill="none"
              stroke="url(#edge-grad)"
              strokeWidth="2"
              strokeDasharray="3 2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.35,
              }}
            />

            {/* Condition right port (~60, 50) -> Action False left port (~73, 78) */}
            <path
              d="M 60 50 C 68 50, 65 78, 73 78"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="2 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Branch labels (positioned by absolute %) */}
          <span className="absolute text-[10px] font-mono font-semibold text-[#1D4ED8] pointer-events-none"
            style={{ left: "66%", top: "33%" }}>
            true
          </span>
          <span className="absolute text-[10px] font-mono font-semibold text-slate-400 pointer-events-none"
            style={{ left: "66%", top: "63%" }}>
            false
          </span>

          {/* Nodes */}
          <FlowNodeCard
            style={{ left: "16%", top: "22%" }}
            Icon={MessageSquare}
            type="Trigger"
            accent="#3B82F6"
            title="New message"
            subtitle="Channel: WhatsApp"
            dotColor="#3B82F6"
            hasInput={false}
            hasOutput
          />

          <FlowNodeCard
            style={{ left: "50%", top: "50%" }}
            Icon={Tag}
            type="Condition"
            accent="#F59E0B"
            title="Contains 'refund'?"
            subtitle="match any · case-insensitive"
            dotColor="#F59E0B"
            highlighted
            hasInput
            hasOutput
          />

          <FlowNodeCard
            style={{ left: "84%", top: "22%" }}
            Icon={Sparkles}
            type="Action · True"
            accent="#10B981"
            title="Send refund policy"
            subtitle="Captain · article #2104"
            dotColor="#10B981"
            hasInput
            hasOutput={false}
          />

          <FlowNodeCard
            style={{ left: "84%", top: "78%" }}
            Icon={Bot}
            type="Action · False"
            accent="#94A3B8"
            title="Hand off to agent"
            subtitle="Round-robin · US team"
            dotColor="#94A3B8"
            muted
            hasInput
            hasOutput={false}
          />

          {/* Inspector popover — bottom-left corner so it doesn't overlap flow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute hidden md:block"
            style={{ left: "3%", bottom: "5%" }}
          >
            <div className="rounded-lg border border-amber-200 bg-white shadow-[0_15px_30px_-12px_rgba(15,42,74,0.25)] px-3 py-2 w-[180px]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Tag className="h-3 w-3 text-amber-600" />
                <p className="text-[9px] uppercase tracking-wider text-amber-700 font-semibold">
                  Condition · inspector
                </p>
              </div>
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="text-slate-500">Trigger words</span>
                <span className="font-mono text-amber-700">3</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {["refund", "return", "money back"].map((w) => (
                  <span
                    key={w}
                    className="inline-flex items-center rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] font-mono text-amber-700"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom toolbar */}
        <div className="px-3 py-2 border-t border-slate-200 bg-white flex items-center gap-2">
          <span className="text-[10px] font-medium text-slate-500">4 nodes</span>
          <span className="text-slate-300">·</span>
          <span className="text-[10px] text-slate-500">
            Trigger → Condition → Action
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-[#3B82F6]/10 text-[#1D4ED8] px-2 py-0.5 text-[10px] font-semibold">
            <Sparkles className="h-2.5 w-2.5" />
            Captain copilot
          </span>
        </div>
      </div>
    </div>
  )
}

function FlowNodeCard({
  style,
  Icon,
  type,
  title,
  subtitle,
  accent,
  dotColor,
  highlighted,
  muted,
  hasInput = true,
  hasOutput = true,
}: {
  style: React.CSSProperties
  Icon: React.ComponentType<{ className?: string }>
  type: string
  title: string
  subtitle: string
  accent: string
  dotColor: string
  highlighted?: boolean
  muted?: boolean
  hasInput?: boolean
  hasOutput?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={style}
      className={`absolute -translate-x-1/2 -translate-y-1/2 w-[145px] rounded-xl border bg-white px-2.5 py-2 shadow-[0_10px_25px_-12px_rgba(15,42,74,0.25)] ${
        highlighted
          ? "ring-2 ring-amber-400/40 border-amber-200"
          : muted
          ? "border-slate-200 opacity-70"
          : "border-slate-200"
      }`}
    >
      {/* Left port (input) */}
      {hasInput && (
        <span
          className="absolute top-1/2 -left-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full ring-2 ring-white"
          style={{ background: dotColor }}
        />
      )}
      <div className="flex items-center gap-1.5 mb-1">
        <Icon
          className="h-3 w-3"
          {...({ style: { color: accent } } as Record<string, unknown>)}
        />
        <span
          className="text-[8.5px] font-semibold uppercase tracking-wider"
          style={{ color: accent }}
        >
          {type}
        </span>
      </div>
      <p className="text-[10.5px] font-semibold text-[#0F2A4A] leading-tight">
        {title}
      </p>
      <p className="text-[9px] text-slate-500 mt-0.5 truncate">{subtitle}</p>
      {/* Right port (output) */}
      {hasOutput && (
        <span
          className="absolute top-1/2 -right-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full ring-2 ring-white"
          style={{ background: dotColor }}
        />
      )}
    </motion.div>
  )
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
   Mini visuals — automation cards
─────────────────────────────────────────────────────────────── */

function RulesVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
      {[
        { kw: "refund", act: "Send policy article" },
        { kw: "hours", act: "Reply business hours" },
        { kw: "track", act: "Send tracking link" },
      ].map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono">
          <span className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-slate-600">
            {`"${r.kw}"`}
          </span>
          <ArrowRight className="h-2.5 w-2.5 text-slate-400 shrink-0" />
          <span className="rounded bg-[#3B82F6]/10 text-[#1D4ED8] px-1.5 py-0.5 font-medium truncate">
            {r.act}
          </span>
        </div>
      ))}
    </div>
  )
}

function AwayVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">
          Working hours
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700">
          <Clock className="h-2 w-2" />
          After hours
        </span>
      </div>
      <div className="grid grid-cols-12 gap-0.5">
        {Array.from({ length: 24 }).map((_, hour) => {
          const isOpen = hour >= 9 && hour < 18
          return (
            <div
              key={hour}
              className={`h-3 rounded ${
                isOpen ? "bg-emerald-400" : "bg-slate-200"
              }`}
              style={{ gridColumn: `span 0.5` }}
            />
          )
        })}
      </div>
      <div className="rounded-md bg-white border border-amber-200 px-2 py-1.5">
        <p className="text-[10px] text-[#0F2A4A] leading-snug">
          Thanks for reaching out! We're back tomorrow at 9am ET.
        </p>
      </div>
    </div>
  )
}

function FixedVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-md bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[10.5px] text-[#0F2A4A]">
            Hi! I just placed order #4421.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-1.5">
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
          <Bot className="h-2 w-2 text-white" />
        </div>
        <div className="rounded-lg rounded-tl-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2.5 py-1.5 max-w-[80%]">
          <p className="text-[9px] font-semibold text-[#1D4ED8] mb-0.5 uppercase tracking-wider">
            Auto-reply · first response
          </p>
          <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
            Got it Jessica! We reply within 2 hours. Order #4421 confirmed ✓
          </p>
        </div>
      </div>
    </div>
  )
}

function ChatbotVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="h-5 w-5 rounded-md bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
          <Bot className="h-3 w-3 text-white" />
        </div>
        <span className="text-[10px] font-semibold text-[#0F2A4A]">
          AI Chatbot · drag to build
        </span>
        <span className="ml-auto text-[9px] text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
          200 / mo
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[9.5px] font-medium text-[#0F2A4A]">
          Greet
        </div>
        <ArrowRight className="h-2.5 w-2.5 text-slate-400" />
        <div className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[9.5px] font-medium text-[#0F2A4A]">
          Ask intent
        </div>
        <ArrowRight className="h-2.5 w-2.5 text-slate-400" />
        <div className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-[9.5px] font-semibold text-violet-700">
          AI fallback
        </div>
      </div>
      <p className="text-[9px] text-slate-500">
        Trains on Help Center · falls back to Captain when stuck
      </p>
    </div>
  )
}

function ApiVisual() {
  return (
    <div className="rounded-xl bg-[#0F172A] border border-slate-800 p-3 overflow-hidden">
      <div className="flex items-center gap-1.5 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
        <span className="ml-1 text-[9px] font-mono text-slate-500">
          POST /v1/conversations
        </span>
      </div>
      <pre className="text-[10px] font-mono leading-relaxed text-slate-300 whitespace-pre">
        {`{
  "channel": `}
        <span className="text-[#7CC4FF]">{`"whatsapp"`}</span>
        {`,
  "to":      `}
        <span className="text-emerald-400">{`"+14155550142"`}</span>
        {`,
  "text":    `}
        <span className="text-emerald-400">{`"Hi Jessica!"`}</span>
        {`
}`}
      </pre>
    </div>
  )
}

function WebhookVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Webhook className="h-3 w-3 text-amber-600" />
        <span className="text-[10px] font-semibold text-[#0F2A4A]">
          5 webhooks · Lite
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>
      {[
        { event: "conversation.created", count: 1432 },
        { event: "message.received", count: 8901 },
        { event: "status.changed", count: 482 },
      ].map((w, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2 py-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <span className="text-[9.5px] font-mono text-[#0F2A4A] truncate flex-1">
            {w.event}
          </span>
          <span className="text-[9px] text-slate-500">
            {w.count.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

function RateLimitVisual() {
  const tiers = [
    { plan: "Lite", val: 30 },
    { plan: "Starter", val: 60 },
    { plan: "Growth", val: 300 },
    { plan: "Pro", val: 1000 },
  ]
  const max = 1000
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-[#0F2A4A]">Rate limit / min</span>
        <span className="text-slate-400 font-mono">req/min</span>
      </div>
      {tiers.map((t, i) => (
        <div key={t.plan} className="flex items-center gap-2 text-[10px]">
          <span className="w-14 text-slate-500 truncate">{t.plan}</span>
          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(t.val / max) * 100}%` }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.08 }}
              className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
            />
          </div>
          <span className="w-12 text-right font-semibold text-[#1D4ED8] tabular-nums">
            {t.val.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ + content (preserved verbatim)
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What's the difference between Auto Reply and AI Chatbot?",
    answer:
      "Auto Reply is rule-based (if-then keyword triggers). AI Chatbot is conversational and trains on your help docs to answer questions naturally.",
  },
  {
    question: "Do I need to be a developer to use the API?",
    answer:
      "No for Auto Reply, AI Chatbot, and Webhooks (no-code UI). Yes for the REST API itself, which requires technical setup.",
  },
  {
    question: "Can I use Auto Reply on WhatsApp?",
    answer:
      "Yes, on the two-way customer service channel. Note: this is not WhatsApp Business API broadcasting. That requires WABA which FloatChat does not have.",
  },
  {
    question: "Is the AI Chatbot the same as Captain on Starter?",
    answer:
      "Lite includes a basic AI Chatbot (200 replies/mo). Starter ($19.99) adds full Captain with sentiment, copilot, summary, and rephrase. Both use the same underlying LLM stack.",
  },
]

const comparisonRows = [
  { feature: "Auto Reply Rules", chatmitra: "Yes", floatchat: "Yes" },
  { feature: "Auto Reply Away", chatmitra: "Yes", floatchat: "Yes" },
  { feature: "Auto Reply Fixed", chatmitra: "Yes", floatchat: "Yes" },
  { feature: "AI Chatbot", chatmitra: "Yes", floatchat: "Yes" },
  { feature: "API Access", chatmitra: "Yes", floatchat: "Yes" },
  { feature: "Webhooks", chatmitra: "Yes", floatchat: "Yes" },
  {
    feature: "Live Chat widget",
    chatmitra: "No (WhatsApp only)",
    floatchat: "Yes (all your channels)",
  },
  { feature: "Email inbox", chatmitra: "No", floatchat: "Yes" },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AutomationPage() {
  useEffect(() => {
    document.title = "Auto Reply + AI Chatbot. From $9.99/mo | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Auto Reply Rules, after-hours messages, AI Chatbot, API, and Webhooks on the Lite plan at $9.99/month. Built for US small businesses.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Workflow className="h-3.5 w-3.5" />
                  Automation · Lite plan
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Auto Reply + AI Chatbot.{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    From $9.99.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Reply rules, after-hours auto-responses, AI Chatbot, REST API,
                  and Webhooks. The Lite plan at $9.99/month includes all of it.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Lite plan $9.99/mo",
                    "200 AI replies",
                    "Unlimited Auto Reply rules",
                    "5 webhooks",
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
                      to="/signup?plan=lite"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Try Lite Free for 14 Days
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
                    Book a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  No credit card. Cancel anytime.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <FlowCanvas />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── AUTOMATION STACK (4 cards) ───── */}
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
                <SectionEyebrow num="01" label="In the stack" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What's in the automation stack.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: AtSign,
                  type: "Trigger",
                  title: "Auto Reply Rules.",
                  body:
                    'Keyword-triggered responses. Customer types "refund," your rule fires the policy. Customer types "hours," they get your hours. No agent needed.',
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <RulesVisual />,
                },
                {
                  Icon: Clock,
                  type: "Schedule",
                  title: "Auto Reply Away.",
                  body:
                    "After-hours auto-responder with custom message and expected reply time. No more gaps in coverage.",
                  accent: "from-amber-400 to-orange-500",
                  shadow: "shadow-orange-500/40",
                  visual: <AwayVisual />,
                },
                {
                  Icon: MessageSquare,
                  type: "First touch",
                  title: "Auto Reply Fixed.",
                  body:
                    "First-response auto-reply on every new conversation. Confirms receipt, sets expectations, captures customer details.",
                  accent: "from-emerald-400 to-emerald-600",
                  shadow: "shadow-emerald-500/40",
                  visual: <FixedVisual />,
                },
                {
                  Icon: Bot,
                  type: "AI flow",
                  title: "AI Chatbot builder.",
                  body:
                    "No-code flow builder. Drag-and-drop branches. Connects to your knowledge base for fallback to AI replies.",
                  accent: "from-violet-400 to-violet-600",
                  shadow: "shadow-violet-500/40",
                  visual: <ChatbotVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-md ${f.shadow} shrink-0`}
                      >
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          / {f.type}
                        </span>
                        <h3 className="mt-1 text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
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

        {/* ───── DEVELOPER TOOLS (3 cards) ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="For developers" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Plus{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    developer tools.
                  </span>
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Code2,
                  title: "REST API access.",
                  body:
                    "Programmatic conversation creation, message sending, contact management. Build custom workflows.",
                  visual: <ApiVisual />,
                },
                {
                  Icon: Webhook,
                  title: "Webhooks for real-time events.",
                  body:
                    "Conversation created, message received, status changed. Push to your stack in real time. 5 webhooks on Lite.",
                  visual: <WebhookVisual />,
                },
                {
                  Icon: Key,
                  title: "API rate limit: 30 req/min on Lite.",
                  body:
                    "Higher limits on Starter (60), Growth (300), Pro (1,000), Enterprise (custom).",
                  visual: <RateLimitVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/40 shrink-0">
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <h3 className="text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
                      {f.body}
                    </p>
                    <div className="mt-auto">{f.visual}</div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── COMPARISON ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="vs ChatMitra Pro" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  FloatChat Lite vs ChatMitra Pro.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Same automation stack. More channels. Lower price.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8 h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Feature
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            ChatMitra Pro (~$12/mo)
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-[#1D4ED8]">
                            FloatChat Lite ($9.99/mo)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row) => {
                          const cmYes = row.chatmitra === "Yes"
                          const cmNo = row.chatmitra.startsWith("No")
                          return (
                            <tr
                              key={row.feature}
                              className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/40 transition-colors"
                            >
                              <td className="p-4 font-medium text-[#0F2A4A]">
                                {row.feature}
                              </td>
                              <td className="p-4">
                                {cmYes ? (
                                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald-600">
                                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                    Yes
                                  </span>
                                ) : cmNo ? (
                                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-rose-500">
                                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                                    {row.chatmitra}
                                  </span>
                                ) : (
                                  <span className="text-[12px] text-slate-500">
                                    {row.chatmitra}
                                  </span>
                                )}
                              </td>
                              <td className="p-4 bg-gradient-to-r from-[#EAF2FF] to-transparent">
                                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1D4ED8]">
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                  {row.floatchat}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Vs ChatMitra
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      17<span className="text-3xl lg:text-4xl text-white/70">%</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Cheaper. Same automation stack as ChatMitra Pro.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live Chat + Email · still included
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Try Auto Reply + AI Chatbot"
          body="Lite plan at $9.99 covers Auto Reply rules, AI Chatbot, API, and webhooks."
          primaryLabel="Try Lite Free"
          primaryHref="/signup?plan=lite"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Rules vs AI, API, WhatsApp, Captain — straight answers."
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
                  2,341 flows ran this week
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">avg 0.4s</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-8 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  14-day free trial
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try the automation stack{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  free.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                $9.99/month after trial. No credit card required.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=lite"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start 14-Day Trial of Lite
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Demo
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
                "Auto Reply Rules",
                "AI Chatbot",
                "REST API",
                "5 webhooks",
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
