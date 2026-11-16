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

## ✅ Etapa 2 — Auditoria Geral, Correções e Confiabilidade (15/11/2026)

| Auditoria & Correção | Estado | Observação |
| --- | --- | --- |
| **Auditoria Geográfica & Editorial** | ✅ | Gramado dissociado geograficamente do Vale dos Vinhedos (tratado como deslocamento intermunicipal); Cristo Redentor marcado como pago com faixas reais; Olinda vinculada ao Atlântico; Poço Azul retificado para Nova Redenção; Cachoeira da Fumaça no Vale do Capão (Palmeiras); José Lins do Rego em Tambauzinho (`DESTINATION_AUDIT.md`). |
| **Metodologia de Custos** | ✅ | Formalizada transparência por perfil (econômico, moderado, confortável); distinção de valores estimados vs confirmados (`COST_METHODOLOGY.md`). |
| **Fontes & Confiabilidade** | ✅ | 60 URLs auditadas; remoção de links mortos e substituição por órgãos governamentais/oficiais (`DATA_SOURCES.md`). |
| **Robustez das Ferramentas** | ✅ | Calculadora valida valores negativos e textos com `rowIssues`; Comparador corrigido em off-by-one de meses (0–11) e concordância de texto; Planejador com rótulos acentuados (`TEST_REPORT.md`). |
| **Monetização & Stay22** | ✅ | Integração Stay22 adaptada para o padrão oficial `/allez/roam?aid=...&address=...`; componente `AffiliateLink.tsx` com logging de clique compatível com LGPD; fallback editorial garantido sem credenciais (`MONETIZATION_AUDIT.md`). |
| **SEO & Acessibilidade** | ✅ | Sitemap e robots auditados; eliminação de salto de cabeçalhos em `/hospedagens` (H1→H2→H3); páginas institucionais prontas para AdSense (`SEO_AUDIT.md`). |
| **Suíte de Testes** | ✅ | Expandida para 178 testes unitários e de integração no Vitest, todos passando. |
| **Documentação Técnica** | ✅ | `AUDIT_BEFORE.md`, `AUDIT_AFTER.md`, `DESTINATION_AUDIT.md`, `COST_METHODOLOGY.md`, `DATA_SOURCES.md`, `MONETIZATION_AUDIT.md`, `SEO_AUDIT.md`, `TEST_REPORT.md` e `ROADMAP.md`. |

## ✅ Preparação Avançada do Produto (Frentes Estratégicas Concluídas)

| Entrega | Estado | O que foi entregue |
| --- | --- | --- |
| **1. Diagnóstico Inteligente de Viagem** | ✅ | Rota dedicada `/diagnostico` e componente `DiagnosisTool.tsx`: cruza orçamento do grupo com diárias dos destinos, calcula compatibilidade, alerta despesas críticas esquecidas e sugere cortes de custos reais. |
| **2. Integração Completa de Fotos Reais** | ✅ | Todas as 15 cidades agora possuem fotos reais em alta definição com créditos de autor, fonte e licença Unsplash, exibidas em cards, explorador, cabeçalhos, busca e comparador. |
| **3. Exportação, Importação e Impressão de Roteiro** | ✅ | `/roteiro` agora exporta em `.json` e `.txt`, importa arquivos `.json` de outros dispositivos sem precisar de servidor/login e possui folha de estilos limpa `@media print` para salvar em PDF ou imprimir. |
| **4. Expansão para 15 Destinos e Guias** | ✅ | Adicionados 5 polos de relevância internacional: Foz do Iguaçu (PR), Florianópolis (SC), Fernando de Noronha (PE), Lençóis Maranhenses (MA) e Ouro Preto (MG), com dados auditados e guias completos. |

## 🔜 Próximo — v1.1 (curto prazo)

| Item | Por quê |
| --- | --- |
| Busca na homepage com sugestões (`/destinos?q=`) | Conectar hero ao explorador |
| Mais 5 destinos + guias (Jalapão, Chapada dos Veadeiros, Tiradentes...) | Ampliar malha turística nacional |
| Validação de JSON-LD no Rich Results Test | Depois do primeiro deploy |
| Search Console + GA4 (via env) | Medir antes de especular |
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
