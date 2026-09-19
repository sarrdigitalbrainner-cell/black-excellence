"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ABOUT_IMAGE, HERO_IMAGE } from "@/lib/data";
import { SectionHeading, FadeUp } from "@/components/Reveal";
import { PageHero, Highlights, CtaBanner } from "@/components/Sections";
import ServiceAreas from "@/components/ServiceAreas";

export default function AboutContent() {
  const t = useTranslations("about");

  return (
    <main>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        intro={t("intro")}
        image={HERO_IMAGE}
      />

      {/* Histoire */}
      <section className="bg-neutral-950 px-6 py-28 sm:px-10">
        <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              kicker={t("storyKicker")}
              title={t("storyHeading")}
            />
            <FadeUp delay={0.1}>
              <div className="mt-8 space-y-5 leading-relaxed text-neutral-400">
                {(t.raw("storyParagraphs") as string[]).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={ABOUT_IMAGE}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker={t("valuesKicker")}
            title={t("valuesHeading")}
            align="center"
          />
          <div className="mt-16">
            <Highlights items={t.raw("values") as string[]} />
          </div>
        </div>
      </section>

      <ServiceAreas />
      <CtaBanner />
    </main>
  );
}
