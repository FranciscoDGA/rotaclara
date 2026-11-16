"use client";

/**
 * =====================================================================
 * RotaClara — Explorador de destinos
 * ---------------------------------------------------------------------
 * Filtros funcionais com sincronização na URL (compartilhável e
 * indexável). Quando um filtro zera a lista, a interface explica
 * QUAL filtro não tem dados — em vez de mostrar vazio em silêncio.
 * =====================================================================
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Destination, Region, TravelTag } from "@/lib/domain/types";
import { DestinationCard } from "@/components/ui/DestinationCard";
import {
  Badge,
  Button,
  EmptyState,
  Input,
} from "@/components/ui/primitives";
import {
  availableRegions,
  availableStates,
  emptyFilters,
  filterDestinations,
  type BudgetBand,
  type DestinationFilters,
  type DurationBand,
} from "@/lib/domain/filters";
import { tagLabel } from "@/lib/seo/seo";
import { cn } from "@/lib/ui/cn";

interface DestinationExplorerProps {
  destinations: readonly Destination[];
  /** Perfil inicial vindo da URL (`?perfil=`). */
  initialTag?: TravelTag;
  /** Busca inicial vindo da URL (`?busca=`). */
  initialSearch?: string;
}

const ALL_TAGS: TravelTag[] = [
  "praia",
  "natureza",
  "cidade",
  "cultura",
  "gastronomia",
  "aventura",
  "familia",
  "romantico",
  "economico",
  "luxo",
  "historico",
  "vida_noturna",
];

const BUDGET_OPTIONS: { value: BudgetBand; label: string }[] = [
  { value: "qualquer", label: "Qualquer orçamento" },
  { value: "ate_200", label: "Até R$ 200/dia" },
  { value: "200_400", label: "R$ 200 a 400/dia" },
  { value: "400_700", label: "R$ 400 a 700/dia" },
  { value: "acima_700", label: "Acima de R$ 700/dia" },
];

const DURATION_OPTIONS: { value: DurationBand; label: string }[] = [
  { value: "qualquer", label: "Qualquer duração" },
  { value: "fim_de_semana", label: "Até 3 dias" },
  { value: "ate_5_dias", label: "3 a 5 dias" },
  { value: "uma_semana", label: "5 a 8 dias" },
  { value: "mais_de_10", label: "10 dias ou mais" },
];

const MONTHS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

export function DestinationExplorer({
  destinations,
  initialTag,
  initialSearch = "",
}: DestinationExplorerProps) {
  const router = useRouter();

  const [filters, setFilters] = useState<DestinationFilters>(() => ({
    ...emptyFilters(),
    search: initialSearch,
    tags: initialTag ? [initialTag] : [],
  }));

  const states = useMemo(() => availableStates(destinations), [destinations]);
  const regions = useMemo(() => availableRegions(destinations), [destinations]);

  const outcome = useMemo(
    () => filterDestinations(destinations, filters),
    [destinations, filters],
  );

  function update(patch: Partial<DestinationFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function toggleRegion(region: Region) {
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  }

  function toggleState(uf: string) {
    setFilters((prev) => ({
      ...prev,
      states: prev.states.includes(uf)
        ? prev.states.filter((s) => s !== uf)
        : [...prev.states, uf],
    }));
  }

  function toggleTag(tag: TravelTag) {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  }

  function toggleMonth(month: number) {
    setFilters((prev) => ({
      ...prev,
      months: prev.months.includes(month)
        ? prev.months.filter((m) => m !== month)
        : [...prev.months, month],
    }));
  }

  function reset() {
    setFilters({ ...emptyFilters(), search: "" });
    // Limpa também os parâmetros da URL.
    router.replace("/destinos");
  }

  const activeCount =
    (filters.search.trim() ? 1 : 0) +
    filters.regions.length +
    filters.states.length +
    filters.tags.length +
    (filters.budgetBand !== "qualquer" ? 1 : 0) +
    (filters.durationBand !== "qualquer" ? 1 : 0) +
    (filters.months.length > 0 ? 1 : 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr]">
      {/* ============================================================
          Painel de filtros
          ============================================================ */}
      <aside
        className="rc-no-print lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start"
        aria-label="Filtros de destinos"
      >
        <div className="rounded-2xl border border-[#e8e3d8] bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-[#0a1628]">Filtros</h2>
            {activeCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge tone="gold">{activeCount} ativos</Badge>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-medium text-[#0f6f69] underline underline-offset-2 rounded focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                >
                  Limpar
                </button>
              </div>
            )}
          </div>

          {/* Busca */}
          <div className="mt-5">
            <label
              htmlFor="filtro-busca"
              className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]"
            >
              Buscar
            </label>
            <div className="mt-2">
              <Input
                id="filtro-busca"
                type="search"
                value={filters.search}
                onChange={(e) => update({ search: e.target.value })}
                placeholder="Cidade, estado, perfil…"
              />
            </div>
          </div>

          {/* Região */}
          <FilterGroup title="Região">
            <div className="flex flex-wrap gap-1.5">
              {regions.map((region) => (
                <Chip
                  key={region}
                  active={filters.regions.includes(region)}
                  onClick={() => toggleRegion(region)}
                >
                  {region}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          {/* Estado */}
          <FilterGroup title="Estado">
            <div className="flex flex-wrap gap-1.5">
              {states.map((s) => (
                <Chip
                  key={s.uf}
                  active={filters.states.includes(s.uf)}
                  onClick={() => toggleState(s.uf)}
                >
                  {s.uf}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          {/* Perfil */}
          <FilterGroup title="Perfil de viagem">
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag) => (
                <Chip
                  key={tag}
                  active={filters.tags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tagLabel(tag)}
                </Chip>
              ))}
            </div>
          </FilterGroup>

          {/* Orçamento */}
          <FilterGroup title="Orçamento diário">
            <div className="flex flex-col gap-1.5">
              {BUDGET_OPTIONS.map((opt) => (
                <RadioRow
                  key={opt.value}
                  name="orcamento"
                  checked={filters.budgetBand === opt.value}
                  onChange={() => update({ budgetBand: opt.value })}
                  label={opt.label}
                />
              ))}
            </div>
          </FilterGroup>

          {/* Duração */}
          <FilterGroup title="Duração da viagem">
            <div className="flex flex-col gap-1.5">
              {DURATION_OPTIONS.map((opt) => (
                <RadioRow
                  key={opt.value}
                  name="duracao"
                  checked={filters.durationBand === opt.value}
                  onChange={() => update({ durationBand: opt.value })}
                  label={opt.label}
                />
              ))}
            </div>
          </FilterGroup>

          {/* Época */}
          <FilterGroup title="Época do ano">
            <div className="grid grid-cols-6 gap-1.5">
              {MONTHS.map((m, index) => (
                <Chip
                  key={m}
                  active={filters.months.includes(index)}
                  onClick={() => toggleMonth(index)}
                  compact
                >
                  {m}
                </Chip>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#736b5b]">
              Filtra destinos com boa época no mês selecionado.
            </p>
          </FilterGroup>
        </div>
      </aside>

      {/* ============================================================
          Resultados
          ============================================================ */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#736b5b]" role="status" aria-live="polite">
            <span className="font-semibold text-[#0a1628]">
              {outcome.results.length}
            </span>{" "}
            {outcome.results.length === 1 ? "destino encontrado" : "destinos encontrados"}
            {activeCount > 0 && ` de ${outcome.total}`}
          </p>
        </div>

        {/* Aviso quando filtros zeram a lista */}
        {outcome.emptyBecauseOfFilters && (
          <div className="mt-5">
            <EmptyState
              title="Nenhum destino corresponde a todos os filtros"
              description={
                outcome.unmatchedFilters.length > 0
                  ? `Nenhum destino corresponde a ${outcome.unmatchedFilters.join(
                      ", ",
                    )}. Nossa base tem ${outcome.total} destinos verificados — remova um filtro para ver alternativas.`
                  : `Nossa base tem ${outcome.total} destinos verificados. Remova um filtro para ampliar os resultados.`
              }
              action={
                <Button onClick={reset} variant="secondary">
                  Limpar filtros
                </Button>
              }
            />
          </div>
        )}

        {/* Lista */}
        {outcome.results.length > 0 && (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {outcome.results.map((d) => (
              <DestinationCard key={d.slug} destination={d} showHighlights />
            ))}
          </div>
        )}

        {/* Estado inicial sem filtros e sem resultados (não deve ocorrer) */}
        {!outcome.emptyBecauseOfFilters && outcome.results.length === 0 && (
          <div className="mt-5">
            <EmptyState
              title="Nenhum destino cadastrado"
              description="A base editorial ainda está sendo montada."
              action={
                <Link
                  href="/"
                  className="text-sm font-medium text-[#0f6f69] underline underline-offset-2"
                >
                  Voltar ao início
                </Link>
              }
            />
          </div>
        )}

        {/* Nota editorial */}
        {outcome.results.length > 0 && (
          <p className="mt-8 rounded-xl border border-[#e8e3d8] bg-[#faf8f4] p-4 text-xs leading-relaxed text-[#736b5b]">
            Os valores de custo são <strong>estimativas de planejamento</strong>{" "}
            por pessoa por dia, com metodologia e data de referência em cada
            destino. Não exibimos preços de passagens, hotéis ou passeios em
            tempo real. Consulte a página do destino para detalhes e fontes.
          </p>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   Auxiliares locais
   ===================================================================== */

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-5 border-t border-[#f4f1ea] pt-4">
      <legend className="sr-only">{title}</legend>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]">
        {title}
      </p>
      <div className="mt-2.5">{children}</div>
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
  compact = false,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border text-xs font-medium transition-colors duration-150",
        "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
        compact ? "px-2.5 py-1.5" : "px-3 py-1.5",
        active
          ? "border-[#0a1628] bg-[#0a1628] text-white"
          : "border-[#e8e3d8] bg-white text-[#16304f] hover:border-[#d6cfc0] hover:bg-[#f4f1ea]",
      )}
    >
      {children}
    </button>
  );
}

function RadioRow({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-sm text-[#16304f] transition-colors hover:bg-[#faf8f4]">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-[#0a1628] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
      />
      {label}
    </label>
  );
}
