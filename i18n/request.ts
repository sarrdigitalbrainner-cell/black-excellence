import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "./navigation";

export default getRequestConfig(async (params) => {
  // next-intl >= 3.22 fournit `requestLocale` ; les versions
  // antérieures fournissent `locale`. On gère les deux.
  const { requestLocale, locale: legacyLocale } = params as {
    requestLocale?: Promise<string | undefined>;
    locale?: string;
  };

  const locale = (requestLocale ? await requestLocale : legacyLocale) ?? "en";

  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
