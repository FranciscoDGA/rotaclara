# RotaClara

**Descoberta, comparação e planejamento de viagens — com estimativas transparentes.**

A RotaClara é uma plataforma em português (Brasil primeiro) para quem está
planejando uma viagem e precisa de **decisões claras**: descobrir destinos,
compará-los lado a lado, calcular orçamento e montar um roteiro — sempre com
números que explicamos, nunca com preços inventados.

> **Princípio inegociável:** não exibimos preço, disponibilidade ou avaliação
> que não tenhamos. Toda estimativa vem com **metodologia e data de
> referência**. Quando não há dado confiável, a página diz “sem dado
> disponível”.

---

## Rotas disponíveis

| Rota | O que faz |
| --- | --- |
| `/` | Homepage: busca, destaques e caminhos para começar |
| `/destinos` | Descoberta com filtros (perfil, região, orçamento, duração, época) |
| `/destinos/[slug]` | Página do destino: guia, clima mensal, atrações, custos, fontes |
| `/comparador` | Até 3 destinos lado a lado, critério a critério |
| `/planejador` | Estrutura de viagem com estimativas explicadas e alertas |
| `/calculadora` | Calculadora de orçamento com poupança mensal |
| `/roteiro` | Construtor de roteiro dia a dia (salvo no navegador) |
| `/hospedagens` | Vitrine editorial de estadias e experiências (afiliados rotulados) |
| `/guias` | Índice dos guias editoriais por região |
| `/metodologia` | Como cada ferramenta calcula e o que pode (e não pode) ser comparado |
| `/sobre`, `/contato`, `/afiliados`, `/privacidade`, `/cookies`, `/termos` | Institucionais |
| `/sitemap.xml`, `/robots.txt`, 404 | SEO técnico |

---

## Stack

| Tecnologia | Versão |
| --- | --- |
| Next.js (App Router, Turbopack) | 16.4.6 |
| React / React DOM | 19.3.1 |
| TypeScript (strict) | 5.9.3 |
| Tailwind CSS | 4.3.5 |
| ESLint | 9.39.5 |
| Vitest + Testing Library + jsdom | 5.1.0 |

Sem Docker, sem CMS, sem ORM, sem serviços pagos obrigatórios. Arte de
destinos é SVG gerado localmente — zero requisições externas de imagem.

---

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Desenvolvimento
npm run dev            # http://localhost:3000

# 3. Qualidade (o mesmo que a CI executa)
npm run typecheck      # tsc --noEmit
npm run lint           # eslint .
npm test               # vitest run (171 testes)
npm run build          # next build (29 páginas)

# 4. Tudo de uma vez
npm run verify         # typecheck + lint + test + build
```

### Variáveis de ambiente

Todas são **opcionais** — o site funciona sem nenhuma. Copie o exemplo:

```bash
cp .env.example .env.local
```

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica em sitemap/canonical/Open Graph |
| `NEXT_PUBLIC_SITE_NAME` | Nome nos metadados |
| `STAY22_PUBLISHER_ID`, `BOOKING_AFFILIATE_ID`, … | Ativam links de afiliado (sem valor → link editorial) |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Análise/anúncio (vazio → nada é carregado) |

Nunca coloque valores reais em `.env.example` ou no repositório.

---

## Estrutura

```
src/
  app/            rotas App Router (páginas, metadata, sitemap, robots, 404)
  components/
    ui/           primitivas acessíveis (Button, Card, Field, Badge…)
    layout/       Header, Footer, Breadcrumbs, Navigation
    home/         blocos da homepage
    tools/        calculadora, planejador, comparador, construtor de roteiro
    destinations/ explorador de destinos com filtros
    institutional/ formulário de contato (mailto)
  lib/
    domain/       regras de negócio PURAS (testáveis, sem React nem IO)
    storage/      store externo do roteiro (localStorage via useSyncExternalStore)
    seo/          metadata, canonical, JSON-LD
    affiliate/    parceiros + construção de links (config por env)
    format/       moeda, datas, números (pt-BR)
    ui/           utilitários (cn)
  data/           destinos (10), guias (10), listagens — tipados, com fontes
tests/            7 arquivos, 171 testes (domínio + afiliados + formatação)
```

Detalhes em [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Documentação

| Arquivo | Conteúdo |
| --- | --- |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Camadas, decisões e invariantes do código |
| [`SEO_STRATEGY.md`](./SEO_STRATEGY.md) | Estratégia de indexação, dados estruturados e conteúdo |
| [`DATA_SOURCES.md`](./DATA_SOURCES.md) | Fontes consultadas, limitações e política de revisão |
| [`MONETIZATION.md`](./MONETIZATION.md) | Afiliados, rótulos e o que nunca faremos |
| [`ROADMAP.md`](./ROADMAP.md) | O que está pronto, o que vem depois |
| [`PLAN.md`](./PLAN.md) | Plano de execução original e decisões de stack |
| [`.env.example`](./.env.example) | Todas as variáveis documentadas |

---

## Verdade sobre os números

- **Estimativa ≠ preço.** Valores de custo são faixas de referência por
  perfil, com metodologia declarada e data de referência (v1: 13/11/2026).
- **Sem inventário em tempo real.** A v1 não tem integração de reservas —
  por isso não há nota, desconto ou disponibilidade.
- **Comparação sem ranking inventado.** Vantagem só é marcada em critério
  mensurável (custo, distância, duração, volume de conteúdo), sempre com a
  razão escrita.
- **Afiliados rotulados.** Sem parceiro configurado, o link é editorial.

Leia a [metodologia completa](https://rotaclara.com.br/metodologia) antes de
usar qualquer número para planejar dinheiro.

## Licença

Conteúdo e código — RotaClara. Veja os [termos de uso](./src/app/termos/page.tsx).
