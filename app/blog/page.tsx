"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { toast } from "sonner"

const posts = [
  {
    slug: "floatchat-vs-intercom",
    category: "Comparison",
    title: "FloatChat vs Intercom: The Honest Comparison (2025)",
    excerpt: "Intercom starts at $29/seat. FloatChat is free forever. We break down exactly what you get at each price point.",
    date: "May 2025",
    readTime: "8 min",
  },
  {
    slug: "ai-customer-support-bundled",
    category: "Product",
    title: "Why bundled AI beats per-resolution pricing",
    excerpt: "At 5,000 resolutions/month, Intercom Fin costs $4,950. FloatChat Pro costs $189. Here's the math.",
    date: "Apr 2025",
    readTime: "5 min",
  },
  {
    slug: "free-live-chat-widget",
    category: "Guide",
    title: "How to add a free live chat widget to any website in 5 minutes",
    excerpt: "Works with Shopify, WooCommerce, WordPress, Webflow, or raw HTML. No credit card. No time limit.",
    date: "Apr 2025",
    readTime: "4 min",
  },
  {
    slug: "whatsapp-customer-service",
    category: "Guide",
    title: "WhatsApp for customer service: everything US businesses need to know",
    excerpt: "Two-way WhatsApp conversations without a Business API bill. What's included, what's not, and how to set it up.",
    date: "Mar 2025",
    readTime: "6 min",
  },
  {
    slug: "switch-from-zendesk",
    category: "Migration",
    title: "How to migrate from Zendesk to FloatChat in 48 hours",
    excerpt: "We export your Zendesk data, import it to FloatChat, train Captain on your help docs, and have your team live.",
    date: "Mar 2025",
    readTime: "7 min",
  },
  {
    slug: "10dlc-sms-guide",
    category: "Guide",
    title: "10DLC business SMS: the complete US guide",
    excerpt: "10DLC registration, fees, throughput limits, and how FloatChat handles compliance for you.",
    date: "Feb 2025",
    readTime: "9 min",
  },
  {
    slug: "ai-captain-setup",
    category: "Product",
    title: "Setting up AI Captain in 15 minutes",
    excerpt: "Upload your help docs, connect your FAQ, and Captain starts handling 60% of conversations. Step by step.",
    date: "Feb 2025",
    readTime: "5 min",
  },
  {
    slug: "ecommerce-support-playbook",
    category: "Guide",
    title: "The e-commerce support playbook: WISMO, returns, and order chaos",
    excerpt: "How Shopify and WooCommerce teams use FloatChat to resolve WISMO tickets without agents.",
    date: "Jan 2025",
    readTime: "8 min",
  },
]

const categories = ["All", "Comparison", "Product", "Guide", "Migration"]

export default function BlogPage() {
  const location = useLocation()
  const initialCategory = (location.state as { category?: string } | null)?.category ?? "All"
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [email, setEmail] = useState("")
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    document.title = "Blog — Customer Support Guides & Product Updates | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "Guides, comparisons, and product updates from the FloatChat team.")
  }, [])

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }
    setSubscribing(true)
    setTimeout(() => {
      setSubscribing(false)
      setEmail("")
      toast.success("You're subscribed! We'll send you new articles weekly.")
    }, 1000)
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Blog</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Guides, comparisons, and product updates. Written for US customer support teams.
              </p>
            </motion.div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mt-8">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Badge
                    variant={activeCategory === cat ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/20 transition-colors px-4 py-1 text-sm select-none"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className="ml-1.5 opacity-60 text-[10px]">
                        {posts.filter(p => p.category === cat).length}
                      </span>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured post */}
        <AnimatePresence mode="wait">
          {featured && (
            <section className="pb-8 lg:pb-12" key={`featured-${featured.slug}`}>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="group block rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg transition-all duration-300 p-8 lg:p-12"
                  >
                    <Badge className="mb-4">{featured.category}</Badge>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 text-balance group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-2xl">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{featured.date} · {featured.readTime} read</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
                        Read article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </section>
          )}
        </AnimatePresence>

        {/* Post grid */}
        <section className="py-8 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {rest.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {rest.map((post, i) => (
                    <BlurFade key={post.slug} delay={i * 0.06}>
                      <Link to={`/blog/${post.slug}`} className="group block rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <Badge variant="secondary" className="mb-3 text-xs w-fit">{post.category}</Badge>
                        <h3 className="font-semibold text-foreground mb-2 text-balance leading-snug group-hover:text-primary transition-colors flex-1">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </Link>
                    </BlurFade>
                  ))}
                </motion.div>
              ) : featured ? null : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-muted-foreground"
                >
                  No articles in this category yet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-xl text-center"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Stay updated</h2>
              <p className="text-muted-foreground mb-6">One email per week. New guides, comparison updates, and product news.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" disabled={subscribing}>
                  {subscribing ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
