import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import AprendaCta from "@/components/AprendaCta";
import JsonLd from "@/components/JsonLd";
import { GUIDES } from "@/lib/aprenda-data";

const SITE = "https://www.vocaboost.com.br";

export const metadata: Metadata = {
  title: "Aprenda inglês grátis — guias de vocabulário e dicas | Vocaboost",
  description:
    "Guias gratuitos de inglês para brasileiros: números, cores, dias da semana, objetos e listas de palavras por tema — com tradução, pronúncia e dicas pra memorizar.",
  alternates: { canonical: "/aprenda" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Início", item: SITE },
    { "@type": "ListItem", position: 2, name: "Aprenda inglês grátis", item: `${SITE}/aprenda` },
  ],
};

export default function AprendaHubPage() {
  return (
    <>
      <Header />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-14 lg:py-20">
            <nav aria-label="breadcrumb" className="text-sm text-white/50">
              <Link href="/" className="hover:text-accent-400">
                Início
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">Aprenda inglês grátis</span>
            </nav>
            <h1 className="display mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Aprenda inglês <span className="text-accent-400">grátis</span>:
              guias de vocabulário e dicas práticas
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/70">
              Listas completas com tradução e pronúncia aproximada, feitas para
              brasileiros. Escolha um tema, estude no seu ritmo — e se quiser
              transformar isso em hábito, o grupo grátis no WhatsApp te espera.
            </p>
          </div>
        </section>

        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.map((g) => (
                <Link
                  key={g.slug}
                  href={`/aprenda/${g.slug}`}
                  className="card group transition hover:-translate-y-1 hover:border-accent-400/40"
                >
                  <span className="text-3xl">{g.emoji}</span>
                  <h2 className="display mt-4 text-xl font-extrabold group-hover:text-accent-400">
                    {g.label}
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    {g.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-accent-400">
                    Ver guia
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 011.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L13.6 11H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-px">
            <AprendaCta slug="hub" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
