"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Brain,
  Workflow,
  Package,
  MessageSquare,
  Users,
  ShieldCheck,
  Phone,
  MessageCircle,
  GitBranch,
  ListChecks,
  Database,
  Calendar,
  CreditCard,
  Mail,
  Boxes,
  Zap,
  Plug,
  Inbox,
  BarChart3,
  Target,
  HandHelping,
  ScanSearch,
  Lock,
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
  title: "Agentic AI for Customer Experience | FloatChat",
  description:
    "Deploy autonomous agentic AI that completes multi-step tasks across your tools and channels, with guardrails and human handoff built in.",
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
   HERO MOCKUP — the agent EXECUTES a multi-step task from a single
   request. A checklist lights up step by step:
     Understand intent → Look up order → Update record → Confirm
   ending in a "Done · no human needed" state. Phase-driven.
─────────────────────────────────────────────────────────────── */

type TaskStepState = "idle" | "running" | "done"

type ActionStep = {
  id: string
  Icon: typeof Brain
  label: string
  detail: string
}

const ACTION_STEPS: ActionStep[] = [
  {
    id: "intent",
    Icon: Brain,
    label: "Understand intent",
    detail: "“Switch my order to express and email me a receipt.”",
  },
  {
    id: "lookup",
    Icon: ScanSearch,
    label: "Look up order",
    detail: "Found #A-2291 · in edit window · standard shipping",
  },
  {
    id: "update",
    Icon: Package,
    label: "Update record",
    detail: "Standard → Express · no extra charge applied",
  },
  {
    id: "confirm",
    Icon: Mail,
    label: "Confirm change",
    detail: "Receipt + new ETA sent to the customer",
  },
]

function AgenticTaskMockup() {
  // phase 0 = intent received, 1..4 = steps completing, 5 = done badge
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        for (let p = 0; p <= 5; p++) {
          if (cancelled) return
          setPhase(p)
          await wait(p === 0 ? 1400 : p === 5 ? 2600 : 1250)
        }
        // brief pause on the finished state before looping
        await wait(900)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const stepState = (index: number): TaskStepState => {
    // step index is 0-based; it starts running at phase index+1
    const startPhase = index + 1
    if (phase < startPhase) return "idle"
    if (phase === startPhase) return "running"
    return "done"
  }

  const allDone = phase >= 5
  const completed = Math.max(0, Math.min(ACTION_STEPS.length, phase))
  const progressPct = (completed / ACTION_STEPS.length) * 100

  return (
    <div className="relative">
      {/* Glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.42), transparent 70%)",
        }}
      />

      {/* Floating "one request" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Zap className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          1 request · 4 actions
        </span>
      </motion.div>

      {/* Floating outcome chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          No human needed
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
            app.floatchat.com · agent run
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
            Working
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Tools / context rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Tools it can use
              </p>
            </div>
            <div className="px-3 py-3 space-y-2">
              <ToolRow
                Icon={Database}
                label="Order system"
                meta="read · write"
                active={phase >= 2 && phase <= 3}
              />
              <ToolRow
                Icon={CreditCard}
                label="Billing"
                meta="charge · refund"
                active={phase === 3}
              />
              <ToolRow
                Icon={Mail}
                label="Email / receipts"
                meta="send"
                active={phase >= 4}
              />
              <ToolRow Icon={Calendar} label="Scheduling" meta="standby" />
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Guardrails
              </p>
              <RailStat
                label="Refund cap"
                value="$200 auto"
                tone="blue"
              />
              <RailStat label="Edit window" value="Honored" tone="emerald" />
              <RailStat
                label="Escalate if"
                value="Out of policy"
                tone="amber"
              />
            </div>
          </aside>

          {/* Run pane */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Request header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    FloatChat Agent
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Executing a multi-step task
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Autonomous
              </span>
            </div>

            {/* The original request */}
            <div className="px-4 pt-3">
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[88%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi — can you switch order{" "}
                    <span className="font-mono">#A-2291</span> to express and
                    email me a receipt?
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">10:02 AM</p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="px-4 pt-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">
                  Plan · {completed}/{ACTION_STEPS.length} done
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {allDone ? "22s" : "running…"}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* The checklist */}
            <div className="flex-1 px-4 py-3 space-y-2 overflow-hidden">
              {ACTION_STEPS.map((step, i) => {
                const state = stepState(i)
                return (
                  <motion.div
                    key={step.id}
                    initial={false}
                    animate={{
                      borderColor:
                        state === "running"
                          ? "rgba(59,130,246,0.4)"
                          : state === "done"
                          ? "rgba(16,185,129,0.35)"
                          : "rgba(226,232,240,1)",
                      backgroundColor:
                        state === "running"
                          ? "rgba(234,242,255,0.7)"
                          : state === "done"
                          ? "rgba(236,253,245,0.5)"
                          : "rgba(248,250,252,0.4)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2.5 rounded-lg border px-2.5 py-2"
                  >
                    {/* status node */}
                    <div className="relative mt-0.5 shrink-0">
                      <AnimatePresence mode="wait">
                        {state === "done" ? (
                          <motion.span
                            key="done"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
                          >
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </motion.span>
                        ) : state === "running" ? (
                          <motion.span
                            key="run"
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative flex h-5 w-5 items-center justify-center rounded-full bg-[#3B82F6] text-white"
                          >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-40" />
                            <step.Icon className="relative h-2.5 w-2.5" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-400"
                          >
                            <step.Icon className="h-2.5 w-2.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-[11px] font-semibold leading-tight ${
                            state === "idle"
                              ? "text-slate-400"
                              : "text-[#0F2A4A]"
                          }`}
                        >
                          {step.label}
                        </p>
                        {state === "running" && (
                          <span className="text-[8.5px] font-medium text-[#1D4ED8]">
                            running
                          </span>
                        )}
                        {state === "done" && (
                          <span className="text-[8.5px] font-medium text-emerald-600">
                            done
                          </span>
                        )}
                      </div>
                      <AnimatePresence>
                        {state !== "idle" && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-0.5 text-[9.5px] text-slate-500 leading-snug overflow-hidden"
                          >
                            {step.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}

              {/* Done banner */}
              <AnimatePresence>
                {allDone && (
                  <motion.div
                    key="done-banner"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-[10px] font-semibold text-emerald-800">
                        Done · no human needed · 22s
                      </span>
                    </div>
                    <p className="mt-1 text-[9.5px] text-emerald-900/80 leading-snug">
                      Order updated, receipt sent, customer confirmed — start to
                      finish, from one message.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function ToolRow({
  Icon,
  label,
  meta,
  active,
}: {
  Icon: typeof Database
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
        <p className="text-[10px] font-medium text-[#0F2A4A] truncate">
          {label}
        </p>
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
   Mini visuals for the "What makes it agentic" feature cards
─────────────────────────────────────────────────────────────── */

function CompletesVisual() {
  const steps = [
    { label: "Look up order", done: true },
    { label: "Update shipping", done: true },
    { label: "Send receipt", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Workflow className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One request, end to end
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">not just an answer</span>
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

function OrchestrateVisual() {
  const tools = [
    { Icon: Database, label: "CRM" },
    { Icon: CreditCard, label: "Billing" },
    { Icon: Calendar, label: "Calendar" },
    { Icon: Mail, label: "Email" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One workflow across tools
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Plug className="h-2.5 w-2.5" /> connected
        </span>
      </div>
      <div className="relative flex items-center justify-between">
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1"
            >
              <t.Icon className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[8.5px] font-medium text-[#0F2A4A]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-0.5 px-1 text-slate-300">
          <ArrowRight className="h-3 w-3" />
          <ArrowRight className="h-3 w-3" />
        </div>
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shrink-0">
          <Bot className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function DecideVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Brain className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          New request · within policy?
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-emerald-200 bg-emerald-50/60 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <Zap className="h-2.5 w-2.5 text-emerald-700" />
            <span className="text-[9px] font-semibold text-emerald-800">
              Act
            </span>
          </div>
          <p className="mt-0.5 text-[8.5px] text-emerald-900/80 leading-snug">
            Complete it autonomously
          </p>
        </div>
        <div className="rounded-md border border-amber-200 bg-amber-50/60 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <HandHelping className="h-2.5 w-2.5 text-amber-700" />
            <span className="text-[9px] font-semibold text-amber-800">
              Ask
            </span>
          </div>
          <p className="mt-0.5 text-[8.5px] text-amber-900/80 leading-snug">
            Hand to a human, with context
          </p>
        </div>
      </div>
    </div>
  )
}

function GuardrailsVisual() {
  const rules = [
    { label: "Refunds ≤ $200", ok: true },
    { label: "Grounded in your data", ok: true },
    { label: "No off-policy actions", ok: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Operates inside your bounds
        </span>
        <Lock className="h-3 w-3 text-[#1D4ED8]" />
      </div>
      {rules.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
        </div>
      ))}
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <ShieldCheck className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          You set the limits — it never crosses them
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
}

const channels: ChannelTile[] = [
  { name: "WhatsApp", detail: "two-way", bg: "#25D366", Icon: SiWhatsapp },
  { name: "RCS", detail: "rich text", bg: "#1D4ED8", Lucide: MessageSquare },
  { name: "SMS", detail: "text", bg: "#0F2A4A", Lucide: MessageCircle },
  { name: "Voice", detail: "calls", bg: "#3B82F6", Lucide: Phone },
  { name: "Email", detail: "inbox", bg: "#EA4335", Icon: SiGmail },
  { name: "Instagram", detail: "DMs", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", detail: "DMs", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   Orchestration node graph — apps the agent connects into one flow
─────────────────────────────────────────────────────────────── */

const orchestrationNodes = [
  { Icon: Database, label: "CRM", note: "look up the customer" },
  { Icon: Package, label: "Orders", note: "read & update" },
  { Icon: CreditCard, label: "Billing", note: "charge or refund" },
  { Icon: Calendar, label: "Scheduling", note: "book or reschedule" },
  { Icon: Mail, label: "Email & receipts", note: "confirm the change" },
  { Icon: Boxes, label: "Inventory", note: "check availability" },
]

/* ─────────────────────────────────────────────────────────────
   Agents this powers
─────────────────────────────────────────────────────────────── */

const poweredAgents = [
  {
    to: "/ai-agents/customer-service",
    Icon: HandHelping,
    title: "Support Agent",
    body: "Resolves tickets end to end across every channel.",
  },
  {
    to: "/ai-agents/sales",
    Icon: Target,
    title: "Sales Agent",
    body: "Turns inbound interest into booked, qualified pipeline.",
  },
  {
    to: "/ai-agents/booking",
    Icon: Calendar,
    title: "Booking Agent",
    body: "Checks availability and confirms slots automatically.",
  },
  {
    to: "/ai-agents/lead-qualification",
    Icon: ListChecks,
    title: "Lead Qualification Agent",
    body: "Scores and routes new leads before they go cold.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Related products
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/ai-agents",
    Icon: Bot,
    title: "All AI Agents",
    body: "Every prebuilt agent agentic AI powers, in one place.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "One shared inbox where the agent and your team work together.",
  },
  {
    to: "/products/agent-copilot",
    Icon: Sparkles,
    title: "Agent Copilot",
    body: "Agentic AI assisting your human agents in real time.",
  },
  {
    to: "/integrations",
    Icon: Plug,
    title: "Integrations",
    body: "200+ apps, plus REST API and webhooks for the rest.",
  },
  {
    to: "/compare",
    Icon: GitBranch,
    title: "Compare FloatChat",
    body: "See how agentic AI here stacks up against scripted bots.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How is agentic AI different from a chatbot?",
    answer:
      "A chatbot answers a question — it matches what a customer says to a canned reply or a help article. Agentic AI takes multi-step action across your systems: it can look up an order, update a record, issue an eligible refund, and confirm the change in a single flow. The difference is between recognizing intent and actually completing the task behind it.",
  },
  {
    question: "Is it safe to let AI take actions on its own?",
    answer:
      "Yes. The agent only ever operates inside the guardrails you set — spending limits, the actions it's allowed to take, the tools it can touch, and the policies it must follow. It stays grounded in your data instead of improvising, and when a request falls outside its bounds it hands off to a human with full context rather than guessing.",
  },
  {
    question: "What can the agentic AI connect to?",
    answer:
      "Over 200 native integrations — CRMs, order and billing systems, calendars, help desks, and more — plus a REST API and webhooks so you can wire it into anything custom. That's what lets it orchestrate a real workflow instead of living in a silo.",
  },
  {
    question: "When does it decide to act versus ask a human?",
    answer:
      "It acts autonomously when the request is clear, in policy, and inside the limits you've defined. It escalates — to a human, in the same thread, with the order data, history, and a short summary attached — when the request is ambiguous, sensitive, or out of bounds. You decide where that line sits.",
  },
  {
    question: "Which channels does the agent work across?",
    answer:
      "WhatsApp, RCS, SMS, voice, email, and social — from one agent and one shared inbox. The same customer record and conversation history follow the customer across every channel, so context never resets when someone switches from chat to a call.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Days, not months — and no developer required. Connect your channels, point the agent at your knowledge base and tools, and set your guardrails. There are no conversation journeys to map and no code to write, so most teams have agentic AI taking real action within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Customer Experience",
  serviceType: "Autonomous agentic AI automation",
  description:
    "Autonomous agentic AI that completes multi-step tasks across your tools and channels — orchestrating systems, deciding when to act or ask, and operating inside your guardrails, with human handoff built in.",
  url: "https://www.floatchat.com/agentic-ai",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer experience, support, and revenue teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function AgenticAiPage() {
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
                  <Bot className="h-3.5 w-3.5" />
                  Agentic AI · action, not just answers
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI that takes{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    action, not just answers.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Autonomous AI agents that complete multi-step tasks across your
                  tools and channels — with guardrails and human handoff built
                  in. The difference between a chatbot and a teammate.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Multi-step actions",
                    "Orchestrates your tools",
                    "Acts or asks, on its own",
                    "Chat, voice & messaging",
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
                  The difference between a chatbot and a teammate.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <AgenticTaskMockup />
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
                  Icon: Workflow,
                  value: "Multi-step",
                  label: "actions from one request",
                },
                {
                  Icon: Plug,
                  value: "Orchestrates",
                  label: "your tools and databases",
                },
                {
                  Icon: Brain,
                  value: "Decides",
                  label: "when to act or ask",
                },
                {
                  Icon: MessageSquare,
                  value: "Everywhere",
                  label: "chat, voice & messaging",
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

        {/* ───── CHATBOT vs AGENTIC ───── */}
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
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="01" label="The gap" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A chatbot answers. Agentic AI acts.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A scripted chatbot can answer a question. It cannot look up
                    an order, update a record, and confirm a change in one flow —
                    so the moment a customer wants something{" "}
                    <span className="font-semibold text-[#0F2A4A]">done</span>,
                    it stalls and hands off.
                  </p>
                  <p>
                    Agentic AI closes that gap by acting on the customer&apos;s
                    intent, not just matching it to a canned reply. It reasons
                    about the request, calls the right tools in the right order,
                    and finishes the job — then knows when to bring in a human.
                  </p>
                </div>
              </BlurFade>

              {/* scripted vs agentic contrast */}
              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-7 w-7 rounded-lg bg-rose-100 flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-rose-600" />
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700">
                        Scripted chatbot · answers
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13px] text-rose-900/80 leading-relaxed">
                      {[
                        "Matches intent to a canned reply",
                        "Points to a help article, then stops",
                        "Needs a journey built for every path",
                        "Hands off the moment work is involved",
                        "Lives in a silo, blind to your systems",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#3B82F6]/30 bg-[#EAF2FF]/60 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </span>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8]">
                        Agentic AI · acts
                      </p>
                    </div>
                    <ul className="space-y-2.5 text-[13px] text-[#0F2A4A]/85 leading-relaxed">
                      {[
                        "Completes the task end to end",
                        "Looks up, updates, and confirms",
                        "Reasons from your data, no journeys",
                        "Acts autonomously inside guardrails",
                        "Orchestrates every connected tool",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-[#1D4ED8] mt-0.5 shrink-0"
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

        {/* ───── WHAT MAKES IT AGENTIC ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="What makes it agentic" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Four things a chatbot can&apos;t do.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Completing tasks, orchestrating systems, deciding when to act,
                  and staying inside your bounds — that&apos;s what makes agentic
                  AI a teammate instead of a script.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Workflow,
                  title: "Completes tasks.",
                  body:
                    "Multi-step actions from a single request, end to end. The agent looks up the order, makes the change, and sends the confirmation — instead of pointing the customer at a help article.",
                  visual: <CompletesVisual />,
                },
                {
                  Icon: Plug,
                  title: "Orchestrates systems.",
                  body:
                    "It connects disconnected tools and databases into one workflow — your CRM, billing, calendar, and email working together for a single request, all coordinated by the agent.",
                  visual: <OrchestrateVisual />,
                },
                {
                  Icon: Brain,
                  title: "Decides and escalates.",
                  body:
                    "It knows when to act autonomously and when to bring in a human — escalating ambiguous or sensitive requests in the same thread, with full context already attached.",
                  visual: <DecideVisual />,
                },
                {
                  Icon: ShieldCheck,
                  title: "Stays in bounds.",
                  body:
                    "It operates inside the guardrails you set — spending limits, allowed actions, policy — and stays grounded in your data, so it never improvises or crosses a line you've drawn.",
                  visual: <GuardrailsVisual />,
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

        {/* ───── ORCHESTRATION DIAGRAM ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Orchestration" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent, every system, one workflow.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Your tools don&apos;t talk to each other. The agent does the
                  talking — pulling each one into a single, coordinated flow so a
                  request becomes a completed task.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-10 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.25)]">
                {/* glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(96,165,250,0.12), transparent 70%)",
                  }}
                />
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
                  {/* left column nodes */}
                  <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {orchestrationNodes.slice(0, 3).map((n) => (
                      <NodeTile key={n.label} {...n} align="left" />
                    ))}
                  </div>

                  {/* hub */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center py-4">
                    <div className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-6 rounded-full blur-2xl opacity-70"
                        style={{
                          background:
                            "radial-gradient(closest-side, rgba(59,130,246,0.4), transparent 70%)",
                        }}
                      />
                      <div className="relative h-24 w-24 rounded-3xl bg-gradient-to-br from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] flex flex-col items-center justify-center shadow-[0_20px_40px_-15px_rgba(29,78,216,0.6)]">
                        <Bot className="h-9 w-9 text-white" />
                        <span className="mt-1 text-[10px] font-semibold text-white/90 uppercase tracking-wider">
                          Agent
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/25 bg-[#EAF2FF] px-3 py-1">
                      <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[11px] font-medium text-[#1D4ED8]">
                        Plans · calls tools · verifies
                      </span>
                    </div>
                    <p className="mt-3 max-w-xs text-center text-[12.5px] text-slate-500 leading-relaxed">
                      The agent decides which systems to touch, in what order, and
                      checks the result before it replies.
                    </p>
                  </div>

                  {/* right column nodes */}
                  <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {orchestrationNodes.slice(3).map((n) => (
                      <NodeTile key={n.label} {...n} align="right" />
                    ))}
                  </div>
                </div>

                {/* connector legend */}
                <div className="relative mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
                  {[
                    "200+ native integrations",
                    "REST API",
                    "Webhooks",
                    "Your data, grounded",
                  ].map((t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHERE IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="04" label="Where it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Every channel. Every agent.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Agentic AI runs across chat, voice, and messaging — and powers
                  the prebuilt agents you already use.
                </p>
              </BlurFade>
            </div>

            {/* channels */}
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
                      ) : null}
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

            {/* powered agents */}
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {poweredAgents.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed flex-1">
                      {a.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Explore
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Also
                </span>
                {[
                  { to: "/ai-agents/agent-builder", label: "Build your own agent" },
                  { to: "/voice", label: "Voice AI" },
                  { to: "/ai-agents", label: "See all agents" },
                ].map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                  >
                    {p.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Agentic AI plus the platform to run it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The intelligence is only half of it. You also get the channels,
                  numbers, and broadcasting to put it to work — in one platform,
                  without a developer and without an enterprise contract.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Boxes,
                  title: "One platform, not a stack.",
                  body:
                    "Agentic AI, the channels, your numbers, and broadcasting live together — so you're not gluing five vendors and a Twilio account into a workflow.",
                },
                {
                  Icon: Zap,
                  title: "Live in days, no developer.",
                  body:
                    "Connect your tools, point the agent at your data, set your guardrails. No conversation journeys to map, no code to write, no months-long build.",
                },
                {
                  Icon: BarChart3,
                  title: "Priced for real teams.",
                  body:
                    "No per-resolution fees and no enterprise contract to put agentic AI to work. Start free and scale on capacity, not per-seat surprises.",
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

            {/* dark panel */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                  <div className="lg:flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                      The whole point
                    </p>
                    <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                      You get agentic AI plus the channels, numbers, and
                      broadcasting to put it to work — one platform, one customer
                      record, and one place to set the guardrails it runs inside.
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col gap-3">
                    {[
                      { Icon: Plug, label: "200+ integrations + API" },
                      { Icon: ShieldCheck, label: "Your guardrails, enforced" },
                      { Icon: Users, label: "Human handoff built in" },
                    ].map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5"
                      >
                        <r.Icon className="h-4 w-4 text-white/90 shrink-0" />
                        <span className="text-[13px] font-medium text-white/90">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Put agentic AI to work across every channel."
          body="Agentic AI plus the channels, numbers, and broadcasting to use it — one platform, no developer required."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Where agentic AI shows up next.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same intelligence powers your agents, your inbox, your
                  copilot, and everything you connect it to.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCards.map((c, i) => (
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

              <BlurFade delay={0.05 + relatedCards.length * 0.06} className="h-full">
                <Link
                  to="/pricing"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">See pricing</h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      No per-resolution fees, no enterprise contract. Start free.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    View plans
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
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
              description="Straight answers about what agentic AI does, how it stays safe, and what it connects to."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or compare{" "}
                  <Link
                    to="/compare"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    FloatChat vs. scripted bots
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3B82F6] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3B82F6]" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Agents taking action across every channel right now
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
                  No developer required
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Put agentic AI to work across{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  every channel.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Deploy autonomous AI that completes multi-step tasks across your
                tools and channels — with guardrails and human handoff built in.
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
                "Multi-step actions",
                "Orchestrates your tools",
                "Acts or asks, on its own",
                "Guardrails + human handoff",
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

/* ─────────────────────────────────────────────────────────────
   Orchestration node tile
─────────────────────────────────────────────────────────────── */

function NodeTile({
  Icon,
  label,
  note,
  align,
}: {
  Icon: typeof Database
  label: string
  note: string
  align: "left" | "right"
}) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 hover:border-[#3B82F6]/40 hover:shadow-[0_15px_30px_-18px_rgba(15,42,74,0.3)] transition-all duration-300 ${
        align === "right" ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
    >
      <div className="h-9 w-9 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0 group-hover:bg-[#3B82F6]/15 transition-colors">
        <Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-[#0F2A4A] truncate">
          {label}
        </p>
        <p className="text-[11px] text-slate-500 truncate">{note}</p>
      </div>
    </div>
  )
}
