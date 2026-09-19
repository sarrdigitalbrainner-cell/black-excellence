"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SERVICES } from "@/lib/data";
import LanguageSwitcher from "./LanguageSwitcher";

const SERVICE_LINKS = [
  { id: "airport", href: SERVICES.airport.slug },
  { id: "ski", href: SERVICES.ski.slug },
  { id: "business", href: SERVICES.business.slug },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services.items");
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Le header se densifie au scroll (fond plus opaque + filet doré).
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On referme le menu mobile à chaque changement de page.
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // On bloque le scroll du corps quand le tiroir mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const mainLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/fleet", label: t("fleet") },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/20 bg-neutral-950/90 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-neutral-950/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full border border-gold/40 transition-shadow duration-500 group-hover:glow-gold">
              <Image
                src="/icon-192.png"
                alt="Black Elite Transfers"
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="font-display block text-[15px] tracking-[0.18em] text-neutral-50">
                BLACK ELITE
              </span>
              <span className="block text-[10px] tracking-[0.42em] text-gradient-gold">
                TRANSFERS
              </span>
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden items-center gap-9 text-[13px] tracking-wide text-neutral-300 lg:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={isActive(link.href)}
                className="nav-link transition-colors hover:text-gold-light data-[active=true]:text-gold-light"
              >
                {link.label}
              </Link>
            ))}

            {/* Menu déroulant Services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                data-active={pathname.startsWith("/services")}
                className="nav-link flex items-center gap-1.5 transition-colors hover:text-gold-light data-[active=true]:text-gold-light"
              >
                {t("services")}
                <Chevron open={servicesOpen} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 w-[420px] -translate-x-1/2 pt-5"
                  >
                    <div className="overflow-hidden rounded-xl border border-gold/25 bg-neutral-950/95 p-2 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.45)] backdrop-blur-xl">
                      {SERVICE_LINKS.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          className="group/item flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gold/10"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold transition-shadow group-hover/item:shadow-[0_0_10px_2px_rgba(212,175,55,0.8)]" />
                          <span>
                            <span className="block text-sm text-neutral-100 transition-colors group-hover/item:text-gold-light">
                              {tServices(`${service.id}.title`)}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-neutral-500">
                              {tServices(`${service.id}.teaser`)}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              data-active={isActive("/contact")}
              className="nav-link transition-colors hover:text-gold-light data-[active=true]:text-gold-light"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/contact"
              className="hidden rounded-full border border-gold/60 bg-gradient-to-r from-gold/10 to-transparent px-5 py-2 text-[13px] text-gold-light transition-all duration-300 hover:glow-gold hover:border-gold md:inline-block"
            >
              {t("book")}
            </Link>

            {/* Bouton burger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 transition-colors hover:border-gold/50 lg:hidden"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                className="block h-px w-4 bg-gold-light"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-4 bg-gold-light"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block h-px w-4 bg-gold-light"
              />
            </button>
          </div>
        </div>

        {/* Filet doré sous le header au scroll */}
        <motion.div
          className="hairline-gold"
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </header>

      {/* Tiroir mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-neutral-950/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex h-full flex-col gap-1 overflow-y-auto px-7 pb-12 pt-28">
              {mainLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-white/5 py-4 font-display text-2xl text-neutral-100 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Accordéon Services */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18, duration: 0.4 }}
                className="border-b border-white/5"
              >
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  aria-expanded={mobileServicesOpen}
                  className="flex w-full items-center justify-between py-4 font-display text-2xl text-neutral-100 transition-colors hover:text-gold-light"
                >
                  {t("services")}
                  <Chevron open={mobileServicesOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-4 pl-4">
                        {SERVICE_LINKS.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            className="flex items-center gap-3 py-2.5 text-base text-neutral-400 transition-colors hover:text-gold-light"
                          >
                            <span className="h-1 w-1 rounded-full bg-gold" />
                            {tServices(`${service.id}.title`)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="block border-b border-white/5 py-4 font-display text-2xl text-neutral-100 transition-colors hover:text-gold-light"
                >
                  {t("contact")}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="mt-8 flex flex-col gap-5"
              >
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-gold-deep via-gold-soft to-gold-deep py-3.5 text-center text-sm font-medium text-neutral-950"
                >
                  {t("book")}
                </Link>
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
