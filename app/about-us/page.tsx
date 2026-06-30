"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Bot,
  Inbox,
  Megaphone,
  BarChart3,
  Users,
  Layers,
  Tag,
  Unlock,
  Heart,
  Check,
  CheckCircle2,
  Plug,
  MessageSquare,
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
  title: "About FloatChat — One Platform for Agentic AI Conversations | FloatChat",
  description:
    "FloatChat puts agentic AI, every channel, and broadcasting in one platform so teams can run customer experience without stitching tools together.",
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
   HERO VISUAL — the "one platform" diagram. Four capabilities
   (agentic AI, every channel, broadcasting, analytics) converge
   into ONE hub that resolves to a single customer record.
─────────────────────────────────────────────────────────────── */

const platformPieces = [
  { Icon: Bot, label: "Agentic AI", note: "acts, not just answers" },
  { Icon: Inbox, label: "Every channel", note: "one shared inbox" },
  { Icon: Megaphone, label: "Broadcasting", note: "campaigns & numbers" },
  { Icon: BarChart3, label: "Analytics", note: "one view of it all" },
]

function OnePlatformDiagram() {
  return (
    <div className="relative">
      {/* glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.42), transparent 70%)",
        }}
      />

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Layers className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          4 tools · 1 platform
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
          One customer record
        </span>
      </motion.div>

      {/* card */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · one platform
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Connected
          </span>
        </div>

        <div className="relative p-6 lg:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 50% 55% at 50% 46%, rgba(96,165,250,0.14), transparent 70%)",
            }}
          />

          {/* converging pieces */}
          <div className="relative grid grid-cols-2 gap-3">
            {platformPieces.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 hover:border-[#3B82F6]/40 transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm">
                  <p.Icon className="h-[18px] w-[18px] text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight truncate">
                    {p.label}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{p.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* converging arrows */}
          <div className="relative my-4 flex items-center justify-center gap-1.5 text-[#3B82F6]/50">
            <ArrowRight className="h-4 w-4 rotate-90" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              everything converges
            </span>
            <ArrowRight className="h-4 w-4 rotate-90" />
          </div>

          {/* the hub: one customer record */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="relative rounded-2xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#EAF2FF] to-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full blur-xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(59,130,246,0.4), transparent 70%)",
                  }}
                />
                <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow-[0_14px_28px_-12px_rgba(29,78,216,0.6)]">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                  One customer record
                </p>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Every conversation, channel, and campaign — together.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8] shrink-0">
                <Sparkles className="h-2.5 w-2.5" /> Unified
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-200 pt-3">
              {["Chat", "Voice", "WhatsApp", "Email", "Campaigns"].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-[10px] text-slate-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   What we believe — value cards
─────────────────────────────────────────────────────────────── */

const beliefs = [
  {
    Icon: Layers,
    title: "One place.",
    body: "Customer experience should live in one product, not four. The agentic AI, the channels, the numbers, and the campaigns belong together — not stitched across vendors that never quite talk to each other.",
  },
  {
    Icon: Users,
    title: "AI and humans together.",
    body: "The best service blends agentic AI and your team in one inbox. The AI handles what it can, hands off what it can't, and your people pick up with full context already attached.",
  },
  {
    Icon: Tag,
    title: "Transparent pricing.",
    body: "You should know what you pay before you talk to sales. No per-resolution surprises, no hidden enterprise gates — just clear plans you can read, compare, and start on today.",
  },
  {
    Icon: Unlock,
    title: "No gatekeeping.",
    body: "Powerful tools shouldn't require a developer. Connect your channels, point the AI at your knowledge and tools, set your guardrails — and go live in days, not a quarter-long project.",
  },
]

/* ─────────────────────────────────────────────────────────────
   What's in the platform — cross-links
─────────────────────────────────────────────────────────────── */

const platformLinks = [
  {
    to: "/agentic-ai",
    Icon: Bot,
    title: "Agentic AI",
    body: "Autonomous AI that completes multi-step tasks across your tools.",
  },
  {
    to: "/ai-agents",
    Icon: Sparkles,
    title: "AI Agents",
    body: "Prebuilt agents for support, sales, booking, and qualification.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox where AI and your team work side by side.",
  },
  {
    to: "/products/agent-copilot",
    Icon: MessageSquare,
    title: "Agent Copilot",
    body: "Agentic AI assisting your human agents in real time.",
  },
  {
    to: "/integrations",
    Icon: Plug,
    title: "Integrations",
    body: "200+ apps, plus REST API and webhooks for everything else.",
  },
  {
    to: "/products/analytics",
    Icon: BarChart3,
    title: "Analytics",
    body: "One view of every conversation, channel, and campaign.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Organization schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What does FloatChat do?",
    answer:
      "FloatChat puts agentic AI, every channel, the numbers, and broadcasting in one platform. Instead of buying a chatbot from one vendor, a phone number from another, and a campaign tool from a third, you run the whole customer experience from a single product — with one customer record across all of it.",
  },
  {
    question: "Who is FloatChat for?",
    answer:
      "Teams that are tired of stitching tools together. If you're replacing several vendors — a separate bot, inbox, messaging provider, and broadcast tool — with one platform, FloatChat is built for you. Support, sales, and customer experience teams of every size run on it.",
  },
  {
    question: "How do I start with FloatChat?",
    answer:
      "Two ways: book a demo and we'll walk you through it, or start free and explore the platform yourself today. Either way you connect your channels, point the AI at your knowledge and tools, set your guardrails, and you're live — usually within the first week.",
  },
  {
    question: "Is FloatChat's pricing transparent?",
    answer:
      "Yes. You can see plans and what they include before you ever talk to sales — no per-resolution fees buried in the fine print and no mandatory enterprise contract just to get started. You know what you pay up front.",
  },
  {
    question: "Do I need a developer to use FloatChat?",
    answer:
      "No. Powerful tools shouldn't require an engineering project. There are no conversation journeys to map and no code to write — connect your channels, point the AI at your knowledge base and tools, set your guardrails, and go live in days.",
  },
]

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FloatChat",
  url: "https://www.floatchat.com",
  description:
    "FloatChat puts agentic AI, every channel, and broadcasting in one platform so teams can run customer experience without stitching tools together.",
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AboutUsPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={organizationSchema} />

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
                  <Heart className="h-3.5 w-3.5" />
                  About FloatChat
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Building one platform for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI conversations.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Customer experience is bought in pieces and paid for in gaps. We
                  built FloatChat so one platform handles the agentic AI, the
                  channels, the numbers, and the campaigns — with one customer
                  record across all of it.
                </motion.p>

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
                      to="/demo"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Get a Demo
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                  <Link
                    to="/contact-us"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  One platform, every customer conversation.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <OnePlatformDiagram />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── OUR MISSION ───── */}
        <section className="relative py-20 lg:py-28 bg-white border-y border-slate-200/70 overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="flex justify-center">
                <SectionEyebrow num="01" label="Our mission" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.08]">
                Customer experience is bought in pieces and paid for in gaps.
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <div className="mt-6 space-y-4 text-base lg:text-lg text-slate-500 leading-relaxed">
                <p>
                  We built FloatChat so one platform handles the agentic AI, the
                  channels, the numbers, and the campaigns — with one customer
                  record across all of it. No more exporting from one tool to
                  import into the next, no more context that resets the moment a
                  customer switches from chat to a call.
                </p>
                <p>
                  When everything that touches a customer lives in the same place,
                  the seams disappear. The AI knows the history, your team sees the
                  whole thread, and a campaign you send lands in the same record as
                  the reply it earns. That&apos;s the platform we set out to build —
                  and the reason teams choose FloatChat.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHAT WE BELIEVE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What we believe" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Four convictions behind FloatChat.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  These shape every decision — what we build, how we price it, and
                  who gets to use it without an engineering team.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {beliefs.map((b, i) => (
                <BlurFade key={b.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <b.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {b.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHY IT MATTERS ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <BlurFade>
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F2A4A] via-[#1D4ED8] to-[#2563EB] px-6 sm:px-10 lg:px-14 py-14 lg:py-20 text-white shadow-[0_40px_80px_-40px_rgba(15,42,74,0.6)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-20 w-[460px] h-[460px] rounded-full bg-white/10 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[400px] rounded-full bg-[#60A5FA]/30 blur-3xl"
                />
                <div className="relative max-w-3xl">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <span className="text-[11px] font-mono text-white/50">/ 03</span>
                    <span className="h-px w-8 bg-white/30" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#A8C8FF]">
                      Why it matters
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
                    When the AI, the channels, and the campaigns share a platform,
                    teams move faster and customers get a consistent experience
                    everywhere.
                  </h2>
                  <p className="mt-5 text-base lg:text-lg text-white/70 leading-relaxed">
                    No tab-switching, no re-explaining, no context lost between
                    tools. One platform means one source of truth — for your team
                    and for the people they serve.
                  </p>
                </div>

                <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      Icon: Layers,
                      value: "One platform",
                      label: "agentic AI, channels & broadcasting together",
                    },
                    {
                      Icon: Inbox,
                      value: "One inbox",
                      label: "AI and your team, side by side",
                    },
                    {
                      Icon: Users,
                      value: "One customer record",
                      label: "every conversation in one place",
                    },
                  ].map((s) => (
                    <div
                      key={s.value}
                      className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-5 py-5"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <s.Icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="mt-3 text-lg font-semibold leading-tight">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[13px] text-white/70 leading-snug">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHAT'S IN THE PLATFORM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="What's in the platform" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything customer experience needs, in one product.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  These aren&apos;t separate subscriptions bolted together — they
                  share one customer record and one place to work.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {platformLinks.map((c, i) => (
                <BlurFade key={c.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {c.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.45}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#1D4ED8]" strokeWidth={3} />
                  See how it compares —{" "}
                  <Link
                    to="/compare"
                    className="font-medium text-[#1D4ED8] underline underline-offset-2 hover:no-underline"
                  >
                    Compare FloatChat
                  </Link>
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  Transparent{" "}
                  <Link
                    to="/pricing"
                    className="font-medium text-[#1D4ED8] underline underline-offset-2 hover:no-underline"
                  >
                    pricing
                  </Link>
                </span>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Build your customer experience on one platform."
          body="Agentic AI, every channel, and broadcasting — one product, one customer record."
          primaryLabel="Get a Demo"
          primaryHref="/demo"
          secondaryLabel="Start Free"
          secondaryHref="/signup?plan=free"
        />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="About FloatChat — common questions"
              description="What FloatChat does, who it's for, and how to get started."
              footer={
                <p className="text-sm text-muted-foreground">
                  Want the full tour?{" "}
                  <Link
                    to="/about"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Learn more about us
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/contact-us"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    talk to our team
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,219,254,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #3B82F6 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.4), rgba(96,165,250,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.3), transparent 70%)",
                }}
                aria-hidden="true"
              />

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
                  One platform
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Build your customer experience on{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  one platform.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Agentic AI, every channel, and broadcasting — one product, one
                customer record, no tools to stitch together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Get a Demo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Contact Us
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="relative text-sm text-slate-500"
              >
                One platform, every customer conversation.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
