import Link from "next/link";

export const metadata = {
  title: "Pagamento recebido — Vocaboost",
  robots: { index: false },
};

export default function SuccessPage() {
  const premiumGroupUrl = process.env.NEXT_PUBLIC_PREMIUM_GROUP_URL;

  return (
    <main className="grid min-h-screen place-items-center bg-navy-900 px-5">
      <div className="card w-full max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-400/15 text-3xl">
          🎉
        </span>
        <h1 className="display mt-6 text-2xl font-extrabold">
          Tudo certo com seu pagamento!
        </h1>
        <p className="mt-3 text-white/70">
          {premiumGroupUrl
            ? "Seu acesso está liberado. Entre agora no grupo Premium do WhatsApp e comece a receber suas lições diárias."
            : "Assim que a confirmação do Mercado Pago for processada, você receberá o convite para o grupo do WhatsApp no e-mail cadastrado. Fique de olho na sua caixa de entrada (e no spam)!"}
        </p>

        {premiumGroupUrl && (
          <a
            href={premiumGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 flex w-full items-center justify-center gap-2"
          >
            Entrar no grupo Premium
          </a>
        )}

        <div className="mt-8 rounded-2xl bg-navy-900 p-5 text-left text-sm text-white/80">
          <p className="display font-extrabold text-accent-400">Próximos passos</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Confirme o pagamento (caso tenha usado boleto/Pix).</li>
            <li>
              {premiumGroupUrl
                ? "Toque em “Entrar no grupo Premium” acima."
                : "Aguarde o e-mail com o link do grupo."}
            </li>
            <li>Entre no grupo e receba sua primeira lição.</li>
          </ol>
        </div>

        <Link
          href="/"
          className={`${premiumGroupUrl ? "btn-secondary" : "btn-primary"} mt-4 w-full`}
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
