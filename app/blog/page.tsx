import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import { getPublishedPosts, formatDate } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog do Vocaboost — dicas práticas de inglês",
  description:
    "Dicas práticas pra destravar seu inglês: vocabulário, pronúncia, gramática e conversação. Conteúdo novo toda semana.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog do Vocaboost",
    description:
      "Dicas práticas pra destravar seu inglês, com conteúdo novo toda semana.",
    url: "/blog",
    type: "website",
  },
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <Header />
      <main className="container-px mx-auto max-w-3xl py-16">
        <h1 className="font-display text-4xl font-black md:text-5xl">
          Blog do <span className="text-brand-500">Vocaboost</span>
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Dicas práticas pra destravar seu inglês — vocabulário, pronúncia e
          conversação. Conteúdo novo toda semana.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 text-white/60">
            Em breve, novos conteúdos por aqui. 👀
          </p>
        ) : (
          <ul className="mt-12 space-y-8">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="border-b border-white/10 pb-8 last:border-0"
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  {post.published_at && (
                    <time
                      dateTime={post.published_at}
                      className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400"
                    >
                      {formatDate(post.published_at)}
                    </time>
                  )}
                  <h2 className="mt-2 font-display text-2xl font-bold transition group-hover:text-accent-400">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 text-white/70">{post.description}</p>
                  )}
                  <span className="mt-3 inline-block text-sm font-semibold text-brand-500">
                    Ler artigo →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
