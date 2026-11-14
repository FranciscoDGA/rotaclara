# RotaClara — Plano de Execução (v1)

> Documento de trabalho do arquiteto-chefe. Registra decisões reais tomadas
> na inspeção do ambiente e na definição da arquitetura.

## 1. Inspeção do ambiente (fato)

| Item | Resultado |
| --- | --- |
| Diretório de trabalho | `C:\Users\User\OneDrive\Desktop\RotaClara` |
| Conteúdo encontrado | 16 imagens PNG (logotipo + referências de UI). **Nenhum arquivo de código.** |
| Repositório Git | não inicializado |
| Node.js | v24.14.1 |
| npm | 11.11.0 |
| Acesso ao registry npm | OK (HTTP 200) |
| Ferramentas extras | git 2.51.2 disponível |

Conclusão: projeto **greenfield**. As imagens são material de referência do
proprietário e **não serão apagadas nem movidas**.

## 2. Identidade visual extraída das referências

- **Logotipo:** bússola — rosa dos ventos creme sobre quadrado azul-marinho,
  agulha dourada diagonal. Traduz "rota" + "clareza".
- **Paleta:** azul-marinho profundo (base), azul-petróleo, verde-água (destaque
  secundário), dourado quente discreto (destaque primário).
- **Padrões de UI observados:** cards com borda sutil, tipografia forte com
  números grandes, barras de progresso por categoria, chips de status,
  hierarquia limpa, muito espaço negativo.
- **Não fazer:** genérico de dashboard administrativo, excesso de gradiente,
  cards com sombras duras.

## 3. Stack escolhida (versões verificadas no registry)

| Tecnologia | Versão | Justificativa |
| --- | --- | --- |
| Next.js (App Router) | 16.4.6 | `latest` estável; SEO nativo, RSC, Vercel-ready |
| React / React DOM | 19.3.1 | peer compatível com Next 16 |
| TypeScript | 5.9.3 | **evitado 7.0.2** (port nativo, risco com tooling do Next) |
| Tailwind CSS | 4.3.5 | CSS-first, sem `tailwind.config.js` obrigatório |
| @tailwindcss/postcss | 4.3.5 | plugin oficial v4 |
| ESLint | 9.39.5 | **evitado 10.x** — `eslint-config-next` e `typescript-eslint@8` ainda no ecossistema 9 |
| eslint-config-next | 16.4.6 | peer `eslint >=9` |
| Vitest | 5.1.0 | `latest`; test runner rápido, nativo de ESM |
| @vitejs/plugin-react | 6.3.0 | transform JSX nos testes |
| Testing Library | 16.3.3 / dom / jest-dom 7 | testes de componente |
| jsdom | 31.0.1 | DOM de teste |
| lucide-react | 1.72.0 | peer React 19 OK; set de ícone consistente |

**Rejeitado:** Docker, ORM pesado, serviços pagos, credenciais obrigatórias,
CMS externo, bibliotecas de mapa pagas.

## 4. Arquitetura

```
src/
  app/                  rotas App Router + metadata + sitemap/robots
  components/
    ui/                 primitivas acessíveis (Button, Card, Chip, Field…)
    layout/             Header, Footer, Breadcrumbs, SkipLink
    home/               blocos da homepage
    tools/              calculadora, planejador, comparador, construtor de roteiro
  lib/
    domain/             regras de negócio puras (orçamento, roteiro, filtros)
    seo/                helpers de metadata + dados estruturados
    affiliate/          camada Stay22 / parceiros (config por env)
    format/             moeda, datas, números (pt-BR)
  data/                 destinos, fontes, conteúdos editoriais (tipados)
tests/                  unit + component
```

Princípios:
- **Domínio puro e testável** em `lib/domain` (sem React, sem IO) → testes unitários.
- **Dados tipados** em `data/` com trilha de fonte (`Source`) por fato relevante.
- **Camada de integração** pronta para credenciais futuras, sem simular conexão.
- **Estimativas sempre rotuladas** como estimativas, com metodologia e data.

## 5. Escopo v1 (obrigatório)

1. Homepage profissional
2. Descobrir destinos (filtros funcionais)
3. Páginas de destino / guias editoriais
4. Calculadora de viagem (funcional)
5. Planejador de viagem (funcional)
6. Construtor de roteiros (funcional)
7. Comparador de destinos (funcional)
8. Hospedagens e experiências (pronto para afiliados)
9. SEO + estrutura editorial
10. Páginas institucionais
11. Responsividade
12. Testes automatizados

Persistência local (localStorage) para planejamentos na v1.

## 6. Regras inegociáveis

- Sem preços/reservas/passagens fictícios apresentados como reais.
- Sem deploy, sem push, sem GitHub.
- Sem credenciais inventadas, sem segredos no código.
- Botões só existem se executam ação real.
- Testes e build só são declarados aprovados se realmente executados.

## 7. Sequência de execução

1. ~~Inspeção do ambiente~~ ✅
2. ~~Definição de arquitetura e stack~~ ✅
3. Scaffold + dependências + config base
4. Sistema de design (tokens, componentes)
5. Camada de dados + fontes
6. Páginas institucionais + SEO base
7. Homepage
8. Descobrir + páginas de destino
9. Calculadora
10. Planejador
11. Construtor de roteiros
12. Comparador
13. Hospedagens/experiências + afiliados
14. Testes (unit + component)
15. Build, lint, typecheck, revisão
16. Documentação (README, ARCHITECTURE, SEO_STRATEGY, DATA_SOURCES, MONETIZATION, ROADMAP)
17. Relatório final
