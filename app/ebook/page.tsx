import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import EbookCta from "@/components/EbookCta";

export const metadata: Metadata = {
  title: "Ebook grátis: o método dos poliglotas — Vocaboost",
  description:
    "Baixe grátis o ebook que revela o método híbrido usado por poliglotas (Michel Thomas + Luca Lampariello) para dominar o inglês sem estresse. É só entrar com seu WhatsApp.",
  alternates: { canonical: "/ebook" },
  openGraph: {
    title: "Ebook grátis: o método dos poliglotas",
    description:
      "O passo a passo que poliglotas usam pra aprender inglês de forma natural — grátis.",
    url: "https://www.vocaboost.com.br/ebook",
    type: "website",
  },
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.vocaboost.com.br";

const DESCUBRA = [
  {
    t: "O método híbrido de 3 fases",
    d: "Fundamentos intuitivos → tradução bidirecional → produção ativa e imersão gradual. Um caminho claro do zero à conversação.",
  },
  {
    t: "Como pensam 2 poliglotas de verdade",
    d: "As abordagens de Michel Thomas e Luca Lampariello explicadas de um jeito simples pra você aplicar hoje.",
  },
  {
    t: "Aprender sem decoreba",
    d: "Por que frases em contexto vencem listas de palavras soltas — e como equilibrar input e output pra não travar na hora de falar.",
  },
  {
    t: "Exercícios práticos",
    d: "Atividades e recursos extras pra fixar o método e criar o hábito de estudar todo dia.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Desvende o Segredo de Como Idiomas São Dominados por Poliglotas",
  inLanguage: "pt-BR",
  author: { "@type": "Person", name: "Matheus Caldeira" },
  publisher: { "@type": "Organization", name: "Vocaboost", url: siteUrl },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/ebook`,
  },
};

export default function EbookPage() {
  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main>
        {/* Hero + formulário */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-16 lg:py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="eyebrow">Ebook grátis · PDF</span>
                <h1 className="display mt-4 text-4xl font-black leading-[1.05] sm:text-5xl">
                  O segredo que os{" "}
                  <span className="text-accent-400">poliglotas</span> usam pra
                  dominar o inglês
                </h1>
                <p className="mt-5 max-w-xl text-lg text-white/70">
                  Um guia direto ao ponto com o <strong className="text-white">método
                  híbrido</strong> de dois dos maiores poliglotas do mundo — pra você
                  aprender de forma natural, sem estresse e sem decorar regra chata.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="text-accent-400">✓</span> 100% grátis, entrega
                    na hora
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-400">✓</span> Leitura rápida e
                    aplicável hoje
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-400">✓</span> + acesso ao grupo
                    grátis no WhatsApp
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="mx-auto mb-8 hidden max-w-xs lg:block">
                  <BookCover />
                </div>
                <EbookCta id="baixar" />
              </div>
            </div>
          </div>
        </section>

        {/* O que você vai descobrir */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">O que tem dentro</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                O que você vai descobrir
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {DESCUBRA.map((item) => (
                <div key={item.t} className="card">
                  <h3 className="display text-lg font-extrabold text-white">
                    {item.t}
                  </h3>
                  <p className="mt-2 text-white/70">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Autoridade: o método dos poliglotas */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Por que funciona</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Baseado em quem realmente aprende idiomas
              </h2>
              <p className="mt-4 text-lg text-white/70">
                Nada de teoria solta: o ebook une duas metodologias comprovadas por
                poliglotas que dominam vários idiomas.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="card">
                <h3 className="display text-xl font-extrabold text-accent-400">
                  Michel Thomas
                </h3>
                <p className="mt-3 text-white/75">
                  Linguista poliglota famoso por ensinar sem estresse, com frases em
                  contexto e progressão lógica — a ideia de que qualquer pessoa
                  aprende quando o conteúdo é bem estruturado.
                </p>
              </div>
              <div className="card">
                <h3 className="display text-xl font-extrabold text-accent-400">
                  Luca Lampariello
                </h3>
                <p className="mt-3 text-white/75">
                  Poliglota que fala mais de 10 idiomas, criador da tradução
                  bidirecional e da imersão gradual — técnicas pra você produzir a
                  língua de verdade, não só entender.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-xl text-center">
              <span className="eyebrow">Pega o seu</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Baixe o ebook agora, é grátis
              </h2>
              <p className="mt-4 text-white/70">
                Coloca seu nome e WhatsApp que a gente libera o PDF na hora e te
                convida pro grupo grátis.
              </p>
              <div className="mx-auto mt-8 max-w-md text-left">
                <EbookCta id="baixar-final" />
              </div>
              <p className="mt-6 text-sm text-white/50">
                Prefere já testar o método na prática?{" "}
                <Link
                  href="/curso"
                  className="font-semibold text-accent-400 hover:underline"
                >
                  Conheça o curso de 21 dias →
                </Link>
              </p>
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
          <Link href="/curso" className="hover:text-accent-400">
            Curso de 21 dias
          </Link>
        </div>
      </footer>
    </>
  );
}

/** Mockup de capa do ebook em CSS (sem depender de imagem externa). */
function BookCover() {
  return (
    <div className="relative aspect-[3/4] w-full rotate-[-4deg] rounded-r-lg rounded-l-sm bg-gradient-to-br from-navy-800 to-navy-950 p-6 shadow-2xl shadow-navy-950/60 ring-1 ring-white/10">
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-sm bg-accent-400/70" />
      <div className="flex h-full flex-col">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
          Ebook grátis
        </span>
        <p className="display mt-6 text-2xl font-black leading-tight text-white">
          O segredo dos{" "}
          <span className="text-accent-400">poliglotas</span> pra dominar idiomas
        </p>
        <p className="mt-auto text-xs text-white/60">
          Método Michel Thomas + Luca Lampariello
        </p>
        <p className="mt-4 text-sm font-bold text-white">
          VOCA<span className="text-brand-500">BOOST</span>
        </p>
      </div>
    </div>
  );
}
