import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

const SITE = "https://www.vocaboost.com.br";
const CONTATO = "contato@vocaboost.com.br";
const ATUALIZADO = "17 de julho de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade | Vocaboost",
  description:
    "Como o Vocaboost coleta, usa e protege seus dados pessoais, em conformidade com a LGPD. Saiba quais dados tratamos, com quem compartilhamos e quais são os seus direitos.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-extrabold text-white sm:text-2xl">{titulo}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/70">{children}</div>
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-14 lg:py-20">
            <nav aria-label="breadcrumb" className="text-sm text-white/50">
              <Link href="/" className="hover:text-accent-400">
                Início
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/70">Política de Privacidade</span>
            </nav>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-white sm:text-4xl">
              Política de Privacidade
            </h1>
            <p className="mt-3 text-sm text-white/50">Última atualização: {ATUALIZADO}</p>

            <div className="mt-6 max-w-3xl">
              <p className="text-[15px] leading-relaxed text-white/70">
                Esta Política de Privacidade explica como o <strong className="text-white">Vocaboost</strong>{" "}
                (&quot;nós&quot;) coleta, utiliza, armazena e protege as suas informações quando você
                acessa o site <span className="text-white">{SITE.replace("https://", "")}</span>, participa dos
                nossos grupos de WhatsApp ou contrata algum dos nossos produtos. Tratamos seus dados em
                conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
              </p>

              <Bloco titulo="1. Quais dados coletamos">
                <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-white/90">Dados que você fornece:</strong> nome, e-mail e número
                    de WhatsApp ao entrar em um grupo gratuito, se inscrever numa lista ou contratar um plano.
                  </li>
                  <li>
                    <strong className="text-white/90">Dados de pagamento:</strong> ao assinar um plano pago,
                    os dados do cartão são processados diretamente pela Stripe. Não armazenamos números de
                    cartão em nossos servidores.
                  </li>
                  <li>
                    <strong className="text-white/90">Dados de navegação:</strong> páginas visitadas, cliques,
                    dispositivo, navegador e origem do acesso, coletados por cookies e ferramentas de análise.
                  </li>
                </ul>
              </Bloco>

              <Bloco titulo="2. Como usamos seus dados">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Enviar as lições, conteúdos e comunicações do serviço que você solicitou.</li>
                  <li>Processar pagamentos e dar acesso aos grupos e produtos contratados.</li>
                  <li>Dar suporte, responder dúvidas e melhorar a experiência de aprendizado.</li>
                  <li>
                    Medir e otimizar nossos anúncios e campanhas, entendendo quais conteúdos geram mais valor.
                  </li>
                  <li>Cumprir obrigações legais e prevenir fraudes.</li>
                </ul>
              </Bloco>

              <Bloco titulo="3. Cookies e tecnologias de medição">
                <p>
                  Usamos cookies e pixels de medição para entender como o site é usado e para exibir anúncios
                  mais relevantes. Entre eles estão o <strong className="text-white/90">Meta Pixel</strong>{" "}
                  (Facebook/Instagram) e ferramentas de análise de tráfego. Você pode desativar cookies nas
                  configurações do seu navegador, mas algumas funções do site podem deixar de funcionar
                  corretamente.
                </p>
              </Bloco>

              <Bloco titulo="4. Com quem compartilhamos">
                <p>
                  Não vendemos seus dados. Compartilhamos informações apenas com parceiros que viabilizam o
                  serviço, e apenas no necessário:
                </p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-white/90">Meta Platforms</strong> (WhatsApp, Facebook, Instagram) —
                    entrega dos grupos e mensuração de anúncios.
                  </li>
                  <li>
                    <strong className="text-white/90">Stripe</strong> — processamento seguro de pagamentos.
                  </li>
                  <li>
                    <strong className="text-white/90">Google</strong> — análise de tráfego e infraestrutura.
                  </li>
                  <li>Provedores de hospedagem e automação que operam sob nossas instruções.</li>
                </ul>
              </Bloco>

              <Bloco titulo="5. Por quanto tempo guardamos">
                <p>
                  Mantemos seus dados pelo tempo necessário para prestar o serviço e cumprir obrigações legais.
                  Quando não houver mais finalidade ou base legal, os dados são eliminados ou anonimizados.
                </p>
              </Bloco>

              <Bloco titulo="6. Seus direitos (LGPD)">
                <p>A qualquer momento você pode solicitar:</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Confirmação de que tratamos seus dados e acesso a eles;</li>
                  <li>Correção de dados incompletos ou desatualizados;</li>
                  <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                  <li>Portabilidade e informação sobre com quem compartilhamos;</li>
                  <li>Revogação do consentimento e exclusão dos seus dados.</li>
                </ul>
                <p>
                  Para exercer esses direitos, escreva para{" "}
                  <a href={`mailto:${CONTATO}`} className="text-accent-400 hover:underline">
                    {CONTATO}
                  </a>
                  . Você também pode sair de qualquer grupo ou lista a qualquer momento.
                </p>
              </Bloco>

              <Bloco titulo="7. Segurança">
                <p>
                  Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não
                  autorizado, perda ou alteração. Ainda assim, nenhum sistema é 100% imune, e nos comprometemos
                  a comunicar incidentes relevantes conforme a lei.
                </p>
              </Bloco>

              <Bloco titulo="8. Alterações desta política">
                <p>
                  Podemos atualizar esta política periodicamente. A data no topo indica a última revisão.
                  Mudanças relevantes serão comunicadas pelos nossos canais.
                </p>
              </Bloco>

              <Bloco titulo="9. Contato">
                <p>
                  Dúvidas sobre privacidade ou sobre esta política? Fale com a gente pelo e-mail{" "}
                  <a href={`mailto:${CONTATO}`} className="text-accent-400 hover:underline">
                    {CONTATO}
                  </a>
                  .
                </p>
              </Bloco>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
