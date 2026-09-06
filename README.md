# Black Excellence — Site chauffeur privé (PWA)

Site vitrine + réservation pour un chauffeur VTC indépendant en Suisse.
Next.js 14 (App Router) · Tailwind CSS · Framer Motion · PWA installable.

## PWA — installation sur iPhone / Android

- Le site est une PWA complète : `public/manifest.json` + `public/sw.js`
  (service worker, stratégie network-first avec repli sur le cache).
- Sur **Android/Chrome/Edge**, `app/components/InstallPrompt.tsx` intercepte
  l'événement natif `beforeinstallprompt` et affiche une bannière avec un
  bouton "Installer" qui déclenche le vrai pop-up d'installation.
- Sur **iOS (Safari)**, il n'existe pas d'événement équivalent : la bannière
  affiche donc des instructions ("Partager → Sur l'écran d'accueil") après
  quelques secondes sur le site.
- Les icônes (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`,
  `favicon-32.png`) ont été générées à partir du logo fourni.

## Personnalisation de la marque

- Couleurs "or" alignées sur le logo dans `tailwind.config.ts`
  (`gold`, `gold-light`, `gold-soft`, `gold-deep`).
- Texture "noir granulé" appliquée via la classe `.grain-bg` dans
  `app/globals.css` (grain SVG discret en surimpression, effet premium).
- Remplacez `public/logo-square.png` / `public/logo-wide.png` si le logo
  définitif change, puis régénérez les icônes.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Déployer sur Vercel

1. Glissez ce dossier (dézippé) dans un nouveau dépôt Git, ou importez-le
   directement depuis l'interface Vercel ("Add New… → Project → glisser le dossier").
2. Vercel détecte automatiquement Next.js — aucune configuration
   supplémentaire n'est nécessaire.
3. `npm run build` est exécuté automatiquement au déploiement.

## Structure

```
app/
  layout.tsx     → polices (Fraunces + Inter), métadonnées SEO
  page.tsx       → hero, grille de véhicules, réservation rapide
  globals.css    → Tailwind + réglages globaux
next.config.mjs  → autorise les images depuis images.unsplash.com
tailwind.config.ts
```

## À personnaliser

- **Tarifs et modèles** : tableau `VEHICLES` en haut de `app/page.tsx`.
- **Images** : remplacez les URLs Unsplash par vos propres visuels
  (gardez `next.config.mjs` à jour avec le nom de domaine utilisé).
- **Formulaire de réservation** : la fonction `handleSubmit` dans
  `QuickBooking` ne fait qu'un `console.log` — branchez-la sur votre
  API, CRM ou service d'e-mail.
