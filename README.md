# Black Excellence Transport — Site multilingue (PWA)

Site vitrine + réservation pour un chauffeur VTC indépendant en Suisse.
Next.js 14 (App Router) · Tailwind CSS · Framer Motion · next-intl (EN/FR/DE/IT) · PWA installable.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) (anglais, langue par
défaut) — ou [http://localhost:3000/fr](http://localhost:3000/fr),
`/de`, `/it` pour les autres langues.

## Langues (EN par défaut, FR / DE / IT)

- L'anglais est la langue par défaut et vit à la racine (`/`). Le
  français, l'allemand et l'italien sont préfixés (`/fr`, `/de`, `/it`).
- Tout le texte du site vient des fichiers `messages/en.json`,
  `fr.json`, `de.json`, `it.json` — un objet par section (nav, hero,
  flotte, véhicules, services, réservation, pied de page, PWA).
- Pour modifier un texte, éditez la clé correspondante dans **les 4
  fichiers** afin de garder les langues synchronisées.
- Le sélecteur de langue (`app/[locale]/components/LanguageSwitcher.tsx`)
  s'affiche dans le header et reste sur la même page en changeant
  seulement le préfixe de langue.
- Architecture technique : `middleware.ts` route les requêtes vers la
  bonne langue, `i18n/request.ts` charge le bon fichier JSON,
  `app/[locale]/layout.tsx` fournit les traductions à toute la page
  via `NextIntlClientProvider`.

## Flotte

Trois véhicules (`app/[locale]/page.tsx`, tableau `VEHICLE_STATIC`) :
Mercedes-Benz Classe E, Tesla Model Y, Mercedes-Benz Classe V. Les
tarifs et images sont définis dans ce tableau (non traduit — communs
à toutes les langues) ; les noms, descriptions et caractéristiques
viennent des fichiers de traduction (`vehicles.eclass`, `.teslaY`,
`.vclass`).

**Important sur les images** : aucune photo libre de droits ne
combine précisément "ce modèle de véhicule" + "décor suisse
identifiable (Alpes, Genève)" — c'est une combinaison trop spécifique
pour le stock gratuit. Les images utilisées sont les meilleures
approximations disponibles (route de col alpin, ambiance urbaine
européenne) ; une légende "Photo d'illustration" est affichée sous
chaque véhicule pour rester honnête envers le client final. Pour des
photos exactes des vrais véhicules en Suisse, il faut soit un
shooting réel, soit des visuels générés par IA (je peux rédiger les
prompts si besoin).

## Section "Services"

Nouvelle section (`app/[locale]/page.tsx`, composant `Services`) qui
illustre l'expérience client :
- Une vidéo en boucle (chauffeur ouvrant la portière) — actuellement
  hébergée sur Pexels (`videos.pexels.com`, libre de droits, licence
  Pexels). **Pour la production**, il est recommandé de télécharger
  cette vidéo et de l'auto-héberger dans `public/` (fichier plus
  petit, pas de dépendance à un service tiers) plutôt que de la
  charger depuis Pexels à chaque visite.
- Quatre cartes "flottantes" (légère animation de lévitation en
  boucle via Framer Motion) illustrant : aéroport & aviation privée,
  service champagne à bord, trajets alpins, Genève porte-à-porte.
  Textes dans `services.items` de chaque fichier de traduction,
  images dans `SERVICE_STATIC`.

## Réservation par e-mail

Le formulaire envoie les demandes par e-mail via
[Resend](https://resend.com) (gratuit jusqu'à 100 e-mails/jour).

1. Créez un compte sur resend.com et récupérez une clé API.
2. Copiez `.env.example` en `.env.local` et renseignez les 3 variables
   (`RESEND_API_KEY`, `RESERVATION_EMAIL_FROM`, `RESERVATION_EMAIL_TO`).
3. Sur Vercel : Project Settings → Environment Variables → ajoutez les
   3 mêmes variables avant de déployer.
4. Pour la production, vérifiez votre propre domaine dans Resend afin
   d'envoyer depuis une adresse comme `reservation@votredomaine.ch`
   plutôt que l'adresse de test `onboarding@resend.dev`.

Si l'envoi échoue (variables non configurées, panne du service…), le
formulaire affiche un message invitant le client à contacter le
chauffeur par WhatsApp ou par téléphone — ces coordonnées sont aussi
toujours visibles à côté du formulaire et via le bouton WhatsApp
flottant.

## Coordonnées de contact (téléphone / WhatsApp)

À modifier dans `app/[locale]/lib/contact.ts` :

```ts
export const PHONE_NUMBER_DISPLAY = "+41 79 000 00 00"; // affiché
export const PHONE_NUMBER_E164 = "41790000000";          // pour tel:
export const WHATSAPP_NUMBER = "41790000000";             // pour wa.me
```

## PWA — installation sur iPhone / Android

- Le site est une PWA complète : `public/manifest.json` + `public/sw.js`.
- Sur **Android/Chrome/Edge**, `InstallPrompt.tsx` intercepte
  l'événement natif `beforeinstallprompt` et affiche une bannière avec
  un bouton "Installer" qui déclenche le vrai pop-up d'installation.
- Sur **iOS (Safari)**, il n'existe pas d'événement équivalent : la
  bannière affiche des instructions ("Partager → Sur l'écran
  d'accueil") après quelques secondes sur le site.
- Icônes générées à partir du logo fourni par le client (trident doré
  sur fond noir granulé).

## Personnalisation de la marque

- Couleurs "or" dans `tailwind.config.ts` (`gold`, `gold-light`,
  `gold-soft`, `gold-deep`).
- Texture "noir granulé" via la classe `.grain-bg` dans
  `app/[locale]/globals.css`.
- Logo : `public/logo-square.png` / `logo-wide.png` — remplacez-les
  puis régénérez les icônes si le logo change.

## Déployer sur Vercel

1. Poussez ce dossier vers un dépôt Git, ou importez-le directement
   depuis l'interface Vercel.
2. Ajoutez les 3 variables d'environnement Resend (voir plus haut).
3. Vercel détecte Next.js automatiquement — aucune configuration
   supplémentaire n'est nécessaire.
