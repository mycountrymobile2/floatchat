"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Bell,
  Inbox as InboxIcon,
  Send,
  Code2,
  Zap,
  Globe,
  ShoppingBag,
} from "lucide-react"
import { FaWhatsapp, FaShopify, FaWordpress } from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero: fake e-commerce site with chat widget popping out
─────────────────────────────────────────────────────────────── */

function WidgetOnSiteMockup() {
  // 0: collapsed, 1: opened greeting, 2: customer reply, 3: agent typing, 4: agent reply
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(900)
        if (cancelled) return
        setPhase(1)
        await wait(1500)
        if (cancelled) return
        setPhase(2)
        await wait(1800)
        if (cancelled) return
        setPhase(3)
        await wait(1300)
        if (cancelled) return
        setPhase(4)
        await wait(2600)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isOpen = phase >= 1
  const showCustomer = phase >= 2
  const showTyping = phase === 3
  const showAgentReply = phase >= 4

  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      {/* Floating Lighthouse pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center">
          <Zap className="h-2.5 w-2.5 text-white" strokeWidth={3} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Lighthouse <span className="text-emerald-600">100</span>
        </span>
      </motion.div>

      {/* Floating install-time pill */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Code2 className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">5-min install</span>
      </motion.div>

      {/* Browser window */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-[10px] text-slate-500">
              <Globe className="h-2.5 w-2.5" />
              <span className="font-mono">atelierlinen.com</span>
            </div>
          </div>
          <span className="text-[9px] text-slate-400 font-mono">⌘R</span>
        </div>

        {/* Fake e-commerce site */}
        <div className="relative h-[480px] sm:h-[500px] bg-gradient-to-b from-stone-50 to-white overflow-hidden">
          {/* Site nav */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200/70">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-700">
              Atelier
            </span>
            <div className="flex items-center gap-3 text-[10px] text-stone-500">
              <span>Shop</span>
              <span>Story</span>
              <span>Journal</span>
              <ShoppingBag className="h-3 w-3" />
            </div>
          </div>

          {/* Hero product */}
          <div className="grid grid-cols-2 gap-4 p-5">
            {/* Product image */}
            <div className="relative rounded-lg bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 120" className="w-3/5 h-3/5 text-stone-400">
                  <path
                    d="M30 20 L50 10 L70 20 L80 30 L75 35 L70 30 L70 105 L30 105 L30 30 L25 35 L20 30 Z"
                    fill="currentColor"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-white/90 border border-stone-200 px-1.5 py-0.5 text-[8px] font-medium text-stone-700">
                New
              </span>
            </div>

            {/* Product info */}
            <div className="space-y-2">
              <p className="text-[9px] uppercase tracking-wider text-stone-500">
                Linen Collection
              </p>
              <h3 className="text-sm font-semibold text-stone-900 leading-tight">
                Atelier Linen Tee
              </h3>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-stone-900">$89</span>
                <span className="text-[10px] line-through text-stone-400">$129</span>
              </div>
              <p className="text-[10px] text-stone-500 leading-snug">
                Pre-washed European linen. Cut in Lisbon. Ships free.
              </p>
              <div className="flex items-center gap-1 pt-1">
                {["XS", "S", "M", "L"].map((s) => (
                  <span
                    key={s}
                    className={`h-6 w-6 inline-flex items-center justify-center rounded border text-[9px] font-medium ${
                      s === "M"
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-300 text-stone-600"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <button className="mt-2 w-full rounded-md bg-stone-900 text-white text-[10px] font-medium py-2">
                Add to cart
              </button>
            </div>
          </div>

          {/* Trust strip */}
          <div className="px-5 pb-4 flex items-center justify-between text-[9px] text-stone-500">
            <span>Free US shipping</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>30-day returns</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>Made in Portugal</span>
          </div>

          {/* Widget pop-in toast */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-20 right-4 max-w-[200px] rounded-xl rounded-br-sm bg-white border border-slate-200 shadow-[0_15px_40px_-15px_rgba(15,42,74,0.25)] px-3 py-2"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-1 ring-white" />
                  <span className="text-[9.5px] font-medium text-[#0F2A4A]">Sarah</span>
                  <span className="text-[8.5px] text-emerald-600 flex items-center gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    online
                  </span>
                </div>
                <p className="text-[10px] text-[#0F2A4A] leading-snug">
                  👋 Hey! Anything I can help with?
                </p>
                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-white border-r border-b border-slate-200" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expanded widget */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="widget"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 w-[220px] rounded-2xl bg-white border border-slate-200 shadow-[0_25px_50px_-12px_rgba(15,42,74,0.4)] overflow-hidden"
              >
                {/* Widget header */}
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-3 py-2.5 flex items-center gap-2">
                  <div className="relative">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-amber-300 to-rose-400 ring-2 ring-white/30" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#1D4ED8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white leading-tight">
                      Sarah · Atelier
                    </p>
                    <p className="text-[9px] text-blue-100">Usually replies in 2 min</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="px-2.5 py-2.5 space-y-1.5 min-h-[150px] bg-slate-50/40">
                  <div className="flex justify-start">
                    <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10.5px] text-[#0F2A4A]">
                        Hey! Anything I can help with?
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showCustomer && (
                      <motion.div
                        key="cust"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end"
                      >
                        <div className="rounded-xl rounded-br-sm bg-[#3B82F6] text-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                          <p className="text-[10.5px]">Is this in size M?</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showTyping && (
                      <motion.div
                        key="typ"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex justify-start"
                      >
                        <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 shadow-sm flex items-center gap-1">
                          {[0, 1, 2].map((d) => (
                            <motion.span
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-slate-400"
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
                  </AnimatePresence>

                  <AnimatePresence>
                    {showAgentReply && (
                      <motion.div
                        key="ag"
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="flex justify-start"
                      >
                        <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                          <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                            Yes! M is in stock — ships today 📦
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Composer */}
                <div className="px-2.5 py-2 border-t border-slate-200 flex items-center gap-1.5">
                  <div className="flex-1 h-6 rounded-full bg-slate-100 border border-slate-200 px-2 flex items-center">
                    <span className="text-[9px] text-slate-400">Type a message…</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-sm">
                    <Send className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
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
   Vertical-tab capability switcher (different from bento)
─────────────────────────────────────────────────────────────── */

type TabId = "widget" | "responsive" | "notif" | "inbox"

const tabs: {
  id: TabId
  label: string
  short: string
  Icon: typeof MessageSquare
  body: string
}[] = [
  {
    id: "widget",
    label: "Widget on your website.",
    short: "Widget on your site",
    Icon: Globe,
    body:
      "JavaScript snippet. Works with Shopify, WooCommerce, WordPress, custom HTML. Anywhere.",
  },
  {
    id: "responsive",
    label: "Mobile-responsive design.",
    short: "Mobile responsive",
    Icon: Smartphone,
    body: "Adapts to phone, tablet, desktop. No separate setup.",
  },
  {
    id: "notif",
    label: "Real-time notifications.",
    short: "Notifications",
    Icon: Bell,
    body:
      "Get pinged when a customer messages. Reply from your browser — no separate app.",
  },
  {
    id: "inbox",
    label: "One inbox for everything.",
    short: "Unified inbox",
    Icon: InboxIcon,
    body:
      "Same dashboard handles your email, WhatsApp, and contacts. Not just chat.",
  },
]

function CapabilityTabs() {
  const [active, setActive] = useState<TabId>("widget")

  return (
    <div className="grid grid-cols-12 gap-5 lg:gap-8">
      {/* Tab rail */}
      <div className="col-span-12 lg:col-span-5">
        <div className="grid gap-2 lg:grid-rows-4 lg:h-[460px]">
          {tabs.map((t, i) => {
            const isActive = t.id === active
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative w-full text-left rounded-2xl border transition-all duration-300 px-4 py-4 group ${
                  isActive
                    ? "border-[#3B82F6]/40 bg-white shadow-[0_15px_40px_-20px_rgba(59,130,246,0.4)]"
                    : "border-slate-200 bg-white/50 hover:bg-white hover:border-slate-300"
                }`}
              >
                {/* Active accent bar */}
                {isActive && (
                  <motion.span
                    layoutId="tab-accent"
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[#60A5FA] to-[#1D4ED8]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="flex items-start gap-3 pl-2">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] shadow-md shadow-[#3B82F6]/30"
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                  >
                    <t.Icon
                      className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`}
                      strokeWidth={2.25}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] font-mono text-slate-400">
                        / 0{i + 1}
                      </span>
                      <p
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#0F2A4A]" : "text-slate-600"
                        }`}
                      >
                        {t.label}
                      </p>
                    </div>
                    <p
                      className={`mt-1 text-[12.5px] leading-relaxed ${
                        isActive ? "text-slate-600" : "text-slate-400"
                      }`}
                    >
                      {t.body}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active visual */}
      <div className="col-span-12 lg:col-span-7">
        <div className="relative min-h-[400px] lg:h-[460px] rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-[#F5F9FF] p-6 lg:p-8 overflow-hidden">
          {/* Ambient blob */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(96,165,250,0.4), transparent 70%)",
            }}
          />
          <AnimatePresence mode="wait">
            {active === "widget" && <WidgetCodeVisual key="widget" />}
            {active === "responsive" && <ResponsiveVisual key="responsive" />}
            {active === "notif" && <NotificationVisual key="notif" />}
            {active === "inbox" && <UnifiedInboxVisual key="inbox" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  )
}

function WidgetCodeVisual() {
  return (
    <FadeIn>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
            One snippet
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Code block */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0F172A] shadow-[0_20px_40px_-20px_rgba(15,42,74,0.4)]">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-700 bg-slate-800/50">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 text-[10px] font-mono text-slate-400">
              index.html
            </span>
            <button className="ml-auto text-[9px] font-medium text-slate-300 hover:text-white border border-slate-700 rounded px-1.5 py-0.5">
              Copy
            </button>
          </div>
          <pre className="px-4 py-3 text-[11px] font-mono leading-relaxed text-slate-300">
            {`<script async\n  src="https://cdn.floatchat.com/`}
            <span className="text-[#7CC4FF]">widget</span>
            {`.js"\n  data-`}
            <span className="text-[#7CC4FF]">site</span>
            {`="atelier_`}
            <span className="text-emerald-400">a7f9</span>
            {`">\n</script>`}
          </pre>
        </div>

        {/* Platform chips */}
        <div>
          <p className="text-[10.5px] uppercase tracking-wider font-medium text-slate-400 mb-2">
            Drops cleanly into
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { Icon: FaShopify, label: "Shopify", color: "#95BF47" },
              { Icon: FaWordpress, label: "WordPress", color: "#21759B" },
              { Icon: Code2, label: "Custom HTML", color: "#3B82F6" },
              { Icon: Globe, label: "Webflow", color: "#4353FF" },
            ].map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-[#0F2A4A]"
              >
                <p.Icon style={{ color: p.color, width: 12, height: 12 }} />
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Lighthouse score chip */}
        <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
            100
          </div>
          <div>
            <p className="text-[11px] font-semibold text-emerald-700">
              Lighthouse perf
            </p>
            <p className="text-[10px] text-emerald-600/80">
              ~24 KB async · ≤ 2 pt impact
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

function ResponsiveVisual() {
  return (
    <FadeIn>
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
            Same widget · every device
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Devices — small, baseline-aligned, fits panel height */}
        <div className="flex-1 flex items-end justify-center gap-4 sm:gap-6 pb-4">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <div className="w-[58px] sm:w-[68px] aspect-[1/2] rounded-[12px] border-[3px] border-slate-800 bg-slate-100 overflow-hidden relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-slate-800" />
              <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow">
                <MessageSquare className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
              <Smartphone className="h-3 w-3" />
              Mobile
            </div>
          </div>

          {/* Tablet */}
          <div className="flex flex-col items-center">
            <div className="w-[84px] sm:w-[100px] aspect-[3/4] rounded-md border-[3px] border-slate-800 bg-slate-100 overflow-hidden relative">
              <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow">
                <MessageSquare className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
              <Tablet className="h-3 w-3" />
              Tablet
            </div>
          </div>

          {/* Desktop */}
          <div className="flex flex-col items-center">
            <div className="w-[140px] sm:w-[170px] aspect-[16/10] rounded-md border-[3px] border-slate-800 bg-slate-100 overflow-hidden relative">
              <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow">
                <MessageSquare className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="h-1.5 w-1/3 rounded-b-md bg-slate-800" />
            <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
              <Monitor className="h-3 w-3" />
              Desktop
            </div>
          </div>
        </div>

        {/* Bottom card */}
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 mt-auto">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" strokeWidth={3} />
            <p className="text-[12px] font-medium text-[#0F2A4A]">
              No separate mobile setup
            </p>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
            One config — widget reflows for breakpoints automatically. Position,
            colors, and greeting all stay consistent.
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

function NotificationVisual() {
  return (
    <FadeIn>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
            Pinged the moment a message lands
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Stacked notifications */}
        <div className="space-y-2.5">
          <NotifCard
            time="just now"
            channel="Live Chat · atelierlinen.com"
            channelColor="#3B82F6"
            name="Jessica Chen"
            preview="Is the linen tee in size M?"
            unread
          />
          <NotifCard
            time="1m"
            channel="Email · sales inbox"
            channelColor="#EA4335"
            name="Marcus W."
            preview="Replying about your invoice…"
          />
          <NotifCard
            time="3m"
            channel="WhatsApp · +1 415 ***"
            channelColor="#25D366"
            name="Ashley R."
            preview="Where do I track my order?"
          />
        </div>

        {/* Browser permission chip */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
            <Bell className="h-3.5 w-3.5 text-[#1D4ED8]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-[#0F2A4A]">
              Browser + desktop notifications
            </p>
            <p className="text-[10px] text-slate-500">
              No separate mobile app — works from any tab.
            </p>
          </div>
          <span className="text-[10px] font-medium text-emerald-600 inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            on
          </span>
        </div>
      </div>
    </FadeIn>
  )
}

function NotifCard({
  time,
  channel,
  channelColor,
  name,
  preview,
  unread,
}: {
  time: string
  channel: string
  channelColor: string
  name: string
  preview: string
  unread?: boolean
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className={`relative rounded-xl border bg-white px-3 py-2.5 shadow-[0_8px_20px_-12px_rgba(15,42,74,0.18)] ${
        unread ? "border-[#3B82F6]/30" : "border-slate-200"
      }`}
    >
      {unread && (
        <span className="absolute top-2 right-3 h-2 w-2 rounded-full bg-[#3B82F6]">
          <motion.span
            className="absolute inset-0 rounded-full bg-[#3B82F6]"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </span>
      )}
      <div className="flex items-center gap-2 mb-1">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: channelColor }}
        />
        <p className="text-[9.5px] font-medium uppercase tracking-wider text-slate-500">
          {channel}
        </p>
        <span className="ml-auto text-[9.5px] text-slate-400">{time}</span>
      </div>
      <p className="text-[11.5px] font-semibold text-[#0F2A4A]">{name}</p>
      <p className="text-[11px] text-slate-500 truncate">{preview}</p>
    </motion.div>
  )
}

function UnifiedInboxVisual() {
  return (
    <FadeIn>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider font-medium text-slate-400">
            Every channel · one screen
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Hub & spokes */}
        <div className="relative h-[200px] rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-[#3B82F6]/40">
              <InboxIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-[#3B82F6]/30 blur-xl -z-10 animate-pulse" />
          </div>

          {/* Spokes */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            {[
              ["12%", "20%"],
              ["88%", "20%"],
              ["10%", "75%"],
              ["88%", "75%"],
            ].map(([x, y], i) => (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={x}
                y2={y}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
            ))}
          </svg>

          {/* Channel nodes */}
          <ChannelNode
            x="12%"
            y="20%"
            Icon={MessageSquare}
            label="Live Chat"
            color="#3B82F6"
          />
          <ChannelNode
            x="88%"
            y="20%"
            Icon={FaWhatsapp}
            label="WhatsApp"
            color="#25D366"
          />
          <ChannelNode
            x="10%"
            y="75%"
            Icon={Bell}
            label="Email"
            color="#EA4335"
          />
          <ChannelNode
            x="88%"
            y="75%"
            Icon={Globe}
            label="Contacts"
            color="#8B5CF6"
          />
        </div>

        {/* Reduction count */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { num: "10", label: "Channels" },
            { num: "1", label: "Inbox" },
            { num: "∞", label: "Conversations" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center"
            >
              <p className="text-xl font-semibold text-[#1D4ED8] leading-none">
                {s.num}
              </p>
              <p className="mt-1 text-[10px] text-slate-500 uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  )
}

function ChannelNode({
  x,
  y,
  Icon,
  label,
  color,
}: {
  x: string
  y: string
  Icon: React.ComponentType<{ style?: React.CSSProperties }>
  label: string
  color: string
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
      style={{ left: x, top: y }}
    >
      <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
        <Icon style={{ color, width: 16, height: 16 }} />
      </div>
      <span className="text-[9px] font-medium text-slate-500">{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ items — preserved from current page
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is the widget really free forever?",
    answer:
      'Yes. One domain, one agent, FloatChat-branded. No card on file. No "trial ending in 7 days."',
  },
  {
    question: "Does the widget slow down my site?",
    answer:
      "No. Async load, lazy-init, ~24 KB. Lighthouse score impact is under 2 points.",
  },
  {
    question: "Can I use FloatChat as a Tawk.to replacement?",
    answer:
      "Yes. We import your contacts and message history when you switch. Free migration.",
  },
  {
    question: "What about mobile apps?",
    answer:
      "FloatChat is web-only. Works fine in mobile browsers, but there is no iOS/Android app.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function LiveChatPage() {
  useEffect(() => {
    document.title = "Free Live Chat for Your Website | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Drop the widget on your site in 5 minutes. Free forever for one domain. Add AI from $9.99. Tawk.to alternative with a real upgrade path.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          {/* Mesh blobs */}
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
              {/* Left content */}
              <div className="lg:col-span-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Live Chat · free on one domain, forever
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Free live chat.
                  <br />
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    Real upgrade path.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Drop the widget on your site in 5 minutes. Free forever for one
                  domain. Add AI Captain on Lite at $9.99 when you're ready.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Free forever",
                    "5-minute install",
                    "No credit card",
                    "99.9% uptime",
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
                      Get Free Widget
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
                  className="mt-4 text-sm text-slate-500"
                >
                  Free plan includes the widget on one domain. FloatChat-branded.
                </motion.p>
              </div>

              {/* Right interactive mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <WidgetOnSiteMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── CAPABILITY TABS (different pattern from AI Agent's bento) ───── */}
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
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="On every plan" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What you get free.
                </h2>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <CapabilityTabs />
            </BlurFade>
          </div>
        </section>

        {/* ───── COMPARISON ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="Free vs free" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How we compare on{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    free plans.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Tawk, Tidio, and Crisp give you a chat widget for free. None give
                  you the full inbox.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8">
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Feature
                          </th>
                          <th className="text-left p-4 text-[11px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                            FloatChat Free
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Tawk.to
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Tidio
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Crisp
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            f: "Live chat widget",
                            fc: "Yes",
                            t: "Yes",
                            ti: "Yes (50/mo)",
                            c: "Yes",
                          },
                          {
                            f: "Email inbox",
                            fc: "Yes",
                            t: "No",
                            ti: "Yes",
                            c: "Yes",
                          },
                          {
                            f: "WhatsApp two-way",
                            fc: "Yes",
                            t: "No",
                            ti: "No",
                            c: "No",
                          },
                          {
                            f: "Shopify integration",
                            fc: "Yes",
                            t: "No",
                            ti: "Yes",
                            c: "No",
                          },
                          {
                            f: "AI Chatbot",
                            fc: "Lite $9.99",
                            t: "Add-on",
                            ti: "Lite paid",
                            c: "Add-on",
                          },
                          {
                            f: "Real upgrade path",
                            fc: "6 tiers",
                            t: "Hire agents only",
                            ti: "Yes",
                            c: "Yes",
                          },
                        ].map((row) => (
                          <tr
                            key={row.f}
                            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/40 transition-colors"
                          >
                            <td className="p-4 font-medium text-[#0F2A4A]">{row.f}</td>
                            <td className="p-4 bg-gradient-to-r from-[#EAF2FF] to-transparent">
                              <Cell value={row.fc} highlight />
                            </td>
                            <td className="p-4">
                              <Cell value={row.t} />
                            </td>
                            <td className="p-4">
                              <Cell value={row.ti} />
                            </td>
                            <td className="p-4">
                              <Cell value={row.c} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              {/* Pull-quote — 5 minutes */}
              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-2xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Install
                    </p>
                    <p className="mt-4 text-6xl lg:text-7xl font-medium tracking-tight">
                      5
                      <span className="text-3xl lg:text-4xl text-white/70 ml-1">
                        min
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Average install time. Paste a script tag. You're live.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      No build step. No deploy.
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── ADD AI WHEN READY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="Upgrade when ready" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Add AI when you're ready.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <BlurFade delay={0.1} className="h-full">
                <UpgradeCard
                  tier="Lite"
                  price="$9.99"
                  blurb="Upgrade to Lite to add:"
                  items={[
                    "AI Chatbot (200 replies/month)",
                    "Auto Reply (keyword + after-hours)",
                    "API access + Webhooks",
                    "Knowledge base training",
                  ]}
                  accent="blue"
                />
              </BlurFade>
              <BlurFade delay={0.2} className="h-full">
                <UpgradeCard
                  tier="Starter"
                  price="$19.99"
                  blurb="Jump to Starter to:"
                  items={[
                    "Add 9 more channels (voice, SMS, Instagram, etc.)",
                    "Get 3 agents",
                    'Remove "Powered by FloatChat" branding',
                    "Customize widget colors and upload your logo",
                  ]}
                  accent="violet"
                />
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Drop the free live chat widget on your site"
          body="JavaScript snippet. Works with Shopify, WordPress, Webflow, custom HTML."
          primaryLabel="Get Free Widget"
          primaryHref="/signup?plan=free"
          secondaryLabel="See pricing"
          secondaryHref="/pricing"
        />

        {/* ───── TESTIMONIALS — same as homepage ───── */}
        <Testimonials />

        {/* ───── FAQ — homepage style, LC copy ───── */}
        <section
          id="faq"
          className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#EEF2FF]"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Common questions"
              description="The widget, the install, the upgrade path — no spin."
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

        {/* ───── FINAL CTA — homepage clone, LC copy ───── */}
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
                  142 widgets installed today
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">avg. setup 4m 32s</span>
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
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
                Try Free{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  now.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                30 seconds. No credit card. Paste a script tag — the widget's live on
                your site.
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
                  Install the Widget
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
                "Free forever on one domain",
                "~24 KB async script",
                "Lighthouse 100",
                "DigitalOcean NYC3",
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

/* ─────────────────────────────────────────────────────────────
   Tiny helpers
─────────────────────────────────────────────────────────────── */

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  const isYes = value === "Yes"
  const isNo = value === "No"
  if (isYes) {
    return (
      <span
        className={`inline-flex items-center gap-1 text-[12px] font-medium ${
          highlight ? "text-[#1D4ED8]" : "text-emerald-600"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
        Yes
      </span>
    )
  }
  if (isNo) {
    return (
      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-400">
        <span className="h-3.5 w-3.5 rounded-full bg-slate-100 inline-flex items-center justify-center text-[10px]">
          –
        </span>
        No
      </span>
    )
  }
  return (
    <span
      className={`text-[12px] ${
        highlight ? "text-[#1D4ED8] font-semibold" : "text-[#0F2A4A]"
      }`}
    >
      {value}
    </span>
  )
}

function UpgradeCard({
  tier,
  price,
  blurb,
  items,
  accent,
}: {
  tier: string
  price: string
  blurb: string
  items: string[]
  accent: "blue" | "violet"
}) {
  const accentClass =
    accent === "blue"
      ? "from-[#60A5FA] to-[#1D4ED8] shadow-[#3B82F6]/40"
      : "from-[#A78BFA] to-[#7C3AED] shadow-[#7C3AED]/40"
  const accentRing =
    accent === "blue" ? "border-[#3B82F6]/20" : "border-[#7C3AED]/20"
  const accentText = accent === "blue" ? "text-[#1D4ED8]" : "text-[#7C3AED]"
  return (
    <div
      className={`relative h-full overflow-hidden rounded-3xl border ${accentRing} bg-white p-7 lg:p-8 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-br ${accentClass} bg-clip-text text-transparent`}
        >
          <span className={`text-[11px] font-mono uppercase tracking-wider ${accentText}`}>
            tier · {tier.toLowerCase()}
          </span>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-semibold ${accentText}`}>{price}</p>
          <p className="text-[10px] text-slate-400">per month</p>
        </div>
      </div>

      <p className="mt-5 text-base font-semibold text-[#0F2A4A]">{blurb}</p>

      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-[#0F2A4A]">
            <span
              className={`mt-0.5 h-4 w-4 rounded-full bg-gradient-to-br ${accentClass} flex items-center justify-center shrink-0 shadow-sm`}
            >
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
            </span>
            <span className="text-[13.5px] leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/pricing#${tier.toLowerCase()}`}
        className={`mt-6 inline-flex items-center gap-1 text-sm font-medium ${accentText} hover:gap-2 transition-all`}
      >
        See {tier} plan <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
