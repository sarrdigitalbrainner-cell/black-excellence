"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "it", label: "IT", name: "Italiano" },
] as const;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const activeLocale = useLocale();
  const [open, setOpen] = useState(false);

  const active = LOCALES.find((l) => l.code === activeLocale) ?? LOCALES[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Language"
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] tracking-widest text-neutral-300 transition-colors hover:border-gold/50 hover:text-gold-light"
      >
        {active.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[8px]"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full z-50 pt-3"
          >
            <div className="overflow-hidden rounded-lg border border-gold/25 bg-neutral-950/95 py-1 shadow-[0_20px_50px_-20px_rgba(212,175,55,0.4)] backdrop-blur-xl">
              {LOCALES.map((loc) => (
                <Link
                  key={loc.code}
                  href={pathname}
                  locale={loc.code}
                  className={`block whitespace-nowrap px-4 py-2 text-xs transition-colors ${
                    loc.code === activeLocale
                      ? "text-gold-light"
                      : "text-neutral-400 hover:bg-gold/10 hover:text-neutral-100"
                  }`}
                >
                  <span className="mr-2 tracking-widest">{loc.label}</span>
                  <span className="text-neutral-500">{loc.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
