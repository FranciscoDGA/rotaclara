/**
 * =====================================================================
 * RotaClara — Logotipo
 * ---------------------------------------------------------------------
 * Bússola: rosa dos ventos creme + agulha dourada sobre azul-marinho.
 * Vetor 100% local, sem dependência de imagem externa ou fonte de CDN.
 * =====================================================================
 */

interface LogoMarkProps {
  /** Tamanho do lado do quadrado, em px. */
  size?: number;
  /** Remove o fundo navy (útil sobre superfícies escuras). */
  transparent?: boolean;
  /** Classe adicional para posicionamento. */
  className?: string;
}

export function LogoMark({
  size = 40,
  transparent = false,
  className,
}: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="RotaClara"
      className={className}
      style={{ borderRadius: size * 0.22, display: "block" }}
    >
      {!transparent && <rect width="100" height="100" fill="#0a1628" />}

      {/* Rosa dos ventos — creme */}
      <g stroke="#f4f1ea" strokeWidth="3.2" fill="none" strokeLinecap="round">
        <circle cx="50" cy="50" r="30" />
      </g>

      {/* Pontas cardeais (N, L, S, O) */}
      <g fill="#f4f1ea">
        <path d="M50 12 L54.5 44 L50 40 L45.5 44 Z" />
        <path d="M50 88 L45.5 56 L50 60 L54.5 56 Z" />
        <path d="M12 50 L44 45.5 L40 50 L44 54.5 Z" />
        <path d="M88 50 L56 54.5 L60 50 L56 45.5 Z" />
      </g>

      {/* Pontas colaterais finas */}
      <g stroke="#f4f1ea" strokeWidth="2.2" strokeLinecap="round">
        <line x1="28" y1="28" x2="37" y2="37" />
        <line x1="72" y1="28" x2="63" y2="37" />
        <line x1="28" y1="72" x2="37" y2="63" />
        <line x1="72" y1="72" x2="63" y2="63" />
      </g>

      {/* Agulha dourada — diagonal SO → NE */}
      <path d="M26 74 L58 26 L50 52 L74 44 Z" fill="#c9952f" />
      <circle cx="50" cy="50" r="6.5" fill="#0a1628" />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  /** Variante sobre fundo escuro (texto claro). */
  variant?: "light" | "dark";
  /** Oculta o texto, apenas o símbolo. */
  markOnly?: boolean;
  className?: string;
}

/** Logotipo completo: símbolo + palavra + slogan opcional. */
export function Logo({
  size = 36,
  variant = "dark",
  markOnly = false,
  className,
}: LogoProps) {
  const textColor =
    variant === "light" ? "text-white" : "text-[#0a1628]";
  const subColor =
    variant === "light" ? "text-white/70" : "text-[#16304f]/70";

  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={size} />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={`${textColor} font-display font-semibold tracking-[-0.01em]`}
            style={{ fontSize: size * 0.5 }}
          >
            RotaClara
          </span>
          <span
            className={`${subColor} tracking-wide`}
            style={{ fontSize: Math.max(8, size * 0.24) }}
          >
            VIAJAR MELHOR COMEÇA COM DECISÕES MELHORES
          </span>
        </span>
      )}
    </span>
  );
}
