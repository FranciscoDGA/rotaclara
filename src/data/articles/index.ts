/**
 * =====================================================================
 * RotaClara — Motor de artigos de cauda longa
 * ---------------------------------------------------------------------
 * Lotes 1 e 2 (7 artigos). Todos os números vêm da base de destinos
 * auditada via `getDestination()` — se um destino mudar, o artigo muda
 * junto; se um slug sumir, o build falha em alto e bom som (revisão
 * editorial obrigatória, nunca "undefined" publicado).
 *
 * DATAS: cada artigo carrega a SUA data editorial (`updatedAt`), sempre
 * única — o leitor nunca vê a mesma data em dois artigos (isso transmitia
 * atualização automática/falsidade). Regras: ≥ toda data de referência
 * citada no próprio texto, e ≤ data de publicação. A unicidade é garantida
 * por teste em `tests/articles.test.ts`.
 * =====================================================================
 */

import { getDestination } from "@/data/destinations";
import type {
  Article,
  ArticleSection,
} from "@/lib/domain/articles";
import type {
  Attraction,
  Confidence,
  CostLevel,
  Destination,
  MonthlyClimate,
} from "@/lib/domain/types";
import { formatDateISO, formatMonths, monthName } from "@/lib/format/format";
import { tagLabel } from "@/lib/seo/seo";

/* =====================================================================
   Helpers — falham no build se a base mudar
   ===================================================================== */

function dest(slug: string): Destination {
  const d = getDestination(slug);
  if (!d) {
    throw new Error(
      `Artigo referencia destino inexistente: "${slug}" — revise o conteúdo editorial.`,
    );
  }
  return d;
}

function attraction(d: Destination, id: string): Attraction {
  const a = d.attractions.find((x) => x.id === id);
  if (!a) {
    throw new Error(
      `Artigo referencia atração inexistente: "${id}" em "${d.slug}" — revise o roteiro.`,
    );
  }
  return a;
}

/** Minutos em rótulo curto: 90 → "1h30", 240 → "4h". */
function duration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}

/** Faixa de entrada de uma atração, sempre com honestidade sobre dados incompletos. */
function feeLabel(a: Attraction): string {
  if (a.isFree) return "entrada gratuita";
  const fee = a.admissionFeeBRL;
  if (!fee) return "entrada — valor na fonte oficial";
  if (fee.min === 0 && fee.max === 0) {
    return "ingresso pago — valor a confirmar no site oficial";
  }
  if (fee.min === fee.max) return `entrada R$ ${fee.min}`;
  return `entrada R$ ${fee.min}–${fee.max}`;
}

function confidenceLabel(c: Confidence): string {
  return c === "alta" ? "alta" : c === "media" ? "média" : "baixa";
}

function costLevelLabel(c: CostLevel): string {
  const map: Record<CostLevel, string> = {
    economico: "econômico",
    moderado: "moderado",
    conforto: "confortável",
    premium: "premium",
  };
  return map[c];
}

function rainLabel(r: MonthlyClimate["rainfall"]): string {
  if (r === "seco") return "período seco";
  if (r === "intermediario") return "chuvas intermediárias";
  return "período chuvoso";
}

/** Índices de mês (0–11) que atendem ao critério. */
function monthIndexesWhere(
  d: Destination,
  predicate: (c: MonthlyClimate) => boolean,
): number[] {
  return d.climateByMonth.reduce<number[]>((acc, c, i) => {
    if (predicate(c)) acc.push(i);
    return acc;
  }, []);
}

/* =====================================================================
   Base do lote
   ===================================================================== */

const gramado = dest("gramado");
const lencois = dest("lencois-maranhenses");
const rio = dest("rio-de-janeiro");
const saoPaulo = dest("sao-paulo");
const noronha = dest("fernando-de-noronha");
const florianopolis = dest("florianopolis");
const salvador = dest("salvador");

/* =====================================================================
   01 — Custo: quanto custa ir a Gramado
   ===================================================================== */

const gramadoDays = gramado.recommendedDays;
const gramadoTotalLow = gramadoDays.min * gramado.cost.minPerDayBRL;
const gramadoTotalHigh = gramadoDays.max * gramado.cost.maxPerDayBRL;

const custoGramado: Article = {
  slug: "quanto-custa-ir-a-gramado",
  title: "Quanto custa ir a Gramado: custo diário, total e fontes",
  deck:
    "Faixa diária por pessoa, total para a viagem inteira, o que está e o que não está incluído — cada número com metodologia e data de consulta.",
  description:
    "Quanto custa ir a Gramado? Faixa diária por pessoa, total para a duração recomendada, o que não inclui e como calcular o orçamento — com fonte e data.",
  archetype: "custo",
  destinationSlugs: [gramado.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-13",
  sections: [
    {
      id: "por-dia",
      heading: "Quanto custa por dia",
      paragraphs: [
        `A estimativa diária em ${gramado.name} vai de R$ ${gramado.cost.minPerDayBRL} a R$ ${gramado.cost.maxPerDayBRL} por pessoa. O valor cobre os itens habituais de uma viagem — hospedagem, alimentação, transporte local e passeios — nos perfis econômico, moderado e confortável.`,
        gramado.cost.methodology,
        `A data de referência desta faixa é ${formatDateISO(gramado.cost.referenceDate)} e a confiança atribuída à estimativa é ${confidenceLabel(gramado.cost.confidence)}. A página do destino mantém a revisão visível para qualquer visitante.`,
        gramado.cost.limitations,
      ],
    },
    {
      id: "total",
      heading: "Total para a viagem inteira",
      paragraphs: [
        `A duração sugerida para ${gramado.name} é de ${gramadoDays.min} a ${gramadoDays.max} dias. Pela faixa diária, o custo estimado por pessoa fica entre R$ ${gramadoTotalLow} (${gramadoDays.min} dias no perfil econômico) e R$ ${gramadoTotalHigh} (${gramadoDays.max} dias no perfil confortável) — sem passagem aérea.`,
        "Esses números servem para planejar quanto guardar, não são uma cobrança prevista por ninguém. É ordem de grandeza com método declarado.",
      ],
    },
    {
      id: "o-que-pesa",
      heading: "O que mais pesa no bolso",
      paragraphs: [
        gramado.howToArrive,
        gramado.localTransport,
        gramado.food,
        gramado.referenceFromSaoPaulo
          ? `De São Paulo, a referência de deslocamento é de ${gramado.referenceFromSaoPaulo.distanceKm} km — ${gramado.referenceFromSaoPaulo.notes}`
          : "",
      ].filter(Boolean),
    },
    {
      id: "calcule",
      heading: "Como calcular o seu caso",
      paragraphs: [
        "A faixa acima é genérica por definição — o seu grupo tem composição e estilo próprios. Três ferramentas fecham a conta com os seus números: a Calculadora soma transporte, hospedagem e passeios; o Diagnóstico cruza o orçamento do grupo com as diárias dos destinos; e o Planejador monta a estrutura de dias com estimativa declarada.",
      ],
    },
  ],
  faq: [
    {
      question: "Os valores desta página são preços reais?",
      answer:
        "Não. São faixas de referência para planejamento, com metodologia e data de consulta públicas — nunca cotação em tempo real. Confirme sempre com os provedores antes de reservar.",
    },
    {
      question: "De quando são os valores?",
      answer: `A data de referência desta estimativa é ${formatDateISO(gramado.cost.referenceDate)} e a última revisão editorial do destino foi em ${formatDateISO(gramado.updatedAt)}.`,
    },
    {
      question: "O que a faixa não inclui?",
      answer: gramado.cost.limitations,
    },
  ],
};

/* =====================================================================
   02 — Época: melhor época para Lençóis Maranhenses
   ===================================================================== */

const lencoisRainy = monthIndexesWhere(lencois, (c) => c.rainfall === "chuvoso");
const lencoisDry = monthIndexesWhere(lencois, (c) => c.rainfall === "seco");

const epocaLencois: Article = {
  slug: "melhor-epoca-lencois-maranhenses",
  title: "Melhor época para ir aos Lençóis Maranhenses",
  deck:
    "As lagoas atingem o melhor volume entre junho e agosto. Veja o clima mês a mês — temperatura e chuva — para escolher a data da sua viagem.",
  description:
    "Melhor época para ir aos Lençóis Maranhenses: meses com mais lagoas, clima mês a mês com temperatura e chuva, e o que considerar em cada período.",
  archetype: "epoca",
  destinationSlugs: [lencois.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-15",
  sections: [
    {
      id: "melhores-meses",
      heading: "Melhores meses para ir",
      paragraphs: [
        `Para conhecer os Lençóis Maranhenses, ${formatMonths(lencois.bestMonths)} são a janela indicada. ${lencois.bestTimeNotes}`,
        `A duração sugerida para o destino é de ${lencois.recommendedDays.min} a ${lencois.recommendedDays.max} dias — folga para dias de chuva e para o traslado de ${lencois.referenceFromSaoPaulo?.distanceKm ?? "—"} km a partir de São Paulo.`,
      ],
    },
    {
      id: "clima-mes-a-mes",
      heading: "Clima mês a mês",
      paragraphs: [
        `Na nossa base climática, ${formatMonths(lencoisRainy)} são os meses mais chuvosos e ${formatMonths(lencoisDry)} os mais secos — a chuva do primeiro semestre é o que alimenta as lagoas.`,
      ],
      bullets: lencois.climateByMonth.map(
        (c, i) =>
          `${monthName(i)}: ${c.temperatureC.min}–${c.temperatureC.max} °C · ${rainLabel(c.rainfall)}`,
      ),
    },
    {
      id: "deslocamento",
      heading: "Como chegar e se deslocar",
      paragraphs: [
        lencois.howToArrive,
        lencois.localTransport,
        lencois.referenceFromSaoPaulo?.notes ?? "",
      ].filter(Boolean),
    },
    {
      id: "planejar",
      heading: "Planejar a viagem",
      paragraphs: [
        "Escolhida a data, o Planejador monta a estrutura de dias com estimativa de custo declarada e o Diagnóstico avisa se o orçamento do grupo comporta o destino — sem cadastro e sem preço inventado.",
      ],
    },
  ],
  faq: [
    {
      question: "Quando as lagoas estão mais cheias?",
      answer: lencois.bestTimeNotes,
    },
    {
      question: "Posso ir em dezembro?",
      answer:
        "Dezembro aparece como período seco na nossa base climática, mas as lagoas já começaram a secar gradativamente a partir de outubro. O volume máximo é de junho a agosto — se o objetivo são as lagoas cheias, escolha esse intervalo.",
    },
    {
      question: "Quantos dias preciso?",
      answer: `A duração sugerida para os Lençóis Maranhenses é de ${lencois.recommendedDays.min} a ${lencois.recommendedDays.max} dias, considerando o traslado até Barreirinhas e os passeios dentro do parque.`,
    },
  ],
};

/* =====================================================================
   03 — Comparativo: Rio ou São Paulo
   ===================================================================== */

const rioTags = rio.tags.map(tagLabel).join(", ");
const spTags = saoPaulo.tags.map(tagLabel).join(", ");

const comparativo: Article = {
  slug: "rio-ou-sao-paulo",
  title: "Rio ou São Paulo: qual vale mais a pena para você?",
  deck:
    "Custo por dia, melhor época, perfil de cada cidade e deslocamento comparados lado a lado — com os números da nossa base e o critério à vista.",
  description:
    "Rio ou São Paulo: comparativo de custo por dia, melhor época, perfil de cada cidade e duração sugerida para decidir qual combina com o seu roteiro.",
  archetype: "comparativo",
  destinationSlugs: [rio.slug, saoPaulo.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-14",
  sections: [
    {
      id: "custo",
      heading: "Custo dia a dia",
      paragraphs: [
        `No ${rio.name}, a faixa diária é de R$ ${rio.cost.minPerDayBRL} a R$ ${rio.cost.maxPerDayBRL} por pessoa; em ${saoPaulo.name}, de R$ ${saoPaulo.cost.minPerDayBRL} a R$ ${saoPaulo.cost.maxPerDayBRL}. Os dois têm custo classificado como ${costLevelLabel(rio.costLevel)} na nossa tabela — mas são estimativas de planejamento, não cotações.`,
        rio.cost.methodology,
        `${rio.cost.limitations}`,
      ],
    },
    {
      id: "epoca",
      heading: "Melhor época",
      paragraphs: [
        `Os melhores meses para o Rio, segundo a base, são ${formatMonths(rio.bestMonths)}. ${rio.bestTimeNotes}`,
        `Para São Paulo, ${formatMonths(saoPaulo.bestMonths)}. ${saoPaulo.bestTimeNotes}`,
      ],
    },
    {
      id: "perfil",
      heading: "O perfil de cada cidade",
      paragraphs: [
        `${rio.name} — ${rio.tagline} Perfis que mais combinam: ${rioTags}.`,
        `${saoPaulo.name} — ${saoPaulo.tagline} Perfis que mais combinam: ${spTags}.`,
        `${rio.intro}`,
        `${saoPaulo.intro}`,
      ],
    },
    {
      id: "deslocamento",
      heading: "Como chegar e em quanto tempo",
      paragraphs: [
        rio.referenceFromSaoPaulo
          ? `Do ponto de referência (São Paulo), o Rio fica a ${rio.referenceFromSaoPaulo.distanceKm} km — ${rio.referenceFromSaoPaulo.notes}`
          : "",
        saoPaulo.referenceFromSaoPaulo
          ? `São Paulo, por sua vez, é a referência de origem dos nossos dados: ${saoPaulo.referenceFromSaoPaulo.notes}`
          : "São Paulo é a nossa referência de origem para deslocamentos — por isso não há distância declarada a partir de si mesma.",
      ].filter(Boolean),
    },
    {
      id: "duracao",
      heading: "Duração sugerida",
      paragraphs: [
        `O Rio pede de ${rio.recommendedDays.min} a ${rio.recommendedDays.max} dias; São Paulo, de ${saoPaulo.recommendedDays.min} a ${saoPaulo.recommendedDays.max}. Uma viagem curta de ${Math.min(rio.recommendedDays.min, saoPaulo.recommendedDays.min)} dias dá para ter uma amostra honesta de qualquer um dos dois — não para esgotar a cidade.`,
      ],
    },
    {
      id: "qual-escolher",
      heading: "Qual escolher",
      paragraphs: [
        `Se o roteiro é de ${rio.tags.slice(0, 3).map(tagLabel).join(", ").toLowerCase()}, o Rio de Janeiro é a escolha mais coerente com a nossa base de atrações; se o foco é ${saoPaulo.tags.slice(0, 3).map(tagLabel).join(", ").toLowerCase()}, São Paulo entrega melhor.`,
        "Quer cruzar os dois com mais critérios? O Comparador avalia até três destinos lado a lado e só declare vantagem quando o critério é mensurável.",
      ],
    },
  ],
  faq: [
    {
      question: "Qual é o mais barato?",
      answer:
        rio.cost.minPerDayBRL <= saoPaulo.cost.minPerDayBRL
          ? `De partida, o ${rio.name} começa mais barato (R$ ${rio.cost.minPerDayBRL} contra R$ ${saoPaulo.cost.minPerDayBRL} por dia), mas as faixas se sobrepõem: o custo final depende do perfil e da época escolhidos.`
          : `De partida, São Paulo começa mais barato (R$ ${saoPaulo.cost.minPerDayBRL} contra R$ ${rio.cost.minPerDayBRL} por dia), mas as faixas se sobrepõem: o custo final depende do perfil e da época escolhidos.`,
    },
    {
      question: "Dá para conhecer os dois na mesma viagem?",
      answer: rio.referenceFromSaoPaulo
        ? `Sim. São cerca de ${rio.referenceFromSaoPaulo.distanceKm} km entre as duas cidades pela rota rodoviária — ${rio.referenceFromSaoPaulo.notes}`
        : "Sim — as duas cidades são bem conectadas por rodovia e voo doméstico; confirme o trecho na sua busca de transporte.",
    },
    {
      question: "Os valores incluem passagem?",
      answer: `${rio.cost.limitations}`,
    },
  ],
};

/* =====================================================================
   04 — Roteiro: 4 dias no Rio de Janeiro
   ===================================================================== */

interface RioDayPlan {
  title: string;
  attractionIds: string[];
}

/* Agrupamento editorial por geografia — sempre a partir dos ids reais
   da base; se um id sumir, o build falha e força revisão. */
const RIO_DAY_PLANS: RioDayPlan[] = [
  {
    title: "Dia 1 — Centro e Santa Teresa",
    attractionIds: ["rio-museu-do-amanha", "rio-santa-teresa"],
  },
  {
    title: "Dia 2 — Corcovado e Parque da Tijuca",
    attractionIds: ["rio-cristo", "rio-tijuca"],
  },
  {
    title: "Dia 3 — Praias da Zona Sul",
    attractionIds: ["rio-copacabana", "rio-ipanema"],
  },
  {
    title: "Dia 4 — Urca e Jardim Botânico",
    attractionIds: ["rio-pao-de-acucar", "rio-jardim-botanico"],
  },
];

function rioDaySection(plan: RioDayPlan, index: number): ArticleSection {
  const atts = plan.attractionIds.map((id) => attraction(rio, id));
  const total = atts.reduce((sum, a) => sum + a.suggestedMinutes, 0);
  return {
    id: `dia-${index + 1}`,
    heading: plan.title,
    paragraphs: [
      `Soma das visitas do dia: ${duration(total)} — sem contar deslocamentos entre os bairros.`,
    ],
    bullets: atts.map(
      (a) =>
        `${a.name} — ${duration(a.suggestedMinutes)} · ${feeLabel(a)} · ${a.area}`,
    ),
  };
}

const rioTotalMinutes = RIO_DAY_PLANS.reduce(
  (sum, plan) =>
    sum +
    plan.attractionIds.reduce(
      (s, id) => s + attraction(rio, id).suggestedMinutes,
      0,
    ),
  0,
);

const roteiroRio: Article = {
  slug: "roteiro-4-dias-rio-de-janeiro",
  title: "Roteiro de 4 dias no Rio de Janeiro: o que fazer dia a dia",
  deck:
    "Quatro dias com as oito atrações mapeadas na nossa base — do Centro ao Corcovado, praias da Zona Sul e Urca, com tempo em cada visita, entradas e ritmo declarado.",
  description:
    "Roteiro de 4 dias no Rio de Janeiro com as 8 atrações da nossa base: o que fazer dia a dia, tempo em cada visita, entradas e dicas de deslocamento.",
  archetype: "roteiro",
  destinationSlugs: [rio.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-16",
  sections: [
    {
      id: "antes-de-comecar",
      heading: "Antes de começar",
      paragraphs: [
        `O destino recomenda de ${rio.recommendedDays.min} a ${rio.recommendedDays.max} dias. Este roteiro usa o mínimo — ${RIO_DAY_PLANS.length} dias — para caber em uma viagem curta sem pular o essencial.`,
        `Os tempos e as entradas vêm das ${rio.attractions.length} atrações mapeadas em nossa base, cada uma com fonte oficial e data de consulta. Soma total das visitas: ${duration(rioTotalMinutes)} espalhados em ${RIO_DAY_PLANS.length} dias.`,
      ],
    },
    ...RIO_DAY_PLANS.map(rioDaySection),
    {
      id: "ritmo",
      heading: "Tempo, ritmo e deslocamentos",
      paragraphs: [
        `Os deslocamentos não entram na soma dos dias: ${rio.localTransport}`,
        `Cuidado com o essencial — ${rio.warnings[0] ?? ""}`,
        `Horários de atrações cobradas mudam em feriados: ${rio.warnings[rio.warnings.length - 1] ?? ""}`,
      ].filter(Boolean),
    },
    {
      id: "custo",
      heading: "Custo de referência",
      paragraphs: [
        `Para ${RIO_DAY_PLANS.length} dias no perfil econômico, a base indica cerca de R$ ${RIO_DAY_PLANS.length * rio.cost.minPerDayBRL} por pessoa; no perfil confortável, até R$ ${RIO_DAY_PLANS.length * rio.cost.maxPerDayBRL}. ${rio.cost.limitations}`,
        `Data de referência das estimativas: ${formatDateISO(rio.cost.referenceDate)}.`,
      ],
    },
  ],
  faq: [
    {
      question: "Por que exatamente 4 dias?",
      answer: `Porque é a duração mínima sugerida para o Rio de Janeiro (${rio.recommendedDays.min} a ${rio.recommendedDays.max} dias na nossa base). Com menos tempo, corte um dos dias — o roteiro está montado em blocos geográficos que se substituem.`,
    },
    {
      question: "Os ingressos do roteiro estão garantidos?",
      answer:
        "Não. As entradas exibidas são faixas consultadas nas fontes oficiais na data indicada — não reservamos nem vendemos ingressos. Confirme valor e horário no site oficial de cada atração antes de sair.",
    },
  ],
};

/* =====================================================================
   05 — Custo: quanto custa Fernando de Noronha (lote 2)
   ===================================================================== */

const noronhaDays = noronha.recommendedDays;
const noronhaTotalLow = noronhaDays.min * noronha.cost.minPerDayBRL;
const noronhaTotalHigh = noronhaDays.max * noronha.cost.maxPerDayBRL;

const custoNoronha: Article = {
  slug: "quanto-custa-fernando-de-noronha",
  title: "Quanto custa ir a Fernando de Noronha: por dia, total e fontes",
  deck:
    "Faixa diária premium por pessoa, total para a duração sugerida, as taxas obrigatórias que mudam a conta e o que a estimativa não inclui — cada número com metodologia e data.",
  description:
    "Quanto custa ir a Fernando de Noronha? Faixa diária, total para a duração sugerida, taxas que mudam a conta e limites de cada número — com fonte e data.",
  archetype: "custo",
  destinationSlugs: [noronha.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-17",
  sections: [
    {
      id: "por-dia",
      heading: "Quanto custa por dia",
      paragraphs: [
        `A estimativa diária em ${noronha.name} vai de R$ ${noronha.cost.minPerDayBRL} a R$ ${noronha.cost.maxPerDayBRL} por pessoa — a faixa mais alta da nossa base, coerente com um destino isolado e de acesso controlado. O valor cobre os itens habituais de uma viagem: hospedagem, alimentação, transporte local e passeios.`,
        noronha.cost.methodology,
        `A data de referência desta faixa é ${formatDateISO(noronha.cost.referenceDate)} e a confiança atribuída à estimativa é ${confidenceLabel(noronha.cost.confidence)}. A página do destino mantém a revisão visível para qualquer visitante.`,
        noronha.cost.limitations,
      ],
    },
    {
      id: "total",
      heading: "Total para a viagem inteira",
      paragraphs: [
        `A duração sugerida para ${noronha.name} é de ${noronhaDays.min} a ${noronhaDays.max} dias. Pela faixa diária, o custo estimado por pessoa fica entre R$ ${noronhaTotalLow} (${noronhaDays.min} dias no perfil econômico) e R$ ${noronhaTotalHigh} (${noronhaDays.max} dias no perfil confortável) — sem passagem aérea e sem as taxas obrigatórias de entrada, que são cobradas à parte.`,
        "É ordem de grandeza para planejar quanto guardar, com método declarado — não uma cobrança prevista por ninguém.",
      ],
    },
    {
      id: "o-que-pesa",
      heading: "O que mais pesa no bolso",
      paragraphs: [
        noronha.warnings[0] ?? "",
        noronha.warnings[2] ?? "",
        noronha.howToArrive,
        noronha.localTransport,
        noronha.food,
        noronha.referenceFromSaoPaulo
          ? `De São Paulo, a referência de deslocamento é de ${noronha.referenceFromSaoPaulo.distanceKm} km — ${noronha.referenceFromSaoPaulo.notes}`
          : "",
      ].filter(Boolean),
    },
    {
      id: "calcule",
      heading: "Como calcular o seu caso",
      paragraphs: [
        "A faixa é genérica por definição — o seu grupo tem composição e estilo próprios. A Calculadora soma transporte, hospedagem e passeios com os seus números; o Diagnóstico cruza o orçamento do grupo com as diárias dos destinos; e o Planejador monta a estrutura de dias com estimativa declarada.",
      ],
    },
  ],
  faq: [
    {
      question: "Os valores desta página são preços reais?",
      answer:
        "Não. São faixas de referência para planejamento, com metodologia e data de consulta públicas — nunca cotação em tempo real. Confirme sempre com os provedores antes de reservar.",
    },
    {
      question: "De quando são os valores?",
      answer: `A data de referência desta estimativa é ${formatDateISO(noronha.cost.referenceDate)} e a última revisão editorial do destino foi em ${formatDateISO(noronha.updatedAt)}.`,
    },
    {
      question: "Quais taxas obrigatórias a faixa não inclui?",
      answer: `${noronha.warnings[0] ?? ""} ${noronha.warnings[1] ?? ""}`.trim(),
    },
    {
      question: "O que a faixa não inclui?",
      answer: noronha.cost.limitations,
    },
  ],
};

/* =====================================================================
   06 — Época: melhor época para Florianópolis (lote 2)
   ===================================================================== */

const floripaRainy = monthIndexesWhere(
  florianopolis,
  (c) => c.rainfall === "chuvoso",
);
const floripaDry = monthIndexesWhere(
  florianopolis,
  (c) => c.rainfall === "seco",
);
const july = florianopolis.climateByMonth[6];
if (!july) {
  throw new Error(
    "Base climática de Florianópolis sem o mês de julho — revise o conteúdo editorial.",
  );
}

const epocaFlorianopolis: Article = {
  slug: "melhor-epoca-florianopolis",
  title: "Melhor época para ir a Florianópolis",
  deck:
    "Dezembro a março para praia quente, abril e maio para ilha tranquila — e o que o verão cobra em trânsito. Clima mês a mês com temperatura e chuva para escolher a data.",
  description:
    "Melhor época para Florianópolis: meses de praia, o trânsito do verão, clima mês a mês com temperatura e chuva e o que considerar em cada período.",
  archetype: "epoca",
  destinationSlugs: [florianopolis.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-18",
  sections: [
    {
      id: "melhores-meses",
      heading: "Melhores meses para ir",
      paragraphs: [
        `Para conhecer ${florianopolis.name}, ${formatMonths(florianopolis.bestMonths)} são a janela indicada. ${florianopolis.bestTimeNotes}`,
        `A duração sugerida para o destino é de ${florianopolis.recommendedDays.min} a ${florianopolis.recommendedDays.max} dias — folga para dias de chuva e para o traslado de ${florianopolis.referenceFromSaoPaulo?.distanceKm ?? "—"} km a partir de São Paulo.`,
        florianopolis.warnings[0] ?? "",
      ].filter(Boolean),
    },
    {
      id: "clima-mes-a-mes",
      heading: "Clima mês a mês",
      paragraphs: [
        `Na nossa base climática, ${formatMonths(floripaRainy)} são os meses mais chuvosos e ${formatMonths(floripaDry)} os mais secos — o inverno da ilha combina mar mais agitado e temperaturas mais baixas.`,
      ],
      bullets: florianopolis.climateByMonth.map(
        (c, i) =>
          `${monthName(i)}: ${c.temperatureC.min}–${c.temperatureC.max} °C · ${rainLabel(c.rainfall)}`,
      ),
    },
    {
      id: "deslocamento",
      heading: "Como chegar e se deslocar",
      paragraphs: [
        florianopolis.howToArrive,
        florianopolis.localTransport,
        florianopolis.referenceFromSaoPaulo?.notes ?? "",
      ].filter(Boolean),
    },
    {
      id: "planejar",
      heading: "Planejar a viagem",
      paragraphs: [
        "Escolhida a data, o Planejador monta a estrutura de dias com estimativa de custo declarada e o Diagnóstico avisa se o orçamento do grupo comporta o destino — sem cadastro e sem preço inventado.",
      ],
    },
  ],
  faq: [
    {
      question: "Quando é a melhor época para ir?",
      answer: florianopolis.bestTimeNotes,
    },
    {
      question: "Posso ir em julho?",
      answer: `Julho aparece na base como ${rainLabel(july.rainfall)} com temperaturas de ${july.temperatureC.min} a ${july.temperatureC.max} °C — o mês mais frio do ano. É escolha para quem quer a ilha fora da alta temporada; para praia com calor, a janela indicada é ${formatMonths(florianopolis.bestMonths)}.`,
    },
    {
      question: "Quantos dias preciso?",
      answer: `A duração sugerida para Florianópolis é de ${florianopolis.recommendedDays.min} a ${florianopolis.recommendedDays.max} dias — a ilha tem mais de 40 praias em mais de 50 km, e o tempo evita correria entre regiões.`,
    },
    {
      question: "O trânsito do verão é mesmo ruim?",
      answer: florianopolis.warnings[0] ?? "",
    },
  ],
};

/* =====================================================================
   07 — Roteiro: 3 dias em Salvador (lote 2)
   ===================================================================== */

interface SalvadorDayPlan {
  title: string;
  attractionIds: string[];
  /** Nota editorial opcional (deslocamento/dia específico). */
  note?: string;
}

/* Agrupamento editorial por geografia — sempre a partir dos ids reais
   da base; se um id sumir, o build falha e força revisão. */
const SALVADOR_DAY_PLANS: SalvadorDayPlan[] = [
  {
    title: "Dia 1 — Pelourinho e Centro Histórico",
    attractionIds: ["ssa-pelourinho", "ssa-elevador-lacerda"],
  },
  {
    title: "Dia 2 — Santo Antônio e Rio Vermelho",
    attractionIds: ["ssa-igreja-sao-francisco", "ssa-teatro-bahia"],
  },
  {
    title: "Dia 3 — Barra e Praia do Forte",
    attractionIds: ["ssa-farol-da-barra", "ssa-praia-do-forte"],
    note: salvador.warnings[3] ?? undefined,
  },
];

function salvadorDaySection(
  plan: SalvadorDayPlan,
  index: number,
): ArticleSection {
  const atts = plan.attractionIds.map((id) => attraction(salvador, id));
  const total = atts.reduce((sum, a) => sum + a.suggestedMinutes, 0);
  return {
    id: `dia-${index + 1}`,
    heading: plan.title,
    paragraphs: [
      `Soma das visitas do dia: ${duration(total)} — sem contar deslocamentos entre os bairros.`,
      ...(plan.note ? [plan.note] : []),
    ],
    bullets: atts.map(
      (a) =>
        `${a.name} — ${duration(a.suggestedMinutes)} · ${feeLabel(a)} · ${a.area}`,
    ),
  };
}

const salvadorTotalMinutes = SALVADOR_DAY_PLANS.reduce(
  (sum, plan) =>
    sum +
    plan.attractionIds.reduce(
      (s, id) => s + attraction(salvador, id).suggestedMinutes,
      0,
    ),
  0,
);

const roteiroSalvador: Article = {
  slug: "roteiro-3-dias-salvador",
  title: "Roteiro de 3 dias em Salvador: o que fazer dia a dia",
  deck:
    "Três dias com as seis atrações mapeadas na nossa base — Pelourinho e Cidade Alta, patrimônio sacro e Rio Vermelho, Barra e litoral — com tempo em cada visita, entradas e ritmo declarado.",
  description:
    "Roteiro de 3 dias em Salvador com as 6 atrações da nossa base: o que fazer dia a dia, tempo em cada visita, entradas e dicas de deslocamento.",
  archetype: "roteiro",
  destinationSlugs: [salvador.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-19",
  sections: [
    {
      id: "antes-de-comecar",
      heading: "Antes de começar",
      paragraphs: [
        `O destino recomenda de ${salvador.recommendedDays.min} a ${salvador.recommendedDays.max} dias. Este roteiro usa o mínimo — ${SALVADOR_DAY_PLANS.length} dias — para caber em uma viagem curta sem pular o essencial.`,
        `Os tempos e as entradas vêm das ${salvador.attractions.length} atrações mapeadas em nossa base, cada uma com fonte oficial e data de consulta. Soma total das visitas: ${duration(salvadorTotalMinutes)} espalhados em ${SALVADOR_DAY_PLANS.length} dias.`,
      ],
    },
    ...SALVADOR_DAY_PLANS.map(salvadorDaySection),
    {
      id: "ritmo",
      heading: "Tempo, ritmo e deslocamentos",
      paragraphs: [
        `Os deslocamentos não entram na soma dos dias: ${salvador.localTransport}`,
        `Cuidado com o essencial — ${salvador.warnings[0] ?? ""}`,
        `Antes de visitar igrejas e casas de cultura: ${salvador.warnings[salvador.warnings.length - 1] ?? ""}`,
      ].filter(Boolean),
    },
    {
      id: "custo",
      heading: "Custo de referência",
      paragraphs: [
        `Para ${SALVADOR_DAY_PLANS.length} dias no perfil econômico, a base indica cerca de R$ ${SALVADOR_DAY_PLANS.length * salvador.cost.minPerDayBRL} por pessoa; no perfil confortável, até R$ ${SALVADOR_DAY_PLANS.length * salvador.cost.maxPerDayBRL}. ${salvador.cost.limitations}`,
        `Data de referência das estimativas: ${formatDateISO(salvador.cost.referenceDate)}.`,
      ],
    },
  ],
  faq: [
    {
      question: "Por que exatamente 3 dias?",
      answer: `Porque é a duração mínima sugerida para Salvador (${salvador.recommendedDays.min} a ${salvador.recommendedDays.max} dias na nossa base). Com mais tempo, use o dia extra para a Costa do Cacau ou para as praias — os dias deste roteiro estão montados em blocos geográficos que se substituem.`,
    },
    {
      question: "Os ingressos do roteiro estão garantidos?",
      answer:
        "Não. As entradas exibidas são faixas consultadas nas fontes oficiais na data indicada — não reservamos nem vendemos ingressos. Confirme valor e horário no site oficial de cada atração antes de sair.",
    },
    {
      question: "Como me deslocar entre os pontos?",
      answer: salvador.localTransport,
    },
  ],
};

/* =====================================================================
   08 — Custo: quanto custa ir aos Lençóis Maranhenses (lote 3)
   ===================================================================== */

const lencoisDays = lencois.recommendedDays;
const lencoisTotalLow = lencoisDays.min * lencois.cost.minPerDayBRL;
const lencoisTotalHigh = lencoisDays.max * lencois.cost.maxPerDayBRL;

const custoLencois: Article = {
  slug: "quanto-custa-lencois-maranhenses",
  title: "Quanto custa ir aos Lençóis Maranhenses: por dia, total e fontes",
  deck:
    "Faixa diária por pessoa, total estimado para 3 a 6 dias, impacto dos passeios 4x4 e diferenças entre Barreirinhas e Atins — com metodologia e data de consulta.",
  description:
    "Quanto custa viajar para os Lençóis Maranhenses? Faixa diária, total para 3 a 6 dias, passeios 4x4, Barreirinhas vs Atins e o que não entra — com fonte.",
  archetype: "custo",
  destinationSlugs: [lencois.slug],
  /* Data editorial própria do artigo (única no catálogo). */
  updatedAt: "2026-11-20",
  sections: [
    {
      id: "por-dia",
      heading: "Quanto custa por dia",
      paragraphs: [
        `A estimativa diária nos ${lencois.name} vai de R$ ${lencois.cost.minPerDayBRL} a R$ ${lencois.cost.maxPerDayBRL} por pessoa — faixa ${costLevelLabel(lencois.costLevel)} que cobre os itens habituais de viagem no destino: hospedagem, alimentação, deslocamento local e passeios.`,
        lencois.cost.methodology,
        `A data de referência desta faixa é ${formatDateISO(lencois.cost.referenceDate)} e a confiança atribuída à estimativa é ${confidenceLabel(lencois.cost.confidence)}. A página do destino mantém a revisão visível para qualquer visitante.`,
        lencois.cost.limitations,
      ],
    },
    {
      id: "total",
      heading: "Total estimado para a viagem inteira",
      paragraphs: [
        `A duração recomendada para ${lencois.name} é de ${lencoisDays.min} a ${lencoisDays.max} dias. Pela faixa diária da base, o gasto estimado por pessoa fica entre R$ ${lencoisTotalLow} (${lencoisDays.min} dias no perfil econômico) e R$ ${lencoisTotalHigh} (${lencoisDays.max} dias no perfil confortável) — antes da passagem aérea ou do traslado desde São Luís.`,
        "O orçamento diário varia bastante conforme a época escolhida e a quantidade de passeios em veículo 4x4 credenciado ou voadeira pelo Rio Preguiças.",
      ],
    },
    {
      id: "passeios-e-bases",
      heading: "Passeios credenciados e escolha da base",
      paragraphs: [
        "Nos Lençóis Maranhenses, a logística pesa tanto quanto a diária de pousada: veículos comuns não circulam nas dunas, e a escolha entre Barreirinhas e Atins altera o tempo de deslocamento e o estilo da viagem:",
      ],
      bullets: [
        ...lencois.lodgingAreas.map(
          (area) => `Base em ${area.name} (${area.profile}): ${area.pros} Atenção: ${area.cons}`,
        ),
        ...lencois.attractions.map(
          (attr) =>
            `${attr.name} (${attr.area}, duração sugerida ${duration(attr.suggestedMinutes)}, ${feeLabel(attr)}): ${attr.description}${attr.notes ? ` — ${attr.notes}` : ""}`,
        ),
      ],
    },
    {
      id: "o-que-pesa",
      heading: "O que mais pesa no orçamento",
      paragraphs: [
        lencois.howToArrive,
        lencois.localTransport,
        lencois.food,
        lencois.referenceFromSaoPaulo
          ? `A partir de São Paulo, a referência de deslocamento é de ${lencois.referenceFromSaoPaulo.distanceKm} km — ${lencois.referenceFromSaoPaulo.notes}`
          : "",
        `Atenção antes de fechar a data: ${lencois.warnings[0] ?? ""}`,
      ].filter(Boolean),
    },
    {
      id: "calcule",
      heading: "Como simular com os seus números",
      paragraphs: [
        "Como o valor da passagem aérea, do traslado entre São Luís e Barreirinhas (ou Santo Amaro) e da pousada muda por temporada, a faixa acima serve como ordem de grandeza inicial. Na Calculadora você soma transporte, diárias e passeios reais do seu grupo; no Comparador, pode confrontar os Lençóis Maranhenses com outros destinos do Nordeste usando os mesmos critérios.",
      ],
    },
  ],
  faq: [
    {
      question: "Quanto tempo vale ficar nos Lençóis Maranhenses?",
      answer: `Nossa base recomenda de ${lencoisDays.min} a ${lencoisDays.max} dias no destino — tempo suficiente para combinar o circuito de lagoas de 4x4 com o passeio fluvial pelo Rio Preguiças sem corrida no traslado desde São Luís.`,
    },
    {
      question: "A entrada no Parque Nacional dos Lençóis Maranhenses é paga?",
      answer:
        "O acesso ao parque nacional em si tem entrada gratuita conforme registrado na base, mas o visitante arca com os passeios em veículos 4x4 credenciados, voadeiras e guias autorizados — que respondem por boa parte do gasto diário.",
    },
    {
      question: "Quando ir para não encontrar as lagoas secas?",
      answer: `${lencois.bestTimeNotes} ${lencois.warnings[0] ?? ""}`.trim(),
    },
    {
      question: "Qual a data de referência dessas estimativas?",
      answer: `A faixa diária de R$ ${lencois.cost.minPerDayBRL} a R$ ${lencois.cost.maxPerDayBRL} por pessoa tem referência de ${formatDateISO(lencois.cost.referenceDate)}. ${lencois.cost.limitations}`,
    },
  ],
};

/* =====================================================================
   Acessores
   ===================================================================== */

export const allArticles: readonly Article[] = [
  custoGramado,
  epocaLencois,
  comparativo,
  roteiroRio,
  custoNoronha,
  epocaFlorianopolis,
  roteiroSalvador,
  custoLencois,
];

export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return allArticles.map((a) => a.slug);
}
