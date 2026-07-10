"use client";

import { useEffect, useState, type ReactNode } from "react";
import { track } from "@/lib/track";

/**
 * Link externo (abre em nova aba) com tracking:
 * - `event`: evento genérico (vai para todas as tags — GA4 + Ads);
 * - `sendTo`: conversão nativa do Google Ads (com label) — inalterada;
 * - `gaName`/`gaParams`: evento GA4 de funil (ex.: begin_checkout);
 * - Atribuição: repassa gclid/utm_* (e afins) da URL atual para o destino,
 *   preservando a query string existente do destino.
 * Como abre em nova aba, a página atual permanece e os beacons têm tempo
 * de ser enviados — sem corrida com a navegação.
 */

const ATTRIBUTION_PARAMS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
  "msclkid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

function withAttribution(href: string): string {
  try {
    const current = new URLSearchParams(window.location.search);
    const url = new URL(href, window.location.origin);
    let changed = false;
    for (const key of ATTRIBUTION_PARAMS) {
      const value = current.get(key);
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
        changed = true;
      }
    }
    return changed ? url.toString() : href;
  } catch {
    return href;
  }
}

export default function TrackedLink({
  href,
  sendTo,
  event,
  gaName,
  gaParams,
  className,
  children,
}: {
  href: string;
  sendTo?: string;
  event?: string;
  gaName?: string;
  gaParams?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
}) {
  // Calculado no client após o mount (SSR-safe) para capturar gclid/utm da URL.
  const [finalHref, setFinalHref] = useState(href);

  useEffect(() => {
    setFinalHref(withAttribution(href));
  }, [href]);

  function handleClick() {
    // Telemetria first-party (Supabase) — independe do gtag/adblock.
    track(gaName || event || "outbound_click", {
      ...(gaParams?.cta_location ? { cta_location: gaParams.cta_location } : {}),
      ...(gaParams?.value ? { value: gaParams.value } : {}),
      link_url: finalHref.split("?")[0],
    });
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    if (event) {
      // Sem send_to: o evento vai para todas as tags (GA4 + Ads)
      w.gtag("event", event);
    }
    if (gaName) {
      w.gtag("event", gaName, { ...(gaParams || {}), link_url: finalHref });
    }
    if (sendTo) {
      w.gtag("event", "conversion", {
        send_to: sendTo,
        value: 1.0,
        currency: "BRL",
      });
    }
  }

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
