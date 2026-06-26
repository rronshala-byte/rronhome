# ImagoParturi — verkkosivu & varausjärjestelmä

Clean, no-plugin website for the barber shop **ImagoParturi** (Tynnyritie 1, Espoo)
with online booking, automatic emails, and a private dashboard for the barber.

Built with **Next.js 14 + TypeScript + Tailwind CSS**. Database via **Supabase**,
email via **Resend**, deploy on **Vercel**.

> This lives in a subfolder of the `rronhome` repo on the
> `claude/imagoparturi-website-reservations-hmsg8r` branch. It is fully separate
> from the personal `rron.me` site at the repo root — **do not merge this branch
> into `main`**, since `main` serves rron.me via GitHub Pages.

---

## What's included

- **Public site** (`/`) — hero, price list, gallery, booking form, location & hours.
- **Booking API** (`/api/reservations`) — validates, stores the booking, and emails
  both the customer (confirmation) and the barber (notification).
- **Dashboard** (`/hallinta`) — password-protected list of all bookings with
  confirm / cancel controls.

Everything is in Finnish (the shop's customers), and all shop details + prices live
in one file: [`lib/shop.ts`](lib/shop.ts).

---

## Run the demo locally (zero setup)

No accounts needed. The app falls back to a **local file store** and **console-logged
emails**, so the whole flow works on a laptop:

```bash
cd imagoparturi
npm install
npm run dev
```

Then open:

- Site + booking → http://localhost:3000
- Dashboard → http://localhost:3000/hallinta  (password: **`imago2026`**)

Submit a booking on the site and watch it appear in the dashboard. The "sent" emails
are printed in the terminal so you can see exactly what the customer and barber receive.

---

## Going live (Vercel + Supabase + Resend)

All three have free tiers. Sign in with one (ideally dedicated) Google account.

1. **Supabase** — create a project, open the SQL Editor, and run
   [`supabase/schema.sql`](supabase/schema.sql). Copy the project URL + keys from
   *Project Settings → API*.
2. **Resend** — create an API key. For the demo you can send from
   `onboarding@resend.dev`; once `imagoparturi.fi` is owned, verify the domain and
   send from e.g. `bookings@imagoparturi.fi`.
3. **Vercel** — import this repo, set **Root Directory** to `imagoparturi`, add the
   environment variables below, deploy.

### Environment variables

Copy `.env.example` → `.env.local` (local) or add them in Vercel:

| Variable | What it's for |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side DB access (keep secret) |
| `RESEND_API_KEY` | Sending emails |
| `EMAIL_FROM` | Sender, e.g. `ImagoParturi <onboarding@resend.dev>` |
| `BARBER_EMAIL` | Where new-booking notifications go |
| `ADMIN_PASSWORD` | Dashboard password (change before launch!) |

When the Supabase + Resend vars are present, the app automatically switches from the
demo file store / console emails to the real database and real emails.

---

## Customising

- **Prices / services / hours / contact** → [`lib/shop.ts`](lib/shop.ts)
- **Photos** → drop files in `public/images/` and wire them up in
  `app/components/Gallery.tsx` and `app/components/Hero.tsx` (placeholders are clearly
  marked).
- **Colors / fonts** → [`tailwind.config.ts`](tailwind.config.ts) and
  [`app/globals.css`](app/globals.css).

---

## Still to do (when info is ready)

- [ ] Real photos from the barber
- [ ] Real booking inbox email → `BARBER_EMAIL`
- [ ] Confirmed opening hours
- [ ] Reminder email before the appointment (scheduled job — Supabase cron / Vercel cron)
- [ ] Point `imagoparturi.fi` at the Vercel deployment
