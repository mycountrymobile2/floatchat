import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const releases = [
  {
    version: "2.4.0",
    date: "April 28, 2026",
    tag: "Major",
    tagColor: "bg-primary/10 text-primary",
    changes: [
      { type: "new", text: "AI Agent now supports multilingual replies — auto-detects customer language and responds in kind (50+ languages)" },
      { type: "new", text: "Voice channel: outbound call API and call recording with automatic transcription" },
      { type: "new", text: "WhatsApp template message builder with visual preview" },
      { type: "improved", text: "AI reply confidence threshold now configurable per inbox (previously global-only)" },
      { type: "improved", text: "Inbox load time reduced by 40% with optimized conversation list pagination" },
      { type: "fixed", text: "WhatsApp media messages (images, PDFs) now display inline in the conversation thread" },
      { type: "fixed", text: "SLA timer now correctly pauses during business hours when 'outside hours' mode is active" },
    ],
  },
  {
    version: "2.3.2",
    date: "April 14, 2026",
    tag: "Patch",
    tagColor: "bg-muted text-muted-foreground",
    changes: [
      { type: "fixed", text: "Email forwarding loop detection now correctly ignores auto-responders with X-Auto-Reply header" },
      { type: "fixed", text: "API: GET /conversations now returns correct cursor when filtered by agent_id" },
      { type: "fixed", text: "Shopify integration: order status webhook no longer creates duplicate contacts on address changes" },
    ],
  },
  {
    version: "2.3.0",
    date: "April 1, 2026",
    tag: "Major",
    tagColor: "bg-primary/10 text-primary",
    changes: [
      { type: "new", text: "Knowledge base article editor with rich text, tables, and image upload" },
      { type: "new", text: "AI knowledge gaps report: see which customer questions the AI couldn't answer confidently" },
      { type: "new", text: "Team performance dashboard — CSAT, response time, and resolution rate per agent" },
      { type: "new", text: "Zapier integration (80+ trigger/action pairs)" },
      { type: "improved", text: "SMS: automatic 10DLC registration wizard (US numbers)" },
      { type: "improved", text: "Canned response search now supports fuzzy matching" },
      { type: "fixed", text: "HubSpot contact sync no longer overwrites custom properties" },
    ],
  },
  {
    version: "2.2.1",
    date: "March 18, 2026",
    tag: "Patch",
    tagColor: "bg-muted text-muted-foreground",
    changes: [
      { type: "fixed", text: "Automation rules: 'assign to team' action now works for conversations from email channel" },
      { type: "fixed", text: "Resolved conversations no longer reopen on AI classification events" },
      { type: "improved", text: "2FA setup flow now supports authenticator apps (TOTP) in addition to SMS" },
    ],
  },
  {
    version: "2.2.0",
    date: "March 4, 2026",
    tag: "Major",
    tagColor: "bg-primary/10 text-primary",
    changes: [
      { type: "new", text: "Help center — embeddable customer-facing knowledge base with SEO-friendly article URLs" },
      { type: "new", text: "Contact merge: combine duplicate customer profiles with full conversation history" },
      { type: "new", text: "Live chat widget v2: customizable launcher, pre-chat form, and dark mode support" },
      { type: "new", text: "Webhooks dashboard — delivery logs, retry status, and one-click replay" },
      { type: "improved", text: "Notification preferences now configurable per channel per agent" },
      { type: "fixed", text: "Browser notifications now fire correctly when FloatChat tab is not in focus" },
    ],
  },
  {
    version: "2.1.0",
    date: "February 10, 2026",
    tag: "Major",
    tagColor: "bg-primary/10 text-primary",
    changes: [
      { type: "new", text: "AI Agent beta: GPT-4o powered auto-replies with human hand-off threshold" },
      { type: "new", text: "Email channel: shared inbox with collision detection (see when teammate is typing)" },
      { type: "new", text: "Reports: export conversation data to CSV and connect to Looker/Tableau via API" },
      { type: "improved", text: "Mobile app (iOS/Android): push notifications for new conversations and mentions" },
      { type: "improved", text: "Sidebar now shows unread count per inbox with badge" },
    ],
  },
  {
    version: "2.0.0",
    date: "January 6, 2026",
    tag: "Major",
    tagColor: "bg-green-100 text-green-700",
    changes: [
      { type: "new", text: "FloatChat 2.0 — complete UI redesign with unified omnichannel inbox" },
      { type: "new", text: "SMS, WhatsApp, email, live chat, and voice all in one thread per customer" },
      { type: "new", text: "Automation builder with visual flow editor" },
      { type: "new", text: "Starter plan: free inbox with unlimited agents" },
      { type: "new", text: "REST API v1 with full CRUD for conversations, contacts, and messages" },
    ],
  },
]

const typeConfig: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "bg-primary/10 text-primary" },
  improved: { label: "Improved", color: "bg-green-100 text-green-700" },
  fixed: { label: "Fixed", color: "bg-orange-100 text-orange-700" },
  deprecated: { label: "Deprecated", color: "bg-muted text-muted-foreground" },
}

export default function ChangelogPage() {
  useEffect(() => {
    document.title = "Changelog | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "FloatChat product changelog. New features, improvements, and bug fixes — released every two weeks.")
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-20 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Changelog
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                New features, improvements, and fixes. We ship updates every two weeks.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://twitter.com/floatchat" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  Follow @floatchat for updates →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Releases */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-20 hidden sm:block" />

                <div className="space-y-16">
                  {releases.map((release, i) => (
                    <motion.div
                      key={release.version}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="sm:flex gap-8"
                    >
                      {/* Date column */}
                      <div className="shrink-0 w-20 hidden sm:block">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">{release.version}</p>
                          <p className="text-xs text-muted-foreground mt-1">{release.date.split(",")[0]}</p>
                          <p className="text-xs text-muted-foreground">{release.date.split(",")[1]?.trim()}</p>
                        </div>
                      </div>

                      {/* Dot */}
                      <div className="relative hidden sm:flex items-start justify-center w-6 shrink-0">
                        <div className="w-3 h-3 rounded-full bg-primary border-2 border-card mt-1 relative z-10" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-0">
                        <div className="sm:hidden mb-3">
                          <span className="text-sm font-bold text-foreground">{release.version}</span>
                          <span className="text-xs text-muted-foreground ml-3">{release.date}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${release.tagColor}`}>
                            {release.tag}
                          </span>
                          <span className="text-sm font-semibold text-foreground">v{release.version}</span>
                          <span className="text-xs text-muted-foreground hidden sm:inline">{release.date}</span>
                        </div>
                        <ul className="space-y-2.5">
                          {release.changes.map((change, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded mt-0.5 ${typeConfig[change.type]?.color}`}>
                                {typeConfig[change.type]?.label}
                              </span>
                              <span className="text-sm text-muted-foreground leading-relaxed">{change.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Never miss an update</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Get release notes and new feature announcements delivered to your inbox every two weeks.</p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
