"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Landmark,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Lock,
  KeyRound,
  FileClock,
  UserCheck,
  BellRing,
  Megaphone,
  ScrollText,
  Fingerprint,
  Wallet,
  CreditCard,
  Building2,
  GitBranch,
  Radio,
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
  title: "Agentic AI for Fintech | FloatChat",
  description:
    "Support onboarding, transactions, and alerts for fintech with secure agentic AI and omnichannel broadcasting, backed by audit logs and access controls.",
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
   HERO VISUAL — a secure fintech surface.
   Left: a live transaction/onboarding alert message.
   Right: a security panel with audit-log rows, access-control
   toggles, and encryption / consent badges. Emphasizes secure +
   compliant, distinct from consumer-chat mockups.
─────────────────────────────────────────────────────────────── */

type AlertPhase = "onboarding" | "transaction" | "fraud"

const alertScript: Record<
  AlertPhase,
  {
    tag: string
    Icon: typeof BellRing
    who: string
    ref: string
    body: string
    action: string
    stamp: string
  }
> = {
  onboarding: {
    tag: "Onboarding",
    Icon: UserCheck,
    who: "New account · KYC step 3 of 4",
    ref: "#KYC-40182",
    body: "Your identity check passed. One last step — confirm your address to activate transfers.",
    action: "Verified · SSN masked · ••• 4417",
    stamp: "09:41",
  },
  transaction: {
    tag: "Transaction",
    Icon: CreditCard,
    who: "Payment confirmation",
    ref: "#TX-88291",
    body: "We received your $2,400.00 transfer to Acct ••7712. It clears by 5:00 PM today.",
    action: "Signed receipt sent · encrypted",
    stamp: "10:03",
  },
  fraud: {
    tag: "Fraud alert",
    Icon: ShieldCheck,
    who: "Security notification",
    ref: "#SEC-51044",
    body: "Unusual login from a new device in Lisbon. Was this you? Reply 1 to approve, 2 to freeze the card.",
    action: "Awaiting customer response · card held",
    stamp: "10:22",
  },
}

function SecureFintechVisual() {
  const [phase, setPhase] = useState<AlertPhase>("onboarding")

  useEffect(() => {
    const order: AlertPhase[] = ["onboarding", "transaction", "fraud"]
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % order.length
      setPhase(order[i])
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const msg = alertScript[phase]

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

      {/* Floating encryption badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Lock className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          AES-256 · encrypted in transit
        </span>
      </motion.div>

      {/* Floating consent badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Consent on file · GDPR
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
            app.floatchat.com · secure
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <ShieldCheck className="h-2.5 w-2.5" />
            SOC 2
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Alert / message pane */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white border-b md:border-b-0 md:border-r border-slate-200">
            {/* Customer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                  <Landmark className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    NorthPay Wallet
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Verified sender · WhatsApp + SMS
                  </p>
                </div>
              </div>
              <div className="h-4 w-4 rounded-full bg-[#25D366] flex items-center justify-center">
                <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 bg-slate-50/30 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2"
                >
                  {/* Alert type chip */}
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                      <msg.Icon className="h-2.5 w-2.5" />
                      {msg.tag}
                    </span>
                    <span className="ml-auto font-mono text-[8.5px] text-slate-400">
                      {msg.ref}
                    </span>
                  </div>

                  {/* Context line */}
                  <p className="text-[9px] text-slate-500">{msg.who}</p>

                  {/* Agent message bubble */}
                  <div className="flex items-start gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[86%] shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        {msg.body}
                      </p>
                      <p className="text-[8px] text-slate-400 mt-0.5">
                        {msg.stamp} · agent
                      </p>
                    </div>
                  </div>

                  {/* Secured action chip */}
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2 ml-[26px]">
                    <div className="flex items-center gap-1.5">
                      <Lock className="h-3 w-3 text-emerald-700" />
                      <span className="text-[9.5px] font-semibold text-emerald-800">
                        {msg.action}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Guardrail footer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <Fingerprint className="h-3.5 w-3.5 text-[#1D4ED8]" />
              <span className="text-[10px] text-slate-500">
                Guardrails on · never exposes full PAN or balance
              </span>
            </div>
          </section>

          {/* Security panel */}
          <aside className="col-span-12 md:col-span-5 bg-slate-50/50 flex flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1D4ED8]" />
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Security panel
              </p>
            </div>

            {/* Audit log rows */}
            <div className="px-3 py-3">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Audit log
              </p>
              <div className="space-y-1.5">
                {[
                  { who: "agent", act: "Sent onboarding alert", t: "09:41" },
                  { who: "system", act: "Masked PII fields", t: "09:41" },
                  { who: "P. Nair", act: "Approved refund", t: "10:07" },
                ].map((row) => (
                  <div
                    key={row.act}
                    className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1"
                  >
                    <FileClock className="h-3 w-3 text-slate-400 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[9.5px] font-medium text-[#0F2A4A] truncate">
                        {row.act}
                      </p>
                      <p className="text-[8px] text-slate-400 truncate">
                        {row.who}
                      </p>
                    </div>
                    <span className="font-mono text-[8px] text-slate-400 shrink-0">
                      {row.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access controls */}
            <div className="px-3 py-2 border-t border-slate-200">
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                Access controls
              </p>
              <div className="space-y-1.5">
                {[
                  { label: "View balances", on: false, role: "Agent role" },
                  { label: "Issue refunds", on: true, role: "Supervisor" },
                  { label: "Export PII", on: false, role: "Admin only" },
                ].map((tog) => (
                  <div
                    key={tog.label}
                    className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1"
                  >
                    <KeyRound className="h-3 w-3 text-slate-400 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[9.5px] font-medium text-[#0F2A4A] truncate">
                        {tog.label}
                      </p>
                      <p className="text-[8px] text-slate-400 truncate">
                        {tog.role}
                      </p>
                    </div>
                    <span
                      className={`relative h-3.5 w-6 rounded-full transition-colors shrink-0 ${
                        tog.on ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white transition-all ${
                          tog.on ? "left-3" : "left-0.5"
                        }`}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance badges */}
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { Icon: Lock, label: "Encryption" },
                  { Icon: ScrollText, label: "GDPR" },
                  { Icon: UserCheck, label: "Consent" },
                  { Icon: Fingerprint, label: "SSO" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1 rounded-full border border-[#3B82F6]/20 bg-white px-2 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]"
                  >
                    <b.Icon className="h-2.5 w-2.5" />
                    {b.label}
                  </span>
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

function OnboardingVisual() {
  const steps = [
    { label: "Identity verified", done: true },
    { label: "Address confirmed", done: true },
    { label: "Enable transfers", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <UserCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Guided KYC · #KYC-40182
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">3 of 4</span>
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
              in progress
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function AlertsVisual() {
  const rows = [
    { Icon: CreditCard, label: "Payment cleared", note: "$2,400.00", ok: true },
    { Icon: ShieldCheck, label: "New-device login", note: "review", ok: false },
    { Icon: Wallet, label: "Low balance", note: "$18.20", ok: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Proactive alerts
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <BellRing className="h-2.5 w-2.5" /> SMS + WhatsApp
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <r.Icon className="h-3.5 w-3.5 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] font-medium text-[#0F2A4A]">
            {r.label}
          </span>
          <span className="ml-auto text-[9px] text-slate-500 truncate">
            {r.note}
          </span>
          {r.ok ? (
            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function AuditVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <FileClock className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Every action logged
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">immutable</span>
      </div>
      {[
        { who: "agent", act: "Sent fraud alert", t: "10:22" },
        { who: "system", act: "Masked card ••4417", t: "10:22" },
        { who: "Admin", act: "Granted refund role", t: "10:31" },
      ].map((row) => (
        <div
          key={row.act}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-4 w-4 rounded bg-[#EAF2FF] flex items-center justify-center shrink-0">
            <KeyRound className="h-2.5 w-2.5 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
            {row.act}
          </span>
          <span className="text-[8.5px] text-slate-400">{row.who}</span>
          <span className="font-mono text-[8px] text-slate-400">{row.t}</span>
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  const chans = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", react: true },
    { Icon: null, bg: "#0F2A4A", label: "SMS", react: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Compliant broadcast
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
          <Check className="h-2.5 w-2.5" strokeWidth={3} /> opt-in only
        </span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <p className="text-[9.5px] text-[#0F2A4A] leading-snug">
          &ldquo;Rate change effective Aug 1. Reply STOP to opt out.&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-2">
        {chans.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2 py-1 text-[9px] font-medium text-[#0F2A4A]"
          >
            <span
              className="h-4 w-4 rounded flex items-center justify-center"
              style={{ background: c.bg }}
            >
              {c.react ? (
                <SiWhatsapp style={{ color: "#fff", width: 9, height: 9 }} />
              ) : (
                <Radio className="h-2.5 w-2.5 text-white" />
              )}
            </span>
            {c.label}
          </span>
        ))}
        <span className="ml-auto text-[8.5px] text-slate-400">
          12,480 recipients
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data
─────────────────────────────────────────────────────────────── */

const results = [
  { Icon: UserCheck, value: "KYC", label: "onboarding help, guided step by step" },
  { Icon: CreditCard, value: "24/7", label: "account & transaction support" },
  { Icon: ShieldCheck, value: "Instant", label: "fraud & payment alerts" },
  { Icon: FileClock, value: "Full", label: "audit logs & access controls" },
]

const features = [
  {
    Icon: UserCheck,
    title: "Onboarding & KYC.",
    body:
      "Walk new users through account opening and verification steps in plain language — collecting only what's needed, masking sensitive fields, and handing edge cases to a human with full context.",
    visual: <OnboardingVisual />,
  },
  {
    Icon: BellRing,
    title: "Transaction alerts.",
    body:
      "Send payment confirmations, balance notices, and fraud alerts the moment they happen — over SMS and WhatsApp — with two-way replies so a customer can approve or freeze in one tap.",
    visual: <AlertsVisual />,
  },
  {
    Icon: FileClock,
    title: "Audit logs & access controls.",
    body:
      "Every message, action, and approval is logged immutably. Role-based access and SSO decide who can view balances, issue refunds, or export data — so control lives in one place, not a spreadsheet.",
    visual: <AuditVisual />,
  },
  {
    Icon: Megaphone,
    title: "Compliant broadcasting.",
    body:
      "Announce rate changes, outages, or new features to opted-in customers across SMS and WhatsApp — with consent honored, opt-outs respected, and every send captured in the audit trail.",
    visual: <BroadcastVisual />,
  },
]

const howItWorks = [
  {
    Icon: Lock,
    title: "Encrypted end to end",
    body: "Every conversation is encrypted in transit and at rest — customer data never travels in the clear.",
  },
  {
    Icon: Fingerprint,
    title: "SSO & role-based access",
    body: "Single sign-on plus granular roles decide who can see balances, refund, or export — enforced on every action.",
  },
  {
    Icon: FileClock,
    title: "Immutable audit trail",
    body: "Onboarding, alerts, refunds, and admin changes are all logged and exportable for compliance reviews.",
  },
  {
    Icon: UserCheck,
    title: "Consent & data minimization",
    body: "GDPR- and CCPA-aligned. Agents collect only what's required, mask PII, and honor opt-outs automatically.",
  },
]

const whyFloatChat = [
  {
    Icon: ShieldCheck,
    title: "One platform, one access model.",
    body:
      "Security, agentic AI, channels, and broadcasting live together — instead of four vendors, four policies, and four places a breach could start.",
  },
  {
    Icon: Sparkles,
    title: "Guardrails you can prove.",
    body:
      "The agent works inside limits you define and logs what it did. When a regulator or customer asks, the answer is a timestamped trail, not a guess.",
  },
  {
    Icon: Building2,
    title: "Built for regulated teams.",
    body:
      "Banks, lenders, wallets, and payment apps run sensitive volume on it — fast answers for customers, human review where it matters.",
  },
]

const relatedLinks = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/platform/security", label: "Security", Icon: ShieldCheck },
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: GitBranch },
  { to: "/channels/whatsapp", label: "WhatsApp", Icon: SiWhatsapp },
  { to: "/channels/sms-broadcasting", label: "SMS Broadcasting", Icon: Radio },
  { to: "/integrations", label: "Integrations", Icon: KeyRound },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: Wallet },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is it secure enough for fintech?",
    answer:
      "Yes. Conversations are encrypted in transit and at rest, access is governed by SSO and role-based controls, and every action is written to an immutable audit log. The platform is GDPR- and CCPA-aligned, agents mask PII by default, and you decide exactly what each role can see or do.",
  },
  {
    question: "Can it send transaction and fraud alerts?",
    answer:
      "Yes. The agent sends payment confirmations, balance notices, and fraud alerts in real time over SMS and WhatsApp. Alerts are two-way, so a customer can approve a login or freeze a card by replying — and every alert and response is logged.",
  },
  {
    question: "Are all conversations auditable?",
    answer:
      "Yes. Onboarding steps, transaction messages, refunds, human handoffs, and admin changes are all captured in a timestamped, exportable audit trail. When compliance or a customer asks what happened, you have the full record rather than a reconstruction.",
  },
  {
    question: "How does it handle onboarding and KYC?",
    answer:
      "The agent guides new users through account opening and verification one step at a time, collecting only the data required for each step and masking sensitive fields. When a case needs manual review, it escalates to a human with the full history attached — no repeat questions.",
  },
  {
    question: "Who can see customer balances and issue refunds?",
    answer:
      "Only the roles you allow. Access controls are granular — an agent might answer questions without ever seeing a full balance, while refunds are limited to supervisors and PII exports to admins. Every permission and every action is recorded.",
  },
  {
    question: "Can I broadcast rate changes and notices compliantly?",
    answer:
      "Yes. You can broadcast to opted-in customers across SMS and WhatsApp — with consent honored, opt-outs respected automatically, and every send captured in the audit trail, so outbound stays as controlled as inbound.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Fintech",
  serviceType: "Secure agentic AI for fintech support, onboarding, and alerts",
  description:
    "Secure agentic AI for fintech that guides onboarding and KYC, answers account and transaction questions, sends fraud and payment alerts, and broadcasts notices across SMS and WhatsApp — backed by audit logs, role-based access, SSO, and encryption.",
  url: "https://www.floatchat.com/industry/fintech",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Fintech, banks, lenders, wallets, and payment apps",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function FintechIndustryPage() {
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
                  <Landmark className="h-3.5 w-3.5" />
                  Fintech · secure by design, compliant by default
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    fintech.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Secure agents for onboarding, support, and proactive
                  notifications across every channel — with audit logs, access
                  controls, and encryption built in.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "KYC & onboarding help",
                    "Fraud & payment alerts",
                    "Audit logs & SSO",
                    "SMS + WhatsApp",
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
                  Built for banks, lenders, wallets, and payment apps.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <SecureFintechVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {results.map((s, i) => (
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
                  Instant, secure answers — with no room for error.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Fintech customers expect answers the moment they ask — about a
                    frozen card, a pending transfer, or a stalled onboarding flow.
                    Every minute of delay is a support ticket, a chargeback, or a
                    churned account.
                  </p>
                  <p>
                    But you can&apos;t trade speed for control. One leaked balance,
                    one unlogged action, one broadcast to a customer who opted out,
                    and you&apos;re explaining yourself to a regulator instead of a
                    reviewer.
                  </p>
                  <p>
                    A{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      secure agentic AI
                    </span>{" "}
                    handles the routine support and alerts inside strong guardrails
                    and audit trails — so customers get fast service and you keep
                    the receipts.
                  </p>
                </div>
              </BlurFade>

              {/* risky vs secure contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A generic bot
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Exposes balances and PII by accident",
                        "No record of what it said or did",
                        "Anyone on the team can see everything",
                        "Broadcasts without checking consent",
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
                      A secure agent
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Masks PII, never leaks full card or balance",
                        "Logs every message, action, and approval",
                        "Role-based access and SSO on every action",
                        "Honors consent and opt-outs automatically",
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
                  Four jobs, one secure platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Onboarding, alerts, audit, and broadcasting — grounded in your
                  systems and governed by one access model.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((f, i) => (
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

        {/* ───── SECURITY / HOW IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Security & how it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Secure at every layer.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Customers get fast, secure service. Your team handles the
                  sensitive cases. Every interaction is logged and controlled.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((h, i) => (
                <BlurFade key={h.title} delay={0.05 + i * 0.07} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,42,74,0.08)]">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <h.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-[#0F2A4A]">
                      {h.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-500 leading-relaxed">
                      {h.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* flow band */}
            <BlurFade delay={0.25}>
              <div className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: UserCheck, title: "Customer verifies", note: "guided KYC" },
                    { Icon: Sparkles, title: "Agent responds", note: "inside guardrails" },
                    { Icon: FileClock, title: "Action logged", note: "immutable trail" },
                    { Icon: ShieldCheck, title: "Human reviews", note: "with full context" },
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
          headline="Bring secure agentic AI to your fintech."
          body="Onboarding, alerts, and broadcasting — backed by audit logs, SSO, and encryption."
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
                  One platform instead of four vendors.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {whyFloatChat.map((b, i) => (
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
                    Security, AI, channels, and broadcasting live on one platform
                    with one access model — instead of four vendors, four
                    policies, and four places your compliance story can break.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything that powers it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The security, channels, and AI behind a fintech-ready agent —
                  all on one platform.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((p, i) => (
                <BlurFade key={p.to} delay={0.04 + i * 0.05} className="h-full">
                  <Link
                    to={p.to}
                    className="group h-full flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 hover:border-[#3B82F6]/40 hover:shadow-[0_20px_40px_-24px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center shrink-0">
                      <p.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {p.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-[#1D4ED8] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Also
                </span>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  Talk to Sales
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Get a Demo
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
              description="Straight answers about security, alerts, and audit trails."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or review our{" "}
                  <Link
                    to="/platform/security"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    security posture
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 45%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 25%, #93C5FD 50%, #60A5FA 75%, transparent)",
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
                  Secure alerts going out across channels right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">audit-ready</span>
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
                  Secure by design
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Bring secure agentic AI to{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  fintech.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Support onboarding, transactions, and alerts with agents that stay
                inside your guardrails — backed by audit logs, access controls, and
                encryption.
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
                "KYC & onboarding",
                "Fraud & payment alerts",
                "Audit logs & SSO",
                "SMS + WhatsApp broadcasting",
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
