import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isConfigured && import.meta.env.PROD) {
  // Surfaces in browser console + Vercel logs so a missing-env deploy is loud, not silent.
  // eslint-disable-next-line no-console
  console.error(
    "[FloatChat] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Auth and lead forms will fail."
  )
}

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : createClient("https://placeholder.supabase.co", "placeholder-key")

export type LeadInsert = {
  name: string
  email: string
  company?: string
  message?: string
  phone?: string
  source: "contact" | "demo" | "newsletter" | "signup"
  plan?: string
}

/**
 * Insert a lead.
 *
 * If Supabase env vars are missing:
 *   - In development: log the lead and return success (lets you build forms without a backend).
 *   - In production: return an error so the UI shows a real failure instead of silently dropping the lead.
 */
export async function insertLead(lead: LeadInsert) {
  if (!isConfigured) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("[FloatChat] Supabase not configured (DEV). Lead data:", lead)
      return { error: null }
    }
    return {
      error: {
        message:
          "Lead capture is temporarily unavailable. Please email us directly at hello@floatchat.com.",
      },
    }
  }
  return supabase.from("leads").insert(lead)
}
