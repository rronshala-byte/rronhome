// Reusable image slot. Fills its parent (the parent sets size / aspect ratio).
//
// - With `src`: shows the photo, cover-fit.
// - Without `src`: a quiet, intentional placeholder so the layout looks finished.
//   Minimal and monochrome — the real photo drops into the same frame later.

type ImageFrameProps = {
  src?: string | null;
  alt?: string;
  /** short caption, e.g. "Liike" / "Leikkaus" */
  label?: string;
  tone?: "dark" | "light";
  tag?: boolean;
  className?: string;
};

export default function ImageFrame({
  src,
  alt = "",
  label,
  tone = "light",
  tag = true,
  className = "",
}: ImageFrameProps) {
  const dark = tone === "dark";
  const shell = dark ? "border-white/12 bg-ink-soft" : "border-ink/12 bg-paper-warm";

  if (src) {
    return (
      <div className={`relative h-full w-full overflow-hidden border ${shell} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden border ${shell} ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className={dark ? "text-white/30" : "text-ink/25"}
        >
          <rect x="3" y="4.5" width="18" height="15" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8.5" cy="9.5" r="1.4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 17l4.5-4.5 3.5 3.5 3-3 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {label && (
          <span className={`text-[10px] font-medium uppercase tracking-[0.24em] ${dark ? "text-white/45" : "text-ink/45"}`}>
            {label}
          </span>
        )}

        {tag && (
          <span className={`text-[10px] uppercase tracking-[0.18em] ${dark ? "text-white/25" : "text-ink/30"}`}>
            Kuvat tulossa
          </span>
        )}
      </div>
    </div>
  );
}
