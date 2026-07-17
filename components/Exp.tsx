"use client";

import { useSyncExternalStore } from "react";
import { subscribe, getSlotValue } from "@/lib/experiments";

/**
 * Renderiza o texto de um "slot" de experimento A/B. No servidor e na primeira
 * renderização do client mostra o texto padrão (children) — sem mismatch de
 * hidratação. Depois que os experimentos carregam, troca para a variação
 * atribuída ao visitante. Se não houver experimento ativo, fica o padrão.
 *
 * Uso: <Exp slot="hero_cta_text">Entrar no grupo grátis</Exp>
 */
export default function Exp({
  slot,
  children,
}: {
  slot: string;
  children: string;
}) {
  const value = useSyncExternalStore(
    subscribe,
    () => getSlotValue(slot, children),
    () => children,
  );
  return <>{value}</>;
}
