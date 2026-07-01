"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Clapperboard,
  Check,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Ticket,
  Film,
  Radio,
  Megaphone,
  Users,
  Bell,
  CreditCard,
  Play,
  Zap,
  Calendar,
  GitBranch,
  Inbox,
  MessageSquare,
  TrendingUp,
  Star,
} from "lucide-react"
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
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
  title: "Agentic AI for Media & Entertainment | FloatChat",
  description:
    "Grow audiences and handle high volume with agentic AI for ticketing, recommendations, and subscriber support, plus omnichannel campaigns.",
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
   HERO MOCKUP — a media/entertainment surface:
   an event ticket card with a "Get tickets" action, a content
   recommendation carousel that cycles, and a live high-volume
   messages/min counter that ticks up to show scale.
─────────────────────────────────────────────────────────────── */

const recommendations = [
  { title: "Midnight Signal", tag: "New season", meta: "Sci-fi · 8 eps", img: 33 },
  { title: "The Long Encore", tag: "For you", meta: "Music doc · 1h52", img: 15 },
  { title: "Harbor Lights", tag: "Trending", meta: "Drama · S2", img: 64 },
  { title: "Neon Verdict", tag: "Because you watched", meta: "Thriller · 6 eps", img: 12 },
]

function MediaMockup() {
  const [recIndex, setRecIndex] = useState(0)
  const [rate, setRate] = useState(1840)
  const [claimed, setClaimed] = useState(false)

  // cycle the recommendation carousel
  useEffect(() => {
    const id = setInterval(
      () => setRecIndex((i) => (i + 1) % recommendations.length),
      2600
    )
    return () => clearInterval(id)
  }, [])

  // jitter the live messages/min counter to imply high-volume scale
  useEffect(() => {
    const id = setInterval(() => {
      setRate((r) => {
        const drift = Math.round((Math.random() - 0.35) * 90)
        const next = r + drift
        return Math.max(1520, Math.min(2680, next))
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])

  // toggle the "Get tickets" claimed state
  useEffect(() => {
    const id = setInterval(() => setClaimed((c) => !c), 3200)
    return () => clearInterval(id)
  }, [])

  const rec = recommendations[recIndex]

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

      {/* Floating live-rate chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/25 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Zap className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[11px] font-medium text-[#0F2A4A] tabular-nums">
          {rate.toLocaleString()} msgs/min
        </span>
      </motion.div>

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#25D366] flex items-center justify-center">
          <SiWhatsapp style={{ color: "#fff", width: 10, height: 10 }} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Broadcast · 5 channels
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
            app.floatchat.com · audience
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Left rail — live scale + campaign — hidden on phones */}
          <aside className="hidden md:flex md:col-span-5 border-r border-slate-200 bg-slate-50/50 flex-col">
            {/* Live volume counter */}
            <div className="px-3 py-3 border-b border-slate-200">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Live volume
              </p>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-semibold text-[#0F2A4A] tabular-nums leading-none">
                  {rate.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">msgs / min</span>
              </div>
              {/* mini bar-graph implying peak-hour scale */}
              <div className="mt-2 flex items-end gap-[3px] h-8">
                {[40, 62, 48, 74, 90, 66, 82, 58, 96, 70, 84, 52].map((h, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-[#1D4ED8] to-[#60A5FA]"
                    animate={{ height: [`${h}%`, `${Math.max(24, h - 22)}%`, `${h}%`] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-[9px] text-slate-400">
                Release-night peak · agents absorbing volume
              </p>
            </div>

            {/* Campaign broadcast card */}
            <div className="px-3 py-3 space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Campaign
              </p>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                <div className="flex items-center gap-1.5">
                  <Megaphone className="h-3 w-3 text-[#1D4ED8]" />
                  <span className="text-[10px] font-semibold text-[#0F2A4A]">
                    Season 2 drop
                  </span>
                  <span className="ml-auto text-[8.5px] text-slate-400 tabular-nums">
                    218k sent
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
                    animate={{ width: ["18%", "94%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-[8.5px] text-slate-500">
                  <span className="flex items-center gap-0.5">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" /> 71% opened
                  </span>
                  <span className="flex items-center gap-0.5">
                    <TrendingUp className="h-2.5 w-2.5 text-[#1D4ED8]" /> 12.4% CTR
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 flex items-center gap-2">
                <Bell className="h-3 w-3 text-[#1D4ED8] shrink-0" />
                <span className="text-[9.5px] text-[#0F2A4A] leading-snug">
                  Reminder queued · <span className="font-semibold">Doors 7:30pm</span>
                </span>
              </div>
            </div>
          </aside>

          {/* Right pane — ticket card + recommendations */}
          <section className="col-span-12 md:col-span-7 flex flex-col bg-white">
            {/* Ticket / event card */}
            <div className="px-4 pt-4">
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-3.5 text-white shadow-[0_18px_36px_-20px_rgba(29,78,216,0.7)]">
                <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                {/* perforation dots */}
                <span className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-white" aria-hidden="true" />
                <span className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rounded-full bg-white" aria-hidden="true" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium">
                      <Ticket className="h-2.5 w-2.5" /> Live event
                    </span>
                    <p className="mt-2 text-sm font-semibold leading-tight">
                      Aurora Live · World Tour
                    </p>
                    <div className="mt-1.5 flex items-center gap-3 text-[10px] text-white/80">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" /> Sat, 8:00 PM
                      </span>
                      <span>Sec B · Row 12</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/60">from</p>
                    <p className="text-lg font-semibold leading-none">$64</p>
                  </div>
                </div>
                {/* Get tickets action */}
                <div className="relative mt-3 pt-3 border-t border-dashed border-white/25">
                  <AnimatePresence mode="wait">
                    {claimed ? (
                      <motion.div
                        key="claimed"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between"
                      >
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 2 seats held · 9:58 left
                        </span>
                        <span className="font-mono text-[9px] text-white/60">#AUR-2291</span>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="get"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-1.5 text-[11px] font-semibold text-[#1D4ED8]"
                      >
                        <Ticket className="h-3.5 w-3.5" /> Get tickets
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Recommendation carousel header */}
            <div className="px-4 pt-4 pb-1 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#1D4ED8]" />
              <span className="text-[10px] font-semibold text-[#0F2A4A]">
                Recommended for you
              </span>
              <div className="ml-auto flex items-center gap-1">
                {recommendations.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === recIndex ? "w-4 bg-[#1D4ED8]" : "w-1.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Carousel body */}
            <div className="px-4 pb-3 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-2.5"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={`https://picsum.photos/seed/floatmedia${rec.img}/120/120`}
                      alt={rec.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <Play className="h-5 w-5 text-white" fill="#fff" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
                      <Star className="h-2.5 w-2.5" /> {rec.tag}
                    </span>
                    <p className="mt-1 text-[12px] font-semibold text-[#0F2A4A] truncate">
                      {rec.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">{rec.meta}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
                </motion.div>
              </AnimatePresence>

              {/* mini next-up strip */}
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {recommendations
                  .filter((_, i) => i !== recIndex)
                  .slice(0, 3)
                  .map((r) => (
                    <div
                      key={r.title}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                    >
                      <img
                        src={`https://picsum.photos/seed/floatmedia${r.img}/120/70`}
                        alt={r.title}
                        loading="lazy"
                        className="h-10 w-full object-cover"
                      />
                      <p className="px-1.5 py-1 text-[8.5px] font-medium text-[#0F2A4A] truncate">
                        {r.title}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Composer / assist bar */}
            <div className="border-t border-slate-200 bg-white px-3 py-2.5 flex items-center gap-2">
              <div className="flex-1 h-7 rounded-md bg-slate-50 border border-slate-200 px-2 flex items-center">
                <span className="text-[10px] text-slate-400">
                  Ask about tickets, shows, or your account…
                </span>
              </div>
              <button className="text-[10px] font-medium bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white px-2.5 py-1 rounded-md">
                Send
              </button>
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

function TicketingVisual() {
  const steps = [
    { label: "Find Sat 8PM show", done: true },
    { label: "Hold 2 seats · Sec B", done: true },
    { label: "Take payment · $128", done: false, current: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Ticket className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Booking in chat
        </span>
        <span className="ml-auto text-[8.5px] text-slate-400">no ticket window</span>
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
              running
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function RecommendVisual() {
  const picks = [
    { seed: 22, title: "Midnight Signal", why: "you finished S1" },
    { seed: 48, title: "The Long Encore", why: "watched 3 docs" },
    { seed: 71, title: "Harbor Lights", why: "trending near you" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Personalized picks
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8.5px] font-medium text-[#1D4ED8]">
          <Sparkles className="h-2.5 w-2.5" /> per fan
        </span>
      </div>
      {picks.map((p) => (
        <div
          key={p.title}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1"
        >
          <img
            src={`https://picsum.photos/seed/floatrec${p.seed}/60/60`}
            alt={p.title}
            loading="lazy"
            className="h-7 w-7 rounded object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium text-[#0F2A4A] truncate">{p.title}</p>
            <p className="text-[8.5px] text-slate-400 truncate">{p.why}</p>
          </div>
          <Play className="h-3 w-3 text-[#1D4ED8] shrink-0" fill="currentColor" />
        </div>
      ))}
    </div>
  )
}

function SubscriberVisual() {
  const rows = [
    { label: "Where's my invoice?", tag: "Billing", done: true },
    { label: "Pause my plan", tag: "Account", done: true },
    { label: "Reset stream limit", tag: "Access", done: true },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <CreditCard className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          Subscriber support · 24/7
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1"
        >
          <span className="text-[10px] text-[#0F2A4A] flex-1 truncate">{r.label}</span>
          <span className="rounded-full bg-[#3B82F6]/10 px-1.5 py-0.5 text-[8px] font-medium text-[#1D4ED8]">
            {r.tag}
          </span>
          <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
        </div>
      ))}
    </div>
  )
}

function CampaignVisual() {
  const channels = [
    { Icon: SiWhatsapp, bg: "#25D366", label: "WhatsApp" },
    { Icon: SiInstagram, bg: "#E4405F", label: "Instagram" },
    { Icon: SiMessenger, bg: "#0084FF", label: "Messenger" },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A]">
          High-volume broadcast
        </span>
        <span className="text-[8.5px] text-slate-400 tabular-nums">218k queued</span>
      </div>
      <div className="flex items-center gap-1.5">
        {channels.map((c) => (
          <span
            key={c.label}
            className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50/40 px-1.5 py-1"
          >
            <span
              className="h-4 w-4 rounded flex items-center justify-center shrink-0"
              style={{ background: c.bg }}
            >
              <c.Icon style={{ color: "#fff", width: 9, height: 9 }} />
            </span>
            <span className="text-[9px] font-medium text-[#0F2A4A]">{c.label}</span>
          </span>
        ))}
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8]"
          animate={{ width: ["12%", "96%"] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="rounded-md bg-[#EAF2FF] border border-[#3B82F6]/20 px-2 py-1 flex items-center gap-1.5">
        <TrendingUp className="h-2.5 w-2.5 text-[#1D4ED8]" />
        <span className="text-[9px] text-[#0F2A4A]">
          Drives attendance + subscriptions at peak
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Channels
─────────────────────────────────────────────────────────────── */

type ChannelTile = {
  name: string
  detail: string
  bg: string
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>
  Lucide?: typeof MessageSquare
}

const channels: ChannelTile[] = [
  { name: "WhatsApp", detail: "broadcast", bg: "#25D366", Icon: SiWhatsapp },
  { name: "RCS", detail: "rich cards", bg: "#1D4ED8", Lucide: MessageSquare },
  { name: "SMS", detail: "reminders", bg: "#0F2A4A", Lucide: Bell },
  { name: "Instagram", detail: "DMs", bg: "#E4405F", Icon: SiInstagram },
  { name: "Messenger", detail: "DMs", bg: "#0084FF", Icon: SiMessenger },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + Service schema
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Can it scale for release nights and on-sale spikes?",
    answer:
      "Yes. Audiences spike hard around premieres, drops, and on-sales, and agentic AI absorbs that volume without a queue. The same agent that answers one fan at 2 p.m. answers thousands at once during a peak — with no extra staffing and no degraded response time. Routine questions get resolved instantly, and only the genuine edge cases reach a human.",
  },
  {
    question: "Can it actually recommend content and events?",
    answer:
      "Yes, and it personalizes to each fan. Based on what someone has watched, booked, or browsed, the agent suggests the next show, season, or event in the conversation — the same way your app's carousel would, but inside a chat where the fan can act on it immediately. It's recommendations that lead to a play or a purchase, not a dead-end list.",
  },
  {
    question: "Can it take ticketing and booking all the way to payment?",
    answer:
      "It can. Because it's agentic, it completes the multi-step task: find the right show or event, check availability, hold seats, and take payment — inside the chat, without bouncing the fan to a separate ticket window. It runs inside the guardrails you set, so you stay in control of pricing, inventory, and refund rules.",
  },
  {
    question: "Which channels does it cover?",
    answer:
      "WhatsApp, RCS, SMS, web chat, and social DMs like Instagram and Messenger — all from one place. Reminders, recommendations, subscriber support, and campaigns run across every one of them, and the same fan record follows the conversation wherever it happens.",
  },
  {
    question: "How does it help with subscriber support?",
    answer:
      "It answers account and billing questions 24/7 — invoices, plan changes, password resets, stream limits, cancellations — grounded in your systems so the answers are accurate. That frees your team from the repetitive volume and keeps churn-prone moments, like a failed payment or a cancel request, handled instantly and on-brand.",
  },
  {
    question: "How fast can we launch?",
    answer:
      "Days, not months. Connect your channels and point the agent at your content catalog, event inventory, and help center. There are no rigid conversation trees to map and no code to write, so most media and entertainment teams are handling real audience volume within the first week.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI for Media & Entertainment",
  serviceType: "Agentic AI for audience engagement, ticketing, and subscriber support",
  description:
    "Agentic AI for media and entertainment that handles ticketing and booking, personalized recommendations, and 24/7 subscriber support, plus high-volume omnichannel campaigns across WhatsApp, RCS, SMS, and social.",
  url: "https://www.floatchat.com/industry/media-entertainment",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType:
      "Streaming, ticketing, sports, live events, and publishing teams",
  },
}

/* ─────────────────────────────────────────────────────────────
   Related links
─────────────────────────────────────────────────────────────── */

const relatedCards = [
  {
    to: "/agentic-ai",
    Icon: Sparkles,
    title: "Agentic AI",
    body: "The reasoning engine that resolves, recommends, and acts — not just replies.",
  },
  {
    to: "/products/omnichannel-inbox",
    Icon: Inbox,
    title: "Omnichannel Inbox",
    body: "Every fan conversation in one shared inbox, with one record across channels.",
  },
  {
    to: "/channels/whatsapp-broadcasting",
    Icon: MessageSquare,
    title: "WhatsApp Broadcasting",
    body: "Reach fans at scale with opt-in broadcasts for drops, events, and reminders.",
  },
  {
    to: "/channels/rcs-broadcasting",
    Icon: Radio,
    title: "RCS Broadcasting",
    body: "Rich, branded cards with artwork and buttons that turn views into ticket sales.",
  },
]

const relatedPills = [
  { to: "/channels/social", label: "Social channels", Icon: SiInstagram },
  { to: "/integrations", label: "Integrations", Icon: GitBranch },
  { to: "/compare", label: "Compare FloatChat", Icon: GitBranch },
  { to: "/pricing", label: "Pricing", Icon: TrendingUp },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function MediaEntertainmentIndustryPage() {
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
                  <Clapperboard className="h-3.5 w-3.5" />
                  Media &amp; Entertainment · engage audiences at scale
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  Agentic AI for media and{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    entertainment.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Grow audiences and handle high volume with agents that
                  recommend content, sell tickets, support subscribers, and run
                  campaigns across every channel your fans use.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Scales through peaks",
                    "Ticketing in chat",
                    "Personalized recommendations",
                    "Campaigns at scale",
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
                  Built for streaming, ticketing, sports, and publishers.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <MediaMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── RESULTS / STATS BAR ───── */}
        <section className="relative bg-white py-10 lg:py-14 border-y border-slate-200/70">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { Icon: Ticket, value: "In-chat", label: "ticketing & booking help" },
                { Icon: Sparkles, value: "Per-fan", label: "personalized recommendations" },
                { Icon: Bell, value: "24/7", label: "event reminders & updates" },
                { Icon: Megaphone, value: "At scale", label: "campaigns across channels" },
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
                  Audiences spike. Support has to spike with them.
                </h2>
                <div className="mt-6 space-y-4 text-base text-slate-500 leading-relaxed max-w-xl">
                  <p>
                    A premiere, a drop, an on-sale, a big match — demand arrives
                    in a wall, not a trickle. Thousands of fans want tickets,
                    reminders, and answers in the same ten minutes, and a support
                    team sized for the average night can&apos;t catch a peak.
                  </p>
                  <p>
                    Meanwhile every fan expects the polish of a personalized
                    feed: the right show suggested at the right moment, a reminder
                    before doors open, a fast answer on their subscription. Static
                    bots and overflowing queues deliver the opposite.
                  </p>
                  <p>
                    An{" "}
                    <span className="font-semibold text-[#0F2A4A]">
                      agentic AI
                    </span>{" "}
                    layer absorbs the volume, recommends content, sells tickets,
                    and keeps fans engaged — so a spike becomes an opportunity
                    instead of a fire drill.
                  </p>
                </div>
              </BlurFade>

              {/* peak vs staffed contrast */}
              <BlurFade delay={0.15} className="lg:col-span-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-700 mb-3">
                      Staffed for the average
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-slate-900/80 leading-relaxed">
                      {[
                        "Release-night queue backs up for hours",
                        "Fans abandon carts at the ticket window",
                        "Generic blasts nobody opens",
                        "Subscriber questions wait until morning",
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
                      Agents that scale
                    </p>
                    <ul className="space-y-2.5 text-[13px] text-emerald-900/85 leading-relaxed">
                      {[
                        "Peak volume absorbed instantly, no queue",
                        "Tickets booked and paid inside the chat",
                        "Personalized picks that drive a play",
                        "Subscriber help answered 24/7",
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
                  Four jobs your audience never has to wait on.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Ticketing, recommendations, subscriber support, and high-volume
                  campaigns — one agentic layer, one fan record, working around
                  the clock.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Ticket,
                  title: "Ticketing and booking.",
                  body:
                    "The agent finds the show or event, checks availability, holds seats, and takes payment inside the chat — turning interest into a completed sale without a detour to the ticket window.",
                  visual: <TicketingVisual />,
                },
                {
                  Icon: Film,
                  title: "Personalized recommendations.",
                  body:
                    "Based on what each fan has watched, booked, or browsed, it suggests the next show, season, or event — recommendations that lead to a play or a purchase, not a dead-end list.",
                  visual: <RecommendVisual />,
                },
                {
                  Icon: CreditCard,
                  title: "Subscriber support.",
                  body:
                    "Invoices, plan changes, password resets, stream limits, cancellations — answered 24/7 and grounded in your systems, so the repetitive volume never lands on your team.",
                  visual: <SubscriberVisual />,
                },
                {
                  Icon: Megaphone,
                  title: "High-volume campaigns.",
                  body:
                    "Announce drops, remind fans before doors open, and win back lapsed subscribers with opt-in broadcasts across WhatsApp, RCS, SMS, and social — sent and measured from one place.",
                  visual: <CampaignVisual />,
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
                  From a fan&apos;s first message to a filled seat.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Every step happens in one conversation, on the channel the fan
                  already uses — no app switch, no queue.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-[#EAF2FF] via-white to-[#EAF2FF] p-6 lg:p-7">
                <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
                  {[
                    { Icon: MessageSquare, title: "Fan reaches out", note: "WhatsApp, RCS, or social" },
                    { Icon: Sparkles, title: "Agent recommends", note: "personalized to them" },
                    { Icon: Ticket, title: "Books & pays", note: "in the same thread" },
                    { Icon: Bell, title: "Reminded & engaged", note: "then re-marketed at scale" },
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

            {/* channels strip */}
            <div className="mt-8">
              <BlurFade delay={0.15}>
                <p className="text-[12px] font-medium uppercase tracking-wider text-slate-400 mb-3">
                  Runs across every fan channel
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {channels.map((c) => (
                    <div
                      key={c.name}
                      className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                    >
                      <div
                        className="h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-md ring-1 ring-black/5"
                        style={{ background: c.bg }}
                      >
                        {c.Icon ? (
                          <c.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                        ) : c.Lucide ? (
                          <c.Lucide className="h-[18px] w-[18px] text-white" />
                        ) : null}
                      </div>
                      <div className="min-w-0 w-full">
                        <p className="text-sm font-semibold text-[#0F2A4A] truncate">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                          {c.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Turn your next release into your busiest, smoothest night."
          body="Connect your channels and catalog — go live in days, no per-message drama at peak."
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
                  One record behind every fan interaction.
                </h2>
              </BlurFade>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  Icon: Users,
                  title: "Everything on one fan record.",
                  body:
                    "Recommendations, support, tickets, and campaigns share the same record, so a fan's history, preferences, and purchases follow them across every channel.",
                },
                {
                  Icon: Zap,
                  title: "Built for peaks.",
                  body:
                    "Release nights and on-sales don't break it. The agent absorbs high volume the moment it hits — no queue, no extra staffing, no degraded response time.",
                },
                {
                  Icon: TrendingUp,
                  title: "Campaigns drive real revenue.",
                  body:
                    "Because engagement and campaigns run on one platform, a broadcast can lead straight to a booking or a resubscribe — measured end to end, not guessed at.",
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
                    Recommendations, support, and campaigns share one record, so
                    every fan interaction is connected — and every peak is a
                    chance to grow the audience instead of a scramble to survive
                    it.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── RELATED ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="05" label="Explore" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  The platform behind the audience.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The same reasoning engine, inbox, and channels that power fan
                  engagement across media and entertainment.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedCards.map((a, i) => (
                <BlurFade key={a.to} delay={0.05 + i * 0.06} className="h-full">
                  <Link
                    to={a.to}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md">
                      <a.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
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

            {/* related pills */}
            <BlurFade delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-wider text-slate-400">
                  Related
                </span>
                {relatedPills.map((p) => (
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
              description="Straight answers about scale, recommendations, ticketing, and channels."
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
                    "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #60A5FA 60%, #93C5FD 80%, transparent)",
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
                  Engaging audiences at peak volume right now
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
                  Built for scale
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Engage audiences with{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                  agentic AI.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Grow audiences and handle high volume with agents that recommend,
                sell tickets, support subscribers, and run campaigns across every
                channel.
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
                "Scales through peaks",
                "Ticketing in chat",
                "Personalized recommendations",
                "Campaigns at scale",
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
