/**
 * =====================================================================
 * RotaClara — Homepage
 * ---------------------------------------------------------------------
 * Objetivo: o visitante deve compreender em poucos segundos o que a
 * plataforma resolve e encontrar um caminho para começar a planejar.
 * =====================================================================
 */

import Link from "next/link";
import type { Metadata } from "next";
import { HeroSearch } from "@/components/home/HeroSearch";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { DestinationArt } from "@/components/ui/DestinationArt";
import { Badge, ButtonLink, Card, Eyebrow } from "@/components/ui/primitives";
import { AffiliateDisclosure } from "@/components/ui/Notice";
import {
  allDestinations,
  getDestinationStats,
  getFeaturedDestinations,
} from "@/data/destinations";
import { allGuides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "RotaClara — Viajar melhor começa com decisões melhores",
  description:
    "Descubra destinos adequados ao seu perfil e orçamento, compare custos, " +
    "monte roteiros e calcule o gasto da viagem. Estimativas transparentes " +
    "sobre o Brasil.",
  path: "/",
});

/** Perfis de viagem em destaque na homepage. */
const PROFILES = [
  {
    tag: "economico" as const,
    title: "Viagens econômicas",
    description:
      "Destinos com faixa diária mais acessível, sem abrir mão de estrutura.",
    href: "/destinos?perfil=economico",
    accent: "#0f6f69",
  },
  {
    tag: "romantico" as const,
    title: "Para casais",
    description:
      "Cidades e vilas com ritmo tranquilo, gastronomia e paisagens marcantes.",
    href: "/destinos?perfil=romantico",
    accent: "#c9952f",
  },
  {
    tag: "familia" as const,
    title: "Para famílias",
    description:
      "Atrações adequadas para crianças, com logística simples e previsível.",
    href: "/destinos?perfil=familia",
    accent: "#2a5583",
  },
  {
    tag: "natureza" as const,
    title: "Natureza e aventura",
    description:
      "Cachoeiras, trilhas, parques e ecoturismo com visitação organizada.",
    href: "/destinos?perfil=natureza",
    accent: "#2f5d3a",
  },
] as const;

/** Benefícios da plataforma. */
const BENEFITS = [
  {
    title: "Estimativas transparentes",
    description:
      "Todo valor exibido vem com metodologia e data de referência. Nada de " +
      "preço falso apresentado como cotação em tempo real.",
    icon: (
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
  },
  {
    title: "Decisões conectadas",
    description:
      "Descobrir, comparar, planejar e orçar funcionam juntos — não são " +
      "ferramentas isoladas que você precisa cruzar na mão.",
    icon: <path d="M4 7h16M4 12h10M4 17h7" />,
  },
  {
    title: "Conteúdo verificado",
    description:
      "Guias com fontes citadas, data de atualização e limitações declaradas. " +
      "Informação que serve mesmo sem link afiliado.",
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <path d="M12 3l7 4v5c0 4.5-3 8.5-7 9.5C8 20.5 5 16.5 5 12V7l7-4z" />
      </>
    ),
  },
  {
    title: "Feito para o celular",
    description:
      "Todas as ferramentas funcionam bem em telas pequenas, com campos " +
      "grandes e resultados que se atualizam na hora.",
    icon: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
] as const;

export default function HomePage() {
  const stats = getDestinationStats();
  const featured = getFeaturedDestinations(6);

  const byProfile = (tag: (typeof PROFILES)[number]["tag"]) =>
    allDestinations.filter((d) => d.tags.includes(tag)).slice(0, 3);

  const latestGuides = allGuides.slice(0, 3);
  const guideDestinations = latestGuides
    .map((g) => allDestinations.find((d) => d.slug === g.slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="rc-grain relative overflow-hidden bg-[#0a1628] text-white">
        {/* Fotografia real de ambiência ao fundo */}
        {allDestinations[0]?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={allDestinations[0].image.src}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-15 blur-2xl scale-110"
          />
        )}
        {/* Padrão de linhas discretas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="rc-container relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[#4fcdd6]"
                />
                Plataforma brasileira de planejamento de viagens
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Viajar melhor começa com{" "}
                <span className="text-[#dfb45c]">decisões melhores</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                Descubra para onde ir conforme seu perfil e orçamento, compare
                destinos, monte o roteiro e calcule quanto a viagem vai custar —
                com estimativas que explicam de onde vêm os números.
              </p>

              {/* Campo de descoberta */}
              <div className="mt-8 max-w-2xl">
                <HeroSearch destinations={allDestinations} />
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  <span>Tente:</span>
                  {["Bonito", "Gramado", "Salvador", "praia", "família"].map(
                    (s) => (
                      <Link
                        key={s}
                        href={`/destinos?busca=${encodeURIComponent(s)}`}
                        className="rounded-full border border-white/15 px-2.5 py-1 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-3 focus-visible:outline-[#4fcdd6] focus-visible:outline-offset-2"
                      >
                        {s}
                      </Link>
                    ),
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink
                  href="/diagnostico"
                  size="lg"
                  className="bg-[#c9952f] text-[#0a1628] hover:bg-[#dfb45c]"
                >
                  Diagnóstico de orçamento
                </ButtonLink>
                <ButtonLink
                  href="/planejador"
                  size="lg"
                  variant="secondary"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                >
                  Planejar viagem
                </ButtonLink>
                <ButtonLink
                  href="/calculadora"
                  size="lg"
                  variant="secondary"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
                >
                  Calculadora
                </ButtonLink>
              </div>
            </div>

            {/* Painel lateral: Destaques visuais & Estatísticas */}
            <div className="hidden lg:flex lg:flex-col lg:gap-5">
              {/* Card fotográfico em destaque no Hero */}
              {allDestinations[0]?.image && (
                <Link
                  href={`/destinos/${allDestinations[0].slug}`}
                  className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] shadow-2xl transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-[#4fcdd6]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={allDestinations[0].image.src}
                    alt={allDestinations[0].image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-black/30" />
                  <div className="absolute top-4 left-4">
                    <Badge tone="gold">Destino em destaque</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xl font-bold text-white drop-shadow-sm">
                      {allDestinations[0].name}
                    </p>
                    <p className="text-xs text-white/80">
                      {allDestinations[0].tagline}
                    </p>
                  </div>
                </Link>
              )}

              <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4fcdd6]">
                  Base editorial verificada
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <Stat value={stats.total} label="destinos" />
                  <Stat value={stats.attractions} label="atrações" />
                  <Stat value={stats.states} label="estados" />
                  <Stat value={stats.regions} label="regiões" />
                </div>

                <div className="mt-5 space-y-3 border-t border-white/10 pt-5">
                  <MiniStat
                    label="Guias com fonte e data"
                    value={`${allGuides.length} publicados`}
                  />
                  <MiniStat
                    label="Ferramentas funcionando"
                    value="5 integradas"
                  />
                  <MiniStat
                    label="Preços em tempo real"
                    value="não exibimos"
                    muted
                  />
                </div>

                <p className="mt-5 rounded-xl bg-[#fdf1dd]/10 p-3 text-[11px] leading-relaxed text-white/60">
                  Não vendemos passagens nem reservamos hotéis. Nossos valores
                  são estimativas de planejamento com metodologia visível.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DESTAQUE DAS FERRAMENTAS
          ============================================================ */}
      <section className="rc-container py-16 sm:py-20" aria-labelledby="ferramentas">
        <div className="max-w-2xl">
          <Eyebrow>Como funciona</Eyebrow>
          <h2
            id="ferramentas"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl"
          >
            Quatro decisões, uma plataforma
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
            Viajar envolve escolhas conectadas: para ir, quanto gastar, onde
            ficar e o que fazer. As ferramentas da RotaClara trabalham juntas
            para que você não precise cruzar tudo na mão.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ToolCard
            number="01"
            title="Descobrir"
            description="Explore destinos por perfil, região, orçamento e época do ano."
            href="/destinos"
            hrefLabel="Explorar destinos"
          />
          <ToolCard
            number="02"
            title="Comparar"
            description="Veja diferenças de custo, duração e clima entre até três destinos."
            href="/comparador"
            hrefLabel="Comparar destinos"
          />
          <ToolCard
            number="03"
            title="Planejar"
            description="Monte a estrutura da viagem com dias, orçamento e atrações."
            href="/planejador"
            hrefLabel="Abrir planejador"
          />
          <ToolCard
            number="04"
            title="Orçar"
            description="Calcule o total, o valor por pessoa e quanto guardar por mês."
            href="/calculadora"
            hrefLabel="Abrir calculadora"
          />
        </div>
      </section>

      {/* ============================================================
          DESCUBRA POR PERFIL
          ============================================================ */}
      <section
        className="border-y border-[#e8e3d8] bg-white py-16 sm:py-20"
        aria-labelledby="perfis"
      >
        <div className="rc-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Descobrir</Eyebrow>
              <h2
                id="perfis"
                className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl"
              >
                Destinos por perfil
              </h2>
              <p className="mt-3 text-base text-[#16304f]/80">
                Cada viagem tem uma intenção diferente. Comece pela sua.
              </p>
            </div>
            <ButtonLink href="/destinos" variant="secondary">
              Ver todos os destinos
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROFILES.map((profile) => {
              const items = byProfile(profile.tag);
              return (
                <div key={profile.tag} className="flex flex-col">
                  <Link
                    href={profile.href}
                    className="group rounded-2xl border border-[#e8e3d8] bg-[#faf8f4] p-5 transition-all duration-200 hover:border-[#d6cfc0] hover:bg-white hover:shadow-[0_8px_32px_rgb(10_22_40/0.08)] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1 w-10 rounded-full"
                      style={{ background: profile.accent }}
                    />
                    <h3 className="mt-4 text-base font-semibold text-[#0a1628]">
                      {profile.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#736b5b]">
                      {profile.description}
                    </p>
                    <p className="mt-3 text-xs font-medium text-[#0f6f69]">
                      {items.length} {items.length === 1 ? "destino" : "destinos"} →
                    </p>
                  </Link>

                  <ul className="mt-3 space-y-2">
                    {items.slice(0, 3).map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/destinos/${d.slug}`}
                          className="flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-[#f4f1ea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                        >
                          <span className="h-9 w-12 shrink-0 overflow-hidden rounded-md">
                            {d.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={d.image.src}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <DestinationArt
                                palette={d.palette}
                                seed={d.slug.length}
                                alt=""
                                className="h-full w-full"
                              />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-[#0a1628]">
                              {d.name}
                            </span>
                            <span className="block text-xs text-[#736b5b]">
                              {d.stateUF}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          DESTAQUE
          ============================================================ */}
      <section className="rc-container py-16 sm:py-20" aria-labelledby="destaques">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Em destaque</Eyebrow>
            <h2
              id="destaques"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl"
            >
              Destinos com guia completo
            </h2>
            <p className="mt-3 text-base text-[#16304f]/80">
              Cada página reúne época, duração, custos, atrações, fontes e data
              de atualização.
            </p>
          </div>
          <ButtonLink href="/destinos" variant="secondary">
            Explorar todos
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <DestinationCard key={d.slug} destination={d} showHighlights />
          ))}
        </div>
      </section>

      {/* ============================================================
          GUIAS EDITORIAIS
          ============================================================ */}
      <section
        className="border-y border-[#e8e3d8] bg-white py-16 sm:py-20"
        aria-labelledby="guias"
      >
        <div className="rc-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Aprender</Eyebrow>
              <h2
                id="guias"
                className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl"
              >
                Guias para decidir antes de ir
              </h2>
              <p className="mt-3 text-base text-[#16304f]/80">
                Conteúdo original com metodologia, fontes verificáveis e data de
                atualização — útil mesmo sem link afiliado.
              </p>
            </div>
            <ButtonLink href="/guias" variant="secondary">
              Ver todos os guias
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {guideDestinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinos/${d.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#e8e3d8] bg-[#faf8f4] transition-all duration-200 hover:border-[#d6cfc0] hover:shadow-[0_8px_32px_rgb(10_22_40/0.08)] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                <div className="aspect-[16/8] overflow-hidden">
                  {d.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={d.image.src}
                      alt={d.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <DestinationArt
                      palette={d.palette}
                      seed={d.slug.length + 3}
                      alt={`Arte ilustrativa representando ${d.name}`}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <Badge tone="teal">{d.region}</Badge>
                    <span className="text-xs text-[#736b5b]">{d.stateUF}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
                    Guia de {d.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#736b5b]">
                    {d.intro}
                  </p>
                  <p className="mt-4 text-xs font-medium text-[#0f6f69]">
                    Ler guia completo →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          BENEFÍCIOS
          ============================================================ */}
      <section className="rc-container py-16 sm:py-20" aria-labelledby="beneficios">
        <div className="max-w-2xl">
          <Eyebrow>Por que a RotaClara</Eyebrow>
          <h2
            id="beneficios"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl"
          >
            Confiança antes, durante e depois da viagem
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <Card key={b.title} className="h-full">
              <span
                aria-hidden="true"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f4] text-[#0b4744]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-4 text-base font-semibold text-[#0a1628]">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#736b5b]">
                {b.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================================================
          CTA FINAL
          ============================================================ */}
      <section className="rc-container pb-4" aria-labelledby="cta-final">
        <div className="rc-grain relative overflow-hidden rounded-3xl bg-[#0a1628] px-6 py-14 text-center text-white sm:px-12">
          <h2
            id="cta-final"
            className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Comece pelo orçamento. O resto fica mais fácil.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Informe quantos dias, quantas pessoas e o que pretende gastar. A
            calculadora monta a estimativa na hora — e mostra como ela foi
            calculada.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/calculadora"
              size="lg"
              className="bg-[#c9952f] text-[#0a1628] hover:bg-[#dfb45c]"
            >
              Calcular minha viagem
            </ButtonLink>
            <ButtonLink
              href="/planejador"
              size="lg"
              variant="secondary"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40"
            >
              Montar planejamento
            </ButtonLink>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-white/50">
            Valores exibidos são estimativas de planejamento, não cotações em
            tempo real. Nenhuma passagem, hospedagem ou passeio é vendido ou
            reservado por esta plataforma.
          </p>
        </div>
      </section>

      <div className="rc-container pt-6">
        <AffiliateDisclosure />
      </div>
    </>
  );
}

/* =====================================================================
   Subcomponentes
   ===================================================================== */

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
      <p className="text-3xl font-semibold tracking-tight text-[#dfb45c]">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-white/60">{label}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-white/60">{label}</span>
      <span
        className={
          muted ? "font-medium text-white/40" : "font-medium text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

interface ToolCardProps {
  number: string;
  title: string;
  description: string;
  href: string;
  hrefLabel: string;
}

function ToolCard({ number, title, description, href, hrefLabel }: ToolCardProps) {
  return (
    <div className="rc-card rc-card-hover flex h-full flex-col p-6">
      <span className="text-xs font-semibold tracking-widest text-[#8f6417]">
        {number}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-[#0a1628]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#736b5b]">
        {description}
      </p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#0f6f69] hover:text-[#0b4744] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 rounded"
        aria-label={hrefLabel}
      >
        {hrefLabel}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
