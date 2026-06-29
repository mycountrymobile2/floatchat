"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const cohorts = [
  { month: "Jan 2026", m1: 100, m2: 84, m3: 72, m4: 64, m5: 58 },
  { month: "Feb 2026", m1: 100, m2: 88, m3: 78, m4: 70, m5: null },
  { month: "Mar 2026", m1: 100, m2: 90, m3: 82, m4: null, m5: null },
  { month: "Apr 2026", m1: 100, m2: 92, m3: null, m4: null, m5: null },
  { month: "May 2026", m1: 100, m2: null, m3: null, m4: null, m5: null },
]

function cellColor(v: number | null) {
  if (v === null) return "bg-white/[0.02] text-white/30"
  if (v >= 90) return "bg-emerald-500/25 text-emerald-200"
  if (v >= 75) return "bg-emerald-500/15 text-emerald-200/85"
  if (v >= 60) return "bg-amber-500/15 text-amber-200"
  return "bg-red-500/15 text-red-200"
}

export default function RevenueReportPage() {
  useEffect(() => { document.title = "Revenue Recovery — FloatChat" }, [])
  return (
    <AppShell title="Revenue Recovery" subtitle="CAC, CLV, payment health, trial conversion, and cohort retention.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value="$141.2K" delta="18.6%" deltaDirection="up" />
        <StatCard label="Avg CAC" value="$68" inverted delta="12.4%" deltaDirection="down" />
        <StatCard label="Avg CLV" value="$2,908" delta="14.2%" deltaDirection="up" />
        <StatCard label="Trial CVR" value="45.9%" footnote="312 conversions" delta="8.2%" deltaDirection="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="CAC by channel" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "ch", header: "Channel" },
              { key: "cac", header: "CAC", align: "right" },
              { key: "cust", header: "Customers", align: "right" },
              { key: "ltv", header: "LTV", align: "right" },
              { key: "ratio", header: "LTV:CAC", align: "right" },
            ]}
            rows={[
              { ch: "Organic Search", cac: "$0", cust: 142, ltv: "$3,420", ratio: "—" },
              { ch: "Direct", cac: "$0", cust: 98, ltv: "$3,180", ratio: "—" },
              { ch: "Email", cac: "$8", cust: 64, ltv: "$2,840", ratio: "355x" },
              { ch: "Paid Search", cac: "$112", cust: 56, ltv: "$2,420", ratio: "21.6x" },
              { ch: "Social", cac: "$158", cust: 28, ltv: "$1,920", ratio: "12.2x" },
              { ch: "Referral", cac: "$42", cust: 22, ltv: "$3,280", ratio: "78.1x" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Payment success">
          <p className="text-3xl font-semibold text-emerald-400">97.2%</p>
          <p className="text-xs text-white/55 mt-0.5">Successful</p>
          <ul className="mt-4 space-y-2 text-xs">
            <li className="flex justify-between"><span className="text-white/55">Failed</span><span className="tabular-nums">2.8%</span></li>
            <li className="flex justify-between"><span className="text-white/55">Avg transaction</span><span className="tabular-nums">$249</span></li>
            <li className="flex justify-between"><span className="text-white/55">Recovered (dunning)</span><span className="tabular-nums text-emerald-400">$8,400</span></li>
          </ul>
        </Card>

        <Card title="Trial → Paid">
          <p className="text-3xl font-semibold">45.9%</p>
          <p className="text-xs text-white/55 mt-0.5">Trial conversion</p>
          <ul className="mt-4 space-y-2 text-xs">
            <li className="flex justify-between"><span className="text-white/55">Trials started</span><span className="tabular-nums">680</span></li>
            <li className="flex justify-between"><span className="text-white/55">Converted</span><span className="tabular-nums">312</span></li>
            <li className="flex justify-between"><span className="text-white/55">Avg trial length</span><span className="tabular-nums">12.4 days</span></li>
          </ul>
        </Card>

        <Card title="Revenue by acquisition source" className="lg:col-span-2">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={[
                { src: "Organic", rev: 48200 },
                { src: "Direct", rev: 32400 },
                { src: "Paid", rev: 28800 },
                { src: "Email", rev: 18200 },
                { src: "Referral", rev: 8400 },
                { src: "Social", rev: 5200 },
              ]}>
                <XAxis dataKey="src" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="rev" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Revenue attribution by source" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "src", header: "Source" },
              { key: "rev", header: "Revenue", align: "right" },
              { key: "cust", header: "Customers", align: "right" },
              { key: "deal", header: "Avg deal", align: "right" },
            ]}
            rows={[
              { src: "Organic Search", rev: "$48,200", cust: 142, deal: "$340" },
              { src: "Direct", rev: "$32,400", cust: 98, deal: "$331" },
              { src: "Paid Search", rev: "$28,800", cust: 56, deal: "$514" },
              { src: "Email", rev: "$18,200", cust: 64, deal: "$284" },
              { src: "Referral", rev: "$8,400", cust: 22, deal: "$382" },
              { src: "Social", rev: "$5,200", cust: 28, deal: "$186" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Cohort revenue retention" subtitle="% retained by month after acquisition" className="lg:col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left text-[#60A5FA] font-semibold uppercase text-[10px] tracking-wider px-3 py-2 bg-[#1E3050] first:rounded-l-md">Cohort</th>
                  {["M1", "M2", "M3", "M4", "M5"].map((m) => (
                    <th key={m} className="text-center text-[#60A5FA] font-semibold uppercase text-[10px] tracking-wider px-3 py-2 bg-[#1E3050] last:rounded-r-md">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohorts.map((row, i) => (
                  <tr key={row.month} className={cn(i % 2 === 1 && "bg-white/[0.015]")}>
                    <td className="px-3 py-2 font-medium">{row.month}</td>
                    {[row.m1, row.m2, row.m3, row.m4, row.m5].map((v, j) => (
                      <td key={j} className="px-1.5 py-1">
                        <div className={cn("rounded-md py-2 text-center tabular-nums font-semibold", cellColor(v))}>
                          {v !== null ? `${v}%` : "—"}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
