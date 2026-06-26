// Central place for all shop details + the price list.
// Edit here and it updates across the whole site.

export const shop = {
  name: "ImagoParturi",
  tagline: "Parturi Espoon Tynnyritiellä",
  address: "Tynnyritie 1, 02230 Espoo",
  phone: "044 248 1592",
  phoneHref: "+358442481592",
  email: "info@imagoparturi.fi", // placeholder — replace with real booking inbox
  website: "imagoparturi.fi",
  rating: { score: "5,0", count: 16, source: "Google" },
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
