/**
 * =====================================================================
 * RotaClara — Testes do comparador
 * ---------------------------------------------------------------------
 * Garantia central: NENHUM ranking é inventado. Critérios subjetivos
 * nunca ganham "vantagem" e a seleção inválida devolve null.
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import type { Destination } from "@/lib/domain/types";
import { COMPARE_CRITERIA, compareDestinations } from "@/lib/domain/compare";

function makeDestination(
  slug: string,
  overrides: Partial<Destination> = {},
): Destination {
  return {
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    state: "Estado",
    stateUF: "ST",
    region: "Sudeste",
    country: "Brasil",
    tagline: "Tagline.",
    intro: "Intro.",
    tags: ["cidade"],
    bestMonths: [3, 8],
    bestTimeNotes: "",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: { distanceKm: 100, flightMinutes: 60, notes: "" },
    cost: {
      minPerDayBRL: 200,
      maxPerDayBRL: 400,
      methodology: "Média declarada.",
      referenceDate: "2026-11-13",
      confidence: "media",
      limitations: "Sem passagens.",
    },
    costLevel: "moderado",
    climateByMonth: Array.from({ length: 12 }, () => ({
      temperatureC: { min: 18, max: 28 },
      rainfall: "intermediario" as const,
    })),
    howToArrive: "De avião.",
    localTransport: "A pé.",
    food: "Comida.",
    lodgingAreas: [],
    attractions: [
      {
        id: `${slug}-a1`,
        name: "Atração",
        description: "",
        tags: ["cultura"],
        suggestedMinutes: 60,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro",
        sources: [],
      },
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

describe("compareDestinations", () => {
  it("devolve null com menos de 2 destinos", () => {
    expect(compareDestinations([])).toBeNull();
    expect(compareDestinations([makeDestination("um")])).toBeNull();
  });

  it("aceita 2 e 3 destinos", () => {
    expect(compareDestinations([makeDestination("a"), makeDestination("b")])).not.toBeNull();
    expect(
      compareDestinations([
        makeDestination("a"),
        makeDestination("b"),
        makeDestination("c"),
      ]),
    ).not.toBeNull();
  });

  it("ignora seleção acima de 3", () => {
    const result = compareDestinations([
      makeDestination("a"),
      makeDestination("b"),
      makeDestination("c"),
      makeDestination("d"),
    ]);
    expect(result?.destinations).toHaveLength(3);
  });

  it("retorna todos os critérios, um para cada destino", () => {
    const result = compareDestinations([
      makeDestination("a"),
      makeDestination("b"),
    ])!;
    expect(result.rows).toHaveLength(COMPARE_CRITERIA.length);
    for (const row of result.rows) {
      expect(row.values).toHaveLength(2);
      expect(row.label.length).toBeGreaterThan(0);
    }
  });
});

describe("transparência do ranking", () => {
  // Critérios que NUNCA podem marcar vantagem.
  const SUBJECTIVE = [
    "bestMonths",
    "climate",
    "profile",
    "lodging",
    "transport",
  ] as const;

  it("nunca marca vantagem em critérios subjetivos", () => {
    const result = compareDestinations([
      makeDestination("barato", { costLevel: "economico" }),
      makeDestination("caro", { costLevel: "premium" }),
    ])!;

    for (const criterion of SUBJECTIVE) {
      const row = result.rows.find((r) => r.criterion === criterion);
      expect(row?.betterIndex).toBeNull();
    }
  });

  it("marca vantagem no custo com racional declarado", () => {
    const result = compareDestinations([
      makeDestination("caro", { costLevel: "premium" }),
      makeDestination("barato", { costLevel: "economico" }),
    ])!;

    const row = result.rows.find((r) => r.criterion === "costLevel")!;
    expect(row.betterIndex).toBe(1);
    expect(row.rationale).toBeTruthy();
  });

  it("não marca vantagem em empate de custo", () => {
    const result = compareDestinations([
      makeDestination("a", { costLevel: "moderado" }),
      makeDestination("b", { costLevel: "moderado" }),
    ])!;

    expect(result.rows.find((r) => r.criterion === "costLevel")?.betterIndex).toBeNull();
  });

  it("marca vantagem na distância apenas com dado completo", () => {
    const withData = compareDestinations([
      makeDestination("longe", {
        referenceFromSaoPaulo: { distanceKm: 3000, flightMinutes: 240, notes: "" },
      }),
      makeDestination("perto", {
        referenceFromSaoPaulo: { distanceKm: 400, flightMinutes: 45, notes: "" },
      }),
    ])!;
    expect(withData.rows.find((r) => r.criterion === "distance")?.betterIndex).toBe(1);

    const semDado = compareDestinations([
      makeDestination("a", {
        referenceFromSaoPaulo: { distanceKm: null, flightMinutes: null, notes: "" },
      }),
      makeDestination("b", {
        referenceFromSaoPaulo: { distanceKm: 400, flightMinutes: 45, notes: "" },
      }),
    ])!;
    expect(semDado.rows.find((r) => r.criterion === "distance")?.betterIndex).toBeNull();
  });

  it("marca vantagem em duração quando há diferença", () => {
    const result = compareDestinations([
      makeDestination("longo", { recommendedDays: { min: 7, max: 10 } }),
      makeDestination("curto", { recommendedDays: { min: 2, max: 3 } }),
    ])!;
    expect(result.rows.find((r) => r.criterion === "recommendedDays")?.betterIndex).toBe(1);
    expect(result.rows.find((r) => r.criterion === "recommendedDays")?.rationale).toContain("dias");
  });

  it("exibe 'Sem dado disponível' quando falta informação", () => {
    const result = compareDestinations([
      makeDestination("a", { lodgingAreas: [] }),
      makeDestination("b", { lodgingAreas: [] }),
    ])!;
    const row = result.rows.find((r) => r.criterion === "lodging")!;
    expect(row.values.every((v) => v === "Sem dado disponível")).toBe(true);
  });
});

describe("diferenças objetivas", () => {
  it("sempre comenta a sobreposição de época", () => {
    const result = compareDestinations([
      makeDestination("a"),
      makeDestination("b"),
    ])!;
    expect(result.differences.some((d) => d.includes("época"))).toBe(true);
  });

  it("aponta quando as boas épocas não se sobrepõem", () => {
    const result = compareDestinations([
      makeDestination("a", { bestMonths: [0, 1] }),
      makeDestination("b", { bestMonths: [6, 7] }),
    ])!;
    expect(result.differences.some((d) => d.includes("não se sobrepõem"))).toBe(true);
  });

  it("compara faixas de custo quando diferentes", () => {
    const result = compareDestinations([
      makeDestination("barato", {
        cost: {
          minPerDayBRL: 100,
          maxPerDayBRL: 200,
          methodology: "",
          referenceDate: "2026-11-13",
          confidence: "media",
          limitations: "",
        },
      }),
      makeDestination("caro", {
        cost: {
          minPerDayBRL: 500,
          maxPerDayBRL: 900,
          methodology: "",
          referenceDate: "2026-11-13",
          confidence: "media",
          limitations: "",
        },
      }),
    ])!;
    expect(result.differences.some((d) => d.includes("faixa diária"))).toBe(true);
  });

  it("avisa sobre regiões distintas", () => {
    const result = compareDestinations([
      makeDestination("a", { region: "Sudeste" }),
      makeDestination("b", { region: "Nordeste" }),
    ])!;
    expect(result.differences.some((d) => d.includes("regiões distintas"))).toBe(true);
  });
});

describe("metodologia", () => {
  it("sempre explica como a comparação foi feita", () => {
    const result = compareDestinations([
      makeDestination("a"),
      makeDestination("b"),
    ])!;
    expect(result.methodology).toContain("critérios");
    expect(result.methodology).toContain("subjetivos");
  });
});
