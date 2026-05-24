import { Plan } from "./plans";

const MP_API = "https://api.mercadopago.com";

export interface CreateSubscriptionInput {
  plan: Plan;
  payerEmail: string;
  backUrl: string;
  externalReference?: string;
}

export interface SubscriptionResult {
  id: string;
  initPoint: string;
}

export function isMercadoPagoConfigured(): boolean {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

/**
 * Creates a Mercado Pago "preapproval" (recurring subscription) and returns the
 * checkout URL the buyer should be redirected to.
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/reference/subscriptions/_preapproval/post
 */
export async function createSubscription(
  input: CreateSubscriptionInput,
): Promise<SubscriptionResult> {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN não configurado.");
  }

  const { plan, payerEmail, backUrl, externalReference } = input;

  const body = {
    reason: `Vocaboost ${plan.name}`,
    external_reference: externalReference,
    payer_email: payerEmail,
    back_url: backUrl,
    auto_recurring: {
      frequency: plan.frequency,
      frequency_type: plan.frequencyType,
      transaction_amount: plan.price,
      currency_id: "BRL",
    },
    status: "pending",
  };

  const res = await fetch(`${MP_API}/preapproval`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      data?.message || data?.error || `Mercado Pago respondeu ${res.status}`;
    throw new Error(message);
  }

  const initPoint: string | undefined = data.init_point ?? data.sandbox_init_point;
  if (!initPoint) {
    throw new Error("Mercado Pago não retornou um init_point.");
  }

  return { id: String(data.id), initPoint };
}

/**
 * Fetches a preapproval by id so the webhook can verify status before acting.
 */
export async function getSubscription(id: string): Promise<any> {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("MP_ACCESS_TOKEN não configurado.");
  }

  const res = await fetch(`${MP_API}/preapproval/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error(`Não foi possível consultar a assinatura ${id}.`);
  }

  return res.json();
}
