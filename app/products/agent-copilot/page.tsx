"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Wand2,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  FileText,
  AlignLeft,
  BookOpen,
  SlidersHorizontal,
  Clock,
  Globe,
  ShieldCheck,
  Inbox,
  GitBranch,
  BarChart3,
  Users,
  Zap,
  MessageSquare,
  GraduationCap,
  Gauge,
  Pencil,
  CornerDownLeft,
  Quote,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

/* ─────────────────────────────────────────────────────────────
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Agentic AI Agent Copilot for Support Teams | FloatChat",
  description:
    "Speed up your team with an AI copilot that drafts replies, summarizes threads, and surfaces knowledge-grounded answers inside the reply box.",
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
   HERO MOCKUP — an agent's reply box with a copilot living inside it.
   The loop cycles through:
     thread shown → agent clicks the copilot → "drafting…" →
     a Suggested-reply card appears (Insert / Edit) →
     a "Summarize thread" chip produces a 3-line summary →
     a knowledge-grounded answer popover cites a help-center article.
   The HUMAN stays in control — the copilot only assists.
─────────────────────────────────────────────────────────────── */

type CopilotPhase =
  | "idle"
  | "drafting"
  | "suggestion"
  | "summary"
  | "knowledge"

function CopilotMockup() {
  const [phase, setPhase] = useState<CopilotPhase>("idle")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("idle")
        await wait(1400)
        if (cancelled) return
        setPhase("drafting")
        await wait(1500)
        if (cancelled) return
        setPhase("suggestion")
        await wait(2600)
        if (cancelled) return
        setPhase("summary")
        await wait(2600)
        if (cancelled) return
        setPhase("knowledge")
        await wait(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showSummary = phase === "summary"
  const showKnowledge = phase === "knowledge"
  const showSuggestion = phase === "suggestion"
  const showDrafting = phase === "drafting"

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

      {/* Floating "assists the human" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Copilot · assists the agent
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Works on every channel
        </span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · agent copilot
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <Users className="h-2.5 w-2.5" />
            Human agent
          </span>
        </div>

        <div className="grid grid-cols-12 h-[480px]">
          {/* Thread + reply box */}
          <section className="col-span-12 flex flex-col min-h-0 bg-white">
            {/* Customer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Customer"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Elena Park
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Web chat · Order #C-4417 · 14 messages
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[9px] font-medium text-slate-600">
                <Clock className="h-2.5 w-2.5" /> Replying
              </span>
            </div>

            {/* Thread */}
            <div className="flex-1 min-h-0 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[78%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi — I ordered the wrong size and it already shipped. Can I
                    swap it once it arrives, or do I have to return it first?
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">10:18 AM</p>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[78%] shadow-sm">
                  <p className="text-[11px] text-white leading-snug">
                    Happy to help with that, Elena — let me check the policy for
                    your order.
                  </p>
                </div>
              </div>

              {/* Knowledge-grounded answer popover */}
              <AnimatePresence>
                {showKnowledge && (
                  <motion.div
                    key="knowledge"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="ml-auto max-w-[86%] rounded-xl border border-[#3B82F6]/25 bg-white shadow-[0_18px_40px_-22px_rgba(29,78,216,0.45)] overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EAF2FF] border-b border-[#3B82F6]/15">
                      <BookOpen className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                        Knowledge-grounded answer
                      </span>
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-[10px] text-[#0F2A4A] leading-snug">
                        Size swaps ship free within the 30-day window — no need to
                        return the first item first. We send the new size on its
                        way as soon as the swap is requested.
                      </p>
                      <a
                        className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-slate-50 border border-slate-200 px-1.5 py-0.5 text-[8.5px] text-slate-500"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FileText className="h-2.5 w-2.5 text-[#1D4ED8]" />
                        Cited · Help Center → “Exchanges &amp; Size Swaps”
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Summarize-thread output */}
              <AnimatePresence>
                {showSummary && (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border-b border-slate-200">
                      <AlignLeft className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9px] font-semibold text-[#0F2A4A] uppercase tracking-wider">
                        Thread summary
                      </span>
                      <span className="ml-auto text-[8.5px] text-slate-400">
                        14 messages → 3 lines · 5s
                      </span>
                    </div>
                    <ul className="px-2.5 py-2 space-y-1">
                      {[
                        "Customer received the wrong size on order #C-4417.",
                        "Wants to swap, not return-then-rebuy.",
                        "Order still inside the 30-day exchange window.",
                      ].map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-1.5 text-[10px] text-[#0F2A4A] leading-snug"
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reply box with copilot inside */}
            <div className="border-t border-slate-200 bg-white px-3 pt-2.5 pb-3">
              {/* Copilot action chips live INSIDE the reply box */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <CopilotChip
                  Icon={Wand2}
                  label="Draft reply"
                  active={showDrafting || showSuggestion}
                />
                <CopilotChip
                  Icon={AlignLeft}
                  label="Summarize thread"
                  active={showSummary}
                />
                <CopilotChip
                  Icon={BookOpen}
                  label="Find answer"
                  active={showKnowledge}
                />
                <CopilotChip Icon={SlidersHorizontal} label="Adjust tone" />
              </div>

              {/* Composer field */}
              <div className="relative rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-2 min-h-[64px]">
                <AnimatePresence mode="wait">
                  {showDrafting ? (
                    <motion.div
                      key="drafting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              delay: d * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Copilot is drafting a reply…
                      </span>
                    </motion.div>
                  ) : showSuggestion ? (
                    <motion.div
                      key="suggestion"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-md border border-[#3B82F6]/30 bg-[#EAF2FF] px-2 py-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
                        <span className="text-[9px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                          Suggested reply
                        </span>
                        <span className="ml-auto text-[8.5px] text-slate-500">
                          on-brand · editable
                        </span>
                      </div>
                      <p className="mt-1 text-[10.5px] text-[#0F2A4A] leading-snug">
                        Great news, Elena — you can swap sizes without returning
                        the first item. I&apos;ll send the right size out today,
                        free, and email you a label for the original. Which size
                        would you like?
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <button className="inline-flex items-center gap-1 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2 py-0.5 text-[9px] font-medium">
                          <CornerDownLeft className="h-2.5 w-2.5" /> Insert
                        </button>
                        <button className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white text-[#0F2A4A] px-2 py-0.5 text-[9px] font-medium">
                          <Pencil className="h-2.5 w-2.5" /> Edit
                        </button>
                        <span className="ml-auto text-[8px] text-slate-400">
                          Agent decides
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] text-slate-400"
                    >
                      Type a reply, or ask the copilot for a draft…
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Send row */}
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[8.5px] text-slate-400">
                  <ShieldCheck className="h-2.5 w-2.5 text-[#1D4ED8]" />
                  Same guardrails as your AI agent
                </span>
                <button className="ml-auto text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-3 py-1 rounded-md">
                  Send
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function CopilotChip({
  Icon,
  label,
  active,
}: {
  Icon: typeof Wand2
  label: string
  active?: boolean
}) {
  return (
    <motion.span
      animate={
        active
          ? {
              borderColor: "rgba(59,130,246,0.45)",
              backgroundColor: "rgba(59,130,246,0.08)",
            }
          : {
              borderColor: "rgba(226,232,240,1)",
              backgroundColor: "rgba(255,255,255,1)",
            }
      }
      transition={{ duration: 0.3 }}
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium text-[#0F2A4A]"
    >
      <Icon
        className={`h-2.5 w-2.5 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
      />
      {label}
    </motion.span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What it does" feature cards
─────────────────────────────────────────────────────────────── */

function DraftVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Wand2 className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Suggested reply
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">one click</span>
      </div>
      <div className="rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1.5">
        <p className="text-[10px] text-[#0F2A4A] leading-snug">
          “Happy to help — your refund is on the way and lands in 3–5 days.”
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-1.5 py-0.5 text-[8.5px] font-medium">
          <CornerDownLeft className="h-2.5 w-2.5" /> Insert
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-1.5 py-0.5 text-[8.5px] font-medium text-[#0F2A4A]">
          <Pencil className="h-2.5 w-2.5" /> Edit
        </span>
      </div>
    </div>
  )
}

function SummaryVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          18 messages
        </span>
        <span className="inline-flex items-center gap-1 text-[8.5px] font-medium text-[#1D4ED8]">
          <Clock className="h-2.5 w-2.5" /> ~5s
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-300">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5 space-y-1">
        {[
          "Damaged item on order #B-2210.",
          "Refund issued, replacement requested.",
          "Awaiting new shipping address.",
        ].map((l) => (
          <div
            key={l}
            className="flex items-start gap-1.5 text-[9px] text-[#0F2A4A]"
          >
            <span className="mt-1 h-1 w-1 rounded-full bg-[#3B82F6] shrink-0" />
            {l}
          </div>
        ))}
      </div>
    </div>
  )
}

function KnowledgeVisual() {
  const sources = [
    { Icon: BookOpen, label: "Help center" },
    { Icon: FileText, label: "Policy.pdf" },
    { Icon: Globe, label: "yoursite.com" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="grid grid-cols-3 gap-1.5">
        {sources.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center text-center gap-1"
          >
            <s.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[8px] font-medium text-[#0F2A4A] leading-tight">
              {s.label}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1.5">
        <p className="text-[9.5px] text-[#0F2A4A] leading-snug">
          “Exchanges ship free within 30 days.”
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-[8px] text-slate-500">
          <FileText className="h-2.5 w-2.5 text-[#1D4ED8]" /> cited source
        </span>
      </div>
    </div>
  )
}

function ToneVisual() {
  const tones = [
    { label: "Warmer", active: true },
    { label: "Shorter", active: false },
    { label: "Formal", active: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5 flex-wrap">
        {tones.map((t) => (
          <span
            key={t.label}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium ${
              t.active
                ? "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#1D4ED8]"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <SlidersHorizontal className="h-2.5 w-2.5" />
            {t.label}
          </span>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1">
          <p className="text-[9px] text-slate-500 leading-snug line-through">
            “Request received. Processing.”
          </p>
        </div>
        <div className="flex items-center justify-center text-slate-300">
          <ArrowRight className="h-3 w-3 rotate-90" />
        </div>
        <div className="rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1">
          <p className="text-[9.5px] text-[#0F2A4A] leading-snug">
            “Got it — I&apos;m on this now and will keep you posted. 🙌”
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does the AI agent copilot replace my support agents?",
    answer:
      "No — the copilot makes your people faster and more consistent, it doesn't replace them. Every suggestion sits inside the reply box for the agent to insert, edit, or ignore. The human stays in control of what actually gets sent; the copilot just removes the mechanical work of rereading threads, hunting for policies, and rewriting the same answers.",
  },
  {
    question: "Which channels does the copilot work on?",
    answer:
      "Every channel in your inbox. Whether an agent is replying on WhatsApp, web chat, email, SMS, Instagram, or Messenger, the same copilot drafts replies, summarizes the thread, and surfaces knowledge-grounded answers right where they're typing — with one consistent voice across all of them.",
  },
  {
    question: "Where does the copilot get its answers?",
    answer:
      "From your own knowledge — your help center, PDFs, product catalog, and website. Answers are grounded in those sources and cite where they came from, so agents can trust what they're sending instead of guessing or copying from a stale internal doc.",
  },
  {
    question: "How is this different from the customer-facing AI agent?",
    answer:
      "Same brain, different seat. The customer-facing agent answers customers directly; the copilot sits beside your human team and assists them. Because both share the same agentic AI, data, and guardrails, an answer drafted for an agent reads exactly like one the AI would have sent itself — so human and AI replies stay consistent.",
  },
  {
    question: "Will the copilot send replies on its own?",
    answer:
      "Not unless you want it to. By default it only suggests — drafts wait in the reply box until a human inserts or edits and hits send. You decide how much autonomy each team or queue gets, from suggest-only to one-click insert.",
  },
  {
    question: "How long does it take new agents to get value from it?",
    answer:
      "Immediately. Because the copilot carries your knowledge and tone, new hires can lean on grounded drafts and summaries from day one instead of memorizing policies first. Most teams see new agents ramp faster and reach consistent quality far sooner than with onboarding docs alone.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Agent Copilot",
  serviceType: "Agentic AI copilot for support teams",
  description:
    "An agentic AI copilot inside every agent's reply box that drafts on-brand replies, summarizes long threads in seconds, and surfaces knowledge-grounded answers from your help center — across every channel in the inbox.",
  url: "https://www.floatchat.com/products/agent-copilot",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer support and customer experience teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related products
─────────────────────────────────────────────────────────────── */

const relatedProducts = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The reasoning engine behind both the copilot and your customer-facing agent.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox where the copilot lives inside every reply box.",
  },
  {
    to: "/products/analytics",
    Icon: BarChart3,
    title: "Analytics",
    body: "See how drafts, summaries, and assists move resolution time and quality.",
  },
  {
    to: "/ai-agents",
    Icon: Users,
    title: "AI Agents",
    body: "The customer-facing agents that share the copilot's brain, data, and guardrails.",
  },
  {
    to: "/compare",
    Icon: GitBranch,
    title: "Compare FloatChat",
    body: "See how the platform stacks up against Intercom, Zendesk, and more.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AgentCopilotPage() {
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
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Agent Copilot · assists your human team
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[52px] leading-[1.05]"
                >
                  An agentic AI copilot inside every agent&apos;s{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    reply box.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Reply drafting, thread summaries, and knowledge-grounded answers
                  that make your human team faster and more consistent — without
                  ever leaving the inbox.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "On-brand reply drafts",
                    "5-second summaries",
                    "Grounded answers",
                    "Every channel",
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
                  The same agentic AI that serves customers now assists your team.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <CopilotMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: Wand2,
                  value: "On-brand",
                  label: "reply drafts in one click",
                },
                {
                  Icon: Clock,
                  value: "5-second",
                  label: "thread summaries",
                },
                {
                  Icon: BookOpen,
                  value: "Grounded",
                  label: "answers from your knowledge",
                },
                {
                  Icon: Globe,
                  value: "Every",
                  label: "channel in the inbox",
                },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-[26px] font-semibold text-[#0F2A4A] leading-none">
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
                  The slow part isn&apos;t the answer. It&apos;s everything
                  around it.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Agents lose time rereading long threads, hunting through help
                    docs for the right policy, and rewriting the same answer they
                    sent ten minutes ago. The hard part of most tickets was never
                    the reply — it&apos;s the context-gathering and the typing
                    around it.
                  </p>
                  <p>
                    That drag compounds. A queue that should take an hour takes
                    three. Tone drifts as agents tire. New hires move cautiously
                    because they&apos;re still learning where the answers live. And
                    the same customers wait longer than they should.
                  </p>
                  <p>
                    A copilot built into the reply box removes that drag. It reads
                    the thread for the agent, finds the grounded answer, and offers
                    a draft — so your team resolves faster{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      without sacrificing quality
                    </span>
                    .
                  </p>
                </div>
              </BlurFade>

              {/* time-drain vs copilot contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                      Without a copilot
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Reread the whole thread to catch up",
                        "Dig through docs for the right policy",
                        "Rewrite the same answer from scratch",
                        "Tone drifts as the queue grows",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                      With the copilot
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Thread summarized in a few lines",
                        "Grounded answer surfaced inline",
                        "On-brand draft ready to insert",
                        "Consistent tone, every reply",
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

        {/* ───── WHAT IT DOES ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="Capabilities" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What the copilot does.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four assists, all inside the reply box, all grounded in your
                  business — so the human always stays in control.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Wand2,
                  title: "Drafts replies.",
                  body:
                    "On-brand responses written from your knowledge and tone, ready to send or edit in one click. The agent always decides what actually goes out.",
                  visual: <DraftVisual />,
                },
                {
                  Icon: AlignLeft,
                  title: "Summarizes threads.",
                  body:
                    "Condenses long, winding conversations into a few clear lines — so an agent picking up a thread is caught up in seconds, not minutes.",
                  visual: <SummaryVisual />,
                },
                {
                  Icon: BookOpen,
                  title: "Surfaces answers from your KB.",
                  body:
                    "Pulls grounded answers from your help center, PDFs, catalog, and website — right where the agent is typing, with the source cited.",
                  visual: <KnowledgeVisual />,
                },
                {
                  Icon: SlidersHorizontal,
                  title: "Adjusts tone on demand.",
                  body:
                    "Rephrase a draft warmer, shorter, or more formal in a tap — so the message lands right for the customer and stays consistent with your brand voice.",
                  visual: <ToneVisual />,
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

        {/* ───── IN-THE-FLOW: before vs after ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="In the flow" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The same ticket, with and without the copilot.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The copilot doesn&apos;t change where your agents work — it sits
                  inside the reply box and quietly removes the steps that slow them
                  down.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Before */}
              <BlurFade delay={0.1} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-rose-200 bg-rose-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-4">
                    Manual workflow
                  </p>
                  <ol className="space-y-3">
                    {[
                      "Scroll up and reread 14 messages",
                      "Open a second tab to find the policy",
                      "Copy, paste, and rewrite the wording",
                      "Second-guess the tone before sending",
                    ].map((b, idx) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[13.5px] text-rose-900/80 leading-relaxed"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {b}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 rounded-xl bg-white border border-rose-200 px-4 py-3 inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-rose-600" />
                    <span className="text-sm font-semibold text-rose-700">
                      Minutes per ticket, every ticket
                    </span>
                  </div>
                </div>
              </BlurFade>

              {/* Arrow / connector */}
              <BlurFade delay={0.2} className="lg:col-span-2 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                  <ArrowRight className="h-5 w-5 text-white lg:rotate-0 rotate-90" />
                </div>
              </BlurFade>

              {/* After */}
              <BlurFade delay={0.3} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-[#3B82F6]/25 bg-gradient-to-br from-[#EAF2FF] to-white p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-4">
                    Copilot-assisted
                  </p>
                  <ol className="space-y-3">
                    {[
                      "Tap “Summarize” — caught up in 5 seconds",
                      "Grounded answer appears inline, source cited",
                      "Insert the on-brand draft with one click",
                      "Nudge the tone if needed, then send",
                    ].map((b, idx) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[13.5px] text-[#0F2A4A] leading-relaxed"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-[#3B82F6] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        {b}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 rounded-xl bg-white border border-[#3B82F6]/25 px-4 py-3 inline-flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-sm font-semibold text-[#1D4ED8]">
                      Same answer, a fraction of the effort
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RAMP / QUALITY SPOTLIGHT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="04" label="Ramp & quality" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  New hires ramp faster. Tone stays consistent.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    When the copilot carries your knowledge and tone, agents spend
                    less time on the mechanics and more on the customer. A new hire
                    can lean on grounded drafts and summaries from their first
                    shift — instead of memorizing every policy before they can
                    help.
                  </p>
                  <p>
                    And because every draft comes from the same source of truth,
                    the tenth agent sounds like the first. Quality stops depending
                    on who happens to pick up the ticket.
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      Icon: GraduationCap,
                      stat: "Day 1",
                      label:
                        "New agents lean on grounded drafts from their first shift.",
                    },
                    {
                      Icon: Gauge,
                      stat: "Consistent",
                      label:
                        "Every reply comes from one source of truth and voice.",
                    },
                    {
                      Icon: MessageSquare,
                      stat: "On-brand",
                      label:
                        "The copilot carries your tone so quality doesn't drift.",
                    },
                  ].map((c, i) => (
                    <div
                      key={c.stat}
                      className={`rounded-3xl border p-6 ${
                        i === 1
                          ? "border-[#3B82F6]/30 bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] text-white"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div
                        className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-md ${
                          i === 1
                            ? "bg-white/15"
                            : "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shadow-[#3B82F6]/30"
                        }`}
                      >
                        <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <p
                        className={`mt-4 text-2xl font-semibold tracking-tight ${
                          i === 1 ? "text-white" : "text-[#0F2A4A]"
                        }`}
                      >
                        {c.stat}
                      </p>
                      <p
                        className={`mt-1.5 text-[12.5px] leading-relaxed ${
                          i === 1 ? "text-white/80" : "text-slate-500"
                        }`}
                      >
                        {c.label}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
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
                <SectionEyebrow num="05" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One brain behind the human and the AI.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The copilot shares the same agentic AI, data, and guardrails as
                  your customer-facing agent — so human and AI replies stay
                  consistent across every channel.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Sparkles,
                  title: "Same agentic AI",
                  body:
                    "The copilot reasons over your data the same way your customer-facing agent does. A draft for an agent reads exactly like a reply the AI would have sent itself.",
                },
                {
                  Icon: BookOpen,
                  title: "Same grounded data",
                  body:
                    "Help center, PDFs, catalog, and website — one knowledge base powers both. Update it once and every answer, human-assisted or automated, stays in sync.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Same guardrails",
                  body:
                    "The boundaries you set for the AI apply to the copilot too. Suggestions stay on-policy and on-brand, so consistency is built in, not bolted on.",
                },
              ].map((c, i) => (
                <BlurFade key={c.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200/80 bg-white p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center">
                      <c.Icon className="h-5 w-5 text-blue-600" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* consistency callout */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl border border-[#3B82F6]/20 bg-white p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                  <Quote className="h-5 w-5 text-white" />
                </div>
                <p className="text-[15px] text-[#0F2A4A] leading-relaxed">
                  Whether a customer is answered by your AI at 3am or by a human at
                  3pm, the voice, the policy, and the accuracy are the same —
                  because it&apos;s all the same{" "}
                  <span className="font-semibold">AI agent copilot</span> under the
                  hood.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Give every agent an AI copilot."
          body="Reply drafts, thread summaries, and knowledge-grounded answers — right in the reply box, on every channel."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The rest of the platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The copilot is one piece of FloatChat. Here&apos;s what it plugs
                  into.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((r, i) => (
                <BlurFade key={r.to} delay={0.05 + i * 0.07} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center">
                        <r.Icon className="h-5 w-5 text-blue-600" strokeWidth={2.25} />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                      {r.body}
                    </p>
                  </Link>
                </BlurFade>
              ))}
            </div>
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
              description="How the AI agent copilot fits your team — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or explore the{" "}
                  <Link
                    to="/ai-agents"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    AI agents
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.7) 40%, rgba(191,212,255,0.6) 70%, rgba(168,200,255,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #BFD4FF 25%, #60A5FA 50%, #93C5FD 75%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(96,165,250,0.35), rgba(147,197,253,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(168,200,255,0.4), transparent 70%)",
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1D4ED8]" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  A copilot in every reply box · on every channel
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
                  Free to start
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Give every agent an{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  AI copilot.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Reply drafts, thread summaries, and knowledge-grounded answers —
                right in the reply box, faster and more consistent on every
                channel.
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

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="relative mx-auto max-w-3xl mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
              >
                {[
                  "On-brand reply drafts",
                  "5-second summaries",
                  "Knowledge-grounded answers",
                  "Works on every channel",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
