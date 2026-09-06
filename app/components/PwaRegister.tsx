"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Échec silencieux : le site reste fonctionnel sans mode hors-ligne.
      });
    }
  }, []);

  return null;
}
