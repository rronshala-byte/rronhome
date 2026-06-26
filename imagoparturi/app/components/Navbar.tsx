"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { shop } from "@/lib/shop";

const links = [
  { href: "#palvelut", label: "Palvelut" },
  { href: "#galleria", label: "Galleria" },
  { href: "#arvostelut", label: "Arvostelut" },
  { href: "#sijainti", label: "Sijainti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="#"
          className="font-display text-xl uppercase tracking-[0.2em] text-ink sm:text-2xl"
        >
          Imago Parturi
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${shop.phoneHref}`}
            aria-label={`Soita ${shop.phone}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink/20 text-ink transition-colors hover:border-ink md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 5.5C3 4.1 4.1 3 5.5 3h1.4c.6 0 1.1.4 1.3 1l.8 3a1.4 1.4 0 0 1-.4 1.4L8 9.5a13 13 0 0 0 6.5 6.5l1.1-1.6c.3-.4.9-.6 1.4-.4l3 .8c.6.2 1 .7 1 1.3v1.4c0 1.4-1.1 2.5-2.5 2.5C11.6 21 3 12.4 3 5.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a href="#varaa" className="btn-primary !px-5 !py-2.5 !text-[11px] sm:!px-6">
            Varaa aika
          </a>
        </div>
      </nav>
    </header>
  );
}
