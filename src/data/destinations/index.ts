/**
 * =====================================================================
 * RotaClara — Índice central de destinos
 * ---------------------------------------------------------------------
 * Ponto único de acesso à base editorial. Qualquer camada (rotas,
 * componentes, planejador, comparador) importa daqui.
 *
 * PARA ADICIONAR UM DESTINO:
 *  1. Crie o objeto em um arquivo de grupo (ou crie um novo grupo).
 *  2. Registre fontes em `sources` e data em `updatedAt`.
 *  3. Mantenha `cost` com `methodology`, `referenceDate` e `limitations`.
 *  4. Exporte no array de `allDestinations` abaixo.
 *  5. Execute `npm run typecheck` para validar a estrutura.
 * =====================================================================
 */

import type { Attraction, Destination } from "@/lib/domain/types";
import { destinationsGroupOne } from "@/data/destinations/group-one";
import { destinationsGroupTwo } from "@/data/destinations/group-two";
import { destinationsGroupThree } from "@/data/destinations/group-three";

/** Todos os destinos publicados na base editorial (15 destinos). */
export const allDestinations: readonly Destination[] = [
  ...destinationsGroupOne,
  ...destinationsGroupTwo,
  ...destinationsGroupThree,
] as const;

/** Mapa slug → destino, para acesso O(1). */
const destinationBySlug = new Map<string, Destination>(
  allDestinations.map((d) => [d.slug, d]),
);

/** Busca um destino pelo slug. Retorna `undefined` se não existir. */
export function getDestination(slug: string): Destination | undefined {
  return destinationBySlug.get(slug);
}

/** Lista de slugs — usado no sitemap e nas rotas estáticas. */
export function getAllDestinationSlugs(): string[] {
  return allDestinations.map((d) => d.slug);
}

/** Destinos em destaque (maior score editorial). */
export function getFeaturedDestinations(limit = 6): Destination[] {
  return [...allDestinations]
    .sort((a, b) => b.editorialScore - a.editorialScore)
    .slice(0, limit);
}

/** Slugs relacionados: mesma região primeiro, depois mesma tag. */
export function getRelatedDestinations(
  slug: string,
  limit = 3,
): Destination[] {
  const current = getDestination(slug);
  if (!current) return [];

  const scored = allDestinations
    .filter((d) => d.slug !== slug)
    .map((d) => {
      let score = 0;
      if (d.region === current.region) score += 3;
      score += d.tags.filter((t) => current.tags.includes(t)).length;
      if (d.costLevel === current.costLevel) score += 1;
      return { d, score };
    })
    .sort((a, b) => b.score - a.score || b.d.editorialScore - a.d.editorialScore);

  return scored.slice(0, limit).map((s) => s.d);
}

/** Mapa id → atração, para lookup rápido no planejador. */
const attractionById = new Map<string, Attraction>(
  allDestinations.flatMap((d) => d.attractions).map((a) => [a.id, a]),
);

/** Busca uma atração pelo id. Retorna `undefined` se não existir. */
export function getAttractionById(id: string): Attraction | undefined {
  return attractionById.get(id);
}

/** Estatísticas agregadas da base — usadas na homepage. */
export function getDestinationStats(): {
  total: number;
  states: number;
  regions: number;
  attractions: number;
} {
  const states = new Set(allDestinations.map((d) => d.stateUF));
  const regions = new Set(allDestinations.map((d) => d.region));
  const attractions = allDestinations.reduce(
    (sum, d) => sum + d.attractions.length,
    0,
  );

  return {
    total: allDestinations.length,
    states: states.size,
    regions: regions.size,
    attractions,
  };
}
