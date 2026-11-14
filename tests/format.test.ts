/**
 * =====================================================================
 * RotaClara — Testes de formatação pt-BR
 * ---------------------------------------------------------------------
 * Garantias: convenção brasileira de moeda/números, robustez contra
 * NaN/Infinity e datas inválidas (nunca devolver "NaN" ao usuário).
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import {
  addDaysISO,
  capitalize,
  daysBetweenISO,
  formatBRL,
  formatBRLPrecise,
  formatDateISO,
  formatDateShort,
  formatDuration,
  formatMonths,
  formatMonthsShort,
  formatNumber,
  formatPercent,
  joinNonEmpty,
  monthName,
  monthShort,
  plural,
  slugify,
  todayISO,
  truncate,
  weekdayISO,
} from "@/lib/format/format";

/** Normaliza o espaço não separável (U+00A0) que o Intl usa em "R$ ". */
function brl(text: string): string {
  return text.replace(/\u00a0/g, " ");
}

describe("formatBRL", () => {
  it("formata em reais sem centavos", () => {
    expect(brl(formatBRL(1500))).toBe("R$ 1.500");
  });

  it("devolve travessão para valores não finitos", () => {
    expect(formatBRL(Number.NaN)).toBe("R$ —");
    expect(formatBRL(Number.POSITIVE_INFINITY)).toBe("R$ —");
  });

  it("aceita zero", () => {
    expect(brl(formatBRL(0))).toBe("R$ 0");
  });
});

describe("formatBRLPrecise", () => {
  it("mantém dois dígitos decimais", () => {
    expect(brl(formatBRLPrecise(99.9))).toBe("R$ 99,90");
  });

  it("devolve travessão para NaN", () => {
    expect(formatBRLPrecise(Number.NaN)).toBe("R$ —");
  });
});

describe("formatNumber / formatPercent", () => {
  it("usa separador de milhar pt-BR", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });

  it("arredonda e trata não finitos", () => {
    expect(formatNumber(1234.6)).toBe("1.235");
    expect(formatNumber(Number.NaN)).toBe("—");
  });

  it("formata fração como percentual", () => {
    expect(formatPercent(0.42)).toBe("42%");
    expect(formatPercent(0.425, 1)).toBe("42,5%");
    expect(formatPercent(Number.NaN)).toBe("—");
  });
});

describe("meses", () => {
  it("nome completo e abreviado", () => {
    expect(monthName(0)).toBe("janeiro");
    expect(monthName(11)).toBe("dezembro");
    expect(monthShort(0)).toBe("jan");
  });

  it("índice fora da faixa vira string vazia", () => {
    expect(monthName(12)).toBe("");
    expect(monthShort(-1)).toBe("");
  });

  it("sequência contínua vira intervalo", () => {
    expect(formatMonths([3, 4, 5, 6])).toBe("de abril a julho");
  });

  it("lista desconectada é enumerada em ordem", () => {
    expect(formatMonths([11, 0])).toBe("janeiro, dezembro");
  });

  it("lista vazia vira travessão", () => {
    expect(formatMonths([])).toBe("—");
    expect(formatMonthsShort([])).toBe("—");
  });

  it("lista curta usa abreviações separadas por ponto", () => {
    expect(formatMonthsShort([11, 0])).toBe("jan · dez");
  });
});

describe("datas", () => {
  it("formata data ISO longa e curta", () => {
    expect(formatDateISO("2026-11-13")).toBe("13 de novembro de 2026");
    expect(formatDateShort("2026-11-13")).toBe("13 nov");
  });

  it("data inválida é devolvida como está", () => {
    expect(formatDateISO("abc")).toBe("abc");
    expect(formatDateShort("")).toBe("");
  });

  it("nome do dia da semana em português", () => {
    // 2026-11-13 é uma sexta-feira.
    expect(weekdayISO("2026-11-13")).toBe("sexta-feira");
    expect(weekdayISO("não-data")).toBe("");
  });

  it("difere datas e soma dias", () => {
    expect(daysBetweenISO("2026-12-10", "2026-12-15")).toBe(5);
    expect(daysBetweenISO("2026-12-15", "2026-12-10")).toBe(-5);
    expect(addDaysISO("2026-12-30", 3)).toBe("2027-01-02");
    expect(addDaysISO("inválida", 3)).toBe("inválida");
  });

  it("datas inválidas diferem em 0", () => {
    expect(daysBetweenISO("x", "2026-01-01")).toBe(0);
  });

  it("hoje retorna ISO válido", () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("formatDuration", () => {
  it("formata horas e minutos", () => {
    expect(formatDuration(150)).toBe("2 h 30 min");
    expect(formatDuration(120)).toBe("2 h");
    expect(formatDuration(45)).toBe("45 min");
  });

  it("valores não positivos ou inválidos viram travessão", () => {
    expect(formatDuration(0)).toBe("—");
    expect(formatDuration(-10)).toBe("—");
    expect(formatDuration(Number.NaN)).toBe("—");
  });
});

describe("slugify", () => {
  it("remove acento, caixa e espaços", () => {
    expect(slugify("São Paulo")).toBe("sao-paulo");
    expect(slugify("João Pessoa")).toBe("joao-pessoa");
  });

  it("remove hífens das pontas", () => {
    expect(slugify(" --Teste-- ")).toBe("teste");
  });

  it("limita o comprimento a 80 caracteres", () => {
    expect(slugify("a".repeat(200)).length).toBe(80);
  });
});

describe("utilitários de texto", () => {
  it("truncate acrescenta reticências", () => {
    expect(truncate("abcdef", 4)).toBe("abc…");
    expect(truncate("abc", 10)).toBe("abc");
  });

  it("capitalize eleva só a primeira letra", () => {
    expect(capitalize("rio")).toBe("Rio");
    expect(capitalize("")).toBe("");
  });

  it("joinNonEmpty pula strings vazias", () => {
    expect(joinNonEmpty(["a", "", "b"])).toBe("a, b");
    expect(joinNonEmpty(["", ""])).toBe("");
  });

  it("plural escolhe a forma correta", () => {
    expect(plural(1, "dia", "dias")).toBe("dia");
    expect(plural(0, "dia", "dias")).toBe("dias");
    expect(plural(2, "dia", "dias")).toBe("dias");
  });
});
