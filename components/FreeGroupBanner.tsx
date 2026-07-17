"use client";

import TrackedLink from "@/components/TrackedLink";
import { FREE_GROUP_URL, FREE_GROUP_ADS_CONVERSION } from "@/lib/links";

/**
 * Banner fixo do topo. Leva a pessoa DIRETO pro grupo do WhatsApp em 1 clique
 * (via /webhook/free-invite, nova aba) — máxima conversão. O clique dispara
 * telemetria first-party + evento GA4 + conversão do Google Ads e preserva
 * gclid/utm na atribuição.
 */
export default function FreeGroupBanner() {
  return (
    <section className="sticky top-16 z-30 border-y border-accent-400/40 bg-navy-900 bg-gradient-to-r from-accent-400/15 via-brand-500/10 to-accent-400/15 shadow-lg shadow-navy-950/40">
      <div className="container-px py-3 sm:py-4">
        <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl">🎁</span>
            <div>
              <p className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                  100% grátis
                </span>
                <span className="display text-lg font-extrabold leading-tight text-white sm:text-xl">
                  Grupo grátis no WhatsApp — 4 aulas com o método dos poliglotas
                </span>
              </p>
              <p className="mt-1.5 text-sm text-white/75">
                Sem cartão e sem compromisso
                <span className="mx-1.5 text-white/30">·</span>
                <span className="font-semibold text-white">
                  Turma nova toda semana, vagas limitadas
                </span>
              </p>
            </div>
          </div>
          <TrackedLink
            href={FREE_GROUP_URL}
            event="click_free_group"
            sendTo={FREE_GROUP_ADS_CONVERSION}
            gaParams={{ cta_location: "banner_topo" }}
            className="btn-primary whitespace-nowrap px-6 py-3 text-sm"
          >
            Entrar no grupo grátis
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
