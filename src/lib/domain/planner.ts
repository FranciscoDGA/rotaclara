/**
 * =====================================================================
 * RotaClara — Regras do planejador de viagens
 * ---------------------------------------------------------------------
 * Gera uma estrutura de viagem coerente a partir das entradas do usuário.
 *
 * GARANTIA DE INTEGRIDADE: o planejador NÃO consulta preços, horários,
 * distâncias nem disponibilidade. Ele usa exclusivamente:
 *   - datas informadas pelo usuário;
 *   - estimativas de custo declaradas no destino (com metodologia);
 *   - atrações existentes na base editorial.
 * Quando falta informação, o resultado registra um alerta — não inventa.
 * =====================================================================
 */

import type {
  BudgetSlice,
  Destination,
  ExpenseCategory,
  PlannerAlert,
  PlannerInput,
  PlannerResult,
  SuggestedDay,
  TravelTag,
} from "@/lib/domain/types";
import { addDaysISO, daysBetweenISO, todayISO } from "@/lib/format/format";

/* =====================================================================
   Distribuição de orçamento
   ===================================================================== */

/** Percentuais de referência por estilo de viagem (soma = 1). */
const STYLE_BUDGET_SPLIT: Record<string, Partial<Record<ExpenseCategory, number>>> = {
  economico: {
    hospedagem: 0.24,
    alimentacao: 0.22,
    transporte: 0.24,
    passeios: 0.16,
    outras: 0.14,
  },
  relaxado: {
    hospedagem: 0.34,
    alimentacao: 0.24,
    transporte: 0.2,
    passeios: 0.14,
    outras: 0.08,
  },
  equilibrado: {
    hospedagem: 0.3,
    alimentacao: 0.24,
    transporte: 0.22,
    passeios: 0.16,
    outras: 0.08,
  },
  intenso: {
    hospedagem: 0.24,
    alimentacao: 0.2,
    transporte: 0.24,
    passeios: 0.24,
    outras: 0.08,
  },
  aventura: {
    hospedagem: 0.24,
    alimentacao: 0.2,
    transporte: 0.26,
    passeios: 0.22,
    outras: 0.08,
  },
  luxo: {
    hospedagem: 0.4,
    alimentacao: 0.26,
    transporte: 0.18,
    passeios: 0.1,
    outras: 0.06,
  },
};

/**
 * Monta a fatia de orçamento por categoria.
 * Os percentuais são normalizados para somar exatamente 1.
 */
export function buildBudgetSlices(
  totalBRL: number,
  style: string,
): BudgetSlice[] {
  const split = STYLE_BUDGET_SPLIT[style] ?? STYLE_BUDGET_SPLIT.equilibrado!;
  const entries = Object.entries(split) as [ExpenseCategory, number][];
  const sum = entries.reduce((acc, [, share]) => acc + share, 0);

  return entries
    .map(([category, share]) => ({
      category,
      share: share / sum,
      amountBRL: (totalBRL * share) / sum,
    }))
    .sort((a, b) => b.share - a.share);
}

/* =====================================================================
   Estimativa de custo total
   ===================================================================== */

/** Multiplicadores de faixa de hospedagem sobre a faixa do destino. */
const LODGING_MULTIPLIER: Record<PlannerInput["lodgingPreference"], number> = {
  economico: 0.7,
  padrao: 1,
  conforto: 1.35,
  luxo: 2.1,
};

/**
 * Estima o custo total usando a faixa declarada do destino.
 *
 * Transparência: o retorno inclui `methodology` e `referenceDate`,
 * que DEVEM ser exibidos ao usuário junto com o valor.
 */
export function estimateTripCost(
  destination: Destination | null,
  input: PlannerInput,
): { totalBRL: number; methodology: string; referenceDate: string } {
  const days = Math.max(1, getTripDays(input));
  const travelers = Math.max(1, input.adults + input.children);

  if (!destination) {
    return {
      totalBRL: 0,
      methodology:
        "Sem destino selecionado na base editorial, nenhuma estimativa é " +
        "gerada. Use a Calculadora de Viagem informando seus próprios valores.",
      referenceDate: todayISO(),
    };
  }

  const mult = LODGING_MULTIPLIER[input.lodgingPreference] ?? 1;
  const midpoint =
    ((destination.cost.minPerDayBRL + destination.cost.maxPerDayBRL) / 2) * mult;

  const totalBRL = midpoint * days * travelers;

  return {
    totalBRL: Math.round(totalBRL),
    methodology:
      `${destination.cost.methodology} O valor considera ${days} dia(s) ` +
      `para ${travelers} pessoa(s), faixa de hospedagem ` +
      `"${input.lodgingPreference}" e estilo "${input.tripStyle}".`,
    referenceDate: destination.cost.referenceDate,
  };
}

/** Total de dias de viagem a partir das datas informadas. */
export function getTripDays(input: PlannerInput): number {
  if (!input.departureDate || !input.returnDate) return 0;
  const diff = daysBetweenISO(input.departureDate, input.returnDate);
  return diff > 0 ? diff : 0;
}

/** Número de noites (dias - 1, mínimo 0). */
export function getNights(input: PlannerInput): number {
  return Math.max(0, getTripDays(input) - 1);
}

/* =====================================================================
   Seleção de atrações
   ===================================================================== */

/**
 * Seleciona atrações compatíveis com os interesses.
 *
 * Ordenação determinística: primeiro por número de interesses atendidos,
 * depois por ordem editorial. Se não houver interesses, usa a lista completa
 * na ordem original — nunca inventa atração fora da base.
 */
export function selectAttractions(
  destination: Destination | null,
  interests: readonly TravelTag[],
  limit = 8,
): string[] {
  if (!destination) return [];

  const scored = destination.attractions.map((attraction) => {
    const matches = interests.filter((interest) =>
      attraction.tags.includes(interest),
    ).length;
    return { id: attraction.id, matches };
  });

  const ranked = interests.length
    ? [...scored].sort((a, b) => b.matches - a.matches)
    : scored;

  return ranked.slice(0, limit).map((entry) => entry.id);
}

/* =====================================================================
   Organização dos dias
   ===================================================================== */

/** Foco temático de cada dia, rotacionando pelos interesses. */
const DAY_FOCUS: TravelTag[][] = [
  ["cidade", "cultura"],
  ["praia", "natureza"],
  ["gastronomia", "cultura"],
  ["aventura", "natureza"],
  ["familia", "cultura"],
  ["romantico", "gastronomia"],
];

/** Título padrão do dia quando não há foco definido. */
function dayTitle(index: number, focus: TravelTag[]): string {
  if (focus.length === 0) return `Dia ${index + 1}`;
  const label = focus.join(" e ");
  return `Dia ${index + 1} — ${label}`;
}

/**
 * Distribui as atrações selecionadas entre os dias.
 * Distribuição equilibrada (round-robin) para evitar dias vazios.
 */
export function buildDays(
  input: PlannerInput,
  attractionIds: readonly string[],
): SuggestedDay[] {
  const totalDays = getTripDays(input);
  if (totalDays <= 0) return [];

  const baseDate = input.departureDate || null;
  const days: SuggestedDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const focus = DAY_FOCUS[i % (DAY_FOCUS.length as number)] ?? [];
    const assigned: string[] = [];

    // Round-robin: cada dia recebe uma fatia das atrações.
    for (let j = i; j < attractionIds.length; j += totalDays) {
      const id = attractionIds[j];
      if (id) assigned.push(id);
    }

    days.push({
      day: i + 1,
      date: baseDate ? addDaysISO(baseDate, i) : null,
      title: dayTitle(i, focus),
      focus,
      activityIds: assigned,
      notes:
        assigned.length === 0
          ? "Sem atrações sugeridas para este dia — inclua atividades manualmente no construtor de roteiro."
          : "",
    });
  }

  return days;
}

/* =====================================================================
   Alertas de transparência
   ===================================================================== */

/**
 * Gera os alertas que DEVEM acompanhar qualquer resultado.
 * A ausência de API de preços/horários é sempre comunicada.
 */
export function buildAlerts(
  input: PlannerInput,
  destination: Destination | null,
  estimateTotalBRL: number,
): PlannerAlert[] {
  const alerts: PlannerAlert[] = [];

  alerts.push({
    id: "sem-tempo-real",
    severity: "atencao",
    title: "Estimativas, não cotações em tempo real",
    detail:
      "A RotaClara não consulta preços de passagens, hotéis ou passeios neste " +
      "momento. Os valores mostrados são estimativas de planejamento com " +
      "metodologia e data de referência visíveis. Confirme com os " +
      "provedores antes de reservar.",
  });

  if (!destination) {
    alerts.push({
      id: "destino-fora-da-base",
      severity: "info",
      title: "Destino fora da base editorial",
      detail:
        "Este destino ainda não tem dados verificados na RotaClara. O " +
        "planejador montou a estrutura de dias, mas não gerou estimativa de " +
        "custo nem sugestão de atrações. Use a Calculadora com seus próprios valores.",
    });
  }

  if (estimateTotalBRL > 0 && input.budgetBRL && input.budgetBRL > 0) {
    const delta = input.budgetBRL - estimateTotalBRL;
    if (delta < 0) {
      alerts.push({
        id: "acima-do-orcamento",
        severity: "atencao",
        title: "Estimativa acima do orçamento informado",
        detail:
          `A estimativa em ${estimateTotalBRL.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })} excede o orçamento em ` +
          `${Math.abs(delta).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}. Considere reduzir a duração, mudar a época ou revisar a faixa de hospedagem.`,
      });
    }
  }

  if (input.children > 0 && !input.childAgeBand) {
    alerts.push({
      id: "idade-criancas",
      severity: "info",
      title: "Idade das crianças não informada",
      detail:
        "Idade influencia tarifas de transporte, alimentação e gratuidade em " +
        "atrações. Informe a faixa etária para estimativas mais precisas.",
    });
  }

  const days = getTripDays(input);
  if (days > 0 && days < 2) {
    alerts.push({
      id: "viagem-curta",
      severity: "info",
      title: "Viagem de menos de 2 dias",
      detail:
        "Com tão pouco tempo, priorize atrações próximas e evite deslocamentos " +
        "longos. O construtor de roteiro permite reorganizar as atividades.",
    });
  }

  if (destination && days > destination.recommendedDays.max) {
    alerts.push({
      id: "acima-da-duracao",
      severity: "info",
      title: "Duração acima da recomendada",
      detail:
        `Nossa referência editorial para ${destination.name} é de ` +
        `${destination.recommendedDays.min} a ${destination.recommendedDays.max} dias. ` +
        "Considere incluir bairros vizinhos ou excursões de um dia.",
    });
  }

  return alerts;
}

/* =====================================================================
   Função principal
   ===================================================================== */

/** Resultado vazio — usado quando não há dados suficientes. */
export function emptyPlannerResult(): PlannerResult {
  return {
    summary: { totalDays: 0, nights: 0, travelers: 0, label: "—" },
    budgetSlices: [],
    estimatedTotalBRL: 0,
    days: [],
    suggestedAttractionIds: [],
    alerts: [],
    methodology: "",
    referenceDate: todayISO(),
  };
}

/**
 * Gera o planejamento completo.
 * Retorna `null` quando as datas são inválidas — a UI deve pedir correção
 * em vez de exibir um resultado fabricado.
 */
export function planTrip(
  input: PlannerInput,
  destination: Destination | null,
): PlannerResult | null {
  const totalDays = getTripDays(input);
  if (totalDays <= 0) return null;
  if (input.adults + input.children < 1) return null;

  const { totalBRL, methodology, referenceDate } = estimateTripCost(
    destination,
    input,
  );

  const attractionIds = selectAttractions(destination, input.interests);
  const days = buildDays(input, attractionIds);
  const budgetSlices = totalBRL > 0 ? buildBudgetSlices(totalBRL, input.tripStyle) : [];

  return {
    summary: {
      totalDays,
      nights: getNights(input),
      travelers: input.adults + input.children,
      label: `${totalDays} ${totalDays === 1 ? "dia" : "dias"} · ${input.adults + input.children} ${input.adults + input.children === 1 ? "pessoa" : "pessoas"}`,
    },
    budgetSlices,
    estimatedTotalBRL: totalBRL,
    days,
    suggestedAttractionIds: attractionIds,
    alerts: buildAlerts(input, destination, totalBRL),
    methodology,
    referenceDate,
  };
}
