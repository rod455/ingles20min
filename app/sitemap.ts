import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/aprenda-data";
import { getPublishedPosts } from "@/lib/blog";

const SITE = "https://www.vocaboost.com.br";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const base: MetadataRoute.Sitemap = [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/curso`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/premium`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/ebook`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/aprenda`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE}/privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...GUIDES.map((g) => ({
      url: `${SITE}/aprenda/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const posts = await getPublishedPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...base, ...postEntries];
}
