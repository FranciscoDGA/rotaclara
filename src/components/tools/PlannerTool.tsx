"use client";

/**
 * =====================================================================
 * RotaClara — Ferramenta de planejamento
 * ---------------------------------------------------------------------
 * Formulário completo → resultado com resumo, fatias de orçamento,
 * estrutura de dias, atrações sugeridas e alertas de transparência.
 * Toda estimativa vem acompanhada de metodologia e data de referência.
 * =====================================================================
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  ChildAgeBand,
  Destination,
  TravelTag,
  TransportMode,
  TripStyle,
} from "@/lib/domain/types";
import { getDestination } from "@/data/destinations";
import {
  planTrip,
} from "@/lib/domain/planner";
import { getAttractionById } from "@/data/destinations";
import {
  formatDateISO,
  formatBRL,
} from "@/lib/format/format";
import { categoryLabel, tagLabel } from "@/lib/seo/seo";
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

interface PlannerToolProps {
  destinations: readonly Destination[];
  initialDestinationSlug?: string | null;
}

const TRIP_STYLES: { value: TripStyle; label: string }[] = [
  { value: "economico", label: "Econômico" },
  { value: "relaxado", label: "Relaxado" },
  { value: "equilibrado", label: "Equilibrado" },
  { value: "intenso", label: "Intenso (ver tudo)" },
  { value: "aventura", label: "Aventura" },
  { value: "luxo", label: "Luxo" },
];

const LODGING_OPTIONS: { value: "economico" | "padrao" | "conforto" | "luxo"; label: string }[] = [
  { value: "economico", label: "Econômico (hostels, pousadas simples)" },
  { value: "padrao", label: "Padrão (hotéis intermediários)" },
  { value: "conforto", label: "Conforto (hotéis bons, bem localizados)" },
  { value: "luxo", label: "Luxo (alta categoria)" },
];

const TRANSPORT_OPTIONS: { value: TransportMode; label: string }[] = [
  { value: "nao_definido", label: "Ainda não decidi" },
  { value: "aviao", label: "Avião" },
  { value: "carro", label: "Carro próprio / alugado" },
  { value: "onibus", label: "Ônibus" },
  { value: "trem", label: "Trem" },
  { value: "misto", label: "Misto (vários meios)" },
];

const CHILD_AGE_OPTIONS: { value: ChildAgeBand; label: string }[] = [
  { value: "bebe", label: "Bebê (0 a 2 anos)" },
  { value: "crianca", label: "Criança (3 a 11 anos)" },
  { value: "adolescente", label: "Adolescente (12 a 17 anos)" },
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
  "vida_noturna",
];

/** Data padrão: daqui a 60 dias. */
function defaultDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function PlannerTool({
  destinations,
  initialDestinationSlug = null,
}: PlannerToolProps) {
  const [origin, setOrigin] = useState("São Paulo");
  const [destinationSlug, setDestinationSlug] = useState(
    initialDestinationSlug ?? destinations[0]?.slug ?? "",
  );
  const [departureDate, setDepartureDate] = useState(defaultDate(60));
  const [returnDate, setReturnDate] = useState(defaultDate(64));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAgeBand, setChildAgeBand] = useState<ChildAgeBand | "">("");
  const [budget, setBudget] = useState("");
  const [lodging, setLodging] = useState<"economico" | "padrao" | "conforto" | "luxo">("padrao");
  const [style, setStyle] = useState<TripStyle>("equilibrado");
  const [interests, setInterests] = useState<TravelTag[]>([]);
  const [transport, setTransport] = useState<TransportMode>("nao_definido");
  const [submitted, setSubmitted] = useState(false);

  const destination = useMemo(
    () => getDestination(destinationSlug) ?? null,
    [destinationSlug],
  );

  const budgetValue = useMemo(() => {
    const cleaned = budget.trim().replace(/\s/g, "");
    if (!cleaned) return null;
    const normalized = cleaned.includes(",")
      ? cleaned.replace(/\./g, "").replace(",", ".")
      : cleaned;
    const n = Number.parseFloat(normalized);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [budget]);

  const input = useMemo(
    () => ({
      origin,
      destinationSlug: destination?.slug ?? null,
      destinationLabel: destination ? null : destinationSlug || null,
      country: "Brasil",
      departureDate,
      returnDate,
      adults,
      children,
      childAgeBand: childAgeBand === "" ? null : childAgeBand,
      budgetBRL: budgetValue,
      currency: "BRL" as const,
      lodgingPreference: lodging,
      tripStyle: style,
      interests,
      accessibilityNeeds: [],
      transportMode: transport,
    }),
    [
      origin,
      destination,
      destinationSlug,
      departureDate,
      returnDate,
      adults,
      children,
      childAgeBand,
      budgetValue,
      lodging,
      style,
      interests,
      transport,
    ],
  );

  const result = useMemo(() => planTrip(input, destination), [input, destination]);

  const invalidDates = Boolean(
    departureDate && returnDate && returnDate <= departureDate,
  );

  function toggleInterest(tag: TravelTag) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
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
        <section
          aria-labelledby="planner-viagem"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
        >
          <h2 id="planner-viagem" className="text-base font-semibold text-[#0a1628]">
            Viagem
          </h2>

          <div className="mt-4 space-y-4">
            <Field label="Origem" htmlFor="pl-origem">
              <Input
                id="pl-origem"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Ex.: São Paulo"
              />
            </Field>

            <Field
              label="Destino"
              htmlFor="pl-destino"
              hint="Escolha um destino da base editorial para receber estimativas e atrações."
            >
              <Select
                id="pl-destino"
                value={destinationSlug}
                onChange={(e) => setDestinationSlug(e.target.value)}
              >
                <option value="">Destino fora da base (sem estimativa)</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.name} — {d.stateUF}
                  </option>
                ))}
              </Select>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ida" htmlFor="pl-ida">
                <Input
                  id="pl-ida"
                  type="date"
                  value={departureDate}
                  invalid={invalidDates}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </Field>
              <Field
                label="Volta"
                htmlFor="pl-volta"
                hint={invalidDates ? "A data de volta deve ser posterior à ida." : undefined}
              >
                <Input
                  id="pl-volta"
                  type="date"
                  value={returnDate}
                  invalid={invalidDates}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Adultos" htmlFor="pl-adultos">
                <Input
                  id="pl-adultos"
                  type="number"
                  min={1}
                  max={20}
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                />
              </Field>
              <Field label="Crianças" htmlFor="pl-criancas">
                <Input
                  id="pl-criancas"
                  type="number"
                  min={0}
                  max={10}
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                />
              </Field>
              <Field label="Idade das crianças" htmlFor="pl-idade">
                <Select
                  id="pl-idade"
                  value={childAgeBand}
                  disabled={children === 0}
                  onChange={(e) =>
                    setChildAgeBand(e.target.value as ChildAgeBand | "")
                  }
                >
                  <option value="">Não informar</option>
                  {CHILD_AGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="planner-preferencias"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
        >
          <h2
            id="planner-preferencias"
            className="text-base font-semibold text-[#0a1628]"
          >
            Preferências
          </h2>

          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Estilo de viagem" htmlFor="pl-estilo">
                <Select
                  id="pl-estilo"
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

              <Field label="Hospedagem" htmlFor="pl-hospedagem">
                <Select
                  id="pl-hospedagem"
                  value={lodging}
                  onChange={(e) =>
                    setLodging(
                      e.target.value as "economico" | "padrao" | "conforto" | "luxo",
                    )
                  }
                >
                  {LODGING_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                label="Orçamento total disponível"
                htmlFor="pl-orcamento"
                optional
                hint="Em reais. Usado para alertar quando a estimativa excede."
              >
                <Input
                  id="pl-orcamento"
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 6000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </Field>

              <Field label="Transporte principal" htmlFor="pl-transporte">
                <Select
                  id="pl-transporte"
                  value={transport}
                  onChange={(e) => setTransport(e.target.value as TransportMode)}
                >
                  {TRANSPORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-[#0a1628]">
                Interesses
              </legend>
              <p className="mt-1 text-xs text-[#8c8471]">
                Usados para sugerir atrações e foco de cada dia.
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {INTEREST_OPTIONS.map((tag) => {
                  const active = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleInterest(tag)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                        "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
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
            <Button type="submit" size="lg" disabled={invalidDates}>
              Gerar planejamento
            </Button>
          </div>
        </section>

        <EstimateDisclosure />
      </form>

      {/* ============================================================
          Resultado
          ============================================================ */}
      <div className="space-y-5">
        {!submitted && (
          <div className="rounded-2xl border border-dashed border-[#d6cfc0] bg-white p-8 text-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mx-auto text-[#b3ab99]"
            >
              <path d="M9 20l-5.5 2 1.5-6L21 4 9 20z" />
              <path d="M14 9l1 1" />
            </svg>
            <p className="mt-4 text-sm font-medium text-[#0a1628]">
              Preencha os dados e gere o planejamento
            </p>
            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#8c8471]">
              O resultado mostrará a estrutura de dias, a distribuição do
              orçamento, atrações sugeridas e os alertas do seu caso.
            </p>
          </div>
        )}

        {submitted && invalidDates && (
          <div role="alert" className="rounded-2xl border border-[#f6c9c9] bg-[#fdeaea] p-5">
            <p className="text-sm font-semibold text-[#a32b2b]">
              Datas inválidas
            </p>
            <p className="mt-1.5 text-sm text-[#a32b2b]">
              A data de volta deve ser posterior à data de ida.
            </p>
          </div>
        )}

        {submitted && !invalidDates && !result && (
          <div role="alert" className="rounded-2xl border border-[#f6c9c9] bg-[#fdeaea] p-5">
            <p className="text-sm font-semibold text-[#a32b2b]">
              Não foi possível gerar o planejamento
            </p>
            <p className="mt-1.5 text-sm text-[#a32b2b]">
              Verifique se as datas e o número de viajantes estão corretos.
            </p>
          </div>
        )}

        {submitted && !invalidDates && result && (
          <>
            {/* Alertas — sempre no topo */}
            {result.alerts.length > 0 && (
              <section aria-labelledby="alertas" className="space-y-3">
                <h2 id="alertas" className="sr-only">
                  Alertas de transparência
                </h2>
                {result.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "rounded-xl border p-4",
                      alert.severity === "atencao"
                        ? "border-[#f3ddb8] bg-[#fdf1dd]"
                        : "border-[#bfe3e1] bg-[#e6f4f4]",
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        alert.severity === "atencao"
                          ? "text-[#9a6206]"
                          : "text-[#0b4744]",
                      )}
                    >
                      {alert.title}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-xs leading-relaxed",
                        alert.severity === "atencao"
                          ? "text-[#9a6206]"
                          : "text-[#0b4744]/85",
                      )}
                    >
                      {alert.detail}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Resumo */}
            <section
              aria-labelledby="resumo-planner"
              className="rounded-2xl border border-[#0f2138] bg-[#0a1628] p-6 text-white"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4fcdd6]">
                Planejamento gerado
              </p>
              <h2
                id="resumo-planner"
                className="mt-2 text-2xl font-semibold tracking-tight"
              >
                {destination?.name ?? input.destinationLabel ?? "Viagem"}
              </h2>
              <p className="mt-1 text-sm text-white/60">{result.summary.label}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <MiniStat label="Dias" value={String(result.summary.totalDays)} />
                <MiniStat label="Noites" value={String(result.summary.nights)} />
                <MiniStat
                  label="Viajantes"
                  value={String(result.summary.travelers)}
                />
              </div>

              {result.estimatedTotalBRL > 0 ? (
                <div className="mt-5 rounded-xl bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    Custo total estimado
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-[#dfb45c]">
                    {formatBRL(result.estimatedTotalBRL)}
                  </p>
                  <p className="mt-1.5 text-xs text-white/50">
                    {destination
                      ? `Faixa base: R$ ${destination.cost.minPerDayBRL}–${destination.cost.maxPerDayBRL}/dia por pessoa`
                      : "Sem destino na base"}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-xl bg-white/5 p-4">
                  <p className="text-sm text-white/70">
                    Sem estimativa de custo — destino fora da base editorial.
                  </p>
                  <Link
                    href="/calculadora"
                    className="mt-2 inline-block text-sm font-medium text-[#86e0e6] underline underline-offset-2"
                  >
                    Use a Calculadora com seus próprios valores →
                  </Link>
                </div>
              )}
            </section>

            {/* Distribuição do orçamento */}
            {result.budgetSlices.length > 0 && (
              <section
                aria-labelledby="fatias"
                className="rounded-2xl border border-[#e8e3d8] bg-white p-5"
              >
                <h2 id="fatias" className="text-base font-semibold text-[#0a1628]">
                  Distribuição sugerida do orçamento
                </h2>
                <ul className="mt-4 space-y-3.5">
                  {result.budgetSlices.map((slice) => (
                    <li key={slice.category}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-[#16304f]">
                          {categoryLabel(slice.category)}
                        </span>
                        <span className="font-medium text-[#0a1628]">
                          {formatBRL(slice.amountBRL)}
                        </span>
                      </div>
                      <div className="rc-bar mt-1.5">
                        <span
                          style={{
                            width: `${Math.max(2, slice.share * 100)}%`,
                            background: "#17827c",
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Estrutura de dias */}
            {result.days.length > 0 && (
              <section
                aria-labelledby="estrutura"
                className="rounded-2xl border border-[#e8e3d8] bg-white p-5"
              >
                <h2 id="estrutura" className="text-base font-semibold text-[#0a1628]">
                  Estrutura de dias
                </h2>
                <ol className="mt-4 space-y-3">
                  {result.days.map((day) => {
                    const attractions = day.activityIds
                      .map((id) => getAttractionById(id))
                      .filter((a): a is NonNullable<typeof a> => Boolean(a));

                    return (
                      <li
                        key={day.day}
                        className="rounded-xl border border-[#f4f1ea] p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[#0a1628]">
                            {day.title}
                          </p>
                          {day.date && (
                            <p className="text-xs text-[#8c8471]">
                              <time dateTime={day.date}>
                                {formatDateISO(day.date)}
                              </time>
                            </p>
                          )}
                        </div>

                        {day.focus.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {day.focus.map((f) => (
                              <Badge key={f} tone="teal">
                                {tagLabel(f)}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {attractions.length > 0 ? (
                          <ul className="mt-2.5 space-y-1.5">
                            {attractions.map((a) => (
                              <li
                                key={a.id}
                                className="flex items-start gap-2 text-sm text-[#16304f]"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9952f]"
                                />
                                {a.name}
                                <span className="ml-auto shrink-0 text-xs text-[#8c8471]">
                                  {a.isFree ? "gratuita" : "com ingresso"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-xs leading-relaxed text-[#8c8471]">
                            {day.notes ||
                              "Sem atrações sugeridas — adicione manualmente no construtor de roteiro."}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {/* Metodologia */}
            <section
              aria-labelledby="metodologia-planner"
              className="rounded-2xl border border-[#e8e3d8] bg-[#faf8f4] p-5"
            >
              <h2
                id="metodologia-planner"
                className="text-xs font-semibold uppercase tracking-wider text-[#16304f]"
              >
                Metodologia da estimativa
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#8c8471]">
                {result.methodology}
              </p>
              <p className="mt-2.5 text-xs text-[#8c8471]">
                Data de referência:{" "}
                <time
                  dateTime={result.referenceDate}
                  className="font-medium text-[#16304f]"
                >
                  {result.referenceDate.split("-").reverse().join("/")}
                </time>
              </p>
            </section>

            <EstimateNote>
              Estimativas de planejamento — não cotações em tempo real. Confirme
              preços e disponibilidade com os provedores antes de reservar.
            </EstimateNote>

            {/* Próximos passos */}
            <div className="flex flex-wrap gap-2.5">
              <Link
                href={`/roteiro?destino=${destinationSlug}`}
                className="inline-flex h-11 items-center rounded-xl bg-[#0a1628] px-5 text-sm font-medium text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                Montar roteiro detalhado
              </Link>
              <Link
                href={`/calculadora?destino=${destinationSlug}`}
                className="inline-flex h-11 items-center rounded-xl border border-[#e8e3d8] bg-white px-5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                Ajustar no cálculo de orçamento
              </Link>
              <Link
                href="/comparador"
                className="inline-flex h-11 items-center rounded-xl border border-[#e8e3d8] bg-white px-5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                Comparar com outros destinos
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ===================================================================== */

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/60">{label}</p>
    </div>
  );
}
