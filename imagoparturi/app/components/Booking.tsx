import BookingForm from "./BookingForm";
import { shop } from "@/lib/shop";
import Reveal from "./Reveal";

const points = ["Vahvistus heti sähköpostiin", "Muistutus ennen aikaa", "Maksu paikan päällä"];

export default function Booking() {
  return (
    <section id="varaa" className="bg-paper-warm">
      <div className="mx-auto max-w-content px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="section-label">Varaus</p>
            <h2 className="mt-5 font-display text-4xl font-normal sm:text-5xl md:text-6xl">
              Varaa aikasi
            </h2>
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink/60">
              Täytä lomake, niin saat vahvistuksen sähköpostiisi heti. Muistutamme
              sinua myös ennen aikaa.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.12em] text-ink/45">
              {points.map((p, i) => (
                <span key={p} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-ink/25">·</span>}
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-xl">
            <BookingForm />
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-ink/55">
          Tai soita suoraan{" "}
          <a
            href={`tel:${shop.phoneHref}`}
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            {shop.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
