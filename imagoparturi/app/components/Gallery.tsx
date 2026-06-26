// Demo gallery — big, quiet placeholders. Drop real photos into /public/images
// and pass `src` to <ImageFrame> to replace any tile with no layout change.

import ImageFrame from "./ImageFrame";
import Reveal from "./Reveal";

const tiles = [
  { label: "Leikkaus" },
  { label: "Parta" },
];

export default function Gallery() {
  return (
    <section id="galleria" className="bg-paper-warm">
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="section-label">Galleria</p>
          <h2 className="mt-5 font-display text-4xl font-normal sm:text-5xl md:text-6xl">
            Kurkista sisään
          </h2>
          <p className="mx-auto mt-5 max-w-md leading-relaxed text-ink/55">
            Kuvat liikkeestä lisätään pian.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {tiles.map((t) => (
              <div key={t.label} className="aspect-[4/5]">
                <ImageFrame tone="light" label={t.label} />
              </div>
            ))}
          </div>
          <div className="mt-4 aspect-[3/2] w-full md:aspect-[16/6]">
            <ImageFrame tone="light" label="Tunnelma" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
