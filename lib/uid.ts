"use client";

/**
 * Id anônimo e estável do visitante, guardado em localStorage.
 *
 * Usa a MESMA chave ("vb_uid") do motor de experimentos (lib/experiments.ts),
 * pra o visitante ser o mesmo em toda a telemetria. Permite contar visitantes
 * ÚNICOS (e aterrissagens únicas de anúncio) em vez de page_views crus —
 * corrige a super-contagem clique→LP.
 *
 * Nunca lança: se localStorage falhar (modo privado etc.), retorna "anon".
 */
export function getVbUid(): string {
  try {
    let u = localStorage.getItem("vb_uid");
    if (!u) {
      u =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()) + "-" + Math.floor(Math.random() * 1e9);
      localStorage.setItem("vb_uid", u);
    }
    return u;
  } catch {
    return "anon";
  }
}
