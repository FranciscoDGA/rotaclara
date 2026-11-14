"use client";

/**
 * =====================================================================
 * RotaClara — Ferramenta de comparação
 * ---------------------------------------------------------------------
 * Seleção de até 3 destinos + tabela de critérios gerada por
 * `compareDestinations` (domínio puro). A transparência dos critérios
 * é exibida junto ao resultado.
 * =====================================================================
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Destination } from "@/lib/domain/types";
import { COMPARE_CRITERIA, compareDestinations } from "@/lib/domain/compare";
import { DestinationArt } from "@/components/ui/DestinationArt";
import { Methodology } from "@/components/ui/Notice";
import { Badge, Button, EmptyState, Field, Select } from "@/components/ui/primitives";
import { cn } from "@/lib/ui/cn";

interface CompareToolProps {
  destinations: readonly Destination[];
}

const MAX_SELECTION = 3;

export function CompareTool({ destinations }: CompareToolProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    destinations[0]?.slug ?? "",
    destinations[1]?.slug ?? "",
  ]);

  const selected = useMemo(
    () =>
      selectedSlugs
        .map((slug) => destinations.find((d) => d.slug === slug))
        .filter((d): d is Destination => Boolean(d)),
    [selectedSlugs, destinations],
  );

  const result = useMemo(() => compareDestinations(selected), [selected]);

  function setSlot(index: number, slug: string) {
    setSelectedSlugs((prev) => {
      const next = [...prev];
      // Evita duplicar o mesmo destino em dois slots.
      if (slug && next.some((s, i) => s === slug && i !== index)) return prev;
      next[index] = slug;
      return next;
    });
  }

  function addSlot() {
    setSelectedSlugs((prev) => [...prev, ""]);
  }

  function removeSlot(index: number) {
    setSelectedSlugs((prev) => prev.filter((_, i) => i !== index));
  }

  const filled = selectedSlugs.filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* ============================================================
          Seleção
          ============================================================ */}
      <section
        aria-labelledby="selecao"
        className="rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="selecao" className="text-base font-semibold text-[#0a1628]">
            Destinos comparados
          </h2>
          <p className="text-xs text-[#8c8471]">
            {filled} de até {MAX_SELECTION} selecionados
          </p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selectedSlugs.map((slug, index) => (
            <div key={index}>
              <Field label={`Destino ${index + 1}`} htmlFor={`cmp-${index}`}>
                <Select
                  id={`cmp-${index}`}
                  value={slug}
                  onChange={(e) => setSlot(index, e.target.value)}
                >
                  <option value="">— Escolher —</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name} — {d.stateUF}
                    </option>
                  ))}
                </Select>
              </Field>
              {selectedSlugs.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  className="mt-1.5 text-xs font-medium text-[#a32b2b] underline underline-offset-2 hover:text-[#7d1f1f] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                >
                  Remover slot
                </button>
              )}
            </div>
          ))}

          {selectedSlugs.length < MAX_SELECTION && (
            <div className="flex items-end">
              <Button type="button" variant="secondary" onClick={addSlot}>
                + Adicionar destino
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          Resultado
          ============================================================ */}
      {!result && (
        <EmptyState
          title="Selecione ao menos dois destinos diferentes"
          description="O comparador precisa de pelo menos dois destinos distintos para montar a tabela de critérios."
        />
      )}

      {result && (
        <div className="space-y-8">
          {/* Cabeçalhos dos destinos */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinos/${d.slug}`}
                className="rc-card rc-card-hover group overflow-hidden focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                <span className="block h-28 w-full overflow-hidden">
                  <DestinationArt
                    palette={d.palette}
                    seed={d.slug.length + 3}
                    alt=""
                    className="h-full w-full"
                  />
                </span>
                <span className="block p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-[#0a1628] group-hover:text-[#17827c]">
                      {d.name}
                    </span>
                    <Badge tone="gold">{d.stateUF}</Badge>
                  </span>
                  <span className="mt-1 block text-xs text-[#8c8471]">
                    {d.region} · {d.tagline.slice(0, 60)}
                    {d.tagline.length > 60 ? "…" : ""}
                  </span>
                  <span className="mt-2 block text-xs font-medium text-[#17827c]">
                    Ver guia completo →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* Diferenças objetivas */}
          {result.differences.length > 0 && (
            <section aria-labelledby="diferencas">
              <h2
                id="diferencas"
                className="text-xl font-semibold tracking-tight text-[#0a1628]"
              >
                Diferenças objetivas
              </h2>
              <ul className="mt-4 space-y-2.5">
                {result.differences.map((diff) => (
                  <li
                    key={diff}
                    className="flex items-start gap-2.5 rounded-xl border border-[#e8e3d8] bg-white p-4 text-sm leading-relaxed text-[#16304f]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9952f]"
                    />
                    {diff}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tabela de critérios */}
          <section aria-labelledby="tabela">
            <h2
              id="tabela"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              Critério a critério
            </h2>
            <p className="mt-2 text-sm text-[#8c8471]">
              A coluna marcada como “vantagem” indica apenas critérios
              mensuráveis declarados — custo, distância, duração e volume de
              conteúdo verificado.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <caption className="sr-only">
                  Comparação entre{" "}
                  {result.destinations.map((d) => d.name).join(", ")}
                </caption>
                <thead>
                  <tr className="border-b border-[#e8e3d8]">
                    <th
                      scope="col"
                      className="py-3 pr-4 text-left font-semibold text-[#0a1628]"
                    >
                      Critério
                    </th>
                    {result.destinations.map((d) => (
                      <th
                        key={d.slug}
                        scope="col"
                        className="py-3 pr-4 text-left font-semibold text-[#0a1628]"
                      >
                        {d.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr
                      key={row.criterion}
                      className="border-b border-[#f4f1ea] align-top"
                    >
                      <th
                        scope="row"
                        className="py-3.5 pr-4 text-left font-medium text-[#16304f]"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, i) => {
                        const isBetter = row.betterIndex === i;
                        return (
                          <td
                            key={`${row.criterion}-${i}`}
                            className={cn(
                              "py-3.5 pr-4",
                              isBetter
                                ? "bg-[#fdf4e3]/70 font-medium text-[#0a1628]"
                                : "text-[#16304f]/85",
                            )}
                          >
                            {value}
                            {isBetter && (
                              <span className="mt-1.5 block">
                                <Badge tone="gold">Vantagem</Badge>
                              </span>
                            )}
                            {isBetter && row.rationale && (
                              <span className="mt-1 block text-xs font-normal leading-relaxed text-[#9a6206]">
                                {row.rationale}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[#8c8471]">
              Critérios exibidos na tabela: {COMPARE_CRITERIA.length}. Quando não
              há base para comparar, o valor aparece como “Sem dado disponível” —
              em vez de uma estimativa inventada.
            </p>
          </section>

          {/* Metodologia */}
          <section aria-labelledby="metodologia-cmp">
            <h2
              id="metodologia-cmp"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              Como comparamos
            </h2>
            <div className="mt-4">
              <Methodology referenceDate="2026-11-13">
                <p>{result.methodology}</p>
                <p className="mt-2">
                  Os valores exibidos vêm da base editorial de cada destino, com
                  fontes e datas de consulta próprias. Confira a página do
                  destino para ver a metodologia completa de custos.
                </p>
              </Methodology>
            </div>
          </section>

          {/* Próximos passos */}
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/planejador"
              className="inline-flex h-11 items-center rounded-xl bg-[#0a1628] px-5 text-sm font-medium text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              Planejar a viagem escolhida
            </Link>
            <Link
              href="/calculadora"
              className="inline-flex h-11 items-center rounded-xl border border-[#e8e3d8] bg-white px-5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              Calcular orçamento
            </Link>
            <Link
              href="/destinos"
              className="inline-flex h-11 items-center rounded-xl border border-[#e8e3d8] bg-white px-5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              Explorar mais destinos
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
