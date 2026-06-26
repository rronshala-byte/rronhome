import { shop } from "@/lib/shop";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div>
          <p className="font-display text-lg font-extrabold tracking-tight">
            Imago<span className="text-accent">Parturi</span>
          </p>
          <p className="mt-1 text-sm text-ink/50">{shop.address}</p>
        </div>
        <div className="flex flex-col gap-1 text-sm text-ink/60 sm:items-end">
          <a href={`tel:${shop.phoneHref}`} className="hover:text-accent">{shop.phone}</a>
          <span>© {new Date().getFullYear()} {shop.name}</span>
        </div>
      </div>
    </footer>
  );
}
