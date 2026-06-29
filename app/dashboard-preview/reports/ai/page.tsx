"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard, StatusPill } from "@/components/dashboard/primitives"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import type { ReactNode } from "react"

export default function AiReportPage() {
  useEffect(() => { document.title = "AI Agent Performance — FloatChat" }, [])
  return (
    <AppShell title="AI Agent Performance" subtitle="Deflection, accuracy, intent coverage, and content health.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Deflection Rate" value="64%" delta="12.6%" deltaDirection="up" footnote="$48.2K saved" />
        <StatCard label="Reply Accuracy" value="94.2%" delta="4.4%" deltaDirection="up" />
        <StatCard label="Intent Coverage" value="87%" footnote="42 of 48 intents" />
        <StatCard label="Fallback Rate" value="6.8%" inverted delta="2.2%" deltaDirection="down" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Intent ranking — last 30 days" subtitle="Position in resolved-without-human list" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "intent", header: "Intent" },
              { key: "pos", header: "Position", align: "right" },
              { key: "change", header: "Change", align: "right" },
              { key: "volume", header: "Volume", align: "right" },
              { key: "diff", header: "Difficulty", align: "right" },
            ]}
            rows={[
              { intent: "Refund eligibility", pos: 1, change: <span className="text-emerald-400">↑ 2</span>, volume: "1,840", diff: "Low" },
              { intent: "Order tracking", pos: 2, change: <span className="text-white/45">—</span>, volume: "2,140", diff: "Low" },
              { intent: "Pricing & plans", pos: 3, change: <span className="text-emerald-400">↑ 1</span>, volume: "942", diff: "Low" },
              { intent: "Account access", pos: 4, change: <span className="text-emerald-400">↑ 3</span>, volume: "1,180", diff: "Med" },
              { intent: "Shipping windows", pos: 8, change: <span className="text-red-400">↓ 2</span>, volume: "640", diff: "Med" },
              { intent: "API setup", pos: 12, change: <span className="text-red-400">↓ 4</span>, volume: "412", diff: "High" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Deflection value">
          <p className="text-3xl font-semibold text-emerald-400">$48,200</p>
          <p className="text-xs text-white/55 mt-1">Hours saved at $24/hr × 2,008 deflected conversations</p>
          <ul className="mt-4 space-y-2 text-xs">
            <li className="flex justify-between"><span className="text-white/55">Avg human handle time</span><span className="tabular-nums">7m 12s</span></li>
            <li className="flex justify-between"><span className="text-white/55">Avg AI handle time</span><span className="tabular-nums">38s</span></li>
            <li className="flex justify-between"><span className="text-white/55">Top intent saved</span><span className="tabular-nums">$18.4K (refund)</span></li>
          </ul>
        </Card>

        <Card title="Confidence growth — last 5 months" subtitle="+124 newly-confident intents, −18 deprecated">
          <div className="h-44">
            <ResponsiveContainer>
              <LineChart data={[
                { m: "Jan", v: 142 }, { m: "Feb", v: 186 }, { m: "Mar", v: 218 }, { m: "Apr", v: 240 }, { m: "May", v: 264 },
              ]}>
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Line dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#60A5FA", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Competitor gap analysis" subtitle="Intents where rivals deflect but we don't" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "intent", header: "Intent" },
              { key: "you", header: "FloatChat", align: "right" },
              { key: "c1", header: "Intercom Fin", align: "right" },
              { key: "c2", header: "Zendesk AI", align: "right" },
              { key: "vol", header: "Volume", align: "right" },
            ]}
            rows={[
              { intent: "Tax/VAT questions", you: <span className="text-red-400">0%</span>, c1: <span className="text-emerald-400">78%</span>, c2: <span className="text-emerald-400">62%</span>, vol: "412" },
              { intent: "Bulk order discount", you: <span className="text-amber-400">34%</span>, c1: <span className="text-emerald-400">71%</span>, c2: <span className="text-emerald-400">58%</span>, vol: "318" },
              { intent: "Multi-region invoicing", you: <span className="text-red-400">8%</span>, c1: <span className="text-emerald-400">82%</span>, c2: <span className="text-emerald-400">66%</span>, vol: "184" },
              { intent: "Custom contract terms", you: <span className="text-red-400">12%</span>, c1: <span className="text-amber-400">42%</span>, c2: <span className="text-amber-400">38%</span>, vol: "108" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Content decay alerts" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "page", header: "Help Article" },
              { key: "t30", header: "Traffic (30d)", align: "right" },
              { key: "t90", header: "Traffic (90d)", align: "right" },
              { key: "decline", header: "Decline %", align: "right" },
              { key: "status", header: "Status" },
            ]}
            rows={[
              { page: "Shipping windows by region", t30: "884", t90: "2,840", decline: "−68.9%", status: <StatusPill variant="fail" label="Decay" /> },
              { page: "Webhook reference", t30: "642", t90: "1,420", decline: "−54.8%", status: <StatusPill variant="warning" label="Drifting" /> },
              { page: "API authentication", t30: "1,210", t90: "2,140", decline: "−43.5%", status: <StatusPill variant="warning" label="Drifting" /> },
              { page: "Refunds — policy", t30: "2,140", t90: "2,180", decline: "−1.8%", status: <StatusPill variant="good" label="Healthy" /> },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="CTR by query (Help Center search)" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "q", header: "Query" },
              { key: "ctr", header: "CTR", align: "right" },
              { key: "imp", header: "Impressions", align: "right" },
              { key: "clk", header: "Clicks", align: "right" },
            ]}
            rows={[
              { q: "refund policy", ctr: "62%", imp: "2,840", clk: "1,761" },
              { q: "track my order", ctr: "58%", imp: "2,140", clk: "1,241" },
              { q: "cancel subscription", ctr: "42%", imp: "1,820", clk: "765" },
              { q: "change payment method", ctr: "48%", imp: "1,240", clk: "595" },
              { q: "team seats", ctr: "38%", imp: "942", clk: "358" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}
