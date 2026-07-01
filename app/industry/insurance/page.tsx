"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  FileText,
  ClipboardCheck,
  RefreshCw,
  BellRing,
  Megaphone,
  Calculator,
  Clock,
  Globe,
  GitBranch,
  Users,
  Lock,
  ScrollText,
  CreditCard,
  Layers,
  Workflow,
  Umbrella,
  Car,
  Home,
  HeartPulse,
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
  title: "Agentic AI for Insurance | FloatChat",
  description:
    "Guide quotes, claims, and renewals with agentic AI across every channel, plus reminders and campaigns for retention and cross-sell.",
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
   HERO VISUAL — an insurance journey.
   A Quote → Claim → Renewal stage tracker sits on top, with a
   quote card ($/mo) and a claim-status timeline swapping in below
   as the active stage cycles. Distinct composition from the
   mortgage borrower pipeline.
─────────────────────────────────────────────────────────────── */

type Stage = "quote" | "claim" | "renewal"

const STAGES: { id: Stage; label: string; Icon: typeof FileText }[] = [
  { id: "quote", label: "Quote", Icon: FileText },
  { id: "claim", label: "Claim", Icon: ClipboardCheck },
  { id: "renewal", label: "Renewal", Icon: RefreshCw },
]

function InsuranceJourneyMockup() {
  const [stage, setStage] = useState<Stage>("quote")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setStage("quote")
        await wait(3200)
        if (cancelled) return
        setStage("claim")
        await wait(3600)
        if (cancelled) return
        setStage("renewal")
        await wait(3200)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const activeIdx = STAGES.findIndex((s) => s.id === stage)

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

      {/* Floating policy chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Umbrella className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Policy #POL-4471 · active
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#25D366] flex items-center justify-center">
          <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          WhatsApp · SMS · web
        </span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · policyholder journey
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* Stage tracker */}
        <div className="px-4 py-4 border-b border-slate-200 bg-slate-50/40">
          <div className="flex items-center">
            {STAGES.map((s, i) => {
              const isActive = i === activeIdx
              const isDone = i < activeIdx
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isActive
                          ? "#1D4ED8"
                          : isDone
                          ? "#10B981"
                          : "#E2E8F0",
                      }}
                      transition={{ duration: 0.35 }}
                      className="h-9 w-9 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {isDone ? (
                        <Check className="h-4 w-4 text-white" strokeWidth={3} />
                      ) : (
                        <s.Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-white" : "text-slate-500"
                          }`}
                        />
                      )}
                    </motion.div>
                    <span
                      className={`text-[10px] font-semibold ${
                        isActive
                          ? "text-[#1D4ED8]"
                          : isDone
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2 mt-[-18px] rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]"
                        animate={{ width: i < activeIdx ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stage body */}
        <div className="p-4 min-h-[280px] bg-white">
          <AnimatePresence mode="wait">
            {stage === "quote" && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                {/* Agent line */}
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
                    <p className="text-[11px] text-[#0F2A4A] leading-snug">
                      Got it — auto cover for a 2021 sedan, clean record. Here&apos;s
                      your personalized quote:
                    </p>
                  </div>
                </div>

                {/* Quote card */}
                <div className="rounded-xl border border-[#3B82F6]/25 bg-[#EAF2FF] p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      <Calculator className="h-3 w-3" /> Auto · comprehensive
                    </span>
                    <span className="font-mono text-[8.5px] text-slate-500">
                      Quote #Q-8823
                    </span>
                  </div>
                  <div className="mt-2 flex items-end gap-1.5">
                    <span className="text-3xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
                      $84
                    </span>
                    <span className="text-[12px] text-slate-500 mb-0.5">/mo</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
                      <CheckCircle2 className="h-2.5 w-2.5" /> multi-policy −12%
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {[
                      { k: "Deductible", v: "$500" },
                      { k: "Liability", v: "$100k" },
                      { k: "Roadside", v: "Incl." },
                    ].map((c) => (
                      <div
                        key={c.k}
                        className="rounded-md bg-white border border-slate-200 px-2 py-1.5 text-center"
                      >
                        <p className="text-[8px] uppercase tracking-wide text-slate-400">
                          {c.k}
                        </p>
                        <p className="text-[10.5px] font-semibold text-[#0F2A4A]">
                          {c.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead qualified chip */}
                <div className="flex items-center gap-1.5 pl-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-[9.5px] font-medium text-emerald-600">
                    Lead qualified · scored 92 · routed to bind
                  </span>
                </div>
              </motion.div>
            )}

            {stage === "claim" && (
              <motion.div
                key="claim"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-1.5">
                  <ClipboardCheck className="h-3.5 w-3.5 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    Claim #CLM-2091 · windshield damage
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                    <Sparkles className="h-2.5 w-2.5" /> agent handling
                  </span>
                </div>

                {/* Claim-status timeline */}
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  {[
                    {
                      label: "Claim submitted",
                      note: "photos + details collected",
                      state: "done" as const,
                    },
                    {
                      label: "Coverage verified",
                      note: "matched to policy #POL-4471",
                      state: "done" as const,
                    },
                    {
                      label: "Adjuster assigned",
                      note: "Marta L. · reviewing now",
                      state: "current" as const,
                    },
                    {
                      label: "Payout issued",
                      note: "est. 2 business days",
                      state: "pending" as const,
                    },
                  ].map((step, i, arr) => (
                    <div key={step.label} className="flex gap-2.5">
                      <div className="flex flex-col items-center">
                        <span
                          className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                            step.state === "done"
                              ? "bg-emerald-500"
                              : step.state === "current"
                              ? "bg-[#1D4ED8]"
                              : "bg-slate-200"
                          }`}
                        >
                          {step.state === "done" ? (
                            <Check className="h-2 w-2 text-white" strokeWidth={3} />
                          ) : step.state === "current" ? (
                            <motion.span
                              className="h-1.5 w-1.5 rounded-full bg-white"
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          )}
                        </span>
                        {i < arr.length - 1 && (
                          <span
                            className={`w-0.5 flex-1 my-0.5 ${
                              step.state === "done"
                                ? "bg-emerald-300"
                                : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-2.5">
                        <p
                          className={`text-[10.5px] font-semibold leading-tight ${
                            step.state === "pending"
                              ? "text-slate-400"
                              : "text-[#0F2A4A]"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-[9px] text-slate-500 mt-0.5">
                          {step.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Handoff note */}
                <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-2 flex items-start gap-1.5">
                  <GitBranch className="h-3 w-3 text-slate-700 mt-0.5 shrink-0" />
                  <p className="text-[9.5px] text-slate-900 leading-snug">
                    Complex total-loss? Escalated to a human adjuster with the full
                    claim record attached — no repeat questions.
                  </p>
                </div>
              </motion.div>
            )}

            {stage === "renewal" && (
              <motion.div
                key="renewal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                {/* Reminder bubble on WhatsApp */}
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#3B82F6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[85%] shadow-sm">
                    <p className="text-[11px] text-white leading-snug">
                      Hi Daniela — your policy #POL-4471 renews in 14 days at
                      $84/mo. Tap to confirm and keep your multi-policy discount.
                    </p>
                    <p className="text-[8px] text-white/70 mt-1">
                      via WhatsApp · reminder 1 of 2
                    </p>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <BellRing className="h-3 w-3 text-white" />
                  </div>
                </div>

                {/* Renewal action card */}
                <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold text-[#0F2A4A]">
                      <RefreshCw className="h-3 w-3 text-[#1D4ED8]" /> Auto-renewal
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
                      <CheckCircle2 className="h-2.5 w-2.5" /> payment confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/50 px-2.5 py-2">
                    <CreditCard className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
                    <span className="text-[10px] text-[#0F2A4A]">
                      $84.00 paid · card ···· 4471
                    </span>
                    <span className="ml-auto text-[9px] text-slate-400">
                      next: Jul 15
                    </span>
                  </div>
                </div>

                {/* Cross-sell campaign card */}
                <div className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
                    <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                      Cross-sell campaign queued
                    </span>
                  </div>
                  <p className="mt-1 text-[9.5px] text-[#0F2A4A] leading-snug">
                    Eligible for renters + life bundle — a personalized offer goes
                    out after renewal settles.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function QuotesVisual() {
  const lines = [
    { Icon: Car, label: "Auto", price: "$84/mo" },
    { Icon: Home, label: "Home", price: "$46/mo" },
    { Icon: HeartPulse, label: "Life", price: "$29/mo" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Instant quotes
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Calculator className="h-2.5 w-2.5" /> in-chat
        </span>
      </div>
      {lines.map((l) => (
        <div
          key={l.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-5 w-5 rounded bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <l.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{l.label}</span>
          <span className="ml-auto text-[10px] font-semibold text-[#0F2A4A] tabular-nums">
            {l.price}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function ClaimsVisual() {
  const steps = [
    { label: "Intake + photos", done: true },
    { label: "Coverage verified", done: true },
    { label: "Status update sent", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <ClipboardCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          First notice of loss
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">auto-updates</span>
      </div>
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
              s.done
                ? "bg-emerald-500 text-white"
                : s.current
                ? "bg-[#3B82F6] text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {s.done ? (
              <Check className="h-2 w-2" strokeWidth={3} />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </span>
          <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
          {s.current && (
            <span className="ml-auto text-[8.5px] font-medium text-[#1D4ED8]">
              live
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function RenewalsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <BellRing className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] text-[#0F2A4A] flex-1">
          Renewal in 14 days
        </span>
        <span className="text-[8.5px] text-slate-400">reminder 1</span>
      </div>
      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-emerald-200 bg-emerald-50/60 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <CreditCard className="h-3 w-3 text-emerald-700" />
          <span className="text-[9.5px] font-semibold text-emerald-800">
            Paid · policy stays active
          </span>
        </div>
        <p className="mt-1 text-[9px] text-emerald-900/80 leading-snug">
          SMS + WhatsApp prompts recover lapses before they cost you the renewal.
        </p>
      </div>
    </div>
  )
}

function CrossSellVisual() {
  const offers = [
    { label: "Auto customer", meta: "add renters", tag: "eligible" },
    { label: "Home policy", meta: "add umbrella", tag: "eligible" },
    { label: "New parent", meta: "add life", tag: "targeted" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Cross-sell segments
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Megaphone className="h-2.5 w-2.5" /> campaign
        </span>
      </div>
      {offers.map((o) => (
        <div
          key={o.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="text-[10px] font-medium text-[#0F2A4A]">{o.label}</span>
          <span className="text-[9px] text-slate-500">· {o.meta}</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
            {o.tag}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can it qualify insurance leads?",
    answer:
      "Yes. The agent runs a natural conversation that asks the right underwriting-relevant questions — coverage type, vehicle or property details, prior history — scores the lead in real time, and routes hot prospects to bind or to a licensed producer. Instead of a static form, prospects get an interactive quote experience that captures far more than a lead capture widget ever could.",
  },
  {
    question: "Can the agent handle claims intake?",
    answer:
      "Yes. Policyholders can file a first notice of loss in chat — describe what happened, upload photos, and confirm the affected policy. The agent verifies coverage against the policy record, opens the claim, and pushes automatic status updates as the claim moves from intake to adjuster review to payout. Complex or high-value claims escalate to a human adjuster with the full record attached.",
  },
  {
    question: "How do renewal reminders work?",
    answer:
      "The agent watches every policy's renewal date and reaches out proactively over SMS and WhatsApp before it lapses — with the amount due and a one-tap way to confirm and pay. A second reminder recovers anyone who missed the first. Because the outreach happens on the channels customers actually read, it recovers renewals that email alone would lose.",
  },
  {
    question: "What about cross-sell and retention?",
    answer:
      "Every quote, claim, and renewal share one customer record, so the agent knows exactly who is eligible for what. After a renewal settles, it can queue a personalized bundle offer — renters for an auto customer, life for a new parent — as a campaign across the same channels. Retention and cross-sell run on the same platform, not a bolted-on tool.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "Quotes, claims, and renewals all work across WhatsApp, SMS, web chat, and email from one shared inbox. The same policyholder record and conversation history follow the customer across every channel, so nobody has to repeat their policy number or their story.",
  },
  {
    question: "Is it secure and compliant?",
    answer:
      "Yes. FloatChat supports SSO, role-based access control, and audit logs so you control who can see policy and claim data and can prove it. Sensitive actions run inside the guardrails you set, and the agent stays grounded in your policies and knowledge base instead of improvising answers.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Insurance",
  serviceType: "Agentic AI for insurance quotes, claims, and renewals",
  description:
    "Guide quotes, claims, and renewals with agentic AI across WhatsApp, SMS, web chat, and email — with proactive reminders and campaigns for retention and cross-sell, and full-context escalation to human agents.",
  url: "https://www.floatchat.com/industry/insurance",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Insurance carriers, brokers, and insurtech teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "How agents reason, act, and stay inside your guardrails.",
  },
  {
    to: "/ai-agents/lead-generation",
    Icon: FileText,
    title: "Lead Generation Agent",
    body: "Turn quote conversations into scored, qualified pipeline.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Layers,
    title: "Omnichannel Inbox",
    body: "One shared inbox for every policyholder conversation.",
  },
  {
    to: "/channels/whatsapp",
    Icon: RefreshCw,
    title: "WhatsApp",
    body: "Renewal reminders and claims updates where customers read.",
  },
]

const relatedPills = [
  { to: "/channels/sms-broadcasting", label: "SMS Broadcasting", Icon: BellRing },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: CreditCard },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function InsuranceIndustryPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />

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
                  <Shield className="h-3.5 w-3.5" />
                  Insurance · quotes, claims &amp; renewals in one flow
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    insurance.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Guide quotes, claims, and renewals across every channel with agents
                  that act on their own and escalate the complex cases — plus
                  reminders and campaigns that keep policies active and cross-sell.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Quotes & lead qualification",
                    "Claims intake + status",
                    "Renewal reminders",
                    "Cross-sell campaigns",
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
                  Built for carriers, brokers, and insurtech teams.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <InsuranceJourneyMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: Calculator,
                  value: "Quotes",
                  label: "assisted and qualified in-chat",
                },
                {
                  Icon: ClipboardCheck,
                  value: "Claims",
                  label: "intake with automatic status",
                },
                {
                  Icon: BellRing,
                  value: "Renewals",
                  label: "reminders over SMS & WhatsApp",
                },
                {
                  Icon: Megaphone,
                  value: "Cross-sell",
                  label: "campaigns from one record",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-semibold text-[#0F2A4A] leading-none">
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

        {/* ───── THE PROBLEM ───── */}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Slow answers on quotes and claims drive churn.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Insurance customers want fast, clear answers — what will this
                    cost, is this covered, where&apos;s my claim. When a quote takes
                    a callback and a claim update means waiting on hold, prospects
                    shop elsewhere and policyholders quietly let renewals lapse.
                  </p>
                  <p>
                    A form-and-FAQ chatbot doesn&apos;t close the gap. It captures a
                    name, then hands everything to your team — no quote, no claim
                    verified, no context — while renewal dates slide past and
                    cross-sell opportunities go untouched.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI
                    </span>{" "}
                    guide walks each policyholder through every step, acts on the
                    routine work itself, and routes the complex cases to your people
                    with the full record already attached.
                  </p>
                </div>
              </BlurFade>

              {/* chatbot vs agent contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A form that captures
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Collects a name, promises a callback",
                        "No quote, no claim actually opened",
                        "Renewal dates slip past unnoticed",
                        "Cross-sell never gets a second look",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                      An agent that guides
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Returns a real quote and qualifies the lead",
                        "Opens the claim and verifies coverage",
                        "Reminds and collects renewals proactively",
                        "Queues cross-sell from one shared record",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT YOU GET ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What you get" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Quotes, claims, renewals, and campaigns.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one agent, one policyholder record — grounded in your
                  products and working around the clock across every channel.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Calculator,
                  title: "Quotes and leads.",
                  body:
                    "The agent runs an interactive quote in chat, asks the underwriting-relevant questions, and qualifies and scores the lead — routing hot prospects to bind or a licensed producer.",
                  visual: <QuotesVisual />,
                },
                {
                  Icon: ClipboardCheck,
                  title: "Claims intake and updates.",
                  body:
                    "Policyholders file a first notice of loss in chat with photos, coverage is verified against the policy, and status updates push automatically — with complex claims escalated to a human adjuster.",
                  visual: <ClaimsVisual />,
                },
                {
                  Icon: BellRing,
                  title: "Renewals and reminders.",
                  body:
                    "Proactive SMS and WhatsApp reminders reach customers before a policy lapses, with the amount due and a one-tap way to confirm and pay — recovering renewals email alone would lose.",
                  visual: <RenewalsVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Cross-sell campaigns.",
                  body:
                    "Because every interaction shares one record, the agent knows who's eligible for what and queues personalized bundle offers as campaigns across the same channels after a renewal settles.",
                  visual: <CrossSellVisual />,
                },
              ].map((f, i) => (
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
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex-1 flex items-end">
                      <div className="w-full">{f.visual}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── HOW IT FLOWS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One journey, from first quote to renewal.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same agent carries a policyholder through every stage — and{" "}
                  <span className="font-semibold text-[#0F2A4A]">
                    the record follows them
                  </span>{" "}
                  the whole way.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: FileText,
                      title: "Quote requested",
                      note: "on any channel",
                    },
                    {
                      Icon: Calculator,
                      title: "Quote + qualify",
                      note: "scored and routed",
                    },
                    {
                      Icon: ClipboardCheck,
                      title: "Claim filed",
                      note: "coverage verified",
                    },
                    {
                      Icon: RefreshCw,
                      title: "Renew & cross-sell",
                      note: "reminders + campaigns",
                    },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {step.note}
                          </p>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="hidden md:block h-4 w-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Escalation note */}
            <BlurFade delay={0.2}>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <GitBranch className="h-5 w-5 text-white" strokeWidth={2.25} />
                </div>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  <span className="font-semibold text-[#0F2A4A]">
                    Complex cases escalate cleanly.
                  </span>{" "}
                  A total-loss claim, a disputed coverage question, or a
                  high-value bind hands off to a licensed human — inside the same
                  thread, with the full policy and claim record attached.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Guide policyholders from quote to renewal."
          body="Connect your channels and go live in days — no per-conversation fees, no journeys to hand-build."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY IT WORKS / WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Instant guidance, complex cases covered.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Customers get instant guidance.",
                  body:
                    "Quotes, coverage questions, and claim status come back in seconds, 24/7 — no callback queue, no waiting until business hours to know where things stand.",
                },
                {
                  Icon: Users,
                  title: "Your team handles the complex claims.",
                  body:
                    "The agent absorbs the routine intake and status volume, so licensed adjusters and producers focus on the judgment calls that actually need a person.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Reminders keep policies active.",
                  body:
                    "Proactive outreach on the channels customers read recovers lapses before they cost you the renewal — and cross-sell rides along on the same record.",
                },
              ].map((b, i) => (
                <BlurFade key={b.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <b.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-[#0F2A4A]">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Why FloatChat strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                    Why FloatChat
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Quotes, claims, and renewals share one policyholder record
                    across every channel and campaign — so the guidance, the
                    reminders, and the cross-sell all run on one platform instead of
                    three disconnected tools.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      { Icon: Lock, t: "SSO & role-based access" },
                      { Icon: ScrollText, t: "Audit logs" },
                      { Icon: Globe, t: "WhatsApp · SMS · web · email" },
                    ].map((x) => (
                      <span
                        key={x.t}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/85"
                      >
                        <x.Icon className="h-4 w-4 text-[#60A5FA]" />
                        {x.t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Build the rest of your stack.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The insurance guide runs on the same platform as the agents,
                  channels, and inbox powering everything else.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCards.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {a.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* related pills */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedPills.map((p) => (
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

        {/* ───── FAQ ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Straight answers on quotes, claims, renewals, and security."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to sales
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/demo"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    book a demo
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 45%, rgba(191,219,254,0.55) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 30%, #60A5FA 50%, #3B82F6 70%, transparent)",
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
                  Guiding quotes, claims &amp; renewals right now
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
                  For carriers, brokers &amp; insurtech
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Guide policyholders with{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Put quotes, claims, and renewals on one agent and one record — with
                reminders and campaigns that keep policies active and cross-sell.
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
                "Quotes & lead qualification",
                "Claims intake + status",
                "Renewal reminders",
                "Cross-sell campaigns",
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
