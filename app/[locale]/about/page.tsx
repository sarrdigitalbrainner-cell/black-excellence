import { unstable_setRequestLocale } from "next-intl/server";
import AboutContent from "@/components/AboutContent";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <AboutContent />;
}
