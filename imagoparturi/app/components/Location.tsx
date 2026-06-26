import { shop } from "@/lib/shop";
import Reveal from "./Reveal";

export default function Location() {
  return (
    <section id="sijainti" className="bg-paper">
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="section-label">Sijainti &amp; aukiolo</p>
          <h2 className="mt-5 font-display text-4xl font-normal sm:text-5xl md:text-6xl">
            Löydät meidät täältä
          </h2>
          <p className="mx-auto mt-6 text-ink/65">{shop.address}</p>
          <p className="mt-1 text-ink/65">
            <a href={`tel:${shop.phoneHref}`} className="hover:text-ink">
              {shop.phone}
            </a>{" "}
            · {shop.website}
          </p>
          <a
            href={shop.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-7"
          >
            Avaa kartalla →
          </a>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-16 max-w-md border border-ink/12 bg-white p-8 text-left">
            <h3 className="text-center font-display text-2xl">Aukioloajat</h3>
            <ul className="mt-5 divide-y divide-ink/10">
              {shop.hours.map((h) => (
                <li key={h.day} className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink/60">{h.day}</span>
                  <span className="font-medium">
                    {h.open && h.close ? `${h.open}–${h.close}` : "Suljettu"}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-xs text-ink/40">
              * Aukioloajat ovat alustavia, päivitetään oikeilla ajoilla.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
