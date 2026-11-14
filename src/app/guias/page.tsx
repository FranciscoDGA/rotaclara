/**
 * =====================================================================
 * RotaClara — Guias editoriais (/guias)
 * ---------------------------------------------------------------------
 * Índice de todos os guias publicados, agrupados por região, com
 * data de atualização e fontes. Cada guia leva à página do destino.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Methodology } from "@/components/ui/Notice";
import {
  Badge,
  ButtonLink,
  EmptyState,
} from "@/components/ui/primitives";
import { allDestinations } from "@/data/destinations";
import { allGuides } from "@/data/guides";
import type { Region } from "@/lib/domain/types";
import { formatDateISO } from "@/lib/format/format";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guias editoriais",
  description:
    "Índice dos guias de viagem da RotaClara: seções completas, perguntas " +
    "frequentes, fontes consultadas e data de atualização de cada destino.",
  path: "/guias",
});

/** Ordem das regiões na exibição. */
const REGION_ORDER: readonly Region[] = [
  "Sudeste",
  "Nordeste",
  "Norte",
  "Centro-Oeste",
  "Sul",
] as const;

export default function GuiasPage() {
  const guideSlugs = new Set(allGuides.map((g) => g.slug));

  const withGuide = allDestinations.filter((d) => guideSlugs.has(d.slug));
  const withoutGuide = allDestinations.filter((d) => !guideSlugs.has(d.slug));

  // Agrupa por região seguindo a ordem declarada.
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    items: withGuide.filter((d) => d.region === region),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Guias" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Conteúdo</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Guias editoriais
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Cada guia reúne seções de planejamento, perguntas frequentes, fontes
          consultadas e a data da última revisão. Nada de “top 10” sem critério:
          o conteúdo é escrito para preparar a viagem.
        </p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Guias publicados" value={String(allGuides.length)} />
        <Stat label="Com guia completo" value={String(withGuide.length)} />
        <Stat
          label="Perguntas frequentes"
          value={String(allGuides.reduce((s, g) => s + g.faq.length, 0))}
        />
      </div>

      {/* ============================================================
          Guias por região
          ============================================================ */}
      {byRegion.map((group) => (
        <section
          key={group.region}
          aria-labelledby={`regiao-${group.region}`}
          className="mt-12"
        >
          <div className="flex items-baseline gap-3">
            <h2
              id={`regiao-${group.region}`}
              className="text-2xl font-semibold tracking-tight text-[#0a1628]"
            >
              {group.region}
            </h2>
            <span className="text-sm text-[#8c8471]">
              {group.items.length}{" "}
              {group.items.length === 1 ? "guia" : "guias"}
            </span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((d) => {
              const guide = allGuides.find((g) => g.slug === d.slug);
              if (!guide) return null;

              return (
                <Link
                  key={d.slug}
                  href={`/destinos/${d.slug}`}
                  className="rc-card rc-card-hover group flex h-full flex-col focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-base font-semibold text-[#0a1628] group-hover:text-[#17827c]">
                      {d.name}
                    </span>
                    <Badge tone="gold">{d.stateUF}</Badge>
                  </span>

                  <span className="mt-1.5 block text-xs text-[#8c8471]">
                    {d.region} · {guide.sections.length}{" "}
                    {guide.sections.length === 1 ? "seção" : "seções"} ·{" "}
                    {guide.faq.length}{" "}
                    {guide.faq.length === 1 ? "pergunta" : "perguntas"}
                  </span>

                  <span className="mt-3 flex-1 text-sm leading-relaxed text-[#16304f]/85">
                    {d.tagline}
                  </span>

                  <span className="mt-4 flex items-center justify-between border-t border-[#f4f1ea] pt-3.5">
                    <span className="text-[11px] text-[#8c8471]">
                      Atualizado em{" "}
                      <time dateTime={guide.updatedAt}>
                        {formatDateISO(guide.updatedAt)}
                      </time>
                    </span>
                    <span className="text-xs font-medium text-[#17827c]">
                      Abrir guia →
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {/* ============================================================
          Destinos sem guia completo
          ============================================================ */}
      {withoutGuide.length > 0 && (
        <section aria-labelledby="em-producao" className="mt-14">
          <h2
            id="em-producao"
            className="text-2xl font-semibold tracking-tight text-[#0a1628]"
          >
            Em produção
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#8c8471]">
            Estes destinos já têm página na base, mas o guia completo ainda
            está em revisão. Preferimos publicar com a qualidade certa a
            completar a lista às pressas.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {withoutGuide.map((d) => (
              <Link
                key={d.slug}
                href={`/destinos/${d.slug}`}
                className="rounded-xl border border-[#e8e3d8] bg-white px-4 py-2.5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                {d.name} — {d.stateUF}
              </Link>
            ))}
          </div>
        </section>
      )}

      {withGuide.length === 0 && (
        <div className="mt-10">
          <EmptyState
            title="Nenhum guia publicado ainda"
            description="Os guias editoriais estão em produção. Enquanto isso, explore a lista completa de destinos."
            action={
              <ButtonLink href="/destinos" variant="secondary">
                Ver destinos
              </ButtonLink>
            }
          />
        </div>
      )}

      {/* ============================================================
          Metodologia
          ============================================================ */}
      <section aria-labelledby="metodologia-guias" className="mt-14 max-w-3xl">
        <h2
          id="metodologia-guias"
          className="text-xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como os guias são construídos
        </h2>
        <div className="mt-4">
          <Methodology referenceDate="2026-11-13">
            <p>
              Cada guia é revisado com fontes oficiais (Ministério do Turismo,
              prefeituras, institutos de turismo estaduais e páginas oficiais
              de cada localidade), com a data de consulta registrada na página
              do destino.
            </p>
            <p className="mt-2">
              Valores de custo são estimativas com metodologia declarada —
              nunca cotações. Quando não há dado confiável, a página diz “sem
              dado disponível” em vez de preencher com número inventado.
            </p>
          </Methodology>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <ButtonLink href="/metodologia">Ler a metodologia completa</ButtonLink>
          <ButtonLink href="/destinos" variant="secondary">
            Explorar todos os destinos
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

/* =====================================================================
   Auxiliares
   ===================================================================== */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8c8471]">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-[#0a1628]">{value}</p>
    </div>
  );
}
