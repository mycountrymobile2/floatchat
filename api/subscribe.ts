/**
 * Footer newsletter signup endpoint.
 *
 * The browser can't see the visitor's location, so the footer form posts here.
 * Vercel attaches geo headers to every request — we read those + the IP and
 * store them in Vercel Postgres (Neon).
 *
 * Env vars required (Vercel → floatchat project → Settings → Environment Variables):
 *   DATABASE_URL — injected automatically when you connect the Vercel Postgres store
 *
 * Table required (run once in the Postgres query console):
 *   CREATE TABLE IF NOT EXISTS newsletter_signups (
 *     id BIGSERIAL PRIMARY KEY, email TEXT NOT NULL,
 *     ip TEXT, city TEXT, state TEXT, country TEXT,
 *     created_at TIMESTAMPTZ NOT NULL DEFAULT now()
 *   );
 */
import { neon } from "@neondatabase/serverless"

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const email = typeof req.body?.email === "string" ? req.body.email.trim() : ""
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email is required." })
    return
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(500).json({ error: "Newsletter signup is temporarily unavailable." })
    return
  }

  // Vercel injects these on every request — accurate, free, can't be ad-blocked.
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
      CREATE TABLE IF NOT EXISTS newsletter_signups (
        id          BIGSERIAL PRIMARY KEY,
        email       TEXT NOT NULL,
        ip          TEXT,
        city        TEXT,
        state       TEXT,
        country     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`
      INSERT INTO newsletter_signups (email, ip, city, state, country)
      VALUES (${email}, ${ip || null}, ${city || null}, ${state || null}, ${country || null})
    `
  } catch {
    res.status(500).json({ error: "Could not save your signup. Please try again." })
    return
  }

  res.status(200).json({ ok: true })
}
