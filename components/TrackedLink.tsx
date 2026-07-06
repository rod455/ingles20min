"use client";

import type { ReactNode } from "react";

/**
 * Link externo (abre em nova aba) que dispara uma conversão do Google Ads no
 * clique. Como abre em nova aba, a página atual permanece e o evento tem tempo
 * de ser enviado — sem corrida com a navegação.
 */
export default function TrackedLink({
  href,
  sendTo,
  event,
  className,
  children,
}: {
  href: string;
  sendTo: string;
  event?: string;
  className?: string;
  children: ReactNode;
}) {
  function handleClick() {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    if (event) {
      // Sem send_to: o evento vai para todas as tags (GA4 + Ads)
      w.gtag("event", event);
    }
    w.gtag("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "BRL",
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
