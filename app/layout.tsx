import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import PwaRegister from "./components/PwaRegister";
import InstallPrompt from "./components/InstallPrompt";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Excellence — Chauffeur privé de prestige en Suisse",
  description:
    "Service de chauffeur privé indépendant en Suisse. Transferts aéroport, trajets longue distance et service VIP à bord d'une flotte Tesla et Mercedes-Benz.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Black Excellence",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body grain-bg bg-neutral-950 antialiased">
        {children}
        <PwaRegister />
        <InstallPrompt />
      </body>
    </html>
  );
}
