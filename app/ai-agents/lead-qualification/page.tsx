"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  Filter,
  Gauge,
  Database,
  Users,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkles,
  Zap,
  Clock,
  Flame,
  MessageSquare,
  Phone,
  Building2,
  TrendingUp,
  Route,
  CheckCircle2,
} from "lucide-react"
import {
  SiHubspot,
  SiSalesforce,
  SiSlack,
  SiZapier,
} from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "Agentic AI Lead Qualification Agent for Faster Pipeline | FloatChat",
  description:
    "Capture, qualify, and route leads automatically with an agentic AI agent that asks the right questions, scores intent, and syncs to your CRM.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow — standard FloatChat blue accent
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
   Hero mockup: qualification chat + animated lead score card
─────────────────────────────────────────────────────────────── */

type ScorePhase = "asking" | "scoring" | "synced" | "routed"

function LeadScoreMockup() {
  const [phase, setPhase] = useState<ScorePhase>("asking")
  const [score, setScore] = useState(0)

  // Loop the qualification → score → sync → route story.
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const run = async () => {
      while (!cancelled) {
        setPhase("asking")
        setScore(0)
        await wait(1600)
        if (cancelled) return
        setPhase("scoring")
        // animate the gauge from 0 → 92
        for (let v = 0; v <= 92; v += 4) {
          if (cancelled) return
          setScore(v)
          await wait(28)
        }
        setScore(92)
        await wait(1400)
        if (cancelled) return
        setPhase("synced")
        await wait(1500)
        if (cancelled) return
        setPhase("routed")
        await wait(2400)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const tier =
    score >= 80 ? "Hot" : score >= 50 ? "Warm" : score > 0 ? "Cool" : "—"
  const showSynced = phase === "synced" || phase === "routed"
  const showRouted = phase === "routed"

  // Conic gauge fill
  const gaugeAngle = (score / 100) * 360

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.40), transparent 70%)",
        }}
      />

      {/* Floating "Synced to CRM" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: showSynced ? 1 : 0.35,
          y: 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(37,99,235,0.25)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Database className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Synced to HubSpot
        </span>
      </motion.div>

      {/* Floating "Routed to rep" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: showRouted ? 1 : 0.35,
          y: 0,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(37,99,235,0.25)]"
      >
        <Route className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Routed to Dana R.
        </span>
      </motion.div>

      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(37,99,235,0.30)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · lead qualification
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Qualification chat */}
          <section className="col-span-12 md:col-span-7 flex flex-col border-r border-slate-200">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/80?img=15"
                  alt="Priya N."
                  loading="lazy"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#0F2A4A]">
                  Priya N. · new inbound
                </p>
                <p className="text-[9.5px] text-slate-500">
                  WhatsApp · landed on /pricing
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-semibold text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" />
                Qualifying
              </span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2 bg-slate-50/30 overflow-hidden">
              {/* Visitor */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                    Hi — do you support teams of 40+ on the Pro plan?
                  </p>
                  <p className="text-[8.5px] text-slate-400 mt-0.5">10:02 AM</p>
                </div>
              </div>

              {/* Agent dynamic question */}
              <div className="flex items-start gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[82%]">
                  <p className="text-[9px] font-medium text-[#1D4ED8] mb-0.5">
                    Agent · adaptive question
                  </p>
                  <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                    Yes — Pro scales past 40 seats. What's your timeline to roll
                    this out?
                  </p>
                </div>
              </div>

              {/* Visitor answer */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                    This quarter — we already have budget approved.
                  </p>
                  <p className="text-[8.5px] text-slate-400 mt-0.5">10:03 AM</p>
                </div>
              </div>

              {/* Captured fields */}
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Captured
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { k: "Team size", v: "40+" },
                    { k: "Budget", v: "Approved" },
                    { k: "Timeline", v: "Q-now" },
                  ].map((f) => (
                    <div key={f.k}>
                      <p className="text-[8.5px] text-slate-500">{f.k}</p>
                      <p className="text-[10px] font-semibold text-[#0F2A4A]">
                        {f.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Agent is asking the next best question…
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1D4ED8]">
                <Zap className="h-3 w-3" /> Auto
              </span>
            </div>
          </section>

          {/* Lead score card */}
          <aside className="col-span-12 md:col-span-5 flex flex-col bg-slate-50/40">
            <div className="px-3 py-2.5 border-b border-slate-200 bg-white">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Lead score
              </p>
            </div>

            <div className="flex-1 px-4 py-4 flex flex-col items-center justify-start gap-4">
              {/* Conic gauge */}
              <div className="relative h-32 w-32">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#1D4ED8 ${gaugeAngle}deg, #DBEAFE ${gaugeAngle}deg)`,
                  }}
                />
                <div className="absolute inset-[10px] rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                  <span className="text-[28px] font-semibold tabular-nums text-[#1D4ED8] leading-none">
                    {score}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">
                    / 100
                  </span>
                </div>
              </div>

              {/* Tier badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    tier === "Hot"
                      ? "bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] text-white shadow-md shadow-[#3B82F6]/30"
                      : "bg-blue-50 text-[#1D4ED8] border border-blue-200"
                  }`}
                >
                  <Flame className="h-3 w-3" />
                  {tier === "—" ? "Scoring…" : `${tier} · ${score}`}
                </motion.div>
              </AnimatePresence>

              {/* Signal breakdown */}
              <div className="w-full space-y-2">
                {[
                  { label: "Budget", val: 95 },
                  { label: "Authority", val: 88 },
                  { label: "Timeline", val: 92 },
                  { label: "Fit", val: 90 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-[9.5px] mb-0.5">
                      <span className="text-slate-500">{s.label}</span>
                      <span className="font-semibold text-[#0F2A4A] tabular-nums">
                        {phase === "asking" ? "—" : s.val}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-blue-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            phase === "asking" ? "0%" : `${s.val}%`,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Pipeline stage card (capture → qualify → score → route)
─────────────────────────────────────────────────────────────── */

function PipelineStage({
  Icon,
  step,
  title,
  body,
  active,
}: {
  Icon: typeof Target
  step: string
  title: string
  body: string
  active?: boolean
}) {
  return (
    <div
      className={`relative h-full rounded-2xl border p-5 transition-colors ${
        active
          ? "border-blue-300 bg-gradient-to-br from-blue-50 to-white shadow-[0_18px_40px_-24px_rgba(37,99,235,0.35)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`h-9 w-9 rounded-xl flex items-center justify-center shadow-md shrink-0 ${
            active
              ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shadow-[#3B82F6]/30"
              : "bg-slate-100"
          }`}
        >
          <Icon
            className={`h-4.5 w-4.5 ${active ? "text-white" : "text-slate-500"}`}
            strokeWidth={2.25}
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {step}
        </span>
      </div>
      <h3 className="text-[15px] font-semibold text-[#0F2A4A]">{title}</h3>
      <p className="mt-1.5 text-[12.5px] text-slate-500 leading-relaxed">
        {body}
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the four feature cards
─────────────────────────────────────────────────────────────── */

function CaptureVisual() {
  const channels = [
    { Icon: Globe, label: "Web chat" },
    { Icon: MessageSquare, label: "WhatsApp" },
    { Icon: Users, label: "Instagram" },
    { Icon: Phone, label: "Messenger" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="grid grid-cols-2 gap-2">
        {channels.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/40 px-2 py-1.5"
          >
            <c.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[10px] font-medium text-[#0F2A4A]">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-1.5 rounded-md bg-slate-50 border border-slate-200 px-2 py-1">
        <Filter className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] text-slate-500">
          All inbound → one queue
        </span>
      </div>
    </div>
  )
}

function QualifyVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/60 px-2 py-1.5">
        <span className="text-[8.5px] font-bold text-slate-400 line-through">
          Static form
        </span>
        <span className="text-[10px] text-slate-400 truncate">
          Name · Email · Phone…
        </span>
      </div>
      <div className="flex items-center justify-center text-blue-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="space-y-1.5">
        {[
          "Are you the decision maker?",
          "What's blocking you today?",
          "When do you need this live?",
        ].map((q) => (
          <div
            key={q}
            className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50/60 px-2 py-1"
          >
            <Sparkles className="h-2.5 w-2.5 text-[#1D4ED8] shrink-0" />
            <span className="text-[10px] text-[#0F2A4A]">{q}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreVisual() {
  const rows = [
    { name: "Priya N.", tier: "Hot", val: 92, hot: true },
    { name: "Marcus T.", tier: "Warm", val: 64, hot: false },
    { name: "Lena O.", tier: "Cool", val: 31, hot: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
        Ranked by readiness
      </p>
      {rows.map((r) => (
        <div
          key={r.name}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold ${
              r.hot
                ? "bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] text-white"
                : "bg-blue-50 text-[#1D4ED8] border border-blue-200"
            }`}
          >
            <Flame className="h-2 w-2" />
            {r.tier}
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A] truncate flex-1">
            {r.name}
          </span>
          <span className="text-[11px] font-semibold text-[#1D4ED8] tabular-nums">
            {r.val}
          </span>
        </div>
      ))}
    </div>
  )
}

function RouteVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50/60 px-2 py-1.5">
        <Flame className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] font-semibold text-[#0F2A4A] flex-1">
          Hot · Priya N. · 92
        </span>
        <span className="text-[8.5px] text-slate-400">now</span>
      </div>
      <div className="flex items-center justify-center text-blue-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1.5">
          <img
            src="https://i.pravatar.cc/40?img=32"
            alt="Dana R."
            loading="lazy"
            className="h-5 w-5 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-[9px] font-semibold text-[#0F2A4A] truncate">
              Dana R.
            </p>
            <p className="text-[8px] text-slate-400">rep · assigned</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50/40 px-2 py-1.5">
          <div className="h-5 w-5 rounded flex items-center justify-center bg-[#FF7A59]">
            <SiHubspot className="h-3 w-3 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold text-[#0F2A4A] truncate">
              CRM
            </p>
            <p className="text-[8px] text-emerald-600">written ✓</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Integrations list
─────────────────────────────────────────────────────────────── */

type IntCmp = React.ComponentType<{
  className?: string
  style?: React.CSSProperties
}>
const crmIntegrations: {
  name: string
  detail: string
  Icon?: IntCmp
  bg: string
  initial: string
}[] = [
  { name: "HubSpot", detail: "contacts, deals, lifecycle", Icon: SiHubspot, bg: "#FF7A59", initial: "H" },
  { name: "Salesforce", detail: "leads + opportunities", Icon: SiSalesforce, bg: "#00A1E0", initial: "S" },
  { name: "Pipedrive", detail: "pipeline stages", bg: "#1A1A1A", initial: "P" },
  { name: "Slack", detail: "hot-lead alerts", Icon: SiSlack, bg: "#4A154B", initial: "S" },
  { name: "Zapier", detail: "5,000+ apps", Icon: SiZapier, bg: "#FF4F00", initial: "Z" },
  { name: "Open API", detail: "build your own", bg: "#1D4ED8", initial: "{ }" },
]

/* ─────────────────────────────────────────────────────────────
   Sibling agent family
─────────────────────────────────────────────────────────────── */

const agentFamily: {
  to: string
  Icon: typeof Target
  title: string
  body: string
}[] = [
  {
    to: "/ai-agents/customer-service",
    Icon: MessageSquare,
    title: "Customer Service Agent",
    body: "Resolves tier-1 questions on every channel before they reach your team.",
  },
  {
    to: "/ai-agents/sales",
    Icon: TrendingUp,
    title: "Sales Agent",
    body: "Turns qualified leads into booked deals with proactive, on-brand follow-up.",
  },
  {
    to: "/ai-agents/booking",
    Icon: Clock,
    title: "Booking Agent",
    body: "Books meetings and demos straight into your calendar, round-the-clock.",
  },
  {
    to: "/ai-agents/agent-builder",
    Icon: Sparkles,
    title: "Agent Builder",
    body: "Compose your own agent with custom questions, scoring, and routing — no code.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQ content
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Which channels can the AI lead qualification agent capture from?",
    answer:
      "Web chat, WhatsApp, Instagram, Messenger, and more — every inbound lands in one place. The agent greets the visitor wherever they reach you, so no channel becomes a blind spot and nothing waits in a separate inbox to go stale.",
  },
  {
    question: "How does it actually qualify a lead?",
    answer:
      "Instead of a rigid form, the agent asks adaptive follow-up questions based on what the visitor says — team size, budget, timeline, decision-making authority, and fit. It captures structured fields as it goes, so by the end of the conversation you have a real, comparable lead record rather than a name and an email.",
  },
  {
    question: "How does scoring and routing work?",
    answer:
      "Every answer feeds an intent score. The agent ranks each lead by readiness so your team works the best opportunities first, then routes hot leads to the right rep instantly — by round-robin, territory, or your own rules — while colder leads drop into automated nurture.",
  },
  {
    question: "Does it sync to my CRM?",
    answer:
      "Yes. The agent writes contacts, qualification fields, and scores to your CRM in real time through 200+ native integrations — HubSpot, Salesforce, Pipedrive — plus Slack alerts, Zapier, and an open API for anything custom.",
  },
  {
    question: "Can it follow up on its own?",
    answer:
      "Yes. Leads that aren't sales-ready yet enter automated nurture across the same channels they came in on, so they stay warm until they convert — without a rep manually chasing each one.",
  },
  {
    question: "Why run lead qualification on FloatChat specifically?",
    answer:
      "It runs on the same platform as your sales agent, shared inbox, and campaigns. A lead the agent qualifies flows straight into follow-up and nurture with full context — no exports, no handoff gaps, one customer record from first message to closed deal.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function LeadQualificationAgentPage() {
  usePageMeta(metadata)

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Lead Qualification Agent",
    serviceType: "Agentic AI lead qualification and routing",
    description:
      "An agentic AI lead qualification agent that captures inbound on every channel, qualifies with adaptive questions, scores intent, and routes hot leads to the right rep while syncing to your CRM.",
    url: "https://www.floatchat.com/ai-agents/lead-qualification",
    provider: {
      "@type": "Organization",
      name: "FloatChat",
      url: "https://www.floatchat.com",
    },
    areaServed: "Worldwide",
  }

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />
      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div
            className="absolute inset-0 -z-20 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
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
                  <Target className="h-3.5 w-3.5" />
                  AI lead qualification agent
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.06]"
                >
                  An agentic AI lead qualification agent that{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                    feeds your pipeline.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Capture interest, ask the right questions, score intent, and
                  route hot leads to your team — automatically, the moment
                  someone reaches out.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Captures every channel",
                    "Scores in real time",
                    "Syncs to your CRM",
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
                  Built for sales teams that lose leads to slow follow-up.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <LeadScoreMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative border-y border-blue-100 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-blue-100">
              {[
                {
                  Icon: Globe,
                  stat: "Every channel",
                  label: "Captures web, WhatsApp & social in one queue",
                },
                {
                  Icon: Filter,
                  stat: "Dynamic Q&A",
                  label: "Qualifies with adaptive questions, not a static form",
                },
                {
                  Icon: Gauge,
                  stat: "Real time",
                  label: "Scores intent and routes the moment interest appears",
                },
                {
                  Icon: Database,
                  stat: "200+ syncs",
                  label: "Writes leads to your CRM as it qualifies",
                },
              ].map((s, i) => (
                <BlurFade key={s.stat} delay={i * 0.06}>
                  <div className="px-4 py-7 lg:px-6">
                    <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    <p className="mt-3 text-lg font-semibold text-[#0F2A4A]">
                      {s.stat}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-500 leading-relaxed">
                      {s.label}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE PROBLEM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Leads go cold in{" "}
                  <span className="text-[#1D4ED8]">minutes, not days.</span>
                </h2>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="space-y-5 text-[15px] text-slate-600 leading-relaxed">
                  <p>
                    The half-life of an inbound lead is brutal. Interest peaks
                    the second someone fills out a form or sends a message — and
                    then it decays fast. Wait an hour and the prospect has moved
                    on, opened three competitor tabs, or simply forgotten why
                    they reached out in the first place.
                  </p>
                  <p>
                    A static form can't fix that. It collects a name and an
                    email, but it can't ask a follow-up question, can't read
                    intent, and can't tell a tire-kicker from a buyer with
                    budget approved. So every lead lands in the same undifferentiated
                    pile, and your reps spend their best hours sorting instead of
                    selling.
                  </p>
                  <p>
                    A human can't close the gap either. Nobody answers every
                    inbound instantly at 2am, across five channels, while also
                    working live deals. The result is the same leak every team
                    knows: good leads slip through because no one got to them in
                    time.
                  </p>
                  <p className="text-[#0F2A4A] font-medium">
                    An agentic AI lead qualification agent qualifies the moment
                    interest appears — and hands your reps only the leads worth
                    their time.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── PIPELINE: CAPTURE → QUALIFY → SCORE → ROUTE ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="The pipeline" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One lead, four stages, zero delay.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Watch a single inbound move from first message to a hot,
                  routed, CRM-synced opportunity — without a human lifting a
                  finger.
                </p>
              </BlurFade>
            </div>

            <div className="relative grid gap-4 md:grid-cols-4">
              {/* connector line on desktop */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-[34px] left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200"
              />
              <BlurFade delay={0.05} className="h-full">
                <PipelineStage
                  Icon={Target}
                  step="01 — Capture"
                  title="Lead lands."
                  body="Priya messages on WhatsApp after viewing pricing. The agent greets her instantly."
                  active
                />
              </BlurFade>
              <BlurFade delay={0.13} className="h-full">
                <PipelineStage
                  Icon={Filter}
                  step="02 — Qualify"
                  title="Right questions."
                  body="It asks about team size, budget, and timeline — adapting to each answer."
                  active
                />
              </BlurFade>
              <BlurFade delay={0.21} className="h-full">
                <PipelineStage
                  Icon={Gauge}
                  step="03 — Score"
                  title="Intent ranked."
                  body="Signals roll up to a single score: Hot · 92. Budget approved, buying this quarter."
                  active
                />
              </BlurFade>
              <BlurFade delay={0.29} className="h-full">
                <PipelineStage
                  Icon={Route}
                  step="04 — Route"
                  title="Straight to a rep."
                  body="Assigned to Dana, written to HubSpot, and a Slack alert fires — in real time."
                  active
                />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT IT DOES ───── */}
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
                <SectionEyebrow num="03" label="What it does" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built to qualify, not just collect.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs the agent does on every inbound, automatically and
                  in the same conversation.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Globe,
                  title: "Captures everywhere.",
                  body: "Web chat, WhatsApp, Instagram, and Messenger all flow into one place. The agent meets each prospect on their channel, so no inbound ever sits unanswered in a silo.",
                  stat: { value: "1 queue", label: "for every channel" },
                  visual: <CaptureVisual />,
                },
                {
                  Icon: Filter,
                  title: "Qualifies dynamically.",
                  body: "Adaptive questions instead of a rigid form. The agent reads each answer and asks the next best question — capturing budget, authority, timeline, and fit as the conversation unfolds.",
                  stat: { value: "BANT+", label: "captured in chat" },
                  visual: <QualifyVisual />,
                },
                {
                  Icon: Gauge,
                  title: "Scores intent.",
                  body: "Every signal rolls into one readiness score and ranks leads against each other, so your team always works the best opportunities first instead of guessing.",
                  stat: { value: "Hot · 92", label: "ranked by readiness" },
                  visual: <ScoreVisual />,
                },
                {
                  Icon: Route,
                  title: "Routes and syncs.",
                  body: "Hot leads go to the right rep instantly — by round-robin, territory, or your rules — while everything is written to your CRM in real time and colder leads drop into nurture.",
                  stat: { value: "Real time", label: "rep + CRM, no delay" },
                  visual: <RouteVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <f.Icon
                          className="h-5 w-5 text-white"
                          strokeWidth={2.25}
                        />
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

                    <div className="mt-4 flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-[#1D4ED8] tabular-nums">
                        {f.stat.value}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {f.stat.label}
                      </p>
                    </div>

                    <div className="mt-4 flex-1 flex items-end">
                      <div className="w-full">{f.visual}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── SPEED-TO-LEAD SPOTLIGHT ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Speed to lead" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Every inbound gets an{" "}
                  <span className="text-[#1D4ED8]">instant</span> answer.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Response time is the single biggest lever on conversion. The
                  agent replies in seconds, around the clock — so interest never
                  has a chance to cool while a lead waits in a queue.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Replies 24/7",
                    "No queue, no missed inbound",
                    "Qualifies before a rep is free",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 text-[12px] font-medium text-[#1D4ED8]"
                    >
                      <Check className="h-3 w-3" />
                      {t}
                    </span>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-[0_20px_50px_-30px_rgba(37,99,235,0.20)]">
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-5">
                    Time to first response
                  </p>
                  <div className="space-y-5">
                    {[
                      {
                        label: "FloatChat agent",
                        time: "~5 seconds",
                        width: "8%",
                        good: true,
                      },
                      {
                        label: "Typical rep follow-up",
                        time: "~42 hours",
                        width: "100%",
                        good: false,
                      },
                    ].map((r) => (
                      <div key={r.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[13px] font-medium text-[#0F2A4A]">
                            {r.label}
                          </span>
                          <span
                            className={`text-[13px] font-semibold tabular-nums ${
                              r.good ? "text-[#1D4ED8]" : "text-slate-400"
                            }`}
                          >
                            {r.time}
                          </span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: r.width }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              r.good
                                ? "bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                                : "bg-slate-300"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50/60 border border-blue-200 px-4 py-3">
                    <Zap className="h-4 w-4 text-[#1D4ED8] shrink-0" />
                    <p className="text-[12.5px] text-[#0F2A4A] leading-snug">
                      Reach a lead in the first minutes and you're dramatically
                      more likely to qualify and convert. The agent makes that
                      the default, not the exception.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="05" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Reps stop chasing{" "}
                  <span className="text-[#1D4ED8]">dead ends.</span>
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  When qualification happens up front, your team spends its time
                  on leads that actually convert — and nothing falls through the
                  cracks. Because the agent runs on the same platform as your
                  sales agent, inbox, and campaigns, a qualified lead flows
                  straight into nurture and follow-up with full context.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: Flame,
                      title: "Only the leads worth their time.",
                      body: "Hot, scored leads arrive ranked and ready — reps work the top of the list, not the whole pile.",
                    },
                    {
                      Icon: CheckCircle2,
                      title: "Nothing slips through.",
                      body: "Every inbound is captured, scored, and either routed or nurtured. No more leads lost to a slow reply.",
                    },
                    {
                      Icon: Database,
                      title: "One customer record.",
                      body: "Qualification data is written to your CRM in real time, so context travels with the lead end to end.",
                    },
                    {
                      Icon: Sparkles,
                      title: "One connected platform.",
                      body: "Qualified leads flow straight into your sales agent and campaigns — no exports, no handoff gaps.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                        <c.Icon className="h-4.5 w-4.5 text-[#1D4ED8]" />
                      </div>
                      <h3 className="mt-3 text-[15px] font-semibold text-[#0F2A4A]">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] text-slate-500 leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── CRM / INTEGRATIONS STRIP ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="06" label="Connected" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Syncs to the CRM you already run.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Contacts, scores, and qualification fields write through in
                  real time — across 200+ integrations and an open API.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {crmIntegrations.map((it) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-[0_15px_30px_-15px_rgba(37,99,235,0.20)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-[11px] shadow-md ring-1 ring-black/5"
                      style={{ background: it.bg }}
                    >
                      {it.Icon ? (
                        <it.Icon
                          style={{ color: "#FFFFFF", width: 18, height: 18 }}
                        />
                      ) : (
                        it.initial
                      )}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {it.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {it.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Stop losing leads to slow follow-up."
          body="Capture, qualify, score, and route every inbound automatically — and sync it all to your CRM."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── AGENT FAMILY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="07" label="The family" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent for every job in the funnel.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Lead qualification is the front door. Pair it with the rest of
                  the FloatChat agent family — they share one inbox, one customer
                  record, and the same guardrails.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agentFamily.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed flex-1">
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

            {/* hub + related links */}
            <BlurFade delay={0.3}>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <Link
                  to="/ai-agents"
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)] flex items-center justify-between"
                >
                  <div
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <h3 className="text-lg font-semibold">See all AI agents</h3>
                    <p className="mt-1 text-[13px] text-white/80">
                      Compare the full agent family.
                    </p>
                  </div>
                  <ArrowUpRight className="relative h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                {[
                  {
                    to: "/integrations",
                    title: "Integrations",
                    body: "Every CRM, channel, and app the agent connects to.",
                  },
                  {
                    to: "/automation",
                    title: "Automation",
                    body: "Route, nurture, and follow up on autopilot.",
                  },
                ].map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="group rounded-3xl border border-slate-200 bg-white p-6 hover:border-blue-300 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-slate-500">
                        {r.body}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#1D4ED8] group-hover:translate-x-0.5 transition-transform" />
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
              title="Lead qualification questions"
              description="Channels, scoring, routing, and CRM sync — straight answers."
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

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-blue-200 bg-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Qualifying, scoring & routing in real time
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">
                  / START
                </span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
                  Feed your pipeline
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Stop losing leads to{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] bg-clip-text text-transparent">
                  slow follow-up.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Capture, qualify, score, and route every inbound automatically —
                and sync it all to your CRM.
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
                "Captures every channel",
                "Adaptive qualification",
                "Real-time scoring & routing",
                "200+ CRM integrations",
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
