# Black Elite Transfers — Site multilingue (PWA)

Site vitrine multi-pages pour un service de chauffeur privé basé à Genève.
Next.js 14 (App Router) · Tailwind CSS · Framer Motion · next-intl (EN/FR/DE/IT) · PWA installable.

## Démarrer

```bash
npm install
npm run dev
```

Anglais à la racine : http://localhost:3000
Autres langues : `/fr`, `/de`, `/it`

## Architecture serveur / client (important)

next-intl impose que la langue soit déclarée dans un **composant
serveur** pour autoriser le rendu statique. Chaque route est donc
séparée en deux :

- `app/[locale]/<route>/page.tsx` — composant **serveur**, appelle
  `unstable_setRequestLocale(locale)` puis rend le composant de contenu.
- `components/<X>Content.tsx` — composant **client** (`"use client"`),
  qui contient toute l'interface et les animations.

Si vous ajoutez une page, respectez ce découpage : sans l'appel à
`unstable_setRequestLocale`, le build échoue avec
« Usage of next-intl APIs in Server Components currently opts into
dynamic rendering ».

## Pages

| Route | Contenu |
|---|---|
| `/` | Hero, présentation, aperçu des services, flotte, zones desservies, atouts, CTA |
| `/about` | Histoire de la société, valeurs, zones desservies |
| `/fleet` | Les 3 véhicules en détail + standards d'entretien |
| `/services/airport-transfers` | Transferts aéroport |
| `/services/ski-resort-transfers` | Transferts stations de ski |
| `/services/business-travel` | Déplacements d'affaires |
| `/contact` | Formulaire de devis complet + contact direct |

Les trois pages de services partagent le même gabarit
(`components/ServicePage.tsx`) : hero, description longue, « ce qui est
inclus », trajets populaires, FAQ en accordéon, formulaire de devis.
Pour en ajouter une quatrième, il suffit d'ajouter une entrée dans
`SERVICE_IDS` / `SERVICES` (`lib/data.ts`), le bloc de texte dans les
4 fichiers de traduction, et un fichier `page.tsx` de 3 lignes.

## Navigation

`components/Header.tsx` :
- menu déroulant **Services** au survol sur desktop, avec description
  de chaque service et puce qui s'illumine au survol ;
- tiroir plein écran sur mobile, avec accordéon pour les services et
  entrées qui glissent en cascade ;
- le header se densifie au scroll (fond opaque + filet doré animé) ;
- sélecteur de langue en menu déroulant (EN/FR/DE/IT).

## Effets visuels (dégradés / néon)

Définis dans `app/globals.css`, réutilisables partout :

| Classe | Effet |
|---|---|
| `.grain-bg` | Texture noir granulé (rappel du fond du logo) |
| `.text-gradient-gold` | Texte en dégradé doré avec reflet qui balaie en boucle |
| `.neon-border` | Bordure en dégradé doré révélée au survol |
| `.glow-gold` / `.glow-gold-strong` | Halo lumineux doré |
| `.hairline-gold` | Filet lumineux horizontal (séparateurs) |
| `.nav-link` | Soulignement doré qui se déploie au survol |

S'y ajoutent : inclinaison 3D des cartes véhicule au curseur, parallax
des images au scroll, halos colorés qui changent selon le pays
sélectionné, anneau pulsant sur le bouton WhatsApp, reveal de texte
masqué sur tous les titres.

## Zones desservies

`components/ServiceAreas.tsx` — présentation volontairement différente
de la référence : au lieu de quatre cartes plates alignées, un
sélecteur de pays horizontal qui révèle les villes une par une, avec un
halo lumineux aux couleurs du drapeau actif. Les villes se modifient
dans `SERVICE_AREAS` (`lib/data.ts`), les noms de pays dans
`areas.countries` des fichiers de traduction.

## Flotte

Mercedes-Benz Classe E · Tesla Model Y (2025) · Mercedes-Benz Classe V.
Tarifs et images dans `VEHICLES` (`lib/data.ts`), textes dans
`vehicles.*` des fichiers de traduction.

**À vérifier avant mise en ligne** : la photo utilisée pour la Tesla
provient d'Unsplash et correspond au millésime 2025 (« Juniper »), mais
aucune banque d'images gratuite ne propose les vrais véhicules du
client dans un décor suisse identifiable. Une mention « Photo
d'illustration » s'affiche donc sur chaque carte. Dès que le client
fournit ses propres photos, remplacez les URLs dans `lib/data.ts` et
supprimez la mention (clé `fleet.imageNote`).

## Langues

- Fichiers : `messages/en.json`, `fr.json`, `de.json`, `it.json`.
- Les 4 fichiers ont exactement la même structure de clés — si vous
  ajoutez une clé, ajoutez-la dans les 4.
- `middleware.ts` route les requêtes, `i18n/request.ts` charge le bon
  fichier, `i18n/navigation.ts` fournit un `<Link>` conscient de la langue.

## Réservation par e-mail

Le formulaire (`components/QuoteForm.tsx`) poste vers
`app/api/reservation/route.ts`, qui envoie un e-mail récapitulatif via
[Resend](https://resend.com).

1. Créez un compte Resend, récupérez une clé API.
2. Copiez `.env.example` en `.env.local` et remplissez les 3 variables.
3. Sur Vercel : Settings → Environment Variables → ajoutez les mêmes.
4. En production, vérifiez votre domaine dans Resend pour envoyer
   depuis `reservation@votredomaine.ch`.

L'adresse e-mail du client est passée en `reply_to` : le chauffeur peut
répondre directement depuis sa boîte mail. Si l'envoi échoue, le
formulaire bascule sur WhatsApp et téléphone.

## Coordonnées à renseigner

`lib/contact.ts` — un seul endroit à modifier :

```ts
export const PHONE_NUMBER_DISPLAY = "+41 79 000 00 00"; // affiché
export const PHONE_NUMBER_E164 = "41790000000";          // pour tel:
export const WHATSAPP_NUMBER = "41790000000";             // pour wa.me
```

## PWA

`public/manifest.json` + `public/sw.js` + `components/InstallPrompt.tsx`.
Pop-up d'installation natif sur Android/Chrome ; sur iOS Safari (qui ne
supporte pas `beforeinstallprompt`), bannière avec instructions
« Partager → Sur l'écran d'accueil ». Icônes générées depuis le logo
Black Elite Transfers.

## Note sur la vidéo

La vidéo de la page d'accueil est chargée depuis Pexels (libre de
droits). Pour la production, téléchargez-la et placez-la dans `public/`
plutôt que de dépendre d'un service tiers à chaque visite.
