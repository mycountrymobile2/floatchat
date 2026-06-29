"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Languages,
  MessageSquareText,
  Brain,
  SpellCheck,
  Check,
  Send,
  ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/* ─────────────────────────────────────────
   Auto-Translate demo
─────────────────────────────────────────── */
function TranslateDemo() {
  const [langIndex, setLangIndex] = useState(0)
  const languages = [
    { from: "English", to: "Spanish", original: "How can I help you today?", translated: "¿Cómo puedo ayudarte hoy?" },
    { from: "French",  to: "English", original: "Je voudrais un remboursement", translated: "I would like a refund" },
    { from: "German",  to: "English", original: "Wo ist meine Bestellung?",  translated: "Where is my order?" },
  ]
  useEffect(() => {
    const i = setInterval(() => setLangIndex((x) => (x + 1) % languages.length), 3000)
    return () => clearInterval(i)
  }, [languages.length])
  const c = languages[langIndex]

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-4 shadow-md border border-[#3B82F6]/10 min-h-[78px]">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#1D4ED8]">{c.from}</Badge>
          <span className="text-xs text-slate-500">Detected</span>
        </div>
        <p className="text-[#0F2A4A] font-medium text-sm">{c.original}</p>
      </div>
      <div className="flex justify-center">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] flex items-center justify-center shadow-lg shadow-[#3B82F6]/30">
          <Languages className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] rounded-xl p-4 shadow-md shadow-[#3B82F6]/30 text-white min-h-[78px]">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="text-xs bg-white/20 border-0 text-white">{c.to}</Badge>
          <span className="text-xs opacity-80">Translated</span>
        </div>
        <p className="font-medium text-sm">{c.translated}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Sentiment demo
─────────────────────────────────────────── */
function SentimentDemo() {
  const [sentiment, setSentiment] = useState(0)
  const moods = [
    { emoji: "😊", label: "Happy",      color: "from-emerald-400 to-emerald-500", position: 85 },
    { emoji: "😐", label: "Neutral",    color: "from-amber-400 to-amber-500",     position: 50 },
    { emoji: "😤", label: "Frustrated", color: "from-rose-400 to-rose-500",       position: 20 },
  ]
  useEffect(() => {
    const i = setInterval(() => setSentiment((s) => (s + 1) % moods.length), 2500)
    return () => clearInterval(i)
  }, [moods.length])
  const c = moods[sentiment]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-5xl mb-1 transition-all duration-500 leading-none h-12">{c.emoji}</div>
        <p className="text-sm font-medium text-[#0F2A4A]">{c.label}</p>
      </div>
      <div className="bg-white rounded-xl p-3 shadow-md border border-[#3B82F6]/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-[#0F2A4A]">Score</span>
          <Badge className={`bg-gradient-to-r ${c.color} text-white border-0 text-[10px]`}>{c.position}%</Badge>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${c.color} rounded-full transition-all duration-700`}
            style={{ width: `${c.position}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400">
          <span>Negative</span>
          <span>Positive</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Smart Auto-Reply demo
─────────────────────────────────────────── */
function AutoReplyDemo() {
  const [typing, setTyping] = useState(true)
  const [showReply, setShowReply] = useState(false)
  useEffect(() => {
    const cycle = () => {
      setTyping(true); setShowReply(false)
      setTimeout(() => { setTyping(false); setShowReply(true) }, 2000)
    }
    cycle()
    const i = setInterval(cycle, 5000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-3 shadow-md border border-[#3B82F6]/10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-[10px] font-medium text-slate-600">JD</span>
          </div>
          <p className="text-xs font-medium text-[#0F2A4A]">Customer</p>
        </div>
        <p className="text-xs text-[#0F2A4A]">I ordered last week but still no delivery update?</p>
      </div>
      <div className="bg-gradient-to-r from-[#60A5FA] to-[#1D4ED8] rounded-xl p-3 text-white shadow-md shadow-[#3B82F6]/30 min-h-[88px]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-medium">{typing ? "Generating…" : "AI suggested reply"}</p>
        </div>
        <p className={`text-xs transition-opacity duration-300 ${showReply ? "opacity-100" : "opacity-0"}`}>
          I apologize for the delay! Let me check the status of your order right away.
        </p>
      </div>
      <Button
        size="sm"
        className={`w-full font-medium bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#2563EB] hover:to-[#1E40AF] text-xs h-8 transition-opacity duration-300 ${showReply ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Send className="w-3 h-3 mr-1" /> Send
      </Button>
    </div>
  )
}

/* ─────────────────────────────────────────
   Smart Corrections demo
─────────────────────────────────────────── */
function CorrectionsDemo() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setStep((s) => (s + 1) % 2), 2000)
    return () => clearInterval(i)
  }, [])
  const stages: Array<{ text: string; errors: string[]; corrected?: boolean }> = [
    { text: "Im hapy to hlep you with taht", errors: ["Im", "hapy", "hlep", "taht"] },
    { text: "I'm happy to help you with that", errors: [], corrected: true },
  ]
  const c = step === 0 ? stages[0] : stages[1]

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-xl p-4 shadow-md border border-[#3B82F6]/10 min-h-[110px]">
        <div className="flex items-center gap-2 mb-3">
          <SpellCheck className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-xs font-medium text-[#0F2A4A]">Smart corrections</span>
          <Badge className={`bg-emerald-100 text-emerald-700 border-0 ml-auto text-[10px] transition-opacity duration-300 ${c.corrected ? "opacity-100" : "opacity-0"}`}>Fixed</Badge>
        </div>
        <p className="text-sm">
          {c.corrected ? (
            <span className="text-emerald-700 font-medium">{c.text}</span>
          ) : (
            c.text.split(" ").map((word, i) => (
              <span key={i}>
                {c.errors.includes(word) ? (
                  <span className="bg-rose-50 text-rose-600 px-1 rounded underline decoration-wavy decoration-rose-400">{word}</span>
                ) : word}{" "}
              </span>
            ))
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["Grammar", "Spelling", "Tone"].map((item, i) => (
          <div key={i} className="bg-[#3B82F6]/10 rounded-lg p-1.5 text-center border border-[#3B82F6]/15">
            <Check className="w-3 h-3 text-[#1D4ED8] mx-auto mb-0.5" />
            <span className="text-[10px] font-medium text-[#1D4ED8]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Bento card shell
─────────────────────────────────────────── */
function BentoCard({
  icon: Icon,
  tag,
  title,
  description,
  stat,
  statLabel,
  className = "",
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  tag: string
  title: string
  description: string
  stat: string
  statLabel: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`group relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl p-6 lg:p-7 overflow-hidden transition-all duration-300 hover:border-white/80 hover:bg-white/55 hover:shadow-[0_30px_60px_-30px_rgba(59,130,246,0.35)] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(219,234,254,0.35) 50%, rgba(199,210,254,0.3) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 0 1px rgba(255,255,255,0.25), 0 10px 40px -20px rgba(59,130,246,0.18)",
      }}
    >
      {/* Top highlight hairline */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)" }}
      />
      {/* Hover blue accent */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)" }}
      />
      {/* Soft inner color glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 w-[260px] h-[260px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(147,197,253,0.55), transparent 70%)" }}
      />
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-start gap-3 min-w-0">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8] text-white flex items-center justify-center shadow-md shadow-[#3B82F6]/30">
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-slate-400">{tag}</span>
              <span className="h-px w-4 bg-slate-300" />
              <h3 className="text-[16px] font-medium text-[#0F2A4A] leading-tight truncate">{title}</h3>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed">{description}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl font-medium tracking-tight text-[#1D4ED8]">{stat}</div>
          <div className="text-[10px] text-slate-400">{statLabel}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

export function AIFeatures() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-[#F5F7FF] to-[#EEF2FF]">
      {/* Ambient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(closest-side, #BFD4FF 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-50"
             style={{ background: "radial-gradient(closest-side, #A8C8FF 0%, transparent 70%)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="text-[11px] font-mono text-slate-400">/ AI</span>
              <span className="h-px w-8 bg-slate-300" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
                Powered by AI
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0F2A4A] leading-[1.05]">
              AI that actually{" "}
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent">
                helps your team.
              </span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <p className="text-base text-slate-500 leading-relaxed">
              Stop drowning in tickets. Captain handles repetitive queries, translates conversations, and helps your team respond 3× faster — zero learning curve.
            </p>
            <Link
              to="/ai-agent"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#1D4ED8] hover:gap-2 transition-all"
            >
              How Captain works <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-5">
          {/* Auto-Translate — wide hero */}
          <BentoCard
            icon={Languages}
            tag="01"
            title="Auto-Translate"
            description="Real-time translation across 50+ languages."
            stat="50+"
            statLabel="languages"
            className="md:col-span-4"
          >
            <TranslateDemo />
          </BentoCard>

          {/* Sentiment — tall narrow */}
          <BentoCard
            icon={MessageSquareText}
            tag="02"
            title="Sentiment Analysis"
            description="Detect mood and urgency instantly."
            stat="Live"
            statLabel="detection"
            className="md:col-span-2"
          >
            <SentimentDemo />
          </BentoCard>

          {/* Auto-Reply */}
          <BentoCard
            icon={Brain}
            tag="03"
            title="Smart Auto-Reply"
            description="AI learns from your best responses. Suggests replies in seconds."
            stat="5s"
            statLabel="avg response"
            className="md:col-span-3"
          >
            <AutoReplyDemo />
          </BentoCard>

          {/* Corrections */}
          <BentoCard
            icon={SpellCheck}
            tag="04"
            title="Smart Corrections"
            description="Fix typos, grammar, and tone automatically before sending."
            stat="0"
            statLabel="typos"
            className="md:col-span-3"
          >
            <CorrectionsDemo />
          </BentoCard>
        </div>

      </div>
    </section>
  )
}
