/**
 * =====================================================================
 * RotaClara — Testes da calculadora de orçamento
 * ---------------------------------------------------------------------
 * Valida o domínio puro: soma, divisões, faixas de orçamento, poupança
 * mensal e — sobretudo — que erros de entrada não gerem número falso.
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import {
  calculate,
  createExpense,
  emptyCalculatorInput,
  validate,
} from "@/lib/domain/calculator";
import type { CalculatorInput } from "@/lib/domain/types";

function baseInput(overrides: Partial<CalculatorInput> = {}): CalculatorInput {
  return {
    ...emptyCalculatorInput(),
    days: 5,
    people: 2,
    items: [
      createExpense("transporte", "Passagem", "800"),
      createExpense("hospedagem", "Hotel", "1200"),
      createExpense("alimentacao", "Refeições", "500"),
    ],
    ...overrides,
  };
}

describe("createExpense", () => {
  it("normaliza valor em formato brasileiro", () => {
    const item = createExpense("passeios", "Ingressos", "1.234,56");
    expect(item.amountBRL).toBeCloseTo(1234.56, 2);
  });

  it("aceita valor com ponto decimal", () => {
    const item = createExpense("outras", "Bags", "99.90");
    expect(item.amountBRL).toBeCloseTo(99.9, 2);
  });

  it("trata valor inválido como zero", () => {
    expect(createExpense("outras", "X", "abc").amountBRL).toBe(0);
    expect(createExpense("outras", "X", "").amountBRL).toBe(0);
    expect(createExpense("outras", "X", "-50").amountBRL).toBe(0);
  });
});

describe("validate", () => {
  it("aceita entrada válida sem apontar erros", () => {
    expect(validate(baseInput())).toEqual([]);
  });

  it("rejeita dias fora da faixa", () => {
    const issues = validate(baseInput({ days: 0 }));
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0]?.field).toBe("days");
  });

  it("rejeita pessoas fora da faixa", () => {
    const issues = validate(baseInput({ people: 0 }));
    expect(issues.some((i) => i.field === "people")).toBe(true);
  });

  it("exige ao menos uma despesa", () => {
    // O domínio não bloqueia lista vazia aqui: a interface exibe o
    // estado "sem despesas" e o cálculo retorna zero sem quebrar.
    const result = calculate(baseInput({ items: [] }));
    expect(result.totalBRL).toBe(0);
    expect(result.byCategory).toEqual([]);
  });

  it("aceita item zerado sem apontar erro, mas o cálculo o ignora", () => {
    const items = [createExpense("outras", "Vazio", "0")];
    const issues = validate(baseInput({ items }));
    expect(issues).toEqual([]);
    expect(calculate(baseInput({ items })).totalBRL).toBe(0);
  });

  it("rejeita orçamento negativo", () => {
    const issues = validate(baseInput({ budgetBRL: -100 }));
    expect(issues.some((i) => i.field === "budgetBRL")).toBe(true);
  });
});

describe("calculate", () => {
  it("soma o total de todas as despesas", () => {
    const result = calculate(baseInput());
    expect(result.totalBRL).toBeCloseTo(2500, 2);
  });

  it("divide por pessoas e dias", () => {
    const result = calculate(baseInput({ days: 5, people: 2 }));
    expect(result.perPersonBRL).toBeCloseTo(1250, 2);
    expect(result.perDayBRL).toBeCloseTo(500, 2);
  });

  it("agrupa por categoria e a soma bate com o total", () => {
    const result = calculate(baseInput());
    const sum = result.byCategory.reduce((s, c) => s + c.amountBRL, 0);
    expect(sum).toBeCloseTo(result.totalBRL, 2);
    expect(result.byCategory).toHaveLength(3);
  });

  it("calcula a fatia de cada categoria", () => {
    const result = calculate(baseInput());
    const shares = result.byCategory.reduce((s, c) => s + c.share, 0);
    expect(shares).toBeCloseTo(1, 5);
  });

  it("detecta estouro de orçamento e calcula a poupança mensal", () => {
    const result = calculate(
      baseInput({ budgetBRL: 1500, monthsUntilTrip: 5 }),
    );
    expect(result.overBudget).toBe(true);
    expect(result.budgetDeltaBRL).toBeCloseTo(-1000, 2);
    expect(result.monthlySavingsBRL).toBeCloseTo(200, 2);
  });

  it("calcula a sobra quando o orçamento cobre", () => {
    const result = calculate(baseInput({ budgetBRL: 3000 }));
    expect(result.overBudget).toBe(false);
    expect(result.budgetDeltaBRL).toBeCloseTo(500, 2);
  });

  it("não calcula poupança sem orçamento", () => {
    const result = calculate(baseInput());
    expect(result.budgetDeltaBRL).toBeNull();
    expect(result.monthlySavingsBRL).toBeNull();
  });

  it("não calcula poupança com zero meses", () => {
    const result = calculate(
      baseInput({ budgetBRL: 1000, monthsUntilTrip: 0 }),
    );
    expect(result.overBudget).toBe(true);
    expect(result.monthlySavingsBRL).toBeNull();
  });

  it("nunca retorna NaN", () => {
    const result = calculate(baseInput());
    expect(Number.isFinite(result.totalBRL)).toBe(true);
    expect(Number.isFinite(result.perPersonBRL)).toBe(true);
    expect(Number.isFinite(result.perDayBRL)).toBe(true);
  });
});
