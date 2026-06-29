/**
 * Contact form endpoint.
 *
 * The /contact form posts here. We read Vercel's geo headers + IP and store
 * the submission in Vercel Postgres (Neon) — same store as the newsletter and
 * demo-booking forms.
 *
 * Env: DATABASE_URL — injected by the Vercel Postgres integration.
 */
import { neon } from "@neondatabase/serverless"

const SUBJECTS = ["sales", "support", "partnership", "press", "other"]

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const b = req.body || {}
  const name = typeof b.name === "string" ? b.name.trim() : ""
  const email = typeof b.email === "string" ? b.email.trim() : ""
  const message = typeof b.message === "string" ? b.message.trim() : ""
  const subject = SUBJECTS.includes(b.subject) ? b.subject : "other"

  if (name.length < 2) {
    res.status(400).json({ error: "Name is required." })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email is required." })
    return
  }
  if (message.length < 10) {
    res.status(400).json({ error: "Please write at least 10 characters." })
    return
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(500).json({ error: "Contact form is temporarily unavailable." })
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
    // Self-healing: ensure the table exists (idempotent, no manual SQL needed).
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id          BIGSERIAL PRIMARY KEY,
        name        TEXT,
        email       TEXT NOT NULL,
        subject     TEXT,
        message     TEXT,
        ip          TEXT,
        city        TEXT,
        state       TEXT,
        country     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`
      INSERT INTO contact_submissions (name, email, subject, message, ip, city, state, country)
      VALUES (${name}, ${email}, ${subject}, ${message},
              ${ip || null}, ${city || null}, ${state || null}, ${country || null})
    `
  } catch {
    res.status(500).json({ error: "Could not send your message. Please try again." })
    return
  }

  res.status(200).json({ ok: true })
}
