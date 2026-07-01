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
  Palette,
  Zap,
  Code2,
  MousePointerClick,
  ShoppingCart,
  Clock,
  Inbox,
  Layers,
  Bell,
  Smartphone,
  MessageSquare,
  GitBranch,
  ShieldCheck,
  Bot,
  Send,
} from "lucide-react"
import { SiInstagram } from "react-icons/si"
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
  title: "Website Live Chat Widget with Agentic AI | FloatChat",
  description:
    "Add a customizable web chat widget with agentic AI that answers visitors instantly, plus proactive triggers and an in-app SDK.",
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
   HERO MOCKUP — a website inside a browser frame with the FloatChat
   widget open in the corner. It cycles through:
     idle → proactive-trigger bubble → visitor typing → visitor msg
     → agent thinking → instant AI answer with a checkout action.
   The browser-window framing makes this hero distinct from the
   app/inbox mockups used elsewhere on the site.
─────────────────────────────────────────────────────────────── */

type WebPhase =
  | "idle"
  | "proactive"
  | "typing"
  | "sent"
  | "thinking"
  | "answered"

function WebChatMockup() {
  const [phase, setPhase] = useState<WebPhase>("idle")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("idle")
        await wait(900)
        if (cancelled) return
        setPhase("proactive")
        await wait(2200)
        if (cancelled) return
        setPhase("typing")
        await wait(1400)
        if (cancelled) return
        setPhase("sent")
        await wait(900)
        if (cancelled) return
        setPhase("thinking")
        await wait(1500)
        if (cancelled) return
        setPhase("answered")
        await wait(3200)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showProactive = phase === "proactive"
  const showTyping = phase === "typing"
  const showVisitorMsg =
    phase === "sent" || phase === "thinking" || phase === "answered"
  const showThinking = phase === "thinking"
  const showAnswer = phase === "answered"

  return (
    <div className="relative">
      {/* Glow behind */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.42), transparent 70%)",
        }}
      />

      {/* Floating "on your site" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-30 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <MessageCircle className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Widget live on your site
        </span>
      </motion.div>

      {/* Floating "answered in" chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="absolute -bottom-3 -left-3 z-30 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          AI answered · no wait
        </span>
      </motion.div>

      {/* ── BROWSER WINDOW ── */}
      <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Browser chrome: traffic lights + address bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-200 bg-slate-50/90">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="ml-2 flex-1 flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="font-mono text-[10px] text-slate-500 truncate">
              https://yourstore.com/checkout
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span className="h-1 w-3.5 rounded bg-slate-300" />
            <span className="h-1 w-3.5 rounded bg-slate-300" />
          </div>
        </div>

        {/* Faux website content (behind the widget) */}
        <div className="relative min-h-[440px] bg-gradient-to-b from-white to-slate-50/60">
          {/* mock nav */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]" />
              <span className="h-2.5 w-16 rounded bg-slate-200" />
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="h-2 w-10 rounded bg-slate-200" />
              <span className="h-2 w-10 rounded bg-slate-200" />
              <span className="h-2 w-10 rounded bg-slate-200" />
              <span className="h-6 w-14 rounded-md bg-[#EAF2FF]" />
            </div>
          </div>

          {/* mock checkout body — skeleton placeholders behind the widget */}
          <div className="px-5 py-5 grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-7 space-y-3">
              <div className="h-3 w-40 rounded bg-slate-200" />
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2.5">
                {[0, 1].map((r) => (
                  <div key={r} className="flex items-center gap-2.5">
                    <span className="h-9 w-9 rounded-md bg-slate-100" />
                    <div className="flex-1 space-y-1.5">
                      <span className="block h-2 w-28 rounded bg-slate-200" />
                      <span className="block h-2 w-16 rounded bg-slate-100" />
                    </div>
                    <span className="h-2.5 w-10 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
              <div className="h-9 rounded-lg bg-slate-200/70" />
            </div>
            <div className="hidden sm:block col-span-5 space-y-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
                <span className="block h-2.5 w-20 rounded bg-slate-200" />
                {["w-full", "w-4/5", "w-2/3"].map((w) => (
                  <span key={w} className={`block h-2 ${w} rounded bg-slate-100`} />
                ))}
                <div className="pt-1.5 h-8 rounded-md bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]" />
              </div>
            </div>
          </div>

          {/* dim overlay when the chat panel is open */}
          <AnimatePresence>
            {(showTyping || showVisitorMsg) && (
              <motion.div
                key="dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#0F2A4A]/5 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* ── PROACTIVE TRIGGER BUBBLE ── */}
          <AnimatePresence>
            {showProactive && (
              <motion.div
                key="proactive"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[86px] right-4 z-20 max-w-[220px]"
              >
                <div className="relative rounded-2xl rounded-br-sm bg-white border border-[#3B82F6]/20 px-3.5 py-2.5 shadow-[0_16px_36px_-16px_rgba(15,42,74,0.4)]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-semibold text-[#1D4ED8] uppercase tracking-wide">
                      <Zap className="h-2.5 w-2.5" /> Proactive
                    </span>
                  </div>
                  <p className="text-[12px] text-[#0F2A4A] leading-snug font-medium">
                    Need help checking out? I can answer in seconds. 👋
                  </p>
                  <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 bg-white border-b border-r border-[#3B82F6]/20" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── OPEN CHAT PANEL ── */}
          <AnimatePresence>
            {(showTyping || showVisitorMsg) && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[86px] right-4 z-20 w-[290px]"
              >
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_24px_50px_-20px_rgba(15,42,74,0.45)]">
                  {/* widget header */}
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]">
                    <div className="h-7 w-7 rounded-full bg-white/15 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-white leading-tight">
                        FloatChat Assistant
                      </p>
                      <p className="text-[9px] text-white/75 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                        Answers instantly
                      </p>
                    </div>
                    <span className="ml-auto text-white/70 text-lg leading-none">
                      ×
                    </span>
                  </div>

                  {/* messages */}
                  <div className="px-3 py-3 space-y-2 bg-slate-50/40 min-h-[168px]">
                    {/* greeting */}
                    <div className="flex items-start gap-1.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          Hi! Ask me anything about your order or checkout.
                        </p>
                      </div>
                    </div>

                    {/* visitor message */}
                    <AnimatePresence>
                      {showVisitorMsg && (
                        <motion.div
                          key="visitor"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex justify-end"
                        >
                          <div className="bg-[#3B82F6] rounded-xl rounded-br-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                            <p className="text-[11px] text-white leading-snug">
                              Do you ship to Canada, and how long does it take?
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* thinking */}
                    <AnimatePresence>
                      {showThinking && (
                        <motion.div
                          key="thinking"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-start gap-1.5"
                        >
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-2">
                            <div className="flex items-center gap-1">
                              {[0, 1, 2].map((d) => (
                                <motion.span
                                  key={d}
                                  className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
                                  animate={{
                                    y: [0, -3, 0],
                                    opacity: [0.4, 1, 0.4],
                                  }}
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
                      )}
                    </AnimatePresence>

                    {/* instant AI answer */}
                    <AnimatePresence>
                      {showAnswer && (
                        <motion.div
                          key="answer"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-1.5"
                        >
                          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <div className="space-y-1.5 max-w-[84%]">
                            <div className="bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-1.5 shadow-sm">
                              <p className="text-[11px] text-[#0F2A4A] leading-snug">
                                Yes! We ship to Canada — standard is 4–6 days, or
                                pick express at checkout for 2 days.
                              </p>
                            </div>
                            <div className="rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2 py-1.5 flex items-center gap-1.5">
                              <ShoppingCart className="h-3 w-3 text-[#1D4ED8] shrink-0" />
                              <span className="text-[9.5px] font-medium text-[#1D4ED8]">
                                Express shipping applied to cart
                              </span>
                              <CheckCircle2 className="ml-auto h-3 w-3 text-emerald-500 shrink-0" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* composer */}
                  <div className="border-t border-slate-200 bg-white px-2.5 py-2 flex items-center gap-2">
                    <div className="flex-1 h-7 rounded-full bg-slate-50 border border-slate-200 px-2.5 flex items-center">
                      <span className="text-[10px] text-slate-400">
                        {showTyping ? (
                          <span className="text-[#0F2A4A]">
                            Do you ship to Canada
                            <motion.span
                              className="inline-block ml-0.5 w-px h-2.5 align-middle bg-[#3B82F6]"
                              animate={{ opacity: [1, 0, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                          </span>
                        ) : (
                          "Type a message…"
                        )}
                      </span>
                    </div>
                    <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Send className="h-3 w-3 text-white" />
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── LAUNCHER BUTTON (always visible) ── */}
          <div className="absolute bottom-4 right-4 z-20">
            <motion.div
              animate={
                showProactive
                  ? { scale: [1, 1.08, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 1.2, repeat: showProactive ? Infinity : 0 }}
              className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow-[0_12px_28px_-8px_rgba(29,78,216,0.6)]"
            >
              <MessageCircle className="h-6 w-6 text-white" />
              {showProactive && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white text-[8px] font-bold text-white flex items-center justify-center">
                  1
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function WidgetVisual() {
  const swatches = ["#1D4ED8", "#3B82F6", "#60A5FA", "#0F2A4A"]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Brand your widget
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Palette className="h-2.5 w-2.5" /> live preview
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {swatches.map((c, i) => (
          <span
            key={c}
            className={`h-6 w-6 rounded-full ring-1 ring-black/5 ${
              i === 1 ? "ring-2 ring-[#1D4ED8]" : ""
            }`}
            style={{ background: c }}
          />
        ))}
        <span className="ml-1 text-[8.5px] text-slate-400">+ your logo</span>
      </div>
      <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5">
        <span className="text-[9px] text-slate-500">Position</span>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-[#1D4ED8]">
          <MessageCircle className="h-3 w-3" /> Bottom-right
        </span>
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/50 px-2 py-1.5">
        <p className="text-[8.5px] text-slate-500 mb-1">Prechat form</p>
        <div className="flex gap-1.5">
          <span className="h-4 flex-1 rounded bg-white border border-slate-200" />
          <span className="h-4 flex-1 rounded bg-white border border-slate-200" />
        </div>
      </div>
    </div>
  )
}

function TriggerVisual() {
  const rules = [
    { label: "On checkout page > 30s", tone: "active" },
    { label: "Cart value over $150", tone: "active" },
    { label: "Return visitor", tone: "idle" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Zap className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Trigger rules
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">
          fire the right moment
        </span>
      </div>
      {rules.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <span
            className={`h-4 w-7 rounded-full flex items-center px-0.5 shrink-0 ${
              r.tone === "active"
                ? "bg-[#3B82F6] justify-end"
                : "bg-slate-200 justify-start"
            }`}
          >
            <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
          </span>
          <span className="text-[10px] text-[#0F2A4A]">{r.label}</span>
          {r.tone === "active" && (
            <Bell className="ml-auto h-3 w-3 text-[#1D4ED8] shrink-0" />
          )}
        </div>
      ))}
    </div>
  )
}

function SdkVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-[#0F2A4A] p-3 space-y-2 overflow-hidden">
      <div className="flex items-center gap-1.5">
        <Code2 className="h-3 w-3 text-[#60A5FA]" />
        <span className="text-[9.5px] font-semibold text-white">
          Embed in your app
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] text-emerald-300">
          <CheckCircle2 className="h-2.5 w-2.5" /> installed
        </span>
      </div>
      <div className="rounded-md bg-black/30 border border-white/10 px-2.5 py-2 font-mono text-[9px] leading-relaxed">
        <p className="text-slate-400">
          <span className="text-[#60A5FA]">import</span> FloatChat{" "}
          <span className="text-[#60A5FA]">from</span>{" "}
          <span className="text-emerald-300">'@floatchat/sdk'</span>
        </p>
        <p className="text-slate-400 mt-1">
          FloatChat.<span className="text-[#93C5FD]">init</span>({"{"}
        </p>
        <p className="text-slate-400 pl-3">
          user: <span className="text-emerald-300">currentUser</span>,
        </p>
        <p className="text-slate-400 pl-3">
          context: <span className="text-emerald-300">'in-app'</span>
        </p>
        <p className="text-slate-400">{"}"})</p>
      </div>
      <div className="flex items-center gap-1.5 text-[9px] text-white/70">
        <Layers className="h-3 w-3 text-[#60A5FA]" />
        Same inbox as your marketing site
      </div>
    </div>
  )
}

function InstantAiVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          AI answers first
        </span>
        <span className="text-[8.5px] text-slate-400">before an agent</span>
      </div>
      <div className="flex items-start gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg rounded-tl-sm px-2 py-1.5">
          <p className="text-[10px] text-[#0F2A4A] leading-snug">
            "What's your return window?"
          </p>
        </div>
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <Zap className="h-2.5 w-2.5 text-[#1D4ED8]" />
          <span className="text-[9px] font-semibold text-[#1D4ED8]">
            Answered in 1.2s
          </span>
          <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] text-emerald-600">
            <CheckCircle2 className="h-2.5 w-2.5" /> grounded
          </span>
        </div>
        <p className="mt-1 text-[9.5px] text-[#0F2A4A] leading-snug">
          "30 days from delivery, no restocking fee."
        </p>
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1">
        <GitBranch className="h-3 w-3 text-slate-400" />
        <span className="text-[9px] text-slate-500">
          Escalates to a human only if needed
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Results strip data
─────────────────────────────────────────────────────────────── */

const results = [
  { Icon: Palette, value: "Fully", label: "customizable widget" },
  { Icon: Sparkles, value: "AI", label: "answers before an agent" },
  { Icon: Zap, value: "Proactive", label: "behavior triggers" },
  { Icon: Smartphone, value: "In-app", label: "chat via SDK" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can I customize the widget to match my brand?",
    answer:
      "Yes — completely. Set your brand colors, choose the launcher position, add your logo, and build a prechat form that captures exactly the fields you want before a conversation starts. You can preview every change live, so the widget feels like a native part of your site rather than a bolted-on third-party tool.",
  },
  {
    question: "Does the AI answer inside the widget, or just collect messages?",
    answer:
      "It answers. The agentic AI handles common questions the moment a visitor asks — shipping, returns, pricing, order status — grounded in your help center and site content. Because it's agentic it can also take actions like applying a shipping option or looking up an order, not just link to an article. A human only steps in when the conversation genuinely needs one.",
  },
  {
    question: "What are proactive triggers?",
    answer:
      "Proactive triggers let the widget reach out first, based on visitor behavior. You can open a message when someone lingers on the checkout page, when a cart crosses a value threshold, when a returning visitor lands, or after a set time on a page. Instead of waiting for visitors to find the chat bubble, you meet them at the exact moment they're most likely to need help.",
  },
  {
    question: "Is there an in-app option beyond my marketing site?",
    answer:
      "Yes. The in-app SDK embeds the same chat experience inside your product or web app, not just your public website. Your logged-in users get instant AI answers in context — with their account details available to the agent — and every conversation lands in the same shared inbox as your website chats.",
  },
  {
    question: "How fast can I add the widget to my site?",
    answer:
      "Minutes. Drop a single snippet into your site, or install the SDK in your app. Point the AI at your help center and website content, set your brand and triggers, and you're live. There are no conversation flows to map by hand and no code to maintain.",
  },
  {
    question: "How does web chat connect to my other channels?",
    answer:
      "Web chat is one channel on the FloatChat platform. A visitor who starts on your site can continue on WhatsApp, SMS, or Instagram without losing context, because one customer record and one shared inbox tie every conversation together. Your team answers everything from a single place.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Live Chat Widget with Agentic AI",
  serviceType: "Website live chat widget with agentic AI",
  description:
    "A customizable website chat widget powered by agentic AI that answers visitors instantly, with proactive behavior triggers and an in-app SDK — all tied into one shared inbox across channels.",
  url: "https://www.floatchat.com/channels/web-chat",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Marketing, sales, and customer support teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related channels + products
─────────────────────────────────────────────────────────────── */

const relatedChannels = [
  {
    to: "/channels/social",
    Icon: MessageSquare,
    title: "Social channels",
    body: "Meet customers on the social platforms they already use every day.",
  },
  {
    to: "/channels/instagram",
    Icon: SiInstagram,
    title: "Instagram DMs",
    body: "Turn Instagram messages and story replies into real conversations.",
    brand: true,
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel inbox",
    body: "Answer web chat and every other channel from one shared inbox.",
  },
  {
    to: "/products/agent-copilot",
    Icon: Bot,
    title: "Agent Copilot",
    body: "Give your team AI-drafted replies and instant answers as they type.",
  },
]

const relatedLinks = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/integrations", label: "Integrations", Icon: Layers },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: ShoppingCart },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function WebChatChannelPage() {
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Web chat · a widget that answers, not just collects
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Website chat with{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    agentic AI built in.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  A customizable chat widget that greets visitors, answers them
                  instantly, and converts them — powered by agentic AI, with
                  proactive triggers and an in-app SDK.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Customizable widget",
                    "AI answers first",
                    "Proactive triggers",
                    "In-app SDK",
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
                  Turn website visitors into conversations.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <WebChatMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS STRIP ───── */}
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
                  Most visitors leave without talking to anyone.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    You spend to bring people to your site, and the vast majority
                    of them browse for a minute, hit one small question they
                    can&apos;t answer, and quietly bounce. There&apos;s no one to
                    ask, so they don&apos;t — they just go.
                  </p>
                  <p>
                    A static contact form or a &quot;we&apos;ll reply within 24
                    hours&quot; promise doesn&apos;t catch them. The moment of
                    intent is now, on the checkout page, at 11pm — not tomorrow
                    morning when someone finally reads the inbox.
                  </p>
                  <p>
                    A{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      chat widget with agentic AI
                    </span>{" "}
                    closes that gap. It greets visitors, answers instantly, and
                    captures the ones who are ready to buy or ask — while they
                    are still on the page.
                  </p>
                </div>
              </BlurFade>

              {/* form vs widget contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      A form that waits
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Visitor bounces before you reply",
                        "No answer until business hours",
                        "One question kills the sale",
                        "You never learn who left, or why",
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
                      A widget that answers
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Greets and replies in seconds",
                        "AI answers 24/7, before an agent",
                        "Reaches out at the right moment",
                        "Captures intent while it's live",
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
                  Everything the widget does.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  A widget you can make your own, an AI that answers first,
                  triggers that reach out at the right moment, and an SDK for your
                  product.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Palette,
                  title: "A customizable widget.",
                  body:
                    "Match colors, launcher position, and prechat forms to your brand. Preview every change live so the widget feels native to your site — not a third-party bolt-on.",
                  visual: <WidgetVisual />,
                },
                {
                  Icon: Zap,
                  title: "Proactive triggers.",
                  body:
                    "Reach visitors at the exact right moment based on behavior — time on the checkout page, cart value, a returning visitor. Open the conversation before they think to.",
                  visual: <TriggerVisual />,
                },
                {
                  Icon: Code2,
                  title: "An in-app SDK.",
                  body:
                    "Embed the same chat inside your product, not just your marketing site. Logged-in users get instant, context-aware answers — all in one shared inbox.",
                  visual: <SdkVisual />,
                },
                {
                  Icon: Sparkles,
                  title: "AI that answers first.",
                  body:
                    "The agentic AI handles common questions before an agent picks up — grounded in your content — and can take actions, not just link to a help article.",
                  visual: <InstantAiVisual />,
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

        {/* ───── WHY IT WORKS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Instant answers, only the right conversations for your team.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Visitors get answers without waiting, and your team joins only
                  the conversations that need a person — all from the shared inbox.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "No one waits in line.",
                  body:
                    "Simple questions get grounded answers the instant they're asked, at any hour. No queue for a shipping question, no waiting for business hours to open.",
                },
                {
                  Icon: MousePointerClick,
                  title: "Intent gets captured.",
                  body:
                    "Proactive triggers open the conversation at the moment of highest intent — on checkout, at a cart threshold — so ready-to-buy visitors don't slip away.",
                },
                {
                  Icon: Inbox,
                  title: "Your team stays focused.",
                  body:
                    "The AI absorbs the repetitive volume and escalates in-thread with full context. People spend their time only where a human actually adds value.",
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
                    Web chat is one channel on a platform that ties your website
                    conversations to WhatsApp, SMS, voice, and campaigns around a
                    single customer — so a chat that starts on your site never has
                    to start over anywhere else.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {[
                      "One shared inbox",
                      "One customer record",
                      "Every channel connected",
                    ].map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 text-[13px] text-white/85"
                      >
                        <Check className="h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />
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
          headline="Add agentic AI chat to your website."
          body="Drop in the widget, point the AI at your content, and go live in minutes — no per-resolution fees."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── RELATED CHANNELS / PRODUCTS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Explore more" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One channel on a bigger platform.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Web chat shares an inbox, a customer record, and the same
                  agentic AI with every other way your customers reach you.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedChannels.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      {a.brand ? (
                        <a.Icon style={{ color: "#fff", width: 20, height: 20 }} />
                      ) : (
                        <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      )}
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

              <BlurFade delay={0.05 + relatedChannels.length * 0.06} className="h-full">
                <Link
                  to="/agentic-ai"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      See the agentic AI
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      The same engine powering your web chat, explained end to end.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    Explore agentic AI
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
            </div>

            {/* related pills */}
            <BlurFade delay={0.3}>
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
              title="Common questions"
              description="Straight answers about customizing, triggering, and going live with web chat."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/demo"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    book a demo
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 40%, rgba(191,219,254,0.55) 70%, rgba(147,197,253,0.5) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #93C5FD 25%, #60A5FA 50%, #3B82F6 75%, transparent)",
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
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(96,165,250,0.4), transparent 70%)",
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
                  Answering website visitors right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">live in minutes</span>
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
                  No per-resolution fees
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Add agentic AI chat to{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  your website.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                A customizable widget, proactive triggers, and an in-app SDK —
                powered by agentic AI that answers visitors instantly.
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
                "Customizable widget",
                "AI answers first",
                "Proactive triggers",
                "In-app SDK",
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
