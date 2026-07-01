"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Check,
  X,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Code2,
  MousePointerClick,
  Boxes,
  Radio,
  Inbox,
  Bot,
  ShieldCheck,
  Rocket,
  Wallet,
  GitBranch,
  Terminal,
  Layers,
  MessageSquare,
} from "lucide-react"
import { SiTwilio, SiWhatsapp } from "react-icons/si"
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
  title: "FloatChat vs Twilio — A No-Code Agentic AI Alternative",
  description:
    "Compare FloatChat and Twilio. Get agentic AI, channels, and broadcasting as a finished, no-code product, without building on raw APIs.",
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
   SIGNATURE ELEMENT — "raw APIs vs finished product"
   Left: a code/API-blocks column (what you'd assemble on Twilio).
   Right: a no-code FloatChat UI column (what ships out of the box).
─────────────────────────────────────────────────────────────── */

function BuildVsBuyVisual() {
  const apiBlocks = [
    {
      file: "send-message.ts",
      lines: [
        <>
          <span className="text-slate-400">const</span>{" "}
          <span className="text-[#60A5FA]">client</span> ={" "}
          <span className="text-emerald-300">require</span>(
          <span className="text-slate-300">&apos;twilio&apos;</span>)(sid, token)
        </>,
        <>
          <span className="text-slate-400">await</span> client.messages.
          <span className="text-[#60A5FA]">create</span>(&#123;
        </>,
        <>
          {"  "}from: <span className="text-slate-300">&apos;whatsapp:+1…&apos;</span>,
          to, body,
        </>,
        <>&#125;)</>,
      ],
    },
    {
      file: "handle-webhook.ts",
      lines: [
        <>
          app.<span className="text-[#60A5FA]">post</span>(
          <span className="text-slate-300">&apos;/inbound&apos;</span>, (req, res) =&gt;
          &#123;
        </>,
        <>
          {"  "}
          <span className="text-slate-500">// parse, dedupe, store, route…</span>
        </>,
        <>
          {"  "}
          <span className="text-slate-500">// build your own inbox UI</span>
        </>,
        <>&#125;)</>,
      ],
    },
  ]

  const uiRows = [
    { Icon: Bot, label: "Agent", meta: "trained on your data", tone: "Live" },
    { Icon: Inbox, label: "Shared inbox", meta: "7 channels, one view", tone: "On" },
    { Icon: Radio, label: "Broadcast", meta: "campaign builder", tone: "Ready" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-4 items-stretch">
      {/* LEFT — build on raw APIs */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B1220] overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.5)]">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 bg-[#0F1830]">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
          <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <Terminal className="h-3 w-3" /> build-on-twilio
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-slate-700 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            <Code2 className="h-2.5 w-2.5" /> raw APIs
          </span>
        </div>
        <div className="p-3 space-y-3">
          {apiBlocks.map((b) => (
            <div
              key={b.file}
              className="rounded-lg border border-slate-800 bg-[#0A0F1C] overflow-hidden"
            >
              <div className="px-2.5 py-1.5 border-b border-slate-800/80 flex items-center gap-1.5">
                <Code2 className="h-3 w-3 text-slate-500" />
                <span className="font-mono text-[9.5px] text-slate-500">
                  {b.file}
                </span>
              </div>
              <pre className="px-2.5 py-2 font-mono text-[10px] leading-[1.7] text-slate-300 overflow-x-auto">
                {b.lines.map((ln, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-700 select-none w-3 text-right">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">{ln}</span>
                  </div>
                ))}
              </pre>
            </div>
          ))}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {["+ inbox UI", "+ agent logic", "+ campaign tool", "+ hosting"].map(
              (t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-800 bg-slate-900/60 px-2 py-1 text-[9.5px] font-medium text-slate-400"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <p className="pt-1 text-[10px] text-slate-500 leading-snug">
            Engineers, webhooks, and glue code before you ship a single reply.
          </p>
        </div>
      </div>

      {/* CENTER — vs pill + arrow */}
      <div className="flex lg:flex-col items-center justify-center gap-3 py-1">
        <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white text-[11px] font-bold shadow-lg shadow-[#3B82F6]/30 ring-4 ring-[#3B82F6]/10">
          vs
        </span>
        <ArrowRight className="h-5 w-5 text-[#3B82F6] lg:rotate-0 rotate-90" />
      </div>

      {/* RIGHT — finished FloatChat product (no-code UI) */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 font-mono text-[10px] text-slate-400">
            app.floatchat.com
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <MousePointerClick className="h-2.5 w-2.5" /> no-code
          </span>
        </div>
        <div className="p-3 space-y-2.5">
          {uiRows.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
            >
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                <r.Icon className="h-4 w-4 text-white" strokeWidth={2.25} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-[#0F2A4A] leading-tight">
                  {r.label}
                </p>
                <p className="text-[10px] text-slate-500 truncate">{r.meta}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {r.tone}
              </span>
            </motion.div>
          ))}
          <div className="rounded-xl bg-[#EAF2FF] border border-[#3B82F6]/20 px-3 py-2.5 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#1D4ED8] shrink-0" />
            <p className="text-[11px] text-[#0F2A4A] leading-snug">
              Agent, inbox, and broadcasting — configured, hosted, and live in
              days.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <div className="h-6 w-6 rounded-full bg-[#25D366] flex items-center justify-center">
              <SiWhatsapp style={{ color: "#fff", width: 12, height: 12 }} />
            </div>
            <span className="text-[10px] text-slate-500">
              WhatsApp, SMS, email, voice, web, Instagram, Messenger
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Comparison table data
─────────────────────────────────────────────────────────────── */

type Cell = { text: string; state: "yes" | "no" | "neutral" }
type Row = { feature: string; float: Cell; twilio: Cell }

const tableRows: Row[] = [
  {
    feature: "No-code agentic AI",
    float: { text: "Built in, ready to configure", state: "yes" },
    twilio: { text: "Build it yourself on the APIs", state: "no" },
  },
  {
    feature: "Omnichannel shared inbox",
    float: { text: "Included, one view", state: "yes" },
    twilio: { text: "Not a product — you build the UI", state: "no" },
  },
  {
    feature: "Broadcast / campaign UI",
    float: { text: "Visual campaign builder", state: "yes" },
    twilio: { text: "API only", state: "no" },
  },
  {
    feature: "Channels (WhatsApp, SMS, email, voice, web, social)",
    float: { text: "Connected out of the box", state: "yes" },
    twilio: { text: "Available via APIs, wired by you", state: "neutral" },
  },
  {
    feature: "DID / phone numbers",
    float: { text: "Provisioned in-product", state: "yes" },
    twilio: { text: "Yes, self-serve", state: "yes" },
  },
  {
    feature: "Global reach & deliverability",
    float: { text: "On carrier-grade infrastructure", state: "yes" },
    twilio: { text: "Extensive global coverage", state: "yes" },
  },
  {
    feature: "Needs a developer to launch",
    float: { text: "No — point, click, publish", state: "yes" },
    twilio: { text: "Yes — engineering project", state: "no" },
  },
  {
    feature: "Time to first live conversation",
    float: { text: "Days", state: "yes" },
    twilio: { text: "Weeks of build time", state: "neutral" },
  },
  {
    feature: "Raw programmable APIs",
    float: { text: "Available if you want them", state: "yes" },
    twilio: { text: "Core of the platform", state: "yes" },
  },
  {
    feature: "Pricing model",
    float: { text: "Bundled USD plans", state: "yes" },
    twilio: { text: "Usage-based, scales with volume", state: "neutral" },
  },
]

function StateIcon({ state }: { state: Cell["state"] }) {
  if (state === "yes")
    return (
      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" strokeWidth={3} />
    )
  if (state === "no")
    return <X className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" strokeWidth={2.5} />
  return (
    <span className="h-4 w-4 shrink-0 mt-0.5 flex items-center justify-center">
      <span className="h-1 w-3 rounded-full bg-slate-300" />
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Where FloatChat goes further
─────────────────────────────────────────────────────────────── */

const furtherCards = [
  {
    Icon: Boxes,
    title: "Finished, not raw",
    body: "A working agent, an omnichannel inbox, and a broadcasting UI arrive assembled. There is nothing to stitch together from primitives before your first reply goes out.",
  },
  {
    Icon: Rocket,
    title: "No developer required",
    body: "Connect a channel, point the agent at your knowledge base, and publish. Launching is a configuration task for your team, not a sprint for your engineers.",
  },
  {
    Icon: Wallet,
    title: "Predictable pricing",
    body: "Bundled USD plans instead of metered usage that climbs with every message and minute. You can forecast the bill before you scale, not after.",
  },
  {
    Icon: Layers,
    title: "The outcome, delivered",
    body: "You get Twilio-grade reach as a product you run, not a toolkit you maintain. Updates, hosting, and the UI are ours to keep working.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is FloatChat really an alternative to Twilio?",
    answer:
      "For teams that want messaging, agentic AI, and broadcasting as a finished product, yes. Twilio gives you programmable building blocks and expects you to assemble the application on top. FloatChat delivers that application — the agent, the shared inbox, and the campaign UI — already built, so you skip the engineering project and go straight to running conversations.",
  },
  {
    question: "Do I need engineers to launch on FloatChat?",
    answer:
      "No. FloatChat is no-code: you connect your channels, point the agent at your help center, PDFs, and website, and publish. There is an API available if you want to extend or integrate, but nothing about the core setup requires writing code or wiring webhooks.",
  },
  {
    question: "Does FloatChat include an inbox?",
    answer:
      "Yes — an omnichannel shared inbox where WhatsApp, SMS, email, voice, web chat, Instagram, and Messenger conversations land in one view, with the same customer record following the person across every channel. On Twilio, that inbox is something you would design and build yourself on top of the messaging APIs.",
  },
  {
    question: "Can FloatChat broadcast to a large audience?",
    answer:
      "Yes, through a built-in campaign UI. You segment your audience, compose the message, and send — no scripting a bulk-send job against an API. Broadcasting is a product feature in FloatChat rather than an integration you have to code.",
  },
  {
    question: "Where is Twilio genuinely the stronger choice?",
    answer:
      "Twilio is excellent when you have engineers and specifically want to build a fully custom communications stack from low-level primitives, with fine-grained control over every request. Its APIs and global coverage are first-rate. If the build itself is the goal, that flexibility is the point. FloatChat is for teams that want the finished outcome instead.",
  },
  {
    question: "What happens to my phone numbers and global reach?",
    answer:
      "FloatChat provisions DID numbers in-product and runs on carrier-grade infrastructure, so you keep the reach and deliverability you would expect from a communications platform — without managing the plumbing. You get the coverage as part of the product, not as another API to operate.",
  },
]

const faqSchema = faqs
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FloatChat",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "FloatChat is a no-code agentic AI platform that delivers messaging channels, an omnichannel inbox, and broadcasting as a finished product — a Twilio alternative that skips building on raw APIs.",
  url: "https://www.floatchat.com/compare/twilio",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Start free — no-code agentic AI, channels, and broadcasting.",
  },
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related compare links
─────────────────────────────────────────────────────────────── */

const relatedCompares = [
  { to: "/compare/haptik", label: "FloatChat vs Haptik", meta: "Enterprise CDP bots" },
  { to: "/compare/twixor", label: "FloatChat vs Twixor", meta: "CPaaS journeys" },
  { to: "/compare/infobip", label: "FloatChat vs Infobip", meta: "Omnichannel CPaaS" },
  { to: "/compare", label: "All comparisons", meta: "See every alternative" },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function CompareTwilioPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqSchema} />
      <JsonLd schema={softwareSchema} />

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
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
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
                "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
              >
                <SiTwilio style={{ width: 14, height: 14 }} />
                FloatChat vs Twilio · build-vs-buy comparison
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
              >
                FloatChat vs Twilio: agentic AI{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  without the developer.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-2xl leading-relaxed"
              >
                Everything Twilio&apos;s APIs can power, delivered as a finished
                product — with the agent, the omnichannel inbox, and broadcasting
                already built in. Get the outcome, not the build.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
              >
                {[
                  "No-code, no webhooks",
                  "Inbox & broadcasting included",
                  "Live in days",
                  "Predictable USD pricing",
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
                For teams that want the outcome, not the build.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ───── BUILD VS BUY VISUAL ───── */}
        <section className="relative py-20 lg:py-28 bg-white border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="Raw APIs vs finished product" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Same reach. Two very different starting points.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Twilio hands you programmable primitives and expects you to build
                  the application. FloatChat hands you the application. Here is what
                  each side actually asks of your team.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <BuildVsBuyVisual />
            </BlurFade>

            <BlurFade delay={0.2}>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5" /> Building on Twilio
                  </p>
                  <p className="text-[13.5px] text-slate-600 leading-relaxed">
                    You wire messaging APIs, parse webhooks, store conversations,
                    design an inbox, code your own agent logic, and host it all —
                    then keep it running. Powerful, but it is a product you have to
                    build and own.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#3B82F6]/25 bg-[#EAF2FF] p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-2 flex items-center gap-1.5">
                    <MousePointerClick className="h-3.5 w-3.5" /> Running on FloatChat
                  </p>
                  <p className="text-[13.5px] text-[#0F2A4A]/80 leading-relaxed">
                    You connect a channel, point the agent at your knowledge, and
                    publish. The inbox, the broadcasting, and the hosting are already
                    there. It is the same reach as a product you simply run.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── COMPARISON TABLE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="At a glance" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  FloatChat vs Twilio, feature by feature.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A fair read: Twilio&apos;s APIs and coverage are excellent. The
                  difference is how much you assemble yourself versus how much ships
                  ready to run.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.2)]">
                {/* Header */}
                <div className="grid grid-cols-12 bg-[#0F2A4A] text-white">
                  <div className="col-span-6 sm:col-span-6 px-4 sm:px-6 py-4 text-[13px] font-semibold">
                    Capability
                  </div>
                  <div className="col-span-3 px-3 sm:px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
                      <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" />
                      FloatChat
                    </span>
                  </div>
                  <div className="col-span-3 px-3 sm:px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-300">
                      <SiTwilio style={{ width: 13, height: 13 }} />
                      Twilio
                    </span>
                  </div>
                </div>

                {/* Rows */}
                {tableRows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-12 items-start border-t border-slate-100 ${
                      i % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                    }`}
                  >
                    <div className="col-span-6 px-4 sm:px-6 py-4 text-[13px] font-medium text-[#0F2A4A] leading-snug">
                      {row.feature}
                    </div>
                    <div className="col-span-3 px-3 sm:px-4 py-4">
                      <div className="flex items-start gap-1.5">
                        <StateIcon state={row.float.state} />
                        <span className="text-[12px] text-slate-600 leading-snug">
                          {row.float.text}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 px-3 sm:px-4 py-4">
                      <div className="flex items-start gap-1.5">
                        <StateIcon state={row.twilio.state} />
                        <span className="text-[12px] text-slate-500 leading-snug">
                          {row.twilio.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-slate-400">
                Comparison reflects FloatChat&apos;s product scope and Twilio&apos;s
                positioning as a programmable communications platform. No specific
                Twilio pricing is stated here — check Twilio for current rates.
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
                  The parts you would otherwise build.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Twilio gives you the reach. FloatChat gives you the reach plus
                  everything you would normally build on top of it.
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

            {/* Fair note on Twilio strength */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/60 p-6 lg:p-8 flex flex-col sm:flex-row items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <SiTwilio style={{ width: 20, height: 20, color: "#F22F46" }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F2A4A]">
                    Where Twilio is the right call
                  </h3>
                  <p className="mt-1.5 text-[14px] text-slate-500 leading-relaxed max-w-3xl">
                    If you have engineers and want to build a fully custom
                    communications stack from low-level primitives, Twilio&apos;s
                    APIs and global coverage are outstanding. When the build itself
                    is the goal, that control is exactly what you want. FloatChat is
                    for the teams who would rather run a finished product.
                  </p>
                </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Moving over" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Switching from a Twilio build.
                </h2>
                <p className="mt-6 text-base text-slate-500 leading-relaxed max-w-xl">
                  You do not have to rip anything out on day one. Most teams stand
                  FloatChat up alongside their existing setup, move channels over as
                  they are ready, and retire the glue code once the finished product
                  is carrying the load.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/demo"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                  >
                    Plan your migration
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full text-sm font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to us
                  </Link>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <ol className="space-y-4">
                  {[
                    {
                      Icon: MessageSquare,
                      title: "Connect your channels",
                      body: "Link WhatsApp, SMS, email, voice, web chat, and social. Provision or port DID numbers inside the product — no API wiring.",
                    },
                    {
                      Icon: Bot,
                      title: "Point the agent at your knowledge",
                      body: "Feed it your help center, PDFs, and website. The agent grounds its answers in your data instead of running hand-coded flows.",
                    },
                    {
                      Icon: Inbox,
                      title: "Move conversations into one inbox",
                      body: "Your team works from a single shared inbox instead of a UI you maintain. Broadcasting moves into the visual campaign builder.",
                    },
                    {
                      Icon: GitBranch,
                      title: "Retire the glue code",
                      body: "Once traffic runs cleanly through FloatChat, decommission the webhooks, storage, and hosting you were carrying yourself.",
                    },
                  ].map((step, i) => (
                    <li
                      key={step.title}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="relative shrink-0">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                          <step.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                        </div>
                        <span className="absolute -top-1.5 -left-1.5 h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-[#1D4ED8]">
                          {i + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0F2A4A]">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-[13.5px] text-slate-500 leading-relaxed">
                          {step.body}
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
          headline="Get Twilio-grade reach without the build."
          body="Agentic AI, an omnichannel inbox, and broadcasting — as a no-code product you can launch this week."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── RELATED COMPARE LINKS ───── */}
        <section className="relative py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <SectionEyebrow num="05" label="Keep comparing" />
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0F2A4A]">
                    Other FloatChat comparisons.
                  </h2>
                </div>
                <Link
                  to="/compare"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors shrink-0"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </BlurFade>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCompares.map((r, i) => (
                <BlurFade key={r.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-20px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GitBranch className="h-4 w-4 text-[#1D4ED8]" />
                      <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-400">
                        Compare
                      </span>
                    </div>
                    <p className="text-[15px] font-semibold text-[#0F2A4A] leading-tight">
                      {r.label}
                    </p>
                    <p className="mt-1 text-[12.5px] text-slate-500">{r.meta}</p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#1D4ED8]">
                      Read
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="text-slate-400">Explore more:</span>
                {[
                  { to: "/agentic-ai", label: "Agentic AI" },
                  { to: "/platform", label: "Platform" },
                  { to: "/integrations", label: "Integrations" },
                  { to: "/pricing", label: "Pricing" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="FloatChat vs Twilio — FAQ"
              description="The questions teams ask when they are weighing a build on Twilio against a finished product."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 bg-[#0F2A4A] overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, #1D4ED8 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#BFD4FF]">
                <Sparkles className="h-3.5 w-3.5" />
                A no-code Twilio alternative
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.08]">
                Get the outcome, skip the build.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Agentic AI, channels, and broadcasting as a finished product —
                without assembling anything on raw APIs. Start free, or see it live
                on a demo.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/signup?plan=free"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.6)] ring-4 ring-[#3B82F6]/20 transition-all"
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
              <p className="mt-5 text-sm text-slate-400">
                No credit card required · live in days · predictable USD pricing.
              </p>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
