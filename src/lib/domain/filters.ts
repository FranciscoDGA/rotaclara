/**
 * =====================================================================
 * RotaClara — Filtros de descoberta de destinos
 * ---------------------------------------------------------------------
 * Filtragem pura e testável. Quando um filtro não tem dados suficientes,
 * a função sinaliza isso em vez de devolver resultado vazio silencioso.
 * =====================================================================
 */

import type { Destination, Region, TravelTag } from "@/lib/domain/types";

/** Faixas de orçamento disponíveis no filtro. */
export type BudgetBand = "ate_200" | "200_400" | "400_700" | "acima_700" | "qualquer";

/** Faixas de duração. */
export type DurationBand = "fim_de_semana" | "ate_5_dias" | "uma_semana" | "mais_de_10" | "qualquer";

/** Estado completo dos filtros. */
export interface DestinationFilters {
  search: string;
  regions: Region[];
  states: string[];
  countries: string[];
  tags: TravelTag[];
  budgetBand: BudgetBand;
  durationBand: DurationBand;
  /** Índices de meses (0–11). Vazio = qualquer época. */
  months: number[];
}

/** Estado vazio (sem filtros aplicados). */
export function emptyFilters(): DestinationFilters {
  return {
    search: "",
    regions: [],
    states: [],
    countries: [],
    tags: [],
    budgetBand: "qualquer",
    durationBand: "qualquer",
    months: [],
  };
}

/** Indica se algum filtro está ativo. */
export function hasActiveFilters(filters: DestinationFilters): boolean {
  return (
    filters.search.trim().length > 0 ||
    filters.regions.length > 0 ||
    filters.states.length > 0 ||
    filters.countries.length > 0 ||
    filters.tags.length > 0 ||
    filters.budgetBand !== "qualquer" ||
    filters.durationBand !== "qualquer" ||
    filters.months.length > 0
  );
}

/** Conta quantos filtros estão ativos (para o badge da UI). */
export function activeFilterCount(filters: DestinationFilters): number {
  let count = 0;
  if (filters.search.trim()) count++;
  count += filters.regions.length;
  count += filters.states.length;
  count += filters.countries.length;
  count += filters.tags.length;
  if (filters.budgetBand !== "qualquer") count++;
  if (filters.durationBand !== "qualquer") count++;
  if (filters.months.length > 0) count++;
  return count;
}

/* =====================================================================
   Testes individuais
 * ===================================================================== */

/** Normaliza texto para comparação sem acento e caixa. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Busca por nome, estado, UF, tags ou introdução. */
export function matchesSearch(destination: Destination, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  const haystack = normalize(
    [
      destination.name,
      destination.state,
      destination.stateUF,
      destination.region,
      destination.tagline,
      destination.intro,
      destination.tags.join(" "),
      destination.highlights.join(" "),
    ].join(" "),
  );

  // Todos os termos da busca devem aparecer (AND).
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

/** Limites das faixas de orçamento (diário por pessoa, em BRL). */
const BUDGET_BANDS: Record<Exclude<BudgetBand, "qualquer">, [number, number]> = {
  ate_200: [0, 200],
  "200_400": [200, 400],
  "400_700": [400, 700],
  acima_700: [700, Number.POSITIVE_INFINITY],
};

/**
 * Verifica se o destino cabe na faixa de orçamento.
 * Usa a MEIO da faixa do destino — critério declarado e estável.
 */
export function matchesBudget(
  destination: Destination,
  band: BudgetBand,
): boolean {
  if (band === "qualquer") return true;
  const range = BUDGET_BANDS[band];
  if (!range) return true;

  const midpoint =
    (destination.cost.minPerDayBRL + destination.cost.maxPerDayBRL) / 2;

  // Sobreposição de faixas: aceita se alguma parte se intercepta.
  const destMin = destination.cost.minPerDayBRL;
  const destMax = destination.cost.maxPerDayBRL;
  const overlaps = destMax >= range[0] && destMin <= range[1];
  return overlaps || (midpoint >= range[0] && midpoint <= range[1]);
}

/** Limites das faixas de duração (dias recomendados). */
const DURATION_BANDS: Record<Exclude<DurationBand, "qualquer">, [number, number]> = {
  fim_de_semana: [1, 3],
  ate_5_dias: [3, 5],
  uma_semana: [5, 8],
  mais_de_10: [10, 365],
};

/** Verifica se a duração recomendada do destino casa com a faixa. */
export function matchesDuration(
  destination: Destination,
  band: DurationBand,
): boolean {
  if (band === "qualquer") return true;
  const range = DURATION_BANDS[band];
  if (!range) return true;

  const { min, max } = destination.recommendedDays;
  return max >= range[0] && min <= range[1];
}

/** Verifica se o destino tem boa época em algum dos meses filtrados. */
export function matchesMonths(
  destination: Destination,
  months: readonly number[],
): boolean {
  if (months.length === 0) return true;
  return months.some((m) => destination.bestMonths.includes(m));
}

/** Verifica se o destino atende TODAS as tags selecionadas (AND). */
export function matchesTags(
  destination: Destination,
  tags: readonly TravelTag[],
): boolean {
  if (tags.length === 0) return true;
  return tags.every((tag) => destination.tags.includes(tag));
}

/* =====================================================================
   Filtragem principal
 * ===================================================================== */

export interface FilterOutcome {
  results: Destination[];
  /** Total antes dos filtros. */
  total: number;
  /** `true` quando filtros ativos zeraram o resultado. */
  emptyBecauseOfFilters: boolean;
  /**
   * Filtros que não combinaram com NENHUM destino — a UI deve avisar
   * que não há dados suficientes em vez de mostrar lista vazia em silêncio.
   */
  unmatchedFilters: string[];
}

/** Aplica todos os filtros e explica o que zerou o resultado. */
export function filterDestinations(
  all: readonly Destination[],
  filters: DestinationFilters,
): FilterOutcome {
  const results = all.filter((d) => {
    if (!matchesSearch(d, filters.search)) return false;
    if (filters.regions.length > 0 && !filters.regions.includes(d.region)) return false;
    if (filters.states.length > 0 && !filters.states.includes(d.stateUF)) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(d.country)) return false;
    if (!matchesTags(d, filters.tags)) return false;
    if (!matchesBudget(d, filters.budgetBand)) return false;
    if (!matchesDuration(d, filters.durationBand)) return false;
    if (!matchesMonths(d, filters.months)) return false;
    return true;
  });

  const active = hasActiveFilters(filters);
  const unmatched: string[] = [];

  if (active && results.length === 0) {
    // Identifica qual filtro isoladamente zera a lista.
    if (filters.regions.length > 0) {
      const any = all.some((d) => filters.regions.includes(d.region));
      if (!any) unmatched.push(`região: ${filters.regions.join(", ")}`);
    }
    if (filters.states.length > 0) {
      const any = all.some((d) => filters.states.includes(d.stateUF));
      if (!any) unmatched.push(`estado: ${filters.states.join(", ")}`);
    }
    if (filters.budgetBand !== "qualquer") {
      const any = all.some((d) => matchesBudget(d, filters.budgetBand));
      if (!any) unmatched.push("faixa de orçamento");
    }
    if (filters.durationBand !== "qualquer") {
      const any = all.some((d) => matchesDuration(d, filters.durationBand));
      if (!any) unmatched.push("faixa de duração");
    }
    if (filters.months.length > 0) {
      const any = all.some((d) => matchesMonths(d, filters.months));
      if (!any) unmatched.push("época do ano");
    }
    if (filters.tags.length > 0) {
      const any = all.some((d) => matchesTags(d, filters.tags));
      if (!any) unmatched.push(`perfis: ${filters.tags.join(", ")}`);
    }
    if (filters.search.trim()) {
      const any = all.some((d) => matchesSearch(d, filters.search));
      if (!any) unmatched.push(`busca: "${filters.search.trim()}"`);
    }
  }

  return {
    results,
    total: all.length,
    emptyBecauseOfFilters: active && results.length === 0,
    unmatchedFilters: unmatched,
  };
}

/** Agrupa destinos por perfil para as seções da homepage. */
export function groupByTag(
  all: readonly Destination[],
  tag: TravelTag,
): Destination[] {
  return all.filter((d) => d.tags.includes(tag));
}

/** Extrai estados únicos presentes na base, em ordem alfabética. */
export function availableStates(all: readonly Destination[]): { uf: string; name: string }[] {
  const map = new Map<string, string>();
  for (const d of all) {
    if (!map.has(d.stateUF)) map.set(d.stateUF, d.state);
  }
  return [...map.entries()]
    .map(([uf, name]) => ({ uf, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

/** Extrai regiões únicas na base. */
export function availableRegions(all: readonly Destination[]): Region[] {
  const set = new Set<Region>();
  for (const d of all) set.add(d.region);
  const order: Region[] = ["Sudeste", "Nordeste", "Sul", "Centro-Oeste", "Norte"];
  return order.filter((r) => set.has(r));
}

/** Ordena por relevância editorial (score decrescente). */
export function sortByEditorialScore(all: readonly Destination[]): Destination[] {
  return [...all].sort((a, b) => b.editorialScore - a.editorialScore);
}
