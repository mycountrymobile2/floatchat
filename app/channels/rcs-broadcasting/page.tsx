"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Megaphone,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Smartphone,
  BadgeCheck,
  GitBranch,
  Inbox,
  BarChart3,
  Eye,
  Send,
  Image as ImageIcon,
  Layers,
  ShieldCheck,
  Zap,
  Tag,
  Users,
  Signal,
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
  title: "RCS Broadcasting with Rich Cards and SMS Fallback | FloatChat",
  description:
    "Send branded RCS campaigns with rich cards, carousels, and suggested replies, plus automatic SMS fallback, answered by agentic AI.",
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
   HERO MOCKUP — an RCS broadcast campaign.

   A campaign composer sends ONE branded send. It fans out to a
   carousel of rich cards + suggested-reply chips for RCS-capable
   handsets, and branches to a plain SMS bubble for recipients
   without RCS. The delivery meter cycles as the broadcast lands.
─────────────────────────────────────────────────────────────── */

type BroadcastPhase = "composing" | "sending" | "rcs" | "fallback" | "reply"

function RcsBroadcastMockup() {
  const [phase, setPhase] = useState<BroadcastPhase>("composing")
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("composing")
        await wait(1500)
        if (cancelled) return
        setPhase("sending")
        await wait(1400)
        if (cancelled) return
        setPhase("rcs")
        await wait(1800)
        if (cancelled) return
        setActiveCard(1)
        await wait(1400)
        if (cancelled) return
        setActiveCard(2)
        await wait(1400)
        if (cancelled) return
        setPhase("fallback")
        await wait(2200)
        if (cancelled) return
        setPhase("reply")
        await wait(2600)
        if (cancelled) return
        setActiveCard(0)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const sent = phase !== "composing"
  const showRcs = phase === "rcs" || phase === "fallback" || phase === "reply"
  const showFallback = phase === "fallback" || phase === "reply"
  const showReply = phase === "reply"

  const cards = [
    { title: "Autumn Drop", price: "20% off", img: "linear-gradient(135deg,#1D4ED8,#60A5FA)" },
    { title: "Weekend Only", price: "Free ship", img: "linear-gradient(135deg,#0F2A4A,#3B82F6)" },
    { title: "New Arrivals", price: "Shop now", img: "linear-gradient(135deg,#3B82F6,#93C5FD)" },
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

      {/* Floating verified-sender chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <BadgeCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Verified brand sender
        </span>
      </motion.div>

      {/* Floating fallback chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <CheckCircle2 className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          100% reached · SMS fallback
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
            app.floatchat.com · rcs broadcast
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Composer / campaign rail */}
          <aside className="hidden md:flex md:col-span-5 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Campaign · Autumn Sale
              </p>
            </div>
            <div className="px-3 py-3 space-y-2.5">
              {/* Audience */}
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 flex items-center gap-1.5">
                <Users className="h-3 w-3 text-[#1D4ED8]" />
                <span className="text-[10px] font-semibold text-[#0F2A4A]">Audience</span>
                <span className="ml-auto font-mono text-[9px] text-slate-500">48,210</span>
              </div>

              {/* Capability split */}
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Signal className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">Capability check</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <motion.span className="h-full bg-[#3B82F6]" initial={{ width: "0%" }} animate={{ width: sent ? "82%" : "0%" }} transition={{ duration: 0.8 }} />
                  <motion.span className="h-full bg-emerald-400" initial={{ width: "0%" }} animate={{ width: sent ? "18%" : "0%" }} transition={{ duration: 0.8, delay: 0.2 }} />
                </div>
                <div className="flex items-center justify-between text-[8.5px]">
                  <span className="text-[#1D4ED8] font-medium">RCS · 82%</span>
                  <span className="text-emerald-600 font-medium">SMS · 18%</span>
                </div>
              </div>

              {/* Content blocks */}
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">Rich content</span>
                </div>
                {[
                  { Icon: ImageIcon, label: "3-card carousel" },
                  { Icon: Tag, label: "2 suggested replies" },
                  { Icon: ArrowUpRight, label: "1 action · Shop" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-1.5">
                    <c.Icon className="h-2.5 w-2.5 text-slate-400" />
                    <span className="text-[9.5px] text-slate-600">{c.label}</span>
                    <Check className="ml-auto h-2.5 w-2.5 text-emerald-500" strokeWidth={3} />
                  </div>
                ))}
              </div>
            </div>

            {/* Send button */}
            <div className="mt-auto px-3 py-3 border-t border-slate-200">
              <div
                className={`w-full flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-semibold text-white transition-colors ${
                  sent
                    ? "bg-emerald-500"
                    : "bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8]"
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Broadcast sent
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" /> Send broadcast
                  </>
                )}
              </div>
            </div>
          </aside>

          {/* Recipient preview — phone with RCS + fallback branch */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white">
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                  <Megaphone className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    Recipient delivery
                  </p>
                  <p className="text-[9px] text-slate-500">how the send lands</p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={showFallback ? "split" : "rcs"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]"
                >
                  <Sparkles className="h-2.5 w-2.5" />
                  {showFallback ? "RCS + SMS" : "RCS delivery"}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="flex-1 px-4 py-3 bg-slate-50/40 overflow-hidden">
              {/* Sending indicator */}
              <AnimatePresence>
                {phase === "sending" && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-1.5 py-16"
                  >
                    <Zap className="h-3.5 w-3.5 text-[#1D4ED8]" />
                    <span className="text-[11px] text-slate-500">
                      Fanning out to 48,210 recipients…
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {phase === "composing" && (
                <div className="flex items-center justify-center gap-1.5 py-16 text-slate-400">
                  <Megaphone className="h-3.5 w-3.5" />
                  <span className="text-[11px]">
                    Compose once — pick channel per recipient.
                  </span>
                </div>
              )}

              {/* RCS rich card carousel */}
              <AnimatePresence>
                {showRcs && (
                  <motion.div
                    key="rcs-branch"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF2FF] border border-[#3B82F6]/20 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                        <BadgeCheck className="h-2.5 w-2.5" /> Has RCS
                      </span>
                      <span className="text-[8.5px] text-slate-400">
                        branded, tappable, read receipts
                      </span>
                    </div>

                    {/* Carousel */}
                    <div className="flex gap-2 overflow-hidden">
                      {cards.map((c, i) => (
                        <motion.div
                          key={c.title}
                          animate={{
                            opacity: i === activeCard ? 1 : 0.5,
                            scale: i === activeCard ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`w-[42%] shrink-0 rounded-xl border bg-white overflow-hidden ${
                            i === activeCard
                              ? "border-[#3B82F6]/40 shadow-[0_8px_20px_-10px_rgba(29,78,216,0.4)]"
                              : "border-slate-200"
                          }`}
                        >
                          <div
                            className="h-14 w-full flex items-center justify-center"
                            style={{ background: c.img }}
                          >
                            <ImageIcon className="h-4 w-4 text-white/80" />
                          </div>
                          <div className="px-2 py-1.5">
                            <p className="text-[9.5px] font-semibold text-[#0F2A4A] leading-tight">
                              {c.title}
                            </p>
                            <p className="text-[8.5px] text-[#1D4ED8] font-medium">
                              {c.price}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* carousel dots */}
                    <div className="flex items-center justify-center gap-1">
                      {cards.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 rounded-full transition-all ${
                            i === activeCard
                              ? "w-4 bg-[#3B82F6]"
                              : "w-1 bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* suggested reply chips */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {["Shop the sale", "Remind me later", "See sizes"].map(
                        (chip) => (
                          <span
                            key={chip}
                            className="inline-flex items-center gap-1 rounded-full border border-[#3B82F6]/30 bg-[#EAF2FF] px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]"
                          >
                            {chip}
                          </span>
                        ),
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Fallback branch */}
              <AnimatePresence>
                {showFallback && (
                  <motion.div
                    key="fallback-branch"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="mt-3 pt-3 border-t border-dashed border-slate-300 space-y-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <GitBranch className="h-3 w-3 text-emerald-600" />
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[8.5px] font-medium text-emerald-700">
                        <Smartphone className="h-2.5 w-2.5" /> No RCS · auto SMS
                      </span>
                      <span className="text-[8.5px] text-slate-400">
                        same message, plain text
                      </span>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[80%] shadow-sm">
                        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                          Autumn Sale — 20% off this weekend. Shop:
                          fltc.co/aut Reply STOP to opt out.
                        </p>
                        <p className="text-[8px] text-slate-400 mt-0.5">
                          Delivered · SMS fallback
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reply flows to agent */}
              <AnimatePresence>
                {showReply && (
                  <motion.div
                    key="reply"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-3 rounded-lg border border-[#3B82F6]/25 bg-[#EAF2FF] px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
                      <span className="text-[9.5px] font-semibold text-[#1D4ED8]">
                        Reply → agentic AI answers
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] text-slate-500">
                        <Inbox className="h-2.5 w-2.5" /> shared inbox
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-[#0F2A4A] leading-snug">
                      &ldquo;Do the boots come in size 9?&rdquo; — answered
                      instantly, in the same thread.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function RichCampaignVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Carousel + chips
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Layers className="h-2.5 w-2.5" /> rich
        </span>
      </div>
      <div className="flex gap-1.5">
        {[
          "linear-gradient(135deg,#1D4ED8,#60A5FA)",
          "linear-gradient(135deg,#0F2A4A,#3B82F6)",
          "linear-gradient(135deg,#3B82F6,#93C5FD)",
        ].map((g, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg border border-slate-200 overflow-hidden"
          >
            <div
              className="h-8 flex items-center justify-center"
              style={{ background: g }}
            >
              <ImageIcon className="h-3 w-3 text-white/80" />
            </div>
            <div className="px-1 py-1">
              <span className="block h-1 w-3/4 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1">
        {["Shop now", "Sizes", "Remind me"].map((c) => (
          <span
            key={c}
            className="rounded-full border border-[#3B82F6]/30 bg-[#EAF2FF] px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

function VerifiedVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/20 bg-[#EAF2FF] px-2 py-1.5">
        <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-white">FC</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-[#0F2A4A] leading-tight flex items-center gap-1">
            FloatChat Store
            <BadgeCheck className="h-2.5 w-2.5 text-[#1D4ED8]" />
          </p>
          <p className="text-[8.5px] text-slate-400">Verified business</p>
        </div>
      </div>
      {[
        { label: "Sender verified", ok: true },
        { label: "Logo + brand color", ok: true },
        { label: "Capability checked", ok: true },
      ].map((r) => (
        <div key={r.label} className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
          <span className="text-[9.5px] text-[#0F2A4A]">{r.label}</span>
        </div>
      ))}
    </div>
  )
}

function FallbackVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-[#3B82F6]/20 bg-[#EAF2FF] px-2 py-1.5 flex items-center gap-1.5">
        <BadgeCheck className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-medium text-[#0F2A4A]">
          RCS available
        </span>
        <span className="ml-auto text-[8.5px] font-medium text-[#1D4ED8]">
          rich card
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <GitBranch className="h-3 w-3" />
      </div>
      <div className="rounded-md border border-emerald-200 bg-emerald-50/60 px-2 py-1.5 flex items-center gap-1.5">
        <Smartphone className="h-3 w-3 text-emerald-700" />
        <span className="text-[9.5px] font-medium text-emerald-900">
          No RCS → SMS
        </span>
        <span className="ml-auto text-[8.5px] font-medium text-emerald-700">
          auto
        </span>
      </div>
      <div className="rounded-md bg-slate-50 border border-slate-200 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
        <span className="text-[9px] text-[#0F2A4A]">
          Every recipient reached
        </span>
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  const bars = [40, 65, 52, 78, 60, 88]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Read + engagement
        </span>
        <span className="inline-flex items-center gap-1 text-[8.5px] font-medium text-[#1D4ED8]">
          <Eye className="h-2.5 w-2.5" /> receipts
        </span>
      </div>
      <div className="flex items-end gap-1 h-14">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="w-full rounded-t bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA]"
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { v: "94%", l: "delivered" },
          { v: "71%", l: "read" },
          { v: "23%", l: "tapped" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1 text-center"
          >
            <p className="text-[11px] font-semibold text-[#0F2A4A] tabular-nums leading-none">
              {s.v}
            </p>
            <p className="text-[7.5px] text-slate-400 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What happens if a recipient's phone doesn't support RCS?",
    answer:
      "They still get your message. FloatChat checks each number's capability at send time and automatically delivers a plain SMS version to anyone who can't receive RCS — same offer, same link, no gaps. You compose one campaign and every recipient is reached, whether their handset is RCS-capable or not.",
  },
  {
    question: "What can I put in an RCS broadcast?",
    answer:
      "Rich, branded content: single rich cards or a swipeable carousel of cards with images, titles, and prices; suggested-reply chips that give recipients one-tap answers; and suggested actions like Shop, Book, or Call. It sends from a verified brand sender with your logo and color, so the message looks like it came from you — not an anonymous number.",
  },
  {
    question: "Can agentic AI answer replies to a broadcast?",
    answer:
      "Yes. Every reply — whether it came from an RCS suggested-reply chip or a typed SMS response — flows into the shared inbox, where FloatChat's agentic AI answers instantly in the same thread. A campaign that starts as a one-way blast becomes a two-way conversation your AI can actually handle, and it hands off to a human with full context when needed.",
  },
  {
    question: "What analytics do I get from an RCS campaign?",
    answer:
      "Delivery status, read receipts, and engagement data down to which cards were tapped and which suggested replies were used. Because RCS supports read receipts natively, you can see what's actually landing — not just what was sent — and compare RCS versus SMS-fallback performance in the same report.",
  },
  {
    question: "Do I need a separate SMS setup for the fallback?",
    answer:
      "No. RCS broadcasting and SMS fallback run on the same FloatChat platform and the same campaign send. There's nothing to wire together — capability checking, RCS delivery, and the SMS fallback path are built in, so a single send does the right thing per recipient automatically.",
  },
  {
    question: "How do I become a verified RCS sender?",
    answer:
      "FloatChat handles brand verification with the carriers and RCS providers as part of onboarding. You supply your business details, logo, and brand color; we register the verified agent so your campaigns send from a recognizable, trusted sender rather than a raw phone number.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "RCS Broadcasting",
  serviceType: "RCS campaign broadcasting with rich cards and SMS fallback",
  description:
    "Send branded RCS campaigns with rich cards, carousels, and suggested replies, with automatic SMS fallback for recipients without RCS, and agentic AI that answers replies in a shared inbox.",
  url: "https://www.floatchat.com/channels/rcs-broadcasting",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Marketing and customer engagement teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related channels + products
─────────────────────────────────────────────────────────────── */

const relatedChannels = [
  {
    to: "/channels/rcs",
    Icon: MessageSquare,
    title: "RCS Messaging",
    body: "Two-way RCS conversations and single rich cards, not just campaigns.",
  },
  {
    to: "/channels/whatsapp-broadcasting",
    Icon: SiWhatsapp,
    isBrand: true,
    title: "WhatsApp Broadcasting",
    body: "Broadcast templates and media to opted-in WhatsApp audiences at scale.",
  },
  {
    to: "/channels/sms-broadcasting",
    Icon: Smartphone,
    title: "SMS Broadcasting",
    body: "Reliable text campaigns that reach any mobile number, everywhere.",
  },
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The AI that answers every reply your broadcast earns, in-thread.",
  },
]

const relatedProducts = [
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: Inbox },
  { to: "/integrations", label: "Integrations", Icon: GitBranch },
  { to: "/compare", label: "Compare FloatChat", Icon: BarChart3 },
  { to: "/pricing", label: "Pricing", Icon: Tag },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RcsBroadcastingPage() {
  usePageMeta(metadata)

  return (
    <>
      <Header />
      <FaqSchema items={faqs} />
      <JsonLd schema={serviceSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div
            className="absolute inset-0 -z-20 pointer-events-none"
            aria-hidden="true"
          >
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
                  <Megaphone className="h-3.5 w-3.5" />
                  RCS Broadcasting · rich cards with SMS fallback
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  RCS broadcasting with rich cards and{" "}
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
                  Send branded, interactive RCS campaigns with automatic SMS
                  fallback — then let agentic AI handle the replies from one
                  shared inbox.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Rich cards & carousels",
                    "Verified brand sender",
                    "Automatic SMS fallback",
                    "Read receipts & analytics",
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
                  Campaigns that look like your brand and convert.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <RcsBroadcastMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                {
                  Icon: Layers,
                  value: "Rich",
                  label: "cards, carousels & suggested replies",
                },
                {
                  Icon: BadgeCheck,
                  value: "Verified",
                  label: "brand sender with your logo",
                },
                {
                  Icon: Smartphone,
                  value: "Auto",
                  label: "SMS fallback reaches everyone",
                },
                {
                  Icon: Eye,
                  value: "100%",
                  label: "read receipts & engagement analytics",
                },
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
                  SMS gets opened. It rarely gets engaged.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A plain text blast lands, gets a glance, and dies there. No
                    image, no brand, no way to tap through — just a link the
                    recipient may or may not trust, sent from a number they don&apos;t
                    recognize.
                  </p>
                  <p>
                    RCS changes the medium. Your campaign becomes a branded,
                    tappable experience: rich cards, carousels, and one-tap
                    suggested replies from a{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      verified sender
                    </span>{" "}
                    that looks like your business.
                  </p>
                  <p>
                    FloatChat makes sure none of that reach is lost. Recipients
                    without RCS get an{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      automatic SMS fallback
                    </span>
                    , and every reply becomes a conversation your agentic AI can
                    handle.
                  </p>
                </div>
              </BlurFade>

              {/* SMS vs RCS contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500 mb-3">
                      Plain SMS blast
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-600 leading-relaxed">
                      {[
                        "160 characters of grey text",
                        "Unknown number, low trust",
                        "One raw link, no visuals",
                        "No read receipts or tap data",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#3B82F6]/30 bg-[#EAF2FF] p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-3">
                      RCS broadcast
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-[#0F2A4A] leading-relaxed">
                      {[
                        "Rich cards, carousels, and images",
                        "Verified brand sender, high trust",
                        "One-tap suggested replies & actions",
                        "Read receipts + engagement analytics",
                      ].map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check
                            className="h-3.5 w-3.5 text-[#1D4ED8] mt-0.5 shrink-0"
                            strokeWidth={3}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <Smartphone className="h-4 w-4 text-emerald-700" />
                  </div>
                  <p className="text-[13px] text-emerald-900/85 leading-snug">
                    <span className="font-semibold">And you lose no one:</span>{" "}
                    recipients without RCS receive the SMS version automatically —
                    same send, same audience, full reach.
                  </p>
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
                  A full RCS campaign engine.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Rich content, brand verification, guaranteed reach, and real
                  analytics — on one platform, with agentic AI on the replies.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Layers,
                  title: "Rich campaigns.",
                  body:
                    "Cards, carousels, and suggested replies and actions delivered to every RCS-capable handset — branded, tappable, and built to convert instead of just inform.",
                  visual: <RichCampaignVisual />,
                },
                {
                  Icon: BadgeCheck,
                  title: "Brand & agent verification.",
                  body:
                    "A verified sender with your logo and color, plus capability checking at send time so you always know who can receive RCS versus who needs SMS.",
                  visual: <VerifiedVisual />,
                },
                {
                  Icon: Smartphone,
                  title: "Automatic SMS fallback.",
                  body:
                    "Reach every recipient, even when RCS isn't available on the device. One send fans out to RCS where it can and SMS where it can't — no separate campaign to build.",
                  visual: <FallbackVisual />,
                },
                {
                  Icon: BarChart3,
                  title: "Rich analytics.",
                  body:
                    "Read receipts and engagement data show what's actually working — which cards were tapped, which replies were used, and how RCS compares to SMS fallback.",
                  visual: <AnalyticsVisual />,
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

        {/* ───── ONE CAMPAIGN, THE RIGHT CHANNEL ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="One send, right channel" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One campaign. The right channel per recipient.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Pair RCS with the campaign engine and the platform picks RCS
                  where available and SMS where not — on a single send. Replies
                  flow to the inbox where agentic AI responds.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.2)]">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    {
                      Icon: Send,
                      title: "Compose once",
                      note: "cards, chips & actions",
                    },
                    {
                      Icon: Signal,
                      title: "Check capability",
                      note: "RCS or SMS per number",
                    },
                    {
                      Icon: Megaphone,
                      title: "Deliver both ways",
                      note: "rich RCS + SMS fallback",
                    },
                    {
                      Icon: Sparkles,
                      title: "AI answers replies",
                      note: "in one shared inbox",
                    },
                  ].map((step, i, arr) => (
                    <div
                      key={step.title}
                      className="flex-1 flex items-center gap-3"
                    >
                      <div className="flex items-center gap-3 rounded-2xl bg-slate-50/60 border border-slate-200 px-4 py-3 w-full">
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

            {/* Reply -> agent callout */}
            <BlurFade delay={0.2}>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
                {[
                  {
                    Icon: Zap,
                    title: "No double-building",
                    body: "RCS and SMS come from the same campaign — you never maintain two versions of the same offer.",
                  },
                  {
                    Icon: Inbox,
                    title: "Replies land in one place",
                    body: "Chip taps and typed SMS both arrive in the shared inbox, threaded to the same customer record.",
                  },
                  {
                    Icon: Sparkles,
                    title: "Agentic AI takes it from there",
                    body: "A one-way blast becomes a two-way conversation your AI can answer — and escalate with context.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                      <c.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-[#0F2A4A]">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Run branded RCS campaigns with AI built in."
          body="Compose one send — rich cards where RCS is available, SMS where it isn't, agentic AI on every reply."
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
                  Broadcast, fallback, and AI on one platform.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Reach that never leaks.",
                  body:
                    "Capability checking and automatic SMS fallback mean every recipient gets your message — you never trade reach for richness.",
                },
                {
                  Icon: BadgeCheck,
                  title: "A sender people trust.",
                  body:
                    "Verified brand sending with your logo and color turns an anonymous number into a recognizable business — which is what drives the tap.",
                },
                {
                  Icon: Sparkles,
                  title: "The reply is where it pays off.",
                  body:
                    "Because broadcasting, fallback, and agentic AI live together, the conversation a campaign starts never leaves FloatChat.",
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
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 mb-3">
                    Why FloatChat
                  </p>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Broadcasting, fallback, and AI live on one platform — so your
                    campaign and the conversation that follows never leave
                    FloatChat.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Related channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Broadcast on every channel that matters.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  RCS broadcasting shares one audience, one inbox, and the same
                  agentic AI with the rest of the FloatChat channels.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedChannels.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      {a.isBrand ? (
                        <a.Icon
                          style={{ color: "#FFFFFF", width: 20, height: 20 }}
                        />
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
            </div>

            {/* related products */}
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
              description="Straight answers about rich cards, SMS fallback, and going live."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.65) 40%, rgba(191,219,254,0.55) 70%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 45%, #60A5FA 65%, #93C5FD 80%, transparent)",
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
                  RCS campaigns going out with SMS fallback right now
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
                  Rich by default, reachable by everyone
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Run branded RCS campaigns with{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  AI built in.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Rich cards where RCS is available, automatic SMS where it isn&apos;t,
                and agentic AI answering every reply — from one platform and one
                shared inbox.
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
                "Rich cards & carousels",
                "Verified brand sender",
                "Automatic SMS fallback",
                "Agentic AI on replies",
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
