/**
 * =====================================================================
 * RotaClara — Guias editoriais (Grupo 3: Expansão Nacional)
 * ---------------------------------------------------------------------
 * Guias detalhados com informações práticas, dados de transporte,
 * sazonalidade, custos e fontes primárias verificáveis.
 * =====================================================================
 */

import type { Guide } from "@/lib/domain/types";

const UPDATED_AT = "2026-11-15";

export const guidesGroupThree: Guide[] = [
  /* ------------------------------------------------------------------
     1. Foz do Iguaçu (PR)
     ------------------------------------------------------------------ */
  {
    slug: "foz-do-iguacu",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Foz do Iguaçu é um dos destinos de ecoturismo mais visitados da América do Sul. " +
            "A grande atração são as Cataratas do Iguaçu, compartilhadas entre o Brasil e a " +
            "Argentina em dois parques nacionais contíguos que protegem remanescentes vitais da Mata Atlântica.",
          "Além do espetáculo das águas, a cidade é um polo geopolítico e multicultural singular, " +
            "marcado pela Usina Hidrelétrica de Itaipu e pela convivência fronteiriça pacífica de mais de 70 etnias.",
        ],
        bullets: [
          "Visão panorâmica monumental das Cataratas do Iguaçu no lado brasileiro.",
          "Parque das Aves focado em resgate e preservação de espécies da Mata Atlântica.",
          "Fronteira com Puerto Iguazú (Argentina) e Ciudad del Este (Paraguai).",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Destino muito democrático: funciona perfeitamente para famílias com crianças (passarelas seguras " +
            "e fáceis no lado brasileiro), casais que buscam contato com a natureza e viajantes de todas as idades.",
          "Menos recomendado para quem busca praia de mar ou vida noturna metropolitana agitada.",
        ],
        bullets: [
          "Excelente para: famílias, ecoturistas, fotógrafos e casais.",
          "Acessibilidade: passarelas e ônibus internos do parque adaptados para cadeirantes.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "Pode ser visitado o ano inteiro. Na primavera e outono (março a maio e setembro a novembro), " +
            "as temperaturas são mais agradáveis para caminhar. No verão, o volume d'água costuma ser maior, " +
            "mas as temperaturas passam dos 33°C com umidade alta.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "O Aeroporto Internacional de Foz do Iguaçu (IGU) recebe voos diretos diários das principais capitais " +
            "brasileiras. Está localizado a apenas 12 km do centro da cidade e muito próximo aos parques.",
        ],
      },
      {
        id: "como-circular",
        heading: "Como circular",
        paragraphs: [
          "O transporte público atende bem os principais atrativos pela linha 120 de ônibus. Táxis e carros " +
            "por aplicativo operam normalmente. Para travessia de fronteira, recomenda-se vans de receptivo ou ônibus internacional.",
        ],
      },
      {
        id: "principais-atracoes",
        heading: "Principais atrações",
        paragraphs: [
          "Dedique pelo menos um turno inteiro ao Parque Nacional do Iguaçu (lado brasileiro) e combine com o Parque das Aves, " +
            "que fica vizinho à entrada. Reserve outro período para a Usina de Itaipu e termine o dia no Marco das Três Fronteiras.",
        ],
      },
      {
        id: "tempo-recomendado",
        heading: "Tempo recomendado",
        paragraphs: [
          "Recomendamos de 3 a 5 dias. Com 3 dias você conhece os pontos fundamentais do lado brasileiro. " +
            "Com 4 ou 5 dias é possível incluir o lado argentino das Cataratas e passeios adicionais com calma.",
        ],
      },
      {
        id: "custos-e-limitacoes",
        heading: "Custos e limitações da estimativa",
        paragraphs: [
          "A faixa diária de referência situa-se entre R$ 230 e R$ 520 por pessoa (hospedagem intermediária, " +
            "ingressos oficiais dos parques e refeições). Não inclui compras no exterior nem passagens aéreas.",
        ],
      },
      {
        id: "cuidados-e-pratica",
        heading: "Cuidados práticos e documentação",
        paragraphs: [
          "RG com menos de 10 anos de emissão ou Passaporte é documento obrigatório para cruzar para a Argentina e Paraguai. " +
            "CNH não é aceita para cruzar a aduana argentina além da faixa primária da fronteira.",
        ],
      },
      {
        id: "fontes",
        heading: "Fontes consultadas",
        paragraphs: [
          "Parque Nacional do Iguaçu (cataratasdoiguacu.com.br), Turismo Itaipu (turismoitaipu.com.br) e ICMBio.",
        ],
      },
    ],
    faq: [
      {
        question: "Dá para visitar o lado argentino das Cataratas?",
        answer:
          "Sim, a travessia é simples pela Ponte Tancredo Neves. Exige documento de identidade (RG ou Passaporte) e meio período a um dia inteiro dedicado ao Parque Nacional Iguazú da Argentina.",
      },
      {
        question: "As Cataratas são acessíveis para pessoas com mobilidade reduzida?",
        answer:
          "Sim, o lado brasileiro conta com ônibus panorâmicos acessíveis, elevador panorâmico e passarelas largas e bem niveladas em grande extensão.",
      },
    ],
    sources: [
      {
        name: "Prefeitura de Foz do Iguaçu — Turismo",
        url: "https://pmfi.pr.gov.br",
        consultedAt: UPDATED_AT,
        supports: "Informações turísticas e infraestrutura municipal.",
      },
      {
        name: "ICMBio — Parque Nacional do Iguaçu",
        url: "https://gov.br/icmbio",
        consultedAt: UPDATED_AT,
        supports: "Regras de visitação e preservação das Cataratas.",
      },
    ],
  },

  /* ------------------------------------------------------------------
     2. Florianópolis (SC)
     ------------------------------------------------------------------ */
  {
    slug: "florianopolis",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Florianópolis destaca-se pela combinação rara de infraestrutura urbana de capital e dezenas de " +
            "praias preservadas distribuídas ao longo de mais de 50 km de ilha costeira.",
          "Cada canto da ilha possui identidade própria: o norte é marcado por águas calmas e vilas estruturadas; " +
            "o leste reúne lagoas e praias de ondas fortes; o sul preserva vilarejos tradicionais de pescadores açorianos.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Famílias encontram praias tranquilas no norte (Canasvieiras, Jurerê, Daniela); surfistas e aventureiros " +
            "preferem a Joaquina e a Praia Mole; casais e apreciadores de boa gastronomia desfrutam o Ribeirão da Ilha e Santo Antônio de Lisboa.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "De dezembro a março o calor garante banhos de mar agradáveis, mas a alta temporada gera congestionamentos " +
            "significativos nas rodovias da ilha. Abril e maio costumam apresentar tempo firme e ilha muito mais vazia.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Via aérea pelo moderno Aeroporto Internacional Hercílio Luz (FLN). Por rodovia, a BR-101 conecta Santa Catarina " +
            "aos estados vizinhos, com acesso à ilha pelas pontes centrais.",
        ],
      },
      {
        id: "como-circular",
        heading: "Como circular",
        paragraphs: [
          "Devido às distâncias longas da ilha, o aluguel de veículo oferece liberdade para explorar diferentes praias, " +
            "desde que os passeios sejam organizados por regiões contíguas para evitar o tráfego nos horários de pico.",
        ],
      },
      {
        id: "principais-atracoes",
        heading: "Principais atrações",
        paragraphs: [
          "Lagoa da Conceição, Dunas da Joaquina, Centro Histórico com a Ponte Hercílio Luz, Ilha do Campeche " +
            "e a rota gastronômica das ostras no Ribeirão da Ilha.",
        ],
      },
      {
        id: "tempo-recomendado",
        heading: "Tempo recomendado",
        paragraphs: [
          "De 4 a 7 dias. Com 4 dias você explora os pontos altos do norte, centro e leste; com 7 dias você cobre " +
            "o sul preservado e trilhas emblemáticas como a da Lagoinha do Leste.",
        ],
      },
      {
        id: "custos-e-limitacoes",
        heading: "Custos e limitações",
        paragraphs: [
          "Faixa estimada entre R$ 250 e R$ 620 diários por pessoa. Na alta temporada (Réveillon e Carnaval) " +
            "as tarifas de hospedagem dobram em praias concorridas.",
        ],
      },
      {
        id: "cuidados-e-pratica",
        heading: "Cuidados práticos",
        paragraphs: [
          "Planeje o roteiro dividindo a viagem: reserve um dia só para o norte, outro para o leste e outro para o sul. " +
            "Cruzar a ilha no final de tarde no verão consome horas preciosas no trânsito.",
        ],
      },
      {
        id: "fontes",
        heading: "Fontes consultadas",
        paragraphs: [
          "Prefeitura Municipal de Florianópolis (pmf.sc.gov.br) e IPHAN.",
        ],
      },
    ],
    faq: [
      {
        question: "Precisa de carro para conhecer Florianópolis?",
        answer:
          "Não é obrigatório, mas é altamente recomendável caso queira conhecer praias de diferentes regiões. Se preferir não dirigir, escolha hospedar-se na Lagoa da Conceição ou em uma praia com infraestrutura completa.",
      },
      {
        question: "A água do mar é fria?",
        answer:
          "Nas praias voltadas para o oceano aberto (leste e sul) a água é mais fresca. No norte da ilha e nas enseadas abrigadas, as águas são mais calmas e mornas no verão.",
      },
    ],
    sources: [
      {
        name: "Prefeitura Municipal de Florianópolis",
        url: "https://pmf.sc.gov.br",
        consultedAt: UPDATED_AT,
        supports: "Dados municipais, transporte e praias.",
      },
      {
        name: "IPHAN — Ilha do Campeche",
        url: "https://gov.br/iphan",
        consultedAt: UPDATED_AT,
        supports: "Tombamento e regras arqueológicas da Ilha do Campeche.",
      },
    ],
  },

  /* ------------------------------------------------------------------
     3. Fernando de Noronha (PE)
     ------------------------------------------------------------------ */
  {
    slug: "fernando-de-noronha",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Fernando de Noronha é um arquipélago vulcânico brasileiro reconhecido como Patrimônio Natural da Humanidade. " +
            "Suas praias abrigam uma das maiores concentrações de vida marinha tropical do mundo, incluindo colônias de golfinhos, " +
            "tartarugas-verdes, tubarões e recifes de corais protegidos.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Para amantes de mergulho, natureza preservada, praias paradisíacas e casais em lua de mel. " +
            "Exige disposição para caminhadas, respeito a regras estritas de conservação ambiental e orçamento mais folgado.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "De agosto a novembro as águas do mar de dentro ficam calmas como espelhos, com visibilidade subaquática que " +
            "pode ultrapassar 40 metros. De dezembro a março o mar fica agitado, atraindo praticantes de surfe.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Voos comerciais diários partem do Recife (REC) até o Aeroporto de Fernando de Noronha (FEN). " +
            "Não há transporte marítimo de passageiros disponível para o público geral.",
        ],
      },
      {
        id: "como-circular",
        heading: "Como circular",
        paragraphs: [
          "A ilha é pequena e servida por linha de ônibus regular ao longo da rodovia BR-367. Também é comum " +
            "o aluguel de buggies e o uso de táxis cadastrados com valores tabelados.",
        ],
      },
      {
        id: "principais-atracoes",
        heading: "Principais atrações",
        paragraphs: [
          "Baía do Sancho, Baía dos Porcos com o Morro Dois Irmãos, Praia do Leão, Mirante dos Golfinhos e " +
            "as palestras noturnas de conservação do Projeto Tamar.",
        ],
      },
      {
        id: "tempo-recomendado",
        heading: "Tempo recomendado",
        paragraphs: [
          "Mínimo de 4 dias e ideal de 5 a 7 dias para amortizar o custo das taxas diárias e conhecer tanto as praias do " +
            "mar de dentro quanto as piscinas naturais do mar de fora.",
        ],
      },
      {
        id: "custos-e-limitacoes",
        heading: "Custos e limitações da estimativa",
        paragraphs: [
          "Faixa diária de referência entre R$ 550 e R$ 1.400 por pessoa. A permanência está sujeita à Taxa de " +
            "Preservação Ambiental (TPA) do governo de Pernambuco e ao ingresso do Parque Nacional do ICMBio.",
        ],
      },
      {
        id: "cuidados-e-pratica",
        heading: "Cuidados práticos e preservação",
        paragraphs: [
          "É proibido tocar em animais marinhos, recolher conchas ou pedras e alimentar a fauna. Pague a TPA pelo site " +
            "oficial de Noronha antes de embarcar para evitar filas no desembarque.",
        ],
      },
      {
        id: "fontes",
        heading: "Fontes consultadas",
        paragraphs: [
          "Administração de Fernando de Noronha (noronha.pe.gov.br) e ICMBio (gov.br/icmbio).",
        ],
      },
    ],
    faq: [
      {
        question: "Quais taxas são obrigatórias para entrar em Noronha?",
        answer:
          "Duas taxas: a TPA (Taxa de Preservação Ambiental cobrada por dia de estadia pela Administração Estadual) e o Ingresso do Parque Nacional Marinho (válido por 10 dias para acessar praias como Sancho e Sueste).",
      },
    ],
    sources: [
      {
        name: "Administração Geral de Fernando de Noronha",
        url: "https://noronha.pe.gov.br",
        consultedAt: UPDATED_AT,
        supports: "TPA, regulamentação de acesso e infraestrutura insular.",
      },
      {
        name: "ICMBio — Parque Nacional Marinho de Fernando de Noronha",
        url: "https://gov.br/icmbio",
        consultedAt: UPDATED_AT,
        supports: "Regras e ingressos para as praias do Parque Nacional.",
      },
    ],
  },

  /* ------------------------------------------------------------------
     4. Lençóis Maranhenses (MA)
     ------------------------------------------------------------------ */
  {
    slug: "lencois-maranhenses",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Os Lençóis Maranhenses formam um ecossistema único no planeta: um deserto de dunas de areia branca " +
            "que acumula águas das chuvas em milhares de lagoas de água doce de coloração azul e verde-esmeralda.",
          "O Parque Nacional abrange municípios como Barreirinhas, Santo Amaro e o povoado de Atins.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Para viajantes que buscam paisagens naturais incomparáveis, caminhadas ao ar livre, banhos revigorantes " +
            "e contemplação de horizontes imensos. Requer disposição para viagens em veículos traçados e sol intenso.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "Entre junho e agosto as lagoas atingem sua plenitude de volume e transparência. A partir de setembro o nível " +
            "da água diminui e, entre novembro e janeiro, a maior parte das lagoas seca até o novo ciclo de chuvas.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Voo até São Luís (SLZ) seguido de traslado rodoviário de cerca de 4 horas em rodovia asfaltada até Barreirinhas.",
        ],
      },
      {
        id: "como-circular",
        heading: "Como circular",
        paragraphs: [
          "O acesso ao interior das dunas só pode ser feito em veículos 4x4 homologados ('jardineiras') com condutores autorizados pelo ICMBio.",
        ],
      },
      {
        id: "principais-atracoes",
        heading: "Principais atrações",
        paragraphs: [
          "Circuito Lagoa Azul, Circuito Lagoa Bonita, descida em lancha voadeira pelo Rio Preguiças com visita a Caburé e Atins.",
        ],
      },
      {
        id: "tempo-recomendado",
        heading: "Tempo recomendado",
        paragraphs: [
          "De 3 a 6 dias para desfrutar dos circuitos de lagoas e dos vilarejos ao redor do parque.",
        ],
      },
      {
        id: "custos-e-limitacoes",
        heading: "Custos e limitações",
        paragraphs: [
          "Faixa estimada entre R$ 280 e R$ 680 por dia por pessoa, incluindo passeios de 4x4 e barco.",
        ],
      },
      {
        id: "cuidados-e-pratica",
        heading: "Cuidados práticos",
        paragraphs: [
          "Óculos escuros e proteção solar são indispensáveis: a areia branca reflete intensamente a luz solar.",
        ],
      },
      {
        id: "fontes",
        heading: "Fontes consultadas",
        paragraphs: [
          "ICMBio e Secretaria de Turismo de Barreirinhas.",
        ],
      },
    ],
    faq: [
      {
        question: "As lagoas ficam cheias o ano todo?",
        answer:
          "Não. O fenômeno é estritamente sazonal. As chuvas ocorrem de janeiro a maio, enchendo as lagoas de junho a agosto. No final do ano a maioria das lagoas seca.",
      },
    ],
    sources: [
      {
        name: "ICMBio — Parna dos Lençóis Maranhenses",
        url: "https://gov.br/icmbio",
        consultedAt: UPDATED_AT,
        supports: "Delimitação do parque, fiscalização e lagoas sazonais.",
      },
      {
        name: "Prefeitura Municipal de Barreirinhas",
        url: "https://barreirinhas.ma.gov.br",
        consultedAt: UPDATED_AT,
        supports: "Passeios pelo Rio Preguiças e estrutura urbana.",
      },
    ],
  },

  /* ------------------------------------------------------------------
     5. Ouro Preto (MG)
     ------------------------------------------------------------------ */
  {
    slug: "ouro-preto",
    updatedAt: UPDATED_AT,
    sections: [
      {
        id: "apresentacao",
        heading: "Apresentação do destino",
        paragraphs: [
          "Ouro Preto é o coração da história colonial brasileira. Antiga Vila Rica, foi palco da Inconfidência Mineira " +
            "e conserva o mais impressionante conjunto de igrejas barrocas e casarios do ciclo do ouro.",
        ],
      },
      {
        id: "para-quem",
        heading: "Para quem é indicado",
        paragraphs: [
          "Destino primordial para interessados em história, arte colonial, arquitetura, literatura e rica culinária mineira tradicional.",
        ],
      },
      {
        id: "melhor-epoca",
        heading: "Melhor época para visitar",
        paragraphs: [
          "De abril a setembro (estação seca), quando as chuvas diminuem e caminhar pelas ladeiras de pedra se torna mais confortável e seguro.",
        ],
      },
      {
        id: "como-chegar",
        heading: "Como chegar",
        paragraphs: [
          "Voo até Belo Horizonte/Confins (CNF) seguido de trajeto rodoviário de 100 km (aproximadamente 2 horas) por ônibus ou carro.",
        ],
      },
      {
        id: "como-circular",
        heading: "Como circular",
        paragraphs: [
          "O centro histórico deve ser explorado prioritariamente a pé, utilizando calçados confortáveis e com solado de boa aderência.",
        ],
      },
      {
        id: "principais-atracoes",
        heading: "Principais atrações",
        paragraphs: [
          "Igreja de São Francisco de Assis, Museu da Inconfidência, Matriz Nossa Senhora do Pilar e minas históricas desativadas.",
        ],
      },
      {
        id: "tempo-recomendado",
        heading: "Tempo recomendado",
        paragraphs: [
          "De 2 a 4 dias, podendo estender para cidades vizinhas como Mariana e Lavras Novas.",
        ],
      },
      {
        id: "custos-e-limitacoes",
        heading: "Custos e limitações",
        paragraphs: [
          "Faixa estimada entre R$ 200 e R$ 460 diários por pessoa, com excelente relação custo-benefício em refeições típicas.",
        ],
      },
      {
        id: "cuidados-e-pratica",
        heading: "Cuidados práticos",
        paragraphs: [
          "Ladeiras de calçamento pé-de-moleque podem ser escorregadias; evite sapatos de sola lisa.",
        ],
      },
      {
        id: "fontes",
        heading: "Fontes consultadas",
        paragraphs: [
          "IPHAN e Prefeitura Municipal de Ouro Preto.",
        ],
      },
    ],
    faq: [
      {
        question: "Dá para conhecer as igrejas por dentro?",
        answer:
          "Sim, as principais igrejas históricas funcionam com cobrança de pequena taxa de manutenção e possuem horários regulares de visitação (comum fecharem às segundas-feiras).",
      },
    ],
    sources: [
      {
        name: "Prefeitura Municipal de Ouro Preto",
        url: "https://ouropreto.mg.gov.br",
        consultedAt: UPDATED_AT,
        supports: "Atrativos históricos e roteiros municipais.",
      },
      {
        name: "IPHAN — Patrimônio Mundial de Ouro Preto",
        url: "https://gov.br/iphan",
        consultedAt: UPDATED_AT,
        supports: "Preservação e tombamento do acervo barroco.",
      },
    ],
  },
];
