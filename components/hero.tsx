"use client"

import { Suspense, lazy, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
const Spline = lazy(() => import("@splinetool/react-spline"))
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowUpRight, Send, Download, MousePointer2, Check, Star, MessageCircle } from "lucide-react"
import { WordRotate } from "@/components/ui/word-rotate"

const rotatingWords = ["support", "sales", "booking", "leads", "commerce"]
const trustBadges = [
  { icon: Check, label: "US-hosted" },
  { icon: Check, label: "Free forever plan" },
  { icon: Check, label: "AI from $9.99" },
  { icon: Check, label: "99.9% uptime" },
  { icon: Star, label: "4.8/5 G2" },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* ---------- Inline SVG assets ---------- */

function PaperPlane({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <defs>
        <linearGradient id="pp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7CC4FF" />
          <stop offset="100%" stopColor="#1B6BFF" />
        </linearGradient>
      </defs>
      <path d="M58 6 6 28l20 6 6 20L58 6Z" fill="url(#pp)" />
      <path d="M58 6 26 34l6 20L58 6Z" fill="#1B6BFF" opacity=".75" />
      <path d="M58 6 26 34" stroke="#fff" strokeOpacity=".4" strokeWidth="1" />
    </svg>
  )
}

/* ---------- Avatars (tinted circles, swap with photos when you have them) ---------- */

function Avatar({ tone = "amber", initial = "" }: { tone?: "amber" | "rose" | "violet"; initial?: string }) {
  const grads: Record<string, string> = {
    amber: "from-amber-300 to-rose-400",
    rose: "from-rose-300 to-pink-500",
    violet: "from-indigo-300 to-violet-500",
  }
  return (
    <div
      className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${grads[tone]} ring-2 ring-white shadow flex items-center justify-center text-[10px] font-medium text-white`}
    >
      {initial}
    </div>
  )
}

/* ---------- Spline 3D bot ---------- */

/**
 * The Spline runtime is ~4.5 MB of JS. Loading it on every visit tanks the
 * Lighthouse score, so by default we show a static poster (public/hero-bot.png,
 * a screenshot of the same scene — see scripts/capture-hero-bot.mjs). The live
 * 3D scene loads only when the user hovers the card. Lighthouse never hovers,
 * so it never pays the 3D cost; the poster looks identical at rest.
 */
function SplineBot() {
  const [load3d, setLoad3d] = useState(false)

  const poster = (
    <img
      src="/hero-bot.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      loading="lazy"
      width={640}
      height={640}
      className="w-full h-full object-contain select-none"
    />
  )

  return (
    <div
      className="relative w-52 h-52 lg:w-64 lg:h-64 overflow-hidden"
      onMouseEnter={() => setLoad3d(true)}
    >
      {/* Render Spline at large internal size, then crop tightly to the bot */}
      <div className="absolute left-1/2 top-1/2 w-[640px] h-[640px] -translate-x-1/2 -translate-y-1/2 scale-[0.95] origin-center">
        {load3d ? (
          <Suspense fallback={poster}>
            <Spline scene="https://prod.spline.design/NMZWNEaWEPuubtjF/scene.splinecode" />
          </Suspense>
        ) : (
          poster
        )}
      </div>
      {/* Cover Spline watermark (bottom-right corner) */}
      <div className="absolute bottom-0 right-0 w-32 h-8 bg-white pointer-events-none" />
    </div>
  )
}

/* ---------- Hero ---------- */

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-28 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-70"
             style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }} />
        <div className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
             style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }} />
        <div className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
             style={{ background: "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(closest-side, #DBE7FF 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[480px] h-[420px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(closest-side, #C5DCFF 0%, transparent 70%)" }} />
      </div>

      {/* Subtle dotted overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
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
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1B6BFF] animate-pulse" />
            Free customer support inbox — No credit card required
          </div>
        </motion.div>

        {/* Headline area + side cards */}
        <div className="relative mt-5">
          {/* Left: 10M+ Downloads */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hidden xl:flex absolute left-0 xl:-left-4 2xl:-left-12 top-6 flex-col items-center gap-3"
          >
            <div className="text-center">
              <div className="text-[34px] leading-none font-medium text-[#0F2A4A]">10k+</div>
              <div className="mt-1 text-[12px] font-medium text-slate-500">Daily messages</div>
            </div>
            <div className="relative">
              <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_10px_24px_-6px_rgba(16,185,129,0.6)]">
                <Download className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <MousePointer2
                className="absolute -bottom-3 -right-4 h-6 w-6 text-emerald-500 fill-emerald-400 -rotate-12"
                strokeWidth={1.5}
              />
            </div>
          </motion.div>

          {/* Right: testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden xl:block absolute right-0 xl:-right-4 2xl:-right-12 top-8"
          >
            <div className="w-52 2xl:w-56 rounded-2xl bg-white px-3.5 py-3 shadow-[0_10px_30px_-8px_rgba(15,42,74,0.15)] border border-slate-100">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-2 ring-white" />
                <span className="text-sm font-medium text-[#0F2A4A]">Sarah K.</span>
              </div>
              <p className="text-[12px] leading-snug text-slate-500">
                Tried many inboxes — this one finally clicked. <span className="ml-0.5">🔥</span>
              </p>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl xl:max-w-4xl text-center font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] px-6 py-4"
          >
            Agentic AI for{" "}
            <WordRotate
              words={rotatingWords}
              className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent"
              duration={2800}
            />
            <br />
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
              on every channel.
            </span>
            <PaperPlane className="inline-block ml-3 h-8 w-8 lg:h-10 lg:w-10 -rotate-12 align-middle" />
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-center text-[15px] lg:text-base text-slate-500 max-w-2xl mx-auto"
        >
          Deploy agentic AI that talks, takes action, and broadcasts across WhatsApp, RCS, SMS, voice, email, and social — all from one platform.
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500"
        >
          {trustBadges.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
              <Icon
                className={`h-3.5 w-3.5 ${label === "4.8/5 G2" ? "text-amber-400 fill-amber-400" : "text-[#1B6BFF]"}`}
              />
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70"
              style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)" }}
            />
            <Button
              asChild
              className="group h-12 px-8 min-w-[160px] justify-center rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
            >
              <Link to="/signup?plan=free">
                Start Free
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </Link>
            </Button>
          </div>
          <Button
            asChild
            variant="outline"
            className="h-12 px-8 min-w-[160px] justify-center rounded-full text-[15px] font-medium border-slate-300 hover:bg-white"
          >
            <Link to="/demo">Book a Demo</Link>
          </Button>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-center text-sm text-slate-500"
        >
          No credit card.{" "}
          <Link to="/live-chat" className="underline underline-offset-2 hover:text-[#0F2A4A] transition-colors">
            Live chat widget
          </Link>{" "}
          on your site in 5 minutes. Free forever.
        </motion.p>

        {/* Three feature cards with dotted connectors */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch relative"
        >
          {/* dotted connector overlay (desktop) */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <line x1="25%" y1="50%" x2="38%" y2="50%" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 5" />
            <line x1="62%" y1="50%" x2="75%" y2="50%" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 5" />
          </svg>

          {/* Left card */}
          <div className="lg:col-span-3 group rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-5 transition-all hover:border-[#1B6BFF]/30 hover:shadow-[0_20px_40px_-12px_rgba(27,107,255,0.15)]">
            <div className="rounded-xl border border-dashed border-slate-200 bg-gradient-to-b from-white to-[#F4F8FF] p-4 h-full flex flex-col">
              {/* Header with icon pill */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1B6BFF] flex items-center justify-center shadow-md shadow-[#1B6BFF]/30">
                  <MessageCircle className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#0F2A4A] leading-tight">Live Chat Widget</h3>
                  <p className="text-[10.5px] text-slate-500">Install in 5 minutes</p>
                </div>
              </div>

              {/* Mini widget mockup */}
              <div className="mt-4 relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                {/* widget header */}
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#1B6BFF] px-3 py-2 flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-white/25 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-medium text-white">We're online</span>
                </div>
                {/* message */}
                <div className="px-3 py-2.5 space-y-1.5">
                  <div className="rounded-lg rounded-bl-sm bg-slate-100 px-2 py-1.5 max-w-[85%]">
                    <p className="text-[10px] text-[#0F2A4A] leading-snug">Hi! How can we help?</p>
                  </div>
                </div>
                {/* input */}
                <div className="px-3 pb-2.5 flex items-center gap-1.5">
                  <div className="flex-1 h-6 rounded-full bg-slate-100 border border-slate-200 px-2 flex items-center">
                    <span className="text-[9px] text-slate-400">Type a message…</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#1B6BFF] flex items-center justify-center">
                    <Send className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
              </div>

              {/* Feature bullets */}
              <ul className="mt-auto pt-4 space-y-1.5 text-[10.5px] text-slate-600">
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} /> One-line install
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} /> Fully customizable
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="h-3 w-3 text-emerald-500" strokeWidth={3} /> Works on every CMS
                </li>
              </ul>
            </div>
          </div>

          {/* Center large card */}
          <div className="hidden lg:block lg:col-span-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-5">
            <div
              className="relative rounded-xl border border-dashed border-slate-200 bg-white/80 p-6 lg:p-8 min-h-[300px] flex items-center"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              <div className="grid grid-cols-5 gap-4 w-full items-center">
                {/* Bot mascot — Spline 3D */}
                <div className="col-span-2 flex justify-center">
                  <SplineBot />
                </div>

                {/* Conversation */}
                <div className="col-span-3 flex flex-col gap-2.5">
                  <ConversationAnimation />
                </div>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="lg:col-span-3 group rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 p-5 transition-all hover:border-emerald-300 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.18)]">
            <div className="rounded-xl border border-dashed border-slate-200 bg-gradient-to-b from-white to-emerald-50/40 p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <WhatsAppIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-[#0F2A4A] leading-tight">WhatsApp Two-Way</h3>
                  <p className="text-[10.5px] text-slate-500">All channels, one inbox</p>
                </div>
              </div>

              {/* WhatsApp-style chat preview */}
              <div
                className="mt-4 relative rounded-2xl bg-[#E5DDD5] border border-slate-200 shadow-sm overflow-hidden"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(15,42,74,0.05) 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              >
                {/* header */}
                <div className="bg-emerald-600 px-3 py-2 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-1 ring-white/40" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-medium text-white leading-tight truncate">Mia · Customer</p>
                    <p className="text-[8.5px] text-emerald-100 leading-tight">online</p>
                  </div>
                </div>
                {/* messages */}
                <div className="px-2.5 py-2.5 space-y-1.5">
                  <div className="flex justify-start">
                    <div className="rounded-lg rounded-tl-sm bg-white px-2 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10px] text-[#0F2A4A] leading-snug">Order #4421 update?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-lg rounded-tr-sm bg-[#DCF8C6] px-2 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10px] text-[#0F2A4A] leading-snug">Out for delivery 🚚</p>
                      <p className="text-[8px] text-slate-500 text-right mt-0.5">9:41 ✓✓</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel chips */}
              <div className="mt-auto pt-4">
                <p className="text-[9px] uppercase tracking-wider font-medium text-slate-400 mb-1.5">Connects with</p>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
                    <WhatsAppIcon className="h-2.5 w-2.5" /> WhatsApp
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 border border-pink-200 px-1.5 py-0.5 text-[9px] font-medium text-pink-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-400 to-pink-500" /> Instagram
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-[9px] font-medium text-blue-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Messenger
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type Msg = { from: "user" | "bot"; text: string; tone?: "amber" | "rose" | "violet"; initial?: string }

const SCRIPT: Msg[] = [
  { from: "user", tone: "amber", initial: "J", text: "Hey, do you ship to NYC?" },
  { from: "bot", text: "Yes — free shipping on orders over $50. ETA 2 days." },
  { from: "user", tone: "rose", initial: "J", text: "Perfect, ordering now!" },
  { from: "bot", text: "Awesome 🎉 I'll send tracking shortly." },
]

function ConversationAnimation() {
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

      while (!cancelled) {
        setVisible(0)
        setTyping(false)
        await wait(600)

        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return
          if (SCRIPT[i].from === "bot") {
            setTyping(true)
            await wait(900)
            if (cancelled) return
            setTyping(false)
          } else {
            await wait(300)
          }
          setVisible(i + 1)
          await wait(SCRIPT[i].text.length * 35 + 600)
        }

        await wait(2200)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex flex-col gap-2 min-h-[170px]">
      <AnimatePresence initial={false}>
        {SCRIPT.slice(0, visible).map((m, i) => (
          <ChatMessage key={i} {...m} />
        ))}
        {typing && <TypingIndicator key="typing" />}
      </AnimatePresence>
    </div>
  )
}

function ChatMessage({
  from,
  tone,
  initial,
  text,
}: {
  from: "user" | "bot"
  tone?: "amber" | "rose" | "violet"
  initial?: string
  text: string
}) {
  const isBot = from === "bot"
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-end gap-2 ${isBot ? "flex-row-reverse" : ""}`}
    >
      {isBot ? (
        <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1B6BFF] ring-2 ring-white shadow flex items-center justify-center text-[10px] font-medium text-white">
          AI
        </div>
      ) : (
        <Avatar tone={tone ?? "amber"} initial={initial ?? ""} />
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-[12px] leading-snug shadow-sm border ${
          isBot
            ? "bg-[#1B6BFF] text-white border-[#1B6BFF]/20 rounded-br-sm"
            : "bg-white text-[#0F2A4A] border-slate-200 rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-end gap-2 flex-row-reverse"
    >
      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1B6BFF] ring-2 ring-white shadow flex items-center justify-center text-[10px] font-medium text-white">
        AI
      </div>
      <div className="rounded-2xl rounded-br-sm bg-[#1B6BFF]/10 border border-[#1B6BFF]/20 px-3 py-2 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1B6BFF] animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#1B6BFF] animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 rounded-full bg-[#1B6BFF] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </motion.div>
  )
}
