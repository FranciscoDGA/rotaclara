/**
 * =====================================================================
 * RotaClara — Cartão de destino
 * =====================================================================
 */

import Link from "next/link";
import type { Destination } from "@/lib/domain/types";
import { DestinationArt } from "@/components/ui/DestinationArt";
import { Badge } from "@/components/ui/primitives";
import { formatMonthsShort } from "@/lib/format/format";
import { tagLabel } from "@/lib/seo/seo";

interface DestinationCardProps {
  destination: Destination;
  /** Mostra a lista de destaques. */
  showHighlights?: boolean;
}

/** Rótulo do nível de custo. */
const COST_LABEL: Record<string, string> = {
  economico: "Econômico",
  moderado: "Moderado",
  conforto: "Conforto",
  premium: "Premium",
};

export function DestinationCard({
  destination,
  showHighlights = false,
}: DestinationCardProps) {
  const d = destination;

  return (
    <article className="rc-card rc-card-hover group flex h-full flex-col overflow-hidden">
      <Link
        href={`/destinos/${d.slug}`}
        className="focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 rounded-t-xl"
        aria-label={`Ver guia de ${d.name}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <DestinationArt
            palette={d.palette}
            seed={d.slug.length + d.stateUF.charCodeAt(0)}
            alt={`Arte ilustrativa representando ${d.name}`}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute left-3 top-3">
            <Badge tone="default" className="bg-white/90 backdrop-blur-sm">
              {d.stateUF}
            </Badge>
          </div>
          <div className="absolute right-3 top-3">
            <Badge tone="gold" className="bg-white/90 backdrop-blur-sm">
              {COST_LABEL[d.costLevel] ?? d.costLevel}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight text-[#0a1628]">
              <Link
                href={`/destinos/${d.slug}`}
                className="rounded transition-colors hover:text-[#17827c] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
              >
                {d.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-sm text-[#8c8471]">{d.state}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs uppercase tracking-wide text-[#8c8471]">
              Melhor época
            </p>
            <p className="text-xs font-medium text-[#16304f]">
              {formatMonthsShort(d.bestMonths)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
          {d.tagline}
        </p>

        {showHighlights && d.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {d.highlights.slice(0, 3).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-xs leading-relaxed text-[#8c8471]"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#1fa39b]"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} tone="teal">
              {tagLabel(tag)}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#f4f1ea] pt-4 mt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-[#8c8471]">
              Estimativa diária
            </p>
            <p className="text-sm font-semibold text-[#0a1628]">
              R$ {d.cost.minPerDayBRL}–{d.cost.maxPerDayBRL}
              <span className="text-xs font-normal text-[#8c8471]"> /dia</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#17827c]">
            Ver guia
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
