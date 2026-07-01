"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Lock,
  KeyRound,
  ScrollText,
  Ban,
  Globe2,
  Fingerprint,
  Server,
  FileCheck2,
  EyeOff,
  Building2,
  Network,
  UserCog,
  ClipboardList,
} from "lucide-react"
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
  title: "Enterprise Security for Agentic AI Communications | FloatChat",
  description:
    "SSO and SAML, audit logs, IP blocklisting, role-based access, and GDPR/CCPA-aligned data handling. Enterprise security built into FloatChat.",
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
   HERO VISUAL — a live security control panel: SSO/SAML toggle,
   role-based-access matrix, a streaming audit log, IP blocklist,
   and encryption/GDPR compliance badges.
─────────────────────────────────────────────────────────────── */

type AuditEntry = {
  actor: string
  action: string
  meta: string
  tone: "blue" | "emerald" | "amber"
}

const AUDIT_STREAM: AuditEntry[] = [
  { actor: "priya.n", action: "signed in via SAML SSO", meta: "Okta · MFA", tone: "emerald" },
  { actor: "admin", action: "granted role · Analyst", meta: "team: Support", tone: "blue" },
  { actor: "system", action: "blocked login · IP not allowed", meta: "203.0.113.9", tone: "amber" },
  { actor: "m.webb", action: "exported audit log", meta: "CSV · 1.2k rows", tone: "blue" },
  { actor: "admin", action: "rotated API key", meta: "prod · scoped", tone: "emerald" },
  { actor: "system", action: "data export honored", meta: "GDPR · subject req.", tone: "emerald" },
]

function SecurityControlPanel() {
  const [ssoOn, setSsoOn] = useState(true)
  const [logIndex, setLogIndex] = useState(3)

  // Cycle the SSO/SAML toggle and stream new audit entries.
  useEffect(() => {
    const toggle = setInterval(() => setSsoOn((v) => !v), 4200)
    const stream = setInterval(
      () => setLogIndex((i) => (i + 1) % AUDIT_STREAM.length),
      2200,
    )
    return () => {
      clearInterval(toggle)
      clearInterval(stream)
    }
  }, [])

  // Show a rolling window of the audit stream (3 rows).
  const visibleLog = [0, 1, 2].map(
    (offset) => AUDIT_STREAM[(logIndex + offset) % AUDIT_STREAM.length],
  )

  const roleMatrix: { role: string; scope: string; perms: boolean[] }[] = [
    { role: "Owner", scope: "full", perms: [true, true, true, true] },
    { role: "Admin", scope: "manage", perms: [true, true, true, false] },
    { role: "Agent", scope: "operate", perms: [true, true, false, false] },
    { role: "Analyst", scope: "read", perms: [true, false, false, false] },
  ]

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
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Lock className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Encrypted in transit &amp; at rest
        </span>
      </motion.div>

      {/* Floating compliance badge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <FileCheck2 className="h-4 w-4 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          GDPR &amp; CCPA aligned
        </span>
      </motion.div>

      {/* Main panel */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 font-mono text-[10px] text-slate-400">
            app.floatchat.com · security
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Secured
          </span>
        </div>

        <div className="p-3 sm:p-4 space-y-3 bg-slate-50/30">
          {/* Authentication row: SSO/SAML toggle */}
          <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-[#3B82F6]/10 flex items-center justify-center">
                  <Fingerprint className="h-3.5 w-3.5 text-[#1D4ED8]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#0F2A4A] leading-tight">
                    Single sign-on
                  </p>
                  <p className="text-[9px] text-slate-500">
                    SAML 2.0 · Okta, Azure AD, Google
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSsoOn((v) => !v)}
                aria-label="Toggle SSO"
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  ssoOn ? "bg-emerald-500" : "bg-slate-300"
                }`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${
                    ssoOn ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={ssoOn ? "on" : "off"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="mt-2 flex items-center gap-1.5"
              >
                {ssoOn ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span className="text-[9.5px] text-emerald-600 font-medium">
                      Enforced · MFA required · JIT provisioning on
                    </span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-3 w-3 text-slate-400" />
                    <span className="text-[9.5px] text-slate-500 font-medium">
                      Password + MFA fallback for non-SSO seats
                    </span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-12 gap-3">
            {/* Role-based access matrix */}
            <div className="col-span-12 md:col-span-7 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <UserCog className="h-3 w-3 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#0F2A4A]">
                  Role-based access
                </span>
                <span className="ml-auto text-[8px] font-mono text-slate-400">
                  view · operate · manage · admin
                </span>
              </div>
              <div className="space-y-1.5">
                {roleMatrix.map((r) => (
                  <div
                    key={r.role}
                    className="grid grid-cols-12 items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
                  >
                    <div className="col-span-5 min-w-0">
                      <p className="text-[10px] font-medium text-[#0F2A4A] leading-none truncate">
                        {r.role}
                      </p>
                      <p className="text-[8px] text-slate-400 mt-0.5">{r.scope}</p>
                    </div>
                    <div className="col-span-7 flex items-center justify-end gap-1.5">
                      {r.perms.map((granted, i) => (
                        <span
                          key={i}
                          className={`h-3.5 w-3.5 rounded-[4px] flex items-center justify-center ${
                            granted
                              ? "bg-emerald-500"
                              : "bg-slate-200 border border-slate-300"
                          }`}
                        >
                          {granted && (
                            <Check className="h-2 w-2 text-white" strokeWidth={3.5} />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IP blocklist */}
            <div className="col-span-12 md:col-span-5 rounded-xl border border-slate-200 bg-white p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Ban className="h-3 w-3 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#0F2A4A]">
                  IP blocklist
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  { ip: "10.0.0.0/8", label: "office · allow", allow: true },
                  { ip: "198.51.100.24", label: "vpn · allow", allow: true },
                  { ip: "203.0.113.9", label: "blocked", allow: false },
                ].map((row) => (
                  <div
                    key={row.ip}
                    className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        row.allow ? "bg-emerald-500" : "bg-slate-500"
                      }`}
                    />
                    <span className="font-mono text-[9px] text-[#0F2A4A] truncate">
                      {row.ip}
                    </span>
                    <span
                      className={`ml-auto text-[8px] font-medium ${
                        row.allow ? "text-emerald-600" : "text-slate-600"
                      }`}
                    >
                      {row.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit log stream */}
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <ScrollText className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[10px] font-semibold text-[#0F2A4A]">
                Audit log
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[8px] font-mono text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                streaming · immutable
              </span>
            </div>
            <div className="space-y-1 min-h-[92px]">
              <AnimatePresence initial={false} mode="popLayout">
                {visibleLog.map((e, i) => (
                  <motion.div
                    key={`${e.actor}-${e.action}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 rounded-md bg-slate-50/60 px-2 py-1"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        e.tone === "emerald"
                          ? "bg-emerald-500"
                          : e.tone === "amber"
                          ? "bg-slate-500"
                          : "bg-[#3B82F6]"
                      }`}
                    />
                    <span className="font-mono text-[9px] text-[#1D4ED8] shrink-0">
                      {e.actor}
                    </span>
                    <span className="text-[9.5px] text-[#0F2A4A] truncate">
                      {e.action}
                    </span>
                    <span className="ml-auto text-[8px] text-slate-400 shrink-0 hidden sm:inline">
                      {e.meta}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Compliance badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { Icon: Lock, label: "Encryption", meta: "TLS · at rest" },
              { Icon: Server, label: "Data residency", meta: "region-pinned" },
              { Icon: FileCheck2, label: "GDPR / CCPA", meta: "aligned" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-lg border border-[#3B82F6]/20 bg-[#EAF2FF] px-2 py-1.5 flex flex-col items-center text-center gap-0.5"
              >
                <b.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span className="text-[9px] font-semibold text-[#0F2A4A] leading-tight">
                  {b.label}
                </span>
                <span className="text-[7.5px] text-slate-500">{b.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Key controls
─────────────────────────────────────────────────────────────── */

const controls: {
  Icon: typeof ShieldCheck
  title: string
  body: string
}[] = [
  {
    Icon: Fingerprint,
    title: "SSO & SAML",
    body: "Sign in through your identity provider — Okta, Azure AD, Google Workspace, or any SAML 2.0 IdP. Enforce MFA and central deprovisioning so access follows your directory, not a spreadsheet.",
  },
  {
    Icon: UserCog,
    title: "Role-based access",
    body: "Scope every seat with granular, role-based permissions and organize people into teams. Give agents what they need to operate and analysts read-only visibility — nothing more.",
  },
  {
    Icon: ScrollText,
    title: "Audit logs",
    body: "A tamper-evident, timestamped record of who did what and when — sign-ins, role changes, exports, and configuration edits — exportable for your security reviews and investigations.",
  },
  {
    Icon: Ban,
    title: "IP blocklisting",
    body: "Restrict access to trusted networks with IP allow and block rules. Lock the workspace down to office ranges and your VPN, and shut out logins from anywhere else.",
  },
  {
    Icon: Lock,
    title: "Encryption",
    body: "Data is encrypted in transit with TLS and encrypted at rest. Sensitive credentials and API keys are stored securely and can be rotated and scoped whenever you need.",
  },
  {
    Icon: Server,
    title: "Data residency",
    body: "Keep customer data where it belongs. Configurable data-residency controls help you meet regional requirements and internal data-handling policies.",
  },
  {
    Icon: FileCheck2,
    title: "GDPR & CCPA aligned",
    body: "Data handling is aligned with GDPR and CCPA — lawful processing, data-subject access and deletion, and clear retention. SOC 2 is on the roadmap.",
  },
  {
    Icon: EyeOff,
    title: "White-label & brand control",
    body: "A white-label UI and customizable dashboards keep the experience on your brand, so security controls fit the way your team already works.",
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Do you support SSO and SAML?",
    answer:
      "Yes. FloatChat supports single sign-on over SAML 2.0, so your team signs in through your existing identity provider — Okta, Azure AD, Google Workspace, or any SAML-compatible IdP. You can enforce MFA at the IdP and deprovision access centrally, so when someone leaves your directory they lose access here too.",
  },
  {
    question: "Are you SOC 2 certified?",
    answer:
      "SOC 2 is on our roadmap. Today, FloatChat's data handling is aligned with GDPR and CCPA, and the platform ships with enterprise controls — SSO and SAML, role-based access, audit logs, IP blocklisting, and encryption in transit and at rest — that satisfy most security reviews.",
  },
  {
    question: "Can I control access by role?",
    answer:
      "Yes. Access is governed by granular, role-based permissions and teams. You decide what each role can view, operate, manage, or administer — for example, giving agents operational access while analysts get read-only visibility. Permissions are enforced consistently across the platform.",
  },
  {
    question: "What do the audit logs capture?",
    answer:
      "The audit log records security-relevant events with a timestamp and the actor responsible — sign-ins, role and permission changes, data exports, API-key rotations, and configuration edits. The log is tamper-evident and exportable, so it can feed your security reviews, investigations, and compliance evidence.",
  },
  {
    question: "How does IP blocklisting work?",
    answer:
      "You define allow and block rules by IP address or range. Lock the workspace to trusted networks — office ranges and your VPN — and logins from any other address are refused and recorded in the audit log. It's a straightforward way to reduce your attack surface without slowing your team down.",
  },
  {
    question: "How do you handle data under GDPR and CCPA?",
    answer:
      "FloatChat's processing is aligned with GDPR and CCPA: lawful, minimized processing, support for data-subject access and deletion requests, and clear retention. Configurable data-residency controls help you keep customer data in the region you require. Because it's one platform, you apply a single data-handling model across your AI, channels, and campaigns instead of stitching policies across several vendors.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FloatChat Enterprise Security",
  serviceType: "Enterprise security for agentic AI communications",
  description:
    "Enterprise security controls for FloatChat: SSO and SAML, role-based access, audit logs, IP blocklisting, encryption, data residency, and GDPR/CCPA-aligned data handling.",
  url: "https://www.floatchat.com/platform/security",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "IT, security, and compliance teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Cross-links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  {
    to: "/platform",
    Icon: Building2,
    title: "The platform",
    body: "One system for agentic AI, channels, and campaigns — with one security model.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "Autonomous agents that act inside the guardrails and permissions you set.",
  },
  {
    to: "/integrations",
    Icon: Network,
    title: "Integrations",
    body: "Connect your stack with scoped, rotatable API keys and secure webhooks.",
  },
  {
    to: "/pricing",
    Icon: ClipboardList,
    title: "Pricing",
    body: "See plans and what enterprise security controls are included.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function PlatformSecurityPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={faqSchema} />

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
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, #93C5FD 0%, transparent 70%)",
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#1D4ED8]/30 bg-[#1D4ED8]/5 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Enterprise security · built in, not bolted on
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Enterprise-grade security for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  SSO and SAML, audit logs, and data controls that satisfy IT and
                  compliance — without slowing your team down. Give agentic AI broad
                  channel access with the guardrails your security review expects.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "SSO & SAML",
                    "Audit logs & IP blocklisting",
                    "Role-based access",
                    "GDPR & CCPA aligned",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#1D4ED8]" />
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
                      to="/demo"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                    >
                      Get a Demo
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
                    Contact Sales
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  Built for teams that answer to security reviews.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <SecurityControlPanel />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── TRUST / CONTROLS STRIP ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Fingerprint, value: "SSO", label: "and SAML 2.0 sign-in" },
                { Icon: ScrollText, value: "Audit", label: "logs & IP blocklisting" },
                { Icon: UserCog, value: "RBAC", label: "role-based access & teams" },
                { Icon: FileCheck2, value: "GDPR", label: "and CCPA aligned" },
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
                  Powerful AI raises the bar on security.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Agentic AI and broad channel access are exactly what make a
                    communications platform useful — and exactly what a security
                    team scrutinizes. The more an agent can do on its own, the more
                    your controls have to hold.
                  </p>
                  <p>
                    Bolt-on security fails here. When SSO, permissions, and logging
                    live in separate tools stitched around the product, there are
                    gaps between them — and gaps are where reviews stall and
                    incidents start.
                  </p>
                  <p>
                    FloatChat builds the controls into the platform by default, so
                    enabling AI and broadcasting doesn&apos;t mean loosening your
                    posture. You move fast{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      without creating risk
                    </span>
                    .
                  </p>
                </div>
              </BlurFade>

              {/* bolt-on vs built-in contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Security bolted on
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Four vendors, four access models",
                        "Logs scattered or missing",
                        "No central deprovisioning",
                        "Reviews stall on the gaps",
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
                      Security built in
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "One platform, one security model",
                        "Tamper-evident audit logs by default",
                        "SSO deprovisioning follows your IdP",
                        "Controls IT will approve",
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

        {/* ───── KEY CONTROLS GRID ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="Key controls" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The controls your security team asks for.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Strong defaults across access, visibility, and data handling — so
                  enabling agentic AI never means loosening your posture.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {controls.map((c, i) => (
                <BlurFade key={c.title} delay={0.04 + i * 0.05} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 mb-4">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── DATA HANDLING & COMPLIANCE ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="03" label="Data handling & compliance" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Data handled the way regulators expect.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    FloatChat&apos;s processing is aligned with the GDPR and the
                    CCPA: lawful, minimized processing, support for data-subject
                    access and deletion requests, and clear retention. You get one
                    data-handling model across your AI, channels, and campaigns —
                    not four different ones to reconcile.
                  </p>
                  <p>
                    Data is encrypted in transit and at rest, and configurable
                    data-residency controls help you keep customer data in the
                    region your policies require. SOC 2 is on our roadmap; the
                    controls that underpin it — access, logging, and encryption —
                    are already in place today.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Encryption in transit & at rest",
                    "Data-subject access & deletion",
                    "Configurable data residency",
                    "SOC 2 on the roadmap",
                  ].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-[#0F2A4A]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      {t}
                    </span>
                  ))}
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: FileCheck2,
                      title: "GDPR & CCPA aligned",
                      body: "Lawful, minimized processing with a defensible basis and clear retention.",
                    },
                    {
                      Icon: Globe2,
                      title: "Subject requests",
                      body: "Honor access, export, and deletion requests without a fire drill.",
                    },
                    {
                      Icon: Server,
                      title: "Data residency",
                      body: "Pin customer data to the region your compliance program requires.",
                    },
                    {
                      Icon: Lock,
                      title: "Encryption everywhere",
                      body: "TLS in transit, encryption at rest, and scoped, rotatable keys.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-3">
                        <card.Icon className="h-5 w-5 text-[#1D4ED8]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#0F2A4A]">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── ACCESS & AUTHENTICATION ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Access & authentication" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Who gets in, what they can do, and a record of it all.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Identity from your IdP, permissions scoped to the role, network
                  rules at the edge, and a tamper-evident log behind every action.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  Icon: Fingerprint,
                  step: "Authenticate",
                  title: "SSO & SAML",
                  points: [
                    "SAML 2.0 with Okta, Azure AD, Google",
                    "Enforce MFA at your IdP",
                    "Central, instant deprovisioning",
                  ],
                },
                {
                  Icon: UserCog,
                  step: "Authorize",
                  title: "Roles & teams",
                  points: [
                    "Granular role-based permissions",
                    "Organize people into teams",
                    "Least-privilege by default",
                  ],
                },
                {
                  Icon: Ban,
                  step: "Restrict",
                  title: "IP blocklisting",
                  points: [
                    "Allow office ranges and VPN",
                    "Block everything else",
                    "Refused logins are recorded",
                  ],
                },
                {
                  Icon: ScrollText,
                  step: "Audit",
                  title: "Audit logs",
                  points: [
                    "Who did what, and when",
                    "Tamper-evident and timestamped",
                    "Exportable for reviews",
                  ],
                },
              ].map((col, i) => (
                <BlurFade key={col.title} delay={0.05 + i * 0.07} className="h-full">
                  <div className="h-full flex flex-col rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white to-[#F8FAFF] p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-9 w-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center">
                        <col.Icon className="h-4.5 w-4.5 text-[#1D4ED8]" />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#3B82F6]">
                        {col.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] mb-3">
                      {col.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {col.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-[13px] text-slate-500 leading-relaxed"
                        >
                          <Check
                            className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              ))}
            </div>

            {/* Cross-links to fintech / healthcare */}
            <BlurFade delay={0.2}>
              <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/50 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-[#0F2A4A]">
                  <ShieldCheck className="h-4 w-4 text-[#1D4ED8]" />
                  <span className="text-sm font-medium">
                    Working in a regulated industry?
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 sm:ml-auto">
                  <Link
                    to="/industry/fintech"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    Security for fintech
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/industry/healthcare"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                  >
                    Security for healthcare
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Bring agentic AI to your team with controls IT will approve."
          body="Walk through SSO, audit logs, and data handling with our team on a live demo."
          primaryLabel="Get a Demo"
          primaryHref="/demo"
          secondaryLabel="Contact Sales"
          secondaryHref="/contact"
        />

        {/* ───── RELATED / CROSS-LINKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="One platform" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One security model across everything.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Because FloatChat is one platform, your controls apply
                  consistently across AI, channels, and integrations.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedLinks.map((r, i) => (
                <BlurFade key={r.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={r.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-[#3B82F6]/40 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center mb-4">
                      <r.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {r.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] group-hover:gap-2.5 transition-all">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Security questions, answered"
              description="What IT and compliance teams ask before they approve FloatChat."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-white to-[#EEF2FF]">
          <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
            <div className="relative rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur-sm px-8 py-14 lg:px-16 lg:py-16 overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 30%, #3B82F6 50%, #93C5FD 70%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(96,165,250,0.15) 50%, transparent 75%)",
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
                  Enterprise controls, on by default
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">SSO · audit · RBAC</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Adopt agentic AI with the{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  controls IT will approve.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                SSO and SAML, audit logs, IP blocklisting, role-based access, and
                GDPR/CCPA-aligned data handling — built into FloatChat, ready for
                your security review.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Get a Demo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
