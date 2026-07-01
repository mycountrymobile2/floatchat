"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  FileText,
  FileCheck2,
  FileClock,
  ClipboardCheck,
  BellRing,
  Percent,
  Landmark,
  MessageSquare,
  Megaphone,
  Workflow,
  ShieldCheck,
  Clock,
  Users,
  KeyRound,
  RefreshCw,
  Layers,
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
  title: "Agentic AI for Mortgage | FloatChat",
  description:
    "Move borrowers from inquiry to close with agentic AI for pre-qualification, document reminders, and status updates across every channel.",
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
   HERO MOCKUP — a borrower journey. A VERTICAL progress rail
   (Pre-qualify → Documents → Status → Close) on the left, a
   document-checklist card (uploaded / pending) on the right, and a
   status-update message that streams in as the rail advances.
─────────────────────────────────────────────────────────────── */

type JourneyStage = "prequalify" | "documents" | "status" | "close"
const STAGE_ORDER: JourneyStage[] = ["prequalify", "documents", "status", "close"]

const RAIL: {
  key: JourneyStage
  Icon: typeof Home
  label: string
  meta: string
}[] = [
  { key: "prequalify", Icon: ClipboardCheck, label: "Pre-qualify", meta: "5 questions · scored" },
  { key: "documents", Icon: FileText, label: "Documents", meta: "checklist sent" },
  { key: "status", Icon: RefreshCw, label: "Status", meta: "rate + milestones" },
  { key: "close", Icon: KeyRound, label: "Close", meta: "clear to close" },
]

function BorrowerJourneyMockup() {
  const [stageIdx, setStageIdx] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i < STAGE_ORDER.length; i++) {
          if (cancelled) return
          setStageIdx(i)
          await wait(i === STAGE_ORDER.length - 1 ? 3200 : 2200)
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const activeStage = STAGE_ORDER[stageIdx]

  // Document checklist — flips items from pending → uploaded as the
  // journey advances past the "documents" stage.
  const docs: { label: string; meta: string; readyAt: number }[] = [
    { label: "Pay stubs (2 mo.)", meta: "PDF", readyAt: 1 },
    { label: "W-2 · 2024", meta: "PDF", readyAt: 1 },
    { label: "Bank statements", meta: "2 files", readyAt: 2 },
    { label: "ID verification", meta: "photo", readyAt: 2 },
  ]

  const statusMsg: Record<JourneyStage, string> = {
    prequalify: "Great news, Maya — you pre-qualify for up to $420k at ~6.4%. Want to start your file?",
    documents: "You're missing 2 items. Upload your bank statements to keep your file moving.",
    status: "Update: rate locked at 6.375% and your appraisal is scheduled for Thursday.",
    close: "You're clear to close! Signing is booked for Friday 10:00 AM. Keys next.",
  }

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

      {/* Floating pre-qual chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Pre-qualified in minutes
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
            app.floatchat.com · loan #M-4821
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* VERTICAL PROGRESS RAIL */}
          <aside className="col-span-5 sm:col-span-4 border-r border-slate-200 bg-slate-50/50 px-3 py-4">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-3 px-1">
              Borrower journey
            </p>
            <ol className="relative">
              {RAIL.map((step, i) => {
                const done = i < stageIdx
                const current = i === stageIdx
                const isLast = i === RAIL.length - 1
                return (
                  <li key={step.key} className="relative flex gap-2.5 pb-5 last:pb-0">
                    {/* connector line */}
                    {!isLast && (
                      <span className="absolute left-[13px] top-7 bottom-0 w-px bg-slate-200">
                        <motion.span
                          className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8]"
                          initial={false}
                          animate={{ height: done ? "100%" : "0%" }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          style={{ width: "1px" }}
                        />
                      </span>
                    )}
                    {/* node */}
                    <motion.span
                      initial={false}
                      animate={
                        current
                          ? { boxShadow: "0 0 0 4px rgba(59,130,246,0.15)" }
                          : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
                      }
                      transition={{ duration: 0.3 }}
                      className={`relative z-10 h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                        done
                          ? "bg-emerald-500 text-white"
                          : current
                          ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white"
                          : "bg-white border border-slate-200 text-slate-400"
                      }`}
                    >
                      {done ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : (
                        <step.Icon className="h-3.5 w-3.5" />
                      )}
                    </motion.span>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={`text-[11.5px] font-semibold leading-tight ${
                          current ? "text-[#1D4ED8]" : done ? "text-[#0F2A4A]" : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[9.5px] text-slate-400 leading-tight mt-0.5 truncate">
                        {done ? "done" : step.meta}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </aside>

          {/* RIGHT PANE — doc checklist + status message */}
          <section className="col-span-7 sm:col-span-8 flex flex-col bg-white">
            {/* Borrower header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Borrower"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Maya Okonkwo
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Conventional · 30-yr · loan #M-4821
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Agent working
              </span>
            </div>

            {/* Document checklist card */}
            <div className="px-4 pt-3 pb-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <ClipboardCheck className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
                    Document checklist
                  </span>
                  <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                    {docs.filter((d) => stageIdx >= d.readyAt).length}/{docs.length} in
                  </span>
                </div>
                <div className="space-y-1.5">
                  {docs.map((d) => {
                    const uploaded = stageIdx >= d.readyAt
                    return (
                      <div
                        key={d.label}
                        className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1"
                      >
                        <span
                          className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                            uploaded ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {uploaded ? (
                            <FileCheck2 className="h-2.5 w-2.5" />
                          ) : (
                            <FileClock className="h-2.5 w-2.5" />
                          )}
                        </span>
                        <span className="text-[10px] font-medium text-[#0F2A4A] truncate">
                          {d.label}
                        </span>
                        <span className="ml-auto text-[8.5px] text-slate-400">{d.meta}</span>
                        <span
                          className={`text-[8.5px] font-medium ${
                            uploaded ? "text-emerald-600" : "text-slate-600"
                          }`}
                        >
                          {uploaded ? "uploaded" : "pending"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Status-update message stream */}
            <div className="flex-1 px-4 py-2 space-y-2 bg-slate-50/30 overflow-hidden">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                Latest update
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-1.5"
                >
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                    <p className="text-[11px] text-white leading-snug">
                      {statusMsg[activeStage]}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {activeStage === "close" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="flex items-center gap-1.5 pl-7"
                >
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-[9.5px] font-medium text-emerald-600">
                    Inquiry → close · no updates chased by hand
                  </span>
                </motion.div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Ask about your rate, documents, or closing…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function PreQualVisual() {
  const rows = [
    { q: "Purchase price", a: "$525,000" },
    { q: "Down payment", a: "20%" },
    { q: "Annual income", a: "$140,000" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Dynamic questions · scored
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
          <CheckCircle2 className="h-2.5 w-2.5" /> qualifies
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.q}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="text-[10px] text-slate-500">{r.q}</span>
          <span className="ml-auto text-[10px] font-semibold text-[#0F2A4A]">{r.a}</span>
          <Check className="h-3 w-3 text-emerald-500 shrink-0" strokeWidth={3} />
        </div>
      ))}
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <ClipboardCheck className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">Est. up to $420k @ ~6.4%</span>
      </div>
    </div>
  )
}

function DocReminderVisual() {
  const items = [
    { label: "Pay stubs", done: true },
    { label: "Bank statements", done: false, current: true },
    { label: "Homeowner's insurance", done: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <BellRing className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Automated reminders
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">nudges until in</span>
      </div>
      {items.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
              s.done
                ? "bg-emerald-500 text-white"
                : s.current
                ? "bg-slate-100 text-slate-600"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {s.done ? (
              <Check className="h-2 w-2" strokeWidth={3} />
            ) : (
              <FileClock className="h-2.5 w-2.5" />
            )}
          </span>
          <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
          {s.current && (
            <span className="ml-auto text-[8.5px] font-medium text-slate-600">
              reminder sent
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function StatusUpdateVisual() {
  const updates = [
    { Icon: Percent, label: "Rate locked", meta: "6.375%" },
    { Icon: Landmark, label: "Appraisal", meta: "scheduled" },
    { Icon: KeyRound, label: "Clear to close", meta: "Fri 10am" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Milestone updates
        </span>
        <span className="text-[8.5px] text-slate-400">SMS · WhatsApp</span>
      </div>
      {updates.map((u) => (
        <div
          key={u.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-5 w-5 rounded-md bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <u.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{u.label}</span>
          <span className="ml-auto text-[9px] text-slate-500">{u.meta}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Megaphone className="h-3 w-3 text-[#3B82F6]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          Rates dropped — refi campaign
        </span>
        <span className="text-[8.5px] font-mono text-slate-500">2,140</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { label: "Sent", value: "2,140" },
          { label: "Replied", value: "318" },
          { label: "Booked", value: "47" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1.5 text-center"
          >
            <p className="text-[12px] font-semibold text-[#0F2A4A] tabular-nums leading-none">
              {s.value}
            </p>
            <p className="text-[7.5px] text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">Segmented by rate + loan age</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can the agent pre-qualify borrowers?",
    answer:
      "Yes. The agent asks dynamic, conversational questions — purchase price, down payment, income, credit range — and scores the answers in real time. Borrowers get an instant, grounded estimate of what they qualify for, and your team gets a warm, structured lead instead of a blank web form.",
  },
  {
    question: "Can it chase down documents?",
    answer:
      "Yes. The agent sends each borrower a personalized document checklist and follows up automatically on anything still outstanding — pay stubs, W-2s, bank statements, insurance — with reminders over the channel they actually read. Applications stop stalling on missing paperwork.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "SMS, WhatsApp, web chat, and more — from one borrower record. A borrower can start on your website, get reminders by text, and receive rate updates on WhatsApp, all in the same continuous conversation with full history.",
  },
  {
    question: "How does it handle rate and status updates?",
    answer:
      "The agent pushes milestone updates automatically — rate locks, appraisal scheduling, conditional approval, and clear-to-close — so borrowers never wonder where their loan stands. Your loan officers stop fielding \"any news?\" calls and focus on underwriting.",
  },
  {
    question: "Can I run refinance campaigns with it?",
    answer:
      "Yes. Broadcast segmented outreach to past borrowers when rates move — filtered by current rate, loan age, or balance — and let the agent handle the replies, re-qualify interested borrowers, and book calls. One platform runs both the campaign and the conversation.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Days, not months. Connect your channels, point the agent at your rate sheets, program guidelines, and document requirements, and set your guardrails. There are no rigid journeys to map — most lenders are pre-qualifying and reminding borrowers within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Mortgage",
  serviceType: "Agentic AI for mortgage lending and brokerage",
  description:
    "An agentic AI platform for mortgage lenders and brokers that pre-qualifies borrowers, chases documents with automated reminders, pushes rate and status updates, and runs refinance campaigns across SMS, WhatsApp, and web — all from one borrower record.",
  url: "https://www.floatchat.com/industry/mortgage",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Mortgage lenders and mortgage brokers",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedAgents = [
  {
    to: "/ai-agents/lead-generation",
    Icon: Users,
    title: "Lead Generation Agent",
    body: "Turns website and ad traffic into qualified borrower leads.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "How agents reason, act, and complete multi-step tasks.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Layers,
    title: "Omnichannel Inbox",
    body: "Every borrower conversation, one shared inbox for your team.",
  },
  {
    to: "/channels/whatsapp",
    Icon: MessageSquare,
    title: "WhatsApp",
    body: "Two-way rate updates and reminders where borrowers reply.",
  },
]

const relatedProducts = [
  { to: "/channels/sms-broadcasting", label: "SMS Broadcasting", Icon: Megaphone },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: Layers },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function MortgageIndustryPage() {
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
                  <Home className="h-3.5 w-3.5" />
                  Mortgage · inquiry to close
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for mortgage that moves borrowers{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    from inquiry to close.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Agents that pre-qualify borrowers, chase the documents that stall
                  applications, and push rate and status updates across every
                  channel — so files keep moving without your team chasing.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Pre-qualify in minutes",
                    "Document reminders",
                    "Rate + status updates",
                    "One borrower record",
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
                  Built for lenders and mortgage brokers.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <BorrowerJourneyMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: ClipboardCheck, value: "Pre-qual", label: "borrowers in the conversation" },
                { Icon: BellRing, value: "Auto", label: "document reminders" },
                { Icon: Percent, value: "Rate", label: "and milestone updates" },
                { Icon: Megaphone, value: "Refi", label: "campaigns to past borrowers" },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] leading-none">
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
                  Long journeys, heavy paperwork, borrowers who drift.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A mortgage is one of the longest, most document-heavy purchases
                    a person ever makes. Between the first inquiry and the closing
                    table sit weeks of paperwork, conditions, and waiting — and at
                    every gap, borrowers go quiet or shop a competitor.
                  </p>
                  <p>
                    When follow-up is slow, applications stall on a single missing
                    pay stub, and loan officers burn hours answering the same
                    &quot;any news on my rate?&quot; question by hand instead of
                    underwriting.
                  </p>
                  <p>
                    <span className="font-semibold text-[#0F2A4A]">
                      Agentic AI for mortgage
                    </span>{" "}
                    closes those gaps — it keeps applications moving and borrowers
                    informed, automatically, from inquiry to close.
                  </p>
                </div>
              </BlurFade>

              {/* manual vs agentic contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Chasing by hand
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Web forms leave leads un-qualified",
                        "Files stall on missing documents",
                        "Borrowers wonder where their loan stands",
                        "Loan officers field status calls all day",
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
                      With an agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Borrowers pre-qualified in the conversation",
                        "Documents chased until they arrive",
                        "Rate and milestone updates, automatic",
                        "Officers underwrite, not chase updates",
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
                  Four jobs, one borrower record.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From the first question to the closing table — the agent
                  qualifies, reminds, updates, and re-engages, all on the same
                  platform.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: ClipboardCheck,
                  title: "Pre-qualification.",
                  body:
                    "Capture and qualify borrowers right in the conversation. Dynamic questions and instant scoring turn cold web traffic into structured, warm leads your loan officers can act on.",
                  visual: <PreQualVisual />,
                },
                {
                  Icon: FileText,
                  title: "Document collection.",
                  body:
                    "A personalized checklist for every file, plus automated reminders for the paperwork that stalls applications — so pay stubs, W-2s, and statements arrive without your team asking twice.",
                  visual: <DocReminderVisual />,
                },
                {
                  Icon: RefreshCw,
                  title: "Status updates.",
                  body:
                    "Rate locks, appraisal scheduling, conditional approval, and clear-to-close — pushed automatically over SMS and WhatsApp, so borrowers stay informed and your phone stops ringing.",
                  visual: <StatusUpdateVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Refinance broadcasting.",
                  body:
                    "When rates move, broadcast segmented outreach to past borrowers by rate, loan age, or balance. The agent handles replies, re-qualifies, and books calls — one platform for campaign and conversation.",
                  visual: <BroadcastVisual />,
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
                  From first inquiry to keys in hand.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The agent carries the borrower through every stage — the same
                  record, the same conversation, no dropped threads.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: ClipboardCheck, title: "Pre-qualify", note: "score in the chat" },
                    { Icon: FileText, title: "Collect documents", note: "checklist + reminders" },
                    { Icon: RefreshCw, title: "Update status", note: "rate + milestones" },
                    { Icon: KeyRound, title: "Close", note: "clear to close" },
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
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Keep every application moving to close."
          body="Connect your channels and rate sheets — go live in days, pre-qualifying and reminding borrowers within the first week."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Borrowers engaged, documents faster, team focused.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Borrowers stay engaged.",
                  body:
                    "Instant answers and proactive updates at any hour mean fewer borrowers go quiet — and fewer shop the competitor down the street while they wait.",
                },
                {
                  Icon: FileCheck2,
                  title: "Documents arrive faster.",
                  body:
                    "Personalized checklists and relentless-but-polite reminders mean files stop stalling on a single missing pay stub. Underwriting starts sooner.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Your team underwrites.",
                  body:
                    "Loan officers spend their hours on judgment and structuring — not chasing paperwork or fielding status calls the agent can handle for them.",
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
                    One platform
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Pre-qualification, document reminders, status updates, and
                    refinance campaigns share one borrower record across every
                    channel — so nothing about a loan gets lost between tools.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Build the rest of your borrower stack.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The mortgage agent runs on the same platform as the rest of
                  FloatChat — same inbox, same record, same guardrails.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedAgents.map((a, i) => (
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

            {/* related products */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedProducts.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    <p.Icon className="h-3.5 w-3.5" />
                    {p.label}
                  </Link>
                ))}
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Talk to Sales
                </Link>
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
              description="Straight answers about pre-qualifying, chasing documents, and going live."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to Sales
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/compare"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    compare FloatChat
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,212,255,0.55) 70%, rgba(168,230,247,0.55) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #93C5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(96,165,250,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
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
                  Moving borrowers from inquiry to close right now
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
                  For lenders and brokers
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Close more loans with{" "}
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
                Connect your channels and let an agent pre-qualify borrowers, chase
                documents, and push rate and status updates — from inquiry all the
                way to the closing table.
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
                "Pre-qualification",
                "Document reminders",
                "Rate + status updates",
                "Refinance campaigns",
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
