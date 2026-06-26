// Email sending via Resend, with a console fallback for the demo.
//
//  - If RESEND_API_KEY is set -> real emails go out.
//  - Otherwise -> emails are logged to the server console so you
//    can see exactly what *would* be sent during the demo.

import type { Reservation } from "./types";
import { shop } from "./shop";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "ImagoParturi <onboarding@resend.dev>";
const BARBER_EMAIL = process.env.BARBER_EMAIL;

export const usingResend = Boolean(RESEND_API_KEY);

async function send(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log("\n──────── EMAIL (demo, not sent) ────────");
    console.log("To:     ", to);
    console.log("Subject:", subject);
    console.log("────────────────────────────────────────\n");
    return;
  }
  const { Resend } = await import("resend");
  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({ from: EMAIL_FROM, to, subject, html });
}

function fmtDate(date: string) {
  // YYYY-MM-DD -> DD.MM.YYYY
  const [y, m, d] = date.split("-");
  return d && m && y ? `${d}.${m}.${y}` : date;
}

const wrap = (inner: string) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#0c0c0d">
    <div style="border-bottom:3px solid #d6202f;padding-bottom:12px;margin-bottom:20px">
      <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px">Imago<span style="color:#d6202f">Parturi</span></span>
    </div>
    ${inner}
    <p style="margin-top:28px;font-size:12px;color:#888;border-top:1px solid #eee;padding-top:16px">
      ${shop.name} · ${shop.address}<br/>
      ${shop.phone} · ${shop.website}
    </p>
  </div>`;

function detailsTable(r: Reservation) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#888;width:130px">${label}</td><td style="padding:6px 0;font-weight:600">${value}</td></tr>`;
  return `<table style="width:100%;font-size:14px;border-collapse:collapse">
    ${row("Palvelu", r.service_name)}
    ${row("Päivä", fmtDate(r.date))}
    ${row("Aika", r.time)}
    ${row("Nimi", r.customer_name)}
    ${row("Puhelin", r.customer_phone)}
    ${row("Sähköposti", r.customer_email)}
    ${r.notes ? row("Lisätiedot", r.notes) : ""}
  </table>`;
}

// Email to the customer confirming their booking request.
export async function sendCustomerConfirmation(r: Reservation) {
  const html = wrap(`
    <p style="font-size:15px;line-height:1.6">Hei ${r.customer_name},</p>
    <p style="font-size:15px;line-height:1.6">
      Kiitos varauksestasi! Olemme vastaanottaneet varauspyyntösi.
      Tässä yhteenveto:
    </p>
    ${detailsTable(r)}
    <p style="font-size:14px;line-height:1.6;margin-top:20px;color:#555">
      Jos haluat muuttaa tai perua varauksen, soita ${shop.phone}.
    </p>
    <p style="font-size:15px;line-height:1.6">Nähdään pian!<br/>${shop.name}</p>
  `);
  await send(r.customer_email, "Varausvahvistus — ImagoParturi", html);
}

// Email to the barber notifying of a new booking.
export async function sendBarberNotification(r: Reservation) {
  const to = BARBER_EMAIL || r.customer_email; // demo fallback
  const html = wrap(`
    <p style="font-size:15px;line-height:1.6"><strong>Uusi varaus</strong> 💈</p>
    ${detailsTable(r)}
    <p style="font-size:13px;color:#888;margin-top:18px">
      Vastaanotettu ${new Date(r.created_at).toLocaleString("fi-FI")}
    </p>
  `);
  await send(to, `Uusi varaus: ${r.customer_name} — ${fmtDate(r.date)} ${r.time}`, html);
}
