import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Plan } from "./plans";

let cached: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the service role key. It bypasses RLS, so it
 * must never be imported into client components. Returns null when the project
 * isn't configured yet, letting the payment flow run without persistence.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  if (!cached) {
    cached = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

/** Captures or updates a lead/subscriber. Best-effort: never throws. */
export async function upsertSubscriber(input: {
  email: string;
  name?: string;
  whatsapp?: string;
  plan: Plan;
  status: "lead" | "pending" | "active" | "cancelled";
  mpSubscriptionId?: string;
  amount?: number;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.log("[supabase] não configurado, pulando upsert:", input.email);
    return;
  }

  const row: Record<string, unknown> = {
    email: input.email,
    plan: input.plan.id,
    status: input.status,
  };
  if (input.name) row.name = input.name;
  if (input.whatsapp) row.whatsapp = input.whatsapp;
  if (input.mpSubscriptionId) row.mp_subscription_id = input.mpSubscriptionId;
  if (typeof input.amount === "number") row.amount = input.amount;

  const { error } = await supabase
    .from("subscribers")
    .upsert(row, { onConflict: "email" });

  if (error) {
    console.error("[supabase] erro ao salvar subscriber:", error.message);
  }
}

/** Marks a subscription active by Mercado Pago id. Best-effort: never throws. */
export async function markSubscriptionActive(input: {
  mpSubscriptionId: string;
  email?: string;
  amount?: number;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const patch: Record<string, unknown> = {
    status: "active",
    mp_subscription_id: input.mpSubscriptionId,
  };
  if (typeof input.amount === "number") patch.amount = input.amount;

  // Prefer matching by the subscription id; fall back to email.
  let query = supabase.from("subscribers").update(patch);
  if (input.email) {
    query = query.eq("email", input.email);
  } else {
    query = query.eq("mp_subscription_id", input.mpSubscriptionId);
  }

  const { error } = await query;
  if (error) {
    console.error("[supabase] erro ao ativar assinatura:", error.message);
  }
}

/**
 * Looks up a subscriber (by Mercado Pago id, falling back to email) so the
 * webhook can pass the buyer's WhatsApp to the automation. Best-effort.
 */
export async function getSubscriberContact(input: {
  mpSubscriptionId?: string;
  email?: string;
}): Promise<{ whatsapp?: string; name?: string } | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  let query = supabase.from("subscribers").select("whatsapp, name").limit(1);
  if (input.mpSubscriptionId) {
    query = query.eq("mp_subscription_id", input.mpSubscriptionId);
  } else if (input.email) {
    query = query.eq("email", input.email);
  } else {
    return null;
  }

  const { data, error } = await query.maybeSingle();
  if (error) {
    console.error("[supabase] erro ao buscar contato:", error.message);
    return null;
  }
  return data
    ? { whatsapp: data.whatsapp ?? undefined, name: data.name ?? undefined }
    : null;
}
