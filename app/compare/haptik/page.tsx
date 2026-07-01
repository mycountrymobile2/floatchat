"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Check,
  X,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Bot,
  Inbox,
  Megaphone,
  Phone,
  Plug,
  DollarSign,
  Rocket,
  GitBranch,
  ShieldCheck,
  Globe,
  Zap,
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
  title: "FloatChat vs Haptik — A Complete Agentic AI Alternative",
  description:
    "Compare FloatChat and Haptik. Same agentic AI, plus broadcasting, numbers, and 200+ integrations, at transparent USD pricing.",
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
   SIGNATURE ELEMENT — the FloatChat vs Haptik comparison table.
   FloatChat column highlighted blue; emerald ✓ for "included",
   neutral gray ✕ for "not included / limited".
─────────────────────────────────────────────────────────────── */

type Cell =
  | { kind: "yes"; note: string }
  | { kind: "no"; note: string }
  | { kind: "text"; note: string }

type CompareRow = {
  Icon: typeof Bot
  feature: string
  detail: string
  floatchat: Cell
  haptik: Cell
}

const compareRows: CompareRow[] = [
  {
    Icon: Bot,
    feature: "Agentic AI",
    detail: "Reasons over your data and completes multi-step tasks",
    floatchat: { kind: "yes", note: "Core of the platform" },
    haptik: { kind: "text", note: "Yes — its flagship focus" },
  },
  {
    Icon: Inbox,
    feature: "Omnichannel inbox",
    detail: "One shared inbox across every channel",
    floatchat: { kind: "yes", note: "Unified team inbox" },
    haptik: { kind: "text", note: "Available" },
  },
  {
    Icon: Megaphone,
    feature: "Broadcasting & campaigns",
    detail: "Bulk WhatsApp sends, templates, and audiences",
    floatchat: { kind: "yes", note: "Built in" },
    haptik: { kind: "no", note: "Not the core focus" },
  },
  {
    Icon: Phone,
    feature: "Numbers & DID provisioning",
    detail: "Get and manage your own numbers in-platform",
    floatchat: { kind: "yes", note: "Numbers included" },
    haptik: { kind: "no", note: "Bring your own / partner" },
  },
  {
    Icon: Plug,
    feature: "Integrations",
    detail: "Connect CRMs, commerce, and workflow tools",
    floatchat: { kind: "yes", note: "200+ integrations" },
    haptik: { kind: "text", note: "Core connectors" },
  },
  {
    Icon: DollarSign,
    feature: "Pricing model",
    detail: "How you understand what you'll pay",
    floatchat: { kind: "text", note: "Transparent USD, self-serve" },
    haptik: { kind: "text", note: "Custom / sales-led quote" },
  },
  {
    Icon: Rocket,
    feature: "Setup & time to launch",
    detail: "From sign-up to a live agent",
    floatchat: { kind: "text", note: "Self-serve, days" },
    haptik: { kind: "text", note: "Guided onboarding" },
  },
]

function CellMark({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.kind === "yes") {
    return (
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 shrink-0">
          <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
        </span>
        <span
          className={`text-[13px] leading-snug ${
            highlight ? "text-[#0F2A4A] font-medium" : "text-slate-600"
          }`}
        >
          {cell.note}
        </span>
      </div>
    )
  }
  if (cell.kind === "no") {
    return (
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 shrink-0">
          <X className="h-3 w-3 text-slate-400" strokeWidth={3} />
        </span>
        <span className="text-[13px] leading-snug text-slate-500">
          {cell.note}
        </span>
      </div>
    )
  }
  return (
    <span
      className={`text-[13px] leading-snug ${
        highlight ? "text-[#0F2A4A] font-medium" : "text-slate-600"
      }`}
    >
      {cell.note}
    </span>
  )
}

function ComparisonTable() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.28)]">
      {/* Header row */}
      <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/70">
        <div className="col-span-12 sm:col-span-5 px-5 py-4">
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-400">
            Capability
          </span>
        </div>
        <div className="col-span-6 sm:col-span-4 px-5 py-4 bg-gradient-to-b from-[#EAF2FF] to-[#EAF2FF]/40 border-l border-[#3B82F6]/20">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-sm font-semibold text-[#1D4ED8]">
              FloatChat
            </span>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3 px-5 py-4 border-l border-slate-200">
          <span className="text-sm font-semibold text-slate-500">Haptik</span>
        </div>
      </div>

      {/* Rows */}
      {compareRows.map((row, i) => (
        <div
          key={row.feature}
          className={`grid grid-cols-12 items-stretch ${
            i !== compareRows.length - 1 ? "border-b border-slate-100" : ""
          }`}
        >
          {/* Feature label */}
          <div className="col-span-12 sm:col-span-5 px-5 py-4 flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF] shrink-0">
              <row.Icon className="h-4 w-4 text-[#1D4ED8]" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#0F2A4A] leading-tight">
                {row.feature}
              </p>
              <p className="mt-0.5 text-[12px] text-slate-500 leading-snug">
                {row.detail}
              </p>
            </div>
          </div>

          {/* FloatChat — highlighted */}
          <div className="col-span-6 sm:col-span-4 px-5 py-4 bg-[#EAF2FF]/40 border-l border-[#3B82F6]/20 flex items-center">
            <CellMark cell={row.floatchat} highlight />
          </div>

          {/* Haptik */}
          <div className="col-span-6 sm:col-span-3 px-5 py-4 border-l border-slate-100 flex items-center">
            <CellMark cell={row.haptik} />
          </div>
        </div>
      ))}

      {/* Footer disclaimer */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-5 py-3">
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Positioning comparison based on FloatChat&apos;s platform scope.
          Haptik&apos;s capabilities and pricing vary by plan and region — check
          their site for current details.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   "Where FloatChat goes further" cards
─────────────────────────────────────────────────────────────── */

const furtherCards = [
  {
    Icon: Megaphone,
    title: "Broadcasting is built in.",
    body: "Run bulk WhatsApp campaigns, reusable templates, and segmented audiences from the same platform that answers your inbound — no separate broadcast tool bolted on.",
    points: ["Template campaigns", "Audience segments", "Delivery insights"],
  },
  {
    Icon: Phone,
    title: "Get numbers, not just a bot.",
    body: "Provision and manage numbers and DIDs directly in FloatChat, so your agentic AI, your inbox, and your outbound all share one setup instead of stitching vendors together.",
    points: ["In-platform numbers", "Managed provisioning", "One vendor"],
  },
  {
    Icon: Plug,
    title: "200+ integrations, connected.",
    body: "Wire the agent into your CRM, commerce stack, and workflow tools with a library of 200+ integrations — so it can look things up and take real actions, not just chat.",
    points: ["CRM & commerce", "Workflow automations", "Open API & webhooks"],
  },
  {
    Icon: DollarSign,
    title: "Transparent USD pricing.",
    body: "See what you'll pay before you talk to anyone. Start free, upgrade when you're ready, and scale on clear USD pricing instead of waiting on a custom, sales-led quote.",
    points: ["Start free", "Self-serve upgrade", "No hidden per-resolution surprises"],
  },
]

/* ─────────────────────────────────────────────────────────────
   Migration / switch steps
─────────────────────────────────────────────────────────────── */

const switchSteps = [
  {
    step: "01",
    title: "Point the agent at your knowledge.",
    body: "Connect your help center, docs, and website. The agentic AI grounds itself in your content — no journeys to rebuild from scratch.",
  },
  {
    step: "02",
    title: "Reconnect your channels & numbers.",
    body: "Bring WhatsApp, web chat, and email into one inbox, and provision numbers in-platform. Keep the flows that work; drop the ones you don't.",
  },
  {
    step: "03",
    title: "Layer on broadcasting & integrations.",
    body: "Add campaigns, audiences, and your CRM and commerce connectors so the agent can resolve and act — not just answer.",
  },
  {
    step: "04",
    title: "Go live on transparent pricing.",
    body: "Launch with self-serve USD pricing. Start free, watch resolution rates, and scale when the numbers make sense.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Related compare links
─────────────────────────────────────────────────────────────── */

const relatedCompare = [
  {
    to: "/compare/twilio",
    label: "FloatChat vs Twilio",
    body: "A complete agent + inbox, not just messaging APIs.",
  },
  {
    to: "/compare/twixor",
    label: "FloatChat vs Twixor",
    body: "Agentic AI with broadcasting and 200+ integrations.",
  },
  {
    to: "/compare/infobip",
    label: "FloatChat vs Infobip",
    body: "Omnichannel CX at transparent, self-serve pricing.",
  },
  {
    to: "/compare",
    label: "All comparisons",
    body: "See how FloatChat stacks up across the market.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is FloatChat a real alternative to Haptik?",
    answer:
      "Yes. FloatChat offers the same class of agentic AI — an agent that reasons over your data and completes multi-step tasks — and adds broadcasting, in-platform numbers, and 200+ integrations on top. For most teams evaluating Haptik, FloatChat covers the same conversational-AI ground while consolidating tools you'd otherwise buy separately.",
  },
  {
    question: "How is the agentic AI different from a scripted chatbot?",
    answer:
      "An agentic AI doesn't follow pre-built decision trees. It reasons over your connected knowledge and tools to resolve a request end to end — looking things up, taking an action, and escalating with context when a human is needed. That's the same modern approach Haptik is known for, and it's the core of FloatChat too.",
  },
  {
    question: "What does FloatChat add beyond agentic AI?",
    answer:
      "Broadcasting and campaigns, number and DID provisioning inside the platform, a unified omnichannel inbox, and a library of 200+ integrations. The goal is one platform for inbound resolution and outbound engagement, rather than a bot in one tool and campaigns in another.",
  },
  {
    question: "How does FloatChat's pricing compare to Haptik's?",
    answer:
      "FloatChat publishes transparent USD pricing you can start with self-serve — begin free and upgrade when you're ready. Haptik's pricing is typically arranged through a sales-led custom quote. We don't publish Haptik's numbers here; check their site for current details and compare against our public plans.",
  },
  {
    question: "How hard is it to switch?",
    answer:
      "Most teams move in stages: point the agent at your knowledge base, reconnect channels and numbers, then layer on broadcasting and integrations. Because the agent grounds itself in your content instead of hand-built journeys, there's far less to rebuild than a migration usually implies.",
  },
  {
    question: "Can I try FloatChat before committing?",
    answer:
      "Yes — start free and build a working agent without talking to sales. When you want a walkthrough of broadcasting, numbers, or specific integrations, book a demo and we'll tailor it to your stack.",
  },
]

const faqSchema = faqs

const compareSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FloatChat vs Haptik — A Complete Agentic AI Alternative",
  description:
    "Compare FloatChat and Haptik. Same agentic AI, plus broadcasting, numbers, and 200+ integrations, at transparent USD pricing.",
  url: "https://www.floatchat.com/compare/haptik",
  isPartOf: {
    "@type": "WebSite",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  about: [
    { "@type": "Thing", name: "FloatChat" },
    { "@type": "Thing", name: "Haptik" },
  ],
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function CompareHaptikPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqSchema} />
      <JsonLd schema={compareSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-white">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-16 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
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
                "radial-gradient(ellipse 70% 55% at 50% 40%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 55% at 50% 40%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/25 bg-[#1D4ED8]/5 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
            >
              <GitBranch className="h-3.5 w-3.5" />
              FloatChat vs Haptik
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
            >
              A complete agentic AI{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                alternative to Haptik.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-[15px] lg:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Same agentic AI — an agent that reasons over your data and resolves
              real tasks — plus broadcasting, numbers, and 200+ integrations, at
              transparent USD pricing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500"
            >
              {[
                "Same agentic AI",
                "Broadcasting included",
                "Numbers & 200+ integrations",
                "Transparent USD pricing",
              ].map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───── AT-A-GLANCE COMPARISON TABLE (signature) ───── */}
        <section className="relative py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <BlurFade>
                <SectionEyebrow num="01" label="At a glance" />
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#0F2A4A] leading-[1.06]">
                  FloatChat vs Haptik, feature by feature.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Where the two overlap, and where FloatChat brings more into one
                  platform. Emerald means included; gray means not the focus.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <ComparisonTable />
            </BlurFade>

            <BlurFade delay={0.15}>
              <p className="mt-6 text-center text-sm text-slate-500">
                Want the full picture?{" "}
                <Link
                  to="/platform"
                  className="font-medium text-[#1D4ED8] hover:text-[#1E40AF] underline underline-offset-2"
                >
                  Explore the platform
                </Link>{" "}
                or{" "}
                <Link
                  to="/pricing"
                  className="font-medium text-[#1D4ED8] hover:text-[#1E40AF] underline underline-offset-2"
                >
                  see transparent pricing
                </Link>
                .
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHERE FLOATCHAT GOES FURTHER ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
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
                <SectionEyebrow num="02" label="Where FloatChat goes further" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The agentic AI, plus everything around it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Haptik does agentic AI well. FloatChat matches it — then folds
                  in the broadcasting, numbers, and integrations most teams end up
                  buying separately.
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
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.points.map((p) => (
                        <li
                          key={p}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/20 bg-[#EAF2FF] px-3 py-1 text-[12px] font-medium text-[#1D4ED8]"
                        >
                          <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Consolidation callout */}
            <BlurFade delay={0.2}>
              <div className="mt-10 rounded-3xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#EAF2FF] via-white to-white p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]">
                      <Zap className="h-6 w-6 text-white" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1D4ED8]">
                        One platform
                      </p>
                      <p className="text-[13px] text-slate-500">
                        instead of a stack of tools
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Inbound resolution and outbound engagement live in the same
                    place — agent, inbox, broadcasts, numbers, and integrations —
                    so there&apos;s one setup to run and one bill to reason about.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── MIGRATION / SWITCH ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <BlurFade className="lg:col-span-4">
                <SectionEyebrow num="03" label="Switching" />
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-[#0F2A4A] leading-[1.06]">
                  Moving from Haptik is a staged rollout, not a rebuild.
                </h2>
                <p className="mt-5 text-base text-slate-500 leading-relaxed">
                  Because the agent grounds itself in your content instead of
                  hand-built journeys, there&apos;s far less to migrate than most
                  switches imply.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    to="/agentic-ai"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF]"
                  >
                    <Bot className="h-4 w-4" /> How the agentic AI works
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/integrations"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF]"
                  >
                    <Plug className="h-4 w-4" /> Browse 200+ integrations
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.12} className="lg:col-span-8">
                <ol className="relative space-y-5">
                  {switchSteps.map((s) => (
                    <li
                      key={s.step}
                      className="relative flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 lg:p-6 hover:border-slate-300 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.25)] transition-all"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] font-mono text-sm font-semibold text-[#1D4ED8] shrink-0">
                        {s.step}
                      </span>
                      <div>
                        <h3 className="text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {s.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="See FloatChat next to your Haptik setup"
          body="Start free with the same agentic AI, plus broadcasting, numbers, and 200+ integrations."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED COMPARE LINKS ───── */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <BlurFade>
                <SectionEyebrow num="04" label="Keep comparing" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0F2A4A] leading-[1.08]">
                  How FloatChat compares elsewhere.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompare.map((r, i) => (
                <BlurFade key={r.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.25)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
                        <GitBranch className="h-4 w-4 text-[#1D4ED8]" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#1D4ED8] transition-colors" />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#0F2A4A]">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[12.5px] text-slate-500 leading-snug">
                      {r.body}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="FloatChat vs Haptik — FAQ"
              description="Common questions about switching, pricing, and what's included."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#0F2A4A] to-[#0B1E38]">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59,130,246,0.35), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#93C5FD]">
                <Sparkles className="h-3.5 w-3.5" />
                The complete alternative
              </div>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                Get the agentic AI — and everything around it.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
                Start free with the same agentic AI you&apos;d expect from Haptik,
                plus broadcasting, numbers, and 200+ integrations, on transparent
                USD pricing.
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
                  to="/contact"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#60A5FA]" /> No credit card to start
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#60A5FA]" /> Omnichannel from day one
                </span>
                <span className="flex items-center gap-1.5">
                  <SiWhatsapp style={{ color: "#60A5FA", width: 14, height: 14 }} /> WhatsApp ready
                </span>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
