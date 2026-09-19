import { unstable_setRequestLocale } from "next-intl/server";
import ServicePage from "@/components/ServicePage";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <ServicePage id="airport" />;
}
