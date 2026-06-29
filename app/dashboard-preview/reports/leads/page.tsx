"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard, FunnelStep, TabBar } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts"
import type { ReactNode } from "react"

export default function LeadsReportPage() {
  useEffect(() => { document.title = "Lead & Funnel — FloatChat" }, [])
  const [attr, setAttr] = useState("first")

  return (
    <AppShell title="Lead & Funnel" subtitle="Conversion funnels, attribution, and lead velocity.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Lead CVR" value="4.2%" delta="15.3%" deltaDirection="up" />
        <StatCard label="Total Leads" value="916" delta="14.4%" deltaDirection="up" />
        <StatCard label="MQL Rate" value="50%" footnote="458 MQLs" delta="3.8%" deltaDirection="up" />
        <StatCard label="Time to Convert" value="6.2 days" inverted delta="12.4%" deltaDirection="down" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Visitor → Lead conversion by source">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                { source: "Organic", visitors: 7420, leads: 312 },
                { source: "Direct", visitors: 4820, leads: 298 },
                { source: "Paid", visitors: 3180, leads: 108 },
                { source: "Social", visitors: 2640, leads: 74 },
                { source: "Email", visitors: 1840, leads: 124 },
              ]}>
                <XAxis dataKey="source" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="leads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Lead → customer funnel" subtitle="Drop-off between stages">
          <div className="space-y-2">
            <FunnelStep label="Visitor" value="22,040" highlight />
            <FunnelStep label="Lead" value="916" pctOfTotal="4.2%" dropPct="95.8%" />
            <FunnelStep label="MQL" value="458" pctOfTotal="2.1%" dropPct="50.0%" />
            <FunnelStep label="SQL" value="183" pctOfTotal="0.83%" dropPct="60.0%" />
            <FunnelStep label="Opportunity" value="92" pctOfTotal="0.42%" dropPct="49.7%" />
            <FunnelStep label="Customer" value="42" pctOfTotal="0.19%" dropPct="54.3%" />
          </div>
        </Card>

        <Card title="Time to conversion">
          <DataTable
            columns={[
              { key: "range", header: "Time range" },
              { key: "n", header: "Conversions", align: "right" },
              { key: "pct", header: "% of total", align: "right" },
            ]}
            rows={[
              { range: "Same day", n: 124, pct: "13.5%" },
              { range: "1–3 days", n: 218, pct: "23.8%" },
              { range: "4–7 days", n: 286, pct: "31.2%" },
              { range: "8–14 days", n: 168, pct: "18.3%" },
              { range: "15–30 days", n: 86, pct: "9.4%" },
              { range: "30+ days", n: 34, pct: "3.7%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Lead velocity rate" subtitle="916 this month vs. 842 last">
          <p className="text-3xl font-semibold text-emerald-400">+8.8%</p>
          <div className="mt-3 h-44">
            <ResponsiveContainer>
              <LineChart data={[
                { m: "Jan", v: 612 }, { m: "Feb", v: 684 }, { m: "Mar", v: 742 },
                { m: "Apr", v: 842 }, { m: "May", v: 916 },
              ]}>
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Line dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#60A5FA", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Multi-touch attribution" className="lg:col-span-2"
          action={<TabBar tabs={[{ value: "first", label: "First Touch" }, { value: "last", label: "Last Touch" }]} active={attr} onChange={setAttr} />}
        >
          <DataTable
            columns={[
              { key: "channel", header: "Channel" },
              { key: "rev", header: "Attributed Revenue", align: "right" },
              { key: "share", header: "% of Total", align: "right" },
            ]}
            rows={[
              { channel: "Organic Search", rev: attr === "first" ? "$52.4K" : "$38.2K", share: attr === "first" ? "37%" : "27%" },
              { channel: "Direct", rev: attr === "first" ? "$24.8K" : "$36.8K", share: attr === "first" ? "17%" : "26%" },
              { channel: "Paid Search", rev: attr === "first" ? "$28.4K" : "$24.2K", share: attr === "first" ? "20%" : "17%" },
              { channel: "Email", rev: attr === "first" ? "$11.2K" : "$18.4K", share: attr === "first" ? "8%" : "13%" },
              { channel: "Social", rev: attr === "first" ? "$14.2K" : "$12.8K", share: attr === "first" ? "10%" : "9%" },
              { channel: "Referral", rev: attr === "first" ? "$10.2K" : "$10.8K", share: attr === "first" ? "7%" : "8%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Conversion performance by source" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "source", header: "Source" },
              { key: "v", header: "Visitors", align: "right" },
              { key: "l", header: "Leads", align: "right" },
              { key: "rate", header: "Conv. Rate", align: "right" },
            ]}
            rows={[
              { source: "Email", v: "1,840", l: 124, rate: "6.7%" },
              { source: "Direct", v: "4,820", l: 298, rate: "6.2%" },
              { source: "Organic Search", v: "7,420", l: 312, rate: "4.2%" },
              { source: "Paid Search", v: "3,180", l: 108, rate: "3.4%" },
              { source: "Social", v: "2,640", l: 74, rate: "2.8%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}
