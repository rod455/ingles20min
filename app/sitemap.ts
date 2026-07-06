import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/aprenda-data";

const SITE = "https://www.vocaboost.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/curso`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/aprenda`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${SITE}/aprenda/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
