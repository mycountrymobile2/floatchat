"use client"

import { useLocation } from "react-router-dom"

/**
 * Generic JSON-LD injector.
 *
 * Usage:
 *   <JsonLd schema={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 *
 * Works for SPAs because the script tag lands in the DOM after hydration and
 * Google's renderer parses it. Re-mounts on route change because page-level
 * components unmount and remount as React Router swaps routes.
 */
export function JsonLd({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema)
    ? { "@context": "https://schema.org", "@graph": schema }
    : schema
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

/**
 * Map URL segments to friendly breadcrumb labels.
 * If the segment isn't in the map, it falls back to a title-cased version.
 */
const SEGMENT_LABELS: Record<string, string> = {
  pricing: "Pricing",
  "ai-agent": "AI Agent",
  "ai-agents": "AI Agents",
  "customer-service": "Customer Service Agent",
  sales: "Sales Agent",
  booking: "Booking Agent",
  "lead-qualification": "Lead Qualification Agent",
  "agent-builder": "Agent Builder",
  "agentic-ai": "Agentic AI",
  products: "Products",
  "agent-copilot": "Agent Copilot",
  analytics: "Analytics",
  "omnichannel-inbox": "Omnichannel Inbox",
  "live-chat": "Live Chat",
  inbox: "Inbox",
  voice: "Voice",
  sms: "SMS",
  email: "Email",
  whatsapp: "WhatsApp",
  "help-center": "Help Center",
  automation: "Automation",
  integrations: "Integrations",
  about: "About",
  "about-us": "About",
  "contact-us": "Contact",
  customers: "Customers",
  blog: "Blog",
  contact: "Contact",
  demo: "Demo",
  templates: "Templates",
  docs: "Docs",
  help: "Help Center",
  changelog: "Changelog",
  status: "Status",
  trust: "Trust & Security",
  security: "Security",
  privacy: "Privacy Policy",
  terms: "Terms",
  cookies: "Cookies",
  dpa: "DPA",
  aup: "Acceptable Use",
  solutions: "Solutions",
  vs: "Compare",
  compare: "Compare",
  platform: "Platform",
  "why-floatchat": "Why FloatChat",
  partnerships: "Partnerships",
  services: "Services",
  "ai-consulting": "AI Consulting",
  "voice-ai-agents": "Voice AI Agents",
  numbers: "Numbers",
  did: "Virtual Numbers",
  channels: "Channels",
  "whatsapp-broadcasting": "WhatsApp Broadcasting",
  rcs: "RCS",
  "rcs-broadcasting": "RCS Broadcasting",
  "sms-broadcasting": "SMS Broadcasting",
  instagram: "Instagram",
  messenger: "Messenger",
  "web-chat": "Web Chat",
  social: "Social",
  industry: "Industries",
  retail: "Retail & eCommerce",
  "travel-and-hospitality": "Travel & Hospitality",
  fintech: "Fintech",
  "media-entertainment": "Media & Entertainment",
  insurance: "Insurance",
  mortgage: "Mortgage",
  telecom: "Telecom",
  haptik: "Haptik",
  twilio: "Twilio",
  twixor: "Twixor",
  infobip: "Infobip",
  ecommerce: "E-commerce",
  saas: "SaaS",
  healthcare: "Healthcare",
  "real-estate": "Real Estate",
  education: "Education",
  restaurants: "Restaurants",
  intercom: "Intercom",
  zendesk: "Zendesk",
  tidio: "Tidio",
  freshchat: "Freshchat",
  hubspot: "HubSpot",
  "help-scout": "Help Scout",
  front: "Front",
  drift: "Drift",
  gorgias: "Gorgias",
  crisp: "Crisp",
  tawk: "Tawk.to",
  chatmitra: "ChatMitra",
}

function labelFor(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment]
  return segment
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ")
}

/**
 * BreadcrumbSchema — emits BreadcrumbList schema for the current path.
 *
 * Mounted once in the Header so it appears on every page automatically.
 * Skipped on the homepage (no breadcrumb needed) and on the dashboard
 * (private surface).
 */
export function BreadcrumbSchema() {
  const { pathname } = useLocation()
  if (pathname === "/" || pathname.startsWith("/dashboard")) return null

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return null

  const items = [
    { position: 1, name: "FloatChat", url: "https://floatchat.com/" },
    ...segments.map((seg, idx) => ({
      position: idx + 2,
      name: labelFor(seg),
      url: `https://floatchat.com/${segments.slice(0, idx + 1).join("/")}`,
    })),
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Convenience for FAQ-heavy pages.
 *
 * Usage:
 *   <FaqSchema items={[{ question: "...", answer: "..." }, ...]} />
 */
export function FaqSchema({ items }: { items: Array<{ question: string; answer: string }> }) {
  if (!items?.length) return null
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
