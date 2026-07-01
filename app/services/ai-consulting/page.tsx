"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Compass,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Target,
  Wrench,
  Rocket,
  GraduationCap,
  Plug,
  LineChart,
  ClipboardList,
  Users,
  ShieldCheck,
  Gauge,
  FileText,
  Layers,
  Building2,
  Store,
  Headset,
  BookOpen,
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
  title: "Agentic AI Consulting and Onboarding Services | FloatChat",
  description:
    "Launch agentic AI from proof-of-concept to production with FloatChat consulting and onboarding, including use-case scoping, build, and enablement.",
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
   HERO VISUAL — the engagement-journey surface.
   A phased roadmap (Scope → Build → Launch → Enable) rendered as a
   living timeline: an animated progress marker sweeps the arc from
   "POC" to "Production", lighting each phase and revealing its
   deliverables. Distinct from any product/chat mockup — this reads
   like a services engagement plan.
─────────────────────────────────────────────────────────────── */

type Phase = {
  key: string
  label: string
  week: string
  Icon: typeof Target
  deliverables: string[]
}

const roadmapPhases: Phase[] = [
  {
    key: "scope",
    label: "Scope",
    week: "Week 1",
    Icon: Target,
    deliverables: ["Use-case shortlist", "Success metrics", "Data audit"],
  },
  {
    key: "build",
    label: "Build",
    week: "Weeks 2–3",
    Icon: Wrench,
    deliverables: ["First agents trained", "Stack connected", "Guardrails set"],
  },
  {
    key: "launch",
    label: "Launch",
    week: "Week 4",
    Icon: Rocket,
    deliverables: ["Pilot live", "Handoff rules", "Live monitoring"],
  },
  {
    key: "enable",
    label: "Enable",
    week: "Ongoing",
    Icon: GraduationCap,
    deliverables: ["Team trained", "Runbook + docs", "Tuned on results"],
  },
]

function RoadmapVisual() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % roadmapPhases.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  // marker position across 4 phases -> 12.5% .. 87.5%
  const markerLeft = `${12.5 + active * 25}%`

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

      {/* Floating "from → to" chips */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Compass className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          POC → Production
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Live in ~4 weeks
        </span>
      </motion.div>

      {/* Main surface */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50/80">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0F2A4A]">
            <Layers className="h-3.5 w-3.5 text-[#1D4ED8]" />
            Engagement roadmap
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            In progress
          </span>
        </div>

        <div className="px-4 sm:px-6 pt-6 pb-5">
          {/* The arc / timeline */}
          <div className="relative mb-6">
            {/* endpoint labels */}
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-500">
                Proof of concept
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
                <CheckCircle2 className="h-2.5 w-2.5" /> Production
              </span>
            </div>

            {/* track */}
            <div className="relative h-1.5 rounded-full bg-slate-100">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8]"
                animate={{ width: `${25 + active * 25}%` }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* nodes */}
              {roadmapPhases.map((p, i) => (
                <span
                  key={p.key}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${12.5 + i * 25}%` }}
                >
                  <span
                    className={`block h-3 w-3 rounded-full border-2 transition-colors duration-300 ${
                      i <= active
                        ? "bg-[#1D4ED8] border-white"
                        : "bg-white border-slate-300"
                    }`}
                  />
                </span>
              ))}
              {/* sweeping marker */}
              <motion.span
                className="absolute -top-1.5 -translate-x-1/2 h-4.5 w-4.5"
                animate={{ left: markerLeft }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block h-4 w-4 rounded-full bg-white ring-2 ring-[#1D4ED8] shadow-[0_2px_8px_rgba(29,78,216,0.4)] flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1D4ED8]" />
                </span>
              </motion.span>
            </div>
          </div>

          {/* Phase columns */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {roadmapPhases.map((p, i) => {
              const isActive = i === active
              const isDone = i < active
              return (
                <motion.div
                  key={p.key}
                  animate={{
                    borderColor: isActive
                      ? "rgba(59,130,246,0.45)"
                      : "rgba(226,232,240,1)",
                    boxShadow: isActive
                      ? "0 0 0 3px rgba(59,130,246,0.08)"
                      : "0 0 0 0 rgba(0,0,0,0)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border bg-white p-2 sm:p-2.5 flex flex-col"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive || isDone
                          ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-3 w-3" strokeWidth={3} />
                      ) : (
                        <p.Icon className="h-3 w-3" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-[#0F2A4A] leading-tight truncate">
                        {p.label}
                      </p>
                      <p className="text-[8px] text-slate-400 truncate">
                        {p.week}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-2 space-y-1">
                    {p.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-1"
                      >
                        <CheckCircle2
                          className={`h-2.5 w-2.5 mt-[1px] shrink-0 ${
                            isActive || isDone
                              ? "text-emerald-500"
                              : "text-slate-300"
                          }`}
                        />
                        <span
                          className={`text-[8.5px] leading-tight ${
                            isActive || isDone
                              ? "text-[#0F2A4A]"
                              : "text-slate-400"
                          }`}
                        >
                          {d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer stat strip */}
        <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50/50">
          {[
            { Icon: Users, label: "Dedicated team" },
            { Icon: ShieldCheck, label: "Guardrails set" },
            { Icon: Gauge, label: "Tuned live" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-center gap-1.5 px-2 py-2.5 border-r last:border-r-0 border-slate-200"
            >
              <s.Icon className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[9px] font-medium text-[#0F2A4A]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   "What we do" service cards
─────────────────────────────────────────────────────────────── */

const services = [
  {
    Icon: Target,
    title: "Use-case scoping",
    body: "We map your workflows to the highest-impact agentic AI opportunities, define success metrics, and audit the data an agent needs — so you build the right thing first, not everything at once.",
  },
  {
    Icon: Wrench,
    title: "Build & train",
    body: "We stand up and train your first agents on your knowledge base, connect your CRM, helpdesk, and commerce tools, and set the guardrails that keep every action safe and on-brand.",
  },
  {
    Icon: GraduationCap,
    title: "Enablement",
    body: "We get your team productive fast with hands-on onboarding, a runbook, and clear ownership — then tune the agents after launch based on real results, not guesswork.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Deliverables / outcomes
─────────────────────────────────────────────────────────────── */

const deliverables = [
  {
    Icon: ClipboardList,
    title: "A prioritized use-case plan",
    body: "A shortlist of agentic AI use cases ranked by impact and effort, with the metrics you'll measure them against.",
  },
  {
    Icon: Layers,
    title: "Trained, production-ready agents",
    body: "Your first agents live and grounded in your data — not a demo that falls over on real questions.",
  },
  {
    Icon: Plug,
    title: "A connected stack",
    body: "CRM, helpdesk, and commerce tools wired in so agents act on real data, with guardrails on every action.",
  },
  {
    Icon: FileText,
    title: "A runbook your team owns",
    body: "Documentation, ownership, and escalation rules so the platform keeps running long after we hand off.",
  },
  {
    Icon: Users,
    title: "An enabled team",
    body: "Your people trained on the platform and confident to build, monitor, and iterate without waiting on us.",
  },
  {
    Icon: LineChart,
    title: "Results you can see",
    body: "Post-launch tuning against live data, so the agents get measurably better in the weeks after go-live.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Who it's for
─────────────────────────────────────────────────────────────── */

const audiences = [
  {
    Icon: Building2,
    title: "Teams new to agentic AI",
    body: "You know AI belongs in your workflows but want an expert to scope the first use case and de-risk the build.",
  },
  {
    Icon: Store,
    title: "Growing e-commerce & retail",
    body: "Support and sales volume is outpacing headcount, and you need agents live on real orders — fast.",
  },
  {
    Icon: Headset,
    title: "Support & CX leaders",
    body: "You want deflection and resolution without a six-month project, plus a team trained to run it.",
  },
  {
    Icon: Rocket,
    title: "Scale-ups moving off a POC",
    body: "You have a proof-of-concept that works and need help taking it to reliable, monitored production.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Cross-links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "See what agents that reason and act can do for your business.",
  },
  {
    to: "/platform",
    Icon: Layers,
    title: "The Platform",
    body: "The foundation your agents run on — build, connect, and monitor.",
  },
  {
    to: "/ai-agents",
    Icon: Users,
    title: "AI Agents",
    body: "Prebuilt agents for support, sales, booking, and lead qualification.",
  },
  {
    to: "/why-floatchat",
    Icon: ShieldCheck,
    title: "Why FloatChat",
    body: "Why teams pick FloatChat to go from idea to live agents.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What does an AI consulting engagement include?",
    answer:
      "A full path from proof-of-concept to production: we scope your highest-impact use cases, build and train your first agents on your data, connect your CRM, helpdesk, and commerce tools, onboard your team, and tune the agents after launch based on real results. You end up with production-ready agents and a team that knows the platform.",
  },
  {
    question: "How long does it take to go live?",
    answer:
      "Most engagements move from scoping to a live pilot in around four weeks — Scope in week one, Build across weeks two and three, and Launch in week four — then continue with ongoing enablement and tuning. The exact timeline depends on how many use cases you start with and how ready your data is.",
  },
  {
    question: "Do we need technical staff or developers?",
    answer:
      "No. The FloatChat platform is no-code, and our team handles the setup, training, and integrations with you. Your people focus on the use cases and the outcomes. We also train your team so they can build and iterate on their own after launch.",
  },
  {
    question: "What's the difference between this and just buying the platform?",
    answer:
      "The platform gets you the tools; consulting gets you results. We help you skip the trial-and-error — scoping the right use cases, avoiding common pitfalls, and launching agents that deliver from day one rather than after months of tuning. You still own everything at the end.",
  },
  {
    question: "Which tools can you connect?",
    answer:
      "Your CRM, helpdesk, and commerce tools, among others, using FloatChat's prebuilt connectors plus a REST API and webhooks. During scoping we audit the systems your agents need to read from and act on, then wire them in during the build phase with guardrails on every action.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We don't disappear at go-live. Enablement is ongoing: your team is trained, you get a runbook you own, and we tune the agents against live results so they get measurably better in the weeks after launch. From there, your team can keep building on the same platform.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI Consulting and Onboarding",
  serviceType: "Agentic AI consulting, onboarding, and enablement",
  description:
    "Consulting and onboarding services that take agentic AI from proof-of-concept to production — use-case scoping, agent build and training, stack integration, team enablement, and post-launch optimization.",
  url: "https://www.floatchat.com/services/ai-consulting",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType:
      "Businesses launching agentic AI, support and CX leaders, and scale-ups moving from proof-of-concept to production",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AiConsultingServicesPage() {
  usePageMeta(metadata)

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
                  <Compass className="h-3.5 w-3.5" />
                  Consulting & Onboarding · from POC to production
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI consulting that{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    gets you to production.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  From proof-of-concept to production, we scope your use cases,
                  build and train your first agents, and enable your team — so
                  you launch agentic AI that actually delivers.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Use-case scoping",
                    "Build & train",
                    "Team enablement",
                    "Live in ~4 weeks",
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
                      to="/contact"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Talk to Us
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
                  Expert help to get live faster — with a team that knows the
                  platform.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <RoadmapVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Compass, value: "POC → Prod", label: "end-to-end engagement" },
                { Icon: Rocket, value: "~4 wk", label: "to a live pilot" },
                { Icon: Plug, value: "CRM+", label: "helpdesk & commerce connected" },
                { Icon: GraduationCap, value: "Your team", label: "trained to run it" },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-[27px] font-semibold text-[#0F2A4A] leading-none">
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

        {/* ───── WHAT WE DO ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="What we do" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Scope, build, enable — done with you.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Three pillars carry every engagement from the first use case
                  to a launched, tuned agent your team owns.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <BlurFade key={s.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                      <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
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

        {/* ───── ENGAGEMENT ROADMAP ───── */}
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
                <SectionEyebrow num="02" label="The engagement" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A phased path, not a black box.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four phases take you from a proof-of-concept to production —
                  each with a clear owner, deliverables, and a timeline you can
                  plan around.
                </p>
              </BlurFade>
            </div>

            <div className="relative">
              {/* connecting line on lg */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-[38px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8]"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {roadmapPhases.map((p, i) => (
                  <BlurFade key={p.key} delay={0.05 + i * 0.1}>
                    <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="relative h-[52px] w-[52px] rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                          <p.Icon className="h-6 w-6 text-white" strokeWidth={2.25} />
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          0{i + 1}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-[#0F2A4A]">
                          {p.label}
                        </h3>
                        <span className="rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-[10px] font-medium text-[#1D4ED8]">
                          {p.week}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {p.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-[13px] text-slate-600 leading-snug">
                              {d}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </div>

            {/* Why it works */}
            <BlurFade delay={0.2}>
              <div className="mt-10 rounded-3xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#3B82F6]/[0.07] via-[#3B82F6]/[0.03] to-transparent p-7 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#3B82F6]/20 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-[#1D4ED8]" />
                  </div>
                  <p className="text-base lg:text-lg text-[#0F2A4A] leading-relaxed">
                    You skip the trial-and-error and launch agentic AI that
                    delivers from day one —{" "}
                    <span className="font-semibold">
                      with a team that knows the platform
                    </span>{" "}
                    and can keep building after we hand off.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── DELIVERABLES / OUTCOMES ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="What you get" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Deliverables, not slideware.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every engagement ends with working agents and the assets your
                  team needs to run them.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, i) => (
                <BlurFade key={d.title} delay={0.05 + i * 0.06} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                        <d.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#0F2A4A] leading-snug pt-1.5">
                        {d.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[13.5px] text-slate-500 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHO IT'S FOR ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="04" label="Who it's for" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built for teams launching agentic AI.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Whether you&apos;re starting from scratch or scaling a
                  proof-of-concept, we meet you where you are.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {audiences.map((a, i) => (
                <BlurFade key={a.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2A4A] leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                      {a.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Ready to scope your first agentic AI use case?"
          body="Bring your workflows — we'll map the highest-impact opportunity and a plan to launch it."
          primaryLabel="Talk to Us"
          primaryHref="/contact"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED / CROSS-LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What we&apos;ll help you build.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  See the agents, platform, and approach behind every
                  engagement.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((r, i) => (
                <BlurFade key={r.to} delay={0.05 + i * 0.07} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                        <r.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-[#0F2A4A]">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {r.body}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="text-slate-400">More:</span>
                {[
                  { to: "/partnerships", label: "Partnerships", Icon: Users },
                  { to: "/pricing", label: "Pricing", Icon: LineChart },
                  { to: "/ai-agents", label: "Prebuilt agents", Icon: BookOpen },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="inline-flex items-center gap-1.5 font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    <l.Icon className="h-4 w-4" />
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5" />
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
              title="AI consulting, answered"
              description="How engagements work, what you get, and what happens after launch."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#0F2A4A]">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(96,165,250,0.3), transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-[#BFD4FF]">
                <Rocket className="h-3.5 w-3.5" />
                From proof-of-concept to production
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                Launch agentic AI with expert help.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Scope the right use case, build production-ready agents, and
                enable your team — all with a partner who knows the platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                >
                  Talk to Us
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
              <p className="mt-5 text-sm text-slate-400">
                Expert help to get live faster.
              </p>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
