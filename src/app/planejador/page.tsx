/**
 * =====================================================================
 * RotaClara — Planejador de viagem (/planejador)
 * =====================================================================
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { PlannerTool } from "@/components/tools/PlannerTool";
import { Skeleton } from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Planejador inteligente de viagem",
  description:
    "Monte a estrutura da viagem: duração, distribuição de orçamento, sugestão " +
    "de atrações e alertas de transparência. Estimativas com metodologia e " +
    "data de referência.",
  path: "/planejador",
});

interface PlanejadorPageProps {
  searchParams: Promise<{ destino?: string }>;
}

export default async function PlanejadorPage({
  searchParams,
}: PlanejadorPageProps) {
  const params = await searchParams;
  const destinoSlug = typeof params.destino === "string" ? params.destino : null;

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Planejador" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Planejar</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Planejador inteligente
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Informe origem, destino, datas e preferências. O planejador monta a
          estrutura de dias, sugere atrações da nossa base editorial, distribui
          o orçamento e lista os alertas do caso — sempre com metodologia
          visível.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              <Skeleton className="h-[32rem] w-full" />
              <Skeleton className="h-[32rem] w-full" />
            </div>
          }
        >
          <PlannerTool
            destinations={allDestinations}
            initialDestinationSlug={destinoSlug}
          />
        </Suspense>
      </div>
    </div>
  );
}
