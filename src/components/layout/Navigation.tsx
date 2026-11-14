/**
 * =====================================================================
 * RotaClara — Navegação estrutural (SkipLink + Breadcrumbs)
 * =====================================================================
 */

import Link from "next/link";

/** Link de pulo para o conteúdo — acessibilidade por teclado. */
export function SkipLink() {
  return (
    <a
      href="#conteudo-principal"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[#0a1628] focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
    >
      Pular para o conteúdo principal
    </a>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

/**
 * Breadcrumbs com dados estruturados BreadcrumbList.
 * A última trilha é a página atual e não é link.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://rotaclara.com.br${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Você está em" className="rc-no-print">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#8c8471]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded transition-colors hover:text-[#0a1628] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={isLast ? "text-[#16304f] font-medium" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[#d6cfc0]"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
