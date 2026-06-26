import BookingForm from "./BookingForm";
import { shop } from "@/lib/shop";

export default function Booking() {
  return (
    <section id="varaa" className="bg-ink py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-content items-start gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.1fr]">
        <div className="md:sticky md:top-28">
          <p className="section-label">Varaus</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Varaa aikasi
          </h2>
          <p className="mt-4 max-w-md text-white/65">
            Täytä lomake, niin saat heti vahvistuksen sähköpostiisi.
            Muistutamme sinua myös ennen aikaasi.
          </p>

          <ul className="mt-8 space-y-4 text-sm text-white/70">
            {[
              "Vahvistus sähköpostiin heti",
              "Muistutus ennen aikaa",
              "Maksu paikan päällä",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-white/50">
            Tai soita suoraan{" "}
            <a href={`tel:${shop.phoneHref}`} className="font-semibold text-white underline-offset-4 hover:underline">
              {shop.phone}
            </a>
          </p>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
