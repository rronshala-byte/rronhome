"use client";

import { useRef } from "react";
import { shop, reviews } from "@/lib/shop";
import Reveal from "./Reveal";

export default function Reviews() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section id="arvostelut" className="bg-paper">
      <div className="mx-auto max-w-content px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div className="text-center">
            <p className="section-label">Arvostelut</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className="font-display text-6xl leading-none sm:text-7xl">{shop.rating.score}</span>
              <div className="text-left">
                <Stars size={18} />
                <p className="mt-1.5 text-sm text-ink/55">
                  {shop.rating.count} arvostelua {shop.rating.source}ssa
                </p>
              </div>
            </div>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/55">
              {shop.guarantee}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <div className="mb-4 flex items-center justify-end gap-2">
              <ArrowBtn dir="left" onClick={() => scrollBy(-1)} />
              <ArrowBtn dir="right" onClick={() => scrollBy(1)} />
            </div>

            <div
              ref={scroller}
              className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2"
            >
              {reviews.map((r) => (
                <article
                  key={r.name + r.date}
                  className="w-[300px] shrink-0 snap-start border border-ink/12 bg-white p-6 sm:w-[340px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-medium text-paper">
                      {r.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-ink">{r.name}</p>
                      <p className="text-xs text-ink/45">{r.date}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.16em] text-ink/35">
                      {shop.rating.source}
                    </span>
                  </div>
                  <Stars size={15} className="mt-4" rating={r.rating} />
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{r.text}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <a href={shop.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Lue arvostelut {shop.rating.source}ssa →
          </a>
        </div>
      </div>
    </section>
  );
}

function Stars({ size = 16, rating = 5, className = "" }: { size?: number; rating?: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 text-ink ${className}`} aria-label={`${rating} / 5 tähteä`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9 6.1 20.9l1.1-6.47L2.5 9.85l6.5-.95L12 2.5Z" />
        </svg>
      ))}
    </div>
  );
}

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Edellinen" : "Seuraava"}
      className="flex h-10 w-10 items-center justify-center rounded-sm border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink/[0.03]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
