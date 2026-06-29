"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "@/components/ui/number-ticker"

/**
 * Homepage stats row.
 *
 * Honest numbers only — no fabricated customer counts or fake G2 ratings.
 * Baseline product capabilities and contractual commitments only.
 */
const stats = [
  { value: 10, suffix: "+", label: "Native channels in one inbox", delay: 0 },
  { value: 60, suffix: "%", label: "Avg conversations resolved by AI Captain", delay: 0.1 },
  { value: 5, suffix: " min", label: "From signup to live widget on your site", delay: 0.2 },
  { value: 99.9, suffix: "%", label: "Uptime SLA", delay: 0.3, decimalPlaces: 1 },
]

export function Stats() {
  return (
    <section className="py-16 border-b border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-foreground sm:text-5xl">
                <NumberTicker
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={stat.delay + 0.2}
                  decimalPlaces={stat.decimalPlaces ?? 0}
                  className="text-foreground"
                />
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-tight">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
