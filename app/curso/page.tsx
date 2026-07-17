import Link from "next/link";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";

export const metadata = {
  title: "Inglês em 21 Dias — Vocaboost",
  description:
    "Curso online de 21 dias para destravar seu inglês. Acesso imediato na área de membros, no seu ritmo, por um pagamento único.",
  alternates: { canonical: "/curso" },
};

const COURSE_URL =
  process.env.NEXT_PUBLIC_HOTMART_COURSE_URL ||
  "https://pay.hotmart.com/L106356085V";

const WEEKS = [
  {
    n: "Semana 1",
    title: "Fundamentos que destravam",
    desc: "As estruturas que aparecem na maioria das conversas reais — pra você começar a falar desde os primeiros dias.",
  },
  {
    n: "Semana 2",
    title: "Vocabulário do dia a dia",
    desc: "As palavras e expressões que você realmente usa: rotina, trabalho, viagem e redes sociais.",
  },
  {
    n: "Semana 3",
    title: "Pronúncia e conversação",
    desc: "Escuta, pronúncia e diálogos guiados pra você sair falando com confiança, sem medo de errar.",
  },
];

const FOR_WHO = [
  "Quem já tentou vários apps e nunca saiu do básico",
  "Quem entende um pouco mas trava na hora de falar",
  "Quem quer um plano simples e direto pra evoluir em 3 semanas",
  "Quem prefere estudar no próprio ritmo, quando e onde quiser",
];

const FAQ = [
  {
    q: "Como funciona o curso de 21 dias?",
    a: "São 21 aulas curtas, uma por dia, organizadas em 3 semanas. Você assiste, aplica e evolui em poucos minutos por dia, no seu ritmo.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Assim que o pagamento é aprovado, você recebe o acesso à área de membros (Hotmart) por e-mail. É só entrar e começar pelo Dia 1.",
  },
  {
    q: "Por quanto tempo tenho acesso?",
    a: "É um pagamento único, com acesso ao conteúdo na área de membros. Faça no seu tempo e revise quantas vezes quiser.",
  },
  {
    q: "Qual a diferença pro grupo do WhatsApp?",
    a: "O curso de 21 dias é um conteúdo completo e estruturado na área de membros (pagamento único). O grupo é uma assinatura com lição nova todo dia útil e chat com IA pra tirar dúvidas na hora. Um complementa o outro.",
  },
];

const DEPOIMENTOS = [
  {
    name: "Camila R.",
    text: "Em 21 dias criei o hábito de estudar todo dia — coisa que nunca consegui com nenhum app. As aulas curtas fazem toda a diferença.",
  },
  {
    name: "Lucas M.",
    text: "Direto ao ponto, sem enrolação. Já consigo montar frases no dia a dia sem travar igual antes.",
  },
  {
    name: "Patrícia S.",
    text: "Achei que 21 dias seria pouco, mas saí do zero pro básico de verdade. Valeu cada centavo.",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Vocaboost — Inglês em 21 Dias",
  description:
    "Curso online de 21 dias para destravar o inglês: uma lição curta por dia, do básico à conversação. Acesso imediato na área de membros, pagamento único.",
  inLanguage: "pt-BR",
  provider: {
    "@type": "Organization",
    name: "Vocaboost",
    sameAs: "https://www.vocaboost.com.br",
  },
  offers: {
    "@type": "Offer",
    price: "39.90",
    priceCurrency: "BRL",
    category: "Paid",
    availability: "https://schema.org/InStock",
    url: "https://www.vocaboost.com.br/curso",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "P21D",
  },
};

const cursoFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function CursoPage() {
  return (
    <>
      <Header />
      <JsonLd data={courseJsonLd} />
      <JsonLd data={cursoFaqJsonLd} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Curso online · 21 dias · acesso imediato</span>
              <h1 className="display mt-5 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
                Destrave seu inglês em{" "}
                <span className="text-brand-500">21 dias</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                Um desafio prático e direto ao ponto: uma lição curta por dia,
                por 3 semanas, com o método que poliglotas do mundo todo usam
                (frases reais + shadowing), pra você criar o hábito e finalmente
                sair do básico —{" "}
                <strong className="text-white">com pagamento único</strong>, sem
                mensalidade.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <TrackedLink
                  href={COURSE_URL}
                  event="comprar_curso"
                  gaName="begin_checkout"
                  gaParams={{
                    currency: "BRL",
                    value: 39.9,
                    items: [
                      { item_id: "curso_21_dias", item_name: "Vocaboost" },
                    ],
                    cta_location: "curso_hero",
                  }}
                  className="btn-primary"
                >
                  Quero o curso por R$ 39,90
                </TrackedLink>
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

        {/* Plano de 21 dias */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Seu plano de 21 dias</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                3 semanas, do básico à conversação
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Uma lição curta por dia. Sem enrolação, sem gramática chata — só o
                que faz você evoluir de verdade.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {WEEKS.map((w) => (
                <div key={w.n} className="card">
                  <span className="display inline-block rounded-full bg-brand-500 px-4 py-1.5 text-sm font-extrabold text-white">
                    {w.n}
                  </span>
                  <h3 className="display mt-5 text-xl font-extrabold">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-white/70">{w.desc}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/50">
              21 lições · 1 por dia · poucos minutos diários
            </p>
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

        {/* Depoimentos */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Quem fez, aprovou</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Resultados de quem encarou os 21 dias
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {DEPOIMENTOS.map((t) => (
                <figure key={t.name} className="card flex flex-col">
                  <div className="text-accent-400">{"★★★★★"}</div>
                  <blockquote className="mt-4 flex-1 text-white/80">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 font-bold text-white">
                      {t.name.charAt(0)}
                    </span>
                    <p className="font-semibold text-white">{t.name}</p>
                  </figcaption>
                </figure>
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
                Inglês em 21 Dias
              </h2>
              <div className="mt-6 flex items-end justify-center gap-1">
                <span className="display text-5xl font-extrabold">R$ 39,90</span>
                <span className="mb-2 text-white/60">único</span>
              </div>
              <ul className="mt-8 w-full space-y-3 text-left text-sm">
                {[
                  "21 aulas (3 semanas) na área de membros",
                  "Uma lição curta por dia, no seu ritmo",
                  "Fundamentos, vocabulário, pronúncia e conversação",
                  "Acesso para revisar quando quiser — pagamento único",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-accent-400 text-navy-950">
                      ✓
                    </span>
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <TrackedLink
                href={COURSE_URL}
                event="comprar_curso"
                gaName="begin_checkout"
                gaParams={{
                  currency: "BRL",
                  value: 39.9,
                  items: [{ item_id: "curso_21_dias", item_name: "Vocaboost" }],
                  cta_location: "curso_oferta",
                }}
                className="btn-primary mt-8 w-full"
              >
                Começar o desafio de 21 dias
              </TrackedLink>
              <p className="mt-4 text-xs text-white/50">
                Pagamento seguro via Hotmart
              </p>
            </div>
          </div>
        </section>

        {/* Garantia */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border border-accent-400/30 bg-accent-400/5 p-8 text-center sm:flex-row sm:text-left">
              <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-full bg-accent-400/15 text-4xl">
                🛡️
              </div>
              <div>
                <h2 className="display text-2xl font-extrabold">
                  Garantia incondicional de 7 dias
                </h2>
                <p className="mt-3 text-white/75">
                  Entre, faça as primeiras lições e sinta o método na prática. Se não
                  for pra você, é só pedir o reembolso em até 7 dias direto pela
                  Hotmart — devolvemos 100% do valor, sem pergunta nenhuma. O risco é
                  todo nosso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Isca: ebook grátis pra quem ainda não vai comprar */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-navy-800 p-8 text-center sm:flex-row sm:text-left">
              <div>
                <span className="eyebrow">Ainda na dúvida?</span>
                <h2 className="display mt-3 text-2xl font-extrabold">
                  Comece com o ebook grátis
                </h2>
                <p className="mt-2 text-white/70">
                  Baixe o guia do método dos poliglotas e sinta como é aprender do
                  jeito natural — sem gastar nada.
                </p>
              </div>
              <Link
                href="/ebook"
                className="btn-secondary whitespace-nowrap"
                data-gtag-event="curso_to_ebook"
              >
                Baixar ebook grátis
              </Link>
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
