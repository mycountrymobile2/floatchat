"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  GitBranch,
  Inbox,
  ShoppingBag,
  Languages,
  ShieldCheck,
  UserCircle2,
  Workflow,
  Zap,
  History,
  Tag,
} from "lucide-react"
import {
  SiMessenger,
  SiInstagram,
  SiWhatsapp,
} from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

/* ─────────────────────────────────────────────────────────────
   Metadata (kept for parity with the rest of the site; applied
   to the DOM through usePageMeta below since this is a Vite SPA).
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title:
    "Facebook Messenger Support and Automation with Agentic AI | FloatChat",
  description:
    "Handle Facebook Messenger conversations in one inbox with agentic AI that answers 24/7 and routes the rest to your team.",
}

const MESSENGER_BLUE = "#0084FF"

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
   HERO MOCKUP — a Facebook Messenger conversation. Unlike the
   Instagram page (a DM list/grid), this is framed as a single
   full-height Messenger phone thread with a rounded status bar,
   an "AI answered · 24/7" badge floating over the AI bubble, and
   a "handed to agent" indicator that slides in near the bottom.
─────────────────────────────────────────────────────────────── */

type ThreadPhase = "asking" | "aiReplied" | "followUp" | "handoff"

function MessengerThreadMockup() {
  const [phase, setPhase] = useState<ThreadPhase>("asking")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("asking")
        await wait(1600)
        if (cancelled) return
        setPhase("aiReplied")
        await wait(2400)
        if (cancelled) return
        setPhase("followUp")
        await wait(2000)
        if (cancelled) return
        setPhase("handoff")
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showAiReply = phase !== "asking"
  const showAiBadge = phase === "aiReplied" || phase === "followUp"
  const showFollowUp = phase === "followUp" || phase === "handoff"
  const showHandoff = phase === "handoff"

  return (
    <div className="relative mx-auto max-w-[360px]">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[40px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.45), transparent 70%)",
        }}
      />

      {/* Floating "resolved 24/7" chip — top left, overlapping the frame */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-4 -left-5 z-30 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_10px_24px_-10px_rgba(15,42,74,0.25)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Answered in 6s · 24/7
        </span>
      </motion.div>

      {/* Floating "one inbox" chip — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="absolute -bottom-4 -right-5 z-30 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_10px_24px_-10px_rgba(15,42,74,0.25)]"
      >
        <Inbox className="h-3.5 w-3.5 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          One shared inbox
        </span>
      </motion.div>

      {/* Phone frame */}
      <div className="relative rounded-[34px] border border-slate-200 bg-white p-2.5 shadow-[0_40px_80px_-30px_rgba(15,42,74,0.4)]">
        <div className="relative rounded-[26px] overflow-hidden bg-[#F0F2F5] min-h-[540px] flex flex-col">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-5 w-24 rounded-full bg-slate-900/90" />

          {/* Messenger thread header */}
          <div className="relative z-10 flex items-center gap-2.5 px-4 pt-8 pb-3 bg-white border-b border-slate-200">
            <ArrowRight className="h-4 w-4 text-[#0084FF] rotate-180" />
            <div className="relative">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ background: MESSENGER_BLUE }}
              >
                <SiMessenger style={{ color: "#fff", width: 16, height: 16 }} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#0F2A4A] leading-tight truncate">
                Northwind Outdoors
              </p>
              <p className="text-[10px] text-slate-400 leading-tight">
                Active now · usually replies instantly
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]">
              <Sparkles className="h-2.5 w-2.5" /> AI on
            </span>
          </div>

          {/* Messages */}
          <div className="relative flex-1 px-3.5 py-4 space-y-2.5 overflow-hidden">
            {/* Customer question — right aligned, Messenger blue bubble */}
            <div className="flex justify-end">
              <div
                className="rounded-2xl rounded-br-md px-3 py-2 max-w-[78%] shadow-sm"
                style={{ background: MESSENGER_BLUE }}
              >
                <p className="text-[12px] text-white leading-snug">
                  Hey! Is the Ridgeline jacket back in stock in medium? And do
                  you ship to Canada?
                </p>
              </div>
            </div>

            {/* Typing / AI reply */}
            <AnimatePresence mode="wait">
              {!showAiReply ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-end gap-1.5"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-3 py-2">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400"
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
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ai-reply"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex items-end gap-1.5"
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-[12px] text-[#0F2A4A] leading-snug">
                      Yes! The Ridgeline in medium came back in stock this
                      morning, and we do ship to Canada (3–5 days). Want me to
                      hold one for you?
                    </p>
                  </div>

                  {/* "AI answered · 24/7" badge floating on the bubble */}
                  <AnimatePresence>
                    {showAiBadge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.85, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-2 left-8 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 shadow-sm"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5" /> AI answered · 24/7
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Follow-up from customer — the harder ask */}
            <AnimatePresence>
              {showFollowUp && (
                <motion.div
                  key="follow-up"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <div
                    className="rounded-2xl rounded-br-md px-3 py-2 max-w-[78%] shadow-sm"
                    style={{ background: MESSENGER_BLUE }}
                  >
                    <p className="text-[12px] text-white leading-snug">
                      Perfect. Also — my last order arrived with a broken zip.
                      Can someone sort a replacement?
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Handoff indicator */}
            <AnimatePresence>
              {showHandoff && (
                <motion.div
                  key="handoff"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border border-[#3B82F6]/25 bg-[#EAF2FF] px-3 py-2.5"
                >
                  <div className="flex items-center gap-1.5">
                    <GitBranch className="h-3 w-3 text-[#1D4ED8]" />
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                      Handed to agent · with context
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 pt-2 border-t border-[#3B82F6]/15">
                    <img
                      src="https://i.pravatar.cc/40?img=32"
                      alt="Support agent"
                      loading="lazy"
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <p className="text-[10px] text-[#0F2A4A] leading-snug">
                      <span className="font-semibold">Sofia</span> picked it up —
                      same thread, order + full history attached.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="relative z-10 border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
            <div className="flex-1 h-8 rounded-full bg-[#F0F2F5] px-3 flex items-center">
              <span className="text-[11px] text-slate-400">
                Aa — reply, note, or hand off…
              </span>
            </div>
            <button
              className="h-8 w-8 rounded-full flex items-center justify-center text-white"
              style={{ background: MESSENGER_BLUE }}
              aria-label="Send"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function InboxVisual() {
  const rows = [
    { Icon: SiMessenger, bg: MESSENGER_BLUE, label: "Messenger", note: "sizing question", unread: true },
    { Icon: SiInstagram, bg: "#E4405F", label: "Instagram", note: "story reply" },
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp", note: "order status" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Every DM · one queue
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> shared inbox
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span
            className="h-5 w-5 rounded flex items-center justify-center shrink-0"
            style={{ background: r.bg }}
          >
            <r.Icon style={{ color: "#fff", width: 11, height: 11 }} />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">{r.label}</span>
          <span className="ml-auto text-[9px] text-slate-500 truncate max-w-[80px]">
            {r.note}
          </span>
          {r.unread ? (
            <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF] shrink-0" />
          ) : (
            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function AnswerVisual() {
  const steps = [
    { label: "Read the question", done: true },
    { label: "Check stock + shipping", done: true },
    { label: "Reply in Messenger", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Zap className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Answers in seconds
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">24/7</span>
      </div>
      {steps.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
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

function RouteVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Sparkles className="h-3 w-3 text-[#3B82F6]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          Messenger thread · 9 messages
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-[#1D4ED8]" />
          <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
            Sofia · same thread
          </span>
        </div>
        <p className="mt-1 text-[9px] text-[#0F2A4A] leading-snug">
          Inherits the order, sentiment, and a short summary. No repeat
          questions.
        </p>
      </div>
    </div>
  )
}

function RecordVisual() {
  const facts = [
    { Icon: History, label: "12 chats", meta: "since Jan" },
    { Icon: ShoppingBag, label: "3 orders", meta: "$412" },
    { Icon: Tag, label: "VIP", meta: "tagged" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/40?img=15"
          alt="Customer"
          loading="lazy"
          className="h-7 w-7 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-[#0F2A4A] leading-tight">
            Jordan Reyes
          </p>
          <p className="text-[8.5px] text-slate-400 leading-tight">
            Messenger · Instagram · email
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
          <UserCircle2 className="h-2.5 w-2.5" /> unified
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center text-center gap-1"
          >
            <f.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[8.5px] font-medium text-[#0F2A4A] leading-tight">
              {f.label}
            </span>
            <span className="text-[7.5px] text-slate-400">{f.meta}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data — FAQs, schema, related links
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How does FloatChat connect to my Facebook Messenger?",
    answer:
      "You connect the Facebook Page your customers already message. FloatChat links to it through Meta's official Messenger API, so every incoming message lands in your FloatChat inbox and every reply — from the AI or from a teammate — goes back out through Messenger. There's nothing to install for your customers, and their experience inside the Messenger app doesn't change.",
  },
  {
    question: "Can the AI actually answer, or does it just tag conversations?",
    answer:
      "It answers. The agentic AI is grounded in your help center, product catalog, and policies, so it can reply to real questions — stock and sizing, shipping, order status, returns — 24/7 and in the customer's own language. When a message needs a person, it routes the thread to your team instead of guessing.",
  },
  {
    question: "What happens when a conversation needs a human?",
    answer:
      "The AI hands the Messenger thread to the right teammate inside the same conversation. Whoever picks it up inherits the full history, the linked order or account, and a short summary of what's already happened — so the customer never repeats themselves and the reply still goes out through Messenger.",
  },
  {
    question: "Do I keep one customer record across channels?",
    answer:
      "Yes. If the same person also messages you on Instagram, WhatsApp, or email, FloatChat ties those conversations to a single unified customer record. Your team sees one history — orders, tags, and past chats — no matter which channel the latest message arrived on.",
  },
  {
    question: "Will replies still feel like they come from our brand?",
    answer:
      "They do. You set the tone, the guardrails, and what the AI is allowed to do. Answers are grounded only in the sources you connect, so they stay accurate and on-brand — and anything outside those bounds is routed to your team rather than improvised.",
  },
  {
    question: "How long does it take to go live on Messenger?",
    answer:
      "Days, not months. Connect your Facebook Page, point the AI at your knowledge base and catalog, and set your handoff rules. There are no conversation flows to script and no code to write — most teams are answering real Messenger conversations within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Facebook Messenger Support and Automation",
  serviceType: "Agentic AI Facebook Messenger customer support",
  description:
    "Handle Facebook Messenger conversations in one inbox with agentic AI that answers 24/7 and routes the rest to your team, backed by a unified customer record across channels.",
  url: "https://www.floatchat.com/channels/messenger",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Customer support, social, and e-commerce teams",
  },
}

const relatedChannels = [
  {
    to: "/channels/instagram",
    Icon: SiInstagram,
    bg: "#E4405F",
    title: "Instagram DMs",
    body: "Answer DMs, story replies, and comments from the same inbox.",
    brand: true,
  },
  {
    to: "/channels/social",
    Icon: Users,
    bg: "",
    title: "All social channels",
    body: "Bring every social conversation together under one agent.",
    brand: false,
  },
  {
    to: "/channels/web-chat",
    Icon: MessageCircle,
    bg: "",
    title: "Web chat",
    body: "The same agentic AI, live on your website.",
    brand: false,
  },
]

const relatedLinks = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: Inbox },
  { to: "/integrations", label: "Integrations", Icon: Workflow },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function MessengerChannelPage() {
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <span
                    className="h-4 w-4 rounded-full flex items-center justify-center"
                    style={{ background: MESSENGER_BLUE }}
                  >
                    <SiMessenger style={{ color: "#fff", width: 9, height: 9 }} />
                  </span>
                  Facebook Messenger · powered by agentic AI
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Every Messenger chat,{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    answered in one inbox.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Handle Facebook Messenger conversations in one place with
                  agentic AI that answers customers 24/7 and routes the rest to
                  your team — with a unified customer record behind every reply.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "24/7 answers",
                    "Routes to the team",
                    "One customer record",
                    "Live in days",
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
                  Connect your Facebook Page and answer real conversations this
                  week — no code, no scripted flows.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <MessengerThreadMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Clock, value: "24/7", label: "coverage on Messenger" },
                { Icon: Zap, value: "< 10s", label: "typical first reply" },
                { Icon: CheckCircle2, value: "Most", label: "questions handled by AI" },
                { Icon: UserCircle2, value: "One", label: "record across every channel" },
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
                  Messenger never sleeps. Your team does.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    Customers treat your Facebook Page like a text thread — they
                    ask about stock at midnight, shipping on a Sunday, and where
                    their order is on a public holiday. Every hour you don&apos;t
                    reply, the intent cools and the sale drifts.
                  </p>
                  <p>
                    So the Page inbox becomes a second, disconnected queue.
                    Someone checks it between other tasks, replies land hours
                    late, and there&apos;s no link to the order, the past chat,
                    or the conversation the same person started on Instagram.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI answering in your main inbox
                    </span>{" "}
                    closes that gap: instant replies around the clock, and a
                    clean handoff to your team for everything that needs a human.
                  </p>
                </div>
              </BlurFade>

              {/* scattered vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Messenger, left alone
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Replies land hours after the question",
                        "No answers overnight or on weekends",
                        "No link to the order or past chats",
                        "A separate inbox nobody really owns",
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
                      Messenger, on FloatChat
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "AI answers in seconds, 24/7",
                        "Hard chats routed to the right person",
                        "Order and history attached to every thread",
                        "One inbox shared with the whole team",
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
                  Messenger, handled end to end.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four things you get the moment you connect your Facebook Page —
                  answering, routing, and remembering, all in one place.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Inbox,
                  title: "One inbox for every Messenger chat.",
                  body:
                    "All your Facebook Page conversations flow into a single shared inbox — alongside Instagram, WhatsApp, and web chat — so nothing sits unread in a corner of the platform.",
                  visual: <InboxVisual />,
                },
                {
                  Icon: Zap,
                  title: "Agentic AI that answers 24/7.",
                  body:
                    "Grounded in your catalog, help center, and policies, the AI replies to real questions — sizing, stock, shipping, order status — in seconds, at any hour, in the customer's language.",
                  visual: <AnswerVisual />,
                },
                {
                  Icon: GitBranch,
                  title: "Routes the rest to your team.",
                  body:
                    "When a message needs a person, the AI hands the thread over in-place — passing the order, the history, and a short summary so your teammate never starts from scratch.",
                  visual: <RouteVisual />,
                },
                {
                  Icon: UserCircle2,
                  title: "One unified customer record.",
                  body:
                    "The same person on Messenger, Instagram, and email is one profile — with orders, tags, and past chats attached — so every reply is informed, not a cold restart.",
                  visual: <RecordVisual />,
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

        {/* ───── WHY IT WORKS (flow) ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Answer instantly. Escalate cleanly.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The AI doesn&apos;t just decide whether to reply — it decides{" "}
                  <span className="font-semibold text-[#0F2A4A]">
                    what to carry
                  </span>{" "}
                  when it hands a conversation to a human.
                </p>
              </BlurFade>
            </div>

            {/* Four-step flow band */}
            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: SiMessenger, title: "Message arrives", note: "on your Page", brand: true },
                    { Icon: Sparkles, title: "AI answers", note: "grounded, 24/7", brand: false },
                    { Icon: GitBranch, title: "Routes if needed", note: "to the right person", brand: false },
                    { Icon: ShieldCheck, title: "Human replies", note: "with full context", brand: false },
                  ].map((step, i, arr) => (
                    <div key={step.title} className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 w-full">
                        <div
                          className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                          style={
                            step.brand
                              ? { background: MESSENGER_BLUE }
                              : { background: "#EAF2FF" }
                          }
                        >
                          {step.brand ? (
                            <step.Icon style={{ color: "#fff", width: 16, height: 16 }} />
                          ) : (
                            <step.Icon className="h-[18px] w-[18px] text-[#1D4ED8]" />
                          )}
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

            {/* Three supporting reasons */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "No conversation goes cold.",
                  body:
                    "Customers get a correct, grounded answer the moment they ask — no waiting for business hours, no drifting sale.",
                },
                {
                  Icon: Users,
                  title: "Your team only sees what needs them.",
                  body:
                    "Routine volume is absorbed by the AI, so people spend their time on the conversations that actually call for judgment.",
                },
                {
                  Icon: History,
                  title: "Nobody repeats themselves.",
                  body:
                    "Every handoff carries the order, the history, and a short summary — so escalations feel effortless, not like starting over.",
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
                    Messenger isn&apos;t a bolt-on. It runs on the same platform,
                    the same shared inbox, and the same customer record as every
                    other channel — so one conversation follows the customer
                    wherever they message you next.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/80">
                    {[
                      "Official Messenger API",
                      "Agentic AI, not a script",
                      "Live in days",
                    ].map((t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Turn your Facebook Page into a 24/7 support channel."
          body="Connect Messenger, point the AI at your catalog and help center, and go live in days — no scripted flows, no code."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="More channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One agent for every channel.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Messenger shares its inbox, its AI, and its customer record with
                  everywhere else your customers reach you.
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
                      style={
                        c.brand
                          ? { background: c.bg }
                          : {
                              backgroundImage:
                                "linear-gradient(to bottom right, #60A5FA, #1D4ED8)",
                            }
                      }
                    >
                      <c.Icon
                        className={c.brand ? "" : "h-5 w-5 text-white"}
                        style={
                          c.brand
                            ? { color: "#fff", width: 20, height: 20 }
                            : undefined
                        }
                        strokeWidth={c.brand ? undefined : 2.25}
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed flex-1">
                      {c.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8]">
                      Explore channel
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            {/* related links */}
            <BlurFade delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedLinks.map((p) => (
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
              title="Messenger, answered"
              description="Straight answers about connecting, automating, and handing off Facebook Messenger."
              footer={
                <p className="text-sm text-muted-foreground">
                  Still deciding?{" "}
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
                    plans and pricing
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
                  Answering Messenger conversations right now
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
                  No scripted flows
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Handle Messenger without{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  the late replies.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Connect your Facebook Page and let agentic AI answer around the
                clock — routing everything that needs a person straight to your
                team, in one inbox.
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
                "24/7 answers",
                "Routes to your team",
                "One customer record",
                "Official Messenger API",
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
