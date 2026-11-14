/**
 * =====================================================================
 * RotaClara — Formatação pt-BR
 * ---------------------------------------------------------------------
 * Funções puras, sem IO. Números e moedas seguem a convenção brasileira.
 * =====================================================================
 */

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

const brlFormatterCents = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("pt-BR");

const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

const MONTHS_PT_SHORT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
] as const;

const WEEKDAYS_PT = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
] as const;

/** Formata um valor em BRL sem centavos (padrão de painéis). */
export function formatBRL(value: number): string {
  if (!Number.isFinite(value)) return "R$ —";
  return brlFormatter.format(value);
}

/** Formata um valor em BRL com centavos (detalhes de cálculo). */
export function formatBRLPrecise(value: number): string {
  if (!Number.isFinite(value)) return "R$ —";
  return brlFormatterCents.format(value);
}

/** Formata número inteiro com separador de milhar pt-BR. */
export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return numberFormatter.format(Math.round(value));
}

/** Formata percentual (0–1) como "42%". */
export function formatPercent(share: number, digits = 0): string {
  if (!Number.isFinite(share)) return "—";
  const pct = share * 100;
  return `${new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(pct)}%`;
}

/** Nome completo do mês (0–11). */
export function monthName(monthIndex: number): string {
  return MONTHS_PT[monthIndex] ?? "";
}

/** Nome abreviado do mês (0–11). */
export function monthShort(monthIndex: number): string {
  return MONTHS_PT_SHORT[monthIndex] ?? "";
}

/** Converte uma lista de índices de meses em texto legível. */
export function formatMonths(months: number[]): string {
  if (months.length === 0) return "—";
  const sorted = [...months].sort((a, b) => a - b);

  // Tenta detectar sequência contínua para escrever "de abril a julho".
  const isContinuous =
    sorted.length > 1 &&
    sorted.every((m, i) => i === 0 || m === (sorted[i - 1] as number) + 1);

  if (isContinuous && sorted.length > 2) {
    const first = sorted[0] as number;
    const last = sorted[sorted.length - 1] as number;
    return `de ${monthName(first)} a ${monthName(last)}`;
  }

  return sorted.map((m) => monthName(m)).join(", ");
}

/** Lista de meses curta separada por "·". */
export function formatMonthsShort(months: number[]): string {
  if (months.length === 0) return "—";
  return [...months]
    .sort((a, b) => a - b)
    .map((m) => monthShort(m))
    .join(" · ");
}

/** Formata uma data ISO (YYYY-MM-DD) como "12 de novembro de 2026". */
export function formatDateISO(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} de ${monthName(m - 1)} de ${y}`;
}

/** Formata data ISO curta: "12 nov". */
export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${monthShort(m - 1)}`;
}

/** Nome do dia da semana de uma data ISO. */
export function weekdayISO(iso: string): string {
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return WEEKDAYS_PT[date.getUTCDay()] ?? "";
}

/** Calcula a diferença em dias entre duas datas ISO. Retorna 0 se inválido. */
export function daysBetweenISO(fromISO: string, toISO: string): number {
  const from = new Date(`${fromISO}T12:00:00Z`).getTime();
  const to = new Date(`${toISO}T12:00:00Z`).getTime();
  if (Number.isNaN(from) || Number.isNaN(to)) return 0;
  return Math.round((to - from) / 86_400_000);
}

/** Soma dias a uma data ISO e retorna a nova data ISO. */
export function addDaysISO(iso: string, days: number): string {
  const base = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(base.getTime())) return iso;
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

/** Data de hoje em ISO no fuso local. */
export function todayISO(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Formata minutos em "2 h 30 min". */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

/** Converte "São Paulo" em "sao-paulo". Usado em slugs de URL. */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Limita texto a `max` caracteres acrescentando reticências. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Capitaliza a primeira letra. */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Junta partes não vazias com vírgula. */
export function joinNonEmpty(parts: string[], separator = ", "): string {
  return parts.filter(Boolean).join(separator);
}

/**
 * Plural simples pt-BR para contagens de itens.
 * Evita strings como "1 dias" no produto.
 */
export function plural(count: number, singular: string, pluralForm: string): string {
  return count === 1 ? singular : pluralForm;
}
