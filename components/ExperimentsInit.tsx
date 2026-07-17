"use client";

import { useEffect } from "react";
import { initExperiments } from "@/lib/experiments";

/**
 * Dispara o carregamento dos experimentos A/B uma vez, no mount. Não renderiza
 * nada. Fica no layout pra estar presente em todas as páginas.
 */
export default function ExperimentsInit() {
  useEffect(() => {
    initExperiments();
  }, []);
  return null;
}
