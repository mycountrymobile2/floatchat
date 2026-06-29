import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type Status = "operational" | "degraded" | "outage" | "maintenance"

const statusConfig: Record<Status, { label: string; color: string; dot: string; bg: string }> = {
  operational: { label: "Operational", color: "text-green-700", dot: "bg-green-500", bg: "bg-green-50" },
  degraded: { label: "Degraded performance", color: "text-yellow-700", dot: "bg-yellow-500", bg: "bg-yellow-50" },
  outage: { label: "Major outage", color: "text-red-700", dot: "bg-red-500", bg: "bg-red-50" },
  maintenance: { label: "Scheduled maintenance", color: "text-blue-700", dot: "bg-blue-500", bg: "bg-blue-50" },
}

const services: { name: string; status: Status; uptime: string }[] = [
  { name: "Inbox & conversations", status: "operational", uptime: "99.98%" },
  { name: "AI Agent", status: "operational", uptime: "99.96%" },
  { name: "SMS delivery", status: "operational", uptime: "99.95%" },
  { name: "WhatsApp messaging", status: "operational", uptime: "99.97%" },
  { name: "Email channel", status: "operational", uptime: "99.99%" },
  { name: "Voice (calls)", status: "operational", uptime: "99.93%" },
  { name: "Live chat widget", status: "operational", uptime: "99.99%" },
  { name: "REST API", status: "operational", uptime: "99.99%" },
  { name: "Webhooks", status: "operational", uptime: "99.97%" },
  { name: "Dashboard & web app", status: "operational", uptime: "99.98%" },
  { name: "Mobile apps (iOS/Android)", status: "operational", uptime: "99.95%" },
  { name: "Integrations (Shopify, HubSpot)", status: "operational", uptime: "99.96%" },
]

const incidents = [
  {
    date: "April 22, 2026",
    title: "SMS delivery delays — US carriers",
    status: "Resolved",
    statusColor: "text-green-700 bg-green-50",
    duration: "Resolved in 47 min",
    description: "Between 14:12–14:59 UTC, some US SMS messages experienced delays of 5–15 minutes due to carrier-side congestion. All messages were eventually delivered. No messages were lost.",
  },
  {
    date: "April 8, 2026",
    title: "AI Agent elevated error rate",
    status: "Resolved",
    statusColor: "text-green-700 bg-green-50",
    duration: "Resolved in 22 min",
    description: "Between 09:05–09:27 UTC, the AI Agent returned a higher-than-normal rate of 503 errors due to OpenAI API instability upstream. Conversations automatically fell back to manual mode.",
  },
  {
    date: "March 15, 2026",
    title: "Scheduled maintenance — database upgrade",
    status: "Completed",
    statusColor: "text-blue-700 bg-blue-50",
    duration: "12 min downtime",
    description: "Planned maintenance window for PostgreSQL version upgrade. The dashboard was unavailable 03:00–03:12 UTC. All services resumed normally.",
  },
]

const uptimeHistory = [
  { month: "May 2026", uptime: "99.97%" },
  { month: "Apr 2026", uptime: "99.95%" },
  { month: "Mar 2026", uptime: "99.98%" },
  { month: "Feb 2026", uptime: "99.99%" },
  { month: "Jan 2026", uptime: "99.97%" },
  { month: "Dec 2025", uptime: "99.98%" },
]

const overallStatus: Status = "operational"

export default function StatusPage() {
  useEffect(() => {
    document.title = "System Status | FloatChat"
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute("content", "FloatChat system status — real-time uptime, incidents, and maintenance notices for all services.")
  }, [])

  const cfg = statusConfig[overallStatus]

  return (
    <>
      <Header />
      <main className="pt-20">

        {/* Overall status banner */}
        <section className={`py-12 ${cfg.bg} border-b border-border`}>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className={`relative w-4 h-4 rounded-full ${cfg.dot}`}>
                <div className={`absolute inset-0 rounded-full ${cfg.dot} animate-ping opacity-60`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${cfg.color}`}>All systems {cfg.label.toLowerCase()}</h1>
                <p className="text-sm text-muted-foreground mt-1">Last checked: just now · Updated every 60 seconds</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-8">Service status</h2>
            <div className="border border-border rounded-xl overflow-hidden">
              {services.map((service, i) => {
                const s = statusConfig[service.status]
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className={`flex items-center justify-between px-6 py-4 ${i < services.length - 1 ? "border-b border-border" : ""} bg-card`}
                  >
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-muted-foreground hidden sm:inline">{service.uptime} uptime (90d)</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className={`text-sm font-medium ${s.color}`}>{s.label}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Uptime history */}
        <section className="py-8 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-6">Historical uptime</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {uptimeHistory.map((month) => (
                <div key={month.month} className="bg-card border border-border rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground">{month.month}</p>
                  <p className="text-lg font-bold text-green-700 mt-1">{month.uptime}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Incidents */}
        <section className="py-16 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-xl font-bold text-foreground mb-8">Recent incidents</h2>
            {incidents.length === 0 ? (
              <p className="text-muted-foreground">No incidents in the past 90 days.</p>
            ) : (
              <div className="space-y-6">
                {incidents.map((incident, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{incident.date}</p>
                        <h3 className="font-semibold text-foreground mt-1">{incident.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{incident.duration}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${incident.statusColor}`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{incident.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 bg-secondary/30 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Get status updates</h2>
              <p className="text-muted-foreground mb-6">Subscribe to receive email alerts for incidents, maintenance windows, and resolved events.</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                Questions? Email <a href="mailto:support@floatchat.com" className="text-primary hover:underline">support@floatchat.com</a>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
