"use client";

/**
 * Envia um evento first-party pro n8n (que grava na tabela site_events do
 * Supabase). Usa sendBeacon pra sobreviver a navegações; nunca lança —
 * tracking jamais quebra o funil.
 *
 * Vai direto pro n8n (e não pro /api/track) porque a Vercel ainda não tem as
 * env vars do Supabase; o /api/track fica como rota alternativa.
 */
import { getVbUid } from "@/lib/uid";

const TRACK_URL = "https://n8n.vocaboost.com.br/webhook/site-track";

export function track(event: string, meta?: Record<string, unknown>) {
  try {
    // Anexa o id anônimo do visitante em TODO evento, pra permitir contagem
    // de visitantes/aterrissagens ÚNICAS (não page_views crus).
    const m: Record<string, unknown> = { ...(meta || {}) };
    try {
      m.uid = getVbUid();
    } catch {
      /* segue sem uid */
    }
    const body = JSON.stringify({
      event,
      path: window.location.pathname,
      meta: m,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(TRACK_URL, body);
    } else {
      fetch(TRACK_URL, { method: "POST", body, keepalive: true }).catch(() => {});
    }
  } catch {
    // silencioso por design
  }
}
