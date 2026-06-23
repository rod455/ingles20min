import type { MetadataRoute } from "next";

const SITE = "https://www.vocaboost.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/curso`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
}
