/**
 * =====================================================================
 * RotaClara — Índice de guias editoriais
 * =====================================================================
 */

import type { Guide } from "@/lib/domain/types";
import { guidesGroupOne } from "@/data/guides/group-one";
import { guidesGroupTwo } from "@/data/guides/group-two";

/** Todos os guias publicados na v1. */
export const allGuides: readonly Guide[] = [
  ...guidesGroupOne,
  ...guidesGroupTwo,
] as const;

const guideBySlug = new Map<string, Guide>(allGuides.map((g) => [g.slug, g]));

/** Busca um guia pelo slug do destino. */
export function getGuide(slug: string): Guide | undefined {
  return guideBySlug.get(slug);
}

/** Lista de slugs com guia — usado no sitemap. */
export function getAllGuideSlugs(): string[] {
  return allGuides.map((g) => g.slug);
}
