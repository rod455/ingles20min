import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "@/lib/plans";
import { createSubscription, isMercadoPagoConfigured } from "@/lib/mercadopago";
import { upsertSubscriber } from "@/lib/supabase";

export const runtime = "nodejs";

function getBaseUrl(req: NextRequest): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const origin = req.nextUrl.origin;
  return origin;
}

export async function POST(req: NextRequest) {
  let payload: { plan?: string; email?: string; name?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const plan = getPlan(payload.plan);
  if (!plan) {
    return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
  }

  const email = (payload.email || "").trim().toLowerCase();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const name = (payload.name || "").trim() || undefined;

  // Capture the lead first so we keep the contact even if payment isn't set up
  // yet or the buyer drops off before completing the checkout.
  await upsertSubscriber({ email, name, plan, status: "lead" });

  if (!isMercadoPagoConfigured()) {
    return NextResponse.json(
      {
        error:
          "Pagamento ainda não configurado. Defina MP_ACCESS_TOKEN nas variáveis de ambiente.",
        code: "MP_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  try {
    const baseUrl = getBaseUrl(req);
    const subscription = await createSubscription({
      plan,
      payerEmail: email,
      backUrl: `${baseUrl}/sucesso?plan=${plan.id}`,
      externalReference: `${plan.id}:${email}`,
    });

    await upsertSubscriber({
      email,
      name,
      plan,
      status: "pending",
      mpSubscriptionId: subscription.id,
      amount: plan.price,
    });

    return NextResponse.json({ initPoint: subscription.initPoint });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Erro ao iniciar o pagamento.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
