/**
 * =====================================================================
 * RotaClara — Artigos de cauda longa (motor editorial)
 * ---------------------------------------------------------------------
 * Artigos respondem a perguntas de intenção específica ("quanto custa
 * ir a X", "melhor época para Y") e apontam para os pilares de
 * destino e para as ferramentas. Números NUNCA são escritos à mão:
 * os artigos derivam da base de destinos auditada (`src/data/destinations`),
 * de modo que dado atualizado atualiza o texto junto.
 * =====================================================================
 */

import type { FaqItem } from "@/lib/domain/types";

/** Arquétipos editoriais — cada um cobre uma intenção de busca. */
export type ArticleArchetype = "custo" | "epoca" | "comparativo" | "roteiro";

/** Rótulo legível de cada arquétipo. */
export const ARCHETYPE_LABEL: Record<ArticleArchetype, string> = {
  custo: "Custo de viagem",
  epoca: "Melhor época",
  comparativo: "Comparativo",
  roteiro: "Roteiro",
};

/** Descrição curta de cada arquétipo (índice e metadados). */
export const ARCHETYPE_SUMMARY: Record<ArticleArchetype, string> = {
  custo: "Quanto custa, o que inclui e de onde vem o número.",
  epoca: "Quando ir: clima, chuva e melhores meses.",
  comparativo: "Dois destinos lado a lado, com critério declarado.",
  roteiro: "O que fazer dia a dia, com tempo e entradas.",
};

export interface ArticleTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Lista de pontos (dias do roteiro, meses do clima etc.). */
  bullets?: string[];
  /** Tabela opcional para detalhamento de custos ou comparativos. */
  table?: ArticleTable;
}

export interface Article {
  /** URL amigável: `/artigos/[slug]`. */
  slug: string;
  /** H1 do artigo. */
  title: string;
  /** Lead — primeiro parágrafo sob o título. */
  deck: string;
  /** Meta description (≤ 160 caracteres), escrita à mão. */
  description: string;
  archetype: ArticleArchetype;
  /** Pilares de destino vinculados (1 ou 2) — fontes dos números. */
  destinationSlugs: string[];
  /** Data editorial em ISO (YYYY-MM-DD). */
  updatedAt: string;
  /** Caminho da foto principal do artigo em `public/` (ex.: `/images/artigos/...`). */
  image?: string;
  /** Texto alternativo descritivo da foto principal. */
  imageAlt?: string;
  sections: ArticleSection[];
  faq: FaqItem[];
}
