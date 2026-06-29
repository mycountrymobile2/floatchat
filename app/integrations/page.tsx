"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plug,
  Check,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Code2,
  Webhook,
  Key,
  ShieldCheck,
  Zap,
  MessageSquare,
  Phone,
  MessageCircle,
} from "lucide-react"
import {
  SiShopify,
  SiHubspot,
  SiSalesforce,
  SiSlack,
  SiZapier,
  SiStripe,
  SiZendesk,
  SiMailchimp,
  SiIntercom,
  SiNotion,
  SiGoogle,
  SiTwilio,
  SiMixpanel,
  SiJirasoftware,
  SiWoocommerce,
  SiBigcommerce,
  SiN8N,
  SiMake,
} from "react-icons/si"
import { FaMicrosoft } from "react-icons/fa"
import {
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebookMessenger,
  FaTelegram,
  FaLine,
  FaTiktok,
} from "react-icons/fa"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { FAQSection, type FAQItem } from "@/components/ui/faq-section-shadcnui"
import { InlineCTA } from "@/components/inline-cta"
import { BlurFade } from "@/components/ui/blur-fade"

/* ─────────────────────────────────────────────────────────────
   Brand tile (square logo with brand-colored bg + initial)
─────────────────────────────────────────────────────────────── */

type BrandIcon = React.ComponentType<{
  style?: React.CSSProperties
  className?: string
}>

type Brand = {
  name: string
  initial: string
  bg: string
  fg?: string
  Icon?: BrandIcon
}

const BRANDS: Brand[] = [
  { name: "Shopify", initial: "S", bg: "#95BF47", fg: "#FFFFFF", Icon: SiShopify },
  { name: "HubSpot", initial: "H", bg: "#FF7A59", fg: "#FFFFFF", Icon: SiHubspot },
  { name: "Salesforce", initial: "S", bg: "#00A1E0", fg: "#FFFFFF", Icon: SiSalesforce },
  { name: "Slack", initial: "S", bg: "#4A154B", fg: "#FFFFFF", Icon: SiSlack },
  { name: "Zapier", initial: "Z", bg: "#FF4F00", fg: "#FFFFFF", Icon: SiZapier },
  { name: "Stripe", initial: "S", bg: "#635BFF", fg: "#FFFFFF", Icon: SiStripe },
  { name: "Zendesk", initial: "Z", bg: "#03363D", fg: "#FFFFFF", Icon: SiZendesk },
  { name: "Pipedrive", initial: "P", bg: "#1A1A1A", fg: "#33EAA8" },
  { name: "Mailchimp", initial: "M", bg: "#FFE01B", fg: "#212121", Icon: SiMailchimp },
  { name: "Intercom", initial: "I", bg: "#0057FF", fg: "#FFFFFF", Icon: SiIntercom },
  { name: "Notion", initial: "N", bg: "#0F0F0F", fg: "#FFFFFF", Icon: SiNotion },
  { name: "Google", initial: "G", bg: "#FFFFFF", fg: "#4285F4", Icon: SiGoogle },
  { name: "Segment", initial: "S", bg: "#52BD95", fg: "#FFFFFF" },
  { name: "Mixpanel", initial: "M", bg: "#7856FF", fg: "#FFFFFF", Icon: SiMixpanel },
  { name: "Twilio", initial: "T", bg: "#F22F46", fg: "#FFFFFF", Icon: SiTwilio },
  { name: "Microsoft", initial: "M", bg: "#0078D4", fg: "#FFFFFF", Icon: FaMicrosoft },
  { name: "Jira", initial: "J", bg: "#2684FF", fg: "#FFFFFF", Icon: SiJirasoftware },
  { name: "WooCommerce", initial: "W", bg: "#7F54B3", fg: "#FFFFFF", Icon: SiWoocommerce },
  { name: "Make", initial: "M", bg: "#6D45F4", fg: "#FFFFFF", Icon: SiMake },
  { name: "Freshdesk", initial: "F", bg: "#25C16F", fg: "#FFFFFF" },
]

function BrandTile({
  brand,
  size = "md",
  active,
}: {
  brand: Brand
  size?: "sm" | "md" | "lg"
  active?: boolean
}) {
  const sizeClass =
    size === "sm"
      ? "h-9 w-9 text-[12px]"
      : size === "lg"
      ? "h-14 w-14 text-[18px]"
      : "h-11 w-11 text-[14px]"
  const iconPx = size === "sm" ? 16 : size === "lg" ? 26 : 20
  const fg = brand.fg ?? "#FFFFFF"
  return (
    <div
      className={`rounded-xl flex items-center justify-center font-bold shadow-[0_8px_18px_-8px_rgba(15,42,74,0.25)] ring-1 ring-black/5 ${sizeClass} transition-transform ${
        active ? "scale-105 ring-2 ring-[#3B82F6]" : ""
      }`}
      style={{ background: brand.bg, color: fg }}
      aria-label={brand.name}
      title={brand.name}
    >
      {brand.Icon ? (
        <brand.Icon style={{ color: fg, width: iconPx, height: iconPx }} />
      ) : (
        brand.initial
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Hero mockup: logo wall with cycling spotlight + detail card
─────────────────────────────────────────────────────────────── */

const SPOTLIGHTS = [
  {
    brand: BRANDS[0], // Shopify
    type: "E-commerce",
    summary: "Order status, tracking, and refunds inside the inbox.",
    stat: { label: "Live orders synced", value: "4,238" },
  },
  {
    brand: BRANDS[1], // HubSpot
    type: "CRM",
    summary: "Sync contacts, deals, and conversation history.",
    stat: { label: "Contacts synced", value: "12,401" },
  },
  {
    brand: BRANDS[4], // Zapier
    type: "Automation",
    summary: "Connect FloatChat to 6,000+ apps. No code.",
    stat: { label: "Zaps fired", value: "8,920" },
  },
  {
    brand: BRANDS[3], // Slack
    type: "Communication",
    summary: "Get new conversation alerts in Slack channels.",
    stat: { label: "Alerts/week", value: "1,142" },
  },
]

function LogoWallMockup() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(
      () => setIdx((p) => (p + 1) % SPOTLIGHTS.length),
      3000,
    )
    return () => clearInterval(t)
  }, [])

  const active = SPOTLIGHTS[idx]

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

      {/* Floating chips */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="absolute -top-3 -left-3 z-20 hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,42,74,0.18)]"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center">
          <Plug className="h-2.5 w-2.5 text-white" />
        </div>
        <span className="text-[11px] font-medium text-[#0F2A4A]">
          30+ integrations
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
          OAuth · 1-click connect
        </span>
      </motion.div>

      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)]">
        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50/80">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-[10px] font-mono text-slate-400">
            app.floatchat.com · integrations
          </span>
        </div>

        <div className="grid grid-cols-12 min-h-[440px]">
          {/* Logo wall */}
          <div className="col-span-12 md:col-span-7 p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-4">
              Available integrations
            </p>
            <div className="grid grid-cols-5 gap-2.5">
              {BRANDS.map((b) => {
                const isActive = b.name === active.brand.name
                return (
                  <motion.div
                    key={b.name}
                    animate={
                      isActive
                        ? { y: -3, scale: 1.05 }
                        : { y: 0, scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <BrandTile brand={b} size="md" active={isActive} />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Spotlight detail */}
          <div className="col-span-12 md:col-span-5 border-t md:border-t-0 md:border-l border-slate-200 bg-gradient-to-br from-slate-50/40 to-white p-5 sm:p-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.brand.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <BrandTile brand={active.brand} size="lg" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#1D4ED8] font-semibold">
                      {active.type}
                    </p>
                    <p className="text-base font-semibold text-[#0F2A4A]">
                      {active.brand.name}
                    </p>
                  </div>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {active.summary}
                </p>

                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-slate-500">
                      {active.stat.label}
                    </span>
                    <span className="text-base font-semibold text-[#1D4ED8] tabular-nums">
                      {active.stat.value}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-medium text-emerald-700">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    Connected
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    OAuth 2.0
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5">
              {SPOTLIGHTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Spotlight ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx
                      ? "w-6 bg-[#3B82F6]"
                      : "w-1.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>
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
   Tabbed category switcher (unique pattern for Integrations)
─────────────────────────────────────────────────────────────── */

const CATEGORIES: {
  name: string
  plan: string
  integrations: { name: string; desc: string; brand: Brand }[]
}[] = [
  {
    name: "E-commerce",
    plan: "Free",
    integrations: [
      {
        name: "Shopify",
        desc: "Order status, tracking, refunds inside the inbox.",
        brand: BRANDS[0],
      },
      {
        name: "WooCommerce",
        desc: "WordPress store orders and customer data.",
        brand: BRANDS[17],
      },
      {
        name: "BigCommerce",
        desc: "Catalog and order sync.",
        brand: {
          name: "BigCommerce",
          initial: "B",
          bg: "#0D52FF",
          fg: "#FFFFFF",
          Icon: SiBigcommerce,
        },
      },
    ],
  },
  {
    name: "CRM",
    plan: "Starter",
    integrations: [
      {
        name: "HubSpot",
        desc: "Sync contacts, deals, and conversation history.",
        brand: BRANDS[1],
      },
      {
        name: "Salesforce",
        desc: "Push leads and cases from FloatChat to SFDC.",
        brand: BRANDS[2],
      },
      {
        name: "Pipedrive",
        desc: "Create deals from conversations automatically.",
        brand: BRANDS[7],
      },
    ],
  },
  {
    name: "Helpdesk",
    plan: "Starter",
    integrations: [
      {
        name: "Zendesk",
        desc: "Escalate conversations as Zendesk tickets.",
        brand: BRANDS[6],
      },
      {
        name: "Freshdesk",
        desc: "Two-way ticket sync.",
        brand: BRANDS[19],
      },
      {
        name: "Jira Service Management",
        desc: "Create Jira issues from support tickets.",
        brand: BRANDS[16],
      },
    ],
  },
  {
    name: "Communication",
    plan: "Starter",
    integrations: [
      {
        name: "Slack",
        desc: "Get new conversation alerts in Slack.",
        brand: BRANDS[3],
      },
      {
        name: "Microsoft Teams",
        desc: "Route escalations to Teams channels.",
        brand: BRANDS[15],
      },
      {
        name: "Twilio",
        desc: "Bring your own Twilio number for voice and SMS.",
        brand: BRANDS[14],
      },
    ],
  },
  {
    name: "Analytics",
    plan: "Growth",
    integrations: [
      {
        name: "Google Analytics 4",
        desc: "Track widget events and conversions.",
        brand: BRANDS[11],
      },
      {
        name: "Segment",
        desc: "Send conversation events to your data warehouse.",
        brand: BRANDS[12],
      },
      {
        name: "Mixpanel",
        desc: "Funnel analysis with support touchpoints.",
        brand: BRANDS[13],
      },
    ],
  },
  {
    name: "Automation",
    plan: "Starter",
    integrations: [
      {
        name: "Zapier",
        desc: "Connect FloatChat to 6,000+ apps. No code.",
        brand: BRANDS[4],
      },
      {
        name: "Make (Integromat)",
        desc: "Advanced multi-step automation flows.",
        brand: BRANDS[18],
      },
      {
        name: "n8n",
        desc: "Open-source automation with FloatChat triggers.",
        brand: {
          name: "n8n",
          initial: "N",
          bg: "#EA4B71",
          fg: "#FFFFFF",
          Icon: SiN8N,
        },
      },
    ],
  },
]

function CategoryTabs() {
  const [active, setActive] = useState(0)
  const cat = CATEGORIES[active]

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="relative overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORIES.map((c, i) => {
            const isActive = i === active
            return (
              <button
                key={c.name}
                onClick={() => setActive(i)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-[#0F2A4A] text-white shadow-[0_10px_20px_-10px_rgba(15,42,74,0.5)]"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#0F2A4A]"
                }`}
              >
                {c.name}
                <span
                  className={`text-[9.5px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-white/15 text-white"
                      : c.plan === "Free"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#3B82F6]/10 text-[#1D4ED8]"
                  }`}
                >
                  {c.plan}+
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-5 md:grid-cols-3"
        >
          {cat.integrations.map((int) => (
            <div
              key={int.name}
              className="group rounded-3xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <BrandTile brand={int.brand} size="lg" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    {cat.name}
                  </p>
                  <h4 className="text-base font-semibold text-[#0F2A4A] leading-tight">
                    {int.name}
                  </h4>
                </div>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-5">
                {int.desc}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    cat.plan === "Free"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-[#3B82F6]/10 text-[#1D4ED8] border border-[#3B82F6]/20"
                  }`}
                >
                  {cat.plan}+
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1D4ED8] group-hover:gap-2 transition-all">
                  Connect
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ + native channels
─────────────────────────────────────────────────────────────── */

const faqs: FAQItem[] = [
  {
    question: "Is the Zapier integration free?",
    answer:
      "The FloatChat side is free on Starter and above. Zapier's own pricing applies — they have a free tier that covers basic automations.",
  },
  {
    question: "Can I use my existing Twilio account?",
    answer:
      "Yes. On Starter and above you can connect your own Twilio credentials for voice and SMS, giving you full control over numbers and rates.",
  },
  {
    question: "Is there a public API?",
    answer:
      "Yes. REST API + webhooks are available from Lite ($9.99/month). Full documentation is available in your dashboard after signup.",
  },
  {
    question: "Can FloatChat integrate with my custom CRM?",
    answer:
      "Yes, via webhooks + API on Starter+. For a native integration, contact our partnerships team.",
  },
  {
    question: "Does FloatChat support SAML SSO?",
    answer:
      "Yes, on Pro and Enterprise plans. Supports Okta, Azure AD, Google Workspace, and any SAML 2.0 provider.",
  },
]

const nativeChannels: {
  name: string
  plan: "Free" | "Starter"
  color: string
  Icon: BrandIcon
}[] = [
  { name: "Live Chat", plan: "Free", color: "#3B82F6", Icon: MessageSquare },
  { name: "Email", plan: "Free", color: "#EA4335", Icon: FaEnvelope },
  { name: "WhatsApp", plan: "Free", color: "#25D366", Icon: FaWhatsapp },
  { name: "Voice", plan: "Starter", color: "#0EA5E9", Icon: Phone },
  { name: "SMS", plan: "Starter", color: "#7C3AED", Icon: MessageCircle },
  { name: "Instagram", plan: "Starter", color: "#E1306C", Icon: FaInstagram },
  { name: "Messenger", plan: "Starter", color: "#0084FF", Icon: FaFacebookMessenger },
  { name: "Telegram", plan: "Starter", color: "#26A5E4", Icon: FaTelegram },
  { name: "Line", plan: "Starter", color: "#06C755", Icon: FaLine },
  { name: "TikTok", plan: "Starter", color: "#0F0F0F", Icon: FaTiktok },
]

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function IntegrationsPage() {
  useEffect(() => {
    document.title =
      "Integrations — Connect FloatChat to Your Stack | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc)
      desc.setAttribute(
        "content",
        "FloatChat connects to Shopify, HubSpot, Salesforce, Slack, Zapier, and 50+ tools. Native channels: chat, email, WhatsApp, voice, SMS, Instagram.",
      )
  }, [])

  return (
    <>
      <Header />
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
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
                >
                  <Plug className="h-3.5 w-3.5" />
                  Integrations · 30+ apps · OAuth in one click
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]"
                >
                  Connect FloatChat to{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    your stack.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-5 text-[15px] lg:text-base text-slate-500 max-w-xl leading-relaxed"
                >
                  Shopify, HubSpot, Salesforce, Slack, Zapier and more — 1-click
                  OAuth on Starter. Plus 10 native channels and a full REST API.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"
                >
                  {[
                    "Shopify on Free",
                    "OAuth 2.0",
                    "REST API + Webhooks",
                    "SAML SSO on Pro",
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
                    to="/pricing"
                    className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    See all plans
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-sm text-slate-500"
                >
                  API access from $9.99. App integrations unlock on Starter
                  ($19.99).
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                <LogoWallMockup />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───── CATEGORY TABS (centerpiece) ───── */}
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
            <div className="grid grid-cols-12 gap-6 items-end mb-10">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="01" label="By category" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  App integrations.
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  Connect the tools your team already uses. Tap a tab to switch
                  category.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <CategoryTabs />
            </BlurFade>
          </div>
        </section>

        {/* ───── NATIVE CHANNELS ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6 items-end mb-12">
              <BlurFade className="col-span-12 lg:col-span-8">
                <SectionEyebrow num="02" label="No connector needed" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  10 channels{" "}
                  <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                    built in.
                  </span>
                </h2>
              </BlurFade>
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-4">
                <p className="text-base text-slate-500 leading-relaxed">
                  No third-party connectors needed. These channels are native to
                  FloatChat.
                </p>
              </BlurFade>
            </div>

            <BlurFade delay={0.1}>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {nativeChannels.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: 0.04 * i }}
                    className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-slate-300 hover:shadow-[0_15px_30px_-15px_rgba(15,42,74,0.2)] transition-all duration-300 flex flex-col items-start gap-2.5"
                  >
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-[0_8px_18px_-8px_rgba(15,42,74,0.25)] ring-1 ring-black/5"
                      style={{ background: c.color }}
                    >
                      <c.Icon
                        style={{ color: "#FFFFFF", width: 16, height: 16 }}
                      />
                    </div>
                    <div className="min-w-0 w-full">
                      <p className="text-sm font-semibold text-[#0F2A4A] leading-tight">
                        {c.name}
                      </p>
                      <span
                        className={`mt-1.5 inline-flex items-center text-[9.5px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          c.plan === "Free"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-[#3B82F6]/10 text-[#1D4ED8]"
                        }`}
                      >
                        {c.plan}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ───── API SECTION ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F5F7FF] to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
              <BlurFade className="col-span-12 lg:col-span-5">
                <SectionEyebrow num="03" label="Build your own" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Build your own integration.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  FloatChat ships with a full REST API and webhook system.
                  Available from Lite ($9.99/month).
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    {
                      Icon: Code2,
                      text: "REST API with full CRUD for contacts, conversations, and messages",
                    },
                    {
                      Icon: Webhook,
                      text: "Webhooks on new messages, conversation status changes, and agent assignments",
                    },
                    {
                      Icon: Key,
                      text: "OAuth 2.0 for third-party app authentication",
                    },
                    {
                      Icon: Zap,
                      text: "Rate limits: 1,000 req/min on Lite, 10,000 on Pro",
                    },
                    {
                      Icon: ShieldCheck,
                      text: "Sandbox environment on Growth and above",
                    },
                  ].map(({ Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 h-5 w-5 rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shrink-0 shadow-sm shadow-[#3B82F6]/40">
                        <Icon className="h-3 w-3 text-white" strokeWidth={2.5} />
                      </span>
                      <span className="text-[14px] text-[#0F2A4A] leading-relaxed">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/signup?plan=lite"
                    className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full text-[14px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.5)]"
                  >
                    Get API Access
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-full text-[14px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
                  >
                    Talk to Sales
                  </Link>
                </div>
              </BlurFade>

              {/* Code block */}
              <BlurFade delay={0.15} className="col-span-12 lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0F172A] shadow-[0_30px_60px_-25px_rgba(15,42,74,0.5)]">
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-700 bg-slate-800/40">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                    <span className="ml-2 text-[10px] font-mono text-slate-400">
                      POST /v1/conversations/:id/messages
                    </span>
                    <button className="ml-auto text-[9px] font-medium text-slate-300 hover:text-white border border-slate-700 rounded px-2 py-0.5">
                      Copy
                    </button>
                  </div>
                  <pre className="px-5 py-4 text-[13px] font-mono leading-relaxed text-slate-300 overflow-x-auto">
                    {`Authorization: `}
                    <span className="text-[#7CC4FF]">Bearer</span>
                    {` `}
                    <span className="text-emerald-400">YOUR_API_KEY</span>
                    {`\n\n{\n  `}
                    <span className="text-[#7CC4FF]">"content"</span>
                    {`:      `}
                    <span className="text-emerald-400">{`"Hi! How can I help you?"`}</span>
                    {`,\n  `}
                    <span className="text-[#7CC4FF]">"content_type"</span>
                    {`: `}
                    <span className="text-emerald-400">{`"text"`}</span>
                    {`,\n  `}
                    <span className="text-[#7CC4FF]">"message_type"</span>
                    {`: `}
                    <span className="text-emerald-400">{`"outgoing"`}</span>
                    {`,\n  `}
                    <span className="text-[#7CC4FF]">"private"</span>
                    {`:      `}
                    <span className="text-amber-400">false</span>
                    {`\n}`}
                  </pre>
                  <div className="px-4 py-2.5 border-t border-slate-800 bg-slate-900/40 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      201 Created
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[10.5px] text-slate-400 font-mono">
                      82ms
                    </span>
                    <span className="ml-auto text-[10.5px] text-slate-500 font-mono">
                      /docs
                    </span>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA ───── */}
        <InlineCTA
          headline="Connect FloatChat to your stack"
          body="Shopify, Stripe, HubSpot, Slack, Salesforce, and 30+ more."
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
              description="Zapier, Twilio, custom CRMs, SSO — straight answers."
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
                  30+ integrations · 10 native channels
                </span>
                <span className="h-3 w-px bg-slate-200" />
                <span className="text-[11px] text-slate-500">OAuth in seconds</span>
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
                Ready to connect{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
                  your stack?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
              >
                Start free. API access from $9.99.
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
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
                >
                  See all plans
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
                "30+ app integrations",
                "10 native channels",
                "REST API on Lite",
                "SAML SSO on Pro",
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
