import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Telemetria first-party do site (page_view, click_free_group, begin_checkout,
 * view_plans…). Best-effort: nunca falha pro cliente — o funil jamais pode
 * quebrar por causa de tracking. Os dados alimentam o relatório diário do n8n.
 */

const EVENT_RE = /^[a-z0-9_]{2,40}$/;

export async function POST(req: NextRequest) {
  let payload: { event?: string; path?: string; meta?: Record<string, unknown> };
  try {
    // sendBeacon pode chegar como text/plain — parseia o corpo cru.
    payload = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const event = String(payload.event || "").toLowerCase();
  if (!EVENT_RE.test(event)) return new NextResponse(null, { status: 204 });

  const path = String(payload.path || "").slice(0, 200) || null;
  let meta: Record<string, unknown> = {};
  if (payload.meta && typeof payload.meta === "object" && !Array.isArray(payload.meta)) {
    // Só chaves simples e valores curtos — nada de PII ou payloads gigantes.
    for (const [k, v] of Object.entries(payload.meta).slice(0, 8)) {
      if (["string", "number", "boolean"].includes(typeof v)) {
        meta[String(k).slice(0, 40)] = String(v).slice(0, 200);
      }
    }
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("site_events").insert({ event, path, meta });
    if (error) console.error("[track] erro ao registrar evento:", error.message);
  }
  return new NextResponse(null, { status: 204 });
}
