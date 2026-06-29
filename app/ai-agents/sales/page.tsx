"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Send,
  MessageSquare,
  CreditCard,
  Truck,
  Tag,
  RotateCcw,
  Ruler,
  Zap,
  TrendingUp,
  Bot,
  Users,
  CalendarCheck,
  Workflow,
  PlugZap,
  Globe,
  HelpCircle,
  Package,
} from "lucide-react"
import {
  SiShopify,
  SiStripe,
  SiWhatsapp,
  SiWoocommerce,
  SiBigcommerce,
  SiInstagram,
} from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"
import { FaqSchema, JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: "Agentic AI Sales Agent for Conversational Commerce | FloatChat",
  description:
    "Recommend products, answer buyer questions, and guide customers to checkout with an agentic AI sales agent across WhatsApp, web, and more.",
}

/* ─────────────────────────────────────────────────────────────
   Section eyebrow (local — FloatChat blue themed)
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-blue-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-blue-600">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Hero mockup: a shopping conversation that ends in checkout
─────────────────────────────────────────────────────────────── */

function ShoppingConversationMockup() {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const run = async () => {
      while (!cancelled) {
        setPhase(0)
        await wait(700)
        if (cancelled) return
        setPhase(1) // buyer question
        await wait(1300)
        if (cancelled) return
        setPhase(2) // agent typing
        await wait(1000)
        if (cancelled) return
        setPhase(3) // product recommendation card
        await wait(2200)
        if (cancelled) return
        setPhase(4) // buyer asks objection
        await wait(1400)
        if (cancelled) return
        setPhase(5) // agent answers + checkout chip
        await wait(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(96,165,250,0.40), rgba(59,130,246,0.28), transparent 70%)",
        }}
      />

      {/* Floating channel chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
          <SiWhatsapp className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Selling on <span className="text-blue-600">WhatsApp</span>
        </span>
      </motion.div>

      {/* Floating cart-recovered chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-3 -right-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
        </span>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          Cart recovered <span className="text-blue-600">+$129</span>
        </span>
      </motion.div>

      {/* Phone-style chat shell */}
      <div className="rounded-[28px] border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Header bar */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6]">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-white/15 ring-2 ring-white/30 flex items-center justify-center">
              <Bot className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-300 ring-2 ring-[#1D4ED8]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-semibold text-white leading-tight">Maple · Sales agent</p>
            <p className="text-[10px] text-blue-50/90">Recommends · answers · checks out</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white">
            <Sparkles className="h-2.5 w-2.5" />
            Agentic
          </span>
        </div>

        {/* Conversation body */}
        <div
          className="px-3.5 py-4 space-y-2.5 min-h-[440px]"
          style={{
            background: "#F5F7FF",
            backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.06) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          {/* Buyer question */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="rounded-2xl rounded-br-sm bg-[#0F2A4A] text-white px-3 py-2 max-w-[78%] shadow-sm">
                  <p className="text-[11.5px] leading-snug">
                    Looking for a lightweight rain jacket for hiking — under $150?
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Agent typing */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                key="typ"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-sm bg-white border border-blue-100 px-3 py-2 shadow-sm flex items-center gap-1">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-blue-400"
                      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Agent recommendation + product card */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="rec"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[88%] space-y-2">
                  <div className="rounded-2xl rounded-bl-sm bg-white border border-blue-100 px-3 py-2 shadow-sm">
                    <p className="text-[11.5px] text-[#0F2A4A] leading-snug">
                      Great choice for trails! The <span className="font-semibold">Summit Shell</span> is our
                      lightest waterproof — and it&apos;s in your budget 🙌
                    </p>
                  </div>

                  {/* Product card */}
                  <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-[0_12px_28px_-16px_rgba(15,42,74,0.3)]">
                    <div className="relative h-24 bg-gradient-to-br from-blue-100 via-blue-100 to-blue-200">
                      <Package className="absolute inset-0 m-auto h-8 w-8 text-blue-500/70" />
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold text-blue-700">
                        <Sparkles className="h-2.5 w-2.5" />
                        Best match
                      </span>
                      <span className="absolute top-2 right-2 inline-flex items-center rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-semibold text-white">
                        In stock
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-[#0F2A4A] truncate">Summit Shell</p>
                          <p className="text-[10px] text-slate-500">Ultralight · 2-layer waterproof</p>
                        </div>
                        <p className="text-[14px] font-bold text-blue-700 shrink-0">$129</p>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] text-white text-[11px] font-semibold py-1.5 shadow-sm">
                          <ShoppingCart className="h-3 w-3" />
                          Add to cart
                        </button>
                        <button className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-medium text-slate-600">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buyer objection */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="rounded-2xl rounded-br-sm bg-[#0F2A4A] text-white px-3 py-2 max-w-[78%] shadow-sm">
                  <p className="text-[11.5px] leading-snug">Does it ship before the weekend? And free returns?</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Agent answers objection + checkout chip */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.div
                key="close"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[88%] space-y-2">
                  <div className="rounded-2xl rounded-bl-sm bg-white border border-blue-100 px-3 py-2 shadow-sm">
                    <p className="text-[11.5px] text-[#0F2A4A] leading-snug">
                      Yes — order in the next 3 hrs and it ships today, arrives Friday. Returns are free for 30
                      days 📦
                    </p>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-medium text-blue-700">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      from your shipping + returns policy
                    </span>
                  </div>

                  {/* Checkout chip */}
                  <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0">
                      <CreditCard className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0F2A4A]">Secure checkout ready</p>
                      <p className="text-[9.5px] text-blue-700">Summit Shell · $129 · pay in chat</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="px-3.5 py-2.5 border-t border-slate-200 bg-white flex items-center gap-2">
          <div className="flex-1 h-8 rounded-full bg-slate-100 border border-slate-200 px-3 flex items-center">
            <span className="text-[10px] text-slate-400">Type a message…</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-sm">
            <Send className="h-3.5 w-3.5 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mini visuals for the "What it does" feature cards
─────────────────────────────────────────────────────────────── */

function RecommendVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3 w-3 text-blue-600" />
        <span className="text-[9.5px] font-semibold text-[#0F2A4A] uppercase tracking-wider">
          Matched to the buyer
        </span>
      </div>
      <div className="space-y-1.5">
        {[
          { name: "Summit Shell · Green", price: "$129", match: "98%", top: true },
          { name: "Trail Runner Tee", price: "$45", match: "84%" },
          { name: "Dry-Pack 18L", price: "$89", match: "71%" },
        ].map((p) => (
          <div
            key={p.name}
            className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${
              p.top ? "border-blue-200 bg-blue-50/60" : "border-slate-100 bg-slate-50/40"
            }`}
          >
            <div
              className={`h-6 w-6 rounded bg-gradient-to-br ${
                p.top ? "from-blue-200 to-blue-300" : "from-slate-200 to-slate-300"
              } shrink-0`}
            />
            <span className="text-[10px] text-[#0F2A4A] truncate flex-1">{p.name}</span>
            <span className="text-[10px] font-semibold text-[#0F2A4A]">{p.price}</span>
            <span
              className={`text-[9px] font-semibold ${p.top ? "text-blue-700" : "text-slate-400"}`}
            >
              {p.match}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ObjectionVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1.5">
      {[
        { Icon: Ruler, label: "Runs true to size — order your usual M", tag: "Sizing" },
        { Icon: Truck, label: "Ships today, arrives Friday", tag: "Shipping" },
        { Icon: RotateCcw, label: "Free returns for 30 days", tag: "Returns" },
      ].map((r) => (
        <div
          key={r.tag}
          className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50/40 px-2 py-1.5"
        >
          <div className="h-6 w-6 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <r.Icon className="h-3 w-3 text-blue-600" />
          </div>
          <span className="text-[10px] text-[#0F2A4A] flex-1 leading-snug">{r.label}</span>
          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-1.5 py-0.5 shrink-0">
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  )
}

function CheckoutVisual() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[9.5px] font-semibold text-[#0F2A4A] uppercase tracking-wider">Order summary</span>
        <span className="inline-flex items-center gap-1 text-[9px] font-medium text-blue-700">
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
          In chat
        </span>
      </div>
      <div className="rounded-md border border-slate-100 bg-slate-50/40 px-2 py-1.5 flex items-center gap-2">
        <div className="h-7 w-7 rounded bg-gradient-to-br from-blue-200 to-blue-300 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium text-[#0F2A4A] truncate">Summit Shell · Green · M</p>
          <p className="text-[9px] text-slate-500">Qty 1</p>
        </div>
        <p className="text-[11px] font-semibold text-[#0F2A4A]">$129</p>
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] text-slate-500">Total</span>
        <span className="text-[12px] font-bold text-blue-700">$129.00</span>
      </div>
      <button className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] text-white text-[10.5px] font-semibold py-1.5 shadow-sm">
        <CreditCard className="h-3 w-3" />
        Pay securely
      </button>
    </div>
  )
}

function RecoveryVisual() {
  return (
    <div
      className="rounded-xl p-3 space-y-1.5 overflow-hidden"
      style={{
        background: "#E5DDD5",
        backgroundImage: "radial-gradient(circle, rgba(15,42,74,0.06) 1px, transparent 1px)",
        backgroundSize: "10px 10px",
      }}
    >
      <div className="flex justify-end">
        <div className="rounded-lg rounded-tr-sm px-2 py-1.5 max-w-[88%] shadow-sm" style={{ background: "#DCF8C6" }}>
          <p className="text-[10px] text-[#0F2A4A] leading-snug">
            Still thinking about the Summit Shell? I held your size — free shipping if you check out today 💚
          </p>
          <p className="text-[8px] text-slate-500 text-right mt-0.5">
            10:12 <span style={{ color: "#25D366" }}>✓✓</span>
          </p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="rounded-lg rounded-tl-sm bg-white px-2 py-1.5 max-w-[80%] shadow-sm">
          <p className="text-[10px] text-[#0F2A4A]">Oh nice — yes please!</p>
        </div>
      </div>
      <div className="flex items-center gap-1 pt-1">
        <SiWhatsapp className="h-2.5 w-2.5" style={{ color: "#25D366" }} />
        <span className="text-[9px] font-semibold text-slate-700">Automated · brought the buyer back</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Data: stats, flow, features, channels, agent family, FAQs
─────────────────────────────────────────────────────────────── */

const stats: { value: string; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "Live catalog", label: "Recommends from your products", Icon: ShoppingBag },
  { value: "Auto", label: "Recovers abandoned carts", Icon: RotateCcw },
  { value: "Omnichannel", label: "Sells on WhatsApp & web", Icon: Globe },
  { value: "+AOV", label: "Lifts order value with cross-sell", Icon: TrendingUp },
]

type LucideLike = React.ComponentType<{ className?: string; strokeWidth?: number }>

const flowSteps: {
  step: string
  Icon: LucideLike
  title: string
  body: string
}[] = [
  {
    step: "01",
    Icon: HelpCircle,
    title: "Question",
    body: "A shopper asks about a product, fit, price, or availability — in chat, on any channel.",
  },
  {
    step: "02",
    Icon: Sparkles,
    title: "Recommendation",
    body: "The agent pulls the right item from your catalog and presents it as a shoppable product card.",
  },
  {
    step: "03",
    Icon: MessageSquare,
    title: "Answer objections",
    body: "Sizing, shipping, returns, and stock questions get instant, on-brand answers that build confidence.",
  },
  {
    step: "04",
    Icon: CreditCard,
    title: "Checkout",
    body: "The buyer pays inside the conversation, or gets handed to your team for a high-value close.",
  },
]

const features: {
  Icon: LucideLike
  title: string
  body: string
  visual: React.ReactNode
}[] = [
  {
    Icon: Sparkles,
    title: "Personalized recommendations",
    body: "Trained on your catalog, the agent matches each buyer to the right product — and cross-sells the natural add-ons that lift order value.",
    visual: <RecommendVisual />,
  },
  {
    Icon: MessageSquare,
    title: "Answers that close",
    body: "Sizing, availability, shipping, and returns answered in real time from your own policies — so a question never becomes a lost sale.",
    visual: <ObjectionVisual />,
  },
  {
    Icon: CreditCard,
    title: "Guided checkout",
    body: "Buyers purchase inside the conversation with payment and catalog messages where the channel supports it. No detours, no drop-off.",
    visual: <CheckoutVisual />,
  },
  {
    Icon: RotateCcw,
    title: "Automatic cart recovery",
    body: "When a cart goes quiet, the agent follows up over SMS or WhatsApp with a timely, personal nudge that brings the buyer back.",
    visual: <RecoveryVisual />,
  },
]

type IntCmp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>
const channels: { name: string; detail: string; Icon?: IntCmp; bg: string; initial: string }[] = [
  { name: "Shopify", detail: "catalog, orders, carts", Icon: SiShopify, bg: "#95BF47", initial: "S" },
  { name: "Stripe", detail: "payments in chat", Icon: SiStripe, bg: "#635BFF", initial: "S" },
  { name: "WhatsApp", detail: "sell & recover", Icon: SiWhatsapp, bg: "#25D366", initial: "W" },
  { name: "WooCommerce", detail: "WordPress stores", Icon: SiWoocommerce, bg: "#7F54B3", initial: "W" },
  { name: "BigCommerce", detail: "enterprise catalog", Icon: SiBigcommerce, bg: "#121118", initial: "B" },
  { name: "Instagram", detail: "DM commerce", Icon: SiInstagram, bg: "#E1306C", initial: "I" },
]

const agentFamily: {
  name: string
  href: string
  desc: string
  Icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    name: "Customer Service Agent",
    href: "/ai-agents/customer-service",
    desc: "Deflect and resolve repetitive tickets across every channel.",
    Icon: MessageSquare,
  },
  {
    name: "Booking Agent",
    href: "/ai-agents/booking",
    desc: "Turn conversations into confirmed appointments and reservations.",
    Icon: CalendarCheck,
  },
  {
    name: "Lead Qualification Agent",
    href: "/ai-agents/lead-qualification",
    desc: "Score, route, and warm up leads before they reach your team.",
    Icon: Users,
  },
  {
    name: "Agent Builder",
    href: "/ai-agents/agent-builder",
    desc: "Design your own agentic workflows with no-code building blocks.",
    Icon: Workflow,
  },
]

const related: { name: string; href: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "E-commerce solution", href: "/solutions/ecommerce", Icon: ShoppingBag },
  { name: "WhatsApp", href: "/whatsapp", Icon: SiWhatsapp as unknown as React.ComponentType<{ className?: string }> },
  { name: "Integrations", href: "/integrations", Icon: PlugZap },
]

const faqs: FAQItem[] = [
  {
    question: "Which channels can the AI sales agent sell on?",
    answer:
      "WhatsApp, web chat, and more — all from one inbox. The agent recommends products, answers buyer questions, and guides checkout wherever your customers already message you, so you sell in the conversation instead of pushing people to a separate page.",
  },
  {
    question: "Does it integrate with my store?",
    answer:
      "Yes. FloatChat offers 200+ integrations and an open API, including Shopify, WooCommerce, BigCommerce, and Stripe. The agent reads your live catalog, inventory, pricing, and policies so every recommendation and answer is accurate and on-brand.",
  },
  {
    question: "Can it recover abandoned carts?",
    answer:
      "Yes. When a cart goes quiet, the agent automatically follows up over SMS or WhatsApp with a timely, personal nudge — referencing the exact items left behind — to bring the buyer back and close the sale without anyone on standby.",
  },
  {
    question: "Will it sound like my brand?",
    answer:
      "You set the tone, vocabulary, and guardrails. The agent stays grounded in your product data and policies, so it speaks in your voice and never invents prices, stock, or promises you don't offer.",
  },
  {
    question: "When does a human step in?",
    answer:
      "The agent handles the everyday product questions and routine checkouts on its own. For high-value deals, complex requests, or anything it isn't confident about, it hands the warm buyer to your team with the full conversation and context attached.",
  },
  {
    question: "How is this different from a basic chatbot?",
    answer:
      "A scripted bot follows a decision tree. An agentic AI sales agent understands intent, reasons over your catalog, takes actions like building a cart and triggering recovery, and moves the buyer toward checkout — closing the gap between interest and action.",
  },
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Agentic AI Sales Agent",
  serviceType: "Conversational commerce AI sales agent",
  url: "https://www.floatchat.com/ai-agents/sales",
  description:
    "An agentic AI sales agent that recommends products, answers buyer questions, and guides customers to checkout across WhatsApp, web, and more.",
  provider: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com",
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    url: "https://www.floatchat.com/signup?plan=free",
    price: "0",
    priceCurrency: "USD",
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function SalesAgentPage() {
  usePageMeta({
    title: "Agentic AI Sales Agent for Conversational Commerce | FloatChat",
    description:
      "Recommend products, answer buyer questions, and guide customers to checkout with an agentic AI sales agent across WhatsApp, web, and more.",
  })

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
              style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
              style={{ background: "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)" }}
            />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.10) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
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
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Conversational commerce · sell in the chat
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
                >
                  An agentic AI sales agent that turns{" "}
                  <span className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent">
                    chats into orders.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Recommend products, answer buyer questions, and guide customers to checkout inside the
                  conversation — on every channel, day or night.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {["Recommends from your catalog", "Recovers carts", "WhatsApp & web", "Hands off warm buyers"].map(
                    (b) => (
                      <span key={b} className="flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-blue-600" />
                        {b}
                      </span>
                    ),
                  )}
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
                      style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }}
                    />
                    <Link
                      to="/signup?plan=free"
                      className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#1D4ED8] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(29,78,216,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
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
                  className="mt-6 text-[13px] text-slate-400"
                >
                  Built for D2C and retail teams that sell in the chat.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <ShoppingConversationMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <section className="relative border-y border-blue-100 bg-gradient-to-r from-[#F5F7FF] via-white to-[#F5F7FF]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-blue-100/70">
              {stats.map((s, i) => (
                <BlurFade key={s.label} delay={i * 0.06}>
                  <div className="flex items-start gap-3 px-4 py-7 lg:py-9">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                      <s.Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">{s.value}</p>
                      <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">{s.label}</p>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── THE PROBLEM ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="01" label="The problem" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  A slow or generic answer{" "}
                  <span className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent">
                    loses the sale.
                  </span>
                </h2>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="space-y-4 text-base text-slate-500 leading-relaxed">
                  <p>
                    Shoppers ask questions before they buy. Will it fit? Is it in stock? When does it ship, and
                    what happens if I want to return it? In the moments between curiosity and the &ldquo;buy&rdquo;
                    button, doubt creeps in — and a buyer who has to wait, or who gets a canned reply that misses
                    the point, simply closes the tab.
                  </p>
                  <p>
                    The cost is invisible but enormous. Every unanswered DM, every &ldquo;let me check and get
                    back to you,&rdquo; every cart left to go cold is revenue that was already in the building.
                    Most stores don&apos;t lose sales on price — they lose them in the gap between interest and
                    action.
                  </p>
                  <p>
                    An agentic AI sales agent closes that gap. It answers instantly, recommends the right product
                    from your catalog, handles the objection on the spot, and moves the buyer toward checkout —
                    without a human waiting on standby. Your team steps in only when a deal is worth their time.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── CONVERSATION-TO-CHECKOUT FLOW ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] via-white to-[#F8FAFF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.08) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="02" label="The flow" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  From conversation to checkout.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  One continuous thread takes the buyer from a first question to a paid order — no handoffs to a
                  separate page, no waiting on a human.
                </p>
              </BlurFade>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {flowSteps.map((s, i) => (
                <BlurFade key={s.step} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group relative h-full rounded-3xl border border-blue-100 bg-white p-6 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.3)] transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
                        <s.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <span className="text-2xl font-mono font-semibold text-blue-100 group-hover:text-blue-200 transition-colors">
                        {s.step}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0F2A4A]">{s.title}</h3>
                    <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">{s.body}</p>

                    {i < flowSteps.length - 1 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-3.5 -translate-y-1/2 h-5 w-5 text-blue-300 z-10" />
                    )}
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── WHAT IT DOES ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="03" label="What it does" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Built to recommend, answer, and sell.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Four jobs the agent does on its own — every product question gets an instant, on-brand answer,
                  and there&apos;s no gap between interest and action.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((f, i) => (
                <BlurFade key={f.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-blue-300 hover:shadow-[0_30px_60px_-30px_rgba(29,78,216,0.28)] transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/40 shrink-0">
                        <f.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {f.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">{f.body}</p>
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

        {/* ───── CART RECOVERY SPOTLIGHT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden border border-blue-200 bg-gradient-to-br from-[#0F2A4A] via-[#1E40AF] to-[#1D4ED8] p-8 lg:p-12 shadow-[0_30px_70px_-35px_rgba(29,78,216,0.6)]">
              <div
                className="pointer-events-none absolute -top-24 -right-16 w-[460px] h-[400px] opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(96,165,250,0.5), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="col-span-12 lg:col-span-6 text-white">
                  <div className="inline-flex items-center gap-2 mb-5">
                    <span className="text-[11px] font-mono text-blue-200/80">/ 04</span>
                    <span className="h-px w-8 bg-blue-300/60" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-blue-200">
                      Cart recovery
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05]">
                    The carts you wrote off,{" "}
                    <span className="text-blue-300">brought back.</span>
                  </h2>
                  <p className="mt-5 text-blue-50/90 text-base leading-relaxed max-w-lg">
                    Roughly seven in ten carts are abandoned. The agent doesn&apos;t let them sit. It follows up
                    automatically over SMS or WhatsApp — referencing the exact items left behind, with a timely,
                    personal nudge — and reopens the conversation right where it stopped.
                  </p>

                  <div className="mt-7 grid grid-cols-3 gap-4">
                    {[
                      { v: "~70%", l: "of carts abandoned" },
                      { v: "Auto", l: "SMS + WhatsApp follow-up" },
                      { v: "0", l: "humans on standby" },
                    ].map((m) => (
                      <div key={m.l}>
                        <p className="text-2xl lg:text-3xl font-semibold text-white tabular-nums">{m.v}</p>
                        <p className="text-[11px] text-blue-100/80 mt-1 leading-snug">{m.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <BlurFade delay={0.15} className="col-span-12 lg:col-span-6">
                  <div className="rounded-2xl bg-white/95 backdrop-blur p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0F2A4A]">
                        <RotateCcw className="h-3.5 w-3.5 text-blue-600" />
                        Recovery timeline
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                        <Zap className="h-2.5 w-2.5" />
                        Automated
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { t: "0h", label: "Cart abandoned · Summit Shell ($129)", tone: "slate" },
                        { t: "1h", label: "Friendly nudge sent over WhatsApp", tone: "blue" },
                        { t: "3h", label: "Size held + free-shipping offer", tone: "blue" },
                        { t: "4h", label: "Buyer returns and checks out", tone: "win" },
                      ].map((row, idx) => (
                        <div key={row.t} className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-slate-400 w-6 shrink-0">{row.t}</span>
                          <span
                            className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                              row.tone === "win"
                                ? "bg-blue-500 ring-4 ring-blue-100"
                                : row.tone === "blue"
                                ? "bg-blue-400"
                                : "bg-slate-300"
                            }`}
                          />
                          <span
                            className={`text-[12px] flex-1 ${
                              row.tone === "win" ? "font-semibold text-blue-700" : "text-[#0F2A4A]"
                            }`}
                          >
                            {row.label}
                          </span>
                          {idx === 3 && <Check className="h-3.5 w-3.5 text-blue-600" strokeWidth={3} />}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 px-3 py-2.5 flex items-center justify-between">
                      <span className="text-[12px] font-medium text-[#0F2A4A]">Order recovered</span>
                      <span className="text-[15px] font-bold text-blue-700">+$129</span>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* ───── COMMERCE CHANNELS / INTEGRATIONS ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="05" label="Commerce stack" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Plugs into where you already sell.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Connect your store, payments, and channels — then the agent recommends, answers, and checks out
                  with live data. 200+ integrations and an open API.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {channels.map((it) => (
                  <div
                    key={it.name}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-[0_15px_30px_-15px_rgba(29,78,216,0.25)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md ring-1 ring-black/5"
                      style={{ background: it.bg }}
                    >
                      {it.Icon ? (
                        <it.Icon style={{ color: "#FFFFFF", width: 18, height: 18 }} />
                      ) : (
                        it.initial
                      )}
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] truncate">{it.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{it.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-blue-600" />
                  Reads live catalog & pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-blue-600" />
                  Shipping & returns from your policies
                </span>
                <span className="flex items-center gap-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                  Payment & catalog messages where supported
                </span>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── WHY FLOATCHAT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="06" label="Why FloatChat" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  One platform, from first message to repeat purchase.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  The sales agent shares one platform with your support agent, inbox, and campaigns. A single
                  customer record follows the buyer the whole way — so context never gets lost in the handoff.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      Icon: Bot,
                      title: "Shared with your support agent",
                      body: "Sales and service run on the same brain and the same inbox — no swivel-chairing between tools.",
                    },
                    {
                      Icon: Users,
                      title: "One customer record",
                      body: "Order history, preferences, and past chats stay attached to the buyer from day one.",
                    },
                    {
                      Icon: TrendingUp,
                      title: "Campaigns in the loop",
                      body: "Recovery and promo flows live alongside conversations, so follow-ups always have context.",
                    },
                    {
                      Icon: Zap,
                      title: "Instant, always-on",
                      body: "Every product question gets an answer day or night — no waiting, no missed window.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 transition-colors"
                    >
                      <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-3">
                        <c.Icon className="h-4.5 w-4.5 text-blue-600" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#0F2A4A]">{c.title}</h3>
                      <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">{c.body}</p>
                    </div>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Turn more conversations into orders."
          body="Connect your store and channels — the agent recommends, answers, and checks out automatically."
          primaryLabel="Start Free"
          primaryHref="/signup?plan=free"
          secondaryLabel="Get a Demo"
          secondaryHref="/demo"
        />

        {/* ───── TESTIMONIALS ───── */}
        <Testimonials />

        {/* ───── AGENT FAMILY ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F5F7FF] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="07" label="The agent family" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Meet the rest of the team.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  The sales agent is one of a family of agentic teammates — mix and match, or build your own.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {agentFamily.map((a, i) => (
                <BlurFade key={a.href} delay={0.05 + i * 0.07} className="h-full">
                  <Link
                    to={a.href}
                    className="group h-full flex flex-col rounded-3xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-[0_24px_50px_-30px_rgba(29,78,216,0.3)] transition-all duration-300"
                  >
                    <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                      <a.Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#0F2A4A] leading-snug">{a.name}</h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed flex-1">{a.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-blue-700 group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/ai-agents"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  <Bot className="h-4 w-4" />
                  See all AI agents
                </Link>
                {related.map((r) => (
                  <Link
                    key={r.href}
                    to={r.href}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-[#0F2A4A] hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    <r.Icon className="h-4 w-4" />
                    {r.name}
                  </Link>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-[#F5F7FF] to-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <FAQSection
              faqs={faqs}
              title="Sales agent questions"
              description="Channels, integrations, cart recovery, and handoff — straight answers."
              footer={
                <p className="text-sm text-muted-foreground">
                  More questions?{" "}
                  <Link
                    to="/contact"
                    className="text-blue-700 font-medium underline underline-offset-2 hover:no-underline"
                  >
                    Talk to us
                  </Link>{" "}
                  or browse the{" "}
                  <Link
                    to="/integrations"
                    className="text-blue-700 font-medium underline underline-offset-2 hover:no-underline"
                  >
                    integrations
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
              className="relative rounded-3xl border border-blue-100 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-14 lg:py-20 text-center overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(219,234,254,0.6) 35%, rgba(207,250,254,0.55) 65%, rgba(191,212,255,0.6) 100%)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-8 right-8 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(59,130,246,0.6) 30%, #A8C8FF 60%, #A8E6F7 80%, transparent)",
                }}
              />
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(168,200,255,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(96,165,250,0.35), transparent 70%)" }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-blue-200 bg-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                </span>
                <span className="text-[11px] font-medium text-[#0F2A4A]">
                  Sells, answers & recovers — out of the box
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
                <span className="h-px w-6 bg-blue-300" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-blue-600">
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
                Turn more conversations into{" "}
                <span className="bg-gradient-to-r from-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent">
                  orders.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Connect your store and channels — the agent recommends, answers, and checks out automatically.
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
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#1D4ED8] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_24px_-6px_rgba(29,78,216,0.5)]"
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

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="relative mx-auto max-w-3xl mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-500"
              >
                {["Recommends from your catalog", "Recovers carts automatically", "WhatsApp & web", "Hands off warm buyers"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {t}
                    </span>
                  ),
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
