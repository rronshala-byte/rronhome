import { NextResponse } from "next/server";
import { checkPassword, setAuthCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Virheellinen pyyntö." }, { status: 400 });
  }

  if (!checkPassword(body.password || "")) {
    return NextResponse.json({ error: "Väärä salasana." }, { status: 401 });
  }

  setAuthCookie();
  return NextResponse.json({ ok: true });
}
