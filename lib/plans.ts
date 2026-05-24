export type PlanId = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  /** How Mercado Pago should bill this plan. */
  frequency: number;
  frequencyType: "months";
  /** Human-friendly label for the billing cadence. */
  cadenceLabel: string;
  /** Equivalent monthly price, used for the "por mês" highlight. */
  monthlyEquivalent: number;
  highlight?: boolean;
  badge?: string;
}

export const PLANS: Record<PlanId, Plan> = {
  monthly: {
    id: "monthly",
    name: "Mensal",
    price: 49.9,
    frequency: 1,
    frequencyType: "months",
    cadenceLabel: "por mês",
    monthlyEquivalent: 49.9,
  },
  yearly: {
    id: "yearly",
    name: "Anual",
    price: 299.9,
    frequency: 12,
    frequencyType: "months",
    cadenceLabel: "por ano",
    monthlyEquivalent: 299.9 / 12,
    highlight: true,
    badge: "Economize 50%",
  },
};

export function getPlan(id: string | null | undefined): Plan | null {
  if (id === "monthly" || id === "yearly") return PLANS[id];
  return null;
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
