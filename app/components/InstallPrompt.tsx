"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "be-install-dismissed";

function isIos() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isInStandaloneMode() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // @ts-expect-error — propriété spécifique à Safari iOS
    window.navigator.standalone === true
  );
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | null>(null);

  useEffect(() => {
    if (isInStandaloneMode()) return;
    if (window.localStorage.getItem(DISMISS_KEY)) return;

    // Android / Chrome / Edge : événement natif interceptable
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setPlatform("android");
      setShowBanner(true);
    }
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // iOS Safari : pas d'événement natif, on affiche des instructions
    // après un court délai pour ne pas gêner l'arrivée sur le site.
    let iosTimer: ReturnType<typeof setTimeout> | undefined;
    if (isIos()) {
      iosTimer = setTimeout(() => {
        setPlatform("ios");
        setShowBanner(true);
      }, 2500);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, []);

  function dismiss() {
    setShowBanner(false);
    window.localStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    dismiss();
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center gap-4 rounded-lg border border-gold/30 bg-neutral-950/95 p-4 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.35)] backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-6"
          role="dialog"
          aria-label="Installer l'application Black Excellence"
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gold/40">
            <Image
              src="/icon-192.png"
              alt="Black Excellence"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-50">
              Installer Black Excellence
            </p>
            {platform === "ios" ? (
              <p className="mt-1 text-xs leading-relaxed text-neutral-400">
                Appuyez sur{" "}
                <span className="text-gold-light">Partager</span> puis sur{" "}
                <span className="text-gold-light">
                  Sur l&apos;écran d&apos;accueil
                </span>
                .
              </p>
            ) : (
              <p className="mt-1 text-xs text-neutral-400">
                Accédez plus vite à votre chauffeur, comme une application.
              </p>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            {platform === "android" && (
              <button
                type="button"
                onClick={handleInstall}
                className="rounded-full bg-gold-soft px-4 py-1.5 text-xs font-medium text-neutral-950 transition-colors hover:bg-gold-light"
              >
                Installer
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
            >
              Plus tard
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
