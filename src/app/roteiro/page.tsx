/**
 * =====================================================================
 * RotaClara — Construtor de roteiro (/roteiro)
 * ---------------------------------------------------------------------
 * Server component com metadata. O construtor é um cliente component
 * com persistência local (localStorage) — nada sai do navegador.
 * =====================================================================
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { ItineraryTool } from "@/components/tools/ItineraryTool";
import { Skeleton } from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Construtor de roteiro",
  description:
    "Monte seu roteiro dia a dia: atividades por período, tempos estimados, " +
    "custos e alertas de sobrecarga. Salvo só no seu navegador, com " +
    "exportação em texto.",
  path: "/roteiro",
});

interface RoteiroPageProps {
  searchParams: Promise<{ destino?: string }>;
}

export default async function RoteiroPage({ searchParams }: RoteiroPageProps) {
  const params = await searchParams;
  const destinoSlug = typeof params.destino === "string" ? params.destino : null;

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Roteiro" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Montar</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Construtor de roteiro
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Abra os dias, adicione atividades pela manhã, tarde e noite, estime
          tempo e custo e exporte em texto. O roteiro fica salvo apenas no seu
          navegador — nenhum dado é enviado para servidores.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
              <Skeleton className="h-[32rem] w-full" />
              <Skeleton className="h-[32rem] w-full" />
            </div>
          }
        >
          <ItineraryTool
            destinations={allDestinations}
            initialDestinationSlug={destinoSlug}
          />
        </Suspense>
      </div>
    </div>
  );
}
