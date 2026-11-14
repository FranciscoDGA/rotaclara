/**
 * =====================================================================
 * RotaClara — /destinos (descobrir destinos)
 * ---------------------------------------------------------------------
 * Server component com metadata própria. O explorador usa
 * `useSearchParams`, por isso é envolvido em <Suspense>.
 * =====================================================================
 */

import type { Metadata } from "next";
import { Suspense } from "react";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Skeleton } from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import type { TravelTag } from "@/lib/domain/types";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Descobrir destinos",
  description:
    "Explore destinos do Brasil por perfil, região, estado, orçamento diário, " +
    "duração da viagem e época do ano. Estimativas de planejamento com " +
    "metodologia visível.",
  path: "/destinos",
});

/** Perfis válidos reconhecidos pela URL (?perfil=...). */
const VALID_TAGS: TravelTag[] = [
  "praia",
  "natureza",
  "cidade",
  "cultura",
  "gastronomia",
  "aventura",
  "familia",
  "romantico",
  "economico",
  "luxo",
  "historico",
  "vida_noturna",
];

interface DestinosPageProps {
  searchParams: Promise<{ perfil?: string; busca?: string }>;
}

export default async function DestinosPage({ searchParams }: DestinosPageProps) {
  const params = await searchParams;

  const rawPerfil = params.perfil ?? "";
  const initialTag: TravelTag | undefined = VALID_TAGS.find((t) => t === rawPerfil);
  const initialSearch = typeof params.busca === "string" ? params.busca : "";

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Destinos" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Descobrir</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Destinos do Brasil
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Filtre por perfil de viagem, região, orçamento diário, duração e época
          do ano. Cada destino tem guia editorial com fontes, metodologia de
          custo e data de atualização.
        </p>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-72 w-full" />
                ))}
              </div>
            </div>
          }
        >
          <DestinationExplorer
            destinations={allDestinations}
            {...(initialTag ? { initialTag } : {})}
            initialSearch={initialSearch}
          />
        </Suspense>
      </div>
    </div>
  );
}
