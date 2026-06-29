"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ShoppingCart,
  Bot,
  MessageSquare,
  Star,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Search,
  Heart,
  Code2,
  Globe,
  Send,
  CreditCard,
  Truck,
  Tag,
  Inbox,
} from "lucide-react"
import { FaShopify, FaWhatsapp } from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { RelatedSolutions } from "@/components/related-solutions"

/* ─────────────────────────────────────────────────────────────
   Hero mockup: Shopify storefront with chat widget popping out
─────────────────────────────────────────────────────────────── */

function ShopifyStorefrontMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(900)
        if (cancelled) return
        setPhase(1) // toast
        await wait(1500)
        if (cancelled) return
        setPhase(2) // widget opens with greeting
        await wait(1500)
        if (cancelled) return
        setPhase(3) // customer reply
        await wait(1400)
        if (cancelled) return
        setPhase(4) // agent typing
        await wait(1000)
        if (cancelled) return
        setPhase(5) // agent reply
        await wait(2500)
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
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.35), rgba(96,165,250,0.3), transparent 70%)",
        }}
      />

      {/* Floating Shopify chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div
          className="h-4 w-4 rounded-full flex items-center justify-center"
          style={{ background: "#1D4ED8" }}
        >
          <FaShopify className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Shopify on <span className="text-emerald-600">Free</span>
        </span>
      </motion.div>

      {/* Floating cart-recovery chip */}
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
          Cart recovery via <span className="text-emerald-600">WhatsApp</span>
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
              <span className="font-mono">shop.atelierlinen.com</span>
            </div>
          </div>
        </div>

        {/* Shopify-like store */}
        <div className="relative h-[480px] bg-white overflow-hidden">
          {/* Store header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-stone-800">
              Atelier
            </span>
            <div className="flex items-center gap-3 text-[10px] text-stone-500">
              <span>Shop</span>
              <span>Journal</span>
              <span>About</span>
              <Search className="h-3 w-3" />
              <div className="relative">
                <ShoppingCart className="h-3.5 w-3.5" />
                <span className="absolute -top-1.5 -right-1.5 inline-flex h-3 min-w-[12px] px-1 rounded-full bg-[#1D4ED8] text-[8px] font-semibold text-white items-center justify-center">
                  2
                </span>
              </div>
            </div>
          </div>

          {/* Hero banner */}
          <div className="px-5 pt-4 pb-3">
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500">
              Spring collection
            </p>
            <p className="text-sm font-semibold text-stone-900 mt-0.5">
              Pre-washed linen · made in Portugal
            </p>
          </div>

          {/* Product grid */}
          <div className="px-5 grid grid-cols-3 gap-3">
            {[
              { name: "Linen Tee", price: "$89", color: "from-stone-200 to-stone-300" },
              { name: "Wide Pant", price: "$129", color: "from-amber-100 to-amber-200" },
              { name: "Linen Robe", price: "$169", color: "from-emerald-100 to-emerald-200" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-md overflow-hidden border border-stone-100 bg-white"
              >
                <div
                  className={`aspect-square bg-gradient-to-br ${p.color} relative`}
                >
                  <Heart className="absolute top-1.5 right-1.5 h-3 w-3 text-stone-500" />
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-[10px] font-medium text-stone-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-[10px] text-stone-500">{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Abandoned cart strip */}
          <div className="mt-3 mx-5 rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2 flex items-center gap-2">
            <CreditCard className="h-3 w-3 text-amber-700" />
            <p className="text-[10px] text-amber-900">
              <span className="font-semibold">Cart abandoned ·</span> Linen Tee in
              size M · $89
            </p>
          </div>

          {/* Widget pop-toast (collapsed) */}
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
                  <img
                    src="https://i.pravatar.cc/40?img=44"
                    alt="Annie"
                    loading="lazy"
                    className="h-4 w-4 rounded-full object-cover ring-1 ring-white"
                  />
                  <span className="text-[9.5px] font-medium text-[#0F2A4A]">Annie</span>
                  <span className="text-[8.5px] text-emerald-600 flex items-center gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    online
                  </span>
                </div>
                <p className="text-[10px] text-[#0F2A4A] leading-snug">
                  Need help with sizing? 👋
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
                className="absolute bottom-4 right-4 w-[230px] rounded-2xl bg-white border border-slate-200 shadow-[0_25px_50px_-12px_rgba(15,42,74,0.4)] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] px-3 py-2.5 flex items-center gap-2">
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/80?img=44"
                      alt="Annie · Atelier"
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-white/30"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-1 ring-[#1D4ED8]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white">
                      Annie · Atelier
                    </p>
                    <p className="text-[9px] text-blue-100">Replies in ~2m</p>
                  </div>
                </div>

                <div className="px-2.5 py-2.5 space-y-1.5 min-h-[160px] bg-slate-50/40">
                  <div className="flex justify-start">
                    <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                      <p className="text-[10.5px] text-[#0F2A4A]">
                        Hey 👋 need help with sizing?
                      </p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {phase >= 3 && (
                      <motion.div
                        key="cust"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-end"
                      >
                        <div className="rounded-xl rounded-br-sm bg-[#3B82F6] text-white px-2.5 py-1.5 max-w-[80%] shadow-sm">
                          <p className="text-[10.5px]">
                            Is the linen tee in M still in stock?
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {phase === 4 && (
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
                    {phase >= 5 && (
                      <motion.div
                        key="ag"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="rounded-xl rounded-bl-sm bg-white border border-slate-200 px-2.5 py-1.5 max-w-[85%] shadow-sm">
                          <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
                            Yes! 2 left in M — I just held one for you 🙌
                          </p>
                          <span className="mt-1 inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-700">
                            <Sparkles className="h-2 w-2" />
                            from Shopify inventory
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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
   Mini visuals for "What D2C brands get" cards
─────────────────────────────────────────────────────────────── */

function ShopifyVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center"
          style={{ background: "#1D4ED8" }}
        >
          <FaShopify className="h-3 w-3 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[10.5px] font-semibold text-[#0F2A4A] leading-tight">
            Jessica Chen
          </p>
          <p className="text-[9px] text-slate-500">3 orders · $1,420 LTV</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">
          VIP
        </span>
      </div>
      <div className="space-y-1.5">
        {[
          { id: "#4421", item: "Linen Tee · M", status: "shipped" },
          { id: "#4380", item: "Wide Pant · L", status: "delivered" },
        ].map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50/40 px-2 py-1"
          >
            <Truck className="h-3 w-3 text-emerald-600" />
            <span className="text-[10px] font-mono text-[#0F2A4A]">{o.id}</span>
            <span className="text-[10px] text-slate-500 truncate flex-1">
              {o.item}
            </span>
            <span className="text-[9px] font-medium text-emerald-700">
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WidgetCodeVisual() {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0F172A] overflow-hidden">
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-slate-700">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
        <span className="ml-1 text-[9px] font-mono text-slate-500">
          theme.liquid
        </span>
      </div>
      <pre className="px-3 py-2 text-[9.5px] font-mono leading-relaxed text-slate-300 whitespace-pre">
        {`<script async\n  src="`}
        <span className="text-[#7CC4FF]">cdn.floatchat.com</span>
        {`/w.js"\n  data-`}
        <span className="text-[#7CC4FF]">site</span>
        {`="`}
        <span className="text-emerald-400">atelier_a7f9</span>
        {`">\n</script>`}
      </pre>
      <div className="px-3 py-1.5 border-t border-slate-800 bg-slate-900/40 flex items-center gap-2">
        <span className="text-[9px] text-emerald-400 font-mono">✓ live</span>
        <span className="text-[9px] text-slate-500 font-mono">5 min · ~24 KB</span>
      </div>
    </div>
  )
}

function WhatsAppVisual() {
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
          <p className="text-[10px] text-[#0F2A4A]">Where's my order?</p>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="rounded-lg rounded-tr-sm px-2 py-1 max-w-[80%] shadow-sm"
          style={{ background: "#DCF8C6" }}
        >
          <p className="text-[10px] text-[#0F2A4A]">Out for delivery 🚚</p>
          <p className="text-[8px] text-slate-500 text-right mt-0.5">
            9:41 <span style={{ color: "#25D366" }}>✓✓</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-1">
        <FaWhatsapp className="h-2.5 w-2.5" style={{ color: "#25D366" }} />
        <span className="text-[9px] font-semibold text-slate-700">
          Two-way · same inbox
        </span>
      </div>
    </div>
  )
}

function CaptainVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-[#F5F9FF] p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Sparkles className="h-2.5 w-2.5 text-white" />
        </div>
        <p className="text-[9.5px] font-semibold text-[#1D4ED8] uppercase tracking-wider">
          Captain · trained on catalog
        </p>
      </div>
      <div className="rounded-lg bg-white border border-[#3B82F6]/20 px-2.5 py-1.5">
        <p className="text-[10.5px] text-[#0F2A4A] leading-snug">
          The Linen Tee in M ships in 2 days. Pre-washed, fits true to size.
        </p>
        <div className="mt-1 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[8.5px] font-medium text-emerald-600">
            <Check className="h-2 w-2" strokeWidth={3} />
            98% match
          </span>
          <span className="text-[8.5px] text-slate-400 font-mono">$0.005</span>
        </div>
      </div>
      <p className="text-[9px] text-slate-500">
        Handles <span className="font-semibold text-[#0F2A4A]">50%+</span> of cart
        & shipping questions
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Use case row
─────────────────────────────────────────────────────────────── */

const useCases: { Icon: React.ComponentType<{ className?: string }>; label: string; tag: string }[] = [
  { Icon: CreditCard, label: "Cart abandonment recovery via email + WhatsApp", tag: "Recovery" },
  { Icon: Truck, label: "Order status questions answered by Captain", tag: "AI" },
  { Icon: Tag, label: "Returns and exchanges in chat", tag: "Support" },
  { Icon: MessageSquare, label: "COD and address confirmation via SMS (Starter $19.99)", tag: "SMS" },
  { Icon: Heart, label: "Welcome flow for new shoppers", tag: "Onboarding" },
]

/* ─────────────────────────────────────────────────────────────
   FAQs + content
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "How does the Shopify integration work?",
    answer:
      "Authenticate with Shopify OAuth. We pull customer profile, order history, and abandoned carts. Display inline next to the conversation.",
  },
  {
    question: "Can I send WhatsApp marketing campaigns?",
    answer:
      "No. FloatChat is not a WhatsApp Business Solution Provider. WhatsApp is two-way customer service only. For WhatsApp marketing campaigns, you need a WABA platform like WATI or AiSensy.",
  },
  {
    question: "Do you support BigCommerce?",
    answer: "Yes, on Starter and above.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function EcommercePage() {
  useEffect(() => {
    document.title = "D2C & Ecommerce Customer Support. From $0 | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "Live chat, WhatsApp, Shopify integration on the Free plan. Add AI Captain at $9.99. Built for US D2C brands and online stores.",
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
                  <ShoppingCart className="h-3.5 w-3.5" />
                  D2C / Ecommerce · built for online stores
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Customer support built for{" "}
                  <span className="text-[#1D4ED8]">
                    online stores.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Live chat, email, WhatsApp, and Shopify on the Free plan. Add AI
                  Captain at $9.99. Built for US D2C brands.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Free plan",
                    "Shopify on Free",
                    "WooCommerce on Free",
                    "AI from $9.99",
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
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <ShopifyStorefrontMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── WHAT D2C BRANDS GET ───── */}
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
                <SectionEyebrow num="01" label="In the box" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  What D2C brands get.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Everything you need to support customers from first visit to
                  repeat purchase.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  Icon: ShoppingCart,
                  title: "Shopify integration on Free.",
                  body:
                    "See order history, refund inline, sync abandoned carts. No upgrade needed.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <ShopifyVisual />,
                },
                {
                  Icon: Code2,
                  title: "Live chat widget on your store.",
                  body:
                    "Drop the snippet on your Shopify or WooCommerce theme. Works in 5 minutes.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-[#3B82F6]/40",
                  visual: <WidgetCodeVisual />,
                },
                {
                  Icon: MessageSquare,
                  title: "WhatsApp two-way (Free).",
                  body:
                    "Customer messages your WhatsApp. Reply from the same inbox as live chat and email.",
                  accent: "from-[#25D366] to-[#128C7E]",
                  shadow: "shadow-[#25D366]/40",
                  visual: <WhatsAppVisual />,
                },
                {
                  Icon: Bot,
                  title: "AI Captain at $9.99 (Lite).",
                  body:
                    "Train Captain on your help docs and product catalog. Captain handles 50%+ of cart and shipping questions.",
                  accent: "from-[#60A5FA] to-[#1D4ED8]",
                  shadow: "shadow-violet-500/40",
                  visual: <CaptainVisual />,
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

        {/* ───── USE CASES ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="02" label="Common flows" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Use cases.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The flows D2C teams run on FloatChat day-one — chat-to-cart,
                  recovery, and post-purchase support.
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
                        <span className="inline-flex items-center text-[9.5px] font-semibold uppercase tracking-wider text-[#1D4ED8] bg-[#3B82F6]/10 border border-[#3B82F6]/15 rounded-full px-2 py-0.5 shrink-0">
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

        {/* ───── CASE STUDY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="03" label="Case study" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  How a Brooklyn D2C apparel brand{" "}
                  <span className="text-[#1D4ED8]">
                    uses FloatChat.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Annie runs a sustainable apparel brand on Shopify.
                </p>
              </BlurFade>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Before */}
              <BlurFade delay={0.1} className="lg:col-span-4">
                <div className="h-full rounded-3xl border border-rose-200 bg-rose-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-rose-700 mb-3">
                    Before FloatChat
                  </p>
                  <ul className="space-y-2 text-sm text-rose-900/80 leading-relaxed">
                    {[
                      "Tawk.to for chat",
                      "Manual Gmail for support",
                      "Klaviyo for email",
                      "No SMS",
                      "Five tools, three agents",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl bg-white border border-rose-200 px-4 py-3 inline-flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-rose-700 font-semibold">
                      Monthly cost
                    </span>
                    <span className="text-lg font-semibold text-rose-700">$400</span>
                  </div>
                </div>
              </BlurFade>

              {/* After */}
              <BlurFade delay={0.2} className="lg:col-span-5">
                <div className="h-full rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-emerald-700 mb-3">
                    After FloatChat
                  </p>
                  <ul className="space-y-2 text-sm text-emerald-900/85 leading-relaxed">
                    {[
                      "Live chat + email + WhatsApp + Shopify on Free",
                      "Upgraded to Lite ($9.99) for Auto Reply after-hours",
                      "Plans to upgrade to Starter ($19.99) for SMS abandoned-cart recovery",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={3} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-xl bg-white border border-emerald-200 px-4 py-3 inline-flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-700 font-semibold">
                      Monthly cost
                    </span>
                    <span className="text-lg font-semibold text-emerald-700">
                      $0
                    </span>
                    <span className="text-[10px] text-emerald-600">on Free</span>
                  </div>
                </div>
              </BlurFade>

              {/* Quote */}
              <BlurFade delay={0.3} className="lg:col-span-3">
                <div className="relative h-full rounded-3xl bg-gradient-to-br from-[#0F2A4A] to-[#1D4ED8] p-7 text-white overflow-hidden shadow-[0_20px_50px_-25px_rgba(29,78,216,0.55)]">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <Star className="h-5 w-5 text-amber-300 mb-3" fill="currentColor" />
                    <p className="text-[13.5px] leading-relaxed text-white/90">
                      Five tools became one. I stopped flinching every time we
                      onboarded a new agent.
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <img
                        src="https://i.pravatar.cc/60?img=44"
                        alt="Annie"
                        loading="lazy"
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-white/40"
                      />
                      <div>
                        <p className="text-[11px] font-semibold">Annie</p>
                        <p className="text-[9.5px] text-white/60">
                          Atelier · Brooklyn
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── RECOMMENDED PLAN ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="04" label="Plan path" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Recommended plan.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Most D2C brands start on Free, upgrade to Lite ($9.99) at
                  month 2, and move to Starter ($19.99) when they need SMS or
                  all 10 channels.
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
                        label: "Free",
                        price: "$0",
                        sub: "Start here",
                        active: true,
                      },
                      {
                        label: "Lite",
                        price: "$9.99",
                        sub: "Month 2 · Auto Reply",
                      },
                      {
                        label: "Starter",
                        price: "$19.99",
                        sub: "SMS + all 10 channels",
                      },
                    ].map((p, i) => (
                      <div
                        key={p.label}
                        className={`relative rounded-2xl border p-4 ${
                          p.active
                            ? "border-[#3B82F6]/40 bg-gradient-to-br from-[#EAF2FF] to-white"
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
                          <span className="absolute -top-2 right-3 inline-flex items-center rounded-full bg-[#3B82F6] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Start here
                          </span>
                        )}
                        {i < 2 && (
                          <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Build your D2C support stack on Free"
          body="Live chat, email, WhatsApp, and Shopify — included on the Free plan."
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
              description="Shopify, WhatsApp, BigCommerce — straight answers."
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
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #93C5FD 60%, #C4B5FD 80%, transparent)",
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
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Shopify on Free · AI from $9.99
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
                Start your{" "}
                <span className="text-[#1D4ED8]">
                  D2C support stack.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Live chat, email, WhatsApp, and Shopify on the Free plan.
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
                "Shopify on Free",
                "WhatsApp two-way",
                "AI from $9.99",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        <RelatedSolutions solution="ecommerce" />
      </main>
      <Footer />
    </>
  )
}
