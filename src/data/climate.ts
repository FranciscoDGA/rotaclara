/**
 * =====================================================================
 * RotaClara — Helper de climatologia
 * ---------------------------------------------------------------------
 * Constrói a matriz de 12 meses de forma compacta e legível.
 * Os valores são referências agregadas (faixas típicas), não medições
 * de uma estação específica. A fonte oficial de clima é o INMET.
 * =====================================================================
 */

import type { MonthlyClimate } from "@/lib/domain/types";

export interface ClimateInput {
  /** Máximas mensais (°C), índice 0 = janeiro. */
  max: number[];
  /** Mínimas mensais (°C), índice 0 = janeiro. */
  min: number[];
  /** Padrão de chuva por mês. */
  rain: ("seco" | "intermediario" | "chuvoso")[];
  /** Temperatura do mar, quando relevante (°C). */
  sea?: number[];
}

/** Monta a matriz mensal validando o comprimento (deve ser 12). */
export function buildClimate(input: ClimateInput): MonthlyClimate[] {
  const months = 12;
  const result: MonthlyClimate[] = [];

  for (let i = 0; i < months; i++) {
    const entry: MonthlyClimate = {
      temperatureC: {
        min: input.min[i] ?? input.min[input.min.length - 1] ?? 0,
        max: input.max[i] ?? input.max[input.max.length - 1] ?? 0,
      },
      rainfall: input.rain[i] ?? "intermediario",
    };

    const seaTemp = input.sea?.[i];
    if (seaTemp !== undefined) entry.seaTempC = seaTemp;

    result.push(entry);
  }

  return result;
}

/** Nome curto do mês para rótulos de interface. */
export const MONTH_ABBR = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
] as const;
