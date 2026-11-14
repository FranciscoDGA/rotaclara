# Roadmap — RotaClara

> Estado real do produto. "Pronto" significa: implementado, com typecheck,
> lint, testes e build passando (`npm run verify`), não apenas desenhado.

## ✅ v1 — Completa (13/11/2026)

### Produto

| Entrega | Estado | Observação |
| --- | --- | --- |
| Homepage com busca e caminhos reais | ✅ | Hero, destaques por perfil, guias recentes |
| Descobrir destinos com filtros | ✅ | Busca sem acento, região, estado, tags, orçamento, duração, época — sincronizados na URL; explica **qual** filtro zerou a lista |
| 10 páginas de destino | ✅ | Guia, atrações, clima mensal, custos, fontes com data, FAQ, JSON-LD |
| 10 guias editoriais completos | ✅ | Índice em `/guias` por região, com data de atualização |
| Comparador (até 3 destinos) | ✅ | Vantagem só em critério mensurável, com razão declarada |
| Planejador inteligente | ✅ | Estrutura de dias, estimativa com metodologia, fatias de orçamento, alertas |
| Calculadora de viagem | ✅ | Soma, por pessoa/dia, orçamento e poupança mensal; parsing pt-BR |
| Construtor de roteiro | ✅ | Dias/atividades, sobrecarga >8h, exportar texto/.txt, salvo no navegador |
| Hospedagens e experiências | ✅ | Vitrine sem preço inventado, filtros, links editoriais/afiliados rotulados |
| Páginas institucionais | ✅ | Sobre, Contato (mailto), Metodologia, Afiliados, Privacidade, Cookies, Termos |
| SEO técnico | ✅ | `sitemap.ts` com `lastmod` real, `robots.ts`, 404 com caminhos de volta, OG padrão, dados estruturados |
| Responsividade | ✅ | Mobile-first, menu acessível (teclado, Esc, scroll lock) |
| Identidade visual | ✅ | Navy + creme + dourado das referências; bússola; Inter + Fraunces |

### Engenharia

| Item | Estado |
| --- | --- |
| TypeScript strict + `noUncheckedIndexedAccess` | ✅ |
| ESLint 9 (inclui regras de hooks) | ✅ 0 erros |
| 171 testes (7 arquivos) — domínio, formatação, afiliados | ✅ |
| `npm run verify` (typecheck + lint + test + build) | ✅ |
| Build: 29 páginas geradas | ✅ |
| Documentação: README, ARCHITECTURE, SEO_STRATEGY, DATA_SOURCES, MONETIZATION, ROADMAP, `.env.example` | ✅ |
| Camada de afiliados com fallback editorial | ✅ |
| Persistência do roteiro via `useSyncExternalStore` | ✅ |

### Bugs reais corrigidos durante os testes

- Parsing de valor `99.90` era lido como `9990` (formato brasileiro
  assumido cegamente) → `parseBRLAmount` com regras declaradas.
- `isPartnerEnabled` comparava com `!== null` e ativava parceiros **sem
  nenhuma configuração** → correção para checagem de verdade (`Boolean`).
- `addActivity` podia deixar atividades fora da ordem cronológica do dia
  → inserção com sort estável por parte do dia.
- `reorderActivities` com índice inválido criava objeto novo sem necessidade
  → devolve a mesma referência.

## 🔜 Próximo — v1.1 (curto prazo)

| Item | Por quê |
| --- | --- |
| Imagens reais por destino (com `alt` e crédito) | Hoje a arte é SVG de decoração; foto real aumenta CTR e confiança |
| Busca na homepage com sugestões (`/destinos?q=`) | Conectar hero ao explorador |
| Mais 10 destinos + guias | Cobertura Nordeste/Sul mais funda (Jalapão, Pipa, Florianópolis…) |
| Validação de JSON-LD no Rich Results Test | Depois do primeiro deploy |
| Search Console + GA4 (via env) | Medir antes de especular |
| Compartilhar roteiro por link (exportar/importar JSON) | Colaboração sem backend — arquivo local |
| Modo offline do roteiro (PWA básica) | Ferramenta utilitária pede resiliência |

## 📅 v2 — Depois do produto validar

- **Backend mínimo:** contas opcionalais, roteiros na nuvem, favoritos.
- **Integração real de preços:** só com parceiro/API que forneça dado
  verificável — e aí sim exibir preço, sempre com origem e hora da consulta.
- **Mapas:** camada de mapa leve (ex.: Leaflet + OSM) nos guias.
- **Newsletter editorial:** guias novos por e-mail (com consentimento).
- **IA de roteiro:** sugestão de dias com fontes declaradas — nunca
  inventando atração fora da base.
- **Internacionalização:** `hreflang` + versão ES/EN (hoje, só pt-BR).

## ⛔ Fora de escopo permanente

- Reservas, pagamentos ou intermediação com provedores (não somos agência).
- Ranking sem critério declarado ("10 melhores" sem metodologia).
- Preço/disponibilidade inventado — em qualquer versão.
- Cadastro obrigatório para usar as ferramentas.

---

**Regra de atualização deste arquivo:** ao concluir um item, mova-o para o
status com a data real de conclusão — não antes.
