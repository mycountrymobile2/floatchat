"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Check,
  TrendingDown,
  Scale,
  Search,
} from "lucide-react"
import { SiIntercom, SiZendesk, SiHubspot } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Competitors
─────────────────────────────────────────────────────────────── */

type IconCmp = React.ComponentType<{
  style?: React.CSSProperties
  className?: string
}>

type Competitor = {
  name: string
  href: string
  initial: string
  tileBg: string
  tagline: string
  savings: string
  category: "AI Inbox" | "Helpdesk" | "Live Chat" | "WhatsApp / Multichannel"
  featured?: boolean
  Icon?: IconCmp
}

const competitors: Competitor[] = [
  {
    name: "Intercom",
    href: "/vs/intercom",
    initial: "I",
    tileBg: "#0057FF",
    tagline:
      "Same Fin-class AI, helpdesk, and shared inbox — no per-resolution fees.",
    savings: "90% lower price",
    category: "AI Inbox",
    featured: true,
    Icon: SiIntercom,
  },
  {
    name: "Zendesk",
    href: "/vs/zendesk",
    initial: "Z",
    tileBg: "#03363D",
    tagline:
      "Same multichannel inbox + AI for 10 agents at a fraction of Zendesk Suite Pro.",
    savings: "From $69 vs $1,150",
    category: "Helpdesk",
    featured: true,
    Icon: SiZendesk,
  },
  {
    name: "Tidio",
    href: "/vs/tidio",
    initial: "T",
    tileBg: "#1976D2",
    tagline:
      "Voice, SMS, Captain bundled — Tidio caps free at 50 conv/mo.",
    savings: "Real upgrade path",
    category: "Live Chat",
  },
  {
    name: "Freshchat",
    href: "/vs/freshchat",
    initial: "F",
    tileBg: "#25C16F",
    tagline:
      "AI bundled, not metered. No Freddy add-on, no per-session fees.",
    savings: "AI bundled",
    category: "AI Inbox",
  },
  {
    name: "HubSpot",
    href: "/vs/hubspot",
    initial: "H",
    tileBg: "#FF7A59",
    tagline:
      "Customer Service tier alternative. Same inbox + Captain, less per seat.",
    savings: "Captain bundled",
    category: "Helpdesk",
    Icon: SiHubspot,
  },
  {
    name: "Help Scout",
    href: "/vs/help-scout",
    initial: "H",
    tileBg: "#1292EE",
    tagline:
      "Same email features + 9 more channels. Voice and SMS native.",
    savings: "10× channels",
    category: "Helpdesk",
  },
  {
    name: "Front",
    href: "/vs/front",
    initial: "F",
    tileBg: "#A857FF",
    tagline:
      "Same shared inbox + assignments at a tenth of Front Growth's 10-seat bill.",
    savings: "88% cheaper",
    category: "Helpdesk",
  },
  {
    name: "Drift",
    href: "/vs/drift",
    initial: "D",
    tileBg: "#1F1F1F",
    tagline:
      "Drift's conversational AI story, on the Lite plan.",
    savings: "AI from $9.99",
    category: "Live Chat",
  },
  {
    name: "Gorgias",
    href: "/vs/gorgias",
    initial: "G",
    tileBg: "#2C2A4A",
    tagline:
      "Same Shopify-first features without the $50 Starter floor.",
    savings: "Shopify on Free",
    category: "WhatsApp / Multichannel",
  },
  {
    name: "Crisp",
    href: "/vs/crisp",
    initial: "C",
    tileBg: "#1972F5",
    tagline:
      "AI bundled. No Crisp Pro add-ons, no metered MagicReply.",
    savings: "Bundled AI",
    category: "AI Inbox",
  },
  {
    name: "Tawk.to",
    href: "/vs/tawk",
    initial: "T",
    tileBg: "#37D0FF",
    tagline:
      "Tawk gives you a widget — FloatChat gives you the inbox, AI, and upgrade path.",
    savings: "Real upgrade path",
    category: "Live Chat",
  },
  {
    name: "ChatMitra",
    href: "/vs/chatmitra",
    initial: "C",
    tileBg: "#25D366",
    tagline:
      "Same Auto Reply + AI Chatbot stack, plus 9 more channels.",
    savings: "17% cheaper",
    category: "WhatsApp / Multichannel",
  },
]

const categories = [
  "AI Inbox",
  "Helpdesk",
  "Live Chat",
  "WhatsApp / Multichannel",
] as const

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
   Comparison card
─────────────────────────────────────────────────────────────── */

function ComparisonCard({ c }: { c: Competitor }) {
  return (
    <Link
      to={c.href}
      className="group relative flex flex-col h-full rounded-3xl border border-slate-200 bg-white p-6 hover:border-[#3B82F6]/40 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Hover hairline */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)",
        }}
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-[0_8px_18px_-8px_rgba(15,42,74,0.25)] ring-1 ring-black/5 shrink-0"
          style={{ background: c.tileBg }}
        >
          {c.Icon ? (
            <c.Icon style={{ color: "#FFFFFF", width: 22, height: 22 }} />
          ) : (
            c.initial
          )}
        </div>
        {c.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#1D4ED8]">
            <Sparkles className="h-2.5 w-2.5" />
            Top match
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
        FloatChat vs {c.name}
      </h3>

      <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed flex-1">
        {c.tagline}
      </p>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700">
          <TrendingDown className="h-3 w-3" />
          {c.savings}
        </span>
        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#1D4ED8] group-hover:gap-2 transition-all">
          See comparison
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How is FloatChat usually cheaper?",
    answer:
      "We bundle AI on every paid plan from $9.99 instead of charging per resolution. Voice and SMS are native (no Twilio markup). Pricing scales by capacity, not per-seat, so adding agents doesn't blow up your bill.",
  },
  {
    question: "Do you support migration from these tools?",
    answer:
      "Yes — free migration when you switch from Intercom, Zendesk, Tidio, Freshchat, HubSpot Service Hub, Front, Help Scout, Crisp, or Tawk.to. We export your data, import it to FloatChat, train Captain on your help docs, and have your team live in 48 hours.",
  },
  {
    question: "Which comparison should I read first?",
    answer:
      "Pick the tool you're currently paying for. If you're between two, Intercom and Zendesk comparisons are the most-read and cover the broadest feature surface.",
  },
  {
    question: "How accurate are the published pricing numbers?",
    answer:
      "Every competitor price comes from that vendor's public website at the time of writing. We update quarterly. If a vendor changes pricing, ping us via /contact and we'll refresh.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function ComparePage() {
  useEffect(() => {
    document.title = "Compare FloatChat to Other Tools | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Side-by-side comparisons of FloatChat vs Intercom, Zendesk, Tidio, Freshchat, HubSpot, Help Scout, Front, Drift, Gorgias, Crisp, Tawk.to, and ChatMitra.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
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

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
              >
                <Scale className="h-3.5 w-3.5" />
                Compare · 12 alternatives
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
              >
                Compare FloatChat to{" "}
                <span className="text-[#1D4ED8]">every alternative.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
              >
                Side-by-side comparisons against the 12 support tools US teams
                evaluate most often. Published pricing, real feature deltas, free
                migration when you switch.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500"
              >
                {[
                  "Apples-to-apples pricing",
                  "Updated quarterly",
                  "Free migration",
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
                  Book a Demo
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── ALL COMPARISONS GRID ───── */}
        <section className="relative py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <BlurFade>
                <SectionEyebrow num="01" label="All comparisons" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Pick the tool you're paying for now.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Each comparison includes a side-by-side feature table, real
                  pricing math, and a migration plan.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {competitors.map((c, i) => (
                <BlurFade key={c.name} delay={0.04 + i * 0.04} className="h-full">
                  <ComparisonCard c={c} />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── BY CATEGORY ───── */}
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
            <div className="max-w-3xl mb-10">
              <BlurFade>
                <SectionEyebrow num="02" label="By category" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Find a comparison by category.
                </h2>
              </BlurFade>
            </div>

            <div className="space-y-8">
              {categories.map((cat, ci) => {
                const items = competitors.filter((c) => c.category === cat)
                return (
                  <BlurFade key={cat} delay={0.05 + ci * 0.05}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6 shadow-[0_15px_40px_-25px_rgba(15,42,74,0.18)]">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                          {cat}
                        </p>
                        <span className="text-[10.5px] text-slate-400">
                          {items.length}{" "}
                          {items.length === 1 ? "comparison" : "comparisons"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {items.map((c) => (
                          <Link
                            key={c.name}
                            to={c.href}
                            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 hover:border-[#3B82F6]/30 hover:bg-slate-50 transition-all"
                          >
                            <div
                              className="h-8 w-8 rounded-md flex items-center justify-center text-white text-sm font-bold shrink-0"
                              style={{ background: c.tileBg }}
                            >
                              {c.Icon ? (
                                <c.Icon
                                  style={{ color: "#FFFFFF", width: 15, height: 15 }}
                                />
                              ) : (
                                c.initial
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors truncate">
                                vs {c.name}
                              </p>
                              <p className="text-[10.5px] text-slate-500 truncate">
                                {c.savings}
                              </p>
                            </div>
                            <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#3B82F6] transition-colors shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </BlurFade>
                )
              })}
            </div>
          </div>
        </section>

        {/* ───── WHY SWITCH ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="The common thread" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Why teams switch.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Across all twelve comparisons, the same three patterns show
                  up — bundled AI, native voice/SMS, and capacity pricing
                  instead of per-seat.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      stat: "$9.99",
                      label: "AI bundled from Lite",
                      sub: "no per-resolution fees",
                    },
                    {
                      stat: "10",
                      label: "channels native",
                      sub: "voice + SMS, no Twilio glue",
                    },
                    {
                      stat: "48h",
                      label: "to live after switch",
                      sub: "free migration on every tier",
                    },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_15px_30px_-20px_rgba(15,42,74,0.2)]"
                    >
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/40 mb-3">
                        <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
                      </div>
                      <p className="text-3xl font-semibold text-[#1D4ED8] tabular-nums">
                        {s.stat}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#0F2A4A]">
                        {s.label}
                      </p>
                      <p className="text-[11.5px] text-slate-500 mt-0.5">
                        {s.sub}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Not sure which tool to compare against?"
          body="Tell us what you're paying for now. We'll line up the math."
          primaryLabel="Talk to us"
          primaryHref="/contact"
          secondaryLabel="Start Free"
          secondaryHref="/signup?plan=free"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Pricing, migration, accuracy — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  Don't see your tool?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  and we'll line up a fresh comparison.
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
                  Free migration · live in 48h
                </span>
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
                Switching to{" "}
                <span className="text-[#1D4ED8]">FloatChat?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Free migration. Captain trained on your help docs. Your team
                live in 48 hours.
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
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Talk to Sales
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
