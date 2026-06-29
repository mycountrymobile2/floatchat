"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"
import { MessageSquare, Mail, Phone, Bot, BarChart3, Settings, LogOut } from "lucide-react"

const quickLinks: Array<{ label: string; href: string; icon: typeof MessageSquare; desc: string; comingSoon?: boolean }> = [
  { label: "Live Chat", href: "/live-chat", icon: MessageSquare, desc: "Manage chat conversations" },
  { label: "Inbox", href: "/inbox", icon: Mail, desc: "Email, WhatsApp, all channels" },
  { label: "AI Captain", href: "/ai-agent", icon: Bot, desc: "Configure AI replies" },
  { label: "Voice & SMS", href: "/voice", icon: Phone, desc: "Phone numbers and calls" },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, desc: "Reports and insights", comingSoon: true },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, desc: "Account and team settings", comingSoon: true },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Dashboard — FloatChat"
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login")
      } else {
        setUser(session.user)
      }
      setLoading(false)
    })
  }, [navigate])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there"

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">FloatChat</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Hey {firstName} 👋</h1>
          <p className="text-muted-foreground mb-10">Welcome to your FloatChat workspace.</p>

          {/* Setup banner */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 mb-10">
            <h2 className="font-semibold text-foreground mb-1">Complete your setup</h2>
            <p className="text-sm text-muted-foreground mb-4">Add your first channel to start receiving messages.</p>
            <div className="flex flex-wrap gap-3">
              <Button size="sm" asChild>
                <Link to="/live-chat">Add Live Chat Widget</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link to="/whatsapp">Connect WhatsApp</Link>
              </Button>
            </div>
          </div>

          {/* Quick links grid */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={link.href}
                  className={`relative flex flex-col p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group ${link.comingSoon ? "opacity-70" : ""}`}
                >
                  <link.icon className="h-5 w-5 text-primary mb-3" />
                  <span className="font-medium text-foreground text-sm mb-0.5">{link.label}</span>
                  <span className="text-xs text-muted-foreground">{link.desc}</span>
                  {link.comingSoon && (
                    <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted/60 rounded px-1.5 py-0.5">
                      Soon
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Upgrade nudge */}
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-semibold text-foreground mb-1">You're on the Free plan</p>
              <p className="text-sm text-muted-foreground">Add AI Captain from $9.99/month. No per-resolution fees.</p>
            </div>
            <Button size="sm" asChild>
              <Link to="/pricing">See plans</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
