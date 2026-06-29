/**
 * Demo booking endpoint.
 *
 * The /demo wizard posts here on final confirmation. We read Vercel's geo
 * headers + IP and store the full booking in Vercel Postgres (Neon).
 *
 * Slot uniqueness: each booking gets a `slot_key` — the absolute UTC instant of
 * the chosen date/time/timezone. A partial UNIQUE index on slot_key makes
 * double-booking impossible: the second booking of the same slot fails and the
 * caller gets a 409 so the wizard can ask for another time.
 *
 * Env: DATABASE_URL — injected by the Vercel Postgres integration.
 */
import { neon } from "@neondatabase/serverless"

// Fixed UTC offsets for the wizard's four timezones (matches the /demo page).
const TZ_OFFSET: Record<string, number> = { ET: -5, PT: -8, IST: 5.5, GMT: 0 }

/** Canonical absolute-instant key for a (date, "h:mm AM/PM", tz) slot. */
function slotKey(dateStr: unknown, timeStr: unknown, tz: unknown): string | null {
  if (typeof dateStr !== "string" || typeof timeStr !== "string" || typeof tz !== "string") return null
  const offset = TZ_OFFSET[tz]
  if (offset === undefined) return null
  const dm = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  const tm = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!dm || !tm) return null
  let hour = parseInt(tm[1], 10) % 12
  if (/PM/i.test(tm[3])) hour += 12
  const minute = parseInt(tm[2], 10)
  const utcMs = Date.UTC(+dm[1], +dm[2] - 1, +dm[3], hour, minute) - offset * 3600000
  return new Date(utcMs).toISOString()
}

function isUniqueViolation(e: unknown): boolean {
  const err = e as { code?: string; message?: string }
  return err?.code === "23505" || /duplicate key value|unique constraint/i.test(err?.message || "")
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" })
    return
  }

  const b = req.body || {}
  const email = typeof b.email === "string" ? b.email.trim() : ""
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "A valid email is required." })
    return
  }

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!connectionString) {
    res.status(500).json({ error: "Booking is temporarily unavailable." })
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

  const str = (v: unknown) => (typeof v === "string" ? v : "") || null
  const key = slotKey(b.booking_date, b.booking_time, b.timezone)

  try {
    const sql = neon(connectionString)
    await sql`
      CREATE TABLE IF NOT EXISTS demo_bookings (
        id            BIGSERIAL PRIMARY KEY,
        name          TEXT,
        email         TEXT NOT NULL,
        phone         TEXT,
        company       TEXT,
        role          TEXT,
        team_size     TEXT,
        interest      TEXT,
        notes         TEXT,
        booking_date  TEXT,
        booking_time  TEXT,
        timezone      TEXT,
        ip            TEXT,
        city          TEXT,
        state         TEXT,
        country       TEXT,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    // Self-healing: add the slot column + uniqueness guard if not present yet.
    await sql`ALTER TABLE demo_bookings ADD COLUMN IF NOT EXISTS slot_key TEXT`
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS demo_bookings_slot_key_uniq
      ON demo_bookings (slot_key) WHERE slot_key IS NOT NULL
    `

    // Friendly pre-check (the unique index is the real, race-proof guard).
    if (key) {
      const taken = await sql`SELECT 1 FROM demo_bookings WHERE slot_key = ${key} LIMIT 1`
      if (taken.length > 0) {
        res.status(409).json({ error: "That time slot was just booked. Please pick another." })
        return
      }
    }

    await sql`
      INSERT INTO demo_bookings
        (name, email, phone, company, role, team_size, interest, notes,
         booking_date, booking_time, timezone, ip, city, state, country, slot_key)
      VALUES
        (${str(b.name)}, ${email}, ${str(b.phone)}, ${str(b.company)}, ${str(b.role)},
         ${str(b.team_size)}, ${str(b.interest)}, ${str(b.notes)},
         ${str(b.booking_date)}, ${str(b.booking_time)}, ${str(b.timezone)},
         ${ip || null}, ${city || null}, ${state || null}, ${country || null}, ${key})
    `
  } catch (e) {
    if (isUniqueViolation(e)) {
      res.status(409).json({ error: "That time slot was just booked. Please pick another." })
      return
    }
    res.status(500).json({ error: "Could not save your booking. Please try again." })
    return
  }

  res.status(200).json({ ok: true })
}
