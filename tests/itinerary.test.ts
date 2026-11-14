/**
 * =====================================================================
 * RotaClara — Testes do construtor de roteiro (domínio)
 * ---------------------------------------------------------------------
 * Operações imutáveis, renumeração, sobrecarga de dias, serialização e
 * exportação em texto.
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import type { Itinerary } from "@/lib/domain/types";
import {
  addActivity,
  addDay,
  createActivity,
  createItinerary,
  DAY_PARTS,
  exportItineraryText,
  itineraryFilename,
  overloadedDays,
  parseItinerary,
  removeActivity,
  removeDay,
  renameDay,
  reorderActivities,
  serializeItinerary,
  totalActivities,
  totalItineraryCost,
  totalVisitMinutes,
  updateActivity,
} from "@/lib/domain/itinerary";

function makeItinerary(dayCount = 3): Itinerary {
  return createItinerary({
    title: "Férias de teste",
    destinationSlug: "cidade-teste",
    origin: "São Paulo",
    startDate: "2026-12-10",
    dayCount,
  });
}

/** Roteiro com deslocamento e visitas, para testar derivações. */
function itineraryWithActivities(): Itinerary {
  let it = makeItinerary(2);
  it = addActivity(
    it,
    it.days[0]!.id,
    createActivity({ part: "manha", title: "Museu", estimatedMinutes: 120, estimatedCostBRL: 40 }),
  );
  it = addActivity(
    it,
    it.days[0]!.id,
    createActivity({ part: "tarde", title: "Traslado", estimatedMinutes: 60, isTransit: true }),
  );
  it = addActivity(
    it,
    it.days[1]!.id,
    createActivity({ part: "manha", title: "Praia", estimatedMinutes: 180, estimatedCostBRL: 0 }),
  );
  return it;
}

describe("createItinerary", () => {
  it("cria a quantidade pedida de dias", () => {
    expect(makeItinerary(4).days).toHaveLength(4);
  });

  it("limita a 60 dias e garante mínimo de 1", () => {
    expect(createItinerary({ title: "x", destinationSlug: null, origin: "", startDate: null, dayCount: 999 }).days).toHaveLength(60);
    expect(createItinerary({ title: "x", destinationSlug: null, origin: "", startDate: null, dayCount: 0 }).days).toHaveLength(1);
  });

  it("numera os dias sequencialmente", () => {
    const it = makeItinerary(3);
    expect(it.days.map((d) => d.day)).toEqual([1, 2, 3]);
  });

  it("calcula as datas quando há início", () => {
    const it = makeItinerary(3);
    expect(it.days[0]?.date).toBe("2026-12-10");
    expect(it.days[2]?.date).toBe("2026-12-12");
    expect(it.endDate).toBe("2026-12-12");
  });

  it("usa título padrão quando vazio", () => {
    const it = createItinerary({ title: "   ", destinationSlug: null, origin: "", startDate: null, dayCount: 1 });
    expect(it.title).toBe("Minha viagem");
  });
});

describe("createActivity", () => {
  it("normaliza os campos", () => {
    const a = createActivity({
      part: "manha",
      title: "  Museu  ",
      estimatedMinutes: 10,
      estimatedCostBRL: -5,
    });
    expect(a.title).toBe("Museu");
    expect(a.estimatedMinutes).toBe(15); // piso
    expect(a.estimatedCostBRL).toBe(0); // nunca negativo
  });

  it("limita o tempo máximo a 720 minutos", () => {
    const a = createActivity({ part: "tarde", title: "X", estimatedMinutes: 5000 });
    expect(a.estimatedMinutes).toBe(720);
  });

  it("usa 90 minutos por padrão", () => {
    expect(createActivity({ part: "noite", title: "X" }).estimatedMinutes).toBe(90);
  });
});

describe("addActivity / removeActivity / updateActivity", () => {
  it("adiciona atividade ao dia correto", () => {
    const it = makeItinerary(2);
    const dayId = it.days[0]!.id;
    const next = addActivity(it, dayId, createActivity({ part: "manha", title: "Praia" }));
    expect(next.days[0]?.activities).toHaveLength(1);
    expect(next.days[1]?.activities).toHaveLength(0);
  });

  it("não muta o roteiro original", () => {
    const it = makeItinerary(2);
    addActivity(it, it.days[0]!.id, createActivity({ part: "manha", title: "Praia" }));
    expect(it.days[0]?.activities).toHaveLength(0);
  });

  it("remove a atividade pelo id", () => {
    const it = makeItinerary(1);
    const act = createActivity({ part: "manha", title: "Museu" });
    const withAct = addActivity(it, it.days[0]!.id, act);
    const without = removeActivity(withAct, act.id);
    expect(without.days[0]?.activities).toHaveLength(0);
  });

  it("atualiza campos sem trocar o id", () => {
    const it = makeItinerary(1);
    const act = createActivity({ part: "manha", title: "Museu" });
    const withAct = addActivity(it, it.days[0]!.id, act);
    const updated = updateActivity(withAct, act.id, { title: "Museu novo", estimatedMinutes: 45 });
    expect(updated.days[0]?.activities[0]?.id).toBe(act.id);
    expect(updated.days[0]?.activities[0]?.title).toBe("Museu novo");
    expect(updated.days[0]?.activities[0]?.estimatedMinutes).toBe(45);
  });
});

describe("reorderActivities", () => {
  function withThree(): { itinerary: Itinerary; dayId: string } {
    let it = makeItinerary(1);
    const dayId = it.days[0]!.id;
    for (const title of ["A", "B", "C"]) {
      it = addActivity(it, dayId, createActivity({ part: "manha", title }));
    }
    return { itinerary: it, dayId };
  }

  it("move a atividade para cima", () => {
    const { itinerary, dayId } = withThree();
    const next = reorderActivities(itinerary, dayId, "manha", 2, 1);
    expect(next.days[0]?.activities.map((a) => a.title)).toEqual(["A", "C", "B"]);
  });

  it("move a atividade para baixo", () => {
    const { itinerary, dayId } = withThree();
    const next = reorderActivities(itinerary, dayId, "manha", 0, 1);
    expect(next.days[0]?.activities.map((a) => a.title)).toEqual(["B", "A", "C"]);
  });

  it("ignora índice fora de faixa", () => {
    const { itinerary, dayId } = withThree();
    expect(reorderActivities(itinerary, dayId, "manha", 0, 99)).toBe(itinerary);
    expect(reorderActivities(itinerary, dayId, "manha", 5, 0)).toBe(itinerary);
  });

  it("mantém a ordem das partes do dia após reordenar", () => {
    let it = makeItinerary(1);
    const dayId = it.days[0]!.id;
    it = addActivity(it, dayId, createActivity({ part: "noite", title: "Jantar" }));
    it = addActivity(it, dayId, createActivity({ part: "manha", title: "Praia" }));

    const parts = it.days[0]!.activities.map((a) => a.part);
    const expected = DAY_PARTS.filter((p) => parts.includes(p));
    expect(parts).toEqual(expected);
  });
});

describe("addDay / removeDay / renameDay", () => {
  it("adiciona um dia ao final com número seguinte", () => {
    const it = addDay(makeItinerary(2));
    expect(it.days).toHaveLength(3);
    expect(it.days[2]?.day).toBe(3);
  });

  it("remove um dia e renumera", () => {
    const it = makeItinerary(3);
    const next = removeDay(it, it.days[0]!.id);
    expect(next.days).toHaveLength(2);
    expect(next.days.map((d) => d.day)).toEqual([1, 2]);
  });

  it("não remove o último dia restante", () => {
    const it = makeItinerary(1);
    expect(removeDay(it, it.days[0]!.id)).toBe(it);
  });

  it("recalcula as datas a partir do início da viagem", () => {
    // Invariante: dia N = startDate + N-1. Remover um dia reancora as
    // datas restantes na data de início declarada.
    const it = makeItinerary(3);
    const next = removeDay(it, it.days[0]!.id);
    expect(next.days.map((d) => d.date)).toEqual([
      "2026-12-10",
      "2026-12-11",
    ]);
    expect(next.endDate).toBe("2026-12-11");
  });

  it("renomeia o dia", () => {
    const it = makeItinerary(1);
    const next = renameDay(it, it.days[0]!.id, "Dia de praia");
    expect(next.days[0]?.title).toBe("Dia de praia");
  });

  it("renomeia para o padrão quando vazio", () => {
    const it = makeItinerary(2);
    const next = renameDay(it, it.days[0]!.id, "  ");
    expect(next.days[0]?.title).toBe("Dia 1");
  });
});

describe("derivações", () => {
  it("soma o tempo de visita excluindo deslocamentos", () => {
    expect(totalVisitMinutes(itineraryWithActivities())).toBe(300);
  });

  it("soma o custo previsto", () => {
    expect(totalItineraryCost(itineraryWithActivities())).toBe(40);
  });

  it("conta todas as atividades", () => {
    expect(totalActivities(itineraryWithActivities())).toBe(3);
  });

  it("detecta dias acima de 8 horas", () => {
    let it = makeItinerary(1);
    it = addActivity(it, it.days[0]!.id, createActivity({ part: "manha", title: "A", estimatedMinutes: 300 }));
    it = addActivity(it, it.days[0]!.id, createActivity({ part: "tarde", title: "B", estimatedMinutes: 300 }));
    expect(overloadedDays(it)).toEqual([it.days[0]!.id]);
  });

  it("não marca dias dentro do limite", () => {
    const it = itineraryWithActivities();
    expect(overloadedDays(it)).toEqual([]);
  });

  it("deslocamentos não contam para a sobrecarga", () => {
    let it = makeItinerary(1);
    it = addActivity(it, it.days[0]!.id, createActivity({ part: "manha", title: "A", estimatedMinutes: 300 }));
    it = addActivity(it, it.days[0]!.id, createActivity({ part: "tarde", title: "B", estimatedMinutes: 300, isTransit: true }));
    expect(overloadedDays(it)).toEqual([]);
  });
});

describe("serialização", () => {
  it("ida e volta preservam o roteiro", () => {
    const it = itineraryWithActivities();
    const parsed = parseItinerary(serializeItinerary(it));
    expect(parsed).not.toBeNull();
    expect(parsed!.id).toBe(it.id);
    expect(parsed!.days).toHaveLength(it.days.length);
    expect(parsed!.days[0]?.activities).toHaveLength(2);
    expect(parsed!.days[1]?.activities).toHaveLength(1);
  });

  it("rejeita string inválida", () => {
    expect(parseItinerary("não é json")).toBeNull();
    expect(parseItinerary(null)).toBeNull();
    expect(parseItinerary("")).toBeNull();
  });

  it("rejeita JSON estruturalmente inválido", () => {
    expect(parseItinerary('{"foo": 1}')).toBeNull();
    expect(parseItinerary('{"id": 1, "days": []}')).toBeNull();
    expect(parseItinerary('{"id": "x", "days": "no"}')).toBeNull();
  });
});

describe("exportação", () => {
  it("gera nome de arquivo a partir do título", () => {
    const it = makeItinerary(1);
    expect(itineraryFilename(it)).toBe("ferias-de-teste-rotaclara.txt");
  });

  it("o texto contém título, dias e aviso de estimativa", () => {
    const it = itineraryWithActivities();
    const text = exportItineraryText(it);
    expect(text).toContain("FÉRIAS DE TESTE");
    expect(text).toContain("Dia 1");
    expect(text).toContain("Museu");
    expect(text).toContain("estimativas, não reservas confirmadas");
  });

  it("indica dias sem atividades", () => {
    const text = exportItineraryText(makeItinerary(2));
    expect(text).toContain("(sem atividades)");
  });
});
