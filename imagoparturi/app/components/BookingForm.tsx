"use client";

import { useState } from "react";
import { services } from "@/lib/shop";

// 30-min slots, 10:00–19:30 (placeholder hours)
const slots: string[] = [];
for (let h = 10; h < 20; h++) {
  for (const m of ["00", "30"]) slots.push(`${String(h).padStart(2, "0")}:${m}`);
}

const today = new Date().toISOString().slice(0, 10);

type State = "idle" | "submitting" | "success" | "error";

export default function BookingForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Jokin meni pieleen.");
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Jokin meni pieleen.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-ink/12 bg-white p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-3xl">Varaus vastaanotettu</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/60">
          Lähetimme vahvistuksen sähköpostiisi. Nähdään pian.
        </p>
        <button onClick={() => setState("idle")} className="btn-ghost mt-7" type="button">
          Tee uusi varaus
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-ink/12 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label" htmlFor="customer_name">Nimi</label>
          <input id="customer_name" name="customer_name" required className="field" placeholder="Etu- ja sukunimi" />
        </div>

        <div>
          <label className="label" htmlFor="customer_email">Sähköposti</label>
          <input id="customer_email" name="customer_email" type="email" required className="field" placeholder="nimi@email.com" />
        </div>

        <div>
          <label className="label" htmlFor="customer_phone">Puhelin</label>
          <input id="customer_phone" name="customer_phone" required className="field" placeholder="040 123 4567" />
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="service">Palvelu</label>
          <select id="service" name="service" required className="field" defaultValue="">
            <option value="" disabled>Valitse palvelu…</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="date">Päivä</label>
          <input id="date" name="date" type="date" required min={today} defaultValue={today} className="field" />
        </div>

        <div>
          <label className="label" htmlFor="time">Aika</label>
          <select id="time" name="time" required className="field" defaultValue="">
            <option value="" disabled>Valitse aika…</option>
            {slots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="notes">Lisätiedot (valinnainen)</label>
          <textarea id="notes" name="notes" rows={3} className="field resize-none" placeholder="Toiveita tai muuta huomioitavaa?" />
        </div>
      </div>

      {state === "error" && (
        <p className="mt-4 border border-ink/20 bg-paper-warm px-4 py-3 text-sm text-ink">{error}</p>
      )}

      <button type="submit" disabled={state === "submitting"} className="btn-primary mt-6 w-full disabled:opacity-60">
        {state === "submitting" ? "Lähetetään…" : "Vahvista varaus"}
      </button>
      <p className="mt-3 text-center text-xs text-ink/45">
        Saat vahvistuksen sähköpostiisi heti varauksen jälkeen.
      </p>
    </form>
  );
}
