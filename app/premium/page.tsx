import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Pricing from "@/components/Pricing";
import { PLANS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Premium — Assinatura Vocaboost",
  description:
    "O plano completo do Vocaboost: uma lição nova todo dia útil no grupo exclusivo do WhatsApp + chat com IA pra tirar dúvidas na hora. Mensal ou anual, cancele quando quiser.",
  alternates: { canonical: "/premium" },
  openGraph: {
    title: "Premium — o plano completo do Vocaboost",
    description:
      "Uma lição por dia no grupo exclusivo + chat com IA. Evolua no inglês todos os dias.",
    url: "https://www.vocaboost.com.br/premium",
    type: "website",
  },
};

const RECEBE = [
  {
    icon: "📅",
    title: "Uma lição nova todo dia útil",
    desc: "De segunda a sexta você recebe uma lição prática no grupo — listening, vocabulário, gramática e conversação em rodízio.",
  },
  {
    icon: "💬",
    title: "Chat com IA pra tirar dúvidas",
    desc: "Travou numa lição? Pergunte ao chat com IA exclusivo a qualquer hora e receba explicação, exemplo e correção na mesma hora.",
  },
  {
    icon: "👥",
    title: "Comunidade ativa pra praticar",
    desc: "Um grupo exclusivo de gente estudando junto todos os dias — a constância que leva à fluência fica muito mais fácil.",
  },
  {
    icon: "🎧",
    title: "Áudios, vídeos e exemplos",
    desc: "Conteúdo variado pra treinar o ouvido e a pronúncia com o inglês do dia a dia, não com regra chata de livro.",
  },
];

const PASSOS = [
  {
    n: "1",
    title: "Assine o plano",
    desc: "Escolha mensal ou anual e pague com segurança via Hotmart (Pix, cartão ou boleto).",
  },
  {
    n: "2",
    title: "Entre no grupo",
    desc: "Assim que o pagamento é confirmado, você recebe o convite do grupo exclusivo no WhatsApp.",
  },
  {
    n: "3",
    title: "Estude de segunda a sexta",
    desc: "Receba uma lição por dia útil, pratique com a comunidade e tire dúvidas com a IA. A constância gera o resultado.",
  },
];

const FAQ = [
  {
    q: "O que está incluído no Premium?",
    a: "Acesso ao grupo exclusivo no WhatsApp com uma lição nova todo dia útil, chat com IA pra tirar dúvidas quando quiser, além de áudios, vídeos e uma comunidade ativa pra praticar.",
  },
  {
    q: "Como recebo o acesso?",
    a: "Assim que o pagamento é aprovado na Hotmart, você recebe o convite do grupo exclusivo no WhatsApp por e-mail. É só entrar e começar.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Não há fidelidade: você cancela a assinatura quando quiser, direto pela Hotmart. E ainda tem a garantia de 7 dias.",
  },
  {
    q: "Qual a diferença pro curso de 21 dias?",
    a: "O curso de 21 dias é um conteúdo completo e estruturado na área de membros, com pagamento único. O Premium é uma assinatura com lição nova todo dia útil e chat com IA — pra quem quer evoluir de forma contínua, sem data pra acabar.",
  },
];

const premiumJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Vocaboost Premium — Assinatura",
  description:
    "Assinatura do Vocaboost: uma lição nova todo dia útil no grupo exclusivo do WhatsApp + chat com IA pra tirar dúvidas. Mensal ou anual.",
  brand: { "@type": "Brand", name: "Vocaboost" },
  offers: [
    {
      "@type": "Offer",
      name: "Plano mensal",
      price: PLANS.monthly.price.toFixed(2),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: "https://www.vocaboost.com.br/premium",
    },
    {
      "@type": "Offer",
      name: "Plano anual",
      price: PLANS.yearly.price.toFixed(2),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: "https://www.vocaboost.com.br/premium",
    },
  ],
};

const premiumFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PremiumPage() {
  return (
    <>
      <Header />
      <JsonLd data={premiumJsonLd} />
      <JsonLd data={premiumFaqJsonLd} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-16 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Assinatura · o plano completo</span>
              <h1 className="display mt-5 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
                Evolua no inglês{" "}
                <span className="text-accent-400">todos os dias</span>, sem parar
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                Uma lição nova todo dia útil no grupo exclusivo do WhatsApp +{" "}
                <strong className="text-white">chat com IA</strong> pra tirar
                dúvidas na hora. A constância que leva à fluência, no app que você
                já usa o dia inteiro.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="#planos" className="btn-primary">
                  Ver planos e assinar
                </Link>
                <Link href="/curso" className="btn-secondary">
                  Prefiro o curso de 21 dias
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/50">
                A partir de R$ 49,90/mês · garantia de 7 dias · cancele quando
                quiser
              </p>
            </div>
          </div>
        </section>

        {/* O que você recebe */}
        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">O que você recebe</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Tudo pra criar o hábito e evoluir de verdade
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {RECEBE.map((f) => (
                <div key={f.title} className="card">
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="display mt-4 text-xl font-extrabold">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-white/70">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow">Como funciona</span>
              <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
                Simples assim, em 3 passos
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PASSOS.map((s) => (
                <div key={s.n} className="card">
                  <span className="display grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-xl font-extrabold text-white">
                    {s.n}
                  </span>
                  <h3 className="display mt-5 text-xl font-extrabold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-white/70">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planos (checkout) */}
        <Pricing />

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
                  Assine, entre no grupo e sinta o método na prática. Se não for
                  pra você, é só pedir o reembolso em até 7 dias direto pela
                  Hotmart — devolvemos 100% do valor. O risco é todo nosso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Isca: ebook grátis */}
        <section className="section">
          <div className="container-px">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-navy-800 p-8 text-center sm:flex-row sm:text-left">
              <div>
                <span className="eyebrow">Ainda na dúvida?</span>
                <h2 className="display mt-3 text-2xl font-extrabold">
                  Comece de graça no WhatsApp
                </h2>
                <p className="mt-2 text-white/70">
                  Entre no grupo grátis e receba alguns dias de aulas pra sentir
                  como funciona — sem cartão, sem compromisso.
                </p>
              </div>
              <Link
                href="/#produtos"
                className="btn-secondary whitespace-nowrap"
                data-gtag-event="premium_to_gratis"
              >
                Testar grátis
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="duvidas">
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
          <Link href="/curso" className="hover:text-accent-400">
            Curso de 21 dias
          </Link>
        </div>
      </footer>
    </>
  );
}
