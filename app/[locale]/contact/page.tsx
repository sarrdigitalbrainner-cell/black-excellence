import { unstable_setRequestLocale } from "next-intl/server";
import ContactContent from "@/components/ContactContent";

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <ContactContent />;
}
