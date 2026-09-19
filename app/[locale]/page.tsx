import { unstable_setRequestLocale } from "next-intl/server";
import HomeContent from "@/components/HomeContent";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  // Nécessaire pour que next-intl autorise le rendu statique.
  unstable_setRequestLocale(locale);
  return <HomeContent />;
}
