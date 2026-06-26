import { shop } from "@/lib/shop";

const links = [
  { href: "#palvelut", label: "Palvelut" },
  { href: "#galleria", label: "Galleria" },
  { href: "#arvostelut", label: "Arvostelut" },
  { href: "#varaa", label: "Varaa aika" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-content px-5 py-16 text-center sm:px-8">
        <p className="font-display text-2xl uppercase tracking-[0.2em]">Imago Parturi</p>
        <p className="mt-4 text-sm text-paper/55">{shop.address}</p>
        <p className="mt-1 text-sm text-paper/55">
          <a href={`tel:${shop.phoneHref}`} className="transition-colors hover:text-paper">
            {shop.phone}
          </a>
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-paper/50">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-paper">
              {l.label}
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs text-paper/35">
          © {new Date().getFullYear()} {shop.name}
        </p>
      </div>
    </footer>
  );
}
