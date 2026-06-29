import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">


      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">

        {/* Main centerpiece card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl px-6 sm:px-10 py-14 lg:py-20 text-center overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(237,233,254,0.65) 35%, rgba(219,234,254,0.55) 65%, rgba(207,250,254,0.6) 100%)",
          }}
        >
          {/* Top hairline rainbow accent */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-8 right-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #A5F3FC 20%, #93C5FD 40%, #C4B5FD 60%, #F0ABFC 80%, transparent)",
            }}
          />

          {/* Soft inner radial glow */}
          <div
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 55% 70% at 50% 50%, rgba(147,197,253,0.35), rgba(196,181,253,0.18) 50%, transparent 75%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom corner glow */}
          <div
            className="pointer-events-none absolute -bottom-32 -right-20 w-[460px] h-[380px] opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(240,171,252,0.35), transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Bottom-left accent */}
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 w-[400px] h-[340px] opacity-50"
            style={{
              background:
                "radial-gradient(closest-side, rgba(165,243,252,0.4), transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Live status pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium text-[#0F2A4A]">
              142 teams started today
            </span>
            <span className="h-3 w-px bg-slate-200" />
            <span className="text-[11px] text-slate-500">avg. setup 4m 32s</span>
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative inline-flex items-center gap-2 mb-5"
          >
            <span className="text-[11px] font-mono text-slate-400">/ START</span>
            <span className="h-px w-8 bg-slate-300" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#3B82F6]">
              Ready when you are
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F2A4A] text-balance mb-6 leading-[1.05]"
          >
            Start free.{" "}
            <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] via-50% to-[#8B5CF6] bg-clip-text text-transparent">
              Scale when ready.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="relative text-base sm:text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            The customer support platform built for US teams. Replace Intercom, Zendesk, and Tawk — for less than your daily coffee.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Link
              to="/signup?plan=free"
              className="group inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#1D4ED8] text-[15px] font-medium text-white hover:from-[#3B82F6] hover:via-[#2563EB] hover:to-[#1E40AF] hover:scale-[1.02] transition-all duration-300"
            >
              <Sparkles className="h-4 w-4" />
              Start Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>

            <Link
              to="/demo"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-slate-300 bg-white text-[15px] font-medium text-[#0F2A4A] hover:bg-slate-50 hover:border-slate-400 hover:scale-[1.02] transition-all duration-300"
            >
              Book a Demo
            </Link>
          </motion.div>

        </motion.div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] font-medium text-slate-600"
        >
          {["SOC 2 Type II in progress", "Meta Business Partner", "DigitalOcean NYC3", "GDPR compliant"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
