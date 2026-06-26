import Link from "next/link";

const links = [
  { href: "#palvelut", label: "Palvelut" },
  { href: "#galleria", label: "Galleria" },
  { href: "#sijainti", label: "Sijainti" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="#" className="font-display text-xl font-extrabold tracking-tight">
          Imago<span className="text-accent">Parturi</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/65 transition hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a href="#varaa" className="btn-primary !px-5 !py-2.5 text-xs sm:!px-6 sm:!py-3 sm:text-sm">
          Varaa aika
        </a>
      </nav>
    </header>
  );
}
