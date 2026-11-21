/**
 * =====================================================================
 * RotaClara — Página de artigo (/artigos/[slug])
 * ---------------------------------------------------------------------
 * Artigo de cauda longa derivado da base auditada: cada número vem de
 * `getDestination()`, nunca escrito à mão. JSON-LD BlogPosting +
 * BreadcrumbList, FAQ estruturado e links para o pilar do destino.
 * Geração estática de todos os slugs.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Methodology } from "@/components/ui/Notice";
import { Badge, ButtonLink, Card } from "@/components/ui/primitives";
import { getDestination } from "@/data/destinations";
import { getAllArticleSlugs, getArticle } from "@/data/articles";
import type { Article } from "@/lib/domain/articles";
import { ARCHETYPE_LABEL } from "@/lib/domain/articles";
import { formatDateISO, formatMonths } from "@/lib/format/format";
import {
  blogPostJsonLd,
  buildMetadata,
  faqJsonLd,
} from "@/lib/seo/seo";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/artigos/${slug}`,
    type: "article",
    modifiedAt: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const a: Article = article;
  const destinations = a.destinationSlugs
    .map((s) => getDestination(s))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  const jsonLd = blogPostJsonLd(a);
  const faq = faqJsonLd(a.faq);

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      )}

      {/* ============================================================
          Cabeçalho
          ============================================================ */}
      <section className="rc-grain relative overflow-hidden bg-[#0a1628] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="rc-container relative py-10 sm:py-14">
          <div className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white">
            <Breadcrumbs
              items={[
                { label: "Início", href: "/" },
                { label: "Artigos", href: "/artigos" },
                { label: ARCHETYPE_LABEL[a.archetype] },
              ]}
            />
          </div>

          <div className="mt-6 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge tone="gold">{ARCHETYPE_LABEL[a.archetype]}</Badge>
              {destinations.map((d) => (
                <Link key={d.slug} href={`/destinos/${d.slug}`}>
                  <Badge tone="teal" className="transition-opacity hover:opacity-80">
                    {d.name}
                  </Badge>
                </Link>
              ))}
            </div>

            <h1 className="mt-4 text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {a.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {a.deck}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
              <span>
                Atualizado em{" "}
                <time dateTime={a.updatedAt}>{formatDateISO(a.updatedAt)}</time>
              </span>
              <span aria-hidden="true" className="text-[#dfb45c]">
                ·
              </span>
              <Link
                href="/metodologia"
                className="underline decoration-[#dfb45c]/70 underline-offset-4 transition-colors hover:text-white focus-visible:outline-3 focus-visible:outline-[#4fcdd6] rounded"
              >
                Números com metodologia aberta
              </Link>
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href="/planejador"
                className="bg-[#c9952f] text-[#0a1628] hover:bg-[#dfb45c]"
              >
                Planejar minha viagem
              </ButtonLink>
              <ButtonLink
                href="/calculadora"
                variant="secondary"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
              >
                Calcular meu orçamento
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          Corpo do artigo
          ============================================================ */}
      <div className="rc-container mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <div className="space-y-6">
            {a.sections.map((section) => (
              <Card key={section.id}>
                <h2
                  id={section.id}
                  className="text-lg font-semibold text-[#0a1628]"
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-[#16304f]/85">
                      {p}
                    </p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm leading-relaxed text-[#16304f]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9952f]"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {section.table && section.table.rows.length > 0 && (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-[#e8e3d8]">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead className="bg-[#faf8f4] text-xs font-semibold uppercase tracking-wide text-[#0a1628]">
                        <tr>
                          {section.table.headers.map((header) => (
                            <th
                              key={header}
                              scope="col"
                              className="border-b border-[#e8e3d8] px-3.5 py-2.5"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#e8e3d8] bg-white text-[#16304f]">
                        {section.table.rows.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-[#faf8f4]/60">
                            {row.map((cell, cellIdx) => (
                              <td
                                key={cellIdx}
                                className={
                                  cellIdx === 0
                                    ? "px-3.5 py-2.5 font-medium text-[#0a1628]"
                                    : "px-3.5 py-2.5"
                                }
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* FAQ */}
          {a.faq.length > 0 && (
            <section aria-labelledby="faq" className="mt-12">
              <h2
                id="faq"
                className="text-2xl font-semibold tracking-tight text-[#0a1628]"
              >
                Perguntas frequentes
              </h2>
              <div className="mt-5 space-y-4">
                {a.faq.map((item) => (
                  <Card key={item.question}>
                    <h3 className="text-base font-semibold text-[#0a1628]">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">
                      {item.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Metodologia */}
          <section aria-labelledby="metodologia-artigo" className="mt-12 max-w-3xl">
            <h2
              id="metodologia-artigo"
              className="text-xl font-semibold tracking-tight text-[#0a1628]"
            >
              De onde vêm estes números
            </h2>
            <div className="mt-4">
              <Methodology referenceDate={a.updatedAt}>
                <p>
                  Os valores deste artigo vêm da nossa base de destinos
                  auditada — faixas de referência com metodologia e data de
                  consulta públicas, nunca cotações em tempo real. A página do
                  destino mantém a revisão completa visível.
                </p>
              </Methodology>
            </div>
          </section>
        </div>

        {/* ============================================================
            Sidebar — pilares e ferramentas
            ============================================================ */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {destinations.length > 0 && (
            <Card>
              <p className="rc-eyebrow">Pilares relacionados</p>
              <div className="mt-4 space-y-4">
                {destinations.map((d) => (
                  <div key={d.slug}>
                    <Link
                      href={`/destinos/${d.slug}`}
                      className="text-base font-semibold text-[#0a1628] underline decoration-[#c9952f] underline-offset-4 transition-colors hover:text-[#0f6f69] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] rounded"
                    >
                      {d.name} — {d.stateUF}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-[#736b5b]">
                      {d.tagline}
                    </p>
                    <p className="mt-1.5 text-xs text-[#736b5b]">
                      Estimativa diária: R$ {d.cost.minPerDayBRL}–
                      {d.cost.maxPerDayBRL} · Melhor época:{" "}
                      {formatMonths(d.bestMonths)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card>
            <p className="rc-eyebrow">Ferramentas</p>
            <ul className="mt-4 space-y-3">
              <ToolLink
                href="/diagnostico"
                title="Diagnóstico de viagem"
                description="Cruza o orçamento do grupo com destinos possíveis."
              />
              <ToolLink
                href="/calculadora"
                title="Calculadora"
                description="Soma transporte, hospedagem e passeios com o seu perfil."
              />
              <ToolLink
                href="/planejador"
                title="Planejador"
                description="Monta a estrutura de dias com estimativa declarada."
              />
              <ToolLink
                href="/comparador"
                title="Comparador"
                description="Avalia até três destinos lado a lado, com critério à vista."
              />
            </ul>
          </Card>

          <Card>
            <p className="rc-eyebrow">Transparência</p>
            <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
              Somos independentes — quando ganhamos comissão de um parceiro,
              dizemos na página. Sem depoimento fabricado, sem urgência falsa.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href="/metodologia" variant="secondary">
                Ler a metodologia
              </ButtonLink>
              <ButtonLink href="/afiliados" variant="secondary">
                Divulgação de afiliados
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

/** Link de ferramenta na sidebar. */
function ToolLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group block rounded-xl border border-[#e8e3d8] bg-[#faf8f4] p-3.5 transition-colors hover:bg-white focus-visible:outline-3 focus-visible:outline-[#2fb8c4]"
      >
        <span className="text-sm font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
          {title} →
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-[#736b5b]">
          {description}
        </span>
      </Link>
    </li>
  );
}
