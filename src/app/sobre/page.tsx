/**
 * =====================================================================
 * RotaClara — Sobre (/sobre)
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { ButtonLink, Card } from "@/components/ui/primitives";
import { getDestinationStats } from "@/data/destinations";
import { allGuides } from "@/data/guides";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre a RotaClara",
  description:
    "O que é a RotaClara, como trabalhamos com estimativas transparentes " +
    "e por que não mostramos preços inventados.",
  path: "/sobre",
});

const PRINCIPLES = [
  {
    title: "Nada de número inventado",
    body: "Não exibimos preço, disponibilidade ou avaliação que não tenhamos. Quando não há dado confiável, dizemos “sem dado disponível” — é melhor do que preencher a tela com uma estimativa disfarçada de realidade.",
  },
  {
    title: "Estimativa é estimativa",
    body: "Toda conta da plataforma vem com metodologia e data de referência visíveis. Você sabe exatamente de onde veio o número e o que ele considera (e o que não considera).",
  },
  {
    title: "Sem ranking inventado",
    body: "Comparamos critério a critério e marcamos vantagem apenas quando há diferença mensurável e o critério é declarado. Não publicamos “os 10 melhores destinos” sem base transparente.",
  },
  {
    title: "Independência editorial",
    body: "Links de afiliados são sempre rotulados. Quando um parceiro não está configurado, o link é editorial e aponta para o nosso guia. A comissão nunca decide o que entra num guia.",
  },
];

export default function SobrePage() {
  const stats = getDestinationStats();

  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Institucional</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Sobre a RotaClara
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          A RotaClara existe para transformar a fase de planejamento da viagem
          — a mais confusa — em decisões claras. Você compara destinos,
          calcula orçamento e monta roteiro com números que explicamos, não
          com promessas que não podemos cumprir.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Destinos na base" value={String(stats.total)} />
        <Stat label="Estados cobertos" value={String(stats.states)} />
        <Stat label="Guias editoriais" value={String(allGuides.length)} />
      </div>

      <section aria-labelledby="principios" className="mt-14 max-w-4xl">
        <h2
          id="principios"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como trabalhamos
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <Card key={p.title} className="h-full">
              <h3 className="text-base font-semibold text-[#0a1628]">
                {p.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#16304f]/85">
                {p.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="como-funciona" className="mt-14 max-w-3xl">
        <h2
          id="como-funciona"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          O que você encontra por aqui
        </h2>
        <ul className="mt-5 space-y-4">
          <Item
            title="Descoberta com filtro de verdade"
            body="Filtre destinos por perfil, região, orçamento diário, duração e época do ano — e veja qual filtro não tem dados, em vez de uma lista vazia."
            href="/destinos"
            cta="Explorar destinos"
          />
          <Item
            title="Comparador sem ranking inventado"
            body="Até três destinos lado a lado, critério a critério, com a razão declarada de cada vantagem marcada."
            href="/comparador"
            cta="Comparar destinos"
          />
          <Item
            title="Ferramentas de planejamento"
            body="Calculadora de orçamento, planejador inteligente e construtor de roteiro — todos com metodologia visível e nada de cotação falsa."
            href="/planejador"
            cta="Abrir planejador"
          />
          <Item
            title="Guias editoriais com fontes"
            body="Cada guia registra as fontes consultadas, a data da consulta e as limitações do próprio conteúdo."
            href="/guias"
            cta="Ver guias"
          />
        </ul>
      </section>

      <section aria-labelledby="transparencia" className="mt-14 max-w-3xl">
        <h2
          id="transparencia"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Transparência
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#16304f]/85">
          <p>
            A RotaClara pode receber comissão de parceiros quando você acessa
            um link marcado como afiliado. Isso não altera o preço que você
            paga nem influencia as recomendações editoriais. Você encontra os
            detalhes na nossa página de{" "}
            <Link
              href="/afiliados"
              className="font-medium text-[#17827c] underline underline-offset-2"
            >
              política de afiliados
            </Link>
            .
          </p>
          <p>
            Sobre a privacidade: a v1 não exige cadastro e não envia dados
            pessoais para servidores. O roteiro que você monta fica gravado
            apenas no armazenamento local do seu navegador. Veja a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-[#17827c] underline underline-offset-2"
            >
              política de privacidade
            </Link>
            .
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <ButtonLink href="/metodologia">Ler a metodologia</ButtonLink>
          <ButtonLink href="/contato" variant="secondary">
            Falar com a gente
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

/* ===================================================================== */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#8c8471]">
        {label}
      </p>
      <p className="mt-1.5 text-2xl font-semibold text-[#0a1628]">{value}</p>
    </div>
  );
}

function Item({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <li className="rounded-xl border border-[#e8e3d8] bg-white p-5">
      <h3 className="text-base font-semibold text-[#0a1628]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">{body}</p>
      <Link
        href={href}
        className="mt-3 inline-block text-sm font-medium text-[#17827c] underline underline-offset-2"
      >
        {cta} →
      </Link>
    </li>
  );
}
