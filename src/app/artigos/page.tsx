/**
 * =====================================================================
 * RotaClara — Índice de artigos (/artigos)
 * ---------------------------------------------------------------------
 * Artigos de cauda longa agrupados por arquétipo (custo, época,
 * comparativo, roteiro). Cada número deriva da base auditada; o
 * índice mostra a data de atualização de cada artigo.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Methodology } from "@/components/ui/Notice";
import { Badge, ButtonLink, Card } from "@/components/ui/primitives";
import { getDestination } from "@/data/destinations";
import { allArticles } from "@/data/articles";
import {
  ARCHETYPE_LABEL,
  ARCHETYPE_SUMMARY,
  type ArticleArchetype,
} from "@/lib/domain/articles";
import { formatDateISO } from "@/lib/format/format";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Artigos de viagem",
  description:
    "Artigos de cauda longa da RotaClara: quanto custa ir a cada destino, " +
    "melhor época, comparativos e roteiros — com números da base auditada, " +
    "metodologia e data de atualização.",
  path: "/artigos",
});

/** Ordem editorial dos arquétipos no índice. */
const ARCHETYPE_ORDER: readonly ArticleArchetype[] = [
  "custo",
  "epoca",
  "comparativo",
  "roteiro",
] as const;

export default function ArtigosPage() {
  const groups = ARCHETYPE_ORDER.map((archetype) => ({
    archetype,
    items: allArticles.filter((a) => a.archetype === archetype),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Artigos" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Conteúdo</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Artigos para decidir com clareza
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Cada artigo responde a uma pergunta específica de planejamento —
          quanto custa, quando ir, qual escolher, o que fazer — e usa os
          mesmos números auditados das páginas de destino: faixa com
          metodologia, fonte e data de consulta. Nada escrito à mão.
        </p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Artigos publicados" value={String(allArticles.length)} />
        <Stat
          label="Arquétipos cobertos"
          value={String(new Set(allArticles.map((a) => a.archetype)).size)}
        />
        <Stat
          label="Perguntas respondidas"
          value={String(allArticles.reduce((s, a) => s + a.faq.length, 0))}
        />
      </div>

      {/* ============================================================
          Artigos por arquétipo
          ============================================================ */}
      {groups.map((group, index) => (
        <section
          key={group.archetype}
          aria-labelledby={`arquetipo-${group.archetype}`}
          className="mt-12"
        >
          <div className="flex items-baseline gap-3">
            <h2
              id={`arquetipo-${group.archetype}`}
              className="text-2xl font-semibold tracking-tight text-[#0a1628]"
            >
              {ARCHETYPE_LABEL[group.archetype]}
            </h2>
            <span className="text-sm text-[#736b5b]">
              {group.items.length}{" "}
              {group.items.length === 1 ? "artigo" : "artigos"}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-[#736b5b]">
            {ARCHETYPE_SUMMARY[group.archetype]}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((article) => (
              <Link
                key={article.slug}
                href={`/artigos/${article.slug}`}
                className="rc-card rc-card-hover group flex h-full flex-col focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="text-base font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
                    {article.title}
                  </span>
                  <Badge tone="gold">{String(index + 1).padStart(2, "0")}</Badge>
                </span>

                <span className="mt-3 flex-1 text-sm leading-relaxed text-[#16304f]/85">
                  {article.deck}
                </span>

                <span className="mt-4 block border-t border-[#f4f1ea] pt-3.5 text-xs text-[#736b5b]">
                  {article.destinationSlugs
                    .map((slug) => getDestination(slug)?.name)
                    .filter(Boolean)
                    .join(" · ")}
                </span>

                <span className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#736b5b]">
                    Atualizado em{" "}
                    <time dateTime={article.updatedAt}>
                      {formatDateISO(article.updatedAt)}
                    </time>
                  </span>
                  <span className="text-xs font-medium text-[#0f6f69]">
                    Ler artigo →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {allArticles.length === 0 && (
        <div className="mt-10">
          <Card>
            <p className="text-base font-semibold text-[#0a1628]">
              Nenhum artigo publicado ainda
            </p>
            <p className="mt-2 text-sm text-[#736b5b]">
              Os artigos editoriais estão em produção. Enquanto isso, explore
              os guias de destino.
            </p>
            <div className="mt-4">
              <ButtonLink href="/guias" variant="secondary">
                Ver guias
              </ButtonLink>
            </div>
          </Card>
        </div>
      )}

      {/* ============================================================
          Metodologia
          ============================================================ */}
      <section aria-labelledby="metodologia-artigos" className="mt-14 max-w-3xl">
        <h2
          id="metodologia-artigos"
          className="text-xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como estes artigos são construídos
        </h2>
        <div className="mt-4">
          <Methodology referenceDate="2026-11-19">
            <p>
              Os números dos artigos vêm da mesma base de destinos auditada
              das páginas de destino — se um valor mudar na base, o artigo
              muda junto. Se um destino referenciado sair da base, a
              publicação falha em vez de exibir dado quebrado.
            </p>
            <p className="mt-2">
              Faixas de custo são estimativas de planejamento com metodologia
              declarada — nunca cotações em tempo real. Confirme sempre com os
              provedores antes de reservar.
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
      <p className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-[#0a1628]">{value}</p>
    </div>
  );
}
