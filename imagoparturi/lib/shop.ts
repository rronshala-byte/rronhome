// Central place for all shop details + the price list.
// Edit here and it updates across the whole site.

export const shop = {
  name: "ImagoParturi",
  tagline: "Miesten parturi Espoon Tynnyritiellä",
  address: "Tynnyritie 1 B, 02230 Espoo",
  phone: "050 326 6664",
  phoneHref: "+358503266664",
  email: "info@imagoparturi.fi", // placeholder — replace with real booking inbox
  website: "imagoparturi.fi",
  rating: { score: "5,0", count: 16, source: "Google" },
  // Real detail from imagoparturi.fi — they fix the cut free if you're not happy.
  guarantee: "Tyytyväisyystakuu: jos lopputulos ei miellytä, korjataan se veloituksetta.",
  mapsUrl: "https://maps.app.goo.gl/qfyhXNTuzZ8bNwLC8",
  // Opening hours — PLACEHOLDER. Google only shows "Closes 20.00".
  // Update with the barber's real hours.
  hours: [
    { day: "Maanantai", open: "10.00", close: "20.00" },
    { day: "Tiistai", open: "10.00", close: "20.00" },
    { day: "Keskiviikko", open: "10.00", close: "20.00" },
    { day: "Torstai", open: "10.00", close: "20.00" },
    { day: "Perjantai", open: "10.00", close: "20.00" },
    { day: "Lauantai", open: "10.00", close: "18.00" },
    { day: "Sunnuntai", open: null, close: null },
  ],
} as const;

// "Meistä" section copy. Kept short and natural (Finnish), no marketing fluff.
export const about = {
  eyebrow: "Meistä",
  heading: "Parturi, jossa ei kiirehditä",
  body: [
    "ImagoParturi on parturi Espoon Tynnyritiellä. Leikkaukset ja parranajot tehdään ajan kanssa: kerrot mitä haluat, ja katsotaan yhdessä mikä sopii sinulle.",
    "Varaat ajan verkossa parissa minuutissa tai soitat suoraan. Maksu hoituu paikan päällä. Nähdään penkissä.",
  ],
  points: [
    { icon: "calendar", title: "Varaus verkossa", text: "Vahvistus sähköpostiisi heti." },
    { icon: "wallet", title: "Maksu paikan päällä", text: "Ei ennakkomaksua." },
    { icon: "pin", title: "Tynnyritie 1, Espoo", text: "Helppo löytää." },
  ],
} as const;

export type Service = {
  id: string;
  name: string;
  price: string; // human-readable, e.g. "20 €" or "Sovitaan erikseen"
  durationMin?: number;
  note?: string;
};

// Price list from the shop wall (HINNASTO).
// NOTE: "Fade / Skin fade" removed per request.
// "Hiusten värjäys" price is negotiable -> "Sovitaan erikseen".
export const services: Service[] = [
  { id: "hiustenleikkaus", name: "Hiustenleikkaus", price: "20 €", durationMin: 30 },
  { id: "lasten-hiustenleikkaus", name: "Lasten hiustenleikkaus (alle 12 v)", price: "15 €", durationMin: 30 },
  { id: "parran-muotoilu", name: "Parran muotoilu", price: "10 €", durationMin: 20 },
  { id: "hiustenpesu", name: "Hiustenpesu", price: "5 €", durationMin: 15 },
  { id: "hiusten-varjays", name: "Hiusten värjäys", price: "Sovitaan erikseen", durationMin: 60, note: "Hinta riippuu työn laajuudesta" },
  { id: "parran-varjays", name: "Parran värjäys", price: "20 €", durationMin: 30 },
  { id: "musta-naamio", name: "Musta naamio", price: "15 €", durationMin: 20 },
  { id: "kasvojen-vahaus", name: "Kasvojen vahaus", price: "15 €", durationMin: 20 },
];

export function serviceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export type Review = {
  name: string;
  initial: string;
  date: string;
  rating: number;
  text: string;
};

// ⚠️ PLACEHOLDER reviews so the carousel has content for the demo — same idea
// as the placeholder photos. Replace with real Google reviews (paste them here,
// or wire the Google Places API and feed it in). Do not ship these as-is.
export const reviews: Review[] = [
  { name: "Mikko L.", initial: "M", date: "2 kuukautta sitten", rating: 5, text: "Siisti leikkaus ja mukava juttuseura. Käyn jatkossakin." },
  { name: "Antti K.", initial: "A", date: "3 viikkoa sitten", rating: 5, text: "Pitkästä aikaa parturi joka kuunteli mitä halusin. Lopputulos juuri sopiva." },
  { name: "Sami R.", initial: "S", date: "kuukausi sitten", rating: 5, text: "Nopea varata aika ja homma hoitui ilman kiirettä. Suosittelen." },
  { name: "Joonas V.", initial: "J", date: "5 kuukautta sitten", rating: 5, text: "Hyvä parranajo ja reilu hinta. Tästä tuli oma vakiopaikka." },
  { name: "Eetu M.", initial: "E", date: "viikko sitten", rating: 5, text: "Asiansa osaava parturi. Selkeät hinnat, ei yllätyksiä." },
];
