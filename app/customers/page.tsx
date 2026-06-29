"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"

/**
 * Customers page — currently shows illustrative use cases by industry until
 * real customer case studies are published. Every "Story" is framed as an
 * example of how a team in that industry would typically use FloatChat,
 * not as a claim about specific named customers.
 *
 * When you sign real case studies, replace this `useCases` array with the
 * real customers and credit the actual names + companies. Keep the same
 * card structure.
 */

const useCases = [
  {
    industry: "E-commerce",
    icon: "🛒",
    scenario: "Shopify D2C brand replacing Tawk + Gmail + a separate SMS tool",
    summary:
      "Live chat + email + WhatsApp + Shopify on the Free plan. Upgrade to Lite ($9.99) for Auto Reply when after-hours coverage matters. Captain handles WISMO and refund-policy questions.",
    metrics: [
      { value: "5 min", label: "Install time" },
      { value: "Free", label: "Plan needed" },
      { value: "0", label: "Extra tools" },
    ],
    suggestedPlan: "Free → Lite $9.99",
    industryHref: "/solutions/ecommerce",
  },
  {
    industry: "Healthcare",
    icon: "🏥",
    scenario: "Clinic or telehealth team needing HIPAA-compliant patient chat",
    summary:
      "Enterprise plan with HIPAA-aware controls. DigitalOcean NYC3 US data residency. Patient intake forms route to assigned care coordinators. Voice calls land in the same inbox.",
    metrics: [
      { value: "HIPAA", label: "BAA available" },
      { value: "US", label: "Data residency" },
      { value: "1", label: "Unified inbox" },
    ],
    suggestedPlan: "Enterprise",
    industryHref: "/solutions/healthcare",
  },
  {
    industry: "SaaS / B2B",
    icon: "💻",
    scenario: "Bootstrapped SaaS replacing Intercom Essential + Fin",
    summary:
      "AI Captain bundled — no per-resolution surprise bill. 25 agents on Pro at one capacity price. API + webhooks ship lead data to your CRM. Salesforce integration on Pro.",
    metrics: [
      { value: "Bundled", label: "AI pricing" },
      { value: "25", label: "Agents on Pro" },
      { value: "API", label: "+ webhooks" },
    ],
    suggestedPlan: "Pro",
    industryHref: "/solutions/saas",
  },
  {
    industry: "Real estate",
    icon: "🏠",
    scenario: "Brokerage or property-management team handling property inquiries",
    summary:
      "Inquiries from email, web chat, and WhatsApp unified in one inbox. SMS appointment reminders on Starter. Voice for callbacks from interested buyers.",
    metrics: [
      { value: "Free", label: "Starting plan" },
      { value: "SMS", label: "+ voice" },
      { value: "Fast", label: "First reply" },
    ],
    suggestedPlan: "Starter $19.99",
    industryHref: "/solutions/real-estate",
  },
  {
    industry: "Education / EdTech",
    icon: "🎓",
    scenario: "Online school or course platform supporting students across time zones",
    summary:
      "Captain handles overnight questions when staff are offline. Auto-translate in 50+ languages for international students. Help Center + chat widget in one platform.",
    metrics: [
      { value: "24/7", label: "AI coverage" },
      { value: "50+", label: "Languages" },
      { value: "Web", label: "+ mobile responsive" },
    ],
    suggestedPlan: "Growth",
    industryHref: "/solutions/education",
  },
  {
    industry: "Restaurants",
    icon: "🍽️",
    scenario: "Restaurant chain handling reservations, delivery complaints, catering orders",
    summary:
      "Lunch-rush message volume routed by channel. Auto Reply for FAQs (hours, location, menu). SMS for booking confirmations. WhatsApp for catering quotes.",
    metrics: [
      { value: "Auto", label: "Hours + menu" },
      { value: "SMS", label: "Confirmations" },
      { value: "$19.99", label: "Starter plan" },
    ],
    suggestedPlan: "Starter $19.99",
    industryHref: "/solutions/restaurants",
  },
]

const productHighlights = [
  { value: "10+", label: "Native channels", href: "/inbox" },
  { value: "5", label: "Minutes to live widget", href: "/live-chat" },
  { value: "99.9%", label: "Uptime SLA", href: "/trust" },
  { value: "48h", label: "Free migration", href: "/contact" },
]

export default function CustomersPage() {
  useEffect(() => {
    document.title = "How Teams Use FloatChat — Use Cases by Industry"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute(
        "content",
        "Illustrative use cases for e-commerce, healthcare, SaaS, real estate, education, and restaurants. See which plan fits your team."
      )
    }
  }, [])

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4">
                Use cases by industry
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
                How teams use FloatChat.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Six common scenarios — what each industry typically needs, and which FloatChat plan
                fits. Real customer case studies will replace these as they're signed.
              </p>
            </motion.div>

            {/* Product highlights */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {productHighlights.map((stat, i) => (
                <BlurFade key={stat.label} delay={0.1 + i * 0.07}>
                  <Link
                    to={stat.href}
                    className="block rounded-xl border border-border bg-card px-4 py-5 text-center hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases grid */}
        <section className="py-8 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((uc, i) => (
                <BlurFade key={uc.industry} delay={i * 0.07}>
                  <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                          {uc.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{uc.industry}</p>
                          <p className="text-xs text-muted-foreground">Example scenario</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">
                        {uc.suggestedPlan}
                      </Badge>
                    </div>

                    <p className="text-sm font-medium text-foreground mb-2">{uc.scenario}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {uc.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border mb-4">
                      {uc.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-base font-bold text-primary">{m.value}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={uc.industryHref}
                      className="inline-flex items-center justify-between gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <span>See {uc.industry} solution</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Industry links */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Built for your industry</h2>
              <p className="text-muted-foreground">
                Pick yours for the specific feature set, pricing, and migration path.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
              {[
                { label: "E-commerce", href: "/solutions/ecommerce", desc: "WISMO, returns, Shopify orders" },
                { label: "Healthcare", href: "/solutions/healthcare", desc: "HIPAA-compliant patient chat" },
                { label: "SaaS", href: "/solutions/saas", desc: "Trial conversion and onboarding" },
                { label: "Real Estate", href: "/solutions/real-estate", desc: "Lead capture and scheduling" },
                { label: "Education", href: "/solutions/education", desc: "Student support across time zones" },
                { label: "Restaurants", href: "/solutions/restaurants", desc: "Reservations and order support" },
              ].map((sol, i) => (
                <motion.div
                  key={sol.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    to={sol.href}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                        {sol.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{sol.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Be one of our first customers.
            </h2>
            <p className="text-muted-foreground mb-8">
              Free plan. No credit card. Free migration from any tool in 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup?plan=free">Start Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/demo">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
