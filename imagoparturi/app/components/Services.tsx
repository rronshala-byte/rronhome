import { services } from "@/lib/shop";

export default function Services() {
  return (
    <section id="palvelut" className="mx-auto max-w-content px-5 py-20 sm:px-8 md:py-28">
      <div className="mb-12 max-w-xl">
        <p className="section-label">Hinnasto</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Palvelut & hinnat
        </h2>
        <p className="mt-4 text-ink/60">
          Selkeät hinnat, ei yllätyksiä. Valitse palvelu varauksen yhteydessä.
        </p>
      </div>

      <div className="grid gap-x-12 gap-y-1 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4"
          >
            <div>
              <span className="font-medium text-ink">{s.name}</span>
              {s.note && (
                <span className="block text-xs text-ink/45">{s.note}</span>
              )}
            </div>
            <span className="whitespace-nowrap font-display text-lg font-bold text-accent">
              {s.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
