import { motion } from "framer-motion"
import { BlurFade } from "@/components/ui/blur-fade"
import { TestimonialSlider, type Testimonial } from "@/components/ui/testimonial-slider"

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We moved off Intercom in a weekend. The migration was free and Captain was answering tickets by Monday morning.",
    name: "Jessica Chen",
    username: "Head of Support · Lumen Co.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  {
    id: 2,
    quote: "Per-seat pricing was killing us. Capacity pricing means I stopped flinching every time we onboard a new agent.",
    name: "Marcus Williams",
    username: "Director of CX · NorthBound",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    id: 3,
    quote: "Voice and SMS in one inbox, no Twilio glue code. Our team picks up calls from the same screen they answer chat.",
    name: "Ashley Rodriguez",
    username: "Ops Manager · Bayside Goods",
    avatar: "https://i.pravatar.cc/120?img=44",
  },
  {
    id: 4,
    quote: "Free plan is actually free. Unlimited live chat, no conversation cap, no ad slapped on the widget.",
    name: "Tyler Brooks",
    username: "Founder · Drift Coffee Co.",
    avatar: "https://i.pravatar.cc/120?img=15",
  },
  {
    id: 5,
    quote: "AI replies cost a flat $9.99 — not $0.99 per resolution. Predictable bill at the end of every month.",
    name: "Megan O'Connor",
    username: "Support Lead · Vermont Outfitters",
    avatar: "https://i.pravatar.cc/120?img=49",
  },
]

const trustBadges = [
  "DigitalOcean NYC3",
  "GDPR + CCPA compliant",
  "SOC 2 Type II in progress",
  "Encryption at rest (AES-256)",
  "MFA on every agent account",
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F5F7FF] relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <BlurFade>
            <span className="inline-block py-1 px-3 rounded-full bg-[#3B82F6]/10 text-[#1D4ED8] font-medium text-xs sm:text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#0F2A4A] via-[#1D4ED8] to-[#3B82F6] bg-clip-text text-transparent mt-3 sm:mt-4 px-4 leading-[1.1]">
              Loved by US support teams.
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] mx-auto mt-4 sm:mt-6 rounded-full" />
            <p className="mt-5 text-slate-500">
              Honest quotes from teams who switched to FloatChat.
            </p>
          </BlurFade>
        </motion.div>

        {/* Slider */}
        <TestimonialSlider testimonials={testimonials} />

        {/* Trust badges */}
        <BlurFade
          delay={0.2}
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span>{badge}</span>
            </div>
          ))}
        </BlurFade>
      </div>
    </section>
  )
}
