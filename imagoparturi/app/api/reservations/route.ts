import { NextResponse } from "next/server";
import { createReservation } from "@/lib/store";
import { serviceById } from "@/lib/shop";
import { sendCustomerConfirmation, sendBarberNotification } from "@/lib/email";
import type { NewReservation } from "@/lib/types";

export const dynamic = "force-dynamic";

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö." }, { status: 400 });
  }

  const customer_name = str(body.customer_name);
  const customer_email = str(body.customer_email);
  const customer_phone = str(body.customer_phone);
  const serviceId = str(body.service);
  const date = str(body.date);
  const time = str(body.time);
  const notes = str(body.notes);

  // validation
  if (!customer_name || !customer_email || !customer_phone || !serviceId || !date || !time) {
    return NextResponse.json({ error: "Täytä kaikki pakolliset kentät." }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer_email)) {
    return NextResponse.json({ error: "Tarkista sähköpostiosoite." }, { status: 400 });
  }
  const service = serviceById(serviceId);
  if (!service) {
    return NextResponse.json({ error: "Valitse palvelu listasta." }, { status: 400 });
  }

  const newReservation: NewReservation = {
    customer_name,
    customer_email,
    customer_phone,
    service: service.id,
    service_name: service.name,
    date,
    time,
    notes,
  };

  let reservation;
  try {
    reservation = await createReservation(newReservation);
  } catch (err) {
    console.error("Failed to save reservation:", err);
    return NextResponse.json(
      { error: "Varauksen tallennus epäonnistui. Yritä uudelleen." },
      { status: 500 }
    );
  }

  // Emails are best-effort — never block a successful booking on them.
  try {
    await Promise.allSettled([
      sendCustomerConfirmation(reservation),
      sendBarberNotification(reservation),
    ]);
  } catch (err) {
    console.error("Email error (non-fatal):", err);
  }

  return NextResponse.json({ ok: true, id: reservation.id }, { status: 201 });
}
