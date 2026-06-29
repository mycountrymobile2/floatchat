import { Link } from "react-router-dom"
import { ArrowRight, Layers } from "lucide-react"

/**
 * RelatedComparisons — drop-in section for every /vs/{competitor} page.
 *
 * Shows 3 sibling comparison links (excluding the current competitor) plus 2
 * contextual product-page links chosen for each competitor's specific weakness.
 *
 * Wire it in just above each page's final CTA section.
 */

type CompetitorKey =
  | "intercom"
  | "zendesk"
  | "tidio"
  | "freshchat"
  | "hubspot"
  | "help-scout"
  | "front"
  | "drift"
  | "gorgias"
  | "crisp"
  | "tawk"
  | "chatmitra"

const COMPETITOR_LABEL: Record<CompetitorKey, string> = {
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

// 3 sibling comparisons curated per competitor — chosen to match buyer-shop set,
// not auto-generated, because the natural "next thing to compare" differs per tool.
const SIBLINGS: Record<CompetitorKey, CompetitorKey[]> = {
  intercom: ["zendesk", "tidio", "drift"],
  zendesk: ["intercom", "help-scout", "freshchat"],
  tidio: ["intercom", "crisp", "tawk"],
  freshchat: ["intercom", "zendesk", "tidio"],
  hubspot: ["intercom", "zendesk", "front"],
  "help-scout": ["zendesk", "front", "intercom"],
  front: ["help-scout", "hubspot", "intercom"],
  drift: ["intercom", "hubspot", "front"],
  gorgias: ["intercom", "tidio", "zendesk"],
  crisp: ["tidio", "tawk", "intercom"],
  tawk: ["tidio", "crisp", "intercom"],
  chatmitra: ["tidio", "tawk", "crisp"],
}

// 2 contextual product links per competitor — picked for what the competitor
// is weak or missing at, so the buyer sees the FloatChat advantage in context.
const PRODUCT_LINKS: Record<
  CompetitorKey,
  Array<{ label: string; href: string; reason: string }>
> = {
  intercom: [
    { label: "Voice", href: "/voice", reason: "Intercom has no native voice — FloatChat numbers from $5/mo." },
    { label: "SMS", href: "/sms", reason: "Intercom has no native SMS — FloatChat at $0.005/segment." },
  ],
  zendesk: [
    { label: "AI Captain", href: "/ai-agent", reason: "Bundled AI vs Zendesk's per-resolution add-on." },
    { label: "Live Chat", href: "/live-chat", reason: "Free chat widget — Zendesk charges extra." },
  ],
  tidio: [
    { label: "Voice", href: "/voice", reason: "Tidio has no voice — FloatChat does." },
    { label: "AI Captain", href: "/ai-agent", reason: "Full AI Captain vs Tidio's limited Lyro." },
  ],
  freshchat: [
    { label: "Voice", href: "/voice", reason: "Voice bundled — Freshchat charges per-seat for Freshcaller." },
    { label: "AI Captain", href: "/ai-agent", reason: "Captain bundled in plan, not a Freddy AI add-on." },
  ],
  hubspot: [
    { label: "Live Chat", href: "/live-chat", reason: "Free chat widget without the HubSpot CRM lock-in." },
    { label: "Inbox", href: "/inbox", reason: "10 channels in one inbox — HubSpot bundles via Marketing Hub." },
  ],
  "help-scout": [
    { label: "Live Chat", href: "/live-chat", reason: "Live chat in base plan — Help Scout charges for Beacon." },
    { label: "Voice", href: "/voice", reason: "Voice native — Help Scout doesn't have it." },
  ],
  front: [
    { label: "AI Captain", href: "/ai-agent", reason: "Bundled AI vs Front's per-seat AI assist." },
    { label: "Live Chat", href: "/live-chat", reason: "Customer-facing chat widget — Front is internal team email." },
  ],
  drift: [
    { label: "Inbox", href: "/inbox", reason: "Real support inbox — Drift is marketing-focused." },
    { label: "AI Captain", href: "/ai-agent", reason: "Support-grade AI, not just lead-qualification bots." },
  ],
  gorgias: [
    { label: "Live Chat", href: "/live-chat", reason: "Free chat widget — Gorgias is Shopify-only." },
    { label: "Inbox", href: "/inbox", reason: "10 channels — Gorgias is e-commerce-focused." },
  ],
  crisp: [
    { label: "AI Captain", href: "/ai-agent", reason: "Captain bundled at $9.99 — Crisp's AI is paid extra." },
    { label: "Voice", href: "/voice", reason: "US voice numbers — Crisp is EU-focused." },
  ],
  tawk: [
    { label: "AI Captain", href: "/ai-agent", reason: "Real AI from $9.99 — Tawk has no AI." },
    { label: "Voice", href: "/voice", reason: "Native voice — Tawk doesn't have it." },
  ],
  chatmitra: [
    { label: "Live Chat", href: "/live-chat", reason: "Free chat + email + WhatsApp — beyond ChatMitra's WhatsApp focus." },
    { label: "Inbox", href: "/inbox", reason: "10 channels in one inbox — ChatMitra is messaging-only." },
  ],
}

export function RelatedComparisons({ competitor }: { competitor: CompetitorKey }) {
  const siblings = SIBLINGS[competitor]
  const products = PRODUCT_LINKS[competitor]
  const competitorLabel = COMPETITOR_LABEL[competitor]

  return (
    <section className="py-16 lg:py-24 border-t border-border" aria-label="Related comparisons">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Sibling comparisons */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Still deciding?
              </p>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
              Compare FloatChat to other tools
            </h2>
            <ul className="space-y-2">
              {siblings.map((key) => (
                <li key={key}>
                  <Link
                    to={`/vs/${key}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-sm font-medium text-foreground">
                      FloatChat vs {COMPETITOR_LABEL[key]}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              See all FloatChat plans
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Contextual product links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Where FloatChat fills the gap
              </p>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
              What {competitorLabel} doesn't give you
            </h2>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.href}>
                  <Link
                    to={p.href}
                    className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="text-sm font-semibold text-foreground">{p.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.reason}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
