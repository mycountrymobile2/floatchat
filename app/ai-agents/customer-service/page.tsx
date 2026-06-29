"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Headphones,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Globe,
  Package,
  MessageSquare,
  Users,
  BookOpen,
  GitBranch,
  Inbox,
  Languages,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  Workflow,
  ListChecks,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiGmail,
} from "react-icons/si"
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
  title:
    "Agentic AI Customer Service Agent for Omnichannel Support | FloatChat",
  description:
    "Deflect and resolve repetitive tickets with an agentic AI customer service agent that answers across channels, stays grounded in your data, and hands off with context.",
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
   HERO MOCKUP — a live "resolution" support thread that cycles
   through: incoming ticket → grounding in KB → resolved action →
   resolved badge → a frustrated case that hands off to a human.
─────────────────────────────────────────────────────────────── */

type ResolvePhase =
  | "incoming"
  | "grounding"
  | "action"
  | "resolved"
  | "handoffIn"
  | "handoffEscalate"

function ResolutionMockup() {
  const [phase, setPhase] = useState<ResolvePhase>("incoming")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("incoming")
        await wait(1500)
        if (cancelled) return
        setPhase("grounding")
        await wait(1800)
        if (cancelled) return
        setPhase("action")
        await wait(1900)
        if (cancelled) return
        setPhase("resolved")
        await wait(2600)
        if (cancelled) return
        setPhase("handoffIn")
        await wait(1600)
        if (cancelled) return
        setPhase("handoffEscalate")
        await wait(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isResolveTrack =
    phase === "incoming" ||
    phase === "grounding" ||
    phase === "action" ||
    phase === "resolved"

  const showGrounding = phase === "grounding"
  const showAction = phase === "action" || phase === "resolved"
  const showResolved = phase === "resolved"
  const showEscalate = phase === "handoffEscalate"

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

      {/* Floating deflection chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          ~60% tier-1 resolved
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
          WhatsApp · 7 channels
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
            app.floatchat.com · resolution
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Knowledge / context rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Grounded in
              </p>
            </div>
            <div className="px-3 py-3 space-y-2">
              <KbRow
                Icon={BookOpen}
                label="Help center"
                meta="312 articles"
                active={showGrounding}
              />
              <KbRow
                Icon={Package}
                label="Order system"
                meta="live lookup"
                active={showGrounding || showAction}
              />
              <KbRow
                Icon={Globe}
                label="Returns Policy.pdf"
                meta="8 pages"
                active={showGrounding}
              />
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                This conversation
              </p>
              <RailStat
                label="Status"
                value={isResolveTrack ? (showResolved ? "Resolved" : "Working") : "Escalated"}
                tone={isResolveTrack ? "emerald" : "amber"}
              />
              <RailStat label="Language" value="Auto · EN" tone="blue" />
              <RailStat label="Channel" value={isResolveTrack ? "WhatsApp" : "Web chat"} tone="blue" />
            </div>
          </aside>

          {/* Conversation pane */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Customer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=12"
                    alt="Customer"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    {isResolveTrack ? "Daniela Cruz" : "Marcus Webb"}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {isResolveTrack ? "WhatsApp · Order #A-2291" : "Web chat · returning"}
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {isResolveTrack ? (
                  <motion.span
                    key="agent-tag"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]"
                  >
                    <Sparkles className="h-2.5 w-2.5" /> Agent resolving
                  </motion.span>
                ) : (
                  <motion.span
                    key="human-tag"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-medium text-amber-700"
                  >
                    <Users className="h-2.5 w-2.5" /> Human handoff
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              <AnimatePresence mode="wait">
                {isResolveTrack ? (
                  <motion.div
                    key="resolve-track"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {/* Incoming ticket */}
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          Hi — I changed my mind, can you switch order #A-2291 to
                          express shipping before it goes out?
                        </p>
                        <p className="text-[8px] text-slate-400 mt-0.5">10:02 AM</p>
                      </div>
                    </div>

                    {/* Grounding indicator */}
                    <AnimatePresence>
                      {showGrounding && (
                        <motion.div
                          key="grounding"
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
                              Checking shipping policy + order status…
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action chip — the agent DOES something */}
                    <AnimatePresence>
                      {showAction && (
                        <motion.div
                          key="action"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <Package className="h-3 w-3 text-[#1D4ED8]" />
                            <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                              Action · order updated
                            </span>
                            <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                              #A-2291
                            </span>
                          </div>
                          <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                            Standard → <span className="font-semibold">Express</span>,
                            no extra charge (within edit window). Confirmation sent.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Agent reply */}
                    <AnimatePresence>
                      {showAction && (
                        <motion.div
                          key="reply"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="flex items-start gap-1.5"
                        >
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                            <p className="text-[11px] text-white leading-snug">
                              Done, Daniela! #A-2291 is now express — it leaves
                              today and arrives tomorrow. Anything else?
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Resolved badge */}
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
                            Resolved · no human needed · 22s
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="handoff-track"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {/* Hard question */}
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          This is the second time my replacement unit arrived
                          damaged. I want this escalated.
                        </p>
                        <p className="text-[8px] text-slate-400 mt-0.5">10:14 AM</p>
                      </div>
                    </div>

                    {/* Agent recognizes limits */}
                    <div className="flex items-start gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[82%]">
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          I&apos;m sorry, Marcus — bringing in a specialist now.
                          They&apos;ll have your full history.
                        </p>
                      </div>
                    </div>

                    {/* Escalation card with full context */}
                    <AnimatePresence>
                      {showEscalate && (
                        <motion.div
                          key="escalate"
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="rounded-lg border border-amber-200 bg-amber-50/70 px-2.5 py-2"
                        >
                          <div className="flex items-center gap-1.5">
                            <GitBranch className="h-3 w-3 text-amber-700" />
                            <span className="text-[9.5px] font-semibold text-amber-800 uppercase tracking-wider">
                              Handed to Priya N. · with context
                            </span>
                          </div>
                          <ul className="mt-1.5 space-y-1">
                            {[
                              "2nd damaged replacement · order #B-8841",
                              "Refund eligible · returns window open",
                              "Sentiment: frustrated · priority high",
                            ].map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-1.5 text-[9.5px] text-amber-900"
                              >
                                <Check
                                  className="h-2.5 w-2.5 text-amber-600 mt-0.5 shrink-0"
                                  strokeWidth={3}
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-1.5 flex items-center gap-1.5 pt-1.5 border-t border-amber-200">
                            <img
                              src="https://i.pravatar.cc/40?img=45"
                              alt="Priya N."
                              loading="lazy"
                              className="h-4 w-4 rounded-full object-cover"
                            />
                            <span className="text-[9px] text-amber-800">
                              Priya is typing — same thread, no repeat questions.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Agent on · reply, note, or hand off…
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

function KbRow({
  Icon,
  label,
  meta,
  active,
}: {
  Icon: typeof BookOpen
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
          : {
              borderColor: "rgba(226,232,240,1)",
              boxShadow: "0 0 0 0 rgba(0,0,0,0)",
            }
      }
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 rounded-lg border bg-white px-2 py-1.5"
    >
      <div
        className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-[#3B82F6]/10" : "bg-slate-100"
        }`}
      >
        <Icon
          className={`h-3 w-3 ${active ? "text-[#1D4ED8]" : "text-slate-500"}`}
        />
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

function RailStat({
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
      <span className={`text-[11px] font-semibold ${toneClass[tone]}`}>
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What it does" feature cards
─────────────────────────────────────────────────────────────── */

function OmnichannelVisual() {
  const rows = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", note: "ETA question" },
    { Icon: SiGmail, bg: "#EA4335", label: "Email", note: "invoice copy" },
    { Icon: SiInstagram, bg: "#E4405F", label: "Instagram", note: "size help" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One agent · many channels
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> shared inbox
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <span className="ml-auto text-[9px] text-slate-500 truncate">{r.note}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function ResolveVisual() {
  const steps = [
    { label: "Look up order #A-2291", done: true },
    { label: "Change ship method", done: true },
    { label: "Send confirmation", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Multi-step task
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not just routed</span>
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
              running
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function EscalateVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Sparkles className="h-3 w-3 text-[#3B82F6]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          Agent thread · 14 messages
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-amber-200 bg-amber-50/60 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-amber-700" />
          <span className="text-[9.5px] font-semibold text-amber-800">
            Priya N. · same thread
          </span>
        </div>
        <p className="mt-1 text-[9px] text-amber-900 leading-snug">
          Inherits order, sentiment, and 3-bullet summary. Zero repeat questions.
        </p>
      </div>
    </div>
  )
}

function LearnsVisual() {
  const sources = [
    { Icon: BookOpen, label: "Help center", meta: "312 articles" },
    { Icon: Globe, label: "yoursite.com", meta: "crawled" },
    { Icon: ListChecks, label: "Policies.pdf", meta: "8 docs" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Trained on your business
        </span>
        <span className="text-[8.5px] text-slate-400">no hallucinations</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {sources.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center text-center gap-1"
          >
            <s.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[8.5px] font-medium text-[#0F2A4A] leading-tight">
              {s.label}
            </span>
            <span className="text-[7.5px] text-slate-400">{s.meta}</span>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Answers only from grounded sources
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Channels
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  detail: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof Phone
  initial?: string
}

const channels: ChannelTile[] = [
  { name: "WhatsApp", detail: "two-way", bg: "#25D366", Icon: SiWhatsapp },
  { name: "SMS", detail: "text", bg: "#0F2A4A", Lucide: MessageSquare },
  { name: "Email", detail: "inbox", bg: "#EA4335", Icon: SiGmail },
  { name: "Voice", detail: "call deflect", bg: "#1D4ED8", Lucide: Phone },
  { name: "Web chat", detail: "on-site", bg: "#3B82F6", Lucide: MessageCircle },
  { name: "Instagram", detail: "DMs", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", detail: "DMs", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does it replace my support team?",
    answer:
      "No. The AI customer service agent handles the repetitive, well-documented volume — order lookups, status changes, policy questions — so your people spend their hours on judgment calls, edge cases, and the conversations that actually need empathy. When a ticket needs a human, the agent escalates it with full context instead of dumping a cold transcript on someone.",
  },
  {
    question: "Can the agent actually take actions, or just answer?",
    answer:
      "It takes actions. Because it's agentic, it can complete multi-step tasks across your connected tools — look up an order, change a shipping method, issue an eligible refund, update an address — not just point a customer at a help article. Every action runs inside the guardrails you set.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Days, not months. Connect your channels and point the agent at your knowledge base — your help center, PDFs, and website. There are no pre-built conversation journeys to map and no code to write. Most teams are deflecting real tickets within the first week.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "Seven, from one agent and one shared inbox: WhatsApp, SMS, email, voice, web chat, Instagram, and Messenger. The same customer record and conversation history follow the customer across every one of them.",
  },
  {
    question: "How does the human handoff work?",
    answer:
      "When the agent hits the edge of what it should resolve, it escalates inside the same thread. The human who picks it up inherits the full history, the relevant order or account data, a short summary, and the customer's sentiment — so there are no repeat questions and no lost context.",
  },
  {
    question: "What languages does it support?",
    answer:
      "Over 100 languages, detected automatically. A customer can message in Spanish, Portuguese, or Arabic and get an accurate, grounded answer in the same language — without you staffing for every market.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Customer Service Agent",
  serviceType: "Agentic AI customer service automation",
  description:
    "An agentic AI customer service agent that answers and resolves repetitive tickets across WhatsApp, SMS, email, voice, web chat, Instagram, and Messenger — grounded in your knowledge base, with full-context handoff to human agents.",
  url: "https://www.floatchat.com/ai-agents/customer-service",
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
   Sibling agents + related products
─────────────────────────────────────────────────────────────── */

const siblingAgents = [
  {
    to: "/ai-agents/sales",
    Icon: ArrowUpRight,
    title: "Sales Agent",
    body: "Turns inbound interest into qualified, booked pipeline.",
  },
  {
    to: "/ai-agents/booking",
    Icon: Clock,
    title: "Booking Agent",
    body: "Fills the calendar — checks availability and confirms slots.",
  },
  {
    to: "/ai-agents/lead-qualification",
    Icon: ListChecks,
    title: "Lead Qualification Agent",
    body: "Scores and routes new leads before they go cold.",
  },
  {
    to: "/ai-agents/agent-builder",
    Icon: Workflow,
    title: "Agent Builder",
    body: "Compose your own agent, no code, on the same platform.",
  },
]

const relatedProducts = [
  { to: "/inbox", label: "Shared Inbox", Icon: Inbox },
  { to: "/whatsapp", label: "WhatsApp", Icon: MessageSquare },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function CustomerServiceAgentPage() {
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
                  <Headphones className="h-3.5 w-3.5" />
                  AI Customer Service Agent · resolution, not just deflection
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  An agentic AI customer service agent that{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    actually resolves.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Deflect repetitive tickets across every channel with an agent
                  that answers from your data, completes the task, and escalates
                  the rest with full context.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "24/7 across 7 channels",
                    "Resolves, not just routes",
                    "100+ languages",
                    "Full-context handoff",
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
                  Built for support teams that want resolution, not just deflection.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <ResolutionMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Clock, value: "24/7", label: "across 7 live channels" },
                { Icon: Languages, value: "100+", label: "languages, auto-detected" },
                { Icon: CheckCircle2, value: "~60%", label: "tier-1 tickets deflected" },
                { Icon: GitBranch, value: "Full", label: "context on every handoff" },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="text-2xl lg:text-3xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
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
                  Support volume scales faster than headcount.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Every new customer, channel, and product adds tickets — but
                    you can&apos;t hire a new agent for every spike. So the queue
                    grows, first-response times slip, and your best people burn
                    out answering the same question for the thousandth time.
                  </p>
                  <p>
                    Most chatbots make this worse, not better. They handle the
                    five easy questions everyone already knows the answer to, then
                    dump everything else on your team — usually with no order
                    context, no history, and an annoyed customer attached.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI customer service agent
                    </span>{" "}
                    closes that gap. It resolves far more on its own, and makes the
                    handoffs that remain effortless instead of painful.
                  </p>
                </div>
              </BlurFade>

              {/* chatbot vs agent contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                      A chatbot that deflects
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Answers FAQs, then gives up",
                        "Routes hard tickets with no context",
                        "Needs pre-built journeys for everything",
                        "Customer repeats themselves to a human",
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
                      An agent that resolves
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Completes the task end to end",
                        "Escalates in-thread with full history",
                        "Reasons from your data, no journeys",
                        "Human inherits everything, no repeats",
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
                  What the agent does.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one agent, one shared inbox — grounded in your
                  business and working around the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Globe,
                  title: "Answers across every channel.",
                  body:
                    "WhatsApp, SMS, email, voice, and web from one place — grounded in your knowledge base, with one customer record following the conversation everywhere.",
                  visual: <OmnichannelVisual />,
                },
                {
                  Icon: Workflow,
                  title: "Resolves, not just routes.",
                  body:
                    "Because it's agentic, it completes multi-step tasks like order lookups, status changes, and eligible refunds — finishing the job instead of handing the customer a help article.",
                  visual: <ResolveVisual />,
                },
                {
                  Icon: GitBranch,
                  title: "Escalates with full context.",
                  body:
                    "When a ticket needs a person, the agent hands off in the same thread — passing the order data, the sentiment, and a short summary so your team never starts from zero.",
                  visual: <EscalateVisual />,
                },
                {
                  Icon: BookOpen,
                  title: "Learns your business.",
                  body:
                    "Trained on your help center, PDFs, and website. It answers only from grounded sources, so it stays accurate and on-brand instead of making things up.",
                  visual: <LearnsVisual />,
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

        {/* ───── CHANNELS STRIP ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Seven channels. One agent.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Wherever your customers message, the agent is already there —
                  same context, same history.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {channels.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: c.bg }}
                    >
                      {c.Icon ? (
                        <c.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : c.Lucide ? (
                        <c.Lucide className="h-[18px] w-[18px] text-white" />
                      ) : (
                        c.initial
                      )}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── DEFLECTION / HANDOFF TIMELINE ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Deflect & hand off" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Routine volume resolved. The rest, handed off clean.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The agent doesn&apos;t just decide whether to escalate — it
                  decides <span className="font-semibold text-[#0F2A4A]">what to carry with it</span>.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Before */}
              <BlurFade delay={0.1} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-rose-200 bg-rose-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-4">
                    Before
                  </p>
                  <p className="text-base text-rose-900/80 leading-relaxed mb-5">
                    Every hard question lands on the team — cold, context-free,
                    and behind a queue.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Bot deflects 5 FAQs, escalates the rest blindly",
                      "Agent re-asks for order number and history",
                      "Customer repeats the whole story, frustrated",
                      "Routine tickets and real problems share one queue",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-rose-900/80 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              {/* Arrow / timeline */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <span className="h-12 w-px bg-gradient-to-b from-rose-300 to-emerald-300" />
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="h-12 w-px bg-gradient-to-b from-emerald-300 to-rose-300" />
                </div>
              </div>

              {/* After */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-4">
                    After
                  </p>
                  <p className="text-base text-emerald-900/85 leading-relaxed mb-5">
                    The agent resolves routine volume and escalates the rest
                    in-thread — with everything a human needs already attached.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Routine tickets resolved end to end, 24/7",
                      "Escalations carry order data + full history",
                      "Sentiment and a 3-bullet summary travel along",
                      "Humans only see what genuinely needs them",
                    ].map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[13.5px] text-emerald-900/85 leading-relaxed"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0"
                          strokeWidth={3}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>

            {/* small handoff visual band */}
            <BlurFade delay={0.25}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Inbox, title: "Ticket arrives", note: "any of 7 channels" },
                    { Icon: Sparkles, title: "Agent resolves", note: "grounded in your data" },
                    { Icon: GitBranch, title: "Escalates if needed", note: "in the same thread" },
                    { Icon: ShieldCheck, title: "Human takes over", note: "with full context" },
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
          headline="Resolve more tickets without adding headcount."
          body="Connect your channels and knowledge base — go live in days, no per-resolution fees."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Faster answers, happier customers, calmer team.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Instant, accurate answers.",
                  body:
                    "Customers get correct, grounded answers at any hour — no queue for a simple question, no waiting until business hours.",
                },
                {
                  Icon: Users,
                  title: "Your team stops repeating itself.",
                  body:
                    "The agent absorbs the repetitive volume, so your people focus on the conversations that actually need a person.",
                },
                {
                  Icon: ShieldCheck,
                  title: "CSAT rises.",
                  body:
                    "Nobody waits in line for a one-line answer, and escalations arrive with context — so resolutions feel effortless.",
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
                    It works everywhere your customers are, shares one inbox with
                    your team, and runs on the same platform as your campaigns and
                    numbers — so one customer record follows every conversation.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED / AGENT FAMILY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Agent family" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent for every job.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The customer service agent shares an inbox, a customer record,
                  and the same guardrails with the rest of the family.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblingAgents.map((a, i) => (
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

              <BlurFade delay={0.05 + siblingAgents.length * 0.06} className="h-full">
                <Link
                  to="/ai-agents"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">See all AI agents</h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      Compare every agent and find the right fit for your team.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    Explore the family
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
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
              description="Straight answers about resolving, escalating, and going live."
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
                  Resolving tickets across 7 channels right now
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
                  No per-resolution fees
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Resolve more tickets without{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  adding headcount.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Connect your channels and knowledge base, and let an agentic AI
                customer service agent take the routine volume — resolution, not
                just deflection.
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
                "24/7 across 7 channels",
                "100+ languages",
                "Resolves, not just routes",
                "Full-context handoff",
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
