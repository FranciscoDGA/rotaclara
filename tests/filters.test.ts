/**
 * =====================================================================
 * RotaClara — Testes dos filtros de descoberta
 * ---------------------------------------------------------------------
 * Garantia central: quando um filtro zera a lista, a função explica
 * QUAL filtro não tem dados (unmatchedFilters) em vez de devolver
 * resultado vazio silenciosamente.
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import type { Destination, Region, TravelTag } from "@/lib/domain/types";
import {
  activeFilterCount,
  availableRegions,
  availableStates,
  emptyFilters,
  filterDestinations,
  groupByTag,
  hasActiveFilters,
  matchesBudget,
  matchesDuration,
  matchesMonths,
  matchesSearch,
  matchesTags,
  sortByEditorialScore,
  type DestinationFilters,
} from "@/lib/domain/filters";

/* =====================================================================
   Fixtures
   ===================================================================== */

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
    climateByMonth: [],
    howToArrive: "",
    localTransport: "",
    food: "",
    lodgingAreas: [],
    attractions: [],
    warnings: [],
    highlights: [],
    palette: { sky: "#88c", horizon: "#dde", land: "#4a6", accent: "#fc6" },
    editorialScore: 50,
    updatedAt: "2026-11-13",
    sources: [],
    ...overrides,
  };
}

const BASE: Destination[] = [
  makeDestination("praia-norte", {
    name: "Praia Norte",
    state: "Bahia",
    stateUF: "BA",
    region: "Nordeste",
    tags: ["praia", "familia"],
    costLevel: "economico",
    cost: {
      minPerDayBRL: 100,
      maxPerDayBRL: 200,
      methodology: "",
      referenceDate: "2026-11-13",
      confidence: "media",
      limitations: "",
    },
    recommendedDays: { min: 2, max: 4 },
    bestMonths: [11, 0],
    editorialScore: 90,
  }),
  makeDestination("cidade-cultura", {
    name: "Cidade Cultura",
    state: "Minas Gerais",
    stateUF: "MG",
    region: "Sudeste",
    tags: ["cultura", "cidade"],
    editorialScore: 70,
  }),
  makeDestination("serra-verde", {
    name: "Serra Verde",
    state: "Santa Catarina",
    stateUF: "SC",
    region: "Sul",
    tags: ["natureza", "aventura"],
    costLevel: "premium",
    cost: {
      minPerDayBRL: 800,
      maxPerDayBRL: 1200,
      methodology: "",
      referenceDate: "2026-11-13",
      confidence: "media",
      limitations: "",
    },
    recommendedDays: { min: 6, max: 9 },
    bestMonths: [5, 6],
    editorialScore: 60,
  }),
];

function filters(
  overrides: Partial<DestinationFilters> = {},
): DestinationFilters {
  return { ...emptyFilters(), ...overrides };
}

/* =====================================================================
   Estado vazio / contagem
   ===================================================================== */

describe("emptyFilters / hasActiveFilters / activeFilterCount", () => {
  it("o estado vazio não tem filtros ativos", () => {
    expect(hasActiveFilters(emptyFilters())).toBe(false);
    expect(activeFilterCount(emptyFilters())).toBe(0);
  });

  it("conta cada critério ativo", () => {
    const f = filters({
      search: "praia",
      regions: ["Nordeste" as Region],
      states: ["BA"],
      tags: ["praia" as TravelTag],
      budgetBand: "ate_200",
      months: [11],
    });
    expect(hasActiveFilters(f)).toBe(true);
    // busca + região + estado + tag + faixa + mês = 6
    expect(activeFilterCount(f)).toBe(6);
  });

  it("ignora busca composta só de espaços", () => {
    expect(hasActiveFilters(filters({ search: "   " }))).toBe(false);
  });
});

/* =====================================================================
   Busca
   ===================================================================== */

describe("matchesSearch", () => {
  const d = makeDestination("rio", {
    name: "Rio de Janeiro",
    state: "Rio de Janeiro",
    stateUF: "RJ",
    tagline: "Praias e montanhas.",
  });

  it("qualquer busca vazia corresponde", () => {
    expect(matchesSearch(d, "")).toBe(true);
    expect(matchesSearch(d, "   ")).toBe(true);
  });

  it("ignora acento e caixa nos dois lados", () => {
    expect(matchesSearch(d, "RIO")).toBe(true);
    // A busca também é normalizada: "riô" vira "rio" e corresponde.
    expect(matchesSearch(d, "riô")).toBe(true);
    expect(matchesSearch(d, "janeiro")).toBe(true);
    expect(matchesSearch(d, "nada a ver")).toBe(false);
  });

  it("exige TODOS os termos (AND)", () => {
    expect(matchesSearch(d, "rio praia")).toBe(true);
    // "montanhas" está na tagline, mas "cachoeira" não está em lugar nenhum.
    expect(matchesSearch(d, "rio montanhas")).toBe(true);
    expect(matchesSearch(d, "rio cachoeira")).toBe(false);
  });

  it("busca também em estado, UF e tagline", () => {
    expect(matchesSearch(d, "rj")).toBe(true);
    expect(matchesSearch(d, "montanhas")).toBe(true);
  });
});

/* =====================================================================
   Faixas
   ===================================================================== */

describe("matchesBudget", () => {
  it("'qualquer' sempre corresponde", () => {
    expect(matchesBudget(makeDestination("x"), "qualquer")).toBe(true);
  });

  it("aceita sobreposição parcial da faixa do destino", () => {
    // Faixa 100–200 intersecta "ate_200" (0–200).
    const d = makeDestination("x", {
      cost: {
        minPerDayBRL: 100,
        maxPerDayBRL: 200,
        methodology: "",
        referenceDate: "2026-11-13",
        confidence: "media",
        limitations: "",
      },
    });
    expect(matchesBudget(d, "ate_200")).toBe(true);
    expect(matchesBudget(d, "acima_700")).toBe(false);
  });

  it("destino premium só cai em faixas altas", () => {
    const d = makeDestination("x", {
      cost: {
        minPerDayBRL: 800,
        maxPerDayBRL: 1200,
        methodology: "",
        referenceDate: "2026-11-13",
        confidence: "media",
        limitations: "",
      },
    });
    expect(matchesBudget(d, "ate_200")).toBe(false);
    expect(matchesBudget(d, "acima_700")).toBe(true);
  });
});

describe("matchesDuration", () => {
  it("'qualquer' sempre corresponde", () => {
    expect(matchesDuration(makeDestination("x"), "qualquer")).toBe(true);
  });

  it("casa por sobreposição das faixas", () => {
    const curto = makeDestination("x", { recommendedDays: { min: 2, max: 3 } });
    expect(matchesDuration(curto, "fim_de_semana")).toBe(true);
    expect(matchesDuration(curto, "mais_de_10")).toBe(false);
  });
});

describe("matchesMonths", () => {
  it("lista vazia corresponde a qualquer época", () => {
    expect(matchesMonths(makeDestination("x"), [])).toBe(true);
  });

  it("exige sobreposição com os meses do destino", () => {
    const d = makeDestination("x", { bestMonths: [11, 0] });
    expect(matchesMonths(d, [0, 6])).toBe(true);
    expect(matchesMonths(d, [6, 7])).toBe(false);
  });
});

describe("matchesTags", () => {
  it("lista vazia corresponde", () => {
    expect(matchesTags(makeDestination("x"), [])).toBe(true);
  });

  it("exige TODAS as tags (AND)", () => {
    const d = makeDestination("x", { tags: ["praia", "familia"] });
    expect(matchesTags(d, ["praia"])).toBe(true);
    expect(matchesTags(d, ["praia", "familia"])).toBe(true);
    expect(matchesTags(d, ["praia", "luxo"])).toBe(false);
  });
});

/* =====================================================================
   Filtragem principal
   ===================================================================== */

describe("filterDestinations", () => {
  it("sem filtros devolve a base inteira", () => {
    const out = filterDestinations(BASE, emptyFilters());
    expect(out.results).toHaveLength(3);
    expect(out.total).toBe(3);
    expect(out.emptyBecauseOfFilters).toBe(false);
    expect(out.unmatchedFilters).toEqual([]);
  });

  it("combina múltiplos filtros", () => {
    const out = filterDestinations(
      BASE,
      filters({ regions: ["Nordeste"], tags: ["praia"] }),
    );
    expect(out.results.map((d) => d.slug)).toEqual(["praia-norte"]);
  });

  it("filtra por busca sem acento", () => {
    const out = filterDestinations(BASE, filters({ search: "serra verde" }));
    expect(out.results.map((d) => d.slug)).toEqual(["serra-verde"]);
  });

  it("marca emptyBecauseOfFilters quando filtros zeram a lista", () => {
    const out = filterDestinations(BASE, filters({ search: "inexistente" }));
    expect(out.results).toHaveLength(0);
    expect(out.emptyBecauseOfFilters).toBe(true);
  });

  it("aponta a busca como filtro sem correspondência", () => {
    const out = filterDestinations(BASE, filters({ search: "inexistente" }));
    expect(out.unmatchedFilters).toContain('busca: "inexistente"');
  });

  it("aponta a região sem correspondência", () => {
    const out = filterDestinations(
      BASE,
      filters({ regions: ["Centro-Oeste"] }),
    );
    expect(out.unmatchedFilters.some((u) => u.startsWith("região:"))).toBe(
      true,
    );
  });

  it("aponta a faixa de orçamento sem correspondência", () => {
    // Nenhum destino da base intersecta 400–700? Cidade Cultura é
    // 200–400 (intersecta 400) — use faixa impossível com fixtures.
    const out = filterDestinations(
      [makeDestination("x", {
        cost: {
          minPerDayBRL: 50,
          maxPerDayBRL: 100,
          methodology: "",
          referenceDate: "2026-11-13",
          confidence: "media",
          limitations: "",
        },
      })],
      filters({ budgetBand: "acima_700" }),
    );
    expect(out.results).toHaveLength(0);
    expect(out.unmatchedFilters).toContain("faixa de orçamento");
  });

  it("não preenche unmatchedFilters quando o problema é a combinação", () => {
    // Região válida + tag que nenhum daquela região tem.
    const out = filterDestinations(
      BASE,
      filters({ regions: ["Sul"], tags: ["praia"] }),
    );
    expect(out.results).toHaveLength(0);
    // A região existe na base e a tag existe na base: o problema é a
    // combinação — nenhum dos diagnósticos isolados deve aparecer.
    expect(out.unmatchedFilters).toEqual([]);
  });

  it("sem filtros ativos, resultado vazio não é culpa dos filtros", () => {
    const out = filterDestinations([], emptyFilters());
    expect(out.emptyBecauseOfFilters).toBe(false);
    expect(out.unmatchedFilters).toEqual([]);
  });
});

/* =====================================================================
   Auxiliares de apresentação
   ===================================================================== */

describe("groupByTag", () => {
  it("reúne apenas destinos com a tag", () => {
    expect(groupByTag(BASE, "praia").map((d) => d.slug)).toEqual([
      "praia-norte",
    ]);
    expect(groupByTag(BASE, "luxo")).toEqual([]);
  });
});

describe("availableStates / availableRegions", () => {
  it("extrai estados únicos em ordem alfabética", () => {
    const states = availableStates(BASE);
    expect(states.map((s) => s.uf)).toEqual(["BA", "MG", "SC"]);
  });

  it("extrai regiões na ordem editorial, omitindo as ausentes", () => {
    expect(availableRegions(BASE)).toEqual(["Sudeste", "Nordeste", "Sul"]);
  });
});

describe("sortByEditorialScore", () => {
  it("ordena do maior para o menor score", () => {
    const sorted = sortByEditorialScore(BASE);
    expect(sorted.map((d) => d.editorialScore)).toEqual([90, 70, 60]);
  });

  it("não muta a lista original", () => {
    const copy = [...BASE];
    sortByEditorialScore(BASE);
    expect(BASE).toEqual(copy);
  });
});
