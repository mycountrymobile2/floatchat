"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  GitCompareArrows,
  Check,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  Sparkles,
  Building2,
  Network,
  Zap,
  ShieldCheck,
  Hash,
  Radio,
  Bot,
  Waypoints,
  DollarSign,
  Timer,
  Layers,
  MoveRight,
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
  title: "FloatChat vs Twixor — A Brand-First Agentic AI Alternative",
  description:
    "Compare FloatChat and Twixor. Get agentic AI and omnichannel broadcasting built for your brand, without white-label reseller overhead.",
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
   SIGNATURE VISUAL — "brand-first vs reseller overhead"
   A single direct FloatChat → your brand path, stacked against a
   multi-hop white-label reseller chain that dilutes the brand.
─────────────────────────────────────────────────────────────── */

function BrandPathVisual() {
  const resellerHops = [
    { label: "Twixor platform", Icon: Layers },
    { label: "Reseller / aggregator", Icon: Network },
    { label: "White-label tenant", Icon: Waypoints },
    { label: "Your brand", Icon: Building2 },
  ]

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)]">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-[36px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Direct path — FloatChat */}
      <div className="rounded-2xl border border-[#3B82F6]/25 bg-[#EAF2FF] p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
            <Sparkles className="h-3.5 w-3.5" /> FloatChat · direct
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            <Check className="h-3 w-3" strokeWidth={3} /> 1 hop
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-[#0F2A4A]">
              FloatChat
            </span>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex-1 h-[3px] origin-left rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]"
          >
            <MoveRight className="absolute -right-1 -top-[9px] h-5 w-5 text-[#1D4ED8]" />
          </motion.div>

          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="h-12 w-12 rounded-2xl border-2 border-[#1D4ED8] bg-white flex items-center justify-center">
              <Building2 className="h-6 w-6 text-[#1D4ED8]" />
            </div>
            <span className="text-[10px] font-semibold text-[#0F2A4A]">
              Your brand
            </span>
          </div>
        </div>

        <p className="mt-4 text-[12px] text-[#0F2A4A]/80 leading-relaxed">
          Agentic AI and omnichannel broadcasting land under your own name — no
          middle tenants, no reseller markup, nothing to strip out later.
        </p>
      </div>

      {/* Reseller chain */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <Network className="h-3.5 w-3.5" /> Reseller overhead
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-300 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            <X className="h-3 w-3" strokeWidth={3} /> multi-hop
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {resellerHops.map((hop, i) => (
            <div key={hop.label} className="flex sm:flex-col items-center gap-2">
              <div
                className={`flex items-center gap-2 sm:flex-col sm:gap-1.5 sm:text-center rounded-xl border px-3 py-2 w-full ${
                  i === resellerHops.length - 1
                    ? "border-slate-300 bg-white"
                    : "border-slate-200 bg-white/60"
                }`}
              >
                <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <hop.Icon className="h-4 w-4 text-slate-500" />
                </div>
                <span className="text-[10.5px] font-medium text-slate-600 leading-tight">
                  {hop.label}
                </span>
              </div>
              {i < resellerHops.length - 1 && (
                <ArrowDownRight className="h-4 w-4 text-slate-400 rotate-[-45deg] sm:hidden shrink-0" />
              )}
            </div>
          ))}
        </div>

        <p className="mt-4 text-[12px] text-slate-500 leading-relaxed">
          White-label CPaaS is built for partners to resell. Every hop adds
          billing layers and brand dilution you pay for but never use when you
          run your own CX.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Comparison table data
─────────────────────────────────────────────────────────────── */

type Cell = { text: string; state: "yes" | "no" | "neutral" }
type Row = { feature: string; float: Cell; twixor: Cell }

const comparisonRows: Row[] = [
  {
    feature: "Agentic AI",
    float: { text: "Yes — resolves multi-step tasks", state: "yes" },
    twixor: { text: "Yes", state: "yes" },
  },
  {
    feature: "Omnichannel reach & broadcasting",
    float: { text: "Yes", state: "yes" },
    twixor: { text: "Yes", state: "yes" },
  },
  {
    feature: "DID numbers in-platform",
    float: { text: "Yes — provisioned in-product", state: "yes" },
    twixor: { text: "Via partners", state: "neutral" },
  },
  {
    feature: "Built for brands running their own CX",
    float: { text: "Brand-first by design", state: "yes" },
    twixor: { text: "White-label reseller focus", state: "no" },
  },
  {
    feature: "Reseller / multi-tenant billing overhead",
    float: { text: "None to pay for", state: "yes" },
    twixor: { text: "Core of the platform", state: "no" },
  },
  {
    feature: "Pricing model",
    float: { text: "Transparent USD, self-serve", state: "yes" },
    twixor: { text: "Custom / partner-negotiated", state: "neutral" },
  },
  {
    feature: "Typical time to launch",
    float: { text: "Days", state: "yes" },
    twixor: { text: "Weeks", state: "neutral" },
  },
]

/* ─────────────────────────────────────────────────────────────
   "Goes further" cards
─────────────────────────────────────────────────────────────── */

const furtherCards = [
  {
    Icon: Building2,
    title: "Brand-first, not reseller-first",
    body:
      "FloatChat is built for the team that owns its customer experience — not for aggregators reselling CX to others. Everything ships under your name from day one, so there's no white-label layer to configure around.",
  },
  {
    Icon: DollarSign,
    title: "No white-label machinery to fund",
    body:
      "Multi-tenant billing, partner portals, and reseller provisioning are exactly the parts of a white-label CPaaS a single brand never touches. Skip that overhead and pay for the agentic AI and reach you actually run.",
  },
  {
    Icon: Hash,
    title: "DID numbers in the product",
    body:
      "Provision phone numbers directly inside FloatChat instead of coordinating through partner channels. One place to launch a number, wire it to an agent, and go live.",
  },
  {
    Icon: Timer,
    title: "Setup measured in days",
    body:
      "Connect your channels, point the agent at your knowledge, and start broadcasting to your audience. No reseller onboarding chain to clear before you send your first message.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Migration steps
─────────────────────────────────────────────────────────────── */

const migrationSteps = [
  {
    Icon: Layers,
    title: "Map what you actually use",
    body:
      "We separate the agentic AI and omnichannel broadcasting you rely on from the reseller and multi-tenant features you don't — so nothing brand-critical is lost in the move.",
  },
  {
    Icon: Radio,
    title: "Reconnect your channels",
    body:
      "WhatsApp, SMS, email, and social reconnect to a single FloatChat workspace, with your audiences and templates carried over under your own brand.",
  },
  {
    Icon: Zap,
    title: "Launch under your name",
    body:
      "Numbers are provisioned in-platform, your agent goes live grounded in your data, and your first broadcast goes out — typically within days, not weeks.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Broadcast channels
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof Radio
}

const broadcastChannels: ChannelTile[] = [
  { name: "WhatsApp", bg: "#25D366", Icon: SiWhatsapp },
  { name: "SMS", bg: "#0F2A4A", Lucide: Radio },
  { name: "Email", bg: "#EA4335", Icon: SiGmail },
  { name: "Instagram", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   Related compare links
─────────────────────────────────────────────────────────────── */

const relatedCompares = [
  {
    to: "/compare/haptik",
    label: "FloatChat vs Haptik",
    note: "Agentic AI without the enterprise lift.",
  },
  {
    to: "/compare/twilio",
    label: "FloatChat vs Twilio",
    note: "Reach and AI without stitching APIs together.",
  },
  {
    to: "/compare/infobip",
    label: "FloatChat vs Infobip",
    note: "Omnichannel broadcasting, minus the CPaaS weight.",
  },
  {
    to: "/compare",
    label: "All comparisons",
    note: "See how FloatChat stacks up across the board.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is FloatChat a white-label platform?",
    answer:
      "No — FloatChat is built for your brand rather than for reselling CX to others. Everything ships under your name from day one, so you skip the multi-tenant, reseller billing machinery a white-label CPaaS like Twixor is designed around. Reseller billing is on our roadmap, but it isn't overhead you have to pay for today.",
  },
  {
    question: "How is FloatChat different from Twixor?",
    answer:
      "Both offer agentic AI and omnichannel reach. The difference is focus: Twixor is a capable white-label CPaaS built for telcos, aggregators, and resellers, complete with multi-tenant billing and partner tooling. FloatChat is brand-first — the same agentic AI and broadcasting, aimed at the team running its own customer experience, without the reseller layer.",
  },
  {
    question: "Does FloatChat provision phone numbers?",
    answer:
      "Yes. DID numbers are provisioned directly inside the product, so you launch and wire up a number without coordinating through partner channels.",
  },
  {
    question: "How fast is setup compared to Twixor?",
    answer:
      "Most brands are live in days. You connect your channels, point the agent at your knowledge base, provision a number in-platform, and send your first broadcast — with no reseller onboarding chain to clear first.",
  },
  {
    question: "Where is Twixor still the stronger choice?",
    answer:
      "If you are a telco, aggregator, or reseller who needs to resell CX to your own downstream customers, Twixor's white-label, multi-tenant model is built for exactly that. FloatChat is the better fit when you're a brand running your own customer experience, not reselling it.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "FloatChat uses transparent, self-serve USD pricing you can see on our pricing page. Twixor is typically custom or partner-negotiated. We won't quote Twixor's pricing here since it varies by arrangement.",
  },
]

const faqSchema = faqs

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FloatChat vs Twixor — A Brand-First Agentic AI Alternative",
  description:
    "Compare FloatChat and Twixor. Get agentic AI and omnichannel broadcasting built for your brand, without white-label reseller overhead.",
  url: "https://www.floatchat.com/compare/twixor",
  isPartOf: {
    "@type": "WebSite",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  about: {
    "@type": "Thing",
    name: "Twixor alternative",
  },
}

/* ─────────────────────────────────────────────────────────────
   Cell renderer
─────────────────────────────────────────────────────────────── */

function TableCell({ cell, emphasis }: { cell: Cell; emphasis?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      {cell.state === "yes" ? (
        <span className="mt-0.5 h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <Check className="h-2.5 w-2.5 text-emerald-600" strokeWidth={3} />
        </span>
      ) : cell.state === "no" ? (
        <span className="mt-0.5 h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <X className="h-2.5 w-2.5 text-slate-400" strokeWidth={3} />
        </span>
      ) : (
        <span className="mt-0.5 h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
          <span className="h-1.5 w-0.5 rounded-full bg-slate-400" />
        </span>
      )}
      <span
        className={`text-[13px] leading-snug ${
          emphasis ? "text-[#0F2A4A] font-medium" : "text-slate-600"
        }`}
      >
        {cell.text}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function CompareTwixorPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqSchema} />
      <JsonLd schema={jsonLdSchema} />

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
                  <GitCompareArrows className="h-3.5 w-3.5" />
                  FloatChat vs Twixor · a brand-first alternative
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI built for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    your brand.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Keep the agentic AI and omnichannel broadcasting you want from
                  Twixor — without paying for the white-label reseller machinery
                  you&apos;ll never use.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Brand-first by design",
                    "No reseller overhead",
                    "DID numbers in-platform",
                    "Live in days",
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
                  For brands running their own CX — not reselling it.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <BrandPathVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── BRAND-FIRST NARRATIVE + AT A GLANCE ───── */}
        <section className="relative py-20 lg:py-24 bg-white border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="Brand-first vs reseller" />
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#0F2A4A] leading-[1.08]">
                  Same capabilities. One less middle layer.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Twixor is a capable white-label CPaaS built for telcos,
                    aggregators, and resellers — with multi-tenant billing and
                    partner tooling designed to hand customer experience down to
                    someone else&apos;s customers.
                  </p>
                  <p>
                    That&apos;s genuinely useful if reselling CX is your business.
                    But if you&apos;re a brand running your own customer
                    experience, that reseller machinery is overhead you configure
                    around and pay for without ever using.
                  </p>
                  <p>
                    <span className="font-semibold text-[#0F2A4A]">
                      FloatChat keeps the agentic AI and omnichannel broadcasting
                    </span>{" "}
                    and points them straight at your brand — no white-label tenant
                    to strip out, no partner chain to route through.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 lg:p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-5">
                    At a glance
                  </p>
                  <div className="space-y-3">
                    {[
                      { k: "Focus", f: "Your brand", t: "Resellers & partners" },
                      { k: "Reseller overhead", f: "None", t: "Built in" },
                      { k: "DID numbers", f: "In-platform", t: "Via partners" },
                      { k: "Pricing", f: "Transparent USD", t: "Custom" },
                      { k: "Setup", f: "Days", t: "Weeks" },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="grid grid-cols-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                      >
                        <span className="col-span-4 text-[12px] font-medium text-slate-500">
                          {r.k}
                        </span>
                        <span className="col-span-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0F2A4A]">
                          <Check
                            className="h-3.5 w-3.5 text-emerald-600 shrink-0"
                            strokeWidth={3}
                          />
                          {r.f}
                        </span>
                        <span className="col-span-4 text-[12px] text-slate-400 text-right">
                          {r.t}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between px-1 text-[10px] uppercase tracking-wider">
                    <span className="text-[#1D4ED8] font-semibold">FloatChat</span>
                    <span className="text-slate-400 font-medium">Twixor</span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── COMPARISON TABLE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="Side by side" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  FloatChat vs Twixor, feature by feature.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A fair read of where each platform is aimed. Both bring agentic
                  AI and omnichannel reach — the split is who they&apos;re built
                  for.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.2)]">
                {/* Header row */}
                <div className="grid grid-cols-12 bg-[#0F2A4A] text-white">
                  <div className="col-span-12 sm:col-span-4 px-5 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70">
                    Capability
                  </div>
                  <div className="col-span-6 sm:col-span-4 px-5 py-4 border-l border-white/10 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-sm font-semibold">FloatChat</span>
                  </div>
                  <div className="col-span-6 sm:col-span-4 px-5 py-4 border-l border-white/10 flex items-center">
                    <span className="text-sm font-semibold text-white/80">
                      Twixor
                    </span>
                  </div>
                </div>

                {/* Rows */}
                {comparisonRows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-12 items-stretch ${
                      i % 2 === 1 ? "bg-slate-50/60" : "bg-white"
                    }`}
                  >
                    <div className="col-span-12 sm:col-span-4 px-5 py-4 text-[13.5px] font-medium text-[#0F2A4A] border-b border-slate-100 flex items-center">
                      {row.feature}
                    </div>
                    <div className="col-span-6 sm:col-span-4 px-5 py-4 border-l border-b border-slate-100 bg-[#EAF2FF]/40 flex items-center">
                      <TableCell cell={row.float} emphasis />
                    </div>
                    <div className="col-span-6 sm:col-span-4 px-5 py-4 border-l border-b border-slate-100 flex items-center">
                      <TableCell cell={row.twixor} />
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <p className="mt-5 text-center text-[12.5px] text-slate-400">
                Twixor pricing is custom and varies by partner arrangement — we
                don&apos;t quote it here. See{" "}
                <Link to="/pricing" className="text-[#1D4ED8] hover:underline">
                  FloatChat pricing
                </Link>{" "}
                for transparent USD plans.
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHERE FLOATCHAT GOES FURTHER ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Where FloatChat goes further" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything pointed at your brand.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same agentic AI and reach, with the reseller layer removed
                  and the details a single brand actually cares about built in.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {furtherCards.map((f, i) => (
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
                        <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Broadcast reach strip */}
            <BlurFade delay={0.2}>
              <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50/50 p-6 lg:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Radio className="h-5 w-5 text-[#1D4ED8]" />
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      Broadcast to your audience, everywhere they are
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5 sm:ml-auto">
                    {broadcastChannels.map((c) => (
                      <div
                        key={c.name}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1.5 pr-3 py-1.5"
                      >
                        <span
                          className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: c.bg }}
                        >
                          {c.Icon ? (
                            <c.Icon style={{ color: "#fff", width: 12, height: 12 }} />
                          ) : c.Lucide ? (
                            <c.Lucide className="h-3 w-3 text-white" />
                          ) : null}
                        </span>
                        <span className="text-[12px] font-medium text-[#0F2A4A]">
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── MIGRATION ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Switching over" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Moving from Twixor, without the reset.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Keep what matters — the AI and the reach — and leave the
                  white-label overhead behind. Most brands are live in days.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {migrationSteps.map((s, i) => (
                <BlurFade key={s.title} delay={0.05 + i * 0.1} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200 bg-white p-6 lg:p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                        <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <span className="font-mono text-sm text-slate-300 font-semibold">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                    {i < migrationSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-4 h-6 w-6 text-slate-300 z-10" />
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                <Link
                  to="/agentic-ai"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <Bot className="h-4 w-4 text-[#1D4ED8]" /> Explore agentic AI
                </Link>
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <Layers className="h-4 w-4 text-[#1D4ED8]" /> See the platform
                </Link>
                <Link
                  to="/integrations"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <Network className="h-4 w-4 text-[#1D4ED8]" /> Integrations
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 font-medium text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-[#1D4ED8]" /> Talk to us
                </Link>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Run your own CX with agentic AI — under your brand."
          body="Agentic AI and omnichannel broadcasting, without the white-label reseller overhead. Live in days."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED COMPARISONS ───── */}
        <section className="relative py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <BlurFade>
                <SectionEyebrow num="05" label="Keep comparing" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#0F2A4A] leading-[1.1]">
                  See how FloatChat compares elsewhere.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompares.map((c, i) => (
                <BlurFade key={c.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.2)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0F2A4A]">
                        {c.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="mt-2 text-[12.5px] text-slate-500 leading-relaxed">
                      {c.note}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="FloatChat vs Twixor — FAQ"
              description="Straight answers on brand-first vs white-label, numbers, setup, and pricing."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 bg-[#0F2A4A] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(96,165,250,0.25) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,130,246,0.5), transparent 70%)",
            }}
          />
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <BlurFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#BFD4FF]">
                <Sparkles className="h-3.5 w-3.5" />
                A brand-first Twixor alternative
              </span>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.08]">
                Own your customer experience.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-[#C9D6EF] leading-relaxed max-w-xl mx-auto">
                Agentic AI and omnichannel broadcasting built for your brand — no
                white-label reseller overhead, live in days.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                >
                  Start Free
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full text-[15px] font-medium border border-white/25 bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>
              <p className="mt-6 text-sm text-[#8FA6CE]">
                Prefer to talk first?{" "}
                <Link to="/contact" className="text-[#BFD4FF] hover:underline">
                  Contact us
                </Link>{" "}
                or{" "}
                <Link to="/compare" className="text-[#BFD4FF] hover:underline">
                  see all comparisons
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
