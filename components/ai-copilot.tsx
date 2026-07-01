"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight, Zap, X, ChevronRight, ArrowUp, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ── Copilot panel demo ───────────────── */

const PROMPTS = [
  "Summarize this conversation",
  "Suggest an answer",
  "Rate this conversation",
]

function CopilotPalette() {
  const [highlight, setHighlight] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setHighlight((h) => (h + 1) % PROMPTS.length), 2200)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="relative">
      {/* Outer aura */}
      <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-[#60A5FA]/30 via-[#3B82F6]/15 to-transparent blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-bl from-[#7DD3FC]/20 to-transparent blur-2xl opacity-70 pointer-events-none" />

      {/* Glass shell */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[420px] rounded-3xl overflow-hidden backdrop-blur-2xl border border-white/15 shadow-[0_30px_80px_-20px_rgba(59,130,246,0.45),inset_0_1px_0_rgba(255,255,255,0.15)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,18,40,0.85) 0%, rgba(11,18,40,0.7) 100%)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(125,211,252,0.6) 30%, rgba(96,165,250,0.8) 50%, rgba(125,211,252,0.6) 70%, transparent)",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-[14px] font-semibold text-white">Copilot</span>
          <button className="text-[#60A5FA] hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pt-7 pb-5 min-h-[440px] flex flex-col">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center mb-5"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-[#60A5FA]/20 blur-xl"
            />
            <MessageSquare className="relative h-6 w-6 text-white/80" strokeWidth={1.5} />
            <span className="absolute -bottom-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#7DD3FC] to-[#1D4ED8] shadow-md shadow-[#3B82F6]/40">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </span>
          </motion.div>

          {/* Intro */}
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[20px] font-semibold text-white mb-2"
          >
            Get started with Copilot
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[13.5px] text-slate-300/80 leading-relaxed mb-7"
          >
            Need a quick summary, want to check past conversations, or draft a better reply? Copilot's here to speed things up.
          </motion.p>

          {/* Prompts */}
          <div className="mb-2">
            <p className="text-[11px] text-slate-400 mb-2.5">Try these prompts</p>
            <div className="space-y-2">
              {PROMPTS.map((p, i) => (
                <motion.button
                  key={p}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 2 }}
                  className={`group w-full flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-[13px] text-left border transition-all duration-300 ${
                    i === highlight
                      ? "bg-white/[0.07] border-[#60A5FA]/40 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      : "bg-white/[0.03] border-white/[0.06] text-slate-200 hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{p}</span>
                  <ChevronRight className={`h-4 w-4 shrink-0 transition-colors ${i === highlight ? "text-[#7DD3FC]" : "text-slate-500"}`} />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          {/* Brand row */}
          <div className="flex items-center gap-2 mt-6 mb-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#60A5FA] to-[#1D4ED8]">
              <MessageSquare className="h-2.5 w-2.5 text-white" />
            </span>
            <span className="text-[12px] text-slate-300 font-medium">FloatChat</span>
          </div>

          {/* Composer */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
            <span className="flex-1 text-[13px] text-slate-400">Send message…</span>
            <button className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function AICopilot() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-[#070C1A] via-[#0F1A38] to-[#1B2A5A]">
      {/* Mesh blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-10 left-1/4 w-[680px] h-[480px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(closest-side, #3B82F6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[520px] h-[420px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(closest-side, #60A5FA 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 50%, black 30%, transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/40 bg-[#3B82F6]/10 backdrop-blur-sm px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#60A5FA] animate-ping opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A8C8FF]">
                Agent Copilot
              </span>
            </div>

            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-white leading-[1.05]">
              A{" "}
              <span className="bg-gradient-to-r from-[#7DD3FC] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
                copilot
              </span>{" "}
              <span className="text-slate-400">for your</span> humans.
            </h2>

            <p className="mt-5 text-base lg:text-lg text-slate-300 leading-relaxed max-w-md">
              The Agent Copilot lives one keystroke away — drafting replies, summarizing threads, and surfacing knowledge-grounded answers so your team resolves faster without leaving the conversation.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="group h-12 px-8 min-w-[200px] justify-center rounded-full text-[15px] font-medium text-white bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] hover:from-[#7DD3FC] hover:via-[#60A5FA] hover:to-[#3B82F6] shadow-[0_10px_30px_-6px_rgba(59,130,246,0.7)] ring-2 ring-[#60A5FA]/30 transition-all"
              >
                <Link to="/ai-agent">
                  Try Copilot free
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              <Link
                to="/ai-agent"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A8C8FF] hover:text-white hover:gap-2 transition-all"
              >
                <Zap className="h-3.5 w-3.5" /> See how it assists
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-4 -left-4 lg:-left-10 z-10 inline-flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 shadow-xl">
              <kbd className="px-1.5 py-0.5 rounded border border-white/20 bg-white/10 text-[10px] font-mono text-white">/</kbd>
              <span className="text-[11px] text-slate-300">to open Copilot</span>
            </div>

            <CopilotPalette />
          </div>
        </div>
      </div>
    </section>
  )
}
