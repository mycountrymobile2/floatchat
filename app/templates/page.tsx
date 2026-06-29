import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Category = "All" | "SMS" | "Email" | "WhatsApp" | "Live chat" | "AI Agent"

const templates = [
  {
    id: 1,
    category: "SMS",
    title: "Order shipped — SMS notification",
    desc: "Notify customers the moment their order ships, with tracking link.",
    tags: ["E-commerce", "SMS"],
    body: "Hi {{customer_name}}! Your order {{order_number}} has shipped 🚚 Track it here: {{tracking_url}} — FloatChat",
  },
  {
    id: 2,
    category: "SMS",
    title: "Appointment reminder — 24h before",
    desc: "Reduce no-shows with a personalized SMS reminder the day before.",
    tags: ["Healthcare", "Scheduling", "SMS"],
    body: "Hi {{name}}, reminder: your appointment is tomorrow, {{date}} at {{time}} with {{provider}}. Reply CONFIRM to confirm or CANCEL to reschedule.",
  },
  {
    id: 3,
    category: "SMS",
    title: "Flash sale announcement",
    desc: "Drive urgency for time-limited offers to opted-in customers.",
    tags: ["E-commerce", "Marketing", "SMS"],
    body: "🔥 {{business_name}} FLASH SALE: {{discount}}% off everything TODAY only. Shop now: {{url}} Reply STOP to opt out.",
  },
  {
    id: 4,
    category: "Email",
    title: "Welcome email — new customer",
    desc: "Warm onboarding email with next steps for new sign-ups.",
    tags: ["Onboarding", "Email"],
    body: "Subject: Welcome to {{business_name}}, {{name}}!\n\nHi {{name}},\n\nThank you for joining us! Here's how to get started:\n\n1. Set up your profile: {{profile_url}}\n2. Browse our catalog: {{catalog_url}}\n3. Need help? Reply to this email anytime.\n\nWe're glad you're here.\n\n{{agent_name}}\n{{business_name}}",
  },
  {
    id: 5,
    category: "Email",
    title: "Refund confirmation",
    desc: "Professionally confirm a refund and set timeline expectations.",
    tags: ["E-commerce", "Support", "Email"],
    body: "Subject: Your refund is being processed — {{order_number}}\n\nHi {{customer_name}},\n\nWe've processed your refund of {{amount}} for order {{order_number}}. Please allow 3–5 business days for it to appear on your {{payment_method}}.\n\nIf you have any questions, just reply to this email.\n\n{{agent_name}}",
  },
  {
    id: 6,
    category: "Email",
    title: "CSAT survey after resolution",
    desc: "Collect customer satisfaction score after a conversation is resolved.",
    tags: ["Support", "CSAT", "Email"],
    body: "Subject: How did we do? Quick question for you\n\nHi {{customer_name}},\n\nWe recently helped you with {{issue_summary}}. Your feedback helps us improve.\n\nHow satisfied were you? (1–5 stars): {{survey_url}}\n\nThanks for your time!\n\n{{agent_name}}",
  },
  {
    id: 7,
    category: "WhatsApp",
    title: "Payment received confirmation",
    desc: "Send instant WhatsApp confirmation when a payment is captured.",
    tags: ["E-commerce", "WhatsApp"],
    body: "✅ Payment confirmed!\n\nHi {{name}}, we received your payment of {{amount}} for {{order_or_invoice}}. Thank you!\n\nYour receipt: {{receipt_url}}\n\n– {{business_name}}",
  },
  {
    id: 8,
    category: "WhatsApp",
    title: "Support ticket opened",
    desc: "Acknowledge a support request via WhatsApp with a ticket number.",
    tags: ["Support", "WhatsApp"],
    body: "Hi {{customer_name}} 👋 We've received your request and created ticket #{{ticket_id}}.\n\nOur team will get back to you within {{response_time}}.\n\nYou can track your ticket here: {{ticket_url}}\n\n– {{business_name}} Support",
  },
  {
    id: 9,
    category: "Live chat",
    title: "Pre-chat greeting — business hours",
    desc: "Warm welcome message when a visitor opens the chat widget.",
    tags: ["Live chat", "Greeting"],
    body: "👋 Hi there! I'm {{agent_name}} from {{business_name}}. How can I help you today?",
  },
  {
    id: 10,
    category: "Live chat",
    title: "Out-of-hours auto-reply",
    desc: "Let customers know when you're back and capture their contact.",
    tags: ["Live chat", "Auto-reply"],
    body: "Hi there! Our team is currently offline (we're available Mon–Fri, 9am–6pm EST). Leave your email and message below and we'll get back to you ASAP! ✉️",
  },
  {
    id: 11,
    category: "Live chat",
    title: "Qualify lead — pricing inquiry",
    desc: "Gather context before connecting a pricing inquiry to sales.",
    tags: ["Live chat", "Sales"],
    body: "Great question about pricing! To make sure I connect you with the right info, could I ask: roughly how many customer conversations do you handle per month?",
  },
  {
    id: 12,
    category: "AI Agent",
    title: "Return & refund policy FAQ",
    desc: "Train your AI Agent to handle return and refund questions.",
    tags: ["AI Agent", "FAQ", "E-commerce"],
    body: "Q: How do I return an item?\nA: We accept returns within 30 days of purchase for items in original condition. Start your return at {{return_portal_url}}. Refunds are processed in 3–5 business days.\n\nQ: Can I exchange instead of refund?\nA: Yes! During your return, choose 'Exchange' and select your replacement item.",
  },
  {
    id: 13,
    category: "AI Agent",
    title: "Business hours escalation prompt",
    desc: "Prompt for AI to gracefully hand off to humans during working hours.",
    tags: ["AI Agent", "Escalation"],
    body: "If you're not able to resolve the customer's issue after 2 attempts, say: 'I'll connect you with one of our specialists who can help further. One moment please.' Then create a handoff with priority: high.",
  },
  {
    id: 14,
    category: "SMS",
    title: "Review request post-purchase",
    desc: "Ask happy customers to leave a review at the right moment.",
    tags: ["SMS", "Reviews"],
    body: "Hi {{name}}! Hope you're loving your {{product}}. If you have a moment, a quick review would mean the world to us: {{review_url}} — {{business_name}}",
  },
  {
    id: 15,
    category: "Email",
    title: "Subscription renewal reminder",
    desc: "Remind B2B customers their subscription renews in 14 days.",
    tags: ["SaaS", "Email", "Billing"],
    body: "Subject: Your {{plan_name}} plan renews in 14 days\n\nHi {{name}},\n\nThis is a reminder that your {{plan_name}} subscription renews on {{renewal_date}} for {{amount}}.\n\nManage your subscription: {{billing_url}}\n\nQuestions? Reply to this email.\n\n{{business_name}} Team",
  },
]

const categories: Category[] = ["All", "SMS", "Email", "WhatsApp", "Live chat", "AI Agent"]

export default function TemplatesPage() {
  const [active, setActive] = useState<Category>("All")
  const [copied, setCopied] = useState<number | null>(null)

  useEffect(() => {
    document.title = "Free Customer Support Templates | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "15+ free customer support message templates for SMS, email, WhatsApp, live chat, and AI Agent. Copy and customize in seconds.")
  }, [])

  const filtered = active === "All" ? templates : templates.filter((t) => t.category === active)

  function copy(id: number, body: string) {
    navigator.clipboard.writeText(body).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-secondary/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                Free to use
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Customer support templates
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Copy-ready message templates for SMS, email, WhatsApp, live chat, and AI Agent. Save hours and keep your brand voice consistent.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                <span>✓ {templates.length} templates</span>
                <span>✓ Free to use</span>
                <span>✓ One-click copy</span>
                <span>✓ Customizable variables</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter tabs */}
        <section className="py-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active === cat
                      ? "bg-primary text-white"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 text-xs opacity-70">
                      ({templates.filter((t) => t.category === cat).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((template, i) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-card border border-border rounded-xl p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{template.desc}</p>

                  {/* Preview */}
                  <div className="bg-muted/50 rounded-lg p-3 mb-4 text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-4 overflow-hidden">
                    {template.body}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => copy(template.id, template.body)}
                    className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      copied === template.id
                        ? "bg-green-100 text-green-700"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {copied === template.id ? "✓ Copied!" : "Copy template"}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Use these templates directly in FloatChat</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Import templates as canned responses, set up AI Agent prompts, or trigger them automatically in workflows — all in one inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup?plan=free"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Start free — no credit card
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-card text-foreground font-semibold hover:bg-secondary/50 transition-colors"
              >
                See a demo
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
