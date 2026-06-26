"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Kirjautuminen epäonnistui.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
        <p className="font-display text-2xl uppercase tracking-[0.2em]">
          Imago Parturi
        </p>
        <p className="mt-1 text-sm text-ink/55">Varaushallinta</p>

        <label className="label mt-6" htmlFor="password">Salasana</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field"
          autoFocus
          placeholder="••••••••"
        />
        {error && <p className="mt-3 text-sm text-ink/70">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-5 w-full disabled:opacity-60">
          {loading ? "Kirjaudutaan…" : "Kirjaudu sisään"}
        </button>
      </form>
    </div>
  );
}
