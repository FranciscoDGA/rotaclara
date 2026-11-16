/**
 * =====================================================================
 * RotaClara — Testes do Diagnóstico Inteligente de Viagem
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import { allDestinations } from "@/data/destinations";
import {
  diagnoseTripBudget,
  estimateDestinationTotal,
  type DiagnosisInput,
} from "@/lib/domain/diagnosis";

describe("diagnoseTripBudget", () => {
  const baseInput: DiagnosisInput = {
    origin: "São Paulo",
    budgetBRL: 5000,
    durationDays: 5,
    adults: 2,
    children: 0,
    tripStyle: "equilibrado",
    interests: ["praia", "cultura"],
  };

  it("calcula diagnóstico para orçamento compatível", () => {
    const result = diagnoseTripBudget(baseInput, allDestinations);
    expect(result).not.toBeNull();
    expect(result!.totalTravelers).toBe(2);
    expect(result!.totalDays).toBe(5);
    expect(result!.dailyAvailablePerPersonBRL).toBe(500); // 5000 / (5 * 2) = 500

    // Deve haver destinos categorizados
    const totalCategorized =
      result!.compatibleDestinations.length +
      result!.closeDestinations.length +
      result!.overBudgetDestinations.length;
    expect(totalCategorized).toBe(allDestinations.length);
  });

  it("retorna null para valores inválidos", () => {
    expect(
      diagnoseTripBudget({ ...baseInput, budgetBRL: 0 }, allDestinations),
    ).toBeNull();
    expect(
      diagnoseTripBudget({ ...baseInput, durationDays: 0 }, allDestinations),
    ).toBeNull();
    expect(
      diagnoseTripBudget(
        { ...baseInput, adults: 0, children: 0 },
        allDestinations,
      ),
    ).toBeNull();
  });

  it("identifica corretamente orçamento muito restrito", () => {
    const tightInput: DiagnosisInput = {
      ...baseInput,
      budgetBRL: 800, // Muito baixo para 5 dias e 2 pessoas (80/dia por pessoa)
    };
    const result = diagnoseTripBudget(tightInput, allDestinations);
    expect(result).not.toBeNull();
    expect(result!.dailyAvailablePerPersonBRL).toBe(80);
    expect(result!.overBudgetDestinations.length).toBeGreaterThan(0);
  });

  it("inclui despesas de risco e ajustes viáveis", () => {
    const result = diagnoseTripBudget(baseInput, allDestinations);
    expect(result!.riskExpenses.length).toBeGreaterThan(0);
    expect(result!.recommendedAdjustments.length).toBeGreaterThan(0);
    expect(result!.pendingConfirmations.length).toBeGreaterThan(0);
  });

  it("estimateDestinationTotal aplica multiplicador de estilo econômico", () => {
    const dest = allDestinations[0]!;
    const std = estimateDestinationTotal(dest, 5, 2, "equilibrado");
    const eco = estimateDestinationTotal(dest, 5, 2, "economico");
    expect(eco).toBeLessThan(std);
  });
});
