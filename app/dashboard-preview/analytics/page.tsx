"use client"

import { useEffect } from "react"
import { LineChart as LineIcon } from "lucide-react"
import { AppShell } from "@/components/dashboard/app-shell"
import { EmptyState } from "@/components/dashboard/primitives"

export default function AnalyticsGatePage() {
  useEffect(() => { document.title = "Analytics — FloatChat Dashboard" }, [])
  return (
    <AppShell title="Analytics" subtitle="Connect Google Analytics + Search Console to surface paid + organic alongside support data.">
      <EmptyState
        icon={<LineIcon className="h-5 w-5" />}
        title="Not connected to Google"
        body="Head to Overview and click Connect Google. That single sign-in covers Search Console + Analytics, and you'll see paid and organic traffic alongside conversation volume."
        primaryAction={{ label: "Go to Overview", href: "/dashboard-preview" }}
      />
    </AppShell>
  )
}
