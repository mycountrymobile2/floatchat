"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import type { ReactNode } from "react"

export default function OutreachReportPage() {
  useEffect(() => { document.title = "Outbound & Campaigns — FloatChat" }, [])
  return (
    <AppShell title="Outbound & Campaigns" subtitle="ROAS, quality scores, CPL, and campaign-to-conversation paths.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Spend" value="$12.2K" />
        <StatCard label="Revenue" value="$54.6K" delta="18.4%" deltaDirection="up" />
        <StatCard label="Avg ROAS" value="4.2x" delta="8.4%" deltaDirection="up" />
        <StatCard label="Avg CPL" value="$32" inverted delta="6.2%" deltaDirection="down" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Campaign performance" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "name", header: "Campaign" },
              { key: "spend", header: "Spend", align: "right" },
              { key: "rev", header: "Revenue", align: "right" },
              { key: "roas", header: "ROAS", align: "right" },
              { key: "conv", header: "Conv.", align: "right" },
              { key: "cpl", header: "CPL", align: "right" },
            ]}
            rows={[
              { name: "Brand — Google Search", spend: "$3,420", rev: "$18,200", roas: "5.3x", conv: 48, cpl: "$28" },
              { name: "SaaS leads — LinkedIn", spend: "$2,840", rev: "$12,400", roas: "4.4x", conv: 32, cpl: "$42" },
              { name: "Compare — long-tail", spend: "$1,920", rev: "$8,800", roas: "4.6x", conv: 22, cpl: "$38" },
              { name: "Newsletter — May update", spend: "$640", rev: "$4,200", roas: "6.6x", conv: 18, cpl: "$12" },
              { name: "ProductHunt — launch day", spend: "$240", rev: "$3,600", roas: "15.0x", conv: 14, cpl: "$8" },
              { name: "Twitter — AI thread", spend: "$1,820", rev: "$2,840", roas: "1.6x", conv: 8, cpl: "$82" },
            ] as unknown as Record<string, ReactNode>[]}
            onExport={() => {}}
          />
        </Card>

        <Card title="ROAS by campaign">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                { c: "Brand", roas: 5.3 },
                { c: "LinkedIn", roas: 4.4 },
                { c: "Compare", roas: 4.6 },
                { c: "Newsletter", roas: 6.6 },
                { c: "PH", roas: 15.0 },
                { c: "Twitter", roas: 1.6 },
              ]}>
                <XAxis dataKey="c" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="roas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Quality score trends (Google Ads)">
          <DataTable
            columns={[
              { key: "k", header: "Keyword" },
              { key: "trend", header: "Trend" },
              { key: "ctr", header: "Expected CTR" },
            ]}
            rows={[
              { k: "intercom alternative", trend: "↗ rising", ctr: "Above avg" },
              { k: "customer support inbox", trend: "→ stable", ctr: "Avg" },
              { k: "ai customer service", trend: "↘ falling", ctr: "Below avg" },
              { k: "shared inbox software", trend: "↗ rising", ctr: "Above avg" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Cost per Lead by source">
          <DataTable
            columns={[
              { key: "src", header: "Source" },
              { key: "leads", header: "Leads", align: "right" },
              { key: "spend", header: "Spend", align: "right" },
              { key: "cpl", header: "CPL", align: "right" },
            ]}
            rows={[
              { src: "Newsletter", leads: 124, spend: "$640", cpl: "$5" },
              { src: "ProductHunt", leads: 64, spend: "$240", cpl: "$4" },
              { src: "Google Search", leads: 158, spend: "$3,420", cpl: "$22" },
              { src: "LinkedIn", leads: 92, spend: "$2,840", cpl: "$31" },
              { src: "Twitter", leads: 28, spend: "$1,820", cpl: "$65" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Ad → landing → conversation path" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "ad", header: "Ad copy" },
              { key: "lp", header: "Landing" },
              { key: "clk", header: "Clicks", align: "right" },
              { key: "conv", header: "Conversations", align: "right" },
              { key: "cvr", header: "CVR", align: "right" },
            ]}
            rows={[
              { ad: "Stop paying $99/agent. Start at $9.99", lp: "/pricing", clk: "1,820", conv: 142, cvr: "7.8%" },
              { ad: "Every channel, no per-seat tax", lp: "/", clk: "1,420", conv: 86, cvr: "6.1%" },
              { ad: "Intercom alternative built for US teams", lp: "/vs/intercom", clk: "942", conv: 64, cvr: "6.8%" },
              { ad: "AI Agent included from $9.99", lp: "/ai-agent", clk: "812", conv: 38, cvr: "4.7%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Audience overlap" className="lg:col-span-3">
          <DataTable
            columns={[
              { key: "a1", header: "Audience 1" },
              { key: "a2", header: "Audience 2" },
              { key: "ovr", header: "Overlap %", align: "right" },
              { key: "bar", header: "" },
            ]}
            rows={[
              { a1: "LinkedIn — SaaS Founders", a2: "Google — intercom alt", ovr: "38%", bar: <OverlapBar pct={38} /> },
              { a1: "LinkedIn — Support Mgrs", a2: "LinkedIn — SaaS Founders", ovr: "62%", bar: <OverlapBar pct={62} /> },
              { a1: "Twitter — AI thread", a2: "ProductHunt launch", ovr: "24%", bar: <OverlapBar pct={24} /> },
              { a1: "Newsletter subs", a2: "Google — brand", ovr: "78%", bar: <OverlapBar pct={78} /> },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}

function OverlapBar({ pct }: { pct: number }) {
  return (
    <div className="w-32 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
      <div className="h-full rounded-full bg-[#3B82F6]" style={{ width: `${pct}%` }} />
    </div>
  )
}
