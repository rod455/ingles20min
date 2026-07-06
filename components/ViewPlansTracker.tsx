"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __viewPlansFired?: boolean;
  }
}

/**
 * Dispara o evento GA4 `view_plans` quando a seção #planos entra na viewport.
 * No máximo 1 vez por carregamento de página (flag global protege contra
 * re-mounts/StrictMode).
 */
export default function ViewPlansTracker() {
  useEffect(() => {
    const target = document.getElementById("planos");
    if (!target || window.__viewPlansFired) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || window.__viewPlansFired) continue;
          window.__viewPlansFired = true;
          const w = window as unknown as {
            gtag?: (...args: unknown[]) => void;
          };
          if (typeof w.gtag === "function") {
            w.gtag("event", "view_plans", { cta_location: "planos" });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return null;
}
