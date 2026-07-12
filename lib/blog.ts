import { getSupabaseAdmin } from "./supabase";

export type FaqItem = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string | null;
  keywords: string[] | null;
  content_html: string;
  tldr: string | null;
  faq: FaqItem[] | null;
  published_at: string | null;
  updated_at: string | null;
};

const FIELDS =
  "slug, title, description, keywords, content_html, tldr, faq, published_at, updated_at";

/** Lists published posts, newest first. Best-effort: returns [] when unset. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select(FIELDS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] erro ao listar posts:", error.message);
    return [];
  }
  return (data as BlogPost[]) ?? [];
}

/** Fetches a single published post by slug, or null if not found. */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blog_posts")
    .select(FIELDS)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[blog] erro ao buscar post:", error.message);
    return null;
  }
  return (data as BlogPost) ?? null;
}

export function formatDate(value: string | null): string {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
