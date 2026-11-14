/**
 * =====================================================================
 * RotaClara — Arte vetorial de destino
 * ---------------------------------------------------------------------
 * Gera uma paisagem abstrata em SVG a partir da paleta do destino.
 * Vantagens: zero requisição externa, peso mínimo, nenhuma alegação
 * de foto real do local. É decoração, não documentação do lugar.
 * =====================================================================
 */

import type { DestinationPalette } from "@/lib/domain/types";

interface DestinationArtProps {
  palette: DestinationPalette;
  /** Semente para variar a composição entre destinos. */
  seed?: number;
  /** Classe de altura (padrão: 100% do container). */
  className?: string;
  /** Texto alternativo descritivo. */
  alt: string;
}

/**
 * Determina uma variante de composição a partir da semente.
 * Mantém a arte estável entre renderizações (mesmo slug = mesma arte).
 */
function variant(seed: number): {
  sunX: number;
  sunY: number;
  ridgeA: number;
  ridgeB: number;
  hasSun: boolean;
} {
  const s = Math.abs(Math.floor(seed));
  return {
    sunX: 18 + (s % 5) * 15,
    sunY: 16 + (s % 3) * 6,
    ridgeA: 46 + (s % 7) * 3,
    ridgeB: 58 + (s % 5) * 4,
    hasSun: s % 3 !== 0,
  };
}

export function DestinationArt({
  palette,
  seed = 1,
  className = "h-full w-full",
  alt,
}: DestinationArtProps) {
  const v = variant(seed);
  const id = `art-${Math.abs(seed)}`;

  return (
    <svg
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky} />
          <stop offset="100%" stopColor={palette.horizon} />
        </linearGradient>
        <linearGradient id={`${id}-land`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.land} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.land} />
        </linearGradient>
      </defs>

      {/* Céu */}
      <rect width="400" height="225" fill={`url(#${id}-sky)`} />

      {/* Sol / lua discreto */}
      {v.hasSun && (
        <circle
          cx={(v.sunX / 100) * 400}
          cy={(v.sunY / 100) * 225}
          r="26"
          fill={palette.accent}
          opacity="0.85"
        />
      )}

      {/* Nuvens sutis */}
      <g fill="#ffffff" opacity="0.14">
        <ellipse cx="70" cy="46" rx="52" ry="13" />
        <ellipse cx="105" cy="42" rx="34" ry="11" />
        <ellipse cx="310" cy="70" rx="60" ry="12" />
      </g>

      {/* Cordilheira distante */}
      <path
        d={`M0 ${v.ridgeA} L60 ${v.ridgeA - 26} L120 ${v.ridgeA - 6} L190 ${
          v.ridgeA - 34
        } L260 ${v.ridgeA - 10} L330 ${v.ridgeA - 30} L400 ${
          v.ridgeA - 4
        } L400 225 L0 225 Z`}
        fill={palette.land}
        opacity="0.55"
      />

      {/* Formação próxima */}
      <path
        d={`M0 ${v.ridgeB} L70 ${v.ridgeB - 22} L150 ${v.ridgeB + 4} L230 ${
          v.ridgeB - 28
        } L300 ${v.ridgeB - 2} L400 ${v.ridgeB - 24} L400 225 L0 225 Z`}
        fill={`url(#${id}-land)`}
      />

      {/* Faixa d'água */}
      <rect x="0" y="196" width="400" height="29" fill={palette.horizon} opacity="0.9" />
      <g stroke="#ffffff" strokeWidth="1.4" opacity="0.25" strokeLinecap="round">
        <line x1="40" y1="206" x2="120" y2="206" />
        <line x1="180" y1="214" x2="290" y2="214" />
        <line x1="320" y1="204" x2="375" y2="204" />
      </g>
    </svg>
  );
}
