/**
 * =====================================================================
 * RotaClara — Setup global dos testes
 * ---------------------------------------------------------------------
 * Estende os matchers do Jest DOM e expõe utilitários comuns.
 * =====================================================================
 */

import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Limpa o DOM montado entre cada teste.
afterEach(() => {
  cleanup();
});

// jsdom não implementa alguns APIs usados pela interface.
if (!("matchMedia" in window)) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

if (!("scrollTo" in window)) {
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
  });
}

// `IntersectionObserver` não existe no jsdom.
if (!("IntersectionObserver" in globalThis)) {
  class FakeIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: FakeIntersectionObserver,
  });
}
