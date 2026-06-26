import { shop } from "@/lib/shop";
import ImageFrame from "./ImageFrame";

export default function Hero() {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto max-w-content px-5 pt-36 sm:px-8 md:pt-44">
        <div className="fade-up mx-auto max-w-3xl text-center">
          <p className="section-label">Miesten parturi · Espoo</p>

          <h1 className="mx-auto mt-7 font-display text-[3.25rem] font-normal leading-[1.03] tracking-tight sm:text-7xl md:text-[5.25rem]">
            Tyylikäs leikkaus,
            <br />
            helppo varaus
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ink/60">
            ImagoParturi on miesten parturi Espoon Tynnyritiellä. Varaat ajan
            verkossa muutamassa sekunnissa, me hoidamme loput.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#varaa" className="btn-primary">
              Varaa aika
            </a>
            <a href="#palvelut" className="btn-ghost">
              Katso hinnasto
            </a>
          </div>
        </div>

        {/* big image — quiet placeholder until the real photo arrives */}
        <div className="fade-up mt-16 md:mt-20" style={{ animationDelay: "0.15s" }}>
          <div className="aspect-[3/2] w-full md:aspect-[16/7]">
            <ImageFrame tone="light" label="Liike" />
          </div>
        </div>

        {/* trust strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-ink/10 py-6 text-[12px] uppercase tracking-[0.1em] text-ink/45">
          <span>{shop.address}</span>
          <Dot />
          <span>
            {shop.rating.score} ★ {shop.rating.source}ssa
          </span>
          <Dot />
          <span>Maksu paikan päällä</span>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span aria-hidden className="text-ink/25">
      ·
    </span>
  );
}
