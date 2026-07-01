"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Handshake,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Building2,
  Store,
  Cpu,
  Layers,
  Code2,
  Webhook,
  Key,
  BadgeDollarSign,
  Users,
  Rocket,
  TrendingUp,
  LifeBuoy,
  GraduationCap,
  Radio,
  Bot,
  Globe,
  ShieldCheck,
  BookOpen,
  Megaphone,
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
  title: "FloatChat Partnerships and Reseller Program",
  description:
    "Partner with FloatChat as an agency, reseller, or technology partner. One platform for agentic AI, channels, and broadcasting, with an open API.",
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
   UNIQUE HERO VISUAL — a partner-program surface.
   Three partner-type cards (Agency / Reseller / Technology) with the
   "active" one cycling, a join → build → grow partner journey, and a
   co-sell / revenue accent. Deliberately NOT a product mockup.
─────────────────────────────────────────────────────────────── */

type PartnerKey = "agency" | "reseller" | "technology"

const heroPartners: {
  key: PartnerKey
  Icon: typeof Building2
  label: string
  meta: string
}[] = [
  { key: "agency", Icon: Building2, label: "Agency", meta: "ship CX faster" },
  { key: "reseller", Icon: Store, label: "Reseller", meta: "one platform, many clients" },
  { key: "technology", Icon: Cpu, label: "Technology", meta: "build on the open API" },
]

function PartnerProgramVisual() {
  const [active, setActive] = useState<PartnerKey>("agency")

  useEffect(() => {
    const order: PartnerKey[] = ["agency", "reseller", "technology"]
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % order.length
      setActive(order[i])
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const journey = [
    { Icon: Handshake, label: "Join", note: "Apply in minutes" },
    { Icon: Rocket, label: "Build", note: "Onboard & launch" },
    { Icon: TrendingUp, label: "Grow", note: "Co-sell & scale" },
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

      {/* Floating co-sell chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <BadgeDollarSign className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Recurring revenue share
        </span>
      </motion.div>

      {/* Floating open-API chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Code2 className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Open API &amp; webhooks
        </span>
      </motion.div>

      {/* Main surface */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-200 bg-slate-50/80">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
            <Handshake className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-[11px] font-semibold text-[#0F2A4A]">
            FloatChat Partner Program
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Accepting partners
          </span>
        </div>

        <div className="p-4 lg:p-5 space-y-4">
          {/* Partner-type cards */}
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2">
              Choose your partner type
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {heroPartners.map((p) => {
                const isActive = active === p.key
                return (
                  <motion.div
                    key={p.key}
                    animate={
                      isActive
                        ? {
                            borderColor: "rgba(59,130,246,0.5)",
                            boxShadow: "0 0 0 3px rgba(59,130,246,0.10)",
                            y: -2,
                          }
                        : {
                            borderColor: "rgba(226,232,240,1)",
                            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                            y: 0,
                          }
                    }
                    transition={{ duration: 0.35 }}
                    className="rounded-xl border bg-white px-2.5 py-3 flex flex-col items-center text-center gap-1.5"
                  >
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <p.Icon className="h-4 w-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#0F2A4A] leading-tight">
                      {p.label}
                    </span>
                    <span className="text-[8.5px] text-slate-400 leading-tight">
                      {p.meta}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-0.5 text-[8px] font-medium text-[#1D4ED8]"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5" /> selected
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Partner journey: join → build → grow */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2.5">
              Your partner journey
            </p>
            <div className="flex items-center justify-between">
              {journey.map((s, i) => (
                <div key={s.label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="h-8 w-8 rounded-full bg-white border border-[#3B82F6]/30 flex items-center justify-center shadow-sm">
                      <s.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#0F2A4A]">
                      {s.label}
                    </span>
                    <span className="text-[8px] text-slate-400 leading-tight max-w-[64px]">
                      {s.note}
                    </span>
                  </div>
                  {i < journey.length - 1 && (
                    <div className="flex-1 mx-1 flex items-center">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6]" />
                      <ArrowRight className="h-3 w-3 text-[#3B82F6] shrink-0" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What's bundled + revenue accent */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: Bot, label: "Agentic AI" },
              { Icon: Layers, label: "Channels" },
              { Icon: Radio, label: "Broadcasting" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-lg border border-slate-200 bg-white px-2 py-2 flex items-center gap-1.5"
              >
                <b.Icon className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                <span className="text-[9.5px] font-medium text-[#0F2A4A] truncate">
                  {b.label}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-[#EAF2FF] border border-[#3B82F6]/20 px-3 py-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#1D4ED8] shrink-0" />
            <span className="text-[10px] text-[#0F2A4A] leading-snug">
              One platform to sell, deploy, and grow — with a partner team
              behind every deal.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Partner types (rich cards)
─────────────────────────────────────────────────────────────── */

const partnerTypes: {
  Icon: typeof Building2
  eyebrow: string
  title: string
  body: string
  points: string[]
  to: string
  linkLabel: string
}[] = [
  {
    Icon: Building2,
    eyebrow: "For agencies",
    title: "Agencies",
    body: "Deliver customer-experience projects faster with agentic AI and a complete channel stack — without stitching together five vendors per engagement.",
    points: [
      "One stack for AI, channels, and broadcasting",
      "Launch client agents in days, not months",
      "Multi-tenant sub-accounts per client",
      "Co-marketing and enablement support",
    ],
    to: "/agentic-ai",
    linkLabel: "See agentic AI",
  },
  {
    Icon: Store,
    eyebrow: "For resellers",
    title: "Resellers",
    body: "Offer your customers one platform across every channel, with recurring revenue on every seat and conversation you bring on board.",
    points: [
      "Recurring revenue share on referred accounts",
      "Sell one platform across many channels",
      "Deal registration and co-sell motion",
      "Dedicated partner manager for pipeline",
    ],
    to: "/platform",
    linkLabel: "Explore the platform",
  },
  {
    Icon: Cpu,
    eyebrow: "For technology partners",
    title: "Technology partners",
    body: "Integrate your product with FloatChat through the open API and webhooks, then reach our customer base as a listed integration.",
    points: [
      "Open REST API and event webhooks",
      "Scoped API keys and sandbox access",
      "Listing in the FloatChat integrations directory",
      "Joint solution and go-to-market support",
    ],
    to: "/integrations",
    linkLabel: "Browse integrations",
  },
]

/* ─────────────────────────────────────────────────────────────
   Why partner (benefits grid)
─────────────────────────────────────────────────────────────── */

const benefits: { Icon: typeof Layers; title: string; body: string }[] = [
  {
    Icon: Layers,
    title: "One platform, not five tools",
    body: "Agentic AI, omnichannel messaging, and broadcasting live in a single platform — so you sell and support one thing your customers can actually run.",
  },
  {
    Icon: BadgeDollarSign,
    title: "Recurring revenue",
    body: "Earn ongoing revenue share on the accounts you bring on, not a one-time bounty. Your book of business compounds as your clients grow.",
  },
  {
    Icon: LifeBuoy,
    title: "Technical support that shows up",
    body: "A partner team backs you on scoping, onboarding, and escalations — so a tricky deployment never stalls a deal or a renewal.",
  },
  {
    Icon: GraduationCap,
    title: "Partner enablement",
    body: "Onboarding, documentation, and hands-on training get your team selling and shipping FloatChat quickly, with material you can reuse with clients.",
  },
  {
    Icon: Users,
    title: "Multi-tenant by design",
    body: "Manage every client from multi-tenant sub-accounts — clean separation, one login, and no juggling a dozen disconnected dashboards.",
  },
  {
    Icon: Code2,
    title: "Open API to build on",
    body: "Extend and embed FloatChat with an open REST API and webhooks, so technology partners and agencies can build exactly what a client needs.",
  },
]

/* ─────────────────────────────────────────────────────────────
   How the program works (steps)
─────────────────────────────────────────────────────────────── */

const programSteps: {
  num: string
  Icon: typeof Handshake
  title: string
  body: string
}[] = [
  {
    num: "01",
    Icon: Handshake,
    title: "Apply to the program",
    body: "Tell us how you want to partner — agency, reseller, or technology — and a little about your customers. Approval is quick, not a quarter-long procurement cycle.",
  },
  {
    num: "02",
    Icon: BookOpen,
    title: "Onboard and enable your team",
    body: "Get access, documentation, and training. Your team learns to sell, deploy, and support agentic AI, channels, and broadcasting on one platform.",
  },
  {
    num: "03",
    Icon: Rocket,
    title: "Launch with your customers",
    body: "Spin up multi-tenant sub-accounts, connect channels, and go live with agents and broadcasts — days to first value, not months of build.",
  },
  {
    num: "04",
    Icon: TrendingUp,
    title: "Co-sell and grow",
    body: "Register deals, co-sell with our team, and earn recurring revenue as your accounts expand. Your partner manager helps you scale the pipeline.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Open API / technology teaser rows
─────────────────────────────────────────────────────────────── */

const apiRows: { Icon: typeof Code2; label: string; meta: string }[] = [
  { Icon: Code2, label: "REST API", meta: "Programmatic access to agents, inboxes, and contacts" },
  { Icon: Webhook, label: "Webhooks", meta: "Subscribe to conversation and delivery events in real time" },
  { Icon: Key, label: "Scoped API keys", meta: "Per-account keys with sandbox and production environments" },
  { Icon: Bot, label: "Agentic hooks", meta: "Trigger and extend AI agents from your own systems" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What kinds of partners does FloatChat work with?",
    answer:
      "Three main types. Agencies use FloatChat to deliver customer-experience projects faster with agentic AI and a full channel stack. Resellers offer the platform to their own customers and earn recurring revenue. Technology partners integrate their product through the open API and webhooks. Many operators also run multiple clients from multi-tenant sub-accounts.",
  },
  {
    question: "How do partners make money?",
    answer:
      "Resellers earn recurring revenue share on the accounts they bring on board — ongoing, not a one-time referral fee — so the value compounds as clients grow. Agencies capture services revenue by shipping projects faster on one platform, and technology partners open new pipeline by reaching FloatChat's customer base through a listed integration.",
  },
  {
    question: "Do you offer white-label or reseller billing?",
    answer:
      "White-label reseller billing is on our roadmap. Today you can manage multiple clients from multi-tenant sub-accounts and sell FloatChat under a co-sell and revenue-share model. Talk to our partner team about where things stand for your specific use case, and we'll align on what's available at launch.",
  },
  {
    question: "What does the platform include?",
    answer:
      "One platform that bundles agentic AI, omnichannel messaging across every channel, and broadcasting. That means your customers get AI agents, a shared inbox, and campaign-style broadcasts without buying and integrating separate tools — and you get one thing to sell and support.",
  },
  {
    question: "How do technology partners integrate?",
    answer:
      "Through an open REST API and event webhooks, with scoped API keys and a sandbox environment. You can read and write agents, conversations, and contacts, subscribe to real-time events, and extend agentic AI from your own systems. Approved integrations can be listed in the FloatChat integrations directory.",
  },
  {
    question: "How fast can we get started as a partner?",
    answer:
      "Quickly. Apply, get approved, and go through onboarding and enablement — then launch with your first customer. Because there are no pre-built conversation journeys to map and the platform is one stack rather than five, most partners are deploying real client accounts within their first weeks.",
  },
]

const partnerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FloatChat Partner Program",
  serviceType: "Agency, reseller, and technology partnership program",
  description:
    "Partner with FloatChat as an agency, reseller, or technology partner. One platform for agentic AI, channels, and broadcasting, with an open API and webhooks.",
  url: "https://www.floatchat.com/partnerships",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Agencies, resellers, and technology partners",
  },
}

/* ─────────────────────────────────────────────────────────────
   Cross-links
─────────────────────────────────────────────────────────────── */

const relatedLinks: { to: string; label: string; Icon: typeof Layers }[] = [
  { to: "/platform", label: "The Platform", Icon: Layers },
  { to: "/agentic-ai", label: "Agentic AI", Icon: Bot },
  { to: "/integrations", label: "Integrations", Icon: Code2 },
  { to: "/why-floatchat", label: "Why FloatChat", Icon: ShieldCheck },
  { to: "/pricing", label: "Pricing", Icon: BadgeDollarSign },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function PartnershipsPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={partnerSchema} />

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
                  <Handshake className="h-3.5 w-3.5" />
                  Partner Program · agencies, resellers & technology
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Partner with FloatChat on{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Grow with a platform that bundles agentic AI, channels, and
                  broadcasting — with an open API. Join as an agency, reseller,
                  or technology partner and build something bigger together.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "One platform to sell",
                    "Recurring revenue",
                    "Open API & webhooks",
                    "Partner support",
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
                      Become a Partner
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
                  One platform, many ways to grow together.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <PartnerProgramVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── PARTNER TYPES ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="Ways to partner" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Three ways to partner. One platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Whether you ship customer-experience projects, resell to your
                  own customers, or build software, there&apos;s a partnership
                  that fits — all backed by agentic AI, channels, and
                  broadcasting in a single stack.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {partnerTypes.map((p, i) => (
                <BlurFade key={p.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <p.Icon className="h-6 w-6 text-white" strokeWidth={2.25} />
                    </div>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#3B82F6]">
                      {p.eyebrow}
                    </p>
                    <h3 className="mt-1.5 text-xl lg:text-2xl font-semibold text-[#0F2A4A] leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[13.5px] text-slate-500 leading-relaxed">
                      {p.body}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-[13px] text-[#0F2A4A]">
                          <Check
                            className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Link
                        to={p.to}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:gap-2.5 transition-all"
                      >
                        {p.linkLabel}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Operators note row */}
            <BlurFade delay={0.3}>
              <div className="mt-6 rounded-2xl border border-[#3B82F6]/20 bg-[#EAF2FF] px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-[#3B82F6]/25 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-[#1D4ED8]" />
                </div>
                <p className="text-sm text-[#0F2A4A] leading-relaxed">
                  <span className="font-semibold">Running many clients?</span>{" "}
                  Operators manage every account from multi-tenant sub-accounts
                  — one login, clean separation, no dashboard sprawl.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY PARTNER (benefits grid) ───── */}
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
                <SectionEyebrow num="02" label="Why partner with FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A platform your customers can actually run.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Partner enablement, technical support, and one stack with
                  agentic AI and broadcasting built in — so you spend your time
                  growing, not gluing tools together.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b, i) => (
                <BlurFade key={b.title} delay={0.05 + i * 0.06} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                      <b.Icon className="h-5 w-5 text-[#1D4ED8]" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── HOW THE PROGRAM WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How the program works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Join, build, grow.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A straightforward path from application to recurring revenue —
                  with a partner team alongside you the whole way.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programSteps.map((s, i) => (
                <BlurFade key={s.num} delay={0.05 + i * 0.08} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <span className="absolute top-5 right-6 font-mono text-[13px] font-semibold text-slate-200">
                      {s.num}
                    </span>
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── OPEN API / TECHNOLOGY TEASER ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#EEF2FF] via-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="04" label="Open API" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built to build on.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Technology partners integrate with FloatChat through an{" "}
                    <span className="font-semibold text-[#0F2A4A]">open REST API and webhooks</span>
                    . Read and write agents, conversations, and contacts,
                    subscribe to real-time events, and extend agentic AI from
                    your own systems.
                  </p>
                  <p>
                    Scoped API keys and a sandbox keep integrations safe to
                    develop, and approved integrations can be listed in the
                    FloatChat directory in front of our customer base.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    to="/integrations"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                  >
                    Browse integrations
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/agentic-ai"
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Explore agentic AI
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-7 shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)]">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                      <Code2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F2A4A]">
                      Developer surface
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> stable
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {apiRows.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <r.Icon className="h-4 w-4 text-[#1D4ED8]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F2A4A]">
                            {r.label}
                          </p>
                          <p className="text-[12px] text-slate-500 leading-snug">
                            {r.meta}
                          </p>
                        </div>
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
          headline="Become a FloatChat partner"
          body="Agency, reseller, or technology partner — one platform for agentic AI, channels, and broadcasting, with an open API."
          primaryLabel="Become a Partner"
          primaryHref="/contact"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Partnership FAQs"
              description="Common questions about partnering with FloatChat."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] border border-[#1D4ED8]/20 bg-gradient-to-br from-[#0F2A4A] via-[#123763] to-[#1D4ED8] px-8 py-14 lg:px-14 lg:py-16 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-[#3B82F6]/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#60A5FA]/30 blur-3xl"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white">
                  <Megaphone className="h-3.5 w-3.5" />
                  FloatChat Partner Program
                </span>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05]">
                  Let&apos;s build something together.
                </h2>
                <p className="mt-4 text-base lg:text-lg text-slate-200/90 max-w-2xl mx-auto leading-relaxed">
                  Join as an agency, reseller, or technology partner and grow on
                  one platform for agentic AI, channels, and broadcasting — with
                  an open API behind it all.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-[#0F2A4A] bg-white hover:bg-slate-100 shadow-[0_10px_24px_-6px_rgba(0,0,0,0.4)] transition-all"
                  >
                    Become a Partner
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </Link>
                  <Link
                    to="/signup?plan=free"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-white/30 bg-white/5 text-white hover:bg-white/10 transition-colors"
                  >
                    Start Free
                  </Link>
                </div>

                {/* Cross-links */}
                <div className="mt-10 pt-8 border-t border-white/15">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-300/80 mb-4">
                    Explore FloatChat
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    {relatedLinks.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[13px] font-medium text-white hover:bg-white/10 transition-colors"
                      >
                        <l.Icon className="h-3.5 w-3.5 text-[#60A5FA]" />
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
