"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/contact";

export default function WhatsAppFab() {
  const t = useTranslations("booking");

  return (
    <motion.a
      href={whatsappHref(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-neutral-950 shadow-[0_10px_34px_-8px_rgba(37,211,102,0.75)]"
    >
      {/* Anneau pulsant */}
      <motion.span
        className="absolute inset-0 rounded-full border border-[#25D366]"
        animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.17h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.85 14.02c-.25.7-1.45 1.34-2 1.42-.53.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.25.6.85 2.08.92 2.23.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.45.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.29.4-.24.66-.14.27.1 1.72.81 2.02.96.29.15.49.22.56.34.07.13.07.75-.18 1.45Z" />
      </svg>
    </motion.a>
  );
}
