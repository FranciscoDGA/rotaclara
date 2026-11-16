/**
 * =====================================================================
 * RotaClara — Página de destino (/destinos/[slug])
 * ---------------------------------------------------------------------
 * Página rica: guia editorial, clima, atrações, custos com
 * metodologia, FAQ com JSON-LD, hospedagens relacionadas e destinos
 * relacionados. Geração estática de todos os slugs.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { DestinationArt } from "@/components/ui/DestinationArt";
import { Methodology } from "@/components/ui/Notice";
import {
  Badge,
  ButtonLink,
  Card,
  EmptyState,
} from "@/components/ui/primitives";
import {
  getAllDestinationSlugs,
  getDestination,
  getRelatedDestinations,
} from "@/data/destinations";
import { getGuide } from "@/data/guides";
import { getListingsByDestination } from "@/data/listings";
import {
  formatDuration,
  formatDateISO,
  formatMonths,
} from "@/lib/format/format";
import { buildMetadata, destinationJsonLd, faqJsonLd, tagLabel } from "@/lib/seo/seo";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};

  return buildMetadata({
    title: `${destination.name} — guia de viagem`,
    description: destination.tagline + " Guia completo com época, custos, atrações, transporte e fontes.",
    path: `/destinos/${slug}`,
    type: "article",
    modifiedAt: destination.updatedAt,
  });
}

/* Rótulos de nível de custo. */
const COST_LABEL: Record<string, string> = {
  economico: "Econômico",
  moderado: "Moderado",
  conforto: "Conforto",
  premium: "Premium",
};

const RAINFALL_LABEL: Record<string, string> = {
  seco: "Seco",
  intermediario: "Intermediário",
  chuvoso: "Chuvoso",
};

const MONTHS_SHORT = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const guide = getGuide(slug);
  const related = getRelatedDestinations(slug, 3);
  const listings = getListingsByDestination(slug);
  const d = destination;

  const jsonLd = destinationJsonLd(d);
  const guideJsonLd = guide ? faqJsonLd(guide.faq) : null;

  return (
    <div className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {guideJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd) }}
        />
      )}

      {/* ============================================================
          Cabeçalho
          ============================================================ */}
      <section className="rc-grain relative overflow-hidden bg-[#0a1628] text-white">
        {d.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.image.src}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 blur-2xl scale-110"
          />
        )}
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
                { label: "Destinos", href: "/destinos" },
                { label: d.name },
              ]}
            />
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="gold">{d.stateUF}</Badge>
                <Badge tone="teal">{d.region}</Badge>
                <Badge tone="default" className="bg-white/10 border-white/20 text-white">
                  {COST_LABEL[d.costLevel]}
                </Badge>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                {d.name}
              </h1>
              <p className="mt-1 text-white/60">{d.state}</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
                {d.tagline}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {d.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75"
                  >
                    {tagLabel(tag)}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href="/planejador"
                  className="bg-[#c9952f] text-[#0a1628] hover:bg-[#dfb45c]"
                >
                  Planejar viagem para {d.name}
                </ButtonLink>
                <ButtonLink
                  href="/comparador"
                  variant="secondary"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                >
                  Comparar destinos
                </ButtonLink>
              </div>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/15">
              {d.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image.src}
                    alt={d.image.alt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-xs">
                    Foto:{" "}
                    <a
                      href={d.image.credit.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      {d.image.credit.author} ({d.image.credit.source})
                    </a>
                  </div>
                </>
              ) : (
                <DestinationArt
                  palette={d.palette}
                  seed={d.slug.length + d.stateUF.charCodeAt(0)}
                  alt={`Arte ilustrativa representando ${d.name}`}
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="rc-container mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* ============================================================
            Conteúdo principal
            ============================================================ */}
        <div className="min-w-0">
          {/* Resumo rápido */}
          <section aria-labelledby="resumo" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickFact
              label="Melhor época"
              value={formatMonths(d.bestMonths)}
            />
            <QuickFact
              label="Duração sugerida"
              value={`${d.recommendedDays.min} a ${d.recommendedDays.max} dias`}
            />
            <QuickFact
              label="Estimativa diária"
              value={`R$ ${d.cost.minPerDayBRL}–${d.cost.maxPerDayBRL}`}
              hint="por pessoa · estimativa"
            />
            <QuickFact
              label="Desde São Paulo"
              value={
                d.referenceFromSaoPaulo?.distanceKm
                  ? `${d.referenceFromSaoPaulo.distanceKm.toLocaleString("pt-BR")} km`
                  : "Acesso rodoviário"
              }
              hint={
                d.referenceFromSaoPaulo?.flightMinutes
                  ? `${formatDuration(d.referenceFromSaoPaulo.flightMinutes)} de voo`
                  : d.referenceFromSaoPaulo?.notes.slice(0, 60)
              }
            />
          </section>

          {/* Introdução */}
          <section aria-labelledby="apresentacao" className="mt-10">
            <h2 id="apresentacao" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
              Sobre {d.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#16304f]/85">
              {d.intro}
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {d.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 rounded-xl border border-[#e8e3d8] bg-white p-3.5 text-sm leading-relaxed text-[#16304f]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#15908a]"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Guias editoriais */}
          {guide && guide.sections.length > 0 && (
            <section aria-labelledby="guia" className="mt-12">
              <div className="flex items-center justify-between gap-3">
                <h2 id="guia" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
                  Guia completo
                </h2>
                <p className="text-xs text-[#736b5b]">
                  Atualizado em{" "}
                  <time dateTime={guide.updatedAt}>
                    {formatDateISO(guide.updatedAt)}
                  </time>
                </p>
              </div>

              <div className="mt-5 space-y-6">
                {guide.sections.map((section) => (
                  <Card key={section.id}>
                    <h3 className="text-lg font-semibold text-[#0a1628]">
                      {section.heading}
                    </h3>
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
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Clima mês a mês */}
          <section aria-labelledby="clima" className="mt-12">
            <h2 id="clima" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
              Clima mês a mês
            </h2>
            <p className="mt-2 text-sm text-[#736b5b]">
              Faixas de temperatura e padrão de chuva como referência. Boletins
              oficiais: consulte o{" "}
              <a
                href="https://portal.inmet.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0f6f69] underline underline-offset-2"
              >
                INMET
              </a>
              .
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <caption className="sr-only">
                  Condições climáticas mensais em {d.name}
                </caption>
                <thead>
                  <tr className="border-b border-[#e8e3d8] text-left">
                    <th scope="col" className="py-2.5 pr-3 font-semibold text-[#0a1628]">
                      Mês
                    </th>
                    <th scope="col" className="py-2.5 pr-3 font-semibold text-[#0a1628]">
                      Temperatura
                    </th>
                    <th scope="col" className="py-2.5 pr-3 font-semibold text-[#0a1628]">
                      Chuva
                    </th>
                    <th scope="col" className="py-2.5 font-semibold text-[#0a1628]">
                      Época
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.climateByMonth.map((m, index) => {
                    const isBest = d.bestMonths.includes(index);
                    return (
                      <tr
                        key={index}
                        className={`border-b border-[#f4f1ea] ${
                          isBest ? "bg-[#fdf4e3]/60" : ""
                        }`}
                      >
                        <th
                          scope="row"
                          className="py-2.5 pr-3 text-left font-medium text-[#16304f]"
                        >
                          {MONTHS_SHORT[index]}
                        </th>
                        <td className="py-2.5 pr-3 text-[#16304f]">
                          {m.temperatureC.min}–{m.temperatureC.max}°C
                        </td>
                        <td className="py-2.5 pr-3 text-[#16304f]">
                          {RAINFALL_LABEL[m.rainfall]}
                        </td>
                        <td className="py-2.5">
                          {isBest ? (
                            <Badge tone="gold">Boa época</Badge>
                          ) : (
                            <span className="text-[#7a7162]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Atrações */}
          {d.attractions.length > 0 && (
            <section aria-labelledby="atracoes" className="mt-12">
              <h2 id="atracoes" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
                Atrações principais
              </h2>
              <p className="mt-2 text-sm text-[#736b5b]">
                {d.attractions.length} atrações mapeadas com fonte e tempo de
                visita estimado.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {d.attractions.map((a) => (
                  <Card key={a.id} className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-[#0a1628]">
                        {a.name}
                      </h3>
                      {a.isFree ? (
                        <Badge tone="success">Gratuita</Badge>
                      ) : (
                        <Badge tone="gold">
                          {a.admissionFeeBRL
                            ? `R$ ${a.admissionFeeBRL.min}–${a.admissionFeeBRL.max}`
                            : "Com ingresso"}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">
                      {a.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#736b5b]">
                      <span>{a.area}</span>
                      <span>≈ {formatDuration(a.suggestedMinutes)}</span>
                    </div>
                    {a.notes && (
                      <p className="mt-2 rounded-lg bg-[#fdf1dd] p-2.5 text-xs leading-relaxed text-[#9a6206]">
                        {a.notes}
                      </p>
                    )}
                    {a.sources[0] && (
                      <a
                        href={a.sources[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs text-[#0f6f69] underline underline-offset-2"
                      >
                        Fonte: {a.sources[0].name}
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Avisos */}
          {d.warnings.length > 0 && (
            <section aria-labelledby="cuidados" className="mt-12">
              <h2 id="cuidados" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
                Cuidados e informações importantes
              </h2>
              <ul className="mt-5 space-y-3">
                {d.warnings.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-3 rounded-xl border border-[#f3ddb8] bg-[#fdf1dd] p-4 text-sm leading-relaxed text-[#9a6206]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                    >
                      <path d="M12 9v4M12 17h.01" />
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    </svg>
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Hospedagens */}
          {listings.length > 0 && (
            <section aria-labelledby="hospedagens" className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2
                  id="hospedagens"
                  className="text-2xl font-semibold tracking-tight text-[#0a1628]"
                >
                  Onde se hospedar em {d.name}
                </h2>
                <Link
                  href="/hospedagens"
                  className="text-sm font-medium text-[#0f6f69] underline underline-offset-2"
                >
                  Ver todas as opções
                </Link>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {listings.slice(0, 4).map((l) => (
                  <Card key={l.id} className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-[#0a1628]">
                        {l.name}
                      </h3>
                      <Badge tone="default">{l.area}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">
                      {l.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#f4f1ea] pt-3.5">
                      <span className="text-xs text-[#736b5b]">
                        Perfil:{" "}
                        <strong className="text-[#16304f]">
                          {COST_LABEL[l.priceLevel] ?? l.priceLevel}
                        </strong>{" "}
                        · sem preço em tempo real
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {guide && guide.faq.length > 0 && (
            <section aria-labelledby="faq" className="mt-12">
              <h2 id="faq" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
                Perguntas frequentes
              </h2>
              <div className="mt-5 space-y-3">
                {guide.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-[#e8e3d8] bg-white p-4"
                  >
                    <summary className="cursor-pointer list-none text-sm font-semibold text-[#0a1628] marker:content-none">
                      <span className="flex items-center justify-between gap-3">
                        {item.question}
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
                          className="shrink-0 text-[#736b5b] transition-transform group-open:rotate-45"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Fontes */}
          <section aria-labelledby="fontes" className="mt-12">
            <h2 id="fontes" className="text-2xl font-semibold tracking-tight text-[#0a1628]">
              Fontes e metodologia
            </h2>

            <Methodology referenceDate={d.cost.referenceDate}>
              <p>{d.cost.methodology}</p>
              <p className="mt-2">
                <strong>Limitações:</strong> {d.cost.limitations}
              </p>
              <p className="mt-2">
                <strong>Confiança atribuída:</strong> {d.cost.confidence}.
              </p>
            </Methodology>

            <ul className="mt-5 space-y-3">
              {d.sources.map((s) => (
                <li
                  key={s.url + s.name}
                  className="rounded-xl border border-[#e8e3d8] bg-white p-4"
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#0f6f69] underline underline-offset-2"
                  >
                    {s.name}
                  </a>
                  <p className="mt-1 text-sm text-[#736b5b]">{s.supports}</p>
                  <p className="mt-1 text-xs text-[#7a7162]">
                    Consultada em{" "}
                    <time dateTime={s.consultedAt}>{formatDateISO(s.consultedAt)}</time>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#736b5b]">
              Última atualização editorial:{" "}
              <time dateTime={d.updatedAt}>{formatDateISO(d.updatedAt)}</time>.
              Nenhum preço, disponibilidade ou avaliação é apresentado como real
              nesta página.
            </p>
          </section>
        </div>

        {/* ============================================================
            Coluna lateral
            ============================================================ */}
        <aside className="space-y-6 lg:sticky lg:top-[calc(var(--rc-header-h)+1.5rem)] lg:self-start">
          {/* Resumo de planejamento */}
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">
              Planejar esta viagem
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#736b5b]">
              Gere uma estrutura de dias, distribuição de orçamento e sugestão
              de atrações — com estimativas explicadas.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href={`/planejador?destino=${d.slug}`} className="w-full">
                Abrir planejador
              </ButtonLink>
              <ButtonLink
                href={`/calculadora?destino=${d.slug}`}
                variant="secondary"
                className="w-full"
              >
                Calcular orçamento
              </ButtonLink>
              <ButtonLink
                href={`/roteiro?destino=${d.slug}`}
                variant="secondary"
                className="w-full"
              >
                Montar roteiro
              </ButtonLink>
            </div>
          </Card>

          {/* Como chegar / deslocar */}
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">Transporte</h2>
            <div className="mt-3 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]">
                  Como chegar
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#16304f]/85">
                  {d.howToArrive}
                </p>
              </div>
              <div className="border-t border-[#f4f1ea] pt-3.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]">
                  Como se deslocar
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#16304f]/85">
                  {d.localTransport}
                </p>
              </div>
            </div>
          </Card>

          {/* Áreas de hospedagem */}
          {d.lodgingAreas.length > 0 && (
            <Card>
              <h2 className="text-base font-semibold text-[#0a1628]">
                Áreas para se hospedar
              </h2>
              <ul className="mt-3 space-y-4">
                {d.lodgingAreas.map((area) => (
                  <li key={area.name} className="border-b border-[#f4f1ea] pb-3.5 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-[#0a1628]">
                      {area.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#736b5b]">
                      {area.profile}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#167043]">
                      <strong>Pró:</strong> {area.pros}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#9a6206]">
                      <strong>Contra:</strong> {area.cons}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Gastronomia */}
          <Card>
            <h2 className="text-base font-semibold text-[#0a1628]">Alimentação</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">
              {d.food}
            </p>
          </Card>
        </aside>
      </div>

      {/* ============================================================
          Destinos relacionados
          ============================================================ */}
      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="rc-container mt-16">
          <h2
            id="relacionados"
            className="text-2xl font-semibold tracking-tight text-[#0a1628]"
          >
            Destinos que combinam com {d.name}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/destinos/${r.slug}`}
                className="rc-card rc-card-hover group flex gap-4 p-4 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                <span className="h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                  {r.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.image.src}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <DestinationArt
                      palette={r.palette}
                      seed={r.slug.length}
                      alt=""
                      className="h-full w-full"
                    />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-base font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
                    {r.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-[#736b5b]">
                    {r.state} · {r.region}
                  </span>
                  <span className="mt-1.5 block text-xs font-medium text-[#0f6f69]">
                    Ver guia →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Estado sem guia editorial */}
      {!guide && (
        <div className="rc-container mt-12">
          <EmptyState
            title="Guia editorial em produção"
            description="A página deste destino já tem dados básicos, mas o guia completo ainda está sendo revisado. Confira a metodologia e as fontes acima."
            action={
              <ButtonLink href="/metodologia" variant="secondary">
                Conhecer nossa metodologia
              </ButtonLink>
            }
          />
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   Auxiliares
   ===================================================================== */

function QuickFact({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#736b5b]">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold leading-snug text-[#0a1628]">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs leading-snug text-[#736b5b]">{hint}</p>}
    </div>
  );
}
