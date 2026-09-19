"use client";

import { useTranslations } from "next-intl";
import { HERO_IMAGE } from "@/lib/data";
import { telHref, whatsappHref, PHONE_NUMBER_DISPLAY } from "@/lib/contact";
import { SectionHeading, FadeUp } from "@/components/Reveal";
import { PageHero } from "@/components/Sections";
import QuoteForm from "@/components/QuoteForm";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tBooking = useTranslations("booking");

  return (
    <main>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        intro={t("intro")}
        image={HERO_IMAGE}
      />

      <section className="relative overflow-hidden bg-neutral-950 px-6 py-24 sm:px-10">
        <div className="pointer-events-none absolute -right-32 top-20 h-[440px] w-[440px] rounded-full bg-gold/8 blur-[130px]" />

        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Coordonnées */}
          <div>
            <SectionHeading
              kicker={t("directKicker")}
              title={t("directHeading")}
              intro={t("directIntro")}
            />

            <FadeUp delay={0.15}>
              <div className="mt-10 space-y-4">
                <a
                  href={whatsappHref(tBooking("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-5 transition-all duration-300 hover:bg-[#25D366]/12 hover:shadow-[0_0_34px_-12px_rgba(37,211,102,0.9)]"
                >
                  <span>
                    <span className="block text-sm text-[#25D366]">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-xs text-neutral-500">
                      {t("whatsappHint")}
                    </span>
                  </span>
                  <span className="text-[#25D366] transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href={telHref()}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gold/30 bg-gold/5 p-5 transition-all duration-300 hover:bg-gold/10 hover:shadow-[0_0_34px_-12px_rgba(212,175,55,0.9)]"
                >
                  <span>
                    <span className="block text-sm text-gold-light">
                      {PHONE_NUMBER_DISPLAY}
                    </span>
                    <span className="mt-1 block text-xs text-neutral-500">
                      {t("phoneHint")}
                    </span>
                  </span>
                  <span className="text-gold-light transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.25}>
              <ul className="mt-12 space-y-4 text-sm text-neutral-400">
                {(t.raw("promises") as string[]).map((promise) => (
                  <li key={promise} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold shadow-[0_0_6px_1px_rgba(212,175,55,0.8)]" />
                    {promise}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Formulaire */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
