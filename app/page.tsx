import Link from "next/link";
import Header from "@/components/Header";
import PhoneMockup from "@/components/PhoneMockup";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-px grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="eyebrow">🇺🇸 Inglês todo dia no seu WhatsApp</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Aprenda inglês em{" "}
            <span className="text-brand-600">20 minutos por dia</span>, sem sair
            do WhatsApp
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-800/70">
            Chega de apps abandonados. Receba lições diárias, áudios e expressões
            reais direto no seu celular — e finalmente crie o hábito de estudar
            com uma comunidade que te puxa pra frente.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#planos" className="btn-primary">
              Começar agora
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <a href="#como-funciona" className="btn-secondary">
              Como funciona
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-ink-800/60">
            <div className="flex -space-x-2">
              {["A", "M", "J", "L"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-brand-200 text-xs font-bold text-brand-800"
                >
                  {c}
                </span>
              ))}
            </div>
            <p>
              <strong className="text-ink-900">+1.200 alunos</strong> estudando
              todos os dias
            </p>
          </div>
        </div>

        <div className="relative">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "20 min", label: "por dia é o suficiente" },
    { value: "+1.200", label: "alunos ativos" },
    { value: "365", label: "lições por ano" },
    { value: "4,9★", label: "avaliação média" },
  ];
  return (
    <section className="border-y border-brand-100 bg-white">
      <div className="container-px grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-extrabold text-brand-600 sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-ink-800/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  const pains = [
    "Baixou vários apps e abandonou todos depois de uma semana",
    "Sente que estuda, estuda e não sai do lugar",
    "Não tem tempo para um curso longo e cansativo",
    "Fica travado na hora de falar e entender o inglês do dia a dia",
  ];
  return (
    <section className="section">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Soa familiar?</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            O problema não é você. É o método.
          </h2>
          <p className="mt-4 text-lg text-ink-800/70">
            A maioria das pessoas desiste do inglês porque tenta aprender tudo de
            uma vez. O segredo é a constância — um pouco todo dia, no lugar onde
            você já passa horas: o WhatsApp.
          </p>
        </div>
        <ul className="space-y-4">
          {pains.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-ink-800/80"
            >
              <span className="mt-0.5 text-xl">😩</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "1",
      title: "Assine o plano",
      desc: "Escolha mensal ou anual e pague com segurança via Mercado Pago (Pix, cartão ou boleto).",
    },
    {
      n: "2",
      title: "Entre no grupo",
      desc: "Assim que o pagamento é confirmado, você recebe o convite do grupo exclusivo no WhatsApp.",
    },
    {
      n: "3",
      title: "Estude 20 min por dia",
      desc: "Receba lições diárias com vocabulário, áudios e expressões reais. Pratique com a comunidade.",
    },
  ];
  return (
    <section id="como-funciona" className="section bg-ink-900 text-white">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-200">
            Como funciona
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simples assim, em 3 passos
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-xl font-extrabold">
                {s.n}
              </span>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "📚",
      title: "Vocabulário que cola",
      desc: "Palavras e expressões selecionadas para o dia a dia, com exemplos práticos.",
    },
    {
      icon: "🎧",
      title: "Áudios de pronúncia",
      desc: "Treine seu ouvido e fale com confiança ouvindo a pronúncia correta.",
    },
    {
      icon: "💬",
      title: "Expressões reais",
      desc: "Aprenda gírias e frases que nativos usam de verdade, não o inglês de livro.",
    },
    {
      icon: "🔥",
      title: "Desafios diários",
      desc: "Pequenos desafios que mantêm você no ritmo e criam o hábito de estudar.",
    },
    {
      icon: "🤝",
      title: "Comunidade ativa",
      desc: "Pratique com outras pessoas no mesmo objetivo e nunca estude sozinho.",
    },
    {
      icon: "📱",
      title: "Tudo no WhatsApp",
      desc: "Sem app novo, sem login complicado. Onde você já está, todos os dias.",
    },
  ];
  return (
    <section id="beneficios" className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Benefícios</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tudo para você aprender de verdade
          </h2>
          <p className="mt-4 text-lg text-ink-800/70">
            Um método leve e constante, pensado para caber na sua rotina.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl border border-brand-100 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-ink-800/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Amanda R.",
      role: "Estuda há 4 meses",
      text: "Eu já tinha tentado de tudo. No WhatsApp eu não esqueço de estudar, virou parte do meu dia. Finalmente estou evoluindo.",
    },
    {
      name: "Marcos L.",
      role: "Plano anual",
      text: "20 minutos parece pouco, mas no fim do mês eu percebi quanta coisa aprendi. As expressões do dia a dia são o melhor.",
    },
    {
      name: "Juliana P.",
      role: "Estuda há 2 meses",
      text: "A comunidade me motiva demais. Quando bate a preguiça, alguém sempre puxa o assunto e eu volto a praticar.",
    },
  ];
  return (
    <section className="section bg-brand-50/60">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Quem usa, recomenda</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Histórias de quem criou o hábito
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-brand-100 bg-white p-7"
            >
              <div className="text-accent-500">{"★★★★★"}</div>
              <blockquote className="mt-4 flex-1 text-ink-800/80">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-200 font-bold text-brand-800">
                  {t.name.charAt(0)}
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-ink-900">{t.name}</p>
                  <p className="text-ink-800/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-600 px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Seu inglês não vai esperar. Comece hoje.
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Dê o primeiro passo agora e receba sua primeira lição ainda hoje no
              WhatsApp.
            </p>
            <Link
              href="#planos"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-700 shadow-lg transition hover:bg-brand-50 active:scale-[0.98]"
            >
              Quero começar agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-10 text-sm text-ink-800/60 sm:flex-row">
        <div className="flex items-center gap-2 font-extrabold text-ink-900">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">
            V
          </span>
          Voca<span className="-ml-2 text-brand-600">boost</span>
        </div>
        <p>© {new Date().getFullYear()} Vocaboost. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href="#planos" className="hover:text-brand-600">
            Planos
          </a>
          <a href="#duvidas" className="hover:text-brand-600">
            Dúvidas
          </a>
        </div>
      </div>
    </footer>
  );
}
