/**
 * =====================================================================
 * RotaClara — Comparador de destinos (/comparador)
 * ---------------------------------------------------------------------
 * Server component com metadata. A comparação é feita pelo domínio
 * puro `compareDestinations` — sem ranking inventado.
 * =====================================================================
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { CompareTool } from "@/components/tools/CompareTool";
import { Skeleton } from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Comparar destinos",
  description:
    "Compare até 3 destinos lado a lado por custo, distância, época, " +
    "duração, clima e perfil — com critérios transparentes e nenhuma " +
    "lista de ranking inventada.",
  path: "/comparador",
});

export default function ComparadorPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Comparador" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Comparar</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Comparador de destinos
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Escolha até três destinos e compare critério a critério. Marcamos um
          destino como “melhor” apenas quando há diferença mensurável e o
          critério é declarado — nunca geramos rankings inventados.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          }
        >
          <CompareTool destinations={allDestinations} />
        </Suspense>
      </div>
    </div>
  );
}
