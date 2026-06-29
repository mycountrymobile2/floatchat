"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowRight, Check, Sparkles } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlurFade } from "@/components/ui/blur-fade"
import { InlineCTA } from "@/components/inline-cta"
import { JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"
import { AGENTS } from "@/components/ai-agents/agents-data"

const SITE = "https://www.floatchat.com"

export const metadata = {
  title: "Agentic AI Agents for Support, Sales, Booking & Leads | FloatChat",
  description:
    "Deploy agentic AI agents for customer service, sales, booking, and lead qualification — or build your own, no code. One platform, one inbox, one customer record.",
}

const PERKS = [
  "No-code to launch, API when you need it",
  "Grounded in your data and policies",
  "Deploys across WhatsApp, web, SMS, voice & social",
  "Full-context human handoff built in",
]

export default function AiAgentsHubPage() {
  usePageMeta({ title: metadata.title, description: metadata.description })

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "FloatChat AI Agents",
    itemListElement: AGENTS.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.navLabel,
      url: `${SITE}${a.path}`,
    })),
  }

  return (
    <>
      <Header />
      <JsonLd schema={itemListSchema} />

      <main id="main-content" className="pt-20">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="relative pt-14 pb-16 lg:pt-20 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
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
              <Sparkles className="h-3.5 w-3.5" />
              Agentic AI Agents
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
            >
              AI agents for every{" "}
              <span className="text-[#1D4ED8]">conversation.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Deploy agentic AI agents that resolve support, close sales, fill
              your calendar, and qualify leads — or build your own with no code.
              Every agent shares one inbox, one customer record, and the same
              guardrails.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
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
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-slate-500"
            >
              {PERKS.map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[#1B6BFF]" />
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ───────────────────────── AGENT GRID ───────────────────────── */}
        <section className="relative py-16 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {AGENTS.map((a, i) => (
                <BlurFade key={a.slug} delay={0.05 + i * 0.07} className="h-full">
                  <Link
                    to={a.path}
                    className="group relative h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${a.accent} flex items-center justify-center shadow-md`}
                    >
                      <a.hubIcon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {a.navLabel}
                    </h2>
                    <p className="mt-2 text-[14px] text-slate-500 leading-relaxed flex-1">
                      {a.cardSummary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Explore
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}

              {/* Closing CTA card */}
              <BlurFade delay={0.05 + AGENTS.length * 0.07} className="h-full">
                <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative flex h-full flex-col">
                    <h2 className="text-xl font-semibold">Not sure where to start?</h2>
                    <p className="mt-2 text-[14px] text-white/80 leading-relaxed flex-1">
                      Tell us what you want to automate and we'll recommend the
                      right agent — or build a custom one for your workflow.
                    </p>
                    <Link
                      to="/demo"
                      className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-[#1D4ED8] hover:bg-slate-100 transition-colors w-fit"
                    >
                      Book a demo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───────────────────────── INLINE CTA ───────────────────────── */}
        <InlineCTA
          headline="One platform for every agent."
          body="Support, sales, booking, and lead qualification — sharing the same inbox, data, and guardrails."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />
      </main>
      <Footer />
    </>
  )
}
