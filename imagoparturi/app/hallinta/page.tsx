import { isAuthed } from "@/lib/auth";
import { listReservations, usingSupabase } from "@/lib/store";
import { usingResend } from "@/lib/email";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Varaushallinta — ImagoParturi",
  robots: { index: false, follow: false },
};

export default async function HallintaPage() {
  if (!isAuthed()) {
    return <LoginForm />;
  }

  const reservations = await listReservations();
  const demoMode = !usingSupabase || !usingResend;

  return <Dashboard initial={reservations} demoMode={demoMode} />;
}
