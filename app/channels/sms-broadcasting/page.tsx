"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Users,
  Link2,
  Send,
  ShieldCheck,
  Clock,
  Filter,
  BarChart3,
  Radio,
  Hash,
  Ban,
  Gauge,
  Inbox,
  Zap,
  ListChecks,
  Phone,
  GitBranch,
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
  title: "A2P SMS Broadcasting and Bulk SMS Campaigns | FloatChat",
  description:
    "Send bulk A2P SMS campaigns with segmentation, personalization, link tracking, STOP/HELP handling, and delivery receipts, answered by agentic AI.",
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
   HERO MOCKUP — a bulk A2P SMS campaign composer.
   A 160-char message with a personalization token + tracked link,
   an audience segment count, and a delivery / STOP opt-out panel
   that ticks up as the send rolls out.
─────────────────────────────────────────────────────────────── */

type SendPhase = "compose" | "queued" | "sending" | "done"

function SmsCampaignComposer() {
  const [phase, setPhase] = useState<SendPhase>("compose")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("compose")
        setProgress(0)
        await wait(2000)
        if (cancelled) return
        setPhase("queued")
        await wait(1200)
        if (cancelled) return
        setPhase("sending")
        // animate the progress bar from 0 → 100
        for (let p = 0; p <= 100; p += 4) {
          if (cancelled) return
          setProgress(p)
          await wait(70)
        }
        setProgress(100)
        setPhase("done")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const audience = 24810
  const sent = Math.round((audience * progress) / 100)
  const delivered = Math.round(sent * 0.982)
  const optOut = Math.round(sent * 0.006)
  const clicks = Math.round(delivered * 0.164)

  // The composed message. 148 characters incl. the token + short link.
  const messagePreview = (
    <>
      Hi{" "}
      <span className="rounded bg-[#3B82F6]/12 px-1 py-0.5 font-medium text-[#1D4ED8]">
        {"{{first_name}}"}
      </span>
      , your VIP early access is live for 24h. Extra 20% off ends tonight —{" "}
      <span className="rounded bg-emerald-100 px-1 py-0.5 font-medium text-emerald-700">
        fltc.co/vip
      </span>
      . Reply STOP to opt out.
    </>
  )

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

      {/* Floating audience chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Users className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          {audience.toLocaleString()} recipients
        </span>
      </motion.div>

      {/* Floating compliance chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <ShieldCheck className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          STOP/HELP handled
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
            app.floatchat.com · sms-broadcast
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
            <Hash className="h-2.5 w-2.5" /> 10DLC
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Composer + segment rail */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white border-r border-slate-200">
            {/* Campaign header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                  <Radio className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    VIP Flash Sale · SMS
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Sender ID · FLOATCHT
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-medium ${
                    phase === "done"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : phase === "sending"
                      ? "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#1D4ED8]"
                      : "bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                >
                  {phase === "done" ? (
                    <>
                      <CheckCircle2 className="h-2.5 w-2.5" /> Sent
                    </>
                  ) : phase === "sending" ? (
                    <>
                      <Send className="h-2.5 w-2.5" /> Sending
                    </>
                  ) : phase === "queued" ? (
                    <>
                      <Clock className="h-2.5 w-2.5" /> Queued
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-2.5 w-2.5" /> Draft
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Message body */}
            <div className="px-4 py-3 space-y-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                  Message
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                  <p className="text-[11px] text-[#0F2A4A] leading-relaxed">
                    {messagePreview}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 pt-2 border-t border-slate-200/70">
                    <span className="inline-flex items-center gap-1 text-[9px] text-slate-500">
                      <Link2 className="h-2.5 w-2.5 text-[#1D4ED8]" /> link
                      tracked
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] text-slate-500">
                      <Sparkles className="h-2.5 w-2.5 text-[#1D4ED8]" /> 1
                      merge field
                    </span>
                    <span className="ml-auto font-mono text-[9px] text-slate-400">
                      148 / 160 · 1 SMS
                    </span>
                  </div>
                </div>
              </div>

              {/* Segment builder */}
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                  Audience segment
                </p>
                <div className="space-y-1.5">
                  {[
                    { label: "Tag = VIP", meta: "31,204" },
                    { label: "Opted-in = true", meta: "28,902" },
                    { label: "Country = US · 10DLC", meta: "24,810" },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5"
                    >
                      <Filter
                        className={`h-3 w-3 shrink-0 ${
                          i === 2 ? "text-[#1D4ED8]" : "text-slate-400"
                        }`}
                      />
                      <span className="text-[10px] text-[#0F2A4A]">
                        {s.label}
                      </span>
                      <span className="ml-auto font-mono text-[9.5px] text-slate-500">
                        {s.meta}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1.5 rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1.5">
                  <Users className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#1D4ED8]">
                    {audience.toLocaleString()} recipients
                  </span>
                  <span className="ml-auto text-[9px] text-slate-500">
                    after suppression
                  </span>
                </div>
              </div>
            </div>

            {/* Composer footer / send */}
            <div className="mt-auto border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
                <Gauge className="h-3 w-3 text-slate-400" /> 120 msg/s
              </div>
              <div className="ml-auto inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-3 py-1.5">
                <Send className="h-3 w-3" />
                <span className="text-[10px] font-medium">
                  {phase === "done" ? "Broadcast sent" : "Broadcast"}
                </span>
              </div>
            </div>
          </section>

          {/* Delivery / opt-out stats panel */}
          <aside className="col-span-12 md:col-span-5 bg-slate-50/50 flex flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Live delivery
              </p>
            </div>

            {/* Progress bar */}
            <div className="px-3 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9.5px] text-slate-500">
                  {sent.toLocaleString()} / {audience.toLocaleString()}
                </span>
                <span className="text-[9.5px] font-semibold text-[#1D4ED8] tabular-nums">
                  {progress}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.07 }}
                />
              </div>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-2 px-3 py-3">
              <StatCell
                Icon={CheckCircle2}
                tone="emerald"
                value={delivered.toLocaleString()}
                label="Delivered"
              />
              <StatCell
                Icon={Link2}
                tone="blue"
                value={clicks.toLocaleString()}
                label="Link clicks"
              />
              <StatCell
                Icon={Ban}
                tone="slate"
                value={optOut.toLocaleString()}
                label="STOP opt-outs"
              />
              <StatCell
                Icon={Gauge}
                tone="blue"
                value="98.2%"
                label="Delivery rate"
              />
            </div>

            {/* Reply → inbox handoff */}
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-lg border border-[#3B82F6]/25 bg-white px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Inbox className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Reply · answered by AI
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                      “Does VIP stack with free shipping?” — agentic AI replied
                      in 4s, no agent needed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {phase !== "done" && (
                <p className="text-[9.5px] text-slate-400 leading-snug">
                  Every reply opens a two-way thread your AI agent can answer —
                  automatically.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function StatCell({
  Icon,
  value,
  label,
  tone,
}: {
  Icon: typeof CheckCircle2
  value: string
  label: string
  tone: "emerald" | "blue" | "slate"
}) {
  const toneMap = {
    emerald: { icon: "text-emerald-600", bg: "bg-emerald-50" },
    blue: { icon: "text-[#1D4ED8]", bg: "bg-[#EAF2FF]" },
    slate: { icon: "text-slate-500", bg: "bg-slate-100" },
  }
  const t = toneMap[tone]
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
      <div
        className={`h-6 w-6 rounded-md ${t.bg} flex items-center justify-center mb-1.5`}
      >
        <Icon className={`h-3 w-3 ${t.icon}`} />
      </div>
      <p className="text-[15px] font-semibold text-[#0F2A4A] tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-1 text-[9px] text-slate-500">{label}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function CampaignVisual() {
  const steps = [
    { label: "Upload / segment list", done: true },
    { label: "Schedule window", done: true },
    { label: "Throughput 120 msg/s", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Radio className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Campaign manager
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">at scale</span>
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
              live
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function PersonalizationVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Merge + track
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Link2 className="h-2.5 w-2.5" /> click tracking
        </span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <p className="text-[10px] text-[#0F2A4A] leading-snug">
          Hi{" "}
          <span className="rounded bg-[#3B82F6]/12 px-1 font-medium text-[#1D4ED8]">
            {"{{first_name}}"}
          </span>
          , your order shipped —{" "}
          <span className="rounded bg-emerald-100 px-1 font-medium text-emerald-700">
            fltc.co/t
          </span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 text-center">
          <p className="text-[12px] font-semibold text-[#1D4ED8] tabular-nums">
            16.4%
          </p>
          <p className="text-[8px] text-slate-500">click rate</p>
        </div>
        <div className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 text-center">
          <p className="text-[12px] font-semibold text-emerald-700 tabular-nums">
            4,062
          </p>
          <p className="text-[8px] text-slate-500">clicks</p>
        </div>
      </div>
    </div>
  )
}

function ComplianceVisual() {
  const rows = [
    { kw: "STOP", note: "unsubscribe + suppress", Icon: Ban },
    { kw: "HELP", note: "auto info reply", Icon: ShieldCheck },
    { kw: "START", note: "re-opt-in", Icon: Check },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Compliance built in
        </span>
        <span className="text-[8.5px] text-slate-400">by default</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.kw}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="font-mono text-[9px] font-semibold text-[#0F2A4A] w-9">
            {r.kw}
          </span>
          <r.Icon className="h-3 w-3 text-emerald-600 shrink-0" />
          <span className="text-[9px] text-slate-500 truncate">{r.note}</span>
          <CheckCircle2 className="ml-auto h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function DeliveryVisual() {
  const bars = [72, 88, 64, 96, 80, 91]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <BarChart3 className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Delivery insight
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">
          per campaign
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-16 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[9px]">
        <span className="text-slate-500">Delivery receipts</span>
        <span className="font-semibold text-emerald-700">98.2% landed</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Feature card data (mini-visuals) — "What you get"
─────────────────────────────────────────────────────────────── */

const featureCards = [
  {
    Icon: Radio,
    title: "Campaign manager.",
    body: "Upload or segment lists, schedule a send window, and broadcast at scale with throughput management that respects carrier limits.",
    visual: <CampaignVisual />,
  },
  {
    Icon: Link2,
    title: "Personalization and tracking.",
    body: "Merge fields personalize every message, links get automatically shortened, and click tracking shows exactly who engaged with each campaign.",
    visual: <PersonalizationVisual />,
  },
  {
    Icon: ShieldCheck,
    title: "Compliance built in.",
    body: "STOP and HELP opt-out handling plus suppression lists keep you A2P-compliant by default — no manual list scrubbing before every send.",
    visual: <ComplianceVisual />,
  },
  {
    Icon: BarChart3,
    title: "Delivery insight.",
    body: "Delivery receipts and per-campaign reporting show exactly what landed, what bounced, and what converted — down to the message.",
    visual: <DeliveryVisual />,
  },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Do you support 10DLC and short codes?",
    answer:
      "Yes. A2P SMS broadcasting on FloatChat supports 10DLC registered numbers, dedicated short codes, and alphanumeric sender IDs. We help you register the right sending profile for your volume and use case so campaigns clear carrier filtering and deliver reliably.",
  },
  {
    question: "Can AI answer SMS replies?",
    answer:
      "Yes, automatically. The moment a recipient replies to a broadcast, it opens a two-way conversation in the shared inbox where your agentic AI agent answers — grounded in your business data — and hands off to a human with full context when needed. A broadcast stops being a one-way blast and becomes a conversation.",
  },
  {
    question: "Are opt-outs handled for me?",
    answer:
      "Yes. STOP, HELP, and START keywords are handled by default. STOP instantly unsubscribes a recipient and adds them to a suppression list that every future campaign respects, HELP triggers an automatic info reply, and START re-opts a customer in. You stay compliant without scrubbing lists by hand.",
  },
  {
    question: "How do personalization and link tracking work?",
    answer:
      "Insert merge fields like a first name or order number anywhere in the message, and each recipient gets a message written for them. Any link you drop in is automatically shortened and tracked, so you see click-through per campaign and per contact alongside delivery data.",
  },
  {
    question: "How do I know what was delivered?",
    answer:
      "Every campaign returns carrier delivery receipts, so you see delivered, failed, and pending counts in real time, plus per-campaign reporting for delivery rate, opt-outs, and link clicks. Nothing disappears into a black box after you hit send.",
  },
  {
    question: "Does SMS share the platform with my other channels?",
    answer:
      "Yes. SMS broadcasting runs on the same platform as WhatsApp broadcasting, RCS, voice, and your AI agent, tied together by a single customer record. A contact you reach by SMS today is the same record your team sees on WhatsApp tomorrow — one history, one inbox.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "A2P SMS Broadcasting",
  serviceType: "Bulk A2P SMS campaign broadcasting",
  description:
    "Send bulk A2P SMS campaigns with list segmentation, personalization, link tracking, STOP/HELP opt-out handling, and delivery receipts — with replies answered by agentic AI in a shared inbox.",
  url: "https://www.floatchat.com/channels/sms-broadcasting",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Marketing, growth, and customer engagement teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related channels + related products
─────────────────────────────────────────────────────────────── */

const relatedChannels = [
  {
    to: "/channels/whatsapp-broadcasting",
    Icon: SiWhatsapp,
    brand: "#25D366",
    title: "WhatsApp Broadcasting",
    body: "Rich, opt-in broadcasts with media, buttons, and two-way replies.",
  },
  {
    to: "/channels/rcs-broadcasting",
    Icon: MessageSquare,
    brand: "#1D4ED8",
    title: "RCS Broadcasting",
    body: "Branded, verified messaging with carousels and suggested replies.",
  },
  {
    to: "/numbers/did",
    Icon: Phone,
    brand: "#3B82F6",
    title: "DID Numbers",
    body: "Provision local and toll-free numbers for two-way SMS and voice.",
  },
]

const relatedProducts = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: Inbox },
  { to: "/integrations", label: "Integrations", Icon: Zap },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function SmsBroadcastingPage() {
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
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }} />
            <div className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }} />
            <div className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)" }} />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
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
                  <MessageSquare className="h-3.5 w-3.5" />
                  A2P SMS Broadcasting · answered by agentic AI
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  A2P SMS broadcasting,{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    answered by agentic AI.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Upload or segment a list, personalize, schedule, and send bulk
                  SMS at scale — then let agentic AI handle every reply in the
                  same inbox.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Bulk SMS at scale",
                    "10DLC & short codes",
                    "STOP/HELP handled",
                    "Delivery receipts",
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
                  The channel that reaches every phone — now with AI.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <SmsCampaignComposer />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Radio, value: "Bulk", label: "SMS at scale, managed throughput" },
                { Icon: Hash, value: "10DLC", label: "& short code support" },
                { Icon: ShieldCheck, value: "STOP", label: "& HELP handling built in" },
                { Icon: CheckCircle2, value: "Receipts", label: "delivery confirmed per message" },
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
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <BlurFade className="lg:col-span-6">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  SMS reaches every phone. Most tools only send.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    SMS still lands where nothing else can — no app to install,
                    no data plan required, opened within minutes. For a flash
                    sale, a shipping alert, or an appointment reminder, nothing
                    beats a text.
                  </p>
                  <p>
                    But most bulk SMS tools are one-way megaphones. They fire the
                    blast and stop there. When a customer replies —{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      &ldquo;does this stack with my coupon?&rdquo;
                    </span>{" "}
                    — the message goes nowhere, or lands in an inbox no one
                    watches.
                  </p>
                  <p>
                    FloatChat turns every SMS broadcast into a two-way
                    conversation your{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI can carry
                    </span>{" "}
                    — so the reply gets answered, not lost.
                  </p>
                </div>
              </BlurFade>

              {/* one-way vs two-way contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A one-way blaster
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Fires the send, then goes silent",
                        "Replies vanish into an unwatched inbox",
                        "Opt-outs scrubbed by hand before each blast",
                        "No idea what actually got delivered",
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
                      A two-way channel
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Every reply opens a live conversation",
                        "Agentic AI answers instantly, then hands off",
                        "STOP/HELP and suppression handled by default",
                        "Delivery receipts on every message",
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
                <SectionEyebrow num="02" label="What's included" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Everything a bulk SMS campaign needs.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From the first list upload to the last delivery receipt —
                  segmentation, personalization, compliance, and reporting in
                  one place.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featureCards.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <f.Icon
                          className="h-5 w-5 text-white"
                          strokeWidth={2.25}
                        />
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

        {/* ───── WHERE SMS MEETS AGENTIC AI ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Where SMS meets AI" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The broadcast is only half of it.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A reply opens a two-way conversation in the inbox, where
                  agentic AI answers and your team steps in. One platform runs
                  the campaign{" "}
                  <span className="font-semibold text-[#0F2A4A]">and</span> the
                  conversation that follows.
                </p>
              </BlurFade>
            </div>

            {/* four-step flow band */}
            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: Send,
                      title: "Broadcast goes out",
                      note: "segmented, personalized",
                    },
                    {
                      Icon: MessageSquare,
                      title: "Customer replies",
                      note: "a question, an order",
                    },
                    {
                      Icon: Sparkles,
                      title: "Agentic AI answers",
                      note: "grounded, in seconds",
                    },
                    {
                      Icon: Users,
                      title: "Human steps in",
                      note: "with full context",
                    },
                  ].map((step, i, arr) => (
                    <div
                      key={step.title}
                      className="flex-1 flex items-center gap-3"
                    >
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

            {/* supporting cards */}
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Inbox,
                  title: "One shared inbox.",
                  body: "Broadcast replies land beside every other channel, so no message sits unread in a send-only tool.",
                },
                {
                  Icon: Sparkles,
                  title: "Answered automatically.",
                  body: "Your agentic AI agent replies grounded in your data — resolving the routine questions a broadcast always triggers.",
                },
                {
                  Icon: GitBranch,
                  title: "Escalates with context.",
                  body: "When a reply needs a person, it hands off in-thread with the campaign, the customer record, and the full history.",
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
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Broadcast SMS and let AI handle the replies."
          body="Segment a list, personalize, and send at scale — go live in days, no per-message reply fees."
          primaryLabel="Start Broadcasting"
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
                  One record. Every channel. One conversation.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  SMS broadcasting shares the platform with WhatsApp, RCS, voice,
                  and your AI agent — so a single customer record ties it all
                  together.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Zap,
                  title: "Reaches every phone.",
                  body: "SMS needs no app, no data, no opt-in beyond consent — it lands where richer channels can't, and gets opened within minutes.",
                },
                {
                  Icon: ListChecks,
                  title: "Same platform, no silos.",
                  body: "Run the campaign and the conversation in one place. The SMS contact today is the WhatsApp contact tomorrow — one history.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Compliant by default.",
                  body: "10DLC and short code support, STOP/HELP handling, and suppression lists keep every send clean without manual scrubbing.",
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

            {/* Why FloatChat dark strip */}
            <BlurFade delay={0.2}>
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 lg:p-9 text-white relative overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                    The whole picture
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Send bulk A2P SMS at scale, track every link and delivery
                    receipt, stay compliant with STOP and HELP handling — and
                    have agentic AI answer the replies that follow, all on one
                    platform.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Related channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  More ways to reach your customers.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  SMS is one channel on the platform. Pair it with WhatsApp, RCS,
                  and your own numbers — the same customer record follows every
                  one.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedChannels.map((c, i) => (
                <BlurFade key={c.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={c.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center shadow-md"
                      style={{ background: c.brand }}
                    >
                      <c.Icon
                        className="h-5 w-5 text-white"
                        style={{ color: "#fff", width: 20, height: 20 }}
                      />
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
            </div>

            {/* related products chips */}
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
              description="Straight answers about sending, compliance, and AI-handled replies."
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
                    to="/pricing"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    pricing
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 40%, rgba(191,219,254,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span aria-hidden="true" className="absolute top-0 left-8 right-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #A5F3FC 80%, transparent)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70" style={{ background: "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(96,165,250,0.18) 50%, transparent 75%)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50" style={{ background: "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)" }} />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50" style={{ background: "radial-gradient(closest-side, rgba(165,243,252,0.4), transparent 70%)" }} />

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
                  Broadcasts sending with 10DLC & short codes
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
                <span className="text-[11px] font-mono text-slate-400">
                  / START
                </span>
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                  Answered by agentic AI
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Broadcast SMS and let{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  AI handle the replies.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Segment a list, personalize, and send bulk A2P SMS at scale —
                with delivery receipts, STOP/HELP handling, and every reply
                answered by agentic AI.
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
                  Start Broadcasting
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
                "Bulk SMS at scale",
                "10DLC & short codes",
                "STOP/HELP handling",
                "Delivery receipts",
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
