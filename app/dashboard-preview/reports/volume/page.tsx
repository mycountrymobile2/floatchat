"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { TabBar, Card, DataTable, StatCard } from "@/components/dashboard/primitives"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"
import type { ReactNode } from "react"

const sources = [
  { name: "Website chat", value: 8420, color: "#3B82F6" },
  { name: "Email", value: 5240, color: "#60A5FA" },
  { name: "WhatsApp", value: 3680, color: "#1D4ED8" },
  { name: "Voice", value: 1840, color: "#93C5FD" },
  { name: "SMS", value: 1620, color: "#1E40AF" },
  { name: "Help Center", value: 1240, color: "#2563EB" },
]

const tabs = [
  { value: "sources", label: "Sources" },
  { value: "geo", label: "Geography" },
  { value: "landings", label: "Landing Pages" },
  { value: "keywords", label: "Keywords" },
  { value: "utm", label: "UTM Campaigns" },
  { value: "devices", label: "Devices" },
]

export default function VolumeReportPage() {
  useEffect(() => { document.title = "Conversation Volume — FloatChat" }, [])
  const [tab, setTab] = useState("sources")
  return (
    <AppShell
      title="Conversation Volume & Acquisition"
      subtitle="Where conversations come from and how they find you."
    >
      <BackLink />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Conversations" value="22,040" delta="12.4%" deltaDirection="up" />
        <StatCard label="Unique Users" value="18,920" delta="8.2%" deltaDirection="up" />
        <StatCard label="New Users" value="14,280" footnote="68.4% of total" />
        <StatCard label="Returning" value="6,590" footnote="31.6% of total" />
      </div>

      <div className="mb-4"><TabBar tabs={tabs} active={tab} onChange={setTab} /></div>

      {tab === "sources" && (
        <div className="grid lg:grid-cols-3 gap-4">
          <Card title="Source mix" subtitle="Distribution of conversation origin">
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={sources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50} stroke="#0F1A2E" strokeWidth={2}>
                    {sources.map((s) => <Cell key={s.name} fill={s.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              {sources.map((s) => (
                <li key={s.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />{s.name}</span>
                  <span className="tabular-nums text-white/55">{s.value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Source Performance" className="lg:col-span-2">
            <DataTable
              columns={[
                { key: "source", header: "Source" },
                { key: "sessions", header: "Conversations", align: "right" },
                { key: "conv", header: "CVR", align: "right" },
                { key: "cpa", header: "CPA", align: "right" },
              ]}
              rows={[
                { source: "Organic Search", sessions: "7,420", conv: "4.8%", cpa: "$0" },
                { source: "Direct", sessions: "4,820", conv: "6.2%", cpa: "$0" },
                { source: "Paid Search", sessions: "3,180", conv: "3.4%", cpa: "$42" },
                { source: "Social", sessions: "2,640", conv: "2.8%", cpa: "$58" },
                { source: "Referral", sessions: "2,140", conv: "5.6%", cpa: "$0" },
                { source: "Email", sessions: "1,840", conv: "8.4%", cpa: "$8" },
              ] as unknown as Record<string, ReactNode>[]}
            />
          </Card>

          <Card title="New vs Returning visitors" className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
                <p className="text-xs text-white/55 mb-1">New visitors</p>
                <p className="text-2xl font-semibold tabular-nums">14,280 <span className="text-xs text-white/45 font-normal">(68.4%)</span></p>
                <p className="mt-1 text-xs text-emerald-400">CVR 3.2%</p>
              </div>
              <div className="rounded-lg bg-[#0F1A2E] ring-1 ring-white/5 p-4">
                <p className="text-xs text-white/55 mb-1">Returning visitors</p>
                <p className="text-2xl font-semibold tabular-nums">6,590 <span className="text-xs text-white/45 font-normal">(31.6%)</span></p>
                <p className="mt-1 text-xs text-emerald-400">CVR 8.4%</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "geo" && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="Conversations by Country">
            <DataTable
              columns={[
                { key: "country", header: "Country" },
                { key: "sessions", header: "Convos", align: "right" },
                { key: "users", header: "Users", align: "right" },
                { key: "bounce", header: "Bounce", align: "right" },
              ]}
              rows={[
                { country: "United States", sessions: "12,420", users: "10,840", bounce: "32%" },
                { country: "United Kingdom", sessions: "3,180", users: "2,720", bounce: "29%" },
                { country: "Canada", sessions: "2,140", users: "1,920", bounce: "31%" },
                { country: "Australia", sessions: "1,620", users: "1,420", bounce: "34%" },
                { country: "Germany", sessions: "1,240", users: "1,080", bounce: "38%" },
                { country: "Other", sessions: "1,440", users: "940", bounce: "41%" },
              ] as unknown as Record<string, ReactNode>[]}
            />
          </Card>
          <Card title="Top US cities">
            <DataTable
              columns={[
                { key: "city", header: "City" },
                { key: "region", header: "Region" },
                { key: "sessions", header: "Convos", align: "right" },
                { key: "conv", header: "CVR", align: "right" },
              ]}
              rows={[
                { city: "New York", region: "NY", sessions: "2,140", conv: "5.2%" },
                { city: "Los Angeles", region: "CA", sessions: "1,840", conv: "4.8%" },
                { city: "Chicago", region: "IL", sessions: "1,420", conv: "5.4%" },
                { city: "Austin", region: "TX", sessions: "1,180", conv: "6.2%" },
                { city: "Seattle", region: "WA", sessions: "1,020", conv: "5.8%" },
                { city: "Miami", region: "FL", sessions: "920", conv: "4.6%" },
              ] as unknown as Record<string, ReactNode>[]}
            />
          </Card>
        </div>
      )}

      {tab === "landings" && (
        <Card title="Top landing pages — where conversations started">
          <DataTable
            columns={[
              { key: "page", header: "Page" },
              { key: "sessions", header: "Convos", align: "right" },
              { key: "conv", header: "CVR", align: "right" },
              { key: "bounce", header: "Bounce", align: "right" },
            ]}
            rows={[
              { page: "/", sessions: "5,420", conv: "5.8%", bounce: "28%" },
              { page: "/pricing", sessions: "3,820", conv: "9.2%", bounce: "22%" },
              { page: "/ai-agent", sessions: "2,640", conv: "6.4%", bounce: "31%" },
              { page: "/help", sessions: "2,180", conv: "2.4%", bounce: "44%" },
              { page: "/integrations", sessions: "1,920", conv: "4.8%", bounce: "35%" },
              { page: "/compare", sessions: "1,420", conv: "5.2%", bounce: "33%" },
              { page: "/solutions/ecommerce", sessions: "1,180", conv: "6.8%", bounce: "29%" },
            ] as unknown as Record<string, ReactNode>[]}
            onExport={() => {}}
          />
        </Card>
      )}

      {tab === "keywords" && (
        <Card title="Top organic keywords">
          <DataTable
            columns={[
              { key: "keyword", header: "Keyword" },
              { key: "sessions", header: "Convos", align: "right" },
              { key: "conv", header: "CVR", align: "right" },
            ]}
            rows={[
              { keyword: "customer support inbox", sessions: "1,840", conv: "6.2%" },
              { keyword: "intercom alternative", sessions: "1,420", conv: "8.4%" },
              { keyword: "ai customer service", sessions: "1,180", conv: "4.8%" },
              { keyword: "shared inbox software", sessions: "942", conv: "5.6%" },
              { keyword: "whatsapp customer support", sessions: "820", conv: "7.2%" },
              { keyword: "zendesk vs intercom", sessions: "640", conv: "4.2%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      )}

      {tab === "utm" && (
        <Card title="UTM campaign performance">
          <DataTable
            columns={[
              { key: "source", header: "utm_source" },
              { key: "medium", header: "utm_medium" },
              { key: "campaign", header: "utm_campaign" },
              { key: "sessions", header: "Convos", align: "right" },
              { key: "conv", header: "CVR", align: "right" },
            ]}
            rows={[
              { source: "google", medium: "cpc", campaign: "brand-2026", sessions: "2,140", conv: "8.4%" },
              { source: "linkedin", medium: "cpc", campaign: "saas-leads-q2", sessions: "1,820", conv: "5.2%" },
              { source: "newsletter", medium: "email", campaign: "may-product-update", sessions: "1,240", conv: "12.4%" },
              { source: "twitter", medium: "social", campaign: "thread-ai-launch", sessions: "942", conv: "3.8%" },
              { source: "producthunt", medium: "referral", campaign: "launch-day", sessions: "640", conv: "9.4%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      )}

      {tab === "devices" && (
        <Card title="Device split">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                { device: "Desktop", convos: 14820, bounce: 28, cvr: 5.2 },
                { device: "Mobile", convos: 6420, bounce: 41, cvr: 3.4 },
                { device: "Tablet", convos: 800, bounce: 38, cvr: 3.8 },
              ]}>
                <XAxis dataKey="device" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="convos" fill="#3B82F6" name="Conversations" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </AppShell>
  )
}

function BackLink() {
  return (
    <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
      <ArrowLeft className="h-3 w-3" /> Back to Reports
    </Link>
  )
}
