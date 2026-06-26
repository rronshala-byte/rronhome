import { about } from "@/lib/shop";
import Reveal from "./Reveal";

const icons: Record<string, React.ReactNode> = {
  calendar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 9.5v5M18 9.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  pin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

export default function About() {
  return (
    <section id="meista" className="bg-paper-warm">
      <div className="mx-auto max-w-content px-5 py-24 text-center sm:px-8 md:py-32">
        <Reveal>
          <p className="section-label">{about.eyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-normal leading-[1.1] sm:text-5xl md:text-6xl">
            {about.heading}
          </h2>
          <div className="mx-auto mt-7 max-w-xl space-y-4 leading-relaxed text-ink/60">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-3xl gap-12 sm:grid-cols-3">
          {about.points.map((pt, i) => (
            <Reveal key={pt.title} delay={i * 90}>
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink">
                  {icons[pt.icon]}
                </span>
                <h3 className="mt-5 font-display text-xl">{pt.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{pt.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
