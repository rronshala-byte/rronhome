import { services } from "@/lib/shop";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="palvelut" className="bg-paper">
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="section-label">Hinnasto</p>
          <h2 className="mt-5 font-display text-4xl font-normal sm:text-5xl md:text-6xl">
            Palvelut ja hinnat
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink/55">
            Selkeät hinnat, ei yllätyksiä. Valitset palvelun varauksen yhteydessä.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mx-auto mt-14 max-w-md">
            {services.map((s) => (
              <li key={s.id} className="border-t border-ink/10 py-6 first:border-t-0">
                <p className="font-display text-2xl leading-snug">{s.name}</p>
                {s.note && (
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/40">{s.note}</p>
                )}
                <p className="mt-2.5 text-sm font-medium uppercase tracking-[0.12em] text-ink/55">
                  {s.price}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
