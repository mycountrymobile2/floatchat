"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  AtSign,
  Tag,
  Bot,
  AlertTriangle,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

const WA_GREEN = "#25D366"
const WA_DARK = "#075E54"
const WA_TEAL = "#128C7E"

/* ─────────────────────────────────────────────────────────────
   Hero: WhatsApp-themed chat in a phone frame
─────────────────────────────────────────────────────────────── */

function WhatsAppMockup() {
  // 0 empty · 1 customer Q · 2 captain typing · 3 captain reply 1 ·
  // 4 customer follow-up · 5 captain typing · 6 captain reply 2
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(600)
        if (cancelled) return
        setPhase(1)
        await wait(1500)
        if (cancelled) return
        setPhase(2)
        await wait(1100)
        if (cancelled) return
        setPhase(3)
        await wait(1800)
        if (cancelled) return
        setPhase(4)
        await wait(1600)
        if (cancelled) return
        setPhase(5)
        await wait(900)
        if (cancelled) return
        setPhase(6)
        await wait(3000)
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
            "radial-gradient(closest-side, rgba(37,211,102,0.3), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div
          className="h-4 w-4 rounded-full flex items-center justify-center"
          style={{ background: WA_GREEN }}
        >
          <FaWhatsapp className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Two-way · <span style={{ color: WA_GREEN }}>free forever</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          AI Captain on WhatsApp
        </span>
      </motion.div>

      {/* Phone frame */}
      <div className="flex justify-center">
        <div className="relative w-[280px] sm:w-[320px] h-[540px] sm:h-[580px] rounded-[40px] border-[8px] border-slate-900 bg-white shadow-[0_30px_60px_-25px_rgba(15,42,74,0.4)] overflow-hidden">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1.5 w-20 rounded-full bg-slate-900 z-10" />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-5 pt-2 text-[10px] font-semibold text-white z-10"
            style={{ background: WA_DARK }}>
            <span>9:41</span>
            <span className="font-mono text-[9px]">5G</span>
          </div>

          {/* WA header */}
          <div className="absolute top-8 left-0 right-0 px-3 py-2 flex items-center gap-2"
            style={{ background: WA_TEAL }}>
            <div className="relative">
              <img
                src="https://i.pravatar.cc/80?img=26"
                alt="Atelier Linen"
                loading="lazy"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2"
                style={{ ["--tw-ring-color" as string]: WA_TEAL }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate">
                Atelier Linen
              </p>
              <p className="text-[9.5px] text-white/80">
                online · typically replies in 2m
              </p>
            </div>
            <FaWhatsapp className="h-4 w-4 text-white/80" />
          </div>

          {/* Chat body with WA pattern */}
          <div
            className="absolute top-[88px] bottom-[60px] left-0 right-0 px-3 py-4 overflow-hidden flex flex-col justify-end gap-2"
            style={{
              background: "#E5DDD5",
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.06) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          >
            <AnimatePresence initial={false}>
              {/* 1 — Customer Q */}
              {phase >= 1 && (
                <motion.div
                  key="cust1"
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.6 }}
                  className="flex justify-start"
                >
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                    <p className="text-[11px] text-[#0F2A4A] leading-snug">
                      Hey! Is the linen tee in stock in size M?
                    </p>
                    <p className="text-[8.5px] text-slate-400 text-right mt-0.5">
                      9:40 ✓✓
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 2 — Captain typing (first reply) */}
              {phase === 2 && (
                <motion.div
                  key="typ1"
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-end"
                >
                  <div
                    className="rounded-lg rounded-tr-sm px-3 py-2 shadow-sm flex items-center gap-1 relative"
                    style={{ background: "#DCF8C6" }}
                  >
                    <div className="absolute -top-1.5 right-2 inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
                      <Sparkles className="h-2 w-2" />
                      Captain
                    </div>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: WA_TEAL }}
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3 — Captain reply 1 */}
              {phase >= 3 && (
                <motion.div
                  key="cap1"
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.6 }}
                  className="flex justify-end"
                >
                  <div
                    className="rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[80%] shadow-sm relative"
                    style={{ background: "#DCF8C6" }}
                  >
                    <div className="absolute -top-1.5 right-2 inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
                      <Sparkles className="h-2 w-2" />
                      Captain
                    </div>
                    <p className="text-[11px] text-[#0F2A4A] leading-snug mt-1">
                      Yes! M is available, ships today 📦
                    </p>
                    <p className="text-[8.5px] text-slate-500 text-right mt-0.5">
                      9:41 <span style={{ color: WA_GREEN }}>✓✓</span>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 4 — Customer follow-up */}
              {phase >= 4 && (
                <motion.div
                  key="cust2"
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.6 }}
                  className="flex justify-start"
                >
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                    <p className="text-[11px] text-[#0F2A4A] leading-snug">
                      Perfect — ordering now! 🙌
                    </p>
                    <p className="text-[8.5px] text-slate-400 text-right mt-0.5">
                      9:41 ✓✓
                    </p>
                  </div>
                </motion.div>
              )}

              {/* 5 — Captain typing (second reply) */}
              {phase === 5 && (
                <motion.div
                  key="typ2"
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-end"
                >
                  <div
                    className="rounded-lg rounded-tr-sm px-3 py-2 shadow-sm flex items-center gap-1 relative"
                    style={{ background: "#DCF8C6" }}
                  >
                    <div className="absolute -top-1.5 right-2 inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
                      <Sparkles className="h-2 w-2" />
                      Captain
                    </div>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: WA_TEAL }}
                        animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 6 — Captain reply 2 */}
              {phase >= 6 && (
                <motion.div
                  key="cap2"
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.6 }}
                  className="flex justify-end"
                >
                  <div
                    className="rounded-lg rounded-tr-sm px-2.5 py-1.5 max-w-[80%] shadow-sm relative"
                    style={{ background: "#DCF8C6" }}
                  >
                    <div className="absolute -top-1.5 right-2 inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
                      <Sparkles className="h-2 w-2" />
                      Captain
                    </div>
                    <p className="text-[11px] text-[#0F2A4A] leading-snug mt-1">
                      Awesome 🎉 I'll send tracking shortly.
                    </p>
                    <p className="text-[8.5px] text-slate-500 text-right mt-0.5">
                      9:42 <span style={{ color: WA_GREEN }}>✓✓</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div className="absolute bottom-0 left-0 right-0 px-2 py-2 flex items-center gap-2 bg-[#F0F0F0]">
            <div className="flex-1 h-8 rounded-full bg-white border border-slate-200 px-3 flex items-center">
              <span className="text-[10px] text-slate-400">Message</span>
            </div>
            <button
              className="h-8 w-8 rounded-full flex items-center justify-center shadow"
              style={{ background: WA_GREEN }}
            >
              <FaWhatsapp className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({
  num,
  label,
  tone = "blue",
}: {
  num: string
  label: string
  tone?: "blue" | "green"
}) {
  const color = tone === "green" ? WA_GREEN : "#3B82F6"
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-slate-300" />
      <span
        className="text-[11px] uppercase tracking-[0.2em] font-medium"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Chat-bubble feature cards (WhatsApp-themed unique pattern)
─────────────────────────────────────────────────────────────── */

function BubbleCard({
  title,
  body,
  Icon,
  side,
}: {
  title: string
  body: string
  Icon: React.ComponentType<{ className?: string }>
  side: "left" | "right"
}) {
  const isLeft = side === "left"
  return (
    <div className={`flex ${isLeft ? "justify-start" : "justify-end"} group`}>
      <div
        className={`relative max-w-[440px] w-full rounded-2xl px-5 py-5 shadow-[0_15px_40px_-20px_rgba(15,42,74,0.2)] transition-all duration-300 group-hover:shadow-[0_25px_50px_-20px_rgba(15,42,74,0.3)] group-hover:-translate-y-1 ${
          isLeft
            ? "rounded-tl-sm bg-white border border-slate-200"
            : "rounded-tr-sm border"
        }`}
        style={
          !isLeft
            ? {
                background: "#DCF8C6",
                borderColor: "rgba(37,211,102,0.3)",
              }
            : undefined
        }
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 shadow ${
              isLeft
                ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]"
                : ""
            }`}
            style={
              !isLeft
                ? { background: `linear-gradient(135deg, ${WA_GREEN}, ${WA_TEAL})` }
                : undefined
            }
          >
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-[#0F2A4A] leading-tight flex-1">
            {title}
          </h3>
        </div>
        <p className="text-[13.5px] text-slate-600 leading-relaxed">{body}</p>
        <p className="mt-3 text-[9px] text-slate-400 text-right font-mono">
          9:41 ✓✓
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Content + FAQ
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Will FloatChat add WhatsApp Business API later?",
    answer:
      "WhatsApp Cloud API integration is on the roadmap for Pro and Enterprise tiers. No firm date.",
  },
  {
    question:
      "Can I send appointment reminders or order updates on WhatsApp?",
    answer:
      "Only as a reply within an open conversation (24-hour window after customer initiates). Not as outbound templates.",
  },
  {
    question: "What WhatsApp number do I use?",
    answer:
      "Your existing WhatsApp Business account or a new one. We connect via API.",
  },
  {
    question: "Does the AI Captain work on WhatsApp?",
    answer: "Yes, on Lite ($9.99) and above.",
  },
]

const notAvailable = [
  {
    title: "No WhatsApp Business API (BSP).",
    desc:
      "We are not a WhatsApp Business Solution Provider. We connect via API integration, but we don't have BSP-level access to Meta's templating and broadcasting infrastructure.",
  },
  {
    title: "No WhatsApp template messages.",
    desc:
      "Cannot send marketing or notification templates. Only two-way customer service messaging within the 24-hour window after the customer initiates contact.",
  },
  {
    title: "No WhatsApp marketing broadcasts.",
    desc:
      "Cannot send mass messages to lists. WhatsApp marketing requires WABA which FloatChat does not have.",
  },
]

const rightFor = [
  "Small business that wants WhatsApp as another customer service channel",
  "D2C brand that gets occasional WhatsApp messages from customers",
  "SaaS company that wants WhatsApp support alongside chat and email",
  "Anyone who already does most outreach via SMS or email and wants WhatsApp as an option",
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function WhatsAppPage() {
  useEffect(() => {
    document.title = "WhatsApp Customer Service. Free on FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Two-way WhatsApp customer conversations, free forever. Not a Business Solution Provider. No template messages or marketing broadcasts.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5FFF7] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(37,211,102,0.35) 0%, transparent 70%)",
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
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(18,140,126,0.35) 0%, transparent 70%)",
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
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "rgba(37,211,102,0.4)",
                    background: "rgba(37,211,102,0.08)",
                    color: WA_TEAL,
                  }}
                >
                  <FaWhatsapp className="h-3.5 w-3.5" />
                  WhatsApp · two-way, free on every plan
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  WhatsApp customer service.{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${WA_GREEN}, ${WA_TEAL})`,
                    }}
                  >
                    Free on FloatChat.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Two-way customer conversations on WhatsApp, in the same inbox
                  as live chat and email. Free forever.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Free plan",
                    "Two-way only",
                    "Same inbox as chat + email",
                    "1 WhatsApp number",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5" style={{ color: WA_GREEN }} />
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
                        background: `radial-gradient(circle, ${WA_GREEN} 0%, transparent 70%)`,
                      }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.55)] ring-4 transition-all"
                      style={{
                        background: `linear-gradient(to right, ${WA_GREEN}, ${WA_TEAL})`,
                        ["--tw-ring-color" as string]: "rgba(37,211,102,0.15)",
                      }}
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
                    Book a Demo
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
                    <span className="font-semibold">Important:</span> FloatChat
                    is not a WhatsApp Business Solution Provider. Read the
                    limits below.
                  </span>
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <WhatsAppMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT WORKS — chat bubble cards ───── */}
        <section
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, #F0FFF4 0%, #FFFFFF 50%, #F5F7FF 100%)",
          }}
        >
          <div
            className="absolute inset-0 -z-10 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="What works" tone="green" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What works on{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${WA_GREEN}, ${WA_TEAL})`,
                    }}
                  >
                    FloatChat.
                  </span>
                </h2>
              </BlurFade>
            </div>

            <div className="space-y-6">
              <BlurFade>
                <BubbleCard
                  side="left"
                  Icon={FaWhatsapp}
                  title="Two-way customer conversations."
                  body="Customer messages your WhatsApp number. Reply from the FloatChat inbox. Same agent dashboard as your live chat and email."
                />
              </BlurFade>
              <BlurFade delay={0.1}>
                <BubbleCard
                  side="right"
                  Icon={AtSign}
                  title="Internal notes and assignments."
                  body="Your team can collaborate on WhatsApp threads with notes, mentions, and assignments."
                />
              </BlurFade>
              <BlurFade delay={0.2}>
                <BubbleCard
                  side="left"
                  Icon={Bot}
                  title="AI Captain on WhatsApp (paid plans)."
                  body="Captain replies on WhatsApp the same way it does on chat and email. Available from Lite ($9.99) for basic, Starter ($19.99) for full Captain."
                />
              </BlurFade>
              <BlurFade delay={0.3}>
                <BubbleCard
                  side="right"
                  Icon={Tag}
                  title="Tags and routing."
                  body="Tag conversations, route by tag, build SLAs around WhatsApp specifically."
                />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT DOES NOT WORK — dark red callout ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="The honest list" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What does{" "}
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    NOT
                  </span>{" "}
                  work on FloatChat.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Read carefully before signing up if you need these features.
                  We'd rather lose the lead than break the promise.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0F2A4A] via-[#1E1B4B] to-[#1F2937] p-7 lg:p-9 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(15,42,74,0.5)]">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 bg-red-500" />
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20 bg-rose-400" />
                  <div className="relative space-y-5">
                    {notAvailable.map((n) => (
                      <div key={n.title} className="flex gap-3">
                        <span className="mt-0.5 h-7 w-7 rounded-full bg-red-500/15 border border-red-400/40 flex items-center justify-center shrink-0">
                          <X className="h-3.5 w-3.5 text-red-300" strokeWidth={3} />
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-white text-sm">
                            {n.title}
                          </p>
                          <p className="mt-1 text-[13px] text-white/75 leading-relaxed">
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHO IT'S RIGHT FOR / NOT FOR ───── */}
        <section
          className="relative py-20 lg:py-28 overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, #F5F7FF 0%, #FFFFFF 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Right fit" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Who FloatChat WhatsApp is for.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Customer service, not marketing. If you need BSP-grade
                  campaigns, look elsewhere.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Right for */}
              <BlurFade delay={0.1} className="lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center shadow"
                      style={{
                        background: `linear-gradient(135deg, ${WA_GREEN}, ${WA_TEAL})`,
                      }}
                    >
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: WA_TEAL }}
                    >
                      Right for
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {rightFor.map((r, i) => (
                      <motion.li
                        key={r}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="flex items-start gap-2.5"
                      >
                        <span
                          className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: WA_GREEN }}
                        >
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-[#0F2A4A] leading-relaxed">
                          {r}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              {/* Not for + $0 pull */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="flex flex-col gap-6 h-full">
                  <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-700">
                        Not for
                      </p>
                    </div>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      If you need to send WhatsApp marketing broadcasts,
                      appointment-reminder templates, or run WABA-based
                      campaigns, you need a WhatsApp Business Solution Provider —
                      WATI, AiSensy, Interakt, or ChatMitra. FloatChat is not
                      the right tool for that use case.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 text-white overflow-hidden relative shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                    <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Free plan
                    </p>
                    <p className="mt-3 text-5xl lg:text-6xl font-medium tracking-tight">
                      $0
                    </p>
                    <p className="mt-2 text-sm text-white/80 leading-relaxed">
                      WhatsApp two-way customer conversations included.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Add WhatsApp two-way to your inbox"
          body="Customer service over WhatsApp, included on the Free plan."
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
              description="WABA, templates, Captain — straight answers."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(220,248,198,0.5) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(37,211,102,0.6) 30%, #93C5FD 60%, #C4B5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(37,211,102,0.25), rgba(147,197,253,0.2) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(37,211,102,0.3), transparent 70%)",
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
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: WA_GREEN }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: WA_GREEN }}
                  />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Two-way · same inbox as chat + email
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
                <span className="h-px w-8 bg-slate-300" />
                <span
                  className="text-[11px] uppercase tracking-[0.2em] font-medium"
                  style={{ color: WA_TEAL }}
                >
                  Free forever
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try WhatsApp{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${WA_GREEN}, ${WA_TEAL}, #06B6D4)`,
                  }}
                >
                  free.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Two-way customer conversations on WhatsApp, no credit card.
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
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, ${WA_GREEN}, ${WA_TEAL})`,
                  }}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Start Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Demo
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
                "Two-way only · no marketing",
                "1 WhatsApp number on Free",
                "AI Captain from Lite",
                "Same inbox as chat + email",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: WA_GREEN }}
                  />
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
