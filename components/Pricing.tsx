import Link from "next/link";
import { PLANS, formatBRL } from "@/lib/plans";

const INCLUDED = [
  "Acesso ao grupo exclusivo no WhatsApp",
  "Lições diárias (vocabulário, áudio e expressões)",
  "Desafios semanais e correções",
  "Comunidade ativa para praticar",
  "Cancele quando quiser",
];

export default function Pricing() {
  const monthly = PLANS.monthly;
  const yearly = PLANS.yearly;

  return (
    <section id="planos" className="section bg-brand-50/60">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Planos</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Escolha o plano e comece hoje
          </h2>
          <p className="mt-4 text-lg text-ink-800/70">
            Sem fidelidade, sem burocracia. Você entra no grupo assim que o
            pagamento é confirmado.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* Monthly */}
          <div className="flex flex-col rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-bold text-ink-900">{monthly.name}</h3>
            <p className="mt-1 text-sm text-ink-800/60">
              Ideal para experimentar sem compromisso.
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold">
                {formatBRL(monthly.price)}
              </span>
              <span className="mb-1 text-ink-800/60">/mês</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/checkout?plan=monthly"
              className="btn-secondary mt-8 w-full"
            >
              Assinar mensal
            </Link>
          </div>

          {/* Yearly (highlight) */}
          <div className="relative flex flex-col rounded-3xl border-2 border-brand-500 bg-white p-8 shadow-xl shadow-brand-500/10">
            <span className="absolute -top-3 left-8 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white">
              {yearly.badge}
            </span>
            <h3 className="text-lg font-bold text-ink-900">{yearly.name}</h3>
            <p className="mt-1 text-sm text-ink-800/60">
              O melhor custo-benefício para criar o hábito.
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold">
                {formatBRL(yearly.price)}
              </span>
              <span className="mb-1 text-ink-800/60">/ano</span>
            </div>
            <p className="mt-1 text-sm font-medium text-brand-700">
              Equivale a {formatBRL(yearly.monthlyEquivalent)}/mês
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/checkout?plan=yearly" className="btn-primary mt-8 w-full">
              Assinar anual e economizar
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-ink-800/50">
          Pagamento seguro via Mercado Pago · Pix, cartão e boleto
        </p>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}
