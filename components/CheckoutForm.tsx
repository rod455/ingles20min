"use client";

import { useState } from "react";
import { Plan, formatBRL } from "@/lib/plans";

export default function CheckoutForm({ plan }: { plan: Plan }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id, name, email, whatsapp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Não foi possível iniciar o pagamento.");
      }
      window.location.href = data.initPoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white">
          Nome completo
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como podemos te chamar?"
          className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
          Seu melhor e-mail
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
        />
        <p className="mt-1.5 text-xs text-white/50">
          Usaremos para confirmar sua assinatura e enviar o acesso ao grupo.
        </p>
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-white">
          Seu WhatsApp (com DDD)
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="(11) 99999-8888"
          className="w-full rounded-xl border border-white/15 bg-navy-900 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-accent-400 focus:ring-4 focus:ring-accent-400/20"
        />
        <p className="mt-1.5 text-xs text-white/50">
          É com esse número que você entra no grupo Premium. Só liberamos o acesso
          a quem assinou.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-brand-500/40 bg-brand-500/10 px-4 py-3 text-sm text-brand-300">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-70">
        {loading ? "Redirecionando…" : `Pagar ${formatBRL(plan.price)}`}
      </button>

      <p className="text-center text-xs text-white/50">
        🔒 Pagamento processado com segurança pelo Mercado Pago. Você será
        redirecionado para concluir.
      </p>
    </form>
  );
}
