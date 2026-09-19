"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICE_AREAS } from "@/lib/data";
import { SectionHeading, FadeUp } from "./Reveal";

/**
 * Présentation volontairement différente de la référence : au lieu de
 * quatre cartes plates côte à côte, un sélecteur de pays horizontal
 * qui révèle les villes une par une, avec un halo lumineux aux
 * couleurs du drapeau actif.
 */
export default function ServiceAreas() {
  const t = useTranslations("areas");
  const [active, setActive] = useState(0);
  const current = SERVICE_AREAS[active];

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10">
      {/* Halo qui change de couleur selon le pays sélectionné */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ backgroundColor: current.glow }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker={t("kicker")}
          title={t("heading")}
          intro={t("intro")}
          align="center"
        />

        {/* Sélecteur de pays */}
        <FadeUp delay={0.15}>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {SERVICE_AREAS.map((area, index) => {
              const selected = index === active;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm transition-all duration-400 ${
                    selected
                      ? "border-gold/60 bg-gold/10 text-neutral-50"
                      : "border-white/10 bg-neutral-900/40 text-neutral-400 hover:border-white/25 hover:text-neutral-200"
                  }`}
                  style={
                    selected
                      ? { boxShadow: `0 0 34px -10px ${area.glow}` }
                      : undefined
                  }
                >
                  <span className="text-lg leading-none">{area.flag}</span>
                  {t(`countries.${area.id}`)}
                  <span className="text-[11px] text-neutral-500">
                    {area.cities.length}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Villes du pays actif */}
        <div className="mt-12 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {current.cities.map((city, i) => (
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.035, duration: 0.3 }}
                    className="group cursor-default rounded-lg border border-white/8 bg-neutral-900/50 px-4 py-2.5 text-sm text-neutral-300 transition-all duration-300 hover:border-gold/40 hover:bg-gold/5 hover:text-gold-light"
                  >
                    {city}
                  </motion.span>
                ))}
              </div>

              <p className="mt-10 text-center text-sm text-neutral-500">
                {t("outsideNote")}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
