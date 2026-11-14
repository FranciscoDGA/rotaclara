"use client";

/**
 * =====================================================================
 * RotaClara — Campo de descoberta de destinos
 * ---------------------------------------------------------------------
 * Combobox acessível: navegação por teclado (setas, Enter, Esc),
 * lista com `role="listbox"`, anúncio de resultados para leitores de
 * tela e estado vazio explícito.
 * =====================================================================
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { Destination } from "@/lib/domain/types";
import { DestinationArt } from "@/components/ui/DestinationArt";

interface HeroSearchProps {
  destinations: readonly Destination[];
}

/** Normaliza texto para comparação sem acento. */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function HeroSearch({ destinations }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = normalize(query);
    if (q.length < 2) return [];
    return destinations
      .filter((d) =>
        normalize(
          `${d.name} ${d.state} ${d.stateUF} ${d.region} ${d.tags.join(" ")}`,
        ).includes(q),
      )
      .slice(0, 6);
  }, [query, destinations]);

  const showPanel = open && query.trim().length >= 2;

  function select(destination: Destination) {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    router.push(`/destinos/${destination.slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showPanel) {
      if (e.key === "Enter" && query.trim().length >= 2) {
        e.preventDefault();
        router.push(`/destinos?busca=${encodeURIComponent(query.trim())}`);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const picked = results[activeIndex];
      if (picked) select(picked);
      else router.push(`/destinos?busca=${encodeURIComponent(query.trim())}`);
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) select(results[0]);
          else if (query.trim())
            router.push(`/destinos?busca=${encodeURIComponent(query.trim())}`);
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <div className="relative flex-1">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8471]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // Permite o clique na lista antes de fechar.
              window.setTimeout(() => setOpen(false), 150);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Busque por cidade, estado ou perfil…"
            aria-label="Buscar destino"
            aria-expanded={showPanel}
            aria-controls="rc-search-listbox"
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 && results[activeIndex]
                ? `rc-option-${results[activeIndex].slug}`
                : undefined
            }
            role="combobox"
            autoComplete="off"
            className="h-14 w-full rounded-2xl border border-[#e8e3d8] bg-white pl-12 pr-4 text-[#0a1628] shadow-[0_2px_16px_rgb(10_22_40/0.08)] placeholder:text-[#b3ab99] focus:outline-none focus:border-[#2fb8c4] focus:ring-4 focus:ring-[#2fb8c4]/15 sm:text-base"
          />
        </div>
        <button
          type="submit"
          className="h-14 shrink-0 rounded-2xl bg-[#0a1628] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 sm:text-base"
        >
          Descobrir
        </button>
      </form>

      {/* Painel de sugestões */}
      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 overflow-hidden rounded-2xl border border-[#e8e3d8] bg-white shadow-[0_24px_64px_rgb(5_13_26/0.18)]">
          <p className="sr-only" role="status" aria-live="polite">
            {results.length === 0
              ? "Nenhum destino encontrado"
              : `${results.length} destino(s) encontrado(s)`}
          </p>

          {results.length > 0 ? (
            <ul
              id="rc-search-listbox"
              ref={listRef}
              role="listbox"
              aria-label="Sugestões de destino"
              className="max-h-80 overflow-y-auto p-2"
            >
              {results.map((d, index) => (
                <li key={d.slug} role="none">
                  <button
                    type="button"
                    id={`rc-option-${d.slug}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => select(d)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                      index === activeIndex ? "bg-[#f4f1ea]" : "hover:bg-[#f4f1ea]"
                    }`}
                  >
                    <span className="h-11 w-16 shrink-0 overflow-hidden rounded-lg">
                      <DestinationArt
                        palette={d.palette}
                        seed={d.slug.length}
                        alt=""
                        className="h-full w-full"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-[#0a1628]">
                        {d.name}
                      </span>
                      <span className="block truncate text-xs text-[#8c8471]">
                        {d.state} · {d.region}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-[#17827c]">
                      R$ {d.cost.minPerDayBRL}–{d.cost.maxPerDayBRL}/dia
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-5 text-center">
              <p className="text-sm font-medium text-[#0a1628]">
                Nenhum destino encontrado
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#8c8471]">
                Nossa base tem {destinations.length} destinos verificados. Tente
                outra cidade, estado ou perfil — ou explore a lista completa.
              </p>
              <Link
                href="/destinos"
                className="mt-3 inline-block text-sm font-medium text-[#17827c] underline underline-offset-2"
              >
                Ver todos os destinos
              </Link>
            </div>
          )}

          <div className="border-t border-[#f4f1ea] bg-[#faf8f4] px-4 py-2.5">
            <p className="text-[11px] text-[#8c8471]">
              Use ↑ ↓ para navegar · Enter para abrir · Esc para fechar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
