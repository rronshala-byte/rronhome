import { NextResponse } from "next/server";
import { updateReservationStatus } from "@/lib/store";
import { isAuthed } from "@/lib/auth";
import type { ReservationStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID: ReservationStatus[] = ["pending", "confirmed", "cancelled"];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Kirjaudu sisään." }, { status: 401 });
  }

  let body: { status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö." }, { status: 400 });
  }

  const status = body.status as ReservationStatus;
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Virheellinen tila." }, { status: 400 });
  }

  try {
    await updateReservationStatus(params.id, status);
  } catch (err) {
    console.error("Failed to update reservation:", err);
    return NextResponse.json({ error: "Päivitys epäonnistui." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
