"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  telHref,
  whatsappHref,
  PHONE_NUMBER_DISPLAY,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  TIKTOK_URL,
} from "./lib/contact";
import LanguageSwitcher from "./components/LanguageSwitcher";

/**
 * ------------------------------------------------------------------
 *  DONNÉES STATIQUES (non traduites) — images, tarifs, identifiants.
 *  Le texte affiché vient des fichiers /messages/<locale>.json.
 *  Note images : les photos combinant précisément "ce modèle" + "ce
 *  décor suisse" n'existent pas en stock gratuit — voir la légende
 *  affichée sous chaque véhicule.
 * ------------------------------------------------------------------
 */
const VEHICLE_STATIC = {
  eclass: {
    price: 179,
    image: "/images/fleet/eclass.jpg",
  },
  teslaY: {
    price: 149,
    image: "/images/fleet/tesla-y.jpg",
  },
  vclass: {
    price: 219,
    image: "/images/fleet/vclass.jpg",
  },
} as const;

const VEHICLE_IDS = ["eclass", "teslaY", "vclass"] as const;

const SERVICE_STATIC = [
  {
    image:
      "https://images.unsplash.com/photo-1684838200815-36eef38f353c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    image: "/images/services/champagne-interior.jpg",
  },
  {
    image: "/images/services/alpine-van.jpg",
  },
  {
    image:
      "https://images.unsplash.com/photo-1757584666096-59deb41f1124?auto=format&fit=crop&w=1200&q=80",
  },
];

const SERVICE_VIDEO = {
  src: "https://videos.pexels.com/video-files/8345154/8345154-uhd_1440_2560_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/8345154/pexels-photo-8345154.jpeg?auto=compress&w=1200",
};

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : RevealLine
 * ------------------------------------------------------------------
 */
function RevealLine({
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

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Header
 * ------------------------------------------------------------------
 */
function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/40">
            <Image
              src="/icon-192.png"
              alt="Black Excellence Transport"
              fill
              className="object-cover"
            />
          </span>
          <span className="font-display hidden text-lg tracking-wide text-neutral-50 sm:inline">
            BLACK <span className="text-gold-light">EXCELLENCE</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
          <a href="#flotte" className="transition-colors hover:text-gold-light">
            {t("fleet")}
          </a>
          <a
            href="#services"
            className="transition-colors hover:text-gold-light"
          >
            {t("services")}
          </a>
          <a
            href="#reservation"
            className="transition-colors hover:text-gold-light"
          >
            {t("booking")}
          </a>
          <a href="#contact" className="transition-colors hover:text-gold-light">
            {t("contact")}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#reservation"
            className="hidden rounded-full border border-gold/50 px-5 py-2 text-sm text-gold-light transition-colors hover:border-gold hover:bg-gold/10 sm:inline-block"
          >
            {t("reserve")}
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : VehicleCard
 * ------------------------------------------------------------------
 */
function VehicleCard({
  id,
  index,
}: {
  id: (typeof VEHICLE_IDS)[number];
  index: number;
}) {
  const t = useTranslations();
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const { image, price } = VEHICLE_STATIC[id];
  const features = t.raw(`vehicles.${id}.features`) as string[];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0.5]
  );
  const imageY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(-y * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative flex flex-col overflow-hidden rounded-sm border border-white/10 bg-neutral-900/40 transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(212,175,55,0.4)]"
      >
        <div className="relative h-72 w-full overflow-hidden sm:h-80">
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
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-neutral-950/60 px-3 py-1 text-xs tracking-wide text-neutral-200 backdrop-blur-sm">
            {t(`vehicles.${id}.category`)}
          </span>
        </div>

        <div
          className="flex flex-1 flex-col gap-5 p-7"
          style={{ transform: "translateZ(30px)" }}
        >
          <div>
            <h3 className="font-display text-2xl text-neutral-50">
              {t(`vehicles.${id}.name`)}
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              {t(`vehicles.${id}.tagline`)}
            </p>
          </div>

          <ul className="space-y-1.5 border-y border-white/10 py-4 text-sm text-neutral-300">
            <li className="flex items-center gap-2 text-neutral-400">
              <span className="text-gold-light">
                {t(`vehicles.${id}.seats`)}
              </span>
              <span>·</span>
              <span className="text-gold-light">
                {t(`vehicles.${id}.bags`)}
              </span>
            </li>
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="text-neutral-100">
              <span className="font-display text-2xl text-gold-soft">
                {t("fleet.from")} {price}
              </span>{" "}
              <span className="text-sm text-neutral-400">
                {t("fleet.currency")}
              </span>
            </p>
            <a
              href="#reservation"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold-light transition-colors duration-300 hover:border-gold hover:bg-gold/10"
            >
              {t("fleet.reserveBtn")}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Hero
 * ------------------------------------------------------------------
 */
function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-neutral-950"
    >
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 sm:px-10"
      >
        <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-neutral-50 sm:text-6xl md:text-7xl">
          <RevealLine text={t("line1")} delay={0.1} />
          <RevealLine text={t("line2")} delay={0.25} />
          <RevealLine
            text={t("line3")}
            delay={0.4}
            className="italic text-gold-soft"
          />
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-300">
          {t("paragraph")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#reservation"
            className="rounded-full bg-gold-soft px-7 py-3 text-sm font-medium text-neutral-950 transition-colors duration-300 hover:bg-gold-light"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#flotte"
            className="rounded-full border border-white/25 px-7 py-3 text-sm text-neutral-100 transition-colors duration-300 hover:border-white/60"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Fleet
 * ------------------------------------------------------------------
 */
function Fleet() {
  const t = useTranslations("fleet");

  return (
    <section id="flotte" className="bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl text-neutral-50 sm:text-5xl">
            <RevealLine text={t("heading")} />
          </h2>
          <p className="mt-5 text-neutral-400">{t("intro")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {VEHICLE_IDS.map((id, index) => (
            <VehicleCard key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : FloatingServiceCard
 *  Carte illustrant un service, avec un léger flottement continu
 *  (animation en boucle) en plus du fondu à l'apparition.
 * ------------------------------------------------------------------
 */
function FloatingServiceCard({
  image,
  title,
  description,
  index,
}: {
  image: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + index * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="overflow-hidden rounded-sm border border-white/10 bg-neutral-900/40 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.35)]"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg text-neutral-50">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Services
 *  Vidéo (chauffeur ouvrant la porte) + cartes flottantes illustrant
 *  les services (aéroport, champagne à bord, Alpes, Genève).
 * ------------------------------------------------------------------
 */
function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="services" className="bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl text-neutral-50 sm:text-5xl">
            <RevealLine text={t("heading")} />
          </h2>
          <p className="mt-5 text-neutral-400">{t("intro")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7 }}
            className="relative row-span-2 overflow-hidden rounded-sm border border-gold/20"
          >
            <video
              className="h-full min-h-[420px] w-full object-cover"
              src={SERVICE_VIDEO.src}
              poster={SERVICE_VIDEO.poster}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
            <p className="absolute bottom-5 left-5 font-display text-lg text-neutral-50">
              {t("videoCaption")}
            </p>
          </motion.div>

          {items.map((item, index) => (
            <FloatingServiceCard
              key={item.title}
              image={SERVICE_STATIC[index]?.image ?? SERVICE_STATIC[0].image}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : QuickBooking
 * ------------------------------------------------------------------
 */
function QuickBooking() {
  const t = useTranslations("booking");
  const tVehicles = useTranslations("vehicles");
  const [selectedVehicle, setSelectedVehicle] = useState<
    (typeof VEHICLE_IDS)[number]
  >(VEHICLE_IDS[0]);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      vehicle: tVehicles(`${selectedVehicle}.name`),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("send_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const whatsappMessage = t("whatsappMessage");

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden rounded-sm p-6 sm:p-8">
          <Image
            src="/images/booking/steering-wheel-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/55" />

          <div className="relative">
            <h2 className="font-display text-4xl text-neutral-50 sm:text-5xl">
              <RevealLine text={t("heading1")} />
              <RevealLine text={t("heading2")} delay={0.1} />
            </h2>
            <p className="mt-5 max-w-sm text-neutral-400">{t("intro")}</p>

            <ul className="mt-10 space-y-4 text-sm text-neutral-400">
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                {t("bullet1")}
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                {t("bullet2")}
              </li>
              <li className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                {t("bullet3")}
              </li>
            </ul>

            <div className="mt-10 rounded-sm border border-white/10 bg-neutral-950/40 p-6 backdrop-blur-sm">
              <p className="text-sm text-neutral-300">{t("contactHeading")}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={telHref()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-neutral-100 transition-colors hover:border-white/50"
                >
                  {t("callBtn")} · {PHONE_NUMBER_DISPLAY}
                </a>
                <a
                  href={whatsappHref(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                >
                  {t("whatsappBtn")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-sm border border-white/10 bg-neutral-900/40 p-8 backdrop-blur-sm sm:p-10"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span className="text-xs text-neutral-400">
                {t("vehicleLabel")}
              </span>
              <select
                name="vehicle"
                value={selectedVehicle}
                onChange={(e) =>
                  setSelectedVehicle(
                    e.target.value as (typeof VEHICLE_IDS)[number]
                  )
                }
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              >
                {VEHICLE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {tVehicles(`${id}.name`)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">
                {t("dateLabel")}
              </span>
              <input
                name="date"
                type="date"
                required
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">
                {t("timeLabel")}
              </span>
              <input
                name="time"
                type="time"
                required
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">
                {t("nameLabel")}
              </span>
              <input
                name="name"
                type="text"
                required
                placeholder={t("namePlaceholder")}
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">
                {t("phoneLabel")}
              </span>
              <input
                name="phone"
                type="tel"
                required
                placeholder={t("phonePlaceholder")}
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-gold"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-8 w-full rounded-full bg-gold-soft py-3.5 text-sm font-medium text-neutral-950 transition-colors duration-300 hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>

          {status === "success" && (
            <p className="mt-4 text-center text-sm text-emerald-400">
              {t("success")}
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-center text-sm text-red-400">
              {t("errorText")}{" "}
              <a
                href={whatsappHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp
              </a>{" "}
              {t("errorOr")} {PHONE_NUMBER_DISPLAY}.
            </p>
          )}

          {status === "idle" && (
            <p className="mt-4 text-center text-xs text-neutral-500">
              {t("idleNote")}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Footer
 * ------------------------------------------------------------------
 */
function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const quickLinks = [
    { href: "#top", label: t("homeLabel") },
    { href: "#flotte", label: tNav("fleet") },
    { href: "#services", label: tNav("services") },
    { href: "#reservation", label: tNav("booking") },
    { href: "#contact", label: tNav("contact") },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-neutral-950 px-6 pt-16 sm:px-10"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-sm">
        <Image
          src="/images/footer/mercedes-emblem.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-neutral-950/80" />

        <div className="relative grid grid-cols-1 gap-12 p-6 pb-12 sm:grid-cols-2 sm:p-10 sm:pb-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-lg text-neutral-50">
              BLACK <span className="text-gold-light">EXCELLENCE</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
              {t("description")}
            </p>
          </div>

        <div>
          <h3 className="font-display text-base text-neutral-50">
            {t("quickLinksTitle")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-neutral-50">
            {t("followTitle")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold-light"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(
                  "Bonjour, je souhaite en savoir plus sur Black Excellence Transport."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold-light"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold-light"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base text-neutral-50">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-neutral-400">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors hover:text-gold-light"
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={telHref()}
                className="transition-colors hover:text-gold-light"
              >
                {PHONE_NUMBER_DISPLAY}
              </a>
            </li>
          </ul>
        </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center text-sm text-neutral-500 sm:flex-row sm:text-left">
        <p>{t("location")}</p>
        <p>
          © {new Date().getFullYear()} Black Excellence Transport. {t("rights")}
        </p>
      </div>
    </footer>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : WhatsAppFab
 * ------------------------------------------------------------------
 */
function WhatsAppFab() {
  const t = useTranslations("booking");

  return (
    <a
      href={whatsappHref(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-neutral-950 shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-neutral-950"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.17h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.85 14.02c-.25.7-1.45 1.34-2 1.42-.53.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.29.4-.24.66-.14.27.1 1.72.81 2.02.96.29.15.49.22.56.34.07.13.07.75-.18 1.45Z" />
      </svg>
    </a>
  );
}

/**
 * ------------------------------------------------------------------
 *  PAGE D'ACCUEIL
 * ------------------------------------------------------------------
 */
export default function Home() {
  return (
    <main className="bg-neutral-950">
      <Header />
      <Hero />
      <Fleet />
      <Services />
      <QuickBooking />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}
