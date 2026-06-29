"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts"
import type { ReactNode } from "react"

const channelMix = [
  { name: "Organic", value: 48200, color: "#3B82F6" },
  { name: "Direct", value: 32400, color: "#60A5FA" },
  { name: "Paid Search", value: 28800, color: "#1D4ED8" },
  { name: "Email", value: 18200, color: "#93C5FD" },
  { name: "Referral", value: 8400, color: "#2563EB" },
  { name: "Social", value: 5200, color: "#1E40AF" },
]

export default function ExecutiveReportPage() {
  useEffect(() => { document.title = "Executive Summary — FloatChat" }, [])
  return (
    <AppShell title="Executive Summary" subtitle="Pipeline, channel mix vs revenue, brand P&L, cohort dashboards.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Pipeline" value="$173.7K" delta="22.4%" deltaDirection="up" />
        <StatCard label="Closed Won" value="$89.4K" delta="18.6%" deltaDirection="up" />
        <StatCard label="Gross Margin" value="90.6%" delta="2.1%" deltaDirection="up" />
        <StatCard label="Marketing ROI" value="9.6x" footnote="$13.3K spend" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Pipeline & revenue breakdown" className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Marketing-sourced", value: "$125.5K", tone: "text-emerald-400" },
              { label: "Sales-sourced", value: "$48.2K", tone: "text-white" },
              { label: "Closed Won", value: "$89.4K", tone: "text-emerald-400" },
              { label: "Closed Lost", value: "$32.8K", tone: "text-red-400" },
            ].map((b) => (
              <div key={b.label} className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
                <p className="text-[11px] text-white/55">{b.label}</p>
                <p className={`mt-1 text-lg font-semibold tabular-nums ${b.tone}`}>{b.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Channel mix vs revenue">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={channelMix} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} stroke="#0F1A2E" strokeWidth={2}>
                  {channelMix.map((s) => <Cell key={s.name} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Channel performance details" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "ch", header: "Channel" },
              { key: "spend", header: "Spend", align: "right" },
              { key: "rev", header: "Revenue", align: "right" },
              { key: "roi", header: "ROI", align: "right" },
            ]}
            rows={[
              { ch: "Organic Search", spend: "Organic", rev: "$48,200", roi: "—" },
              { ch: "Direct", spend: "Organic", rev: "$32,400", roi: "—" },
              { ch: "Paid Search", spend: "$3,420", rev: "$28,800", roi: "8.4x" },
              { ch: "Email", spend: "$640", rev: "$18,200", roi: "28.4x" },
              { ch: "Referral", spend: "Organic", rev: "$8,400", roi: "—" },
              { ch: "Social", spend: "$2,640", rev: "$5,200", roi: "2.0x" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Brand-level P&L">
          <ul className="space-y-2.5 text-sm">
            <li className="flex justify-between"><span className="text-white/65">Revenue</span><span className="tabular-nums font-semibold">$141.2K</span></li>
            <li className="flex justify-between"><span className="text-white/65">Marketing spend</span><span className="tabular-nums">−$13.3K</span></li>
            <li className="flex justify-between"><span className="text-white/65">Other COGS</span><span className="tabular-nums">−$2.0K</span></li>
            <li className="pt-2 mt-2 border-t border-white/5 flex justify-between">
              <span className="text-white font-semibold">Gross margin</span>
              <span className="tabular-nums font-semibold text-emerald-400">$127.9K (90.6%)</span>
            </li>
          </ul>
        </Card>

        <Card title="Revenue vs marketing spend" className="lg:col-span-3">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={[
                { m: "Jan", rev: 88, spend: 11 },
                { m: "Feb", rev: 102, spend: 12 },
                { m: "Mar", rev: 118, spend: 12.4 },
                { m: "Apr", rev: 126, spend: 13.0 },
                { m: "May", rev: 141, spend: 13.3 },
              ]}>
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="rev" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#60A5FA", r: 3 }} name="Revenue ($K)" />
                <Line dataKey="spend" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 3 }} name="Marketing spend ($K)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Weekly cohort dashboard" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "week", header: "Week" },
              { key: "u", header: "New Users", align: "right" },
              { key: "l", header: "Leads", align: "right" },
              { key: "mql", header: "MQLs", align: "right" },
              { key: "sql", header: "SQLs", align: "right" },
              { key: "c", header: "Customers", align: "right" },
            ]}
            rows={[
              { week: "May 4", u: "612", l: 218, mql: 108, sql: 38, c: 8 },
              { week: "May 11", u: "684", l: 248, mql: 124, sql: 42, c: 12 },
              { week: "Apr 27", u: "542", l: 198, mql: 96, sql: 32, c: 7 },
              { week: "Apr 20", u: "498", l: 184, mql: 88, sql: 28, c: 6 },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Funnel progression — weekly">
          <div className="h-44">
            <ResponsiveContainer>
              <LineChart data={[
                { w: "W1", cust: 6, lead: 184, mql: 88, sql: 28 },
                { w: "W2", cust: 7, lead: 198, mql: 96, sql: 32 },
                { w: "W3", cust: 8, lead: 218, mql: 108, sql: 38 },
                { w: "W4", cust: 12, lead: 248, mql: 124, sql: 42 },
              ]}>
                <XAxis dataKey="w" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Line dataKey="lead" stroke="#60A5FA" strokeWidth={2} dot={false} />
                <Line dataKey="mql" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line dataKey="sql" stroke="#1D4ED8" strokeWidth={2} dot={false} />
                <Line dataKey="cust" stroke="#10B981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Monthly cohort revenue" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "cohort", header: "Cohort" },
              { key: "acq", header: "Acquired", align: "right" },
              { key: "rev", header: "Revenue", align: "right" },
              { key: "arpu", header: "ARPU", align: "right" },
              { key: "ret", header: "Retained", align: "right" },
            ]}
            rows={[
              { cohort: "Jan 2026", acq: 142, rev: "$28,200", arpu: "$199", ret: "84%" },
              { cohort: "Feb 2026", acq: 186, rev: "$36,400", arpu: "$196", ret: "88%" },
              { cohort: "Mar 2026", acq: 218, rev: "$42,800", arpu: "$196", ret: "90%" },
              { cohort: "Apr 2026", acq: 240, rev: "$48,200", arpu: "$201", ret: "92%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}
