# ImagoParturi — project memory

> This file is auto-loaded by Claude Code when a session opens in this folder.
> It tells a fresh session everything about the project so we can keep building
> without re-explaining. Open your session inside `imagoparturi/` (or pull the
> repo and `cd imagoparturi`) and this loads automatically.

## What this is

A clean, **no-plugin** website + reservation system for the barber shop
**ImagoParturi** (Tynnyritie 1, 02230 Espoo). Customers book a haircut online; the
barber gets an email + a private dashboard of all bookings. Customer-facing content
is in **Finnish**.

Stack: **Next.js 14 (App Router) · TypeScript · Tailwind CSS**, with **Supabase**
(database) and **Resend** (email) in production, deployed on **Vercel**.

## ⚠️ Important repo rule

This project lives in the `imagoparturi/` subfolder of the `rronhome` repo, on branch
`claude/imagoparturi-website-reservations-hmsg8r`. The **repo root is a different
project** — the personal `rron.me` site served by GitHub Pages from `main`.
**Never merge this branch into `main`** and never touch the root `index.html` / `CNAME`.

## Run it (zero setup, no accounts)

```bash
cd imagoparturi
npm install
npm run dev
```

- Site + booking → http://localhost:3000
- Dashboard → http://localhost:3000/hallinta — password **`imago2026`** (`ADMIN_PASSWORD`)

With no env vars, it uses a **local JSON file store** (`data/`) and **logs emails to
the console**, so the full flow works offline. When Supabase + Resend env vars are
present, it auto-switches to the real database + real emails — no code change.

## Architecture / where things live

| Need to change… | File |
| --- | --- |
| Shop info, services, **prices**, opening hours | `lib/shop.ts` |
| Data storage (Supabase ⇄ local file logic) | `lib/store.ts` |
| Emails (Resend ⇄ console fallback, templates) | `lib/email.ts` |
| Dashboard password gate | `lib/auth.ts` |
| Public page sections | `app/components/*` (Navbar, Hero, Services, Gallery, Booking, BookingForm, Location, Footer) |
| Dashboard | `app/hallinta/*` |
| Booking endpoint (POST) | `app/api/reservations/route.ts` |
| Status update (PATCH, auth-gated) | `app/api/reservations/[id]/route.ts` |
| Colors / fonts | `tailwind.config.ts`, `app/globals.css` |
| Production DB schema | `supabase/schema.sql` |
| Env var reference | `.env.example` |

Design tokens: ink `#0c0c0d`, paper `#fafafa`, accent red `#d6202f`; fonts Outfit
(display) + Inter (body). Vibe: **clean, minimal, a bit youthful.**

## Decisions already made (don't redo)

- Price list taken from the shop wall photo. **"Fade / Skin fade" was removed.**
  **"Hiusten värjäys" price = "Sovitaan erikseen"** (negotiable).
- Shop details from Google Maps: Tynnyritie 1, 02230 Espoo · 044 248 1592 ·
  5,0 ★ (16 reviews) · imagoparturi.fi.
- **Opening hours are a placeholder** (Google only showed "Closes 20.00") — marked as
  alustava on the site. Replace with real hours in `lib/shop.ts`.
- **Photos are placeholders**, clearly marked. To swap: drop files in `public/images/`
  and set `src` in `app/components/Gallery.tsx` and `Hero.tsx`.

## Roadmap / TODO

- [ ] Real photos from the barber → `public/images/`
- [ ] Real booking inbox email → `BARBER_EMAIL`
- [ ] Confirmed opening hours → `lib/shop.ts`
- [ ] Go live: Vercel (set **Root Directory = `imagoparturi`**) + Supabase
      (run `supabase/schema.sql`) + Resend, then add env vars from `.env.example`
- [ ] **Reminder email before the appointment** (not built yet — use a Vercel Cron or
      Supabase scheduled function that scans `reservations` for upcoming times)
- [ ] Point `imagoparturi.fi` at the Vercel deployment

## How I want you to work (Rron's preferences)

- **Be autonomous.** Make sensible design/content choices and just do them — don't ask
  me for small stuff. Only stop for genuine business decisions (real prices, his email).
- **No plugins / no bloat.** Keep it clean, hand-built, fast.
- **Human-sounding copy** — natural Finnish, not AI-flowery marketing speak.
- Verify changes actually run before saying they're done.
- Commit + push to the branch above when work is complete.

### Skills & tools to use on this project

When available in the session, use these (they live on my local setup, not in the
cloud sandbox where this was first built):

- **`/brainstorming`** — for design/feature ideation before building a new section.
- **`/humanizer`** — to make any customer-facing copy sound natural.
- **21st.dev "Magic" MCP** — for generating/refining polished UI sections/components.

> A context file can't install these — they only work if the skill/MCP is configured in
> the environment you open the session in. If a tool isn't found, say so and proceed
> by hand rather than pretending to use it. To add the 21st.dev MCP, configure it in
> your MCP settings (`.mcp.json` / Claude Code MCP config) with your 21st.dev API key —
> ask me for the key and I'll paste it.
