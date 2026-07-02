import Link from "next/link";
import Header from "@/components/Header";
import PhoneMockup from "@/components/PhoneMockup";
import Pricing from "@/components/Pricing";
import FreeGroupBanner from "@/components/FreeGroupBanner";
import FreeGroupCta from "@/components/FreeGroupCta";
import Faq from "@/components/Faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FreeGroupBanner />
        <CourseBanner />
        <SocialProof />
        <Problem />
        <Method />
        <Benefits />
        <HowItWorks />
        <Authority />
        <Testimonials />
        <FreeGroupCta />
        <Pricing />
        <PrivateClasses />
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-px grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="eyebrow">A maneira mais inteligente de aprender</span>
          <h1 className="display mt-5 text-4xl font-extrabold leading-[0.95] sm:text-5xl lg:text-6xl">
            Aprenda inglês com{" "}
            <span className="text-brand-500">10 minutos por dia</span> no
            WhatsApp, de <span className="text-accent-400">segunda a sexta</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Não é mais um curso para abandonar na segunda semana. É o hábito de
            quem evolui de verdade: uma lição prática por dia útil, no app que
            você já abre o dia inteiro. Pouco, mas todo dia — no piloto
            automático.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#planos" className="btn-primary">
              Quero começar agora
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <a href="#gratis" className="btn-secondary">
              Testar grátis no WhatsApp
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-white/60">
            <div className="flex -space-x-2">
              {["M", "A", "H", "J"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-navy-900 bg-navy-700 text-xs font-bold text-accent-400"
                >
                  {c}
                </span>
              ))}
            </div>
            <p>
              <strong className="text-white">+400 alunos</strong> estudando todos
              os dias
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

function CourseBanner() {
  return (
    <section className="border-y border-accent-400/30 bg-accent-400/10">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="text-2xl">🎓</span>
          <p className="text-white/90">
            <strong className="text-white">Prefere começar com um curso?</strong>{" "}
            Destrave seu inglês no <strong className="text-white">desafio de 21 dias</strong> por{" "}
            <strong className="text-accent-400">R$ 39,90</strong> (pagamento único).
          </p>
        </div>
        <Link
          href="/curso"
          className="btn-primary whitespace-nowrap px-6 py-2.5 text-sm"
        >
          Ver o curso
        </Link>
      </div>
    </section>
  );
}

function SocialProof() {
  const stats = [
    { value: "5x", label: "lições por semana" },
    { value: "Seg–Sex", label: "conteúdo novo" },
    { value: "+400", label: "alunos ativos" },
    { value: "10 anos", label: "de experiência" },
  ];
  return (
    <section className="border-y border-white/10 bg-navy-950">
      <div className="container-px grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="display text-2xl font-extrabold text-accent-400 sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-white/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-3xl font-extrabold leading-tight sm:text-4xl">
            Você quer{" "}
            <span className="text-accent-400">aprender inglês</span>, mas sente
            que está sempre esquecendo o vocabulário e nunca sai do básico?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Já tentou vários cursos, mas <strong>não conseguiu avançar</strong>?
            O Vocaboost foi criado para resolver exatamente esses problemas.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {[
            "Baixou vários apps e abandonou todos depois de uma semana",
            "Estuda, estuda e sente que não sai do lugar",
            "Não tem tempo para um curso longo e cansativo",
            "Trava na hora de falar e entender o inglês do dia a dia",
          ].map((p) => (
            <div
              key={p}
              className="flex items-start gap-3 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-4 text-white/80"
            >
              <span className="mt-0.5 text-xl">😩</span>
              <span>{p}</span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-white/70">
          O segredo não é estudar muito de uma vez — é a{" "}
          <strong className="text-white">constância</strong>. Um pouco todo dia
          útil, no lugar onde você já passa horas:{" "}
          <span className="text-accent-400">o WhatsApp.</span>
        </p>
      </div>
    </section>
  );
}

const CURRICULUM = [
  { day: "Segunda", skill: "Listening", desc: "Treino auditivo com vídeos e áudios" },
  { day: "Terça", skill: "Vocabulário", desc: "Novas palavras e pronúncia" },
  { day: "Quarta", skill: "Gramática", desc: "Presente, passado e futuro na prática" },
  { day: "Quinta", skill: "Conversação", desc: "Shadowing e repeating" },
  { day: "Sexta", skill: "Revisão & Desafio", desc: "Fixe o que aprendeu na semana" },
];

function Method() {
  return (
    <section id="metodo" className="section bg-navy-950">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Por que o Vocaboost é diferente</span>
          <h2 className="display mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            Uma rotina semanal completa, de{" "}
            <span className="text-accent-400">segunda a sexta</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Cada dia útil com um foco. Conteúdo novo toda semana, para você
            evoluir continuamente — sem data para acabar.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border-2 border-brand-500 bg-brand-500/10">
          <ul className="divide-y divide-brand-500/30">
            {CURRICULUM.map((row) => (
              <li
                key={row.day}
                className="grid grid-cols-[auto_1fr] items-center gap-4 px-5 py-4 sm:px-8"
              >
                <span className="display w-24 text-lg font-extrabold text-white sm:text-xl">
                  {row.day}
                </span>
                <span className="rounded-xl bg-navy-900 px-4 py-3">
                  <span className="font-bold text-accent-400">{row.skill}</span>
                  <span className="text-white/70"> | {row.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-white/50">
          Leitura e escrita integradas ao longo da semana. O fim de semana é seu
          para descansar e revisar.
        </p>
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: "🔥",
      title: "Crie uma rotina de estudos",
      desc: "Disciplina para estudar todos os dias úteis. Aprenda a se organizar e a dedicar tempo ao seu aprendizado.",
    },
    {
      icon: "📈",
      title: "Expanda seu vocabulário",
      desc: "Palavras e expressões novas toda semana. Seu vocabulário cresce de forma constante, mês após mês.",
    },
    {
      icon: "🗣️",
      title: "Pratique todas as habilidades",
      desc: "Listening, Speaking, Reading e Writing em um único lugar, de forma equilibrada e contínua.",
    },
    {
      icon: "🎁",
      title: "Acesso a conteúdos exclusivos",
      desc: "Vídeos, áudios, aulas, exemplos e atividades que vão facilitar o seu aprendizado.",
    },
  ];
  return (
    <section id="beneficios" className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">O que você pode esperar</span>
          <h2 className="display mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            Tudo para você aprender de verdade,{" "}
            <span className="text-brand-500">todos os dias</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-6">
          <div className="card flex flex-col items-start gap-5 border-accent-400/40 bg-accent-400/5 sm:flex-row sm:items-center">
            <span className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl bg-accent-400 text-3xl text-navy-950">
              💬
            </span>
            <div>
              <h3 className="display text-xl font-extrabold text-accent-400">
                Tire suas dúvidas com a IA, na hora
              </h3>
              <p className="mt-2 text-white/70">
                Travou em alguma lição? No Premium você tem um chat com IA
                exclusivo pra tirar dúvidas de inglês a qualquer hora —
                explicação, exemplo e correção na mesma hora. Você nunca estuda
                sozinho.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((f) => (
              <div
                key={f.title}
                className="card transition hover:-translate-y-1 hover:border-accent-400/40"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="display mt-4 text-xl font-extrabold">{f.title}</h3>
                <p className="mt-2 text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-white/70">
          Não é apenas “mais um curso de inglês”.{" "}
          <strong className="text-white">
            É uma filosofia de aprendizado e desenvolvimento pessoal
          </strong>{" "}
          para você desenvolver disciplina e alcançar a fluência no longo prazo.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
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
      desc: "Receba uma lição por dia útil e pratique com a comunidade. A constância é o que gera o resultado.",
    },
  ];
  return (
    <section className="section bg-navy-950">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Como funciona</span>
          <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
            Simples assim, em 3 passos
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card">
              <span className="display grid h-12 w-12 place-items-center rounded-2xl bg-brand-500 text-xl font-extrabold text-white">
                {s.n}
              </span>
              <h3 className="display mt-5 text-xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Authority() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="card mx-auto max-w-4xl border-accent-400/20 bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-12">
          <span className="eyebrow">Por que você deveria me ouvir?</span>
          <h2 className="display mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">
            Eu sou o criador do Vocaboost, dou aulas há{" "}
            <span className="text-brand-500">10 anos</span>, aprendi inglês
            sozinho e já ensinei mais de{" "}
            <span className="text-brand-500">400 pessoas</span>.
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Grande parte do meu sucesso como professor vem de oferecer aulas com
            uma metodologia eficiente — focada no inglês da vida real, nas
            principais dificuldades dos brasileiros e na constância que leva ao
            resultado.
          </p>
          <p className="mt-4 display text-xl font-extrabold text-accent-400">
            Evolua de verdade, um dia de cada vez.
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Marcos Lopes",
      text: "O Vocaboost foi um divisor de águas na minha jornada de aprendizado. Receber a lição todo dia tornou o estudo leve e constante.",
    },
    {
      name: "Adriana Vila Nova",
      text: "Eu sempre me sentia perdida ao estudar inglês sozinha, mas o Vocaboost me deu a estrutura que eu precisava. As lições são diretas e fáceis de seguir.",
    },
    {
      name: "Hayana Rezende",
      text: "O Vocaboost me ajudou muito a melhorar meu inglês e ter mais confiança pra viajar o mundo. A prática diária fez toda a diferença.",
    },
  ];
  return (
    <section className="section bg-navy-950">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Quem usa, recomenda</span>
          <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
            Histórias de quem criou o hábito
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
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
  );
}

function FinalCta() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-500/40 bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-16 text-center sm:px-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent-400/20" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="display text-3xl font-extrabold leading-tight sm:text-4xl">
              Sua próxima semana pode começar com inglês de verdade
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Cada semana que passa sem estudar é vocabulário que não entra. Dê o
              primeiro passo agora, receba sua primeira lição no WhatsApp e
              construa o hábito que leva à fluência. Sem riscos: cancele quando
              quiser.
            </p>
            <Link
              href="#planos"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-400 px-8 py-4 text-base font-extrabold text-navy-950 shadow-lg transition hover:bg-accent-300 active:scale-[0.98]"
            >
              Quero começar agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivateClasses() {
  return (
    <section className="section bg-navy-950">
      <div className="container-px">
        <div className="card mx-auto flex max-w-4xl flex-col items-start gap-6 border-accent-400/30 bg-accent-400/5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="eyebrow">Para quem quer ir além</span>
            <h2 className="display mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              Aulas particulares com{" "}
              <span className="text-accent-400">professores profissionais</span>
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Quer acompanhamento individual? Oferecemos aulas particulares 1:1
              com professores — plano sob medida, foco na sua dificuldade e
              conversação. É um serviço à parte:{" "}
              <strong className="text-white">
                não está incluído no plano de R$ 49,90
              </strong>
              .
            </p>
            <p className="mt-4 text-sm font-semibold text-accent-400">
              Valores a partir de R$ 299,90 por mês (1x por semana).
            </p>
          </div>
          <a
            href="https://wa.me/5531992262392?text=Quero%20aulas%20particulares%20de%20ingl%C3%AAs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary whitespace-nowrap"
          >
            Quero saber mais
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-10 text-sm text-white/60 sm:flex-row">
        <div className="leading-none">
          <span className="display block text-lg font-extrabold text-white">
            VOCA<span className="text-brand-500">BOOST</span>
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
            Rumo à fluência
          </span>
        </div>
        <p>© {new Date().getFullYear()} Vocaboost. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href="#planos" className="hover:text-accent-400">
            Planos
          </a>
          <a href="#duvidas" className="hover:text-accent-400">
            Dúvidas
          </a>
        </div>
      </div>
    </footer>
  );
}
