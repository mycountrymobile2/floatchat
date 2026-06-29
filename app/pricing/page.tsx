"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Check, ArrowRight, ArrowDown, Info, Star, Plus } from "lucide-react"

/* ----------------------------- Plan data ----------------------------- */

type Billing = "monthly" | "yearly"

/** A feature line is parts — plain text, or a {term,tip} that renders an (i) tooltip. */
type FeaturePart = string | { term: string; tip: string }
type FeatureLine = FeaturePart[]

const TIP = {
  credits:
    "Each credit ≈ one Captain Assistant reply (~6,800 chars analyzed + 200 char reply). Co-pilot suggestions cost 0.5 credits, AI editor 0.3 credits, label suggestion 0.2 credits, FAQ generation 5 credits per source (PDF or URL), audio transcription 10 credits per minute.",
  aiEditor: "AI-powered text editing inside the agent reply box: change tone, fix grammar, smart compose from a prompt.",
  agentBots: "Rule-based conversation flows you build manually with branching logic — no AI required.",
  whatsapp: "Native WhatsApp Business API. Use your own WABA cloud number with FloatChat.",
  automations: "If-this-then-that rules. Auto-route, auto-respond, auto-assign, auto-resolve based on triggers.",
  skillRouting: "Route conversations to the agent with the right skills or language expertise.",
  customTools: "Connect Assistants to APIs (Shopify, Stripe, your own backend) so they can take actions, not just answer.",
  sla: "Service level agreements per conversation type with auto-alerts when at risk of breach.",
  rbac: "Define custom roles with granular permissions per feature and per inbox.",
  samlSso: "Single Sign-On via SAML 2.0 with your identity provider (Okta, Azure AD, JumpCloud, etc.).",
}

const freeFeatures = [
  "Website widget, Email & API channels",
  "Pre-chat forms & business hours",
  "Help Center (1 portal)",
  "India data residency",
  "5 canned responses · 3 macros",
  "Community support",
]

const freeUnlocks: FeatureLine[] = [
  ["WhatsApp Business, Instagram, TikTok & 4 more channels"],
  [{ term: "Captain AI", tip: TIP.credits }, " — 100 to 3,000 credits / agent / month"],
  ["Up to 50 agents with teams, automations & SLAs"],
  ["Remove FloatChat branding & use your own domain"],
]

interface Plan {
  id: string
  name: string
  desc: string
  monthly: string
  yearly: string
  cap: string
  featured: boolean
  cta: string
  href: string
  includesLabel: string
  features: FeatureLine[]
}

const paidPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "For solo founders and small teams who need every channel, no branding, and Captain AI to get started.",
    monthly: "11.99",
    yearly: "9.99",
    cap: "Flat fee — up to 2 agents · 2 inboxes",
    featured: false,
    cta: "Choose Starter",
    href: "/signup?plan=starter",
    includesLabel: "Starter includes:",
    features: [
      ["Up to 2 agents · 2 inboxes"],
      ["Web, Email & API channels"],
      ["+ Facebook, Instagram, Telegram"],
      [{ term: "Captain AI", tip: TIP.credits }, " · 100 credits/agent/mo"],
      ["1 AI Assistant + Co-pilot"],
      [{ term: "AI editor", tip: TIP.aiEditor }, " & Captain Documents (10)"],
      [{ term: "Agent Bots", tip: TIP.agentBots }, " (rule-based)"],
      ["Help Center · Slack · Webhooks"],
      ["Remove FloatChat branding"],
      ["Email support"],
    ],
  },
  {
    id: "growth",
    name: "Growth",
    desc: "For growing teams that want WhatsApp, automations, and the full Captain AI suite.",
    monthly: "23.99",
    yearly: "19.99",
    cap: "Flat fee — up to 12 agents · unlimited inboxes",
    featured: true,
    cta: "Choose Growth",
    href: "/signup?plan=growth",
    includesLabel: "Everything in Starter, plus:",
    features: [
      ["Up to 12 agents · unlimited inboxes"],
      [{ term: "WhatsApp Business", tip: TIP.whatsapp }, ", TikTok, Line"],
      ["500 ", { term: "Captain AI", tip: TIP.credits }, " credits/agent/mo"],
      ["3 AI Assistants + full Co-pilot"],
      ["Captain Documents (50) + Scenarios"],
      [{ term: "Automations", tip: TIP.automations }, " & workflows"],
      ["Live chat + WhatsApp campaigns"],
      ["Linear, Notion, Shopify, Dyte"],
      [{ term: "Skill routing", tip: TIP.skillRouting }, " · CSAT reports"],
      ["Priority email + Slack support"],
    ],
  },
  {
    id: "business",
    name: "Business",
    desc: "For scaling support teams that need SLA, SSO, audit logs, and the complete Captain AI suite.",
    monthly: "59.99",
    yearly: "49.99",
    cap: "Flat fee — up to 50 agents · unlimited inboxes",
    featured: false,
    cta: "Choose Business",
    href: "/signup?plan=business",
    includesLabel: "Everything in Growth, plus:",
    features: [
      ["Up to 50 agents · unlimited inboxes"],
      ["3,000 ", { term: "Captain AI", tip: TIP.credits }, " credits/agent/mo"],
      ["Unlimited Assistants + ", { term: "Custom Tools", tip: TIP.customTools }],
      ["Audio transcription · Help Center AI"],
      [{ term: "SLA", tip: TIP.sla }, " · Audit logs · ", { term: "RBAC", tip: TIP.rbac }],
      [{ term: "SAML SSO", tip: TIP.samlSso }, " · Dashboard Apps"],
      ["EU & US data residency"],
      ["SOC 2 · HIPAA · ISO 27001 · GDPR"],
      ["99.9% uptime SLA · Dedicated CSM"],
      ["Twilio integration available (add-on)"],
    ],
  },
]

/* --------------------------- Calculator data -------------------------- */

const CALC_PLANS = {
  free: {
    name: "Free",
    price: "0",
    period: "/ mo · forever",
    cap: "Forever free — for personal use & evaluation",
    includes: [
      "Up to 2 agents · 1 inbox · 500 conversations/mo",
      "Web, Email & API channels",
      "Help Center · India data residency",
      "Community support",
    ],
    cta: "Get started free",
    href: "/signup?plan=free",
  },
  starter: {
    name: "Starter",
    price: "9.99",
    period: "/ mo · billed yearly",
    cap: "Flat fee — up to 2 agents · 2 inboxes",
    includes: [
      "Up to 2 agents · 2 inboxes",
      "All Free channels + Facebook, Instagram, Telegram",
      "100 Captain AI credits / agent / month",
      "Remove FloatChat branding",
    ],
    cta: "Choose Starter",
    href: "/signup?plan=starter",
  },
  growth: {
    name: "Growth",
    price: "19.99",
    period: "/ mo · billed yearly",
    cap: "Flat fee — up to 12 agents · unlimited inboxes",
    includes: [
      "Up to 12 agents · unlimited inboxes",
      "All channels including WhatsApp Business",
      "500 Captain AI credits / agent / month",
      "Automations, workflows & campaigns",
    ],
    cta: "Choose Growth",
    href: "/signup?plan=growth",
  },
  business: {
    name: "Business",
    price: "49.99",
    period: "/ mo · billed yearly",
    cap: "Flat fee — up to 50 agents · unlimited inboxes",
    includes: [
      "Up to 50 agents · unlimited inboxes",
      "3,000 Captain AI credits / agent / month",
      "SLA · SAML SSO · Audit logs · RBAC",
      "SOC 2 · HIPAA · ISO 27001 · GDPR",
    ],
    cta: "Choose Business",
    href: "/signup?plan=business",
  },
} as const

type PlanKey = keyof typeof CALC_PLANS

function recommend(agents: number, conversations: number, credits: number, channels: string): PlanKey {
  // Plans cap agents at: Free=2, Starter=2, Growth=12, Business=50.
  if (agents > 12 || credits > 500) return "business"
  if (channels === "all" || credits > 100 || agents > 2) return "growth"
  if (channels === "social" || credits > 0) return "starter"
  if (conversations <= 500) return "free"
  return "starter"
}

/* --------------------------- Twilio add-on ---------------------------- */

const twilioIncludes = [
  "Unlimited Twilio numbers & messaging services",
  "Voice channel inside FloatChat inbox",
  "SMS campaigns from FloatChat",
  "Call recording & Captain AI transcription",
  "Setup help from our team",
]

/* ------------------------- Comparison table --------------------------- */

type Cell = boolean | string
interface CompareRow { feat: string; tip?: string; cells: [Cell, Cell, Cell, Cell] }
interface CompareSection { section: string; rows: CompareRow[] }

const comparison: CompareSection[] = [
  {
    section: "Team & usage limits",
    rows: [
      { feat: "Agents (seats)", tip: "Logged-in user accounts who can reply to conversations. Counted per active seat.", cells: ["2", "2", "12", "50"] },
      { feat: "Inboxes", tip: "A managed channel instance. One WhatsApp number = 1 inbox, one email account = 1 inbox, one website widget = 1 inbox.", cells: ["1", "2", "Unlimited", "Unlimited"] },
      { feat: "Teams (groupings)", tip: "Internal groupings of agents for routing, reporting, and shared inbox access.", cells: [false, "1", "5", "Unlimited"] },
      { feat: "Monthly conversations", tip: "A conversation is one ongoing thread with a customer across any channel. Multiple messages with the same person within 24 hours count as one conversation.", cells: ["500", "Unlimited", "Unlimited", "Unlimited"] },
      { feat: "Contact storage", tip: "Unique customers stored in your contacts database with profile data and conversation history.", cells: ["1,000", "10,000", "100,000", "Unlimited"] },
      { feat: "Conversation history", tip: "How long past conversations remain searchable in your inbox before archive.", cells: ["30 days", "1 year", "3 years", "Unlimited"] },
      { feat: "Remove FloatChat branding", tip: 'The "Powered by FloatChat" mark shown on your widget and emails. Paid plans remove it.', cells: [false, true, true, true] },
    ],
  },
  {
    section: "Channels",
    rows: [
      { feat: "Website Live Chat widget", tip: "A customizable chat widget you embed on your site for live customer conversations.", cells: [true, true, true, true] },
      { feat: "Email channel", tip: "Convert any email account into a managed inbox (support@, sales@, etc.).", cells: [true, true, true, true] },
      { feat: "API channel (custom)", tip: "Custom channel powered by your backend — for in-app messaging or proprietary integrations.", cells: [true, true, true, true] },
      { feat: "Facebook Messenger", tip: "Connect your Facebook Page and reply to Messenger messages from FloatChat.", cells: [false, true, true, true] },
      { feat: "Instagram DM", tip: "Receive Instagram direct messages and story replies in your FloatChat inbox.", cells: [false, true, true, true] },
      { feat: "Telegram", tip: "Connect a Telegram bot to manage customer conversations from Telegram.", cells: [false, true, true, true] },
      { feat: "WhatsApp Business (native)", tip: "Native WhatsApp Business API. Use your own WABA cloud number with FloatChat.", cells: [false, false, true, true] },
      { feat: "TikTok", tip: "Reply to TikTok comments and direct messages from your FloatChat inbox.", cells: [false, false, true, true] },
      { feat: "Line", tip: "Connect a Line Official Account to handle Line-based customer conversations.", cells: [false, false, true, true] },
      { feat: "Voice & SMS (via Twilio add-on)", tip: "Voice calls and SMS campaigns inside FloatChat. Requires Twilio add-on with your own Twilio account.", cells: [false, false, false, "Add-on"] },
    ],
  },
  {
    section: "Captain AI",
    rows: [
      { feat: "Captain credits / agent / month", tip: "Each credit ≈ one Captain Assistant reply (~6,800 chars analyzed + 200 char reply). Co-pilot suggestions cost 0.5 credits, AI editor 0.3 credits, label suggestion 0.2 credits, FAQ generation 5 credits per source, audio transcription 10 credits per minute.", cells: [false, "100", "500", "3,000 (fair-use)"] },
      { feat: "Captain Assistants", tip: "AI chatbots that read your documents, follow your guardrails, and reply to customers autonomously.", cells: [false, "1", "3", "Unlimited"] },
      { feat: "Co-pilot (agent suggestions)", tip: "AI suggests a reply to your human agent who reviews and sends. Half the credit cost of a full Assistant reply.", cells: [false, true, true, true] },
      { feat: "Captain Documents (knowledge base)", tip: "Upload PDFs or paste URLs — Captain ingests them as a searchable knowledge base your Assistants can answer from.", cells: [false, "10 docs", "50 docs", "Unlimited"] },
      { feat: "Captain FAQs (auto-generated)", tip: "Captain auto-generates Q&A pairs from the PDFs and URLs in your knowledge base.", cells: [false, "Basic", true, true] },
      { feat: "Captain Scenarios", tip: "Pre-defined conversation flows your Assistants follow for specific tasks (returns, bookings, refunds).", cells: [false, false, true, true] },
      { feat: "Custom Tools (function calling)", tip: "Connect Assistants to APIs (Shopify, Stripe, your own backend) so they can take actions, not just answer.", cells: [false, false, false, true] },
      { feat: "Guardrails & response guidelines", tip: "Define topics your AI must avoid, must mention, or must escalate to a human agent.", cells: [false, true, true, true] },
      { feat: "AI editor (compose, tone, grammar)", tip: "AI-powered text editing inside the agent reply box: change tone, fix grammar, smart compose from a prompt.", cells: [false, true, true, true] },
      { feat: "Audio transcription", tip: "Auto-transcribe voice messages and call recordings into searchable text.", cells: [false, false, false, true] },
      { feat: "Help Center AI search", tip: "Customers search your Help Center; AI synthesizes answers from multiple articles into one direct response.", cells: [false, false, false, true] },
      { feat: "AI label suggestion", tip: "AI auto-categorizes incoming conversations with the right labels — no manual tagging.", cells: [false, true, true, true] },
    ],
  },
  {
    section: "Conversation management",
    rows: [
      { feat: "Canned responses", tip: "Saved reply templates agents can insert with a keyboard shortcut.", cells: ["5", "Unlimited", "Unlimited", "Unlimited"] },
      { feat: "Macros", tip: "Multi-step actions agents can trigger in one click (reply + assign + label + resolve).", cells: ["3", "Unlimited", "Unlimited", "Unlimited"] },
      { feat: "Labels & custom attributes", tip: "Tags and custom fields for organizing and routing conversations.", cells: ["Basic", "10", "Unlimited", "Unlimited"] },
      { feat: "Agent Bots (rule-based)", tip: "Rule-based conversation flows you build manually with branching logic — no AI required.", cells: [false, true, true, true] },
      { feat: "Automations & workflows", tip: "If-this-then-that rules. Auto-route, auto-respond, auto-assign, auto-resolve based on triggers.", cells: [false, false, true, true] },
      { feat: "Skill-based assignment", tip: "Route conversations to the agent with the right skills or language expertise.", cells: [false, false, true, true] },
      { feat: "SLA management", tip: "Service level agreements per conversation type with auto-alerts when at risk of breach.", cells: [false, false, false, true] },
      { feat: "Required conversation attributes", tip: "Force agents to fill specific required fields before they can resolve a conversation.", cells: [false, false, false, true] },
      { feat: "Pre-chat forms & business hours", tip: "Collect visitor details (name, email, reason) before the live chat conversation starts.", cells: [true, true, true, true] },
    ],
  },
  {
    section: "Help Center & campaigns",
    rows: [
      { feat: "Help Center portals", tip: "Self-serve help center sites with articles, categories, search, and CSAT on answers.", cells: [false, "1", "Unlimited", "Unlimited"] },
      { feat: "Multi-locale articles", tip: "Publish the same Help Center articles in multiple languages from one source.", cells: [false, true, true, true] },
      { feat: "Custom domain for Help Center", tip: "Host your Help Center on help.yourcompany.com instead of a FloatChat URL.", cells: [false, false, true, true] },
      { feat: "Live chat campaigns", tip: "Proactive outreach via the chat widget — trigger messages based on visitor behavior or pages visited.", cells: [false, false, true, true] },
      { feat: "WhatsApp campaigns", tip: "Broadcast templated WhatsApp messages to opt-in contacts. WABA template approval required.", cells: [false, false, true, true] },
      { feat: "SMS campaigns (via Twilio add-on)", tip: "Broadcast SMS messages. Requires Twilio add-on; SMS usage billed by Twilio.", cells: [false, false, false, "Add-on"] },
    ],
  },
  {
    section: "Integrations & API",
    rows: [
      { feat: "Slack, Webhooks", tip: "Slack notifications & reply-from-Slack. Webhooks send conversation events to any URL for custom workflows.", cells: ["Limited", true, true, true] },
      { feat: "Dialogflow, Google Translate", tip: "Google Dialogflow for custom NLU/chatbot flows. Google Translate for real-time translation.", cells: [false, true, true, true] },
      { feat: "Linear, Notion, Shopify, Dyte", tip: "Native integrations: Linear (issue tracking), Notion (docs), Shopify (orders), Dyte (video calls).", cells: [false, false, true, true] },
      { feat: "Dashboard Apps & custom integrations", tip: "Embed your own UI panels inside the FloatChat agent dashboard for in-context tools.", cells: [false, false, false, true] },
      { feat: "REST API access", tip: "Full programmatic access to all FloatChat data and actions.", cells: ["Read-only", "Full", "Full", "Full"] },
      { feat: "Twilio integration", tip: "Twilio integration for voice + SMS — flat fee. Bring your own Twilio account; usage billed by Twilio.", cells: [false, false, false, "$9.99 / mo"] },
    ],
  },
  {
    section: "Security, compliance & support",
    rows: [
      { feat: "India data residency", tip: "Your data is stored in Indian data centers — meets DPDP and Indian residency requirements.", cells: [true, true, true, true] },
      { feat: "EU & US data residency", tip: "Choose where your data physically lives — EU (GDPR aligned) or US (Virginia region).", cells: [false, false, false, true] },
      { feat: "SAML SSO", tip: "Single Sign-On via SAML 2.0 with your identity provider (Okta, Azure AD, JumpCloud, etc.).", cells: [false, false, false, true] },
      { feat: "Audit logs", tip: "Track every admin action with who/what/when records. Exportable for compliance audits.", cells: [false, false, false, true] },
      { feat: "RBAC (custom roles)", tip: "Define custom roles with granular permissions per feature and per inbox.", cells: [false, false, false, true] },
      { feat: "SOC 2 / HIPAA / ISO 27001 / GDPR", tip: "SOC 2 Type II, HIPAA, ISO 27001, and GDPR certifications — required for regulated industries.", cells: [false, false, false, true] },
      { feat: "Uptime SLA", tip: "Guaranteed monthly uptime with service credits issued if missed.", cells: ["Best-effort", "Best-effort", "99.5%", "99.9%"] },
      { feat: "Support", tip: "Support channels and target response times included in the plan.", cells: ["Community", "Email", "Priority email + Slack", "24/7 + Dedicated CSM"] },
    ],
  },
]

/* ------------------------------ Helpers ------------------------------- */

function FeatureName({ name, tip }: { name: string; tip?: string }) {
  if (!tip) return <span>{name}</span>
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1 cursor-help">
          {name}
          <Info className="h-3 w-3 text-muted-foreground/60 shrink-0" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs leading-relaxed">{tip}</TooltipContent>
    </Tooltip>
  )
}

/** Renders a feature line — plain text plus inline (i) tooltips on key terms. */
function FeatureBits({ parts }: { parts: FeaturePart[] }) {
  return (
    <span>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <span className="inline-flex items-baseline gap-0.5 font-medium cursor-help">
                {p.term}
                <Info className="h-3 w-3 self-center shrink-0 text-primary/70" />
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs leading-relaxed">{p.tip}</TooltipContent>
          </Tooltip>
        ),
      )}
    </span>
  )
}

function CompareCell({ value }: { value: Cell }) {
  if (value === true) return <Check className="h-4 w-4 text-primary mx-auto" />
  if (value === false) return <span className="text-muted-foreground/40">—</span>
  if (value === "Add-on" || value.startsWith("$")) {
    return (
      <span className="inline-block rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5">
        {value}
      </span>
    )
  }
  return <span className="text-sm text-foreground">{value}</span>
}

/* ------------------------------- Page --------------------------------- */

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly")

  // Calculator state
  const [agents, setAgents] = useState(5)
  const [convs, setConvs] = useState(1000)
  const [credits, setCredits] = useState(200)
  const [channels, setChannels] = useState("social")

  useEffect(() => {
    document.title = "FloatChat Pricing — Plans that scale with your team"
  }, [])

  const recKey = useMemo(
    () => recommend(agents, convs, credits, channels),
    [agents, convs, credits, channels],
  )
  const rec = CALC_PLANS[recKey]

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="relative py-16 lg:py-20 overflow-hidden text-center">
          <div className="absolute inset-0 -z-10 bg-grid-pattern bg-radial-fade opacity-50" aria-hidden="true" />
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Pricing, simplified
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              Plans that <span className="text-primary">scale</span> with your team.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Simple flat plans — no per-seat fees. Get every channel, the full inbox, Help Center,
              automations, and Captain AI in one platform.
            </motion.p>
          </div>
        </section>

        {/* Free plan band */}
        <section className="pb-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-[1.05fr_0.95fr]">
              {/* Left — free plan */}
              <div className="bg-card p-8 lg:p-10">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Start here · Free forever
                </Badge>
                <h2 className="mt-4 text-2xl font-bold text-foreground sm:text-3xl">
                  Start free in <span className="text-primary">5 minutes.</span>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get the full inbox, website widget, email channel, and Help Center running on day one.
                  India data residency included.
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">$0</span>
                  <span className="text-sm text-muted-foreground">
                    forever · 2 agents · 1 inbox · 500 conversations/mo
                  </span>
                </div>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="mt-7 gap-1">
                  <Link to="/signup?plan=free">
                    Get started free <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Right — outgrowing free */}
              <div className="bg-secondary/40 p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Outgrowing free?
                </p>
                <h3 className="mt-2 text-xl font-bold text-foreground">
                  Unlock the full FloatChat with a <span className="text-primary">paid plan</span>
                </h3>
                <ul className="mt-5 space-y-3">
                  {freeUnlocks.map((parts, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Plus className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <FeatureBits parts={parts} />
                    </li>
                  ))}
                </ul>
                <a
                  href="#paid-plans"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  See paid plans <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Paid plans */}
        <section id="paid-plans" className="scroll-mt-24 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Three plans, <span className="text-primary">finalized</span>.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pick the plan that matches your team size and AI needs. Switch anytime, no contracts.
              </p>

              {/* Billing toggle */}
              <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("yearly")}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billing === "yearly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Yearly
                  <span className={`text-[10px] font-semibold rounded px-1 py-0.5 ${billing === "yearly" ? "bg-primary-foreground/20" : "bg-emerald-500/10 text-emerald-600"}`}>
                    SAVE 17%
                  </span>
                </button>
              </div>
            </div>

            {/* Plan cards */}
            <div className="mt-10 grid gap-6 lg:grid-cols-3 items-start">
              {paidPlans.map((plan, i) => (
                <motion.article
                  key={plan.id}
                  id={`plan-${plan.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`scroll-mt-24 flex flex-col rounded-2xl border p-6 lg:p-7 ${
                    plan.featured
                      ? "border-primary/50 bg-card ring-2 ring-primary/30 lg:-mt-3 lg:pb-9"
                      : "border-border bg-card"
                  }`}
                >
                  {plan.featured && (
                    <Badge className="mb-3 self-start gap-1 bg-gradient-to-r from-primary to-violet-500 text-primary-foreground border-0">
                      <Star className="h-3 w-3 fill-current" /> Most popular
                    </Badge>
                  )}
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground min-h-[60px]">{plan.desc}</p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">$</span>
                    <span className="text-5xl font-bold text-foreground tracking-tight">
                      {billing === "yearly" ? plan.yearly : plan.monthly}
                    </span>
                    <span className="text-sm text-muted-foreground">/ mo</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{plan.cap}</p>
                  <p className="text-xs text-muted-foreground/80">
                    {billing === "yearly" ? "Billed yearly — save 17%" : "Billed monthly"}
                  </p>

                  <Button
                    asChild
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-5 w-full gap-1"
                  >
                    <Link to={plan.href}>
                      {plan.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>

                  <p className="mt-6 text-sm font-medium text-foreground">{plan.includesLabel}</p>
                  <ul className="mt-3 space-y-2.5">
                    {plan.features.map((parts, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <FeatureBits parts={parts} />
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Need detail on any feature? Hover the <Info className="inline h-3.5 w-3.5 -mt-0.5" /> icons
              in the comparison table below.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="scroll-mt-24 py-16 lg:py-20 bg-secondary/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Plan finder</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Set your usage. <span className="text-primary">See your plan.</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                Move the controls to match your team's needs. We'll recommend the right plan and total
                cost in real time.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
              {/* Controls */}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 space-y-7">
                <SliderRow
                  label="Agents on your team"
                  value={agents}
                  display={String(agents)}
                  min={1}
                  max={50}
                  step={1}
                  scale={["1", "50"]}
                  onChange={setAgents}
                />
                <SliderRow
                  label="Monthly conversations"
                  value={convs}
                  display={convs >= 10000 ? "10,000+" : convs.toLocaleString("en-US")}
                  min={100}
                  max={10000}
                  step={100}
                  scale={["100", "10,000+"]}
                  onChange={setConvs}
                />
                <SliderRow
                  label="Captain AI credits / agent / month"
                  value={credits}
                  display={credits.toLocaleString("en-US")}
                  min={0}
                  max={3000}
                  step={50}
                  scale={["0", "3,000"]}
                  onChange={setCredits}
                />
                <div>
                  <p className="text-sm font-medium text-foreground mb-2.5">Channels needed</p>
                  <div className="grid gap-2">
                    {[
                      { value: "basic", label: "Web, Email, API only" },
                      { value: "social", label: "+ Facebook, Instagram, Telegram" },
                      { value: "all", label: "+ WhatsApp, TikTok, Line" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setChannels(opt.value)}
                        className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm text-left transition-all ${
                          channels === opt.value
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            channels === opt.value ? "border-primary" : "border-muted-foreground/40"
                          }`}
                        >
                          {channels === opt.value && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6 lg:p-8 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Recommended for you
                </p>
                <h3 className="mt-1 text-3xl font-bold text-foreground">{rec.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground">$</span>
                  <span className="text-4xl font-bold text-foreground tracking-tight">{rec.price}</span>
                  <span className="text-sm text-muted-foreground">{rec.period}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {rec.cap}
                </div>
                <ul className="mt-5 space-y-2">
                  {rec.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full gap-1">
                  <Link to={rec.href}>
                    {rec.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Twilio add-on */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Need <span className="text-primary">voice</span> & SMS?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Connect your own Twilio account to FloatChat and bring calls and SMS into the same inbox.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-[1.4fr_1fr]">
              <div className="bg-card p-8 lg:p-10">
                <Badge variant="secondary">Add-on · Business plan only</Badge>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  FloatChat <span className="text-primary">Twilio integration</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bring your own Twilio account. We provide the integration — your call and SMS usage is
                  billed directly by Twilio to your Twilio account, never marked up by us.
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {twilioIncludes.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary/40 p-8 lg:p-10 flex flex-col justify-center text-center">
                <div className="text-5xl font-bold text-foreground">$9.99</div>
                <div className="mt-1 text-sm text-muted-foreground">per account / month</div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Flat integration fee. Bring your own Twilio account — all usage billed by Twilio.
                </p>
                <Button asChild className="mt-5 gap-1">
                  <Link to="/contact">
                    Add to Business plan <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section id="compare" className="scroll-mt-24 py-16 lg:py-20 bg-secondary/40 border-y border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Compare <span className="text-primary">every feature</span> across plans.
              </h2>
              <p className="mt-3 text-muted-foreground">
                The complete breakdown so you can match the right plan to your team. Hover any{" "}
                <Info className="inline h-3.5 w-3.5 -mt-0.5" /> icon for details.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="w-[34%] px-4 py-4 text-left text-sm font-semibold text-foreground">
                      Feature
                    </th>
                    {[
                      { n: "Free", p: "$0 / mo" },
                      { n: "Starter", p: "$9.99 / mo" },
                      { n: "Growth", p: "$19.99 / mo" },
                      { n: "Business", p: "$49.99 / mo" },
                    ].map((c) => (
                      <th
                        key={c.n}
                        className={`px-3 py-4 text-center ${c.n === "Growth" ? "bg-primary/5" : ""}`}
                      >
                        <span className="block text-sm font-bold text-foreground">{c.n}</span>
                        <span className="block text-xs font-normal text-muted-foreground">{c.p}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((section) => (
                    <CompareGroup key={section.section} section={section} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 text-center">
          <div className="mx-auto max-w-2xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground">Ready to get started?</h2>
            <p className="mt-2 text-muted-foreground">
              Start free in 5 minutes — no credit card. Upgrade when your team grows.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="gap-1">
                <Link to="/signup?plan=free">
                  Get started free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Talk to sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

/* --------------------------- Sub-components --------------------------- */

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  step,
  scale,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  scale: [string, string]
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[#006AFF] cursor-pointer"
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{scale[0]}</span>
        <span>{scale[1]}</span>
      </div>
    </div>
  )
}

function CompareGroup({ section }: { section: CompareSection }) {
  return (
    <>
      <tr>
        <td
          colSpan={5}
          className="bg-secondary/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {section.section}
        </td>
      </tr>
      {section.rows.map((row) => (
        <tr key={row.feat} className="border-b border-border last:border-0">
          <td className="px-4 py-3 text-foreground">
            <FeatureName name={row.feat} tip={row.tip} />
          </td>
          {row.cells.map((cell, i) => (
            <td
              key={i}
              className={`px-3 py-3 text-center ${i === 2 ? "bg-primary/5" : ""}`}
            >
              <CompareCell value={cell} />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
