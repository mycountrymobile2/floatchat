"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  HelpCircle,
  X,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Search,
  Globe,
  Languages,
  Book,
  FileText,
  Tag,
  ChevronRight,
  TrendingUp,
  Layers,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: KB landing page with animated search
─────────────────────────────────────────────────────────────── */

const SEARCH_QUERY = "How do I track my order?"

function HelpCenterMockup() {
  // 0 idle · 1 typing · 2 results · 3 ai answer
  const [phase, setPhase] = useState(0)
  const [queryIdx, setQueryIdx] = useState(0)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        setQueryIdx(0)
        await wait(900)
        if (cancelled) return
        setPhase(1)
        for (let i = 1; i <= SEARCH_QUERY.length; i++) {
          if (cancelled) return
          setQueryIdx(i)
          await wait(45 + Math.random() * 25)
        }
        await wait(500)
        if (cancelled) return
        setPhase(2)
        await wait(1300)
        if (cancelled) return
        setPhase(3)
        await wait(3000)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const showResults = phase >= 2
  const showAi = phase >= 3

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <TrendingUp className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Indexed by Google in <span className="text-[#1D4ED8]">3 days</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <Globe className="h-3 w-3 text-emerald-600" />
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          5 languages on Growth
        </span>
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
              <span className="font-mono">support.floatchat.com/atelier</span>
            </div>
          </div>
        </div>

        <div className="min-h-[440px] bg-gradient-to-b from-[#F8FAFF] to-white p-5 sm:p-6">
          {/* Brand row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-stone-700">
                Atelier · Help
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500">
              <Languages className="h-3 w-3" />
              <span>EN</span>
              <ChevronRight className="h-2.5 w-2.5" />
            </div>
          </div>

          {/* Centered headline */}
          <div className="text-center mb-5">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1D4ED8] mb-1.5">
              Help Center
            </p>
            <h3 className="text-base sm:text-lg font-semibold text-[#0F2A4A]">
              How can we help, Jessica?
            </h3>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto mb-5">
            <div className="relative rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_30px_-15px_rgba(15,42,74,0.2)] flex items-center gap-2">
              <Search className="h-4 w-4 text-slate-400 shrink-0" />
              <div className="flex-1 min-w-0 text-[12px] text-[#0F2A4A]">
                {phase === 0 && (
                  <span className="text-slate-400">Search articles…</span>
                )}
                {phase >= 1 && (
                  <span>
                    {SEARCH_QUERY.slice(0, queryIdx)}
                    {phase === 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-[1.5px] h-3 align-middle bg-[#1D4ED8] ml-0.5"
                      />
                    )}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-mono text-slate-400 border border-slate-200 rounded px-1">
                ⌘ K
              </span>
            </div>

            {/* Results dropdown */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white shadow-[0_15px_40px_-15px_rgba(15,42,74,0.25)] overflow-hidden"
                >
                  {/* AI answer */}
                  <AnimatePresence>
                    {showAi && (
                      <motion.div
                        key="ai"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-slate-100 bg-gradient-to-r from-[#EAF2FF] to-white px-3 py-2.5"
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
                            <Sparkles className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-[9.5px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                            Captain answer
                          </span>
                          <span className="ml-auto text-[8.5px] text-emerald-600 font-medium">
                            98% match
                          </span>
                        </div>
                        <p className="text-[11px] text-[#0F2A4A] leading-snug">
                          Visit your order page and click{" "}
                          <span className="font-mono bg-white border border-slate-200 rounded px-1">
                            Track
                          </span>
                          . You'll see live UPS / USPS status pulled in real time.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Article results */}
                  {[
                    { title: "Where do I find my tracking number?", cat: "Orders" },
                    { title: "Estimated delivery times by state", cat: "Shipping" },
                    { title: "What if my package never arrives?", cat: "Help" },
                  ].map((r, i) => (
                    <motion.div
                      key={r.title}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                      className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 last:border-b-0 hover:bg-slate-50/60 cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-[#0F2A4A] truncate">
                          {r.title}
                        </p>
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                          {r.cat}
                        </p>
                      </div>
                      <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
            {[
              { Icon: Book, label: "Getting started", count: 14 },
              { Icon: Tag, label: "Orders", count: 28 },
              { Icon: Globe, label: "Shipping", count: 22 },
              { Icon: HelpCircle, label: "Returns", count: 18 },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 hover:border-slate-300 transition-colors cursor-pointer"
              >
                <div className="h-6 w-6 rounded-md bg-[#3B82F6]/10 flex items-center justify-center mb-1.5">
                  <c.Icon className="h-3 w-3 text-[#1D4ED8]" />
                </div>
                <p className="text-[10px] font-semibold text-[#0F2A4A] truncate">
                  {c.label}
                </p>
                <p className="text-[8.5px] text-slate-400">
                  {c.count} articles
                </p>
              </div>
            ))}
          </div>
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
   Live article reader (centerpiece, unique to Help Center)
─────────────────────────────────────────────────────────────── */

const ARTICLE_TOC = [
  { id: "intro", label: "Introduction" },
  { id: "find", label: "Find your tracking" },
  { id: "delivery", label: "Delivery windows" },
  { id: "issues", label: "If it doesn't arrive" },
  { id: "support", label: "Contact support" },
]

function ArticleReader() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((p) => (p + 1) % ARTICLE_TOC.length)
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_25px_60px_-30px_rgba(15,42,74,0.25)]">
      {/* Top bar — language toggle */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Book className="h-3.5 w-3.5 text-[#1D4ED8]" />
          <span className="text-[11px] font-semibold text-[#0F2A4A]">
            Atelier Help Center
          </span>
          <span className="text-[10px] text-slate-400">/ Orders / Track an order</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { code: "EN", active: true },
            { code: "ES" },
            { code: "FR" },
            { code: "DE" },
            { code: "PT" },
          ].map((l) => (
            <button
              key={l.code}
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded transition-colors ${
                l.active
                  ? "bg-[#3B82F6]/10 text-[#1D4ED8]"
                  : "text-slate-400 hover:bg-slate-100"
              }`}
            >
              {l.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 min-h-[420px]">
        {/* Categories sidebar — hidden on small */}
        <aside className="hidden md:flex md:col-span-3 border-r border-slate-200 bg-slate-50/40 flex-col">
          <div className="px-3 py-2.5 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Categories
            </p>
          </div>
          <div className="px-2 py-2 space-y-0.5">
            {[
              { label: "Getting started", count: 14 },
              { label: "Orders", count: 28, active: true },
              { label: "Shipping", count: 22 },
              { label: "Returns", count: 18 },
              { label: "Billing", count: 11 },
              { label: "Account", count: 9 },
            ].map((c) => (
              <div
                key={c.label}
                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md ${
                  c.active
                    ? "bg-[#3B82F6]/10 text-[#1D4ED8] font-semibold"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                <span className="text-[10.5px] truncate">{c.label}</span>
                <span className="text-[9px] text-slate-400">{c.count}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Article body */}
        <section className="col-span-12 md:col-span-6 px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6] mb-2">
            Orders
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0F2A4A] leading-tight mb-3">
            How to track your order
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-5">
            <span>Updated 2 days ago</span>
            <span>·</span>
            <span>3 min read</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              Helpful for 92%
            </span>
          </div>

          <div className="space-y-4 text-[12.5px] text-slate-600 leading-relaxed">
            <p>
              Every Atelier order ships with a live tracking number. Once your
              package is picked up by UPS or USPS, you'll get notified.
            </p>
            <div>
              <p className="text-[11.5px] font-semibold text-[#0F2A4A] uppercase tracking-wider mb-1.5">
                Find your tracking
              </p>
              <p>
                Open <span className="font-mono bg-slate-100 px-1 rounded">My Account → Orders</span>{" "}
                and click the order. Your tracking link is right under the order
                summary.
              </p>
            </div>
            <div>
              <p className="text-[11.5px] font-semibold text-[#0F2A4A] uppercase tracking-wider mb-1.5">
                Delivery windows
              </p>
              <p>
                Most US orders deliver in 2–5 business days. Free shipping ships
                in 3–7. International varies by destination.
              </p>
            </div>
          </div>

          {/* Helpful CTA */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Was this article helpful?
            </span>
            <div className="flex items-center gap-1.5">
              <button className="text-[10px] font-medium border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-md px-2.5 py-1">
                Yes
              </button>
              <button className="text-[10px] font-medium border border-slate-200 bg-white text-slate-500 rounded-md px-2.5 py-1">
                No
              </button>
            </div>
          </div>
        </section>

        {/* TOC sidebar — hidden on small */}
        <aside className="hidden lg:flex lg:col-span-3 border-l border-slate-200 bg-slate-50/30 flex-col">
          <div className="px-3 py-2.5 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              On this page
            </p>
          </div>
          <div className="px-3 py-2 space-y-0.5 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
            {ARTICLE_TOC.map((t, i) => {
              const isActive = i === active
              return (
                <div
                  key={t.id}
                  className="relative pl-4 py-1.5 flex items-center gap-2"
                >
                  <motion.span
                    animate={
                      isActive
                        ? { scale: 1.6, backgroundColor: "#3B82F6" }
                        : { scale: 1, backgroundColor: "#CBD5E1" }
                    }
                    transition={{ duration: 0.3 }}
                    className="absolute left-[10px] top-1/2 -translate-y-1/2 -translate-x-1/2 h-2 w-2 rounded-full ring-2 ring-white"
                  />
                  <span
                    className={`text-[10.5px] transition-colors ${
                      isActive
                        ? "font-semibold text-[#1D4ED8]"
                        : "text-slate-500"
                    }`}
                  >
                    {t.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* SEO chip */}
          <div className="mt-auto px-3 py-3 border-t border-slate-100 space-y-2">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
              SEO health
            </p>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-500">Score</span>
              <span className="font-semibold text-emerald-600">92 / 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "92%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
              />
            </div>
            <p className="text-[9px] text-slate-400">
              Meta · Schema · Headings
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What's in the Help Center" cards
─────────────────────────────────────────────────────────────── */

function ArticlesVisual() {
  return (
    <div className="relative rounded-xl bg-slate-50 border border-slate-200 p-3 overflow-hidden h-[120px]">
      <div className="absolute inset-0 p-3 space-y-1.5">
        {[
          { title: "How to track your order", tag: "Orders" },
          { title: "Returns and exchanges policy", tag: "Returns" },
          { title: "Care guide for linen", tag: "Care" },
          { title: "Shipping zones and times", tag: "Shipping" },
        ].map((a, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5"
            style={{ marginLeft: `${i * 4}px`, opacity: 1 - i * 0.15 }}
          >
            <FileText className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="text-[10px] font-medium text-[#0F2A4A] truncate flex-1">
              {a.title}
            </span>
            <span className="text-[8.5px] font-medium uppercase tracking-wider text-slate-400">
              {a.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SearchVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
        <Search className="h-3 w-3 text-slate-400" />
        <span className="text-[10.5px] text-[#0F2A4A]">
          tracking number
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="inline-block w-[1px] h-2.5 align-middle bg-[#1D4ED8] ml-0.5"
          />
        </span>
        <span className="ml-auto text-[8.5px] font-medium text-slate-400">
          3 hits
        </span>
      </div>
      <div className="space-y-1">
        {[
          "Where do I find my tracking number?",
          "Why no tracking number yet?",
          "Tracking number not working",
        ].map((q, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 rounded-md bg-white border border-slate-100 px-2 py-1"
          >
            <ChevronRight className="h-2.5 w-2.5 text-slate-300" />
            <span className="text-[10px] text-[#0F2A4A] truncate flex-1">
              {q}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeoVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
        Google preview
      </p>
      <div className="rounded-md bg-white border border-slate-200 px-3 py-2">
        <p className="text-[10px] font-mono text-emerald-700 truncate">
          support.floatchat.com › atelier › orders
        </p>
        <p className="text-[12px] text-[#1A0DAB] font-medium leading-tight truncate hover:underline">
          How to track your order — Atelier Help
        </p>
        <p className="text-[10px] text-slate-600 leading-snug">
          Every Atelier order ships with a live tracking number. Open My
          Account → Orders to find...
        </p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
          <Check className="h-2 w-2" strokeWidth={3} />
          Meta
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
          <Check className="h-2 w-2" strokeWidth={3} />
          Schema
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
          <Check className="h-2 w-2" strokeWidth={3} />
          Sitemap
        </span>
      </div>
    </div>
  )
}

function AiSuggestionsVisual() {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <p className="text-[10px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
          Captain suggests
        </p>
        <span className="ml-auto text-[9px] text-slate-500">3 new</span>
      </div>
      {[
        { topic: "Refund timeline by payment method", asks: 18 },
        { topic: "Gift wrapping options", asks: 11 },
        { topic: "International duty fees", asks: 7 },
      ].map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2 py-1.5"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
          <span className="text-[10px] font-medium text-[#0F2A4A] truncate flex-1">
            {s.topic}
          </span>
          <span className="text-[9px] text-slate-500">
            <span className="font-semibold text-[#1D4ED8]">{s.asks}</span> asks
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ + content (preserved)
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "What domain does my Help Center live on?",
    answer:
      "A FloatChat-controlled URL. Format: support.floatchat.com/yourcompany or help.floatchat.com/yourcompany. Not customizable.",
  },
  {
    question: "Can I customize the look?",
    answer:
      "Yes. Logo, colors, header layout, footer. Pages render with your branding except the URL.",
  },
  {
    question:
      "Does Captain answer customer questions from Help Center articles?",
    answer:
      "Yes. Captain trains on Help Center content and uses it to reply in chat, email, and WhatsApp conversations.",
  },
  {
    question: "Can I publish articles in multiple languages?",
    answer:
      "Yes, on Growth and above. Each language is its own URL path. Customer chooses language at the top of the portal.",
  },
]

const portalLimits = [
  { plan: "Free", portals: "0 portals" },
  { plan: "Starter", portals: "1 portal" },
  { plan: "Growth", portals: "2 portals" },
  { plan: "Pro", portals: "5 portals" },
  { plan: "Enterprise", portals: "Unlimited" },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function HelpCenterPage() {
  useEffect(() => {
    document.title = "Help Center That Customers Actually Find | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Self-service Help Center with SEO controls, AI article suggestions, multi-language support. Hosted on a FloatChat URL. From $19.99/month.",
      )
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  Help Center · SEO + AI search
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Help Center your customers{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    actually find.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Articles, search, AI suggestions, and SEO controls. Hosted on
                  a FloatChat URL. Available on Starter and above.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "SEO-friendly",
                    "AI suggestions",
                    "Multi-language on Growth",
                    "Multi-portal on Growth+",
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
                    Book a Demo
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  Help Center unlocks on Starter ($19.99). Free plan does not
                  include the Help Center.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <HelpCenterMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── ARTICLE READER (centerpiece) ───── */}
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
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="01" label="Live preview" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What customers{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    actually see.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Article reader with categories, TOC, multi-language toggle, and
                  live SEO scoring.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <ArticleReader />
            </BlurFade>
          </div>
        </section>

        {/* ───── WHAT'S IN THE HELP CENTER (4 feature cards) ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="In the box" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What's in the Help Center.
                </h2>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: FileText,
                  title: "Unlimited articles.",
                  body:
                    "Markdown editor with images, videos, code blocks, callouts. Full version history and rollback.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <ArticlesVisual />,
                },
                {
                  Icon: Search,
                  title: "Built-in search.",
                  body:
                    "Customers find articles instantly. Search analytics show what they're looking for and not finding.",
                  accent: "from-cyan-400 to-cyan-600",
                  shadow: "shadow-cyan-500/40",
                  visual: <SearchVisual />,
                },
                {
                  Icon: TrendingUp,
                  title: "SEO controls.",
                  body:
                    "Custom meta titles, descriptions, schema markup. Pages indexed by Google in days, not weeks.",
                  accent: "from-emerald-400 to-emerald-600",
                  shadow: "shadow-emerald-500/40",
                  visual: <SeoVisual />,
                },
                {
                  Icon: Sparkles,
                  title: "AI suggestions.",
                  body:
                    "Captain reads your past conversations and suggests article topics you should write next (Growth and above).",
                  accent: "from-violet-400 to-violet-600",
                  shadow: "shadow-violet-500/40",
                  visual: <AiSuggestionsVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-md ${f.shadow} shrink-0`}
                      >
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

        {/* ───── MULTI-PORTAL ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Multi-brand" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Multi-portal for multi-brand.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Each portal has its own articles, branding, and visitors. All
                  articles managed from one dashboard.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <BlurFade delay={0.1} className="lg:col-span-8 h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Plan
                          </th>
                          <th className="text-left p-4 text-[11px] font-medium uppercase tracking-wider text-slate-500">
                            Portals included
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {portalLimits.map((row, i) => {
                          const isFlagship = row.plan === "Growth"
                          return (
                            <tr
                              key={row.plan}
                              className={`border-b border-slate-100 last:border-b-0 ${
                                isFlagship
                                  ? "bg-gradient-to-r from-[#EAF2FF] to-[#F5F9FF]"
                                  : "hover:bg-slate-50/40 transition-colors"
                              }`}
                            >
                              <td
                                className={`p-4 font-medium ${
                                  isFlagship
                                    ? "text-[#1D4ED8] font-semibold"
                                    : "text-[#0F2A4A]"
                                }`}
                              >
                                {isFlagship ? (
                                  <span className="inline-flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    {row.plan}
                                  </span>
                                ) : (
                                  row.plan
                                )}
                              </td>
                              <td
                                className={`p-4 ${
                                  isFlagship
                                    ? "text-[#1D4ED8] font-semibold"
                                    : "text-slate-500"
                                }`}
                              >
                                {row.portals}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-8 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
                      Multi-portal
                    </p>
                    <p className="mt-4 text-5xl lg:text-6xl font-medium tracking-tight">
                      $0 <span className="text-2xl lg:text-3xl text-white/70">extra</span>
                    </p>
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      Multi-portal included in plan. No per-portal fees.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-medium">
                      <Layers className="h-3 w-3" />
                      Same dashboard, every brand
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── WHAT'S NOT AVAILABLE ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="04" label="The honest list" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What's{" "}
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    NOT
                  </span>{" "}
                  available.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  If you need a Help Center on{" "}
                  <span className="font-mono text-[#0F2A4A]">
                    help.yourcompany.com
                  </span>
                  , FloatChat is not the right fit.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl bg-gradient-to-br from-[#0F2A4A] via-[#1E1B4B] to-[#1F2937] p-7 lg:p-9 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(15,42,74,0.5)]">
                  <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30 bg-red-500" />
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-20 bg-rose-400" />
                  <div className="relative flex items-start gap-4">
                    <span className="mt-0.5 h-9 w-9 rounded-full bg-red-500/15 border border-red-400/40 flex items-center justify-center shrink-0">
                      <X className="h-4 w-4 text-red-300" strokeWidth={3} />
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-white">
                        No custom domain.
                      </p>
                      <p className="mt-2 text-[13.5px] text-white/75 leading-relaxed">
                        Help Center is hosted on a FloatChat URL (e.g.,{" "}
                        <span className="font-mono text-white/90">
                          support.floatchat.com/yourcompany
                        </span>
                        ). Custom domain is not available on any tier.
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Add a Help Center to your site"
          body="SEO-friendly knowledge base. Reduces tickets by giving customers self-serve answers."
          primaryLabel="Add Help Center"
          primaryHref="/signup?plan=starter"
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
              description="Domain, customization, Captain, languages — straight answers."
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
                  Indexed by Google in 3 days
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">5 languages on Growth</span>
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
                  14-day trial
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Try the Help Center{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  free for 14 days.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                $19.99/month after trial.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=starter"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Starter Trial
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
                "SEO controls",
                "AI suggestions",
                "Multi-language",
                "Multi-portal",
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
