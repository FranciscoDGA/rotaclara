/**
 * =====================================================================
 * RotaClara — Camada de monetização e afiliados
 * ---------------------------------------------------------------------
 * Princípios:
 *  1. Nenhum script é injetado sem configuração válida.
 *  2. Links editoriais e links monetizados são sempre diferenciados.
 *  3. Nenhuma comissão, reserva ou preço é inventado.
 *  4. A camada fica pronta para credenciais futuras sem simular conexão.
 *
 * Referência oficial Stay22: https://www.stay22.com/
 * Documentação de integração (developers): https://dev.stay22.com/docs
 *   - Allez (endpoint universal de redirecionamento): /docs/allez
 *   - Parâmetros: /docs/allez/parameters — `aid` é obrigatório
 *   - Roam (seleção de provedor): /docs/allez/roam — requer destino
 *     resolvível (`address` ou `lat`/`lng`)
 * Formato verificado em 15/11/2026: `https://www.stay22.com/allez/roam?
 * aid=<AID>&address=<destino>` responde 302 → Booking.com com o `aid`
 * rastreado (sem `address`, redireciona para a home do provedor).
 * =====================================================================
 */

import type { LinkKind, OfferLink, PartnerConfig, PartnerId } from "@/lib/domain/types";

/* =====================================================================
   Configuração por variável de ambiente
   ===================================================================== */

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

/** Identificador Stay22 da conta. Ausente = modo editorial. */
export function getStay22PublisherId(): string | null {
  return env("STAY22_PUBLISHER_ID") ?? null;
}

/** `true` quando há configuração real de um parceiro. */
export function isPartnerEnabled(id: PartnerId): boolean {
  // `env()` devolve `undefined` quando a variável está ausente ou em
  // branco — por isso a checagem é de verdade (`Boolean`), não `!== null`.
  switch (id) {
    case "stay22":
      return getStay22PublisherId() !== null;
    case "booking":
      return Boolean(env("BOOKING_AFFILIATE_ID"));
    case "getyourguide":
      return Boolean(env("GETYOURGUIDE_PARTNER_ID"));
    case "viator":
      return Boolean(env("VIATOR_AFFILIATE_ID"));
    case "civitatis":
      return Boolean(env("CIVITATIS_AFFILIATE_ID"));
    // Parceiros ainda sem variável dedicada permanecem desabilitados
    // até que o projeto defina a configuração correspondente.
    case "expedia":
    case "skyscanner":
    case "rentalcars":
    case "seguros":
      return false;
  }
}

/** Registro público de todos os parceiros suportados pela arquitetura. */
export const PARTNERS: readonly PartnerConfig[] = [
  {
    id: "stay22",
    name: "Stay22",
    enabled: isPartnerEnabled("stay22"),
    // Endpoint oficial Allez/Roam (doc: dev.stay22.com/docs/allez).
    // `aid` é o parâmetro obrigatório de rastreamento; sem ele o link
    // seria apenas a home do Stay22 (sem conversão rastreada).
    baseUrl: "https://www.stay22.com/allez/roam",
    trackingParam: "aid",
  },
  {
    id: "booking",
    name: "Booking.com",
    enabled: isPartnerEnabled("booking"),
    baseUrl: "https://www.booking.com/",
    trackingParam: "aid",
  },
  {
    id: "expedia",
    name: "Expedia",
    enabled: isPartnerEnabled("expedia"),
    baseUrl: "https://www.expedia.com/",
    trackingParam: null,
  },
  {
    id: "civitatis",
    name: "Civitatis",
    enabled: isPartnerEnabled("civitatis"),
    baseUrl: "https://www.civitatis.com/",
    trackingParam: null,
  },
  {
    id: "viator",
    name: "Viator",
    enabled: isPartnerEnabled("viator"),
    baseUrl: "https://www.viator.com/",
    trackingParam: null,
  },
  {
    id: "getyourguide",
    name: "GetYourGuide",
    enabled: isPartnerEnabled("getyourguide"),
    baseUrl: "https://www.getyourguide.com/",
    trackingParam: null,
  },
  {
    id: "skyscanner",
    name: "Skyscanner",
    enabled: isPartnerEnabled("skyscanner"),
    baseUrl: "https://www.skyscanner.com.br/",
    trackingParam: null,
  },
  {
    id: "rentalcars",
    name: "Aluguel de veículos",
    enabled: isPartnerEnabled("rentalcars"),
    baseUrl: "https://www.rentalcars.com/",
    trackingParam: null,
  },
  {
    id: "seguros",
    name: "Seguros de viagem",
    enabled: isPartnerEnabled("seguros"),
    baseUrl: "https://www.corretorasdeseguros.com.br/",
    trackingParam: null,
  },
] as const;

export function getPartner(id: PartnerId): PartnerConfig | undefined {
  return PARTNERS.find((p) => p.id === id);
}

/* =====================================================================
   Construção de links
   ===================================================================== */

interface BuildLinkOptions {
  partner: PartnerId;
  kind: LinkKind;
  label: string;
  /** Caminho interno contextual quando o parceiro não está habilitado. */
  fallbackPath?: string;
  destinationSlug?: string | null;
  /** Parâmetro de destino a acrescentar (ex.: nome da cidade). */
  query?: Record<string, string>;
}

/**
 * Monta um link de afiliado.
 *
 * Com parceiro habilitado → URL real com o parâmetro de rastreamento.
 * Sem parceiro habilitado → link editorial interno, nunca uma URL falsa
 * de rastreamento.
 */
export function buildOfferLink({
  partner,
  kind,
  label,
  fallbackPath = "/hospedagens",
  destinationSlug = null,
  query,
}: BuildLinkOptions): OfferLink {
  const config = getPartner(partner);

  if (config?.enabled && config.trackingParam) {
    const params = new URLSearchParams();
    const id = env(
      partner === "booking"
        ? "BOOKING_AFFILIATE_ID"
        : partner === "getyourguide"
          ? "GETYOURGUIDE_PARTNER_ID"
          : partner === "viator"
            ? "VIATOR_AFFILIATE_ID"
            : partner === "civitatis"
              ? "CIVITATIS_AFFILIATE_ID"
              : "STAY22_PUBLISHER_ID",
    );
    if (id) params.set(config.trackingParam, id);
    // Stay22/Roam exige um destino resolvível (`address` ou lat/lng):
    // sem ele o redirect cai na home do provedor. Usa o slug do destino
    // como endereço — parâmetro oficial documentado em /docs/allez.
    if (partner === "stay22" && destinationSlug && !query?.address) {
      params.set("address", destinationSlug);
    }
    for (const [key, value] of Object.entries(query ?? {})) {
      params.set(key, value);
    }
    const qs = params.toString();
    return {
      partner,
      kind,
      label,
      href: qs ? `${config.baseUrl}?${qs}` : config.baseUrl,
      destinationSlug,
    };
  }

  if (config?.enabled) {
    // Parceiro habilitado sem parâmetro de rastreamento conhecido:
    // aponta para o site oficial sem inventar mecanismo de rastreio.
    return {
      partner,
      kind,
      label,
      href: config.baseUrl,
      destinationSlug,
    };
  }

  // Parceiro não configurado → link editorial interno.
  return {
    partner,
    kind: "editorial",
    label,
    href: fallbackPath,
    destinationSlug,
  };
}

/* =====================================================================
   Componente de aviso legal
   ===================================================================== */

export const AFFILIATE_DISCLOSURE =
  "A RotaClara pode receber comissão de parceiros quando você acessa um " +
  "link marcado como afiliado. Isso não altera o preço que você paga nem " +
  "influencia nossas recomendações editoriais. Preços e disponibilidade " +
  "são definidos pelos parceiros e podem mudar a qualquer momento.";

/** Texto de aviso padrão para componentes de estimativa. */
export const ESTIMATE_DISCLOSURE =
  "Valores exibidos são estimativas de planejamento, não cotações em tempo " +
  "real. Eles dependem das informações fornecidas por você e não " +
  "consideram preços de passagens, hotéis ou passeios no momento da consulta.";

/**
 * Registra um clique de afiliado de forma compatível com a LGPD.
 *
 * A v1 não envia dados pessoais: apenas a categoria do link e o parceiro,
 * sem identificadores do usuário. O registro fica em memória e pode ser
 * substituído por um endpoint quando houver consentimento configurado.
 */
export interface AffiliateClickEvent {
  partner: PartnerId;
  kind: LinkKind;
  destinationSlug: string | null;
  /** Data/hora em ISO. */
  at: string;
}

const clickBuffer: AffiliateClickEvent[] = [];

export function registerAffiliateClick(
  partner: PartnerId,
  kind: LinkKind,
  destinationSlug: string | null = null,
): AffiliateClickEvent {
  const event: AffiliateClickEvent = {
    partner,
    kind,
    destinationSlug,
    at: new Date().toISOString(),
  };
  clickBuffer.push(event);
  // Mantém apenas os eventos recentes em memória na v1.
  if (clickBuffer.length > 500) clickBuffer.shift();
  return event;
}

export function getAffiliateClicks(): readonly AffiliateClickEvent[] {
  return clickBuffer;
}
