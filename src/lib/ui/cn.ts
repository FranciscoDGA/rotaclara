/**
 * =====================================================================
 * RotaClara — Concatenador de classes
 * ---------------------------------------------------------------------
 * Junta classes condicionalmente, sem dependência externa.
 * Aceita string, false, null e undefined — os falsos são descartados.
 * =====================================================================
 */

type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
