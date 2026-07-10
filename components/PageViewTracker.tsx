"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

/** Registra um page_view first-party a cada mudança de rota. */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const params = new URLSearchParams(window.location.search);
    const meta: Record<string, unknown> = {};
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    if (source) meta.utm_source = source;
    if (campaign) meta.utm_campaign = campaign;
    if (params.get("gclid")) meta.gclid = true;
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.host !== window.location.host) meta.referrer = ref.host;
      } catch {}
    }
    track("page_view", meta);
  }, [pathname]);

  return null;
}
