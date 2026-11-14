/**
 * =====================================================================
 * RotaClara — Rodapé
 * ---------------------------------------------------------------------
 * Inclui as páginas institucionais exigidas para a solicitação ao
 * AdSense: privacidade, cookies, termos, afiliados e contato.
 * =====================================================================
 */

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { getDestinationStats } from "@/data/destinations";

const PRODUCT_LINKS = [
  { href: "/destinos", label: "Descobrir destinos" },
  { href: "/planejador", label: "Planejador inteligente" },
  { href: "/calculadora", label: "Calculadora de viagem" },
  { href: "/comparador", label: "Comparador de destinos" },
  { href: "/roteiro", label: "Construtor de roteiros" },
  { href: "/hospedagens", label: "Hospedagens e experiências" },
] as const;

const CONTENT_LINKS = [
  { href: "/guias", label: "Guias de destinos" },
  { href: "/destinos", label: "Todos os destinos" },
  { href: "/destinos?perfil=economico", label: "Viagens econômicas" },
  { href: "/destinos?perfil=familia", label: "Viagens em família" },
  { href: "/destinos?perfil=romantico", label: "Viagens para casais" },
  { href: "/destinos?perfil=natureza", label: "Natureza e aventura" },
] as const;

const INSTITUTIONAL_LINKS = [
  { href: "/sobre", label: "Sobre a RotaClara" },
  { href: "/contato", label: "Contato" },
  { href: "/metodologia", label: "Metodologia e fontes" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacidade", label: "Política de privacidade" },
  { href: "/cookies", label: "Política de cookies" },
  { href: "/termos", label: "Termos de uso" },
  { href: "/afiliados", label: "Divulgação de afiliados" },
] as const;

export function Footer() {
  const stats = getDestinationStats();
  const year = new Date().getFullYear();

  return (
    <footer className="rc-no-print mt-20 border-t border-[#0f2138] bg-[#0a1628] text-white">
      <div className="rc-container py-14">
        {/* Cabeçalho do rodapé */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo size={40} variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Plataforma brasileira de descoberta, comparação e planejamento de
              viagens. Ajudamos você a decidir para onde ir, quanto gastar e
              como organizar melhor o seu tempo.
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/50">
                  Destinos
                </dt>
                <dd className="text-xl font-semibold text-[#dfb45c]">
                  {stats.total}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/50">
                  Estados
                </dt>
                <dd className="text-xl font-semibold text-[#dfb45c]">
                  {stats.states}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-white/50">
                  Atrações mapeadas
                </dt>
                <dd className="text-xl font-semibold text-[#dfb45c]">
                  {stats.attractions}
                </dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Rodapé — produto" className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-14">
            <FooterColumn title="Ferramentas" links={PRODUCT_LINKS} />
            <FooterColumn title="Conteúdo" links={CONTENT_LINKS} />
            <FooterColumn title="Institucional" links={INSTITUTIONAL_LINKS} />
          </nav>
        </div>

        {/* Aviso de estimativas e afiliados */}
        <div className="grid gap-6 border-b border-white/10 py-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-[#dfb45c]">
              Sobre nossos valores
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              Os valores exibidos em ferramentas de cálculo são estimativas de
              planejamento com metodologia e data de referência visíveis. Não
              vendemos, reservamos ou garantimos preços de passagens, hotéis ou
              passeios. Confirme sempre com os provedores antes de reservar.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#dfb45c]">
              Transparência comercial
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              A RotaClara pode receber comissão de parceiros quando você acessa
              um link marcado como afiliado. Isso não altera o preço que você
              paga nem influencia nossas recomendações editoriais. Saiba mais
              na página de{" "}
              <Link
                href="/afiliados"
                className="underline underline-offset-2 hover:text-white"
              >
                divulgação de afiliados
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Rodapé — legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/60 transition-colors hover:text-white focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-white/50">
            © {year} RotaClara. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: readonly { href: string; label: string }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2 rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
