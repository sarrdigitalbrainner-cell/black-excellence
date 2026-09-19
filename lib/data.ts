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
    image:
      "https://images.unsplash.com/photo-1762393060999-ba7e0cc31379?auto=format&fit=crop&w=1600&q=80",
    accent: "#D4AF37",
  },
  teslaY: {
    price: 149,
    // Tesla Model Y "Juniper" (millésime 2025) — à remplacer par une
    // photo du véhicule réel du client dès qu'elle est disponible.
    image:
      "https://images.unsplash.com/photo-1740170512963-94852dc65820?auto=format&fit=crop&w=1600&q=80",
    accent: "#8FB8FF",
  },
  vclass: {
    price: 219,
    image:
      "https://images.unsplash.com/photo-1578557904035-f68542b3770e?auto=format&fit=crop&w=1600&q=80",
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
      "https://images.unsplash.com/photo-1578557904035-f68542b3770e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  ski: {
    slug: "/services/ski-resort-transfers",
    hero: "https://images.unsplash.com/photo-1762393060999-ba7e0cc31379?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1762393060999-ba7e0cc31379?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578557904035-f68542b3770e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  business: {
    slug: "/services/business-travel",
    hero: "https://images.unsplash.com/photo-1757584666096-59deb41f1124?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1757584666096-59deb41f1124?auto=format&fit=crop&w=1200&q=80",
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

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1617814065893-00757125efab?auto=format&fit=crop&w=2400&q=80";

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1757584666096-59deb41f1124?auto=format&fit=crop&w=1600&q=80";
