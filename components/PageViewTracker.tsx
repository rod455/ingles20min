"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

/** Registra um page_view first-party a cada mudança de rota. */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    // O landing inicial já foi contado pelo script "pv-early" (antes da
    // hidratação). Consome o marcador e não duplica; navegações client-side
    // seguintes (troca de rota) continuam sendo registradas normalmente.
    const w = window as unknown as { __vbPvSent?: string | null };
    if (w.__vbPvSent === pathname) {
      w.__vbPvSent = null;
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const meta: Record<string, unknown> = {};
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    if (source) meta.utm_source = source;
    if (campaign) meta.utm_campaign = campaign;
    const gclid = params.get("gclid");
    if (gclid) meta.gclid = gclid;
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
