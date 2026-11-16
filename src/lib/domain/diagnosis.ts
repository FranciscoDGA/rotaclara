/**
 * =====================================================================
 * RotaClara — Diagnóstico Inteligente de Viagem
 * ---------------------------------------------------------------------
 * Analisa a viabilidade do orçamento do usuário em relação aos destinos
 * da base editorial, identificando despesas que podem comprometer a viagem,
 * destinos compatíveis e ajustes viáveis de corte de custos.
 *
 * Transparência: todas as estimativas usam a faixa base declarada
 * de cada destino, sem inventar preços em tempo real.
 * =====================================================================
 */

import type {
  Destination,
  ExpenseCategory,
  TravelTag,
  TripStyle,
} from "@/lib/domain/types";

export interface DiagnosisInput {
  origin: string;
  budgetBRL: number;
  durationDays: number;
  adults: number;
  children: number;
  tripStyle: TripStyle;
  interests: TravelTag[];
}

export type DestinationBudgetFit = "viavel" | "ajustavel" | "acima";

export interface DestinationDiagnosis {
  destination: Destination;
  estimatedCostBRL: number;
  differenceBRL: number;
  fit: DestinationBudgetFit;
  matchInterestsCount: number;
  dailyPerPersonBRL: number;
  budgetSharePct: number;
}

export interface RiskExpense {
  category: ExpenseCategory;
  title: string;
  detail: string;
  severity: "atencao" | "critico";
}

export interface CostAdjustmentTip {
  title: string;
  description: string;
  potentialSavingPct: number;
}

export interface DiagnosisResult {
  dailyAvailablePerPersonBRL: number;
  totalTravelers: number;
  totalDays: number;
  budgetBRL: number;
  compatibleDestinations: DestinationDiagnosis[];
  closeDestinations: DestinationDiagnosis[];
  overBudgetDestinations: DestinationDiagnosis[];
  riskExpenses: RiskExpense[];
  recommendedAdjustments: CostAdjustmentTip[];
  pendingConfirmations: string[];
}

/** Multiplicador do estilo de viagem sobre a faixa mediana do destino. */
const STYLE_MULTIPLIER: Record<TripStyle, number> = {
  economico: 0.75,
  relaxado: 1.0,
  equilibrado: 1.0,
  intenso: 1.15,
  aventura: 1.05,
  luxo: 2.1,
};

/**
 * Calcula a estimativa para um destino específico baseado na duração e viajantes.
 */
export function estimateDestinationTotal(
  dest: Destination,
  days: number,
  travelers: number,
  style: TripStyle,
): number {
  const mult = STYLE_MULTIPLIER[style] ?? 1.0;
  const baseMidpoint = (dest.cost.minPerDayBRL + dest.cost.maxPerDayBRL) / 2;
  const dailyPerPerson = baseMidpoint * mult;
  return Math.round(dailyPerPerson * days * travelers);
}

/**
 * Executa o diagnóstico completo.
 */
export function diagnoseTripBudget(
  input: DiagnosisInput,
  destinations: readonly Destination[],
): DiagnosisResult | null {
  const totalTravelers = input.adults + input.children;
  if (totalTravelers < 1 || input.durationDays < 1 || input.budgetBRL <= 0) {
    return null;
  }

  const dailyAvailablePerPersonBRL = Math.round(
    input.budgetBRL / (input.durationDays * totalTravelers),
  );

  const diagnoses: DestinationDiagnosis[] = destinations.map((dest) => {
    const estimatedCostBRL = estimateDestinationTotal(
      dest,
      input.durationDays,
      totalTravelers,
      input.tripStyle,
    );
    const diff = input.budgetBRL - estimatedCostBRL;
    const share = estimatedCostBRL / input.budgetBRL;

    let fit: DestinationBudgetFit = "viavel";
    if (diff < 0) {
      // Excede em até 20%
      fit = share <= 1.2 ? "ajustavel" : "acima";
    }

    const matched = input.interests.filter((tag) => dest.tags.includes(tag)).length;

    return {
      destination: dest,
      estimatedCostBRL,
      differenceBRL: diff,
      fit,
      matchInterestsCount: matched,
      dailyPerPersonBRL: Math.round(estimatedCostBRL / (input.durationDays * totalTravelers)),
      budgetSharePct: Math.round(share * 100),
    };
  });

  // Ordena por afinidade (fit e depois por match de interesses)
  const sortFn = (a: DestinationDiagnosis, b: DestinationDiagnosis) => {
    if (b.matchInterestsCount !== a.matchInterestsCount) {
      return b.matchInterestsCount - a.matchInterestsCount;
    }
    return b.differenceBRL - a.differenceBRL;
  };

  const compatibleDestinations = diagnoses.filter((d) => d.fit === "viavel").sort(sortFn);
  const closeDestinations = diagnoses.filter((d) => d.fit === "ajustavel").sort(sortFn);
  const overBudgetDestinations = diagnoses.filter((d) => d.fit === "acima").sort(sortFn);

  // Mapeamento de despesas de risco / ocultas
  const riskExpenses: RiskExpense[] = [];

  // Risco 1: Transporte aéreo de longa distância
  if (input.durationDays <= 4 && dailyAvailablePerPersonBRL < 250) {
    riskExpenses.push({
      category: "transporte",
      title: "Passagens aéreas em viagens curtas",
      detail:
        "Em viagens de até 4 dias, o deslocamento aéreo pode consumir mais de 40% do orçamento total. Considere destinos rodoviários mais próximos da sua origem.",
      severity: "atencao",
    });
  }

  // Risco 2: Destinos com taxas ou atrativos de valor elevado
  if (input.interests.includes("aventura") || input.interests.includes("natureza")) {
    riskExpenses.push({
      category: "passeios",
      title: "Passeios e flutuações com agendamento obrigatório",
      detail:
        "Destinos como Bonito e Chapada Diamantina possuem passeios com guias credenciados ou taxas de entrada que não costumam aceitar improviso e pesam na média diária.",
      severity: "atencao",
    });
  }

  // Risco 3: Margem para alimentação e traslados
  riskExpenses.push({
    category: "outras",
    title: "Despesas extras de deslocamento local",
    detail:
      "Traslados entre aeroportos e hotéis, estacionamentos, gorjetas e refeições em aeroportos/rodoviárias são frequentemente esquecidos e somam 10% a 15% do total.",
    severity: "atencao",
  });

  // Ajustes de corte de custos
  const recommendedAdjustments: CostAdjustmentTip[] = [];

  if (input.durationDays > 3) {
    const saving1Day = Math.round(input.budgetBRL / input.durationDays);
    recommendedAdjustments.push({
      title: "Redução de 1 diária",
      description: `Encurtar a viagem em 1 dia libera aproximadamente R$ ${saving1Day.toLocaleString("pt-BR")} no orçamento para investir em experiências melhores.`,
      potentialSavingPct: Math.round((1 / input.durationDays) * 100),
    });
  }

  if (input.tripStyle !== "economico") {
    recommendedAdjustments.push({
      title: "Alternar perfil de hospedagem",
      description:
        "Optar por pousadas intermediárias bem localizadas ou quartos com cozinha reduz a conta de hospedagem e alimentação em até 25%.",
      potentialSavingPct: 25,
    });
  }

  recommendedAdjustments.push({
    title: "Viajar na média ou baixa temporada",
    description:
      "Evitar feriados prolongados e férias escolares (janeiro, julho e dezembro) costuma baratear diárias de hotel e bilhetes em até 30%.",
    potentialSavingPct: 30,
  });

  // Confirmações necessárias
  const pendingConfirmations = [
    "Cotação real de passagens aéreas ou combustível e pedágios a partir da sua cidade de origem.",
    "Tarifas reais de hospedagem nas datas exatas (sujeitas à disponibilidade e alta demanda).",
    "Ingressos e taxas ambientais de atrações específicas (como parques nacionais).",
    "Seguro viagem ou reserva para imprevistos de saúde e bagagem.",
  ];

  return {
    dailyAvailablePerPersonBRL,
    totalTravelers,
    totalDays: input.durationDays,
    budgetBRL: input.budgetBRL,
    compatibleDestinations,
    closeDestinations,
    overBudgetDestinations,
    riskExpenses,
    recommendedAdjustments,
    pendingConfirmations,
  };
}
