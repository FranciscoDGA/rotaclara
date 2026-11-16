"use client";

/**
 * =====================================================================
 * RotaClara — Ferramenta de Diagnóstico Inteligente de Viagem
 * ---------------------------------------------------------------------
 * Cruza o orçamento e perfil do usuário com os dados da base editorial
 * para identificar compatibilidade, despesas críticas e ajustes de custos.
 * =====================================================================
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Destination, TravelTag, TripStyle } from "@/lib/domain/types";
import {
  diagnoseTripBudget,
  type DestinationDiagnosis,
} from "@/lib/domain/diagnosis";
import { formatBRL } from "@/lib/format/format";
import { tagLabel } from "@/lib/seo/seo";
import { EstimateDisclosure } from "@/components/ui/Notice";
import {
  Badge,
  Button,
  Field,
  Input,
  Select,
} from "@/components/ui/primitives";
import { cn } from "@/lib/ui/cn";

interface DiagnosisToolProps {
  destinations: readonly Destination[];
}

const TRIP_STYLES: { value: TripStyle; label: string }[] = [
  { value: "economico", label: "Econômico (hostels, transporte público)" },
  { value: "equilibrado", label: "Equilibrado (hotéis padrão, restaurantes locais)" },
  { value: "relaxado", label: "Relaxado (foco em descanso e conforto)" },
  { value: "intenso", label: "Intenso (conhecer o máximo de atrações)" },
  { value: "aventura", label: "Aventura (trilhas, passeios na natureza)" },
  { value: "luxo", label: "Luxo (alta gastronomia, resorts)" },
];

const INTEREST_OPTIONS: TravelTag[] = [
  "praia",
  "natureza",
  "cidade",
  "cultura",
  "gastronomia",
  "aventura",
  "familia",
  "romantico",
  "historico",
];

export function DiagnosisTool({ destinations }: DiagnosisToolProps) {
  const [budget, setBudget] = useState("5000");
  const [origin, setOrigin] = useState("São Paulo");
  const [days, setDays] = useState(5);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [style, setStyle] = useState<TripStyle>("equilibrado");
  const [interests, setInterests] = useState<TravelTag[]>(["praia", "cultura"]);

  const budgetNumber = useMemo(() => {
    const cleaned = budget.trim().replace(/\s/g, "");
    if (!cleaned) return 0;
    const normalized = cleaned.includes(",")
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : cleaned;
    const n = Number.parseFloat(normalized);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [budget]);

  const input = useMemo(
    () => ({
      origin,
      budgetBRL: budgetNumber,
      durationDays: Math.max(1, Math.min(365, Number(days) || 1)),
      adults: Math.max(1, Number(adults) || 1),
      children: Math.max(0, Number(children) || 0),
      tripStyle: style,
      interests,
    }),
    [origin, budgetNumber, days, adults, children, style, interests],
  );

  const result = useMemo(
    () => diagnoseTripBudget(input, destinations),
    [input, destinations],
  );

  function toggleInterest(tag: TravelTag) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      {/* ============================================================
          Formulário de Entrada
          ============================================================ */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-6"
        noValidate
      >
        <section
          aria-labelledby="diag-orcamento"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
        >
          <h2 id="diag-orcamento" className="text-base font-semibold text-[#0a1628]">
            Seu planejamento financeiro
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#736b5b]">
            Informe quanto você pretende investir e o perfil da viagem para
            descobrir a viabilidade real.
          </p>

          <div className="mt-4 space-y-4">
            <Field
              label="Orçamento total disponível (R$)"
              htmlFor="diag-budget"
              hint="O valor total previsto para o grupo todo, incluindo transporte e hospedagem."
            >
              <Input
                id="diag-budget"
                type="text"
                inputMode="decimal"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ex.: 5000"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Origem da viagem" htmlFor="diag-origin">
                <Input
                  id="diag-origin"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Ex.: São Paulo"
                />
              </Field>

              <Field label="Duração (dias)" htmlFor="diag-days">
                <Input
                  id="diag-days"
                  type="number"
                  min={1}
                  max={60}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value) || 1)}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Adultos" htmlFor="diag-adults">
                <Input
                  id="diag-adults"
                  type="number"
                  min={1}
                  max={20}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value) || 1)}
                />
              </Field>

              <Field label="Crianças" htmlFor="diag-children" optional>
                <Input
                  id="diag-children"
                  type="number"
                  min={0}
                  max={10}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value) || 0)}
                />
              </Field>
            </div>

            <Field label="Estilo de viagem preferido" htmlFor="diag-style">
              <Select
                id="diag-style"
                value={style}
                onChange={(e) => setStyle(e.target.value as TripStyle)}
              >
                {TRIP_STYLES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </Field>

            <fieldset>
              <legend className="text-sm font-medium text-[#0a1628]">
                Interesses principais
              </legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {INTEREST_OPTIONS.map((tag) => {
                  const active = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleInterest(tag)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-[#0a1628] bg-[#0a1628] text-white"
                          : "border-[#e8e3d8] bg-white text-[#16304f] hover:border-[#d6cfc0] hover:bg-[#f4f1ea]",
                      )}
                    >
                      {tagLabel(tag)}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="mt-5 flex justify-end">
            <Button type="submit" size="lg">
              Atualizar diagnóstico
            </Button>
          </div>
        </section>

        <EstimateDisclosure />
      </form>

      {/* ============================================================
          Resultados do Diagnóstico
          ============================================================ */}
      <div className="space-y-6">
        {!result ? (
          <div className="rounded-2xl border border-dashed border-[#d6cfc0] bg-white p-8 text-center">
            <p className="text-sm font-medium text-[#0a1628]">
              Informe um orçamento maior que zero para ver o diagnóstico.
            </p>
          </div>
        ) : (
          <>
            {/* Resumo do Orçamento Disponível */}
            <section
              aria-labelledby="diag-resumo"
              className="rounded-2xl border border-[#0f2138] bg-[#0a1628] p-6 text-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4fcdd6]">
                Diagnóstico de Viabilidade
              </p>
              <h2 id="diag-resumo" className="mt-2 text-2xl font-semibold tracking-tight">
                {formatBRL(result.budgetBRL)} para {result.totalDays} dias
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {result.totalTravelers} {result.totalTravelers === 1 ? "viajante" : "viajantes"} · Estilo {style}
              </p>

              <div className="mt-5 rounded-xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Orçamento diário disponível por pessoa
                </p>
                <p className="mt-1 text-3xl font-semibold text-[#dfb45c]">
                  {formatBRL(result.dailyAvailablePerPersonBRL)}
                  <span className="text-sm font-normal text-white/60"> /dia</span>
                </p>
                <p className="mt-1.5 text-xs text-white/50">
                  Total diário para cobrir hospedagem, alimentação, deslocamentos e passeios.
                </p>
              </div>
            </section>

            {/* Destinos Compatíveis */}
            <section
              aria-labelledby="diag-destinos-compativeis"
              className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <h3 id="diag-destinos-compativeis" className="text-base font-semibold text-[#0a1628]">
                  Destinos compatíveis com seu orçamento
                </h3>
                <Badge tone="success">
                  {result.compatibleDestinations.length} na faixa
                </Badge>
              </div>

              {result.compatibleDestinations.length === 0 ? (
                <p className="mt-3 text-sm text-[#736b5b]">
                  Nenhum destino na base cabe 100% no orçamento informado para essa duração. Veja as opções ajustáveis abaixo.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {result.compatibleDestinations.map((item) => (
                    <DestinationCardDiagnosis key={item.destination.slug} item={item} />
                  ))}
                </div>
              )}
            </section>

            {/* Destinos no Limite (Ajustáveis) */}
            {result.closeDestinations.length > 0 && (
              <section
                aria-labelledby="diag-destinos-ajustaveis"
                className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 id="diag-destinos-ajustaveis" className="text-base font-semibold text-[#0a1628]">
                    Destinos viáveis com pequenos ajustes
                  </h3>
                  <Badge tone="warning">
                    {result.closeDestinations.length} até +20%
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-[#736b5b]">
                  Estes destinos excedem ligeiramente o teto, mas cabem com troca de hospedagem ou corte de 1 diária.
                </p>
                <div className="mt-4 space-y-3">
                  {result.closeDestinations.map((item) => (
                    <DestinationCardDiagnosis key={item.destination.slug} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Despesas de Risco / Esquecidas */}
            <section
              aria-labelledby="diag-riscos"
              className="rounded-2xl border border-[#f3ddb8] bg-[#fdf1dd] p-5 sm:p-6"
            >
              <h3 id="diag-riscos" className="text-base font-semibold text-[#9a6206]">
                Despesas críticas que podem comprometer a viagem
              </h3>
              <p className="mt-1 text-xs text-[#9a6206]/85">
                Custos frequentemente esquecidos no planejamento inicial:
              </p>
              <div className="mt-4 space-y-3">
                {result.riskExpenses.map((risk, idx) => (
                  <div key={idx} className="rounded-xl border border-[#e8d2a6] bg-white/70 p-3.5">
                    <p className="text-sm font-semibold text-[#0a1628]">{risk.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-[#736b5b]">{risk.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ajustes Práticos Recomendados */}
            <section
              aria-labelledby="diag-ajustes"
              className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
            >
              <h3 id="diag-ajustes" className="text-base font-semibold text-[#0a1628]">
                Ajustes para fazer o dinheiro render mais
              </h3>
              <div className="mt-4 space-y-3">
                {result.recommendedAdjustments.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#e8e3d8] p-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e3f6ec] text-xs font-bold text-[#167043]">
                      ↓{tip.potentialSavingPct}%
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#0a1628]">{tip.title}</p>
                      <p className="mt-0.5 text-xs text-[#736b5b]">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Informações Pendentes de Confirmação */}
            <section
              aria-labelledby="diag-pendencias"
              className="rounded-2xl border border-[#e8e3d8] bg-[#faf8f4] p-5 sm:p-6"
            >
              <h3 id="diag-pendencias" className="text-sm font-semibold text-[#0a1628]">
                O que você ainda precisa confirmar com os provedores:
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-[#736b5b]">
                {result.pendingConfirmations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#c9952f]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function DestinationCardDiagnosis({ item }: { item: DestinationDiagnosis }) {
  const isOk = item.fit === "viavel";
  const d = item.destination;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#e8e3d8] p-3.5 transition-colors hover:border-[#16304f]/40">
      <div className="flex items-center gap-3.5 min-w-0">
        {d.image && (
          <Link
            href={`/destinos/${d.slug}`}
            className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0a1628] focus-visible:outline-3 focus-visible:outline-[#2fb8c4]"
            aria-label={`Ver guia de ${d.name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.image.src}
              alt={d.image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Link
              href={`/destinos/${d.slug}`}
              className="font-semibold text-[#0a1628] hover:text-[#0f6f69]"
            >
              {d.name}
            </Link>
            <span className="text-xs text-[#736b5b]">· {d.stateUF}</span>
          </div>
          <p className="mt-1 text-xs text-[#736b5b]">
            Estimativa de {formatBRL(item.estimatedCostBRL)} (≈ {formatBRL(item.dailyPerPersonBRL)}/dia por pessoa)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
        {isOk ? (
          <span className="text-xs font-semibold text-[#167043]">
            Sobra {formatBRL(item.differenceBRL)}
          </span>
        ) : (
          <span className="text-xs font-semibold text-[#9a6206]">
            Falta {formatBRL(Math.abs(item.differenceBRL))}
          </span>
        )}
        <Link
          href={`/planejador?destino=${d.slug}`}
          className="rounded-lg border border-[#e8e3d8] px-3 py-1.5 text-xs font-medium text-[#16304f] transition-colors hover:bg-[#f4f1ea]"
        >
          Planejar
        </Link>
      </div>
    </div>
  );
}
