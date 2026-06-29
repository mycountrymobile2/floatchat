"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  Users,
  Star,
  BookOpen,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Activity,
  Bug,
  Building2,
} from "lucide-react"
import {
  SiStripe,
  SiHubspot,
  SiSalesforce,
  SiLinear,
  SiNotion,
  SiSlack,
} from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Customer 360 panel with SaaS data
─────────────────────────────────────────────────────────────── */

function Customer360Mockup() {
  // Subtle pulse on churn alert to draw the eye
  const [pulse, setPulse] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1600)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating SSO chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Building2 className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          SSO + RBAC on Pro
        </span>
      </motion.div>

      {/* Floating savings chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <TrendingUp className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          89% vs Intercom + Zendesk
        </span>
      </motion.div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · customer 360
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Conversation thread — hidden on mobile */}
          <section className="hidden md:flex md:col-span-7 flex-col border-r border-slate-200">
            <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/80?img=33"
                alt="Mike Chen"
                loading="lazy"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#0F2A4A]">
                  Mike Chen · CEO @ Acme
                </p>
                <p className="text-[9.5px] text-slate-500">
                  Live Chat · Brooklyn, NY
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
                <AlertTriangle className="h-2.5 w-2.5" />
                Cancel intent
              </span>
            </div>

            <div className="flex-1 px-4 py-4 space-y-2 bg-slate-50/30 overflow-hidden">
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A]">
                    Thinking about cancelling — Linear sync broke twice this
                    week.
                  </p>
                  <p className="text-[8.5px] text-slate-400 mt-0.5">9:41 AM</p>
                </div>
              </div>

              {/* Captain alert callout */}
              <motion.div
                animate={{ opacity: pulse ? 1 : 0.9 }}
                transition={{ duration: 0.4 }}
                className="rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 flex items-start gap-2"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Sparkles className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider">
                    Captain alert · churn risk
                  </p>
                  <p className="text-[10.5px] text-amber-900 mt-0.5 leading-snug">
                    Mentioned "cancel" 3× this week. Routing to Sarah K.
                    (Customer Success).
                  </p>
                </div>
              </motion.div>

              <div className="flex justify-end">
                <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[10.5px] text-white">
                    Mike — got it. Sarah will jump in. Free month while we sort
                    Linear?
                  </p>
                </div>
              </div>

              {/* Bug → Linear */}
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 rounded flex items-center justify-center"
                    style={{ background: "#5E6AD2" }}
                  >
                    <SiLinear className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[10.5px] font-medium text-[#0F2A4A]">
                    Linked to <span className="font-mono">ACM-1284</span>
                  </span>
                  <span className="ml-auto text-[9px] text-slate-500">
                    P1 · in progress
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Reply to Mike…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                Send
              </button>
            </div>
          </section>

          {/* Customer 360 panel */}
          <aside className="col-span-12 md:col-span-5 flex flex-col bg-slate-50/40">
            <div className="px-3 py-2.5 border-b border-slate-200 bg-white">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Customer 360
              </p>
            </div>

            <div className="flex-1 px-3 py-3 space-y-3 overflow-hidden">
              {/* Profile summary */}
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/80?img=33"
                  alt="Mike Chen"
                  loading="lazy"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                />
                <div className="min-w-0">
                  <p className="text-[11.5px] font-semibold text-[#0F2A4A]">
                    Mike Chen
                  </p>
                  <p className="text-[9.5px] text-slate-500">
                    CEO @ Acme Co · 18mo customer
                  </p>
                </div>
              </div>

              {/* Stripe */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className="h-4 w-4 rounded flex items-center justify-center"
                    style={{ background: "#635BFF" }}
                  >
                    <SiStripe className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    Stripe
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[8.5px] text-slate-500">MRR</p>
                    <p className="text-[13px] font-semibold text-[#0F2A4A] tabular-nums">
                      $4,200
                    </p>
                  </div>
                  <div>
                    <p className="text-[8.5px] text-slate-500">Plan</p>
                    <p className="text-[11px] font-semibold text-[#1D4ED8]">
                      Growth · annual
                    </p>
                  </div>
                </div>
              </div>

              {/* HubSpot */}
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div
                    className="h-4 w-4 rounded flex items-center justify-center"
                    style={{ background: "#FF7A59" }}
                  >
                    <SiHubspot className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-slate-500">
                    HubSpot
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Lifecycle</span>
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    Customer · evangelist
                  </span>
                </div>
              </div>

              {/* Churn risk gauge */}
              <div className="rounded-lg border border-amber-200 bg-amber-50/40 p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9.5px] uppercase tracking-wider font-semibold text-amber-700">
                    Churn risk
                  </span>
                  <span className="text-[10px] font-semibold text-amber-700">
                    High · 0.78
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-amber-100 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                  />
                </div>
                <p className="mt-1.5 text-[9px] text-amber-800">
                  3× "cancel" mentions · 2 Linear bugs open
                </p>
              </div>

              {/* Activity */}
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Last 7 days
                </p>
                {[
                  { label: "Signed in", val: "today" },
                  { label: "Last reply", val: "2m ago" },
                  { label: "Open tickets", val: "2" },
                ].map((a) => (
                  <div
                    key={a.label}
                    className="flex items-center justify-between text-[10px] py-0.5"
                  >
                    <span className="text-slate-500">{a.label}</span>
                    <span className="font-semibold text-[#0F2A4A]">{a.val}</span>
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
   Mini visuals for SaaS use case cards
─────────────────────────────────────────────────────────────── */

function OnboardingVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Users className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          New signup flow
        </span>
      </div>
      <div className="space-y-1">
        {[
          { step: "1", label: "Sign up", done: true },
          { step: "2", label: "Connect Slack", done: true },
          { step: "3", label: "Invite team", done: false, current: true },
        ].map((s) => (
          <div
            key={s.step}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
          >
            <span
              className={`h-4 w-4 rounded-full flex items-center justify-center text-[8.5px] font-bold ${
                s.done
                  ? "bg-emerald-500 text-white"
                  : s.current
                  ? "bg-[#3B82F6] text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {s.done ? <Check className="h-2 w-2" strokeWidth={3} /> : s.step}
            </span>
            <span className="text-[10px] text-[#0F2A4A]">{s.label}</span>
            {s.current && (
              <span className="ml-auto text-[8.5px] font-medium text-[#1D4ED8]">
                nudge sent
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ChurnVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px] mb-0.5">
        <span className="font-semibold text-[#0F2A4A]">Tagged at-risk</span>
        <span className="font-semibold text-amber-700">12 this week</span>
      </div>
      <div className="flex -space-x-2">
        {[33, 12, 47, 44, 15].map((i) => (
          <img
            key={i}
            src={`https://i.pravatar.cc/40?img=${i}`}
            alt=""
            className="h-7 w-7 rounded-full ring-2 ring-white object-cover"
            loading="lazy"
          />
        ))}
        <span className="h-7 w-7 rounded-full ring-2 ring-white bg-amber-100 flex items-center justify-center text-[9px] font-semibold text-amber-700">
          +7
        </span>
      </div>
      <div className="rounded-md bg-amber-50/60 border border-amber-200 px-2 py-1.5 flex items-center gap-1.5">
        <AlertTriangle className="h-3 w-3 text-amber-600" />
        <span className="text-[10px] text-amber-900">
          Captain flagged 3 cancel-intent mentions
        </span>
      </div>
    </div>
  )
}

function ExpansionVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-[#0F2A4A]">MRR captured</span>
        <span className="font-mono text-emerald-700 font-semibold">
          +$48,200
        </span>
      </div>
      <div className="flex items-end justify-between gap-1 h-12">
        {[20, 30, 25, 40, 35, 55, 70].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
            className="flex-1 rounded-t bg-gradient-to-t from-emerald-400 to-emerald-600"
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <TrendingUp className="h-3 w-3 text-emerald-600" />
        <span className="text-[9.5px] text-slate-500">
          Captain routed upgrade-ready signals to CS
        </span>
      </div>
    </div>
  )
}

function BugTriageVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Bug className="h-3 w-3 text-rose-600" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          Linear sync timed out
        </span>
        <span className="text-[8.5px] text-slate-400">conv #4421</span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3" />
      </div>
      <div className="flex items-center gap-2 rounded-md border bg-white px-2 py-1.5"
        style={{ borderColor: "#5E6AD2" }}>
        <div
          className="h-5 w-5 rounded flex items-center justify-center"
          style={{ background: "#5E6AD2" }}
        >
          <SiLinear className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="font-mono text-[10px] font-semibold text-[#0F2A4A]">
          ACM-1284
        </span>
        <span className="ml-auto text-[9px] font-medium text-[#5E6AD2]">
          P1 · created
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Integrations list (SaaS-specific)
─────────────────────────────────────────────────────────────── */

type IntCmp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>
const saasIntegrations: { name: string; detail: string; Icon?: IntCmp; bg: string; initial: string }[] = [
  { name: "Stripe", detail: "subscription, MRR, churn", Icon: SiStripe, bg: "#635BFF", initial: "S" },
  { name: "HubSpot", detail: "deals, lifecycle stage", Icon: SiHubspot, bg: "#FF7A59", initial: "H" },
  { name: "Salesforce", detail: "Pro+", Icon: SiSalesforce, bg: "#00A1E0", initial: "S" },
  { name: "Segment", detail: "event sync", bg: "#52BD95", initial: "S" },
  { name: "Linear", detail: "bug tracking", Icon: SiLinear, bg: "#5E6AD2", initial: "L" },
  { name: "Notion", detail: "knowledge base", Icon: SiNotion, bg: "#0F0F0F", initial: "N" },
  { name: "Slack", detail: "notifications", Icon: SiSlack, bg: "#4A154B", initial: "S" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + content
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Do you support custom roles?",
    answer:
      "Yes, on Pro and Enterprise. Define permissions per role: agent, supervisor, billing-only, read-only.",
  },
  {
    question: "SSO / SAML?",
    answer: "Pro and Enterprise. Okta, Azure AD, Google Workspace.",
  },
  {
    question: "Is HIPAA available?",
    answer:
      "On Enterprise with signed BAA. Standard plans are HIPAA-aware but not BAA-eligible.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function SaaSPage() {
  useEffect(() => {
    document.title = "SaaS Customer Support. Pro Plan $189 | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Customer support for SaaS teams. SSO, custom roles, audit logs on Pro $189. AI Captain bundled. Replace Intercom + Zendesk for 80% less.",
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  SaaS / B2B · Pro plan $189
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Customer support for{" "}
                  <span className="text-[#1D4ED8]">
                    SaaS teams.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Onboarding, retention, expansion, and churn alerts in one
                  inbox. SSO and audit logs on Pro $189. Replace Intercom +
                  Zendesk.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "SOC 2 in progress",
                    "SSO + RBAC on Pro",
                    "Stripe + HubSpot inline",
                    "Audit logs",
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
                    to="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to Sales
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <Customer360Mockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── SaaS-specific use cases ───── */}
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
                <SectionEyebrow num="01" label="Lifecycle" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  SaaS-specific use cases.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Built for the full customer lifecycle: activation, retention,
                  and expansion.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Users,
                  title: "Onboarding nudges.",
                  body:
                    "Auto-trigger live chat when a user lands on the dashboard for the first time. Guide them through setup.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  stat: { value: "85%", label: "activation week 1" },
                  visual: <OnboardingVisual />,
                },
                {
                  Icon: AlertTriangle,
                  title: "Churn risk alerts.",
                  body:
                    "Stripe integration shows MRR and subscription status inline. Captain flags conversations with cancel intent.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-orange-500/40",
                  stat: { value: "12", label: "at-risk tagged this week" },
                  visual: <ChurnVisual />,
                },
                {
                  Icon: TrendingUp,
                  title: "Expansion plays.",
                  body:
                    "Captain detects upgrade-ready signals and routes to your customer success team.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-emerald-500/40",
                  stat: { value: "$48k", label: "MRR captured" },
                  visual: <ExpansionVisual />,
                },
                {
                  Icon: Bug,
                  title: "Bug triage.",
                  body:
                    "Linear integration. Convert a conversation to a Linear issue with one click.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-violet-500/40",
                  stat: { value: "2.3s", label: "avg time to ticket" },
                  visual: <BugTriageVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
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
                    </div>

                    {/* Stat row */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-[#1D4ED8] tabular-nums">
                        {f.stat.value}
                      </p>
                      <p className="text-[11px] text-slate-500">{f.stat.label}</p>
                    </div>

                    <div className="mt-4 flex-1 flex items-end">
                      <div className="w-full">{f.visual}</div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── SaaS integrations strip ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="Stack" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  SaaS integrations.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Connect the tools your team already uses.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {saasIntegrations.map((it) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: it.bg }}
                    >
                      {it.Icon ? (
                        <it.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : (
                        it.initial
                      )}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                        {it.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {it.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── CASE STUDY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Case study" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How a B2B SaaS at $1.5M ARR{" "}
                  <span className="text-[#1D4ED8]">
                    uses FloatChat.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Mike runs a Texas-based dev tools SaaS, 18 people.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-4">
                <div className="h-full rounded-3xl border border-rose-200 bg-rose-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                    Before FloatChat
                  </p>
                  <ul className="space-y-2 text-sm text-rose-900/80 leading-relaxed">
                    {[
                      "Intercom · $290/mo",
                      "Zendesk · $1,150/mo",
                      "Aircall · $300/mo",
                      "10 seats across 3 tools",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl bg-white border border-rose-200 px-4 py-3 inline-flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-rose-700 font-semibold">
                      Monthly
                    </span>
                    <span className="text-lg font-semibold text-rose-700">
                      $1,740
                    </span>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                    After FloatChat
                  </p>
                  <ul className="space-y-2 text-sm text-emerald-900/85 leading-relaxed">
                    {[
                      "FloatChat Pro · 25 seats",
                      "Voice + SMS bundled",
                      "Captain handles 60% of tier-1 questions",
                      "Stripe + HubSpot inline · Linear bug-link",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={3} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-3 flex-wrap">
                    <div className="rounded-xl bg-white border border-emerald-200 px-4 py-3 inline-flex items-center gap-2">
                      <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold">
                        Monthly
                      </span>
                      <span className="text-lg font-semibold text-emerald-700">
                        $189
                      </span>
                    </div>
                    <div className="rounded-xl bg-emerald-500 text-white px-4 py-3 inline-flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        Saved $1,551/mo
                      </span>
                    </div>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.3} className="lg:col-span-3">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Savings
                    </p>
                    <p className="mt-3 text-5xl lg:text-6xl font-medium tracking-tight">
                      89<span className="text-2xl lg:text-3xl text-white/70">%</span>
                    </p>
                    <p className="mt-3 text-[12.5px] text-white/80 leading-relaxed">
                      vs Intercom + Zendesk for the same setup.
                    </p>
                    <div className="mt-5 flex items-center gap-2 pt-4 border-t border-white/10">
                      <img
                        src="https://i.pravatar.cc/60?img=33"
                        alt="Mike Chen"
                        loading="lazy"
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-white/40"
                      />
                      <div>
                        <p className="text-[11px] font-semibold">Mike Chen</p>
                        <p className="text-[9.5px] text-white/60">
                          Acme · 18 people · TX
                        </p>
                      </div>
                    </div>
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
                  Most SaaS teams pick Pro ($189) for SSO, custom roles, and
                  audit logs. Mid-market teams under 10 seats start on Growth
                  ($69).
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
                  <div className="grid grid-cols-2 gap-3 relative">
                    {[
                      {
                        label: "Growth",
                        price: "$69",
                        sub: "Under 10 seats",
                      },
                      {
                        label: "Pro",
                        price: "$189",
                        sub: "SSO · RBAC · audit logs",
                        active: true,
                      },
                    ].map((p) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-5 ${
                          p.active
                            ? "border-[#3B82F6]/40 bg-gradient-to-br from-[#EAF2FF] to-white"
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
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#3B82F6] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Most pick
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#3B82F6]/15 bg-[#EAF2FF]/40 px-4 py-3 flex flex-wrap items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      <span className="font-semibold">
                        Captain AI bundled
                      </span>{" "}
                      on Pro — no per-resolution fees.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Replace Intercom + Zendesk for 89% less"
          body="Pro at $189/mo. Captain bundled. Voice and SMS native."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Talk to Sales"
          secondaryHref="/contact"
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
              description="Roles, SSO, HIPAA — straight answers."
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
                  Replace Intercom + Zendesk · 89% less
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
                  Pro from $189
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
                  SaaS teams.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Captain bundled. Voice and SMS native. SSO and audit logs on Pro.
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
                "SOC 2 in progress",
                "SSO + RBAC on Pro",
                "Stripe + HubSpot inline",
                "Audit logs",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="saas" />
      </main>
      <Footer />
    </>
  )
}
