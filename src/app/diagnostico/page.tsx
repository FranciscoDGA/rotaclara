/**
 * =====================================================================
 * RotaClara — Diagnóstico Inteligente de Viagem (/diagnostico)
 * =====================================================================
 */

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { DiagnosisTool } from "@/components/tools/DiagnosisTool";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Diagnóstico inteligente de viagem — Descubra o que cabe no orçamento",
  description:
    "Descubra quais destinos cabem de verdade no seu orçamento, quais despesas " +
    "podem comprometer seu plano e quais ajustes reduzem custos com transparência.",
  path: "/diagnostico",
});

export default function DiagnosticoPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Diagnóstico" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Diferencial RotaClara</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Diagnóstico inteligente de viagem
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Informe quanto você pretende investir, de onde sai e quantos dias
          pretende viajar. O diagnóstico cruza seus números com a base editorial
          para apontar quais destinos são viáveis, quais custos costumam passar
          despercebidos e onde economizar sem perder qualidade.
        </p>
      </header>

      <div className="mt-8">
        <DiagnosisTool destinations={allDestinations} />
      </div>
    </div>
  );
}
