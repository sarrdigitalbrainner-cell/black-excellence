"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Texte masqué qui glisse du bas vers le haut à l'apparition. */
export function RevealLine({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

/** Bloc qui monte en fondu à l'apparition. */
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Titre de section : sur-titre, titre en reveal, filet doré. */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {kicker && (
        <FadeUp>
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold">
            {kicker}
          </p>
        </FadeUp>
      )}

      <h2 className="font-display text-4xl leading-tight text-neutral-50 sm:text-5xl">
        <RevealLine text={title} />
      </h2>

      <div
        className={`hairline-gold mt-6 w-28 ${centered ? "mx-auto" : ""}`}
        style={
          centered
            ? undefined
            : {
                background:
                  "linear-gradient(90deg, rgba(212,175,55,0.9), transparent)",
              }
        }
      />

      {intro && (
        <FadeUp delay={0.1}>
          <p className="mt-6 leading-relaxed text-neutral-400">{intro}</p>
        </FadeUp>
      )}
    </div>
  );
}
