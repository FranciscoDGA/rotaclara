/**
 * =====================================================================
 * RotaClara — Regras da calculadora de viagem
 * ---------------------------------------------------------------------
 * Funções puras. Nenhum preço de mercado é consultado ou inventado:
 * o resultado deriva exclusivamente dos valores informados pelo usuário.
 * =====================================================================
 */

import type {
  CalculatorInput,
  CalculatorResult,
  ExpenseCategory,
  ExpenseItem,
} from "@/lib/domain/types";

/** Ordem de exibição das categorias no resultado. */
export const CATEGORY_ORDER: readonly ExpenseCategory[] = [
  "transporte",
  "hospedagem",
  "alimentacao",
  "passeios",
  "combustivel",
  "pedagios",
  "estacionamento",
  "seguro",
  "outras",
] as const;

/** Agrupa os itens por categoria e soma os valores. */
export function sumByCategory(
  items: readonly ExpenseItem[],
): Map<ExpenseCategory, number> {
  const totals = new Map<ExpenseCategory, number>();
  for (const item of items) {
    const current = totals.get(item.category) ?? 0;
    totals.set(item.category, current + item.amountBRL);
  }
  return totals;
}

/** Soma total de todos os itens. */
export function totalExpenses(items: readonly ExpenseItem[]): number {
  return items.reduce((sum, item) => sum + item.amountBRL, 0);
}

/**
 * Calcula o resultado agregado.
 *
 * Regras:
 *  - `people` e `days` mínimos são 1 (evita divisão por zero).
 *  - Percentuais somam 100% quando há despesas; 0% quando não há.
 *  - `budgetDeltaBRL` só existe quando há orçamento informado (> 0).
 *  - `monthlySavingsBRL` exige orçamento E meses até a viagem > 0.
 */
export function calculate(input: CalculatorInput): CalculatorResult {
  const people = Math.max(1, Math.floor(input.people));
  const days = Math.max(1, Math.floor(input.days));

  const totalBRL = totalExpenses(input.items);
  const byCategoryMap = sumByCategory(input.items);

  const byCategory = CATEGORY_ORDER.filter(
    (category) => (byCategoryMap.get(category) ?? 0) > 0,
  ).map((category) => {
    const amountBRL = byCategoryMap.get(category) ?? 0;
    return {
      category,
      amountBRL,
      share: totalBRL > 0 ? amountBRL / totalBRL : 0,
    };
  });

  const hasBudget = input.budgetBRL !== null && input.budgetBRL > 0;
  const budgetDeltaBRL = hasBudget ? (input.budgetBRL as number) - totalBRL : null;

  const months = Math.max(0, Math.floor(input.monthsUntilTrip));
  const monthlySavingsBRL =
    hasBudget && months > 0 && budgetDeltaBRL !== null && budgetDeltaBRL < 0
      ? Math.abs(budgetDeltaBRL) / months
      : null;

  return {
    totalBRL,
    perPersonBRL: totalBRL / people,
    perDayBRL: totalBRL / days,
    byCategory,
    budgetDeltaBRL,
    monthlySavingsBRL,
    overBudget: budgetDeltaBRL !== null && budgetDeltaBRL < 0,
  };
}

/**
 * Valida a entrada antes de calcular.
 * Retorna mensagens de erro por campo — nada é calculado com dados inválidos.
 */
export interface ValidationIssue {
  field: string;
  message: string;
}

export function validate(input: CalculatorInput): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!Number.isFinite(input.days) || input.days < 1) {
    issues.push({ field: "days", message: "Informe pelo menos 1 dia de viagem." });
  }
  if (input.days > 365) {
    issues.push({
      field: "days",
      message: "Duração máxima suportada é de 365 dias.",
    });
  }
  if (!Number.isFinite(input.people) || input.people < 1) {
    issues.push({ field: "people", message: "Informe pelo menos 1 pessoa." });
  }
  if (input.people > 50) {
    issues.push({ field: "people", message: "Máximo de 50 pessoas por cálculo." });
  }
  if (input.budgetBRL !== null && input.budgetBRL < 0) {
    issues.push({ field: "budgetBRL", message: "Orçamento não pode ser negativo." });
  }

  input.items.forEach((item, index) => {
    if (!Number.isFinite(item.amountBRL) || item.amountBRL < 0) {
      issues.push({
        field: `item-${index}`,
        message: "Valores de despesa não podem ser negativos.",
      });
    }
  });

  return issues;
}

/**
 * Cria um item de despesa normalizado.
 * Aceita entrada em string (formulários) e converte para número.
 */
/**
 * Cria um item de despesa normalizado.
 * Aceita entrada em string (formulários) e converte para número.
 *
 * Regras de leitura do valor:
 *  - Com vírgula → formato brasileiro ("1.234,56" → 1234.56).
 *  - Sem vírgula e com ponto seguido de exatamente 3 dígitos →
 *    separador de milhar ("1.234" → 1234).
 *  - Caso contrário → ponto decimal ("99.90" → 99.9, "1234.5" → 1234.5).
 */
export function parseBRLAmount(raw: string): number {
  const cleaned = raw.trim().replace(/\s/g, "").replace(/R\$\s?/i, "");
  if (!cleaned) return 0;

  let normalized: string;
  if (cleaned.includes(",")) {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    const dotCount = (cleaned.match(/\./g) ?? []).length;
    const lastDot = cleaned.lastIndexOf(".");
    const decimals = cleaned.length - lastDot - 1;
    normalized =
      dotCount === 1 && decimals === 3 && /^\d{1,3}(\.\d{3})+$/.test(cleaned)
        ? cleaned.replace(/\./g, "")
        : cleaned;
  }

  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function createExpense(
  category: ExpenseCategory,
  label: string,
  rawAmount: string | number,
): ExpenseItem {
  const parsed =
    typeof rawAmount === "number" ? rawAmount : parseBRLAmount(rawAmount);

  return {
    category,
    label: label.trim() || "Despesa",
    amountBRL: Number.isFinite(parsed) && parsed > 0 ? parsed : 0,
  };
}

/** Estado inicial vazio da calculadora. */
export function emptyCalculatorInput(): CalculatorInput {
  return {
    destinationSlug: null,
    days: 1,
    people: 1,
    items: [],
    budgetBRL: null,
    monthsUntilTrip: 0,
  };
}

/** Rótulo da categoria já importado do módulo de SEO para não duplicar. */
export { categoryLabel } from "@/lib/seo/seo";
