import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const sections = [
  {
    title: "Getting started",
    icon: "🚀",
    items: [
      { title: "Authentication", desc: "API keys, OAuth tokens, and session management", href: "#auth" },
      { title: "Base URL & versioning", desc: "Endpoints, API version headers, deprecation policy", href: "#base-url" },
      { title: "Rate limits", desc: "Request limits per plan, retry strategies", href: "#rate-limits" },
      { title: "Error codes", desc: "4xx/5xx error reference with troubleshooting", href: "#errors" },
    ],
  },
  {
    title: "Core resources",
    icon: "📦",
    items: [
      { title: "Conversations", desc: "Create, list, update, and resolve support threads", href: "#conversations" },
      { title: "Messages", desc: "Send messages across SMS, email, WhatsApp, and chat", href: "#messages" },
      { title: "Contacts", desc: "Manage customer profiles, merge duplicates, add notes", href: "#contacts" },
      { title: "Agents & teams", desc: "User management, roles, and team assignment APIs", href: "#agents" },
    ],
  },
  {
    title: "Channels",
    icon: "📡",
    items: [
      { title: "SMS API", desc: "Send and receive SMS, manage numbers and opt-outs", href: "#sms" },
      { title: "WhatsApp API", desc: "Template messages, media, and session handling", href: "#whatsapp" },
      { title: "Email API", desc: "Send, reply, forward, and manage email threads", href: "#email" },
      { title: "Voice API", desc: "Outbound calls, recording, transcription endpoints", href: "#voice" },
    ],
  },
  {
    title: "AI & Automation",
    icon: "🤖",
    items: [
      { title: "AI Agent API", desc: "Trigger, configure, and override AI replies", href: "#ai-agent" },
      { title: "Knowledge base", desc: "Upload articles, PDFs, and FAQs for AI training", href: "#knowledge" },
      { title: "Automation rules", desc: "Create and manage workflow automation via API", href: "#automation" },
      { title: "Webhooks", desc: "Subscribe to real-time conversation and message events", href: "#webhooks" },
    ],
  },
  {
    title: "SDKs & tools",
    icon: "🛠️",
    items: [
      { title: "Node.js SDK", desc: "Official npm package for server-side integration", href: "#sdk-node" },
      { title: "Python SDK", desc: "Official PyPI package for backend integration", href: "#sdk-python" },
      { title: "Postman collection", desc: "Import our full API collection into Postman", href: "#postman" },
      { title: "OpenAPI spec", desc: "Download our OpenAPI 3.0 YAML/JSON spec", href: "#openapi" },
    ],
  },
]

const codeExample = `// Send a message via FloatChat API
const response = await fetch('https://api.floatchat.com/v1/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    conversation_id: 'conv_abc123',
    channel: 'sms',
    content: 'Hello! Your order has shipped. Track it here: https://...',
    sender_id: 'agent_xyz',
  }),
})

const data = await response.json()
// { id: 'msg_def456', status: 'sent', created_at: '2026-05-01T10:00:00Z' }`

export default function DocsPage() {
  useEffect(() => {
    document.title = "Developer Documentation | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "FloatChat Developer Documentation. REST API reference, SDKs, webhooks, and integration guides.")
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-20 bg-secondary/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                  API v1 — stable
                </span>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Developer Docs
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Everything you need to integrate FloatChat into your product — REST API, webhooks, SDKs, and code examples.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#quick-start"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors text-sm"
                  >
                    Quick start →
                  </a>
                  <a
                    href="#openapi"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary/50 transition-colors text-sm"
                  >
                    Download OpenAPI spec
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick start code */}
        <section id="quick-start" className="py-16 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Quick start</h2>
                <ol className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">1</span>
                    <div>
                      <p className="font-medium text-foreground">Get your API key</p>
                      <p className="text-sm mt-1">Go to Settings → API & Integrations → Generate API Key in your FloatChat dashboard.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">2</span>
                    <div>
                      <p className="font-medium text-foreground">Make your first request</p>
                      <p className="text-sm mt-1">Send a test message using the code example to verify your API key is working.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">3</span>
                    <div>
                      <p className="font-medium text-foreground">Set up webhooks</p>
                      <p className="text-sm mt-1">Register a webhook URL to receive real-time events for new messages, conversation updates, and AI actions.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">4</span>
                    <div>
                      <p className="font-medium text-foreground">Explore the full reference</p>
                      <p className="text-sm mt-1">Browse all endpoints, request/response schemas, and error codes below.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div>
                <div className="rounded-xl overflow-hidden border border-border">
                  <div className="flex items-center gap-2 px-4 py-3 bg-foreground/5 border-b border-border">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">JavaScript</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-foreground bg-card overflow-x-auto leading-relaxed">
                    <code>{codeExample}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Base URL + auth */}
        <section id="auth" className="py-12 border-b border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-foreground mb-2">Base URL</h2>
                <code className="text-sm font-mono text-primary bg-primary/5 px-3 py-1.5 rounded-lg block">
                  https://api.floatchat.com/v1
                </code>
              </div>
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-foreground mb-2">Authentication</h2>
                <p className="text-sm text-muted-foreground">Pass your API key as a Bearer token in the <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">Authorization</code> header.</p>
              </div>
              <div className="lg:col-span-1">
                <h2 className="text-xl font-bold text-foreground mb-2">Rate limits</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Starter: 100 req/min</li>
                  <li>Growth: 500 req/min</li>
                  <li>Enterprise: custom</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* API sections */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-12">API reference</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="text-2xl mb-3">{section.icon}</div>
                  <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <a href={item.href} className="group">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Webhooks overview */}
        <section id="webhooks" className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Webhooks</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to real-time events from FloatChat. Register your endpoint in Settings → Webhooks. We send HTTP POST requests with JSON payloads and sign them with HMAC-SHA256.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "conversation.created", "conversation.resolved", "message.received",
                  "message.sent", "ai_agent.replied", "contact.created",
                ].map((event) => (
                  <code key={event} className="text-sm font-mono bg-card border border-border px-3 py-2 rounded-lg text-foreground">
                    {event}
                  </code>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need API support?</h2>
            <p className="text-muted-foreground mb-8">Enterprise customers get dedicated integration support and SLA-backed API uptime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                Talk to our team
              </Link>
              <Link to="/help" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary/50 transition-colors">
                Help center
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
