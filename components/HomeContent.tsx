"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  VEHICLE_IDS,
  SERVICE_IDS,
  HERO_VIDEO,
  ABOUT_IMAGE,
} from "@/lib/data";
import { RevealLine, FadeUp, SectionHeading } from "@/components/Reveal";
import { ServiceCard, Highlights, CtaBanner } from "@/components/Sections";
import VehicleCard from "@/components/VehicleCard";
import ServiceAreas from "@/components/ServiceAreas";

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[660px] w-full items-end overflow-hidden bg-neutral-950"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/55 to-neutral-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/20 to-transparent" />
      </motion.div>

      {/* Halo doré animé */}
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[130px]"
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 sm:px-10"
      >
        <FadeUp>
          <p className="mb-6 text-[11px] uppercase tracking-[0.38em] text-gold">
            {t("kicker")}
          </p>
        </FadeUp>

        <h1 className="font-display max-w-4xl text-5xl leading-[1.02] text-neutral-50 sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <RevealLine text={t("line1")} delay={0.1} />
          <RevealLine text={t("line2")} delay={0.26} />
          <RevealLine
            text={t("line3")}
            delay={0.42}
            className="italic text-gradient-gold"
          />
        </h1>

        <FadeUp delay={0.5}>
          <p className="mt-9 max-w-lg text-base leading-relaxed text-neutral-300">
            {t("paragraph")}
          </p>
        </FadeUp>

        <FadeUp delay={0.6}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-gold-deep via-gold-soft to-gold-deep bg-[length:200%_auto] px-8 py-3.5 text-sm font-medium text-neutral-950 transition-all duration-500 hover:bg-[position:right_center] hover:shadow-[0_0_44px_-8px_rgba(212,175,55,0.85)]"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/fleet"
              className="rounded-full border border-white/25 px-8 py-3.5 text-sm text-neutral-100 backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:text-gold-light"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </FadeUp>

        {/* Indicateurs de confiance */}
        <FadeUp delay={0.7}>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-xs tracking-wide text-neutral-500">
            {(t.raw("badges") as string[]).map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold shadow-[0_0_6px_1px_rgba(212,175,55,0.8)]" />
                {badge}
              </span>
            ))}
          </div>
        </FadeUp>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        animate={{ y: [0, 9, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold lg:block"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6"
        >
          <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PRÉSENTATION                                                       */
/* ------------------------------------------------------------------ */

function Intro() {
  const t = useTranslations("homeIntro");

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            kicker={t("kicker")}
            title={t("heading")}
            intro={t("paragraph1")}
          />
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-xl leading-relaxed text-neutral-400">
              {t("paragraph2")}
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="mt-12 grid grid-cols-3 gap-6">
              {(t.raw("stats") as { value: string; label: string }[]).map(
                (stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-3xl text-gradient-gold">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-neutral-500">
                      {stat.label}
                    </p>
                  </div>
                )
              )}
            </div>
          </FadeUp>
        </div>

        {/* Visuel */}
        <FadeUp delay={0.2}>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={ABOUT_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */

function ServicesPreview() {
  const t = useTranslations("services");

  return (
    <section className="relative bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker={t("kicker")}
          title={t("heading")}
          intro={t("intro")}
          align="center"
        />

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {SERVICE_IDS.map((id, index) => (
            <ServiceCard key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOTTE                                                             */
/* ------------------------------------------------------------------ */

function FleetPreview() {
  const t = useTranslations("fleet");

  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-gold/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker={t("kicker")}
          title={t("heading")}
          intro={t("intro")}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {VEHICLE_IDS.map((id, index) => (
            <VehicleCard key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  POURQUOI NOUS                                                      */
/* ------------------------------------------------------------------ */

function WhyUs() {
  const t = useTranslations("why");

  return (
    <section className="bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker={t("kicker")}
          title={t("heading")}
          align="center"
        />
        <div className="mt-16">
          <Highlights items={t.raw("items") as string[]} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function HomeContent() {
  return (
    <main>
      <Hero />
      <Intro />
      <ServicesPreview />
      <FleetPreview />
      <ServiceAreas />
      <WhyUs />
      <CtaBanner />
    </main>
  );
}
