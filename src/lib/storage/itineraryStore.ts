/**
 * =====================================================================
 * RotaClara — Store externo do roteiro (localStorage)
 * ---------------------------------------------------------------------
 * Motivo de existir: o roteiro vive no armazenamento local do navegador,
 * que é um SISTEMA EXTERNO ao React. O padrão correto para ler e
 * assinar um store externo é `useSyncExternalStore` — assim a leitura
 * acontece fora do ciclo de render, sem efeitos que chamam setState,
 * e com suporte nativo a SSR (o servidor nunca toca em `window`).
 *
 * Regras:
 *  - Nenhum dado sai do navegador; nada é enviado a servidores.
 *  - Falha de leitura/escrita vira `error: true` na interface, sem
 *    quebrar a edição (o roteiro segue em memória).
 * =====================================================================
 */

import type { Itinerary } from "@/lib/domain/types";
import { parseItinerary, serializeItinerary } from "@/lib/domain/itinerary";

const STORAGE_KEY = "rotaclara:itinerary:v1";

export interface ItineraryStoreState {
  /** Roteiro serializado, ou `null` quando não há nenhum salvo. */
  raw: string | null;
  /** `true` quando a leitura ou escrita do armazenamento falhou. */
  error: boolean;
  /** `true` durante o SSR e a renderização de hidratação. */
  isServer: boolean;
}

/** Snapshot usado no servidor e na hidratação (estável e sem `window`). */
const SERVER_STATE: ItineraryStoreState = {
  raw: null,
  error: false,
  isServer: true,
};

let state: ItineraryStoreState = {
  raw: null,
  error: false,
  isServer: false,
};
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): ItineraryStoreState {
  try {
    return {
      raw: window.localStorage.getItem(STORAGE_KEY),
      error: false,
      isServer: false,
    };
  } catch {
    return { raw: state.raw, error: true, isServer: false };
  }
}

/** Lê o estado atual. Memoizado: mesma referência enquanto não muda. */
export function getItinerarySnapshot(): ItineraryStoreState {
  if (typeof window === "undefined") return SERVER_STATE;
  if (!loaded) {
    loaded = true;
    state = readStorage();
  }
  return state;
}

/** Snapshot do servidor (nunca lê armazenamento). */
export function getServerItinerarySnapshot(): ItineraryStoreState {
  return SERVER_STATE;
}

/** Assina mudanças do roteiro — inclusive em outras abas. */
export function subscribeItinerary(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    const next = readStorage();
    if (next.raw !== state.raw || next.error !== state.error) {
      state = next;
      listeners.forEach((l) => l());
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Grava (ou apaga) o roteiro e notifica os assinantes.
 * Em caso de falha, mantém o valor em memória e apenas sinaliza o erro,
 * para que a edição do usuário não seja perdida.
 */
export function saveItineraryState(raw: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (raw === null) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, raw);
    state = { raw, error: false, isServer: false };
  } catch {
    state = { raw, error: true, isServer: false };
  }
  listeners.forEach((l) => l());
}

/* =====================================================================
   Helpers de domínio re-exportados para o componente
   ===================================================================== */

export function itineraryFromRaw(raw: string | null): Itinerary | null {
  return parseItinerary(raw);
}

export function rawFromItinerary(itinerary: Itinerary): string {
  return serializeItinerary(itinerary);
}
