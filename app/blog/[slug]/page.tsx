import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getPostBySlug, getPublishedPosts, formatDate } from "@/lib/blog";

export const revalidate = 3600;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.vocaboost.com.br";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post não encontrado — Vocaboost" };

  return {
    title: `${post.title} — Vocaboost`,
    description: post.description ?? undefined,
    keywords: post.keywords ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? post.published_at ?? undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description ?? undefined,
    inLanguage: "pt-BR",
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Organization", name: "Vocaboost", url: siteUrl },
    publisher: { "@type": "Organization", name: "Vocaboost", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const faq = post.faq ?? [];
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Header />
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <main className="container-px mx-auto max-w-3xl py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold text-accent-400 hover:underline"
        >
          ← Voltar ao blog
        </Link>

        <article className="mt-6">
          {post.published_at && (
            <time
              dateTime={post.published_at}
              className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400"
            >
              {formatDate(post.published_at)}
            </time>
          )}
          <h1 className="mt-2 font-display text-3xl font-black md:text-4xl">
            {post.title}
          </h1>

          {post.tldr && (
            <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500">
                Resumo rápido
              </p>
              <p className="mt-2 text-white/90">{post.tldr}</p>
            </div>
          )}

          <div
            className="mt-8 space-y-4 text-white/80 [&_a]:text-accent-400 [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {faq.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold">
                Perguntas frequentes
              </h2>
              <div className="mt-4 space-y-3">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <summary className="cursor-pointer font-semibold">
                      {item.q}
                    </summary>
                    <p className="mt-2 text-white/70">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="font-display text-xl font-bold">
            Quer destravar seu inglês de vez?
          </p>
          <p className="mt-2 text-white/70">
            Comece de graça no grupo do Vocaboost: aulas práticas no WhatsApp,
            todo dia.
          </p>
          <Link
            href="/#gratis"
            className="btn-primary mt-4 inline-block px-5 py-2.5 text-sm"
          >
            Testar grátis
          </Link>
        </div>
      </main>
    </div>
  );
}
