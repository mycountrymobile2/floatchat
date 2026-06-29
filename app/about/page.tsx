import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Check,
  X,
  Shield,
  Lock,
  Globe,
  Mail,
  HeadphonesIcon,
  Newspaper,
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  Code2,
} from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"
import { NumberTicker } from "@/components/ui/number-ticker"
import { InlineCTA } from "@/components/inline-cta"
import { usePageMeta } from "@/hooks/use-page-meta"

export const metadata = {
  title: 'About FloatChat | Built for US Customer Support Teams',
  description: 'FloatChat is a US customer support platform built on the open-source Chatwoot foundation. Hosted on DigitalOcean NYC3 (New York metro). Capacity pricing, AI bundled, voice + SMS native.',
  alternates: { canonical: 'https://floatchat.com/about' },
}

const offers = [
  "Live chat widget on Free",
  "Email inbox on Free",
  "WhatsApp two-way customer service on Free",
  "AI Chatbot + Auto Reply + API on Lite ($9.99)",
  "All 10 channels (voice, SMS, Instagram, Messenger, Telegram, Line, TikTok) on Starter ($19.99)",
  "SSO, RBAC, audit logs on Pro ($189)",
  "HIPAA option, custom integrations on Enterprise ($599)",
]

const nonOffers = [
  "No whitelabel resale",
  "No custom domain (Help Center stays on FloatChat URL)",
  "No mobile app (web app only)",
  "No WhatsApp Business API (BSP). Two-way customer service only",
  "No advanced PBX features (IVR, voicemail, call recording, AI voice bot)",
  "No PCI DSS",
]

const trustCards = [
  {
    Icon: Shield,
    title: "US data residency",
    body: "DigitalOcean NYC3 (New York metro). Multi-AZ redundancy. Your data never leaves the US without your consent.",
  },
  {
    Icon: Lock,
    title: "Encryption",
    body: "TLS 1.3 in transit. AES-256 at rest. Customer data encrypted on disk and in backups.",
  },
  {
    Icon: Check,
    title: "SOC 2 Type II",
    body: "In progress. Target Q4 2026. Quarterly third-party audits along the way.",
  },
  {
    Icon: Shield,
    title: "HIPAA option",
    body: "Available on Enterprise. Healthcare customers get the controls needed for patient communication.",
  },
  {
    Icon: Globe,
    title: "GDPR + CCPA",
    body: "Built into the platform. Iubenda-powered consent banner blocks trackers until users opt in.",
  },
  {
    Icon: Check,
    title: "2FA / MFA",
    body: "Required for all agent accounts on every plan. SSO + SAML on Pro and Enterprise.",
  },
]

export default function AboutPage() {
  usePageMeta(metadata)
  return (
    <>
      <Header />
      <main className="pt-20">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative pt-16 lg:pt-24 pb-12 lg:pb-20 overflow-hidden">
          {/* Brand-blue glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <BlurFade>
                <Badge variant="secondary" className="mb-5 px-3 py-1 text-xs font-medium">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  About FloatChat
                </Badge>
              </BlurFade>

              <BlurFade delay={0.1}>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Built for{" "}
                  <span className="gradient-text">US customer support teams.</span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.2}>
                <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  A multi-channel customer support platform for small and mid-market US teams. Built on the open-source Chatwoot foundation. Hosted on DigitalOcean NYC3 (New York metro).
                </p>
              </BlurFade>

              <BlurFade delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">10 native channels</Badge>
                  <Badge variant="secondary">Capacity pricing</Badge>
                  <Badge variant="secondary">AI bundled</Badge>
                  <Badge variant="secondary">US-hosted</Badge>
                </div>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild className="gap-2">
                    <Link to="/signup?plan=free">
                      Start Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/demo">Talk to Sales</Link>
                  </Button>
                </div>
              </BlurFade>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { value: 10, suffix: "+", label: "Native channels", decimals: 0 },
                { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
                { value: 48, suffix: " hrs", label: "Migration time", decimals: 0 },
              ].map((s, i) => (
                <BlurFade key={s.label} delay={0.4 + i * 0.1}>
                  <div className="rounded-2xl border border-border bg-card p-5 text-center hover:border-primary/30 transition-colors">
                    <p className="text-3xl sm:text-4xl font-bold text-foreground">
                      <NumberTicker
                        value={s.value}
                        suffix={s.suffix}
                        decimalPlaces={s.decimals}
                        delay={0.5 + i * 0.1}
                        className="text-foreground"
                      />
                    </p>
                    <p className="text-xs text-muted-foreground mt-1.5">{s.label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission ─────────────────────────────────────────── */}
        <section className="relative py-16 lg:py-24 bg-muted/30 overflow-hidden">
          {/* Soft brand-blue glow */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Mission
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  Support software shouldn&apos;t be a{" "}
                  <span className="gradient-text">tax on small teams.</span>
                </h2>
                <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                  Most US small businesses can&apos;t afford the incumbents. We rebuilt the math.
                </p>
              </div>
            </BlurFade>

            {/* Price comparison — 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
              <BlurFade delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full opacity-90">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Intercom
                  </p>
                  <p className="text-3xl font-bold text-foreground line-through decoration-red-500/60 decoration-2">
                    $290
                    <span className="text-base font-medium text-muted-foreground no-underline">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">10 agents</p>
                  <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                    + <span className="font-semibold text-foreground">$1,000/mo</span> for AI as a separate add-on
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full opacity-90">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Zendesk
                  </p>
                  <p className="text-3xl font-bold text-foreground line-through decoration-red-500/60 decoration-2">
                    $4,000+
                    <span className="text-base font-medium text-muted-foreground no-underline">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">at 25 agents</p>
                  <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">
                    + per-seat tax that scales linearly with headcount
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.3}>
                <div className="relative rounded-2xl border-2 border-primary bg-card p-6 h-full shadow-lg shadow-primary/10">
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    FloatChat
                  </span>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3 opacity-0">
                    FloatChat
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    from <span className="gradient-text">$9.99</span>
                    <span className="text-base font-medium text-muted-foreground">/mo</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">capacity-priced, not per-seat</p>
                  <p className="mt-4 text-sm text-foreground border-t border-border pt-4 font-medium">
                    AI bundled. Voice + SMS native. No add-ons.
                  </p>
                </div>
              </BlurFade>
            </div>

            {/* Three principles */}
            <BlurFade delay={0.4}>
              <div className="mx-auto max-w-5xl grid sm:grid-cols-3 gap-4">
                {[
                  { title: "Capacity pricing", body: "Pay for conversations, not seats. Add agents without adding cost." },
                  { title: "AI bundled", body: "AI Captain included on every paid plan. No per-resolution fees." },
                  { title: "Voice + SMS native", body: "10DLC SMS and US voice in the same inbox. Not an add-on tier." },
                ].map(({ title, body }) => (
                  <div key={title} className="rounded-xl bg-background border border-border p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Offer / Don't offer — side by side ─────────────── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="text-center mb-12">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  What you get / what you don&apos;t
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Honest scope.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  We&apos;d rather tell you up front than waste your time.
                </p>
              </div>
            </BlurFade>

            <div className="grid lg:grid-cols-2 gap-6">
              <BlurFade delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-4 w-4 text-green-600" />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">What we offer</h3>
                  </div>
                  <ul className="space-y-3">
                    {offers.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 h-full">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
                      <X className="h-4 w-4 text-red-600" />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">What we don&apos;t offer</h3>
                  </div>
                  <ul className="space-y-3">
                    {nonOffers.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 pt-5 border-t border-border text-xs text-muted-foreground">
                    If you need any of those, FloatChat may not be the right fit — and that&apos;s fine.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ── Trust signals ──────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="text-center mb-12">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Trust &amp; Security
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Built on a serious foundation.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                  All the certifications, controls, and residency choices that matter for US, UK, and EU customers.
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {trustCards.map(({ Icon, title, body }, i) => (
                <BlurFade key={title} delay={0.1 + i * 0.05}>
                  <div className="group rounded-2xl border border-border bg-card p-6 h-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </BlurFade>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" asChild className="gap-2">
                <Link to="/trust">
                  See the full Trust &amp; Security page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── Built on Chatwoot ──────────────────────────────── */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0">
                    <Code2 className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-primary mb-2">
                      Foundation
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
                      Built on Chatwoot, tuned for US teams.
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      FloatChat is built on the open-source Chatwoot codebase. We&apos;ve added US-specific features: 10DLC SMS, voice integration with our parent company&apos;s telecom infrastructure, capacity pricing, US compliance, and no whitelabel architecture.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We operate the platform as a managed SaaS for US teams — our pricing, our integrations, our AI Captain training, our infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ── Inline CTA ─────────────────────────────────────── */}
        <section className="px-6 lg:px-8 pb-16 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <InlineCTA />
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BlurFade>
              <div className="text-center mb-12">
                <p className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
                  Talk to us
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  Reach the right team.
                </h2>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { Icon: Mail, title: "Sales", email: "sales@floatchat.com", note: "Reply within 1 business hour, Mon–Fri" },
                { Icon: HeadphonesIcon, title: "Support", email: "support@floatchat.com", note: "Existing customers get priority" },
                { Icon: Newspaper, title: "Press", email: "press@floatchat.com", note: "Media inquiries and interviews" },
              ].map(({ Icon, title, email, note }, i) => (
                <BlurFade key={title} delay={0.1 + i * 0.05}>
                  <a
                    href={`mailto:${email}`}
                    className="group block rounded-2xl border border-border bg-card p-6 h-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-sm text-primary group-hover:underline">{email}</p>
                    <p className="text-xs text-muted-foreground mt-2">{note}</p>
                  </a>
                </BlurFade>
              ))}
            </div>

            {/* Company footer card */}
            <BlurFade delay={0.3}>
              <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">My Country Mobile Pte Ltd</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Singapore Reg. 201535142E</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Registered office</p>
                    <p className="text-xs text-muted-foreground mt-0.5">8 Temasek Boulevard #32-01, Suntec Tower Three, Singapore 038988</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Governing law</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Singapore</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
