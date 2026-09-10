import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "de", "it"],
  defaultLocale: "en",
  // "en" reste à la racine ("/"), les autres langues sont préfixées
  // ("/fr", "/de", "/it") — pas de redirection surprise pour le client
  // qui arrive sur le domaine principal.
  localePrefix: "as-needed",
  // Désactivé : sans ça, la détection automatique de la langue du
  // navigateur redirige "/" vers "/fr" (ou "/de", "/it") pour un
  // visiteur dont le navigateur est configuré dans cette langue,
  // même s'il a explicitement choisi l'anglais via le sélecteur.
  localeDetection: false,
});

export const config = {
  // Applique le middleware à toutes les routes sauf les fichiers
  // statiques (tout chemin contenant une extension, ex. .png, .jpg,
  // .mp4, .json...), les routes API et les internes Next.js.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
