/**
 * =====================================================================
 * RotaClara — Aviso legal reutilizável
 * =====================================================================
 */

import { AFFILIATE_DISCLOSURE, ESTIMATE_DISCLOSURE } from "@/lib/affiliate/affiliate";
import { cn } from "@/lib/ui/cn";

interface NoticeProps {
  className?: string;
}

/** Aviso padrão de que valores são estimativas. */
export function EstimateDisclosure({ className }: NoticeProps) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-[#8c8471]",
        className,
      )}
    >
      {ESTIMATE_DISCLOSURE}
    </p>
  );
}

/** Aviso de transparência sobre links de afiliado (LGPD / CONAR). */
export function AffiliateDisclosure({ className }: NoticeProps) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-[#8c8471]",
        className,
      )}
    >
      {AFFILIATE_DISCLOSURE}
    </p>
  );
}

/** Bloco de metodologia — obrigatório junto a qualquer cálculo. */
interface MethodologyProps {
  referenceDate: string;
  children: React.ReactNode;
  className?: string;
}

export function Methodology({ referenceDate, children, className }: MethodologyProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#e8e3d8] bg-[#faf8f4] p-4",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#16304f]">
        Metodologia da estimativa
      </p>
      <div className="mt-1.5 text-xs leading-relaxed text-[#8c8471]">
        {children}
      </div>
      <p className="mt-2 text-xs text-[#8c8471]">
        Data de referência:{" "}
        <time dateTime={referenceDate} className="font-medium text-[#16304f]">
          {referenceDate.split("-").reverse().join("/")}
        </time>
      </p>
    </div>
  );
}
