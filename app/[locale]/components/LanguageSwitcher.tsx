"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const LOCALES = ["en", "fr", "de", "it"] as const;
const LABELS: Record<(typeof LOCALES)[number], string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  it: "IT",
};

function pathWithoutLocale(pathname: string) {
  for (const loc of LOCALES) {
    if (pathname === `/${loc}`) return "/";
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname;
}

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const t = useTranslations("languageSwitcher");
  const rest = pathWithoutLocale(pathname);

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/15 px-1 py-1 text-xs"
      aria-label={t("label")}
    >
      {LOCALES.map((loc) => {
        const href = loc === "en" ? rest : `/${loc}${rest === "/" ? "" : rest}`;
        const isActive = loc === activeLocale;
        return (
          <Link
            key={loc}
            href={href || "/"}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              isActive
                ? "bg-gold-soft text-neutral-950"
                : "text-neutral-400 hover:text-neutral-100"
            }`}
          >
            {LABELS[loc]}
          </Link>
        );
      })}
    </div>
  );
}
