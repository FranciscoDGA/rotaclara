# Estratégia de SEO — RotaClara

> Como a plataforma pretende ser encontrada: arquitetura técnica,
> dados estruturados, estratégia de conteúdo e o que **não** fazemos.

## 1. Princípios

1. **Conteúdo que responde de verdade.** Guia de destino é texto útil
   (como chegar, onde ficar, o comer, quando ir), com fonte e data — não
   palavra-chave empilhada.
2. **Indexação limpa.** URLs canônicas, sitemap vivo, sem páginas vazias,
   sem conteúdo duplicado entre `/destinos` e `/destinos/[slug]`.
3. **Veracidade é SEO.** Dados estruturados só declaram o que existe na
   página. Nunca marcamos preço, avaliação ou disponibilidade que não
   exibimos.

## 2. Arquitetura técnica

| Peça | Implementação |
| --- | --- |
| Metadata | `buildMetadata()` centraliza title, description, canonical, OG e robots — uma fonte só, sem divergência entre páginas |
| Sitemap | `src/app/sitemap.ts` — lista todas as rotas com `lastmod` **real** vindo dos dados editoriais (`updatedAt` do guia/destino) |
| Robots | `src/app/robots.ts` — libera tudo, aponta o sitemap, bloqueia URLs de filtro (`/destinos?*`, `/hospedagens?*`) que não agregam em busca |
| 404 | `not-found.tsx` com `noindex` e caminhos reais de volta (nada de beco sem saída) |
| Idioma | `lang="pt-BR"` no `layout.tsx`; conteúdo em português do Brasil |
| Performance | `next/font/google` com `display: swap`, SVG local (zero imagem externa), build estático onde possível |

### URLs

- Amigáveis e estáveis: `/destinos/rio-de-janeiro`, não `/destino?id=3`.
- Filtros de descoberta usam query (`/destinos?regiao=Nordeste`) para serem
  **compartilháveis**, mas ficam fora do sitemap e bloqueados no robots —
  a página canônica indexável é `/destinos`.

## 3. Páginas e intenção de busca

| Rota | Intenção coberta | Tipo de conteúdo |
| --- | --- | --- |
| `/` | marca + orientação | hub editorial |
| `/destinos` | "para onde viajar", filtros | listagem indexável com facetas |
| `/destinos/[slug]` | "[cidade] o que fazer / quando ir / como chegar" | **pilar de conteúdo** — guia completo + FAQ + fontes |
| `/guias` | descoberta de conteúdo | índice por região |
| `/comparador` | "[cidade A] ou [cidade B]" | comparação criteriosa |
| `/calculadora` | "quanto custa viajar para [lugar]" | ferramenta utilitária |
| `/planejador`, `/roteiro` | "como montar roteiro" | ferramentas utilitárias |
| `/metodologia` | confiança/E-E-A-T | transparência de método |
| Institucionais | marca/legal | páginas de apoio |

### Pilar e clusters

Os 10 destinos são **pilares**: cada um reúne guia, atrações, clima mensal,
custos, FAQ e fontes. `/guias` e a homepage fazem o interlinking para eles;
os guias apontam de volta para as ferramentas (comparador, planejador,
calculadora) com âncora contextual — link interno com propósito de
navegação, não enfeite.

## 4. Dados estruturados (JSON-LD)

Implementados em `src/lib/seo/seo.ts` e emitidos nas páginas:

| Tipo | Onde | Conteúdo |
| --- | --- | --- |
| `WebSite` | homepage | nome, URL, ação de busca (quando existir) |
| `Article` / `Guide` | `/destinos/[slug]` | título, autor editorial, datas `datePublished`/`dateModified`, imagem OG |
| `FAQPage` | destino com FAQ | perguntas/repostas **idênticas** ao conteúdo visível |
| `BreadcrumbList` | todas as páginas internas | Início → seção → página |

Regra de ouro: **o JSON-LD espelha o que está na tela.** Se a página não
exibe preço, o dados estruturados não declara `price`.

## 5. Conteúdo e E-E-A-T

- **Fonte e data em toda alegação.** Cada destino e atração registra
  `sources[]` com URL e `consultedAt`; a página exibe a data da revisão.
- **Autoria editorial.** Página "Sobre" + "Metodologia" explicam quem faz e
  como faz — sinais de experiência e transparência.
- **Limitações declaradas.** Dizer "sem dado disponível" em vez de inventar
  número aumenta confiança (e reduz rejeição por conteúdo enganoso).
- **Originalidade.** Arte é SVG gerado; não há imagem de banco terceiro
  repetida em massa nem texto gerado sem revisão.

## 6. Social / Open Graph

- `public/og-default.png` (1200×630, gerado de `og-default.svg`) como imagem
  padrão — marca navy + dourado, promessa de valor, domínio. PNG porque
  redes sociais não renderizam SVG na prévia do link.
- Cada página de destino pode sobrescrever a imagem; `buildMetadata`
  garante URL absoluta (`NEXT_PUBLIC_SITE_URL`).
- Títulos ≤ 60 caracteres e descriptions ≤ 160, escritos à mão por página.

## 7. O que NÃO fazemos

- ❌ Cloaking, keyword stuffing, texto invisível, redirentes em cadeia.
- ❌ Páginas doorway com variação de keyword por cidade sem conteúdo real.
- ❌ Marcar `aggregateRating`, `price` ou `availability` que não existem.
- ❌ Comprar links ou esconder links de afiliado (sempre rotulados e com
  `rel="sponsored"` quando monetizados).
- ❌ Indexar páginas de filtro duplicadas (bloqueio no robots + canonical).

## 8. Métricas e acompanhamento

- **Search Console:** verificar por `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
  (a meta tag só é emitida quando a env existe).
- **Analytics:** GA4 opcional via `NEXT_PUBLIC_GA4_MEASUREMENT_ID`; sem
  valor, nenhum script carrega (e a política de cookies continua verdadeira).
- Revisões de conteúdo: ao atualizar um guia, atualizar `updatedAt` — o
  `lastmod` do sitemap muda automaticamente.

## 9. Próximos passos de SEO (pós-v1)

1. Blog/editorial com artigos de baixa concorrência ligados aos pilares.
2. Imagens reais por destino com `alt` descritivo (hoje, SVG de decoração).
3. `hreflang` apenas quando houver versão em outro idioma (não há na v1).
4. Dados estruturados de `Breadcrumb` validados no Rich Results Test após
   o deploy.
5. Monitorar CTR por query em Search Console após as primeiras 4 semanas.
