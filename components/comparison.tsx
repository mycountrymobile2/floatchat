"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Check, X } from "lucide-react"

const stats = [
  { value: "$0", label: "Free plan with chat, email, and WhatsApp" },
  { value: "$9.99", label: "Lite plan with Auto Reply + AI Chatbot" },
  { value: "76%", label: "Avg savings vs Intercom (illustrative)" },
  { value: "48 hrs", label: "Typical migration time" },
]

const compareRows = [
  { feature: "Free plan", floatchat: true, intercom: false, zendesk: false, tidio: "Limited" },
  { feature: "Email + WhatsApp on Free", floatchat: true, intercom: false, zendesk: false, tidio: false },
  { feature: "AI bundled in plan", floatchat: true, intercom: false, zendesk: false, tidio: false },
  { feature: "Voice native to inbox", floatchat: true, intercom: false, zendesk: "Add-on", tidio: false },
  { feature: "SMS native", floatchat: true, intercom: false, zendesk: false, tidio: false },
  { feature: "Capacity pricing", floatchat: true, intercom: false, zendesk: false, tidio: false },
  { feature: "No per-resolution AI fee", floatchat: true, intercom: false, zendesk: "Per agent", tidio: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="h-5 w-5 text-primary mx-auto" />
  if (value === false) return <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
  return <span className="text-xs text-muted-foreground">{value}</span>
}

export function Comparison() {
  return (
    <section id="comparison" className="py-24 lg:py-32 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Why teams switch from Intercom and Tidio
          </h2>
          <p className="mt-4 text-muted-foreground">Same features. A fraction of the price.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border bg-card text-center hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-3xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Feature comparison">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm">FloatChat</span>
                  </th>
                  <th className="py-4 px-4 text-center text-muted-foreground font-medium text-sm">Intercom</th>
                  <th className="py-4 px-4 text-center text-muted-foreground font-medium text-sm">Zendesk</th>
                  <th className="py-4 px-4 text-center text-muted-foreground font-medium text-sm">Tidio</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                    <td className="py-3.5 px-6 text-foreground">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.floatchat} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.intercom} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.zendesk} /></td>
                    <td className="py-3.5 px-4 text-center"><Cell value={row.tidio} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/pricing" className="underline underline-offset-2 hover:text-foreground transition-colors">See all 6 plans</Link>
          {" "}&middot;{" "}
          <Link to="/vs/intercom" className="underline underline-offset-2 hover:text-foreground transition-colors">vs Intercom</Link>
          {" "}&middot;{" "}
          <Link to="/vs/zendesk" className="underline underline-offset-2 hover:text-foreground transition-colors">vs Zendesk</Link>
          {" "}&middot;{" "}
          <Link to="/vs/tidio" className="underline underline-offset-2 hover:text-foreground transition-colors">vs Tidio</Link>
          {" "}&middot;{" "}
          <Link to="/vs/hubspot" className="underline underline-offset-2 hover:text-foreground transition-colors">vs HubSpot</Link>
        </p>
      </div>
    </section>
  )
}
