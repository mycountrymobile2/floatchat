"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard, FunnelStep, StatusPill } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import type { ReactNode } from "react"

export default function CsatReportPage() {
  useEffect(() => { document.title = "Customer Health — FloatChat" }, [])
  return (
    <AppShell title="Customer Health" subtitle="Activation, feature adoption, churn, CSAT/NPS, and support load by segment.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Activation Rate" value="79.7%" delta="5.2%" deltaDirection="up" />
        <StatCard label="NPS Score" value="62" delta="8" deltaDirection="up" />
        <StatCard label="Churn Rate" value="8.5%" inverted delta="2.1%" deltaDirection="down" />
        <StatCard label="Feature Adoption" value="59.6%" footnote="5 core features" delta="4.2%" deltaDirection="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Activation funnel" subtitle="79.7% overall · 680 signups · 2.4h time to activation" className="lg:col-span-2">
          <div className="space-y-2">
            <FunnelStep label="Created account" value="612" pctOfTotal="90.0%" highlight />
            <FunnelStep label="First conversation" value="542" pctOfTotal="79.7%" dropPct="11.4%" />
            <FunnelStep label="Connected a channel" value="428" pctOfTotal="62.9%" dropPct="21.0%" />
            <FunnelStep label="Invited teammate" value="386" pctOfTotal="56.8%" dropPct="9.8%" />
            <FunnelStep label="Activated AI Agent" value="298" pctOfTotal="43.8%" dropPct="22.8%" />
          </div>
        </Card>

        <Card title="NPS / CSAT (last 30d)">
          <p className="text-3xl font-semibold text-emerald-400">62</p>
          <p className="text-xs text-white/55 mt-0.5">NPS · ▲8 vs last month</p>
          <ul className="mt-4 space-y-2 text-xs">
            <li className="flex justify-between"><span className="text-emerald-400">Promoters</span><span className="tabular-nums font-medium">412</span></li>
            <li className="flex justify-between"><span className="text-amber-400">Passives</span><span className="tabular-nums font-medium">158</span></li>
            <li className="flex justify-between"><span className="text-red-400">Detractors</span><span className="tabular-nums font-medium">72</span></li>
            <li className="pt-2 mt-2 border-t border-white/5 flex justify-between"><span className="text-white/65">CSAT (7d)</span><span className="tabular-nums font-semibold">4.7 / 5</span></li>
          </ul>
        </Card>

        <Card title="Feature adoption" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={[
                { feature: "AI Agent", adopt: 84 },
                { feature: "Inbox", adopt: 92 },
                { feature: "Automation", adopt: 56 },
                { feature: "Macros", adopt: 78 },
                { feature: "Integrations", adopt: 48 },
              ]}>
                <XAxis dataKey="feature" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="adopt" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Churn by acquisition channel">
          <DataTable
            columns={[
              { key: "ch", header: "Channel" },
              { key: "cust", header: "Customers", align: "right" },
              { key: "churned", header: "Churned", align: "right" },
              { key: "rate", header: "Rate", align: "right" },
            ]}
            rows={[
              { ch: "Email", cust: 64, churned: 3, rate: "4.7%" },
              { ch: "Organic", cust: 142, churned: 9, rate: "6.3%" },
              { ch: "Direct", cust: 98, churned: 7, rate: "7.1%" },
              { ch: "Paid", cust: 56, churned: 7, rate: "12.5%" },
              { ch: "Social", cust: 28, churned: 6, rate: "21.4%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="NPS by source">
          <DataTable
            columns={[
              { key: "src", header: "Source" },
              { key: "nps", header: "NPS", align: "right" },
              { key: "rating", header: "Rating" },
            ]}
            rows={[
              { src: "Referral", nps: 78, rating: <StatusPill variant="good" label="Excellent" /> },
              { src: "Direct", nps: 68, rating: <StatusPill variant="good" label="Excellent" /> },
              { src: "Email", nps: 64, rating: <StatusPill variant="good" label="Excellent" /> },
              { src: "Organic", nps: 58, rating: <StatusPill variant="good" label="Good" /> },
              { src: "Paid Search", nps: 42, rating: <StatusPill variant="warning" label="Mixed" /> },
              { src: "Social", nps: 28, rating: <StatusPill variant="fail" label="Below" /> },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Support tickets by segment" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "seg", header: "Segment" },
              { key: "tickets", header: "Tickets", align: "right" },
              { key: "resolve", header: "Avg Resolution", align: "right" },
              { key: "csat", header: "CSAT", align: "right" },
            ]}
            rows={[
              { seg: "Enterprise", tickets: 142, resolve: "8m 12s", csat: "4.9 / 5" },
              { seg: "Pro", tickets: 384, resolve: "4m 02s", csat: "4.7 / 5" },
              { seg: "Starter", tickets: 612, resolve: "2m 48s", csat: "4.6 / 5" },
              { seg: "Trial", tickets: 218, resolve: "3m 18s", csat: "4.4 / 5" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}
