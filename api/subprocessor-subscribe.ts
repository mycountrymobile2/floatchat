/**
 * Sub-processor change-notification subscription endpoint.
 *
 * Our DPA promises customers 30 days' notice before adding a new sub-processor.
 * This endpoint stores the email of anyone who wants to be on that notification
 * list. Triggered from /subprocessors/subscribe.
 *
 * Env vars required:
 *   DATABASE_URL — Vercel Postgres connection (same store as newsletter/contact)
 *
 * Table (self-created on first POST — see CREATE TABLE below).
 */
import { neon } from "@neondatabase/serverless"

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim() : ""
  const company = typeof req.body?.company === "string" ? req.body.company.trim() : ""

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email is required." })
    return
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(500).json({ error: "Subscription is temporarily unavailable." })
    return
  }

  const h = req.headers
  const ip = String(h["x-forwarded-for"] || h["x-real-ip"] || "").split(",")[0].trim()
  const country = String(h["x-vercel-ip-country"] || "")
  const state = String(h["x-vercel-ip-country-region"] || "")
  let city = ""
  try {
    city = decodeURIComponent(String(h["x-vercel-ip-city"] || ""))
  } catch {
    city = String(h["x-vercel-ip-city"] || "")
  }

  try {
    const sql = neon(connectionString)
    await sql`
      CREATE TABLE IF NOT EXISTS subprocessor_subscribers (
        id          BIGSERIAL PRIMARY KEY,
        email       TEXT NOT NULL,
        company     TEXT,
        ip          TEXT,
        city        TEXT,
        state       TEXT,
        country     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`
      INSERT INTO subprocessor_subscribers (email, company, ip, city, state, country)
      VALUES (${email}, ${company || null}, ${ip || null}, ${city || null}, ${state || null}, ${country || null})
    `
  } catch {
    res.status(500).json({ error: "Could not save your subscription. Please try again." })
    return
  }

  res.status(200).json({ ok: true })
}
