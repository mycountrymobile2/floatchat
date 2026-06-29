"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { Card, DataTable, StatCard } from "@/components/dashboard/primitives"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import type { ReactNode } from "react"

export default function EngagementReportPage() {
  useEffect(() => { document.title = "Engagement — FloatChat" }, [])

  return (
    <AppShell title="Engagement" subtitle="How customers interact with replies, articles, and CTAs.">
      <Link to="/dashboard-preview/reports" className="inline-flex items-center gap-1 text-xs text-white/55 hover:text-white mb-4">
        <ArrowLeft className="h-3 w-3" /> Back to Reports
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Avg Resolution" value="3m 24s" delta="6.8%" deltaDirection="up" />
        <StatCard label="Replies / Conversation" value="3.4" delta="4.2%" deltaDirection="up" />
        <StatCard label="Help Article Scroll" value="58%" footnote="avg to 75% mark" />
        <StatCard label="CTA Clicks" value="8,260" delta="12.4%" deltaDirection="up" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Replies per Conversation by Source" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={[
                { source: "Organic", replies: 3.8 },
                { source: "Direct", replies: 3.4 },
                { source: "Paid Search", replies: 4.2 },
                { source: "Social", replies: 2.8 },
                { source: "Email", replies: 4.6 },
              ]}>
                <XAxis dataKey="source" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                <Tooltip contentStyle={{ background: "#0F1A2E", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="replies" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Help Article scroll depth">
          <ul className="space-y-2.5">
            {[
              { name: "Reached 25%", pct: 92 },
              { name: "Reached 50%", pct: 78 },
              { name: "Reached 75%", pct: 58 },
              { name: "Reached 100%", pct: 32 },
            ].map((row) => (
              <li key={row.name}>
                <div className="flex justify-between text-xs">
                  <span className="text-white/65">{row.name}</span>
                  <span className="tabular-nums font-medium">{row.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <div className="h-full rounded-full bg-[#3B82F6]" style={{ width: `${row.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Avg conversation length by page" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "page", header: "Page" },
              { key: "duration", header: "Avg Duration", align: "right" },
              { key: "convos", header: "Conversations", align: "right" },
            ]}
            rows={[
              { page: "/pricing", duration: "4m 12s", convos: "3,820" },
              { page: "/ai-agent", duration: "3m 48s", convos: "2,640" },
              { page: "/help/refunds", duration: "2m 16s", convos: "2,140" },
              { page: "/integrations", duration: "3m 32s", convos: "1,920" },
              { page: "/compare", duration: "4m 02s", convos: "1,420" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="CTA click performance">
          <DataTable
            columns={[
              { key: "cta", header: "CTA" },
              { key: "clicks", header: "Clicks", align: "right" },
              { key: "rate", header: "Rate", align: "right" },
            ]}
            rows={[
              { cta: "Start free trial", clicks: "3,820", rate: "12.4%" },
              { cta: "Book a demo", clicks: "1,920", rate: "8.2%" },
              { cta: "Chat with us", clicks: "1,420", rate: "6.8%" },
              { cta: "Compare plans", clicks: "942", rate: "4.2%" },
              { cta: "Watch the demo", clicks: "640", rate: "3.4%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Form abandonment" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "form", header: "Form" },
              { key: "starts", header: "Starts", align: "right" },
              { key: "completes", header: "Completes", align: "right" },
              { key: "abandon", header: "Abandon %", align: "right" },
            ]}
            rows={[
              { form: "Signup (email + company)", starts: "4,820", completes: "3,820", abandon: "20.7%" },
              { form: "Book demo (full)", starts: "2,140", completes: "1,420", abandon: "33.6%" },
              { form: "Contact sales", starts: "1,640", completes: "1,180", abandon: "28.0%" },
              { form: "Newsletter", starts: "942", completes: "840", abandon: "10.8%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>

        <Card title="Video engagement (homepage demo)">
          <DataTable
            columns={[
              { key: "video", header: "Video" },
              { key: "views", header: "Views", align: "right" },
              { key: "completion", header: "Completion", align: "right" },
            ]}
            rows={[
              { video: "Homepage hero demo", views: "8,420", completion: "62%" },
              { video: "AI Agent walkthrough", views: "3,180", completion: "48%" },
              { video: "Inbox tour", views: "1,920", completion: "54%" },
            ] as unknown as Record<string, ReactNode>[]}
          />
        </Card>
      </div>
    </AppShell>
  )
}
