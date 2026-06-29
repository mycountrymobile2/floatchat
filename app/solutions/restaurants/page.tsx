"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  MessageSquare,
  Calendar,
  Star,
  Building,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Check,
  Truck,
  UtensilsCrossed,
  MapPin,
  Clock,
  Users,
  ChefHat,
  PhoneIncoming,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Reservation dashboard + active SMS thread
─────────────────────────────────────────────────────────────── */

function ReservationDashboardMockup() {
  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % 4), 2400)
    return () => clearInterval(t)
  }, [])

  const reservations = [
    {
      time: "6:30 PM",
      name: "Smith",
      party: 4,
      status: "confirmed",
      img: 47,
    },
    {
      time: "7:00 PM",
      name: "Lopez",
      party: 2,
      status: "pending",
      img: 49,
    },
    {
      time: "7:30 PM",
      name: "Wong",
      party: 6,
      status: "confirmed",
      img: 12,
    },
    {
      time: "8:00 PM",
      name: "Chen",
      party: 3,
      status: "reminder sent",
      img: 33,
    },
  ]

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), rgba(96,165,250,0.25), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-[#1D4ED8] flex items-center justify-center">
          <UtensilsCrossed className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Tonight · <span className="text-[#1D4ED8]">14 covers</span>
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
          Auto-SMS · 2h reminder
        </span>
      </motion.div>

      {/* Window */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · reservations
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Reservations list */}
          <section className="col-span-12 md:col-span-7 border-r border-slate-200 flex flex-col">
            <div className="px-4 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Tonight · Friday Mar 14
                  </p>
                  <p className="text-[14px] font-semibold text-[#0F2A4A] mt-0.5">
                    Atlas Bistro · Brooklyn
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">
                  <UtensilsCrossed className="h-2.5 w-2.5" />
                  14 covers
                </span>
              </div>
            </div>

            <div className="flex-1 px-2 py-2 space-y-1">
              {reservations.map((r, i) => {
                const isActive = i === activeIdx
                return (
                  <motion.div
                    key={r.name}
                    animate={
                      isActive
                        ? { backgroundColor: "rgba(59,130,246,0.06)" }
                        : { backgroundColor: "rgba(0,0,0,0)" }
                    }
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${
                      isActive
                        ? "ring-1 ring-[#3B82F6]/30"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="text-center shrink-0 w-14">
                      <p className="text-[12px] font-semibold text-[#0F2A4A]">
                        {r.time}
                      </p>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                        tonight
                      </p>
                    </div>
                    <img
                      src={`https://i.pravatar.cc/40?img=${r.img}`}
                      alt={r.name}
                      loading="lazy"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11.5px] font-semibold text-[#0F2A4A] truncate">
                        {r.name} · party of {r.party}
                      </p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Users className="h-2.5 w-2.5" />
                        {r.party} guests
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider ${
                        r.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : r.status === "pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-[#3B82F6]/10 text-[#1D4ED8] border border-[#3B82F6]/20"
                      }`}
                    >
                      {r.status === "confirmed" ? (
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      ) : r.status === "pending" ? (
                        <Clock className="h-2.5 w-2.5" />
                      ) : (
                        <MessageSquare className="h-2.5 w-2.5" />
                      )}
                      {r.status}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer summary */}
            <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50/40 flex items-center justify-between text-[10.5px]">
              <span className="text-slate-500">
                <span className="font-semibold text-[#0F2A4A]">3 confirmed</span> ·{" "}
                <span className="font-semibold text-amber-700">1 pending</span>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Auto-SMS on
              </span>
            </div>
          </section>

          {/* SMS thread for selected reservation */}
          <aside className="col-span-12 md:col-span-5 flex flex-col bg-white">
            <div className="px-3 py-3 border-b border-slate-200 flex items-center gap-2">
              <img
                src={`https://i.pravatar.cc/80?img=${reservations[activeIdx].img}`}
                alt={reservations[activeIdx].name}
                loading="lazy"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-semibold text-[#0F2A4A]">
                  {reservations[activeIdx].name} · party of{" "}
                  {reservations[activeIdx].party}
                </p>
                <p className="text-[9.5px] text-slate-500">
                  +1 (415) 555-•••• · SMS
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="flex-1 px-3 py-3 space-y-2 bg-slate-50/30 overflow-hidden flex flex-col justify-end">
              <div className="flex justify-end">
                <div className="rounded-xl rounded-br-sm bg-[#1D4ED8] px-2.5 py-1.5 max-w-[85%] shadow-sm">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Sparkles className="h-2.5 w-2.5 text-blue-200" />
                    <span className="text-[8.5px] uppercase tracking-wider font-semibold text-blue-200">
                      Auto · 2h reminder
                    </span>
                  </div>
                  <p className="text-[10.5px] text-white leading-snug">
                    Hi {reservations[activeIdx].name}! Reminder: tonight{" "}
                    {reservations[activeIdx].time} at Atlas Bistro, party of{" "}
                    {reservations[activeIdx].party}. Reply C to confirm.
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[80%] shadow-sm">
                  <p className="text-[10.5px] text-[#0F2A4A]">C 🍽️</p>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-2.5 py-1.5 flex items-center gap-1.5">
                <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                <span className="text-[10px] text-emerald-800 font-medium">
                  Reservation marked confirmed
                </span>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50/60 px-2.5 py-1.5">
                <p className="text-[9px] font-semibold text-amber-800 uppercase tracking-wider mb-0.5">
                  Post-meal · 10:30 PM
                </p>
                <p className="text-[10.5px] text-[#0F2A4A]">
                  Thanks for dining at Atlas — rate your visit ⭐
                </p>
              </div>
            </div>
          </aside>
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
   Mini visuals for restaurant cards
─────────────────────────────────────────────────────────────── */

function ReservationVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      <div className="rounded-md border border-[#3B82F6]/20 bg-[#3B82F6]/10/60 px-2.5 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1D4ED8] mb-0.5">
          SMS · 2h before
        </p>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          Hi Megan — your 7:30 PM at Atlas tonight, party of 2. Reply C to
          confirm.
        </p>
      </div>
      <div className="flex justify-start">
        <div className="rounded-md bg-white border border-slate-200 px-2.5 py-1 shadow-sm">
          <p className="text-[10.5px] font-mono text-[#0F2A4A]">C 🍽️</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 rounded-md bg-emerald-50/60 border border-emerald-200 px-2 py-1">
        <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
        <span className="text-[10px] text-emerald-800 font-medium">
          Confirmed · added to seating chart
        </span>
      </div>
    </div>
  )
}

function DeliveryStatusVisual() {
  const stages = [
    { label: "Order received", Icon: Check, done: true },
    { label: "Preparing", Icon: ChefHat, done: true, current: false },
    { label: "Out for delivery", Icon: Truck, done: false, current: true },
    { label: "Delivered", Icon: MapPin, done: false, current: false },
  ]
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-semibold text-[#0F2A4A]">Order #4421</span>
        <span className="text-[#1D4ED8] font-semibold">ETA 18 min</span>
      </div>
      <div className="space-y-1">
        {stages.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                s.done
                  ? "bg-emerald-500"
                  : s.current
                  ? "bg-[#3B82F6]/100 animate-pulse"
                  : "bg-slate-200"
              }`}
            >
              <s.Icon
                className={`h-2.5 w-2.5 ${
                  s.done || s.current ? "text-white" : "text-slate-500"
                }`}
                strokeWidth={2.5}
              />
            </span>
            <span
              className={`text-[10.5px] ${
                s.done || s.current
                  ? "text-[#0F2A4A] font-semibold"
                  : "text-slate-400"
              }`}
            >
              {s.label}
            </span>
            {s.current && (
              <span className="ml-auto text-[9px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
                live
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewCollectionVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-amber-200 bg-amber-50/60 px-2.5 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-800 mb-0.5">
          SMS · post-meal
        </p>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          Thanks for dining at Atlas! How was tonight? ⭐
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-emerald-200 bg-emerald-50/40 px-2 py-1.5">
          <div className="flex items-center gap-0.5 mb-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="h-2.5 w-2.5 text-amber-500"
                fill="currentColor"
              />
            ))}
          </div>
          <p className="text-[9px] text-emerald-800 font-medium">
            → Google review link
          </p>
        </div>
        <div className="rounded-md border border-rose-200 bg-rose-50/40 px-2 py-1.5">
          <p className="text-[10px] font-semibold text-rose-700">≤ 3 ⭐</p>
          <p className="text-[9px] text-rose-800 font-medium">
            → routed to manager
          </p>
        </div>
      </div>
    </div>
  )
}

function VoiceInboxVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="rounded-md border border-slate-200 bg-slate-50/40 px-2.5 py-2 flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
          <PhoneIncoming className="h-3.5 w-3.5 text-[#1D4ED8]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10.5px] font-semibold text-[#0F2A4A]">
            Missed call · catering
          </p>
          <p className="text-[9px] text-slate-500">
            +1 (415) 555-0142 · 12 min ago
          </p>
        </div>
        <span className="text-[9px] text-slate-400">1:24</span>
      </div>
      <div className="rounded-md bg-white border border-slate-200 px-2.5 py-2">
        <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
          Note · added by Sarah
        </p>
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          50-person event, June 14. Call back in AM.
        </p>
      </div>
      <button className="w-full rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-[10px] font-semibold py-1.5">
        Call back · async
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQs
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Integrates with Toast / Square / Resy?",
    answer:
      "Zapier integrations work with all three. Native integrations on roadmap.",
  },
  {
    question: "Can I send marketing SMS for promotions?",
    answer:
      "Yes, on Starter+. 10DLC brand registration required (US carrier rules). FloatChat handles this on Pro and Enterprise.",
  },
  {
    question: "WhatsApp for international tourists?",
    answer:
      "Yes. Two-way customer service only. Customer initiates, you reply within 24-hour window.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function RestaurantsPage() {
  useEffect(() => {
    document.title = "Restaurant Customer Support. SMS + WhatsApp | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Order updates, reservation confirmations, customer feedback. Live chat + SMS + WhatsApp from $19.99/mo for 3 agents.",
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
                  "radial-gradient(closest-side, rgba(168,230,247,0.4) 0%, transparent 70%)",
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
                  <UtensilsCrossed className="h-3.5 w-3.5" />
                  Restaurants · reservations + orders + reviews
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Customer support for{" "}
                  <span className="text-[#1D4ED8]">
                    restaurants and food service.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  SMS reservations, WhatsApp order updates, live chat for
                  delivery questions. Starter $19.99 for 3 agents.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "SMS reservations",
                    "WhatsApp order updates",
                    "Multi-location support on Pro",
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
                          "radial-gradient(circle, #EA580C 0%, transparent 70%)",
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
                  Starter $19.99 for 3 agents. SMS reservations + reviews
                  included.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <ReservationDashboardMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── USE CASES (4 cards) ───── */}
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
                <SectionEyebrow num="01" label="Front of house · back of house" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Restaurant use cases.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Handle reservations, orders, and reviews without switching
                  between tools.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: Calendar,
                  title: "Reservation confirmations via SMS.",
                  body:
                    "Customer books on your site. Auto-SMS confirms, sends reminder 2 hours prior, asks for review after.",
                  bg: "bg-[#1D4ED8]",
                  visual: <ReservationVisual />,
                },
                {
                  Icon: Truck,
                  title: "Delivery / pickup status updates.",
                  body:
                    "'Your order is being prepared.' 'Out for delivery.' Captain on Lite handles 'where is my order?' automatically.",
                  bg: "bg-emerald-600",
                  visual: <DeliveryStatusVisual />,
                },
                {
                  Icon: Star,
                  title: "Review collection.",
                  body:
                    "Post-meal SMS asks 'How was tonight?' Negative replies route to manager. Positive replies link to Google reviews.",
                  bg: "bg-amber-600",
                  visual: <ReviewCollectionVisual />,
                },
                {
                  Icon: Phone,
                  title: "Voice inbox for missed catering inquiries.",
                  body:
                    "Voice call lands as a conversation with notes. Manager picks up async, calls back from inbox.",
                  bg: "bg-[#1D4ED8]",
                  visual: <VoiceInboxVisual />,
                },
              ].map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl ${f.bg} flex items-center justify-center shadow-md shrink-0`}
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

        {/* ───── MULTI-LOCATION ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="HQ + locations" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Multi-location.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Each location has its own assigned team and routing rules.
                  Manage all from one HQ dashboard on Pro. Centralized analytics
                  lets your operations team compare response times and
                  satisfaction scores across all locations.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10/40 px-4 py-2">
                  <Building className="h-4 w-4 text-[#1D4ED8]" />
                  <span className="text-[13px] text-[#0F2A4A]">
                    <span className="font-semibold">Pro $189</span> · manage
                    multiple locations from one dashboard
                  </span>
                </div>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,42,74,0.18)]">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      HQ dashboard · all locations
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-2 py-0.5 text-[10px] font-semibold text-[#1D4ED8]">
                      4 locations
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      {
                        name: "Atlas Bistro · Brooklyn",
                        covers: 142,
                        avg: "4.7",
                        reply: "2m",
                      },
                      {
                        name: "Atlas Bistro · Manhattan",
                        covers: 218,
                        avg: "4.8",
                        reply: "1m",
                      },
                      {
                        name: "Atlas Bistro · Queens",
                        covers: 89,
                        avg: "4.5",
                        reply: "3m",
                      },
                      {
                        name: "Atlas Bistro · Hoboken",
                        covers: 64,
                        avg: "4.6",
                        reply: "2m",
                      },
                    ].map((loc, i) => (
                      <motion.div
                        key={loc.name}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="grid grid-cols-12 gap-3 items-center rounded-xl border border-slate-200 bg-slate-50/40 px-3 py-2.5"
                      >
                        <div className="col-span-5 flex items-center gap-2 min-w-0">
                          <div className="h-7 w-7 rounded-md bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                            <Building className="h-3.5 w-3.5 text-[#1D4ED8]" />
                          </div>
                          <span className="text-[11.5px] font-semibold text-[#0F2A4A] truncate">
                            {loc.name}
                          </span>
                        </div>
                        <div className="col-span-3 text-[10.5px]">
                          <p className="text-slate-400 uppercase tracking-wider text-[9px]">
                            Covers
                          </p>
                          <p className="text-[#0F2A4A] font-semibold tabular-nums">
                            {loc.covers}
                          </p>
                        </div>
                        <div className="col-span-2 text-[10.5px]">
                          <p className="text-slate-400 uppercase tracking-wider text-[9px]">
                            Rating
                          </p>
                          <p className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                            <Star className="h-2.5 w-2.5" fill="currentColor" />
                            {loc.avg}
                          </p>
                        </div>
                        <div className="col-span-2 text-[10.5px] text-right">
                          <p className="text-slate-400 uppercase tracking-wider text-[9px]">
                            Reply
                          </p>
                          <p className="text-[#1D4ED8] font-semibold">{loc.reply}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RECOMMENDED PLAN ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="Plan path" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Recommended plan.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Single-location restaurants: Starter ($19.99). Chains with
                  3-10 locations: Growth ($69). Franchise HQ: Pro ($189) for
                  centralized analytics and SSO.
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
                  <div className="grid grid-cols-3 gap-3 relative">
                    {[
                      {
                        label: "Starter",
                        price: "$19.99",
                        sub: "Single location · 3 agents",
                        active: true,
                      },
                      {
                        label: "Growth",
                        price: "$69",
                        sub: "3–10 locations",
                      },
                      {
                        label: "Pro",
                        price: "$189",
                        sub: "Franchise HQ · SSO",
                      },
                    ].map((p, i) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-4 ${
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
                          className={`mt-1 text-2xl font-semibold ${
                            p.active ? "text-[#1D4ED8]" : "text-[#0F2A4A]"
                          }`}
                        >
                          {p.price}
                        </p>
                        <p className="mt-1 text-[10.5px] text-slate-500 leading-snug">
                          {p.sub}
                        </p>
                        {p.active && (
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#1D4ED8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Most pick
                          </span>
                        )}
                        {i < 2 && (
                          <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10/40 px-4 py-3 flex flex-wrap items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <span className="text-[12.5px] text-[#0F2A4A]">
                      <span className="font-semibold">
                        SMS reservations + reviews
                      </span>{" "}
                      included from Starter.
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Reservations, orders, and reviews — one inbox"
          body="SMS reservations on Starter. Multi-location HQ on Pro."
          primaryLabel="Start Starter Trial"
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
              description="Toast, marketing SMS, WhatsApp — straight answers."
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
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(254,215,170,0.5) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #93C5FD 60%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(168,230,247,0.4), rgba(147,197,253,0.25) 50%, transparent 75%)",
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
                  SMS reservations · auto reminders · review collection
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
                  Starter from $19.99
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
              >
                Built for{" "}
                <span className="text-[#1D4ED8]">
                  every cover and order.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Reservations, delivery updates, reviews — all in one inbox.
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
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] text-[15px] font-medium text-white hover:scale-[1.02] transition-all duration-300"
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
                "SMS reservations",
                "WhatsApp orders",
                "Review routing",
                "Multi-location on Pro",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]/100" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="restaurants" />
      </main>
      <Footer />
    </>
  )
}
