/**
 * =====================================================================
 * RotaClara — Hospedagens e experiências (/hospedagens)
 * ---------------------------------------------------------------------
 * Vitrine editorial SEM preço, disponibilidade ou avaliação. Cada item
 * declara `hasRealTimePricing: false` e exibe apenas perfil relativo de
 * preço. Links monetizados só aparecem com rótulo claro de afiliado.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { AffiliateDisclosure } from "@/components/ui/Notice";
import {
  Badge,
  ButtonLink,
  Card,
  EmptyState,
  Field,
  Select,
} from "@/components/ui/primitives";
import { getDestination } from "@/data/destinations";
import { lodgingListings } from "@/data/listings";
import type { LodgingListing, TravelTag } from "@/lib/domain/types";
import { tagLabel } from "@/lib/seo/seo";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hospedagens e experiências",
  description:
    "Vitrine editorial de áreas para se hospedar e experiências no Brasil. " +
    "Sem preço falso, sem disponibilidade inventada — apenas perfil " +
    "relativo, contexto e links claramente rotulados.",
  path: "/hospedagens",
});

const TYPE_LABEL: Record<LodgingListing["type"], string> = {
  hotel: "Hotel",
  pousada: "Pousada",
  resort: "Resort",
  apartamento: "Apartamento",
  passeio: "Passeio",
  experiencia: "Experiência",
  aluguel_de_veiculo: "Aluguel de veículo",
};

const PRICE_LABEL: Record<string, string> = {
  economico: "Econômico",
  moderado: "Moderado",
  conforto: "Conforto",
  premium: "Premium",
};

interface HospedagensPageProps {
  searchParams: Promise<{ destino?: string; tipo?: string }>;
}

export default async function HospedagensPage({
  searchParams,
}: HospedagensPageProps) {
  const params = await searchParams;

  const destinoSlug =
    typeof params.destino === "string" ? params.destino : "";
  const tipoRaw = typeof params.tipo === "string" ? params.tipo : "";

  const validTypes = Object.keys(TYPE_LABEL) as LodgingListing["type"][];
  const tipo = validTypes.find((t) => t === tipoRaw) ?? "";

  const destination = destinoSlug ? getDestination(destinoSlug) : undefined;

  const filtered = lodgingListings.filter((l) => {
    if (destinoSlug && l.destinationSlug !== destinoSlug) return false;
    if (tipo && l.type !== tipo) return false;
    return true;
  });

  const destinoOptions = [
    ...new Set(lodgingListings.map((l) => l.destinationSlug)),
  ]
    .map((slug) => getDestination(slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Hospedagens" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Onde ficar</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Hospedagens e experiências
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Uma vitrine editorial com áreas para se hospedar, tipos de
          estabelecimento e experiências. Não exibimos preço, nota ou
          disponibilidade — a v1 não tem integração de inventário em tempo
          real, e preferimos não inventar.
        </p>
      </header>

      <div className="mt-6">
        <AffiliateDisclosure />
      </div>

      {/* ============================================================
          Filtros
          ============================================================ */}
      <form
        method="GET"
        action="/hospedagens"
        className="mt-8 grid gap-4 rounded-2xl border border-[#e8e3d8] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Field label="Destino" htmlFor="flt-destino">
          <Select
            id="flt-destino"
            name="destino"
            defaultValue={destinoSlug}
          >
            <option value="">Todos os destinos</option>
            {destinoOptions.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} — {d.stateUF}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Tipo" htmlFor="flt-tipo">
          <Select id="flt-tipo" name="tipo" defaultValue={tipo}>
            <option value="">Todos os tipos</option>
            {validTypes.map((t) => (
              <option key={t} value={t}>
                {TYPE_LABEL[t]}
              </option>
            ))}
          </Select>
        </Field>

        <div className="flex items-end gap-2">
          <ButtonLink href="/hospedagens" variant="secondary" className="flex-1">
            Limpar filtros
          </ButtonLink>
          <button
            type="submit"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#0a1628] px-5 text-sm font-medium text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            Filtrar
          </button>
        </div>
      </form>

      <p className="mt-5 text-sm text-[#8c8471]">
        {filtered.length === 0
          ? "Nenhuma opção corresponde aos filtros."
          : `${filtered.length} ${
              filtered.length === 1 ? "opção encontrada" : "opções encontradas"
            }`}
        {destination && (
          <>
            {" "}
            em <strong className="text-[#16304f]">{destination.name}</strong>
          </>
        )}
        .
      </p>

      {/* ============================================================
          Lista
          ============================================================ */}
      {filtered.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Sem opções para este filtro"
            description="Tente outro destino ou tipo. A base da v1 cobre os destinos publicados no guia editorial."
            action={
              <ButtonLink href="/destinos" variant="secondary">
                Explorar destinos
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {/* ============================================================
          Nota metodológica
          ============================================================ */}
      <section aria-labelledby="nota-vitrine" className="mt-14 max-w-3xl">
        <h2
          id="nota-vitrine"
          className="text-xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como esta vitrine funciona
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
          <p>
            Cada item descreve uma <strong>área ou tipo de estadia</strong>, não
            um estabelecimento específico com nota e preço. O nível de preço
            (econômico a premium) é um{" "}
            <strong>perfil relativo da região</strong>, com metodologia na
            página do destino — nunca um valor absoluto.
          </p>
          <p>
            Links marcados como <strong>afiliado</strong> podem gerar comissão
            para a RotaClara, sem custo extra para você. Quando nenhum parceiro
            está configurado, os links são editoriais e apontam para o guia do
            destino. Não exibimos avaliação, nota, desconto ou disponibilidade
            porque não temos esse dado em tempo real.
          </p>
        </div>

        <p className="mt-5 text-xs text-[#8c8471]">
          Data de referência editorial:{" "}
          <time dateTime="2026-11-13">13/11/2026</time>. Consulte sempre o
          provedor antes de reservar.
        </p>
      </section>
    </div>
  );
}

/* =====================================================================
   Card de listagem
   ===================================================================== */

function ListingCard({ listing }: { listing: LodgingListing }) {
  const destination = getDestination(listing.destinationSlug);

  const editorialLink = listing.links.find((l) => l.kind === "editorial");
  const monetizedLinks = listing.links.filter((l) => l.kind === "monetized");

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-[#0a1628]">
          {listing.name}
        </h3>
        <Badge tone="default">{TYPE_LABEL[listing.type]}</Badge>
      </div>

      <p className="mt-1 text-xs text-[#8c8471]">
        {destination ? `${destination.name} · ${destination.stateUF}` : listing.area}
        {" · "}
        <span className="font-medium text-[#16304f]">
          {PRICE_LABEL[listing.priceLevel] ?? listing.priceLevel}
        </span>
      </p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#16304f]/85">
        {listing.description}
      </p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {listing.tags.map((tag: TravelTag) => (
          <span
            key={tag}
            className="rounded-full border border-[#e8e3d8] bg-[#faf8f4] px-2.5 py-0.5 text-[11px] text-[#16304f]"
          >
            {tagLabel(tag)}
          </span>
        ))}
      </div>

      <p className="mt-3.5 rounded-lg bg-[#faf8f4] px-3 py-2 text-[11px] leading-relaxed text-[#8c8471]">
        Sem preço em tempo real · perfil relativo da área
      </p>

      <div className="mt-4 space-y-2 border-t border-[#f4f1ea] pt-3.5">
        {editorialLink && (
          <Link
            href={editorialLink.href}
            className="block text-sm font-medium text-[#17827c] underline underline-offset-2 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            {destination ? `Ver guia de ${destination.name}` : "Ver guia da área"} →
          </Link>
        )}

        {monetizedLinks.map((link) => (
          <a
            key={link.partner}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block text-sm font-medium text-[#0a1628] underline underline-offset-2 focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            {link.label}{" "}
            <span className="text-[11px] font-normal text-[#9a6206]">
              (afiliado)
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
}
