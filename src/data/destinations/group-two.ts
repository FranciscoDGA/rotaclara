/**
 * =====================================================================
 * RotaClara — Base de destinos (Grupo 2: Sul, Centro-Oeste e Norte)
 * =====================================================================
 *
 * Mesmas regras de honestidade do Grupo 1:
 *  - fatos com fonte oficial registrada;
 *  - custos como faixa de referência com metodologia e data;
 *  - nenhum preço, disponibilidade ou avaliação apresentado como real.
 *
 * Fonte: ver `src/data/destinations/group-one.ts` e DATA_SOURCES.md.
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
  "Não inclui passagens aéreas, variações de temporada alta, câmbio ou " +
  "promoções. Valores em BRL, sem conversão de moeda.";

const REFERENCE_DATE = "2026-11-13";
const UPDATED_AT = "2026-11-13";

export const destinationsGroupTwo: Destination[] = [
  {
    slug: "gramado",
    name: "Gramado",
    state: "Rio Grande do Sul",
    stateUF: "RS",
    region: "Sul",
    country: "Brasil",
    tagline: "Serra, clima frio e agenda gastronômica o ano inteiro.",
    image: {
      src: "/destinations/gramado.jpg",
      alt: "Lago Negro e pinheiros na Serra Gaúcha em Gramado",
      credit: {
        author: "Felipe Tofani",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/gramado",
        license: "Unsplash License",
      },
    },
    intro:
      "Gramado é um município de serra na Serra Gaúcha, no Rio Grande do " +
      "Sul, conhecido pelo clima frio, pela arquitetura de inspiração " +
      "europeia e por uma agenda cultural constante, com destaque para o " +
      "Natal Luz. Fica a uma curta viagem do Vale dos Vinhedos — região " +
      "turística e vitivinícola de Bento Gonçalves, Garibaldi e Monte Belo " +
      "do Sul —, que é um passeio entre localidades distintas, não parte " +
      "do município. É uma escolha frequente para viagens românticas, para " +
      "famílias com crianças e para quem quer frio sem sair do Brasil.",
    tags: ["familia", "romantico", "gastronomia", "cultura", "natureza", "cidade"],
    bestMonths: [3, 4, 5, 6, 10, 11],
    bestTimeNotes:
      "O inverno (junho a agosto) é a estação mais fria e a de maior " +
      "movimento, especialmente em julho. Dezembro traz o Natal Luz. " +
      "Outono e primavera têm temperaturas amenas e menos público.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 1100,
      flightMinutes: null,
      notes:
        "Distância rodoviária desde São Paulo (cerca de 1.100 km). Gramado " +
        "não tem aeroporto: voe até Porto Alegre (POA), a cerca de 120 km, " +
        "ou até Caxias do Sul (CXJ), a cerca de 66 km, e faça transfer " +
        "terrestre.",
    },
    cost: {
      minPerDayBRL: 300,
      maxPerDayBRL: 850,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "conforto",
    climateByMonth: buildClimate({
      max: [27, 27, 25, 22, 19, 17, 17, 18, 20, 22, 24, 26],
      min: [16, 16, 15, 12, 9, 7, 7, 8, 10, 12, 14, 15],
      rain: [
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
      ],
    }),
    howToArrive:
      "Não há aeroporto em Gramado. O acesso é por rodovia a partir de " +
      "Porto Alegre, pelo Aeroporto Salgado Filho (POA), com cerca de 2 " +
      "horas de carro ou ônibus. Há terminal rodoviário com conexões de " +
      "outras cidades da serra.",
    localTransport:
      "Ônibus urbanos de linha, aplicativos e aluguel de veículo. Muitos " +
      "pontos turísticos ficam no centro e são percorridos a pé. Para o " +
      "Vale dos Vinhedos e cidades vizinhas, vale alugar veículo ou " +
      "contratar tour.",
    lodgingAreas: [
      {
        name: "Centro / Rua Coberta",
        profile: "Base central com lojas, restaurantes e pontos turísticos a pé.",
        pros: "Conveniência total e boa variedade de serviços.",
        cons: "Preço de hospedagem mais alto e movimento constante.",
      },
      {
        name: "Bairro Planalto / Zona Norte",
        profile: "Área residencial mais silenciosa, perto de hotéis.",
        pros: "Calma relativa e valor inferior ao centro.",
        cons: "Exige transporte para os principais atrativos.",
      },
      {
        name: "Cidades vizinhas (Bento Gonçalves, Garibaldi, Canela)",
        profile:
          "Base alternativa em outra localidade da região, com valor mais " +
          "acessível.",
        pros:
          "Menor custo e acesso às vinícolas do Vale dos Vinhedos, em " +
          "Bento Gonçalves e Garibaldi.",
        cons:
          "São localidades distintas de Gramado: há deslocamento entre " +
          "cidades e convém veículo ou tour. Canela fica na Rota Romântica, " +
          "fora do Vale dos Vinhedos.",
      },
    ],
    attractions: [
      {
        id: "gra-mini-mundo",
        name: "Mini Mundo",
        description:
          "Parque com maquetes em escala reduzida de monumentos brasileiros " +
          "e internacionais, cercadas por jardins.",
        tags: ["familia", "cultura"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 60, max: 140 },
        isFree: false,
        area: "Gramado",
        sources: [
          { name: "Mini Mundo (site oficial)", url: "https://www.minimundo.com.br/", consultedAt: REFERENCE_DATE },
        ],
        notes: "Ingresso cobrado; confirme valores e horários no site oficial.",
      },
      {
        id: "gra-lago-negro",
        name: "Lago Negro",
        description:
          "Lago artificial com parque, trilhas leves e arborização, ponto " +
          "clássico para caminhada tranquila.",
        tags: ["natureza", "familia", "romantico"],
        suggestedMinutes: 120,
        admissionFeeBRL: null,
        isFree: true,
        area: "Gramado",
        sources: [
          {
            name: "Prefeitura de Gramado",
            url: "https://www.gramado.rs.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "gra-rua-coberta",
        name: "Rua Coberta",
        description:
          "Passarela coberta com lojas de artesanato, chocolates, cachaça " +
          "e cafés — ponto de encontro central da cidade.",
        tags: ["cultura", "gastronomia", "familia", "cidade"],
        suggestedMinutes: 120,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro",
        sources: [
          {
            name: "Prefeitura de Gramado",
            url: "https://www.gramado.rs.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "gra-snowland",
        name: "Snowland",
        description:
          "Parque com pista de neve artificial, o primeiro do tipo na América " +
          "Latina, com esportes de inverno em ambiente coberto.",
        tags: ["familia", "aventura"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 100, max: 250 },
        isFree: false,
        area: "Gramado",
        sources: [
          { name: "Snowland (site oficial)", url: "https://www.snowland.com.br/", consultedAt: REFERENCE_DATE },
        ],
        notes: "Ingresso cobrado e sujeito a fila; reserve com antecedência na alta temporada.",
      },
      {
        id: "gra-natal-luz",
        name: "Natal Luz",
        description:
          "Programação natalina de longa duração com desfiles, shows, " +
          "iluminação e atividades para toda a família.",
        tags: ["cultura", "familia", "cidade"],
        suggestedMinutes: 240,
        admissionFeeBRL: { min: 0, max: 200 },
        isFree: false,
        area: "Centro e região",
        sources: [
          {
            name: "Natal Luz Gramado (site oficial)",
            url: "https://www.natalluz.com.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Programação anual com parte gratuita e parte paga. Confirme a " +
          "edição e a programação do ano em questão.",
      },
      {
        id: "gra-vale-dos-vinhedos",
        name: "Vale dos Vinhedos",
        description:
          "Região de produção de vinho e uva com vinícolas abertas " +
          "à visitação, em Bento Gonçalves e entorno.",
        tags: ["gastronomia", "cultura", "natureza", "romantico"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 0, max: 120 },
        isFree: false,
        area: "Bento Gonçalves e região",
        sources: [
          {
            name: "Vale dos Vinhedos (site oficial do destino)",
            url: "https://valedosvinhedos.com.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Degustação pode ser gratuita ou cobrada conforme a vinícola. " +
          "Considere motorista ou tour se houver degustação.",
      },
    ],
    warnings: [
      "No inverno as temperaturas podem chegar perto de zero com umidade " +
        "alta: leve roupa térmica e impermeável.",
      "Em julho e dezembro a demanda por hospedagem é muito maior — " +
        "reserve com bastante antecedência.",
      "Estradas de serra podem ter neblina densa; dirija com atenção e " +
        "verifique as condições antes de sair.",
      "Atrações como Snowland e Mini Mundo cobram ingresso com valores " +
        "que variam por período; confirme antes.",
      "Estacionamento disputado no centro nos dias de maior movimento.",
    ],
    food:
      "A gastronomia da serra gaúcha é marcada por fondue, polenta, " +
      "galeto, churrasco e produções de chocolate e cachaça. Restaurantes " +
      "concentrados no centro e na Rua Coberta cobram valores acima da média " +
      "de outras regiões. Opções de padaria e café são abundantes e com " +
      "menor custo.",
    palette: { sky: "#31506e", horizon: "#5b8aa6", land: "#2d5016", accent: "#c9952f" },
    editorialScore: 0.9,
    updatedAt: UPDATED_AT,
    highlights: [
      "Frio garantido no inverno sem sair do Brasil",
      "Agenda gastronômica e cultural constante",
      "Forte aderência para famílias e casais",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Gramado)",
        url: "https://cidades.ibge.gov.br/brasil/rs/gramado",
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
    slug: "bonito",
    name: "Bonito",
    state: "Mato Grosso do Sul",
    stateUF: "MS",
    region: "Centro-Oeste",
    country: "Brasil",
    tagline: "Água transparente, flutuação e ecoturismo organizado.",
    image: {
      src: "/destinations/bonito.jpg",
      alt: "Águas cristalinas e vida aquática transparente em Bonito",
      credit: {
        author: "David Clode",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/bonito",
        license: "Unsplash License",
      },
    },
    intro:
      "Bonito é referência nacional em ecoturismo, conhecido pelas águas " +
      "transparentes, pelas flutuações em rios de nascente e pelas grutas " +
      "com formações geológicas. A cidade trabalha com sistema de cotas de " +
      "entrada em vários atrativos, o que organiza o fluxo e preserva os " +
      "locais. É uma escolha forte para famílias e para viajantes que " +
      "priorizam natureza.",
    tags: ["natureza", "aventura", "familia", "praia"],
    bestMonths: [3, 4, 5, 6, 7, 8],
    bestTimeNotes:
      "A estação seca local vai de abril a setembro, com menor volume de " +
      "chuva e melhor visibilidade nas águas. Dezembro a março é o período " +
      "mais chuvoso, com risco de alteração no nível dos rios.",
    recommendedDays: { min: 4, max: 6 },
    referenceFromSaoPaulo: {
      distanceKm: 1050,
      flightMinutes: 100,
      notes:
        "Voo até Campo Grande (CGR) com conexão rodoviária de cerca de 3 " +
        "horas até Bonito, ou voo até aeroporto regional quando disponível.",
    },
    cost: {
      minPerDayBRL: 350,
      maxPerDayBRL: 950,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations:
        COST_LIMITATION +
        " Ingressos de flutuação e grutas têm valor próprio, cobrado à parte, " +
        "e variam por atrativo e por operador.",
    },
    costLevel: "conforto",
    climateByMonth: buildClimate({
      max: [32, 32, 32, 31, 30, 30, 30, 32, 33, 33, 32, 32],
      min: [23, 23, 23, 21, 19, 17, 17, 19, 21, 23, 23, 23],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
    }),
    howToArrive:
      "Aeroporto Regional de Bonito (BYO) recebe voos em determinados " +
      "períodos; em outras épocas o acesso é por Campo Grande (CGR) seguido " +
      "de rodovia de aproximadamente 3 horas. Há terminal rodoviário com " +
      "conexões.",
    localTransport:
      "Aluguel de veículo é a alternativa mais prática para os atrativos " +
      "dispersos pela região. Também há transporte fluvial e vans de " +
      "operadores. O centro é pequeno e caminhável.",
    lodgingAreas: [
      {
        name: "Centro de Bonito",
        profile: "Base urbana com pousadas, restaurantes e agências.",
        pros: "Próximo a serviços, agências e estacionamento.",
        cons: "Distância dos atrativos mais afastados.",
      },
      {
        name: "Zona rural / fazendas",
        profile: "Pousadas e hotéis fora da cidade, perto de rios e trilhas.",
        pros: "Contato direto com a natureza e silêncio.",
        cons: "Depende de veículo ou transfer do operador.",
      },
      {
        name: "Baía Bonita e entorno",
        profile: "Área com hotéis e estruturas voltadas ao ecoturismo.",
        pros: "Proximidade com pontos de flutuação.",
        cons: "Menor variedade de serviços urbanos.",
      },
    ],
    attractions: [
      {
        id: "bon-flutuacao",
        name: "Flutuação em rios",
        description:
          "Natação com colete em rios de água cristalina, com visibilidade " +
          "alta e observação de peixes e vegetação submersa.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 240,
        admissionFeeBRL: { min: 120, max: 400 },
        isFree: false,
        area: "Região de Bonito",
        sources: [
          {
            name: "Instituto de Ecoturismo de Bonito (referência regional)",
            url: "https://www.bonito.ms.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Entrada cobrada por atrativo, com capacidade limitada e necessidade " +
          "de reserva prévia. Confirme regras com o operador local.",
      },
      {
        id: "bon-gruta-lago-azul",
        name: "Gruta do Lago Azul",
        description:
          "Gruta com formação de estalactites e um lago de água azul, um " +
          "dos atrativos geológicos mais conhecidos da região.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 60, max: 180 },
        isFree: false,
        area: "Bonito",
        sources: [
          {
            name: "Prefeitura de Bonito",
            url: "https://www.bonito.ms.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Acesso com escadas e trilha; confirme restrições de mobilidade e " +
          "horário com antecedência.",
      },
      {
        id: "bon-buraco-das-araras",
        name: "Buraco das Araras",
        description:
          "Afundamento natural de grande extensão com observação de araras " +
          "vermelhas e trilhas em torno da borda.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 150,
        admissionFeeBRL: { min: 40, max: 120 },
        isFree: false,
        area: "Jardim (região)",
        sources: [
          {
            name: "Prefeitura de Bonito",
            url: "https://www.bonito.ms.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "bon-rio-sucuri",
        name: "Rio Sucuri",
        description:
          "Rio de nascente com flutuação organizada e visitação controlada " +
          "para preservação da água.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 240,
        admissionFeeBRL: { min: 130, max: 380 },
        isFree: false,
        area: "Bonito",
        sources: [
          {
            name: "Prefeitura de Bonito",
            url: "https://www.bonito.ms.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Visitação com número limitado de pessoas por período.",
      },
      {
        id: "bon-buraco-verde",
        name: "Buraco Verde",
        description:
          "Caverna com formação de estalactites e caminhada leve até a " +
          "abertura, com vista para a vegetação.",
        tags: ["natureza", "aventura"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 40, max: 120 },
        isFree: false,
        area: "Bonito",
        sources: [
          {
            name: "Prefeitura de Bonito",
            url: "https://www.bonito.ms.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
    ],
    warnings: [
      "Muitos atrativos funcionam com sistema de cotas: a reserva prévia é " +
        "obrigatória e a vaga não é garantida sem ela.",
      "Não use protetor solar, repelente ou loção antes das flutuações — " +
        "as regras existem para proteger a qualidade da água.",
      "No período chuvoso, rios podem aumentar de nível e algumas atividades " +
        "são suspensas.",
      "Trilhas em grutas têm escadas e piso irregular; avalie a condição " +
        "física antes de ir.",
      "Leve dinheiro suficiente para ingressos: muitos atrativos cobram à " +
        "parte do pacote de hospedagem.",
    ],
    food:
      "A cidade tem boa estrutura gastronômica para o porte: restaurantes " +
      "com cozinha regional, cafés e casas de alimentação simples. Pousadas " +
      "costumam oferecer pensão completa, o que reduz o custo de alimentação. " +
      "Valores no centro tendem a ser menores que nos atrativos.",
    palette: { sky: "#1c5d7a", horizon: "#2fa3a3", land: "#14532d", accent: "#e0a458" },
    editorialScore: 0.91,
    updatedAt: UPDATED_AT,
    highlights: [
      "Águas transparentes com visitação controlada",
      "Sistema de cotas preserva os atrativos",
      "Boa combinação para famílias com crianças",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Bonito)",
        url: "https://cidades.ibge.gov.br/brasil/ms/bonito",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Contexto de ecoturismo nacional.",
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
    slug: "chapada-diamantina",
    name: "Chapada Diamantina",
    state: "Bahia",
    stateUF: "BA",
    region: "Nordeste",
    country: "Brasil",
    tagline: "Cachoeiras altas, cânions e trilhas no planalto baiano.",
    image: {
      src: "/destinations/chapada-diamantina.jpg",
      alt: "Vista panorâmica dos cânions e chapadas ao pôr do sol",
      credit: {
        author: "Austin Schmid",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/chapada-diamantina",
        license: "Unsplash License",
      },
    },
    intro:
      "A Chapada Diamantina é um conjunto de áreas protegidas na Bahia " +
      "conhecido por cachoeiras de grande queda, cânions, grutas e trilhas " +
      "de médio a longo alcance. A base mais usada é a cidade de Lençóis. " +
      "É destino para quem procura natureza e caminhada, com acesso por " +
      "rodovia e esforço físico em alguns percursos.",
    tags: ["natureza", "aventura", "familia"],
    bestMonths: [4, 5, 6, 7, 8],
    bestTimeNotes:
      "O período seco local vai de maio a setembro, com céu mais limpo e " +
      "trilhas com melhor condição. De outubro a abril aumenta a chuva, o " +
      "que pode fechar atrativos e alterar o nível das cachoeiras.",
    recommendedDays: { min: 4, max: 7 },
    referenceFromSaoPaulo: {
      distanceKm: 1360,
      flightMinutes: 160,
      notes:
        "Voo até Salvador (SSA) seguido de conexão rodoviária ou aérea " +
        "regional até Lençóis/Andaraí. Não há aeroporto na cidade-base.",
    },
    cost: {
      minPerDayBRL: 280,
      maxPerDayBRL: 720,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations:
        COST_LIMITATION +
        " Multas de parques e guias locais são cobradas à parte e variam por " +
        "percurso.",
    },
    costLevel: "moderado",
    climateByMonth: buildClimate({
      max: [31, 31, 31, 30, 29, 28, 28, 29, 30, 31, 31, 31],
      min: [20, 20, 20, 19, 17, 16, 15, 16, 18, 19, 20, 20],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
    }),
    howToArrive:
      "Acesso principal por Salvador (SSA), com voo regional para o aeroporto " +
      "de Lençóis em determinados períodos, ou por rodovia de aproximadamente " +
      "6 a 7 horas. Há terminal rodoviário em Lençóis.",
    localTransport:
      "A cidade-base é caminhável, mas os atrativos estão dispersos: aluguel " +
      "de veículo, moto ou tour contratado são as formas usuais de acesso. " +
      "Alguns percursos exigem veículo de tração ou transfer do guia.",
    lodgingAreas: [
      {
        name: "Lençóis (centro)",
        profile: "Cidade-base com pousadas, agências e restaurantes.",
        pros: "Estrutura completa e ponto de partida para os percursos.",
        cons: "Centro movimentado na alta temporada.",
      },
      {
        name: "Andaraí",
        profile: "Cidade menor, mais próxima de cachoeiras do sul da chapada.",
        pros: "Acesso mais curto a vários atrativos.",
        cons: "Estrutura de serviços mais limitada.",
      },
      {
        name: "Pousadas rurais",
        profile: "Estruturas fora das cidades, em meio à natureza.",
        pros: "Silêncio e contato direto com a paisagem.",
        cons: "Depende de veículo para tudo que não estiver no local.",
      },
    ],
    attractions: [
      {
        id: "chap-cachoeira-fumaca",
        name: "Cachoeira da Fumaça",
        description:
          "Cachoeira de grande altura cuja água se dispersa antes de chegar " +
          "ao base, formando aparência de fumaça.",
        tags: ["natureza", "aventura"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 20, max: 80 },
        isFree: false,
        area: "Vale do Capão — Palmeiras/BA",
        sources: [
          {
            name: "ICMBio — Parque Nacional da Chapada Diamantina",
            url: "https://www.gov.br/icmbio/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Trilha com subida e descida em terreno irregular. Entrada do " +
          "parque pode ser cobrada.",
      },
      {
        id: "chap-cachoeira-buracao",
        name: "Cachoeira do Buracão",
        description:
          "Cachoeira com queda de água em piscina natural, acessível por " +
          "trilha de dificuldade moderada.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 300,
        admissionFeeBRL: { min: 20, max: 80 },
        isFree: false,
        area: "Vão do Gavião",
        sources: [
          {
            name: "Prefeitura de Lençóis",
            url: "https://www.lencois.ba.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Acesso condicionado a período e a condições de chuva.",
      },
      {
        id: "chap-poço-azul",
        name: "Poço Azul",
        description:
          "Gruta com piscina de água azul e formação rochosa, visitação com " +
          "horário definido.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 40, max: 120 },
        isFree: false,
        area: "Nova Redenção",
        sources: [
          {
            name: "Poço Azul (site oficial)",
            url: "https://pocoazul.com.br/",
            consultedAt: "2026-11-14",
          },
        ],
        notes: "Visitação com entrada em horários específicos e número limitado de pessoas.",
      },
      {
        id: "chap-vale-do-pati",
        name: "Vale do Pati",
        description:
          "Percurso de trekking de vários dias entre comunidades, com " +
          "paisagens de cânions e vegetação do planalto.",
        tags: ["aventura", "natureza"],
        suggestedMinutes: 2880,
        admissionFeeBRL: { min: 0, max: 150 },
        isFree: false,
        area: "Planalto da Chapada Diamantina",
        sources: [
          {
            name: "Instituto Chico Mendes de Conservação da Biodiversidade (ICMBio)",
            url: "https://www.gov.br/icmbio/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Percursos de múltiplos dias exigem guia, registro no parque e " +
          "planejamento de hospedagem nas comunidades.",
      },
      {
        id: "chap-lencois",
        name: "Lençóis (cidade-base)",
        description:
          "Cidade histórica de mineração com arquitetura preservada, ruas " +
          "de pedra, igrejas e praça central.",
        tags: ["cultura", "historico", "familia", "cidade"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Lençóis",
        sources: [
          {
            name: "IBGE — Cidades (Lençóis)",
            url: "https://cidades.ibge.gov.br/brasil/ba/lencois",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
    ],
    warnings: [
      "Muitos percursos exigem boa condição física e calçado de trilha adequado.",
      "No período chuvoso, trilhas e cachoeiras podem ser fechadas por segurança.",
      "Alguns atrativos exigem guia local credenciado e registro prévio no parque.",
      "Há trechos sem sinal de celular; avise seu trajeto e leve água e alimentação.",
      "A distância entre atrativos exige planejamento diário de deslocamento — " +
        "evite programar pontos muito distantes no mesmo dia.",
    ],
    food:
      "As cidades-base têm restaurantes com cozinha baiana e caseira, além " +
      "de pousadas com pensão. Em trilhas de longa duração, a alimentação " +
      "é levada pelo próprio viajante ou contratada com a comunidade local. " +
      "Valores nas cidades são menores que nos pontos turísticos isolados.",
    palette: { sky: "#2a4f6e", horizon: "#3f8f9e", land: "#6b4f1d", accent: "#e3b23c" },
    editorialScore: 0.87,
    updatedAt: UPDATED_AT,
    highlights: [
      "Cachoeiras de grande altura e cânions",
      "Melhor condição de trilha na estação seca",
      "Base histórica em Lençóis",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Lençóis)",
        url: "https://cidades.ibge.gov.br/brasil/ba/lencois",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos da cidade-base.",
      },
      {
        name: "ICMBio — Unidades de Conservação",
        url: "https://www.gov.br/icmbio/pt-br",
        consultedAt: REFERENCE_DATE,
        supports: "Caracterização de áreas protegidas da chapada.",
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
    slug: "manaus",
    name: "Manaus",
    state: "Amazonas",
    stateUF: "AM",
    region: "Norte",
    country: "Brasil",
    tagline: "Encontro das águas, floresta urbana e teatro histórico.",
    image: {
      src: "/destinations/manaus.jpg",
      alt: "O Teatro Amazonas sob céu iluminado no centro de Manaus",
      credit: {
        author: "Nathalia Segato",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/manaus",
        license: "Unsplash License",
      },
    },
    intro:
      "Manaus é a capital da Amazônia e serve de base para conhecer a floresta " +
      "e o encontro dos rios Solimões e Negro. A cidade combina um centro " +
      "histórico de ciclo da borracha, o Teatro Amazonas e uma agenda de " +
      "excursões fluviais e de floresta. É um destino de longa duração, " +
      "com logística própria.",
    tags: ["natureza", "cultura", "cidade", "aventura", "familia"],
    bestMonths: [5, 6, 7, 8],
    bestTimeNotes:
      "O período de menor chuva local vai de junho a setembro, com níveis " +
      "de água mais estáveis para navegação. Dezembro a maio concentra a " +
      "estação chuvosa, com maior volume de precipitação.",
    recommendedDays: { min: 4, max: 7 },
    referenceFromSaoPaulo: {
      distanceKm: 2700,
      flightMinutes: 250,
      notes:
        "Voo direto a partir de São Paulo e de outras capitais, com tempo " +
        "média próximo de 4 horas. Não há acesso rodoviário a partir do Sudeste.",
    },
    cost: {
      minPerDayBRL: 300,
      maxPerDayBRL: 850,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "baixa",
      limitations:
        COST_LIMITATION +
        " Excursões de barco e hospedagem em barracos têm preço com grande " +
        "variação por operador e por temporada — trate como ordem de grandeza.",
    },
    costLevel: "conforto",
    climateByMonth: buildClimate({
      max: [31, 31, 31, 31, 31, 31, 31, 32, 33, 33, 32, 31],
      min: [24, 24, 24, 24, 24, 23, 23, 24, 25, 25, 24, 24],
      rain: [
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "seco",
        "seco",
        "seco",
        "intermediario",
        "intermediario",
        "chuvoso",
      ],
      sea: [28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 28],
    }),
    howToArrive:
      "Aeroporto Internacional Eduardo Gomes (MAO) recebe voos de todo o " +
      "Brasil e algumas rotas internacionais. Do aeroporto ao centro há " +
      "táxi, aplicativo e ônibus. Não há acesso rodoviário a partir do Sudeste.",
    localTransport:
      "Ônibus urbano, táxi e aplicativo. Para excursões fluviais e a " +
      "floresta, o deslocamento é feito por barco contratado. O centro " +
      "histórico é caminhável em trechos.",
    lodgingAreas: [
      {
        name: "Centro / Praça da Piedade",
        profile: "Perto do Teatro Amazonas e do centro histórico.",
        pros: "Proximidade cultural e caminhável até atrativos.",
        cons: "Área com fluxo intenso e menos opções silenciosas.",
      },
      {
        name: "Ponta Negra",
        profile: "Bairro à beira do rio, com orla, lazer e serviços.",
        pros: "Vista do rio, calçadão e boa infraestrutura.",
        cons: "Distância do centro histórico.",
      },
      {
        name: "Zona Sul / Iranduba",
        profile: "Base mais próxima das excursões fluviais e de floresta.",
        pros: "Acesso mais curto às embarcações.",
        cons: "Estrutura urbana mais limitada.",
      },
    ],
    attractions: [
      {
        id: "man-encontro-das-aguas",
        name: "Encontro das Águas",
        description:
          "Ponto onde os rios Solimões e Negro correm lado a lado com cores " +
          "e temperaturas diferentes antes de se misturarem.",
        tags: ["natureza", "aventura", "familia"],
        suggestedMinutes: 240,
        admissionFeeBRL: { min: 80, max: 350 },
        isFree: false,
        area: "Baixo Rio Solimões",
        sources: [
          {
            name: "Prefeitura de Manaus",
            url: "https://www.manaus.am.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes:
          "Acesso por barco contratado. O valor é do passeio, não de " +
          "disponibilidade em tempo real; confirme com o operador.",
      },
      {
        id: "man-teatro-amazonas",
        name: "Teatro Amazonas",
        description:
          "Teatro histórico do ciclo da borracha, com interior em mármore, " +
          "pintura de céu e abertura em forma de cúpula.",
        tags: ["cultura", "historico", "cidade", "familia"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 0, max: 60 },
        isFree: false,
        area: "Centro",
        sources: [
          {
            name: "Secretaria de Estado da Cultura do Amazonas",
            url: "https://cultura.am.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Visitação guiada e sessões conforme programação; confirme horários.",
      },
      {
        id: "man-museu-do-indio",
        name: "Museu do Índio",
        description:
          "Museu dedicado às culturas indígenas amazônicas, com acervo, " +
          "pesquisa e programação educativa.",
        tags: ["cultura", "familia", "historico"],
        suggestedMinutes: 120,
        admissionFeeBRL: { min: 0, max: 20 },
        isFree: false,
        area: "Centro",
        sources: [
          {
            name: "Arquidiocese de Manaus — Irmãs Salesianas (mantenedoras)",
            url: "https://arquidiocesedemanaus.org.br/2019/04/11/irmas-salesianas-mantem-memoria-cultural-de-indigenas-do-amazonas/",
            consultedAt: "2026-11-14",
          },
        ],
        notes:
          "Mantido pelas Irmãs Salesianas (Filhas de Maria Auxiliadora), " +
          "não pela FUNAI — a FUNAI administra outro Museu do Índio, no Rio " +
          "de Janeiro. Confirme horário de funcionamento com a instituição.",
      },
      {
        id: "man-palacio-rio-negro",
        name: "Palácio Rio Negro",
        description:
          "Antiga sede do governo do Amazonas, com arquitetura histórica " +
          "e praça em frente, ponto de referência do centro.",
        tags: ["cultura", "historico", "cidade"],
        suggestedMinutes: 90,
        admissionFeeBRL: { min: 0, max: 30 },
        isFree: false,
        area: "Centro",
        sources: [
          {
            name: "Governo do Estado do Amazonas",
            url: "https://www.amazonas.am.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "man-bosque-da-ciencia",
        name: "Bosque da Ciência",
        description:
          "Unidade de pesquisa e visitação com trilhas na floresta, " +
          "exposições e observação de fauna em ambiente controlado.",
        tags: ["natureza", "familia", "cultura"],
        suggestedMinutes: 180,
        admissionFeeBRL: { min: 10, max: 40 },
        isFree: false,
        area: "Zona Sul",
        sources: [
          {
            name: "Instituto Nacional de Pesquisas da Amazônia (INPA)",
            url: "https://www.gov.br/inpa/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
        notes: "Entrada cobrada; confirme horário com a instituição.",
      },
    ],
    warnings: [
      "A umidade é alta o ano todo: leve roupa leve, respirável e impermeável.",
      "Em dias de chuva forte, ruas podem alagar e o fluxo de barcos é alterado.",
      "Excursões fluviais dependem de nível de rio, clima e horário de navegação — " +
        "confirme com o operador antes de pagar.",
      "Use repelente adequado para a região e siga as orientações do operador " +
        "em áreas de floresta.",
      "Confirme o funcionamento de museus: alguns fecham em determinados dias da semana.",
    ],
    food:
      "A cozinha amazônica aparece em pratos com peixe de rio, tucupi, " +
      "jambu, açaí e frutos da floresta. Restaurantes concentram-se no " +
      "centro e na Praça da Piedade; bairros residenciais têm opções mais " +
      "simples e com menor custo. Frutas regionais estão em mercados e " +
      "barracas.",
    palette: { sky: "#134e5b", horizon: "#1f7a8c", land: "#14532d", accent: "#e0a458" },
    editorialScore: 0.88,
    updatedAt: UPDATED_AT,
    highlights: [
      "Base para conhecer a floresta amazônica",
      "Centro histórico do ciclo da borracha",
      "Encontro dos rios Solimões e Negro",
    ],
    sources: [
      {
        name: "IBGE — Cidades (Manaus)",
        url: "https://cidades.ibge.gov.br/brasil/am/manaus",
        consultedAt: REFERENCE_DATE,
        supports: "Dados administrativos e geográficos do município.",
      },
      {
        name: "Instituto Nacional de Pesquisas da Amazônia (INPA)",
        url: "https://www.inpa.gov.br/",
        consultedAt: REFERENCE_DATE,
        supports: "Contexto de pesquisa e visitação na floresta.",
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
    slug: "joao-pessoa",
    name: "João Pessoa",
    state: "Paraíba",
    stateUF: "PB",
    region: "Nordeste",
    country: "Brasil",
    tagline: "Ponta do Seixas, coqueiros e orla tranquila no extremo do Brasil.",
    image: {
      src: "/destinations/joao-pessoa.jpg",
      alt: "Praias tropicais de águas calmas e coqueirais da orla de João Pessoa",
      credit: {
        author: "Sean Oulashin",
        source: "Unsplash",
        sourceUrl: "https://unsplash.com/photos/joao-pessoa",
        license: "Unsplash License",
      },
    },
    intro:
      "João Pessoa é a capital da Paraíba e o ponto mais oriental das " +
      "Américas. A cidade tem orla com coqueiros, centros históricos, " +
      "universidades e uma vida cultural ativa. É uma escolha para quem " +
      "procura praia com menor movimento que outras capitais do Nordeste, " +
      "com boa relação entre custo e estrutura.",
    tags: ["praia", "cidade", "cultura", "gastronomia", "familia", "economico"],
    bestMonths: [8, 9, 10, 11, 0, 1, 2],
    bestTimeNotes:
      "A estação seca local vai de setembro a março. Dezembro e janeiro são " +
      "os meses mais quentes e de maior movimento. O período chuvoso se " +
      "concentra de abril a junho.",
    recommendedDays: { min: 3, max: 5 },
    referenceFromSaoPaulo: {
      distanceKm: 2210,
      flightMinutes: 195,
      notes:
        "Voo até João Pessoa (JPA) com voos diretos e conexões a partir de " +
        "grandes centros.",
    },
    cost: {
      minPerDayBRL: 180,
      maxPerDayBRL: 520,
      methodology: COST_METHODOLOGY,
      referenceDate: REFERENCE_DATE,
      confidence: "media",
      limitations: COST_LIMITATION,
    },
    costLevel: "economico",
    climateByMonth: buildClimate({
      max: [32, 32, 32, 31, 30, 29, 29, 30, 31, 32, 32, 32],
      min: [24, 24, 24, 24, 23, 23, 22, 23, 24, 24, 24, 24],
      rain: [
        "intermediario",
        "intermediario",
        "intermediario",
        "chuvoso",
        "chuvoso",
        "chuvoso",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
        "intermediario",
      ],
      sea: [28, 28, 28, 28, 28, 27, 27, 27, 27, 28, 28, 28],
    }),
    howToArrive:
      "Aeroporto Internacional de João Pessoa (JPA) recebe voos domésticos " +
      "de várias regiões. Do aeroporto ao centro e às praias há táxi, " +
      "aplicativo e ônibus urbano.",
    localTransport:
      "Ônibus urbano, táxi e aplicativo. A orla é extensa: para aproveitar " +
      "diferentes praias, vale considerar aluguel de veículo ou bicicleta. " +
      "O centro histórico é caminhável.",
    lodgingAreas: [
      {
        name: "Manaíra e Jacaré",
        profile: "Bairros de orla com praia, calçadão e serviços.",
        pros: "Praia próxima, boa infraestrutura e variedade gastronômica.",
        cons: "Movimento intenso na temporada alta.",
      },
      {
        name: "Centro histórico",
        profile: "Área central com casas coloniais, praças e universidades.",
        pros: "Proximidade cultural e valor mais acessível.",
        cons: "Menor disponibilidade de praia a pé.",
      },
      {
        name: "Cabo Branco",
        profile: "Região de orla valorizada com parques e centros culturais.",
        pros: "Estrutura moderna e espaços de lazer.",
        cons: "Hospedagem com valor mais alto.",
      },
    ],
    attractions: [
      {
        id: "jp-ponta-do-seixas",
        name: "Ponta do Seixas",
        description:
          "Ponto mais oriental das Américas, com mirante, farol e vista para " +
          "o oceano Atlântico.",
        tags: ["natureza", "cidade", "familia"],
        suggestedMinutes: 120,
        admissionFeeBRL: null,
        isFree: true,
        area: "Cabo Branco",
        sources: [
          {
            name: "Prefeitura de João Pessoa",
            url: "https://www.joaopessoa.pb.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "jp-centro-historico",
        name: "Centro histórico",
        description:
          "Conjunto com casas coloniais, igrejas, praças e o Teatro Santa " +
          "Rita, com arquitetura preservada.",
        tags: ["cultura", "historico", "cidade", "familia"],
        suggestedMinutes: 150,
        admissionFeeBRL: null,
        isFree: true,
        area: "Centro",
        sources: [
          {
            name: "IPHAN — Patrimônio Histórico",
            url: "https://www.gov.br/iphan/pt-br",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "jp-praia-de-cabo-branco",
        name: "Praia de Cabo Branco",
        description:
          "Praia urbana com calçadão, coqueiros e centros culturais às margens.",
        tags: ["praia", "familia", "cidade"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Cabo Branco",
        sources: [
          {
            name: "Prefeitura de João Pessoa",
            url: "https://www.joaopessoa.pb.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "jp-manaaira",
        name: "Praia de Manaíra",
        description:
          "Praia com infraestrutura completa, quiosques e boa oferta de " +
          "serviços próximos.",
        tags: ["praia", "familia", "vida_noturna"],
        suggestedMinutes: 180,
        admissionFeeBRL: null,
        isFree: true,
        area: "Manaíra",
        sources: [
          {
            name: "Prefeitura de João Pessoa",
            url: "https://www.joaopessoa.pb.gov.br/",
            consultedAt: REFERENCE_DATE,
          },
        ],
      },
      {
        id: "jp-jose-lins-do-rego",
        name: "Espaço Cultural José Lins do Rego",
        description:
          "Centro de convenções e complexo cultural moderno, com seis " +
          "espaços para exposições, shows, teatro e cinema, além do museu " +
          "de mesmo nome.",
        tags: ["cultura", "familia"],
        suggestedMinutes: 90,
        admissionFeeBRL: { min: 0, max: 20 },
        isFree: false,
        area: "Tambauzinho",
        sources: [
          {
            name: "Fundação Espaço Cultural da Paraíba (Funesc)",
            url: "https://funesc.pb.gov.br/",
            consultedAt: "2026-11-14",
          },
        ],
        notes:
          "Av. Abdias Gomes de Almeida, 800, bairro Tambauzinho. Programação " +
          "variável; confirme horário com a instituição.",
      },
    ],
    warnings: [
      "A orla é extensa: verifique a distância entre a hospedagem e a praia " +
        "que você pretende usar.",
      "No período chuvoso, pancadas de tarde podem alterar a programação ao ar livre.",
      "Em feriados e viradas de ano, a demanda por hospedagem aumenta — reserve antes.",
      "Alguns atrativos culturais fecham em determinados dias da semana.",
      "A maré alta pode reduzir a área de praia em algumas faixas da orla.",
    ],
    food:
      "A cozinha paraibana é marcada por peixe fresco, camarão, tapioca, " +
      "bolo de rolo e doces regionais. Restaurantes concentram-se na orla e " +
      "no centro; bairros residenciais oferecem opções com menor custo. " +
      "Barracas de praia têm cardápio simples e preços acessíveis.",
    palette: { sky: "#1e5a7a", horizon: "#38a3a5", land: "#2f6b3a", accent: "#f0b429" },
    editorialScore: 0.86,
    updatedAt: UPDATED_AT,
    highlights: [
      "Ponto mais oriental das Américas",
      "Praia urbana com menor movimento que capitais vizinhas",
      "Boa relação entre custo e estrutura",
    ],
    sources: [
      {
        name: "IBGE — Cidades (João Pessoa)",
        url: "https://cidades.ibge.gov.br/brasil/pb/joao-pessoa",
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
];
