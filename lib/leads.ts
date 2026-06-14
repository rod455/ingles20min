import { getSupabaseAdmin } from "./supabase";

export type LeadSource = "lp" | "ad" | "manual";
export type LeadFunnel = "free" | "paid";

/**
 * Normaliza um telefone brasileiro para E.164 só com dígitos (ex.: 5511999998888).
 * Aceita entradas como "(11) 99999-8888", "+55 11 99999-8888", "11999998888".
 * Retorna null quando claramente inválido.
 */
export function normalizeBrazilPhone(input: string): string | null {
  let digits = (input || "").replace(/\D/g, "");
  if (!digits) return null;

  // Remove zeros de operadora/DDD à esquerda.
  digits = digits.replace(/^0+/, "");

  // Garante o código do país (55). Números nacionais têm 10 (fixo) ou 11 (móvel)
  // dígitos com DDD; com o 55 ficam 12 ou 13.
  if (digits.length === 10 || digits.length === 11) {
    digits = "55" + digits;
  }

  // Após normalizar, esperamos 12 (fixo) ou 13 (móvel) dígitos começando com 55.
  if (!/^55\d{10,11}$/.test(digits)) return null;
  return digits;
}

/**
 * Captura/atualiza um lead do funil (chave natural: WhatsApp). Best-effort:
 * nunca lança. Retorna o telefone normalizado quando válido.
 */
export async function upsertLead(input: {
  name?: string;
  whatsapp: string;
  source?: LeadSource;
  funnel?: LeadFunnel;
}): Promise<{ ok: boolean; whatsapp?: string; error?: string }> {
  const whatsapp = normalizeBrazilPhone(input.whatsapp);
  if (!whatsapp) return { ok: false, error: "WhatsApp inválido." };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.log("[supabase] não configurado, pulando upsert de lead:", whatsapp);
    return { ok: true, whatsapp };
  }

  const row: Record<string, unknown> = {
    whatsapp,
    source: input.source ?? "lp",
    funnel: input.funnel ?? "free",
    status: "active",
  };
  if (input.name) row.name = input.name.trim();

  const { error } = await supabase
    .from("leads")
    .upsert(row, { onConflict: "whatsapp" });

  if (error) {
    console.error("[supabase] erro ao salvar lead:", error.message);
    return { ok: false, whatsapp, error: error.message };
  }
  return { ok: true, whatsapp };
}
