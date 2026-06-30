"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, MessageSquare, Bot, Inbox, Phone, MessageCircle, Mail, HelpCircle, Zap, Puzzle, ShoppingCart, Building2, Heart, Home, GraduationCap, UtensilsCrossed, BarChart3, BookOpen, Users, FileText, Activity, Layers, Sparkles, Wand2, Headset, ShoppingBag, CalendarClock, Filter, Boxes } from "lucide-react"
import { BreadcrumbSchema } from "@/components/json-ld"

const productGroups = [
  {
    heading: "AI",
    items: [
      { name: "Agentic AI", href: "/agentic-ai", icon: Sparkles, desc: "Takes action, not just answers", tileBg: "bg-blue-50", tileRing: "ring-blue-100", iconColor: "text-blue-600", badge: "New" },
      { name: "AI Agent", href: "/ai-agent", icon: Bot, desc: "Captain resolves 60% of chats", tileBg: "bg-blue-50", tileRing: "ring-blue-100", iconColor: "text-blue-600", badge: "Flagship" },
      { name: "Agent Copilot", href: "/products/agent-copilot", icon: Wand2, desc: "AI inside the reply box", tileBg: "bg-violet-50", tileRing: "ring-violet-100", iconColor: "text-violet-600" },
    ],
  },
  {
    heading: "AI agents",
    items: [
      { name: "Customer Service", href: "/ai-agents/customer-service", icon: Headset, desc: "Deflect & resolve tickets", tileBg: "bg-sky-50", tileRing: "ring-sky-100", iconColor: "text-sky-600" },
      { name: "Sales", href: "/ai-agents/sales", icon: ShoppingBag, desc: "Turn chats into orders", tileBg: "bg-emerald-50", tileRing: "ring-emerald-100", iconColor: "text-emerald-600" },
      { name: "Booking", href: "/ai-agents/booking", icon: CalendarClock, desc: "Fill your calendar", tileBg: "bg-violet-50", tileRing: "ring-violet-100", iconColor: "text-violet-600" },
      { name: "Lead Qualification", href: "/ai-agents/lead-qualification", icon: Filter, desc: "Score & route leads", tileBg: "bg-rose-50", tileRing: "ring-rose-100", iconColor: "text-rose-600" },
      { name: "Agent Builder", href: "/ai-agents/agent-builder", icon: Boxes, desc: "Build agents, no code", tileBg: "bg-cyan-50", tileRing: "ring-cyan-100", iconColor: "text-cyan-600" },
    ],
  },
  {
    heading: "Channels",
    items: [
      { name: "Omnichannel Inbox", href: "/products/omnichannel-inbox", icon: Layers, desc: "7 channels, one inbox", tileBg: "bg-indigo-50", tileRing: "ring-indigo-100", iconColor: "text-indigo-600" },
      { name: "Live Chat", href: "/live-chat", icon: MessageSquare, desc: "Free widget in 5 min", tileBg: "bg-sky-50", tileRing: "ring-sky-100", iconColor: "text-sky-600" },
      { name: "Inbox", href: "/inbox", icon: Inbox, desc: "10 channels, one screen", tileBg: "bg-blue-50", tileRing: "ring-blue-100", iconColor: "text-blue-600" },
      { name: "Voice", href: "/voice", icon: Phone, desc: "US numbers from $5/mo", tileBg: "bg-cyan-50", tileRing: "ring-cyan-100", iconColor: "text-cyan-600" },
      { name: "SMS", href: "/sms", icon: MessageCircle, desc: "$0.005 per segment", tileBg: "bg-violet-50", tileRing: "ring-violet-100", iconColor: "text-violet-600" },
      { name: "Email", href: "/email", icon: Mail, desc: "Shared team inbox", tileBg: "bg-rose-50", tileRing: "ring-rose-100", iconColor: "text-rose-600" },
      { name: "WhatsApp", href: "/whatsapp", icon: MessageCircle, desc: "Two-way, free on every plan", tileBg: "bg-emerald-50", tileRing: "ring-emerald-100", iconColor: "text-emerald-600" },
    ],
  },
  {
    heading: "Platform",
    items: [
      { name: "Analytics", href: "/products/analytics", icon: BarChart3, desc: "Dashboards & insights", tileBg: "bg-blue-50", tileRing: "ring-blue-100", iconColor: "text-blue-600" },
      { name: "Automation", href: "/automation", icon: Zap, desc: "Auto Reply from $9.99", tileBg: "bg-amber-50", tileRing: "ring-amber-100", iconColor: "text-amber-600" },
      { name: "Integrations", href: "/integrations", icon: Puzzle, desc: "Shopify, Slack, HubSpot +30", tileBg: "bg-purple-50", tileRing: "ring-purple-100", iconColor: "text-purple-600" },
      { name: "Help Center", href: "/help-center", icon: HelpCircle, desc: "SEO-friendly knowledge base", tileBg: "bg-teal-50", tileRing: "ring-teal-100", iconColor: "text-teal-600" },
    ],
  },
]

// Flattened list for the mobile drawer.
const productLinks = productGroups.flatMap((g) => g.items)

const solutionLinks = [
  {
    name: "E-commerce / D2C",
    href: "/solutions/ecommerce",
    icon: ShoppingCart,
    desc: "Shopify, BigCommerce, WooCommerce",
    tileBg: "bg-rose-50",
    tileRing: "ring-rose-100",
    iconColor: "text-rose-600",
  },
  {
    name: "SaaS / B2B",
    href: "/solutions/saas",
    icon: Building2,
    desc: "Trial conversions and customer success",
    tileBg: "bg-blue-50",
    tileRing: "ring-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Healthcare",
    href: "/solutions/healthcare",
    icon: Heart,
    desc: "HIPAA-aware patient communication",
    tileBg: "bg-emerald-50",
    tileRing: "ring-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Real Estate",
    href: "/solutions/real-estate",
    icon: Home,
    desc: "Lead capture and tour scheduling",
    tileBg: "bg-amber-50",
    tileRing: "ring-amber-100",
    iconColor: "text-amber-600",
  },
  {
    name: "Education",
    href: "/solutions/education",
    icon: GraduationCap,
    desc: "Student and parent support",
    tileBg: "bg-violet-50",
    tileRing: "ring-violet-100",
    iconColor: "text-violet-600",
  },
  {
    name: "Restaurants",
    href: "/solutions/restaurants",
    icon: UtensilsCrossed,
    desc: "Reservations, orders, reviews",
    tileBg: "bg-orange-50",
    tileRing: "ring-orange-100",
    iconColor: "text-orange-600",
  },
]

const resourceLinks = [
  {
    name: "Blog",
    href: "/blog",
    icon: BookOpen,
    desc: "Articles, guides, product updates",
    tileBg: "bg-sky-50",
    tileRing: "ring-sky-100",
    iconColor: "text-sky-600",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    desc: "Real stories from FloatChat teams",
    tileBg: "bg-rose-50",
    tileRing: "ring-rose-100",
    iconColor: "text-rose-600",
  },
  {
    name: "Help Center",
    href: "/help",
    icon: HelpCircle,
    desc: "Self-serve docs for everything",
    tileBg: "bg-teal-50",
    tileRing: "ring-teal-100",
    iconColor: "text-teal-600",
  },
  {
    name: "Docs",
    href: "/docs",
    icon: FileText,
    desc: "Developer guides and API reference",
    tileBg: "bg-indigo-50",
    tileRing: "ring-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    name: "Status",
    href: "/status",
    icon: Activity,
    desc: "Live uptime and incidents",
    tileBg: "bg-emerald-50",
    tileRing: "ring-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Changelog",
    href: "/changelog",
    icon: Layers,
    desc: "What shipped this week",
    tileBg: "bg-purple-50",
    tileRing: "ring-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "About Us",
    href: "/about-us",
    icon: Building2,
    desc: "Our mission and the platform",
    tileBg: "bg-blue-50",
    tileRing: "ring-blue-100",
    iconColor: "text-blue-600",
  },
]

type DropdownKey = "product" | "solutions" | "resources" | null

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(key)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4">
      {/* Auto-emitted breadcrumb schema for every non-home page. Invisible. */}
      <BreadcrumbSchema />

      <a href="#main-content" className="skip-to-main">Skip to main content</a>

      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-5 lg:px-6 py-3 rounded-2xl transition-colors duration-300 ${
          scrolled
            ? "border border-slate-200/70 bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(15,42,74,0.15)]"
            : "border border-white/40 bg-white/50 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0" aria-label="FloatChat home">
          <img src="/logo_floatchat.svg" alt="FloatChat" width="2559" height="581" className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {/* Product */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("product")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeDropdown === "product" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              aria-haspopup="true"
              aria-expanded={activeDropdown === "product"}
            >
              Product
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "product" ? "rotate-180" : ""}`} />
            </button>
            {/* Always rendered (toggled with CSS) so the menu links are in the
                prerendered HTML and crawlable by search engines. */}
            <div
                className={`fixed top-[78px] left-1/2 -translate-x-1/2 w-[940px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)] p-5 overflow-hidden ${activeDropdown === "product" ? "" : "hidden"}`}
                onMouseEnter={() => openDropdown("product")}
                onMouseLeave={scheduleClose}
              >
                {/* Top hairline gradient */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #93C5FD 30%, #C4B5FD 60%, transparent)",
                  }}
                />

                {/* Section eyebrow */}
                <div className="flex items-center justify-between px-2 pt-1 pb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">/ 01</span>
                    <span className="h-px w-6 bg-slate-300" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                      Product
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">The whole platform</span>
                </div>

                {/* Grouped columns */}
                <div className="grid grid-cols-4 gap-x-3">
                  {productGroups.map((group) => (
                    <div key={group.heading} className="min-w-0">
                      <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                        {group.heading}
                      </p>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="group flex items-start gap-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          >
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tileBg} ring-1 ${item.tileRing} group-hover:scale-105 transition-transform duration-300`}
                            >
                              <item.icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2.25} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="text-[14px] font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
                                  {item.name}
                                </p>
                                {item.badge && (
                                  <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-700">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-3 mx-2 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="text-[12px] text-slate-500">
                    Not sure which to pick?
                  </p>
                  <Link
                    to="/demo"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1D4ED8] hover:gap-1.5 transition-all"
                  >
                    Book a demo
                    <ChevronDown className="h-3 w-3 -rotate-90" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
          </div>

          {/* Solutions */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("solutions")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeDropdown === "solutions" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              aria-haspopup="true"
              aria-expanded={activeDropdown === "solutions"}
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
            </button>
            <div
                className={`fixed top-[78px] left-1/2 -translate-x-1/2 w-[640px] rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)] p-4 overflow-hidden ${activeDropdown === "solutions" ? "" : "hidden"}`}
                onMouseEnter={() => openDropdown("solutions")}
                onMouseLeave={scheduleClose}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #FBCFE8 30%, #C4B5FD 60%, transparent)",
                  }}
                />
                <div className="flex items-center justify-between px-3 pt-1 pb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">/ 02</span>
                    <span className="h-px w-6 bg-slate-300" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                      Solutions
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">By industry</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-start gap-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tileBg} ring-1 ${item.tileRing} group-hover:scale-105 transition-transform duration-300`}
                      >
                        <item.icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2.25} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 mx-2 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="text-[12px] text-slate-500">
                    Don't see your industry?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1D4ED8] hover:gap-1.5 transition-all"
                  >
                    Talk to us
                    <ChevronDown className="h-3 w-3 -rotate-90" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
          </div>

          {/* Pricing */}
          <Link
            to="/pricing"
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
          >
            Pricing
          </Link>

          {/* Resources */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("resources")}
            onMouseLeave={scheduleClose}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeDropdown === "resources" ? "text-foreground bg-accent" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
              aria-haspopup="true"
              aria-expanded={activeDropdown === "resources"}
            >
              Resources
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            <div
                className={`fixed top-[78px] left-1/2 -translate-x-1/2 w-[640px] rounded-2xl border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,42,74,0.35)] p-4 overflow-hidden ${activeDropdown === "resources" ? "" : "hidden"}`}
                onMouseEnter={() => openDropdown("resources")}
                onMouseLeave={scheduleClose}
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #A5F3FC 30%, #93C5FD 60%, transparent)",
                  }}
                />
                <div className="flex items-center justify-between px-3 pt-1 pb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">/ 03</span>
                    <span className="h-px w-6 bg-slate-300" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3B82F6]">
                      Resources
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Learn & build</span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="group flex items-start gap-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tileBg} ring-1 ${item.tileRing} group-hover:scale-105 transition-transform duration-300`}
                      >
                        <item.icon className={`h-4 w-4 ${item.iconColor}`} strokeWidth={2.25} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#0F2A4A] group-hover:text-[#1D4ED8] transition-colors leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[12px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 mx-2 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <p className="text-[12px] text-slate-500">
                    Need a hand getting started?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#1D4ED8] hover:gap-1.5 transition-all"
                  >
                    Talk to us
                    <ChevronDown className="h-3 w-3 -rotate-90" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
          </div>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-[#0F2A4A] hover:bg-slate-100/80 rounded-full px-4">
            <Link to="/login">Log in</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden -m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl overflow-y-auto max-h-[80vh]">
          <div className="px-6 py-4 space-y-1">
            {/* Product accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground"
                onClick={() => setMobileExpanded(mobileExpanded === "product" ? null : "product")}
              >
                Product
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "product" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "product" && (
                <div className="pl-3 space-y-1 mt-1">
                  {productLinks.map((item) => (
                    <Link key={item.name} to={item.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground"
                onClick={() => setMobileExpanded(mobileExpanded === "solutions" ? null : "solutions")}
              >
                Solutions
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "solutions" && (
                <div className="pl-3 space-y-1 mt-1">
                  {solutionLinks.map((item) => (
                    <Link key={item.name} to={item.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/pricing" className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>

            {/* Resources accordion */}
            <div>
              <button
                className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground"
                onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "resources" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "resources" && (
                <div className="pl-3 space-y-1 mt-1">
                  {resourceLinks.map((item) => (
                    <Link key={item.name} to={item.href} className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex flex-col gap-2 border-t border-border">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
