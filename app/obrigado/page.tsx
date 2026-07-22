import Link from "next/link";
import ObrigadoTracker from "./ObrigadoTracker";

export const metadata = {
  title: "Bem-vindo(a) ao Premium — Vocaboost",
  robots: { index: false },
};

/**
 * Página de obrigado (thank you page) do checkout Premium (Hotmart).
 *
 * Estratégia anti-@lid: NÃO dependemos de mandar DM "a frio" pro telefone do
 * checkout (que o WhatsApp cada vez mais bloqueia). Aqui a pessoa TOCA no botão
 * e nos manda um "oi" — aí recebemos o endereço real dela (JID/@lid) e
 * respondemos com o convite do grupo. Responder a uma mensagem recebida sempre
 * funciona. O código da transação vai junto pra o bot validar a compra e evitar
 * que curioso entre de graça.
 */

// WhatsApp do bot Vocaboost (instância Evolution "vocaboost"). É ESTE número
// que escuta e responde — não confundir com o número de aulas particulares.
const WA_NUMBER = "5511955558684";

function firstStr(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] || "";
  return v || "";
}

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;

  // O Hotmart pode variar o nome dos parâmetros; lemos os candidatos mais comuns.
  const nomeCompleto =
    firstStr(sp.name) ||
    firstStr(sp.buyer_name) ||
    firstStr(sp.first_name) ||
    firstStr(sp.nome);
  const primeiro = (nomeCompleto.split(" ")[0] || "").trim();
  const transaction =
    firstStr(sp.transaction) ||
    firstStr(sp.trans) ||
    firstStr(sp.transactionId) ||
    firstStr(sp.hottok_transaction);

  const saudacao = primeiro ? `, ${primeiro}` : "";
  const codigo = transaction ? ` (Código: ${transaction})` : "";
  const waText = `Oi! Acabei de assinar o Vocaboost Premium e quero meu acesso 🎉${codigo}`;
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <main className="grid min-h-screen place-items-center bg-navy-900 px-5 py-10">
      <div className="card w-full max-w-md text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-400/15 text-3xl">
          🎉
        </span>
        <h1 className="display mt-6 text-2xl font-extrabold">
          Bem-vindo(a) ao Vocaboost Premium{saudacao}!
        </h1>
        <p className="mt-3 text-white/70">
          Sua compra foi confirmada. Falta <strong>1 passo rápido</strong> pra
          você receber o convite do grupo exclusivo e suas instruções — tudo no
          WhatsApp.
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-8 flex w-full items-center justify-center gap-2"
        >
          🟢 Falar no WhatsApp e receber meu acesso
        </a>
        <p className="mt-3 text-xs text-white/50">
          Toque no botão — a mensagem já vai escrita. É só enviar que a gente te
          responde na hora com o link do grupo.
        </p>

        <div className="mt-8 rounded-2xl bg-navy-900 p-5 text-left text-sm text-white/80">
          <p className="display font-extrabold text-accent-400">
            Como funciona agora
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Toque em “Falar no WhatsApp” acima e envie o “oi”.</li>
            <li>Você recebe na hora o convite do grupo Premium + instruções.</li>
            <li>Sua primeira lição chega no próximo dia útil. 🚀</li>
          </ol>
          <p className="mt-3 text-white/60">
            Já recebeu nossa mensagem no WhatsApp? Então é só seguir por lá.
          </p>
        </div>

        <Link href="/" className="btn-secondary mt-4 w-full">
          Voltar para o início
        </Link>
      </div>

      <ObrigadoTracker transaction={transaction} />
    </main>
  );
}
