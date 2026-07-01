"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Globe,
  MessageSquare,
  Users,
  BookOpen,
  GitBranch,
  Inbox,
  Languages,
  Clock,
  ShieldCheck,
  MessageCircle,
  Workflow,
  ListChecks,
  Send,
  CalendarClock,
  Bell,
  Compass,
  FileCheck2,
  Radio,
  UserCheck,
} from "lucide-react"
import { SiWhatsapp, SiGmail } from "react-icons/si"
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
  title: "Agentic AI for Education | FloatChat",
  description:
    "Guide students from inquiry to enrollment with agentic AI for admissions, reminders, and 24/7 support, plus omnichannel broadcasting.",
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
   HERO VISUAL — an admissions funnel.

   A horizontal Inquiry → Application → Reminder → Enrolled pipeline
   with an active stage marker that advances, a student chat thread
   the agent is driving, and a deadline-reminder card that fires. The
   whole thing shows an agentic AI moving one student through enrollment.
─────────────────────────────────────────────────────────────── */

type FunnelStage = "inquiry" | "application" | "reminder" | "enrolled"

const STAGE_ORDER: FunnelStage[] = [
  "inquiry",
  "application",
  "reminder",
  "enrolled",
]

const STAGE_META: Record<
  FunnelStage,
  { label: string; Icon: typeof Compass; caption: string }
> = {
  inquiry: { label: "Inquiry", Icon: Compass, caption: "asked about programs" },
  application: {
    label: "Application",
    Icon: FileCheck2,
    caption: "guided through steps",
  },
  reminder: { label: "Reminder", Icon: Bell, caption: "deadline nudge sent" },
  enrolled: { label: "Enrolled", Icon: UserCheck, caption: "seat confirmed" },
}

function AdmissionsFunnel() {
  const [active, setActive] = useState<FunnelStage>("inquiry")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        for (const stage of STAGE_ORDER) {
          if (cancelled) return
          setActive(stage)
          await wait(stage === "enrolled" ? 2600 : 2000)
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const activeIndex = STAGE_ORDER.indexOf(active)
  const showReminder = activeIndex >= STAGE_ORDER.indexOf("reminder")
  const showEnrolled = active === "enrolled"

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

      {/* Floating enrollment chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Inquiry → Enrolled, agent-guided
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
          WhatsApp · SMS · email
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
            app.floatchat.com · admissions
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        {/* ── The pipeline: a horizontal enrollment funnel ── */}
        <div className="px-4 pt-4 pb-3 border-b border-slate-200 bg-gradient-to-b from-[#F5F8FF] to-white">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-3">
            Enrollment pipeline · Aisha K.
          </p>
          <div className="flex items-center">
            {STAGE_ORDER.map((stage, i) => {
              const meta = STAGE_META[stage]
              const isActive = i === activeIndex
              const isDone = i < activeIndex
              const isEnrolledDone = stage === "enrolled" && showEnrolled
              return (
                <div key={stage} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <motion.div
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.08, 1],
                              boxShadow:
                                "0 0 0 4px rgba(59,130,246,0.15)",
                            }
                          : { scale: 1, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }
                      }
                      transition={{
                        duration: 1.2,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isDone || isEnrolledDone
                          ? "bg-emerald-500 text-white"
                          : isActive
                          ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isDone || isEnrolledDone ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        <meta.Icon className="h-4 w-4" />
                      )}
                    </motion.div>
                    <span
                      className={`text-[9.5px] font-semibold leading-none ${
                        isActive
                          ? "text-[#1D4ED8]"
                          : isDone || isEnrolledDone
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  {i < STAGE_ORDER.length - 1 && (
                    <div className="relative flex-1 h-0.5 mx-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                        animate={{ width: i < activeIndex ? "100%" : "0%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Sparkles className="h-2.5 w-2.5 text-[#3B82F6]" />
            <span className="text-[9px] text-slate-500">
              Agent is moving Aisha through {STAGE_META[active].caption}
            </span>
          </div>
        </div>

        {/* ── Student chat thread + reminder card ── */}
        <div className="grid grid-cols-12">
          {/* Conversation */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white border-r border-slate-200">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/80?img=47"
                    alt="Prospective student"
                    loading="lazy"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Aisha K.
                  </p>
                  <p className="text-[9px] text-slate-500">
                    WhatsApp · applicant
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Sparkles className="h-2.5 w-2.5" /> Admissions agent
              </span>
            </div>

            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 min-h-[220px]">
              {/* Student inquiry */}
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[86%] shadow-sm">
                  <p className="text-[11px] text-[#0F2A4A] leading-snug">
                    Hi! I want to apply for the MSc Data Science — what do I need
                    and when&apos;s the deadline?
                  </p>
                  <p className="text-[8px] text-slate-400 mt-0.5">6:41 PM</p>
                </div>
              </div>

              {/* Agent guidance */}
              <div className="flex items-start gap-1.5">
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="bg-[#3B82F6] rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[86%] shadow-sm">
                  <p className="text-[11px] text-white leading-snug">
                    You&apos;ll need a bachelor&apos;s, a transcript, and one
                    reference. I&apos;ve started your application — want me to
                    walk you through it now?
                  </p>
                </div>
              </div>

              {/* Application-step action card */}
              <AnimatePresence>
                {activeIndex >= STAGE_ORDER.indexOf("application") && (
                  <motion.div
                    key="app-action"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2 ml-6"
                  >
                    <div className="flex items-center gap-1.5">
                      <FileCheck2 className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Application · 2 of 4 steps done
                      </span>
                      <span className="ml-auto font-mono text-[8.5px] text-slate-500">
                        #APP-3391
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                      Program picked, transcript uploaded. Reference request sent
                      on the student&apos;s behalf.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enrolled badge */}
              <AnimatePresence>
                {showEnrolled && (
                  <motion.div
                    key="enrolled-badge"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-1.5 pl-6"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9.5px] font-medium text-emerald-600">
                      Enrolled · seat confirmed · deposit paid
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Agent on · guiding to enrollment…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2 py-1 rounded-md inline-flex items-center gap-1">
                <Send className="h-2.5 w-2.5" /> Send
              </button>
            </div>
          </section>

          {/* Deadline-reminder card rail */}
          <aside className="hidden md:flex md:col-span-5 flex-col bg-slate-50/50">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Automated reminder
              </p>
            </div>
            <div className="p-3">
              <motion.div
                animate={
                  showReminder
                    ? {
                        borderColor: "rgba(59,130,246,0.45)",
                        boxShadow: "0 0 0 3px rgba(59,130,246,0.08)",
                      }
                    : {
                        borderColor: "rgba(226,232,240,1)",
                        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
                      }
                }
                transition={{ duration: 0.3 }}
                className="rounded-xl border bg-white p-3"
              >
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-md bg-[#3B82F6]/10 flex items-center justify-center">
                    <CalendarClock className="h-3 w-3 text-[#1D4ED8]" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    Deadline reminder
                  </span>
                  {showReminder && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8px] font-medium text-emerald-700"
                    >
                      <Check className="h-2 w-2" strokeWidth={3} /> sent
                    </motion.span>
                  )}
                </div>
                <p className="mt-2 text-[10px] text-[#0F2A4A] leading-snug">
                  Hi Aisha — your MSc Data Science application closes in{" "}
                  <span className="font-semibold text-[#1D4ED8]">3 days</span>.
                  One reference is still pending. Tap to finish.
                </p>
                <div className="mt-2 flex items-center gap-1.5 pt-2 border-t border-slate-100">
                  <div className="h-3.5 w-3.5 rounded-full bg-[#25D366] flex items-center justify-center">
                    <SiWhatsapp style={{ color: "#fff", width: 8, height: 8 }} />
                  </div>
                  <span className="text-[9px] text-slate-500">
                    WhatsApp · falls back to SMS + email
                  </span>
                </div>
              </motion.div>

              <div className="mt-3 space-y-1.5">
                {[
                  { label: "Sequence", value: "3-touch nudge" },
                  { label: "Language", value: "Auto · EN" },
                  { label: "Status", value: showEnrolled ? "Enrolled" : "On track" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[10px] text-slate-500">
                      {row.label}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        row.label === "Status" && showEnrolled
                          ? "text-emerald-600"
                          : "text-[#1D4ED8]"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function AdmissionsVisual() {
  const steps = [
    { label: "Confirm entry requirements", done: true },
    { label: "Start application #APP-3391", done: true },
    { label: "Request reference", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Compass className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Admissions guidance
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">step by step</span>
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

function RemindersVisual() {
  const nudges = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "Application deadline", when: "in 3 days" },
    { Icon: SiGmail, bg: "#EA4335", label: "Tuition instalment", when: "Fri 5pm" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Cross-channel reminders
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Bell className="h-2.5 w-2.5" /> auto
        </span>
      </div>
      {nudges.map((n) => (
        <div
          key={n.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: n.bg }}
          >
            <n.Icon style={{ color: "#fff", width: 11, height: 11 }} />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A] truncate">
            {n.label}
          </span>
          <span className="ml-auto text-[9px] text-slate-500 shrink-0">
            {n.when}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function SupportVisual() {
  const sources = [
    { Icon: BookOpen, label: "Course catalog", meta: "142 programs" },
    { Icon: Globe, label: "campus.edu", meta: "crawled" },
    { Icon: ListChecks, label: "Handbook.pdf", meta: "student rules" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          24/7 grounded answers
        </span>
        <span className="inline-flex items-center gap-1 text-[8.5px] text-slate-400">
          <Languages className="h-2.5 w-2.5" /> 100+ languages
        </span>
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
          Answers only from your grounded sources
        </span>
      </div>
    </div>
  )
}

function BroadcastVisual() {
  const audiences = [
    { label: "Prospects · open day", count: "2,140" },
    { label: "Applicants · deadline", count: "618" },
    { label: "Enrolled · orientation", count: "894" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Radio className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Omnichannel broadcast
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">
          segmented
        </span>
      </div>
      {audiences.map((a) => (
        <div
          key={a.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <Users className="h-3 w-3 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] text-[#0F2A4A] truncate">{a.label}</span>
          <span className="ml-auto font-mono text-[9px] font-semibold text-[#1D4ED8]">
            {a.count}
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
    question: "Is FloatChat multilingual for international students?",
    answer:
      "Yes. The agent detects and replies in over 100 languages automatically. A prospective student can ask about a program in Spanish, Arabic, or Mandarin and get an accurate, grounded answer in the same language — so you can recruit globally without staffing a language desk for every market.",
  },
  {
    question: "Can it remind students about deadlines and payments?",
    answer:
      "Yes, across channels. FloatChat sends automated deadline, class, and tuition-payment reminders over WhatsApp, SMS, or email — as a sequence, not a single blast. Because it's agentic, it can also check who still has a pending step and nudge only the students who need it, so nobody misses an enrollment window.",
  },
  {
    question: "Does the agent actually guide applicants, or just answer FAQs?",
    answer:
      "It guides and acts. The admissions agent walks applicants through requirements, deadlines, and each step of the application, recommends the right program, and keeps the application moving. When a case needs a human — a special circumstance or an exception — it hands off in the same thread with full context.",
  },
  {
    question: "Does it integrate with our SIS, CRM, and other systems?",
    answer:
      "Yes, via our integrations and API. FloatChat connects to your student information system, admissions CRM, and payment tools so the agent can look up an application, update a record, and trigger the right reminder — all inside the guardrails you set.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "Students reach the same agent on WhatsApp, SMS, email, web chat, and Instagram, from one shared inbox. The same student record and conversation history follow them across every channel, so guidance and reminders stay consistent from first inquiry through enrollment.",
  },
  {
    question: "How fast can we launch for an admissions cycle?",
    answer:
      "Days, not months. Connect your channels and point the agent at your course catalog, handbook, and website — no conversation flows to map and no code to write. Most institutions are answering real applicant questions and sending reminders within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Education",
  serviceType: "Agentic AI for admissions, student support, and enrollment",
  description:
    "Guide students from inquiry to enrollment with agentic AI for admissions guidance, deadline and payment reminders, and 24/7 multilingual support, plus omnichannel broadcasting across WhatsApp, SMS, email, web chat, and Instagram.",
  url: "https://www.floatchat.com/industry/education",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType:
      "Universities, edtech companies, and training providers",
  },
}

/* ─────────────────────────────────────────────────────────────
   Cross-links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "How agents reason, act, and complete multi-step tasks on their own.",
  },
  {
    to: "/ai-agents/lead-generation",
    Icon: Compass,
    title: "Lead Generation Agent",
    body: "Turn prospective-student interest into a qualified applicant pipeline.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "Every student conversation, every channel, in one shared inbox.",
  },
  {
    to: "/channels/whatsapp",
    Icon: MessageSquare,
    title: "WhatsApp",
    body: "The channel students actually open — for guidance and reminders.",
  },
]

const relatedPills = [
  { to: "/channels/web-chat", label: "Web Chat", Icon: MessageCircle },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: ListChecks },
  { to: "/contact", label: "Talk to us", Icon: Users },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function EducationIndustryPage() {
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
                  <GraduationCap className="h-3.5 w-3.5" />
                  Education · from inquiry to enrollment
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    education.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Guide students from inquiry to enrollment and beyond with agents
                  that answer and act 24/7 — walking applicants through admissions,
                  sending deadline reminders, and supporting current students in
                  100+ languages.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Admissions guidance",
                    "Deadline reminders",
                    "24/7 multilingual",
                    "Omnichannel broadcasting",
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
                  Built for universities, edtech, and training providers.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <AdmissionsFunnel />
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
                  Icon: Compass,
                  value: "Admissions",
                  label: "guidance through every step",
                },
                {
                  Icon: BookOpen,
                  value: "Course",
                  label: "recommendations on demand",
                },
                {
                  Icon: CalendarClock,
                  value: "Reminders",
                  label: "for deadlines and classes",
                },
                {
                  Icon: Languages,
                  value: "24/7",
                  label: "multilingual student support",
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
                  Slow replies quietly cost you enrollments.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Prospective students research and apply at all hours, often
                    from another time zone. When a question about requirements or
                    a deadline sits in a queue until Monday, the applicant has
                    already moved on to the school that answered first.
                  </p>
                  <p>
                    Meanwhile, your admissions team is buried in the same handful
                    of questions, chasing incomplete applications, and manually
                    reminding students about deadlines and payments — work that
                    never ends and rarely scales with your intake.
                  </p>
                  <p>
                    <span className="font-semibold text-[#0F2A4A]">
                      Agentic AI
                    </span>{" "}
                    answers instantly, guides applicants through each step, and
                    keeps students on track — so staff can focus on the complex
                    cases that genuinely need a person.
                  </p>
                </div>
              </BlurFade>

              {/* Before / after contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Without an agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "After-hours questions go unanswered",
                        "Applicants stall on unclear steps",
                        "Deadlines missed, applications abandoned",
                        "Staff drown in repetitive FAQs",
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
                      With FloatChat
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Instant answers, day or night",
                        "Applicants guided step by step",
                        "Reminders keep students on schedule",
                        "Staff focus on complex cases",
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
                  One agent for the whole student journey.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Admissions guidance, reminders, always-on support, and campaign
                  broadcasting — grounded in your programs and running around the
                  clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Compass,
                  title: "Admissions and enrollment.",
                  body:
                    "Guides applicants through requirements, deadlines, and each step of the application, recommends the right program, and keeps the application moving toward an enrolled seat.",
                  visual: <AdmissionsVisual />,
                },
                {
                  Icon: Bell,
                  title: "Deadline and class reminders.",
                  body:
                    "Automated reminders for application deadlines, classes, and tuition payments over SMS, WhatsApp, or email — sent as sequences to the students who still have a step left.",
                  visual: <RemindersVisual />,
                },
                {
                  Icon: MessageCircle,
                  title: "24/7 student support.",
                  body:
                    "Always-on, multilingual answers for current students — grounded in your course catalog, handbook, and website, so replies stay accurate and on-brand.",
                  visual: <SupportVisual />,
                },
                {
                  Icon: Radio,
                  title: "Omnichannel broadcasting.",
                  body:
                    "Reach segmented audiences — prospects, applicants, enrolled students — with open-day invites, orientation details, and deadline campaigns across every channel.",
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
                  Inquiry to enrolled, without the drop-offs.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The agent doesn&apos;t just answer — it moves each student to
                  the{" "}
                  <span className="font-semibold text-[#0F2A4A]">
                    next step
                  </span>{" "}
                  and only escalates the cases that truly need a person.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: Compass,
                      title: "Inquiry",
                      note: "instant, grounded answers",
                    },
                    {
                      Icon: FileCheck2,
                      title: "Application",
                      note: "guided step by step",
                    },
                    {
                      Icon: Bell,
                      title: "Reminder",
                      note: "deadline & payment nudges",
                    },
                    {
                      Icon: UserCheck,
                      title: "Enrolled",
                      note: "seat confirmed",
                    },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                          <step.Icon className="h-[18px] w-[18px] text-white" />
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
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/50 px-4 py-3">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <p className="text-[13px] text-emerald-900/85 leading-snug">
                    Special circumstances and exceptions hand off to your team
                    in-thread, with the full application context attached — no
                    repeat questions.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Fill more seats without adding to the admissions team."
          body="Connect your channels and course catalog — guide students from inquiry to enrollment in days, no code to write."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY IT WORKS + WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Engaged students, focused staff, on-schedule everyone.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Applicants get instant guidance.",
                  body:
                    "No waiting for office hours or a reply that never comes — questions are answered and applications move forward the moment a student asks.",
                },
                {
                  Icon: Users,
                  title: "Staff focus on complex cases.",
                  body:
                    "The agent absorbs the repetitive volume and the routine reminders, so your team spends its hours on the applicants who genuinely need a person.",
                },
                {
                  Icon: CalendarClock,
                  title: "Reminders keep students on track.",
                  body:
                    "Deadline, class, and payment nudges keep applicants engaged and enrolled students on schedule — so fewer people fall through the cracks.",
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
                    Admissions, reminders, and campaigns share one student record,
                    so every message knows the student&apos;s journey — from the
                    first inquiry through enrollment and beyond.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      "One record across every channel",
                      "Same platform as your broadcasts",
                      "Full-context handoff to staff",
                    ].map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-2 text-[13px] font-medium text-white/85"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                        {t}
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
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built on the same platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The education agents share an inbox, a student record, and the
                  same guardrails with the rest of FloatChat.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((a, i) => (
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
              description="Straight answers about admissions, reminders, languages, and going live."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or explore{" "}
                  <Link
                    to="/integrations"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    integrations
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,219,254,0.55) 70%, rgba(207,242,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 60%, #93C5FD 80%, transparent)",
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
                  Guiding students to enrollment right now
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
                  For universities, edtech & training
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Support students with{" "}
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
                Guide students from inquiry to enrollment with admissions
                guidance, cross-channel reminders, and 24/7 multilingual support —
                all on one platform.
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
                "Admissions guidance",
                "Deadline reminders",
                "24/7 in 100+ languages",
                "Omnichannel broadcasting",
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
