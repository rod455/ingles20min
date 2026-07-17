"use client";

import { track } from "@/lib/track";

/**
 * Motor de experimentos A/B do site (client-side, à prova de falhas).
 *
 * - Busca os experimentos ATIVOS no n8n (/webhook/experiments), que lê a
 *   tabela `experiments` do Supabase.
 * - Atribui uma variação estável por visitante (hash do vb_uid + slot).
 * - Loga exposição e conversão via a telemetria existente (/webhook/site-track),
 *   como eventos `exp_exposure` / `exp_conversion` na tabela site_events.
 * - Se qualquer coisa falhar (endpoint fora, sem experimento), o site
 *   simplesmente mostra o texto padrão. Tracking NUNCA quebra o funil.
 *
 * Governança: o site apenas RODA o que o Diretor deixou ativo. Quem decide
 * implementar o vencedor / descartar / criar novos experimentos é o Diretor
 * (workflow n8n), a partir dos resultados que o CRO reporta.
 */

const CONFIG_URL = "https://n8n.vocaboost.com.br/webhook/experiments";

export type Variant = { id: string; label?: string; value: string };
export type Experiment = {
  id: number;
  slot: string;
  status: string;
  winner: string | null;
  variants: Variant[];
};
type Assignment = { expId: number; variant: Variant; status: string };

type State = {
  loaded: boolean;
  experiments: Experiment[];
  assignments: Record<string, Assignment>;
  uid: string;
  listeners: Set<() => void>;
};

const state: State = {
  loaded: false,
  experiments: [],
  assignments: {},
  uid: "",
  listeners: new Set(),
};

function getUid(): string {
  try {
    let u = localStorage.getItem("vb_uid");
    if (!u) {
      const c = (typeof crypto !== "undefined" && crypto.randomUUID)
        ? crypto.randomUUID()
        : String(Date.now()) + "-" + Math.floor(Math.random() * 1e9);
      u = c;
      localStorage.setItem("vb_uid", u);
    }
    return u;
  } catch {
    return "anon";
  }
}

/** Hash determinístico (FNV-1a) → número em [0,1). */
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

function pickVariant(exp: Experiment, uid: string): Variant | null {
  const vs = Array.isArray(exp.variants) ? exp.variants : [];
  if (!vs.length) return null;
  // Vencedor já implementado: serve a variação vencedora pra todo mundo.
  if (exp.status === "implemented") {
    return vs.find((v) => v.id === exp.winner) || vs[0];
  }
  // Rodando: divisão estável por visitante.
  const idx = Math.floor(hash01(uid + "|" + exp.slot) * vs.length) % vs.length;
  return vs[idx];
}

let initPromise: Promise<void> | null = null;

export function initExperiments(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const uid = getUid();
    state.uid = uid;
    try {
      const res = await fetch(CONFIG_URL, { method: "GET" });
      const data = await res.json();
      const exps: Experiment[] = Array.isArray(data?.experiments)
        ? data.experiments
        : [];
      state.experiments = exps;
      for (const exp of exps) {
        const v = pickVariant(exp, uid);
        if (v) state.assignments[exp.slot] = { expId: exp.id, variant: v, status: exp.status };
      }
    } catch {
      // fail-safe: sem experimentos, o site usa os textos padrão
    }
    state.loaded = true;
    // Loga exposição uma vez por sessão, só pros experimentos em teste.
    try {
      for (const slot of Object.keys(state.assignments)) {
        const a = state.assignments[slot];
        if (a.status !== "running") continue;
        const key = "vb_exp_exp_" + a.expId;
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
          track("exp_exposure", {
            exp: a.expId,
            slot,
            variant: a.variant.id,
            uid,
          });
        }
      }
    } catch {
      // silencioso
    }
    state.listeners.forEach((fn) => fn());
  })();
  return initPromise;
}

/** Valor do slot pra este visitante (ou o fallback do código). */
export function getSlotValue(slot: string, fallback: string): string {
  const a = state.assignments[slot];
  return a ? a.variant.value : fallback;
}

export function subscribe(fn: () => void): () => void {
  state.listeners.add(fn);
  return () => {
    state.listeners.delete(fn);
  };
}

/**
 * Marca uma conversão do visitante para TODOS os experimentos em teste em que
 * ele está — 1 vez por sessão por experimento+objetivo (o resto é dedup por
 * visitante na análise). Chamado pelos CTAs de conversão.
 */
export function markExperimentConversion(goal?: string) {
  try {
    const uid = state.uid || getUid();
    const g = String(goal || "conv").slice(0, 40);
    for (const slot of Object.keys(state.assignments)) {
      const a = state.assignments[slot];
      if (a.status !== "running") continue;
      const key = "vb_expc_" + a.expId + "_" + g;
      if (sessionStorage.getItem(key)) continue;
      sessionStorage.setItem(key, "1");
      track("exp_conversion", {
        exp: a.expId,
        slot,
        variant: a.variant.id,
        goal: g,
        uid,
      });
    }
  } catch {
    // silencioso
  }
}
