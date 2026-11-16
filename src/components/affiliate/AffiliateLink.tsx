/**
 * =====================================================================
 * RotaClara — Link de afiliado com registro de clique (LGPD)
 * ---------------------------------------------------------------------
 * Componente CLIENTE: registra o clique em memória (parceiro, tipo,
 * destino e horário — nenhum dado pessoal) antes de abrir o destino.
 * Sem parceiro configurado o href é editorial e o registro continua
 * sendo apenas `kind: "editorial"`, igual a qualquer outro link.
 *
 * O buffer fica em memória do navegador e pode ser substituído por um
 * endpoint quando houver consentimento configurado (ver affiliate.ts).
 * =====================================================================
 */

"use client";

import { registerAffiliateClick } from "@/lib/affiliate/affiliate";
import type { LinkKind, PartnerId } from "@/lib/domain/types";

interface AffiliateLinkProps {
  partner: PartnerId;
  kind: LinkKind;
  destinationSlug?: string | null;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  partner,
  kind,
  destinationSlug = null,
  href,
  className,
  children,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={() => {
        registerAffiliateClick(partner, kind, destinationSlug);
      }}
    >
      {children}
    </a>
  );
}
