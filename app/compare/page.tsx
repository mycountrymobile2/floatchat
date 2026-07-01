"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  GitCompareArrows,
  Check,
  X,
  Minus,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Bot,
  Phone,
  Hash,
  Megaphone,
  Blocks,
  Plug,
  DollarSign,
  Clock,
  ShieldCheck,
  Layers,
  Rocket,
  Code2,
  Boxes,
  Globe,
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
  title: "FloatChat vs Haptik vs Twilio vs Twixor vs Infobip",
  description:
    "Compare FloatChat, Haptik, Twilio, Twixor, and Infobip on agentic AI, voice, numbers, broadcasting, integrations, and pricing.",
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
   Vendors (columns of the matrix)
─────────────────────────────────────────────────────────────── */

type VendorKey = "floatchat" | "haptik" | "twilio" | "twixor" | "infobip"

const VENDORS: { key: VendorKey; name: string; tag: string }[] = [
  { key: "floatchat", name: "FloatChat", tag: "All-in-one" },
  { key: "haptik", name: "Haptik", tag: "App layer" },
  { key: "twilio", name: "Twilio", tag: "Dev APIs" },
  { key: "twixor", name: "Twixor", tag: "White-label" },
  { key: "infobip", name: "Infobip", tag: "Enterprise" },
]

/* Cell value types — a genuine "included" uses emerald; anything
   less than a real yes uses neutral gray / an ✕. Short text is
   allowed for nuanced positioning ("DIY", "Partial", etc.). */
type Cell =
  | { kind: "yes" }
  | { kind: "no" }
  | { kind: "partial"; text: string }
  | { kind: "text"; text: string }

type MatrixRow = {
  Icon: typeof Bot
  capability: string
  detail: string
  cells: Record<VendorKey, Cell>
}

/* FACTUAL, fair positioning — no fabricated competitor pricing.
   Cells reflect each vendor's publicly stated product scope. */
const MATRIX: MatrixRow[] = [
  {
    Icon: Bot,
    capability: "Agentic AI agents",
    detail: "Reasoning agents that complete tasks, not just script replies",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "yes" },
      twilio: { kind: "partial", text: "DIY" },
      twixor: { kind: "yes" },
      infobip: { kind: "partial", text: "Partial" },
    },
  },
  {
    Icon: Phone,
    capability: "AI voice agent",
    detail: "Answers and resolves live phone calls",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "yes" },
      twilio: { kind: "partial", text: "DIY" },
      twixor: { kind: "yes" },
      infobip: { kind: "yes" },
    },
  },
  {
    Icon: Hash,
    capability: "Numbers & DID",
    detail: "Provision virtual numbers and DIDs inside the product",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "no" },
      twilio: { kind: "yes" },
      twixor: { kind: "partial", text: "Via partners" },
      infobip: { kind: "yes" },
    },
  },
  {
    Icon: Megaphone,
    capability: "Broadcasting",
    detail: "SMS, WhatsApp, and RCS campaigns to opted-in audiences",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "partial", text: "Limited" },
      twilio: { kind: "partial", text: "API only" },
      twixor: { kind: "yes" },
      infobip: { kind: "yes" },
    },
  },
  {
    Icon: Blocks,
    capability: "No-code product",
    detail: "Launch without writing code or hiring engineers",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "yes" },
      twilio: { kind: "no" },
      twixor: { kind: "partial", text: "Low-code" },
      infobip: { kind: "partial", text: "Often dev" },
    },
  },
  {
    Icon: Plug,
    capability: "200+ integrations",
    detail: "Prebuilt connectors plus a REST API and webhooks",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "yes" },
      twilio: { kind: "yes" },
      twixor: { kind: "partial", text: "Partner-led" },
      infobip: { kind: "yes" },
    },
  },
  {
    Icon: DollarSign,
    capability: "Transparent USD pricing",
    detail: "Published plans you can read and start on today",
    cells: {
      floatchat: { kind: "yes" },
      haptik: { kind: "partial", text: "Enterprise" },
      twilio: { kind: "partial", text: "Usage + markup" },
      twixor: { kind: "partial", text: "Custom" },
      infobip: { kind: "partial", text: "Enterprise" },
    },
  },
  {
    Icon: Clock,
    capability: "Setup time",
    detail: "From sign-up to a live agent on your channels",
    cells: {
      floatchat: { kind: "text", text: "Days" },
      haptik: { kind: "text", text: "Weeks" },
      twilio: { kind: "text", text: "Build it" },
      twixor: { kind: "text", text: "Weeks" },
      infobip: { kind: "text", text: "Weeks+" },
    },
  },
]

/* ─────────────────────────────────────────────────────────────
   Matrix cell renderer
─────────────────────────────────────────────────────────────── */

function CellContent({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  if (cell.kind === "yes") {
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          highlight
            ? "bg-emerald-500 text-white"
            : "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
        }`}
      >
        <Check className="h-4 w-4" strokeWidth={3} aria-label="Included" />
      </span>
    )
  }
  if (cell.kind === "no") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <X className="h-4 w-4" strokeWidth={2.5} aria-label="Not included" />
      </span>
    )
  }
  if (cell.kind === "partial") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
        <Minus className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
        {cell.text}
      </span>
    )
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        highlight ? "bg-white/15 text-white" : "bg-[#3B82F6]/10 text-[#1D4ED8]"
      }`}
    >
      {cell.text}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Differentiators
─────────────────────────────────────────────────────────────── */

const DIFFERENTIATORS = [
  {
    Icon: Layers,
    title: "One product, not four purchases",
    body: "Agentic AI, voice, numbers, and broadcasting live in the same platform. You don't stitch together an app layer, a numbers vendor, and a campaign tool — it's already one bill and one dashboard.",
  },
  {
    Icon: Rocket,
    title: "Self-serve, live in days",
    body: "Sign up, connect your channels, point the agent at your knowledge base, and go. No enterprise procurement cycle and no solutions engineer required to get a real agent answering.",
  },
  {
    Icon: DollarSign,
    title: "Transparent USD pricing",
    body: "Published plans you can read on the pricing page and start on today — no \"contact sales for a quote\" wall and no per-resolution surprise fees hidden inside a usage invoice.",
  },
  {
    Icon: Blocks,
    title: "No-code by design",
    body: "Build agents, flows, and broadcasts without engineers, but keep a full REST API and webhooks for when you want to go deeper. Power without the developer dependency.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Per-competitor quick cards
─────────────────────────────────────────────────────────────── */

const COMPETITORS: {
  name: string
  Icon: typeof Bot
  oneLiner: string
  floatWins: string
  to: string
}[] = [
  {
    name: "Haptik",
    Icon: Bot,
    oneLiner:
      "Strong enterprise agentic AI, but an application layer without its own numbers or broadcasting.",
    floatWins:
      "Same class of AI, plus numbers and broadcasting — and self-serve instead of enterprise-only.",
    to: "/compare/haptik",
  },
  {
    name: "Twilio",
    Icon: Code2,
    oneLiner:
      "Excellent communication APIs for developers, assembled into a product by your own engineers.",
    floatWins:
      "A finished product, not raw APIs — the agent, inbox, and broadcasting are already built.",
    to: "/compare/twilio",
  },
  {
    name: "Twixor",
    Icon: Boxes,
    oneLiner:
      "White-label agentic CPaaS built for telcos and resellers to rebrand and resell.",
    floatWins:
      "Brand-first and direct — no reseller layer, no low-code assembly, no partner overhead.",
    to: "/compare/twixor",
  },
  {
    name: "Infobip",
    Icon: Globe,
    oneLiner:
      "Global enterprise CPaaS — powerful reach and channels, at enterprise pricing and pace.",
    floatWins:
      "Omnichannel and agentic AI without the enterprise contract, quote wall, or long rollout.",
    to: "/compare/infobip",
  },
]

/* ─────────────────────────────────────────────────────────────
   Migration reasons
─────────────────────────────────────────────────────────────── */

const SWITCH_REASONS = [
  "Import contacts, templates, and knowledge base in a guided onboarding",
  "Keep your existing numbers where portability is supported",
  "Run your current tool in parallel until FloatChat handles the volume",
  "White-glove migration help on Growth and above — no downtime required",
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How is FloatChat different from Haptik?",
    answer:
      "Haptik is a strong enterprise agentic AI application layer, but it doesn't provision its own virtual numbers or run SMS, WhatsApp, and RCS broadcasting the way FloatChat does — those typically come from separate vendors. FloatChat gives you comparable agentic AI plus numbers and broadcasting in one product, and it's self-serve rather than enterprise-only, so you can start today instead of waiting on procurement.",
  },
  {
    question: "How is FloatChat different from Twilio?",
    answer:
      "Twilio ships outstanding communication APIs, but they are building blocks — your engineers assemble them into a working product. FloatChat is the finished product: the agentic AI, the omnichannel inbox, numbers, and broadcasting are already built and connected. You get the outcome without a development project, and there's still a REST API and webhooks when you want to customize.",
  },
  {
    question: "How is FloatChat different from Twixor?",
    answer:
      "Twixor is a white-label agentic CPaaS designed for telcos and resellers to rebrand and resell, which usually means a low-code assembly step and a partner in the middle. FloatChat is a direct, brand-first product you use as-is — no reseller layer, no partner overhead, and no low-code build to get to a live agent.",
  },
  {
    question: "How is FloatChat different from Infobip?",
    answer:
      "Infobip is a capable global enterprise CPaaS with broad channel reach, but it's priced and paced for the enterprise — custom quotes and longer rollouts are the norm. FloatChat delivers omnichannel and agentic AI on transparent USD plans you can read and start on today, without an enterprise contract or a sales-gated quote.",
  },
  {
    question: "Is this comparison fair to the other platforms?",
    answer:
      "It's positioning, not point-scoring. Each of these platforms is genuinely good at what it's built for — Twilio for developer APIs, Infobip for global enterprise reach, Haptik and Twixor for their respective AI. The matrix reflects publicly stated product scope, and we don't invent competitor pricing. The honest summary: FloatChat puts agentic AI, numbers, and broadcasting into one no-code product at transparent pricing.",
  },
  {
    question: "How long does it take to switch to FloatChat?",
    answer:
      "Most teams are live in days, not months. You can import contacts, templates, and your knowledge base during onboarding, keep your existing numbers where portability is supported, and run your current tool in parallel until FloatChat is carrying the volume. Growth and higher plans include white-glove migration help.",
  },
]

const comparisonSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FloatChat vs Haptik vs Twilio vs Twixor vs Infobip",
  description:
    "Compare FloatChat, Haptik, Twilio, Twixor, and Infobip on agentic AI, voice, numbers, broadcasting, integrations, and pricing.",
  url: "https://www.floatchat.com/compare",
  about: [
    { "@type": "Thing", name: "FloatChat" },
    { "@type": "Thing", name: "Haptik" },
    { "@type": "Thing", name: "Twilio" },
    { "@type": "Thing", name: "Twixor" },
    { "@type": "Thing", name: "Infobip" },
  ],
  publisher: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Bot },
  { to: "/platform", label: "Platform", Icon: Layers },
  { to: "/pricing", label: "Pricing", Icon: DollarSign },
  { to: "/integrations", label: "Integrations", Icon: Plug },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function ComparePage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={comparisonSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
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

          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
            >
              <GitCompareArrows className="h-3.5 w-3.5" />
              Platform comparison · 5 vendors, one honest table
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
            >
              FloatChat vs Haptik vs Twilio vs Twixor vs{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                Infobip.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Agentic AI, channels, numbers, and broadcasting in one platform —
              without a developer or an enterprise contract. Here is one honest
              comparison of the five.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500"
            >
              {[
                "Agentic AI + voice",
                "Numbers & broadcasting",
                "No-code, self-serve",
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
              className="mt-4 text-sm text-slate-500"
            >
              One honest comparison of the five — positioning, not point-scoring.
            </motion.p>
          </div>
        </section>

        {/* ───── THE COMPARISON MATRIX (signature element) ───── */}
        <section className="relative py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <BlurFade>
                <SectionEyebrow num="01" label="At a glance" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Eight capabilities. Five platforms. One table.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every cell reflects each vendor's publicly stated product scope.
                  A green check means it's genuinely included; gray means it's
                  partial, developer-built, or absent. No invented competitor
                  pricing.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-[0_30px_60px_-40px_rgba(15,42,74,0.35)]">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  {/* Column headers */}
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky left-0 z-10 bg-slate-50/90 backdrop-blur px-5 py-4 align-bottom"
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-400">
                          Capability
                        </span>
                      </th>
                      {VENDORS.map((v) => {
                        const isFloat = v.key === "floatchat"
                        return (
                          <th
                            key={v.key}
                            scope="col"
                            className={`px-4 py-4 text-center align-bottom ${
                              isFloat
                                ? "bg-gradient-to-b from-[#1D4ED8] to-[#1E40AF] text-white rounded-t-2xl"
                                : "bg-slate-50/90"
                            }`}
                          >
                            <span
                              className={`block text-[15px] font-semibold ${
                                isFloat ? "text-white" : "text-[#0F2A4A]"
                              }`}
                            >
                              {v.name}
                            </span>
                            <span
                              className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${
                                isFloat
                                  ? "bg-white/15 text-white"
                                  : "bg-slate-200/70 text-slate-500"
                              }`}
                            >
                              {isFloat && <Sparkles className="h-2.5 w-2.5" />}
                              {v.tag}
                            </span>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {MATRIX.map((row, ri) => (
                      <tr
                        key={row.capability}
                        className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
                      >
                        {/* Capability label */}
                        <th
                          scope="row"
                          className={`sticky left-0 z-10 px-5 py-4 align-top text-left ${
                            ri % 2 === 0 ? "bg-white" : "bg-slate-50/95"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF] text-[#1D4ED8]">
                              <row.Icon className="h-4 w-4" strokeWidth={2.25} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[14px] font-semibold text-[#0F2A4A] leading-tight">
                                {row.capability}
                              </span>
                              <span className="mt-0.5 block text-[11.5px] text-slate-400 leading-snug">
                                {row.detail}
                              </span>
                            </span>
                          </div>
                        </th>

                        {/* Vendor cells */}
                        {VENDORS.map((v) => {
                          const isFloat = v.key === "floatchat"
                          const cell = row.cells[v.key]
                          const isLast = ri === MATRIX.length - 1
                          return (
                            <td
                              key={v.key}
                              className={`px-4 py-4 text-center ${
                                isFloat
                                  ? "bg-[#1D4ED8]/[0.06] border-x border-[#1D4ED8]/15"
                                  : ""
                              } ${
                                isFloat && isLast
                                  ? "rounded-b-2xl border-b border-[#1D4ED8]/15"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-center">
                                <CellContent
                                  cell={cell}
                                  highlight={
                                    isFloat &&
                                    (cell.kind === "yes" || cell.kind === "text")
                                  }
                                />
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurFade>

            {/* Legend */}
            <BlurFade delay={0.15}>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  Included
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  Not included
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                    <Minus className="h-2.5 w-2.5" strokeWidth={3} />
                    Partial
                  </span>
                  Limited, DIY, or via partners
                </span>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── HOW FLOATCHAT IS DIFFERENT ───── */}
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
                <SectionEyebrow num="02" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The whole platform in one product.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The others are strong in their lane. FloatChat's edge is that
                  the lanes are already merged — AI, numbers, and broadcasting in
                  one no-code product you can start on today.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {DIFFERENTIATORS.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {f.title}
                        </h3>
                        <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── PER-COMPETITOR QUICK CARDS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Head to head" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Compare FloatChat to each one.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  A fair one-liner on each platform, and where FloatChat pulls
                  ahead. Open a page for the full breakdown.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {COMPETITORS.map((c, i) => (
                <BlurFade key={c.name} delay={0.05 + i * 0.08} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-[#3B82F6]/40 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <c.Icon className="h-5 w-5 text-[#0F2A4A]" strokeWidth={2.1} />
                      </div>
                      <div className="flex items-center gap-2 text-[15px] font-semibold text-[#0F2A4A]">
                        <span className="text-[#1D4ED8]">FloatChat</span>
                        <span className="text-slate-300">vs</span>
                        <span>{c.name}</span>
                      </div>
                    </div>

                    <p className="mt-4 text-[13.5px] text-slate-500 leading-relaxed">
                      {c.oneLiner}
                    </p>

                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3.5 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-emerald-700 mb-1.5">
                        Where FloatChat wins
                      </p>
                      <p className="flex items-start gap-2 text-[13px] text-emerald-900/85 leading-relaxed">
                        <Check
                          className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                          strokeWidth={3}
                        />
                        {c.floatWins}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      See the full comparison
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* Related links */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Explore
                </span>
                {relatedLinks.map((p) => (
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

        {/* ───── MIGRATION / SWITCH ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="04" label="Switching" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Already on one of these? Switching is calm.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    You don't have to rip anything out on day one. Bring your
                    contacts, templates, and knowledge base into FloatChat, keep
                    your numbers where portability is supported, and let the agent
                    take volume gradually.
                  </p>
                  <p>
                    Run your current platform in parallel until FloatChat is
                    handling the load — then turn the other one off when you're
                    ready, not before.
                  </p>
                </div>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[14px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.5)]"
                  >
                    Get a Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full text-[14px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_30px_60px_-40px_rgba(15,42,74,0.3)]">
                  <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck className="h-5 w-5 text-[#1D4ED8]" />
                    <span className="text-[13px] font-semibold text-[#0F2A4A]">
                      What migration looks like
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {SWITCH_REASONS.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-[14px] text-[#0F2A4A] leading-relaxed">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-[12.5px] text-slate-500">
                    <Clock className="h-4 w-4 text-[#1D4ED8]" />
                    Most teams are live in days, not months.
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Get the whole platform in one product"
          body="Agentic AI, voice, numbers, and broadcasting — no developer, no enterprise contract."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Comparison questions"
              description="Straight answers on how FloatChat stacks up against each platform — and how switching works."
              footer={
                <p className="text-sm text-muted-foreground">
                  Want the deep dive?{" "}
                  <Link
                    to="/compare/haptik"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    FloatChat vs Haptik
                  </Link>
                  ,{" "}
                  <Link
                    to="/compare/twilio"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Twilio
                  </Link>
                  ,{" "}
                  <Link
                    to="/compare/twixor"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Twixor
                  </Link>
                  , and{" "}
                  <Link
                    to="/compare/infobip"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Infobip
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
                  Five platforms compared · one honest table
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
                  Free, no credit card
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Get the whole platform in{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  one product.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Agentic AI, voice, numbers, and broadcasting — self-serve, no-code,
                and priced in plain USD. Start free, or see it on your channels.
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
                "Agentic AI + voice",
                "Numbers & broadcasting",
                "No-code, self-serve",
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
