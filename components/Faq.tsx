const FAQS = [
  {
    q: "Como recebo as lições?",
    a: "Tudo acontece dentro de um grupo exclusivo no WhatsApp. Assim que o pagamento é confirmado, você recebe o convite e passa a receber as lições diárias automaticamente.",
  },
  {
    q: "Preciso ter um nível de inglês para entrar?",
    a: "Não. O conteúdo é pensado para quem está começando ou retomando os estudos. Você aprende no seu ritmo, 20 minutos por dia.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. A assinatura é sem fidelidade. Você cancela a qualquer momento direto pelo Mercado Pago, sem multa.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos Pix, cartão de crédito e boleto através do Mercado Pago, com total segurança.",
  },
  {
    q: "Qual a diferença entre o plano mensal e o anual?",
    a: "O conteúdo é o mesmo. No plano anual você economiza cerca de 50% em relação ao mensal e garante o preço por 12 meses.",
  },
  {
    q: "E se eu não gostar?",
    a: "Você pode cancelar quando quiser. Nosso objetivo é que você crie o hábito e veja evolução real — se não fizer sentido, é só sair.",
  },
];

export default function Faq() {
  return (
    <section id="duvidas" className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tudo que você precisa saber
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-brand-100 bg-white p-5 transition open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900">
                {item.q}
                <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
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
              <p className="mt-3 text-ink-800/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
