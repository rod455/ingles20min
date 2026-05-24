import Link from "next/link";

export const metadata = {
  title: "Pagamento recebido — Vocaboost",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-50/60 px-5">
      <div className="w-full max-w-md rounded-3xl border border-brand-100 bg-white p-10 text-center shadow-sm">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-3xl">
          🎉
        </span>
        <h1 className="mt-6 text-2xl font-extrabold">
          Tudo certo com seu pagamento!
        </h1>
        <p className="mt-3 text-ink-800/70">
          Assim que a confirmação do Mercado Pago for processada, você receberá o
          convite para o grupo do WhatsApp no e-mail cadastrado. Fique de olho na
          sua caixa de entrada (e no spam)!
        </p>

        <div className="mt-8 rounded-2xl bg-brand-50 p-5 text-left text-sm text-ink-800/80">
          <p className="font-semibold text-ink-900">Próximos passos</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Confirme o pagamento (caso tenha usado boleto/Pix).</li>
            <li>Aguarde o e-mail com o link do grupo.</li>
            <li>Entre no grupo e receba sua primeira lição.</li>
          </ol>
        </div>

        <Link href="/" className="btn-primary mt-8 w-full">
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
