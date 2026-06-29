import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Convert an article title to a slug used by /help/[slug]
function slug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Resolve the link target. "#" means "no published article yet" — stub to /help/[slug].
function resolveHref(article: { title: string; href: string }): string {
  return article.href === "#" ? `/help/${slug(article.title)}` : article.href
}

const categories = [
  {
    icon: "🚀",
    title: "Getting Started",
    description: "Set up your inbox, invite your team, and send your first message.",
    articles: [
      { title: "Create your FloatChat account", href: "#" },
      { title: "Connect your first channel (SMS, email, or chat)", href: "#" },
      { title: "Invite teammates and assign roles", href: "#" },
      { title: "Set up your AI Agent", href: "#" },
      { title: "Install the live chat widget on your site", href: "#" },
    ],
  },
  {
    icon: "💬",
    title: "Inbox & Conversations",
    description: "Manage, assign, and resolve customer conversations efficiently.",
    articles: [
      { title: "Understand conversation statuses (open, snoozed, resolved)", href: "#" },
      { title: "Assign conversations to agents and teams", href: "#" },
      { title: "Use labels to organize your inbox", href: "#" },
      { title: "Canned responses and snippets", href: "#" },
      { title: "Bulk actions and keyboard shortcuts", href: "#" },
    ],
  },
  {
    icon: "🤖",
    title: "AI Agent",
    description: "Configure, train, and monitor your AI support agent.",
    articles: [
      { title: "How the AI Agent works", href: "#" },
      { title: "Train the AI with your knowledge base", href: "#" },
      { title: "Set AI reply confidence thresholds", href: "#" },
      { title: "Review and correct AI responses", href: "#" },
      { title: "Hand-off from AI to human agent", href: "#" },
    ],
  },
  {
    icon: "📱",
    title: "Channels",
    description: "Connect SMS, WhatsApp, email, voice, and live chat.",
    articles: [
      { title: "Set up SMS (10DLC registration guide)", href: "#" },
      { title: "Connect WhatsApp Business API", href: "#" },
      { title: "Configure shared email inbox", href: "#" },
      { title: "Enable voice calls and call routing", href: "#" },
      { title: "Add live chat widget to your website", href: "#" },
    ],
  },
  {
    icon: "⚙️",
    title: "Automation",
    description: "Build workflows to route, tag, and respond automatically.",
    articles: [
      { title: "Create your first automation rule", href: "#" },
      { title: "Auto-assign conversations by keyword or channel", href: "#" },
      { title: "Business hours and out-of-office replies", href: "#" },
      { title: "SLA reminders and escalations", href: "#" },
      { title: "Zapier and Make integration setup", href: "#" },
    ],
  },
  {
    icon: "💳",
    title: "Billing & Plans",
    description: "Manage your subscription, invoices, and usage.",
    articles: [
      { title: "FloatChat pricing explained", href: "/pricing" },
      { title: "Upgrade or downgrade your plan", href: "#" },
      { title: "Download invoices and receipts", href: "#" },
      { title: "AI reply and SMS usage overage charges", href: "#" },
      { title: "Cancel your subscription", href: "#" },
    ],
  },
  {
    icon: "🔗",
    title: "Integrations",
    description: "Connect CRMs, e-commerce platforms, and productivity tools.",
    articles: [
      { title: "Shopify integration setup", href: "#" },
      { title: "HubSpot CRM sync", href: "#" },
      { title: "Salesforce connector", href: "#" },
      { title: "Slack notifications", href: "#" },
      { title: "REST API and webhooks overview", href: "/docs" },
    ],
  },
  {
    icon: "🔐",
    title: "Security & Compliance",
    description: "Account security, SSO, data exports, and compliance.",
    articles: [
      { title: "Enable two-factor authentication (2FA)", href: "#" },
      { title: "Set up SSO (Google Workspace, Okta)", href: "#" },
      { title: "Export your data", href: "#" },
      { title: "GDPR and CCPA data requests", href: "#" },
      { title: "HIPAA BAA — healthcare compliance", href: "/trust" },
    ],
  },
]

const popular = [
  { title: "How do I connect WhatsApp?", href: "#" },
  { title: "Why is my SMS not delivering?", href: "#" },
  { title: "How many AI replies do I get per month?", href: "#" },
  { title: "Can I use FloatChat with my existing phone number?", href: "#" },
  { title: "How do I export conversation history?", href: "#" },
  { title: "Does FloatChat support multiple languages?", href: "#" },
]

export default function HelpPage() {
  useEffect(() => {
    document.title = "Help Center | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "FloatChat Help Center — guides, how-tos, and troubleshooting for every feature.")
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              How can we help?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Find guides, tutorials, and answers for every FloatChat feature.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search help articles..."
                  className="w-full px-5 py-4 pl-12 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-sm text-sm"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular articles */}
        <section className="py-12 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Popular articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popular.map((article) => (
                <Link
                  key={article.title}
                  to={resolveHref(article)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:border-primary/40 hover:bg-secondary/30 transition-colors group"
                >
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                  <span className="text-sm text-foreground">{article.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-12">Browse by category</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
                  <ul className="space-y-2">
                    {cat.articles.map((article) => (
                      <li key={article.title}>
                        <Link
                          to={resolveHref(article)}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-start gap-1.5"
                        >
                          <span className="mt-0.5 shrink-0 text-xs">→</span>
                          <span>{article.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact support */}
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-8">Our support team is available Mon–Fri 9am–6pm EST. Priority support included on Growth and Enterprise plans.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact support
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary/50 transition-colors"
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
