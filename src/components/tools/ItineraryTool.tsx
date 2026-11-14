"use client";

/**
 * =====================================================================
 * RotaClara — Ferramenta de construção de roteiro
 * ---------------------------------------------------------------------
 * Estado do roteiro gerenciado com operações puras do módulo itinerary.
 * Persistência apenas em localStorage do navegador. Tempos e custos são
 * estimativas declaradas pelo usuário — sempre rotuladas como tal.
 * =====================================================================
 */

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type {
  DayPart,
  Destination,
  Itinerary,
  ItineraryActivity,
} from "@/lib/domain/types";
import {
  addActivity,
  addDay,
  createActivity,
  createItinerary,
  DAY_PART_LABELS,
  DAY_PARTS,
  exportItineraryText,
  itineraryFilename,
  overloadedDays,
  removeActivity,
  removeDay,
  renameDay,
  reorderActivities,
  totalActivities,
  totalItineraryCost,
  totalVisitMinutes,
} from "@/lib/domain/itinerary";
import {
  getItinerarySnapshot,
  getServerItinerarySnapshot,
  itineraryFromRaw,
  rawFromItinerary,
  saveItineraryState,
  subscribeItinerary,
} from "@/lib/storage/itineraryStore";
import { formatBRL, formatDateISO, formatDuration } from "@/lib/format/format";
import { EstimateDisclosure } from "@/components/ui/Notice";
import {
  Badge,
  Button,
  ButtonLink,
  EmptyState,
  EstimateNote,
  Field,
  Input,
  Select,
} from "@/components/ui/primitives";
import { cn } from "@/lib/ui/cn";

interface ItineraryToolProps {
  destinations: readonly Destination[];
  initialDestinationSlug?: string | null;
}

/** Data padrão: daqui a 30 dias. */
function defaultDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/* =====================================================================
   Formulário de criação
   ===================================================================== */

interface SetupState {
  title: string;
  destinationSlug: string;
  origin: string;
  startDate: string;
  dayCount: string;
}

function SetupForm({
  destinations,
  initialDestinationSlug,
  onCreate,
}: {
  destinations: readonly Destination[];
  initialDestinationSlug: string | null;
  onCreate: (itinerary: Itinerary) => void;
}) {
  const [setup, setSetup] = useState<SetupState>({
    title: "Minha viagem",
    destinationSlug: initialDestinationSlug ?? "",
    origin: "São Paulo",
    startDate: defaultDate(30),
    dayCount: "4",
  });

  const dayCount = Number(setup.dayCount);
  const invalidDays = !Number.isFinite(dayCount) || dayCount < 1 || dayCount > 60;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (invalidDays) return;

    onCreate(
      createItinerary({
        title: setup.title,
        destinationSlug: setup.destinationSlug || null,
        origin: setup.origin,
        startDate: setup.startDate || null,
        dayCount,
      }),
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
      noValidate
    >
      <h2 className="text-base font-semibold text-[#0a1628]">Nova viagem</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-[#8c8471]">
        Preencha os dados para abrir os dias do roteiro. Você poderá adicionar
        atividades em seguida.
      </p>

      <div className="mt-4 space-y-4">
        <Field label="Título do roteiro" htmlFor="it-titulo">
          <Input
            id="it-titulo"
            type="text"
            value={setup.title}
            onChange={(e) => setSetup({ ...setup, title: e.target.value })}
            placeholder="Ex.: Férias no Nordeste"
          />
        </Field>

        <Field label="Destino" htmlFor="it-destino" optional>
          <Select
            id="it-destino"
            value={setup.destinationSlug}
            onChange={(e) =>
              setSetup({ ...setup, destinationSlug: e.target.value })
            }
          >
            <option value="">Sem destino definido</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} — {d.stateUF}
              </option>
            ))}
          </Select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Origem" htmlFor="it-origem">
            <Input
              id="it-origem"
              type="text"
              value={setup.origin}
              onChange={(e) => setSetup({ ...setup, origin: e.target.value })}
            />
          </Field>

          <Field label="Início" htmlFor="it-inicio" optional>
            <Input
              id="it-inicio"
              type="date"
              value={setup.startDate}
              onChange={(e) => setSetup({ ...setup, startDate: e.target.value })}
            />
          </Field>

          <Field
            label="Dias"
            htmlFor="it-dias"
            hint={invalidDays ? "Informe de 1 a 60 dias." : undefined}
          >
            <Input
              id="it-dias"
              type="number"
              min={1}
              max={60}
              value={setup.dayCount}
              invalid={invalidDays}
              onChange={(e) => setSetup({ ...setup, dayCount: e.target.value })}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="submit" size="lg" disabled={invalidDays}>
          Abrir roteiro
        </Button>
      </div>
    </form>
  );
}

/* =====================================================================
   Formulário de atividade (por dia)
   ===================================================================== */

interface ActivityDraft {
  part: DayPart;
  title: string;
  address: string;
  minutes: string;
  cost: string;
  notes: string;
  isTransit: boolean;
}

const EMPTY_DRAFT: ActivityDraft = {
  part: "manha",
  title: "",
  address: "",
  minutes: "90",
  cost: "",
  notes: "",
  isTransit: false,
};

function parsePositive(raw: string, fallback: number): number {
  const cleaned = raw.trim().replace(/\s/g, "");
  if (!cleaned) return fallback;
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function ActivityForm({
  onAdd,
  onCancel,
}: {
  onAdd: (args: {
    part: DayPart;
    title: string;
    address?: string;
    estimatedMinutes?: number;
    notes?: string;
    estimatedCostBRL?: number;
    isTransit?: boolean;
  }) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<ActivityDraft>(EMPTY_DRAFT);

  const invalidTitle = draft.title.trim().length === 0;
  const invalidMinutes =
    draft.minutes !== "" &&
    (!Number.isFinite(Number(draft.minutes)) || Number(draft.minutes) < 15);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (invalidTitle || invalidMinutes) return;

    onAdd({
      part: draft.part,
      title: draft.title,
      address: draft.address,
      estimatedMinutes: parsePositive(draft.minutes, 90),
      notes: draft.notes,
      estimatedCostBRL: parsePositive(draft.cost, 0),
      isTransit: draft.isTransit,
    });
    setDraft(EMPTY_DRAFT);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 rounded-xl border border-[#d6cfc0] bg-[#faf8f4] p-3.5"
      noValidate
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`nf-part-${draft.part}`} className="sr-only">
            Período
          </label>
          <Select
            id={`nf-part-${draft.part}`}
            value={draft.part}
            onChange={(e) =>
              setDraft({ ...draft, part: e.target.value as DayPart })
            }
          >
            {DAY_PARTS.map((p) => (
              <option key={p} value={p}>
                {DAY_PART_LABELS[p]}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="nf-title" className="sr-only">
            Título da atividade
          </label>
          <Input
            id="nf-title"
            type="text"
            placeholder="Ex.: Centro histórico *"
            value={draft.title}
            invalid={invalidTitle}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="nf-address" className="sr-only">
            Endereço ou ponto de referência
          </label>
          <Input
            id="nf-address"
            type="text"
            placeholder="Endereço ou referência (opcional)"
            value={draft.address}
            onChange={(e) => setDraft({ ...draft, address: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="nf-minutes" className="sr-only">
              Tempo estimado em minutos
            </label>
            <Input
              id="nf-minutes"
              type="number"
              min={15}
              max={720}
              step={15}
              placeholder="Minutos"
              value={draft.minutes}
              invalid={invalidMinutes}
              onChange={(e) => setDraft({ ...draft, minutes: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="nf-cost" className="sr-only">
              Custo previsto em reais
            </label>
            <Input
              id="nf-cost"
              type="text"
              inputMode="decimal"
              placeholder="Custo R$"
              value={draft.cost}
              onChange={(e) => setDraft({ ...draft, cost: e.target.value })}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="nf-notes" className="sr-only">
            Observações
          </label>
          <Input
            id="nf-notes"
            type="text"
            placeholder="Observações (opcional)"
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          />
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-[#16304f]">
        <input
          type="checkbox"
          checked={draft.isTransit}
          onChange={(e) => setDraft({ ...draft, isTransit: e.target.checked })}
          className="h-4 w-4 rounded border-[#d6cfc0] accent-[#17827c]"
        />
        É um deslocamento (não conta como tempo de visita)
      </label>

      <div className="mt-3.5 flex flex-wrap justify-end gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" size="sm" disabled={invalidTitle}>
          Adicionar
        </Button>
      </div>
      {invalidTitle && (
        <p className="mt-2 text-right text-xs text-[#a32b2b]">
          O título é obrigatório.
        </p>
      )}
    </form>
  );
}

/* =====================================================================
   Exibição de uma atividade
   ===================================================================== */

function ActivityRow({
  activity,
  index,
  count,
  onRemove,
  onMove,
}: {
  activity: ItineraryActivity;
  index: number;
  count: number;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
}) {
  return (
    <li
      className={cn(
        "rounded-lg border p-3",
        activity.isTransit
          ? "border-dashed border-[#d6cfc0] bg-[#faf8f4]"
          : "border-[#f4f1ea] bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#0a1628]">
            {activity.title}
            {activity.isTransit && (
              <span className="ml-2 text-xs font-normal text-[#8c8471]">
                (deslocamento)
              </span>
            )}
          </p>
          {activity.address && (
            <p className="mt-0.5 text-xs text-[#8c8471]">{activity.address}</p>
          )}
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8c8471]">
            <span>≈ {formatDuration(activity.estimatedMinutes)}</span>
            {activity.estimatedCostBRL > 0 && (
              <span className="font-medium text-[#16304f]">
                {formatBRL(activity.estimatedCostBRL)}
              </span>
            )}
            <span className="text-[#b3ab99]">estimativa</span>
          </div>
          {activity.notes && (
            <p className="mt-1.5 text-xs leading-relaxed text-[#8c8471]">
              {activity.notes}
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            aria-label={`Mover ${activity.title} para cima`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e3d8] text-[#16304f] transition-colors hover:bg-[#f4f1ea] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={index === count - 1}
            aria-label={`Mover ${activity.title} para baixo`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e3d8] text-[#16304f] transition-colors hover:bg-[#f4f1ea] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remover ${activity.title}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e3d8] text-[#a32b2b] transition-colors hover:bg-[#fdeaea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            ✕
          </button>
        </div>
      </div>
    </li>
  );
}

/* =====================================================================
   Ferramenta principal
   ===================================================================== */

export function ItineraryTool({
  destinations,
  initialDestinationSlug = null,
}: ItineraryToolProps) {
  // Store externo (localStorage) assinado via useSyncExternalStore:
  // leitura e persistência acontecem fora do ciclo de render, com
  // snapshot estável para SSR/hidratação.
  const store = useSyncExternalStore(
    subscribeItinerary,
    getItinerarySnapshot,
    getServerItinerarySnapshot,
  );

  const itinerary = useMemo(() => itineraryFromRaw(store.raw), [store.raw]);

  const [formForDay, setFormForDay] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  /** Grava uma alteração no store (persistência automática). */
  const commit = useCallback((next: Itinerary | null) => {
    saveItineraryState(next ? rawFromItinerary(next) : null);
  }, []);

  const hydrated = !store.isServer;
  const storageError = store.error || copyFailed;

  const destination = useMemo(
    () =>
      destinations.find((d) => d.slug === itinerary?.destinationSlug) ?? null,
    [destinations, itinerary?.destinationSlug],
  );

  const overloaded = useMemo(
    () => (itinerary ? overloadedDays(itinerary) : []),
    [itinerary],
  );

  const totals = useMemo(
    () =>
      itinerary
        ? {
            activities: totalActivities(itinerary),
            minutes: totalVisitMinutes(itinerary),
            cost: totalItineraryCost(itinerary),
          }
        : { activities: 0, minutes: 0, cost: 0 },
    [itinerary],
  );

  const handleCreate = useCallback(
    (next: Itinerary) => {
      commit(next);
      setFormForDay(null);
    },
    [commit],
  );

  function handleExport() {
    if (!itinerary) return;
    const text = exportItineraryText(itinerary);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = itineraryFilename(itinerary);
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleCopy() {
    if (!itinerary) return;
    try {
      await navigator.clipboard.writeText(exportItineraryText(itinerary));
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  }

  function handleReset() {
    if (
      window.confirm(
        "Apagar o roteiro salvo neste navegador? Essa ação não pode ser desfeita.",
      )
    ) {
      commit(null);
      setFormForDay(null);
    }
  }

  /* ---------------------------------------------------------------
     Estado inicial
     --------------------------------------------------------------- */
  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="h-96 animate-pulse rounded-2xl border border-[#e8e3d8] bg-white" />
        <div className="h-96 animate-pulse rounded-2xl border border-[#e8e3d8] bg-white" />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <SetupForm
          destinations={destinations}
          initialDestinationSlug={initialDestinationSlug}
          onCreate={handleCreate}
        />
        <EmptyState
          title="Nenhum roteiro aberto"
          description="Crie uma viagem ao lado para abrir os dias e começar a adicionar atividades. O roteiro fica salvo apenas neste navegador."
          action={
            <ButtonLink href="/planejador" variant="secondary">
              Preciso de sugestões primeiro
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const hasDestination = Boolean(destination);

  /* ---------------------------------------------------------------
     Roteiro aberto
     --------------------------------------------------------------- */
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
      {/* ============================================================
          Coluna esquerda — resumo e controles
          ============================================================ */}
      <div className="space-y-5 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
        <section
          aria-labelledby="resumo-roteiro"
          className="rounded-2xl border border-[#0f2138] bg-[#0a1628] p-6 text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#4fcdd6]">
            Roteiro em edição
          </p>
          <h2
            id="resumo-roteiro"
            className="mt-2 text-2xl font-semibold tracking-tight"
          >
            {itinerary.title}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {destination
              ? `${destination.name} · ${destination.stateUF}`
              : "Destino fora da base editorial"}
            {itinerary.origin ? ` · saindo de ${itinerary.origin}` : ""}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <MiniStat label="Dias" value={String(itinerary.days.length)} />
            <MiniStat label="Atividades" value={String(totals.activities)} />
            <MiniStat label="Visitas" value={formatDuration(totals.minutes)} />
          </div>

          <div className="mt-4 rounded-xl bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-white/60">
              Custo previsto no roteiro
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#dfb45c]">
              {formatBRL(totals.cost)}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/50">
              Soma dos valores que você informou em cada atividade. Não é uma
              cotação.
            </p>
          </div>

          {itinerary.startDate && (
            <p className="mt-4 text-xs text-white/50">
              Período: {formatDateISO(itinerary.startDate)}
              {itinerary.endDate && ` a ${formatDateISO(itinerary.endDate)}`}
            </p>
          )}
        </section>

        {/* Alertas de sobrecarga */}
        {overloaded.length > 0 && (
          <div
            role="status"
            className="rounded-xl border border-[#f3ddb8] bg-[#fdf1dd] p-4"
          >
            <p className="text-sm font-semibold text-[#9a6206]">
              {overloaded.length}{" "}
              {overloaded.length === 1
                ? "dia está acima"
                : "dias estão acima"}{" "}
              de 8 horas de visita
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#9a6206]">
              Reveja tempos estimados ou divida as atividades. Dias muito cheios
              costumam ser irrealistas na prática.
            </p>
          </div>
        )}

        {/* Ações */}
        <section
          aria-labelledby="acoes-roteiro"
          className="rounded-2xl border border-[#e8e3d8] bg-white p-5"
        >
          <h2 id="acoes-roteiro" className="text-base font-semibold text-[#0a1628]">
            Exportar e gerenciar
          </h2>
          <div className="mt-3.5 flex flex-col gap-2">
            <Button type="button" onClick={handleExport}>
              Baixar roteiro (.txt)
            </Button>
            <Button type="button" variant="secondary" onClick={handleCopy}>
              {copied ? "Copiado!" : "Copiar roteiro em texto"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => commit(addDay(itinerary))}
            >
              + Adicionar dia
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="text-[#a32b2b] hover:bg-[#fdeaea]"
            >
              Apagar roteiro
            </Button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#8c8471]">
            Salvo automaticamente apenas neste navegador. Nada é enviado para
            servidores.
          </p>
        </section>

        {storageError && (
          <div
            role="alert"
            className="rounded-xl border border-[#f6c9c9] bg-[#fdeaea] p-4"
          >
            <p className="text-sm font-semibold text-[#a32b2b]">
              Não foi possível salvar neste navegador
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#a32b2b]">
              O armazenamento local pode estar bloqueado. Você ainda pode
              exportar o roteiro em texto antes de fechar a página.
            </p>
          </div>
        )}

        {!hasDestination && (
          <div className="rounded-xl border border-[#bfe3e1] bg-[#e6f4f4] p-4">
            <p className="text-sm font-semibold text-[#0b4744]">
              Destino fora da base editorial
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#0b4744]/85">
              Sem atrações sugeridas automaticamente — monte o roteiro
              manualmente ou use o planejador com um destino da base.
            </p>
          </div>
        )}

        <EstimateNote>
          Tempos de visita e custos deste roteiro são{" "}
          <strong>estimativas declaradas por você</strong>, não medições reais
          nem preços confirmados.
        </EstimateNote>
      </div>

      {/* ============================================================
          Coluna direita — dias
          ============================================================ */}
      <div className="space-y-5">
        <EstimateDisclosure />

        {itinerary.days.map((day) => {
          const isOverloaded = overloaded.includes(day.id);
          const dayCost = day.activities.reduce(
            (s, a) => s + a.estimatedCostBRL,
            0,
          );
          const dayMinutes = day.activities
            .filter((a) => !a.isTransit)
            .reduce((s, a) => s + a.estimatedMinutes, 0);

          return (
            <section
              key={day.id}
              aria-labelledby={`dia-${day.id}`}
              className={cn(
                "rounded-2xl border bg-white p-5",
                isOverloaded ? "border-[#e0a83a]" : "border-[#e8e3d8]",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="text"
                    aria-label={`Título do dia ${day.day}`}
                    value={day.title}
                    onChange={(e) =>
                      commit(renameDay(itinerary, day.id, e.target.value))
                    }
                    className="rounded-lg border border-transparent bg-transparent px-2 py-1 text-base font-semibold text-[#0a1628] transition-colors hover:border-[#e8e3d8] focus:border-[#17827c] focus:outline-none"
                  />
                  {day.date && (
                    <p className="text-xs text-[#8c8471]">
                      <time dateTime={day.date}>{formatDateISO(day.date)}</time>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isOverloaded && <Badge tone="gold">Dia sobrecarregado</Badge>}
                  <Badge tone="default">
                    {formatDuration(dayMinutes)}
                    {dayCost > 0 && ` · ${formatBRL(dayCost)}`}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => commit(removeDay(itinerary, day.id))}
                    disabled={itinerary.days.length <= 1}
                    aria-label={`Remover ${day.title}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e8e3d8] text-[#a32b2b] transition-colors hover:bg-[#fdeaea] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Atividades por período */}
              {DAY_PARTS.map((part) => {
                const inPart = day.activities.filter((a) => a.part === part);

                return (
                  <div key={part} className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8c8471]">
                      {DAY_PART_LABELS[part]}
                    </p>

                    {inPart.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {inPart.map((a, i) => (
                          <ActivityRow
                            key={a.id}
                            activity={a}
                            index={i}
                            count={inPart.length}
                            onRemove={() =>
                              commit(removeActivity(itinerary, a.id))
                            }
                            onMove={(dir) =>
                              commit(
                                reorderActivities(
                                  itinerary,
                                  day.id,
                                  part,
                                  i,
                                  i + dir,
                                ),
                              )
                            }
                          />
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 rounded-lg border border-dashed border-[#e8e3d8] px-3 py-2.5 text-xs text-[#b3ab99]">
                        Sem atividades neste período.
                      </p>
                    )}
                  </div>
                );
              })}

              {/* Formulário de nova atividade */}
              {formForDay === day.id ? (
                <ActivityForm
                  onCancel={() => setFormForDay(null)}
                  onAdd={(args) => {
                    commit(
                      addActivity(itinerary, day.id, createActivity(args)),
                    );
                    setFormForDay(null);
                  }}
                />
              ) : (
                <div className="mt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setFormForDay(day.id)}
                  >
                    + Adicionar atividade
                  </Button>
                </div>
              )}
            </section>
          );
        })}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => commit(addDay(itinerary))}
          >
            + Adicionar dia ao final
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   Auxiliares
   ===================================================================== */

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/60">{label}</p>
    </div>
  );
}
