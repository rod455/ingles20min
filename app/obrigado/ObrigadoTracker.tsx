"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Registra a chegada na página de obrigado como sinal de compra (bom pro
 * Diretor medir conversão de checkout). Dispara 1x por transação/sessão e
 * nunca quebra — tracking jamais atrapalha o funil.
 */
export default function ObrigadoTracker({
  transaction,
}: {
  transaction?: string;
}) {
  useEffect(() => {
    try {
      const key = "vb_ty_" + (transaction || "1");
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      track("purchase_thankyou", transaction ? { transaction } : {});
    } catch {
      /* silencioso */
    }
  }, [transaction]);

  return null;
}
