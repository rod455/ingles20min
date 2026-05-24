import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/lib/mercadopago";
import { markSubscriptionActive } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Mercado Pago notifies this endpoint when a subscription/payment changes state.
 * We confirm the status with the API and, once active, hand off to N8N — which
 * will use the Evolution API to add the buyer to the WhatsApp group.
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/docs/subscriptions/additional-content/notifications/webhooks
 */
export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    // Mercado Pago also sends data via query string on some events.
  }

  const type = body?.type || req.nextUrl.searchParams.get("type");
  const dataId =
    body?.data?.id || req.nextUrl.searchParams.get("data.id") || body?.id;

  // We only act on subscription events that carry an id we can verify.
  if (!dataId) {
    return NextResponse.json({ received: true });
  }

  try {
    if (type === "subscription_preapproval" || type === "preapproval") {
      const subscription = await getSubscription(String(dataId));

      if (subscription?.status === "authorized") {
        const email: string | undefined = subscription.payer_email;
        const amount: number | undefined =
          subscription.auto_recurring?.transaction_amount;

        await markSubscriptionActive({
          mpSubscriptionId: String(subscription.id),
          email,
          amount,
        });

        await notifyAutomation({
          event: "subscription_active",
          subscriptionId: subscription.id,
          email,
          externalReference: subscription.external_reference,
          amount,
        });
      }
    }
  } catch (err) {
    // Never throw: returning 500 makes Mercado Pago retry endlessly.
    console.error("Erro ao processar webhook do Mercado Pago:", err);
  }

  return NextResponse.json({ received: true });
}

// Mercado Pago may validate the endpoint with a GET request.
export async function GET() {
  return NextResponse.json({ ok: true });
}

/**
 * Forwards a confirmed subscription to the N8N workflow that manages WhatsApp
 * group membership through the Evolution API. No-op until N8N_WEBHOOK_URL is set.
 */
async function notifyAutomation(payload: Record<string, unknown>) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    console.log("[automation] N8N_WEBHOOK_URL não configurado. Payload:", payload);
    return;
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_WEBHOOK_SECRET) {
    headers["x-webhook-secret"] = process.env.N8N_WEBHOOK_SECRET;
  }

  await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}
