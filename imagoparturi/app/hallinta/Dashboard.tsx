"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Reservation, ReservationStatus } from "@/lib/types";

const statusMeta: Record<ReservationStatus, { label: string; cls: string }> = {
  pending: { label: "Odottaa", cls: "bg-amber-100 text-amber-800" },
  confirmed: { label: "Vahvistettu", cls: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "Peruttu", cls: "bg-ink/10 text-ink/50 line-through" },
};

function fmtDate(d: string) {
  const [y, m, day] = d.split("-");
  return day ? `${day}.${m}.${y}` : d;
}

export default function Dashboard({
  initial,
  demoMode,
}: {
  initial: Reservation[];
  demoMode: boolean;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);
  const stats = useMemo(
    () => ({
      total: rows.length,
      pending: rows.filter((r) => r.status === "pending").length,
      today: rows.filter((r) => r.date === today && r.status !== "cancelled").length,
    }),
    [rows, today]
  );

  async function setStatus(id: string, status: ReservationStatus) {
    setBusy(id);
    const res = await fetch(`/api/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusy(null);
    if (res.ok) {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="font-display text-xl uppercase tracking-[0.18em]">
              Imago Parturi
            </p>
            <p className="text-xs text-ink/50">Varaushallinta</p>
          </div>
          <button onClick={logout} className="text-sm font-medium text-ink/60 hover:text-ink">
            Kirjaudu ulos
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {demoMode && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Demo-tila:</strong> varaukset tallentuvat paikalliseen
            tiedostoon, eikä sähköposteja lähetetä. Lisää Supabase- ja
            Resend-avaimet ottaaksesi tuotantotilan käyttöön.
          </div>
        )}

        <div className="mb-8 grid grid-cols-3 gap-3">
          <Stat label="Varauksia" value={stats.total} />
          <Stat label="Odottaa" value={stats.pending} />
          <Stat label="Tänään" value={stats.today} />
        </div>

        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 py-16 text-center text-ink/40">
            Ei varauksia vielä.
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl border border-ink/10 bg-white p-4 sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-bold">
                        {fmtDate(r.date)} · {r.time}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusMeta[r.status].cls}`}>
                        {statusMeta[r.status].label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink/70">
                      <span className="font-medium text-ink">{r.customer_name}</span> · {r.service_name}
                    </p>
                    <p className="mt-0.5 text-sm text-ink/55">
                      <a href={`tel:${r.customer_phone}`} className="hover:text-ink">{r.customer_phone}</a>
                      {" · "}
                      <a href={`mailto:${r.customer_email}`} className="hover:text-ink">{r.customer_email}</a>
                    </p>
                    {r.notes && <p className="mt-1 text-sm text-ink/45">”{r.notes}”</p>}
                  </div>

                  <div className="flex gap-2">
                    {r.status !== "confirmed" && (
                      <button
                        disabled={busy === r.id}
                        onClick={() => setStatus(r.id, "confirmed")}
                        className="rounded-full bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        Vahvista
                      </button>
                    )}
                    {r.status !== "cancelled" && (
                      <button
                        disabled={busy === r.id}
                        onClick={() => setStatus(r.id, "cancelled")}
                        className="rounded-full border border-ink/15 px-3.5 py-2 text-xs font-semibold text-ink/70 transition hover:border-ink disabled:opacity-50"
                      >
                        Peru
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 text-center sm:p-5">
      <p className="font-display text-3xl text-ink">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-ink/45">{label}</p>
    </div>
  );
}
