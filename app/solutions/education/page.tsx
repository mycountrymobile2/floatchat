"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  Bot,
  MessageSquare,
  Globe,
  BookOpen,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Clock,
  Languages,
  FileText,
  Calendar,
  Send,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Student portal with admissions chat
─────────────────────────────────────────────────────────────── */

function StudentPortalMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(900)
        if (cancelled) return
        setPhase(1) // widget toast
        await wait(1400)
        if (cancelled) return
        setPhase(2) // widget opens
        await wait(1700)
        if (cancelled) return
        setPhase(3) // Captain reply with FAQ
        await wait(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isOpen = phase >= 2

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), rgba(96,165,250,0.25), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#1D4ED8] flex items-center justify-center">
          <GraduationCap className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          24/7 admissions · Captain
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Languages className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          5 languages on Growth
        </span>
      </motion.div>

      {/* Browser */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-[10px] text-slate-500">
              <Globe className="h-2.5 w-2.5" />
              <span className="font-mono">portal.cypressacademy.edu</span>
            </div>
          </div>
        </div>

        <div className="relative h-[480px] bg-white overflow-hidden">
          {/* Portal header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#1D4ED8]">
              Cypress Academy
            </span>
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <span>Courses</span>
              <span>Admissions</span>
              <span>Catalog</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#1D4ED8]">
                Spring '26
              </span>
            </div>
          </div>

          {/* Welcome banner */}
          <div className="px-5 pt-4 pb-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#1D4ED8] font-semibold">
              Welcome, prospective student
            </p>
            <p className="mt-1 text-base font-semibold text-[#0F2A4A]">
              Online MBA · Spring 2026 enrollment open
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              12-month accelerated · cohort starts Feb 3
            </p>
          </div>

          {/* Courses grid */}
          <div className="px-5">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { title: "Microeconomics", code: "ECON 501", weeks: 12, color: "from-blue-100 to-blue-200" },
                { title: "Data Analytics", code: "BUS 540", weeks: 8, color: "from-blue-100 to-blue-200" },
                { title: "Leadership Lab", code: "LEAD 610", weeks: 6, color: "from-amber-100 to-amber-200" },
              ].map((c) => (
                <div
                  key={c.code}
                  className="rounded-lg border border-slate-200 overflow-hidden bg-white"
                >
                  <div className={`aspect-[5/3] bg-gradient-to-br ${c.color} flex items-center justify-center`}>
                    <BookOpen className="h-5 w-5 text-[#1D4ED8]/40" />
                  </div>
                  <div className="px-2.5 py-1.5">
                    <p className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400">
                      {c.code}
                    </p>
                    <p className="text-[10px] font-semibold text-[#0F2A4A] truncate">
                      {c.title}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      {c.weeks} weeks
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="px-5 pt-4 flex items-center gap-2">
            <button className="text-[10px] font-semibold bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] text-white px-3 py-1.5 rounded-md">
              Apply now
            </button>
            <button className="text-[10px] font-semibold bg-white border border-slate-200 text-[#0F2A4A] px-3 py-1.5 rounded-md">
              Download catalog
            </button>
          </div>

          {/* Widget peek toast */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-20 right-4 max-w-[210px] rounded-xl rounded-br-sm bg-white border border-slate-200 shadow-[0_15px_40px_-15px_rgba(15,42,74,0.25)] px-3 py-2"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <img
                    src="https://i.pravatar.cc/40?img=32"
                    alt="Sarah K."
                    loading="lazy"
                    className="h-4 w-4 rounded-full object-cover ring-1 ring-white"
                  />
                  <span className="text-[9.5px] font-medium text-[#0F2A4A]">
                    Admissions
                  </span>
                  <span className="text-[8.5px] text-emerald-600 flex items-center gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    24/7
                  </span>
                </div>
                <p className="text-[10px] text-[#0F2A4A] leading-snug">
                  Questions about applying? 🎓
                </p>
                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-white border-r border-b border-slate-200" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Widget expanded */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="widget"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 w-[240px] rounded-2xl bg-white border border-slate-200 shadow-[0_25px_50px_-12px_rgba(15,42,74,0.4)] overflow-hidden"
              >
                <div className="bg-[#1D4ED8] px-3 py-2.5 flex items-center gap-2">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/80?img=32"
                      alt="Admissions"
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#1D4ED8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white">
                      Admissions · Cypress
                    </p>
                    <p className="text-[9px] text-blue-200">
                      Open 24/7 with Captain
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-2.5 space-y-1.5 min-h-[170px] bg-slate-50/40">
                  <div className="flex justify-start">
                    <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10.5px] text-[#0F2A4A]">
                        Hey 🎓 questions about applying?
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="rounded-xl rounded-br-sm bg-[#1D4ED8] px-2.5 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10.5px] text-white">
                        Is the MBA program GMAT-required?
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {phase >= 3 && (
                      <motion.div
                        key="cap"
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="flex items-start gap-1.5"
                      >
                        <div className="h-5 w-5 rounded-full bg-[#1D4ED8] flex items-center justify-center shrink-0">
                          <Sparkles className="h-2.5 w-2.5 text-white" />
                        </div>
                        <div className="rounded-xl rounded-tl-sm bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2.5 py-1.5 max-w-[80%]">
                          <p className="text-[9px] font-semibold text-[#1D4ED8] mb-0.5">
                            Captain · admissions FAQ
                          </p>
                          <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                            No GMAT required. Optional if your GPA is below 3.0.
                            Application deadline Jan 15.
                          </p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-600">
                              <Check className="h-2 w-2" strokeWidth={3} />
                              98% match
                            </span>
                            <span className="text-[8.5px] text-[#1D4ED8] font-semibold">
                              from Help Center
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-2.5 py-2 border-t border-slate-200 flex items-center gap-1.5">
                  <div className="flex-1 h-6 rounded-full bg-slate-100 border border-slate-200 px-2 flex items-center">
                    <span className="text-[9px] text-slate-400">Type a message…</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#1D4ED8] flex items-center justify-center shadow-sm">
                    <Send className="h-2.5 w-2.5 text-white" />
                  </div>
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
   Mini visuals for education cards
─────────────────────────────────────────────────────────────── */

function StudentChatVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 px-2 py-1.5">
        <BookOpen className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] font-mono text-[#0F2A4A] truncate flex-1">
          LMS · course catalog
        </span>
        <span className="text-[9px] font-semibold text-[#1D4ED8]">
          widget on
        </span>
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-md bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[10.5px] text-[#0F2A4A]">
            How do I drop a class?
          </p>
        </div>
      </div>
      <div className="flex items-start gap-1.5">
        <div className="h-4 w-4 rounded-full bg-[#1D4ED8] flex items-center justify-center shrink-0">
          <Sparkles className="h-2 w-2 text-white" />
        </div>
        <div className="rounded-lg rounded-tl-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2.5 py-1.5 max-w-[80%]">
          <p className="text-[10.5px] text-[#0F2A4A]">
            Visit My Account → Courses → Drop. Before week 6 = full refund.
          </p>
        </div>
      </div>
    </div>
  )
}

function ClassReminderVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 px-2.5 py-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Clock className="h-3 w-3 text-[#1D4ED8]" />
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
            SMS · 1h before
          </p>
        </div>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          Hi Jordan — ECON 501 starts in 1 hour. Zoom link: cypress.edu/z/4421
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-md bg-emerald-50/60 border border-emerald-200 px-2 py-1">
        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
        <span className="text-[10px] text-emerald-800 font-medium">
          82% attendance week-over-week
        </span>
      </div>
    </div>
  )
}

function AdmissionFollowupVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex items-center justify-between text-[10px] mb-0.5">
        <span className="font-semibold text-[#0F2A4A]">Application · MBA</span>
        <span className="font-semibold text-amber-700">3/5 done</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full rounded-full bg-[#1D4ED8]"
        />
      </div>
      <div className="space-y-1 pt-1">
        {[
          { label: "Resume uploaded", done: true },
          { label: "Transcripts", done: true },
          { label: "Personal essay", done: true },
          { label: "Recommendation letters", done: false },
          { label: "Application fee", done: false },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[9.5px]">
            <span
              className={`h-3 w-3 rounded-sm flex items-center justify-center shrink-0 ${
                s.done ? "bg-emerald-500" : "bg-slate-200"
              }`}
            >
              {s.done && (
                <Check className="h-2 w-2 text-white" strokeWidth={3} />
              )}
            </span>
            <span className={s.done ? "text-slate-500" : "text-[#0F2A4A] font-medium"}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MultiLangVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1">
        {[
          { code: "EN", active: true },
          { code: "ES" },
          { code: "FR" },
          { code: "ZH" },
          { code: "PT" },
        ].map((l) => (
          <span
            key={l.code}
            className={`text-[10px] font-medium px-2 py-0.5 rounded ${
              l.active
                ? "bg-[#1D4ED8] text-white"
                : "bg-slate-50 border border-slate-200 text-slate-500"
            }`}
          >
            {l.code}
          </span>
        ))}
      </div>
      <div className="space-y-1">
        {[
          { lang: "ES", text: "¿Cuánto cuesta la matrícula?", count: 124 },
          { lang: "ZH", text: "课程时长多久?", count: 86 },
          { lang: "FR", text: "Quand commence le programme?", count: 41 },
        ].map((q, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50/40 px-2 py-1"
          >
            <span className="text-[8.5px] font-mono font-semibold text-[#1D4ED8] bg-[#3B82F6]/10 px-1.5 py-0.5 rounded">
              {q.lang}
            </span>
            <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
              {q.text}
            </span>
            <span className="text-[9px] text-slate-500">
              <span className="font-semibold text-[#1D4ED8]">{q.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Use cases + FAQs
─────────────────────────────────────────────────────────────── */

const useCases: { Icon: React.ComponentType<{ className?: string }>; label: string; tag: string }[] = [
  { Icon: Clock, label: "24/7 admissions chat with Captain answering FAQ", tag: "24/7" },
  { Icon: Calendar, label: "Course enrollment confirmation via email + SMS", tag: "Enroll" },
  { Icon: BookOpen, label: "Tutoring session reminders via SMS", tag: "SMS" },
  { Icon: Languages, label: "Multi-language student support (key for international programs)", tag: "Lang" },
  { Icon: FileText, label: "Help Center for course materials and policies", tag: "Docs" },
]

const faqs: FAQItem[] = [
  {
    question: "FERPA compliance?",
    answer:
      "FloatChat is FERPA-aware but not certified. Standard data protection practices apply (encryption, access controls). For FERPA-required workflows, ask sales about our infrastructure controls.",
  },
  {
    question: "LMS integration?",
    answer:
      "Zapier, REST API, or webhooks (Lite+). No native LMS connector currently. Custom integration available on Pro/Enterprise.",
  },
  {
    question: "Pricing for non-profit schools?",
    answer: "30% non-profit discount on any paid plan.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function EducationPage() {
  useEffect(() => {
    document.title = "EdTech & Schools Support. Live Chat + AI | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Live chat for student inquiries, AI Captain on FAQs, SMS for class reminders. Free for small schools. From $9.99/mo for AI.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(96,165,250,0.35) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,200,255,0.4) 0%, transparent 70%)",
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10/80 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  Education · schools + EdTech
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Student inbox for{" "}
                  <span className="text-[#1D4ED8]">
                    schools and EdTech.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live chat on your student portal, Captain on FAQs, SMS for
                  class reminders. Free plan covers small schools.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Free for chat + email + WhatsApp",
                    "AI from $9.99",
                    "Multi-language Help Center on Growth",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#3B82F6]" />
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
                          "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
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
                    to="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to Sales
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  <span className="font-semibold text-[#1D4ED8]">
                    30% non-profit discount
                  </span>{" "}
                  on any paid plan.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <StudentPortalMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT SCHOOLS USE ───── */}
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
                <SectionEyebrow num="01" label="Student lifecycle" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What schools and EdTech use FloatChat for.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From admissions to ongoing student support, one inbox handles
                  it all.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: MessageSquare,
                  title: "Student chat on your portal.",
                  body:
                    "Drop the widget on your LMS, application page, or course catalog. Captain answers FAQs.",
                  bg: "bg-[#1D4ED8]",
                  visual: <StudentChatVisual />,
                },
                {
                  Icon: Clock,
                  title: "Class reminders via SMS.",
                  body:
                    "Auto-send 'your class starts in 1 hour' reminders. Especially useful for online cohort programs.",
                  bg: "bg-blue-600",
                  visual: <ClassReminderVisual />,
                },
                {
                  Icon: FileText,
                  title: "Admission form follow-up.",
                  body:
                    "Capture incomplete applications via the chat widget. Nudge via email or WhatsApp.",
                  bg: "bg-emerald-600",
                  visual: <AdmissionFollowupVisual />,
                },
                {
                  Icon: Globe,
                  title: "Multi-language help center.",
                  body:
                    "Publish your help docs in Spanish, French, Mandarin (Growth $69+).",
                  bg: "bg-amber-600",
                  visual: <MultiLangVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl ${f.bg} flex items-center justify-center shadow-md shrink-0`}
                      >
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

        {/* ───── STATS ───── */}
        <section className="relative py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#F5F7FF] to-white p-7 lg:p-9 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    value: "$0",
                    label: "For small schools on Free plan",
                    Icon: GraduationCap,
                  },
                  {
                    value: "30%",
                    label: "Non-profit discount on paid plans",
                    Icon: Sparkles,
                  },
                  {
                    value: "24/7",
                    label: "Admissions coverage with Captain",
                    Icon: Clock,
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="h-9 w-9 rounded-xl bg-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/40">
                      <s.Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D4ED8] tabular-nums">
                      {s.value}
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── USE CASES ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="Common flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Use cases.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The flows EdTech and school teams run on FloatChat —
                  admissions, enrollment, multilingual support, and reminders.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <ul className="space-y-1">
                    {useCases.map((uc, i) => (
                      <motion.li
                        key={uc.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-lg bg-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                          <uc.Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="flex-1 text-sm text-[#0F2A4A] leading-relaxed">
                          {uc.label}
                        </span>
                        <span className="inline-flex items-center text-[9.5px] font-semibold uppercase tracking-wider text-[#1D4ED8] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full px-2 py-0.5 shrink-0">
                          {uc.tag}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RECOMMENDED PLAN ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="Plan path" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Recommended plan.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Small schools start on Free. Online course providers and
                  bootcamps usually move to Starter ($19.99) for SMS class
                  reminders. Universities go Pro ($189) for SSO and audit logs.
                </p>
                <Link
                  to="/pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:gap-2 transition-all"
                >
                  See all plans
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Free",
                        price: "$0",
                        sub: "Small schools",
                        active: true,
                      },
                      {
                        label: "Starter",
                        price: "$19.99",
                        sub: "+ SMS for reminders",
                      },
                      {
                        label: "Pro",
                        price: "$189",
                        sub: "SSO · audit · universities",
                      },
                    ].map((p, i) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-4 ${
                          p.active
                            ? "border-[#3B82F6]/30 bg-gradient-to-br from-[#EAF2FF] to-white"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-[10px] uppercase tracking-wider font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-slate-400"
                          }`}
                        >
                          {p.label}
                        </p>
                        <p
                          className={`mt-1 text-2xl font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                          }`}
                        >
                          {p.price}
                        </p>
                        <p className="mt-1 text-[10.5px] text-slate-500 leading-snug">
                          {p.sub}
                        </p>
                        {p.active && (
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#1D4ED8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Start here
                          </span>
                        )}
                        {i < 2 && (
                          <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10/40 px-4 py-3 flex flex-wrap items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      <span className="font-semibold">
                        30% non-profit discount
                      </span>{" "}
                      applies to all paid plans.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Student inbox for your school"
          body="Live chat, Captain on FAQs, SMS reminders. Free for small schools."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
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
              description="FERPA, LMS, non-profit pricing — straight answers."
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
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #93C5FD 60%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(168,200,255,0.4), rgba(147,197,253,0.25) 50%, transparent 75%)",
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

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3B82F6]/100" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  24/7 admissions · 5 languages on Growth
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
                  Free for small schools
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Built for{" "}
                <span className="text-[#1D4ED8]">
                  every student question.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Captain on FAQs. SMS class reminders. Multi-language Help Center.
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
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] text-[15px] font-medium text-white hover:scale-[1.02] transition-all duration-300"
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

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
            >
              {[
                "Free for small schools",
                "Captain on FAQs",
                "SMS class reminders",
                "30% non-profit discount",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/100" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="education" />
      </main>
      <Footer />
    </>
  )
}
