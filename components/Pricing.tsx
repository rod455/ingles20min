import { PLANS, formatBRL } from "@/lib/plans";

const HOTMART_MONTHLY =
  process.env.NEXT_PUBLIC_HOTMART_MONTHLY_URL ||
  "https://pay.hotmart.com/Q106329259L?off=wb3608d3";
const HOTMART_YEARLY =
  process.env.NEXT_PUBLIC_HOTMART_YEARLY_URL ||
  "https://pay.hotmart.com/Q106329259L?off=kxs1syiz";

const INCLUDED = [
  "Acesso ao grupo exclusivo no WhatsApp",
  "Uma lição por dia, de segunda a sexta",
  "Dúvidas respondidas por um professor",
  "Vocabulário, áudios, gramática e conversação",
  "Comunidade ativa para praticar",
  "Cancele quando quiser",
];

export default function Pricing() {
  const monthly = PLANS.monthly;
  const yearly = PLANS.yearly;

  return (
    <section id="planos" className="section bg-navy-950">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Planos</span>
          <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
            Escolha o plano e comece hoje
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Sem fidelidade, sem burocracia. Você entra no grupo assim que o
            pagamento é confirmado.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* Monthly */}
          <div className="card flex flex-col">
            <h3 className="display text-lg font-extrabold">{monthly.name}</h3>
            <p className="mt-1 text-sm text-white/60">
              Ideal para experimentar sem compromisso.
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="display text-4xl font-extrabold">
                {formatBRL(monthly.price)}
              </span>
              <span className="mb-1 text-white/60">/mês</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={HOTMART_MONTHLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 w-full"
            >
              Assinar mensal
            </a>
          </div>

          {/* Yearly (highlight) */}
          <div className="card relative flex flex-col border-2 border-brand-500 bg-navy-800 shadow-xl shadow-brand-500/10">
            <span className="absolute -top-3 left-8 rounded-full bg-accent-400 px-3 py-1 text-xs font-extrabold uppercase text-navy-950">
              {yearly.badge}
            </span>
            <h3 className="display text-lg font-extrabold">{yearly.name}</h3>
            <p className="mt-1 text-sm text-white/60">
              O melhor custo-benefício para criar o hábito.
            </p>
            <div className="mt-6 flex items-end gap-1">
              <span className="display text-4xl font-extrabold">
                {formatBRL(yearly.price)}
              </span>
              <span className="mb-1 text-white/60">/ano</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-accent-400">
              Equivale a {formatBRL(yearly.monthlyEquivalent)}/mês
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-white/80">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={HOTMART_YEARLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-8 w-full"
            >
              Assinar anual e economizar
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/50">
          Pagamento seguro via Hotmart · Pix, cartão e boleto
        </p>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent-400 text-navy-950">
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
