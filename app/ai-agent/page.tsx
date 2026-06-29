"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Check,
  Zap,
  Users,
  Shield,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Globe,
  MessageSquare,
  AlertTriangle,
  Send,
  ListChecks,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Right-side hero mockup: live Captain in action
─────────────────────────────────────────────────────────────── */

type Phase = "idle" | "incoming" | "thinking" | "reply" | "resolved"

function CaptainLiveMockup() {
  const [phase, setPhase] = useState<Phase>("idle")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

    const run = async () => {
      while (!cancelled) {
        setPhase("idle")
        await wait(700)
        if (cancelled) return
        setPhase("incoming")
        await wait(1400)
        if (cancelled) return
        setPhase("thinking")
        await wait(1800)
        if (cancelled) return
        setPhase("reply")
        await wait(2600)
        if (cancelled) return
        setPhase("resolved")
        await wait(2400)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showIncoming = phase !== "idle"
  const showThinking = phase === "thinking"
  const showReply = phase === "reply" || phase === "resolved"
  const showResolved = phase === "resolved"

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

      {/* Floating sentiment pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Sentiment <span className="text-emerald-600">positive</span>
        </span>
      </motion.div>

      {/* Floating LLM pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">GPT-4o · 5 LLMs</span>
      </motion.div>

      {/* Main window */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="font-mono">app.floatchat.com · Captain</span>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[420px] sm:min-h-[440px]">
          {/* Knowledge panel — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Knowledge
              </p>
            </div>

            <div className="px-3 py-3 space-y-2">
              <KnowledgeRow
                Icon={FileText}
                label="Shipping Policy.pdf"
                meta="12 pages"
                active={phase === "thinking"}
              />
              <KnowledgeRow
                Icon={Globe}
                label="help.floatchat.com"
                meta="284 articles"
                active={phase === "thinking"}
              />
              <KnowledgeRow
                Icon={MessageSquare}
                label="Past conversations"
                meta="14,210 threads"
                active={phase === "thinking"}
              />
            </div>

            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                This week
              </p>
              <Stat label="Auto-resolved" value="60%" tone="blue" />
              <Stat label="Avg confidence" value="94%" tone="emerald" />
              <Stat label="Cost / reply" value="$0.005" tone="amber" />
            </div>
          </aside>

          {/* Conversation pane — full width on phones */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Customer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=47"
                    alt="Jessica Chen"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">Jessica Chen</p>
                  <p className="text-[9px] text-slate-500">WhatsApp · Brooklyn, NY</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Captain handling
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <AnimatePresence>
                {showIncoming && (
                  <motion.div
                    key="msg-in"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Hi! Do you ship to NYC? Order #4421 — what's the ETA?
                      </p>
                      <p className="text-[8px] text-slate-400 mt-0.5">9:41 AM</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showThinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5">
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
                      <p className="mt-1 text-[8.5px] text-slate-500">
                        Reading shipping policy + past replies…
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showReply && (
                  <motion.div
                    key="reply"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-[#EAF2FF] border border-[#3B82F6]/20 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[82%]">
                      <p className="text-[9px] font-medium text-[#1D4ED8] mb-0.5">
                        Captain · suggested reply
                      </p>
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Hi Jessica! Order #4421 ships tomorrow morning via UPS. Free
                        delivery to NYC — ETA 2 days. Tracking: 1Z999AA10123456784.
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t border-[#3B82F6]/15">
                        <button className="text-[9px] font-medium bg-[#3B82F6] text-white px-2 py-0.5 rounded hover:bg-[#1D4ED8] transition-colors">
                          Send
                        </button>
                        <button className="text-[9px] text-slate-500">Edit</button>
                        <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-600">
                          <CheckCircle2 className="h-2.5 w-2.5" /> 98% match
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showResolved && (
                  <motion.div
                    key="resolved"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1.5 pl-7"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9.5px] font-medium text-emerald-600">
                      Resolved · no human needed
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white">
              <div className="px-3 py-2 flex items-center gap-2 text-[10px]">
                <span className="text-[#1D4ED8] font-medium border-b border-[#1D4ED8] pb-1">
                  Reply
                </span>
                <span className="text-slate-500 pb-1">Private Note</span>
                <span className="ml-auto inline-flex items-center gap-1 text-slate-400">
                  <Sparkles className="h-3 w-3 text-[#3B82F6]" /> Captain copilot on
                </span>
              </div>
              <div className="px-3 pb-3">
                <div className="bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5">
                  <span className="text-[10px] text-slate-400">
                    Start with '/' for canned reply, or let Captain suggest…
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function KnowledgeRow({
  Icon,
  label,
  meta,
  active,
}: {
  Icon: typeof FileText
  label: string
  meta: string
  active?: boolean
}) {
  return (
    <motion.div
      animate={
        active
          ? {
              borderColor: "rgba(59,130,246,0.4)",
              boxShadow: "0 0 0 3px rgba(59,130,246,0.08)",
            }
          : { borderColor: "rgba(226,232,240,1)", boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
      }
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1.5"
    >
      <div
        className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-[#3B82F6]/10" : "bg-slate-100"
        }`}
      >
        <Icon className={`h-3 w-3 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium text-[#0F2A4A] truncate">{label}</p>
        <p className="text-[9px] text-slate-400 truncate">{meta}</p>
      </div>
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
        />
      )}
    </motion.div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "blue" | "emerald" | "amber"
}) {
  const toneClass = {
    blue: "text-[#1D4ED8]",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  }
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${toneClass[tone]}`}>{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Bento card + capability mockups
─────────────────────────────────────────────────────────────── */

type BadgeTone = "emerald" | "blue" | "amber"

function BentoCard({
  tag,
  Icon,
  title,
  body,
  badge,
  children,
}: {
  tag: string
  Icon: typeof Bot
  title: string
  body: string
  badge?: { label: string; tone: BadgeTone }
  children: React.ReactNode
}) {
  const toneClass: Record<BadgeTone, string> = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-[#3B82F6]/10 text-[#1D4ED8] ring-[#3B82F6]/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
  }
  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-sm p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
      {/* Hover hairline */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)",
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
            <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
          </div>
          <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">
            {tag}
          </span>
        </div>
        {badge && (
          <span
            className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ring-1 ${toneClass[badge.tone]}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl lg:text-2xl font-semibold tracking-tight text-[#0F2A4A]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-md">{body}</p>

      <div className="mt-6 flex-1 flex items-end">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}

/* — Tile 1: Mini chat showing Captain auto-resolving — */
function MiniChatMockup() {
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/40 overflow-hidden shadow-sm">
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-slate-200 bg-slate-50/80">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
        <span className="ml-2 text-[9px] font-mono text-slate-400">
          captain · live
        </span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-start">
          <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
            <p className="text-[11px] text-[#0F2A4A]">
              What's your refund policy?
            </p>
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </div>
          <div className="bg-[#EAF2FF] border border-[#3B82F6]/20 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[78%]">
            <p className="text-[11px] text-[#0F2A4A] leading-snug">
              30 days, full refund, no questions. I'll start it for you now.
            </p>
            <div className="mt-1.5 pt-1.5 border-t border-[#3B82F6]/15 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-600">
                <CheckCircle2 className="h-2.5 w-2.5" /> 98% match
              </span>
              <span className="text-[9px] text-slate-400">·</span>
              <span className="text-[9px] text-slate-500">Resolved in 0.4s</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 pt-1">
          {["help docs", "FAQs", "past chats"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] font-medium text-slate-500"
            >
              <FileText className="h-2 w-2 text-[#3B82F6]" />
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* — Tile 2: Composer with Captain suggestion + tone toggles — */
function ComposerSuggestionMockup() {
  const [tone, setTone] = useState<"Friendly" | "Professional" | "Empathetic">(
    "Friendly",
  )
  const copy: Record<typeof tone, string> = {
    Friendly: "Hey! Totally get it — let me sort that refund right now 🙌",
    Professional:
      "Thanks for reaching out. I'm processing your refund as we speak.",
    Empathetic:
      "I'm sorry this didn't work out. I'll start your refund immediately.",
  }
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* Captain suggestion */}
      <div className="p-3 border-b border-slate-100 bg-gradient-to-b from-[#F5F9FF] to-white">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
            <Sparkles className="h-2 w-2 text-white" />
          </div>
          <span className="text-[9.5px] font-medium text-[#1D4ED8]">
            Captain suggests
          </span>
          <span className="ml-auto text-[8.5px] font-mono text-slate-400">
            Tab ↹ to accept
          </span>
        </div>
        <p className="text-[11px] text-[#0F2A4A] leading-snug">{copy[tone]}</p>
        <div className="mt-2 flex flex-wrap items-center gap-1">
          {(["Friendly", "Professional", "Empathetic"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`text-[9px] px-2 py-0.5 rounded-full transition-colors ${
                tone === t
                  ? "bg-[#3B82F6] text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div className="px-3 py-2.5">
        <div className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1.5">
          <span className="text-[10px] text-slate-400">
            Type a reply, or accept Captain's…
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] text-slate-400">Shift+Enter for new line</span>
          <button className="inline-flex items-center gap-1 text-[9.5px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2 py-1 rounded-md">
            <Send className="h-2.5 w-2.5" /> Send
          </button>
        </div>
      </div>
    </div>
  )
}

/* — Tile 3: Sentiment meter with escalation tag — */
function SentimentMeterMockup() {
  // Marker sits in the angry zone (10-25%)
  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between text-[9.5px] mb-1.5">
          <span className="font-medium text-[#0F2A4A]">Sentiment</span>
          <span className="font-semibold text-red-600">Frustrated · -0.78</span>
        </div>
        <div className="relative h-2 rounded-full overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500" />
          {/* Marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-white border-2 border-red-500 shadow-md"
            style={{ left: "14%" }}
          />
        </div>
        <div className="flex items-center justify-between text-[8.5px] text-slate-400 mt-1.5">
          <span>Angry</span>
          <span>Neutral</span>
          <span>Happy</span>
        </div>
      </div>

      {/* Flagged thread */}
      <div className="rounded-lg border border-red-200 bg-red-50/60 px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-red-600" />
          <span className="text-[9.5px] font-semibold text-red-700">
            Auto-escalated
          </span>
          <span className="ml-auto text-[9px] text-slate-500">just now</span>
        </div>
        <p className="mt-1 text-[10.5px] text-[#0F2A4A] leading-snug">
          "This is the third time I've asked — where is my order?!"
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[9px] font-medium text-red-700 bg-white border border-red-200 rounded-full px-1.5 py-0.5">
            <span className="h-1 w-1 rounded-full bg-red-500" />
            needs human
          </span>
          <span className="text-[9px] text-slate-500">→ Sarah K.</span>
        </div>
      </div>
    </div>
  )
}

/* — Tile 4: Conversation summary card — */
function SummaryMockup() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50/60">
        <ListChecks className="h-3.5 w-3.5 text-[#3B82F6]" />
        <span className="text-[10px] font-semibold text-[#0F2A4A]">
          Conversation #4421 · summary
        </span>
        <span className="ml-auto text-[9px] text-slate-400">0.8s ago</span>
      </div>
      <div className="p-3 grid gap-3 sm:grid-cols-12">
        {/* Reduction visual */}
        <div className="sm:col-span-4 flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-1 rounded-lg bg-gradient-to-br from-[#EAF2FF] to-[#F5F9FF] border border-[#3B82F6]/20 py-3 px-3 sm:px-1">
          <div className="text-2xl font-semibold text-[#1D4ED8] leading-none">
            12<span className="text-slate-400">→</span>4
          </div>
          <p className="text-[9px] text-slate-500 text-center sm:px-1">
            messages → bullets
          </p>
        </div>
        {/* Bullets */}
        <ul className="sm:col-span-8 space-y-1.5">
          {[
            "Customer ordered #4421 last Tuesday",
            "Wants ETA for NYC delivery",
            "Sentiment: positive · returning customer",
            "Captain shared tracking link — resolved",
          ].map((b, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" strokeWidth={3} />
              <span className="text-[10.5px] text-[#0F2A4A] leading-snug">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-3 py-2 border-t border-slate-100 flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2 w-2 text-white" />
        </div>
        <span className="text-[9.5px] text-slate-500">
          Generated by Captain — new agents read this, not 200 messages.
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section header used across the page
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
   FAQ items — kept verbatim from current /ai-agent page
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What does Captain not do?",
    answer:
      "Captain handles text-based replies (chat, email, WhatsApp two-way, SMS). Captain does not handle voice calls. There is no AI voice bot or call transcription on FloatChat.",
  },
  {
    question: "Which LLM does Captain use?",
    answer:
      "A mix of GPT-4o mini for routine queries and GPT-4o for complex ones. Multi-LLM support (Claude, Gemini) is on the roadmap for Q3.",
  },
  {
    question: "Where does my training data go?",
    answer:
      "Stored encrypted in our DigitalOcean NYC3 region. Never shared with other customers. Never used to train other companies' models.",
  },
  {
    question: "What if Captain doesn't know the answer?",
    answer:
      "It hands off to a human agent and shows a sentiment indicator so your team knows the priority. Captain doesn't make up answers.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AiAgentPage() {
  useEffect(() => {
    document.title = "AI Customer Support. Bundled, Not Metered | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "AI Captain handles 60% of conversations. Bundled in every paid plan from $9.99. No per-resolution fees like Intercom Fin.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          {/* Mesh blobs */}
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

          {/* Dotted overlay */}
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
              {/* Left content */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Bot className="h-3.5 w-3.5" />
                  AI Captain · bundled in every paid plan
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  AI replies{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    bundled,
                  </span>
                  <br />
                  not metered.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Captain handles 60% of conversations on its own. Sentiment, copilot,
                  summary, and knowledge base. Included from $9.99/month.
                </motion.p>

                {/* Badges — copy preserved from current page */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Bundled AI",
                    "No per-resolution fees",
                    "5 LLMs supported",
                    "90% cheaper than Intercom Fin",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#1B6BFF]" />
                      {b}
                    </span>
                  ))}
                </motion.div>

                {/* CTAs */}
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
                      Try Captain Free
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

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  14-day trial of Lite. No credit card. Cancel anytime.
                </motion.p>
              </div>

              {/* Right interactive mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <CaptainLiveMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT CAPTAIN DOES ───── */}
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
            <BlurFade>
              <SectionEyebrow num="01" label="Capabilities" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05] max-w-3xl">
                What Captain does.
              </h2>
            </BlurFade>

            <div className="mt-12 grid grid-cols-12 gap-5 lg:auto-rows-fr">
              {/* Tile 1 — Replies on its own (BIG, 7 cols) */}
              <BlurFade delay={0.05} className="col-span-12 lg:col-span-7">
                <BentoCard
                  tag="01 — Auto-resolve"
                  Icon={Bot}
                  title="Replies on its own."
                  body="Trains on your help docs, FAQs, and past conversations. Resolves common questions before they hit your team."
                  badge={{ label: "60% auto-resolved", tone: "emerald" }}
                >
                  <MiniChatMockup />
                </BentoCard>
              </BlurFade>

              {/* Tile 2 — Helps your agents (5 cols) */}
              <BlurFade delay={0.13} className="col-span-12 lg:col-span-5">
                <BentoCard
                  tag="02 — Copilot"
                  Icon={Zap}
                  title="Helps your agents."
                  body="Reply suggestions appear inside the editor. One-click rephrase, tone change, or summary."
                >
                  <ComposerSuggestionMockup />
                </BentoCard>
              </BlurFade>

              {/* Tile 3 — Detects frustration (5 cols) */}
              <BlurFade delay={0.21} className="col-span-12 lg:col-span-5">
                <BentoCard
                  tag="03 — Sentiment"
                  Icon={Shield}
                  title="Detects frustration."
                  body="Real-time sentiment scoring. Tags angry conversations so your team can step in fast."
                  badge={{ label: "Live", tone: "amber" }}
                >
                  <SentimentMeterMockup />
                </BentoCard>
              </BlurFade>

              {/* Tile 4 — Catches up in seconds (BIG, 7 cols) */}
              <BlurFade delay={0.29} className="col-span-12 lg:col-span-7">
                <BentoCard
                  tag="04 — Summary"
                  Icon={Users}
                  title="Catches up in seconds."
                  body="Auto-generated conversation summaries. New agents take over without reading 200 messages."
                  badge={{ label: "12 msg → 4 bullets", tone: "blue" }}
                >
                  <SummaryMockup />
                </BentoCard>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── COMPARISON ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="The math" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How Captain{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    compares.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  At 5,000 AI resolutions per month. Numbers from each vendor's
                  published pricing.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Table */}
              <BlurFade delay={0.1} className="lg:col-span-8">
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Provider
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            AI Pricing
                          </th>
                          <th className="text-right p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            5,000 resolutions/mo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Intercom Fin",
                            pricing: "$0.99 per resolution + $50/mo min",
                            total: "$4,950",
                          },
                          {
                            name: "Freshchat Freddy",
                            pricing: "$0.49 per session beyond 500 free",
                            total: "$2,205",
                          },
                          {
                            name: "Zendesk Copilot",
                            pricing: "$50/agent/month flat (10 agents)",
                            total: "$500",
                          },
                          {
                            name: "Tidio Lyro",
                            pricing: "Add-on $39-289/month",
                            total: "$289",
                          },
                        ].map((row) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 last:border-b-0"
                          >
                            <td className="p-4 font-medium text-[#0F2A4A]">
                              {row.name}
                            </td>
                            <td className="p-4 text-slate-500">{row.pricing}</td>
                            <td className="p-4 text-right font-semibold text-[#0F2A4A]">
                              {row.total}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-gradient-to-r from-[#EAF2FF] to-[#F5F9FF]">
                          <td className="p-4 font-semibold text-[#1D4ED8] flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            FloatChat Captain (Pro)
                          </td>
                          <td className="p-4 text-[#1D4ED8] font-medium">
                            Bundled in $189/mo
                          </td>
                          <td className="p-4 text-right font-bold text-[#1D4ED8]">
                            $0 extra
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              {/* Pull-quote */}
              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Captain
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      1<span className="text-white/60">/</span>40
                      <span className="text-white/60">th</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Cost per resolution vs Intercom Fin.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Same model class. Lower margin.
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── HOW IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <SectionEyebrow num="03" label="Setup" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05] max-w-3xl">
                How it works.
              </h2>
            </BlurFade>

            <div className="mt-14 grid gap-6 lg:grid-cols-3 relative">
              {/* dotted connectors (desktop) */}
              <svg
                aria-hidden="true"
                className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <line
                  x1="33%"
                  y1="40%"
                  x2="38%"
                  y2="40%"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
                <line
                  x1="62%"
                  y1="40%"
                  x2="67%"
                  y2="40%"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
              </svg>

              {[
                {
                  step: "1",
                  title: "Connect knowledge.",
                  body:
                    "Upload PDFs, paste URLs, or sync your help center. Captain reads it all.",
                },
                {
                  step: "2",
                  title: "Train in 15 minutes.",
                  body:
                    "Captain runs through your past conversations and learns how your team replies.",
                },
                {
                  step: "3",
                  title: "Go live.",
                  body:
                    "Captain starts answering. Your team gets reply suggestions inside the editor.",
                },
              ].map((s, i) => (
                <BlurFade key={s.step} delay={0.1 + i * 0.1}>
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center text-white text-sm font-semibold shadow-md shadow-[#3B82F6]/30">
                        {s.step}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        / step {s.step}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-[#0F2A4A]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA (kept) ───── */}
        <InlineCTA
          headline="Add AI Captain to your inbox"
          body="Bundled in every paid plan from $9.99. No per-resolution fees."
          primaryLabel="Try Captain Free"
          primaryHref="/signup?plan=lite"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS — same as homepage ───── */}
        <Testimonials />

        {/* ───── FAQ — same design as homepage, Captain-specific copy ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="Straight answers about Captain, no sales spin."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or check the{" "}
                  <Link
                    to="/help"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Help Center
                  </Link>
                  .
                </p>
              }
            />
          </div>
        </section>

        {/* ───── FINAL CTA — clone of homepage CTA design, Captain copy ───── */}
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
              {/* Top hairline rainbow accent */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #C4B5FD 60%, #F0ABFC 80%, transparent)",
                }}
              />

              {/* Inner radial glow */}
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

              {/* Live status pill */}
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
                  Captain handling 60% of replies right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">avg. setup 15m</span>
              </motion.div>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative inline-flex items-center gap-2 mb-5"
              >
                <span className="text-[11px] font-mono text-slate-400">/ START</span>
                <span className="h-px w-8 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Ready when you are
                </span>
              </motion.div>

              {/* Heading — Captain copy */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try Captain free{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  for 14 days.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                $9.99/month after trial. Cancel anytime. Bundled AI, no per-resolution
                fees.
              </motion.p>

              {/* Buttons — Captain copy */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=lite"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Lite Plan Free Trial
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>

                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom trust line */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
            >
              {[
                "Bundled AI from $9.99",
                "No per-resolution fees",
                "5 LLMs supported",
                "DigitalOcean NYC3",
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
