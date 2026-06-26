import { shop } from "@/lib/shop";

export default function Location() {
  return (
    <section id="sijainti" className="mx-auto max-w-content px-5 py-20 sm:px-8 md:py-28">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <p className="section-label">Sijainti & aukiolo</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Löydät meidät täältä
          </h2>

          <div className="mt-8 space-y-5 text-sm">
            <Row label="Osoite">{shop.address}</Row>
            <Row label="Puhelin">
              <a href={`tel:${shop.phoneHref}`} className="hover:text-accent">{shop.phone}</a>
            </Row>
            <Row label="Verkossa">{shop.website}</Row>
          </div>

          <a
            href={shop.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-8"
          >
            Avaa kartalla →
          </a>
        </div>

        <div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold">Aukioloajat</h3>
            <ul className="mt-4 divide-y divide-ink/8">
              {shop.hours.map((h) => (
                <li key={h.day} className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink/70">{h.day}</span>
                  <span className="font-medium">
                    {h.open && h.close ? `${h.open}–${h.close}` : "Suljettu"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink/40">
              * Aukioloajat ovat alustavia — päivitetään oikeilla ajoilla.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-20 shrink-0 text-ink/45">{label}</span>
      <span className="font-medium text-ink">{children}</span>
    </div>
  );
}
