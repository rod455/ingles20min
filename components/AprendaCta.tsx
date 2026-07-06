import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

// Endpoint self-healing: redireciona sempre pro convite atual do grupo grátis.
const FREE_GROUP_INVITE_URL =
  process.env.NEXT_PUBLIC_FREE_GROUP_URL ||
  "https://n8n.vocaboost.com.br/webhook/free-invite";

export default function AprendaCta({ slug }: { slug: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-accent-400/30 bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-10">
      <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-accent-400/10" />
      <div className="relative">
        <span className="eyebrow">Aprenda de verdade</span>
        <h2 className="display mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
          Ler lista é o começo.{" "}
          <span className="text-accent-400">Praticar todo dia</span> é o que
          fixa.
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Entre no grupo grátis do Vocaboost no WhatsApp e receba 4 dias de
          aulas práticas — com áudio, pronúncia e exercícios. Sem cartão, sem
          compromisso.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href={FREE_GROUP_INVITE_URL}
            sendTo="AW-18261023654/mANOCOLbmMkcEKa3xINE"
            event="conteudo_grupo_gratis"
            gaName="click_free_group"
            gaParams={{ cta_location: `conteudo_${slug}` }}
            className="btn-primary"
          >
            Entrar no grupo grátis
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </TrackedLink>
          <Link href="/curso" className="btn-secondary">
            Ver o curso de 21 dias
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/50">
          Uma lição por dia útil, direto no WhatsApp · +400 alunos estudando
        </p>
      </div>
    </div>
  );
}
