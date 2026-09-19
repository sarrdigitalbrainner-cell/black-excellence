import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./i18n/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "en",
  // L'anglais reste à la racine ("/"), les autres langues sont
  // préfixées ("/fr", "/de", "/it").
  localePrefix,
});

export const config = {
  // Toutes les routes sauf l'API, les fichiers internes de Next et
  // les assets statiques (icônes PWA, manifest, service worker…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
