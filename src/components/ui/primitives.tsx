/**
 * =====================================================================
 * RotaClara — Primitivas de interface
 * ---------------------------------------------------------------------
 * Componentes acessíveis, reutilizados em todas as páginas.
 * Teclado, contraste e foco visível são tratados aqui, uma única vez.
 * =====================================================================
 */

import Link from "next/link";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/ui/cn";

/* =====================================================================
   Botões
 * ===================================================================== */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0a1628] text-white hover:bg-[#0f2138] active:bg-[#050d1a] " +
    "shadow-[0_1px_2px_rgb(10_22_40/0.2)] " +
    "hover:shadow-[inset_0_0_0_1px_rgb(201_149_47/0.45),0_2px_6px_rgb(10_22_40/0.22)]",
  secondary:
    "bg-white text-[#0a1628] border border-[#e8e3d8] hover:border-[#d6cfc0] hover:bg-[#faf8f4]",
  ghost:
    "text-[#16304f] hover:bg-[#f4f1ea] border border-transparent",
  danger:
    "bg-[#c33a3a] text-white hover:bg-[#a32b2b]",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-lg gap-2",
  lg: "h-13 px-7 text-base rounded-lg gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors duration-150",
        "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        "whitespace-nowrap",
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className,
      )}
      {...props}
    />
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  /** Abre em nova aba (usar apenas para links externos). */
  external?: boolean;
  /** Permite rastreamento de clique de afiliado. */
  onClick?: () => void;
}

/** Botão que navega — mantém estilo idêntico ao `<button>`. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external = false,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-colors duration-150",
    "focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2",
    "whitespace-nowrap",
    BUTTON_VARIANTS[variant],
    BUTTON_SIZES[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer nofollow"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

/* =====================================================================
   Superfícies
 * ===================================================================== */

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Eleva o card ao passar o mouse. */
  hover?: boolean;
  /** Remove o padding interno padrão. */
  flush?: boolean;
}

export function Card({ children, className, hover = false, flush = false }: CardProps) {
  return (
    <div
      className={cn(
        "rc-card",
        hover && "rc-card-hover",
        !flush && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* =====================================================================
   Texto e rótulos
 * ===================================================================== */

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "teal" | "gold" | "success" | "warning" | "danger";
  className?: string;
}

const BADGE_TONES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-[#f4f1ea] text-[#16304f] border-[#e8e3d8]",
  teal: "bg-[#e6f4f4] text-[#0b4744] border-[#bfe3e1]",
  gold: "bg-[#fdf4e3] text-[#8f6417] border-[#f0dcb4]",
  success: "bg-[#e3f6ec] text-[#167043] border-[#bfe6d1]",
  warning: "bg-[#fdf1dd] text-[#9a6206] border-[#f3ddb8]",
  danger: "bg-[#fdeaea] text-[#a32b2b] border-[#f6c9c9]",
};

export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        BADGE_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

interface EyebrowProps {
  children: ReactNode;
  /** Numeração editorial da seção (ex.: "01"). Decorativa. */
  index?: string;
  className?: string;
}

export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={cn("rc-eyebrow", className)}>
      {index && (
        <span aria-hidden="true" className="rc-eyebrow-index">
          {index}
        </span>
      )}
      {children}
    </p>
  );
}

/* =====================================================================
   Formulários
 * ===================================================================== */

interface FieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  /** Texto de ajuda ou aviso abaixo do campo. */
  hint?: string;
  /** Marca o campo como opcional no rótulo. */
  optional?: boolean;
  className?: string;
}

export function Field({
  label,
  htmlFor,
  children,
  hint,
  optional = false,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-[#0a1628]"
      >
        {label}
        {optional && (
          <span className="ml-1.5 text-xs font-normal text-[#736b5b]">
            (opcional)
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[#736b5b] leading-relaxed">{hint}</p>
      )}
    </div>
  );
}

const INPUT_BASE =
  "w-full h-11 px-3.5 rounded-xl border bg-white text-[#0a1628] text-sm " +
  "placeholder:text-[#7a7162] transition-colors duration-150 " +
  "focus:outline-none focus:border-[#2fb8c4] focus:ring-4 focus:ring-[#2fb8c4]/15 " +
  "disabled:bg-[#f4f1ea] disabled:text-[#736b5b]";

const INPUT_STATES =
  "border-[#e8e3d8] hover:border-[#d6cfc0] aria-[invalid=true]:border-[#c33a3a] aria-[invalid=true]:focus:ring-[#c33a3a]/15";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      className={cn(INPUT_BASE, INPUT_STATES, className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        INPUT_BASE,
        INPUT_STATES,
        "h-auto min-h-24 py-3 leading-relaxed resize-y",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export function Select({ className, invalid, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        INPUT_BASE,
        INPUT_STATES,
        "appearance-none pr-9 bg-no-repeat cursor-pointer",
        // Seta simples embutida em SVG data-URI (sem dependência externa).
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%238c8471%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[position:right_0.75rem_center]",
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    >
      {children}
    </select>
  );
}

/* =====================================================================
   Aviso de estimativa — obrigatório em toda ferramenta de cálculo
 * ===================================================================== */

interface EstimateNoteProps {
  children: ReactNode;
  className?: string;
}

export function EstimateNote({ children, className }: EstimateNoteProps) {
  return (
    <div className={cn("rc-estimate-note", className)} role="note">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0 text-[#9a6206]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <div>{children}</div>
    </div>
  );
}

/* =====================================================================
   Estados de vazio e carregamento
 * ===================================================================== */

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-2xl " +
          "border border-dashed border-[#d6cfc0] bg-white px-6 py-12",
        className,
      )}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-3 text-[#7a7162]"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <h3 className="text-base font-semibold text-[#0a1628]">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#736b5b]">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Esqueleto de carregamento. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("rc-skeleton", className)} aria-hidden="true" />;
}
