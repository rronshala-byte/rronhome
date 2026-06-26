import type { Metadata } from "next";
import "./globals.css";
import { shop } from "@/lib/shop";

export const metadata: Metadata = {
  title: `${shop.name} — Parturi Espoossa`,
  description:
    "ImagoParturi, Tynnyritie 1, Espoo. Hiustenleikkaukset, parranajot ja varaukset verkossa. Varaa aikasi helposti.",
  openGraph: {
    title: `${shop.name} — Parturi Espoossa`,
    description: "Varaa aikasi verkossa. Tynnyritie 1, Espoo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
