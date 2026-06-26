import { shop } from "@/lib/shop";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* barber-pole stripe accent + soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 14px, transparent 14px 28px, #d6202f 28px 42px, transparent 42px 56px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-content items-center gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
        <div className="fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
            <span className="text-amber-400">★</span>
            {shop.rating.score} · {shop.rating.count} arvostelua · {shop.rating.source}
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Tyylikäs
            <br />
            leikkaus.
            <br />
            <span className="text-accent">Helppo varaus.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            {shop.name} — parturi {shop.address.split(",")[0]}lla. Varaa aikasi
            verkossa muutamassa sekunnissa, niin hoidamme loput.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#varaa" className="btn-primary">
              Varaa aika
            </a>
            <a href="#palvelut" className="btn-ghost border-white/20 text-white hover:bg-white/10">
              Katso hinnasto
            </a>
          </div>
        </div>

        {/* hero visual — clean placeholder, swap for a real photo */}
        <div className="fade-up relative hidden md:block" style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/40">
              <BarberPole />
              <span className="text-xs uppercase tracking-widest">Esimerkkikuva</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BarberPole() {
  return (
    <svg width="56" height="120" viewBox="0 0 56 120" fill="none" aria-hidden>
      <rect x="18" y="14" width="20" height="92" rx="10" fill="#fff" fillOpacity="0.12" />
      <rect x="18" y="14" width="20" height="92" rx="10" stroke="#fff" strokeOpacity="0.25" />
      <path d="M20 30 L36 18 M20 46 L36 34 M20 62 L36 50 M20 78 L36 66 M20 94 L36 82" stroke="#d6202f" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="28" cy="12" rx="9" ry="6" fill="#fff" fillOpacity="0.2" />
      <ellipse cx="28" cy="108" rx="9" ry="6" fill="#fff" fillOpacity="0.2" />
    </svg>
  );
}
