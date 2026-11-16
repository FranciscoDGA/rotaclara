/**
 * =====================================================================
 * RotaClara — Metodologia (/metodologia)
 * ---------------------------------------------------------------------
 * Explica como estimativas, fontes, datas de referência e comparações
 * são construídas. É a página que sustenta todas as alegações do site.
 * =====================================================================
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Navigation";
import { Methodology } from "@/components/ui/Notice";
import { ButtonLink, Card } from "@/components/ui/primitives";
import { buildMetadata } from "@/lib/seo/seo";

export const metadata: Metadata = buildMetadata({
  title: "Metodologia",
  description:
    "Como a RotaClara calcula estimativas, escolhe fontes, datada o " +
    "conteúdo e decide o que pode (e o que não pode) ser comparado.",
  path: "/metodologia",
});

const RULES = [
  {
    title: "Estimativa nunca se passa por preço",
    body: "Qualquer valor monetário exibido é rotulado como estimativa, vem com a metodologia ao lado e tem data de referência. Não usamos palavras como “a partir de R$ X” sem deixar claro que é uma faixa de planejamento, não uma oferta.",
  },
  {
    title: "Sem dado, sem número",
    body: "Se não temos uma fonte confiável para algo, o campo aparece como “Sem dado disponível”. Preferimos um buraco honesto a um número inventado que alguém possa levar para o orçamento da viagem.",
  },
  {
    title: "Fonte e data em toda alegação",
    body: "Guias e atrações registram a fonte oficial consultada e a data da consulta. Quando a fonte muda ou cai, o conteúdo é revisado antes de permanecer publicado.",
  },
  {
    title: "Comparação com critério declarado",
    body: "O comparador só marca um destino como com vantagem quando o critério é mensurável e está declarado: custo, distância, duração e volume de conteúdo verificado. Critérios subjetivos ficam sem ranking.",
  },
  {
    title: "Sem inventário em tempo real",
    body: "A v1 não tem integração com reservas. Por isso não exibimos disponibilidade, nota, avaliação ou desconto: não temos esse dado, e simular seria desonesto.",
  },
  {
    title: "Atualização datada",
    body: "Cada página de destino e guia registra a data da última revisão editorial. Datas antigas são um sinal para o leitor de que vale confirmar com a fonte original.",
  },
];

const SOURCES = [
  {
    name: "Ministério do Turismo",
    url: "https://www.gov.br/turismo/pt-br",
    supports: "Referências gerais de turismo, campanhas e dados setoriais.",
  },
  {
    name: "Visit Brasil",
    url: "https://www.visitbrasil.com/",
    supports: "Conteúdo de destinos, rotas e material promocional oficial.",
  },
  {
    name: "INMET",
    url: "https://portal.inmet.gov.br/",
    supports: "Boletins e normais climáticas para a seção de clima mensal.",
  },
  {
    name: "Prefeituras e institutos estaduais de turismo",
    url: "https://www.gov.br/turismo/pt-br",
    supports: "Informações locais de atrações, horários e transporte.",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="rc-container py-10 sm:py-14">
      <Breadcrumbs
        items={[{ label: "Início", href: "/" }, { label: "Metodologia" }]}
      />

      <header className="mt-5 max-w-3xl">
        <p className="rc-eyebrow">Transparência</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#0a1628] sm:text-4xl">
          Metodologia
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#16304f]/80">
          Esta página explica, em linguagem direta, como a RotaClara decide o
          que publicar. Se alguma parte de um guia ou ferramenta parecer
          obscura, o problema é nosso — e esta é a régua para corrigir.
        </p>
      </header>

      <div className="mt-8 max-w-3xl">
        <Methodology referenceDate="2026-11-13">
          <p>
            Toda estimativa de custo desta plataforma é construída a partir de
            faixas de referência por perfil de viagem (econômico, moderado,
            conforto, premium), considerando hospedagem, alimentação,
            transporte local e passeios por pessoa por dia.
          </p>
          <p className="mt-2">
            As faixas são arredondadas de propósito: servem para dimensionar
            um orçamento, não para fechar uma conta. Datas de referência
            aparecem em cada página — os valores de hoje podem não ser os de
            amanhã.
          </p>
        </Methodology>
      </div>

      <section aria-labelledby="regras" className="mt-14">
        <h2
          id="regras"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Regras que seguimos
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {RULES.map((r) => (
            <Card key={r.title} className="h-full">
              <h3 className="text-base font-semibold text-[#0a1628]">
                {r.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#16304f]/85">
                {r.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="ferramentas" className="mt-14 max-w-3xl">
        <h2
          id="ferramentas"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Como cada ferramenta calcula
        </h2>
        <div className="mt-5 space-y-4">
          <Tool
            name="Calculadora de viagem"
            body="Soma aritmética das despesas que você informa. Por pessoa = total ÷ pessoas. Por dia = total ÷ dias. Poupança mensal = déficit do orçamento ÷ meses até a viagem. Nenhum preço é consultado."
            href="/calculadora"
          />
          <Tool
            name="Planejador inteligente"
            body="Combina a faixa diária do destino escolhido com duração, número de viajantes e estilo de viagem para estimar o custo total e distribuir o orçamento em categorias. Mostra os alertas do caso (época, distância, orçamento estourado)."
            href="/planejador"
          />
          <Tool
            name="Comparador"
            body="Lista critérios objetivos com seus valores de origem. Marcamos vantagem apenas em custo, distância, duração e volume de conteúdo — sempre com a razão escrita ao lado. Os demais critérios aparecem sem ranking."
            href="/comparador"
          />
          <Tool
            name="Construtor de roteiro"
            body="Os tempos de visita e custos de cada atividade são estimativas que VOCÊ declara. O roteiro soma esses valores e avisa quando um dia passa de 8 horas de visita. Nada é medido nem consultado."
            href="/roteiro"
          />
        </div>
      </section>

      <section aria-labelledby="fontes" className="mt-14 max-w-3xl">
        <h2
          id="fontes"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Fontes que consultamos
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#736b5b]">
          Cada página de destino lista as fontes específicas com a data da
          consulta. As categorias abaixo são as famílias de fonte que
          usamos com mais frequência.
        </p>

        <ul className="mt-5 space-y-3">
          {SOURCES.map((s) => (
            <li
              key={s.name}
              className="rounded-xl border border-[#e8e3d8] bg-white p-4"
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#0f6f69] underline underline-offset-2"
              >
                {s.name}
              </a>
              <p className="mt-1 text-sm text-[#736b5b]">{s.supports}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-xl border border-[#f3ddb8] bg-[#fdf1dd] p-4">
          <p className="text-sm leading-relaxed text-[#9a6206]">
            <strong>Nota sobre automação:</strong> algumas fontes oficiais
            bloqueiam acesso automatizado. Nesses casos, o conteúdo é
            produzido a partir de material publicado e revisado
            manualmente — e a limitação fica registrada na página do
            destino correspondente.
          </p>
        </div>
      </section>

      <section aria-labelledby="correcoes" className="mt-14 max-w-3xl">
        <h2
          id="correcoes"
          className="text-2xl font-semibold tracking-tight text-[#0a1628]"
        >
          Encontrou algo errado?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#16304f]/85">
          Correções são bem-vindas e têm prioridade. Indique a página e o
          dado questionado — quanto mais específico, mais rápido
          conseguimos revisar.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <ButtonLink href="/contato">Reportar uma correção</ButtonLink>
          <ButtonLink href="/guias" variant="secondary">
            Ver os guias publicados
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-[#736b5b]">
          Última atualização desta página:{" "}
          <time dateTime="2026-11-13">13/11/2026</time>. Veja também a{" "}
          <Link
            href="/sobre"
            className="underline underline-offset-2 text-[#0f6f69]"
          >
            página institucional
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

/* ===================================================================== */

function Tool({
  name,
  body,
  href,
}: {
  name: string;
  body: string;
  href: string;
}) {
  return (
    <div className="rounded-xl border border-[#e8e3d8] bg-white p-5">
      <h3 className="text-base font-semibold text-[#0a1628]">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#16304f]/85">{body}</p>
      <Link
        href={href}
        className="mt-2.5 inline-block text-sm font-medium text-[#0f6f69] underline underline-offset-2"
      >
        Abrir a ferramenta →
      </Link>
    </div>
  );
}
