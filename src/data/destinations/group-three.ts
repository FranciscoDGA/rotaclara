/**
 * =====================================================================
 * RotaClara — Base de destinos (Grupo 3: Expansão Nacional)
 * =====================================================================
 *
 * Destinos incluídos na expansão v1.1:
 *  - Foz do Iguaçu (PR) — Maravilhas naturais e turismo de fronteira
 *  - Florianópolis (SC) — Ilha com praias, vilas históricas e trilhas
 *  - Fernando de Noronha (PE) — Arquipélago oceânico com preservação rigorosa
 *  - Lençóis Maranhenses (MA) — Dunas e lagoas sazonais no Parque Nacional
 *  - Ouro Preto (MG) — Patrimônio mundial do barroco mineiro e história
 * =====================================================================
 */

import type { Destination } from "@/lib/domain/types";
import { buildClimate } from "@/data/climate";

const COST_METHODOLOGY =
  "Faixa de referência construída para planejamento a partir dos níveis " +
  "de preço usuais do destino (hospedagem, alimentação, transporte local e " +
  "passeios). Não é cotação em tempo real nem valor contratado. Use como " +
  "ordem de grandeza e confirme com provedores antes de reservar.";

const COST_LIMITATION =
  "Não inclui passagens aéreas da cidade de origem, variações sazonais de pico " +
  "nem promoções. Valores em BRL.";

const REFERENCE_DATE = "2026-11-15";
const UPDATED_AT = "2026-11-15";

export const destinationsGroupThree: Destination[] = [
  /* ------------------------------------------------------------------
     1. Foz do Iguaçu (PR)
     ------------------------------------------------------------------ */
  {
    slug: "foz-do-iguacu",
    name: "Foz do Iguaçu",
    state: "Paraná",
    stateUF: "PR",
    region: "Sul",
    country: "Brasil",
    tagline: "Uma das grandes maravilhas naturais do planeta na fronteira trinacional.",
    image: {
      src: "/destinations/foz-do-iguacu.jpg",
      alt: "Quedas majestosas das Cataratas do Iguaçu com arco-íris",
      credit: {
        author: "Victor He",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/foz-do-iguacu",
        license: "Unsplash License",
      },
    },
    intro:
      "Foz do Iguaçu abriga as famosas Cataratas do Iguaçu, conjunto de mais de " +
      "270 saltos de água dentro do Parque Nacional do Iguaçu (Patrimônio Natural " +
      "da Humanidade pela UNESCO). A cidade faz fronteira com a Argentina (Puerto " +
      "Iguazú) e o Paraguai (Ciudad del Este), oferecendo atrações de natureza, " +
      "engenharia monumental (Itaipu Binacional) e rica diversidade cultural.",
    tags: ["natureza", "familia", "aventura", "cultura"],
    bestMonths: [2, 3, 4, 8, 9, 10], // mar, abr, mai, set, out, nov
    bestTimeNotes:
      "Primavera e outono oferecem temperaturas amenas (20°C a 28°C) e vazão de água " +
      "consistente. O verão é bastante quente e chuvoso; o inverno é seco, com noites frias.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 840,
      flightMinutes: 100,
      notes: "Voo direto de São Paulo (GRU/VCP) até o Aeroporto Internacional de Foz do Iguaçu (IGU).",
    },
    cost: {
      minPerDayBRL: 230,
      maxPerDayBRL: 520,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "alta",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      min: [22, 22, 20, 17, 14, 12, 11, 13, 15, 18, 19, 21],
      max: [33, 32, 31, 28, 24, 23, 24, 26, 27, 30, 31, 32],
      rain: [
        "chuvoso", "chuvoso", "intermediario", "intermediario", "intermediario",
        "intermediario", "seco", "intermediario", "intermediario", "chuvoso", "chuvoso", "chuvoso",
      ],
    }),
    howToArrive:
      "Por via aérea via Aeroporto Internacional de Foz do Iguaçu (IGU), localizado a apenas " +
      "12 km do centro e a 3 km da entrada do Parque Nacional. Por via rodoviária, acesso pela BR-277.",
    localTransport:
      "Ônibus urbano liga o Terminal de Transporte Urbano (TTU) ao Aeroporto e ao Parque Nacional " +
      "(linha 120). Aplicativos de transporte e táxis atendem com facilidade. Para cruzar para a " +
      "Argentina, há linhas regulares de ônibus internacional e vans de receptivo.",
    lodgingAreas: [
      {
        name: "Centro",
        profile: "Prático, econômico e perto de comércio e restaurantes",
        pros: "Fácil acesso ao TTU, vasta oferta gastronômica e tarifas mais em conta.",
        cons: "Distante dos atrativos naturais (exige 20 a 30 minutos de deslocamento).",
      },
      {
        name: "Avenida das Cataratas",
        profile: "Resorts e hotéis de lazer com infraestrutura ampla",
        pros: "Localização estratégica entre o aeroporto e o Parque Nacional.",
        cons: "Depende de carro ou transporte para sair à noite até o centro.",
      },
    ],
    attractions: [
      {
        id: "foz-cataratas",
        name: "Cataratas do Iguaçu (Lado Brasileiro)",
        description:
          "Passarela com vista panorâmica frontal para a Garganta do Diabo e os principais saltos " +
          "dentro da unidade de conservação.",
        tags: ["natureza", "familia"],
        suggestedMinutes: 240,
        admissionFeeBRL: { min: 88, max: 97 },
        isFree: false,
        area: "Parque Nacional do Iguaçu — BR-469",
        sources: [
          {
            name: "Parque Nacional do Iguaçu — Urbia Cataratas",
            url: "https://cataratasdoiguacu.com.br",
            consultedAt: "2026-11-15",
          },
        ],
        notes: "Ingresso com horário marcado pelo site oficial.",
      },
      {
        id: "foz-parque-aves",
        name: "Parque das Aves",
        description:
          "Centro de resgate e conservação com viveiros de imersão de aves da Mata Atlântica.",
        tags: ["natureza", "familia"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 80, max: 80 },
        isFree: false,
        area: "Em frente à entrada do Parque Nacional",
        sources: [
          {
            name: "Parque das Aves Oficial",
            url: "https://parquedasaves.com.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
      {
        id: "foz-itaipu",
        name: "Usina Hidrelétrica de Itaipu",
        description:
          "Visitas panorâmicas e técnicas em uma das maiores obras de engenharia do mundo.",
        tags: ["cultura", "familia"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 58, max: 170 },
        isFree: false,
        area: "Av. Tancredo Neves, 6702",
        sources: [
          {
            name: "Turismo Itaipu",
            url: "https://turismoitaipu.com.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
      {
        id: "foz-marco-fronteiras",
        name: "Marco das Três Fronteiras",
        description:
          "Espaço histórico e cultural no encontro dos rios Iguaçu e Paraná, unindo Brasil, Argentina e Paraguai.",
        tags: ["cultura", "romantico"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 48, max: 48 },
        isFree: false,
        area: "Porto Meira",
        sources: [
          {
            name: "Marco das 3 Fronteiras",
            url: "https://marcodastresfronteiras.com.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
    ],
    warnings: [
      "Para cruzar as fronteiras para Argentina e Paraguai é obrigatório portar RG original em bom estado com menos de 10 anos ou Passaporte válido.",
      "Menores de idade precisam de autorização específica de ambos os pais para travessia internacional.",
      "Nos mirantes das cataratas há grande névoa de água — proteja celulares e equipamentos eletrônicos com capas estanques.",
    ],
    food: "Destaque para o churrasco de fronteira, peixes de rio (como o dourado assado) e gastronomia árabe no centro da cidade.",
    palette: {
      sky: "#7bc4c4",
      horizon: "#2e7b75",
      land: "#12423e",
      accent: "#dfb45c",
    },
    editorialScore: 0.95,
    updatedAt: UPDATED_AT,
    sources: [
      {
        name: "Prefeitura Municipal de Foz do Iguaçu — Turismo",
        url: "https://pmfi.pr.gov.br",
        consultedAt: "2026-11-15",
        supports: "Dados municipais e infraestrutura de turismo",
      },
      {
        name: "ICMBio — Parna do Iguaçu",
        url: "https://gov.br/icmbio",
        consultedAt: "2026-11-15",
        supports: "Regras de conservação e limites do parque nacional",
      },
    ],
    highlights: [
      "275 saltos de água no Parque Nacional",
      "Parque das Aves com viveiros imersivos",
      "Visita à monumental Itaipu Binacional",
    ],
  },

  /* ------------------------------------------------------------------
     2. Florianópolis (SC)
     ------------------------------------------------------------------ */
  {
    slug: "florianopolis",
    name: "Florianópolis",
    state: "Santa Catarina",
    stateUF: "SC",
    region: "Sul",
    country: "Brasil",
    tagline: "A Ilha da Magia: praias de todos os estilos, vilas açorianas e natureza preservada.",
    image: {
      src: "/destinations/florianopolis.jpg",
      alt: "Praia e lagoa da Ilha de Santa Catarina em Florianópolis",
      credit: {
        author: "Bailey Zindel",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/florianopolis",
        license: "Unsplash License",
      },
    },
    intro:
      "Capital de Santa Catarina, Florianópolis tem a maior parte de seu território na " +
      "Ilha de Santa Catarina, banhada pelo Oceano Atlântico. Conhecida pela diversidade de suas " +
      "mais de 40 praias (desde enseadas calmas até picos internacionais de surfe), a cidade une " +
      "gastronomia de frutos do mar, herança açoriana, lagoas e uma vibrante vida cultural.",
    tags: ["praia", "natureza", "gastronomia", "cultura", "familia"],
    bestMonths: [11, 0, 1, 2, 3], // dez, jan, fev, mar, abr
    bestTimeNotes:
      "De dezembro a março o clima é perfeito para praia, com mar mais agradável, porém com " +
      "trânsito intenso na alta temporada. Abril e maio têm clima firme e temperaturas agradáveis, " +
      "com ilha muito mais tranquila.",
    recommendedDays: { min: 4, max: 7 },
    referenceFromSaoPaulo: {
      distanceKm: 520,
      flightMinutes: 75,
      notes: "Voo direto de São Paulo (CGH/GRU/VCP) até o Aeroporto Internacional Hercílio Luz (FLN).",
    },
    cost: {
      minPerDayBRL: 250,
      maxPerDayBRL: 620,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "alta",
      limitations: COST_LIMITATION,
    },
    costLevel: "conforto",
    climateByMonth: buildClimate({
      min: [22, 22, 21, 18, 15, 13, 12, 13, 15, 17, 19, 20],
      max: [29, 30, 28, 26, 23, 21, 21, 21, 22, 24, 26, 28],
      rain: [
        "chuvoso", "chuvoso", "intermediario", "intermediario", "intermediario",
        "seco", "seco", "intermediario", "intermediario", "intermediario", "intermediario", "chuvoso",
      ],
    }),
    howToArrive:
      "Pelo Aeroporto Internacional de Florianópolis — Hercílio Luz (FLN), modernizado no sul da ilha. " +
      "Por via rodoviária, acesso pela BR-101 e pela icônica Ponte Pedro Ivo Campos.",
    localTransport:
      "A ilha é extensa (mais de 50 km de norte a sul). Alugar um carro proporciona flexibilidade, " +
      "mas no verão o tráfego nas rodovias SC-401 e SC-405 é lento. Aplicativos atendem bem nas áreas centrais.",
    lodgingAreas: [
      {
        name: "Norte da Ilha (Jurerê, Canasvieiras, Ingleses)",
        profile: "Infraestrutura completa de praia, hotéis e vida noturna",
        pros: "Mar calmo e quente, restaurantes a pé e ampla rede de hospedagens.",
        cons: "Muito movimentado no verão; trânsito carregado para acessar o sul.",
      },
      {
        name: "Lagoa da Conceição",
        profile: "Ponto central e descolado com bares, cafés e natureza",
        pros: "Fácil acesso tanto para as praias do leste (Joaquina, Mole) quanto para o centro.",
        cons: "Trânsito lento nos horários de pico pelo Morro da Lagoa.",
      },
    ],
    attractions: [
      {
        id: "fln-lagoa-conceicao",
        name: "Lagoa da Conceição e Centrinho",
        description:
          "Lagoa cercada de morros, ideal para stand-up paddle, passeios de barco e gastronomia açoriana.",
        tags: ["cultura", "gastronomia", "natureza"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Leste da Ilha",
        sources: [
          {
            name: "Prefeitura de Florianópolis — Turismo",
            url: "https://pmf.sc.gov.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
      {
        id: "fln-dunas-joaquina",
        name: "Dunas e Praia da Joaquina",
        description:
          "Berço tradicional do sandboard no Brasil e praia clássica de surfe com mar aberto límpido.",
        tags: ["natureza", "aventura", "praia"],
        suggestedMinutes: 200,
        admissionFeeBRL: null,
        isFree: true,
        area: "Praia da Joaquina",
        sources: [
          {
            name: "Prefeitura de Florianópolis — Turismo",
            url: "https://pmf.sc.gov.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
      {
        id: "fln-ilha-campeche",
        name: "Ilha do Campeche",
        description:
          "Águas cristalinas caribenhas e sítio arqueológico com inscrições rupestres tombadas pelo IPHAN.",
        tags: ["natureza", "praia"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 120, max: 200 },
        isFree: false,
        area: "Acesso por barco via Praia da Armação ou Campeche",
        sources: [
          {
            name: "IPHAN — Patrimônio Arqueológico da Ilha do Campeche",
            url: "https://gov.br/iphan",
            consultedAt: "2026-11-15",
          },
        ],
        notes: "Visitação diária controlada para proteção ambiental.",
      },
    ],
    warnings: [
      "No verão (dezembro a fevereiro), o trânsito entre regiões da ilha pode quadruplicar o tempo de viagem; planeje os dias por regiões contíguas.",
      "A Ilha do Campeche tem limite diário estrito de visitantes; reserve o transporte com antecedência.",
    ],
    food: "Maior produtora nacional de ostras frescas (especialmente no Ribeirão da Ilha), sequência de camarão e tainha espalmada.",
    palette: {
      sky: "#80c9d6",
      horizon: "#246c85",
      land: "#123d45",
      accent: "#dfb45c",
    },
    editorialScore: 0.94,
    updatedAt: UPDATED_AT,
    sources: [
      {
        name: "Prefeitura Municipal de Florianópolis — Secretaria de Turismo",
        url: "https://pmf.sc.gov.br",
        consultedAt: "2026-11-15",
        supports: "Infraestrutura turística e dados territoriais de Florianópolis",
      },
    ],
    highlights: [
      "Mais de 40 praias com perfis variados",
      "Ostras frescas no Ribeirão da Ilha",
      "Águas caribenhas na Ilha do Campeche",
    ],
  },

  /* ------------------------------------------------------------------
     3. Fernando de Noronha (PE)
     ------------------------------------------------------------------ */
  {
    slug: "fernando-de-noronha",
    name: "Fernando de Noronha",
    state: "Pernambuco",
    stateUF: "PE",
    region: "Nordeste",
    country: "Brasil",
    tagline: "O santuário marinho intocado do Brasil, com as praias mais bem avaliadas do mundo.",
    image: {
      src: "/destinations/fernando-de-noronha.jpg",
      alt: "Águas turquesa da Baía dos Porcos e Morro Dois Irmãos em Noronha",
      credit: {
        author: "Kalen Emsley",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/fernando-de-noronha",
        license: "Unsplash License",
      },
    },
    intro:
      "Arquipélago vulcânico isolado a cerca de 360 km da costa nordestina, Fernando de Noronha " +
      "é um dos mais importantes santuários ecológicos do Atlântico Sul. Suas águas translúcidas " +
      "abrigam golfinhos-rotadores, tartarugas marinhas e recifes de coral preservados. " +
      "O turismo é controlado e sujeito a taxas de preservação que garantem a sustentabilidade.",
    tags: ["natureza", "praia", "aventura", "romantico"],
    bestMonths: [7, 8, 9, 10, 11], // ago, set, out, nov, dez
    bestTimeNotes:
      "De agosto a novembro o mar de dentro fica calmo como uma piscina natural, ideal para mergulho " +
      "com visibilidade de até 50 metros. De dezembro a março entram as ondas para surfe.",
    recommendedDays: { min: 4, max: 7 },
    referenceFromSaoPaulo: {
      distanceKm: 2680,
      flightMinutes: 240,
      notes: "Voos comerciais com escala em Recife (REC) ou Natal (NAT) até o Aeroporto de Noronha (FEN).",
    },
    cost: {
      minPerDayBRL: 550,
      maxPerDayBRL: 1400,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "alta",
      limitations: COST_LIMITATION,
    },
    costLevel: "premium",
    climateByMonth: buildClimate({
      min: [25, 25, 25, 24, 24, 24, 23, 23, 24, 24, 25, 25],
      max: [30, 30, 30, 29, 29, 28, 28, 28, 29, 30, 30, 30],
      rain: [
        "seco", "intermediario", "chuvoso", "chuvoso", "chuvoso",
        "chuvoso", "intermediario", "seco", "seco", "seco", "seco", "seco",
      ],
    }),
    howToArrive:
      "Acesso por avião através do Aeroporto de Fernando de Noronha (FEN), operado por voos a partir " +
      "de Recife (REC).",
    localTransport:
      "A ilha possui apenas uma rodovia federal (BR-367). Há ônibus regular que cruza a ilha, táxis " +
      "com tabela fixa e aluguel de buggies.",
    lodgingAreas: [
      {
        name: "Vila dos Remédios / Floresta Nova",
        profile: "Coração histórico da ilha com restaurantes e serviços a pé",
        pros: "Fácil acesso à Praia do Cachorro, Praia do Meio e centro comercial.",
        cons: "Pousadas mais antigas e disputa concorrida.",
      },
      {
        name: "Boldró e Sueste",
        profile: "Tranquilidade próxima às praias do Parque Nacional",
        pros: "Silencioso, perto do Mirante do Boldró e da Praia do Sueste.",
        cons: "Distante de restaurantes noturnos; exige transporte.",
      },
    ],
    attractions: [
      {
        id: "nor-sancho",
        name: "Baía do Sancho",
        description:
          "Eleita repetidamente uma das melhores praias do mundo, aninhada em falésias com águas transparentes.",
        tags: ["praia", "natureza"],
        suggestedMinutes: 240,
        admissionFeeBRL: null,
        isFree: false,
        area: "Área do Parque Nacional Marinho",
        sources: [
          {
            name: "Parque Nacional Marinho de Fernando de Noronha — ICMBio",
            url: "https://gov.br/icmbio",
            consultedAt: "2026-11-15",
          },
        ],
        notes: "Exige o ingresso do Parque Nacional Marinho.",
      },
      {
        id: "nor-porcos",
        name: "Baía dos Porcos e Morro Dois Irmãos",
        description:
          "Piscina natural de cor esmeralda emoldurada pelo imponente cartão-postal do Morro Dois Irmãos.",
        tags: ["praia", "natureza", "romantico"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Acesso a pé pela Praia da Cacimba do Padre",
        sources: [
          {
            name: "Administração Geral de Fernando de Noronha",
            url: "https://noronha.pe.gov.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
    ],
    warnings: [
      "Taxa de Preservação Ambiental (TPA) obrigatória por dia de permanência, cobrada pelo Governo de Pernambuco (recomenda-se pagar online antes do embarque).",
      "O acesso às praias do Parque Nacional (Sancho, Sueste, Leão) exige ingresso do ICMBio com validade de 10 dias.",
      "Custo geral de alimentação e produtos na ilha é elevado devido ao frete marítimo e aéreo.",
    ],
    food: "Peixes frescos (como peixe na folha de bananeira), frutos do mar e festivais gastronômicos tradicionais da ilha.",
    palette: {
      sky: "#5db4c4",
      horizon: "#12758a",
      land: "#0b3c47",
      accent: "#dfb45c",
    },
    editorialScore: 0.98,
    updatedAt: UPDATED_AT,
    sources: [
      {
        name: "Administração Geral do Distrito Estadual de Fernando de Noronha",
        url: "https://noronha.pe.gov.br",
        consultedAt: "2026-11-15",
        supports: "Regulamentação de entrada e taxas ambientais oficiais (TPA)",
      },
      {
        name: "ICMBio — Parna Marinho de Fernando de Noronha",
        url: "https://gov.br/icmbio",
        consultedAt: "2026-11-15",
        supports: "Limites de visitação e ingresso do Parque Nacional Marinho",
      },
    ],
    highlights: [
      "Baía do Sancho e Baía dos Porcos",
      "Mergulho com tartarugas e golfinhos",
      "Preservação ecológica rigorosa",
    ],
  },

  /* ------------------------------------------------------------------
     4. Lençóis Maranhenses (MA)
     ------------------------------------------------------------------ */
  {
    slug: "lencois-maranhenses",
    name: "Lençóis Maranhenses",
    state: "Maranhão",
    stateUF: "MA",
    region: "Nordeste",
    country: "Brasil",
    tagline: "O deserto de dunas brancas entremeado por milhares de lagoas de água doce cristalina.",
    image: {
      src: "/destinations/lencois-maranhenses.jpg",
      alt: "Dunas de areia branca e lagoas cristalinas dos Lençóis Maranhenses",
      credit: {
        author: "Jeremy Bishop",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/lencois-maranhenses",
        license: "Unsplash License",
      },
    },
    intro:
      "Patrimônio Natural da Humanidade pela UNESCO, o Parque Nacional dos Lençóis " +
      "Maranhenses compreende 155 mil hectares de dunas de areia branca pontilhadas por lagoas " +
      "cristalinas formadas pelas chuvas do primeiro semestre. A principal porta de entrada " +
      "é a cidade de Barreirinhas, além dos povoados de Santo Amaro do Maranhão e Atins.",
    tags: ["natureza", "aventura", "romantico"],
    bestMonths: [5, 6, 7, 8], // jun, jul, ago, set
    bestTimeNotes:
      "As lagoas atingem o volume máximo e cor límpida entre junho e agosto, logo após o fim da estação chuvosa. A partir de outubro as lagoas começam a secar gradativamente.",
    recommendedDays: { min: 3, max: 6 },
    referenceFromSaoPaulo: {
      distanceKm: 2350,
      flightMinutes: 210,
      notes: "Voo até São Luís (SLZ) seguido de traslado rodoviário de aproximadamente 4 horas até Barreirinhas.",
    },
    cost: {
      minPerDayBRL: 280,
      maxPerDayBRL: 680,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "alta",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      min: [24, 24, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24],
      max: [31, 30, 30, 30, 30, 31, 31, 32, 32, 33, 33, 32],
      rain: [
        "intermediario", "chuvoso", "chuvoso", "chuvoso", "chuvoso",
        "intermediario", "seco", "seco", "seco", "seco", "seco", "seco",
      ],
    }),
    howToArrive:
      "Voo comercial até o Aeroporto Internacional de São Luís (SLZ), de onde partem vans, ônibus " +
      "e traslados particulares pela rodovia MA-402 (cerca de 250 km de asfalto).",
    localTransport:
      "A locomoção dentro do parque só é permitida em veículos 4x4 autorizados com motoristas credenciados. " +
      "Pelo Rio Preguiças o transporte é feito em lanchas rápidas (voadeiras).",
    lodgingAreas: [
      {
        name: "Barreirinhas",
        profile: "Maior estrutura hoteleira, restaurantes e agências",
        pros: "Fácil acesso rodoviário, agências de passeios e serviços bancários.",
        cons: "Mais distante das lagoas mais preservadas; travessia de balsa pode ter fila.",
      },
      {
        name: "Atins",
        profile: "Povoado rústico pé na areia na foz do rio com o mar",
        pros: "Clima charmoso, gastronomia requintada e proximidade imediata com as dunas.",
        cons: "Ruas de areia fofa, sem iluminação pública nem asfalto; acesso de barco.",
      },
    ],
    attractions: [
      {
        id: "len-circuito-azul",
        name: "Circuito Lagoa Azul",
        description:
          "Passeio clássico em veículo 4x4 até o conjunto de lagoas Azul, dos Peixes e da Preguiça.",
        tags: ["natureza", "aventura"],
        suggestedMinutes: 240,
        admissionFeeBRL: null,
        isFree: true,
        area: "Parque Nacional dos Lençóis Maranhenses",
        sources: [
          {
            name: "ICMBio — Parna dos Lençóis Maranhenses",
            url: "https://gov.br/icmbio",
            consultedAt: "2026-11-15",
          },
        ],
        notes: "Entrada gratuita no parque; custo refere-se ao veículo 4x4 credenciado.",
      },
      {
        id: "len-rio-preguicas",
        name: "Passeio de Voadeira pelo Rio Preguiças",
        description:
          "Navegação fluvial com paradas nos Pequenos Lençóis (Vassouras), Farol de Mandacaru e praia de Caburé.",
        tags: ["natureza", "familia"],
        suggestedMinutes: 360,
        admissionFeeBRL: { min: 100, max: 150 },
        isFree: false,
        area: "Saída do cais de Barreirinhas",
        sources: [
          {
            name: "Secretaria de Turismo de Barreirinhas",
            url: "https://barreirinhas.ma.gov.br",
            consultedAt: "2026-11-15",
          },
        ],
      },
    ],
    warnings: [
      "Visitar fora da época (de novembro a janeiro) pode significar encontrar as lagoas vazias ou com pouca água.",
      "Proteção solar reforçada (óculos escuros, chapéu preso e protetor) é indispensável contra o reflexo nas dunas brancas.",
    ],
    food: "Camarão da Malásia, arroz de cuxá, peixes grelhados e frutas típicas da Amazônia/Cerrado (como o bacuri e açaí).",
    palette: {
      sky: "#8fd5e6",
      horizon: "#4298ab",
      land: "#e3ded3",
      accent: "#dfb45c",
    },
    editorialScore: 0.96,
    updatedAt: UPDATED_AT,
    sources: [
      {
        name: "ICMBio — Parque Nacional dos Lençóis Maranhenses",
        url: "https://gov.br/icmbio",
        consultedAt: "2026-11-15",
        supports: "Informações sobre delimitação e conservação do parque nacional",
      },
      {
        name: "Prefeitura de Barreirinhas — Turismo",
        url: "https://barreirinhas.ma.gov.br",
        consultedAt: "2026-11-15",
        supports: "Infraestrutura turística e acessos rodoviários/fluviais",
      },
    ],
    highlights: [
      "Lagoas cristalinas entre dunas infinitas",
      "Passeio de barco pelo Rio Preguiças",
      "Pôr do sol no topo das dunas",
    ],
  },

  /* ------------------------------------------------------------------
     5. Ouro Preto (MG)
     ------------------------------------------------------------------ */
  {
    slug: "ouro-preto",
    name: "Ouro Preto",
    state: "Minas Gerais",
    stateUF: "MG",
    region: "Sudeste",
    country: "Brasil",
    tagline: "O ápice do barroco brasileiro, arte colonial e culinária mineira em ladeiras históricas.",
    image: {
      src: "/destinations/ouro-preto.jpg",
      alt: "Igreja barroca colonial e montanhas históricas de Ouro Preto",
      credit: {
        author: "Clayton Malquist",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/ouro-preto",
        license: "Unsplash License",
      },
    },
    intro:
      "Primeira cidade brasileira declarada Patrimônio Cultural da Humanidade pela UNESCO, " +
      "em 1980, Ouro Preto foi o epicentro do ciclo do ouro no século XVIII. Suas ladeiras de pedra " +
      "guardam o maior conjunto arquitetônico colonial preservado do país, com obras-primas de " +
      "Aleijadinho e mestre Ataíde, além de museus da Inconfidência Mineira.",
    tags: ["cultura", "historico", "gastronomia", "romantico"],
    bestMonths: [3, 4, 5, 6, 7, 8], // abr a set (período seco)
    bestTimeNotes:
      "Os meses de abril a setembro são os mais secos e agradáveis para caminhar pelas ladeiras de pedra. O verão (novembro a março) é marcado por chuvas frequentes que deixam o calçamento escorregadio.",
    recommendedDays: { min: 2, max: 4 },
    referenceFromSaoPaulo: {
      distanceKm: 580,
      flightMinutes: 70,
      notes: "Voo até o Aeroporto de Confins (CNF) seguido de traslado rodoviário de cerca de 2h30 até Ouro Preto.",
    },
    cost: {
      minPerDayBRL: 200,
      maxPerDayBRL: 460,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "alta",
      limitations: COST_LIMITATION,
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      min: [17, 17, 16, 14, 12, 10, 10, 11, 13, 15, 16, 17],
      max: [26, 26, 25, 24, 22, 21, 21, 23, 24, 25, 25, 25],
      rain: [
        "chuvoso", "chuvoso", "chuvoso", "intermediario", "seco", "seco",
        "seco", "seco", "intermediario", "intermediario", "chuvoso", "chuvoso",
      ],
    }),
    howToArrive:
      "Voo até Belo Horizonte/Confins (CNF) e ônibus executivo ou carro pela BR-356 (cerca de 100 km " +
      "a partir da capital mineira).",
    localTransport:
      "O centro histórico deve ser explorado prioritariamente a pé. Calçados confortáveis e com boa aderência são fundamentais para as ladeiras de paralelepípedo.",
    lodgingAreas: [
      {
        name: "Centro Histórico / Praça Tiradentes",
        profile: "No centro de tudo, a poucos passos dos principais museus e igrejas",
        pros: "Caminhe para quase todas as atrações sem necessidade de transporte.",
        cons: "Poucas opções com estacionamento próprio; ruído nas noites de fim de semana.",
      },
      {
        name: "Bairro do Rosário e Pilar",
        profile: "Charme colonial com pousadas acolhedoras",
        pros: "Ladeiras mais calmas e opções de casarões históricos preservados.",
        cons: "Algumas ladeiras íngremes para retornar da Praça Tiradentes.",
      },
    ],
    attractions: [
      {
        id: "op-sao-francisco",
        name: "Igreja de São Francisco de Assis",
        description:
          "Obra-prima de Aleijadinho e teto pintado por Mestre Ataíde, expoente máximo do barroco e rococó no Brasil.",
        tags: ["cultura", "historico"],
        suggestedMinutes: 90,
        admissionFeeBRL: { min: 20, max: 20 },
        isFree: false,
        area: "Largo de Coimbra",
        sources: [
          {
            name: "IPHAN — Conjunto Arquitetônico de Ouro Preto",
            url: "https://gov.br/iphan",
            consultedAt: "2026-11-15",
          },
        ],
      },
      {
        id: "op-inconfidencia",
        name: "Museu da Inconfidência",
        description:
          "Instalado na antiga Casa de Câmara e Cadeia, reúne o panteão dos inconfidentes e acervo do século XVIII.",
        tags: ["cultura", "historico"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 10, max: 10 },
        isFree: false,
        area: "Praça Tiradentes",
        sources: [
          {
            name: "Museu da Inconfidência — Ibram",
            url: "https://gov.br/museus",
            consultedAt: "2026-11-15",
          },
        ],
      },
    ],
    warnings: [
      "As ladeiras de pedras pé-de-moleque são escorregadias mesmo secas; use tênis com boa tração e evite calçados com sola de couro ou saltos.",
      "Muitas igrejas e museus fecham para manutenção às segundas-feiras; planeje o roteiro com atenção aos dias de funcionamento.",
    ],
    food: "A autêntica culinária mineira em panelas de pedra-sabão: feijão tropeiro, frango com quiabo, leitão à pururuca e doces de leite artesanais.",
    palette: {
      sky: "#8ba7b8",
      horizon: "#4d6b7d",
      land: "#7a5033",
      accent: "#dfb45c",
    },
    editorialScore: 0.95,
    updatedAt: UPDATED_AT,
    sources: [
      {
        name: "Prefeitura Municipal de Ouro Preto — Turismo",
        url: "https://ouropreto.mg.gov.br",
        consultedAt: "2026-11-15",
        supports: "Informações sobre atrativos históricos e turismo municipal",
      },
      {
        name: "IPHAN — Patrimônio Mundial de Ouro Preto",
        url: "https://gov.br/iphan",
        consultedAt: "2026-11-15",
        supports: "Tombamento e conservação do patrimônio histórico nacional",
      },
    ],
    highlights: [
      "Igreja São Francisco de Assis com obras de Aleijadinho",
      "Museu da Inconfidência na Praça Tiradentes",
      "Passeios por minas históricas de ouro",
    ],
  },
];
