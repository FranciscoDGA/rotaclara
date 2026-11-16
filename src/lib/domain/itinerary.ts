/**
 * =====================================================================
 * RotaClara — Regras do construtor de roteiros
 * ---------------------------------------------------------------------
 * Operações puras sobre o estado do roteiro (imutáveis).
 * Tempos de visita são ESTIMATIVAS declaradas, nunca medições reais.
 * =====================================================================
 */

import type {
  DayPart,
  Itinerary,
  ItineraryActivity,
  ItineraryDay,
} from "@/lib/domain/types";
import { slugify, todayISO } from "@/lib/format/format";

/** Ordem lógica das partes do dia. */
export const DAY_PARTS: readonly DayPart[] = ["manha", "tarde", "noite"] as const;

export const DAY_PART_LABELS: Record<DayPart, string> = {
  manha: "Manhã",
  tarde: "Tarde",
  noite: "Noite",
};

/** Gera um id curto e estável o suficiente para uso local. */
function makeId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${rand}`;
}

/* =====================================================================
   Criação
   ===================================================================== */

export interface CreateItineraryArgs {
  title: string;
  destinationSlug: string | null;
  origin: string;
  startDate: string | null;
  /** Quantidade de dias a criar. */
  dayCount: number;
}

/** Cria um roteiro novo com os dias já abertos. */
export function createItinerary(args: CreateItineraryArgs): Itinerary {
  const now = todayISO();
  const count = Math.min(Math.max(1, Math.floor(args.dayCount)), 60);

  const days: ItineraryDay[] = Array.from({ length: count }, (_, index) => ({
    id: makeId("day"),
    day: index + 1,
    date: args.startDate ? shiftDate(args.startDate, index) : null,
    title: `Dia ${index + 1}`,
    activities: [],
  }));

  return {
    id: makeId("trip"),
    title: args.title.trim() || "Minha viagem",
    destinationSlug: args.destinationSlug,
    origin: args.origin.trim(),
    startDate: args.startDate,
    endDate: args.startDate ? shiftDate(args.startDate, count - 1) : null,
    days,
    createdAt: now,
    updatedAt: now,
  };
}

function shiftDate(iso: string, days: number): string {
  const base = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(base.getTime())) return iso;
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

/* =====================================================================
   Atividades
   ===================================================================== */

export interface CreateActivityArgs {
  part: DayPart;
  title: string;
  address?: string;
  estimatedMinutes?: number;
  notes?: string;
  estimatedCostBRL?: number;
  isTransit?: boolean;
  attractionId?: string | null;
}

/** Cria uma atividade normalizada. */
export function createActivity(args: CreateActivityArgs): ItineraryActivity {
  return {
    id: makeId("act"),
    part: args.part,
    title: args.title.trim() || "Atividade",
    address: args.address?.trim() ?? "",
    estimatedMinutes: Math.min(
      Math.max(15, Math.floor(args.estimatedMinutes ?? 90)),
      720,
    ),
    notes: args.notes?.trim() ?? "",
    estimatedCostBRL: Math.max(0, args.estimatedCostBRL ?? 0),
    isTransit: args.isTransit ?? false,
    attractionId: args.attractionId ?? null,
  };
}

/** Adiciona uma atividade a um dia, na parte indicada. */
export function addActivity(
  itinerary: Itinerary,
  dayId: string,
  activity: ItineraryActivity,
): Itinerary {
  return {
    ...itinerary,
    updatedAt: todayISO(),
    days: itinerary.days.map((day) =>
      day.id === dayId
        ? {
            ...day,
            // Insere preservando a ordem cronológica das partes do dia
            // (manhã → tarde → noite); o sort é estável, então a ordem de
            // inserção dentro da mesma parte é mantida.
            activities: [...day.activities, activity].sort(
              (a, b) => DAY_PARTS.indexOf(a.part) - DAY_PARTS.indexOf(b.part),
            ),
          }
        : day,
    ),
  };
}

/** Remove uma atividade. */
export function removeActivity(
  itinerary: Itinerary,
  activityId: string,
): Itinerary {
  return {
    ...itinerary,
    updatedAt: todayISO(),
    days: itinerary.days.map((day) => ({
      ...day,
      activities: day.activities.filter((a) => a.id !== activityId),
    })),
  };
}

/** Atualiza campos de uma atividade existente. */
export function updateActivity(
  itinerary: Itinerary,
  activityId: string,
  patch: Partial<ItineraryActivity>,
): Itinerary {
  return {
    ...itinerary,
    updatedAt: todayISO(),
    days: itinerary.days.map((day) => ({
      ...day,
      activities: day.activities.map((a) =>
        a.id === activityId ? { ...a, ...patch, id: a.id } : a,
      ),
    })),
  };
}

/**
 * Move uma atividade de posição dentro do mesmo dia.
 * `fromIndex` e `toIndex` são índices no array já filtrado da parte do dia.
 */
export function reorderActivities(
  itinerary: Itinerary,
  dayId: string,
  part: DayPart,
  fromIndex: number,
  toIndex: number,
): Itinerary {
  if (fromIndex === toIndex) return itinerary;

  const inPart = itinerary.days.find((d) => d.id === dayId)?.activities.filter((a) => a.part === part);
  if (
    !inPart ||
    fromIndex < 0 ||
    fromIndex >= inPart.length ||
    toIndex < 0 ||
    toIndex >= inPart.length
  ) {
    // Índice inválido: devolve a MESMA referência para que a interface
    // não re-renderize sem necessidade.
    return itinerary;
  }

  return {
    ...itinerary,
    updatedAt: todayISO(),
    days: itinerary.days.map((day) => {
      if (day.id !== dayId) return day;

      const inPart = day.activities.filter((a) => a.part === part);
      const others = day.activities.filter((a) => a.part !== part);

      const moved = [...inPart];
      const [item] = moved.splice(fromIndex, 1);
      if (!item) return day;
      moved.splice(toIndex, 0, item);

      // Reconstrói preservando a ordem cronológica das partes.
      const merged = [...others, ...moved];
      const ordered = DAY_PARTS.flatMap((p) =>
        merged.filter((a) => a.part === p),
      );

      return { ...day, activities: ordered };
    }),
  };
}

/* =====================================================================
   Dias
   ===================================================================== */

/** Adiciona um dia ao final. */
export function addDay(itinerary: Itinerary): Itinerary {
  const nextNumber = itinerary.days.length + 1;
  const lastDate = itinerary.days[itinerary.days.length - 1]?.date;
  const nextDate = lastDate ? shiftDate(lastDate, 1) : null;

  return {
    ...itinerary,
    updatedAt: todayISO(),
    endDate: nextDate ?? itinerary.endDate,
    days: [
      ...itinerary.days,
      { id: makeId("day"), day: nextNumber, date: nextDate, title: `Dia ${nextNumber}`, activities: [] },
    ],
  };
}

/** Remove um dia e renumera os demais. */
export function removeDay(itinerary: Itinerary, dayId: string): Itinerary {
  if (itinerary.days.length <= 1) return itinerary;

  const remaining = itinerary.days.filter((d) => d.id !== dayId);
  const start = itinerary.startDate;

  return {
    ...itinerary,
    updatedAt: todayISO(),
    endDate: remaining.length
      ? (start ? shiftDate(start, remaining.length - 1) : itinerary.endDate)
      : itinerary.endDate,
    days: remaining.map((day, index) => ({
      ...day,
      day: index + 1,
      date: start ? shiftDate(start, index) : day.date,
    })),
  };
}

/** Renomeia um dia. */
export function renameDay(
  itinerary: Itinerary,
  dayId: string,
  title: string,
): Itinerary {
  return {
    ...itinerary,
    updatedAt: todayISO(),
    days: itinerary.days.map((day) =>
      day.id === dayId ? { ...day, title: title.trim() || `Dia ${day.day}` } : day,
    ),
  };
}

/* =====================================================================
   Derivações
   ===================================================================== */

/** Tempo total de visita somando as atividades (exclui deslocamentos). */
export function totalVisitMinutes(itinerary: Itinerary): number {
  return itinerary.days.reduce(
    (sum, day) =>
      sum +
      day.activities
        .filter((a) => !a.isTransit)
        .reduce((s, a) => s + a.estimatedMinutes, 0),
    0,
  );
}

/** Gasto total previsto no roteiro. */
export function totalItineraryCost(itinerary: Itinerary): number {
  return itinerary.days.reduce(
    (sum, day) => sum + day.activities.reduce((s, a) => s + a.estimatedCostBRL, 0),
    0,
  );
}

/** Contagem total de atividades. */
export function totalActivities(itinerary: Itinerary): number {
  return itinerary.days.reduce((sum, day) => sum + day.activities.length, 0);
}

/**
 * Detecta dias sobrecarregados (> 8h de visita).
 * Retorna os ids dos dias que merecem revisão do usuário.
 */
export function overloadedDays(itinerary: Itinerary, thresholdMinutes = 480): string[] {
  return itinerary.days
    .filter(
      (day) =>
        day.activities
          .filter((a) => !a.isTransit)
          .reduce((s, a) => s + a.estimatedMinutes, 0) > thresholdMinutes,
    )
    .map((day) => day.id);
}

/** Serializa para persistência local. */
export function serializeItinerary(itinerary: Itinerary): string {
  return JSON.stringify(itinerary);
}

/** Lê um roteiro da string persistida. Retorna `null` se inválido. */
export function parseItinerary(raw: string | null): Itinerary | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Itinerary;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray(parsed.days) ||
      typeof parsed.id !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Slug de arquivo para exportação em texto. */
export function itineraryFilename(itinerary: Itinerary): string {
  const base = slugify(itinerary.title) || "roteiro";
  return `${base}-rotaclara.txt`;
}

/** Slug de arquivo para exportação em JSON. */
export function itineraryJsonFilename(itinerary: Itinerary): string {
  const base = slugify(itinerary.title) || "roteiro";
  return `${base}-rotaclara.json`;
}

/** Exporta o roteiro em texto simples para cópia/impressão. */
export function exportItineraryText(itinerary: Itinerary): string {
  const lines: string[] = [];
  lines.push(itinerary.title.toUpperCase());
  lines.push(`Destino: ${itinerary.destinationSlug ?? "—"}`);
  lines.push(`Origem: ${itinerary.origin || "—"}`);
  lines.push(
    `Período: ${itinerary.startDate ?? "?"} a ${itinerary.endDate ?? "?"}`,
  );
  lines.push("");

  for (const day of itinerary.days) {
    lines.push(`== ${day.title}${day.date ? ` (${day.date})` : ""} ==`);
    if (day.activities.length === 0) {
      lines.push("  (sem atividades)");
    }
    for (const part of DAY_PARTS) {
      const inPart = day.activities.filter((a) => a.part === part);
      if (inPart.length === 0) continue;
      lines.push(`  ${DAY_PART_LABELS[part]}:`);
      for (const a of inPart) {
        const time = `${Math.round(a.estimatedMinutes)} min`;
        const cost = a.estimatedCostBRL > 0 ? ` · ${a.estimatedCostBRL.toFixed(2)} BRL` : "";
        lines.push(`    - ${a.title} [${time}${cost}]`);
        if (a.address) lines.push(`      ${a.address}`);
        if (a.notes) lines.push(`      Obs.: ${a.notes}`);
      }
    }
    lines.push("");
  }

  lines.push(
    `Total previsto: ${totalItineraryCost(itinerary).toFixed(2)} BRL (estimativa do usuário)`,
  );
  lines.push("Gerado por RotaClara — estimativas, não reservas confirmadas.");
  return lines.join("\n");
}
