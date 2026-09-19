"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES, type ServiceId } from "@/lib/data";
import { whatsappHref, telHref, PHONE_NUMBER_DISPLAY } from "@/lib/contact";
import { RevealLine, FadeUp } from "./Reveal";

/* --- Hero des pages intérieures ----------------------------------- */

export function PageHero({
  kicker,
  title,
  intro,
  image,
}: {
  kicker: string;
  title: string;
  intro: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-32">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 sm:px-10">
        <FadeUp>
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold">
            {kicker}
          </p>
        </FadeUp>

        <h1 className="font-display max-w-3xl text-4xl leading-[1.08] text-neutral-50 sm:text-5xl md:text-6xl">
          <RevealLine text={title} delay={0.08} />
        </h1>

        <FadeUp delay={0.25}>
          <p className="mt-7 max-w-xl leading-relaxed text-neutral-300">
            {intro}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* --- Carte de service (utilisée sur l'accueil) --------------------- */

export function ServiceCard({
  id,
  index,
}: {
  id: ServiceId;
  index: number;
}) {
  const t = useTranslations("services.items");
  const tCommon = useTranslations("common");

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.12 }}
    >
      <Link
        href={SERVICES[id].slug}
        className="group neon-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40"
      >
        <div className="relative h-56 overflow-hidden">
          <Image
            src={SERVICES[id].gallery[0]}
            alt={t(`${id}.title`)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <h3 className="font-display text-xl text-neutral-50 transition-colors duration-300 group-hover:text-gold-light">
            {t(`${id}.title`)}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
            {t(`${id}.teaser`)}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold-light">
            {tCommon("learnMore")}
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              →
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* --- Liste d'atouts numérotés -------------------------------------- */

export function Highlights({ items }: { items: string[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="group relative bg-neutral-950 p-7 transition-colors duration-500 hover:bg-neutral-900/70"
        >
          <span className="font-display block text-3xl text-gradient-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300">
            {item}
          </p>
          <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        </motion.div>
      ))}
    </div>
  );
}

/* --- Bandeau d'appel à l'action ------------------------------------ */

export function CtaBanner() {
  const t = useTranslations("cta");
  const tBooking = useTranslations("booking");

  return (
    <section className="relative overflow-hidden border-y border-gold/15 bg-neutral-950 px-6 py-24 sm:px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-[130px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl leading-tight text-neutral-50 sm:text-5xl">
          <RevealLine text={t("heading")} />
        </h2>

        <FadeUp delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-neutral-400">
            {t("intro")}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-gradient-to-r from-gold-deep via-gold-soft to-gold-deep bg-[length:200%_auto] px-8 py-3.5 text-sm font-medium text-neutral-950 transition-all duration-500 hover:bg-[position:right_center] hover:shadow-[0_0_40px_-8px_rgba(212,175,55,0.8)]"
            >
              {t("primary")}
            </Link>
            <a
              href={whatsappHref(tBooking("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-3.5 text-sm text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/20 hover:shadow-[0_0_30px_-10px_rgba(37,211,102,0.9)]"
            >
              WhatsApp
            </a>
            <a
              href={telHref()}
              className="rounded-full border border-white/20 px-8 py-3.5 text-sm text-neutral-200 transition-colors hover:border-white/50"
            >
              {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
