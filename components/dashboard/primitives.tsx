"use client"

import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight, ArrowDownRight, Download, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/* ----------------------------- StatCard ----------------------------- */
export interface StatCardProps {
  label: string
  value: string
  delta?: string
  deltaDirection?: "up" | "down"
  /** When the metric is inverted (lower is better — CAC, Churn, CPL). */
  inverted?: boolean
  footnote?: string
  icon?: ReactNode
}

export function StatCard({ label, value, delta, deltaDirection, inverted, footnote, icon }: StatCardProps) {
  const direction = deltaDirection
  const positive = direction === "up"
  const goodTone = inverted ? !positive : positive
  return (
    <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium text-white/55">{label}</p>
        {icon && <span className="text-white/40">{icon}</span>}
      </div>
      <p className="mt-2 text-[28px] font-semibold tracking-tight leading-none">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-[12px]">
        {delta && direction && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
              goodTone ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
            )}
          >
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta}
          </span>
        )}
        {footnote && <span className="text-white/50">{footnote}</span>}
      </div>
    </div>
  )
}

/* ----------------------------- StatusPill --------------------------- */
export type StatusVariant = "good" | "warning" | "fail" | "info" | "muted"
export interface StatusPillProps {
  variant: StatusVariant
  label: string
  size?: "sm" | "md"
}

const statusStyles: Record<StatusVariant, string> = {
  good: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  fail: "bg-red-500/10 text-red-400 ring-red-500/20",
  info: "bg-[#3B82F6]/10 text-[#60A5FA] ring-[#3B82F6]/20",
  muted: "bg-white/[0.04] text-white/55 ring-white/10",
}

export function StatusPill({ variant, label, size = "md" }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full ring-1 font-medium",
        size === "sm" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]",
        statusStyles[variant]
      )}
    >
      {label}
    </span>
  )
}

/* ----------------------------- Card --------------------------------- */
export interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ title, subtitle, action, children, className }: CardProps) {
  return (
    <section className={cn("rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] overflow-hidden", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
          <div className="min-w-0">
            {title && <h3 className="text-base font-semibold tracking-tight">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-white/55">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className="px-5 pb-5">{children}</div>
    </section>
  )
}

/* ----------------------------- TabBar ------------------------------- */
export interface TabBarProps {
  tabs: { value: string; label: string; count?: number }[]
  active: string
  onChange: (value: string) => void
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-[#0F1A2E] ring-1 ring-white/5 p-1">
      {tabs.map((t) => {
        const on = t.value === active
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
              on ? "bg-[#3B82F6] text-white" : "text-white/65 hover:text-white hover:bg-white/[0.04]"
            )}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span className={cn("text-[10px] tabular-nums", on ? "text-white/80" : "text-white/40")}>
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ----------------------------- DataTable ---------------------------- */
export interface Column<T = Record<string, unknown>> {
  key: keyof T | string
  header: string
  align?: "left" | "right" | "center"
  width?: string
  render?: (row: T) => ReactNode
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[]
  rows: T[]
  onExport?: () => void
  exportLabel?: string
}

export function DataTable<T extends Record<string, unknown>>({ columns, rows, onExport, exportLabel = "Export CSV" }: DataTableProps<T>) {
  return (
    <div>
      {onExport && (
        <div className="flex justify-end mb-3">
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 bg-white/[0.04] ring-1 ring-white/10 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <Download className="h-3 w-3" />
            {exportLabel}
          </button>
        </div>
      )}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  style={{ width: c.width, textAlign: c.align }}
                  className="text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA] bg-[#1E3050] px-3 py-2 first:rounded-l-md last:rounded-r-md"
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={cn("border-b border-white/5 last:border-0", i % 2 === 1 && "bg-white/[0.015]")}>
                {columns.map((c) => (
                  <td
                    key={String(c.key)}
                    style={{ textAlign: c.align }}
                    className="px-3 py-2.5 text-[13px] text-white/80 tabular-nums"
                  >
                    {c.render ? c.render(row) : (row[c.key as keyof T] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ----------------------------- FunnelStep --------------------------- */
export interface FunnelStepProps {
  label: string
  value: string | number
  pctOfTotal?: string
  dropPct?: string
  highlight?: boolean
}

export function FunnelStep({ label, value, pctOfTotal, dropPct, highlight }: FunnelStepProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-lg ring-1 px-4 py-3 flex items-center justify-between gap-4",
          highlight
            ? "bg-[#3B82F6]/10 ring-[#3B82F6]/30"
            : "bg-white/[0.03] ring-white/10"
        )}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-white/85">{label}</p>
          {pctOfTotal && <p className="text-[11px] text-white/50 mt-0.5">{pctOfTotal} of total</p>}
        </div>
        <div className="text-right">
          <p className="text-base font-semibold tabular-nums">{value}</p>
        </div>
      </div>
      {dropPct && (
        <div className="flex items-center justify-center my-1">
          <span className="text-[10px] text-red-400 font-medium">↓ {dropPct} drop</span>
        </div>
      )}
    </div>
  )
}

/* ----------------------------- EmptyState --------------------------- */
export interface EmptyStateProps {
  icon: ReactNode
  title: string
  body?: string
  primaryAction?: { label: string; href?: string; onClick?: () => void }
}

export function EmptyState({ icon, title, body, primaryAction }: EmptyStateProps) {
  const Btn = (
    <button
      onClick={primaryAction?.onClick}
      className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium transition-colors"
    >
      {primaryAction?.label}
    </button>
  )
  return (
    <div className="rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-10 text-center">
      <div className="mx-auto w-12 h-12 rounded-xl bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA] mb-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {body && <p className="mt-1 text-sm text-white/55 max-w-md mx-auto">{body}</p>}
      {primaryAction && (
        <div className="mt-5">
          {primaryAction.href ? <Link to={primaryAction.href}>{Btn}</Link> : Btn}
        </div>
      )}
    </div>
  )
}

/* ----------------------------- ReportCategoryCard ------------------- */
export interface ReportCategoryCardProps {
  title: string
  subtitle: string
  href: string
  kpi1: { label: string; value: string; delta: string; direction: "up" | "down" }
  kpi2: { label: string; value: string; delta: string; direction: "up" | "down" }
  icon?: ReactNode
  inverted?: boolean
}

export function ReportCategoryCard({ title, subtitle, href, kpi1, kpi2, icon, inverted }: ReportCategoryCardProps) {
  return (
    <Link
      to={href}
      className="group block rounded-xl bg-[#16243D] ring-1 ring-white/[0.06] p-5 hover:ring-[#3B82F6]/40 hover:bg-[#1A2B49] transition-all"
    >
      <header className="flex items-start gap-3 mb-2">
        {icon && (
          <div className="shrink-0 w-9 h-9 rounded-lg bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA]">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
            <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-[#60A5FA] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="mt-1 text-xs text-white/55 leading-relaxed">{subtitle}</p>
        </div>
      </header>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4">
        {[kpi1, kpi2].map((k, i) => {
          const positive = k.direction === "up"
          const good = inverted ? !positive : positive
          return (
            <div key={i}>
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{k.label}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">{k.value}</p>
              <span
                className={cn(
                  "mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium",
                  good ? "text-emerald-400" : "text-red-400"
                )}
              >
                {positive ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                {k.delta}
              </span>
            </div>
          )
        })}
      </div>
    </Link>
  )
}

/* ----------------------------- ChecklistItem ------------------------ */
export interface ChecklistItemProps {
  label: string
  description?: string
  status: StatusVariant
  statusLabel: string
}

export function ChecklistItem({ label, description, status, statusLabel }: ChecklistItemProps) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/85">{label}</p>
        {description && <p className="mt-0.5 text-xs text-white/50">{description}</p>}
      </div>
      <StatusPill variant={status} label={statusLabel} />
    </div>
  )
}

/* ----------------------------- ProgressBar -------------------------- */
export function ProgressBar({ value, max = 100, color = "#3B82F6" }: { value: number; max?: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.05] overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

/* ----------------------------- HeaderButton ------------------------- */
export function HeaderButton({ variant = "secondary", icon, children, onClick }: { variant?: "primary" | "secondary"; icon?: ReactNode; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-sm font-medium transition-colors",
        variant === "primary"
          ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
          : "bg-white/[0.04] ring-1 ring-white/10 text-white/80 hover:text-white hover:bg-white/[0.08]"
      )}
    >
      {icon}
      {children}
    </button>
  )
}
