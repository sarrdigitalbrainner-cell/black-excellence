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

/**
 * ------------------------------------------------------------------
 *  DONNÉES STATIQUES — À REMPLACER PAR VOS VRAIES DONNÉES / CMS
 *  Les tarifs sont symboliques, à ajuster selon votre grille réelle.
 *  Flotte alignée sur la référence client (Tesla Y, V-Class, S-Class).
 * ------------------------------------------------------------------
 */
type Vehicle = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  seats: string;
  bags: string;
  features: string[];
  image: string;
};

const VEHICLES: Vehicle[] = [
  {
    id: "tesla-y",
    name: "Tesla Model Y",
    tagline: "L'élégance silencieuse",
    category: "Berline exécutive électrique",
    price: 149,
    seats: "3 places",
    bags: "3 bagages",
    features: [
      "Conduite 100% électrique et silencieuse",
      "Wi-Fi à bord offert",
      "Eau et rafraîchissements",
      "Sellerie cuir exécutive",
    ],
    image:
      "https://images.unsplash.com/photo-1678026039241-75a1becd25e5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "v-class",
    name: "Mercedes-Benz Classe V",
    tagline: "L'espace pour vos groupes",
    category: "Van de luxe",
    price: 219,
    seats: "7 places",
    bags: "8 bagages",
    features: [
      "Jusqu'à 7 passagers",
      "Grand volume pour bagages et équipement de ski",
      "Cabine climatisée",
      "Rafraîchissements à bord",
    ],
    image:
      "https://images.unsplash.com/photo-1578557904035-f68542b3770e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "s-class",
    name: "Mercedes-Benz Classe S",
    tagline: "Le confort absolu",
    category: "Berline First Class",
    price: 259,
    seats: "3 places",
    bags: "3 bagages",
    features: [
      "Sièges arrière massants",
      "Vitres à isolation renforcée",
      "Champagne sur demande",
      "Chauffeur professionnel dédié",
    ],
    image:
      "https://images.unsplash.com/photo-1610099610040-ab19f3a5ec35?auto=format&fit=crop&w=1600&q=80",
  },
];

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : RevealLine
 *  Masque le texte (overflow-hidden) et le fait glisser du bas
 *  vers le haut lors de son apparition dans le viewport.
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
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-neutral-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="flex items-center gap-3">
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-gold/40">
            <Image
              src="/icon-192.png"
              alt="Black Excellence"
              fill
              className="object-cover"
            />
          </span>
          <span className="font-display text-lg tracking-wide text-neutral-50">
            BLACK <span className="text-gold-light">EXCELLENCE</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
          <a href="#flotte" className="transition-colors hover:text-gold-light">
            Notre flotte
          </a>
          <a
            href="#reservation"
            className="transition-colors hover:text-gold-light"
          >
            Réservation
          </a>
          <a href="#contact" className="transition-colors hover:text-gold-light">
            Contact
          </a>
        </nav>

        <a
          href="#reservation"
          className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
        >
          Réserver
        </a>
      </div>
    </header>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : VehicleCard
 *  Parallax + fondu de l'image au scroll (useScroll / useTransform),
 *  et effet 3D au survol (tilt selon la position du curseur).
 * ------------------------------------------------------------------
 */
function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

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

  // Effet 3D : la carte s'incline légèrement en suivant le curseur.
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
        {/* Image avec parallax au scroll + zoom au survol */}
        <div className="relative h-72 w-full overflow-hidden sm:h-80">
          <motion.div
            style={{ opacity: imageOpacity, y: imageY }}
            className="absolute inset-0 scale-110"
          >
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={index === 0}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-neutral-950/60 px-3 py-1 text-xs tracking-wide text-neutral-200 backdrop-blur-sm">
            {vehicle.category}
          </span>
        </div>

        {/* Contenu de la carte */}
        <div className="flex flex-1 flex-col gap-5 p-7" style={{ transform: "translateZ(30px)" }}>
          <div>
            <h3 className="font-display text-2xl text-neutral-50">
              {vehicle.name}
            </h3>
            <p className="mt-1 text-sm text-neutral-400">{vehicle.tagline}</p>
          </div>

          <ul className="space-y-1.5 border-y border-white/10 py-4 text-sm text-neutral-300">
            <li className="flex items-center gap-2 text-neutral-400">
              <span className="text-gold-light">{vehicle.seats}</span>
              <span>·</span>
              <span className="text-gold-light">{vehicle.bags}</span>
            </li>
            {vehicle.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="text-neutral-100">
              <span className="font-display text-2xl text-gold-soft">
                dès {vehicle.price}
              </span>{" "}
              <span className="text-sm text-neutral-400">CHF</span>
            </p>
            <a
              href="#reservation"
              className="rounded-full border border-gold/50 px-5 py-2 text-sm text-gold-light transition-colors duration-300 hover:border-gold hover:bg-gold/10"
            >
              Réserver
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
        <Image
          src="https://images.unsplash.com/photo-1617814065893-00757125efab?auto=format&fit=crop&w=2400&q=80"
          alt="Berline de luxe pour chauffeur privé en Suisse"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-40 sm:px-10"
      >
        <p className="mb-6 text-sm text-neutral-300">
          Chauffeur privé indépendant — Genève &amp; toute la Suisse
        </p>

        <h1 className="font-display max-w-3xl text-5xl leading-[1.05] text-neutral-50 sm:text-6xl md:text-7xl">
          <RevealLine text="Votre chauffeur." delay={0.1} />
          <RevealLine text="Notre excellence." delay={0.25} />
          <RevealLine
            text="Chaque trajet compte."
            delay={0.4}
            className="italic text-gold-soft"
          />
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-neutral-300">
          Transferts aéroport, trajets d&apos;affaires et longue distance à
          bord d&apos;une flotte Tesla et Mercedes-Benz. Notre équipe vous
          accompagne 24h/24, avec un prix fixe annoncé à l&apos;avance.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#reservation"
            className="rounded-full bg-gold-soft px-7 py-3 text-sm font-medium text-neutral-950 transition-colors duration-300 hover:bg-gold-light"
          >
            Devis instantané
          </a>
          <a
            href="#flotte"
            className="rounded-full border border-white/25 px-7 py-3 text-sm text-neutral-100 transition-colors duration-300 hover:border-white/60"
          >
            Découvrir la flotte
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : Fleet (grille de véhicules)
 * ------------------------------------------------------------------
 */
function Fleet() {
  return (
    <section id="flotte" className="bg-neutral-950 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl text-neutral-50 sm:text-5xl">
            <RevealLine text="Notre flotte" />
          </h2>
          <p className="mt-5 text-neutral-400">
            Trois véhicules entretenus au standard que notre équipe exige
            pour chaque trajet — silencieux, spacieux ou premium selon
            votre besoin.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {VEHICLES.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ------------------------------------------------------------------
 *  COMPOSANT : QuickBooking (section de réservation rapide)
 * ------------------------------------------------------------------
 */
function QuickBooking() {
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLES[0].id);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Brancher ici votre logique de réservation (API, e-mail, CRM…)
    console.log("Demande de réservation envoyée pour :", selectedVehicle);
  }

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-neutral-950 px-6 py-28 sm:px-10"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-display text-4xl text-neutral-50 sm:text-5xl">
            <RevealLine text="Réservation" />
            <RevealLine text="rapide" delay={0.1} />
          </h2>
          <p className="mt-5 max-w-sm text-neutral-400">
            Indiquez vos dates et vos coordonnées : notre équipe confirme
            votre réservation sous 30 minutes, 7 jours sur 7.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-neutral-400">
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Suivi de vol en temps réel pour les transferts aéroport
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Prix fixe, annoncé avant la course
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Disponible aussi par WhatsApp
            </li>
          </ul>
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
              <span className="text-xs text-neutral-400">Véhicule souhaité</span>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              >
                {VEHICLES.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} — dès {vehicle.price} CHF
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">Prise en charge</span>
              <input
                type="date"
                required
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">Heure</span>
              <input
                type="time"
                required
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">Nom complet</span>
              <input
                type="text"
                required
                placeholder="Jean Dupont"
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-gold"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs text-neutral-400">Téléphone</span>
              <input
                type="tel"
                required
                placeholder="+41 79 000 00 00"
                className="rounded-sm border border-white/15 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-600 focus:border-gold"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-gold-soft py-3.5 text-sm font-medium text-neutral-950 transition-colors duration-300 hover:bg-gold-light"
          >
            Confirmer la demande
          </button>

          <p className="mt-4 text-center text-xs text-neutral-500">
            Aucun paiement n&apos;est requis à cette étape.
          </p>
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
  return (
    <footer
      id="contact"
      className="border-t border-white/10 bg-neutral-950 px-6 py-10 sm:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center text-sm text-neutral-500 sm:flex-row sm:text-left">
        <p className="font-display text-neutral-300">
          BLACK <span className="text-gold-light">EXCELLENCE</span>
        </p>
        <p>Genève, Suisse — disponible 24h/24, 7j/7</p>
        <p>© {new Date().getFullYear()} Black Excellence. Tous droits réservés.</p>
      </div>
    </footer>
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
      <QuickBooking />
      <Footer />
    </main>
  );
}
