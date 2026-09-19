"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SERVICES, type ServiceId } from "@/lib/data";
import { SectionHeading, FadeUp } from "./Reveal";
import { PageHero, Highlights, CtaBanner } from "./Sections";
import QuoteForm from "./QuoteForm";

/* --- FAQ en accordéon --------------------------------------------- */

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/30">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 p-6 text-left transition-colors hover:bg-white/[0.03]"
            >
              <span
                className={`text-[15px] transition-colors ${
                  isOpen ? "text-gold-light" : "text-neutral-200"
                }`}
              >
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 text-lg text-gold"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-neutral-400">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* --- Gabarit de page de service ------------------------------------ */

export default function ServicePage({ id }: { id: ServiceId }) {
  const t = useTranslations(`servicePages.${id}`);
  const tCommon = useTranslations("common");
  const service = SERVICES[id];

  return (
    <main>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        intro={t("intro")}
        image={service.hero}
      />

      {/* Description longue + visuel */}
      <section className="bg-neutral-950 px-6 py-28 sm:px-10">
        <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              kicker={t("bodyKicker")}
              title={t("bodyHeading")}
            />
            <FadeUp delay={0.1}>
              <div className="mt-8 space-y-5 leading-relaxed text-neutral-400">
                {(t.raw("paragraphs") as string[]).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="space-y-5">
              {service.gallery.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                    i === 0 ? "aspect-[4/3]" : "aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker={t("includedKicker")}
            title={t("includedHeading")}
            align="center"
          />
          <div className="mt-16">
            <Highlights items={t.raw("included") as string[]} />
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <section className="relative overflow-hidden bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full bg-gold/6 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl">
          <SectionHeading
            kicker={t("routesKicker")}
            title={t("routesHeading")}
            align="center"
          />

          <FadeUp delay={0.15}>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {(t.raw("routes") as { from: string; to: string }[]).map(
                (route) => (
                  <div
                    key={`${route.from}-${route.to}`}
                    className="group flex items-center justify-between gap-4 bg-neutral-950 px-6 py-5 transition-colors duration-400 hover:bg-neutral-900/70"
                  >
                    <span className="text-sm text-neutral-300">
                      {route.from}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent transition-all duration-500 group-hover:via-gold/80" />
                    <span className="text-sm text-neutral-300">
                      {route.to}
                    </span>
                  </div>
                )
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker={tCommon("faqKicker")}
            title={tCommon("faqHeading")}
            align="center"
          />
          <div className="mt-14">
            <Faq items={t.raw("faq") as { q: string; a: string }[]} />
          </div>
        </div>
      </section>

      {/* Devis */}
      <section className="bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            kicker={tCommon("quoteKicker")}
            title={tCommon("quoteHeading")}
            align="center"
          />
          <div className="mt-14">
            <QuoteForm compact />
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
