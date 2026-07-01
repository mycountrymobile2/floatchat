"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  GitCompare,
  Check,
  X,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  DollarSign,
  Rocket,
  ShieldCheck,
  Layers,
  Clock,
  CalendarDays,
  PlugZap,
  MoveRight,
} from "lucide-react"
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
  title: "FloatChat vs Infobip — A Simpler Agentic AI Alternative",
  description:
    "Compare FloatChat and Infobip. Get agentic AI and omnichannel reach with setup in days and transparent USD pricing, without enterprise overhead.",
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
   Signature element — "days vs months" time-to-value timeline.
   Two stacked tracks racing to go-live: FloatChat lands in days,
   the enterprise track crawls through weeks and months of process.
─────────────────────────────────────────────────────────────── */

type TimelineStep = {
  when: string
  label: string
  detail: string
}

const floatchatTrack: TimelineStep[] = [
  { when: "Day 0", label: "Sign up", detail: "Pick a plan in USD, no quote cycle." },
  { when: "Day 1", label: "Connect channels", detail: "WhatsApp, SMS, web, and email in the console." },
  { when: "Day 2", label: "Train the agent", detail: "Point it at your help center, docs, and site." },
  { when: "Days 3–5", label: "Go live", detail: "Agentic AI answering real customers." },
]

const enterpriseTrack: TimelineStep[] = [
  { when: "Week 1", label: "Sales & scoping", detail: "Discovery calls before you can build." },
  { when: "Weeks 2–4", label: "Contract & pricing", detail: "Custom quote, procurement, legal review." },
  { when: "Months 1–2", label: "Onboarding", detail: "Solution engineering and integration work." },
  { when: "Months 2–3+", label: "Go live", detail: "Journeys mapped, sign-offs cleared." },
]

function TimelineRow({
  step,
  index,
  tone,
}: {
  step: TimelineStep
  index: number
  tone: "float" | "enterprise"
}) {
  const isFloat = tone === "float"
  return (
    <BlurFade delay={0.05 + index * 0.08}>
      <div className="relative pl-10">
        {/* node */}
        <span
          className={`absolute left-[11px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ${
            isFloat
              ? "bg-[#1D4ED8] ring-[#3B82F6]/20"
              : "bg-slate-300 ring-slate-200/70"
          }`}
        />
        <div
          className={`rounded-xl border px-4 py-3 ${
            isFloat
              ? "border-[#3B82F6]/25 bg-[#EAF2FF]"
              : "border-slate-200 bg-slate-50/60"
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                isFloat ? "text-[#1D4ED8]" : "text-slate-400"
              }`}
            >
              {step.when}
            </span>
            {isFloat && index === floatchatTrack.length - 1 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
                <Check className="h-2.5 w-2.5" strokeWidth={3} /> live
              </span>
            )}
          </div>
          <p
            className={`mt-0.5 text-sm font-semibold ${
              isFloat ? "text-[#0F2A4A]" : "text-slate-600"
            }`}
          >
            {step.label}
          </p>
          <p className="mt-0.5 text-[12.5px] text-slate-500 leading-snug">
            {step.detail}
          </p>
        </div>
      </div>
    </BlurFade>
  )
}

function SetupTimeline() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* FloatChat track */}
      <div className="rounded-3xl border border-[#3B82F6]/25 bg-white p-6 lg:p-7 shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
              <Rocket className="h-5 w-5 text-white" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F2A4A]">FloatChat</p>
              <p className="text-[11px] text-slate-500">go-live in days</p>
            </div>
          </div>
          <span className="text-2xl lg:text-3xl font-semibold text-[#1D4ED8] tabular-nums">
            ~5 days
          </span>
        </div>
        <div className="relative space-y-3">
          <span
            aria-hidden="true"
            className="absolute left-[17px] top-2 bottom-2 w-px bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8]"
          />
          {floatchatTrack.map((s, i) => (
            <TimelineRow key={s.label} step={s} index={i} tone="float" />
          ))}
        </div>
      </div>

      {/* Enterprise track */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-7">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-slate-500" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F2A4A]">
                Enterprise CPaaS
              </p>
              <p className="text-[11px] text-slate-500">typical onboarding</p>
            </div>
          </div>
          <span className="text-2xl lg:text-3xl font-semibold text-slate-400 tabular-nums">
            weeks–months
          </span>
        </div>
        <div className="relative space-y-3">
          <span
            aria-hidden="true"
            className="absolute left-[17px] top-2 bottom-2 w-px bg-slate-200"
          />
          {enterpriseTrack.map((s, i) => (
            <TimelineRow key={s.label} step={s} index={i} tone="enterprise" />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Comparison table
─────────────────────────────────────────────────────────────── */

type Cell = { text: string; kind: "yes" | "no" | "neutral" }
type CompareRow = { feature: string; float: Cell; infobip: Cell }

const compareRows: CompareRow[] = [
  {
    feature: "Agentic AI agents",
    float: { text: "Yes", kind: "yes" },
    infobip: { text: "Yes", kind: "yes" },
  },
  {
    feature: "Omnichannel messaging",
    float: { text: "WhatsApp, SMS, web, email & more", kind: "yes" },
    infobip: { text: "Broad channel suite", kind: "yes" },
  },
  {
    feature: "DID / phone numbers",
    float: { text: "Yes", kind: "yes" },
    infobip: { text: "Yes", kind: "yes" },
  },
  {
    feature: "Time to go live",
    float: { text: "Days", kind: "yes" },
    infobip: { text: "Weeks to months", kind: "no" },
  },
  {
    feature: "Pricing",
    float: { text: "Transparent USD, on the site", kind: "yes" },
    infobip: { text: "Enterprise quote cycle", kind: "no" },
  },
  {
    feature: "Setup approach",
    float: { text: "Self-serve, no journeys to map", kind: "yes" },
    infobip: { text: "Guided implementation", kind: "neutral" },
  },
  {
    feature: "Enterprise controls (SSO, audit, RBAC)",
    float: { text: "Yes", kind: "yes" },
    infobip: { text: "Yes", kind: "yes" },
  },
  {
    feature: "Global carrier network",
    float: { text: "Via partners", kind: "neutral" },
    infobip: { text: "Owned network", kind: "yes" },
  },
  {
    feature: "Best fit",
    float: { text: "SMB to mid-market", kind: "neutral" },
    infobip: { text: "Global enterprise", kind: "neutral" },
  },
]

function CellMark({ cell }: { cell: Cell }) {
  return (
    <div className="flex items-start gap-2">
      {cell.kind === "yes" && (
        <Check
          className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
          strokeWidth={3}
        />
      )}
      {cell.kind === "no" && (
        <X className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" strokeWidth={3} />
      )}
      {cell.kind === "neutral" && (
        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
      )}
      <span
        className={`text-[13px] leading-snug ${
          cell.kind === "no" ? "text-slate-400" : "text-[#0F2A4A]"
        }`}
      >
        {cell.text}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   "Where FloatChat goes further" cards
─────────────────────────────────────────────────────────────── */

const furtherCards = [
  {
    Icon: Zap,
    title: "Right-sized for your team",
    body: "Omnichannel reach and agentic AI without enterprise pricing or a heavyweight process — the capability you use, priced for a team that needs to move now.",
  },
  {
    Icon: Rocket,
    title: "Live in days, not months",
    body: "Connect your channels, point the agent at your knowledge base, and go. No pre-built journeys to map and no long solution-engineering cycle before value.",
  },
  {
    Icon: DollarSign,
    title: "Pricing you can read",
    body: "Transparent USD plans published on the site. You size your spend before you talk to anyone — no discovery calls just to learn what it costs.",
  },
  {
    Icon: ShieldCheck,
    title: "Enterprise-ready where it counts",
    body: "SSO, audit logs, and role-based access come standard, so security and IT get the controls they expect without the enterprise timeline.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Migration steps
─────────────────────────────────────────────────────────────── */

const migrationSteps = [
  {
    Icon: PlugZap,
    title: "Reconnect your channels",
    body: "Bring WhatsApp, SMS, web chat, and email onto FloatChat from one console — no re-architecting your stack.",
  },
  {
    Icon: Layers,
    title: "Bring your knowledge across",
    body: "Point the agent at the same help center, docs, and policies. It grounds its answers in your content, so there are no flows to rebuild.",
  },
  {
    Icon: Rocket,
    title: "Go live and iterate",
    body: "Launch to real traffic in days, then refine with analytics. Keep your enterprise contract running in parallel until you're ready to switch.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Related compare links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  { to: "/compare", label: "All comparisons", Icon: GitCompare, note: "See how FloatChat stacks up." },
  { to: "/compare/haptik", label: "vs Haptik", Icon: ArrowUpRight, note: "Agentic AI, simpler setup." },
  { to: "/compare/twilio", label: "vs Twilio", Icon: ArrowUpRight, note: "Omnichannel without the build." },
  { to: "/compare/twixor", label: "vs Twixor", Icon: ArrowUpRight, note: "Faster path to go-live." },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is FloatChat a real alternative to Infobip?",
    answer:
      "Yes. FloatChat gives you the two things most teams come to Infobip for — agentic AI agents and omnichannel reach across WhatsApp, SMS, web, email, and more — without the enterprise pricing and multi-month onboarding. Infobip is a global enterprise CPaaS with its own carrier network built for massive volume; FloatChat is the right-sized option for teams that want that capability without the overhead.",
  },
  {
    question: "How fast can we go live compared to an enterprise rollout?",
    answer:
      "Days. You sign up in USD, connect your channels, point the agent at your knowledge base, and launch — most teams are answering real customers within the first week. Enterprise CPaaS onboarding typically runs through sales scoping, custom contracts, and solution engineering before go-live, which stretches across weeks to months.",
  },
  {
    question: "Is FloatChat's pricing public?",
    answer:
      "Yes. FloatChat publishes transparent USD plans on the site, so you can size your spend before you talk to anyone. There's no mandatory quote cycle or procurement process just to understand what it costs.",
  },
  {
    question: "Is FloatChat enterprise-ready?",
    answer:
      "For the controls most teams need, yes — FloatChat includes SSO, audit logs, and role-based access controls. Where Infobip stands apart is its owned global carrier network and the breadth of a large CPaaS product suite; if your requirement is massive multi-region messaging volume on a single carrier network, that's Infobip's core strength.",
  },
  {
    question: "Can we migrate from Infobip without rebuilding everything?",
    answer:
      "In most cases, yes. You reconnect your channels in one console, bring your existing help center and docs across for the agent to ground on, and go live in days. Many teams run FloatChat alongside their existing contract until they're confident, then switch fully.",
  },
  {
    question: "Which channels does FloatChat support?",
    answer:
      "FloatChat covers the channels most customer-facing teams rely on — WhatsApp, SMS, web chat, and email among them — from one agent and one shared inbox, with the same customer context following the conversation across every channel.",
  },
]

const faqSchema = faqs

const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FloatChat vs Infobip — A Simpler Agentic AI Alternative",
  description:
    "Compare FloatChat and Infobip. Get agentic AI and omnichannel reach with setup in days and transparent USD pricing, without enterprise overhead.",
  url: "https://www.floatchat.com/compare/infobip",
  about: [
    { "@type": "Thing", name: "FloatChat" },
    { "@type": "Thing", name: "Infobip" },
  ],
  publisher: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function CompareInfobipPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqSchema} />
      <JsonLd schema={comparisonSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
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
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
            >
              <GitCompare className="h-3.5 w-3.5" />
              FloatChat vs Infobip · Infobip alternative
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
            >
              Agentic AI without the{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                enterprise overhead.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-[15px] lg:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              The same omnichannel reach and agentic AI Infobip is known for —
              right-sized for the businesses enterprise CPaaS prices out, with
              setup in days and transparent USD pricing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
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
              className="mt-5 text-sm text-slate-500"
            >
              Enterprise capability, without the enterprise process.
            </motion.p>
          </div>
        </section>

        {/* ───── SIGNATURE: SETUP TIMELINE ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="Time to value" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Days, not months, to your first resolved conversation.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The clearest difference between FloatChat and an enterprise
                  CPaaS is how fast you reach go-live. One track self-serves in a
                  week; the other runs through sales, contracts, and
                  implementation before a single customer is answered.
                </p>
              </BlurFade>
            </div>

            <SetupTimeline />

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
                {[
                  { Icon: Clock, text: "Live in days" },
                  { Icon: DollarSign, text: "Transparent USD pricing" },
                  { Icon: PlugZap, text: "Self-serve setup" },
                  { Icon: ShieldCheck, text: "SSO · audit · RBAC" },
                ].map((b) => (
                  <span key={b.text} className="flex items-center gap-1.5">
                    <b.Icon className="h-4 w-4 text-[#1D4ED8]" />
                    {b.text}
                  </span>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── COMPARISON TABLE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="At a glance" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  FloatChat vs Infobip, side by side.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Where the two overlap, and where each pulls ahead. Infobip is
                  built for global enterprise scale; FloatChat is built to get
                  right-sized teams live fast on transparent pricing.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.2)]">
                {/* header */}
                <div className="grid grid-cols-12 bg-slate-50/80 border-b border-slate-200">
                  <div className="col-span-4 px-4 py-4 lg:px-6">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-400">
                      Capability
                    </span>
                  </div>
                  <div className="col-span-4 px-4 py-4 lg:px-6 border-l border-slate-200 bg-[#EAF2FF]/60">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8]">
                      <Sparkles className="h-4 w-4" /> FloatChat
                    </span>
                  </div>
                  <div className="col-span-4 px-4 py-4 lg:px-6 border-l border-slate-200">
                    <span className="text-sm font-semibold text-slate-500">
                      Infobip
                    </span>
                  </div>
                </div>
                {/* rows */}
                {compareRows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-12 ${
                      i !== compareRows.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >
                    <div className="col-span-4 px-4 py-4 lg:px-6 flex items-center">
                      <span className="text-[13px] font-medium text-[#0F2A4A]">
                        {row.feature}
                      </span>
                    </div>
                    <div className="col-span-4 px-4 py-4 lg:px-6 border-l border-slate-100 bg-[#EAF2FF]/40 flex items-center">
                      <CellMark cell={row.float} />
                    </div>
                    <div className="col-span-4 px-4 py-4 lg:px-6 border-l border-slate-100 flex items-center">
                      <CellMark cell={row.infobip} />
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.15}>
              <p className="mt-5 text-center text-[12.5px] text-slate-400 max-w-2xl mx-auto">
                Infobip is a global enterprise CPaaS with its own carrier network
                and a broad product suite built for massive volume. FloatChat
                doesn&apos;t try to replace that scale — it right-sizes agentic AI
                and omnichannel reach for teams that need to move now.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHERE FLOATCHAT GOES FURTHER ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why teams switch" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Where FloatChat goes further.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  You get the channels and the AI you actually use, priced and
                  paced for a team that needs to move now.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {furtherCards.map((c, i) => (
                <BlurFade key={c.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
                <Link
                  to="/agentic-ai"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <Sparkles className="h-4 w-4 text-[#1D4ED8]" /> Explore agentic AI
                </Link>
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <Layers className="h-4 w-4 text-[#1D4ED8]" /> See the platform
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <DollarSign className="h-4 w-4 text-[#1D4ED8]" /> View pricing
                </Link>
                <Link
                  to="/integrations"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <PlugZap className="h-4 w-4 text-[#1D4ED8]" /> Integrations
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── MIGRATION ───── */}
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
                <SectionEyebrow num="04" label="Migration" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Move from Infobip without rebuilding.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Bring your channels and knowledge across, launch in days, and
                  keep your existing contract running in parallel until you&apos;re
                  ready to switch fully.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {migrationSteps.map((s, i) => (
                <BlurFade key={s.title} delay={0.05 + i * 0.1} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                        <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <span className="text-3xl font-semibold text-[#3B82F6]/20 tabular-nums">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                    {i !== migrationSteps.length - 1 && (
                      <MoveRight className="hidden md:block absolute top-1/2 -right-3 h-5 w-5 text-slate-300" />
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Get omnichannel agentic AI in days, not months."
          body="Start free on transparent USD pricing, or get a guided demo first."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED COMPARE LINKS ───── */}
        <section className="relative py-16 lg:py-20 bg-white border-t border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="flex items-end justify-between mb-8 gap-6">
                <div>
                  <SectionEyebrow num="05" label="Keep comparing" />
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0F2A4A]">
                    Other comparisons.
                  </h2>
                </div>
                <Link
                  to="/contact"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                >
                  Talk to us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedLinks.map((l, i) => (
                <BlurFade key={l.to} delay={0.05 + i * 0.07}>
                  <Link
                    to={l.to}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="h-9 w-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center">
                        <l.Icon className="h-4 w-4 text-[#1D4ED8]" />
                      </div>
                      <span className="text-sm font-semibold text-[#0F2A4A]">
                        {l.label}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-slate-500 leading-snug">
                      {l.note}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-[#1D4ED8] group-hover:gap-1.5 transition-all">
                      Compare <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="FloatChat vs Infobip — FAQ"
              description="Setup, pricing, migration, and enterprise readiness."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#0F2A4A]">
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, #1D4ED8 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#60A5FA]/30 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#93C5FD] mb-6">
                <Globe className="h-3.5 w-3.5" />
                Omnichannel · agentic · right-sized
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.08]">
                Get omnichannel agentic AI without the enterprise overhead.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                Live in days, priced in USD, with the controls your team expects.
                See why right-sized teams pick FloatChat over enterprise CPaaS.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.6)] transition-all"
                >
                  Start Free
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Questions about migrating from Infobip?{" "}
                <Link to="/contact" className="text-[#93C5FD] hover:text-white transition-colors">
                  Talk to our team
                </Link>
                .
              </p>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
