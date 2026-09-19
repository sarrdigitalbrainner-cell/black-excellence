"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { VEHICLES, type VehicleId } from "@/lib/data";

export default function VehicleCard({
  id,
  index,
}: {
  id: VehicleId;
  index: number;
}) {
  const t = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const { image, price, accent } = VEHICLES[id];
  const features = t.raw(`vehicles.${id}.features`) as string[];

  // Fondu + parallax de l'image pendant le scroll.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.8, 1],
    [0, 1, 1, 0.55]
  );
  const imageY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  // Inclinaison 3D qui suit le curseur.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    rotateY.set(((event.clientX - b.left) / b.width - 0.5) * 9);
    rotateX.set(-((event.clientY - b.top) / b.height - 0.5) * 9);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      style={{ perspective: 1100 }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group neon-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/60 to-neutral-950/90 transition-shadow duration-500"
      >
        {/* Visuel */}
        <div className="relative h-72 w-full overflow-hidden sm:h-[19rem]">
          <motion.div
            style={{ opacity: imageOpacity, y: imageY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src={image}
              alt={t(`vehicles.${id}.name`)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index === 0}
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/15 to-transparent" />

          {/* Halo coloré propre au véhicule, révélé au survol */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
            style={{ backgroundColor: accent }}
          />

          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-neutral-950/70 px-3.5 py-1.5 text-[11px] tracking-wide text-neutral-200 backdrop-blur-sm">
            {t(`vehicles.${id}.category`)}
          </span>

          <span className="absolute bottom-3 right-4 text-[10px] italic text-neutral-500">
            {t("fleet.imageNote")}
          </span>
        </div>

        {/* Contenu */}
        <div
          className="flex flex-1 flex-col gap-5 p-7"
          style={{ transform: "translateZ(28px)" }}
        >
          <div>
            <h3 className="font-display text-2xl text-neutral-50">
              {t(`vehicles.${id}.name`)}
            </h3>
            <p className="mt-1.5 text-sm text-neutral-400">
              {t(`vehicles.${id}.tagline`)}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-md border border-gold/25 bg-gold/5 px-2.5 py-1 text-gold-light">
              {t(`vehicles.${id}.seats`)}
            </span>
            <span className="rounded-md border border-gold/25 bg-gold/5 px-2.5 py-1 text-gold-light">
              {t(`vehicles.${id}.bags`)}
            </span>
          </div>

          <ul className="space-y-2 border-t border-white/8 pt-5 text-sm text-neutral-300">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold shadow-[0_0_6px_1px_rgba(212,175,55,0.7)]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-5">
            <p>
              <span className="font-display text-2xl text-gradient-gold">
                {t("fleet.from")} {price}
              </span>{" "}
              <span className="text-sm text-neutral-500">
                {t("fleet.currency")}
              </span>
            </p>
            <Link
              href="/contact"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_24px_-6px_rgba(212,175,55,0.8)]"
            >
              {t("fleet.reserveBtn")}
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
