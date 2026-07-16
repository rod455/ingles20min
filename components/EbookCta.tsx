"use client";

import { useState } from "react";
import { track } from "@/lib/track";

/**
 * Formulário da isca digital (ebook grátis). Captura nome + WhatsApp,
 * registra o lead (source: "ebook") e, na resposta, entrega o link de
 * download do PDF (só revelado APÓS a captura) + convida pro grupo grátis.
 * Reaproveita o mesmo endpoint /api/free-signup do funil free.
 */
export default function EbookCta({
  id = "baixar",
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [ebookHref, setEbookHref] = useState<string | null>(null);
  const [groupHref, setGroupHref] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/free-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, source: "ebook" }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Não foi possível registrar seu contato.");
      }

      // Telemetria first-party (independe de gtag/adblock).
      track("ebook_lead", { cta_location: "form_ebook" });
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      const fbq = (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq;
      if (typeof fbq === "function") fbq("track", "Lead");
      if (typeof w.gtag === "function") {
        w.gtag("event", "gerar_lead", { method: "ebook" });
        w.gtag("event", "ebook_lead", { cta_location: "form_ebook" });
      }

      setEbookHref(data.ebookUrl || "/downloads/ebook-metodo-poliglotas-vocaboost.pdf");
      setGroupHref(data.groupUrl || null);
      setDone(true);
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div
        id={id}
        className="rounded-2xl border border-accent-400/40 bg-accent-400/10 p-6 text-center sm:p-8"
      >
        <span className="mb-2 block text-4xl">📘</span>
        <p className="display text-xl font-extrabold text-white">
          Prontinho! Seu ebook está liberado
        </p>
        <p className="mt-2 text-sm text-white/70">
          Baixe agora e já entre no grupo grátis pra colocar o método em prática
          com uma lição por dia.
        </p>
        {ebookHref && (
          <a
            href={ebookHref}
            target="_blank"
            rel="noopener noreferrer"
            download
            data-gtag-event="ebook_download"
            className="btn-primary mt-6 inline-block w-full px-5 py-3 text-base"
          >
            📥 Baixar o ebook (PDF)
          </a>
        )}
        {groupHref && (
          <a
            href={groupHref}
            target="_blank"
            rel="noopener noreferrer"
            data-gtag-event="ebook_to_group"
            className="btn-secondary mt-3 inline-block w-full px-5 py-3 text-base"
          >
            Entrar no grupo grátis do WhatsApp
          </a>
        )}
        <p className="mt-4 text-xs text-white/50">
          O link também some se você recarregar — salve o PDF no seu aparelho.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={
        compact
          ? "space-y-4"
          : "space-y-5 rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:p-8"
      }
    >
      <div>
        <label
          htmlFor="ebook-name"
          className="mb-1.5 block text-sm font-medium text-white"
        >
          Seu nome
        </label>
        <input
          id="ebook-name"
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
          htmlFor="ebook-whatsapp"
          className="mb-1.5 block text-sm font-medium text-white"
        >
          Seu WhatsApp (com DDD)
        </label>
        <input
          id="ebook-whatsapp"
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
        {loading ? "Liberando…" : "Quero o ebook grátis"}
      </button>
      <p className="text-center text-xs text-white/50">
        100% grátis · leva 10 segundos · sem spam
      </p>
    </form>
  );
}
