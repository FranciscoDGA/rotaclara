"use client";

/**
 * =====================================================================
 * RotaClara — Cabeçalho
 * ---------------------------------------------------------------------
 * Navegação principal responsiva. Menu móvel com controle de teclado,
 * fechamento por Esc e bloqueio de scroll do corpo enquanto aberto.
 * =====================================================================
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/ui/cn";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/destinos", label: "Descobrir" },
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/planejador", label: "Planejar" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/comparador", label: "Comparar" },
  { href: "/roteiro", label: "Roteiro" },
  { href: "/hospedagens", label: "Hospedagens" },
  { href: "/guias", label: "Guias" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Fecha o menu ao navegar (ajuste de estado durante o render).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  // Fecha por Esc e restaura o scroll do corpo.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className="rc-no-print sticky top-0 z-50 border-b border-[#e8e3d8] bg-white/85 backdrop-blur-md"
    >
      <div className="rc-container flex h-[var(--rc-header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 rounded-lg focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
        >
          <Logo size={34} />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                      "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
                      active
                        ? "text-[#0a1628]"
                        : "text-[#16304f]/75 hover:text-[#0a1628] hover:bg-[#f4f1ea]",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#c9952f]"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="/sobre"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[#16304f]/75 transition-colors hover:text-[#0a1628] hover:bg-[#f4f1ea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            Sobre
          </Link>
          <Link
            href="/planejador"
            className="inline-flex h-10 items-center rounded-xl bg-[#0a1628] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            Planejar viagem
          </Link>
        </div>

        {/* Botão móvel */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8e3d8] bg-white text-[#0a1628] transition-colors hover:bg-[#f4f1ea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 lg:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Painel móvel */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-[#e8e3d8] bg-white lg:hidden"
      >
        <nav aria-label="Navegação principal (móvel)" className="rc-container py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
                      active
                        ? "bg-[#f4f1ea] text-[#0a1628]"
                        : "text-[#16304f] hover:bg-[#f4f1ea]",
                    )}
                  >
                    {item.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-[#7a7162]"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#e8e3d8] pt-4">
            <Link
              href="/sobre"
              className="flex h-11 items-center justify-center rounded-xl border border-[#e8e3d8] text-sm font-medium text-[#16304f] hover:bg-[#f4f1ea] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              Sobre a RotaClara
            </Link>
            <Link
              href="/planejador"
              className="flex h-11 items-center justify-center rounded-xl bg-[#0a1628] text-sm font-medium text-white hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              Planejar viagem
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
