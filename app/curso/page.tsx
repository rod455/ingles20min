import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Curso de Inglês Descomplicado — Vocaboost",
  description:
    "Curso online de inglês com acesso imediato na área de membros. Aprenda o inglês do dia a dia no seu ritmo, por um valor único.",
};

const COURSE_URL = process.env.NEXT_PUBLIC_HOTMART_COURSE_URL || "#";

const MODULES = [
  {
    n: "1",
    title: "Fundamentos que destravam",
    desc: "As estruturas que aparecem em 80% das conversas reais — pra você falar desde a primeira aula.",
  },
  {
    n: "2",
    title: "Vocabulário do dia a dia",
    desc: "As palavras e expressões que você realmente usa: trabalho, viagem, redes sociais e rotina.",
  },
  {
    n: "3",
    title: "Pronúncia e escuta",
    desc: "Técnica de shadowing pra entender nativos falando rápido e perder o sotaque travado.",
  },
  {
    n: "4",
    title: "Conversação na prática",
    desc: "Diálogos guiados e desafios pra você sair falando com confiança, sem medo de errar.",
  },
];

const FOR_WHO = [
  "Quem já tentou vários apps e nunca saiu do básico",
  "Quem entende um pouco mas trava na hora de falar",
  "Quem quer um material direto, sem enrolação e sem gramática chata",
  "Quem prefere estudar no próprio ritmo, quando e onde quiser",
];

const FAQ = [
  {
    q: "Como recebo o acesso?",
    a: "Assim que o pagamento é aprovado, você recebe o acesso à área de membros (Hotmart) por e-mail. É só entrar e começar.",
  },
  {
    q: "Por quanto tempo tenho acesso?",
    a: "O curso é um pagamento único, com acesso ao conteúdo na área de membros. Estude no seu ritmo, quantas vezes quiser.",
  },
  {
    q: "Preciso ter algum nível de inglês?",
    a: "Não. O curso começa do básico e evolui passo a passo — serve pra quem está começando ou quer reforçar a base.",
  },
  {
    q: "Qual a diferença pro grupo do WhatsApp?",
    a: "O curso é um conteúdo completo e estruturado na área de membros (pagamento único). O grupo é uma assinatura com lição nova todo dia útil e professor pra tirar dúvidas. Um complementa o outro.",
  },
];

export default function CursoPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Curso online · acesso imediato</span>
              <h1 className="display mt-5 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
                Inglês <span className="text-brand-500">descomplicado</span>:
                aprenda o inglês do dia a dia no seu ritmo
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                Um curso direto ao ponto, na área de membros, pra você destravar a
                fala e ganhar vocabulário — sem mensalidade, com{" "}
                <strong className="text-white">pagamento único</strong>.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={COURSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Quero o curso por R$ 39,90
                </a>
                <Link href="/#planos" className="btn-secondary">
                  Ver o grupo por assinatura
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/50">
                Pagamento único · acesso imediato via Hotmart (Pix, cartão ou boleto)
              </p>
            </div>
          </div>
        </section>

        {/* Módulos */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">O que você vai aprender</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Um caminho claro, do básico à conversação
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {MODULES.map((m) => (
                <div key={m.n} className="card">
                  <span className="display grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-xl font-extrabold text-white">
                    {m.n}
                  </span>
                  <h3 className="display mt-5 text-xl font-extrabold">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-white/70">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quem é */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Pra quem é</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Feito pra destravar de vez
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {FOR_WHO.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-accent-400/30 bg-accent-400/5 p-4 text-white/80"
                >
                  <span className="text-accent-400">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oferta */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="card mx-auto flex max-w-xl flex-col items-center border-2 border-brand-500 bg-navy-800 text-center shadow-xl shadow-brand-500/10">
              <span className="eyebrow">Acesso imediato</span>
              <h2 className="display mt-4 text-2xl font-extrabold sm:text-3xl">
                Curso de Inglês Descomplicado
              </h2>
              <div className="mt-6 flex items-end justify-center gap-1">
                <span className="display text-5xl font-extrabold">R$ 39,90</span>
                <span className="mb-2 text-white/60">único</span>
              </div>
              <ul className="mt-8 w-full space-y-3 text-left text-sm">
                {[
                  "Acesso ao curso completo na área de membros",
                  "Estude no seu ritmo, quando e onde quiser",
                  "Vocabulário, pronúncia e conversação do dia a dia",
                  "Pagamento único — sem mensalidade",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent-400 text-navy-950">
                      ✓
                    </span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full"
              >
                Comprar agora
              </a>
              <p className="mt-4 text-xs text-white/50">
                Pagamento seguro via Hotmart
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Dúvidas</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Perguntas frequentes
              </h2>
            </div>
            <div className="mx-auto mt-10 max-w-2xl space-y-4">
              {FAQ.map((item) => (
                <div key={item.q} className="card">
                  <h3 className="display text-lg font-extrabold">{item.q}</h3>
                  <p className="mt-2 text-white/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-navy-950">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-10 text-sm text-white/60 sm:flex-row">
          <Link href="/" className="leading-none">
            <span className="display block text-lg font-extrabold text-white">
              VOCA<span className="text-brand-500">BOOST</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
              Rumo à fluência
            </span>
          </Link>
          <p>© {new Date().getFullYear()} Vocaboost. Todos os direitos reservados.</p>
          <Link href="/#planos" className="hover:text-accent-400">
            Ver o grupo
          </Link>
        </div>
      </footer>
    </>
  );
}
