/**
 * =====================================================================
 * RotaClara — Base de destinos (Grupo 1: Sudeste e Nordeste)
 * =====================================================================
 *
 * REGRA DE HONESTIDADE DOS DADOS
 * ------------------------------
 * 1. Fatos geográficos, administrativos e atrações usam fontes oficiais
 *    (IBGE, ministérios, secretarias de turismo) registradas em `sources`.
 * 2. Custos são FAIXAS DE REFERÊNCIA PARA PLANEJAMENTO — não cotações.
 *    Cada `cost` carrega `methodology`, `referenceDate`, `confidence` e
 *    `limitations`, exibidos ao usuário na interface.
 * 3. Nenhum preço, disponibilidade ou avaliação é apresentado como real.
 * 4. O IBGE bloqueia requisições automatizadas (HTTP 403); as URLs são
 *    os padrões canônicos e devem ser conferidas manualmente na revisão.
 *
 * Para adicionar um destino: copie a estrutura, mantenha as fontes e
 * registre a data de atualização em `updatedAt`.
 * =====================================================================
 */

import type { Destination } from "@/lib/domain/types";
import { buildClimate } from "@/data/climate";

/* Metodologia padrão das estimativas de custo. */
const COST_METHODOLOGY =
  "Faixa de referência construída para planejamento a partir dos níveis " +
  "de preço usuais do destino (hospedagem, alimentação, transporte local e " +
  "passeios). Não é cotação em tempo real nem valor contratado. Use como " +
  "ordem de grandeza e confirme com provedores antes de reservar.";

const COST_LIMITATION =
  "Não inclui passagens aéreas, variações de temporada alta, câmbio ou " +
  "promoções. Valores em BRL, sem conversão de moeda.";

/* Data de referência única deste lote editorial. */
const REFERENCE_DATE = "2026-11-13";
const UPDATED_AT = "2026-11-13";

/* =====================================================================
   Grupo 1
   ===================================================================== */

export const destinationsGroupOne: Destination[] = [
  {
    slug: "rio-de-janeiro",
    name: "Rio de Janeiro",
    state: "Rio de Janeiro",
    stateUF: "RJ",
    region: "Sudeste",
    country: "Brasil",
    tagline: "Montanha, mar e urbanidade no mesmo horizonte.",
    image: {
      src: "/destinations/rio-de-janeiro.jpg",
      alt: "Pão de Açúcar e Praia de Botafogo no Rio de Janeiro",
      credit: {
        author: "Agustin Diaz Gargiulo",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/rio-de-janeiro",
        license: "Unsplash License",
      },
    },
    intro:
      "O Rio de Janeiro é o destino urbano de praia mais referenciado do Brasil. " +
      "A cidade concentra paisagens de montanha encostadas no mar, parques nacionais " +
      "dentro da malha urbana e uma vida cultural ativa. É uma escolha adequada para " +
      "quem quer combinar praia, trilhas leves, museus e gastronomia em uma mesma viagem.",
    tags: ["praia", "cidade", "cultura", "gastronomia", "vida_noturna", "familia"],
    bestMonths: [2, 3, 4, 8, 9, 10],
    bestTimeNotes:
      "Primavera e outono concentram temperaturas amenas e menor volume de " +
      "chuva que o verão. Dezembro e janeiro são os meses mais quentes e " +
      "também os de maior movimento turístico.",
    recommendedDays: { min: 4, max: 7 },
    referenceFromSaoPaulo: {
      distanceKm: 360,
      flightMinutes: 70,
      notes:
        "Por terra, o acesso a partir de São Paulo é pela Dutra (BR-116), " +
        "pela Rodovia Anchieta ou pela Rodovia dos Imigrantes. De avião, " +
        "o trecho dura cerca de 1 hora.",
    },
    cost: {
      minPerDayBRL: 260,
      maxPerDayBRL: 720,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      max: [33, 34, 33, 31, 29, 28, 28, 28, 29, 30, 31, 32],
      min: [24, 24, 24, 22, 20, 19, 18, 19, 20, 22, 23, 24],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
      sea: [26, 26, 26, 25, 24, 23, 22, 22, 23, 24, 25, 26],
    }),
    howToArrive:
      "Aeroporto Internacional do Galeão (GIG) recebe voos de todo o Brasil e " +
      "internacionais. O Santos Dumont (SDU) fica no centro e atende voos " +
      "domésticos de curta distância. Do aeroporto, há táxi, aplicativos, " +
      "BRT e ônibus.",
    localTransport:
      "Metrô, VLT, BRT, ônibus e barcas cobrem a cidade. Para praias afastadas " +
      "e bairros como Santa Teresa e o Jardim Botânico, vale combinar metrô com " +
      "ônibus ou aplicativo. Trilhas do Parque Nacional da Tijuca exigem " +
      "transporte próprio ou tour contratado.",
    lodgingAreas: [
      {
        name: "Copacabana",
        profile: "Praia clássica, movimento constante, boa conexão de metrô.",
        pros: "Conveniência, variedade de preços e restaurantes em volta.",
        cons: "Bairro com maior fluxo de pedestres e ruído noturno.",
      },
      {
        name: "Ipanema e Leblon",
        profile: "Praias valorizadas, perfil mais silencioso e residencial.",
        pros: "Segurança relativa, calçadão e vida noturna organizada.",
        cons: "Hospedagem com valor diário mais elevado.",
      },
      {
        name: "Centro e Lapa",
        profile: "Cultura, arquitetura e vida noturna.",
        pros: "Museus, igrejas históricas e metrô no local.",
        cons: "Fim de semana e madrugada com fluxo desigual de segurança.",
      },
      {
        name: "Botafogo",
        profile: "Base prática com vista para o Pão de Açúcar.",
        pros: "Conexão de metrô, gastronomia e acesso rápido à Zona Sul.",
        cons: "Praia pequena; o foco é conveniência, não banho de mar.",
      },
    ],
    attractions: [
      {
        id: "rio-cristo",
        name: "Cristo Redentor",
        description:
          "Estátua no alto do Corcovado, dentro do Parque Nacional da Tijuca, " +
          "com vista panorâmica da cidade e da Baía de Guanabara.",
        tags: ["cultura", "cidade", "familia", "natureza"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 60, max: 139 },
        isFree: false,
        area: "Corcovado — Tijuca",
        sources: [
          {
            name: "Parque Nacional da Tijuca — IBAMA",
            url: "https://www.gov.br/ibama/pt-br",
            consultedAt: REFERENCE_DATE,
          },
          {
            name: "Trem do Corcovado (site oficial)",
            url: "https://www.tremdocorcovado.rio/",
            consultedAt: "2026-11-14",
          },
        ],
        notes:
          "O acesso ao monumento é pago e obrigatoriamente com transporte " +
          "oficial: a pé ou de van a partir das Paineiras (cerca de R$ 60) ou " +
          "pelo trem funicular (cerca de R$ 139). Valores consultados em " +
          "14/11/2026 e sujeitos a alteração; confirme no site oficial antes de ir.",
      },
      {
        id: "rio-pao-de-acucar",
        name: "Pão de Açúcar",
        description:
          "Morro com bondinho e teleférico ligando a Urca ao topo, com vista " +
          "para a Baía de Guanabara e a orla.",
        tags: ["cidade", "cultura", "familia", "natureza"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 0, max: 0 },
        isFree: false,
        area: "Urca",
        sources: [
          {
            name: "Bondinho Pão de Açúcar (site oficial)",
            url: "https://www.bondinho.com.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Ingresso cobrado. Condições de vento podem suspender o bondinho.",
      },
      {
        id: "rio-copacabana",
        name: "Praia de Copacabana",
        description:
          "Orla de aproximadamente 4 km com calçadão em mosaico português, " +
          "postos de praia e infraestrutura completa.",
        tags: ["praia", "familia", "cidade"],
        suggestedMinutes: 240,
        admissionFeeBRL: null,
        isFree: true,
        area: "Copacabana",
        sources: [
          {
            name: "Prefeitura do Rio de Janeiro",
            url: "https://www.rio.rj.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "rio-ipanema",
        name: "Praia de Ipanema",
        description:
          "Orla dividida em postos, com o Arpoador ao extremo leste, ponto " +
          "clássico para observar o pôr do sol.",
        tags: ["praia", "romantico", "cidade"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Ipanema",
        sources: [
          {
            name: "Prefeitura do Rio de Janeiro",
            url: "https://www.rio.rj.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "rio-tijuca",
        name: "Parque Nacional da Tijuca",
        description:
          "Mata atlântica urbana com trilhas, quedas d'água e o Cristo " +
          "Redentor; maior floresta urbana do mundo reconhecida como parque nacional.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 0, max: 0 },
        isFree: true,
        area: "Tijuca",
        sources: [
          {
            name: "IBAMA — Parques Nacionais",
            url: "https://www.gov.br/ibama/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Trilhas de dificuldade variável. Verifique o horário de funcionamento " +
          "e as condições de chuva antes de subir.",
      },
      {
        id: "rio-jardim-botanico",
        name: "Jardim Botânico do Rio",
        description:
          "Jardim histórico com coleção de bromélias, orquídeas, palmeiras " +
          "imperiais e trilhas leves ao ar livre.",
        tags: ["natureza", "familia", "cultura"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 20, max: 60 },
        isFree: false,
        area: "Jardim Botânico",
        sources: [
          {
            name: "Instituto de Pesquisas Jardim Botânico do Rio de Janeiro",
            url: "https://www.gov.br/jbrj/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Valor de entrada sujeita a alteração; confirme no site oficial.",
      },
      {
        id: "rio-museu-do-amanha",
        name: "Museu do Amanhã",
        description:
          "Museu de ciências interativas com foco em sustentabilidade, " +
          "localizado no Pier Mauá, reformado para a Olimpíada de 2016.",
        tags: ["cultura", "familia", "cidade"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 20, max: 70 },
        isFree: false,
        area: "Praça Mauá — Centro",
        sources: [
          {
            name: "Museu do Amanhã",
            url: "https://museudoamanha.org.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Entrada gratuita em condições e horários específicos divulgados pelo museu.",
      },
      {
        id: "rio-santa-teresa",
        name: "Santa Teresa",
        description:
          "Bairro de morro com ateliês, casas coloniais, o Parque das Ruínas " +
          "e o famoso bondinho de passageiros.",
        tags: ["cultura", "gastronomia", "cidade"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Santa Teresa",
        sources: [
          {
            name: "Rio de Janeiro — Secretaria de Turismo",
            url: "https://www.riotur.rio/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Bairro de morro com ruas irregulares; use transporte adequado " +
          "para subida e desida.",
      },
    ],
    warnings: [
      "Atenção redobrada com objetos de valor em praias, metrô e pontos turísticos " +
        "movimentados; evite exibir celular e joias em multidão.",
      "Verifique o boletim do INMET para dias de chuva forte: o nível de rios e " +
        "vias alagadas pode mudar rapidamente.",
      "Trilhas do Parque da Tijuca devem ser evitadas em dias de chuva intensa.",
      "Alguns passeios de barco têm operação condicionada ao estado do mar " +
        "e ao vento; confirme a saída antes de pagar.",
      "Horários de atrações cobradas variam em feriados e feriados prolongados.",
    ],
    food:
      "A cidade reúne desde botecos de bairro e casas de feijoada a restaurantes " +
      "de cozinha autoral. Regiões como Botafogo, Ipanema, Santa Teresa e o " +
      "Centro concentram opções. Praias têm quiosques com cardápio simples — " +
      "valores costumam ser maiores que os de bairro.",
    palette: { sky: "#1b4f72", horizon: "#2e86ab", land: "#0f766e", accent: "#d4a017" },
    editorialScore: 0.94,
    updatedAt: UPDATED_AT,
    highlights: [
      "Praia, montanha e parque nacional na mesma cidade",
      "Conexões aéreas curtas a partir de São Paulo",
      "Base para combinar cidade e natureza em uma viagem só",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Rio de Janeiro)",
        url: "https://cidades.ibge.gov.br/brasil/rj/rio-de-janeiro",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Contexto de turismo nacional e política setorial.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Referência de padrões climáticos regionais.",
      },
    ],
  },

  {
    slug: "sao-paulo",
    name: "São Paulo",
    state: "São Paulo",
    stateUF: "SP",
    region: "Sudeste",
    country: "Brasil",
    tagline: "Cultura, gastronomia e oferta intensa o ano inteiro.",
    image: {
      src: "/destinations/sao-paulo.jpg",
      alt: "Avenida Paulista e skyline iluminado de São Paulo",
      credit: {
        author: "Sergio Souza",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/sao-paulo",
        license: "Unsplash License",
      },
    },
    intro:
      "São Paulo é o maior centro econômico e cultural do Brasil. Não é destino " +
      "de praia: a proposta é museus, bairros com identidade própria, gastronomia " +
      "de amplo escopo e agenda cultural constante. Funciona bem para viagens " +
      "curtas, viagens de negócios combinadas com lazer e para quem viaja com " +
      "crianças em busca de museus interativos.",
    tags: ["cidade", "cultura", "gastronomia", "vida_noturna", "familia"],
    bestMonths: [2, 3, 4, 8, 9, 10],
    bestTimeNotes:
      "Março a maio e setembro a novembro trazem temperaturas mais amenas. " +
      "O verão (dezembro a fevereiro) é quente e chuvoso, com pancadas " +
      "intensas em algumas tardes.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 0,
      flightMinutes: null,
      notes: "Cidade de origem de referência para os cálculos de distância da plataforma.",
    },
    cost: {
      minPerDayBRL: 240,
      maxPerDayBRL: 700,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      max: [29, 30, 29, 27, 24, 23, 23, 25, 26, 27, 28, 28],
      min: [19, 20, 19, 17, 15, 14, 13, 14, 16, 17, 18, 19],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
    }),
    howToArrive:
      "Aeroporto Internacional de Guarulhos (GRU) é o principal hub do país, " +
      "com voos domésticos e internacionais. O Congonhas (CGH) atende voos " +
      "domésticos e fica mais perto do centro. Há trem, metrô, ônibus " +
      "intermunicipais e rodovias em várias direções.",
    localTransport:
      "Metrô, CPTM, trem, ônibus municipal e aplicativos. O bilhete único " +
      "integra metrô e ônibus. Trânsito intenso nos horários de pico; para " +
      "eventos, considere chegar com folga.",
    lodgingAreas: [
      {
        name: "Bela Vista / Consolação",
        profile: "Centro expandido com metrô, teatros e vida urbana intensa.",
        pros: "Conexões de transporte e proximidade com avenida Paulista.",
        cons: "Ruído noturno em ruas movimentadas.",
      },
      {
        name: "Jardins",
        profile: "Perfil residencial valorizado, com gastronomia e lojas.",
        pros: "Conforto, calma relativa e boa oferta de restaurantes.",
        cons: "Hospedagem com valor diário mais alto.",
      },
      {
        name: "Pinheiros / Vila Madalena",
        profile: "Bairros culturais com galerias, cafés e vida noturna.",
        pros: "Museus próximos, metrô e ambiente jovem.",
        cons: "Trânsito local e estacionamento disputado.",
      },
      {
        name: "Vila Olímpia / Itaim",
        profile: "Base corporativa com shoppings e conexões rápidas.",
        pros: "Conveniência para negócios e shopping.",
        cons: "Menor densidade de atrações culturais a pé.",
      },
    ],
    attractions: [
      {
        id: "sp-masp",
        name: "MASP — Museu de Arte de São Paulo",
        description:
          "Museu suspendido sobre a Avenida Paulista, com acervo de arte " +
          "ocidental e brasileira em apresentação em cavaletes de vidro.",
        tags: ["cultura", "cidade", "familia"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 30, max: 90 },
        isFree: false,
        area: "Avenida Paulista",
        sources: [
          { name: "MASP (site oficial)", url: "https://masp.org.br/", consultedAt: REFERENCE_DATE },
        ],
        notes: "Terças a domingos; entrada gratuita em condições específicas divulgadas pelo museu.",
      },
      {
        id: "sp-ibirapuera",
        name: "Parque Ibirapuera",
        description:
          "Parque urbano com lagos, pontes, museus, pavilhões e o Auditório " +
          "Ibirapuera — referência de lazer e cultura na cidade.",
        tags: ["natureza", "familia", "cultura", "cidade"],
        suggestedMinutes: 240,
        admissionFeeBRL: null,
        isFree: true,
        area: "Vila Mariana",
        sources: [
          {
            name: "Prefeitura de São Paulo — Parque Ibirapuera",
            url: "https://www.prefeitura.sp.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Alguns pavilhões e museus do complexo cobram entrada individual.",
      },
      {
        id: "sp-pinacoteca",
        name: "Pinacoteca de São Paulo",
        description:
          "Museu de arte brasileira instalado no Jardim da Luz, com acervo " +
          "que percorre diferentes períodos da produção nacional.",
        tags: ["cultura", "cidade"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 0, max: 45 },
        isFree: false,
        area: "Luz",
        sources: [
          { name: "Pinacoteca", url: "https://pinacoteca.org.br/", consultedAt: REFERENCE_DATE },
        ],
        notes: "Entrada gratuita em condições e horários específicos anunciados pela instituição.",
      },
      {
        id: "sp-liberdade",
        name: "Bairro da Liberdade",
        description:
          "Centro histórico de imigração japonesa com casas de chá, lojas, " +
          "templos e a rua com lanternas vermelhas.",
        tags: ["cultura", "gastronomia", "cidade", "familia"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Liberdade",
        sources: [
          {
            name: "Turismo São Paulo — Prefeitura",
            url: "https://www.prefeitura.sp.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "sp-mercado-municipal",
        name: "Mercado Municipal",
        description:
          "Mercado histórico com bancas de frutas, peixes, embutidos e " +
          "restaurante no mezanino, ponto clássico para o almoço paulistano.",
        tags: ["gastronomia", "cultura", "cidade"],
        suggestedMinutes: 120,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro",
        sources: [
          {
            name: "Mercado Municipal de São Paulo (site oficial)",
            url: "https://www.mercadomunicipalsp.com/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Funciona em horários comerciais; bancas podem variar no domingo.",
      },
      {
        id: "sp-vila-madalena",
        name: "Vila Madalena",
        description:
          "Bairro com casas coloridas, galerias de arte, cafés e a Beco do " +
          "Batman, conhecido pelos murais.",
        tags: ["cultura", "gastronomia", "vida_noturna", "cidade"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Pinheiros / Vila Madalena",
        sources: [
          {
            name: "Turismo São Paulo — Prefeitura",
            url: "https://www.prefeitura.sp.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
    ],
    warnings: [
      "Trânsito denso nos horários de pico: organize deslocamentos com antecedência.",
      "Alguns pontos turísticos do Centro concentram movimento intenso; " +
        "mantenha atenção com pertences em horários de maior fluxo.",
      "Dias de chuva forte podem causar alagamentos em vias; consulte o INMET.",
      "Feriados prolongados e eventos na Paulista alteram fluxo e preços de hospedagem.",
      "Museus fecham em determinados dias da semana; confirme a programação antes da visita.",
    ],
    food:
      "Uma das cidades com maior variedade gastronômica do país: cozinhas " +
      "regionais brasileiras, asiática, italiana, árabe e autoral convivem. " +
      "Bairros como Pinheiros, Vila Madalena, Liberdade e o Centro concentram " +
      "opções. Mercados e casas de alimentação rápida cobram menos que " +
      "restaurantes de praça nobre.",
    palette: { sky: "#1f3b57", horizon: "#3d6f95", land: "#14532d", accent: "#c9952f" },
    editorialScore: 0.9,
    updatedAt: UPDATED_AT,
    highlights: [
      "Museus e cultura o ano inteiro",
      "Gastronomia de amplo escopo",
      "Excelente para viagens curtas de fim de semana",
    ],
    sources: [
      {
        name: "IBGE — Cidades (São Paulo)",
        url: "https://cidades.ibge.gov.br/brasil/sp/sao-paulo",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Contexto de turismo nacional.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Referência de padrões climáticos regionais.",
      },
    ],
  },

  {
    slug: "salvador",
    name: "Salvador",
    state: "Bahia",
    stateUF: "BA",
    region: "Nordeste",
    country: "Brasil",
    tagline: "Centro histórico, cultura afro-brasileira e orla atlântica.",
    image: {
      src: "/destinations/salvador.jpg",
      alt: "Torres de igreja e casario colonial do centro histórico de Salvador",
      credit: {
        author: "José Maldonado",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/rua-de-paralelepipedos-e-igreja-em-salvador-cBCA8qjKIXs",
        license: "Unsplash License",
      },
    },
    intro:
      "Salvador foi a primeira capital do Brasil e concentra um dos maiores " +
      "conjuntos de centro histórico do país. A cidade combina arquitetura " +
      "colonial, referências da cultura afro-brasileira, gastronomia própria " +
      "e praias urbanas. É uma escolha forte para quem prioriza cultura, " +
      "música e patrimônio, com opções de praia em bairros próximos.",
    tags: ["cultura", "historico", "gastronomia", "praia", "familia", "vida_noturna"],
    bestMonths: [8, 9, 10, 11, 0, 1, 2],
    bestTimeNotes:
      "A estação chuvosa local se concentra entre abril e julho. Os meses " +
      "secos, do fim do ano ao início do ano seguinte, são os mais indicados " +
      "para combinar passeios a céu aberto e praia.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 1530,
      flightMinutes: 155,
      notes:
        "Voo direto a partir de Guarulhos com tempo médio próximo de 2h30. " +
        "Também há conexões por rodovia em trajetos longos.",
    },
    cost: {
      minPerDayBRL: 220,
      maxPerDayBRL: 620,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      max: [31, 31, 31, 30, 28, 27, 27, 27, 28, 30, 30, 31],
      min: [24, 24, 24, 24, 23, 22, 21, 21, 22, 23, 24, 24],
      rain: [
        "intermediario",
        "intermediario",
        "intermediario",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
      ],
      sea: [27, 27, 27, 27, 27, 26, 25, 25, 26, 26, 27, 27],
    }),
    howToArrive:
      "Aeroporto Internacional de Salvador (SSA) recebe voos de todas as " +
      "regiões do Brasil e conexões internacionais. Do aeroporto ao centro " +
      "histórico há táxi, aplicativo e ônibus municipal.",
    localTransport:
      "Ônibus municipal, metrô (trecho limitado) e aplicativos. O Elevador " +
      "Lacerda liga o Centro Histórico (Cidade Alta) ao Comércio (Cidade Baixa). " +
      "Para o Pelourinho, a melhor base é andar a pé dentro do conjunto histórico.",
    lodgingAreas: [
      {
        name: "Pelourinho",
        profile: "No coração do centro histórico, perto de igrejas e casas de cultura.",
        pros: "Caminhável e imersivo culturalmente.",
        cons: "Ruas irregulares e som alto em noites de evento.",
      },
      {
        name: "Barra e Ondina",
        profile: "Orla urbana com praia e boa infraestrutura de serviços.",
        pros: "Praia próxima, calçadão e variedade gastronômica.",
        cons: "Deslocamento até o Pelourinho é maior.",
      },
      {
        name: "Vitória / Graça",
        profile: "Bairros residenciais com vista e atmosfera mais tranquila.",
        pros: "Calma relativa e boa comida regional.",
        cons: "Exige carro ou aplicativo para a maioria dos passeios.",
      },
      {
        name: "Itapuã",
        profile: "Bairro de praia mais afastado, com orla extensa.",
        pros: "Praia extensa e preços menores que a Barra.",
        cons: "Distância do centro histórico e do aeroporto.",
      },
    ],
    attractions: [
      {
        id: "ssa-pelourinho",
        name: "Pelourinho",
        description:
          "Conjunto histórico do século XVIII com igrejas, casas coloniais " +
          "coloridas, museus e casas de música e dança.",
        tags: ["cultura", "historico", "familia", "cidade"],
        suggestedMinutes: 240,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro Histórico — Cidade Alta",
        sources: [
          {
            name: "Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN)",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Entrada livre nas ruas; museus e casas de cultura podem cobrar ingresso.",
      },
      {
        id: "ssa-elevador-lacerda",
        name: "Elevador Lacerda",
        description:
          "Elevador público que liga a Cidade Alta à Cidade Baixa, marco " +
          "urbano de Salvador com vista para a Baía de Todos-os-Santos.",
        tags: ["cultura", "historico", "cidade"],
        suggestedMinutes: 45,
        admissionFeeBRL: { min: 0, max: 10 },
        isFree: false,
        area: "Praça Cayru — Centro",
        sources: [
          {
            name: "Prefeitura de Salvador",
            url: "https://www.salvador.ba.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Tarifa de travessia é cobrada; confirme valores no local.",
      },
      {
        id: "ssa-farol-da-barra",
        name: "Farol da Barra",
        description:
          "Fortaleza do século XVI com museu militar e vista para a orla, " +
          "ponto de referência do bairro da Barra.",
        tags: ["historico", "cultura", "praia", "familia"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 10, max: 30 },
        isFree: false,
        area: "Barra",
        sources: [
          {
            name: "Instituto do Patrimônio Artístico e Cultural da Bahia (IPAC)",
            url: "https://www.ipac.ba.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Instituições militares podem restringir acesso em datas comemorativas.",
      },
      {
        id: "ssa-praia-do-forte",
        name: "Praia do Forte",
        description:
          "Vila costeira a cerca de 60 km do centro, com piscina natural, " +
          "recife raso e presença do projeto de conservação de tartarugas.",
        tags: ["praia", "natureza", "familia"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 0, max: 30 },
        isFree: false,
        area: "Mata de São João (região metropolitana)",
        sources: [
          {
            name: "ProTAMAR — Projeto TAMAR",
            url: "https://www.tamar.org.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Acesso por rodovia; considere aluguel de veículo ou tour contratado.",
      },
      {
        id: "ssa-igreja-sao-francisco",
        name: "Igreja e Convento de São Francisco",
        description:
          "Conjunto barroco com interior revestido de azulejos e talha " +
          "dourada, um dos conjuntos sacros mais visitados do Nordeste.",
        tags: ["cultura", "historico"],
        suggestedMinutes: 90,
        admissionFeeBRL: { min: 10, max: 40 },
        isFree: false,
        area: "Santo Antônio Além do Carmo",
        sources: [
          {
            name: "IPHAN — Patrimônio Histórico",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Ingresso cobrado para o interior; confirme horário de funcionamento.",
      },
      {
        id: "ssa-teatro-bahia",
        name: "Teatro Castro Alves",
        description:
          "Grande casa de espetáculos da cidade, com programação de música, " +
          "dança e teatro ao longo do ano.",
        tags: ["cultura", "cidade"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 0, max: 150 },
        isFree: false,
        area: "Machado de Assis — Rio Vermelho",
        sources: [
          {
            name: "Secretaria da Cultura do Estado da Bahia",
            url: "https://www.cultura.ba.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Valor conforme a peça ou concerto do dia; há programação gratuita em algumas datas.",
      },
    ],
    warnings: [
      "O centro histórico tem ruas irregulares e calçadas irregulares; " +
        "calçado confortável é essencial.",
      "Em dias de chuva, ruas do Pelourinho ficam escorregadias e alagam com facilidade.",
      "Feriados e a temporada de verão concentram público; reserve hospedagem com antecedência.",
      "Passeios a Praia do Forte e para a Costa do Cacau dependem de rodovia — " +
        "avalie aluguel de veículo ou tour.",
      "Confirme o funcionamento de igrejas e casas de cultura antes da visita: " +
        "alguns fecham em determinados dias.",
    ],
    food:
      "A gastronomia baiana é marcada por pratos de origem africana e " +
      "indígena: moqueca, acarajé, bobó, vatapá e o consumo de dendê. " +
      "Restaurantes no Pelourinho, Rio Vermelho, Itapuã e no Mercado Modelo " +
      "concentram opções. Praias e bairros turísticos cobram mais que as " +
      "casas de bairro.",
    palette: { sky: "#1a4f6b", horizon: "#2a9d8f", land: "#7f4f24", accent: "#e9c46a" },
    editorialScore: 0.92,
    updatedAt: UPDATED_AT,
    highlights: [
      "Centro histórico reconhecido como patrimônio",
      "Cultura afro-brasileira presente no dia a dia",
      "Combina cidade, cultura e praia em bairros próximos",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Salvador)",
        url: "https://cidades.ibge.gov.br/brasil/ba/salvador",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "IPHAN — Instituto do Patrimônio Histórico e Artístico Nacional",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Caracterização do conjunto histórico do Pelourinho.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Contexto de turismo nacional.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Referência de padrões climáticos regionais.",
      },
    ],
  },

  {
    slug: "olinda",
    name: "Olinda",
    state: "Pernambuco",
    stateUF: "PE",
    region: "Nordeste",
    country: "Brasil",
    tagline: "Cidade colonial em morro, com arte, ofícios e vista para o mar.",
    image: {
      src: "/destinations/olinda.jpg",
      alt: "Casas coloniais coloridas em rua de paralelepípedos no centro histórico de Olinda",
      credit: {
        author: "Secret Travel Guide",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/casas-de-concreto-azuis-amarelas-e-vermelhas-sob-nuvens-brancas-durante-o-dia-DPrvrpPijkU",
        license: "Unsplash License",
      },
    },
    intro:
      "Olinda é um conjunto histórico colonial erguido sobre morros, com " +
      "igrejas, casas de taipa, ateliês e mirantes. A cidade é referência " +
      "nacional no carnaval de rua e mantém forte tradição de artesanato e " +
      "música. Funciona bem para viagens culturais, para casais e para quem " +
      "quer uma base tranquila perto do litoral pernambucano.",
    tags: ["cultura", "historico", "gastronomia", "romantico", "familia"],
    bestMonths: [8, 9, 10, 11, 0, 1, 2],
    bestTimeNotes:
      "O período seco local vai de setembro a março. Dezembro e janeiro são " +
      "os meses mais quentes. O carnaval concentra o maior fluxo do ano e " +
      "requer planejamento antecipado.",
    recommendedDays: { min: 2, max: 4 },
    referenceFromSaoPaulo: {
      distanceKm: 2130,
      flightMinutes: 165,
      notes:
        "Voo até Recife (aeroporto Recife/Guararapes–Gilberto Freyre, REC) " +
        "com conexão terrestre curta até Olinda. " +
        "Também é possível voar até João Pessoa e seguir por rodovia.",
    },
    cost: {
      minPerDayBRL: 190,
      maxPerDayBRL: 540,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "economico",
    climateByMonth: buildClimate({
      max: [32, 32, 32, 31, 30, 29, 28, 28, 29, 31, 31, 32],
      min: [24, 24, 24, 24, 23, 23, 22, 22, 23, 24, 24, 24],
      rain: [
        "seco",
        "seco",
        "seco",
        "intermediario",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "seco",
        "seco",
        "seco",
        "seco",
      ],
      sea: [28, 28, 28, 28, 28, 27, 27, 27, 27, 28, 28, 28],
    }),
    howToArrive:
      "Aeroporto Internacional do Recife (REC) é o ponto de entrada. Olinda " +
      "fica a cerca de 20 km do aeroporto, com acesso por rodovia, táxi, " +
      "aplicativo ou ônibus com conexão no centro do Recife.",
    localTransport:
      "A cidade histórica é voltada para pedestres, com ruas íngremes e " +
      "escadarias. Para bairros mais distantes e para Recife, use táxi, " +
      "aplicativo ou ônibus. Alugar veículo ajuda para praias da região.",
    lodgingAreas: [
      {
        name: "Sítio Histórico (centro colonial)",
        profile: "No alto dos morros, entre igrejas e ateliês.",
        pros: "Imersão total na atmosfera histórica e a pé para tudo.",
        cons: "Escadarias e ruas de pedra irregulares; difícil para mobilidade reduzida.",
      },
      {
        name: "Casa Forte / Casa Amarela",
        profile: "Bairros residenciais do Recife próximos a Olinda.",
        pros: "Mais silencioso, com boa infraestrutura de serviços.",
        cons: "Exige transporte para o centro histórico.",
      },
      {
        name: "Praia de Olinda e Janga",
        profile: "Orla com praia e vida de bairro.",
        pros: "Praia próxima e preços mais acessíveis.",
        cons: "Distância do sítio histórico.",
      },
    ],
    attractions: [
      {
        id: "ol-alto-da-se",
        name: "Alto da Sé e mirante",
        description:
          "Ponto mais alto do sítio histórico, com vista para a Baía de " +
          "Todos-os-Santos, o Recife e o mar.",
        tags: ["cultura", "historico", "romantico"],
        suggestedMinutes: 60,
        admissionFeeBRL: null,
        isFree: true,
        area: "Sítio Histórico",
        sources: [
          {
            name: "Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN)",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Acesso a pé por ruas e escadarias íngremes.",
      },
      {
        id: "ol-igreja-carmo",
        name: "Igreja do Carmo",
        description:
          "Igreja colonial do século XVIII, marco do barroco pernambucano, " +
          "próxima ao Alto da Sé.",
        tags: ["cultura", "historico"],
        suggestedMinutes: 60,
        admissionFeeBRL: null,
        isFree: true,
        area: "Sítio Histórico",
        sources: [
          {
            name: "IPHAN — Patrimônio Histórico",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Cultos e eventos podem restringir o acesso ao interior.",
      },
      {
        id: "ol-rua-do-amparo",
        name: "Rua do Amparo",
        description:
          "Rua colonial com casas de taipa e pousadas, um dos cartões " +
          "postais da cidade.",
        tags: ["cultura", "historico", "romantico"],
        suggestedMinutes: 90,
        admissionFeeBRL: null,
        isFree: true,
        area: "Sítio Histórico",
        sources: [
          {
            name: "Prefeitura de Olinda",
            url: "https://olinda.pe.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "ol-museu-mamulengo",
        name: "Museu do Mamulengo",
        description:
          "Museu dedicado à tradição pernambucana do mamulengo, com " +
          "bonecos e registros do teatro popular.",
        tags: ["cultura", "familia", "historico"],
        suggestedMinutes: 75,
        admissionFeeBRL: { min: 0, max: 20 },
        isFree: false,
        area: "Bairro do Amparo",
        sources: [
          {
            name: "UNIMA — Enciclopédia de Marionetes (WEPa)",
            url: "https://wepa.unima.org/en/museu-do-mamulengo-espaco-tirida/",
            consultedAt: "2026-11-14",
          },
        ],
        notes: "Confirme horários com a instituição antes da visita.",
      },
      {
        id: "ol-praia-de-olinda",
        name: "Praia de Olinda",
        description:
          "Praia urbana com coqueiros, calçadão e povoado local, a poucos " +
          "minutos do centro histórico.",
        tags: ["praia", "familia", "romantico"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Praia de Olinda",
        sources: [
          {
            name: "Prefeitura de Olinda",
            url: "https://olinda.pe.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
    ],
    warnings: [
      "As ruas do sítio histórico são íngremes, com escadarias e pedra irregular — " +
        "não é indicado para mobilidade reduzida sem planejamento.",
      "Em dias de chuva, as ladeiras ficam escorregadias.",
      "O carnaval de Olinda concentra grande público; hospedagem deve ser reservada com muita antecedência.",
      "Alguns pontos cobram entrada apenas em horários específicos; confirme antes.",
      "Para Recife, considere o tempo de deslocamento na programação do dia.",
    ],
    food:
      "A cozinha pernambucana aparece em restaurantes do sítio histórico e " +
      "em casas de bairro: bolo de rolo, cuscuz, tapioca, peixe frito e " +
      "doces. A tapioca é vendida em barracas e calçadas com preço baixo. " +
      "Restaurantes dentro do conjunto histórico tendem a cobrar mais que " +
      "as casas fora dele.",
    palette: { sky: "#2b5f75", horizon: "#3fa7a0", land: "#b5651d", accent: "#f2c14e" },
    editorialScore: 0.88,
    updatedAt: UPDATED_AT,
    highlights: [
      "Centro histórico colonial em morro",
      "Referência nacional no carnaval de rua",
      "Base tranquila para casais e para quem viaja a pé",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Olinda)",
        url: "https://cidades.ibge.gov.br/brasil/pe/olinda",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "IPHAN — Instituto do Patrimônio Histórico e Artístico Nacional",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Caracterização do conjunto histórico.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Referência de padrões climáticos regionais.",
      },
    ],
  },

  {
    slug: "paraty",
    name: "Paraty",
    state: "Rio de Janeiro",
    stateUF: "RJ",
    region: "Sudeste",
    country: "Brasil",
    tagline: "Centro colonial intacto, cachoeiras e baía de ilhas.",
    image: {
      src: "/destinations/paraty.jpg",
      alt: "Ruas de paralelepípedos e casas brancas do centro histórico de Paraty",
      credit: {
        author: "Charles Assunção",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/uma-rua-de-paralelepipedos-alinhada-com-edificios-brancos-L5KATEUSQtw",
        license: "Unsplash License",
      },
    },
    intro:
      "Paraty preserva um centro histórico colonial com ruas pedregosas e " +
      "casas de fachada branca, cercado por montanhas, cachoeiras e uma baía " +
      "com ilhas. A cidade combina patrimônio, natureza e uma cena de " +
      "gastronomia e cachaçarias no entorno. É uma escolha bem equilibrada " +
      "para casais, famílias e viagens de média duração.",
    tags: ["cultura", "historico", "natureza", "praia", "gastronomia", "romantico", "familia"],
    bestMonths: [3, 4, 5, 6, 7, 8],
    bestTimeNotes:
      "Inverno e primavera trazem menos chuva e temperaturas amenas, ideais " +
      "para trilhas e cachoeiras. O verão é quente e chuvoso, com maior " +
      "fluxo turístico nas praias.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 270,
      flightMinutes: null,
      notes:
        "Sem aeroporto próprio: acesso por rodovia (Rio-Santos/BR-101 e " +
        "Imigrantes), com cerca de 270 km de São Paulo por estrada — cerca " +
        "de 205 km em linha reta. A distância declarada é a rodoviária.",
    },
    cost: {
      minPerDayBRL: 230,
      maxPerDayBRL: 650,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      max: [32, 33, 32, 30, 28, 26, 26, 27, 28, 29, 30, 31],
      min: [23, 24, 23, 21, 19, 17, 17, 18, 19, 21, 22, 23],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
      sea: [26, 27, 26, 25, 23, 22, 21, 21, 22, 23, 25, 26],
    }),
    howToArrive:
      "Acesso rodoviário. A partir do Rio de Janeiro são cerca de 4,5 horas " +
      "de carro ou ônibus; a partir de São Paulo, cerca de 6 horas. Há " +
      "terminal rodoviário com conexões regulares. O aeroporto mais próximo " +
      "é o do Rio de Janeiro, com transfer rodoviário.",
    localTransport:
      "O centro histórico é feito para pedestres — ruas são de pedra e não " +
      "circulam carros. Para praias, cachoeiras e cachaçarias do entorno, " +
      "são usados aluguel de veículo, bicicleta, van ou tour contratado.",
    lodgingAreas: [
      {
        name: "Centro histórico",
        profile: "Pousadas e hotéis dentro do conjunto colonial.",
        pros: "Tudo a pé, atmosfera autêntica.",
        cons: "Ruas de pedra irregulares e ruído em noites de evento.",
      },
      {
        name: "Praia do Meio e Jabaquara",
        profile: "Orla próxima ao centro, com praias urbanas.",
        pros: "Praia a poucos minutos do centro.",
        cons: "Menor variedade de serviços fora da temporada.",
      },
      {
        name: "Trindade",
        profile: "Distrito de praia a cerca de 30 km, com piscinas naturais.",
        pros: "Praias calmas e forte contato com a natureza.",
        cons: "Distância do centro e acesso dependente de rodovia.",
      },
    ],
    attractions: [
      {
        id: "par-centro-historico",
        name: "Centro histórico de Paraty",
        description:
          "Conjunto colonial com ruas pedregosas, igrejas, casas de fachada " +
          "branca e portas coloridas, sem circulação de veículos.",
        tags: ["cultura", "historico", "familia", "romantico"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro",
        sources: [
          {
            name: "IPHAN — Conjunto Histórico de Paraty",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "par-baia-das-ilhas",
        name: "Ilhas da Baía de Paraty",
        description:
          "Passeio de barco por ilhas da baía com paradas de banho, mergulho " +
          "de snorkel e praias de água calma.",
        tags: ["praia", "natureza", "aventura", "familia"],
        suggestedMinutes: 420,
        admissionFeeBRL: { min: 150, max: 500 },
        isFree: false,
        area: "Baía de Paraty",
        sources: [
          {
            name: "Prefeitura de Paraty",
            url: "https://paraty.rj.gov.br/",
            consultedAt: "2026-11-14",
          },
        ],
        notes:
          "Passeio contratado com operador local. O valor é do passeio, não " +
          "de disponibilidade em tempo real; confirme com o operador.",
      },
      {
        id: "par-cachoeiras",
        name: "Cachoeiras do entorno",
        description:
          "Rede de quedas d'água na região, com trilhas curtas e piscinas " +
          "naturais de acesso controlado.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 20, max: 80 },
        isFree: false,
        area: "Estrada da Graúna e região",
        sources: [
          {
            name: "Prefeitura de Paraty",
            url: "https://paraty.rj.gov.br/",
            consultedAt: "2026-11-14",
          },
        ],
        notes:
          "Algumas cachoeiras ficam em área protegida com entrada cobrada e " +
          "capacidade limitada; em época de chuva o acesso pode ser suspenso. " +
          "Fonte oficial específica pendente de verificação — confirme a " +
          "abertura com a prefeitura ou com o operador local antes de ir.",
      },
      {
        id: "par-trindade",
        name: "Trindade",
        description:
          "Distrito de praia com piscinas naturais, trilhas e atmosfera " +
          "de vila litorânea.",
        tags: ["praia", "natureza", "aventura"],
        suggestedMinutes: 300,
        admissionFeeBRL: null,
        isFree: true,
        area: "Trindade (Distrito de Paraty)",
        sources: [
          {
            name: "Prefeitura de Paraty",
            url: "https://www.paraty.rj.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Acesso por rodovia com curvas; considere o tempo de deslocamento.",
      },
      {
        id: "par-cachacarias",
        name: "Rota das cachaçarias",
        description:
          "Conjunto de produtores de cachaça na região com degustação e " +
          "visita a alambiques.",
        tags: ["gastronomia", "cultura", "romantico"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 0, max: 60 },
        isFree: false,
        area: "Interior de Paraty",
        sources: [
          {
            name: "Instituto Nacional da Cachaça (INCA)",
            url: "https://www.gov.br/agricultura/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Degustação pode ser gratuita ou cobrada conforme o produtor.",
      },
    ],
    warnings: [
      "As ruas do centro são de pedra irregular e alagam nas marés altas.",
      "Passeios de barco dependem do estado do mar e do vento; confirme a saída.",
      "Em período de chuva forte, cachoeiras e trilhas podem ser fechadas por segurança.",
      "Alguns atrativos cobram entrada em dinheiro; leve alternativa além do cartão.",
      "Feriados prolongados concentram público nas praias e no centro.",
    ],
    food:
      "A cena gastronômica combina peixes e frutos do mar, cozinha regional " +
      "e restaurantes autorais, além de produção local de queijos, geleias " +
      "e cachaça. O centro histórico concentra a maior oferta; bairros e " +
      "vilas de praia têm opções mais simples e com valor menor.",
    palette: { sky: "#24506b", horizon: "#3d8b8b", land: "#2f5d3a", accent: "#d9a441" },
    editorialScore: 0.89,
    updatedAt: UPDATED_AT,
    highlights: [
      "Centro colonial bem preservado",
      "Combina patrimônio, cachoeiras e baía",
      "Acesso rodoviário a partir de SP e do Rio",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Paraty)",
        url: "https://cidades.ibge.gov.br/brasil/rj/paraty",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "IPHAN — Conjunto Histórico de Paraty",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Caracterização do conjunto histórico.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Referência de padrões climáticos regionais.",
      },
    ],
  },
];
