import { Link } from "react-router-dom"
import { ArrowRight, Layers } from "lucide-react"
import { ShoppingCart, Building2, Heart, Home, GraduationCap, UtensilsCrossed } from "lucide-react"

/**
 * RelatedSolutions — sibling-industry + contextual product links for the
 * bottom of every /solutions/{industry} page. Mirrors RelatedComparisons.
 */

type SolutionKey =
  | "ecommerce"
  | "saas"
  | "healthcare"
  | "real-estate"
  | "education"
  | "restaurants"

const SOLUTION_META: Record<SolutionKey, { label: string; icon: typeof ShoppingCart }> = {
  ecommerce: { label: "E-commerce / D2C", icon: ShoppingCart },
  saas: { label: "SaaS / B2B", icon: Building2 },
  healthcare: { label: "Healthcare", icon: Heart },
  "real-estate": { label: "Real estate", icon: Home },
  education: { label: "Education / EdTech", icon: GraduationCap },
  restaurants: { label: "Restaurants", icon: UtensilsCrossed },
}

// 3 sibling solution pages curated per industry — picked for natural buyer-overlap
const SIBLINGS: Record<SolutionKey, SolutionKey[]> = {
  ecommerce: ["saas", "restaurants", "real-estate"],
  saas: ["ecommerce", "education", "healthcare"],
  healthcare: ["education", "saas", "real-estate"],
  "real-estate": ["ecommerce", "restaurants", "saas"],
  education: ["saas", "healthcare", "real-estate"],
  restaurants: ["ecommerce", "real-estate", "education"],
}

// 2 contextual product links per industry, chosen for that industry's must-have features
const PRODUCT_LINKS: Record<
  SolutionKey,
  Array<{ label: string; href: string; reason: string }>
> = {
  ecommerce: [
    { label: "WhatsApp", href: "/whatsapp", reason: "Two-way customer service on WhatsApp, included on Free." },
    { label: "AI Captain", href: "/ai-agent", reason: "Handles WISMO, refunds, and order-status questions automatically." },
  ],
  saas: [
    { label: "AI Captain", href: "/ai-agent", reason: "Trial-conversion and onboarding questions, bundled — no per-resolution fee." },
    { label: "Integrations", href: "/integrations", reason: "Stripe, HubSpot, Salesforce, Slack, Linear connectors native." },
  ],
  healthcare: [
    { label: "Voice", href: "/voice", reason: "Patient callbacks land in the same inbox as chat and email." },
    { label: "Trust & Security", href: "/trust", reason: "HIPAA BAA on Enterprise. US-only data residency." },
  ],
  "real-estate": [
    { label: "SMS", href: "/sms", reason: "Appointment reminders and showing confirmations at $0.005/segment." },
    { label: "WhatsApp", href: "/whatsapp", reason: "Reach buyers and tenants on the channel they already use." },
  ],
  education: [
    { label: "AI Captain", href: "/ai-agent", reason: "Handles overnight student questions in 50+ languages with auto-translate." },
    { label: "Help Center", href: "/help-center", reason: "SEO-friendly knowledge base for self-serve student support." },
  ],
  restaurants: [
    { label: "Automation", href: "/automation", reason: "Auto Reply for hours, menu, location — Lite plan at $9.99." },
    { label: "SMS", href: "/sms", reason: "Booking confirmations and waitlist updates by SMS." },
  ],
}

export function RelatedSolutions({ solution }: { solution: SolutionKey }) {
  const siblings = SIBLINGS[solution]
  const products = PRODUCT_LINKS[solution]
  const currentLabel = SOLUTION_META[solution].label

  return (
    <section className="py-16 lg:py-24 border-t border-border" aria-label="Related solutions">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Sibling solutions */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Other industries
              </p>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
              FloatChat for different teams
            </h2>
            <ul className="space-y-2">
              {siblings.map((key) => {
                const meta = SOLUTION_META[key]
                const Icon = meta.icon
                return (
                  <li key={key}>
                    <Link
                      to={`/solutions/${key}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-foreground">{meta.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                )
              })}
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
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Features that matter most
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-6">
              Key features for {currentLabel.toLowerCase()}
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
