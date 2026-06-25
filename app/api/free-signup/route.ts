import { NextRequest, NextResponse } from "next/server";
import { upsertLead, LeadSource } from "@/lib/leads";

export const runtime = "nodejs";

/**
 * Captura um lead do funil GRÁTIS (formulário "Comece grátis" da LP).
 * Fluxo:
 *  1. Salva o lead no Supabase (tabela `leads`).
 *  2. Avisa o n8n (N8N_FREE_WEBHOOK_URL) para iniciar o funil — opcional.
 *  3. Devolve o link de convite do grupo grátis do WhatsApp para redirecionar.
 */
export async function POST(req: NextRequest) {
  let payload: { name?: string; whatsapp?: string; source?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const name = (payload.name || "").trim() || undefined;
  const source = (payload.source as LeadSource) || "lp";

  const result = await upsertLead({
    name,
    whatsapp: payload.whatsapp || "",
    source,
    funnel: "free",
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error || "Não foi possível registrar o contato." },
      { status: 400 },
    );
  }

  // Dispara o funil no n8n (não bloqueia a resposta se falhar).
  await notifyFreeFunnel({
    event: "free_signup",
    name,
    whatsapp: result.whatsapp,
    source,
  });

  const groupUrl =
    process.env.NEXT_PUBLIC_FREE_GROUP_URL ||
    "https://chat.whatsapp.com/FWCF0VOitRPAcS8EzdMpWW";
  return NextResponse.json({ ok: true, groupUrl });
}

async function notifyFreeFunnel(payload: Record<string, unknown>) {
  const url =
    process.env.N8N_FREE_WEBHOOK_URL ||
    "https://n8n.vocaboost.com.br/webhook/free-signup";
  if (!url) {
    console.log("[automation] N8N_FREE_WEBHOOK_URL não configurado. Payload:", payload);
    return;
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_WEBHOOK_SECRET) {
    headers["x-webhook-secret"] = process.env.N8N_WEBHOOK_SECRET;
  }
  try {
    await fetch(url, { method: "POST", headers, body: JSON.stringify(payload) });
  } catch (err) {
    console.error("[automation] erro ao notificar n8n (free):", err);
  }
}
