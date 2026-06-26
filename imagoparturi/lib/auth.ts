// Minimal password gate for the /hallinta dashboard.
// Good enough for a demo / single-barber shop. For multi-user
// auth later, swap this for Supabase Auth.

import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE = "imago_admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "imago2026";

// Token derived from the password so changing the password
// logs everyone out automatically.
function token() {
  return createHash("sha256").update(`imago:${PASSWORD}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === PASSWORD;
}

export function setAuthCookie() {
  cookies().set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE);
}

export function isAuthed(): boolean {
  return cookies().get(COOKIE)?.value === token();
}
