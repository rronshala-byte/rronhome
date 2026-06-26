// Pluggable data store.
//
//  - If Supabase env vars are present -> use Supabase (production).
//  - Otherwise -> use a local JSON file (zero-setup demo).
//
// This lets the whole booking + dashboard flow work on a laptop
// today with no accounts, and switch to Supabase the moment the
// keys are added.

import { promises as fs } from "fs";
import path from "path";
import type { NewReservation, Reservation, ReservationStatus } from "./types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const usingSupabase = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);

// ── Supabase backend ──────────────────────────────────────────
async function getSupabase() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(SUPABASE_URL as string, SUPABASE_SERVICE_KEY as string, {
    auth: { persistSession: false },
  });
}

// ── Local file backend ────────────────────────────────────────
// Locally this persists to a JSON file. On a read-only / ephemeral
// serverless filesystem (e.g. Vercel) the file write fails, so we
// keep an in-memory copy as the source of truth for the instance —
// the booking flow still works for a demo. Add Supabase for real,
// shared persistence in production.
const DATA_FILE = path.join(process.cwd(), "data", "reservations.json");
const SEED_FILE = path.join(process.cwd(), "data", "seed.json");

let memoryRows: Reservation[] | null = null;

async function readFileStore(): Promise<Reservation[]> {
  if (memoryRows) return memoryRows;
  // Live data first; fall back to committed demo seed so the
  // dashboard shows example bookings on a fresh checkout.
  for (const file of [DATA_FILE, SEED_FILE]) {
    try {
      const raw = await fs.readFile(file, "utf-8");
      memoryRows = JSON.parse(raw) as Reservation[];
      return memoryRows;
    } catch {
      /* try next */
    }
  }
  memoryRows = [];
  return memoryRows;
}

async function writeFileStore(rows: Reservation[]): Promise<void> {
  memoryRows = rows; // source of truth for this instance
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2), "utf-8");
  } catch {
    // read-only filesystem (e.g. Vercel) — memory holds it instead
  }
}

// ── Public API ────────────────────────────────────────────────
export async function createReservation(input: NewReservation): Promise<Reservation> {
  const row: Reservation = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    created_at: new Date().toISOString(),
  };

  if (usingSupabase) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("reservations")
      .insert(row)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Reservation;
  }

  const rows = await readFileStore();
  rows.push(row);
  await writeFileStore(rows);
  return row;
}

export async function listReservations(): Promise<Reservation[]> {
  if (usingSupabase) {
    const supabase = await getSupabase();
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("date", { ascending: true })
      .order("time", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as Reservation[];
  }

  const rows = await readFileStore();
  return rows.sort((a, b) =>
    (a.date + a.time).localeCompare(b.date + b.time)
  );
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<void> {
  if (usingSupabase) {
    const supabase = await getSupabase();
    const { error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }

  const rows = await readFileStore();
  const next = rows.map((r) => (r.id === id ? { ...r, status } : r));
  await writeFileStore(next);
}
