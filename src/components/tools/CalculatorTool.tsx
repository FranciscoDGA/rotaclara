"use client";

/**
 * =====================================================================
 * RotaClara — Ferramenta de cálculo de orçamento
 * ---------------------------------------------------------------------
 * Formulário com itens de despesa, validação e resultado agregado.
 * Todo o cálculo é puro (módulo calculator). A interface exibe sempre
 * o aviso de estimativa e a metodologia.
 * =====================================================================
 */

import { useMemo, useState } from "react";
import type {
  Destination,
  ExpenseCategory,
  ExpenseItem,
} from "@/lib/domain/types";
import {
  calculate,
  createExpense,
  validate,
} from "@/lib/domain/calculator";
import { categoryLabel } from "@/lib/seo/seo";
import { formatBRL, formatPercent, todayISO } from "@/lib/format/format";
import { EstimateDisclosure } from "@/components/ui/Notice";
import {
  Badge,
  Button,
  EstimateNote,
  Field,
  Input,
  Select,
} from "@/components/ui/primitives";
import { cn } from "@/lib/ui/cn";

interface CalculatorToolProps {
  destinations: readonly Destination[];
  initialDestinationSlug?: string | null;
}

/** Categorias disponíveis para adicionar despesa. */
const CATEGORY_OPTIONS: ExpenseCategory[] = [
  "transporte",
  "hospedagem",
  "alimentacao",
  "passeios",
  "combustivel",
  "pedagios",
  "estacionamento",
  "seguro",
  "outras",
];

interface RowState {
  id: string;
  category: ExpenseCategory;
  label: string;
  amount: string;
}

let rowCounter = 0;
function newRow(): RowState {
  rowCounter += 1;
  return { id: `row-${rowCounter}`, category: "hospedagem", label: "", amount: "" };
}

/** Converte "1.234,56" ou "1234.56" em número. */
function parseAmount(raw: string): number {
  const cleaned = raw.trim().replace(/\s/g, "");
  if (!cleaned) return 0;
  // Se tem vírgula, assume formato brasileiro.
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  const value = Number.parseFloat(normalized);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function CalculatorTool({
  destinations,
  initialDestinationSlug = null,
}: CalculatorToolProps) {
  const initialDestination =
    destinations.find((d) => d.slug === initialDestinationSlug) ?? null;

  const [destination, setDestination] = useState<Destination | null>(
    initialDestination,
  );
  const [days, setDays] = useState(4);
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState("");
  const [months, setMonths] = useState(6);
  const [rows, setRows] = useState<RowState[]>([
    { id: "row-0", category: "transporte", label: "Passagem (ida e volta)", amount: "800" },
    { id: "row-1", category: "hospedagem", label: "Hotel (3 noites)", amount: "1200" },
    { id: "row-2", category: "alimentacao", label: "Refeições", amount: "600" },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const items: ExpenseItem[] = useMemo(
    () =>
      rows
        .filter((r) => parseAmount(r.amount) > 0)
        .map((r) => createExpense(r.category, r.label, r.amount)),
    [rows],
  );

  const input = useMemo(
    () => ({
      destinationSlug: destination?.slug ?? null,
      days,
      people,
      items,
      budgetBRL: parseAmount(budget) > 0 ? parseAmount(budget) : null,
      monthsUntilTrip: months,
    }),
    [destination, days, people, items, budget, months],
  );

  const issues = useMemo(() => validate(input), [input]);
  const result = useMemo(() => calculate(input), [input]);

  function addRow() {
    setRows((prev) => [...prev, newRow()]);
  }

  function updateRow(id: string, patch: Partial<RowState>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  const showResult = submitted && issues.length === 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* ============================================================
          Formulário
          ============================================================ */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-6"
        noValidate
      >
        {/* Parâmetros da viagem */}
        <section
          aria-labelledby="params"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
        >
          <h2 id="params" className="text-base font-semibold text-[#0a1628]">
            Parâmetros da viagem
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field
              label="Destino (opcional)"
              htmlFor="calc-destino"
              hint="Usado apenas para exibir a faixa de referência do destino."
            >
              <Select
                id="calc-destino"
                value={destination?.slug ?? ""}
                onChange={(e) => {
                  const found = destinations.find((d) => d.slug === e.target.value);
                  setDestination(found ?? null);
                }}
              >
                <option value="">Sem destino selecionado</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name} — {d.stateUF}
                  </option>
                ))}
              </Select>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Dias" htmlFor="calc-dias">
                <Input
                  id="calc-dias"
                  type="number"
                  min={1}
                  max={365}
                  value={days}
                  invalid={days < 1 || days > 365}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </Field>
              <Field label="Pessoas" htmlFor="calc-pessoas">
                <Input
                  id="calc-pessoas"
                  type="number"
                  min={1}
                  max={50}
                  value={people}
                  invalid={people < 1 || people > 50}
                  onChange={(e) => setPeople(Number(e.target.value))}
                />
              </Field>
            </div>

            <Field
              label="Orçamento total disponível"
              htmlFor="calc-orcamento"
              optional
              hint="Em reais. Deixe vazio para não comparar."
            >
              <Input
                id="calc-orcamento"
                type="text"
                inputMode="decimal"
                placeholder="Ex.: 5000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </Field>

            <Field
              label="Meses até a viagem"
              htmlFor="calc-meses"
              hint="Usado para calcular a poupança mensal necessária."
            >
              <Input
                id="calc-meses"
                type="number"
                min={0}
                max={120}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </Field>
          </div>

          {destination && (
            <div className="mt-4 rounded-xl bg-[#faf8f4] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8c8471]">
                Faixa de referência do destino
              </p>
              <p className="mt-1.5 text-sm text-[#16304f]">
                <strong>
                  R$ {destination.cost.minPerDayBRL}–{destination.cost.maxPerDayBRL}
                </strong>{" "}
                por pessoa por dia · {destination.costLevel}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#8c8471]">
                {destination.cost.methodology}
              </p>
              <p className="mt-1.5 text-xs text-[#8c8471]">
                Data de referência: {destination.cost.referenceDate.split("-").reverse().join("/")}
              </p>
            </div>
          )}
        </section>

        {/* Despesas */}
        <section
          aria-labelledby="despesas"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id="despesas" className="text-base font-semibold text-[#0a1628]">
              Despesas
            </h2>
            <Button type="button" variant="secondary" size="sm" onClick={addRow}>
              + Adicionar despesa
            </Button>
          </div>

          <div className="mt-4 space-y-3">
            {rows.length === 0 && (
              <p className="rounded-xl border border-dashed border-[#d6cfc0] p-6 text-center text-sm text-[#8c8471]">
                Nenhuma despesa adicionada. Clique em “Adicionar despesa”.
              </p>
            )}

            {rows.map((row, index) => (
              <div
                key={row.id}
                className="grid gap-3 rounded-xl border border-[#e8e3d8] p-3.5 sm:grid-cols-[1fr_1.4fr_1fr_auto]"
              >
                <div>
                  <label
                    htmlFor={`row-cat-${row.id}`}
                    className="sr-only"
                  >
                    Categoria da despesa {index + 1}
                  </label>
                  <Select
                    id={`row-cat-${row.id}`}
                    value={row.category}
                    onChange={(e) =>
                      updateRow(row.id, {
                        category: e.target.value as ExpenseCategory,
                      })
                    }
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {categoryLabel(c)}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label htmlFor={`row-label-${row.id}`} className="sr-only">
                    Descrição da despesa {index + 1}
                  </label>
                  <Input
                    id={`row-label-${row.id}`}
                    type="text"
                    placeholder="Ex.: Hotel (3 noites)"
                    value={row.label}
                    onChange={(e) => updateRow(row.id, { label: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor={`row-amount-${row.id}`} className="sr-only">
                    Valor da despesa {index + 1}
                  </label>
                  <Input
                    id={`row-amount-${row.id}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="Valor em R$"
                    value={row.amount}
                    invalid={row.amount !== "" && parseAmount(row.amount) === 0}
                    onChange={(e) => updateRow(row.id, { amount: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    aria-label={`Remover despesa ${index + 1}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8e3d8] text-[#a32b2b] transition-colors hover:bg-[#fdeaea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit" size="lg">
              Calcular orçamento
            </Button>
          </div>
        </section>

        <EstimateDisclosure />
      </form>

      {/* ============================================================
          Resultado
          ============================================================ */}
      <div className="space-y-5 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
        {/* Erros de validação */}
        {submitted && issues.length > 0 && (
          <div
            role="alert"
            className="rounded-2xl border border-[#f6c9c9] bg-[#fdeaea] p-5"
          >
            <h2 className="text-sm font-semibold text-[#a32b2b]">
              Corrija antes de calcular
            </h2>
            <ul className="mt-2 space-y-1.5">
              {issues.map((issue) => (
                <li key={`${issue.field}-${issue.message}`} className="text-sm text-[#a32b2b]">
                  • {issue.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resultado */}
        {showResult && (
          <div className="space-y-5">
            <section
              aria-labelledby="resultado"
              className="rounded-2xl border border-[#0f2138] bg-[#0a1628] p-6 text-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4fcdd6]">
                Total estimado
              </p>
              <h2
                id="resultado"
                className="mt-2 text-4xl font-semibold tracking-tight text-[#dfb45c]"
              >
                {formatBRL(result.totalBRL)}
              </h2>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniResult
                  label="Por pessoa"
                  value={formatBRL(result.perPersonBRL)}
                />
                <MiniResult label="Por dia" value={formatBRL(result.perDayBRL)} />
              </div>

              {/* Orçamento */}
              {result.budgetDeltaBRL !== null && (
                <div
                  className={cn(
                    "mt-5 rounded-xl p-4",
                    result.overBudget ? "bg-[#c33a3a]/20" : "bg-white/5",
                  )}
                >
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {result.overBudget
                      ? "Acima do orçamento em"
                      : "Sobra do orçamento"}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xl font-semibold",
                      result.overBudget ? "text-[#f6a8a8]" : "text-[#86e0e6]",
                    )}
                  >
                    {formatBRL(Math.abs(result.budgetDeltaBRL))}
                  </p>
                  {result.monthlySavingsBRL !== null && result.overBudget && (
                    <p className="mt-2 text-xs leading-relaxed text-white/70">
                      Guardando por mês até a viagem:{" "}
                      <strong className="text-white">
                        {formatBRL(result.monthlySavingsBRL)}
                      </strong>
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Distribuição por categoria */}
            {result.byCategory.length > 0 && (
              <section
                aria-labelledby="categorias"
                className="rounded-2xl border border-[#e8e3d8] bg-white p-5"
              >
                <h2 id="categorias" className="text-base font-semibold text-[#0a1628]">
                  Distribuição por categoria
                </h2>
                <ul className="mt-4 space-y-3.5">
                  {result.byCategory.map((cat) => (
                    <li key={cat.category}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-[#16304f]">
                          {categoryLabel(cat.category)}
                        </span>
                        <span className="font-medium text-[#0a1628]">
                          {formatBRL(cat.amountBRL)}{" "}
                          <span className="text-[#8c8471]">
                            ({formatPercent(cat.share)})
                          </span>
                        </span>
                      </div>
                      <div className="rc-bar mt-1.5">
                        <span
                          style={{
                            width: `${Math.max(2, cat.share * 100)}%`,
                            background: CATEGORY_COLORS[cat.category] ?? "#17827c",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Metodologia */}
            <section
              aria-labelledby="metodologia-calc"
              className="rounded-2xl border border-[#e8e3d8] bg-[#faf8f4] p-5"
            >
              <h2
                id="metodologia-calc"
                className="text-xs font-semibold uppercase tracking-wider text-[#16304f]"
              >
                Metodologia do cálculo
              </h2>
              <div className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#8c8471]">
                <p>
                  <strong className="text-[#16304f]">Total:</strong> soma
                  aritmética de todas as despesas informadas ({items.length}{" "}
                  {items.length === 1 ? "item" : "itens"}).
                </p>
                <p>
                  <strong className="text-[#16304f]">Por pessoa:</strong> total
                  dividido pelo número de pessoas ({people}).
                </p>
                <p>
                  <strong className="text-[#16304f]">Por dia:</strong> total
                  dividido pela duração ({days} {days === 1 ? "dia" : "dias"}).
                </p>
                <p>
                  <strong className="text-[#16304f]">Poupança mensal:</strong>{" "}
                  déficit do orçamento dividido pelos meses até a viagem ({months}{" "}
                  {months === 1 ? "mês" : "meses"}), quando houver déficit.
                </p>
                <p>
                  Nenhum preço é consultado em tempo real. Os valores vêm
                  exclusivamente do que você informou.
                </p>
              </div>
              <p className="mt-3 text-xs text-[#8c8471]">
                Data de referência do cálculo:{" "}
                <time dateTime={todayISO()} className="font-medium text-[#16304f]">
                  {todayISO().split("-").reverse().join("/")}
                </time>
              </p>
            </section>

            {/* Aviso de estimativa */}
            <EstimateNote>
              Este resultado é uma <strong>estimativa de planejamento</strong>{" "}
              construída apenas com os valores informados. Não representa
              cotação, reserva ou preço garantido de passagens, hospedagem ou
              passeios.
            </EstimateNote>

            {destination && (
              <Badge tone="teal">
                Faixa de referência: R$ {destination.cost.minPerDayBRL}–
                {destination.cost.maxPerDayBRL}/dia
              </Badge>
            )}
          </div>
        )}

        {/* Estado inicial */}
        {!showResult && issues.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#d6cfc0] bg-white p-6 text-center">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mx-auto text-[#b3ab99]"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M8 6h8M8 10h8M8 14h3M8 18h3" />
            </svg>
            <p className="mt-3 text-sm font-medium text-[#0a1628]">
              Preencha as despesas e clique em calcular
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#8c8471]">
              Já há valores de exemplo no formulário. Ajuste para a sua
              realidade antes de calcular.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   Auxiliares
   ===================================================================== */

const CATEGORY_COLORS: Record<string, string> = {
  transporte: "#2a5583",
  hospedagem: "#17827c",
  alimentacao: "#c9952f",
  passeios: "#2fb8c4",
  combustivel: "#5b8aa6",
  pedagios: "#8c8471",
  estacionamento: "#8c8471",
  seguro: "#a32b2b",
  outras: "#b3ab99",
};

function MiniResult({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
