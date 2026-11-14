/**
 * =====================================================================
 * RotaClara — Comparador de destinos
 * ---------------------------------------------------------------------
 * Regra de transparência: NENHUM ranking é produzido. O comparador
 * apresenta critérios, valores e a razão de cada "vantagem" declarada.
 * Quando não há base para comparar, o valor é "sem dado disponível".
 * =====================================================================
 */

import type {
  CompareCriterion,
  CompareResult,
  CompareRow,
  Destination,
  Region,
} from "@/lib/domain/types";
import { formatMonthsShort, formatDuration } from "@/lib/format/format";

/** Ordem dos critérios na exibição. */
export const COMPARE_CRITERIA: readonly CompareCriterion[] = [
  "costLevel",
  "distance",
  "bestMonths",
  "recommendedDays",
  "climate",
  "profile",
  "attractions",
  "lodging",
  "transport",
] as const;

const CRITERIA_LABELS: Record<CompareCriterion, string> = {
  costLevel: "Custo estimado",
  distance: "Distância desde São Paulo",
  bestMonths: "Melhor época",
  recommendedDays: "Duração recomendada",
  climate: "Clima (referência)",
  profile: "Perfil de viagem",
  attractions: "Atrações na base",
  lodging: "Hospedagem",
  transport: "Como chegar",
};

/** Nível ordinal para comparação de custo. */
const COST_LEVEL_RANK: Record<string, number> = {
  economico: 1,
  moderado: 2,
  conforto: 3,
  premium: 4,
};

const NO_DATA = "Sem dado disponível";

/* =====================================================================
   Valores por critério
   ===================================================================== */

function costValue(d: Destination): string {
  const label: Record<string, string> = {
    economico: "Econômico",
    moderado: "Moderado",
    conforto: "Conforto",
    premium: "Premium",
  };
  return `${label[d.costLevel] ?? d.costLevel} · R$ ${d.cost.minPerDayBRL}–${d.cost.maxPerDayBRL}/dia`;
}

function distanceValue(d: Destination): string {
  const ref = d.referenceFromSaoPaulo;
  if (!ref || ref.distanceKm === null) return NO_DATA;
  const km = `${ref.distanceKm.toLocaleString("pt-BR")} km`;
  if (ref.flightMinutes === null) return km;
  return `${km} · ${formatDuration(ref.flightMinutes)} de voo`;
}

function bestMonthsValue(d: Destination): string {
  if (d.bestMonths.length === 0) return NO_DATA;
  return formatMonthsShort(d.bestMonths);
}

function recommendedDaysValue(d: Destination): string {
  const { min, max } = d.recommendedDays;
  return min === max ? `${min} dias` : `${min} a ${max} dias`;
}

function climateValue(d: Destination): string {
  // Média dos máximos anuais — agregação simples e declarada.
  const temps = d.climateByMonth.map((m) => m.temperatureC.max);
  if (temps.length === 0) return NO_DATA;
  const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
  const wetMonths = d.climateByMonth.filter((m) => m.rainfall === "chuvoso").length;
  const rainNote =
    wetMonths >= 6 ? "muita chuva" : wetMonths >= 3 ? "chuva moderada" : "estação seca";
  return `≈ ${Math.round(avg)}°C máximo · ${rainNote}`;
}

function profileValue(d: Destination): string {
  return d.tags.slice(0, 4).join(", ") || NO_DATA;
}

function attractionsValue(d: Destination): string {
  const count = d.attractions.length;
  if (count === 0) return NO_DATA;
  return `${count} ${count === 1 ? "atração" : "atrações"} verificadas`;
}

function lodgingValue(d: Destination): string {
  if (d.lodgingAreas.length === 0) return NO_DATA;
  return d.lodgingAreas.map((l) => l.name).join(", ");
}

function transportValue(d: Destination): string {
  return d.howToArrive || NO_DATA;
}

const VALUE_GETTERS: Record<CompareCriterion, (d: Destination) => string> = {
  costLevel: costValue,
  distance: distanceValue,
  bestMonths: bestMonthsValue,
  recommendedDays: recommendedDaysValue,
  climate: climateValue,
  profile: profileValue,
  attractions: attractionsValue,
  lodging: lodgingValue,
  transport: transportValue,
};

/* =====================================================================
   Determinação de vantagem
   ===================================================================== */

interface Advantage {
  index: number | null;
  rationale?: string;
}

/**
 * Define qual destino apresenta vantagem no critério.
 * Retorna `index: null` quando é empate, critério subjetivo ou sem dado.
 */
function determineAdvantage(
  criterion: CompareCriterion,
  destinations: readonly Destination[],
): Advantage {
  if (destinations.length < 2) return { index: null };

  switch (criterion) {
    case "costLevel": {
      // Menor custo relativo = vantagem econômica.
      const ranks = destinations.map((d) => COST_LEVEL_RANK[d.costLevel] ?? 2);
      const min = Math.min(...ranks);
      const winners = ranks.filter((r) => r === min).length;
      if (winners > 1) return { index: null };
      return {
        index: ranks.indexOf(min),
        rationale: "Menor custo diário estimado entre os destinos comparados.",
      };
    }

    case "distance": {
      // Menor distância aérea desde a referência = menos tempo de deslocamento.
      const distances = destinations.map(
        (d) => d.referenceFromSaoPaulo?.distanceKm ?? null,
      );
      if (distances.some((v) => v === null)) return { index: null };
      const valid = distances as number[];
      const min = Math.min(...valid);
      const winners = valid.filter((v) => v === min).length;
      if (winners > 1) return { index: null };
      return {
        index: valid.indexOf(min),
        rationale: "Menor distância desde São Paulo — menos tempo em deslocamento.",
      };
    }

    case "recommendedDays": {
      // Curta duração = vantagem para quem tem pouco tempo.
      const mins = destinations.map((d) => d.recommendedDays.min);
      const min = Math.min(...mins);
      const winners = mins.filter((v) => v === min).length;
      if (winners > 1) return { index: null };
      return {
        index: mins.indexOf(min),
        rationale: "Exige menos dias — melhor para janelas curtas de folga.",
      };
    }

    case "attractions": {
      const counts = destinations.map((d) => d.attractions.length);
      if (counts.some((c) => c === 0)) return { index: null };
      const max = Math.max(...counts);
      const winners = counts.filter((c) => c === max).length;
      if (winners > 1) return { index: null };
      return {
        index: counts.indexOf(max),
        rationale: "Maior número de atrações com conteúdo verificado na base.",
      };
    }

    // Critérios subjetivos ou sem base quantitativa: nunca marcamos "melhor".
    case "bestMonths":
    case "climate":
    case "profile":
    case "lodging":
    case "transport":
      return { index: null };
  }
}

/* =====================================================================
   Função principal
   ===================================================================== */

/**
 * Compara até 3 destinos.
 * Retorna `null` se a seleção for inválida (menos de 2 ou mais de 3).
 */
export function compareDestinations(
  destinations: readonly Destination[],
): CompareResult | null {
  const selected = destinations.slice(0, 3);
  if (selected.length < 2) return null;

  const rows: CompareRow[] = COMPARE_CRITERIA.map((criterion) => {
    const { index, rationale } = determineAdvantage(criterion, selected);
    const row: CompareRow = {
      criterion,
      label: CRITERIA_LABELS[criterion],
      values: selected.map((d) => VALUE_GETTERS[criterion](d)),
      betterIndex: index,
    };
    if (rationale) row.rationale = rationale;
    return row;
  });

  return {
    destinations: selected,
    rows,
    differences: buildDifferences(selected),
    methodology:
      "O comparador lista critérios objetivos com seus valores de origem. " +
      "Marcamos um destino como " +
      "\"melhor\" apenas quando há diferença mensurável e o critério é " +
      "declarado (custo, distância, duração e volume de conteúdo). Critérios " +
      "subjetivos como clima, perfil e hospedagem são exibidos sem ranking. " +
      "Não geramos listas de " +
      "\"top destinos\" sem critérios transparentes.",
  };
}

/** Gera frases de diferença objetiva entre os destinos. */
function buildDifferences(destinations: readonly Destination[]): string[] {
  const diffs: string[] = [];

  // Faixa de custo.
  const costs = destinations.map((d) => d.cost.maxPerDayBRL);
  const cheapest = Math.min(...costs);
  const priciest = Math.max(...costs);
  if (cheapest !== priciest) {
    const cheapDest = destinations.find((d) => d.cost.maxPerDayBRL === cheapest);
    const pricyDest = destinations.find((d) => d.cost.maxPerDayBRL === priciest);
    if (cheapDest && pricyDest && cheapDest.slug !== pricyDest.slug) {
      diffs.push(
        `${cheapDest.name} tem o topo da faixa diária mais baixo (R$ ${cheapest}) ` +
          `entre os comparados; ${pricyDest.name} chega a R$ ${priciest} por dia.`,
      );
    }
  }

  // Duração.
  const maxDays = Math.max(...destinations.map((d) => d.recommendedDays.max));
  const minDays = Math.min(...destinations.map((d) => d.recommendedDays.min));
  if (maxDays !== minDays) {
    const long = destinations.find((d) => d.recommendedDays.max === maxDays);
    const short = destinations.find((d) => d.recommendedDays.min === minDays);
    if (long && short && long.slug !== short.slug) {
      diffs.push(
        `${long.name} pede até ${maxDays} dias para ser bem aproveitado; ` +
          `${short.name} pode ser visto em ${minDays} dia(s).`,
      );
    }
  }

  // Melhor época sobreposta?
  const overlap = intersectMonths(destinations);
  diffs.push(
    overlap.length > 0
      ? `Há sobreposição de boa época em: ${formatMonthsShort(overlap)}.`
      : "As boas épocas não se sobrepõem — será preciso escolher entre calendários.",
  );

  // Regiões diferentes.
  const regions = new Set<Region>(destinations.map((d) => d.region));
  if (regions.size > 1) {
    diffs.push(
      `Destinos em regiões distintas (${[...regions].join(", ")}) — ` +
        "clima, cultura e custo de deslocamento variam entre eles.",
    );
  }

  return diffs;
}

/** Interseção dos meses considerados bons entre todos os destinos. */
function intersectMonths(destinations: readonly Destination[]): number[] {
  if (destinations.length === 0) return [];
  const first = new Set(destinations[0]?.bestMonths ?? []);
  let result = [...first];

  for (let i = 1; i < destinations.length; i++) {
    const set = new Set(destinations[i]?.bestMonths ?? []);
    result = result.filter((m) => set.has(m));
  }

  return result.sort((a, b) => a - b);
}
