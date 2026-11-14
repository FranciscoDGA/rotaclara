# Arquitetura — RotaClara

> Como o código está organizado, quais decisões foram tomadas e quais
> invariantes qualquer mudança futura deve preservar.

## 1. Visão geral

```
┌─────────────────────────────────────────────────────────────┐
│  app/ (rotas Next.js)                                       │
│  páginas Server Components + metadata + sitemap/robots      │
└──────────────┬──────────────────────────────────────────────┘
               │ renderiza
┌──────────────▼──────────────────────────────────────────────┐
│  components/ (UI)                                           │
│  primitivas, layout, ferramentas interativas ("use client")  │
└──────┬───────────────────────────────┬──────────────────────┘
       │ chama (funções puras)         │ persiste (store externo)
┌──────▼──────────────┐   ┌────────────▼─────────────────────┐
│  lib/domain/        │   │  lib/storage/                    │
│  regras de negócio  │   │  localStorage via                │
│  SEM React, SEM IO  │   │  useSyncExternalStore            │
└──────▲──────────────┘   └──────────────────────────────────┘
       │ consome
┌──────┴──────────────────────────────────────────────────────┐
│  data/  destinos, guias, listagens — dados tipados e        │
│         estáticos, cada fato relevante com fonte e data     │
└─────────────────────────────────────────────────────────────┘
```

Regra de dependência: **`lib/domain` não importa React, `next` nem nada de
IO.** Ele só conhece `lib/domain/types` e `lib/format`. Isso é o que torna
171 testes rápidos e confiáveis.

## 2. Camadas

### `src/lib/domain/` — cérebro puro

| Módulo | Responsabilidade |
| --- | --- |
| `types.ts` | Todos os tipos do domínio (`Destination`, `Guide`, `PlannerInput`, `Itinerary`…) |
| `calculator.ts` | Soma, divisões, faixas, poupança mensal, `parseBRLAmount` |
| `planner.ts` | Estrutura de viagem: dias, estimativa, fatias de orçamento, alertas |
| `itinerary.ts` | Roteiro imutável: dias, atividades, reordenação, serialização, exportação |
| `compare.ts` | Comparador com critérios objetivos e vantagem sempre justificada |
| `filters.ts` | Filtragem pura + diagnóstico de qual filtro zerou o resultado |

Invariantes do domínio (garantidos por teste):

- Nenhuma função consulta preço, distância ou disponibilidade externa.
- Funções de update são **imutáveis** — devolvem novo objeto; índice inválido
  devolve a **mesma referência** (evita re-render desnecessário).
- Toda estimativa retorna `methodology` + `referenceDate`.
- Resultado inválido é `null` ou `0`, nunca `NaN` nem número fabricado.

### `src/lib/storage/` — estado externo

O roteiro mora no `localStorage`, que é um **sistema externo ao React**. O
padrão adotado é `useSyncExternalStore` (`itineraryStore.ts`):

- leitura acontece fora do ciclo de render (sem `setState` em `useEffect`);
- snapshot de servidor estável → SSR/hidratação sem divergência;
- escuta o evento `storage` (muda em outra aba → a página atualiza);
- falha de leitura/escrita vira `error: true` na UI, mantendo a edição em
  memória — o trabalho do usuário nunca é perdido silenciosamente.

Chave versionada: `rotaclara:itinerary:v1`. Nada sai do navegador.

### `src/lib/seo/` — metadados

- `buildMetadata({ title, description, path, index? })` monta título,
  description, canonical, Open Graph e robots em um só lugar — nenhuma
  página declara metadata à mão.
- Helpers de JSON-LD (Article, FAQPage, BreadcrumbList) para as páginas de
  destino/guia.
- `getSiteUrl()` lê `NEXT_PUBLIC_SITE_URL` com fallback localhost.

### `src/lib/affiliate/` — monetização

- `PARTNERS`: registro público de todos os parceiros suportados, com
  `enabled` derivado **apenas** de variáveis de ambiente.
- `buildOfferLink()`: com parceiro configurado → URL real com parâmetro de
  rastreamento; **sem configuração → link editorial interno** (nunca uma URL
  de rastreamento inventada).
- `registerAffiliateClick()`: buffer em memória, apenas `partner`, `kind`,
  `destinationSlug` e timestamp — nenhum identificador de usuário (LGPD).

### `src/data/` — conteúdo editorial

- `destinations/` (10 destinos em `group-one.ts` + `group-two.ts` + `index.ts`),
  `guides/` (10 guias completos), `listings.ts` (vitrine de hospedagens).
- Cada destino declara `sources[]` com `url` + `consultedAt`, e atrações
  declaram fonte própria.
- `climate.ts` agrega normais climáticas por mês.
- Acessadores (`getDestination`, `getAttractionById`, `getListingsByDestination`)
  são a única forma de consulta — nenhum componente faz `find` solto.

### `src/components/` — UI

- `ui/` primitivas acessíveis (`Button`, `ButtonLink`, `Card`, `Field`,
  `Input`, `Select`, `Textarea`, `Badge`, `EmptyState`, `Notice`,
  `DestinationArt`…). Todo foco visível usa `focus-visible` com contorno
  ciano `#2fb8c4`.
- `tools/` quatro componentes cliente: `CalculatorTool`, `PlannerTool`,
  `ItineraryTool`, `CompareTool`. Eles só orquestram estado — a conta é
  sempre do `lib/domain`.
- `DestinationArt` gera paisagem em SVG a partir da paleta do destino
  (determinística por `seedFromSlug`), sem requisição externa.

## 3. Design system

- **Paleta:** navy `#0a1628` (base), `#16304f` (texto), creme `#faf8f4`
  (fundo), dourado `#dfb45c` (destaque), verde-água `#17827c` (links),
  ciano `#2fb8c4` (foco).
- **Tipografia:** Inter (UI) + Fraunces (títulos) via `next/font/google` —
  sem renderização bloqueante de terceiros.
- **Tokens utilitários:** `rc-container`, `rc-card`, `rc-card-hover`,
  `rc-eyebrow`, `--rc-header-h` (altura fixa do header para âncoras/sticky).
- Responsivo mobile-first; navegação vira menu com controle de teclado,
  fechamento por Esc e bloqueio de scroll do corpo.

## 4. Qualidade

| Comando | O que garante |
| --- | --- |
| `npm run typecheck` | TypeScript strict + `noUncheckedIndexedAccess` |
| `npm run lint` | ESLint 9 + `eslint-config-next` (inclui regras de hooks) |
| `npm test` | Vitest + jsdom + Testing Library |
| `npm run build` | Next build (29 páginas) com checagem de tipos |
| `npm run verify` | Os quatro em sequência — gate antes de qualquer push |

Organização dos testes:

```
tests/
  setup.ts            matchers jest-dom, cleanup, polyfills jsdom
  calculator.test.ts  soma, parsing pt-BR, orçamento
  planner.test.ts     datas, estimativa, fatias, alertas, "não fabrica"
  itinerary.test.ts   imutabilidade, ordem cronológica, sobrecarga, export
  compare.test.ts     sem ranking inventado em critério subjetivo
  filters.test.ts     diagnóstico de filtro sem correspondência
  format.test.ts      moeda/datas pt-BR, robustez NaN
  affiliate.test.ts   modo editorial vs. modo configurado (env simulada)
```

## 5. Decisões registradas

1. **Tailwind 4 (CSS-first)** — sem `tailwind.config.js` obrigatório.
2. **TypeScript 5.9, não 7.x** — evita fricção de tooling com o Next.
3. **ESLint 9, não 10** — `eslint-config-next` ainda vive no ecossistema 9.
4. **Store externo para o roteiro** — regra `react-hooks/set-state-in-effect`
   ativa; `useSyncExternalStore` é o padrão correto para `localStorage`.
5. **Afiliados só com env válida** — sem credencial, link editorial.
6. **Datas editoriais fixas** (`2026-11-13`) em conteúdo estático, para que
   "última atualização" seja auditável e não mude a cada build.

## 6. Compatibilidade com Vercel

- App Router puro, sem APIs legadas misturadas.
- Rotas dinâmicas (`/destinos/[slug]` com `generateStaticParams`,
  `/calculadora`, `/planejador`, `/roteiro`, `/comparador`, `/hospedagens`,
  `/destinos`) funcionam em SSR/ISR sem adaptação.
- `sitemap.ts` e `robots.ts` usam os tipos `MetadataRoute.*` nativos.
- Nenhum filesystem fora do projeto, nenhum processo em background, nenhum
  segredo exigido em runtime.
