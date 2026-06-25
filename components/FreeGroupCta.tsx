"use client";

import { useState } from "react";

const PERKS = [
  "4 dias de lições grátis pra testar o método",
  "Direto no WhatsApp, sem instalar nada",
  "+400 alunos já estão dentro estudando",
];

export default function FreeGroupCta() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/free-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, source: "lp" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Não foi possível registrar seu contato.");
      }
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "gerar_lead", { send_to: "AW-18261023654" });
      }
      if (data.groupUrl) {
        window.location.href = data.groupUrl;
        return;
      }
      // Sem link configurado ainda: confirma e avisa que o convite chega no WhatsApp.
      setDone(
        "Tudo certo! Em instantes você recebe o convite do grupo no seu WhatsApp.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="gratis" className="section">
      <div className="container-px">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-accent-400/30 bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-400/10" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Experimente de graça</span>
              <h2 className="display mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                Entre no grupo <span className="text-accent-400">grátis</span> e
                receba sua primeira lição hoje
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Sem cartão, sem compromisso. Você sente na prática como é evoluir
                com lições diárias — e decide depois se quer o acesso completo.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent-400 text-navy-950">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-white/80">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:p-8">
              {done ? (
                <div className="rounded-xl border border-accent-400/40 bg-accent-400/10 px-4 py-6 text-center text-accent-200">
                  <span className="mb-2 block text-3xl">🎉</span>
                  {done}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="free-name"
                      className="mb-1.5 block text-sm font-medium text-white"
                    >
                      Seu nome
                    </label>
                    <input
                      id="free-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Como podemos te chamar?"
                      className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="free-whatsapp"
                      className="mb-1.5 block text-sm font-medium text-white"
                    >
                      Seu WhatsApp (com DDD)
                    </label>
                    <input
                      id="free-whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-8888"
                      className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-300">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-70"
                  >
                    {loading ? "Entrando…" : "Quero minha 1ª lição hoje"}
                  </button>
                  <p className="text-center text-xs text-white/50">
                    Leva 10 segundos. Você pode sair quando quiser.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
