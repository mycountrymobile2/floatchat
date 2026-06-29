"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  MessageSquare,
  Calendar,
  Globe,
  Building,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Home,
  Tag,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Send,
  Languages,
  FileText,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Listing page with showing-request widget
─────────────────────────────────────────────────────────────── */

function ListingPageMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(900)
        if (cancelled) return
        setPhase(1) // widget toast
        await wait(1400)
        if (cancelled) return
        setPhase(2) // widget opens, lead asks
        await wait(1700)
        if (cancelled) return
        setPhase(3) // captain reply with showing slot
        await wait(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const isOpen = phase >= 2

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), rgba(96,165,250,0.3), transparent 70%)",
        }}
      />

      {/* Floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#3B82F6]/100 flex items-center justify-center">
          <Tag className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Lead tagged · <span className="text-[#1D4ED8]">#MLS-4421</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Captain replied in <span className="text-emerald-600">2s</span>
        </span>
      </motion.div>

      {/* Browser */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="ml-3 flex-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-0.5 text-[10px] text-slate-500">
              <Globe className="h-2.5 w-2.5" />
              <span className="font-mono">terrapinrealty.com/4421</span>
            </div>
          </div>
        </div>

        <div className="relative h-[480px] bg-white overflow-hidden">
          {/* Realty header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <span className="text-[12px] font-semibold tracking-[0.15em] uppercase text-stone-800">
              Terrapin Realty
            </span>
            <div className="flex items-center gap-3 text-[10px] text-stone-500">
              <span>Listings</span>
              <span>Agents</span>
              <span>Sell</span>
              <Heart className="h-3 w-3" />
            </div>
          </div>

          {/* Hero photo */}
          <div className="px-5 pt-3">
            <div className="relative rounded-lg overflow-hidden aspect-[16/8] bg-gradient-to-br from-blue-200 via-slate-200 to-blue-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <Home className="h-12 w-12 text-stone-400/60" />
              </div>
              <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                For sale
              </span>
              <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 text-stone-700 px-2 py-0.5 text-[9px] font-semibold">
                <Tag className="h-2.5 w-2.5 text-[#3B82F6]" />
                MLS-4421
              </span>
            </div>
          </div>

          {/* Property details */}
          <div className="px-5 pt-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500">
                Single-family · Brooklyn
              </p>
              <p className="mt-0.5 text-sm font-semibold text-stone-900 truncate">
                124 Willow Brook Lane
              </p>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-stone-500">
                <MapPin className="h-2.5 w-2.5" />
                <span>Park Slope · NY 11215</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[9px] uppercase tracking-wider text-stone-500">
                Asking
              </p>
              <p className="text-lg font-semibold text-stone-900 tabular-nums">
                $1,420,000
              </p>
            </div>
          </div>

          {/* Bed / bath / sqft */}
          <div className="px-5 pt-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: Bed, label: "3 beds" },
                { Icon: Bath, label: "2 baths" },
                { Icon: Square, label: "1,820 sqft" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border border-stone-200 bg-white px-2 py-1.5 flex items-center gap-1.5"
                >
                  <s.Icon className="h-3 w-3 text-stone-600" />
                  <span className="text-[10px] font-medium text-stone-700">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Inquire button — bottom-left CTA on listing */}
          <div className="px-5 pt-3">
            <button className="w-full rounded-md bg-[#3B82F6]/100 hover:bg-[#1D4ED8] text-white text-[11px] font-semibold py-2">
              Schedule a showing
            </button>
          </div>

          {/* Widget peek toast */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="toast"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-20 right-4 max-w-[210px] rounded-xl rounded-br-sm bg-white border border-slate-200 shadow-[0_15px_40px_-15px_rgba(15,42,74,0.25)] px-3 py-2"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <img
                    src="https://i.pravatar.cc/40?img=32"
                    alt="Sarah K."
                    loading="lazy"
                    className="h-4 w-4 rounded-full object-cover ring-1 ring-white"
                  />
                  <span className="text-[9.5px] font-medium text-[#0F2A4A]">
                    Sarah · Terrapin
                  </span>
                  <span className="text-[8.5px] text-emerald-600 flex items-center gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    online
                  </span>
                </div>
                <p className="text-[10px] text-[#0F2A4A] leading-snug">
                  Want to tour this Willow Brook home? 🏡
                </p>
                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 bg-white border-r border-b border-slate-200" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Widget expanded */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="widget"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 right-4 w-[240px] rounded-2xl bg-white border border-slate-200 shadow-[0_25px_50px_-12px_rgba(15,42,74,0.4)] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-3 py-2.5 flex items-center gap-2">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/80?img=32"
                      alt="Sarah K."
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#1D4ED8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white">
                      Sarah · Terrapin
                    </p>
                    <p className="text-[9px] text-blue-100">Replies in ~1m</p>
                  </div>
                </div>

                <div className="px-2.5 py-2.5 space-y-1.5 min-h-[170px] bg-slate-50/40">
                  <div className="flex justify-start">
                    <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10.5px] text-[#0F2A4A]">
                        Hey 🏡 want to tour Willow Brook?
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="rounded-xl rounded-br-sm bg-[#1D4ED8] text-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10.5px]">
                        Is it still available? Could I see it Saturday?
                      </p>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {phase >= 3 && (
                      <motion.div
                        key="cap"
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="flex items-start gap-1.5"
                      >
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                          <Sparkles className="h-2.5 w-2.5 text-white" />
                        </div>
                        <div className="rounded-xl rounded-tl-sm bg-[#FFF7E1] border border-[#3B82F6]/30/40 px-2.5 py-1.5 max-w-[80%]">
                          <p className="text-[9px] font-semibold text-[#1D4ED8] mb-0.5">
                            Captain · scheduling
                          </p>
                          <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                            Yes! Sat 11:00 AM or 2:00 PM open. Confirm with SMS?
                          </p>
                          <div className="mt-1.5 flex items-center gap-1.5">
                            <button className="text-[9px] font-semibold bg-[#1D4ED8] text-white px-2 py-0.5 rounded-full">
                              11:00 AM
                            </button>
                            <button className="text-[9px] font-semibold bg-white border border-[#3B82F6]/30 text-[#1D4ED8] px-2 py-0.5 rounded-full">
                              2:00 PM
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="px-2.5 py-2 border-t border-slate-200 flex items-center gap-1.5">
                  <div className="flex-1 h-6 rounded-full bg-slate-100 border border-slate-200 px-2 flex items-center">
                    <span className="text-[9px] text-slate-400">Type a message…</span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-[#1D4ED8] flex items-center justify-center shadow-sm">
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
   Mini visuals for real estate cards
─────────────────────────────────────────────────────────────── */

function ListingChatVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="flex items-center gap-2 rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 px-2 py-1.5">
        <Home className="h-3 w-3 text-[#1D4ED8]" />
        <span className="text-[10px] font-mono text-[#0F2A4A] truncate flex-1">
          MLS-4421 · Willow Brook
        </span>
        <span className="text-[9px] font-semibold text-[#1D4ED8]">$1.42M</span>
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-bl-md bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[10.5px] text-[#0F2A4A]">
            How's the school district?
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-lg rounded-br-md bg-[#1D4ED8] text-white px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[10.5px]">PS 321 · 9/10 rating 🎓</p>
        </div>
      </div>
    </div>
  )
}

function ShowingReminderVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 px-2.5 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1D4ED8] mb-0.5">
          SMS · 24h before
        </p>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          Hi David — tomorrow 11:00 AM showing at 124 Willow Brook. Reply C to
          confirm.
        </p>
      </div>
      <div className="flex justify-end">
        <div className="rounded-md bg-[#3B82F6] text-white px-2.5 py-1 shadow-sm">
          <p className="text-[10.5px] font-mono">C</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-md bg-emerald-50/60 border border-emerald-200 px-2 py-1">
        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
        <span className="text-[10px] text-emerald-800 font-medium">
          Confirmed · added to Sarah's calendar
        </span>
      </div>
    </div>
  )
}

function WhatsAppLeadVisual() {
  return (
    <div
      className="rounded-xl p-3 space-y-1.5 overflow-hidden"
      style={{
        background: "#E5DDD5",
        backgroundImage:
          "radial-gradient(circle, rgba(15,42,74,0.06) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="flex justify-start">
        <div className="rounded-lg rounded-tl-sm bg-white px-2 py-1 max-w-[80%] shadow-sm">
          <p className="text-[10px] text-[#0F2A4A]">
            ¿Hablan español? Interesado en Willow Brook
          </p>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="rounded-lg rounded-tr-sm px-2 py-1 max-w-[80%] shadow-sm"
          style={{ background: "#DCF8C6" }}
        >
          <p className="text-[10px] text-[#0F2A4A]">
            ¡Sí! Te llamo en 5 minutos 🏡
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-1">
        <Languages className="h-2.5 w-2.5 text-emerald-700" />
        <span className="text-[9px] font-semibold text-slate-700">
          Multilingual · same inbox
        </span>
      </div>
    </div>
  )
}

function LeadTagVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      {[
        { mls: "MLS-4421", count: 7, asking: "$1.42M", color: "amber" },
        { mls: "MLS-3902", count: 3, asking: "$890K", color: "blue" },
        { mls: "MLS-5118", count: 2, asking: "$2.1M", color: "violet" },
      ].map((l) => (
        <div
          key={l.mls}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50/40 px-2 py-1.5"
        >
          <Tag
            className={`h-3 w-3 ${
              l.color === "amber"
                ? "text-[#3B82F6]"
                : l.color === "blue"
                ? "text-[#1D4ED8]"
                : "text-[#3B82F6]"
            }`}
          />
          <span className="font-mono text-[10px] text-[#0F2A4A]">{l.mls}</span>
          <span className="text-[9.5px] text-slate-500">·</span>
          <span className="text-[9.5px] text-slate-500">{l.asking}</span>
          <span
            className={`ml-auto inline-flex items-center text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
              l.color === "amber"
                ? "bg-[#3B82F6]/10 text-[#1D4ED8]"
                : l.color === "blue"
                ? "bg-[#3B82F6]/10 text-[#1D4ED8]"
                : "bg-[#3B82F6]/10 text-[#1D4ED8]"
            }`}
          >
            {l.count} leads
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Use cases
─────────────────────────────────────────────────────────────── */

const useCases: { Icon: React.ComponentType<{ className?: string }>; label: string; tag: string }[] = [
  { Icon: Calendar, label: "After-hours auto-reply on listings chat", tag: "Auto" },
  { Icon: Home, label: "Open house RSVP via SMS", tag: "RSVP" },
  { Icon: FileText, label: "Document upload requests (signed offers, financials)", tag: "Docs" },
  { Icon: Languages, label: "Multilingual lead handling (Spanish, Portuguese in Florida market)", tag: "Lang" },
  { Icon: Sparkles, label: "Captain handles \"is this still available?\" questions automatically", tag: "AI" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Does FloatChat integrate with MLS?",
    answer:
      "No native MLS integration. Use Zapier or our REST API to push lead data.",
  },
  {
    question: "SMS marketing for new listings?",
    answer:
      "Possible on Starter and above. 10DLC brand registration required (carrier rules). Self-service or onboarding help on Pro+.",
  },
  {
    question: "What about voicemail for missed calls?",
    answer:
      "FloatChat voice doesn't have voicemail. Missed calls log as conversations with notes. Use your main business line for voicemail-required workflows.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RealEstatePage() {
  useEffect(() => {
    document.title = "Real Estate Customer Support. Lead Inbox | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Live chat on your listings, SMS appointment confirmations, WhatsApp lead replies. From $9.99/mo. Built for US real estate agencies.",
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
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(96,165,250,0.35) 0%, transparent 70%)",
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
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,200,255,0.4) 0%, transparent 70%)",
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10/80 px-4 py-1.5 text-xs font-medium text-[#1D4ED8]"
                >
                  <Home className="h-3.5 w-3.5" />
                  Real Estate · lead inbox
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Lead inbox for{" "}
                  <span className="text-[#1D4ED8]">
                    real estate teams.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live chat on your listings, WhatsApp replies, and SMS
                  appointment confirmations. From $9.99/month.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Free plan with chat + email + WhatsApp",
                    "SMS on Starter $19.99",
                    "AI on Lite $9.99",
                  ].map((b) => (
                    <span key={b} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#3B82F6]" />
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
                          "radial-gradient(circle, #F59E0B 0%, transparent 70%)",
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
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <ListingPageMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── HOW REAL ESTATE TEAMS USE ───── */}
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
                <SectionEyebrow num="01" label="From listing to offer" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How real estate teams use FloatChat.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  From listing inquiries to signed offers, manage every lead
                  conversation in one place.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: MessageSquare,
                  title: "Listing chat widget.",
                  body:
                    "Visitor on your property page asks a question. Lands in your team inbox. Reply on the spot.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <ListingChatVisual />,
                },
                {
                  Icon: Calendar,
                  title: "Showing appointment SMS reminders.",
                  body:
                    "Send a 24-hour reminder via SMS. Customer confirms with a reply. STOP/HELP handled.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <ShowingReminderVisual />,
                },
                {
                  Icon: Globe,
                  title: "WhatsApp lead replies.",
                  body:
                    "Many international buyers prefer WhatsApp. Reply from the same inbox as your listings chat.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <WhatsAppLeadVisual />,
                },
                {
                  Icon: Building,
                  title: "Lead tagging by property.",
                  body:
                    "Tag conversations by listing ID. See all leads for a specific property in one filter.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <LeadTagVisual />,
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

        {/* ───── STATS ───── */}
        <section className="relative py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-3xl border border-[#3B82F6]/30 bg-gradient-to-br from-[#F5F7FF] to-white p-7 lg:p-9 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    value: "5 min",
                    label: "Widget install time",
                    Icon: Sparkles,
                  },
                  {
                    value: "50%+",
                    label: "Inquiries handled by Captain",
                    Icon: Sparkles,
                  },
                  {
                    value: "$9.99",
                    label: "Starting price with AI",
                    Icon: Sparkles,
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/40">
                      <s.Icon className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-4xl lg:text-5xl font-semibold tracking-tight text-[#1D4ED8] tabular-nums">
                      {s.value}
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── USE CASES ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="Common flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Use cases.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The flows real estate teams run on FloatChat — listing
                  inquiries, RSVPs, document collection, and multilingual lead
                  handling.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <ul className="space-y-1">
                    {useCases.map((uc, i) => (
                      <motion.li
                        key={uc.label}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                          <uc.Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="flex-1 text-sm text-[#0F2A4A] leading-relaxed">
                          {uc.label}
                        </span>
                        <span className="inline-flex items-center text-[9.5px] font-semibold uppercase tracking-wider text-[#1D4ED8] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full px-2 py-0.5 shrink-0">
                          {uc.tag}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RECOMMENDED PLAN ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="Plan path" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Recommended plan.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Most agencies start on Lite ($9.99) for Auto Reply when
                  off-market hours. Larger brokerages with 5+ agents move to
                  Starter ($19.99) for SMS appointment reminders.
                </p>
                <Link
                  to="/pricing"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:gap-2 transition-all"
                >
                  See all plans
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Lite",
                        price: "$9.99",
                        sub: "After-hours auto-reply",
                        active: true,
                      },
                      {
                        label: "Starter",
                        price: "$19.99",
                        sub: "+ SMS for showings",
                      },
                    ].map((p) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-5 ${
                          p.active
                            ? "border-[#3B82F6]/30 bg-gradient-to-br from-[#EAF2FF] to-white"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-[10px] uppercase tracking-wider font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-slate-400"
                          }`}
                        >
                          {p.label}
                        </p>
                        <p
                          className={`mt-1 text-3xl font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                          }`}
                        >
                          {p.price}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-500 leading-snug">
                          {p.sub}
                        </p>
                        {p.active && (
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#1D4ED8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Most pick
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10/40 px-4 py-3 flex flex-wrap items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      <span className="font-semibold">Captain AI on Lite</span>{" "}
                      — answers "is this still available?" automatically.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Catch every listing inquiry"
          body="Live chat on your site, WhatsApp two-way, SMS reminders. Lite from $9.99."
          primaryLabel="Start Lite Trial"
          primaryHref="/signup?plan=lite"
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
              description="MLS, SMS marketing, voicemail — straight answers."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(254,243,199,0.55) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #93C5FD 60%, #C4B5FD 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(254,215,170,0.5), rgba(147,197,253,0.25) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)",
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
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3B82F6]/100" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  5 min install · Captain on Lite
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
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#1D4ED8]">
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
                Catch every{" "}
                <span className="text-[#1D4ED8]">
                  listing inquiry.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Captain on Lite ($9.99). SMS reminders on Starter ($19.99).
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
              >
                <Link
                  to="/signup?plan=lite"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Lite Trial
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
                "Free plan",
                "Captain on Lite $9.99",
                "SMS on Starter",
                "WhatsApp two-way",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/100" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="real-estate" />
      </main>
      <Footer />
    </>
  )
}
