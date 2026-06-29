"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Gauge,
  Smile,
  Download,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Clock,
  MessageSquare,
  Send,
  Layers,
  Inbox,
  Filter,
  CalendarClock,
  FileText,
  PieChart,
  Target,
  Radio,
  GitBranch,
  Megaphone,
} from "lucide-react"
import {
  SiWhatsapp,
  SiMessenger,
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
  title: "Agentic AI Analytics and Insights | FloatChat",
  description:
    "Track agent performance, sentiment, and campaign results with real-time dashboards covering CSAT, resolution, deliverability, and engagement.",
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
   Small reusable: animated sparkline / area / bars (CSS + SVG)
─────────────────────────────────────────────────────────────── */

function Sparkline({
  points,
  className = "",
  stroke = "#1D4ED8",
  fill = "rgba(59,130,246,0.14)",
  height = 36,
}: {
  points: number[]
  className?: string
  stroke?: string
  fill?: string
  height?: number
}) {
  const w = 100
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = w / (points.length - 1)
  const coords = points.map((p, i) => {
    const x = i * step
    const y = height - 4 - ((p - min) / range) * (height - 8)
    return [x, y] as const
  })
  const line = coords.map(([x, y]) => `${x},${y}`).join(" ")
  const area = `0,${height} ${line} ${w},${height}`

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", height }}
    >
      <motion.polygon
        points={area}
        fill={fill}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function MiniBars({
  values,
  tone = "blue",
  height = 44,
}: {
  values: number[]
  tone?: "blue" | "emerald"
  height?: number
}) {
  const max = Math.max(...values)
  const grad =
    tone === "blue"
      ? "linear-gradient(to top, #1D4ED8, #60A5FA)"
      : "linear-gradient(to top, #059669, #34D399)"
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {values.map((v, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-t-[3px]"
          style={{ background: grad }}
          initial={{ height: 0 }}
          whileInView={{ height: `${(v / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Sentiment gauge — half-circle, blue with an emerald positive arc
─────────────────────────────────────────────────────────────── */

function SentimentGauge({ value = 78 }: { value?: number }) {
  // value 0-100 → arc fraction over a 180° semicircle
  const r = 40
  const cx = 50
  const cy = 50
  const circumference = Math.PI * r
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex flex-col items-center">
      <svg viewBox="0 0 100 56" className="w-full max-w-[150px]">
        {/* track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={8}
          strokeLinecap="round"
        />
        {/* value */}
        <motion.path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="-mt-5 text-center">
        <p className="text-2xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
          {value}%
        </p>
        <p className="mt-1 text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <Smile className="h-3 w-3 text-emerald-500" /> positive sentiment
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO MOCKUP — a live analytics dashboard window:
   KPI tiles · animated area chart · sentiment gauge.
─────────────────────────────────────────────────────────────── */

function DashboardMockup() {
  const areaPoints = [22, 30, 26, 38, 34, 48, 44, 58, 62, 70, 66, 78]

  const kpis = [
    {
      Icon: Smile,
      label: "CSAT",
      value: "96%",
      delta: "+4.2",
      up: true,
      spark: [70, 74, 72, 80, 84, 88, 96],
    },
    {
      Icon: CheckCircle2,
      label: "Resolution rate",
      value: "92%",
      delta: "+6.1",
      up: true,
      spark: [60, 66, 70, 74, 80, 86, 92],
    },
    {
      Icon: Clock,
      label: "First-response",
      value: "18s",
      delta: "-31%",
      up: true,
      spark: [60, 52, 48, 40, 34, 26, 18],
    },
  ]

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

      {/* Floating "real-time" chip */}
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
          Updating in real time
        </span>
      </motion.div>

      {/* Floating NPS chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <TrendingUp className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          NPS +62 · support & campaigns
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
            app.floatchat.com · analytics
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <Filter className="h-2.5 w-2.5" /> Last 7 days
          </span>
        </div>

        <div className="p-3.5 space-y-3 bg-gradient-to-b from-white to-slate-50/40">
          {/* KPI tiles */}
          <div className="grid grid-cols-3 gap-2.5">
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="rounded-xl border border-slate-200 bg-white p-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="h-6 w-6 rounded-md bg-[#EAF2FF] flex items-center justify-center">
                    <k.Icon className="h-3 w-3 text-[#1D4ED8]" />
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[8.5px] font-semibold text-emerald-600">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {k.delta}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-semibold text-[#0F2A4A] tabular-nums leading-none">
                  {k.value}
                </p>
                <p className="text-[8.5px] text-slate-500 mt-0.5 truncate">
                  {k.label}
                </p>
                <div className="mt-1.5">
                  <Sparkline points={k.spark} height={18} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main area chart */}
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#0F2A4A]">
                  Conversations resolved
                </span>
              </div>
              <div className="flex items-center gap-2 text-[8.5px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" /> Support
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Campaigns
                </span>
              </div>
            </div>
            <Sparkline points={areaPoints} height={68} />
            <div className="mt-1 flex justify-between text-[7.5px] text-slate-400 font-mono">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>

          {/* Bottom: bars + gauge */}
          <div className="grid grid-cols-5 gap-2.5">
            <div className="col-span-3 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <BarChart3 className="h-3 w-3 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#0F2A4A]">
                  Deliverability by channel
                </span>
              </div>
              <MiniBars values={[88, 96, 72, 84, 91, 79]} height={42} />
              <div className="mt-1.5 flex justify-between text-[7.5px] text-slate-400">
                {["WA", "SMS", "RCS", "Web", "IG", "FB"].map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
            <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-3 flex flex-col justify-center">
              <SentimentGauge value={78} />
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

function PerformanceVisual() {
  const rows = [
    { label: "First-response time", value: "18s", spark: [60, 50, 44, 36, 28, 18] },
    { label: "Resolution rate", value: "92%", spark: [62, 70, 76, 82, 88, 92] },
    { label: "CSAT", value: "96%", spark: [80, 84, 86, 90, 93, 96] },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Live performance
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Activity className="h-2.5 w-2.5" /> real time
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span className="text-[10px] text-[#0F2A4A] w-28 shrink-0 truncate">
            {r.label}
          </span>
          <div className="flex-1 min-w-0">
            <Sparkline points={r.spark} height={16} />
          </div>
          <span className="text-[10px] font-semibold text-[#1D4ED8] tabular-nums shrink-0">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function CampaignVisual() {
  const channels = [
    { label: "SMS", deliver: 96, engage: 41, Icon: MessageSquare, bg: "#0F2A4A" },
    { label: "WhatsApp", deliver: 99, engage: 58, Icon: SiWhatsapp, bg: "#25D366" },
    { label: "RCS", deliver: 88, engage: 47, Icon: Radio, bg: "#1D4ED8" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Campaign performance
        </span>
        <span className="text-[8.5px] text-slate-400">deliver · engage</span>
      </div>
      {channels.map((c) => (
        <div
          key={c.label}
          className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="h-4 w-4 rounded flex items-center justify-center shrink-0"
              style={{ background: c.bg }}
            >
              <c.Icon
                className="h-2.5 w-2.5 text-white"
                style={{ color: "#fff", width: 10, height: 10 }}
              />
            </span>
            <span className="text-[10px] font-medium text-[#0F2A4A]">
              {c.label}
            </span>
            <span className="ml-auto text-[8.5px] text-slate-500 tabular-nums">
              {c.deliver}% · {c.engage}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
              initial={{ width: 0 }}
              whileInView={{ width: `${c.deliver}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function SentimentTrendVisual() {
  const topics = [
    { label: "Shipping & delivery", count: 312, mood: "up" as const },
    { label: "Returns & refunds", count: 188, mood: "down" as const },
    { label: "Product sizing", count: 141, mood: "up" as const },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Top questions · surfaced automatically
        </span>
        <Sparkles className="h-3 w-3 text-[#3B82F6]" />
      </div>
      {topics.map((t) => (
        <div
          key={t.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span className="text-[10px] text-[#0F2A4A] flex-1 truncate">
            {t.label}
          </span>
          <span className="font-mono text-[9px] text-slate-400 tabular-nums">
            {t.count}
          </span>
          {t.mood === "up" ? (
            <span className="inline-flex items-center gap-0.5 text-[8.5px] font-semibold text-emerald-600">
              <TrendingUp className="h-2.5 w-2.5" /> positive
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 text-[8.5px] font-semibold text-rose-500">
              <TrendingDown className="h-2.5 w-2.5" /> watch
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function ReportingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <FileText className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
            Weekly_CX_Report.csv
          </p>
          <p className="text-[8.5px] text-slate-400">12,480 conversations · 6 channels</p>
        </div>
        <Download className="h-3 w-3 text-slate-400 shrink-0" />
      </div>
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/20 bg-[#EAF2FF] px-2 py-1.5">
        <CalendarClock className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
        <p className="text-[9.5px] text-[#0F2A4A] flex-1">
          Scheduled · every Monday 9:00
        </p>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8] border border-[#3B82F6]/20">
          <Check className="h-2.5 w-2.5" strokeWidth={3} /> on
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["PDF", "CSV", "API"].map((f) => (
          <div
            key={f}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1 text-center text-[9px] font-medium text-slate-600"
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   KPI tiles for the metrics showcase band
─────────────────────────────────────────────────────────────── */

type KpiTile = {
  Icon: typeof Gauge
  label: string
  value: string
  delta: string
  up: boolean
  spark: number[]
}

const kpiTiles: KpiTile[] = [
  {
    Icon: Clock,
    label: "Avg. response time",
    value: "18s",
    delta: "31% faster",
    up: true,
    spark: [60, 54, 48, 40, 32, 24, 18],
  },
  {
    Icon: CheckCircle2,
    label: "Resolution rate",
    value: "92%",
    delta: "+6.1 pts",
    up: true,
    spark: [62, 68, 72, 78, 84, 88, 92],
  },
  {
    Icon: Smile,
    label: "CSAT",
    value: "96%",
    delta: "+4.2 pts",
    up: true,
    spark: [80, 82, 86, 88, 92, 94, 96],
  },
  {
    Icon: TrendingUp,
    label: "NPS",
    value: "+62",
    delta: "+9 pts",
    up: true,
    spark: [40, 44, 50, 53, 57, 60, 62],
  },
  {
    Icon: Send,
    label: "Deliverability",
    value: "98.4%",
    delta: "+1.3 pts",
    up: true,
    spark: [92, 93, 94, 96, 97, 98, 98.4],
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does it cover campaigns and support, or just one?",
    answer:
      "Both, in one view. Because the AI, the shared inbox, and broadcasting all run on the same FloatChat platform, your dashboards show support conversations and outbound campaigns side by side. You can see how a promotional broadcast affects ticket volume, or how resolution rate holds up during a busy campaign — without stitching two tools together.",
  },
  {
    question: "Can I export the data?",
    answer:
      "Yes. Every dashboard and conversation log is exportable as CSV or PDF, and you can schedule reports to land in your inbox automatically — daily, weekly, or monthly. There is also an API if you want to pipe metrics into a data warehouse or BI tool you already use.",
  },
  {
    question: "Is sentiment analysis included?",
    answer:
      "Yes. Sentiment and trend insights are automatic. FloatChat reads the tone of conversations, surfaces the questions customers ask most, and flags shifts in how people feel — positive momentum or a problem building — so you catch it from a dashboard instead of a pile of angry tickets.",
  },
  {
    question: "Which metrics can I actually track?",
    answer:
      "The core customer experience analytics: first-response time, resolution rate, CSAT, and NPS for support; deliverability, engagement, and conversion for campaigns across SMS, WhatsApp, and RCS; plus volume, channel mix, and sentiment trends across the whole journey. Everything updates in real time.",
  },
  {
    question: "How real-time is it?",
    answer:
      "Live. Dashboards update as conversations and campaigns happen, so what you see at noon reflects the morning — not yesterday's batch. That matters when you are staffing a shift, watching a launch land, or deciding whether to pause a broadcast that is underperforming.",
  },
  {
    question: "Do I need a separate analytics tool or data team to set this up?",
    answer:
      "No. The dashboards are built in and on by default — there is nothing to instrument and no pipeline to wire up. Because every channel already lives on one platform, the analytics cover the entire customer journey the moment you go live.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI Analytics and Insights",
  serviceType: "Customer experience analytics and real-time dashboards",
  description:
    "Real-time dashboards for agentic AI customer experience analytics — track agent performance, customer sentiment, and campaign results across CSAT, NPS, resolution, deliverability, and engagement, with exportable logs and scheduled reports.",
  url: "https://www.floatchat.com/products/analytics",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer support, marketing, and customer experience teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related products
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The reasoning engine behind every conversation your analytics measure.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox feeding one source of truth across every channel.",
  },
  {
    to: "/products/agent-copilot",
    Icon: Sparkles,
    title: "Agent Copilot",
    body: "Real-time suggestions for human agents, measured in the same dashboards.",
  },
  {
    to: "/ai-agents",
    Icon: Layers,
    title: "AI Agents",
    body: "The agents whose performance you track — service, sales, booking and more.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AnalyticsPage() {
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
                  <BarChart3 className="h-3.5 w-3.5" />
                  Analytics &amp; Insights · real-time dashboards
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI analytics that show{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    what actually matters.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Real-time dashboards for agent performance, customer sentiment,
                  and campaign results — support and broadcasting in one view, so
                  you can see where to improve and where to invest.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Real-time dashboards",
                    "CSAT, NPS & resolution",
                    "Deliverability & engagement",
                    "Exportable reports",
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
                  Decisions backed by data, not guesses.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <DashboardMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: Activity,
                  value: "Real-time",
                  label: "dashboards, always current",
                },
                {
                  Icon: Smile,
                  value: "CSAT · NPS",
                  label: "and resolution, tracked live",
                },
                {
                  Icon: Send,
                  value: "Deliver",
                  label: "and engagement, per campaign",
                },
                {
                  Icon: Download,
                  value: "Export",
                  label: "logs and scheduled reports",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-[26px] font-semibold text-[#0F2A4A] leading-none">
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
                  Scattered data hides what is really happening.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Your support metrics live in a helpdesk. Your campaign numbers
                    live in a broadcasting tool. Sentiment, if you measure it at
                    all, lives in someone&apos;s spreadsheet. Each tool shows a
                    slice — and none of them shows the whole customer.
                  </p>
                  <p>
                    So you end up exporting CSVs, reconciling timestamps, and
                    arguing about whose number is right, instead of acting. By the
                    time a report is stitched together, the week it describes is
                    already over and the moment to fix anything has passed.
                  </p>
                  <p>
                    One view of conversations and campaigns tells you{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      where to improve and where to invest
                    </span>
                    . That is the difference between customer experience analytics
                    you read after the fact and dashboards you actually steer by.
                  </p>
                </div>
              </BlurFade>

              {/* scattered vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                      Scattered tools
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Support and campaigns reported apart",
                        "Metrics that never reconcile",
                        "No automatic sentiment at all",
                        "Reports land a week too late",
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
                      One dashboard
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Support and campaigns in one view",
                        "One source of truth, every channel",
                        "Sentiment surfaced automatically",
                        "Real time — act while it matters",
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
                  Four dashboards, one source of truth.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Performance, campaigns, sentiment, and reporting — each with its
                  own live view, all drawing on the same conversations.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Gauge,
                  title: "Performance dashboards.",
                  body:
                    "First-response time, resolution rate, CSAT, and NPS in real time — for the AI agents and your human team, side by side, so you can staff and route based on what the data says.",
                  visual: <PerformanceVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Campaign analytics.",
                  body:
                    "Deliverability, engagement, and conversion across SMS, WhatsApp, and RCS — see which broadcast landed, which channel converts, and what it cost to get there.",
                  visual: <CampaignVisual />,
                },
                {
                  Icon: Smile,
                  title: "Sentiment & trends.",
                  body:
                    "The most common questions and how customers actually feel, surfaced automatically. Catch a rising issue or a wave of goodwill from a dashboard, not a pile of tickets.",
                  visual: <SentimentTrendVisual />,
                },
                {
                  Icon: FileText,
                  title: "Reporting.",
                  body:
                    "Exportable conversation logs and scheduled reports as CSV, PDF, or API. Send the weekly numbers to leadership automatically — no manual export, no copy-paste.",
                  visual: <ReportingVisual />,
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

        {/* ───── METRICS SHOWCASE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Metrics that matter" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The numbers your team already cares about.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Every tile is live, every trend is real, and every figure is
                  exportable. Sample data shown.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {kpiTiles.map((k, i) => (
                <BlurFade key={k.label} delay={0.05 + i * 0.07} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)] flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                        <k.Icon className="h-4 w-4 text-[#1D4ED8]" />
                      </span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                        <TrendingUp className="h-3 w-3" />
                        {k.delta}
                      </span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
                      {k.value}
                    </p>
                    <p className="mt-1.5 text-[12px] text-slate-500 leading-snug">
                      {k.label}
                    </p>
                    <div className="mt-auto pt-4">
                      <Sparkline points={k.spark} height={28} />
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* mini dashboard grid band */}
            <BlurFade delay={0.2}>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <LineChart className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      Volume by day
                    </span>
                  </div>
                  <Sparkline points={[30, 42, 38, 55, 49, 64, 72]} height={80} />
                  <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-mono">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, idx) => (
                      <span key={`${d}-${idx}`}>{d}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      Engagement by channel
                    </span>
                  </div>
                  <MiniBars values={[58, 41, 47, 36, 52, 44]} height={80} />
                  <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                    {["WA", "SMS", "RCS", "Web", "IG", "FB"].map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 mb-2 self-start">
                    <PieChart className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      Sentiment mix
                    </span>
                  </div>
                  <SentimentGauge value={81} />
                  <div className="mt-3 flex items-center gap-4 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
                      Positive 81%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />{" "}
                      Neutral 14%
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Neg
                      5%
                    </span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── ONE-VIEW SPOTLIGHT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="One view" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Support and campaigns, in one view.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Stop reconciling tabs. See the whole customer experience on one
                  screen and watch how one side affects the other.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Scattered tools */}
              <BlurFade delay={0.1} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-rose-200 bg-rose-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-4">
                    Four tabs, four truths
                  </p>
                  <div className="space-y-3">
                    {[
                      { name: "Helpdesk", note: "CSAT · resolution" },
                      { name: "Broadcast tool", note: "deliverability" },
                      { name: "Spreadsheet", note: "sentiment, manual" },
                      { name: "BI export", note: "stale by Monday" },
                    ].map((t) => (
                      <div
                        key={t.name}
                        className="flex items-center gap-3 rounded-xl border border-rose-200/70 bg-white/70 px-3 py-2.5"
                      >
                        <span className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center shrink-0">
                          <Layers className="h-4 w-4 text-rose-500" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-rose-900/80 truncate">
                            {t.name}
                          </p>
                          <p className="text-[11px] text-rose-700/70 truncate">
                            {t.note}
                          </p>
                        </div>
                        <span className="ml-auto text-[10px] font-medium text-rose-500">
                          disconnected
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>

              {/* Arrow */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <span className="h-12 w-px bg-gradient-to-b from-rose-300 to-[#3B82F6]" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="h-12 w-px bg-gradient-to-b from-[#3B82F6] to-emerald-300" />
                </div>
              </div>

              {/* Unified */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-[#3B82F6]/25 bg-gradient-to-br from-[#EAF2FF] via-white to-[#F5F7FF] p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-4">
                    One FloatChat dashboard
                  </p>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Resolution", value: "92%", Icon: CheckCircle2 },
                        { label: "Deliverability", value: "98%", Icon: Send },
                        { label: "CSAT", value: "96%", Icon: Smile },
                        { label: "Conversion", value: "12.4%", Icon: Target },
                      ].map((m) => (
                        <div
                          key={m.label}
                          className="rounded-xl border border-slate-200 bg-slate-50/40 px-3 py-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <m.Icon className="h-3 w-3 text-[#1D4ED8]" />
                            <span className="text-[10px] text-slate-500">
                              {m.label}
                            </span>
                          </div>
                          <p className="mt-1 text-lg font-semibold text-[#0F2A4A] tabular-nums leading-none">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-[#0F2A4A]">
                          Campaign → support impact
                        </span>
                        <span className="text-[9px] text-emerald-600 font-medium">
                          correlated live
                        </span>
                      </div>
                      <Sparkline
                        points={[28, 32, 40, 52, 48, 60, 70]}
                        height={40}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[12px] text-[#0F2A4A]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    One record per customer, the whole journey on one screen.
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="See what is really driving your customer experience."
          body="Real-time dashboards for support and campaigns, with sentiment, deliverability, and exportable reports."
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
                  One platform, so the analytics see everything.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Because the AI, the inbox, and broadcasting share one platform,
                  your dashboards cover the entire customer journey — not a single
                  channel.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Sparkles,
                  title: "The AI is measured at the source.",
                  body:
                    "Every agentic resolution, escalation, and handoff is logged where it happens — so performance numbers are exact, not estimated from a sample.",
                },
                {
                  Icon: Inbox,
                  title: "The inbox feeds one truth.",
                  body:
                    "Human and AI conversations flow through the same shared inbox, so CSAT and resolution cover the full team — no blind spots between bot and person.",
                },
                {
                  Icon: Megaphone,
                  title: "Broadcasting closes the loop.",
                  body:
                    "Campaigns run on the same platform, so deliverability and engagement sit right next to the support volume they create. Cause and effect, on one screen.",
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
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-8">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      The whole journey
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug">
                      One customer record follows every conversation and campaign,
                      so your customer experience analytics describe the real
                      journey — from first broadcast to final resolution — instead
                      of one channel in isolation.
                    </p>
                  </div>
                  <div className="lg:col-span-4">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { v: "1", l: "platform" },
                        { v: "6+", l: "channels" },
                        { v: "100%", l: "of the journey" },
                        { v: "0", l: "CSV stitching" },
                      ].map((s) => (
                        <div
                          key={s.l}
                          className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3"
                        >
                          <p className="text-2xl font-semibold tabular-nums leading-none">
                            {s.v}
                          </p>
                          <p className="mt-1 text-[11px] text-white/70">{s.l}</p>
                        </div>
                      ))}
                    </div>
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
                <SectionEyebrow num="06" label="Explore the platform" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything your analytics measure.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The dashboards draw on the rest of the platform — here is what
                  they are watching.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCards.map((a, i) => (
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

              <BlurFade delay={0.05 + relatedCards.length * 0.06} className="h-full">
                <Link
                  to="/compare"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <GitBranch className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      Compare FloatChat
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      See how unified analytics stack up against bolt-on reporting.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    Compare now
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
            </div>

            {/* related pills */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {[
                  { to: "/inbox", label: "Shared Inbox", Icon: Inbox },
                  { to: "/voice", label: "Voice", Icon: Radio },
                  { to: "/integrations", label: "Integrations", Icon: GitBranch },
                  { to: "/pricing", label: "Pricing", Icon: Target },
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
              description="Straight answers about dashboards, exports, sentiment, and going live."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,212,255,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #60A5FA 40%, #3B82F6 60%, #1D4ED8 80%, transparent)",
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
                  Dashboards updating in real time
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">support + campaigns</span>
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
                  Built-in, on by default
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                See what is really driving your{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  customer experience.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Real-time dashboards for support and campaigns, with sentiment,
                deliverability, and exportable reports — decisions backed by data,
                not guesses.
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
                "Real-time dashboards",
                "CSAT, NPS & resolution",
                "Deliverability & engagement",
                "Exportable reports",
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
