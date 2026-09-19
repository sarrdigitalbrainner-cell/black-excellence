import { unstable_setRequestLocale } from "next-intl/server";
import FleetContent from "@/components/FleetContent";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <FleetContent />;
}
