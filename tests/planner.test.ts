/**
 * =====================================================================
 * RotaClara — Testes do planejador
 * ---------------------------------------------------------------------
 * Foco nas garantias de transparência: sem destino não há estimativa,
 * datas inválidas devolvem null, e todo resultado carrega metodologia.
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import type { Attraction, Destination, PlannerInput } from "@/lib/domain/types";
import {
  buildAlerts,
  buildBudgetSlices,
  buildDays,
  estimateTripCost,
  getNights,
  getTripDays,
  planTrip,
  selectAttractions,
} from "@/lib/domain/planner";

/* =====================================================================
   Fixtures
   ===================================================================== */

function makeAttraction(overrides: Partial<Attraction> = {}): Attraction {
  return {
    id: "atr-1",
    name: "Ponto turístico",
    description: "Descrição.",
    tags: ["cultura"],
    suggestedMinutes: 120,
    admissionFeeBRL: null,
    isFree: true,
    area: "Centro",
    sources: [],
    ...overrides,
  };
}

function makeDestination(overrides: Partial<Destination> = {}): Destination {
  return {
    slug: "cidade-teste",
    name: "Cidade Teste",
    state: "Estado de Teste",
    stateUF: "TT",
    region: "Sudeste",
    country: "Brasil",
    tagline: "Uma cidade para testar.",
    intro: "Introdução de teste.",
    tags: ["cidade", "cultura"],
    bestMonths: [3, 8],
    bestTimeNotes: "Boa época de teste.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: { distanceKm: 100, flightMinutes: 60, notes: "" },
    cost: {
      minPerDayBRL: 200,
      maxPerDayBRL: 400,
      methodology: "Média de pousadas e refeições na região.",
      referenceDate: "2026-11-13",
      confidence: "media",
      limitations: "Não inclui passagens.",
    },
    costLevel: "moderado",
    climateByMonth: [],
    howToArrive: "De carro.",
    localTransport: "A pé.",
    food: "Comida local.",
    lodgingAreas: [],
    attractions: [
      makeAttraction({ id: "a1", tags: ["cultura"] }),
      makeAttraction({ id: "a2", tags: ["praia", "natureza"] }),
      makeAttraction({ id: "a3", tags: ["gastronomia"] }),
    ],
    warnings: [],
    highlights: [],
    palette: { sky: "#88c", horizon: "#dde", land: "#4a6", accent: "#fc6" },
    editorialScore: 50,
    updatedAt: "2026-11-13",
    sources: [],
    ...overrides,
  };
}

function makeInput(overrides: Partial<PlannerInput> = {}): PlannerInput {
  return {
    origin: "São Paulo",
    destinationSlug: "cidade-teste",
    destinationLabel: null,
    country: "Brasil",
    departureDate: "2026-12-10",
    returnDate: "2026-12-15",
    adults: 2,
    children: 0,
    childAgeBand: null,
    budgetBRL: null,
    currency: "BRL",
    lodgingPreference: "padrao",
    tripStyle: "equilibrado",
    interests: [],
    accessibilityNeeds: [],
    transportMode: "nao_definido",
    ...overrides,
  };
}

/* =====================================================================
   Datas
   ===================================================================== */

describe("getTripDays / getNights", () => {
  it("conta a diferença entre ida e volta", () => {
    expect(getTripDays(makeInput())).toBe(5);
    expect(getNights(makeInput())).toBe(4);
  });

  it("retorna 0 quando as datas são iguais ou invertidas", () => {
    expect(
      getTripDays(makeInput({ departureDate: "2026-12-10", returnDate: "2026-12-10" })),
    ).toBe(0);
    expect(
      getTripDays(makeInput({ departureDate: "2026-12-15", returnDate: "2026-12-10" })),
    ).toBe(0);
  });

  it("retorna 0 sem datas", () => {
    expect(
      getTripDays(makeInput({ departureDate: "", returnDate: "" })),
    ).toBe(0);
  });
});

/* =====================================================================
   Estimativa de custo
   ===================================================================== */

describe("estimateTripCost", () => {
  it("usa a faixa do destino, dias e viajantes", () => {
    const input = makeInput();
    const { totalBRL } = estimateTripCost(makeDestination(), input);
    // Interpolação (200+400)/2 = 300 · 5 dias · 2 pessoas = 3000
    expect(totalBRL).toBe(3000);
  });

  it("sempre devolve metodologia e data de referência", () => {
    const { methodology, referenceDate } = estimateTripCost(
      makeDestination(),
      makeInput(),
    );
    expect(methodology.length).toBeGreaterThan(20);
    expect(referenceDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("não gera valor sem destino na base", () => {
    const result = estimateTripCost(null, makeInput());
    expect(result.totalBRL).toBe(0);
    expect(result.methodology).toContain("Sem destino");
  });

  it("aplica o multiplicador da faixa de hospedagem", () => {
    const padrao = estimateTripCost(makeDestination(), makeInput({ lodgingPreference: "padrao" }));
    const luxo = estimateTripCost(makeDestination(), makeInput({ lodgingPreference: "luxo" }));
    const economico = estimateTripCost(makeDestination(), makeInput({ lodgingPreference: "economico" }));

    expect(luxo.totalBRL).toBeGreaterThan(padrao.totalBRL);
    expect(economico.totalBRL).toBeLessThan(padrao.totalBRL);
  });
});

/* =====================================================================
   Atrações
   ===================================================================== */

describe("selectAttractions", () => {
  it("retorna vazio sem destino", () => {
    expect(selectAttractions(null, ["praia"])).toEqual([]);
  });

  it("prioriza atrações que atendem aos interesses", () => {
    const d = makeDestination();
    const ids = selectAttractions(d, ["praia"], 3);
    expect(ids[0]).toBe("a2");
  });

  it("usa a ordem editorial quando não há interesses", () => {
    const d = makeDestination();
    expect(selectAttractions(d, [], 3)).toEqual(["a1", "a2", "a3"]);
  });

  it("nunca inventa atração fora da base", () => {
    const d = makeDestination();
    const ids = selectAttractions(d, ["luxo"], 10);
    for (const id of ids) {
      expect(d.attractions.some((a) => a.id === id)).toBe(true);
    }
  });
});

/* =====================================================================
   Distribuição de orçamento
   ===================================================================== */

describe("buildBudgetSlices", () => {
  it("as fatias somam exatamente o total", () => {
    const slices = buildBudgetSlices(3000, "equilibrado");
    const sum = slices.reduce((s, x) => s + x.amountBRL, 0);
    expect(sum).toBeCloseTo(3000, 5);
  });

  it("os shares somam 1", () => {
    const slices = buildBudgetSlices(3000, "luxo");
    const shareSum = slices.reduce((s, x) => s + x.share, 0);
    expect(shareSum).toBeCloseTo(1, 5);
  });

  it("cai no split padrão para estilo desconhecido", () => {
    const slices = buildBudgetSlices(1000, "estilo-inexistente");
    const shareSum = slices.reduce((s, x) => s + x.share, 0);
    expect(shareSum).toBeCloseTo(1, 5);
  });

  it("ordena da maior para a menor fatia", () => {
    const slices = buildBudgetSlices(3000, "equilibrado");
    for (let i = 1; i < slices.length; i++) {
      expect(slices[i]!.share).toBeLessThanOrEqual(slices[i - 1]!.share);
    }
  });
});

/* =====================================================================
   Dias
   ===================================================================== */

describe("buildDays", () => {
  it("cria um dia por dia de viagem", () => {
    const days = buildDays(makeInput(), []);
    expect(days).toHaveLength(5);
    expect(days[0]?.day).toBe(1);
    expect(days[4]?.day).toBe(5);
  });

  it("atribui datas consecutivas quando há data de início", () => {
    const days = buildDays(makeInput(), []);
    expect(days[0]?.date).toBe("2026-12-10");
    expect(days[4]?.date).toBe("2026-12-14");
  });

  it("distribui atrações sem deixar todas no primeiro dia", () => {
    const ids = ["a1", "a2", "a3", "a4", "a5", "a6"];
    const days = buildDays(makeInput(), ids);
    const first = days[0]!.activityIds.length;
    expect(first).toBeLessThan(ids.length);
  });

  it("retorna vazio com datas inválidas", () => {
    expect(buildDays(makeInput({ departureDate: "", returnDate: "" }), [])).toEqual([]);
  });

  it("explica o dia sem atrações", () => {
    const days = buildDays(makeInput(), []);
    expect(days[0]?.notes).toContain("construtor de roteiro");
  });
});

/* =====================================================================
   Alertas
   ===================================================================== */

describe("buildAlerts", () => {
  it("sempre avisa que não há consulta em tempo real", () => {
    const alerts = buildAlerts(makeInput(), makeDestination(), 3000);
    expect(alerts.some((a) => a.id === "sem-tempo-real")).toBe(true);
  });

  it("avisa quando o destino está fora da base", () => {
    const alerts = buildAlerts(makeInput(), null, 0);
    expect(alerts.some((a) => a.id === "destino-fora-da-base")).toBe(true);
  });

  it("avisa quando a estimativa passa do orçamento", () => {
    const alerts = buildAlerts(
      makeInput({ budgetBRL: 1000 }),
      makeDestination(),
      3000,
    );
    expect(alerts.some((a) => a.id === "acima-do-orcamento")).toBe(true);
  });

  it("não avisa de orçamento quando a estimativa cabe", () => {
    const alerts = buildAlerts(
      makeInput({ budgetBRL: 10000 }),
      makeDestination(),
      3000,
    );
    expect(alerts.some((a) => a.id === "acima-do-orcamento")).toBe(false);
  });

  it("pede a idade das crianças quando não informada", () => {
    const alerts = buildAlerts(
      makeInput({ children: 2, childAgeBand: null }),
      makeDestination(),
      3000,
    );
    expect(alerts.some((a) => a.id === "idade-criancas")).toBe(true);
  });

  it("não pede a idade quando informada", () => {
    const alerts = buildAlerts(
      makeInput({ children: 2, childAgeBand: "crianca" }),
      makeDestination(),
      3000,
    );
    expect(alerts.some((a) => a.id === "idade-criancas")).toBe(false);
  });
});

/* =====================================================================
   planTrip
   ===================================================================== */

describe("planTrip", () => {
  it("devolve null com datas inválidas (não fabrica resultado)", () => {
    expect(
      planTrip(makeInput({ departureDate: "2026-12-15", returnDate: "2026-12-10" }), makeDestination()),
    ).toBeNull();
  });

  it("devolve null sem viajantes", () => {
    expect(
      planTrip(makeInput({ adults: 0, children: 0 }), makeDestination()),
    ).toBeNull();
  });

  it("gera resultado completo com destino válido", () => {
    const result = planTrip(makeInput(), makeDestination());
    expect(result).not.toBeNull();
    expect(result!.summary.totalDays).toBe(5);
    expect(result!.summary.nights).toBe(4);
    expect(result!.summary.travelers).toBe(2);
    expect(result!.days).toHaveLength(5);
    expect(result!.budgetSlices.length).toBeGreaterThan(0);
    expect(result!.estimatedTotalBRL).toBeGreaterThan(0);
    expect(result!.methodology.length).toBeGreaterThan(20);
    expect(result!.alerts.length).toBeGreaterThan(0);
  });

  it("mantém o total coerente com a soma das fatias", () => {
    const result = planTrip(makeInput(), makeDestination())!;
    const sum = result.budgetSlices.reduce((s, x) => s + x.amountBRL, 0);
    expect(sum).toBeCloseTo(result.estimatedTotalBRL, 3);
  });

  it("sem destino, zera o custo mas mantém a estrutura de dias", () => {
    const result = planTrip(makeInput(), null)!;
    expect(result.estimatedTotalBRL).toBe(0);
    expect(result.budgetSlices).toEqual([]);
    expect(result.days).toHaveLength(5);
    expect(result.suggestedAttractionIds).toEqual([]);
  });

  it("compara o total com o orçamento informado", () => {
    const result = planTrip(makeInput({ budgetBRL: 500 }), makeDestination())!;
    expect(result.alerts.some((a) => a.id === "acima-do-orcamento")).toBe(true);
  });
});
