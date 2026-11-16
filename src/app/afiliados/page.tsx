/**
 * =====================================================================
 * RotaClara — Política de afiliados (/afiliados)
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { AffiliateDisclosure } from "@/components/ui/Notice";
import { Card } from "@/components/ui/primitives";
import { PARTNERS } from "@/lib/affiliate/affiliate";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de afiliados",
  description:
    "Como funcionam os links de afiliado da RotaClara, quais parceiros " +
    "são suportados e o que isso não significa para você.",
  path: "/afiliados",
});

export default function AfiliadosPage() {
  const configured = PARTNERS.filter((p) => p.enabled);
  const notConfigured = PARTNERS.filter((p) => !p.enabled);

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Afiliados" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Política de afiliados
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          A RotaClara pode receber comissão de parceiros. Esta página explica
          exatamente quando isso acontece, como os links são rotulados e o
          que isso não significa para você.
        </p>
      </header>

      <div className="mt-6 max-w-3xl">
        <AffiliateDisclosure />
      </div>

      <section aria-labelledby="como-funciona" className="mt-12 max-w-3xl">
        <h2
          id="como-funciona"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como funciona
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#16304f]/85">
          <p>
            Quando você acessa um link marcado como{" "}
            <strong>(afiliado)</strong>, o parceiro pode registrar que a
            visita veio daqui e, se você concluir uma reserva, pagar uma
            comissão a nós.{" "}
            <strong>O preço que você paga é o mesmo de sempre</strong> — a
            comissão sai do bolso do parceiro, não do seu.
          </p>
          <p>
            <strong>Isso não influencia o conteúdo.</strong> Um destino não
            entra num guia, nem ganha posição em comparação, por ter parceiro
            afiliado. Nossa régua editorial é a mesma para todos: fonte,
            data, metodologia e utilidade para quem viaja.
          </p>
          <p>
            Quando <strong>nenhum parceiro está configurado</strong>, os
            links são editoriais e apontam para as nossas próprias páginas
            (guia do destino, planejador, comparador). Nesta situação não há
            qualquer comissão envolvida.
          </p>
        </div>
      </section>

      <section aria-labelledby="rotulos" className="mt-12 max-w-3xl">
        <h2
          id="rotulos"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como identificar cada link
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card>
            <span className="inline-block rounded-full border border-[#e8e3d8] bg-[#faf8f4] px-3 py-1 text-xs font-medium text-[#16304f]">
              Link editorial
            </span>
            <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
              Aponta para uma página da RotaClara — guia do destino,
              planejador, comparador. Sem comissão, sem rastreamento
              comercial.
            </p>
          </Card>
          <Card>
            <span className="inline-block rounded-full border border-[#f3ddb8] bg-[#fdf1dd] px-3 py-1 text-xs font-medium text-[#9a6206]">
              Link (afiliado)
            </span>
            <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
              Leva ao site de um parceiro, com parâmetro de rastreamento
              quando disponível. Rotulado com a palavra “afiliado” no próprio
              link.
            </p>
          </Card>
        </div>
      </section>

      <section aria-labelledby="parceiros" className="mt-12 max-w-3xl">
        <h2
          id="parceiros"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Parceiros suportados
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#736b5b]">
          A arquitetura já suporta os parceiros abaixo. A ativação depende da
          configuração da variável de ambiente correspondente — sem
          configuração, o link permanece editorial.
        </p>

        <ul className="mt-5 space-y-3">
          {PARTNERS.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e8e3d8] bg-white p-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0a1628]">{p.name}</p>
                <a
                  href={p.baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block truncate text-xs text-[#0f6f69] underline underline-offset-2"
                >
                  {p.baseUrl}
                </a>
              </div>
              <span
                className={
                  p.enabled
                    ? "rounded-full border border-[#bfe3e1] bg-[#e6f4f4] px-3 py-1 text-xs font-medium text-[#0b4744]"
                    : "rounded-full border border-[#e8e3d8] bg-[#faf8f4] px-3 py-1 text-xs font-medium text-[#736b5b]"
                }
              >
                {p.enabled ? "Configurado" : "Não configurado"}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl border border-[#bfe3e1] bg-[#e6f4f4] p-4 text-sm leading-relaxed text-[#0b4744]">
          {configured.length === 0 ? (
            <>
              Nenhum parceiro está configurado no momento — todos os links da
              plataforma são editoriais e nenhuma comissão é gerada.
            </>
          ) : (
            <>
              {configured.length}{" "}
              {configured.length === 1 ? "parceiro está configurado" : "parceiros estão configurados"}{" "}
              no momento ({configured.map((p) => p.name).join(", ")}).{" "}
              {notConfigured.length > 0 && (
                <>
                  Os demais permanecem com link editorial até a configuração
                  correspondente.
                </>
              )}
            </>
          )}
        </div>
      </section>

      <section aria-labelledby="lgpd" className="mt-12 max-w-3xl">
        <h2
          id="lgpd"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Privacidade e rastreamento
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#16304f]/85">
          <p>
            Ao clicar num link de afiliado, você é direcionado ao site do
            parceiro, onde vale a política de privacidade dele. A RotaClara
            não envia dados pessoais junto com esses links na v1.
          </p>
          <p>
            Detalhes sobre o que fica gravado no seu navegador estão na{" "}
            <Link
              href="/privacidade"
              className="font-medium text-[#0f6f69] underline underline-offset-2"
            >
              política de privacidade
            </Link>
            .
          </p>
        </div>

        <p className="mt-6 text-xs text-[#736b5b]">
          Última atualização:{" "}
          <time dateTime="2026-11-13">13/11/2026</time>.
        </p>
      </section>
    </div>
  );
}
