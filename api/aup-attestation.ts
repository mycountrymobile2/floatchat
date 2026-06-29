/**
 * AUP attestation logging endpoint.
 *
 * Compliance: when a new customer signs up, they tick a checkbox agreeing to
 * the Acceptable Use Policy (and Terms + Privacy). The DPA + AUP require us to
 * keep a record of which version of the policy each customer agreed to and
 * when — so we can prove they agreed if there's ever an enforcement question.
 *
 * Posted by /signup AFTER a successful supabase.auth.signUp(). Non-blocking:
 * signup itself still succeeds even if logging fails.
 *
 * Env vars required:
 *   DATABASE_URL — Vercel Postgres (same store as newsletter/contact)
 */
import { neon } from "@neondatabase/serverless"

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim() : ""
  const aupVersion = typeof req.body?.aup_version === "string" ? req.body.aup_version.trim() : ""
  const method = typeof req.body?.method === "string" ? req.body.method.trim() : "signup_form"

  if (!email || !aupVersion) {
    res.status(400).json({ error: "email and aup_version are required" })
    return
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(500).json({ error: "Attestation logging is temporarily unavailable" })
    return
  }

  const h = req.headers
  const ip = String(h["x-forwarded-for"] || h["x-real-ip"] || "").split(",")[0].trim()
  const userAgent = String(h["user-agent"] || "")

  try {
    const sql = neon(connectionString)
    await sql`
      CREATE TABLE IF NOT EXISTS aup_attestations (
        id           BIGSERIAL PRIMARY KEY,
        email        TEXT NOT NULL,
        aup_version  TEXT NOT NULL,
        method       TEXT NOT NULL,
        ip           TEXT,
        user_agent   TEXT,
        attested_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`
      INSERT INTO aup_attestations (email, aup_version, method, ip, user_agent)
      VALUES (${email}, ${aupVersion}, ${method}, ${ip || null}, ${userAgent || null})
    `
  } catch {
    res.status(500).json({ error: "Could not log attestation" })
    return
  }

  res.status(200).json({ ok: true })
}
