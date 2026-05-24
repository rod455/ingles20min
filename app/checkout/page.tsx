import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlan, formatBRL } from "@/lib/plans";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout — Vocaboost",
  robots: { index: false },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planParam } = await searchParams;
  const plan = getPlan(planParam);
  if (!plan) notFound();

  return (
    <main className="min-h-screen bg-brand-50/60">
      <div className="container-px flex min-h-screen flex-col items-center justify-center py-12">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 font-extrabold text-ink-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">
            V
          </span>
          Voca<span className="-ml-2 text-brand-600">boost</span>
        </Link>

        <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Order summary */}
          <div className="rounded-3xl border border-brand-100 bg-white p-8">
            <span className="eyebrow">Resumo do pedido</span>
            <h1 className="mt-4 text-2xl font-extrabold">
              Plano {plan.name}
            </h1>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-4xl font-extrabold">
                {formatBRL(plan.price)}
              </span>
              <span className="mb-1 text-ink-800/60">
                {plan.cadenceLabel}
              </span>
            </div>
            {plan.id === "yearly" && (
              <p className="mt-1 text-sm font-medium text-brand-700">
                Equivale a {formatBRL(plan.monthlyEquivalent)}/mês ·{" "}
                {plan.badge}
              </p>
            )}

            <hr className="my-6 border-brand-100" />

            <ul className="space-y-3 text-sm text-ink-800/80">
              {[
                "Acesso ao grupo exclusivo no WhatsApp",
                "Lições diárias de inglês",
                "Áudios, vocabulário e expressões",
                "Comunidade para praticar",
                "Cancele quando quiser",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-brand-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/#planos"
              className="mt-6 inline-block text-sm text-brand-600 hover:underline"
            >
              ← Trocar de plano
            </Link>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-brand-100 bg-white p-8">
            <h2 className="text-xl font-bold">Quase lá!</h2>
            <p className="mt-1 text-sm text-ink-800/60">
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
