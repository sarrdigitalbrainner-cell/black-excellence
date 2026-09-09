import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import PwaRegister from "./components/PwaRegister";
import InstallPrompt from "./components/InstallPrompt";
import "./globals.css";

const locales = ["en", "fr", "de", "it"];

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Black Excellence Transport — Private Chauffeur in Switzerland",
  description:
    "Independent private chauffeur service in Switzerland. Airport transfers, long-distance journeys and VIP service aboard a Tesla and Mercedes-Benz fleet.",
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body grain-bg bg-neutral-950 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <PwaRegister />
          <InstallPrompt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
