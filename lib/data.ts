/**
 * ------------------------------------------------------------------
 *  DONNÉES NON TRADUITES — images, tarifs, identifiants, routes.
 *  Tout le texte affiché vit dans /messages/<locale>.json et est
 *  retrouvé via les identifiants ci-dessous.
 * ------------------------------------------------------------------
 */

/* --- FLOTTE ------------------------------------------------------ */

export const VEHICLE_IDS = ["eclass", "teslaY", "vclass"] as const;
export type VehicleId = (typeof VEHICLE_IDS)[number];

export const VEHICLES: Record<
  VehicleId,
  { price: number; image: string; accent: string }
> = {
  eclass: {
    price: 179,
    image: "/images/fleet-e-class.jpg",
    accent: "#D4AF37",
  },
  teslaY: {
    price: 149,
    image: "/images/fleet-tesla-y.jpg",
    accent: "#8FB8FF",
  },
  vclass: {
    price: 219,
    image: "/images/fleet-v-class.jpg",
    accent: "#D4AF37",
  },
};

/* --- SERVICES ---------------------------------------------------- */

export const SERVICE_IDS = ["airport", "ski", "business"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICES: Record<
  ServiceId,
  { slug: string; hero: string; gallery: string[] }
> = {
  airport: {
    slug: "/services/airport-transfers",
    hero: "https://images.unsplash.com/photo-1684838200815-36eef38f353c?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1684838200815-36eef38f353c?auto=format&fit=crop&w=1200&q=80",
      "/images/business-jet-transfer.jpg",
    ],
  },
  ski: {
    slug: "/services/ski-resort-transfers",
    hero: "/images/ski-transfer-van.jpg",
    gallery: [
      "/images/ski-transfer-van.jpg",
      "/images/fleet-v-class.jpg",
    ],
  },
  business: {
    slug: "/services/business-travel",
    hero: "/images/business-jet-transfer.jpg",
    gallery: [
      "/images/business-jet-transfer.jpg",
      "https://images.unsplash.com/photo-1760552973872-231e623c793f?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

/* --- ZONES DESSERVIES -------------------------------------------- */
/* Présentation volontairement différente de la référence : onglets
   interactifs avec halo néon plutôt qu'une rangée de cartes plates. */

export const SERVICE_AREAS = [
  {
    id: "ch",
    flag: "🇨🇭",
    glow: "#E2453C",
    cities: [
      "Geneva",
      "Lausanne",
      "Montreux",
      "Zurich",
      "Basel",
      "Bern",
      "Lugano",
      "Zermatt",
      "Verbier",
      "Gstaad",
      "St. Moritz",
      "Crans-Montana",
    ],
  },
  {
    id: "fr",
    flag: "🇫🇷",
    glow: "#4C7DF0",
    cities: [
      "Chamonix",
      "Annecy",
      "Megève",
      "Courchevel",
      "Val d'Isère",
      "Tignes",
      "Lyon",
      "Paris",
      "Nice",
      "Évian-les-Bains",
    ],
  },
  {
    id: "it",
    flag: "🇮🇹",
    glow: "#3FA34D",
    cities: [
      "Milan",
      "Como",
      "Turin",
      "Cervinia",
      "Courmayeur",
      "Aosta",
      "Florence",
      "Venice",
      "Rome",
    ],
  },
  {
    id: "de",
    flag: "🇩🇪",
    glow: "#E0B23C",
    cities: [
      "Munich",
      "Stuttgart",
      "Frankfurt",
      "Baden-Baden",
      "Freiburg",
      "Konstanz",
    ],
  },
] as const;

/* --- MÉDIAS ------------------------------------------------------- */

export const HERO_VIDEO = {
  src: "https://videos.pexels.com/video-files/8345154/8345154-uhd_1440_2560_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/8345154/pexels-photo-8345154.jpeg?auto=compress&w=1200",
};

// Bannière statique pour les pages intérieures (À propos, Contact).
export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1617814065893-00757125efab?auto=format&fit=crop&w=2400&q=80";

// Visuel de la section "Qui nous sommes" sur la page d'accueil.
export const ABOUT_IMAGE = "/images/fleet-v-class.jpg";

// Visuel de la section "Notre histoire" sur la page À propos.
export const HISTORY_IMAGE = "/images/geneva-swiss-flag.jpg";
