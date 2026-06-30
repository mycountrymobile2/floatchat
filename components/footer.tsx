"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowRight, ShieldCheck, Lock, Globe2 } from "lucide-react"

const footerLinks = {
  Platform: [
    { name: "AI Agent", href: "/ai-agent" },
    { name: "Agentic AI", href: "/agentic-ai" },
    { name: "Inbox", href: "/inbox" },
    { name: "Omnichannel Inbox", href: "/products/omnichannel-inbox" },
    { name: "Agent Copilot", href: "/products/agent-copilot" },
    { name: "Analytics", href: "/products/analytics" },
    { name: "Automation", href: "/automation" },
    { name: "Help Center", href: "/help-center" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
    { name: "Compare", href: "/compare" },
  ],
  Channels: [
    { name: "Live Chat", href: "/live-chat" },
    { name: "Voice", href: "/voice" },
    { name: "SMS", href: "/sms" },
    { name: "Email", href: "/email" },
    { name: "WhatsApp", href: "/whatsapp" },
  ],
  Solutions: [
    { name: "E-commerce", href: "/solutions/ecommerce" },
    { name: "SaaS / B2B", href: "/solutions/saas" },
    { name: "Healthcare", href: "/solutions/healthcare" },
    { name: "Real Estate", href: "/solutions/real-estate" },
    { name: "Education", href: "/solutions/education" },
    { name: "Restaurants", href: "/solutions/restaurants" },
  ],
  Resources: [
    { name: "Help Center", href: "/help" },
    { name: "Developer Docs", href: "/docs" },
    { name: "Changelog", href: "/changelog" },
    { name: "Status", href: "/status" },
    { name: "Templates", href: "/templates" },
    { name: "Blog", href: "/blog" },
    { name: "Customers", href: "/customers" },
  ],
  Company: [
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
    { name: "Trust & Security", href: "/trust" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "DPA", href: "/dpa" },
    { name: "Sub-processors", href: "/subprocessors" },
    { name: "Accessibility", href: "/accessibility" },
  ],
}

const complianceBadges = [
  { label: "SOC 2 Type II", Icon: ShieldCheck },
  { label: "GDPR + CCPA", Icon: Lock },
  { label: "DigitalOcean NYC3", Icon: Globe2 },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Signup failed")
      }
      toast.success("You're on the list.", { description: "We'll send updates your way." })
      setEmail("")
    } catch {
      toast.error("Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-[#06101F] text-white overflow-hidden" aria-label="Site footer">
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/3 h-72 w-72 rounded-full bg-[#1D4ED8]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-6 lg:px-8">

        {/* Top: brand + newsletter — compact */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 pb-10 border-b border-white/10">
          {/* Brand block */}
          <div>
            <Link to="/" className="inline-flex items-center mb-3" aria-label="FloatChat home">
              <img
                src="/floatchat-logo-white.png"
                alt="FloatChat"
                className="h-12 w-auto"
                width="240"
                height="78"
                loading="lazy"
              />
            </Link>

            <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-4">
              Free customer support inbox with AI from $9.99. Every channel, every workflow, no per-seat tax.
            </p>

            {/* Compliance badges row */}
            <div className="flex flex-wrap gap-1.5">
              {complianceBadges.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 px-2.5 py-1 text-[11px] text-white/70"
                >
                  <Icon className="h-3 w-3 text-[#60A5FA]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter card — compact */}
          <div className="rounded-xl bg-white/[0.03] ring-1 ring-white/10 p-5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#60A5FA]">Newsletter</span>
            </div>
            <h3 className="text-base font-semibold mb-1">Build a better support stack.</h3>
            <p className="text-xs text-white/55 mb-4 leading-relaxed">
              Pricing changes, new channels, AI updates. Twice a month, no spam.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2" aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <Input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 min-w-0 h-9 bg-white/[0.05] border-white/15 text-white placeholder:text-white/40 focus-visible:ring-[#60A5FA]/40 focus-visible:border-[#60A5FA]/40 text-sm"
                aria-label="Email for newsletter"
              />
              <Button
                type="submit"
                size="sm"
                disabled={submitting}
                className="shrink-0 h-9 gap-1 bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                {submitting ? "..." : <><span>Subscribe</span><ArrowRight className="h-3 w-3" /></>}
              </Button>
            </form>
          </div>
        </div>

        {/* Link columns — 5 balanced */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 mt-10">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA] mb-3">
                {category}
              </h3>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-white/65 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} FloatChat, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-white/50">
            <Link to="/cookies" className="hover:text-white/80 transition-colors">Cookies</Link>
            <span className="text-white/20">•</span>
            <Link to="/aup" className="hover:text-white/80 transition-colors">Acceptable Use</Link>
            <span className="text-white/20">•</span>
            <Link to="/status" className="hover:text-white/80 transition-colors inline-flex items-center gap-1.5">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              All systems operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
