/**
 * =====================================================================
 * RotaClara — Guias editoriais (Grupo 1)
 * ---------------------------------------------------------------------
 * POLÍTICA EDITORIAL
 *  1. Responde a uma pergunta real de quem vai viajar.
 *  2. Informação útil e específica, sem generalidade vazia.
 *  3. Metodologia explicada sempre que houver cálculo.
 *  4. Fontes verificáveis em `sources`.
 *  5. Data de atualização em `updatedAt`.
 *  6. Nenhuma experiência pessoal, avaliação ou teste inventado.
 * =====================================================================
 */

import type { Guide } from "@/lib/domain/types";

const UPDATED_AT = "2026-11-13";

export const guidesGroupOne: Guide[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "rio-de-janeiro",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "O Rio de Janeiro é o destino urbano de praia mais referenciado do Brasil. " +
            "A cidade ocupa uma faixa entre montanhas e mar, com o Parque Nacional " +
            "da Tijuca — a maior floresta urbana reconhecida como parque nacional — " +
            "dentro da própria malha urbana.",
          "O que distingue o Rio de outras capitais é a combinação de paisagem e " +
            "oferta cultural em distâncias curtas: é possível sair de um museu no " +
            "Centro e estar em uma praia da Zona Sul em poucas dezenas de minutos.",
        ],
        bullets: [
          "Praias urbanas com infraestrutura completa em bairros densos.",
          "Trilhas e mirantes dentro da cidade, sem necessidade de viagem longa.",
          "Agenda cultural permanente: museus, teatros, música e gastronomia.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "É uma escolha adequada para primeira viagem ao Brasil, para quem quer " +
            "combinar praia com cultura, e para grupos com perfis diferentes na " +
            "mesma viagem — há opção para quem prefere trilha, quem prefere praia " +
            "e quem prefere restaurante e museu.",
          "Menos indicado para quem busca silêncio absoluto ou para viagens muito " +
            "curtas sem voo direto: o aproveitamento depende de mobilidade urbana.",
        ],
        bullets: [
          "Bom para: casais, famílias com crianças, grupos de amigos, viajantes de primeira viagem.",
          "Exige: conforto com deslocamento urbano e atenção a pertences em áreas movimentadas.",
          "Menos indicado para: quem procura isolamento ou turismo rural.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "Abril, maio, outubro e novembro concentram temperaturas amenas e menor " +
            "volume de chuva que o verão. Dezembro a fevereiro são os meses mais " +
            "quentes e também os de maior movimento turístico, o que afeta preço " +
            "de hospedagem e fluxo nos atrativos.",
          "O INMET é a referência oficial para boletins de chuva e eventos " +
            "extremos. Em dias de chuva forte, o nível de rios e vias alagadas " +
            "pode mudar rápido — consulte o boletim antes de sair.",
        ],
        bullets: [
          "Primavera e outono: melhor equilíbrio entre clima e movimento.",
          "Verão: mais quente, mais chuva e mais público.",
          "Inverno (junho a agosto): menos chuva, dias mais curtos e mar mais fria.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência editorial é de 4 a 7 dias. Com 4 dias é possível " +
            "cobrir a Zona Sul, o Centro e um mirante. Com 6 ou 7 dias, entra " +
            "uma trilha na Tijuca, o Jardim Botânico e tempo para bairros como " +
            "Santa Teresa e Botafogo sem aperto.",
          "Se a viagem for combinada com Búzios, Paraty ou a Costa Verde, " +
            "acrescente pelo menos 2 dias à base do Rio.",
        ],
        bullets: [
          "4 dias: Zona Sul + Centro + um mirante.",
          "5 a 6 dias: soma Jardim Botânico, Tijuca e Santa Teresa.",
          "7 dias: inclui ritmo tranquilo e um passeio de barco ou excursão.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional do Galeão (GIG) recebe voos domésticos e " +
            "internacionais. O Santos Dumont (SDU) fica no centro e atende voos " +
            "domésticos de curta distância, o que reduz o tempo de deslocamento " +
            "para a Zona Sul.",
          "A partir de São Paulo, o trecho aéreo é um dos mais curtos entre " +
            "capitais brasileiras, com tempo de voo próximo de 1 hora. Também " +
            "há acesso por rodovia a partir de São Paulo e de Minas Gerais.",
        ],
        bullets: [
          "Galeão (GIG): voos internacionais e domésticos de longo percurso.",
          "Santos Dumont (SDU): domésticos de curta distância, centro da cidade.",
          "Rodovias: acesso de carro e ônibus a partir de SP, MG e interior do RJ.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Metrô, VLT, BRT, ônibus e barcas cobrem a cidade. O metrô liga o " +
            "Centro à Zona Sul e à Barra; para praias como Recreio e para " +
            "bairros de morro, é preciso combinar com ônibus ou aplicativo.",
          "Para o Parque Nacional da Tijuca e para o Cristo Redentor, o " +
            "deslocamento não é coberto por transporte público direto: use " +
            "veículo próprio, aplicativo ou tour contratado.",
        ],
        bullets: [
          "Metrô + ônibus: integrados pelo bilhete, custo menor por trajeto.",
          "Aplicativo: mais prático para morros e horários fora de pico.",
          "Barcas: ligação entre Centro e Niterói pelo transporte aquaviário.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "A escolha do bairro define o custo e o tipo de viagem. Copacabana é " +
            "a opção clássica com boa conexão de metrô e variedade de preços. " +
            "Ipanema e Leblon têm perfil mais silencioso e valor diário mais alto.",
          "Botafogo funciona como base prática: tem metrô, gastronomia e acesso " +
            "rápido à Zona Sul, embora a praia seja pequena. O Centro e a Lapa " +
            "ficam perto de museus e da vida noturna, com fluxo desigual à noite.",
        ],
        bullets: [
          "Copacabana: melhor relação entre preço, conveniência e praia.",
          "Ipanema e Leblon: mais silêncio e valor mais alto.",
          "Botafogo: melhor base de mobilidade sem pagar o preço da orla.",
          "Centro e Lapa: cultura e noturno, com atenção à movimentação local.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Trabalhamos com uma faixa de referência diária por pessoa que vai de " +
            "R$ 260 a R$ 720, construída a partir dos níveis de preço usuais do " +
            "destino para hospedagem, alimentação, transporte local e passeios. " +
            "Esse número é uma estimativa de planejamento, não uma cotação.",
          "A faixa não inclui passagem aérea e varia conforme a época: dezembro " +
            "e fevereiro costumam ter maior pressão sobre hospedagem. Use a " +
            "Calculadora de Viagem informando seus próprios valores para " +
            "obter um número ajustado ao seu caso.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 260 a R$ 720 (referência de planejamento).",
          "Atrações cobradas: Pão de Açúcar, Jardim Botânico e Museu do Amanhã têm ingresso.",
          "Atrações gratuitas: praias, Parque da Tijuca e mirantes.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cidade reúne botecos de bairro, casas de feijoada e restaurantes de " +
            "cozinha autoral. Botafogo, Ipanema, Santa Teresa e o Centro " +
            "concentram opções com perfis diferentes.",
          "Quiosques de praia têm cardápio simples, com valores geralmente " +
            "acima dos de bairro. Padarias e casas de alimentação rápida " +
            "reduzem bem o custo do dia.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "Atenção redobrada com objetos de valor em praias, metrô e pontos " +
            "turísticos movimentados. Evite exibir celular e joias em multidão " +
            "e prefira bolsas fechadas.",
          "Em dias de chuva forte, consulte o boletim do INMET e evite trilhas " +
            "na Tijuca. Passeios de barco dependem do estado do mar e podem " +
            "ser cancelados — confirme a saída antes de pagar.",
        ],
        bullets: [
          "Leve calçado confortável: morros e calçadão exigem caminhada.",
          "Confirme ingressos no site oficial antes de ir: valores mudam por período.",
          "Feriados prolongados alteram fluxo, preço e horários.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias são suficientes para o Rio de Janeiro?",
        answer:
          "Nossa referência é de 4 a 7 dias. Com 4 dias cobre-se a Zona Sul e o " +
          "Centro; com 6 ou 7 dias entra a Tijuca, o Jardim Botânico e bairros " +
          "como Santa Teresa sem aperto.",
      },
      {
        question: "Qual a melhor época para visitar o Rio?",
        answer:
          "Março a maio e de setembro a novembro oferecem temperaturas amenas " +
          "e menor chuva que o verão. Dezembro a fevereiro são os meses " +
          "mais quentes e com maior movimento turístico.",
      },
      {
        question: "Dá para fazer a viagem sem carro?",
        answer:
          "Sim, na maior parte da cidade. Metrô, VLT, BRT, ônibus e barcas cobrem " +
          "as principais regiões. Para o Parque da Tijuca e para o Cristo " +
          "Redentor, é necessário veículo próprio, aplicativo ou tour.",
      },
      {
        question: "Os valores de ingresso são garantidos?",
        answer:
          "Não. Os preços de atrações variam por período e podem mudar. Exibimos " +
          "faixas de referência para planejamento e recomendamos confirmar no " +
          "site oficial de cada atração antes da visita.",
      },
      {
        question: "É seguro levar crianças?",
        answer:
          "Sim, com as mesmas precauções de qualquer grande cidade: atenção a " +
          "pertences em áreas movimentadas e supervisão em praias com mar forte. " +
          "Há opções familiares como o Jardim Botânico, o Museu do Amanhã e o " +
          "Parque da Tijuca.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Rio de Janeiro)",
        url: "https://cidades.ibge.gov.br/brasil/rj/rio-de-janeiro",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de turismo nacional.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "sao-paulo",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "São Paulo é o maior centro econômico e cultural do Brasil. Não é " +
            "destino de praia: a proposta é museus, bairros com identidade " +
            "própria, gastronomia de amplo escopo e agenda cultural constante.",
          "A cidade se destaca pela densidade de oferta — há sempre mais opções " +
            "do que cabe em uma viagem curta, o que torna o planejamento por " +
            "bairro a estratégia mais eficiente.",
        ],
        bullets: [
          "Conjunto de museus com acervos de relevância nacional.",
          "Bairros com identidade forte: Liberdade, Pinheiros, Vila Madalena.",
          "Gastronomia que reúne cozinhas regionais e internacionais.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para viajantes que priorizam cultura, gastronomia e vida " +
            "urbana; para viagens curtas de fim de semana; para quem viaja a " +
            "negócios e quer somar lazer; e para famílias em busca de museus " +
            "interativos e parques.",
          "Menos indicado para quem busca praia, trilha de natureza ou silêncio " +
            "rural — a cidade é intensa e com trânsito denso.",
        ],
        bullets: [
          "Bom para: culturais, gastronômicos, famílias, viagens curtas de fim de semana.",
          "Exige: planejamento por bairro e tolerância a trânsito.",
          "Menos indicado para: quem procura praia ou isolamento.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "Março a maio e setembro a novembro trazem temperaturas mais amenas e " +
            "menos chuva intensa. Dezembro a fevereiro é quente e com pancadas " +
            "fortes em algumas tardes, o que pode alterar programação ao ar livre.",
          "Feriados prolongados e eventos na Avenida Paulista concentram público " +
            "e afetam preço de hospedagem — vale considerar isso na escolha das datas.",
        ],
        bullets: [
          "Outono e primavera: melhor equilíbrio de temperatura e chuva.",
          "Verão: quente, chuvoso e com mais movimento.",
          "Inverno: dias mais secos, noites frias e menos chuva.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se a Paulista, " +
            "o MASP, o Ibirapuera e um bairro à escolha. Com 5 dias entram " +
            "Pinacoteca, Liberdade, Vila Madalena e o Mercado Municipal sem aperto.",
          "Para quem vem a negócios e quer somar lazer, 4 dias costumam ser o " +
            "equilíbrio mais comum.",
        ],
        bullets: [
          "3 dias: Paulista + Ibirapuera + um bairro.",
          "4 dias: soma museus do centro e Liberdade.",
          "5 dias: inclui Vila Madalena, mercados e ritmo tranquilo.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional de Guarulhos (GRU) é o principal hub do " +
            "país, com voos domésticos e internacionais. O Congonhas (CGH) " +
            "atende voos domésticos e fica mais perto do centro.",
          "Há trem, metrô, ônibus intermunicipais e rodovias em várias " +
            "direções — o acesso rodoviário é denso para o interior paulista " +
            "e para cidades vizinhas.",
        ],
        bullets: [
          "Guarulhos (GRU): principal hub doméstico e internacional.",
          "Congonhas (CGH): domésticos, mais próximo do centro.",
          "Rodovias: conexões para litoral, interior e estados vizinhos.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Metrô, CPTM, trem, ônibus municipal e aplicativos cobrem a cidade. " +
            "O bilhete único integra metrô e ônibus, o que reduz custo por trajeto.",
          "O trânsito é intenso nos horários de pico: para eventos e shows " +
            "com horário marcado, chegue com folga e evite cruzar a cidade no " +
            "mesmo período.",
        ],
        bullets: [
          "Metrô + CPTM: maior cobertura e previsibilidade de tempo.",
          "Ônibus: integração pelo bilhete único.",
          "Aplicativo: útil para horários fora de pico e bairros sem metrô.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Bela Vista e Consolação ficam no centro expandido, com metrô, " +
            "teatros e vida urbana intensa. Jardins têm perfil residencial " +
            "valorizado, com gastronomia e lojas, e valor diário mais alto.",
          "Pinheiros e Vila Madalena reúnem galerias, cafés e vida noturna, com " +
            "metrô próximo. Vila Olímpia e Itaim são bases corporativas com " +
            "boa conveniência para negócios.",
        ],
        bullets: [
          "Centro expandido: melhor conexão e preço intermediário.",
          "Jardins: conforto e gastronomia, com valor mais alto.",
          "Pinheiros e Vila Madalena: cultura e noturno com metrô.",
          "Vila Olímpia e Itaim: base para negócios e shopping.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 240 a R$ 700, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "A faixa não inclui passagem aérea. Museus têm ingressos que variam " +
            "por instituição e período, com condições de gratuidade em datas " +
            "específicas anunciadas por cada museu.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 240 a R$ 700 (referência de planejamento).",
          "Masp e Pinacoteca têm ingresso cobrado.",
          "Parque Ibirapuera e bairros são de acesso livre.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "Uma das maiores variedades do país: cozinhas regionais brasileiras, " +
            "asiática, italiana, árabe e autoral convivem na mesma cidade.",
          "Pinheiros, Vila Madalena, Liberdade e o Centro concentram opções. " +
            "Mercados e casas de alimentação rápida cobram menos que " +
            "restaurantes de praça nobre.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "O trânsito é o principal fator de organização: planeje deslocamentos " +
            "com antecedência e evite cruzar a cidade no horário de pico.",
          "Alguns pontos do Centro concentram movimento intenso — mantenha " +
            "atenção com pertences. Dias de chuva forte podem causar alagamentos; " +
            "consulte o INMET.",
        ],
        bullets: [
          "Museus fecham em determinados dias: confirme a programação antes.",
          "Reserve ingressos de eventos com antecedência.",
          "Feriados prolongados e eventos na Paulista alteram fluxo e preço.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em São Paulo?",
        answer:
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se a Paulista, o " +
          "Ibirapuera e um bairro; com 5 dias entram museus do centro, Liberdade " +
          "e Vila Madalena.",
      },
      {
        question: "São Paulo é uma boa viagem de fim de semana?",
        answer:
          "Sim. Com 3 dias é possível aproveitar bem, desde que se escolha um " +
          "por dia em vez de tentar cruzar a cidade inteira em cada período.",
      },
      {
        question: "Precisa de carro na cidade?",
        answer:
          "Não para a maior parte dos passeios. Metrô, CPTM e ônibus cobrem as " +
          "principais regiões. Carro ou aplicativo ajudam para bairros sem metrô " +
            "e para horários fora de pico.",
      },
      {
        question: "Os museus são gratuitos?",
        answer:
          "Alguns oferecem entrada gratuita em condições e horários específicos " +
          "divulgados por cada instituição. Outros cobram ingresso. Confirme " +
          "sempre no site oficial antes da visita.",
      },
      {
        question: "Qual a melhor época para ir?",
        answer:
          "Março a maio e setembro a novembro, com temperaturas amenas e menos " +
          "chuva intensa. Dezembro a fevereiro é quente e com pancadas de tarde.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (São Paulo)",
        url: "https://cidades.ibge.gov.br/brasil/sp/sao-paulo",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "Instituto Nacional de Meteorologia (INMET)",
        url: "https://portal.inmet.gov.br/",
        consultedAt: UPDATED_AT,
        supports: "Referência oficial de padrões e boletins climáticos.",
      },
      {
        name: "Ministério do Turismo",
        url: "https://www.gov.br/turismo/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Contexto de turismo nacional.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "salvador",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Salvador foi a primeira capital do Brasil e concentra um dos maiores " +
            "conjuntos de centro histórico do país, com arquitetura colonial, " +
            "igrejas e casas coloridas erguidas sobre morros.",
          "A cidade é referência nacional em cultura afro-brasileira, presente " +
            "na música, na dança, na religião e na gastronomia. A orla urbana e " +
            "a Costa do Cacau ficam a pouca distância, o que permite combinar " +
            "cultura e praia na mesma viagem.",
        ],
        bullets: [
          "Centro histórico com patrimônio reconhecido pelo IPHAN.",
          "Cultura afro-brasileira presente no cotidiano e na agenda.",
          "Praias urbanas e da Costa do Cacau a pouca distância.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para quem prioriza patrimônio, música e gastronomia; para " +
            "famílias com crianças em busca de museus e casa de cultura; e para " +
            "viajantes que querem combinar cidade com praia.",
          "Menos indicado para quem busca trilhas de natureza ou turismo de " +
            "aventura em ambiente selvagem — o foco é cultural e costeiro.",
        ],
        bullets: [
          "Bom para: culturais, famílias, gastronômicos, quem quer cidade + praia.",
          "Exige: conforto com ruas irregulares e calor úmido.",
          "Menos indicado para: aventura em floresta ou trilha longa.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "A estação chuvosa local concentra-se entre abril e julho. Os meses " +
            "secos — de setembro a março — são os mais indicados para passeios " +
            "a céu aberto e praia, com dezembro e janeiro entre os mais quentes.",
          "O verão concentra o maior fluxo turístico e pressiona a hospedagem. " +
            "O carnaval e a Festa de Iemanjá atraem público em datas específicas, " +
            "com programação e logística próprias.",
        ],
        bullets: [
          "Setembro a março: estação seca, melhor para passeios ao ar livre.",
          "Abril a julho: mais chuva, com pancadas frequentes.",
          "Verão e carnaval: maior movimento e pressão sobre hospedagem.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o Pelourinho, " +
            "o Elevador Lacerda e a Barra. Com 5 dias entram a Igreja de São " +
            "Francisco, o Teatro Castro Alves e uma excursão à Praia do Forte.",
          "Se a intenção for a Costa do Cacau, acrescente 1 ou 2 dias à base.",
        ],
        bullets: [
          "3 dias: Pelourinho + Elevador Lacerda + Barra.",
          "4 dias: soma igrejas históricas e Rio Vermelho.",
          "5 dias: inclui Praia do Forte ou Costa do Cacau.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional de Salvador (SSA) recebe voos de todas as " +
            "regiões do Brasil e conexões internacionais. Do aeroporto ao centro " +
            "histórico há táxi, aplicativo e ônibus municipal.",
          "Há acesso rodoviário a partir de outras capitais do Nordeste, com " +
            "viagens longas que demandam planejamento.",
        ],
        bullets: [
          "Salvador (SSA): conexões domésticas e internacionais.",
          "Centro histórico: cerca de 30 a 50 minutos do aeroporto, conforme trânsito.",
          "Rodovias: conexões com o restante do Nordeste.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "Ônibus municipal, metrô em trecho limitado e aplicativos. O Elevador " +
            "Lacerda liga a Cidade Alta (Centro Histórico) à Cidade Baixa " +
            "(Comércio), reduzindo a subida a pé.",
          "Dentro do Pelourinho, o deslocamento é feito a pé, com ruas de pedra " +
            "e ladeiras. Para a Barra e para bairros distantes, use ônibus ou " +
            "aplicativo.",
        ],
        bullets: [
          "Elevador Lacerda: travessia entre Cidade Alta e Cidade Baixa.",
          "Pelourinho: percurso a pé, com ladeiras e escadarias.",
          "Aplicativo e ônibus: para bairros e praias afastadas.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "O Pelourinho coloca você no coração do centro histórico, a pé de " +
            "igrejas e casas de cultura. A Barra e a Ondina ficam na orla, com " +
            "praia e boa infraestrutura de serviços, mas a maior distância do " +
            "centro histórico.",
          "Vitória e Graça são bairros residenciais com atmosfera mais tranquila, " +
            "exigindo carro ou aplicativo para a maioria dos passeios. Itapuã " +
            "tem orla extensa e valor mais acessível, mas fica mais distante.",
        ],
        bullets: [
          "Pelourinho: imersão cultural total, com ruído em noites de evento.",
          "Barra e Ondina: praia e conveniência, com deslocamento para o centro.",
          "Vitória e Graça: calma e gastronomia, com dependência de transporte.",
          "Itapuã: orla extensa e menor valor, com maior distância.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 220 a R$ 620, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Igrejas e casas de cultura podem cobrar ingresso; a entrada do " +
            "Elevador Lacerda é tarifada. Passeios à Praia do Forte e à Costa " +
            "do Cacau têm valor próprio, contratado com operador local.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 220 a R$ 620 (referência de planejamento).",
          "Centro histórico: livre para caminhar; museus e casas com ingresso.",
          "Excursões: valor cobrado à parte do operador local.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cozinha baiana é marcada por pratos de origem africana e indígena: " +
            "moqueca, acarajé, bobó, vatapá e o uso de dendê.",
          "Restaurantes concentram-se no Pelourinho, no Rio Vermelho, em Itapuã " +
            "e no Mercado Modelo. Praias e bairros turísticos cobram mais que " +
            "casas de bairro.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "O centro histórico tem ruas e calçadas irregulares: calçado confortável " +
            "é essencial. Em dias de chuva, as ruas do Pelourinho ficam " +
            "escorregadias e alagam com facilidade.",
          "Acesso à Praia do Forte depende de rodovia — avalie aluguel de veículo " +
            "ou tour. Confirme o funcionamento de igrejas e casas de cultura " +
            "antes da visita: alguns fecham em determinados dias.",
        ],
        bullets: [
          "Calçado confortável para ladeiras e pedra irregular.",
          "Reserve hospedagem com antecedência na temporada de verão.",
          "Confirme horários de igrejas e museus antes de sair.",
          "Verifique o boletim do INMET em dias de chuva forte.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Salvador?",
        answer:
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o Pelourinho, " +
          "o Elevador Lacerda e a Barra; com 5 dias entram igrejas históricas e " +
          "uma excursão à Praia do Forte.",
      },
      {
        question: "Qual a melhor época para visitar Salvador?",
        answer:
          "De setembro a março, durante a estação seca local. Abril a julho " +
          "concentram a chuva. Dezembro e janeiro são os meses mais quentes.",
      },
      {
        question: "Dá para combinar cidade e praia?",
        answer:
          "Sim. Praias urbanas como a Barra e Itapuã ficam na própria cidade, e " +
          "a Praia do Forte está a cerca de 60 km do centro, acessível por " +
          "rodovia com tour ou veículo alugado.",
      },
      {
        question: "Como é o acesso ao Pelourinho?",
        answer:
          "A pé, com ruas de pedra e ladeiras. O Elevador Lacerda liga a Cidade " +
          "Alta à Cidade Baixa, reduzindo a subida a pé para quem vem de baixo.",
      },
      {
        question: "Os valores das atrações são fixos?",
        answer:
          "Não. Ingressos de igrejas, museus e excursões variam por período e " +
          "operador. Exibimos faixas de referência e recomendamos confirmar no " +
          "site oficial ou com o operador antes de pagar.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Salvador)",
        url: "https://cidades.ibge.gov.br/brasil/ba/salvador",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "IPHAN — Patrimônio Histórico",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Caracterização do conjunto histórico do Pelourinho.",
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
    slug: "olinda",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Olinda é um conjunto histórico colonial erguido sobre morros, com " +
            "igrejas, casas de taipa, ateliês e mirantes que abrem vista para " +
            "o Oceano Atlântico e para a orla da Região Metropolitana do " +
            "Recife.",
          "A cidade é referência nacional no carnaval de rua e mantém forte " +
            "tradição de artesanato, música e ofícios. O sítio histórico é " +
            "voltado para pedestres, com ruas íngremes e escadarias.",
        ],
        bullets: [
          "Conjunto histórico colonial em morro, com igrejas e mirantes.",
          "Referência nacional no carnaval de rua.",
          "Tradição viva de artesanato e música.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Indicado para viagens culturais, para casais e para quem quer uma " +
            "base tranquila perto do litoral pernambucano. Também funciona bem " +
            "para famílias com crianças maiores, que toleram escadarias.",
          "Menos indicado para mobilidade reduzida: as ruas são íngremes, com " +
            "escadarias e pedra irregular, e isso limita o acesso a parte dos " +
            "atrativos.",
        ],
        bullets: [
          "Bom para: casais, culturais, famílias com crianças maiores.",
          "Exige: calçado confortável e disposição para ladeiras.",
          "Menos indicado para: mobilidade reduzida sem planejamento prévio.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "O período seco local vai de setembro a março, com dezembro e janeiro " +
            "entre os meses mais quentes. O carnaval concentra o maior fluxo do " +
            "ano e exige planejamento antecipado de hospedagem.",
          "De abril a junho aumenta a chuva, o que pode dificultar o percurso " +
            "nas ladeiras de pedra.",
        ],
        bullets: [
          "Setembro a março: estação seca, melhor para caminhar no sítio histórico.",
          "Carnaval: maior fluxo do ano, hospedagem com muita antecedência.",
          "Abril a junho: mais chuva e ladeiras escorregadias.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 2 a 4 dias. Com 2 dias cobrem-se o Alto da Sé, " +
            "a Rua do Amparo e as igrejas principais. Com 4 dias entram museus, " +
            "a Praia de Olinda e uma visita a Recife.",
          "Se a intenção for combinar com Recife, planeje deslocamento entre as " +
            "duas cidades na programação.",
        ],
        bullets: [
          "2 dias: sítio histórico completo a pé.",
          "3 dias: soma museus e a praia.",
          "4 dias: inclui Recife e ritmo tranquilo.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O ponto de entrada é o Aeroporto Internacional do Recife (REC). " +
            "Olinda fica a cerca de 20 km do aeroporto, com acesso por rodovia, " +
            "táxi, aplicativo ou ônibus com conexão no centro do Recife.",
          "Olinda tem terminais integrados de ônibus no circuito metropolitano " +
            "do Grande Recife. Para conexões para outras capitais, o ponto de " +
            "referência é o terminal rodoviário do Recife.",
        ],
        bullets: [
          "Recife (REC): aeroporto internacional de referência.",
          "Transfer: cerca de 30 a 50 minutos, conforme trânsito.",
          "Rodovias: conexões com o restante do Nordeste.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "O sítio histórico é voltado para pedestres, com ruas íngremes e " +
            "escadarias. Para bairros mais distantes e para Recife, use táxi, " +
            "aplicativo ou ônibus.",
          "Alugar veículo ajuda para praias da região, mas o estacionamento no " +
            "centro histórico é limitado e com poucas vagas.",
        ],
        bullets: [
          "Sítio histórico: a pé, com escadarias e pedra irregular.",
          "Aplicativo e táxi: para bairros e para Recife.",
          "Veículo alugado: útil para praias, com planejamento de estacionamento.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Ficar no sítio histórico garante imersão total e tudo a pé, com " +
            "pousadas em casas coloniais. O trade-off são as escadarias e o " +
            "movimento em noites de evento.",
          "Casa Forte e Casa Amarela, no Recife, são alternativas mais " +
            "silenciosas com boa infraestrutura, exigindo transporte para o " +
            "centro histórico. Praia de Olinda e Janga oferecem orla com valor " +
            "mais acessível, a maior distância do sítio.",
        ],
        bullets: [
          "Sítio histórico: imersão e caminhável, com escadarias.",
          "Casa Forte e Casa Amarela: silêncio e infraestrutura, com transporte.",
          "Praia de Olinda e Janga: orla acessível, com maior distância.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 190 a R$ 540, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "O sítio histórico é de acesso livre; museus e casas de cultura podem " +
            "cobrar ingresso. A tapioca, vendida em barracas e calçadas, é uma " +
            "das opções de alimentação de menor custo.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 190 a R$ 540 (referência de planejamento).",
          "Sítio histórico: acesso livre às ruas e mirantes.",
          "Museus e casas de cultura: ingresso variável.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cozinha pernambucana aparece em restaurantes do sítio histórico e " +
            "em casas de bairro: bolo de rolo, cuscuz, tapioca, peixe frito e " +
            "doces.",
          "Restaurantes dentro do conjunto histórico tendem a cobrar mais que " +
            "as casas fora dele. A tapioca em barraca é opção de baixo custo " +
            "em qualquer horário.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "As ruas do sítio histórico são íngremes, com escadarias e pedra " +
            "irregular. Em dias de chuva, as ladeiras ficam escorregadias — " +
            "avalie isso antes de programar o dia.",
          "O carnaval concentra grande público: hospedagem deve ser reservada " +
            "com muita antecedência. Para Recife, considere o tempo de " +
            "deslocamento na programação.",
        ],
        bullets: [
          "Calçado com boa aderência para ladeiras de pedra.",
          "Reserve hospedagem com muita antecedência para o carnaval.",
          "Confirme horários de museus e casas de cultura antes.",
          "Inclua o tempo de deslocamento para Recife na agenda.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Olinda?",
        answer:
          "Nossa referência é de 2 a 4 dias. Com 2 dias cobre-se o sítio " +
          "histórico a pé; com 4 dias entram museus, a praia e uma visita a Recife.",
      },
      {
        question: "Qual a melhor época para visitar Olinda?",
        answer:
          "De setembro a março, durante a estação seca. Dezembro e janeiro são " +
          "os mais quentes. O carnaval tem o maior fluxo do ano e exige reserva " +
          "antecipada.",
      },
      {
        question: "É difícil andar no centro histórico?",
        answer:
          "As ruas são íngremes, com escadarias e pedra irregular, o que exige " +
          "calçado confortável. Não é indicado para mobilidade reduzida sem " +
          "planejamento prévio.",
      },
      {
        question: "Como chegar a Olinda?",
        answer:
          "Pelo Aeroporto Internacional do Recife, a cerca de 20 km, com acesso " +
          "por rodovia, táxi, aplicativo ou ônibus com conexão no centro do Recife.",
      },
      {
        question: "Dá para combinar com Recife?",
        answer:
          "Sim. As cidades são vizinhas, com deslocamento de poucos minutos. " +
          "Vale incluir esse tempo na programação do dia.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Olinda)",
        url: "https://cidades.ibge.gov.br/brasil/pe/olinda",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "IPHAN — Patrimônio Histórico",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Caracterização do conjunto histórico.",
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
    slug: "paraty",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Paraty preserva um centro histórico colonial com ruas pedregosas e " +
            "casas de fachada branca, cercado por montanhas, cachoeiras e uma " +
            "baía com ilhas.",
          "A cidade combina patrimônio, natureza e uma cena gastronômica com " +
            "cachaçarias no interior. O centro é feito para pedestres — não " +
            "circulam carros dentro do conjunto histórico.",
        ],
        bullets: [
          "Centro colonial bem preservado, sem circulação de veículos.",
          "Cachoeiras, baía com ilhas e vilas de praia próximas.",
          "Produção local de cachaça, queijos e gastronomia.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "É uma escolha bem equilibrada para casais, famílias e viagens de " +
            "média duração. Funciona para quem quer alternar dia de cidade " +
            "histórica com dia de natureza ou praia.",
          "Menos indicado para quem busca vida noturna intensa ou grandes " +
            "centros urbanos: Paraty é tranquila, com ritmo mais lento.",
        ],
        bullets: [
          "Bom para: casais, famílias, viajantes que alternam cidade e natureza.",
          "Exige: transporte para praias e cachoeiras fora do centro.",
          "Menos indicado para: vida noturna intensa ou grande cidade.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "Inverno e primavera (abril a setembro) trazem menos chuva e temperaturas " +
            "amenas, ideais para trilhas e cachoeiras.",
          "O verão é quente e chuvoso, com maior fluxo turístico nas praias. " +
            "Em período de chuva forte, cachoeiras e trilhas podem ser fechadas " +
            "por segurança.",
        ],
        bullets: [
          "Abril a setembro: menos chuva, melhor para trilhas e cachoeiras.",
          "Dezembro a fevereiro: quente, chuvoso e com mais público.",
          "Chuva forte: risco de fechamento de atrativos naturais.",
        ],
      },
      {
        id: "quantos-dias",
        heading: "Quantos dias ficar",
        paragraphs: [
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o centro " +
            "histórico e uma praia. Com 5 dias entram a baía de ilhas, as " +
            "cachoeiras e as cachaçarias do interior.",
          "Se a viagem incluir Ilha Grande ou Angra dos Reis, acrescente dias " +
            "à base de Paraty.",
        ],
        bullets: [
          "3 dias: centro histórico + uma praia.",
          "4 dias: soma baía de ilhas ou cachoeiras.",
          "5 dias: inclui cachaçarias e ritmo tranquilo.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Paraty não tem aeroporto: o acesso é por rodovia. A partir do Rio " +
            "de Janeiro são cerca de 4,5 horas de carro ou ônibus; a partir de " +
            "São Paulo, cerca de 6 horas.",
          "Há terminal rodoviário com conexões regulares. O aeroporto mais " +
            "próximo é o do Rio de Janeiro, com transfer rodoviário.",
        ],
        bullets: [
          "Rio de Janeiro: cerca de 4,5 horas por rodovia.",
          "São Paulo: cerca de 6 horas por rodovia.",
          "Aeroporto de referência: Rio de Janeiro, com transfer terrestre.",
        ],
      },
      {
        id: "como-se-deslocar",
        heading: "Como se deslocar na cidade",
        paragraphs: [
          "O centro histórico é feito para pedestres — ruas são de pedra e não " +
            "circulam carros. Para praias, cachoeiras e cachaçarias do entorno, " +
            "são usados aluguel de veículo, bicicleta, van ou tour contratado.",
          "O passeio pelas ilhas da Baía de Paraty depende de barco contratado com operador local.",
        ],
        bullets: [
          "Centro: a pé, exclusivamente.",
          "Praias e cachoeiras: veículo alugado, bicicleta, van ou tour.",
          "Baía de ilhas: passeio de barco com operador local.",
        ],
      },
      {
        id: "onde-se-hospedar",
        heading: "Onde se hospedar",
        paragraphs: [
          "Ficar no centro histórico coloca tudo a pé, com pousadas em casas " +
            "coloniais. As ruas de pedra são irregulares e alagam nas marés altas.",
          "Praia do Meio e Jabaquara ficam próximas ao centro, com praias " +
            "urbanas. Trindade é um distrito de praia a cerca de 30 km, com " +
            "piscinas naturais, exigindo veículo ou van.",
        ],
        bullets: [
          "Centro histórico: tudo a pé, atmosfera autêntica.",
          "Praia do Meio e Jabaquara: praia próxima ao centro.",
          "Trindade: natureza e praia, com maior distância.",
        ],
      },
      {
        id: "custos",
        heading: "Custos e orçamento",
        paragraphs: [
          "Nossa faixa de referência diária por pessoa vai de R$ 230 a R$ 650, " +
            "construída a partir dos níveis de preço usuais do destino para " +
            "hospedagem, alimentação, transporte local e passeios. É uma " +
            "estimativa de planejamento, não uma cotação.",
          "Passeios de barco, cachoeiras com entrada e degustações têm valor " +
            "próprio, cobrado à parte. Alguns locais aceitam apenas dinheiro.",
        ],
        bullets: [
          "Estimativa diária por pessoa: R$ 230 a R$ 650 (referência de planejamento).",
          "Centro histórico: acesso livre.",
          "Passeios e cachoeiras: valor cobrado à parte.",
        ],
      },
      {
        id: "alimentacao",
        heading: "Alimentação",
        paragraphs: [
          "A cena gastronômica combina peixes e frutos do mar, cozinha regional " +
            "e restaurantes autorais, além de produção local de queijos, geleias " +
            "e cachaça.",
          "O centro histórico concentra a maior oferta; bairros e vilas de praia " +
            "têm opções mais simples e com valor menor.",
        ],
      },
      {
        id: "cuidados",
        heading: "Cuidados e informações importantes",
        paragraphs: [
          "As ruas do centro são de pedra irregular e alagam nas marés altas. " +
            "Passeios de barco dependem do estado do mar e do vento — confirme " +
            "a saída antes de pagar.",
          "Em período de chuva forte, cachoeiras e trilhas podem ser fechadas. " +
            "Alguns atrativos cobram entrada em dinheiro; leve alternativa além " +
            "do cartão.",
        ],
        bullets: [
          "Calçado confortável para pedra irregular.",
          "Leve dinheiro para cachoeiras e pequenos atrativos.",
          "Confirme passeios de barco antes de pagar.",
          "Feriados prolongados concentram público no centro e nas praias.",
        ],
      },
    ],
    faq: [
      {
        question: "Quantos dias ficam em Paraty?",
        answer:
          "Nossa referência é de 3 a 5 dias. Com 3 dias cobrem-se o centro " +
          "histórico e uma praia; com 5 dias entram a baía de ilhas, as " +
          "cachoeiras e as cachaçarias.",
      },
      {
        question: "Como se chega a Paraty?",
        answer:
          "Por rodovia, sem aeroporto próprio: cerca de 4,5 horas do Rio de " +
          "Janeiro e cerca de 6 horas de São Paulo. O aeroporto de referência " +
          "é o do Rio de Janeiro.",
      },
      {
        question: "Qual a melhor época?",
        answer:
          "Abril a setembro, com menos chuva e temperaturas amenas, melhor para " +
          "trilhas e cachoeiras. O verão é quente, chuvoso e com mais público.",
      },
      {
        question: "É possível fazer a viagem sem carro?",
        answer:
          "No centro, sim — tudo é a pé. Para praias, cachoeiras e cachaçarias, " +
          "são usados veículo alugado, bicicleta, van ou tour contratado.",
      },
      {
        question: "Os passeios de barco têm horário fixo?",
        answer:
          "Dependem do estado do mar, do vento e da programação do operador. " +
          "Confirme a saída e as condições antes de pagar.",
      },
    ],
    sources: [
      {
        name: "IBGE — Cidades (Paraty)",
        url: "https://cidades.ibge.gov.br/brasil/rj/paraty",
        consultedAt: UPDATED_AT,
        supports: "Dados administrativos e geográficos.",
      },
      {
        name: "IPHAN — Conjunto Histórico de Paraty",
        url: "https://www.gov.br/iphan/pt-br",
        consultedAt: UPDATED_AT,
        supports: "Caracterização do conjunto histórico.",
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
