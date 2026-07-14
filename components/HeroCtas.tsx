"use client";

import Link from "next/link";
import { track } from "@/lib/track";

/**
 * CTAs do hero (Fase 1). O botão principal leva ao formulário do grupo
 * GRÁTIS (#gratis) — que captura o WhatsApp e mede o lead —, e o plano pago
 * fica como link discreto. Dispara telemetria first-party + gtag no clique.
 */
export default function HeroCtas() {
  function goToForm() {
    track("click_free_group", { cta_location: "hero" });
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("event", "click_free_group", { cta_location: "hero" });
    }
  }

  return (
    <div className="mt-8 flex flex-col items-start gap-4">
      <a
        href="#gratis"
        onClick={goToForm}
        className="btn-accent w-full px-8 py-4 text-lg sm:w-auto"
      >
        Entrar no grupo grátis
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <p className="text-sm text-white/60">
        Sem cartão · Sem compromisso · Turma nova toda semana
      </p>
      <Link
        href="#planos"
        data-gtag-event="hero_ver_planos"
        className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-accent-400 hover:underline"
      >
        Já quer o plano completo? Ver planos →
      </Link>
    </div>
  );
}
