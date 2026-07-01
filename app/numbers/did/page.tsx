"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Hash,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Megaphone,
  ShieldCheck,
  Globe,
  Search,
  BadgeCheck,
  ClipboardCheck,
  Layers,
  Radio,
  Building2,
  MapPin,
  Zap,
  Inbox,
  Workflow,
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
  title: "DID and Virtual Numbers for Voice and SMS | FloatChat",
  description:
    "Provision local, toll-free, and short code numbers for voice, SMS, and broadcasting, with 10DLC and sender-ID registration, in one platform.",
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
   HERO MOCKUP — a number-provisioning surface:
   a country + number-type selector, a live catalog of available
   numbers with "Provision" buttons, and a 10DLC / sender-ID
   registration status card that cycles pending → in review →
   approved.
─────────────────────────────────────────────────────────────── */

type NumType = "local" | "tollfree" | "short"

type CatalogEntry = {
  number: string
  place: string
  caps: Array<"voice" | "sms">
  monthly: string
}

const CATALOG: Record<NumType, CatalogEntry[]> = {
  local: [
    { number: "+1 (415) 555-0142", place: "San Francisco, CA", caps: ["voice", "sms"], monthly: "$1.00" },
    { number: "+1 (212) 555-0188", place: "New York, NY", caps: ["voice", "sms"], monthly: "$1.00" },
    { number: "+44 20 7946 0321", place: "London, UK", caps: ["voice", "sms"], monthly: "$1.15" },
  ],
  tollfree: [
    { number: "+1 (800) 555-0117", place: "Toll-free · US & CA", caps: ["voice", "sms"], monthly: "$2.00" },
    { number: "+1 (888) 555-0164", place: "Toll-free · US & CA", caps: ["voice", "sms"], monthly: "$2.00" },
    { number: "+1 (877) 555-0129", place: "Toll-free · US & CA", caps: ["voice"], monthly: "$2.00" },
  ],
  short: [
    { number: "24447", place: "Short code · US", caps: ["sms"], monthly: "lease" },
    { number: "38293", place: "Short code · US", caps: ["sms"], monthly: "lease" },
    { number: "51015", place: "Short code · UK", caps: ["sms"], monthly: "lease" },
  ],
}

type RegPhase = "pending" | "review" | "approved"

function ProvisioningMockup() {
  const [numType, setNumType] = useState<NumType>("local")
  const [regPhase, setRegPhase] = useState<RegPhase>("pending")
  const [provisioned, setProvisioned] = useState<string | null>(null)

  // Cycle the number-type selector so the catalog visibly changes.
  useEffect(() => {
    const order: NumType[] = ["local", "tollfree", "short"]
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % order.length
      setNumType(order[i])
      setProvisioned(null)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  // Auto-provision the first row of the current type.
  useEffect(() => {
    const t = setTimeout(() => {
      setProvisioned(CATALOG[numType][0].number)
    }, 1400)
    return () => clearTimeout(t)
  }, [numType])

  // Cycle the registration status card independently.
  useEffect(() => {
    const order: RegPhase[] = ["pending", "review", "approved"]
    let i = 0
    const id = setInterval(() => {
      i = (i + 1) % order.length
      setRegPhase(order[i])
    }, 2400)
    return () => clearInterval(id)
  }, [])

  const types: Array<{ key: NumType; label: string; Icon: typeof MapPin }> = [
    { key: "local", label: "Local", Icon: MapPin },
    { key: "tollfree", label: "Toll-free", Icon: Phone },
    { key: "short", label: "Short code", Icon: Hash },
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

      {/* Floating "in-platform" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          No separate carrier
        </span>
      </motion.div>

      {/* Floating capability chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#1D4ED8] flex items-center justify-center">
          <Radio style={{ color: "#fff", width: 10, height: 10 }} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Voice · SMS · broadcast
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
            app.floatchat.com · numbers
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live catalog
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[460px]">
          {/* Selector rail */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Country
              </p>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5">
                <Globe className="h-3.5 w-3.5 text-[#1D4ED8]" />
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  United States
                </span>
                <span className="ml-auto text-[9px] text-slate-400">+1</span>
              </div>
            </div>
            <div className="px-3 py-3 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Number type
              </p>
              {types.map((t) => {
                const active = numType === t.key
                return (
                  <motion.button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setNumType(t.key)
                      setProvisioned(null)
                    }}
                    animate={
                      active
                        ? {
                            borderColor: "rgba(59,130,246,0.5)",
                            backgroundColor: "rgba(59,130,246,0.06)",
                          }
                        : {
                            borderColor: "rgba(226,232,240,1)",
                            backgroundColor: "rgba(255,255,255,1)",
                          }
                    }
                    transition={{ duration: 0.3 }}
                    className="flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left"
                  >
                    <span
                      className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 ${
                        active ? "bg-[#3B82F6]/10" : "bg-slate-100"
                      }`}
                    >
                      <t.Icon
                        className={`h-3 w-3 ${
                          active ? "text-[#1D4ED8]" : "text-slate-500"
                        }`}
                      />
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        active ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                      }`}
                    >
                      {t.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="type-dot"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* 10DLC / sender-ID registration status card */}
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-2">
                Registration
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    10DLC brand + campaign
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  {(["pending", "review", "approved"] as RegPhase[]).map(
                    (step, idx) => {
                      const order: RegPhase[] = ["pending", "review", "approved"]
                      const reached =
                        order.indexOf(regPhase) >= order.indexOf(step)
                      return (
                        <div key={step} className="flex-1 flex items-center gap-1">
                          <motion.span
                            animate={{
                              backgroundColor: reached
                                ? step === "approved"
                                  ? "#10B981"
                                  : "#3B82F6"
                                : "#E2E8F0",
                            }}
                            className="h-1.5 flex-1 rounded-full"
                          />
                          {idx < 2 && (
                            <span className="text-[7px] text-slate-300">·</span>
                          )}
                        </div>
                      )
                    }
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={regPhase}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.25 }}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${
                        regPhase === "approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : regPhase === "review"
                          ? "bg-[#EAF2FF] text-[#1D4ED8] border border-[#3B82F6]/20"
                          : "bg-slate-50 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {regPhase === "approved" ? (
                        <>
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          Approved
                        </>
                      ) : regPhase === "review" ? (
                        <>
                          <ClipboardCheck className="h-2.5 w-2.5" />
                          In review
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-pulse" />
                          Pending
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[9px] text-slate-400">campaign #C-77</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Available numbers list */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Available {numType === "tollfree" ? "toll-free" : numType === "short" ? "short code" : "local"} numbers
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
                <Layers className="h-2.5 w-2.5" /> {CATALOG[numType].length} shown
              </span>
            </div>

            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={numType}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {CATALOG[numType].map((row) => {
                    const isProvisioned = provisioned === row.number
                    return (
                      <div
                        key={row.number}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#EAF2FF] flex items-center justify-center shrink-0">
                          <Hash className="h-4 w-4 text-[#1D4ED8]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-semibold text-[#0F2A4A] tabular-nums truncate">
                            {row.number}
                          </p>
                          <p className="text-[9px] text-slate-500 truncate">
                            {row.place} · {row.monthly}/mo
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 shrink-0">
                          {row.caps.includes("voice") && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-medium text-slate-600">
                              <Phone className="h-2 w-2" /> Voice
                            </span>
                          )}
                          {row.caps.includes("sms") && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-medium text-slate-600">
                              <MessageSquare className="h-2 w-2" /> SMS
                            </span>
                          )}
                        </div>
                        <AnimatePresence mode="wait">
                          {isProvisioned ? (
                            <motion.span
                              key="done"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 shrink-0"
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                              Provisioned
                            </motion.span>
                          ) : (
                            <motion.button
                              key="cta"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              type="button"
                              className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm shrink-0"
                            >
                              Provision
                              <ArrowRight className="h-3 w-3" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer summary */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="text-[10px] text-slate-500">
                Number lookup + fraud &amp; spam protection on every provisioned line.
              </span>
              <span className="ml-auto text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                Assign to agent
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" cards
─────────────────────────────────────────────────────────────── */

function ProvisionVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Provision in seconds
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Zap className="h-2.5 w-2.5" /> self-serve
        </span>
      </div>
      {[
        { n: "+1 (415) 555-0142", tag: "Local" },
        { n: "+1 (800) 555-0117", tag: "Toll-free" },
      ].map((r) => (
        <div
          key={r.n}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <Hash className="h-3 w-3 text-[#1D4ED8] shrink-0" />
          <span className="text-[10px] font-medium text-[#0F2A4A] tabular-nums truncate">
            {r.n}
          </span>
          <span className="ml-auto text-[8.5px] text-slate-500">{r.tag}</span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function RegistrationVisual() {
  const steps = [
    { label: "Brand registered", done: true },
    { label: "Campaign submitted", done: true },
    { label: "Carrier approval", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <BadgeCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          10DLC &amp; sender-ID
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">guided</span>
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
              in review
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function VoiceSmsVisual() {
  const rows = [
    { Icon: Phone, label: "Inbound + outbound voice", note: "same line" },
    { Icon: MessageSquare, label: "Two-way SMS", note: "same line" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One number set
        </span>
        <span className="text-[8.5px] text-slate-400">voice + messaging</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span className="h-6 w-6 rounded-md bg-[#EAF2FF] flex items-center justify-center shrink-0">
            <r.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">
            {r.label}
          </span>
          <span className="ml-auto text-[8.5px] text-slate-500">{r.note}</span>
        </div>
      ))}
    </div>
  )
}

function BroadcastVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Broadcasting-ready
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">throughput</span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-slate-500">Registered sender</span>
          <span className="text-[9px] font-semibold text-emerald-600">
            Approved
          </span>
        </div>
        <div className="mt-1.5 grid grid-cols-8 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.span
              key={i}
              className="h-4 rounded-sm bg-[#3B82F6]"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.12,
              }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-[8.5px] text-slate-500">
          High-throughput SMS with compliant, registered numbers.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Number types
─────────────────────────────────────────────────────────────── */

const numberTypes = [
  {
    Icon: MapPin,
    name: "Local DID",
    tagline: "A presence in every market",
    body:
      "City and country codes your customers recognize. Ideal for regional support lines, click-to-call, and local-looking outbound that gets answered.",
    points: ["Voice + SMS capable", "Global coverage", "Recognizable to callers"],
  },
  {
    Icon: Phone,
    name: "Toll-free",
    tagline: "Free for the caller, trusted brand line",
    body:
      "800 / 888 / 877 numbers for national support and inbound campaigns. Toll-free SMS is verified for higher deliverability on messaging.",
    points: ["Nationwide reach", "Toll-free SMS verification", "Trusted at scale"],
  },
  {
    Icon: Hash,
    name: "Short code",
    tagline: "Built for high-volume messaging",
    body:
      "5–6 digit codes for opt-in campaigns, alerts, and broadcasting where throughput and memorability matter most.",
    points: ["High-throughput SMS", "Easy to remember", "Campaign-grade"],
  },
]

/* ─────────────────────────────────────────────────────────────
   How it works
─────────────────────────────────────────────────────────────── */

const steps = [
  {
    Icon: Search,
    title: "Search the catalog",
    body:
      "Pick a country and number type — local, toll-free, or short code — and browse live availability with voice and SMS capabilities shown up front.",
  },
  {
    Icon: Hash,
    title: "Provision instantly",
    body:
      "Claim the number you want in the same platform. No separate carrier account, no vendor handoff, no second contract to sign.",
  },
  {
    Icon: BadgeCheck,
    title: "Register for compliance",
    body:
      "Complete 10DLC brand and campaign registration, or sender-ID registration, through a guided in-platform workflow that tracks approval status.",
  },
  {
    Icon: Workflow,
    title: "Assign and go live",
    body:
      "Route the number to your agentic AI, a voice flow, or a broadcasting campaign — voice, SMS, and messaging all run on the same line.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Why FloatChat
─────────────────────────────────────────────────────────────── */

const whyRows = [
  {
    Icon: Layers,
    title: "One platform, one bill",
    body:
      "Numbers, messaging, voice, and AI live together — so there is no carrier handoff and no separate invoice to reconcile at month-end.",
  },
  {
    Icon: ShieldCheck,
    title: "Protection built in",
    body:
      "Number lookup plus fraud and spam protection ship with every line, keeping your sender reputation and deliverability intact.",
  },
  {
    Icon: BadgeCheck,
    title: "Compliance, guided",
    body:
      "10DLC and sender-ID registration are walked through in-product, with clear status tracking so you know exactly when a campaign is approved.",
  },
  {
    Icon: Sparkles,
    title: "The carrier layer for your AI",
    body:
      "This is the carrier layer many AI platforms skip — provided in the same product as your agentic AI, voice agents, and broadcasting.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedLinks = [
  { to: "/channels/voice", label: "Voice channel", Icon: Phone },
  { to: "/channels/sms-broadcasting", label: "SMS & broadcasting", Icon: Megaphone },
  { to: "/voice-ai-agents", label: "Voice AI agents", Icon: Radio },
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/products/omnichannel-inbox", label: "Omnichannel inbox", Icon: Inbox },
  { to: "/integrations", label: "Integrations", Icon: Layers },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What number types can I provision?",
    answer:
      "Local DID numbers, toll-free numbers, and short codes — across global markets. Local numbers give you a recognizable regional presence, toll-free numbers work for national inbound, and short codes are built for high-volume messaging and broadcasting.",
  },
  {
    question: "Do you handle 10DLC registration?",
    answer:
      "Yes. 10DLC brand and campaign registration is handled through a guided in-platform workflow, and the same applies to sender-ID registration where required. You submit the details once and track approval status without leaving FloatChat.",
  },
  {
    question: "Can the same number do both voice and SMS?",
    answer:
      "Yes. One number set powers inbound and outbound calling, two-way SMS, and broadcasting. Capabilities are shown for each number in the catalog, so you can pick lines that fit your exact voice-and-messaging use case.",
  },
  {
    question: "Do I still need a separate carrier account?",
    answer:
      "No. FloatChat provisions the numbers your agent and campaigns use inside the same product. There is no separate carrier to onboard, no vendor handoff between provisioning and usage, and no second bill to reconcile.",
  },
  {
    question: "How are numbers protected from fraud and spam?",
    answer:
      "Every provisioned line comes with number lookup plus fraud and spam protection. That keeps your sender reputation healthy, protects deliverability on messaging, and reduces exposure to abuse on your voice lines.",
  },
  {
    question: "Can I connect a provisioned number to my AI agent?",
    answer:
      "Yes. Numbers assign directly to your agentic AI, voice AI agents, or broadcasting campaigns. The number is the carrier layer your AI runs on — provisioned, registered, and routed all in one platform.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "DID and Virtual Numbers",
  serviceType: "Virtual number provisioning for voice and SMS",
  description:
    "Provision local, toll-free, and short code numbers for voice, SMS, and broadcasting, with 10DLC and sender-ID registration, in one platform.",
  url: "https://www.floatchat.com/numbers/did",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Teams running voice, SMS, and broadcasting on AI agents",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function NumbersDidPage() {
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
                  <Hash className="h-3.5 w-3.5" />
                  DID &amp; virtual numbers · managed in-platform
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  DID and virtual numbers for{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    voice, SMS, and broadcasting.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Provision local, toll-free, and short code numbers for calling and
                  messaging — with 10DLC and sender-ID registration handled — all in
                  one platform, with no separate carrier.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Local, toll-free & short codes",
                    "Voice + SMS ready",
                    "10DLC & sender-ID registration",
                    "Fraud & spam protection",
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
                  The numbers your agentic AI runs on, inside the platform.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <ProvisioningMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Hash, value: "3 types", label: "local, toll-free & short codes" },
                { Icon: Radio, value: "Voice + SMS", label: "on one number set" },
                { Icon: BadgeCheck, value: "10DLC", label: "& sender-ID registration" },
                { Icon: ShieldCheck, value: "Built-in", label: "fraud & spam protection" },
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
                  Your AI needs numbers. Most platforms make you go get them.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Voice agents and SMS campaigns can&apos;t run on nothing — they
                    need real DID and virtual numbers underneath. Yet most AI
                    platforms make you bring those from a separate carrier, adding a
                    vendor, a handoff, and a second bill.
                  </p>
                  <p>
                    That gap is where projects stall: numbers provisioned in one
                    tool, registered in another, and used in a third — with 10DLC
                    and sender-ID paperwork scattered across all of them.
                  </p>
                  <p>
                    FloatChat provisions the{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      numbers your agent and campaigns use
                    </span>{" "}
                    in the same product — so the carrier layer stops being a project
                    of its own.
                  </p>
                </div>
              </BlurFade>

              {/* separate-carrier vs one-platform contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Separate carrier
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Another vendor to onboard",
                        "Handoff between number and usage",
                        "10DLC paperwork done off-platform",
                        "A second bill to reconcile",
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
                      One platform
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Provision in the same product",
                        "Numbers wired straight to your AI",
                        "10DLC & sender-ID guided in-app",
                        "One bill, one place to manage",
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

        {/* ───── NUMBER TYPES ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="Number types" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The numbers you need, for every use case.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Local DID, toll-free, and short code numbers — each tuned for a
                  different job, all provisioned from the same catalog.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {numberTypes.map((t, i) => (
                <BlurFade key={t.name} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <t.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-[13px] font-medium text-[#1D4ED8]">
                      {t.tagline}
                    </p>
                    <p className="mt-2.5 text-[13.5px] text-slate-500 leading-relaxed">
                      {t.body}
                    </p>
                    <ul className="mt-4 space-y-2 pt-4 border-t border-slate-100">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 text-[13px] text-[#0F2A4A]"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHAT YOU GET ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="What you get" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything the carrier layer needs.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Provisioning, registration, dual voice-and-SMS capability, and
                  broadcasting scale — in one place.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Hash,
                  title: "Self-serve provisioning.",
                  body:
                    "Search a live catalog by country and type, then claim local, toll-free, or short code numbers in the same platform — no carrier account to open first.",
                  visual: <ProvisionVisual />,
                },
                {
                  Icon: BadgeCheck,
                  title: "10DLC & sender-ID registration.",
                  body:
                    "Brand and campaign registration for US messaging, plus sender-ID registration where required, walked through in-product with clear approval status.",
                  visual: <RegistrationVisual />,
                },
                {
                  Icon: Radio,
                  title: "Voice + SMS ready.",
                  body:
                    "One number set powers inbound and outbound calling, two-way SMS, and messaging — so a single line serves your whole use case.",
                  visual: <VoiceSmsVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "Broadcasting-ready.",
                  body:
                    "Registered, compliant numbers built for high-throughput SMS — so campaigns and broadcasts go out at scale without deliverability surprises.",
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

        {/* ───── HOW IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="How it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From catalog to live line, in four steps.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <BlurFade key={s.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="relative h-full rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.2)] transition-all duration-300">
                    <span className="absolute top-5 right-6 font-mono text-[11px] text-slate-300">
                      0{i + 1}
                    </span>
                    <div className="h-11 w-11 rounded-xl bg-[#EAF2FF] flex items-center justify-center">
                      <s.Icon className="h-5 w-5 text-[#1D4ED8]" />
                    </div>
                    <h3 className="mt-4 text-base lg:text-lg font-semibold text-[#0F2A4A] leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The carrier layer, included.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Numbers, messaging, voice, and AI in one product — the layer many
                  AI platforms leave to someone else.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {whyRows.map((r, i) => (
                <BlurFade key={r.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="h-full flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                      <r.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F2A4A] leading-tight">
                        {r.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                        {r.body}
                      </p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Get the numbers your agentic AI runs on."
          body="Provision local, toll-free, and short code numbers — voice and SMS ready, registration handled — in one platform."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Talk to Sales"
          secondaryHref="/contact"
        />

        {/* ───── RELATED LINKS ───── */}
        <section className="relative py-16 lg:py-20 bg-white border-t border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <SectionEyebrow num="06" label="Explore more" />
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0F2A4A] leading-[1.1] max-w-2xl">
                Everything your numbers plug into.
              </h2>
            </BlurFade>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {relatedLinks.map((l, i) => (
                <BlurFade key={l.to} delay={i * 0.05}>
                  <Link
                    to={l.to}
                    className="group flex flex-col items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 hover:border-[#3B82F6]/40 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300"
                  >
                    <div className="h-9 w-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center group-hover:bg-[#3B82F6]/15 transition-colors">
                      <l.Icon className="h-4 w-4 text-[#1D4ED8]" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#0F2A4A] leading-snug">
                      {l.label}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#3B82F6] transition-colors" />
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.3}>
              <p className="mt-6 text-sm text-slate-500">
                Ready to see number types and pricing?{" "}
                <Link
                  to="/pricing"
                  className="font-medium text-[#1D4ED8] hover:underline"
                >
                  View pricing
                </Link>{" "}
                or{" "}
                <Link
                  to="/demo"
                  className="font-medium text-[#1D4ED8] hover:underline"
                >
                  book a demo
                </Link>
                .
              </p>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="DID & virtual numbers, answered."
              description="Number types, 10DLC registration, voice and SMS, and how it all stays in one platform."
            />
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-[#F5F7FF] to-[#EEF2FF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <BlurFade>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-white px-4 py-1.5 text-xs font-medium text-[#1B6BFF] mb-6">
                <Building2 className="h-3.5 w-3.5" />
                One platform for numbers, voice &amp; messaging
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                Provision the numbers your AI runs on.
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Local, toll-free, and short code numbers for voice, SMS, and
                broadcasting — with 10DLC and sender-ID registration handled — in
                one platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                    className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
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
                  className="inline-flex items-center justify-center h-12 px-8 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                >
                  Get a Demo
                </Link>
              </div>
              <p className="mt-5 text-sm text-slate-500">
                Prefer to talk it through?{" "}
                <Link
                  to="/contact"
                  className="font-medium text-[#1D4ED8] hover:underline"
                >
                  Talk to sales
                </Link>
                .
              </p>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
