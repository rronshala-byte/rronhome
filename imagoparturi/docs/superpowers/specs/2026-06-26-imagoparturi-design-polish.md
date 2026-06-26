# ImagoParturi — Design Polish Spec

Date: 2026-06-26
Scope: Visual polish of the public site only. Booking logic, dashboard, data
layer, and email are **not** touched.

## Goal

Elevate the existing demo from "clearly unfinished" to "looks like a finished,
real site" — **without using any real or AI/stock photos**. Keep the current DNA
(clean / minimal / youthful, Outfit + Inter, ink/paper/red accent). The single
biggest problem today is empty placeholder tiles; the fix is to make every image
slot a *deliberately designed frame* that the barber's real photos later drop
into with zero layout change.

## Constraints (decided with Rron)

- **Imagery: polished placeholders only.** No AI images, no stock photos.
  Placeholders must look intentional, not like broken/empty boxes.
- **Ambition: elevate current direction.** Sharpen craft + add structure; do not
  do a dramatic redesign.
- **No plugins / no bloat.** Hand-built. Motion via IntersectionObserver, not a
  library.
- **Honesty guardrails:** no fake photos, **no invented review quotes** (only the
  real 5,0★ / 16 Google aggregate), opening hours stay marked *alustava*.
- Finnish customer copy must sound human (run new copy through the humanizer
  skill).
- Repo rule: work only inside `imagoparturi/`. Never touch repo root
  `index.html` / `CNAME`, never merge to `main`.

## Design language refinements

- Keep tokens: `ink #0c0c0d`, `paper #fafafa`, `accent #d6202f`. May add a
  subtle layering gray and refine spacing rhythm. No new fonts.
- **`ImageFrame` (new shared component):** rounded panel + faint barber-pole
  motif + small `Kuvat tulossa` tag. Accepts an optional `src`; when a real
  photo is provided it fills the same frame with no layout change. Used in Hero,
  About, and Gallery so the photo-less state is consistent and deliberate.
- **`Reveal` (new client component):** wraps sections, fades/slides them in on
  scroll via IntersectionObserver. Respects `prefers-reduced-motion`. No library.
- Scroll-aware navbar (solid background + hairline shadow after scroll).

## Section plan

New page order:
`Navbar → Hero → About → Services → Gallery → Reviews → Booking → Location → Footer`

1. **Navbar** — scroll state; tap-to-call phone visible on mobile.
2. **Hero** — same dark bold-type hero; empty tile → `ImageFrame`; **show the
   visual on mobile** (currently hidden); add a thin trust strip
   (`5,0★ Google · Tynnyritie 1, Espoo · Ajanvaraus verkossa`); reveal on load.
3. **About / "Meistä" (NEW)** — short, human Finnish copy + 2–3 value points;
   photo-optional graphic panel. Copy lives in `lib/shop.ts`.
4. **Palvelut & hinnat** — keep the clean price list; add durations, subtle
   hover, better vertical rhythm.
5. **Galleria** — same bento grid, tiles become labeled `ImageFrame`s
   (Liike / Leikkaus / Parta / Tunnelma) — reads as a real gallery awaiting
   photos.
6. **Arvostelut (NEW)** — calm trust band showing the real 5,0★ / 16 reviews,
   linking to Google. No testimonial quotes.
7. **Varaa aika** — keep the dark booking section; polish fields, focus states,
   success state.
8. **Sijainti** — keep; polish the hours card (still marked *alustava*).
9. **Footer** — tidy: quick links + hours summary.

## Files

Within `imagoparturi/` only:

- New: `app/components/ImageFrame.tsx`, `app/components/Reveal.tsx`,
  `app/components/About.tsx`, `app/components/Reviews.tsx`
- Edit: `app/components/{Navbar,Hero,Services,Gallery,Booking,BookingForm,Location,Footer}.tsx`
- Edit: `app/page.tsx` (add About + Reviews to the order)
- Edit: `lib/shop.ts` (add `about` copy + value points; optional social links)
- Edit: `app/globals.css`, `tailwind.config.ts` (reveal utility, minor tokens)

## Out of scope

Booking API, dashboard (`app/hallinta/*`), `lib/store.ts`, `lib/email.ts`,
`lib/auth.ts`, Supabase schema, real photos, go-live/accounts, reminder emails.

## Verification

- `npm run build` stays clean.
- Real rendered screenshots (desktop + mobile widths) reviewed section by
  section against this spec.
- Booking flow still submits end-to-end (smoke check) after layout changes.
