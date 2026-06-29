"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, ArrowRight, Clock, Calendar, Share2, Check, BookOpen } from "lucide-react"
import { toast } from "sonner"

function toId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

/* ── Types ────────────────────────────────────────────────── */

type Section = { heading?: string; body: string }

type Post = {
  slug: string
  category: string
  categoryColor: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; role: string; avatar: string }
  sections: Section[]
}

/* ── Data ─────────────────────────────────────────────────── */

const posts: Post[] = [
  {
    slug: "floatchat-vs-intercom",
    category: "Comparison",
    categoryColor: "bg-violet-100 text-violet-700 border-violet-200",
    title: "FloatChat vs Intercom: The Honest Comparison (2025)",
    excerpt: "Intercom starts at $29/seat. FloatChat is free forever. We break down exactly what you get at each price point — so you can make a decision without a sales call.",
    date: "May 2025",
    readTime: "8 min",
    author: { name: "FloatChat Team", role: "Head of Growth · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "If you've ever stared at an Intercom invoice and wondered where your budget went, you're not alone. Intercom is a great product — but it's built for enterprise teams with enterprise budgets. FloatChat was built for US small and mid-size businesses that want professional customer support without the $500/month minimum.",
      },
      {
        heading: "Pricing at a glance",
        body: "Intercom's Essential plan starts at $29 per seat per month. Add the AI Fin add-on ($0.99 per resolution) and a 5-agent team handling 1,000 AI resolutions per month is looking at $1,135/month before taxes. FloatChat's Lite plan is $9.99/month flat — AI included, no per-resolution fees, no seat fees on top.",
      },
      {
        heading: "What Intercom does better",
        body: "Intercom has a more mature enterprise feature set: advanced custom bots, product tours, and deeply configurable SLAs. If you're a 200-agent enterprise with complex routing and escalation workflows, Intercom's breadth is hard to match. Their app store is also larger, with 300+ integrations.",
      },
      {
        heading: "What FloatChat does better",
        body: "FloatChat bundles voice, SMS, WhatsApp two-way messaging, and email in every plan — including the free tier. Intercom charges extra for each channel. FloatChat's capacity pricing (pay per team, not per seat) means scaling from 3 agents to 25 doesn't multiply your bill by 8x. And FloatChat's free migration team will move your Intercom data, conversations, and contacts over in 48 hours.",
      },
      {
        heading: "The AI comparison",
        body: "Intercom Fin is powered by GPT-4 and is genuinely impressive. FloatChat's AI Captain is also built on frontier models and handles order lookup, FAQ answering, and handoff to human agents. The key difference: Intercom charges per resolution. FloatChat bundles AI replies into the monthly plan. At 2,000 resolutions per month, FloatChat saves you $1,980.",
      },
      {
        heading: "Verdict",
        body: "If you're a US SMB paying more than $100/month for customer support software, FloatChat will almost certainly save you money while giving you more channels. If you're a large enterprise needing advanced SLAs, custom bots, and Salesforce sync, Intercom is the safer choice. For everyone else: start free on FloatChat and compare.",
      },
    ],
  },
  {
    slug: "ai-customer-support-bundled",
    category: "Product",
    categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "Why bundled AI beats per-resolution pricing",
    excerpt: "At 5,000 resolutions/month, Intercom Fin costs $4,950. FloatChat Pro costs $189. Here's the math that most vendors don't want you to run.",
    date: "Apr 2025",
    readTime: "5 min",
    author: { name: "FloatChat Team", role: "Product Manager · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "Per-resolution AI pricing sounds fair until you actually run the math. Most vendors charge $0.99 per AI-resolved ticket. A support team handling 5,000 tickets per month — where AI resolves 60% — pays $2,970 just for AI on top of their base plan. That's the kind of surprise that shows up on month three, right after you turned off your human agents.",
      },
      {
        heading: "The math nobody shows you",
        body: "Let's use real numbers. A 5-agent team on Intercom Essential (with Fin): $29 × 5 seats = $145 base + $0.99 × 3,000 AI resolutions = $2,970 AI fees = $3,115/month total. The same team on FloatChat Starter ($19.99/month, 3 agents) + Lite AI ($9.99): $29.98/month total. That's a 99% cost reduction. Even at FloatChat's Pro tier for 25 agents ($189/month), the savings over per-resolution pricing at scale are enormous.",
      },
      {
        heading: "Why per-resolution pricing exists",
        body: "Per-resolution pricing aligns cost with value — in theory. If AI resolves your ticket, you pay for it. The problem is it creates perverse incentives: support teams start limiting AI use to control costs, which defeats the purpose. It also makes budgeting impossible. Your AI bill swings with ticket volume, seasonal spikes, and campaign launches.",
      },
      {
        heading: "Bundled AI changes the calculus",
        body: "When AI is included in a flat monthly plan, the incentive flips. You want AI to handle as many tickets as possible. You train it better. You improve your help docs. You measure deflection rate as a success metric, not a cost center. FloatChat's AI Captain is included on the Lite plan at $9.99/month — unlimited replies, no per-resolution ceiling.",
      },
      {
        heading: "The catch",
        body: "There is one: bundled AI at a low price point means the AI isn't unlimited in every direction. FloatChat's AI works best for FAQ, order status, and structured knowledge base queries. For complex multi-step workflows requiring deep CRM integration, you may need to configure more. But for 80% of US SMB support tickets, Captain handles it out of the box.",
      },
    ],
  },
  {
    slug: "free-live-chat-widget",
    category: "Guide",
    categoryColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "How to add a free live chat widget to any website in 5 minutes",
    excerpt: "Works with Shopify, WooCommerce, WordPress, Webflow, or raw HTML. No credit card. No time limit. Step-by-step for every platform.",
    date: "Apr 2025",
    readTime: "4 min",
    author: { name: "FloatChat Team", role: "Customer Success · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "Adding live chat to your website used to mean choosing between a cheap tool with awful UX and an expensive tool with great UX. FloatChat is free forever on the core plan — and takes 5 minutes to set up on any platform.",
      },
      {
        heading: "Step 1: Create your account",
        body: "Go to floatchat.com and click 'Start Free'. No credit card required. Your account is live in 30 seconds. You'll land in the FloatChat dashboard automatically.",
      },
      {
        heading: "Step 2: Copy your embed code",
        body: "In the dashboard, navigate to Settings → Widget → Embed Code. You'll see a single-line JavaScript snippet. Copy it.",
      },
      {
        heading: "Step 3a: Add to Shopify",
        body: "In Shopify admin, go to Online Store → Themes → Edit Code → theme.liquid. Paste the FloatChat snippet just before the closing </body> tag. Save. Your widget is live on all pages instantly.",
      },
      {
        heading: "Step 3b: Add to WordPress",
        body: "Install any 'Header and Footer Scripts' plugin (or use your theme's custom scripts section). Paste the FloatChat snippet in the footer scripts field. Alternatively, use the FloatChat WordPress plugin — it adds the widget automatically without touching code.",
      },
      {
        heading: "Step 3c: Add to Webflow",
        body: "In Webflow, go to Project Settings → Custom Code → Footer Code. Paste the snippet. Publish your site. Done.",
      },
      {
        heading: "Step 3d: Raw HTML",
        body: "Open your HTML file and paste the snippet before </body>. Works on any static site, Next.js, Nuxt, or custom framework.",
      },
      {
        heading: "Customise the widget",
        body: "Back in the FloatChat dashboard, use the Widget tab to set your brand colour, launcher icon, greeting message, and operating hours. Changes apply in real time — no re-publishing needed.",
      },
    ],
  },
  {
    slug: "whatsapp-customer-service",
    category: "Guide",
    categoryColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "WhatsApp for customer service: everything US businesses need to know",
    excerpt: "Two-way WhatsApp conversations without a Business API bill. What's included, what's not, and how to set it up in FloatChat.",
    date: "Mar 2025",
    readTime: "6 min",
    author: { name: "FloatChat Team", role: "Partnerships · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "WhatsApp has 2 billion monthly active users. In the US, adoption is growing fast — especially among younger demographics and immigrant communities. For customer support teams, it's quickly becoming a channel they can't ignore. The problem: setting up WhatsApp Business API has historically been complicated and expensive.",
      },
      {
        heading: "WhatsApp Business vs WhatsApp Business API",
        body: "The free WhatsApp Business app is for sole traders — one device, one user, no integrations. WhatsApp Business API is what you need for a customer support team: multiple agents, CRM integration, automated replies. It requires going through a Meta Business Solution Provider (BSP). FloatChat is a Meta Business Partner and handles the API setup for you.",
      },
      {
        heading: "What's included in FloatChat's WhatsApp integration",
        body: "On every FloatChat plan (including free), you get two-way WhatsApp messaging in the unified inbox. Your agents see WhatsApp alongside live chat, email, and SMS in one screen. On Lite and above, AI Captain can auto-reply to WhatsApp messages using your knowledge base.",
      },
      {
        heading: "WhatsApp messaging costs explained",
        body: "Meta charges per conversation (24-hour window), not per message. Rates vary by category: service conversations (customer-initiated) are cheaper than marketing conversations (business-initiated). FloatChat passes through Meta's costs at cost — we don't mark up messaging fees.",
      },
      {
        heading: "How to set up WhatsApp in FloatChat",
        body: "1. In FloatChat dashboard, go to Channels → WhatsApp. 2. Click 'Connect WhatsApp Business'. 3. Log in with your Facebook Business Manager account. 4. Follow the Meta verification flow (usually 24-48 hours for new numbers). 5. Once approved, your WhatsApp number is live in your inbox.",
      },
      {
        heading: "What to watch out for",
        body: "WhatsApp has a 24-hour messaging window: once a customer starts a conversation, you can reply freely for 24 hours. After that, you can only send pre-approved template messages. Always make sure customers are initiating the conversation first, or use approved templates for outbound.",
      },
    ],
  },
  {
    slug: "switch-from-zendesk",
    category: "Migration",
    categoryColor: "bg-orange-100 text-orange-700 border-orange-200",
    title: "How to migrate from Zendesk to FloatChat in 48 hours",
    excerpt: "We export your Zendesk data, import it to FloatChat, train Captain on your help docs, and have your team live — for free.",
    date: "Mar 2025",
    readTime: "7 min",
    author: { name: "FloatChat Team", role: "Operations · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "Zendesk is a solid product. It's also $55–$115 per agent per month, has a steep learning curve, and charges extra for every channel beyond email. If you're a small US team that outgrew Tawk but doesn't need Zendesk's enterprise complexity, migrating to FloatChat takes 48 hours and our team does most of it for you.",
      },
      {
        heading: "What gets migrated",
        body: "The FloatChat migration service (free on any paid plan) covers: all Zendesk ticket history and threads, agent accounts and permissions, help center articles, macros and canned responses, tags and custom fields. Contact data is imported as FloatChat contacts.",
      },
      {
        heading: "What doesn't migrate automatically",
        body: "Zendesk-specific features like CSAT surveys (FloatChat has its own), complex SLA rules (you'll recreate these), and Zendesk Marketplace integrations. Our team flags anything needing manual setup on the kickoff call.",
      },
      {
        heading: "The 48-hour migration process",
        body: "Hour 0–2: Kickoff call with a FloatChat migration engineer. Hour 2–24: Automated export and import with a staging environment to review. Hour 24–36: Your team reviews data and tests the inbox. Hour 36–48: DNS changes, widget swap, go-live. Zendesk stays read-only for 30 days as backup.",
      },
      {
        heading: "Training AI Captain on your Zendesk data",
        body: "Your existing ticket history is a goldmine for training. FloatChat ingests your top 500 resolved tickets and help center articles to seed Captain's knowledge base. Most teams reach 40–60% deflection rate within the first week.",
      },
      {
        heading: "Cost comparison",
        body: "A 5-agent team on Zendesk Suite Growth: $89 × 5 = $445/month. The same team on FloatChat Starter + Lite: $29.98/month. Annual saving: ~$4,980. Migration is free. The ROI math is straightforward.",
      },
    ],
  },
  {
    slug: "10dlc-sms-guide",
    category: "Guide",
    categoryColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "10DLC business SMS: the complete US guide",
    excerpt: "10DLC registration, fees, throughput limits, and how FloatChat handles compliance automatically so you don't have to.",
    date: "Feb 2025",
    readTime: "9 min",
    author: { name: "FloatChat Team", role: "Compliance Lead · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "If you're sending business SMS in the US and haven't registered with The Campaign Registry (TCR), your messages are probably being filtered or blocked. 10DLC (10-Digit Long Code) registration became mandatory for business messaging in 2023. Here's everything you need to know.",
      },
      {
        heading: "What is 10DLC?",
        body: "10DLC stands for 10-Digit Long Code — standard US phone numbers used for business A2P (Application-to-Person) messaging. The CTIA mandated that all businesses sending SMS must register their brand and campaigns with TCR to combat spam. Unregistered messages face delivery failures and carrier filtering.",
      },
      {
        heading: "What you need to register",
        body: "Brand registration: your company's legal name, EIN, website, and business type. Campaign registration: the use case for your SMS, sample message content, and opt-in/opt-out confirmation. Registration takes 1–3 days for brand approval and 2–5 days for campaign approval.",
      },
      {
        heading: "10DLC fees",
        body: "The Campaign Registry charges a one-time brand registration fee ($4) and a monthly campaign fee ($10/month for most use cases). Carriers also charge a small per-message surcharge ($0.003–$0.005). FloatChat handles TCR registration on your behalf and passes through fees at cost — no markup.",
      },
      {
        heading: "Throughput limits",
        body: "Registered 10DLC numbers can send 75–225 messages per second depending on your trust score. Unregistered numbers are capped at 1 message per second and face heavy filtering. For high-volume campaigns (10,000+ messages/day), consider a short code — FloatChat supports those too.",
      },
      {
        heading: "How FloatChat handles 10DLC for you",
        body: "When you activate SMS in FloatChat, we guide you through TCR registration in the dashboard. You enter your EIN and business details; we submit on your behalf and notify you when approved. Your number is then fully compliant and ready to send.",
      },
      {
        heading: "Best practices for compliance",
        body: "Always include opt-out instructions in your first message. Never send SMS to numbers that haven't opted in. Keep message content consistent with your registered campaign use case. Avoid sending before 8am or after 9pm in the recipient's timezone. These practices improve deliverability significantly.",
      },
    ],
  },
  {
    slug: "ai-captain-setup",
    category: "Product",
    categoryColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "Setting up AI Captain in 15 minutes",
    excerpt: "Upload your help docs, connect your FAQ, and Captain starts handling 60% of conversations automatically. Step by step.",
    date: "Feb 2025",
    readTime: "5 min",
    author: { name: "FloatChat Team", role: "Support Lead · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "AI Captain is FloatChat's built-in AI agent. It reads your knowledge base, answers customer questions instantly, handles order lookups via integrations, and hands off to a human agent when it can't help. Here's how to get it live in 15 minutes.",
      },
      {
        heading: "Step 1: Upgrade to Lite",
        body: "AI Captain is available on the Lite plan ($9.99/month) and above. If you're on the Free plan, go to Settings → Plan and upgrade. No credit card is needed during the free trial period.",
      },
      {
        heading: "Step 2: Add your knowledge base",
        body: "Navigate to AI Captain → Knowledge Base. Add content three ways: (1) paste your FAQ URL and Captain crawls it automatically, (2) upload PDF or DOCX files, or (3) type Q&A pairs directly. Start with your 20 most common support questions — that typically covers 60% of incoming conversations.",
      },
      {
        heading: "Step 3: Set Captain's persona",
        body: "In AI Captain → Settings, give Captain a name and set its tone (friendly, professional, concise). Add your company name, product name, and any brand-specific language to avoid. Captain uses this to stay on-brand in every reply.",
      },
      {
        heading: "Step 4: Configure handoff rules",
        body: "Set conditions for escalation to a human: (1) low confidence answers, (2) explicit customer requests for a human, or (3) specific keywords like 'refund' or 'cancel'. Go to AI Captain → Handoff Rules. We recommend starting with a 70% confidence threshold.",
      },
      {
        heading: "Step 5: Test before going live",
        body: "Use the Captain Simulator in the dashboard. Type your 10 most common questions and review the responses. Edit knowledge base entries for any wrong answers. Once you're happy, toggle Captain ON in AI Captain → Channels.",
      },
      {
        heading: "What to expect in the first week",
        body: "Most teams see 40–50% deflection rate in week one, rising to 55–65% after two weeks of refinement. Captain learns from flagged conversations — when your agents mark a reply as 'wrong', it improves. Check Analytics daily for the first two weeks to spot knowledge base gaps.",
      },
    ],
  },
  {
    slug: "ecommerce-support-playbook",
    category: "Guide",
    categoryColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "The e-commerce support playbook: WISMO, returns, and order chaos",
    excerpt: "How Shopify and WooCommerce teams use FloatChat to resolve WISMO tickets without a single agent touching them.",
    date: "Jan 2025",
    readTime: "8 min",
    author: { name: "FloatChat Team", role: "E-commerce Specialist · FloatChat", avatar: "/placeholder-user.jpg" },
    sections: [
      {
        body: "E-commerce support has a dirty secret: 40–60% of all tickets are WISMO (Where Is My Order?). These tickets are repetitive, low-value, and completely automatable. Yet most e-commerce teams still have agents copy-pasting tracking numbers all day. Here's the playbook for eliminating WISMO tickets.",
      },
      {
        heading: "WISMO: automate it completely",
        body: "FloatChat's Shopify integration pulls order data in real time. When a customer asks 'Where is my order?', AI Captain looks up their order by email or order number, retrieves the tracking status from your carrier (FedEx, UPS, USPS), and replies with the exact status. No agent needed. This single automation typically eliminates 35–40% of support volume overnight.",
      },
      {
        heading: "Setting up order lookup",
        body: "Go to Integrations → Shopify (or WooCommerce) and connect your store. Once connected, Captain automatically has access to order data. In AI Captain → Knowledge Base, add: 'For order status questions, look up by email or order number and provide tracking information.' Captain does the rest.",
      },
      {
        heading: "Returns and exchanges",
        body: "Returns are the second-biggest e-commerce support category. FloatChat handles them two ways: (1) Captain walks customers through your return policy and generates a return label link automatically, or (2) Captain collects return request details and creates a ticket for an agent to process. Configure this in AI Captain → Workflows → Returns.",
      },
      {
        heading: "Peak season playbook",
        body: "BFCM spikes support volume 5–10x. Prepare: (1) Update Captain's knowledge base with holiday-specific FAQs two weeks before. (2) Set after-hours auto-replies with realistic response time expectations. (3) Create pinned conversation templates for 'package delayed'. (4) Set escalation rules to prioritise high-value customers.",
      },
      {
        heading: "Proactive support with WhatsApp",
        body: "The best WISMO reduction strategy is sending proactive shipping updates before customers ask. FloatChat can trigger WhatsApp or SMS notifications at key shipment events: order confirmed, shipped, out for delivery, delivered. Teams that implement proactive updates see WISMO volume drop by 70%.",
      },
      {
        heading: "Measuring success",
        body: "Track these four metrics weekly: (1) AI deflection rate (target: 55%+), (2) First response time (target: <2 minutes), (3) CSAT score (target: 90%+), (4) Tickets per order (target: <8%). FloatChat's Analytics dashboard shows all four. Most Shopify teams reach targets within 30 days.",
      },
    ],
  },
]

/* ── Related posts ────────────────────────────────────────── */

function getRelated(current: Post): Post[] {
  const sameCategory = posts.filter(p => p.slug !== current.slug && p.category === current.category)
  const other = posts.filter(p => p.slug !== current.slug && p.category !== current.category)
  return [...sameCategory, ...other].slice(0, 3)
}

/* ── Page ─────────────────────────────────────────────────── */

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)
  const [activeId, setActiveId] = useState("")
  const observerRef = useRef<IntersectionObserver | null>(null)
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | FloatChat Blog`
      const desc = document.querySelector('meta[name="description"]')
      if (desc) desc.setAttribute("content", post.excerpt)
    }
  }, [post])

  useEffect(() => {
    if (!post) return
    const headingIds = post.sections.filter(s => s.heading).map(s => toId(s.heading!))
    observerRef.current?.disconnect()
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 }
    )
    headingIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [post])

  function scrollTo(heading: string) {
    const el = document.getElementById(toId(heading))
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Article not found</h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">This article doesn't exist or may have moved.</p>
            <Button asChild size="lg">
              <Link to="/blog">Browse all articles</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const related = getRelated(post)

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">

        {/* ── Hero banner ── */}
        <section className="bg-gradient-to-b from-muted/40 to-background border-b border-border">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12 lg:py-20">

            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
            >
              <Link to="/blog" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group">
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Blog
              </Link>
              <span>/</span>
              <Link
                to="/blog"
                state={{ category: post.category }}
                className="text-foreground hover:text-primary transition-colors truncate max-w-xs"
              >
                {post.category}
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mb-5"
            >
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${post.categoryColor}`}>
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight text-balance mb-5"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl"
            >
              {post.excerpt}
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              {/* Author + date */}
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{post.author.role}</p>
                </div>
                <div className="flex items-center gap-4 ml-4 text-sm text-muted-foreground border-l border-border pl-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime} read
                  </span>
                </div>
              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-2 hover:bg-muted transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </motion.div>
          </div>
        </section>

        {/* ── Article body ── */}
        <section className="py-12 lg:py-20">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-16 items-start">

              {/* Content */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {post.sections.map((section, i) => (
                  <div key={i} className={i > 0 ? "mt-10" : ""}>
                    {section.heading && (
                      <h2
                        id={toId(section.heading)}
                        className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-snug scroll-mt-28"
                      >
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-base text-foreground/75 leading-[1.85] tracking-[0.01em]">
                      {section.body}
                    </p>
                  </div>
                ))}

                {/* Divider */}
                <div className="my-14 border-t border-border" />

                {/* CTA box */}
                <div className="rounded-2xl border border-primary/25 bg-primary/5 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Ready to switch?</p>
                  <h3 className="text-xl font-bold text-foreground mb-2">Try FloatChat free</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    Free plan forever. No credit card. Live chat, email, and WhatsApp in one inbox — live in 5 minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                      <Link to="/signup?plan=free">Start Free</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <Link to="/demo">Book a Demo</Link>
                    </Button>
                  </div>
                </div>
              </motion.article>

              {/* Sidebar — Table of contents */}
              <motion.aside
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="hidden lg:block sticky top-28"
              >
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">In this article</p>
                  <nav className="space-y-1">
                    {post.sections.filter(s => s.heading).map((s, i) => {
                      const id = toId(s.heading!)
                      const isActive = activeId === id
                      return (
                        <button
                          key={i}
                          onClick={() => scrollTo(s.heading!)}
                          className={`w-full flex items-start gap-2.5 text-left rounded-lg px-2 py-1.5 transition-all duration-200 group ${
                            isActive
                              ? "bg-primary/8 text-primary"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className={`mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                            isActive ? "bg-primary" : "bg-border group-hover:bg-primary/50"
                          }`} />
                          <span className="text-sm leading-snug">{s.heading}</span>
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* Quick facts */}
                <div className="mt-4 rounded-2xl border border-border bg-card p-5 space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick facts</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <Link
                        to="/blog"
                        state={{ category: post.category }}
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold border hover:opacity-80 transition-opacity ${post.categoryColor}`}
                      >
                        {post.category}
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Published</span>
                      <span className="font-medium text-foreground">{post.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Read time</span>
                      <span className="font-medium text-foreground">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className="py-16 lg:py-24 border-t border-border bg-muted/20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-foreground">More articles</h2>
                <Link
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link
                      to={`/blog/${p.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-card p-5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full"
                    >
                      <span className={`self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-3 ${p.categoryColor}`}>
                        {p.category}
                      </span>
                      <h3 className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors flex-1 mb-3">
                        {p.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.date} · {p.readTime}</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  )
}
