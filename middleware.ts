import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "fr", "de", "it"],
  defaultLocale: "en",
  // "en" reste à la racine ("/"), les autres langues sont préfixées
  // ("/fr", "/de", "/it") — pas de redirection surprise pour le client
  // qui arrive sur le domaine principal.
  localePrefix: "as-needed",
});

export const config = {
  // Applique le middleware à toutes les routes sauf les fichiers
  // statiques, les assets PWA et les routes API.
  matcher: [
    "/((?!api|_next|_vercel|manifest.json|sw.js|icon-|apple-touch-icon|favicon|logo-).*)",
  ],
};
