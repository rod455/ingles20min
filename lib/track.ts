"use client";

/**
 * Envia um evento first-party pro /api/track (Supabase). Usa sendBeacon pra
 * sobreviver a navegações; nunca lança — tracking jamais quebra o funil.
 */
export function track(event: string, meta?: Record<string, unknown>) {
  try {
    const body = JSON.stringify({
      event,
      path: window.location.pathname,
      meta: meta || {},
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", body);
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    // silencioso por design
  }
}
