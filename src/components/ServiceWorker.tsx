"use client";

import { useEffect } from "react";

/** Registers the PWA service worker for offline support. */
export function ServiceWorker() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }
    const register = () =>
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* offline support is best-effort */
      });
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);
  return null;
}
