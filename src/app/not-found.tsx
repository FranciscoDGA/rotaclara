/**
 * =====================================================================
 * RotaClara — Página não encontrada (404)
 * ---------------------------------------------------------------------
 * Oferece caminhos reais de volta: busca por destino, ferramentas e
 * guias. Sem link morto.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { allDestinations } from "@/data/destinations";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Página não encontrada",
  description:
    "A página que você procura não existe. Volte para a busca de " +
    "destinos ou use uma das ferramentas de planejamento.",
  path: "/404",
  index: false,
});

const SUGGESTED_PATHS = [
  {
    href: "/destinos",
    title: "Descobrir destinos",
    description: "Filtre por perfil, região, orçamento e época do ano.",
  },
  {
    href: "/planejador",
    title: "Planejador inteligente",
    description: "Monte a estrutura da viagem com estimativas explicadas.",
  },
  {
    href: "/calculadora",
    title: "Calculadora de viagem",
    description: "Calcule o total e quanto guardar por mês.",
  },
  {
    href: "/guias",
    title: "Guias editoriais",
    description: "Todo o conteúdo publicado, agrupado por região.",
  },
];

export default function NotFound() {
  // Sugere alguns destinos reais para quem caiu aqui num link quebrado.
  const suggestions = allDestinations.slice(0, 6);

  return (
    <div className="rc-container py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="rc-eyebrow">Erro 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-5xl">
          Esta página não existe
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          O endereço pode ter mudado ou o link está desatualizado. Use um dos
          caminhos abaixo para continuar planejando.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-xl bg-[#0a1628] px-5 text-sm font-medium text-white transition-colors hover:bg-[#0f2138] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            Ir para a página inicial
          </Link>
          <Link
            href="/destinos"
            className="inline-flex h-11 items-center rounded-xl border border-[#e8e3d8] bg-white px-5 text-sm font-medium text-[#0a1628] transition-colors hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
          >
            Buscar um destino
          </Link>
        </div>
      </div>

      <section aria-labelledby="atalhos" className="mt-14">
        <h2
          id="atalhos"
          className="text-xl font-semibold tracking-tight text-[#0a1628]"
        >
          Continue por aqui
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {SUGGESTED_PATHS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rc-card rc-card-hover group focus-visible:outline-3 focus-visible:outline-[#2fb8c4] focus-visible:outline-offset-2"
            >
              <span className="block text-base font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
                {p.title}
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-[#736b5b]">
                {p.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="destinos-sugestao" className="mt-14">
        <h2
          id="destinos-sugestao"
          className="text-xl font-semibold tracking-tight text-[#0a1628]"
        >
          Destinos em destaque
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.slice(0, 3).map((d) => (
            <Link
              key={d.slug}
              href={`/destinos/${d.slug}`}
              className="group flex items-center gap-3.5 rounded-2xl border border-[#e8e3d8] bg-white p-3 transition-colors hover:border-[#16304f]/40 hover:bg-[#faf8f4] focus-visible:outline-3 focus-visible:outline-[#2fb8c4]"
            >
              {d.image && (
                <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-[#0a1628]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.image.src}
                    alt={d.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="min-w-0">
                <span className="block text-sm font-semibold text-[#0a1628] group-hover:text-[#0f6f69]">
                  {d.name}
                </span>
                <span className="text-xs text-[#736b5b]">
                  {d.stateUF} · {d.region}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
