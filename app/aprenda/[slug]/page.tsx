import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import AprendaCta from "@/components/AprendaCta";
import JsonLd from "@/components/JsonLd";
import { GUIDES, getGuide, type GuideSection } from "@/lib/aprenda-data";

const SITE = "https://www.vocaboost.com.br";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/aprenda/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE}/aprenda/${guide.slug}`,
      siteName: "Vocaboost",
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Vocaboost", url: SITE },
    publisher: { "@type": "Organization", name: "Vocaboost", url: SITE },
    mainEntityOfPage: `${SITE}/aprenda/${guide.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE },
      { "@type": "ListItem", position: 2, name: "Aprenda inglês grátis", item: `${SITE}/aprenda` },
      { "@type": "ListItem", position: 3, name: guide.label, item: `${SITE}/aprenda/${guide.slug}` },
    ],
  };

  const relatedGuides = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <>
      <Header />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-800 to-navy-900" />
          <div className="container-px py-12 lg:py-16">
            <nav aria-label="breadcrumb" className="text-sm text-white/50">
              <Link href="/" className="hover:text-accent-400">
                Início
              </Link>
              <span className="mx-2">/</span>
              <Link href="/aprenda" className="hover:text-accent-400">
                Aprenda
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/80">{guide.label}</span>
            </nav>
            <h1 className="display mt-6 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {guide.emoji} {guide.h1}
            </h1>
            <div className="mt-6 max-w-3xl space-y-4">
              {guide.intro.map((p, i) => (
                <p key={i} className="text-lg text-white/75">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-3xl space-y-12">
              {guide.sections.map((section) => (
                <GuideSectionBlock key={section.title} section={section} />
              ))}

              {guide.tips && guide.tips.length > 0 && (
                <div className="rounded-2xl border border-accent-400/30 bg-accent-400/5 p-6 sm:p-8">
                  <h2 className="display text-xl font-extrabold text-accent-400 sm:text-2xl">
                    💡 Como memorizar mais rápido
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {guide.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-3 text-white/80">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-400" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <AprendaCta slug={guide.slug} />
            </div>
          </div>
        </section>

        <section className="section bg-navy-950">
          <div className="container-px">
            <div className="mx-auto max-w-3xl">
              <h2 className="display text-2xl font-extrabold sm:text-3xl">
                Perguntas frequentes
              </h2>
              <div className="mt-6 space-y-4">
                {guide.faq.map((f) => (
                  <div key={f.q} className="card">
                    <h3 className="display text-lg font-extrabold text-white">
                      {f.q}
                    </h3>
                    <p className="mt-2 text-white/70">{f.a}</p>
                  </div>
                ))}
              </div>

              {relatedGuides.length > 0 && (
                <>
                  <h2 className="display mt-14 text-2xl font-extrabold sm:text-3xl">
                    Continue aprendendo
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {relatedGuides.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/aprenda/${g.slug}`}
                        className="card group p-5 transition hover:-translate-y-1 hover:border-accent-400/40"
                      >
                        <span className="text-2xl">{g.emoji}</span>
                        <p className="display mt-3 font-extrabold group-hover:text-accent-400">
                          {g.label}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function GuideSectionBlock({ section }: { section: GuideSection }) {
  const hasPron = section.words?.some((w) => w.pron);
  return (
    <div>
      <h2 className="display text-2xl font-extrabold sm:text-3xl">
        {section.title}
      </h2>

      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mt-4 text-white/75">
          {p}
        </p>
      ))}

      {section.words && section.words.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-navy-800">
                <th className="px-4 py-3 font-bold text-accent-400">Inglês</th>
                <th className="px-4 py-3 font-bold text-accent-400">
                  Português
                </th>
                {hasPron && (
                  <th className="px-4 py-3 font-bold text-accent-400">
                    Pronúncia aproximada
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {section.words.map((w) => (
                <tr key={w.en} className="odd:bg-navy-900 even:bg-navy-900/50">
                  <td className="px-4 py-2.5 font-semibold text-white">
                    {w.en}
                  </td>
                  <td className="px-4 py-2.5 text-white/75">{w.pt}</td>
                  {hasPron && (
                    <td className="px-4 py-2.5 italic text-white/55">
                      {w.pron || "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.list && section.list.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {section.list.map((item) => (
            <li key={item} className="flex items-start gap-3 text-white/80">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
