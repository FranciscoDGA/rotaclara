/**
 * =====================================================================
 * RotaClara — Tipos de domínio
 * ---------------------------------------------------------------------
 * Fonte única de verdade para as estruturas de dados do produto.
 * Nada aqui depende de React, IO ou rede — facilita testes unitários.
 * =====================================================================
 */

/** Nível de confiança atribuído a um dado ou estimativa. */
export type Confidence = "alta" | "media" | "baixa";

/** Trilha de auditoria: toda informação relevante carrega sua origem. */
export interface Source {
  /** Nome legível da fonte (ex.: "IBGE — Cidades"). */
  name: string;
  /** URL verificável de onde o dado foi obtido. */
  url: string;
  /** Data da consulta no formato ISO (YYYY-MM-DD). */
  consultedAt: string;
}

/** Referência bibliográfica de um conteúdo editorial. */
export interface EditorialSource extends Source {
  /** O que esta fonte sustenta no texto. */
  supports: string;
}

/** Região geográfica do Brasil. */
export type Region =
  | "Sudeste"
  | "Nordeste"
  | "Sul"
  | "Centro-Oeste"
  | "Norte";

/** Categorias de perfil que o viajante pode marcar. */
export type TravelTag =
  | "praia"
  | "natureza"
  | "cidade"
  | "cultura"
  | "gastronomia"
  | "aventura"
  | "familia"
  | "romantico"
  | "economico"
  | "luxo"
  | "historico"
  | "vida_noturna";

/** Nível de custo relativo (ordinal, não monetário). */
export type CostLevel = "economico" | "moderado" | "conforto" | "premium";

/** Modo de deslocamento preferido no planejador. */
export type TransportMode =
  | "aviao"
  | "carro"
  | "onibus"
  | "trem"
  | "misto"
  | "nao_definido";

/** Estilo de viagem. */
export type TripStyle =
  | "relaxado"
  | "equilibrado"
  | "intenso"
  | "aventura"
  | "luxo"
  | "economico";

/** Faixa etária das crianças — relevante para custos e logística. */
export type ChildAgeBand = "bebe" | "crianca" | "adolescente";

/**
 * Estimativa de custo diário por pessoa.
 *
 * IMPORTANTE: estes valores NÃO são preços de mercado em tempo real.
 * São faixas de referência para planejamento, com metodologia explícita.
 * Ver `costMethodology` e `costReferenceDate` antes de exibir ao usuário.
 */
export interface CostEstimate {
  /** Faixa de custo diário por pessoa, em BRL. */
  minPerDayBRL: number;
  maxPerDayBRL: number;
  /** Como a faixa foi construída (metodologia transparente). */
  methodology: string;
  /** Data de referência da estimativa (ISO). */
  referenceDate: string;
  confidence: Confidence;
  /** Condições e limitações do número. */
  limitations: string;
}

/** Informações climáticas agregadas por mês (0-11). */
export interface MonthlyClimate {
  /** Índice 0 = janeiro … 11 = dezembro. */
  temperatureC: { min: number; max: number };
  rainfall: "seco" | "intermediario" | "chuvoso";
  seaTempC?: number;
}

/** Atração turística — fato com fonte. */
export interface Attraction {
  id: string;
  name: string;
  description: string;
  /** Categorias para filtragem e roteiros. */
  tags: TravelTag[];
  /** Tempo médio de visita recomendado, em minutos. */
  suggestedMinutes: number;
  /** Faixa de valor de entrada. `null` quando é acesso gratuito. */
  admissionFeeBRL: { min: number; max: number } | null;
  /** `true` quando a atração é gratuita. */
  isFree: boolean;
  /** Endereço aproximado para referência (sem geolocalização precisa). */
  area: string;
  sources: Source[];
  /** Observações operacionais (ex.: "agenda previa"). */
  notes?: string;
}

/** Destino — unidade central da plataforma. */
export interface Destination {
  slug: string;
  name: string;
  state: string;
  stateUF: string;
  region: Region;
  country: string;
  /** Resumo curto usado em cartões e metadados. */
  tagline: string;
  /** Descrição editorial de apresentação. */
  intro: string;
  tags: TravelTag[];
  /** Melhor época: meses (0-11) e justificativa. */
  bestMonths: number[];
  bestTimeNotes: string;
  /** Duração recomendada em dias. */
  recommendedDays: { min: number; max: number };
  /** Distância e tempo de deslocamento aéreo desde São Paulo (referência). */
  referenceFromSaoPaulo: {
    distanceKm: number | null;
    flightMinutes: number | null;
    notes: string;
  } | null;
  cost: CostEstimate;
  /** Custo relativo para comparação rápida. */
  costLevel: CostLevel;
  climateByMonth: MonthlyClimate[];
  /** Como chegar. */
  howToArrive: string;
  /** Como se deslocar localmente. */
  localTransport: string;
  /** Onde se hospedar — bairros/zonas com prós e contras. */
  lodgingAreas: LodgingArea[];
  attractions: Attraction[];
  /** Cuidados e informações importantes. */
  warnings: string[];
  /** Alimentação: características e sugestões de comportamento de preço. */
  food: string;
  /** Imagem vetorial decorativa (paleta do destino). */
  palette: DestinationPalette;
  /** Índice de qualidade editorial — 0 a 1. */
  editorialScore: number;
  /** Data da última verificação editorial (ISO). */
  updatedAt: string;
  sources: EditorialSource[];
  /** Destaques curtos para cartões. */
  highlights: string[];
}

/** Área de hospedagem. */
export interface LodgingArea {
  name: string;
  profile: string;
  pros: string;
  cons: string;
}

/** Paleta de cores usada na arte vetorial do destino. */
export interface DestinationPalette {
  sky: string;
  horizon: string;
  land: string;
  accent: string;
}

/** Guia editorial completo — renderizado na página do destino. */
export interface GuideSection {
  id: string;
  heading: string;
  /** Conteúdo em parágrafos de texto simples (sem HTML do usuário). */
  paragraphs: string[];
  /** Listas opcionais de pontos. */
  bullets?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Guide {
  slug: string;
  sections: GuideSection[];
  faq: FaqItem[];
  sources: EditorialSource[];
  updatedAt: string;
}

/* =====================================================================
   Calculadora de viagem
   ===================================================================== */

/** Categoria de despesa da calculadora. */
export type ExpenseCategory =
  | "transporte"
  | "hospedagem"
  | "alimentacao"
  | "passeios"
  | "combustivel"
  | "pedagios"
  | "estacionamento"
  | "seguro"
  | "outras";

/** Item de despesa informado pelo usuário. */
export interface ExpenseItem {
  category: ExpenseCategory;
  label: string;
  /** Valor total já considerando todas as pessoas/dias, em BRL. */
  amountBRL: number;
}

/** Entrada completa da calculadora. */
export interface CalculatorInput {
  destinationSlug: string | null;
  days: number;
  people: number;
  items: ExpenseItem[];
  /** Orçamento total disponível, em BRL. */
  budgetBRL: number | null;
  /** Meses até a data da viagem — usado para sugestão de poupança. */
  monthsUntilTrip: number;
}

/** Resultado agregado da calculadora. */
export interface CalculatorResult {
  totalBRL: number;
  perPersonBRL: number;
  perDayBRL: number;
  byCategory: { category: ExpenseCategory; amountBRL: number; share: number }[];
  /** `null` quando não há orçamento informado. */
  budgetDeltaBRL: number | null;
  /** `null` quando não há orçamento ou meses informados. */
  monthlySavingsBRL: number | null;
  overBudget: boolean;
}

/* =====================================================================
   Planejador de viagem
   ===================================================================== */

/** Entrada do planejador inteligente. */
export interface PlannerInput {
  origin: string;
  destinationSlug: string | null;
  /** Alternativa ao slug quando o destino não está na base. */
  destinationLabel: string | null;
  country: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  childAgeBand: ChildAgeBand | null;
  budgetBRL: number | null;
  currency: "BRL";
  lodgingPreference: "economico" | "padrao" | "conforto" | "luxo";
  tripStyle: TripStyle;
  interests: TravelTag[];
  accessibilityNeeds: string[];
  transportMode: TransportMode;
}

/** Bloco de resumo gerado pelo planejador. */
export interface PlannerSummary {
  totalDays: number;
  nights: number;
  travelers: number;
  label: string;
}

/** Distribuição sugerida do orçamento. */
export interface BudgetSlice {
  category: ExpenseCategory;
  share: number;
  amountBRL: number;
}

/** Alerta de limitação — sempre exibido ao usuário. */
export interface PlannerAlert {
  id: string;
  severity: "info" | "atencao";
  title: string;
  detail: string;
}

/** Dia sugerido. */
export interface SuggestedDay {
  day: number;
  date: string | null;
  title: string;
  focus: TravelTag[];
  activityIds: string[];
  notes: string;
}

/** Resultado do planejador. */
export interface PlannerResult {
  summary: PlannerSummary;
  budgetSlices: BudgetSlice[];
  estimatedTotalBRL: number;
  days: SuggestedDay[];
  suggestedAttractionIds: string[];
  alerts: PlannerAlert[];
  /** Metodologia das estimativas — obrigatória na exibição. */
  methodology: string;
  referenceDate: string;
}

/* =====================================================================
   Comparador de destinos
   ===================================================================== */

export type CompareCriterion =
  | "costLevel"
  | "distance"
  | "bestMonths"
  | "recommendedDays"
  | "climate"
  | "profile"
  | "attractions"
  | "lodging"
  | "transport";

export interface CompareRow {
  criterion: CompareCriterion;
  label: string;
  /** Valor formatado por destino, na mesma ordem da seleção. */
  values: string[];
  /** Destino com vantagem neste critério, ou `null` quando empate/objetivo. */
  betterIndex: number | null;
  /** Explica por que esse critério foi marcado como melhor. */
  rationale?: string;
}

export interface CompareResult {
  destinations: Destination[];
  rows: CompareRow[];
  /** Diferenças objetivas entre os destinos selecionados. */
  differences: string[];
  /** Aviso de transparência dos critérios. */
  methodology: string;
}

/* =====================================================================
   Construtor de roteiros
   ===================================================================== */

export type DayPart = "manha" | "tarde" | "noite";

/** Atividade dentro do roteiro. */
export interface ItineraryActivity {
  id: string;
  part: DayPart;
  title: string;
  address: string;
  /** Tempo estimado de visita em minutos — estimativa, não medida real. */
  estimatedMinutes: number;
  notes: string;
  /** Gasto previsto pelo usuário, em BRL. */
  estimatedCostBRL: number;
  /** `true` quando é deslocamento entre pontos. */
  isTransit: boolean;
  attractionId: string | null;
}

export interface ItineraryDay {
  id: string;
  day: number;
  date: string | null;
  title: string;
  activities: ItineraryActivity[];
}

export interface Itinerary {
  id: string;
  title: string;
  destinationSlug: string | null;
  origin: string;
  startDate: string | null;
  endDate: string | null;
  days: ItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

/* =====================================================================
   Hospedagem e experiências (camada de afiliados)
   ===================================================================== */

export type PartnerId =
  | "stay22"
  | "booking"
  | "expedia"
  | "civitatis"
  | "viator"
  | "getyourguide"
  | "skyscanner"
  | "rentalcars"
  | "seguros";

export type LinkKind = "editorial" | "monetized";

export interface PartnerConfig {
  id: PartnerId;
  name: string;
  /** `true` somente quando há ID configurado em variável de ambiente. */
  enabled: boolean;
  /** URL base oficial do parceiro. */
  baseUrl: string;
  /** Parâmetro de rastreamento usado. */
  trackingParam: string | null;
}

export interface OfferLink {
  partner: PartnerId;
  kind: LinkKind;
  label: string;
  /** URL final. Vazia quando o parceiro está desabilitado. */
  href: string;
  /** Destino indicado quando o link é contextual. */
  destinationSlug: string | null;
}

/** Item de hospedagem/experiência exibido na vitrine. */
export interface LodgingListing {
  id: string;
  name: string;
  type: "hotel" | "pousada" | "resort" | "apartamento" | "passeio" | "experiencia" | "aluguel_de_veiculo";
  area: string;
  destinationSlug: string;
  description: string;
  /** Perfil de preço relativo — nunca um valor absoluto falso. */
  priceLevel: CostLevel;
  tags: TravelTag[];
  /** Sem inventário: a v1 não exibe preço nem disponibilidade. */
  hasRealTimePricing: false;
  sources: Source[];
  links: OfferLink[];
}
