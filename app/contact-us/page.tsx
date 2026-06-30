"use client"

import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  MessageSquare,
  PlayCircle,
  Tag,
  GitBranch,
  ShieldCheck,
  Mail,
  Send,
  Sparkles,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlurFade } from "@/components/ui/blur-fade"
import { JsonLd } from "@/components/json-ld"
import { usePageMeta } from "@/hooks/use-page-meta"
import { toast } from "sonner"

/* ─────────────────────────────────────────────────────────────
   Metadata
─────────────────────────────────────────────────────────────── */

export const metadata = {
  title: "Contact FloatChat — Demo, Pricing & Migration | FloatChat",
  description:
    "Book a demo, get pricing, or plan a migration to FloatChat. Talk to our team about agentic AI, channels, and broadcasting for your business.",
}

/* ─────────────────────────────────────────────────────────────
   Contact form schema — matches /api/contact exactly
─────────────────────────────────────────────────────────────── */

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.enum(["sales", "support", "partnership", "press", "other"]),
  message: z.string().min(10, "Please write at least 10 characters"),
})
type FormData = z.infer<typeof schema>

/* ─────────────────────────────────────────────────────────────
   Section eyebrow — matches the rest of the site
─────────────────────────────────────────────────────────────── */

function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="text-[11px] font-mono text-slate-400">/ {num}</span>
      <span className="h-px w-8 bg-slate-300" />
      <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
        {label}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   "How we can help" cards
─────────────────────────────────────────────────────────────── */

const helpCards = [
  {
    Icon: PlayCircle,
    title: "See it live",
    body: "A guided demo of the agentic AI agent, the omnichannel inbox, and broadcasting — running on real scenarios from your business.",
    to: "/agentic-ai",
    linkLabel: "Explore agentic AI",
  },
  {
    Icon: Tag,
    title: "Get pricing",
    body: "A plan sized to your team and your message volume, with the channels and seats you actually need — no guesswork, no surprises.",
    to: "/pricing",
    linkLabel: "See pricing",
  },
  {
    Icon: GitBranch,
    title: "Plan a migration",
    body: "Move from your current AI or messaging stack with a clear plan for channels, contacts, and history — so nothing breaks on the way over.",
    to: "/compare",
    linkLabel: "Compare FloatChat",
  },
  {
    Icon: ShieldCheck,
    title: "Talk compliance",
    body: "Security, access controls, and data handling — answered by someone who knows the platform, before you put it in front of customers.",
    to: "/about",
    linkLabel: "About FloatChat",
  },
]

/* ─────────────────────────────────────────────────────────────
   "What to expect" assurances
─────────────────────────────────────────────────────────────── */

const expectations = [
  {
    Icon: Clock,
    title: "A reply within one business day",
    body: "A real person reads every message — usually back to you the same day.",
  },
  {
    Icon: Users,
    title: "A person who knows the product",
    body: "Not a switchboard. You talk to someone who can actually answer.",
  },
  {
    Icon: ArrowRight,
    title: "A clear next step",
    body: "Whether that's a demo, a quote, or a migration plan — you leave with one.",
  },
]

/* ─────────────────────────────────────────────────────────────
   Cross-links — only real routes
─────────────────────────────────────────────────────────────── */

const exploreLinks = [
  { to: "/ai-agents", label: "AI Agents" },
  { to: "/products/omnichannel-inbox", label: "Omnichannel Inbox" },
  { to: "/integrations", label: "Integrations" },
  { to: "/products/analytics", label: "Analytics" },
  { to: "/pricing", label: "Pricing" },
  { to: "/help-center", label: "Help Center" },
]

/* ─────────────────────────────────────────────────────────────
   ContactPage schema
─────────────────────────────────────────────────────────────── */

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact FloatChat",
  description:
    "Book a demo, get pricing, or plan a migration to FloatChat. Talk to our team about agentic AI, channels, and broadcasting for your business.",
  url: "https://www.floatchat.com/contact-us",
  mainEntity: {
    "@type": "Organization",
    name: "FloatChat",
    url: "https://www.floatchat.com/",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@floatchat.com",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@floatchat.com",
        availableLanguage: "English",
      },
    ],
  },
}

/* ─────────────────────────────────────────────────────────────
   Page
─────────────────────────────────────────────────────────────── */

export default function ContactUsPage() {
  usePageMeta(metadata)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "sales" },
  })

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      toast.success("Message sent! We'll get back to you within one business day.")
      reset()
    } catch {
      toast.error("Something went wrong. Please email us directly.")
    }
  }

  return (
    <>
      <Header />
      <JsonLd schema={contactSchema} />

      <main id="main-content" className="pt-20">
        {/* ───── HERO ───── */}
        <section className="relative pt-14 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#F5F7FF] via-[#F8FAFF] to-[#FFFFFF]">
          <div className="absolute inset-0 -z-20 pointer-events-none" aria-hidden="true">
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-10 -left-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(closest-side, #A8E6F7 0%, transparent 70%)",
              }}
            />
          </div>
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1B6BFF]/30 bg-[#1B6BFF]/5 px-4 py-1.5 text-xs font-medium text-[#1B6BFF]"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Contact FloatChat
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-medium tracking-tight text-[#0F2A4A] text-4xl sm:text-5xl lg:text-[54px] leading-[1.05]"
            >
              Talk to FloatChat about{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                agentic AI.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-[15px] lg:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
            >
              Book a demo, get pricing, or plan a move from your current tools.
              However you reach us, you talk to someone who knows the product.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] ring-4 ring-[#3B82F6]/15 transition-all"
                >
                  Get a Demo
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
              <Link
                to="/signup?plan=free"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full text-[15px] font-medium border border-slate-300 bg-white text-[#0F2A4A] hover:bg-slate-50 transition-colors"
              >
                Start Free
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-500"
            >
              <Check className="h-3.5 w-3.5 text-[#1B6BFF]" />
              Real answers from a real person.
            </motion.p>
          </div>
        </section>

        {/* ───── HOW WE CAN HELP ───── */}
        <section className="relative py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <BlurFade>
                <SectionEyebrow num="01" label="How we can help" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
                  Tell us what you&apos;re after.
                </h2>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">
                  Most conversations start in one of four places. Point us at the
                  one that fits and we&apos;ll take it from there.
                </p>
              </BlurFade>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {helpCards.map((card, i) => (
                <BlurFade key={card.title} delay={0.05 + i * 0.08} className="h-full">
                  <div className="group h-full flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 lg:p-7 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,42,74,0.25)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-[#3B82F6]/30 shrink-0">
                        <card.Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-semibold text-[#0F2A4A] leading-tight">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] text-slate-500 leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <Link
                        to={card.to}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
                      >
                        {card.linkLabel}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ───── CONTACT FORM + WHAT TO EXPECT ───── */}
        <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#EEF2FF] via-white to-[#F5F7FF] overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(15,42,74,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
            }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT — What to expect */}
              <BlurFade className="lg:col-span-5">
                <SectionEyebrow num="02" label="What to expect" />
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium tracking-tight text-[#0F2A4A] leading-[1.07]">
                  We&apos;ll show you exactly how FloatChat fits.
                </h2>
                <p className="mt-5 text-base text-slate-500 leading-relaxed max-w-lg">
                  Tell us your channels, your volume, and your goals, and
                  we&apos;ll show you exactly how FloatChat fits, with a clear
                  next step — no pressure, no runaround.
                </p>

                <div className="mt-8 space-y-4">
                  {expectations.map((item) => (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <div className="h-9 w-9 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center shrink-0">
                        <item.Icon className="h-[18px] w-[18px] text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold text-[#0F2A4A] leading-tight">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[13px] text-slate-500 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </BlurFade>

              {/* RIGHT — Contact form */}
              <BlurFade delay={0.15} className="lg:col-span-7">
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-8 shadow-[0_30px_60px_-30px_rgba(15,42,74,0.3)]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-px left-10 right-10 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)",
                    }}
                  />
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="h-4 w-4 text-[#1D4ED8]" />
                    <h2 className="text-xl lg:text-2xl font-semibold text-[#0F2A4A]">
                      Send us a message
                    </h2>
                  </div>
                  <p className="text-[13.5px] text-slate-500 mb-6">
                    Fill this in and the right person on our team will reply
                    within one business day.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-[#0F2A4A]">
                          Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Jane Smith"
                          className="bg-white border-slate-200 focus-visible:border-[#3B82F6] focus-visible:ring-[#3B82F6]/30"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-[#0F2A4A]">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jane@company.com"
                          className="bg-white border-slate-200 focus-visible:border-[#3B82F6] focus-visible:ring-[#3B82F6]/30"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-[#0F2A4A]">
                        Subject
                      </Label>
                      <select
                        id="subject"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F2A4A] shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-[#3B82F6] focus-visible:ring-[3px] focus-visible:ring-[#3B82F6]/30"
                        {...register("subject")}
                      >
                        <option value="sales">Sales — demo or pricing</option>
                        <option value="support">Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-[#0F2A4A]">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        placeholder="Tell us your channels, your volume, and your goals…"
                        className="bg-white border-slate-200 focus-visible:border-[#3B82F6] focus-visible:ring-[#3B82F6]/30"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] shadow-[0_10px_24px_-6px_rgba(37,99,235,0.55)] transition-all"
                    >
                      {isSubmitting ? (
                        "Sending…"
                      ) : (
                        <>
                          Send message
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[12px] text-slate-400">
                      By sending this you agree to be contacted about FloatChat.
                    </p>
                  </form>
                </div>

                {/* Explore links */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-[12px] text-slate-400 mr-1">
                    Or explore:
                  </span>
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[12px] font-medium text-[#0F2A4A] hover:border-[#3B82F6]/40 hover:text-[#1D4ED8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F2A4A] via-[#1D4ED8] to-[#2563EB] px-6 py-16 sm:px-12 lg:px-16 lg:py-20 text-center">
              {/* glows */}
              <div
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
                style={{
                  background:
                    "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.4), rgba(96,165,250,0.18) 50%, transparent 75%)",
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(59,130,246,0.4), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 -z-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                  maskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 95%)",
                }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative inline-flex items-center gap-2 mb-7 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#A8E6F7]" />
                <span className="text-[11px] font-medium text-white">
                  Reply within one business day
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white text-balance mb-5 leading-[1.07]"
              >
                Let&apos;s talk about your{" "}
                <span className="bg-gradient-to-r from-[#A8E6F7] via-[#93C5FD] to-[#BFD4FF] bg-clip-text text-transparent">
                  customer experience.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="relative text-base sm:text-lg text-blue-100/90 mb-9 max-w-xl mx-auto leading-relaxed"
              >
                Book a demo, get pricing, or plan a migration — and see how
                agentic AI, every channel, and broadcasting come together for
                your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link
                  to="/demo"
                  className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white text-[15px] font-medium text-[#1D4ED8] hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300"
                >
                  Get a Demo
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  to="/signup?plan=free"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-[15px] font-medium text-white hover:bg-white/10 hover:scale-[1.02] transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Free
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
