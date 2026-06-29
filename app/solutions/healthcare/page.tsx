"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  X,
  Phone,
  MessageSquare,
  Calendar,
  Globe,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Shield,
  Lock,
  FileText,
  Database,
  Webhook,
  Heart,
  PhoneIncoming,
  AlertTriangle,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Patient communication panel + HIPAA badges
─────────────────────────────────────────────────────────────── */

function PatientCommsMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(900)
        if (cancelled) return
        setPhase(1) // SMS reminder sent
        await wait(1700)
        if (cancelled) return
        setPhase(2) // patient confirms
        await wait(2000)
        if (cancelled) return
        setPhase(3) // call routing
        await wait(2400)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), rgba(96,165,250,0.3), transparent 70%)",
        }}
      />

      {/* Floating HIPAA chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#3B82F6]/100 flex items-center justify-center">
          <Shield className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          HIPAA · <span className="text-[#3B82F6]">BAA on Enterprise</span>
        </span>
      </motion.div>

      {/* Floating US data chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Database className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          DigitalOcean NYC3
        </span>
      </motion.div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · patient comms
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#1D4ED8]">
            <Lock className="h-2 w-2" /> Encrypted
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Patient profile rail */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/40 flex-col">
            <div className="px-3 py-3 border-b border-slate-200 bg-white">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Patient
              </p>
              <div className="mt-2 flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/80?img=20"
                  alt="Emily Park"
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />
                <div className="min-w-0">
                  <p className="text-[11.5px] font-semibold text-[#0F2A4A]">
                    Emily Park
                  </p>
                  <p className="text-[9.5px] text-slate-500">
                    Patient · MRN •••• 4421
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 px-3 py-3 space-y-3">
              {/* Appointment */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Calendar className="h-3 w-3 text-[#3B82F6]" />
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    Next visit
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-[#0F2A4A]">
                  Tomorrow · 9:00 AM
                </p>
                <p className="text-[9.5px] text-slate-500 mt-0.5">
                  Dr. Sarah K. · Brooklyn clinic
                </p>
              </div>

              {/* PHI access */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Lock className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    PHI access
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[9.5px]">
                    <span className="text-slate-500">Insurance</span>
                    <span className="font-mono text-[#0F2A4A]">•••• 8021</span>
                  </div>
                  <div className="flex items-center justify-between text-[9.5px]">
                    <span className="text-slate-500">DOB</span>
                    <span className="font-mono text-[#0F2A4A]">•••• ••••</span>
                  </div>
                </div>
              </div>

              {/* Audit log indicator */}
              <div className="rounded-lg border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <FileText className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#1D4ED8]">
                    Audit log
                  </span>
                </div>
                <p className="text-[10px] text-[#0F2A4A] leading-snug">
                  All PHI accesses recorded · 90-day retention
                </p>
              </div>
            </div>
          </aside>

          {/* Conversation thread */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-violet-100 flex items-center justify-center">
                <MessageSquare className="h-3.5 w-3.5 text-violet-700" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#0F2A4A]">SMS thread</p>
                <p className="text-[9.5px] text-slate-500">
                  +1 (415) 555-0142 · Emily Park
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-semibold text-[#1D4ED8]">
                <span className="h-1 w-1 rounded-full bg-[#3B82F6]/100 animate-pulse" />
                Live
              </span>
            </div>

            <div className="flex-1 px-4 py-3 bg-slate-50/30 overflow-hidden flex flex-col justify-end gap-2">
              <AnimatePresence initial={false}>
                {phase >= 1 && (
                  <motion.div
                    key="reminder"
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="flex justify-start"
                  >
                    <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[80%] shadow-sm">
                      <div className="flex items-center gap-1 mb-0.5">
                        <Sparkles className="h-2.5 w-2.5 text-violet-600" />
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-violet-700">
                          Auto · reminder
                        </span>
                      </div>
                      <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                        Hi Emily — reminder: appointment tomorrow at 9:00 AM with
                        Dr. Sarah K. Reply C to confirm or R to reschedule.
                      </p>
                      <p className="text-[8.5px] text-slate-400 mt-0.5">
                        9:00 AM · today
                      </p>
                    </div>
                  </motion.div>
                )}

                {phase >= 2 && (
                  <motion.div
                    key="confirm"
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="flex justify-end"
                  >
                    <div className="rounded-xl rounded-br-sm bg-[#3B82F6] text-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10.5px]">C</p>
                    </div>
                  </motion.div>
                )}

                {phase >= 3 && (
                  <motion.div
                    key="call"
                    layout
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="rounded-xl border border-[#3B82F6]/30 bg-[#EAF2FF] px-3 py-2.5 flex items-center gap-2"
                  >
                    <div className="h-7 w-7 rounded-full bg-[#3B82F6] flex items-center justify-center shrink-0">
                      <PhoneIncoming className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10.5px] font-semibold text-[#0F2A4A]">
                        Telehealth call routed
                      </p>
                      <p className="text-[9.5px] text-slate-500">
                        Click-to-call · Dr. Sarah K. ringing now
                      </p>
                    </div>
                    <span className="text-[9.5px] font-medium text-[#1D4ED8]">
                      00:04
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Compliance footer */}
            <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50/40 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Lock className="h-3 w-3 text-[#3B82F6]" />
                <span>Encrypted · TLS 1.3 · AES-256</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[9.5px] font-semibold text-[#0F2A4A]">
                <FileText className="h-2.5 w-2.5 text-[#3B82F6]" />
                Logged to audit trail
              </span>
            </div>
          </section>
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
   Mini visuals for healthcare cards
─────────────────────────────────────────────────────────────── */

function AppointmentSmsVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-md bg-violet-50 border border-violet-200 px-2.5 py-1.5 max-w-[85%]">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-violet-700 mb-0.5">
            Auto · 24h before
          </p>
          <p className="text-[10.5px] text-[#0F2A4A]">
            Hi Emily — tomorrow 9:00 AM with Dr. Sarah K.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-1.5">
        <span className="text-[9px] font-mono text-slate-400">
          STOP · HELP handled
        </span>
        <span className="text-[9px] text-[#3B82F6] font-semibold">
          $0.005
        </span>
      </div>
    </div>
  )
}

function RefillVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Webhook className="h-3 w-3 text-amber-600" />
        <span className="text-[9.5px] font-mono text-[#0F2A4A] truncate flex-1">
          ehr.webhook.prescription.refill
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3" />
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-md bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2.5 py-1.5 max-w-[85%]">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1D4ED8] mb-0.5">
            SMS · sent
          </p>
          <p className="text-[10.5px] text-[#0F2A4A]">
            Your refill is ready for pickup at Walgreens · 4th Ave
          </p>
        </div>
      </div>
    </div>
  )
}

function IntakeFormVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <p className="text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
        Pre-chat intake
      </p>
      {[
        { label: "Name", val: "Emily Park", done: true },
        { label: "Insurance", val: "•••• 8021", done: true },
        { label: "Reason for visit", val: "Annual checkup", done: true },
        { label: "Pharmacy", val: "Walgreens · 4th Ave", done: false },
      ].map((f, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 rounded-md border px-2 py-1 ${
            f.done
              ? "border-[#3B82F6]/20 bg-[#3B82F6]/10/40"
              : "border-slate-200 bg-slate-50/40"
          }`}
        >
          <span
            className={`h-3 w-3 rounded-sm flex items-center justify-center ${
              f.done ? "bg-[#3B82F6]/100" : "bg-slate-300"
            }`}
          >
            {f.done && <Check className="h-2 w-2 text-white" strokeWidth={3} />}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500">
            {f.label}
          </span>
          <span className="ml-auto text-[10px] font-medium text-[#0F2A4A] truncate">
            {f.val}
          </span>
        </div>
      ))}
    </div>
  )
}

function CallRoutingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <img
          src="https://i.pravatar.cc/40?img=20"
          alt="Emily"
          loading="lazy"
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="text-[10px] text-[#0F2A4A] flex-1">
          Emily Park · patient profile
        </span>
        <button className="h-5 w-5 rounded-full bg-[#3B82F6]/100 flex items-center justify-center shadow-sm">
          <Phone className="h-2.5 w-2.5 text-white" />
        </button>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3" />
      </div>
      <div className="rounded-md bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=32"
            alt="Dr. Sarah K."
            loading="lazy"
            className="h-6 w-6 rounded-full object-cover ring-1 ring-white/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] font-semibold">Dr. Sarah K.</p>
            <p className="text-[9px] text-white/70">On-call · ringing</p>
          </div>
          <PhoneIncoming className="h-3.5 w-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   HIPAA compliance dashboard items
─────────────────────────────────────────────────────────────── */

type IconType = React.ComponentType<{ className?: string }>
const hipaaItems: {
  Icon: IconType
  title: string
  detail: string
  badge?: string
}[] = [
  { Icon: FileText, title: "Signed BAA", detail: "Enterprise only", badge: "Enterprise" },
  { Icon: Lock, title: "PHI encryption", detail: "At rest + in transit (AES-256 · TLS 1.3)" },
  { Icon: Database, title: "US data residency", detail: "DigitalOcean NYC3 (New York)" },
  { Icon: FileText, title: "Audit logs", detail: "All PHI access recorded" },
  { Icon: Calendar, title: "Custom retention", detail: "Configurable policies per record" },
  { Icon: Shield, title: "IP allowlist + SSO + 2FA", detail: "Network and identity controls" },
  { Icon: AlertTriangle, title: "Annual HIPAA risk assessment", detail: "Reviewed every 12 months" },
]

const notSupported = [
  "Voice call recording (no native recording)",
  "AI voice bot (no transcription of calls)",
  "Custom domain on Help Center",
  "HIPAA on plans below Enterprise",
]

/* ─────────────────────────────────────────────────────────────
   FAQs
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can I sign the BAA on Pro instead of Enterprise?",
    answer:
      "No. BAA is Enterprise-only because it requires custom infrastructure isolation and audit configuration.",
  },
  {
    question: "Do you store PHI?",
    answer:
      "Only on Enterprise with signed BAA. Below Enterprise, customers should not transmit PHI through FloatChat.",
  },
  {
    question: "HITRUST certification?",
    answer: "Roadmap. Currently SOC 2 Type II in progress.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function HealthcarePage() {
  useEffect(() => {
    document.title = "HIPAA-Compliant Patient Communication | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Live chat, voice, and SMS for clinics and healthcare providers. HIPAA on Enterprise with signed BAA. US data residency. From $599/mo.",
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Healthcare · HIPAA on Enterprise
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Patient communication.{" "}
                  <span className="text-[#1D4ED8]">
                    HIPAA option
                  </span>{" "}
                  on Enterprise.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live chat, voice, SMS, and email for clinics, telehealth, and
                  healthcare providers. Signed BAA on the Enterprise plan.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "HIPAA on Enterprise",
                    "US data residency",
                    "Audit logs",
                    "Encryption at rest",
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
                          "radial-gradient(circle, #10B981 0%, transparent 70%)",
                      }}
                    />
                    <Link
                      to="/contact"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Talk to Sales
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </Link>
                  </div>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    See pricing
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 inline-flex items-start gap-1.5 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                >
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    <span className="font-semibold">BAA required for PHI.</span>{" "}
                    Enterprise plan only.
                  </span>
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <PatientCommsMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT HEALTHCARE TEAMS USE ───── */}
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
                <SectionEyebrow num="01" label="Clinical workflows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What healthcare teams use FloatChat for.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From appointment reminders to telehealth routing, built for
                  clinical workflows.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Calendar,
                  title: "Appointment reminders via SMS.",
                  body:
                    "Auto-send 24 hours before. STOP/HELP handling included.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-violet-500/40",
                  visual: <AppointmentSmsVisual />,
                },
                {
                  Icon: Webhook,
                  title: "Prescription refill notifications.",
                  body:
                    "Trigger from your EHR via webhook. Patient gets SMS or WhatsApp.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-orange-500/40",
                  visual: <RefillVisual />,
                },
                {
                  Icon: Globe,
                  title: "Patient intake forms via chat.",
                  body:
                    "Pre-chat form on widget collects insurance, reason for visit, contact info.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <IntakeFormVisual />,
                },
                {
                  Icon: Phone,
                  title: "Telehealth call routing.",
                  body:
                    "Click-to-call from patient profile. Voice rings the on-call provider.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <CallRoutingVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-md ${f.shadow} shrink-0`}
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

        {/* ───── HIPAA SCOPE — compliance dashboard ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="Compliance" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  HIPAA{" "}
                  <span className="text-[#1D4ED8]">
                    scope.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  What's included in the Enterprise HIPAA configuration.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8">
                <div className="grid sm:grid-cols-2 gap-3">
                  {hipaaItems.map((it, i) => (
                    <motion.div
                      key={it.title}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#3B82F6]/20 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-lg bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center shrink-0">
                          <it.Icon className="h-4 w-4 text-[#3B82F6]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-[#0F2A4A]">
                              {it.title}
                            </p>
                            {it.badge && (
                              <span className="inline-flex items-center rounded-full bg-[#3B82F6]/10 text-[#1D4ED8] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                                {it.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                            {it.detail}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(37,99,235,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <Shield className="h-6 w-6 mb-3 text-blue-200" />
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-blue-100/80">
                      Plan
                    </p>
                    <p className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                      Custom Enterprise
                    </p>
                    <p className="mt-3 text-sm text-blue-50/85 leading-relaxed">
                      Required for signed BAA. Includes infrastructure
                      isolation, custom retention, and dedicated security
                      review.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <FileText className="h-3 w-3" />
                      Signed BAA included
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── NOT SUPPORTED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="The honest list" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What's{" "}
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    NOT
                  </span>{" "}
                  supported.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Be aware of these limitations before evaluating FloatChat for
                  clinical workflows. If your workflow requires call recording
                  for compliance, pair with a HIPAA-compliant PBX (e.g.,
                  RingCentral Healthcare).
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0F2A4A] via-[#1E1B4B] to-[#1F2937] p-7 lg:p-9 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(15,42,74,0.5)]">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 bg-red-500" />
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20 bg-rose-400" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-red-300 mb-5">
                      Not included
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {notSupported.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-0.5 h-5 w-5 rounded-full bg-red-500/15 border border-red-400/40 flex items-center justify-center shrink-0">
                            <X className="h-3 w-3 text-red-300" strokeWidth={3} />
                          </span>
                          <span className="text-sm text-white/85 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                <SectionEyebrow num="04" label="Plan path" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Recommended plan.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Healthcare workflows requiring HIPAA require Enterprise
                  ($599/month) with signed BAA. Lower-volume clinics that don't
                  transmit PHI can use Growth ($69) with caution.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="grid grid-cols-2 gap-3 relative">
                    {[
                      {
                        label: "Growth",
                        price: "$69",
                        sub: "No PHI · low volume",
                        warn: true,
                      },
                      {
                        label: "Enterprise",
                        price: "$599+",
                        sub: "Signed BAA · custom",
                        active: true,
                      },
                    ].map((p) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-5 ${
                          p.active
                            ? "border-[#3B82F6]/30 bg-gradient-to-br from-[#EAF2FF] to-white"
                            : p.warn
                            ? "border-amber-200 bg-amber-50/40"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-[10px] uppercase tracking-wider font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-amber-700"
                          }`}
                        >
                          {p.label}
                        </p>
                        <p
                          className={`mt-1 text-3xl font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                          }`}
                        >
                          {p.price}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                          {p.sub}
                        </p>
                        {p.active && (
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#1D4ED8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Required for BAA
                          </span>
                        )}
                        {p.warn && (
                          <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            <AlertTriangle className="h-2.5 w-2.5" />
                            With caution
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10/40 px-4 py-3 flex flex-wrap items-center gap-2.5">
                    <Shield className="h-4 w-4 text-[#3B82F6]" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      <span className="font-semibold">
                        Signed BAA + custom infrastructure
                      </span>{" "}
                      included on Enterprise.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Patient communication, with the BAA you need"
          body="Enterprise from $599 with signed BAA. Encryption, audit logs, US residency."
          primaryLabel="Talk to Sales"
          primaryHref="/contact"
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
              description="BAA, PHI, HITRUST — straight answers."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.55) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #93C5FD 60%, #C4B5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(168,200,255,0.4), rgba(147,197,253,0.3) 50%, transparent 75%)",
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
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3B82F6]/100" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Signed BAA · US data residency · Audit logs
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
                  Enterprise from $599
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
                  clinical workflows.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Signed BAA on Enterprise. Encryption, audit logs, US residency.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Shield className="h-4 w-4" />
                  Talk to Sales for BAA
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  See pricing
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
                "HIPAA on Enterprise",
                "Signed BAA",
                "AES-256 · TLS 1.3",
                "DigitalOcean NYC3",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/100" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="healthcare" />
      </main>
      <Footer />
    </>
  )
}
