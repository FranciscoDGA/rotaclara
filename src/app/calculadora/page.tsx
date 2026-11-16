/**
 * =====================================================================
 * RotaClara — Calculadora de viagem (/calculadora)
 * ---------------------------------------------------------------------
 * Server component com metadata. A ferramenta é um cliente component
 * com estado local; todos os cálculos são puros (domínio).
 * =====================================================================
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { CalculatorTool } from "@/components/tools/CalculatorTool";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Skeleton } from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de viagem",
  description:
    "Calcule o total da viagem, o valor por pessoa, a distribuição por " +
    "categoria e quanto guardar por mês — estimativas a partir dos seus " +
    "próprios valores.",
  path: "/calculadora",
});

interface CalculadoraPageProps {
  searchParams: Promise<{ destino?: string }>;
}

export default async function CalculadoraPage({
  searchParams,
}: CalculadoraPageProps) {
  const params = await searchParams;
  const destinoSlug =
    typeof params.destino === "string" ? params.destino : null;

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Calculadora" },
        ]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Orçar</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Calculadora de viagem
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Informe seus próprios valores e veja o total, o valor por pessoa, a
          distribuição por categoria e quanto guardar por mês. Nenhum número é
          consultado em tempo real — o cálculo usa apenas o que você informa.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          }
        >
          <CalculatorTool
            destinations={allDestinations}
            initialDestinationSlug={destinoSlug}
          />
        </Suspense>
      </div>
    </div>
  );
}
