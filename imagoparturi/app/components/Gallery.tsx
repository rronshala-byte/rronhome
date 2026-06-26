// Demo gallery. Replace each placeholder with a real photo by
// dropping files into /public/images and setting `src` below.

const tiles = [
  { label: "Liike", span: "md:col-span-2 md:row-span-2", src: null },
  { label: "Leikkaus", span: "", src: null },
  { label: "Parta", span: "", src: null },
  { label: "Tunnelma", span: "md:col-span-2", src: null },
];

export default function Gallery() {
  return (
    <section id="galleria" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="mb-12 max-w-xl">
          <p className="section-label">Galleria</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Kurkista sisään
          </h2>
          <p className="mt-4 text-ink/60">
            Kuvat lisätään pian. Tässä paikat oikeille kuville.
          </p>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-paper ${t.span}`}
            >
              {t.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.src} alt={t.label} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/15 text-ink/35">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
                    <path d="M5 17l4-4 3 3 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[11px] font-medium uppercase tracking-wider">{t.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
