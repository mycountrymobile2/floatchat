"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Instagram,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Inbox,
  Heart,
  MessageCircle,
  Clock,
  GitBranch,
  Users,
  History,
  Zap,
  Tag,
  Image as ImageIcon,
  ShieldCheck,
  Globe,
} from "lucide-react"
import {
  SiInstagram,
  SiMessenger,
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
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title:
    "Instagram DM Management and Automation with Agentic AI | FloatChat",
  description:
    "Manage Instagram DMs in one inbox with agentic AI that answers automatically and routes the rest to your team, with full customer history.",
}

/* ─────────────────────────────────────────────────────────────
   The Instagram brand gradient — allowed ONLY on the small logo
   tile. Everything else on the page stays blue.
─────────────────────────────────────────────────────────────── */

const IG_GRADIENT =
  "linear-gradient(135deg, #FEDA75 0%, #FA7E1E 25%, #D62976 55%, #962FBF 80%, #4F5BD5 100%)"

function IgTile({
  size = "md",
}: {
  size?: "sm" | "md" | "lg"
}) {
  const cls =
    size === "sm"
      ? "h-8 w-8"
      : size === "lg"
      ? "h-12 w-12"
      : "h-10 w-10"
  const px = size === "sm" ? 16 : size === "lg" ? 24 : 20
  return (
    <span
      className={`${cls} rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5 shrink-0`}
      style={{ background: IG_GRADIENT }}
      aria-label="Instagram"
    >
      <SiInstagram style={{ color: "#FFFFFF", width: px, height: px }} />
    </span>
  )
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
   HERO MOCKUP — an Instagram DM inbox. Cycles through:
   a story-reply reference → the customer question → an agentic AI
   auto-reply → a "routed to team" tag on a second thread.
─────────────────────────────────────────────────────────────── */

type IgPhase = "storyReply" | "question" | "aiTyping" | "aiReply" | "routed"

const IG_THREADS = [
  { name: "mara.studio", note: "story reply", unread: true, active: true },
  { name: "leo_makes", note: "sizing question", unread: false, active: false },
  { name: "cafe.aurora", note: "wholesale · routed", unread: false, active: false },
]

function InstagramInboxMockup() {
  const [phase, setPhase] = useState<IgPhase>("storyReply")

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase("storyReply")
        await wait(1700)
        if (cancelled) return
        setPhase("question")
        await wait(1600)
        if (cancelled) return
        setPhase("aiTyping")
        await wait(1500)
        if (cancelled) return
        setPhase("aiReply")
        await wait(2800)
        if (cancelled) return
        setPhase("routed")
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showQuestion =
    phase === "question" ||
    phase === "aiTyping" ||
    phase === "aiReply" ||
    phase === "routed"
  const showTyping = phase === "aiTyping"
  const showReply = phase === "aiReply" || phase === "routed"
  const showRouted = phase === "routed"

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

      {/* Floating instant-reply chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Zap className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Replied in 4s
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <IgTile size="sm" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          DMs · stories · comments
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
            app.floatchat.com · instagram
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Thread list rail — hidden on phones */}
          <aside className="hidden md:flex md:col-span-4 border-r border-slate-200 bg-slate-50/50 flex-col">
            <div className="px-3 py-2.5 border-b border-slate-200 flex items-center gap-2">
              <IgTile size="sm" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#0F2A4A] leading-tight truncate">
                  @yourbrand
                </p>
                <p className="text-[9px] text-slate-400">Instagram inbox</p>
              </div>
            </div>
            <div className="px-2 py-2 space-y-1.5">
              {IG_THREADS.map((t) => (
                <div
                  key={t.name}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 border ${
                    t.active
                      ? "border-[#3B82F6]/40 bg-white shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                      : "border-transparent hover:bg-white/60"
                  }`}
                >
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 ring-1 ring-black/5"
                    style={{ background: IG_GRADIENT }}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {t.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-medium text-[#0F2A4A] truncate">
                      {t.name}
                    </p>
                    <p className="text-[9px] text-slate-400 truncate">{t.note}</p>
                  </div>
                  {t.note.includes("routed") ? (
                    <Users className="h-3 w-3 text-slate-500 shrink-0" />
                  ) : t.unread ? (
                    <span className="h-2 w-2 rounded-full bg-[#3B82F6] shrink-0" />
                  ) : (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto px-3 py-3 border-t border-slate-200 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                This customer
              </p>
              <RailStat label="Handle" value="@mara.studio" tone="blue" />
              <RailStat label="Past orders" value="3 · loyal" tone="emerald" />
              <RailStat
                label="Status"
                value={showRouted ? "Routed" : showReply ? "AI replied" : "Working"}
                tone={showRouted ? "amber" : "emerald"}
              />
            </div>
          </aside>

          {/* Conversation pane */}
          <section className="col-span-12 md:col-span-8 flex flex-col bg-white">
            {/* Customer header */}
            <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center ring-2 ring-white"
                    style={{ background: IG_GRADIENT }}
                  >
                    <span className="text-[11px] font-bold text-white">M</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-1 ring-white" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-[#0F2A4A] leading-tight">
                    mara.studio
                  </p>
                  <p className="text-[9px] text-slate-500">
                    Instagram · Direct message
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait">
                {showRouted ? (
                  <motion.span
                    key="routed-tag"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 text-[9px] font-medium text-slate-700"
                  >
                    <Users className="h-2.5 w-2.5" /> Routed to team
                  </motion.span>
                ) : (
                  <motion.span
                    key="ai-tag"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[9px] font-medium text-[#1D4ED8]"
                  >
                    <Sparkles className="h-2.5 w-2.5" /> AI answering
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 space-y-2 bg-slate-50/30 overflow-hidden">
              {/* Story-reply reference card — always visible */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="max-w-[82%]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <ImageIcon className="h-2.5 w-2.5 text-slate-400" />
                    <span className="text-[8.5px] text-slate-400">
                      Replied to your story
                    </span>
                  </div>
                  <div className="flex items-stretch gap-1.5">
                    <span
                      className="w-1 rounded-full"
                      style={{ background: IG_GRADIENT }}
                    />
                    <div className="rounded-lg bg-slate-100 border border-slate-200 px-2 py-1.5">
                      <p className="text-[9.5px] text-slate-500 leading-snug">
                        Story · &ldquo;New drop — the linen tote 🧵&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Customer question */}
              <AnimatePresence>
                {showQuestion && (
                  <motion.div
                    key="q"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                      <p className="text-[11px] text-[#0F2A4A] leading-snug">
                        Obsessed 😍 is the linen tote still in stock and does it
                        ship to Canada?
                      </p>
                      <p className="text-[8px] text-slate-400 mt-0.5">9:41 AM</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI typing */}
              <AnimatePresence>
                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-1.5"
                  >
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Sparkles className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-2.5 py-1.5">
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]"
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
                      <p className="mt-1 text-[8.5px] text-slate-500">
                        Checking stock + shipping zones…
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Agentic AI auto-reply */}
              <AnimatePresence>
                {showReply && (
                  <motion.div
                    key="reply"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-1.5 justify-end"
                  >
                    <div className="bg-[#3B82F6] rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[82%] shadow-sm">
                      <p className="text-[11px] text-white leading-snug">
                        Yes! The linen tote is back in stock and ships to Canada
                        in 3–5 days. Want the link to check out? 🧡
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <Sparkles className="h-2 w-2 text-white/80" />
                        <span className="text-[8px] text-white/80">
                          Auto-reply · grounded in your catalog
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Routed-to-team card (second, harder thread) */}
              <AnimatePresence>
                {showRouted && (
                  <motion.div
                    key="routed"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Tag className="h-3 w-3 text-slate-700" />
                      <span className="text-[9.5px] font-semibold text-slate-800 uppercase tracking-wider">
                        Wholesale ask · routed to Sam
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-900 leading-snug">
                      &ldquo;Do you do bulk orders for cafés?&rdquo; — outside AI
                      scope, handed to the team with the full thread.
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 pt-1.5 border-t border-slate-200">
                      <History className="h-3 w-3 text-slate-600" />
                      <span className="text-[9px] text-slate-800">
                        Sam sees every past DM, story reply, and order — no
                        re-asking.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-full bg-slate-50 border border-slate-200 px-3 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Message @mara.studio…
                </span>
              </div>
              <Heart className="h-4 w-4 text-slate-300" />
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-full">
                Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function RailStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "blue" | "emerald" | "amber"
}) {
  const toneClass = {
    blue: "text-[#1D4ED8]",
    emerald: "text-emerald-600",
    amber: "text-slate-600",
  }
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[11px] font-semibold ${toneClass[tone]}`}>
        {value}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What you get" feature cards
─────────────────────────────────────────────────────────────── */

function UnifiedInboxVisual() {
  const rows = [
    { Icon: MessageCircle, label: "Direct message", note: "sizing question" },
    { Icon: ImageIcon, label: "Story reply", note: "new drop 🧵" },
    { Icon: Heart, label: "Post comment", note: "“price?”" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          One Instagram inbox
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Inbox className="h-2.5 w-2.5" /> shared
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="h-5 w-5 rounded flex items-center justify-center shrink-0 bg-[#EAF2FF]">
            <r.Icon className="h-3 w-3 text-[#1D4ED8]" />
          </span>
          <span className="text-[10px] font-medium text-[#0F2A4A]">
            {r.label}
          </span>
          <span className="ml-auto text-[9px] text-slate-500 truncate">
            {r.note}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function AutoReplyVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Zap className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Agentic AI · instant
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">avg 4s</span>
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-sm bg-slate-100 px-2 py-1">
          <p className="text-[9.5px] text-[#0F2A4A]">Do you ship to the UK?</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-lg rounded-tr-sm bg-[#3B82F6] px-2 py-1 max-w-[85%]">
          <p className="text-[9.5px] text-white leading-snug">
            Yes — UK delivery is 4–6 days. Here&apos;s the link 🇬🇧
          </p>
        </div>
      </div>
      <div className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 flex items-center gap-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
        <span className="text-[9px] text-emerald-800">
          Answered from your catalog, on-brand
        </span>
      </div>
    </div>
  )
}

function RouteVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5">
        <Sparkles className="h-3 w-3 text-[#3B82F6]" />
        <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
          &ldquo;Can I return a gift?&rdquo;
        </span>
      </div>
      <div className="flex items-center justify-center text-slate-400">
        <ArrowRight className="h-3 w-3 rotate-90" />
      </div>
      <div className="rounded-md border border-slate-200 bg-slate-50/60 px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-slate-700" />
          <span className="text-[9.5px] font-semibold text-slate-800">
            Routed to Sam · same thread
          </span>
        </div>
        <p className="mt-1 text-[9px] text-slate-900 leading-snug">
          Rules by keyword, sentiment, or intent — nothing gets missed.
        </p>
      </div>
    </div>
  )
}

function HistoryVisual() {
  const items = [
    { Icon: MessageCircle, label: "12 past DMs", meta: "since Jan" },
    { Icon: ImageIcon, label: "4 story replies", meta: "tagged" },
    { Icon: Tag, label: "3 orders", meta: "$248" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Full customer history
        </span>
        <span className="text-[8.5px] text-slate-400">one profile</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-2 flex flex-col items-center text-center gap-1"
          >
            <s.Icon className="h-3.5 w-3.5 text-[#1D4ED8]" />
            <span className="text-[8.5px] font-medium text-[#0F2A4A] leading-tight">
              {s.label}
            </span>
            <span className="text-[7.5px] text-slate-400">{s.meta}</span>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <History className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Every reply knows the whole story
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does FloatChat manage story replies and comments too?",
    answer:
      "Yes. FloatChat pulls your Instagram DMs, story replies, and post and reel comments into one inbox. A story reply arrives with the story it references attached, so context is never lost, and comments can trigger an auto-reply or move straight into a DM thread with the same customer record.",
  },
  {
    question: "Will the AI reply to DMs automatically?",
    answer:
      "Yes. The agentic AI answers common questions instantly — stock, sizing, shipping, hours, order status — grounded in your catalog and policies so replies stay accurate and on-brand. Anything outside its scope is routed to your team with the full thread, so nothing slips through and no customer waits hours for a simple answer.",
  },
  {
    question: "How does routing to a human work?",
    answer:
      "You set the rules — by keyword, sentiment, intent, or VIP handle. When a DM matches, the AI hands it off in the same thread and tags the right teammate. Whoever picks it up inherits every past DM, story reply, comment, and order, so there are no repeat questions and no cold starts.",
  },
  {
    question: "Do I need the Instagram API or a business account?",
    answer:
      "You connect an Instagram professional account (Business or Creator) linked to a Facebook Page. Setup is a guided OAuth flow inside FloatChat — no code, no developer. Most brands are answering live DMs within the same day.",
  },
  {
    question: "Can my whole team share the Instagram inbox?",
    answer:
      "Yes. Multiple agents work the same Instagram inbox with assignment, private notes, and collision detection, so two people never reply to the same DM. Every conversation stays tied to one customer profile that follows them across DMs, stories, and comments.",
  },
  {
    question: "Does Instagram connect to my other channels in FloatChat?",
    answer:
      "It does. Instagram lives in the same omnichannel inbox as Messenger, WhatsApp, web chat, and email, so a customer who DMs you on Instagram and later emails is one person with one history — not two disconnected tickets.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Instagram DM Management and Automation",
  serviceType: "Instagram DM management with agentic AI",
  description:
    "Manage Instagram DMs, story replies, and comments in one inbox with agentic AI that answers common questions instantly and routes the rest to your team, with full customer history on every conversation.",
  url: "https://www.floatchat.com/channels/instagram",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Social media, customer support, and e-commerce teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related channels + products
─────────────────────────────────────────────────────────────── */

const relatedChannels = [
  {
    to: "/channels/messenger",
    Icon: SiMessenger,
    bg: "#0084FF",
    title: "Messenger",
    body: "Facebook DMs in the same shared inbox and history.",
  },
  {
    to: "/channels/social",
    Icon: SiInstagram,
    bg: IG_GRADIENT,
    title: "All social channels",
    body: "Every social DM channel FloatChat supports, in one view.",
  },
  {
    to: "/channels/web-chat",
    Icon: MessageCircle,
    bg: "#3B82F6",
    title: "Web chat",
    body: "On-site chat that shares the same customer record.",
  },
]

const relatedProducts = [
  { to: "/agentic-ai", label: "Agentic AI", Icon: Sparkles },
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox", Icon: Inbox },
  { to: "/integrations", label: "Integrations", Icon: GitBranch },
  { to: "/compare", label: "Compare FloatChat", Icon: ShieldCheck },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function InstagramChannelPage() {
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
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram · DMs, stories &amp; comments in one inbox
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Manage every Instagram DM with{" "}
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
                  Pull DMs, story replies, and comments into one inbox. An
                  agentic AI answers the common questions instantly and routes
                  the rest to your team — with full customer history attached.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "DMs, stories & comments",
                    "Instant AI auto-replies",
                    "Smart routing to your team",
                    "Full customer history",
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
                  Connect your Instagram professional account — live the same day.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <InstagramInboxMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Inbox, value: "3-in-1", label: "DMs, stories & comments" },
                { Icon: Zap, value: "~4s", label: "average AI first reply" },
                { Icon: CheckCircle2, value: "24/7", label: "answered, even after hours" },
                { Icon: History, value: "Full", label: "history on every handoff" },
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
                  Instagram is where they buy — and where you lose them.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A great post drives a wave of DMs, story replies, and
                    comments — and they all land in three different places on a
                    phone one person has to babysit. Story replies expire before
                    anyone answers. Comments go unread. The buyer moves on.
                  </p>
                  <p>
                    The questions are almost always the same — is this in stock,
                    what&apos;s the price, do you ship here — but they arrive
                    around the clock, and the moment you take an hour to reply,
                    the impulse to buy is gone.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI in your Instagram inbox
                    </span>{" "}
                    answers those instantly and routes the tricky ones to a human
                    — so no DM, story reply, or comment slips through.
                  </p>
                </div>
              </BlurFade>

              {/* scattered vs unified contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      The native app
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "DMs, stories, comments in 3 places",
                        "One phone, one person, no coverage",
                        "Story replies expire unanswered",
                        "No order history beside the chat",
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
                      FloatChat inbox
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "One inbox for all three, plus your team",
                        "AI answers instantly, 24/7",
                        "Routing so nothing gets missed",
                        "Full customer history on every reply",
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
                  Your whole Instagram, worked as one.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs, one inbox — grounded in your catalog and running
                  around the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Inbox,
                  title: "One inbox for DMs, stories & comments.",
                  body:
                    "Direct messages, story replies, and post and reel comments land in a single shared inbox — with the story or post that a reply references attached, so context is never lost.",
                  visual: <UnifiedInboxVisual />,
                },
                {
                  Icon: Zap,
                  title: "Agentic AI answers instantly.",
                  body:
                    "Stock, sizing, shipping, hours, order status — the AI replies in seconds, grounded in your catalog and policies so it stays accurate and on-brand, day or night.",
                  visual: <AutoReplyVisual />,
                },
                {
                  Icon: GitBranch,
                  title: "Routes the rest to your team.",
                  body:
                    "Set rules by keyword, sentiment, intent, or VIP handle. When a DM needs a person, the AI hands it off in the same thread and tags the right teammate — nothing gets missed.",
                  visual: <RouteVisual />,
                },
                {
                  Icon: History,
                  title: "Full customer history, always.",
                  body:
                    "Every DM, story reply, comment, and past order lives on one customer profile — so whoever replies, human or AI, already knows the whole story. No repeat questions.",
                  visual: <HistoryVisual />,
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

        {/* ───── HOW IT FLOWS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="How it flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From a story reply to a resolved DM.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The AI doesn&apos;t just decide whether to reply — it decides{" "}
                  <span className="font-semibold text-[#0F2A4A]">
                    what to carry with it
                  </span>{" "}
                  when a human steps in.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: Instagram, title: "Message lands", note: "DM, story reply or comment" },
                    { Icon: Sparkles, title: "AI reads context", note: "with the post it references" },
                    { Icon: Zap, title: "Answers instantly", note: "grounded in your catalog" },
                    { Icon: Users, title: "Routes if needed", note: "full history attached" },
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
          headline="Answer every Instagram DM in seconds."
          body="Connect your Instagram professional account and let agentic AI take the routine questions — routing the rest to your team."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── WHY IT WORKS / WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="04" label="Why it works" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Faster replies, more sales, less inbox chaos.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Clock,
                  title: "Reply while they still care.",
                  body:
                    "Instagram buying is impulsive. An instant, accurate answer catches the sale at the moment of interest instead of hours later, when the moment has passed.",
                },
                {
                  Icon: Users,
                  title: "Your team only sees what matters.",
                  body:
                    "The AI absorbs the repetitive stock-and-shipping questions, so your people spend their time on the DMs that actually need a human — with full context waiting.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Nothing falls through.",
                  body:
                    "Story replies expire, comments get buried — until they don't. One inbox with routing means every message is seen, answered, or assigned. Never missed.",
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
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-mono text-white/50">/ 05</span>
                    <span className="h-px w-8 bg-white/30" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#93C5FD]">
                      Why FloatChat
                    </span>
                  </div>
                  <p className="text-xl lg:text-2xl font-medium leading-snug max-w-3xl">
                    Instagram isn&apos;t a silo here. It shares one inbox, one
                    customer record, and the same agentic AI as Messenger,
                    WhatsApp, web chat, and email — so a follower who DMs you today
                    and emails next week is one person, not two tickets.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Agentic AI", "Omnichannel inbox", "One customer record"].map(
                      (t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[12px] font-medium text-white/90"
                        >
                          <Check className="h-3 w-3 text-[#93C5FD]" strokeWidth={3} />
                          {t}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="06" label="More channels" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One inbox for every channel.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Instagram shares its inbox, history, and agentic AI with the
                  rest of your channels.
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
                      className="h-11 w-11 rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5"
                      style={{ background: c.bg }}
                    >
                      <c.Icon style={{ color: "#FFFFFF", width: 20, height: 20 }} />
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

              <BlurFade delay={0.05 + relatedChannels.length * 0.06} className="h-full">
                <Link
                  to="/channels/social"
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-6 text-white shadow-[0_30px_60px_-30px_rgba(29,78,216,0.55)]"
                >
                  <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      See all social channels
                    </h3>
                    <p className="mt-1.5 text-[13.5px] text-white/80 leading-relaxed">
                      Every social DM channel FloatChat supports, in one shared
                      inbox.
                    </p>
                  </div>
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
                    Explore social
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
              </BlurFade>
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
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <Tag className="h-3.5 w-3.5" />
                  Pricing
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Contact
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
              description="Story replies, auto-replies, routing, and setup — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or explore the{" "}
                  <Link
                    to="/products/omnichannel-inbox"
                    className="text-[#1D4ED8] font-medium underline underline-offset-2 hover:no-underline"
                  >
                    omnichannel inbox
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
                  Answering Instagram DMs right now
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">live the same day</span>
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
                  Free, no credit card
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Never leave an Instagram DM{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                  waiting again.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Bring DMs, story replies, and comments into one inbox, let
                agentic AI answer instantly, and route the rest to your team —
                with full customer history.
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
                "DMs, stories & comments",
                "Instant AI auto-replies",
                "Smart routing",
                "Full customer history",
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
