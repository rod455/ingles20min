"use client";

import { useEffect, useState } from "react";

export default function FreeGroupBanner() {
  // Contador de vagas da "turma de hoje" — começa em um valor fixo (seguro pro SSR)
  // e vai diminuindo enquanto a pessoa está na página, com um piso pra não zerar.
  const [spots, setSpots] = useState(17);

  useEffect(() => {
    // pequeno ajuste inicial pra não mostrar sempre o mesmo número
    setSpots((s) => Math.max(8, s - Math.floor(Math.random() * 6)));
    const tick = () => {
      setSpots((s) => (s > 6 ? s - 1 : s));
    };
    const id = setInterval(tick, 42000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-y border-accent-400/40 bg-gradient-to-r from-accent-400/15 via-brand-500/10 to-accent-400/15">
      <div className="container-px py-5 sm:py-6">
        <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-4">
            <span className="text-3xl sm:text-4xl">🎁</span>
            <div>
              <p className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="animate-pulse rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
                  Só hoje
                </span>
                <span className="display text-lg font-extrabold leading-tight text-white sm:text-xl">
                  Grupo grátis no WhatsApp — 4 dias de aulas
                </span>
              </p>
              <p className="mt-1.5 text-sm text-white/75">
                <span className="text-white/50 line-through">R$ 19,90</span>{" "}
                <span className="font-extrabold text-accent-400">GRÁTIS agora</span>
                <span className="mx-1.5 text-white/30">·</span>
                <span className="font-semibold text-white">
                  Restam{" "}
                  <span className="tabular-nums text-accent-400">{spots}</span>{" "}
                  vagas
                </span>{" "}
                pra turma de hoje
              </p>
            </div>
          </div>
          <a
            href="#gratis"
            data-gtag-event="banner_grupo_gratis"
            className="btn-primary whitespace-nowrap px-6 py-3 text-sm"
          >
            Garantir minha vaga grátis
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
