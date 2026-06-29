import type { LucideIcon } from "lucide-react"
import {
  Headset,
  ShoppingBag,
  CalendarClock,
  Filter,
  Wand2,
  MessageSquare,
  Bot,
  GitBranch,
  BookOpen,
  Sparkles,
  CreditCard,
  RefreshCcw,
  CalendarCheck,
  BellRing,
  Clock,
  Target,
  Gauge,
  Database,
  Workflow,
  Plug,
  ShieldCheck,
  Rocket,
  Code2,
  Globe,
  Users,
} from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   Content model for the /ai-agents/* landing pages.

   All copy lives here so each page file stays a thin wrapper and
   the /ai-agents hub can render cards from the same source.
─────────────────────────────────────────────────────────────── */

export type AgentFeature = {
  icon: LucideIcon
  title: string
  body: string
}

export type AgentFaq = {
  question: string
  answer: string
}

export type RelatedLink = {
  label: string
  href: string
  desc: string
}

export type AgentContent = {
  slug: string
  path: string
  /** Short label for nav / hub cards. */
  navLabel: string
  /** One-line summary for hub cards and cross-links. */
  cardSummary: string
  hubIcon: LucideIcon
  /** Hero accent gradient (Tailwind from/to classes). */
  accent: string

  metaTitle: string
  metaDescription: string
  primaryKeyword: string

  badge: string
  h1: string
  /** The trailing clause of the H1 that gets the highlight color. */
  h1Highlight: string
  subhead: string
  trustLine: string

  ctaPrimaryLabel: string
  ctaPrimaryHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string

  results: string[]

  /** A small, generic "agent in action" preview shown in the hero. */
  preview: {
    channel: string
    userMsg: string
    agentMsg: string
    actionChip: string
  }

  problemHeading: string
  problemBody: string

  sectionLabel: string
  sectionHeading: string
  /** When true, feature cards are rendered as numbered steps. */
  numberedSteps?: boolean
  features: AgentFeature[]

  whyItWorks: string
  whyFloatchat: string

  inlineHeadline: string
  inlineBody: string

  faqs: AgentFaq[]
  related: RelatedLink[]

  finalEyebrow: string
  finalHeading: string
  finalHighlight: string
  finalBody: string
}

const START_FREE = { label: "Start Free", href: "/signup?plan=free" }
const GET_DEMO = { label: "Get a Demo", href: "/demo" }

export const AGENTS: AgentContent[] = [
  /* ───────────────────────── Customer Service ───────────────────────── */
  {
    slug: "customer-service",
    path: "/ai-agents/customer-service",
    navLabel: "Customer Service Agent",
    cardSummary:
      "Deflect and resolve repetitive tickets across every channel, then hand off the rest with full context.",
    hubIcon: Headset,
    accent: "from-[#60A5FA] to-[#1D4ED8]",

    metaTitle:
      "Agentic AI Customer Service Agent for Omnichannel Support | FloatChat",
    metaDescription:
      "Deflect and resolve repetitive tickets with an agentic AI customer service agent that answers across channels, stays grounded in your data, and hands off with context.",
    primaryKeyword: "AI customer service agent",

    badge: "AI Customer Service Agent",
    h1: "An agentic AI customer service agent that actually",
    h1Highlight: "resolves.",
    subhead:
      "Deflect repetitive tickets across every channel with an agent that answers from your own data and escalates the rest with full context. Customers get instant, accurate answers at any hour, and your team stops repeating itself.",
    trustLine: "Built for support teams that want resolution, not just deflection.",

    ctaPrimaryLabel: START_FREE.label,
    ctaPrimaryHref: START_FREE.href,
    ctaSecondaryLabel: GET_DEMO.label,
    ctaSecondaryHref: GET_DEMO.href,

    results: [
      "24/7 across 7 channels",
      "Resolves without pre-built journeys",
      "100+ languages",
      "Full-context human handoff",
    ],

    preview: {
      channel: "WhatsApp · live",
      userMsg: "Where's my order #FC-2841? It said delivered but nothing arrived.",
      agentMsg:
        "I see #FC-2841 was marked delivered to your porch at 2:14 PM. I've opened a carrier trace and emailed you a prepaid reship label — want me to send a replacement now?",
      actionChip: "Order lookup · carrier trace opened",
    },

    problemHeading: "Support volume scales faster than headcount.",
    problemBody:
      "Most chatbots only handle the easy questions and dump everything else on your team with no context, so agents waste their day re-reading threads and copy-pasting the same answers. An agentic AI customer service agent resolves more on its own — completing real tasks, not just matching canned replies — and makes the handoffs that remain effortless. The result is shorter queues, faster first-response times, and a team that spends its energy where judgment actually matters.",

    sectionLabel: "What it does",
    sectionHeading: "Built to resolve, not just deflect.",
    features: [
      {
        icon: MessageSquare,
        title: "Answers across every channel",
        body: "Handles WhatsApp, SMS, email, voice, web chat, and social from one inbox, grounded in your knowledge base so every answer is consistent no matter where the conversation starts.",
      },
      {
        icon: Bot,
        title: "Resolves, not just routes",
        body: "Completes multi-step tasks like order lookups, status changes, and refunds through your connected tools — so customers leave with an answer, not a ticket number.",
      },
      {
        icon: GitBranch,
        title: "Escalates with full context",
        body: "When a human is needed, the agent hands off in the same thread with the complete history, customer details, and a suggested next step attached — no context lost, no repeating.",
      },
      {
        icon: BookOpen,
        title: "Learns your business",
        body: "Trained on your help center, PDFs, policies, and website, so answers match your tone and your rules — and improve every time you update your docs.",
      },
    ],

    whyItWorks:
      "Customers get instant, accurate answers at any hour, so nobody waits in a queue for a simple question. Your team stops repeating itself and focuses on the conversations that genuinely need a person. CSAT rises because resolution is fast and consistent, and your cost per ticket falls as the agent quietly absorbs routine volume.",
    whyFloatchat:
      "Unlike a single-channel bot, this agent works everywhere your customers are, shares one inbox with your human team, and runs on the same platform as your campaigns, numbers, and CRM. One customer record follows every conversation, so support, sales, and follow-up all draw from the same history.",

    inlineHeadline: "Resolve more tickets without adding headcount.",
    inlineBody:
      "Connect your channels and knowledge base and go live in days — no code, no per-resolution fees.",

    faqs: [
      {
        question: "Does it replace my support team?",
        answer:
          "No. It handles routine, repetitive volume so your team can focus on the conversations that need human judgment. You stay in control, and every escalation arrives with full context so your agents pick up instantly.",
      },
      {
        question: "Can the agent actually take actions?",
        answer:
          "Yes. Beyond answering questions, it completes multi-step tasks across your connected tools — order lookups, status changes, refunds, and updates — using your API and webhooks.",
      },
      {
        question: "Which channels does it cover?",
        answer:
          "WhatsApp, SMS, email, voice, web chat, and social, all from one shared inbox. The same agent answers consistently regardless of where the customer reaches you.",
      },
      {
        question: "How does the human handoff work?",
        answer:
          "When the agent reaches its limits or the customer asks for a person, it hands the conversation to the right agent in the same thread, with the full transcript and customer record attached.",
      },
      {
        question: "How fast can we launch?",
        answer:
          "Most teams connect their channels and data and go live in days. It is fully no-code to set up, with an API available when you want to go deeper.",
      },
    ],
    related: [
      { label: "Omnichannel Inbox", href: "/inbox", desc: "One screen for every channel" },
      { label: "WhatsApp", href: "/whatsapp", desc: "Two-way, free on every plan" },
      { label: "Compare FloatChat", href: "/compare", desc: "vs Intercom, Zendesk & more" },
    ],

    finalEyebrow: "Resolution, not deflection",
    finalHeading: "Give every customer an instant,",
    finalHighlight: "accurate answer.",
    finalBody:
      "Deploy an agentic AI customer service agent across every channel, grounded in your data, with full-context handoff built in.",
  },

  /* ───────────────────────────── Sales ──────────────────────────────── */
  {
    slug: "sales",
    path: "/ai-agents/sales",
    navLabel: "Sales Agent",
    cardSummary:
      "Recommend products, answer buyer questions, and guide shoppers to checkout inside the conversation.",
    hubIcon: ShoppingBag,
    accent: "from-[#34D399] to-[#059669]",

    metaTitle: "Agentic AI Sales Agent for Conversational Commerce | FloatChat",
    metaDescription:
      "Recommend products, answer buyer questions, and guide customers to checkout with an agentic AI sales agent across WhatsApp, web, and more.",
    primaryKeyword: "AI sales agent",

    badge: "AI Sales Agent",
    h1: "An agentic AI sales agent that turns chats into",
    h1Highlight: "orders.",
    subhead:
      "Recommend the right products, answer buyer questions, and guide customers to checkout inside the conversation — on every channel. Every product question gets an instant, on-brand answer, so there's no gap between interest and action.",
    trustLine: "Built for D2C and retail teams that sell in the chat.",

    ctaPrimaryLabel: START_FREE.label,
    ctaPrimaryHref: START_FREE.href,
    ctaSecondaryLabel: GET_DEMO.label,
    ctaSecondaryHref: GET_DEMO.href,

    results: [
      "Recommends from your catalog",
      "Recovers carts automatically",
      "Sells on WhatsApp, web & more",
      "Hands warm buyers to your team",
    ],

    preview: {
      channel: "Web chat · live",
      userMsg: "Looking for a waterproof jacket for hiking, under $150. Do you have one?",
      agentMsg:
        "The Summit Shell ($129) is fully waterproof and breathable — top pick for hiking. It's in stock in your size. Want me to add it to your cart and apply free shipping?",
      actionChip: "Catalog match · cart ready",
    },

    problemHeading: "A slow or generic answer loses the sale.",
    problemBody:
      "Shoppers ask questions before they buy — about sizing, availability, shipping, and returns — and if the answer is slow or off-base, they leave. An agentic AI sales agent answers instantly, recommends the right product from your catalog, and moves the buyer toward checkout without a human waiting on standby. It works around the clock, so a midnight question becomes a morning order instead of a lost cart.",

    sectionLabel: "What it does",
    sectionHeading: "From first question to closed order.",
    features: [
      {
        icon: Sparkles,
        title: "Personalized recommendations",
        body: "Pulls from your live product catalog to suggest the right item for each shopper based on what they ask for, their budget, and what's in stock.",
      },
      {
        icon: MessageSquare,
        title: "Answers that close",
        body: "Handles sizing, availability, shipping, and returns questions in real time and on-brand, removing the friction that stalls a purchase.",
      },
      {
        icon: CreditCard,
        title: "Guided checkout",
        body: "Moves buyers to purchase inside the conversation, with payment and catalog messages on the channels that support them — fewer clicks, fewer drop-offs.",
      },
      {
        icon: RefreshCcw,
        title: "Automatic cart recovery",
        body: "Follows up over SMS or WhatsApp to bring back abandoned carts, with a personalized nudge that references exactly what the shopper left behind.",
      },
    ],

    whyItWorks:
      "Every product question gets an instant, on-brand answer, day or night. Conversion rises because there is no gap between interest and action, and your team only steps in to close the high-value deals. Average order value climbs as the agent cross-sells naturally, and recovered carts turn lost revenue back into sales.",
    whyFloatchat:
      "The sales agent shares one platform with your support agent, your inbox, and your campaigns, so a single customer record follows the buyer from first message to repeat purchase. The same conversation that closes a sale today fuels the follow-up and re-engagement that drives the next one.",

    inlineHeadline: "Turn more conversations into orders.",
    inlineBody:
      "Connect your store and channels, and let the agent recommend, answer, and check out — automatically.",

    faqs: [
      {
        question: "Which channels can the agent sell on?",
        answer:
          "WhatsApp, web chat, and more, all from one inbox. It meets shoppers on the channel they already use and keeps the whole conversation — and the sale — in one place.",
      },
      {
        question: "Does it integrate with my store?",
        answer:
          "Yes. Through 200+ integrations and an open API, it connects to your catalog, inventory, and checkout so recommendations are always live and accurate.",
      },
      {
        question: "Can it recover abandoned carts?",
        answer:
          "Yes. It follows up automatically over SMS and WhatsApp with a personalized message referencing the items left behind, bringing shoppers back to complete the purchase.",
      },
      {
        question: "Will it match our brand voice?",
        answer:
          "It's trained on your catalog, policies, and tone, so every recommendation and answer sounds like your brand — not a generic bot.",
      },
      {
        question: "When does a human step in?",
        answer:
          "The agent hands warm, high-intent buyers to your team with the full conversation attached, so your reps spend their time closing the deals that matter most.",
      },
    ],
    related: [
      { label: "E-commerce / D2C", href: "/solutions/ecommerce", desc: "Built for online stores" },
      { label: "WhatsApp", href: "/whatsapp", desc: "Sell where buyers already chat" },
      { label: "Integrations", href: "/integrations", desc: "Shopify, Stripe & 200+ more" },
    ],

    finalEyebrow: "Conversational commerce",
    finalHeading: "Sell inside the chat, on",
    finalHighlight: "every channel.",
    finalBody:
      "Deploy an agentic AI sales agent that recommends, answers, and guides buyers to checkout — and recovers the carts they leave behind.",
  },

  /* ──────────────────────────── Booking ─────────────────────────────── */
  {
    slug: "booking",
    path: "/ai-agents/booking",
    navLabel: "Booking Agent",
    cardSummary:
      "Schedule appointments and reservations in the chat — check availability, confirm, and send reminders.",
    hubIcon: CalendarClock,
    accent: "from-[#A78BFA] to-[#7C3AED]",

    metaTitle:
      "Agentic AI Booking Agent for Appointments and Reservations | FloatChat",
    metaDescription:
      "Schedule appointments and reservations inside the chat with an agentic AI booking agent that checks availability, confirms, and sends reminders.",
    primaryKeyword: "AI booking agent",

    badge: "AI Booking Agent",
    h1: "An agentic AI booking agent that fills your",
    h1Highlight: "calendar.",
    subhead:
      "Schedule appointments and reservations inside the chat — check availability, confirm on the spot, and send reminders, all automatically. Customers book the moment they're ready, not when your office happens to be open.",
    trustLine: "Built for travel, hospitality, healthcare, and services teams.",

    ctaPrimaryLabel: START_FREE.label,
    ctaPrimaryHref: START_FREE.href,
    ctaSecondaryLabel: GET_DEMO.label,
    ctaSecondaryHref: GET_DEMO.href,

    results: [
      "Books inside the conversation",
      "Real-time availability checks",
      "Automatic reminders",
      "Reschedules without a human",
    ],

    preview: {
      channel: "SMS · live",
      userMsg: "Can I get a table for 4 this Friday around 7?",
      agentMsg:
        "Friday 7:00 PM is open — I can hold a table for 4 under your name. Confirmed! I'll text a reminder Friday afternoon. Reply CHANGE anytime to adjust.",
      actionChip: "Availability checked · reservation confirmed",
    },

    problemHeading: "Every booking that needs a phone call is a booking you might lose.",
    problemBody:
      "A back-and-forth email or a missed call is all it takes for a ready-to-book customer to give up. An agentic AI booking agent captures the request the moment someone is ready, checks real availability, confirms on the spot, and reduces no-shows with timely reminders. You fill more slots without adding scheduling work for your staff, and customers get the instant confirmation they expect.",

    sectionLabel: "What it does",
    sectionHeading: "Capture the booking the moment they're ready.",
    features: [
      {
        icon: CalendarCheck,
        title: "Books in the chat",
        body: "Schedules appointments, reservations, and demos in the same conversation — no redirect to a separate form or phone line.",
      },
      {
        icon: Clock,
        title: "Checks availability in real time",
        body: "Confirms open slots against your calendar or booking system instantly, so customers only ever see times you can actually honor.",
      },
      {
        icon: BellRing,
        title: "Sends reminders",
        body: "Follows up over SMS, WhatsApp, or email to cut no-shows — with confirmations and reminders timed to keep your calendar full.",
      },
      {
        icon: RefreshCcw,
        title: "Reschedules and cancels",
        body: "Handles changes automatically and routes the complex cases to your team, so a reschedule never becomes a lost customer.",
      },
    ],

    whyItWorks:
      "Customers book when they are ready, not when your office is open, so you capture demand around the clock. You fill more slots, reduce no-shows with automatic reminders, and free your staff from manual scheduling and phone tag. Every confirmed booking flows straight into the same record your team already works from.",
    whyFloatchat:
      "The booking agent runs on the same platform as your support and sales agents, so reminders, confirmations, and follow-ups all flow from one customer record. A booking today becomes a known customer tomorrow — with their history ready for the next conversation.",

    inlineHeadline: "Fill your calendar without the phone tag.",
    inlineBody:
      "Let the agent check availability, confirm, and remind — automatically, on every channel.",

    faqs: [
      {
        question: "Does it connect to my calendar?",
        answer:
          "Yes. Through integrations and the open API, it checks real-time availability against your calendar or booking system, so every confirmed slot is genuinely open.",
      },
      {
        question: "Can it send reminders?",
        answer:
          "Yes, over SMS, WhatsApp, or email. Timely confirmations and reminders are the single biggest lever for cutting no-shows, and the agent handles them automatically.",
      },
      {
        question: "What about complex or unusual requests?",
        answer:
          "Anything the agent can't handle on its own is routed to your team with full context, so the customer never hits a dead end.",
      },
      {
        question: "Can customers reschedule or cancel?",
        answer:
          "Yes. The agent handles reschedules and cancellations directly in the conversation and updates your calendar, freeing the slot for someone else.",
      },
      {
        question: "Which industries is it built for?",
        answer:
          "Travel, hospitality, healthcare, and services teams — anywhere a booking, reservation, or appointment drives the business.",
      },
    ],
    related: [
      { label: "Restaurants", href: "/solutions/restaurants", desc: "Reservations & orders in chat" },
      { label: "Healthcare", href: "/solutions/healthcare", desc: "HIPAA-aware patient comms" },
      { label: "Automation", href: "/automation", desc: "Reminders & flows on autopilot" },
    ],

    finalEyebrow: "Booking on autopilot",
    finalHeading: "Turn conversations into",
    finalHighlight: "confirmed bookings.",
    finalBody:
      "Deploy an agentic AI booking agent that checks availability, confirms instantly, and cuts no-shows with automatic reminders.",
  },

  /* ────────────────────── Lead Qualification ────────────────────────── */
  {
    slug: "lead-qualification",
    path: "/ai-agents/lead-qualification",
    navLabel: "Lead Qualification Agent",
    cardSummary:
      "Capture, qualify, score, and route leads automatically — and sync everything to your CRM in real time.",
    hubIcon: Filter,
    accent: "from-[#FB7185] to-[#E11D48]",

    metaTitle:
      "Agentic AI Lead Qualification Agent for Faster Pipeline | FloatChat",
    metaDescription:
      "Capture, qualify, and route leads automatically with an agentic AI agent that asks the right questions, scores intent, and syncs to your CRM.",
    primaryKeyword: "AI lead qualification agent",

    badge: "AI Lead Qualification Agent",
    h1: "An agentic AI lead qualification agent that feeds your",
    h1Highlight: "pipeline.",
    subhead:
      "Capture interest, ask the right questions, score intent, and route hot leads to your team — automatically. Every inbound gets an instant, intelligent response, so reps spend their time on leads that actually convert.",
    trustLine: "Built for sales teams that lose leads to slow follow-up.",

    ctaPrimaryLabel: START_FREE.label,
    ctaPrimaryHref: START_FREE.href,
    ctaSecondaryLabel: GET_DEMO.label,
    ctaSecondaryHref: GET_DEMO.href,

    results: [
      "Captures leads on every channel",
      "Qualifies with dynamic questions",
      "Scores and routes in real time",
      "Syncs to your CRM",
    ],

    preview: {
      channel: "Web chat · live",
      userMsg: "We're a 200-person team looking to switch helpdesks this quarter.",
      agentMsg:
        "Great timing. With 200 agents and a this-quarter timeline, you're a strong fit — I'm connecting you with Priya on our team and booking a slot. Logged to your CRM as a hot lead.",
      actionChip: "Scored: hot · routed to rep · synced to CRM",
    },

    problemHeading: "Leads go cold in minutes, not days.",
    problemBody:
      "A static form can't ask follow-up questions, and a human can't answer every inbound instantly — so the leads you paid to acquire slip away while they're still warm. An agentic AI lead qualification agent qualifies the moment interest appears, asks adaptive questions, scores intent, and hands your reps only the leads worth their time. Nothing falls through the cracks, and your fastest-moving prospects never wait.",

    sectionLabel: "What it does",
    sectionHeading: "Qualify the moment interest appears.",
    features: [
      {
        icon: Globe,
        title: "Captures everywhere",
        body: "Pulls leads from web chat, WhatsApp, Instagram, Messenger, and more into one place, so no inbound is ever missed regardless of channel.",
      },
      {
        icon: MessageSquare,
        title: "Qualifies dynamically",
        body: "Asks adaptive follow-up questions instead of a rigid form, so the conversation feels natural and you gather exactly the detail your reps need.",
      },
      {
        icon: Target,
        title: "Scores intent",
        body: "Ranks every lead by readiness and fit so your team works the best ones first, while lower-intent leads drop into automated nurture.",
      },
      {
        icon: Database,
        title: "Routes and syncs",
        body: "Sends hot leads to the right rep instantly and writes the full conversation to your CRM in real time — no manual data entry.",
      },
    ],

    whyItWorks:
      "Every inbound gets an instant, intelligent response, so you capture interest at its peak. Reps stop chasing dead ends and spend their time on leads that convert, while everything is scored, routed, and logged automatically. Your pipeline fills with qualified opportunities, and your cost per qualified lead drops.",
    whyFloatchat:
      "Qualification runs on the same platform as your sales agent, your inbox, and your campaigns, so a qualified lead flows straight into nurture and follow-up. The same customer record carries from first touch to closed deal — no handoffs lost between tools.",

    inlineHeadline: "Stop losing leads to slow follow-up.",
    inlineBody:
      "Capture, qualify, score, and route every inbound automatically — and sync it all to your CRM.",

    faqs: [
      {
        question: "Which channels can it capture from?",
        answer:
          "Web chat, WhatsApp, Instagram, Messenger, and more. Every lead lands in one place, qualified and scored, regardless of where it came from.",
      },
      {
        question: "Does it sync to my CRM?",
        answer:
          "Yes. Through 200+ integrations and the open API, it writes the full conversation, score, and contact details to your CRM in real time — no manual entry.",
      },
      {
        question: "How does it qualify leads?",
        answer:
          "It asks adaptive follow-up questions tailored to each conversation instead of a fixed form, then scores intent and fit so your team knows exactly who to call first.",
      },
      {
        question: "Can it follow up automatically?",
        answer:
          "Yes. Lower-intent leads drop into automated nurture across channels, so no opportunity goes cold while your reps focus on the hottest leads.",
      },
      {
        question: "How does routing work?",
        answer:
          "Hot leads are routed to the right rep instantly with the full context attached, so your team picks up the conversation already knowing who they're talking to.",
      },
    ],
    related: [
      { label: "AI Sales Agent", href: "/ai-agents/sales", desc: "Turn qualified chats into orders" },
      { label: "Integrations", href: "/integrations", desc: "HubSpot, Salesforce & 200+ more" },
      { label: "Automation", href: "/automation", desc: "Nurture & follow-up on autopilot" },
    ],

    finalEyebrow: "Faster pipeline",
    finalHeading: "Send your reps only the leads",
    finalHighlight: "worth calling.",
    finalBody:
      "Deploy an agentic AI lead qualification agent that captures, qualifies, scores, and routes every inbound — and syncs it to your CRM in real time.",
  },

  /* ─────────────────────────── Agent Builder ────────────────────────── */
  {
    slug: "agent-builder",
    path: "/ai-agents/agent-builder",
    navLabel: "No-Code Agent Builder",
    cardSummary:
      "Create, train, and launch agentic AI agents without code — ground them in your data and deploy anywhere.",
    hubIcon: Wand2,
    accent: "from-[#22D3EE] to-[#0891B2]",

    metaTitle: "No-Code Agentic AI Agent Builder | FloatChat",
    metaDescription:
      "Create, train, and launch agentic AI agents without code. Ground them in your data, add logic and handoff, and deploy across every channel.",
    primaryKeyword: "agentic AI agent builder",

    badge: "No-Code Agent Builder",
    h1: "Build your agentic AI agent without",
    h1Highlight: "code.",
    subhead:
      "A visual, no-code builder to create, train, and launch agentic AI agents across every channel. The people who know your customers build and refine the agent directly — from idea to live agent in days, no developers required.",
    trustLine: "From idea to live agent in days, no developers required.",

    ctaPrimaryLabel: "Build Your AI Agent",
    ctaPrimaryHref: "/signup?plan=free",
    ctaSecondaryLabel: GET_DEMO.label,
    ctaSecondaryHref: GET_DEMO.href,

    results: [
      "No-code, point and click",
      "Trained on your data",
      "Logic, branching, and handoff",
      "Deploys to every channel",
    ],

    preview: {
      channel: "Builder · flow editor",
      userMsg: "Trigger: new WhatsApp message → Check intent → Look up order → Handoff if refund",
      agentMsg:
        "Flow saved and live. Trained on 142 help-center articles and your catalog. Deployed to WhatsApp, web, and SMS in one click.",
      actionChip: "No-code flow · deployed to 3 channels",
    },

    problemHeading: "Most teams wait weeks on engineering to launch a real AI agent.",
    problemBody:
      "Building a capable agent usually means a backlog of requests and weeks of waiting on developers — by the time it ships, the need has changed. FloatChat puts the builder in the hands of the people who own the customer experience. They train it on your data, add the logic and guardrails, test it, and deploy it across every channel themselves, then refine it the moment they spot a gap.",

    sectionLabel: "How it works",
    sectionHeading: "From idea to live agent in three steps.",
    numberedSteps: true,
    features: [
      {
        icon: Database,
        title: "Train on your data",
        body: "Connect your help center, PDFs, product catalog, and website so the agent answers from your business — accurately and in your voice.",
      },
      {
        icon: Workflow,
        title: "Add logic and guardrails",
        body: "Set triggers, conditions, branching, delays, and human-handoff steps in a visual flow — no code, full control over what the agent can and can't do.",
      },
      {
        icon: Rocket,
        title: "Test and launch",
        body: "Preview the agent, then deploy it to WhatsApp, web, SMS, voice, and social in clicks. Update it any time and changes go live instantly.",
      },
    ],

    whyItWorks:
      "The people who know your customers build and refine the agent directly, so it improves fast and never waits on an engineering sprint. A gap spotted on Monday is fixed by Monday afternoon — not filed as a ticket for next quarter. And because it's grounded in your data with explicit guardrails, it stays accurate and on-brand as it scales.",
    whyFloatchat:
      "One builder produces agents for support, sales, booking, and lead qualification, all sharing the same inbox, data, and guardrails. A REST API and webhooks are there for custom steps and integrations, so the builder scales from a simple bot to a full agentic workflow without ever forcing you to start over.",

    inlineHeadline: "Build and launch your agent this week.",
    inlineBody:
      "Train on your data, add logic and handoff, and deploy across every channel — no code required.",

    faqs: [
      {
        question: "Do I need to code?",
        answer:
          "No. The builder is fully no-code, with a visual flow editor for triggers, conditions, branching, and handoff. A REST API and webhooks are there when you want to go deeper.",
      },
      {
        question: "Can the agent take actions?",
        answer:
          "Yes. Add API and webhook steps for multi-step agentic tasks — look up an order, update a record, check availability — so the agent does real work, not just chat.",
      },
      {
        question: "How fast can I launch?",
        answer:
          "Most teams go live in days. You train on your data, build the flow visually, preview it, and deploy across channels in clicks.",
      },
      {
        question: "What can I train it on?",
        answer:
          "Your help center, PDFs, product catalog, and website. The agent answers from your own content, so responses match your policies and tone — and improve as you update your docs.",
      },
      {
        question: "Which channels can I deploy to?",
        answer:
          "WhatsApp, web chat, SMS, voice, and social — all from the same builder, all sharing one inbox and customer record.",
      },
    ],
    related: [
      { label: "Automation", href: "/automation", desc: "Auto Reply & AI flows from $9.99" },
      { label: "Integrations", href: "/integrations", desc: "200+ apps and an open API" },
      { label: "AI Agent", href: "/ai-agent", desc: "Meet Captain, the flagship agent" },
    ],

    finalEyebrow: "No-code, point and click",
    finalHeading: "Put the agent builder in the hands of your",
    finalHighlight: "experts.",
    finalBody:
      "Create, train, and launch agentic AI agents without code — grounded in your data, with logic and handoff, deployed across every channel.",
  },
]

export const AGENTS_BY_SLUG: Record<string, AgentContent> = Object.fromEntries(
  AGENTS.map((a) => [a.slug, a]),
)

/* Cross-link metadata used by the "agent family" grid + the hub. */
export const AGENT_FAMILY = AGENTS.map((a) => ({
  slug: a.slug,
  path: a.path,
  navLabel: a.navLabel,
  cardSummary: a.cardSummary,
  hubIcon: a.hubIcon,
  accent: a.accent,
}))

export { Users }
