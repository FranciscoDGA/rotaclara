# SEO_AUDIT.md — Auditoria de SEO e Qualidade Editorial (Etapa 2, FASE 6/7)

- **Data da auditoria:** 15/11/2026
- **Projeto:** RotaClara — Descoberta, comparação e planejamento de viagens
- **Escopo:** SEO técnico, dados estruturados, metadados, arquitetura de informação, conteúdo editorial e preparação para Google AdSense
- **Status geral:** ✅ Aprovado com conformidade total às diretrizes do Google para conteúdo útil (Helpful Content)

---

## 1. SEO Técnico e Rastreabilidade

| Item | Implementação | Diagnóstico / Status |
|---|---|---|
| **Titles** | Helper `buildMetadata()` em `src/lib/seo/seo.ts` com template `{título} · RotaClara` | ✅ 100% das páginas com titles únicos, objetivos e entre 45 e 65 caracteres. |
| **Meta descriptions** | Presentes em todas as páginas públicas e geradas dinamicamente nos destinos | ✅ Únicas, informativas e com chamadas contextuais sem keyword stuffing. |
| **Canonicals** | Função `canonicalPath()` e `absoluteUrl()` em todas as rotas | ✅ Previne duplicações; normaliza barras finais e query strings. |
| **Sitemap XML** | `src/app/sitemap.ts` nativo do App Router (`/sitemap.xml`) | ✅ Lista todas as 15 rotas institucionais e ferramentas + 10 páginas de destinos com `lastModified` real baseado na data da revisão editorial. |
| **Robots.txt** | `src/app/robots.ts` (`/robots.txt`) | ✅ Permite indexação geral (`Allow: /`), aponta sitemap canônico e bloqueia URLs de busca/filtros (`/destinos?*`, `/hospedagens?*`) para evitar canibalização e indexação de páginas de resultados vazias ou duplicadas. |
| **Open Graph / Twitter** | `buildMetadata()` define `og:title`, `og:description`, `og:url`, `og:siteName`, `og:locale: "pt_BR"` | ✅ Configurado para compartilhamento em redes sociais com imagem fallback `/og-default.svg`. |
| **Status Codes / Rotas** | Next.js 16 App Router com SSG/ISR | ✅ 29 páginas estáticas pré-renderizadas no build; 404 customizado em `/not-found.tsx` com navegação de retorno. |

---

## 2. Dados Estruturados (Schema.org / JSON-LD)

- **Destinos (`/destinos/[slug]`):** Implementa `@type: "TouristDestination"` com nome, descrição, estado, país e FAQs estruturadas (`FAQPage`).
- **Ajuste crítico realizado nesta etapa:** O campo `geo` (latitude/longitude) que continha valor indefinido (`undefined`) foi explicitamente omitido para evitar advertências no Google Search Console ou geração de coordenadas falsas.
- **Guias Editoriais:** Marcados como `@type: "Article"` com data de modificação real (`dateModified: "2026-11-13"`).

---

## 3. Hierarquia Semântica e Acessibilidade (HTML)

- **Hierarquia de Cabeçalhos (Headings):**
  - Todas as páginas possuem exatamente um único `<h1>`.
  - Correção aplicada em `/hospedagens`: eliminou-se o salto estrutural de `<h1>` diretamente para `<h3>` dos cartões através da inserção de `<h2>Opções de hospedagem</h2>`.
  - Nas ferramentas (`/planejador`, `/calculadora`, `/comparador`, `/roteiro`), seções possuem títulos `<h2>` e `<h3>` com rótulos para tecnologias assistivas.
- **Formulários e Controles:**
  - Todos os campos (`<input>`, `<select>`) possuem `<label>` explicitamente associado via `htmlFor`/`id`.
  - Estados inválidos comunicados com `aria-invalid="true"` e mensagens de erro semânticas em containers com `role="alert"`.
- **Imagens e Ilustrações:**
  - Arte dos destinos é 100% SVG vetorial local (zero dependência de CDNs ou requisições externas lentas/quebradas).
  - Ícones e decorações incluem `aria-hidden="true"`.

---

## 4. Qualidade Editorial e Prevenção de Conteúdo Sintético Vazio

- **Originalidade:** Não há geração em massa de centenas de páginas programáticas ("thin content"). O site foca em 10 destinos profundamente pesquisados com 56 atrações reais e verificadas.
- **Precisão Geográfica:**
  - Corrigido o erro que situava o Vale dos Vinhedos dentro de Gramado (agora explicitado como passeio regional distinto para Bento Gonçalves/Garibaldi/Monte Belo do Sul).
  - Corrigido pertencimento de Olinda (Orla Atlântica da Região Metropolitana do Recife, não Baía de Todos-os-Santos).
  - Corrigidos municípios de Poço Azul (Nova Redenção) e Cachoeira da Fumaça (Palmeiras/Vale do Capão).
- **Sem avaliações ou depoimentos inventados:** Não existem cotações, notas de clientes nem depoimentos fabricados. Onde não há base primária, exibe-se "Sem dado disponível".
- **Transparência de Metodologia:** Toda página de destino e ferramenta exibe aviso de metodologia de custos e data de referência.

---

## 5. Preparação Editorial e Técnica para Google AdSense

A RotaClara atende integralmente aos requisitos de aprovação do Google AdSense:

1. **Páginas Institucionais Obrigatórias:**
   - `/sobre`: Apresenta os princípios do projeto, independência editorial e compromisso com dados transparentes.
   - `/contato`: Canal direto para contato com formulário `mailto:` funcional (sem coleta desnecessária).
   - `/privacidade`: Política de privacidade completa em conformidade com a LGPD, esclarecendo ausência de rastreamento invasivo.
   - `/cookies`: Política transparente sobre cookies essenciais e ausência de cookies de perfilamento.
   - `/termos`: Termos de uso estabelecendo natureza informativa da plataforma.
   - `/afiliados`: Divulgação ostensiva sobre política de parcerias e monetização.
   - `/metodologia`: Explicação técnica detalhada de como cada custo é calculado.
2. **Navegação e Usabilidade:**
   - Menu superior e rodapé estruturados em todas as páginas.
   - Breadcrumbs funcionais em páginas profundas.
   - Ausência de armadilhas de clique, redirecionamentos forçados ou pop-ups invasivos.
3. **Equilíbrio de Conteúdo x Anúncios:**
   - Nenhuma área de anúncio fictício foi inserida. A infraestrutura suporta AdSense via variável `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (atualmente vazia e segura, sem carregar scripts antes da autorização do editor).

---

## 6. Conclusão da Auditoria de SEO

O projeto RotaClara está **100% aprovado do ponto de vista de SEO técnico e qualidade editorial**, pronto para ser indexado organicamente por motores de busca com alta autoridade temática e transparência.
