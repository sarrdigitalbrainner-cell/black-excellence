"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/data";
import { telHref, whatsappHref, PHONE_NUMBER_DISPLAY } from "@/lib/contact";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tServices = useTranslations("services.items");
  const tBooking = useTranslations("booking");

  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-neutral-950">
      {/* Halo doré décoratif */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Marque */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/40">
                <Image
                  src="/icon-192.png"
                  alt="Black Elite Transfers"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <span className="leading-tight">
                <span className="font-display block text-sm tracking-[0.18em] text-neutral-50">
                  BLACK ELITE
                </span>
                <span className="block text-[9px] tracking-[0.42em] text-gradient-gold">
                  TRANSFERS
                </span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-neutral-500">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.3em] text-gold">
              {t("navTitle")}
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-light">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-gold-light"
                >
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet"
                  className="transition-colors hover:text-gold-light"
                >
                  {tNav("fleet")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-gold-light"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.3em] text-gold">
              {tNav("services")}
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              {(["airport", "ski", "business"] as const).map((id) => (
                <li key={id}>
                  <Link
                    href={SERVICES[id].slug}
                    className="transition-colors hover:text-gold-light"
                  >
                    {tServices(`${id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.3em] text-gold">
              {tNav("contact")}
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href={telHref()}
                  className="transition-colors hover:text-gold-light"
                >
                  {PHONE_NUMBER_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(tBooking("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#25D366]"
                >
                  WhatsApp
                </a>
              </li>
              <li className="pt-2 text-neutral-500">{t("location")}</li>
              <li className="text-neutral-500">{t("availability")}</li>
            </ul>
          </div>
        </div>

        <div className="hairline-gold mt-14" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-xs text-neutral-600 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Black Elite Transfers.{" "}
            {t("rights")}
          </p>
          <p>{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
