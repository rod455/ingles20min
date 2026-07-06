"use client";

import { useEffect } from "react";

/**
 * Dispara eventos no Google tag (gtag) ao clicar em qualquer elemento que tenha
 * o atributo data-gtag-event="nome_do_evento". Delegação global de clique.
 */
export default function GtagClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest("[data-gtag-event]") as HTMLElement | null;
      if (!el) return;
      const name = el.getAttribute("data-gtag-event");
      if (!name) return;
      const w = window as unknown as {
        gtag?: (...args: unknown[]) => void;
      };
      if (typeof w.gtag === "function") {
        // Sem send_to: o evento vai para todas as tags (GA4 + Ads)
        w.gtag("event", name);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
