/**
 * =====================================================================
 * RotaClara — Guias editoriais (Grupo 2)
 * ---------------------------------------------------------------------
 * Mesma política editorial do Grupo 1.
 * Ver `src/data/guides/group-one.ts`.
 * =====================================================================
 */

import type { Guide } from "@/lib/domain/types";

const UPDATED_AT = "2026-11-13";

export const guidesGroupTwo: Guide[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "gramado",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Gramado é um município de serra na Serra Gaúcha, no Rio Grande " +
            "do Sul, conhecido pelo clima frio, pela arquitetura de " +
            "inspiração europeia e por uma agenda cultural constante ao " +
            "longo do ano. Fica a uma curta viagem do Vale dos Vinhedos — " +
            "região vitivinícola de Bento Gonçalves, Garibaldi e Monte Belo " +
            "do Sul —, que é um passeio entre localidades distintas, não " +
            "parte do município.",
          "O destaque nacional é o Natal Luz, programação natalina de longa " +
            "duração. Fora dele, a cidade mantém oferta de museus, parques e " +
            "gastronomia da serra gaúcha.",
        ],
        bullets: [
          "Clima frio garantido no inverno, sem sair do Brasil.",
          "Agenda gastronômica e cultural constante.",
          "Forte aderência para famílias e casais.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "É uma escolha frequente para viagens românticas, para famílias com " +
            "crianças e para quem quer frio sem viajar para o exterior. Também " +
            "funciona bem para grupos que querem uma base com muita estrutura.",
          "Menos indicado para quem busca praia, trilha longa ou ecoturismo em " +
            "ambiente selvagem: o perfil é urbano-serrano.",
        ],
        bullets: [
          "Bom para: casais, famílias, quem quer frio e gastronomia.",
          "Exige: planejamento de hospedagem na alta temporada.",
          "Menos indicado para: praia, trilha longa ou ecoturismo selvagem.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "O inverno (junho a agosto) é a estação mais fria e a de maior " +
            "movimento, especialmente em julho. Dezembro traz o Natal Luz, com " +
            "o maior fluxo do ano.",
          "Outono e primavera têm temperaturas amenas e menos público, o que " +
            "facilita deslocamentos e reserva de hospedagem.",
        ],
        bullets: [
          "Junho a agosto: frio intenso e maior movimento.",
          "Dezembro: Natal Luz e o maior fluxo do ano.",
          "Outono e primavera: amenas e com menos público.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o centro, a " +
            "Rua Coberta e o Lago Negro. Com 5 dias entram o Mini Mundo, o " +
            "Snowland e o Vale dos Vinhedos.",
          "Se o objetivo for o Natal Luz, vale planejar dias extras para a " +
            "programação, que tem várias atrações simultâneas.",
        ],
        bullets: [
          "3 dias: centro + Lago Negro + Rua Coberta.",
          "4 dias: soma Mini Mundo e arredores.",
          "5 dias: inclui Snowland e Vale dos Vinhedos.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Não há aeroporto em Gramado: o acesso é por rodovia. A partir de " +
            "Porto Alegre, pelo Aeroporto Salgado Filho (POA), são cerca de 2 " +
            "horas de carro ou ônibus.",
          "Há terminal rodoviário com conexões de outras cidades da serra, o " +
            "que permite combinar Gramado com cidades vizinhas.",
        ],
        bullets: [
          "Aeroporto de referência: Porto Alegre (POA).",
          "Transfer rodoviário: cerca de 2 horas.",
          "Terminal rodoviário: conexões com a serra gaúcha.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Ônibus urbanos de linha, aplicativos e aluguel de veículo. Muitos " +
            "pontos turísticos ficam no centro e são percorridos a pé.",
          "Para o Vale dos Vinhedos e cidades vizinhas, vale alugar veículo ou " +
            "contratar tour — as distâncias e a curvatura das estradas exigem " +
            "planejamento.",
        ],
        bullets: [
          "Centro: caminhável, com os principais atrativos próximos.",
          "Arredores: veículo alugado ou tour contratado.",
          "Estacionamento: disputado nos dias de maior movimento.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Ficar no centro ou na Rua Coberta garante tudo a pé, com variedade " +
            "de serviços, mas é a opção de maior valor diário.",
          "Bairro Planalto e a zona norte oferecem valor inferior com mais " +
            "calma, exigindo transporte. Cidades vizinhas como Bento " +
            "Gonçalves e Garibaldi são bases alternativas no Vale dos " +
            "Vinhedos — outra localidade, a uma curta viagem de Gramado —, " +
            "com menor custo e acesso às vinícolas. Canela, na Rota " +
            "Romântica, fica fora do vale.",
        ],
        bullets: [
          "Centro e Rua Coberta: conveniência total, maior valor.",
          "Planalto e zona norte: mais calma e menor valor.",
          "Cidades vizinhas: alternativa acessível em outra localidade da região.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 300 a R$ 850, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Gramado tem faixa mais alta que a média das cidades da lista, " +
            "especialmente na alta temporada. Atrações como Mini Mundo e " +
            "Snowland cobram ingresso com valores que variam por período.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 300 a R$ 850 (referência de planejamento).",
          "Mini Mundo, Snowland e Natal Luz: ingresso cobrado.",
          "Lago Negro e Rua Coberta: acesso livre.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A gastronomia da serra gaúcha é marcada por fondue, polenta, " +
            "galeto, churrasco e produções de chocolate e cachaça.",
          "Restaurantes concentrados no centro e na Rua Coberta cobram valores " +
            "acima da média de outras regiões. Padarias e cafés são abundantes " +
            "e com menor custo.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "No inverno as temperaturas podem chegar perto de zero com umidade " +
            "alta: leve roupa térmica e impermeável. Estradas de serra podem " +
            "ter neblina densa — dirija com atenção e verifique as condições " +
            "antes de sair.",
          "Em julho e dezembro a demanda por hospedagem é muito maior: reserve " +
            "com bastante antecedência. Atrações cobram ingresso com valores " +
            "que variam por período; confirme antes.",
        ],
        bullets: [
          "Roupa térmica e impermeável no inverno.",
          "Atenção à neblina nas estradas de serra.",
          "Reserve hospedagem com antecedência em julho e dezembro.",
          "Confirme ingressos e horários das atrações antes de ir.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Gramado?",
        answer:
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o centro, a " +
          "Rua Coberta e o Lago Negro; com 5 dias entram Mini Mundo, Snowland e " +
          "Vale dos Vinhedos.",
      },
      {
        question: "Qual a melhor época para visitar Gramado?",
        answer:
          "Junho a agosto para o frio mais intenso, ou dezembro para o Natal " +
          "Luz. Outono e primavera têm temperaturas amenas e menos público.",
      },
      {
        question: "Precisa de carro na cidade?",
        answer:
          "Não para o centro, que é caminhável. Para o Vale dos Vinhedos e " +
          "cidades vizinhas, vale alugar veículo ou contratar tour.",
      },
      {
        question: "Como se chega a Gramado?",
        answer:
          "Por rodovia a partir de Porto Alegre, cerca de 2 horas. Não há " +
          "aeroporto na cidade: o aeroporto de referência é o Salgado Filho (POA).",
      },
      {
        question: "É uma boa viagem com crianças?",
        answer:
          "Sim. Há atrações familiares como Mini Mundo e Snowland, além de " +
          "parques e cafés. Na alta temporada, reserve com antecedência.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Gramado)",
        url: "https://cidades.ibge.gov.br/brasil/rs/gramado",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de turismo nacional.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "bonito",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Bonito é referência nacional em ecoturismo, conhecida pelas águas " +
            "transparentes, pelas flutuações em rios de nascente e pelas grutas " +
            "com formações geológicas.",
          "A cidade trabalha com sistema de cotas de entrada em vários atrativos, " +
            "o que organiza o fluxo de visitantes e ajuda a preservar os locais. " +
            "É um destino que exige reserva prévia na maioria das atividades.",
        ],
        bullets: [
          "Águas transparentes com visitação controlada.",
          "Sistema de cotas preserva os atrativos.",
          "Boa combinação para famílias com crianças.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "É uma escolha forte para famílias e para viajantes que priorizam " +
            "natureza, com atividades que combinam banho de rio, trilha leve e " +
            "observação geológica.",
          "Menos indicado para quem busca vida urbana, gastronomia fina ou " +
            "vida noturna: a estrutura é voltada ao ecoturismo.",
        ],
        bullets: [
          "Bom para: famílias, natureza, ecoturismo.",
          "Exige: reserva prévia e disposição física para trilhas.",
          "Menos indicado para: vida urbana intensa ou noturna.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "A estação seca local vai de abril a setembro, com menor volume de " +
            "chuva e melhor visibilidade nas águas — período mais indicado para " +
            "flutuações.",
          "Dezembro a março é o período mais chuvoso, com risco de alteração no " +
            "nível dos rios e suspensão de algumas atividades.",
        ],
        bullets: [
          "Abril a setembro: estação seca, melhor para flutuação.",
          "Dezembro a março: chuva e possível suspensão de atividades.",
          "Reserva: necessária na maioria dos atrativos, o ano inteiro.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 4 a 6 dias. Com 4 dias cobrem-se duas " +
            "flutuações, uma gruta e o Buraco das Araras. Com 6 dias entram " +
            "mais atrativos e dias de descanso.",
          "Como a visitação é controlada por cotas, programar menos atrativos " +
            "por dia permite ajustar a agenda sem aperto.",
        ],
        bullets: [
          "4 dias: duas flutuações + uma gruta.",
          "5 dias: soma o Buraco das Araras.",
          "6 dias: inclui mais um atrativo e ritmo tranquilo.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Regional de Bonito (BYO) recebe voos em determinados " +
            "períodos. Em outras épocas, o acesso é por Campo Grande (CGR), " +
            "seguido de rodovia de aproximadamente 3 horas.",
          "Há terminal rodoviário com conexões. Verificar a disponibilidade " +
            "de voo direto para as datas é o primeiro passo do planejamento.",
        ],
        bullets: [
          "Bonito (BYO): voos em determinados períodos.",
          "Campo Grande (CGR): alternativa com rodovia de ~3 horas.",
          "Terminal rodoviário: conexões regionais.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Aluguel de veículo é a alternativa mais prática, pois os atrativos " +
            "ficam dispersos pela região. Também há transporte fluvial e vans " +
            "de operadores.",
          "O centro de Bonito é pequeno e caminhável. Muitas pousadas incluem " +
            "transfer para os atrativos contratados.",
        ],
        bullets: [
          "Veículo alugado: mais autonomia entre atrativos.",
          "Van e transfer do operador: comum nos pacotes de pousada.",
          "Centro: pequeno e caminhável.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "O centro de Bonito tem pousadas, restaurantes e agências, sendo a " +
            "base mais prática para serviços e estacionamento.",
          "Pousadas e hotéis na zona rural ficam mais perto de rios e trilhas, " +
            "com silêncio e contato direto com a natureza, mas dependem de " +
            "veículo ou transfer. A Baía Bonita e o entorno têm estruturas " +
            "voltadas ao ecoturismo, próximas aos pontos de flutuação.",
        ],
        bullets: [
          "Centro: serviços, agências e estacionamento.",
          "Zona rural: natureza e silêncio, com dependência de transporte.",
          "Baía Bonita: proximidade com os pontos de flutuação.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 350 a R$ 950, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Ingressos de flutuação e grutas têm valor próprio, cobrado à parte " +
            "do custo de hospedagem, e variam por atrativo e por operador. " +
            "Considere esse valor separadamente no orçamento.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 350 a R$ 950 (referência de planejamento).",
          "Flutuações e grutas: ingresso cobrado à parte.",
          "Pousadas com pensão: reduzem o custo de alimentação.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cidade tem boa estrutura para o porte: restaurantes com cozinha " +
            "regional, cafés e casas de alimentação simples.",
          "Pousadas costumam oferecer pensão completa, o que reduz o custo de " +
            "alimentação. Valores no centro tendem a ser menores que nos atrativos.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "Muitos atrativos funcionam com sistema de cotas: a reserva prévia é " +
            "obrigatória e a vaga não é garantida sem ela. Organize a agenda " +
            "em torno das reservas confirmadas.",
          "Não use protetor solar, repelente ou loção antes das flutuações — " +
            "as regras existem para proteger a qualidade da água. No período " +
            "chuvoso, rios podem aumentar de nível e algumas atividades são " +
            "suspensas.",
        ],
        bullets: [
          "Reserve com antecedência: as cotas se esgotam.",
          "Não aplique protetor ou repelente antes da flutuação.",
          "Trilhas em grutas têm escadas e piso irregular.",
          "Leve dinheiro para ingressos: muitos cobram à parte da hospedagem.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Bonito?",
        answer:
          "Nossa referência é de 4 a 6 dias. Como a visitação é controlada por " +
          "cotas, programar menos atrativos por dia permite ajustar a agenda " +
          "sem aperto.",
      },
      {
        question: "É preciso reservar com antecedência?",
        answer:
          "Sim. Muitos atrativos funcionam com sistema de cotas, com número " +
          "limitado de pessoas por período. A reserva é obrigatória e a vaga " +
          "não é garantida sem ela.",
      },
      {
        question: "Qual a melhor época para flutuar?",
        answer:
          "De abril a setembro, durante a estação seca, com menor chuva e " +
          "melhor visibilidade na água. De dezembro a março há risco de " +
          "suspensão de atividades.",
      },
      {
        question: "Como se chega a Bonito?",
        answer:
          "Pelo Aeroporto Regional de Bonito (BYO), em determinados períodos, " +
          "ou por Campo Grande (CGR) seguido de rodovia de aproximadamente 3 horas.",
      },
      {
        question: "Posso usar protetor solar antes da flutuação?",
        answer:
          "Não. Regras locais proíbem protetor solar, repelente e loção antes " +
          "das flutuações para proteger a qualidade da água dos rios.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Bonito)",
        url: "https://cidades.ibge.gov.br/brasil/ms/bonito",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de ecoturismo nacional.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "chapada-diamantina",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "A Chapada Diamantina é um conjunto de áreas protegidas na Bahia, " +
            "conhecido por cachoeiras de grande queda, cânions, grutas e trilhas " +
            "de médio a longo alcance.",
          "A base mais usada é a cidade de Lençóis, com arquitetura histórica " +
            "de mineração. É destino para quem procura natureza e caminhada, " +
            "com acesso por rodovia e esforço físico em alguns percursos.",
        ],
        bullets: [
          "Cachoeiras altas, cânions e grutas em áreas protegidas.",
          "Percursos de trekking de vários dias disponíveis.",
          "Base histórica em Lençóis.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para viajantes de natureza e caminhada, com boa condição " +
            "física e disposição para trilhas. Também atende famílias com " +
            "crianças maiores em percursos mais curtos.",
          "Menos indicado para mobilidade reduzida, para quem não gosta de " +
            "trilha ou para viagens curtas: as distâncias entre atrativos exigem " +
            "planejamento diário.",
        ],
        bullets: [
          "Bom para: natureza, caminhada, famílias com crianças maiores.",
          "Exige: condição física, calçado de trilha e planejamento.",
          "Menos indicado para: mobilidade reduzida ou viagens muito curtas.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "O período seco local vai de maio a setembro, com céu mais limpo e " +
            "trilhas em melhor condição — é a época mais indicada.",
          "De outubro a abril aumenta a chuva, o que pode fechar atrativos e " +
            "alterar o nível das cachoeiras. Em chuva forte, acessos são " +
            "suspendidos por segurança.",
        ],
        bullets: [
          "Maio a setembro: estação seca, melhor condição de trilha.",
          "Outubro a abril: chuva com possível fechamento de atrativos.",
          "Chuva forte: suspensão de acessos por segurança.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 4 a 7 dias. Com 4 dias cobrem-se duas " +
            "cachoeiras e a cidade-base. Com 7 dias entram grutas, mais " +
            "cachoeiras e um percurso de trekking.",
          "Para o Vale do Pati, que é de múltiplos dias, é necessário acréscimo " +
            "significativo e registro prévio no parque.",
        ],
        bullets: [
          "4 dias: duas cachoeiras + Lençóis.",
          "5 dias: soma grutas.",
          "7 dias: inclui trekking de longa duração.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O acesso principal é por Salvador (SSA), com voo regional para o " +
            "aeroporto de Lençóis em determinados períodos, ou por rodovia de " +
            "aproximadamente 6 a 7 horas.",
          "Há terminal rodoviário em Lençóis. A disponibilidade de voo regional " +
            "varia conforme a época — vale verificar primeiro.",
        ],
        bullets: [
          "Salvador (SSA): ponto de entrada principal.",
          "Lençóis: voo regional em determinados períodos, ou rodovia de ~6-7h.",
          "Terminal rodoviário: conexões regionais.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na região",
        paragraphs: [
          "A cidade-base é caminhável, mas os atrativos estão dispersos: aluguel " +
            "de veículo, moto ou tour contratado são as formas usuais de acesso.",
          "Alguns percursos exigem veículo de tração ou transfer do guia, " +
            "principalmente em período de chuva. Considere isso ao programar " +
            "os dias.",
        ],
        bullets: [
          "Lençóis: caminhável.",
          "Atrativos: veículo alugado, moto ou tour.",
          "Percursos difíceis: transfer do guia ou veículo de tração.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Lençóis é a cidade-base com pousadas, agências e restaurantes, sendo " +
            "a opção com maior estrutura.",
          "Andaraí é uma cidade menor mais próxima de cachoeiras do sul da " +
            "chapada, com estrutura mais limitada. Pousadas rurais oferecem " +
            "silêncio e contato com a natureza, mas dependem de veículo para " +
            "tudo que não estiver no local.",
        ],
        bullets: [
          "Lençóis: estrutura completa e ponto de partida.",
          "Andaraí: mais próximo de cachoeiras do sul.",
          "Pousadas rurais: natureza e silêncio, com dependência de veículo.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 280 a R$ 720, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Multas de parques e serviços de guia local são cobrados à parte e " +
            "variam por percurso. Em trilhas de longa duração, a hospedagem em " +
            "comunidades é contratada separadamente.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 280 a R$ 720 (referência de planejamento).",
          "Entradas de parque: cobradas à parte, por atrativo.",
          "Guias locais: obrigatórios em determinados percursos.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "As cidades-base têm restaurantes com cozinha baiana e caseira, além " +
            "de pousadas com pensão.",
          "Em trilhas de longa duração, a alimentação é levada pelo próprio " +
            "viajante ou contratada com a comunidade local. Valores nas cidades " +
            "são menores que nos pontos turísticos isolados.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "Muitos percursos exigem boa condição física e calçado de trilha " +
            "adequado. No período chuvoso, trilhas e cachoeiras podem ser " +
            "fechadas por segurança.",
          "Alguns atrativos exigem guia local credenciado e registro prévio " +
            "no parque. Há trechos sem sinal de celular: avise seu trajeto e " +
            "leve água e alimentação.",
        ],
        bullets: [
          "Calçado de trilha e boa condição física.",
          "Registro prévio e guia em determinados percursos.",
          "Sem sinal de celular em vários trechos.",
          "Planeje deslocamentos: os atrativos estão distantes entre si.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam na Chapada Diamantina?",
        answer:
          "Nossa referência é de 4 a 7 dias. Com 4 dias cobrem-se duas " +
          "cachoeiras e a cidade-base; com 7 dias entram grutas e trekking.",
      },
      {
        question: "Qual a melhor época?",
        answer:
          "De maio a setembro, durante a estação seca, com melhor condição de " +
          "trilha e céu mais limpo. De outubro a abril há chuva com possível " +
          "fechamento de atrativos.",
      },
      {
        question: "É preciso contratar guia?",
        answer:
          "Em determinados percursos, sim: alguns atrativos exigem guia local " +
          "credenciado e registro prévio no parque. Confirme as regras de cada " +
          "atração antes de programar.",
      },
      {
        question: "Como se chega a Lençóis?",
        answer:
          "Por Salvador (SSA), com voo regional para Lençóis em determinados " +
          "períodos, ou por rodovia de aproximadamente 6 a 7 horas.",
      },
      {
        question: "Dá para fazer com crianças?",
        answer:
          "Em percursos curtos e com crianças maiores, sim. Os percursos " +
          "exigem condição física e calçado adequado, o que limita atividades " +
          "para crianças pequenas.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Lençóis)",
        url: "https://cidades.ibge.gov.br/brasil/ba/lencois",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos da cidade-base.",
      },
      {
        name: "ICMBio — Unidades de Conservação",
        url: "https://www.gov.br/icmbio/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Caracterização de áreas protegidas.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "manaus",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Manaus é a capital da Amazônia e serve de base para conhecer a " +
            "floresta e o encontro dos rios Solimões e Negro, onde as águas " +
            "correm lado a lado com cores e temperaturas diferentes.",
          "A cidade combina um centro histórico do ciclo da borracha, o Teatro " +
            "Amazonas e uma agenda de excursões fluviais e de floresta. É um " +
            "destino de longa duração, com logística própria.",
        ],
        bullets: [
          "Base para conhecer a floresta amazônica.",
          "Centro histórico do ciclo da borracha.",
          "Encontro dos rios Solimões e Negro.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para viajantes de natureza e cultura, com interesse em " +
            "floresta, rios e história regional. Também atende famílias, com " +
            "excursões adaptadas e museus.",
          "Menos indicado para quem busca praia, vida noturna intensa ou " +
            "viagens muito curtas: a logística de excursões demanda dias.",
        ],
        bullets: [
          "Bom para: natureza, cultura, famílias com planejamento.",
          "Exige: dias suficientes e organização de excursões.",
          "Menos indicado para: praia ou viagens muito curtas.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "O período de menor chuva local vai de junho a setembro, com níveis " +
            "de água mais estáveis para navegação — o mais indicado para " +
            "excursões fluviais.",
          "Dezembro a maio concentra a estação chuvosa, com maior volume de " +
            "precipitação e possível alteração no nível dos rios.",
        ],
        bullets: [
          "Junho a setembro: menor chuva, melhor para navegação.",
          "Dezembro a maio: estação chuvosa.",
          "Umidade alta: o ano inteiro.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 4 a 7 dias. Com 4 dias cobrem-se o centro " +
            "histórico, o Teatro Amazonas e uma excursão fluvial. Com 7 dias " +
            "entram o encontro das águas, a floresta e mais tempo em museus.",
          "Excursões de barco ocupam dias inteiros — não tente concentrar " +
            "várias no mesmo período.",
        ],
        bullets: [
          "4 dias: centro + Teatro Amazonas + uma excursão.",
          "5 dias: soma o encontro das águas.",
          "7 dias: inclui floresta e museus com calma.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional Eduardo Gomes (MAO) recebe voos de todo o " +
            "Brasil e algumas rotas internacionais. Do aeroporto ao centro há " +
            "táxi, aplicativo e ônibus.",
          "Não há acesso rodoviário a partir do Sudeste: o avião é a única " +
            "forma viável de chegar de longe.",
        ],
        bullets: [
          "Manaus (MAO): voos domésticos e internacionais.",
          "Sem rodovia a partir do Sudeste: acesso exclusivamente aéreo.",
          "Aeroporto ao centro: táxi, aplicativo ou ônibus.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Ônibus urbano, táxi e aplicativo. Para excursões fluviais e à " +
            "floresta, o deslocamento é feito por barco contratado.",
          "O centro histórico é caminhável em trechos, mas a cidade é extensa: " +
            "para bairros distantes, use transporte motorizado.",
        ],
        bullets: [
          "Centro: caminhável em trechos.",
          "Cidade: ônibus, táxi e aplicativo.",
          "Excursões: barco contratado com operador local.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Centro e Praça da Piedade ficam perto do Teatro Amazonas e do " +
            "centro histórico, com caminhabilidade até atrativos culturais.",
          "Ponta Negra é um bairro à beira do rio, com orla, calçadão e boa " +
            "infraestrutura, mas a maior distância do centro. Zona Sul e " +
            "Iranduba são bases mais próximas das embarcações, com estrutura " +
            "urbana mais limitada.",
        ],
        bullets: [
          "Centro e Praça da Piedade: proximidade cultural.",
          "Ponta Negra: orla, calçadão e serviços.",
          "Zona Sul e Iranduba: perto das embarcações.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 300 a R$ 850, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Excursões de barco e hospedagem em barracos têm preço com grande " +
            "variação por operador e por temporada — trate como ordem de " +
            "grandeza e confirme com o operador.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 300 a R$ 850 (referência de planejamento).",
          "Excursões: valor próprio, contratado com o operador.",
          "Confiança da estimativa: baixa — maior variação que os demais destinos.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cozinha amazônica aparece em pratos com peixe de rio, tucupi, " +
            "jambu, açaí e frutos da floresta.",
          "Restaurantes concentram-se no centro e na Praça da Piedade; bairros " +
            "residenciais têm opções mais simples e com menor custo. Frutas " +
            "regionais estão em mercados e barracas.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "A umidade é alta o ano todo: leve roupa leve e respirável, com " +
            "impermeável para dias de chuva. Em dias de chuva forte, ruas " +
            "podem alagar e o fluxo de barcos é alterado.",
          "Excursões fluviais dependem de nível de rio, clima e horário de " +
            "navegação — confirme com o operador antes de pagar. Use repelente " +
            "adequado e siga as orientações do operador em áreas de floresta.",
        ],
        bullets: [
          "Roupa leve e impermeável para a umidade.",
          "Confirme excursões com o operador antes de pagar.",
          "Repelente adequado para a região.",
          "Confirme horários de museus: alguns fecham em determinados dias.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Manaus?",
        answer:
          "Nossa referência é de 4 a 7 dias. Com 4 dias cobrem-se o centro, o " +
          "Teatro Amazonas e uma excursão; com 7 dias entram o encontro das " +
          "águas e a floresta.",
      },
      {
        question: "Qual a melhor época para visitar?",
        answer:
          "De junho a setembro, com menor chuva e níveis de água mais estáveis " +
          "para navegação. De dezembro a maio é a estação chuvosa.",
      },
      {
        question: "Como se chega a Manaus?",
        answer:
          "Somente de avião a partir de longe: não há acesso rodoviário a partir " +
          "do Sudeste. O aeroporto é o Eduardo Gomes (MAO).",
      },
      {
        question: "As excursões têm preço fixo?",
        answer:
          "Não. O valor varia por operador e temporada, com grande variação. " +
          "Exibimos faixas de referência e recomendamos confirmar com o " +
          "operador antes de pagar.",
      },
      {
        question: "É possível levar crianças?",
        answer:
          "Sim, com planejamento: há museus e excursões adaptadas. Considere a " +
          "duração das viagens de barco e as condições de umidade e calor.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Manaus)",
        url: "https://cidades.ibge.gov.br/brasil/am/manaus",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Instituto Nacional de Pesquisas da Amazônia (INPA)",
        url: "https://www.gov.br/inpa/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de pesquisa e visitação na floresta.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "joao-pessoa",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "João Pessoa é a capital da Paraíba e o ponto mais oriental das " +
            "Américas, marcado pela Ponta do Seixas. A cidade tem orla com " +
            "coqueiros, centros históricos, universidades e vida cultural ativa.",
          "É uma escolha para quem procura praia com menor movimento que outras " +
            "capitais do Nordeste, com boa relação entre custo e estrutura.",
        ],
        bullets: [
          "Ponto mais oriental das Américas.",
          "Praia urbana com menor movimento que capitais vizinhas.",
          "Boa relação entre custo e estrutura.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para quem quer praia tranquila com estrutura de capital, " +
            "para famílias, para viajantes econômicos e para quem combina " +
            "cultura e orla na mesma viagem.",
          "Menos indicado para quem busca grande movimento noturno ou atrações " +
            "de escala metropolitana.",
        ],
        bullets: [
          "Bom para: famílias, viajantes econômicos, quem busca tranquilidade.",
          "Exige: planejamento da orla, que é extensa.",
          "Menos indicado para: vida noturna intensa ou grande escala urbana.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "A estação seca local vai de setembro a março, com dezembro e janeiro " +
            "entre os meses mais quentes e de maior movimento.",
          "De abril a junho concentra-se a estação chuvosa, com pancadas que " +
            "podem alterar a programação ao ar livre.",
        ],
        bullets: [
          "Setembro a março: estação seca.",
          "Abril a junho: estação chuvosa.",
          "Dezembro e janeiro: mais quentes e com mais público.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se a Ponta do " +
            "Seixas, o centro histórico e uma praia. Com 5 dias entram Cabo " +
            "Branco, Manaíra e um ritmo mais tranquilo.",
          "Se a viagem for combinada com Recife e Olinda, acrescente dias à base.",
        ],
        bullets: [
          "3 dias: Ponta do Seixas + centro + uma praia.",
          "4 dias: soma Cabo Branco e Manaíra.",
          "5 dias: inclui ritmo tranquilo e cultura.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional de João Pessoa (JPA) recebe voos domésticos " +
            "de várias regiões. Do aeroporto ao centro e às praias há táxi, " +
            "aplicativo e ônibus urbano.",
          "Há acesso rodoviário a partir de outras capitais do Nordeste.",
        ],
        bullets: [
          "João Pessoa (JPA): voos domésticos.",
          "Aeroporto ao centro: táxi, aplicativo ou ônibus.",
          "Rodovias: conexões com o Nordeste.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Ônibus urbano, táxi e aplicativo. A orla é extensa: para aproveitar " +
            "diferentes praias, vale considerar aluguel de veículo ou bicicleta.",
          "O centro histórico é caminhável, com praças, igrejas e casas " +
            "coloniais próximas entre si.",
        ],
        bullets: [
          "Centro histórico: caminhável.",
          "Orla: bicicleta ou veículo alugado ajudam pela extensão.",
          "Ônibus, táxi e aplicativo: para bairros.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Manaíra e Jacaré ficam na orla, com praia, calçadão e serviços, " +
            "sendo a escolha mais equilibrada para quem quer praia com " +
            "estrutura.",
          "O centro histórico tem valor mais acessível e proximidade cultural, " +
            "mas menor disponibilidade de praia a pé. Cabo Branco é a região " +
            "mais valorizada, com parques e centros culturais, e valor diário " +
            "mais alto.",
        ],
        bullets: [
          "Manaíra e Jacaré: praia e serviços, equilíbrio geral.",
          "Centro histórico: valor acessível e cultura.",
          "Cabo Branco: estrutura moderna e valor mais alto.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 180 a R$ 520, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "João Pessoa tem uma das faixas mais acessíveis da nossa base. As " +
            "praias são de acesso livre, o que reduz o custo de passeios.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 180 a R$ 520 (referência de planejamento).",
          "Praias e mirantes: acesso livre.",
          "Espaços culturais: ingresso variável, com opções gratuitas.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cozinha paraibana é marcada por peixe fresco, camarão, tapioca, " +
            "bolo de rolo e doces regionais.",
          "Restaurantes concentram-se na orla e no centro; bairros residenciais " +
            "oferecem opções com menor custo. Barracas de praia têm cardápio " +
            "simples e preços acessíveis.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "A orla é extensa: verifique a distância entre a hospedagem e a praia " +
            "que você pretende usar antes de reservar.",
          "No período chuvoso, pancadas de tarde podem alterar a programação ao " +
            "ar livre. A maré alta pode reduzir a área de praia em algumas faixas " +
            "da orla.",
        ],
        bullets: [
          "Confira a distância hospedagem–praia antes de reservar.",
          "Alguns pontos culturais fecham em determinados dias.",
          "Feriados e virada de ano aumentam a demanda por hospedagem.",
          "A maré alta reduz a área de praia em algumas faixas.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em João Pessoa?",
        answer:
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se a Ponta do " +
          "Seixas, o centro histórico e uma praia.",
      },
      {
        question: "Qual a melhor época para visitar?",
        answer:
          "De setembro a março, durante a estação seca. Dezembro e janeiro são " +
          "os mais quentes. De abril a junho é o período mais chuvoso.",
      },
      {
        question: "Como se chega?",
        answer:
          "Pelo Aeroporto Internacional de João Pessoa (JPA), com voos domésticos " +
          "de várias regiões, e por rodovia a partir de outras capitais do Nordeste.",
      },
      {
        question: "É um destino econômico?",
        answer:
          "É um dos mais acessíveis da nossa base, com faixa diária de " +
          "referência de R$ 180 a R$ 520 por pessoa e praias de acesso livre.",
      },
      {
        question: "Dá para combinar com Recife e Olinda?",
        answer:
          "Sim, as cidades ficam na mesma região. Vale planejar o tempo de " +
          "deslocamento entre elas na programação.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (João Pessoa)",
        url: "https://cidades.ibge.gov.br/brasil/pb/joao-pessoa",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de turismo nacional.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
    ],
  },
];
