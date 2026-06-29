import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { CheckCircle2, MessageSquare } from "lucide-react"
import { FaWhatsapp, FaShopify, FaEnvelope } from "react-icons/fa"

/* ── Step visuals ───────────────────────────────────────── */

function SignupVisual() {
  return (
    <div className="rounded-2xl border border-border bg-white/90 p-4 shadow-sm">
      <p className="text-[10px] text-muted-foreground font-medium mb-3 uppercase tracking-wide">Create your account</p>
      <div className="space-y-2">
        <div className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
          you@company.com
        </div>
        <div className="rounded-lg bg-primary px-3 py-2 text-xs text-white font-medium text-center shadow-md shadow-primary/30">
          Start Free — it's free →
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span className="text-[10px] text-muted-foreground">No credit card · Live in 30 seconds</span>
      </div>
    </div>
  )
}

function ChannelsVisual() {
  const channels = [
    { Icon: FaWhatsapp, color: "#25D366", label: "WhatsApp" },
    { Icon: FaEnvelope, color: "#EA4335", label: "Email"    },
    { Icon: FaShopify,  color: "#96BF48", label: "Shopify"  },
  ]
  return (
    <div className="space-y-2">
      {channels.map(({ Icon, color, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
          className="flex items-center gap-3 rounded-xl border border-border bg-white/90 px-3 py-2.5 shadow-sm"
        >
          <Icon style={{ color, width: 15, height: 15 }} />
          <span className="text-xs font-medium text-foreground flex-1">{label}</span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Connected
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ReplyVisual() {
  return (
    <div className="rounded-2xl border border-border bg-white/90 shadow-sm overflow-hidden">
      <div className="border-b border-border px-3 py-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold text-foreground">Inbox — 3 open</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-muted text-[10px] font-bold text-muted-foreground flex items-center justify-center shrink-0">S</div>
          <div className="bg-muted rounded-xl rounded-tl-none px-2.5 py-1.5 text-[11px] text-foreground">
            Where is my order?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-primary/10 border border-primary/20 rounded-xl rounded-tr-none px-2.5 py-1.5 text-[11px] text-foreground">
            Your order ships today! 📦
          </div>
        </div>
        <div className="flex items-center gap-1.5 pl-8">
          <MessageSquare className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-muted-foreground">AI Captain replied in 0.3s</span>
        </div>
      </div>
    </div>
  )
}

/* ── Animated connector ─────────────────────────────────── */

function Connector({ index }: { index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="hidden md:flex items-center justify-center w-16 shrink-0 relative mt-[4.5rem]">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 + index * 0.2, ease: "easeOut" }}
        className="h-px w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 origin-left"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.9 + index * 0.2 }}
        className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-md shadow-primary/40"
      />
    </div>
  )
}

/* ── Step data ──────────────────────────────────────────── */

const steps = [
  {
    number: "01",
    title: "Sign up free.",
    description: "No credit card. 30 seconds. One click and your account is live.",
    Visual: SignupVisual,
    accent: "#006AFF",
    ring: "ring-blue-200",
    glow: "shadow-blue-100",
    bg: "from-blue-50/60",
  },
  {
    number: "02",
    title: "Add your channels.",
    description: "Drop the chat widget on your site. Connect email, WhatsApp, Shopify in a few clicks.",
    Visual: ChannelsVisual,
    accent: "#7C3AED",
    ring: "ring-violet-200",
    glow: "shadow-violet-100",
    bg: "from-violet-50/60",
  },
  {
    number: "03",
    title: "Start replying.",
    description: "Your team handles messages from one inbox. Add AI Captain on Lite ($9.99) when ready.",
    Visual: ReplyVisual,
    accent: "#059669",
    ring: "ring-emerald-200",
    glow: "shadow-emerald-100",
    bg: "from-emerald-50/60",
  },
]

/* ── Section ────────────────────────────────────────────── */

export function Steps() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#F5F7FF] to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-sm text-muted-foreground mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Setup
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Live in three steps
          </h2>
          <p className="mt-4 text-muted-foreground">Set up in an afternoon. Your team is live the same day.</p>
        </motion.div>

        {/* Steps row */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-0 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <>
              {/* Card */}
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex-1 rounded-2xl border border-border bg-gradient-to-br ${step.bg} to-transparent bg-card p-6 shadow-xl ${step.glow} hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group`}
              >
                {/* Watermark number */}
                <span
                  className="absolute top-4 right-5 text-7xl font-black select-none pointer-events-none leading-none"
                  style={{ color: step.accent, opacity: 0.07 }}
                >
                  {step.number}
                </span>

                {/* Step badge */}
                <div className="flex items-center gap-2 mb-5">
                  <motion.div
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                    className={`w-9 h-9 rounded-full ring-4 ${step.ring} flex items-center justify-center font-bold text-sm text-white shadow-md`}
                    style={{ background: step.accent }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Visual */}
                <div className="mb-5">
                  <step.Visual />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector between cards */}
              {i < steps.length - 1 && <Connector index={i} />}
            </>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Button size="lg" asChild className="text-base px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
            <Link to="/signup?plan=free">Start Free</Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">
            Live chat widget on your site in 5 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
