import JsonLd from "@/components/JsonLd";

const FAQS = [
  {
    q: "Como recebo as lições?",
    a: "Tudo acontece dentro de um grupo exclusivo no WhatsApp. Assim que o pagamento é confirmado, você recebe o convite e passa a receber uma lição por dia, de segunda a sexta.",
  },
  {
    q: "Com que frequência chegam as lições?",
    a: "Toda segunda a sexta-feira você recebe uma nova lição, sempre com um foco diferente (listening, vocabulário, gramática, conversação e revisão). O conteúdo é contínuo e se renova a cada semana — não tem data para acabar.",
  },
  {
    q: "Tem alguém para tirar minhas dúvidas?",
    a: "Sim! Você tem acesso a um professor. Ficou com dúvida em alguma lição? É só perguntar no grupo que um professor responde. Aqui você nunca estuda sozinho.",
  },
  {
    q: "Preciso ter um nível de inglês para entrar?",
    a: "Não. O conteúdo é pensado para quem está começando ou retomando os estudos. Você aprende no seu ritmo, um pouco a cada dia.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. A assinatura é sem fidelidade. Você cancela a qualquer momento direto pela Hotmart, sem multa.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos Pix, cartão de crédito e boleto através da Hotmart, com total segurança.",
  },
  {
    q: "Qual a diferença entre o plano mensal e o anual?",
    a: "O conteúdo é o mesmo. No plano anual você economiza cerca de 50% em relação ao mensal e garante o preço por 12 meses.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="duvidas" className="section">
      <JsonLd data={faqJsonLd} />
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="display mt-4 text-3xl font-extrabold sm:text-4xl">
            Tudo que você precisa saber
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-navy-800/70 p-5 transition open:border-accent-400/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                {item.q}
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-white/10 text-accent-400 transition group-open:rotate-45">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path
                      d="M10 4v12M4 10h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-white/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
