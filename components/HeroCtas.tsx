"use client";

import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import Exp from "@/components/Exp";
import { FREE_GROUP_URL, FREE_GROUP_ADS_CONVERSION } from "@/lib/links";

/**
 * CTAs do hero (Fase 1). O botão principal leva DIRETO ao grupo GRÁTIS do
 * WhatsApp em 1 clique (via /webhook/free-invite) — máxima conversão. O clique
 * dispara telemetria first-party + evento GA4 + conversão do Google Ads e
 * preserva gclid/utm na atribuição. O plano pago fica como link discreto.
 */
export default function HeroCtas() {
  return (
    <div className="mt-8 flex flex-col items-start gap-4">
      <TrackedLink
        href={FREE_GROUP_URL}
        event="click_free_group"
        sendTo={FREE_GROUP_ADS_CONVERSION}
        gaParams={{ cta_location: "hero" }}
        className="btn-accent w-full px-8 py-4 text-lg sm:w-auto"
      >
        <Exp slot="hero_cta_text">Entrar no grupo grátis</Exp>
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </TrackedLink>
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
