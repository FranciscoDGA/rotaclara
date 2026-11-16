/**
 * =====================================================================
 * RotaClara — Vitrine de hospedagens e experiências
 * ---------------------------------------------------------------------
 * REGRA COMERCIAL FUNDAMENTAL
 * ---------------------------
 * Esta vitrine NÃO exibe preço, disponibilidade, avaliação ou desconto.
 * A v1 não possui integração de inventário em tempo real. Cada item
 * declara `hasRealTimePricing: false` e apresenta apenas:
 *   - nome, tipo, área e descrição editorial;
 *   - nível de preço RELATIVO (econômico a premium), nunca valor absoluto;
 *   - links de parceiros, diferenciados em editoriais e monetizados.
 *
 * Quando um parceiro não estiver configurado em variável de ambiente,
 * o link é editorial interno — nunca uma URL de rastreamento falsa.
 * =====================================================================
 */

import type { LodgingListing, PartnerId, TravelTag } from "@/lib/domain/types";
import { buildOfferLink } from "@/lib/affiliate/affiliate";

/** Fonte padrão das listagens: página oficial da localidade. */
const LOCAL_SOURCES = [
  {
    name: "Ministério do Turismo",
    url: "https://www.gov.br/turismo/pt-br",
    consultedAt: "2026-11-13",
  },
];

/**
 * Cria uma listagem com os links já resolvidos pela camada de afiliados.
 * `monetizedPartners` define quais parceiros recebem link monetizado.
 */
function listing(input: {
  id: string;
  name: string;
  type: LodgingListing["type"];
  area: string;
  destinationSlug: string;
  description: string;
  priceLevel: LodgingListing["priceLevel"];
  tags: TravelTag[];
  editorialPath: string;
  monetizedPartners?: PartnerId[];
}): LodgingListing {
  const partners: PartnerId[] = input.monetizedPartners ?? [];

  return {
    id: input.id,
    name: input.name,
    type: input.type,
    area: input.area,
    destinationSlug: input.destinationSlug,
    description: input.description,
    priceLevel: input.priceLevel,
    tags: input.tags,
    hasRealTimePricing: false,
    sources: LOCAL_SOURCES,
    links: [
      // Link editorial: sempre presente, leva à página do destino.
      buildOfferLink({
        partner: "booking",
        kind: "editorial",
        label: `Ver guia de ${input.area}`,
        fallbackPath: input.editorialPath,
        destinationSlug: input.destinationSlug,
      }),
      // Links monetizados: só recebem URL real se o parceiro estiver configurado.
      ...partners.map((partner) =>
        buildOfferLink({
          partner,
          kind: "monetized",
          label: "Buscar opções no parceiro",
          fallbackPath: input.editorialPath,
          destinationSlug: input.destinationSlug,
          query: { dest: input.area },
        }),
      ),
    ],
  };
}

/** Catálogo de hospedagens e experiências da v1. */
export const lodgingListings: readonly LodgingListing[] = [
  listing({
    id: "lod-rio-copacabana",
    name: "Hotéis e pousadas na Copacabana",
    type: "hotel",
    area: "Copacabana",
    destinationSlug: "rio-de-janeiro",
    description:
      "Bairro com maior variedade de ofertas na Zona Sul do Rio: desde " +
      "estabelecimentos de porte médio a hotéis com vista para a orla. Boa " +
      "conexão de metrô e presença de restaurantes em volta.",
    priceLevel: "moderado",
    tags: ["praia", "cidade", "familia"],
    editorialPath: "/destinos/rio-de-janeiro",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-rio-ipanema",
    name: "Hotéis em Ipanema e Leblon",
    type: "hotel",
    area: "Ipanema",
    destinationSlug: "rio-de-janeiro",
    description:
      "Perfil mais silencioso e residencial que a Copacabana, com valor " +
      "diário geralmente mais elevado. Indicado para quem prioriza " +
      "conforto e proximidade com a praia.",
    priceLevel: "conforto",
    tags: ["praia", "romantico", "cidade"],
    editorialPath: "/destinos/rio-de-janeiro",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-salvador-pelourinho",
    name: "Pousadas no Pelourinho",
    type: "pousada",
    area: "Pelourinho",
    destinationSlug: "salvador",
    description:
      "Hospedagem dentro do conjunto histórico, a pé de igrejas, casas de " +
      "cultura e restaurantes. Boa escolha para imersão cultural; atenção às " +
      "ruas de pedra e ladeiras.",
    priceLevel: "moderado",
    tags: ["cultura", "historico", "romantico"],
    editorialPath: "/destinos/salvador",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-salvador-bara",
    name: "Hotéis na Barra e Ondina",
    type: "hotel",
    area: "Barra",
    destinationSlug: "salvador",
    description:
      "Orla urbana com praia, calçadão e boa infraestrutura de serviços. " +
      "Fica a maior distância do centro histórico, com deslocamento por " +
      "transporte público ou aplicativo.",
    priceLevel: "moderado",
    tags: ["praia", "familia", "cidade"],
    editorialPath: "/destinos/salvador",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-olinda-sitio",
    name: "Pousadas no sítio histórico de Olinda",
    type: "pousada",
    area: "Sítio Histórico",
    destinationSlug: "olinda",
    description:
      "Casas coloniais convertidas em hospedagem, no alto dos morros, entre " +
      "igrejas e ateliês. Tudo a pé, com o trade-off das escadarias e ruas " +
      "de pedra irregular.",
    priceLevel: "moderado",
    tags: ["cultura", "historico", "romantico"],
    editorialPath: "/destinos/olinda",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-gramado-centro",
    name: "Hotéis no centro de Gramado",
    type: "hotel",
    area: "Centro",
    destinationSlug: "gramado",
    description:
      "Base central com tudo a pé até a Rua Coberta, restaurantes e pontos " +
      "turísticos. É a opção de maior valor diário, mas com maior " +
      "conveniência na alta temporada.",
    priceLevel: "conforto",
    tags: ["familia", "romantico", "cidade"],
    editorialPath: "/destinos/gramado",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-gramado-vinhedos",
    name: "Hospedagem no Vale dos Vinhedos",
    type: "pousada",
    area: "Vale dos Vinhedos",
    destinationSlug: "gramado",
    description:
      "O Vale dos Vinhedos fica em Bento Gonçalves, Garibaldi e Monte Belo " +
      "do Sul — localidades distintas de Gramado, a uma curta viagem dali. " +
      "Bases nessas cidades ficam mais próximas das vinícolas e com valor " +
      "geralmente menor que o centro de Gramado. Exige veículo ou tour.",
    priceLevel: "moderado",
    tags: ["gastronomia", "natureza", "romantico"],
    editorialPath: "/destinos/gramado",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-bonito-centro",
    name: "Pousadas no centro de Bonito",
    type: "pousada",
    area: "Centro",
    destinationSlug: "bonito",
    description:
      "Base com pousadas, restaurantes e agências, prática para organizar " +
      "reservas de flutuação e grutas. Muitas oferecem pensão completa, o " +
      "que reduz o custo de alimentação.",
    priceLevel: "conforto",
    tags: ["natureza", "familia", "aventura"],
    editorialPath: "/destinos/bonito",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-bonito-rural",
    name: "Pousadas rurais em Bonito",
    type: "pousada",
    area: "Zona rural",
    destinationSlug: "bonito",
    description:
      "Estruturas fora da cidade, em meio à natureza, mais próximas de rios " +
      "e trilhas. Oferecem silêncio e contato direto com a paisagem, com " +
      "dependência de veículo ou transfer.",
    priceLevel: "conforto",
    tags: ["natureza", "aventura", "romantico"],
    editorialPath: "/destinos/bonito",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-chapada-lencois",
    name: "Pousadas em Lençóis",
    type: "pousada",
    area: "Lençóis",
    destinationSlug: "chapada-diamantina",
    description:
      "Cidade-base com maior estrutura da região: pousadas, agências e " +
      "restaurantes. Ponto de partida para as trilhas e cachoeiras da chapada.",
    priceLevel: "moderado",
    tags: ["natureza", "aventura", "cultura"],
    editorialPath: "/destinos/chapada-diamantina",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-manaus-centro",
    name: "Hotéis no centro de Manaus",
    type: "hotel",
    area: "Centro",
    destinationSlug: "manaus",
    description:
      "Próximos ao Teatro Amazonas e ao centro histórico, com caminhabilidade " +
      "até atrativos culturais e boa oferta de serviços.",
    priceLevel: "moderado",
    tags: ["cidade", "cultura", "familia"],
    editorialPath: "/destinos/manaus",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-manaus-ponta-negra",
    name: "Hotéis em Ponta Negra",
    type: "hotel",
    area: "Ponta Negra",
    destinationSlug: "manaus",
    description:
      "Bairro à beira do rio, com orla, calçadão e boa infraestrutura de " +
      "serviços. Fica a maior distância do centro histórico.",
    priceLevel: "conforto",
    tags: ["cidade", "praia", "familia"],
    editorialPath: "/destinos/manaus",
    monetizedPartners: ["booking"],
  }),
  listing({
    id: "lod-joao-pessoa-manaira",
    name: "Hotéis em Manaíra",
    type: "hotel",
    area: "Manaíra",
    destinationSlug: "joao-pessoa",
    description:
      "Bairro de orla com praia, calçadão e variedade de serviços próximos. " +
      "Boa relação entre custo e conveniência na capital paraibana.",
    priceLevel: "moderado",
    tags: ["praia", "familia", "cidade"],
    editorialPath: "/destinos/joao-pessoa",
    monetizedPartners: ["booking"],
  }),

  /* ---------------- Experiências e passeios ---------------- */
  listing({
    id: "exp-rio-barco",
    name: "Passeios de barco no Rio de Janeiro",
    type: "passeio",
    area: "Baía de Guanabara",
    destinationSlug: "rio-de-janeiro",
    description:
      "Saídas para a Baía de Guanabara com vista para o Cristo Redentor, o " +
      "Pão de Açúcar e a ilha de Villegagnon. A operação depende do estado " +
      "do mar e do vento.",
    priceLevel: "moderado",
    tags: ["cultura", "romantico", "familia"],
    editorialPath: "/destinos/rio-de-janeiro",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-salvador-forte",
    name: "Excursão à Praia do Forte",
    type: "passeio",
    area: "Praia do Forte",
    destinationSlug: "salvador",
    description:
      "Dia inteiro na vila costeira a cerca de 60 km do centro, com piscina " +
      "natural, recife raso e projeto de conservação de tartarugas.",
    priceLevel: "moderado",
    tags: ["praia", "natureza", "familia"],
    editorialPath: "/destinos/salvador",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-paraty-baia",
    name: "Passeio de barco pela baía de Paraty",
    type: "passeio",
    area: "Baía de Paraty",
    destinationSlug: "paraty",
    description:
      "Tour por ilhas com paradas de banho, mergulho de snorkel e praias de " +
      "água calma. A saída é confirmada pelo operador conforme o mar.",
    priceLevel: "conforto",
    tags: ["praia", "natureza", "aventura"],
    editorialPath: "/destinos/paraty",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-bonito-flutuacao",
    name: "Flutuações em Bonito",
    type: "experiencia",
    area: "Bonito",
    destinationSlug: "bonito",
    description:
      "Natação com colete em rios de água cristalina, com visitação controlada " +
      "e reserva obrigatória. Valor cobrado à parte por atrativo.",
    priceLevel: "conforto",
    tags: ["natureza", "aventura", "familia"],
    editorialPath: "/destinos/bonito",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-gramado-vinhedos",
    name: "Visita a vinícolas do Vale dos Vinhedos",
    type: "experiencia",
    area: "Vale dos Vinhedos",
    destinationSlug: "gramado",
    description:
      "Visitas a produtores com degustação de vinho e uva integral. O " +
      "passeio parte de Gramado com deslocamento até Bento Gonçalves e " +
      "cidades vizinhas do vale — outra localidade. A degustação pode ser " +
      "gratuita ou cobrada conforme a vinícola; considere motorista ou " +
      "tour se houver degustação.",
    priceLevel: "moderado",
    tags: ["gastronomia", "cultura", "romantico"],
    editorialPath: "/destinos/gramado",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-chapada-trilhas",
    name: "Trilhas guiadas na Chapada Diamantina",
    type: "experiencia",
    area: "Chapada Diamantina",
    destinationSlug: "chapada-diamantina",
    description:
      "Percursos guiados até cachoeiras e grutas, com guia local " +
      "credenciado. Alguns atrativos exigem registro prévio no parque.",
    priceLevel: "moderado",
    tags: ["natureza", "aventura"],
    editorialPath: "/destinos/chapada-diamantina",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-manaus-fluvial",
    name: "Excursões fluviais a partir de Manaus",
    type: "passeio",
    area: "Rio Solimões",
    destinationSlug: "manaus",
    description:
      "Saídas de barco para o encontro das águas e para áreas de floresta, " +
      "com duração de dia inteiro. A operação depende do nível do rio e do clima.",
    priceLevel: "conforto",
    tags: ["natureza", "aventura", "familia"],
    editorialPath: "/destinos/manaus",
    monetizedPartners: ["getyourguide", "viator"],
  }),
  listing({
    id: "exp-jp-pedal",
    name: "Aluguel de bicicleta na orla de João Pessoa",
    type: "aluguel_de_veiculo",
    area: "Cabo Branco",
    destinationSlug: "joao-pessoa",
    description:
      "Forma prática de percorrer a orla extensa da capital paraibana, com " +
      "calçadão contínuo e acesso a várias praias urbanas.",
    priceLevel: "economico",
    tags: ["praia", "familia", "natureza"],
    editorialPath: "/destinos/joao-pessoa",
    monetizedPartners: [],
  }),
] as const;

/** Filtra listagens por destino. */
export function getListingsByDestination(slug: string): LodgingListing[] {
  return lodgingListings.filter((l) => l.destinationSlug === slug);
}

/** Filtra listagens por tipo. */
export function getListingsByType(
  type: LodgingListing["type"],
): LodgingListing[] {
  return lodgingListings.filter((l) => l.type === type);
}
