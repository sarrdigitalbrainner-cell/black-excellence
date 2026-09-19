"use client";

import { useTranslations } from "next-intl";
import { VEHICLE_IDS, VEHICLES } from "@/lib/data";
import { SectionHeading } from "@/components/Reveal";
import { PageHero, Highlights, CtaBanner } from "@/components/Sections";
import VehicleCard from "@/components/VehicleCard";

export default function FleetPage() {
  const t = useTranslations("fleet");
  const tPage = useTranslations("fleetPage");

  return (
    <main>
      <PageHero
        kicker={tPage("kicker")}
        title={tPage("title")}
        intro={tPage("intro")}
        image={VEHICLES.vclass.image}
      />

      <section className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10">
        <div className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/8 blur-[120px]" />

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

      <section className="bg-neutral-950 px-6 pb-28 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker={tPage("standardsKicker")}
            title={tPage("standardsHeading")}
            align="center"
          />
          <div className="mt-16">
            <Highlights items={tPage.raw("standards") as string[]} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
