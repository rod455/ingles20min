import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlan, formatBRL } from "@/lib/plans";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout — Vocaboost",
  robots: { index: false },
};

const INCLUDED = [
  "Acesso ao grupo exclusivo no WhatsApp",
  "Uma lição por dia, de segunda a sexta",
  "Chat com IA pra tirar dúvidas quando quiser",
  "Vocabulário, áudios, gramática e conversação",
  "Cancele quando quiser",
];

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planParam } = await searchParams;
  const plan = getPlan(planParam);
  if (!plan) notFound();

  return (
    <main className="min-h-screen bg-navy-900">
      <div className="container-px flex min-h-screen flex-col items-center justify-center py-12">
        <Link href="/" className="mb-8 leading-none text-center">
          <span className="display block text-xl font-extrabold text-white">
            VOCA<span className="text-brand-500">BOOST</span>
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
            Rumo à fluência
          </span>
        </Link>

        <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Order summary */}
          <div className="card">
            <span className="eyebrow">Resumo do pedido</span>
            <h1 className="display mt-4 text-2xl font-extrabold">
              Plano {plan.name}
            </h1>
            <div className="mt-4 flex items-end gap-1">
              <span className="display text-4xl font-extrabold">
                {formatBRL(plan.price)}
              </span>
              <span className="mb-1 text-white/60">{plan.cadenceLabel}</span>
            </div>
            {plan.id === "yearly" && (
              <p className="mt-1 text-sm font-semibold text-accent-400">
                Equivale a {formatBRL(plan.monthlyEquivalent)}/mês · {plan.badge}
              </p>
            )}

            <hr className="my-6 border-white/10" />

            <ul className="space-y-3 text-sm text-white/80">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/#planos"
              className="mt-6 inline-block text-sm text-accent-400 hover:underline"
            >
              ← Trocar de plano
            </Link>
          </div>

          {/* Form */}
          <div className="card">
            <h2 className="display text-xl font-extrabold">Quase lá!</h2>
            <p className="mt-1 text-sm text-white/60">
              Preencha seus dados para concluir a assinatura.
            </p>
            <div className="mt-6">
              <CheckoutForm plan={plan} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
