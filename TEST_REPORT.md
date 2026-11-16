# TEST_REPORT.md — Relatório de testes da Etapa 2 (FASE 4/7)

- **Data:** 14–15/11/2026
- **Escopo:** as 6 ferramentas da plataforma testadas de ponta a ponta no
  navegador (dev server local `localhost:3000`) + suíte automatizada existente
  + varredura de acessibilidade (axe-core 4.12.1) e Lighthouse
- **Baseline:** 171 testes (`npm run verify`) — EXIT=0 antes e depois das
  correções desta etapa
- **Ambiente:** Windows/PowerShell, Node v24.14.1, Chrome via ferramentas de
  navegador (aba em segundo plano — ver §4 sobre `requestAnimationFrame`)

Legenda: ✅ passou · 🔧 achado corrigido nesta etapa · ⚠️ achado aceito
(comportamento documentado) · ⏳ pendente

---

## 1. Planejador inteligente (`/planejador`) — ✅ com 1 achado corrigido

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Cenário normal | SP → Rio, 10–15/12/2026, 2 adultos, equilibrado/padrão | 5 dias, total = média da faixa × dias × pessoas | ✅ R$ 4.900 = (260+720)/2 × 5 × 2 |
| Distribuição | estilo "equilibrado" | 30/24/22/16/8% | ✅ 1.470/1.176/1.078/784/392 sobre 4.900 |
| Cristo Redentor | atração com `isFree: false` | marcar "com ingresso" | ✅ |
| Datas invertidas | ida 15/12, volta 10/12 | bloquear com alerta | ✅ "Datas inválidas — A data de volta deve ser posterior à ida." |
| Adultos = 0 | adultos 0 | bloquear sem número falso | ✅ "Não foi possível gerar o planejamento" |
| Título do dia | dia 5 com foco `["familia","cultura"]` | rótulo acentuado | 🔧 **corrigido**: exibia "Dia 5 — familia e cultura"; `dayTitle()` agora passa por `tagLabel()` (`planner.ts`) → "Família e Cultura" |

## 2. Calculadora de orçamento (`/calculadora`) — ✅ com 2 achados

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Soma pt-BR | 1.234,56 + 500 + 265,44 | R$ 2.000 | ✅ |
| Por pessoa | total 2.000, 2 pessoas | R$ 1.000 | ✅ |
| Por dia | total 2.000, 5 dias | R$ 400 | ✅ (método: alterar campo, depois clicar — ver §4) |
| Dias = 0 e pessoas = 0 | — | alerta, sem resultado | ✅ "Corrija antes de calcular" com itens • "Informe pelo menos 1 dia de viagem." • "Informe pelo menos 1 pessoa." |
| Limites | dias 999, pessoas 100 | recusar | ✅ "Duração máxima suportada é de 365 dias." • "Máximo de 50 pessoas por cálculo." |
| Overflow | despesa 999999999999999999 | sem NaN/Infinity | ✅ exibe valor gigante formatado; sem `NaN`/`Infinity`/`undefined` (perda de precisão de float é aceitável e não vira número inválido) |
| Valor negativo | despesa −100 | 🔧 **corrigido**: era descartada em silêncio (total só subia sem aviso) | 🔧 Agora a submissão é **bloqueada** com "Despesa 1: informe um valor maior que zero em reais (negativos, zero e textos não são aceitos)." (mesma regra para orçamento preenchido inválido) — `CalculatorTool.tsx` (`rowIssues`) |
| Texto não numérico | despesa "abc" | idem | 🔧 coberto pela mesma validação (`parseAmount` ≤ 0 com campo preenchido) |

## 3. Comparador de destinos (`/comparador`) — ✅ com 3 achados corrigidos

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Dois destinos | Rio × Gramado | tabela de 9 critérios + vantagens com rationale | ✅ |
| Sem base | critério sem dado | "Sem dado disponível" | ✅ |
| Regiões distintas | Sudeste × Sul | frase explicando variação | ✅ |
| 3 destinos | Salvador × Olinda × João Pessoa | 3 colunas, sem nome repetido | ✅ "Critério Salvador Olinda João Pessoa"; sem duplicação |
| Sobreposição de meses | interseção das boas épocas | meses corretos | 🔧 **corrigido (off-by-one)**: exibia "mai · jun · dez"; com os dados reindexados, interseção Salvador∩Olinda∩João Pessoa = set–mar (7 meses) |
| Empate | critério igual nos 3 | sem vantagem falsa | ✅ "Melhor época" idêntico nos 3 → sem marcador de vantagem; 3 vantagens atribuídas só onde há diferença real |
| Plural | 3 dias × 7 dias | frase natural | 🔧 "pode ser visto em 3 dia(s)" → usa `plural()` → "em 3 dias" |
| Texto "como chegar" | Gramado | frase correta | 🔧 "pela Aeroporto Salgado Filho" → **"pelo Aeroporto Salgado Filho"** (destino + guia) |

## 4. Construtor de roteiros (`/roteiro`) — ✅ com 7 casos

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Criação | título "Teste Etapa 2", Rio, 3 dias, início 15/12/2026 | 3 dias abertos | ✅ dias 15/16/17 de dezembro de 2026 |
| Atividade | "Cristo Redentor", 180 min, R$ 139, manhã | aparece + totais | ✅ "≈ 3 h · R$ 139"; resumo: 2 atividades, 9 h 40 min, R$ 389 (com 2ª atividade) |
| Sobrecarga | 2ª atividade de 400 min | alerta de dia > 8 h | ✅ role="alert": "1 dia está acima de 8 horas de visita — Reveja tempos estimados ou divida as atividades." |
| Persistência | reload da página | roteiro mantido | ✅ `localStorage["rotaclara:itinerary:v1"]` restaura título, dias e atividades |
| Apagar | botão "Apagar roteiro" | confirmação + limpa | ✅ `confirm("Apagar o roteiro salvo neste navegador? Essa ação não pode ser desfeita.")` → LS `null` + estado "Nenhum roteiro aberto" |
| Validação do setup | dias = 99 | recusar | ✅ "Informe de 1 a 60 dias." e nenhum roteiro criado |
| Exportação | botões de download/cópia | presentes | ✅ "Baixar roteiro (.txt)" e "Copiar roteiro em texto" |

## 5. Hospedagens e experiências (`/hospedagens`) — ✅ com 1 achado corrigido

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Conteúdo editorial | — | sem preço/nota/disponibilidade inventados | ✅ disclosure completa no topo; nenhuma cotação exibida |
| Filtro por destino | `?destino=gramado` | só listagens de Gramado | ✅ URL `?destino=gramado&tipo=`; 3 listagens, 3 links de guia |
| Estado sem filtro | — | todas as listagens | ✅ |
| Hierarquia de títulos | H1 → cards | sem pular nível | 🔧 **corrigido**: H1 → H3; adicionado `<h2>Opções de hospedagem</h2>` antes da lista (H1 → H2 → H3) |

## 6. Descoberta de destinos (home + `/destinos`) — ✅ com 2 achados corrigidos

| Caso | Entrada | Resultado esperado | Resultado |
|---|---|---|---|
| Busca na listagem | "gramado" | 1 de 10 | ✅ "1 destino encontrado de 10"; meses do card = "abr · mai · jun · jul · nov · dez" (0–11 corrigido) |
| Filtro de mês | Jan | destinos da estação seca | ✅ Salvador, Olinda, João Pessoa ("3 destinos encontrados de 10") — **antes da correção: 0 resultados** |
| Combobox da home | "xyzabc" | painel vazio + navegação | ✅ `aria-expanded="true"`, "Nenhum destino encontrado" no painel; submit → `/destinos?busca=xyzabc` com "0 destinos encontrados de 10" |
| Estado vazio | — | frase coerente | 🔧 **corrigido**: "Sem dados suficientes para: busca: "xyzabc"" → "Nenhum destino corresponde a busca: "xyzabc". Nossa base tem 10 destinos verificados — remova um filtro para ver alternativas." |
| Combobox com match | "gramado" | 1º match | ✅ navega para `/destinos/gramado` |

## 7. Achados de ambiente (não são bug do produto)

- **Conteúdo em `<div hidden id="S:0">`:** o React 19 revela conteúdo de
  Suspense via `requestAnimationFrame`, que **nunca dispara em janela do
  navegador não visível** neste ambiente de teste. Confirmado que o mesmo
  ocorre no site publicado (idêntico HTML servido; `$RB` com 2 itens
  pendentes). Workaround nos testes: `window.$RV(window.$RB)`. Não é
  reproduzível em navegador real com a aba visível.
- **Screenshot indisponível** ("needs a visible tab") — testes feitos via
  `evaluate`/acessibilidade.
- **Clique síncrono × estado React:** clicar logo após despachar `input`
  sem esperar o flush pode usar o estado anterior (observado uma vez na
  calculadora: "4 dias" em vez de 5). Refeito o passo com evaluate separado
  e confirmado correto — não é bug do produto.
- **Comportamento mobile não testado:** o ambiente não oferece ferramenta de
  resize/viewport (sem emulação de dispositivo). A meta viewport está
  presente e o layout usa breakpoints Tailwind (`sm:`, `md:`, `lg:`), mas a
  verificação visual em tela pequena fica **pendente** para o próximo ciclo
  (ver `ROADMAP.md`).

## 8. Acessibilidade (axe-core 4.12.1 + Lighthouse)

Varredura em 8 páginas (home, planejador, calculadora, comparador, roteiro,
destinos, hospedagens, destino/Gramado):

| Página | axe (violações) | Lighthouse |
|---|---|---|
| Home | ✅ 0 | ✅ a11y 100 · best practices 100 · SEO 100 (0 falhas) |
| /planejador | ✅ 0 | — |
| /calculadora | ✅ 0 | — |
| /comparador | ✅ 0 | — |
| /roteiro | ✅ 0 | — |
| /destinos | ✅ 0 | — |
| /hospedagens | ✅ 0 | — |
| /destinos/gramado | ✅ 0 | — |

Achados corrigidos nesta rodada:

1. **`color-contrast`** — `#8c8471` (3,5:1) em 103 pontos de 24 arquivos →
   `#736b5b` (5,3:1 sobre branco); badge gold `#a8761f` → `#8f6417`;
   teal `#17827c` (4,37:1) → `#0f6f69` (5,66:1 sobre creme) em 50 pontos;
   green `#1a7f4b` (4,46:1) → `#167043`; sand `#b3ab99` em texto →
   `#7a7162`; ícone teal-500 `#1fa39b` → `#15908a`.
2. **`heading-order`** — rodapé H1→H3: colunas do rodapé `h3` → `h2`;
   `/hospedagens` H1→H3: novo `h2` de seção.
3. **`svg-img-alt`** — `DestinationArt` com `alt=""` mantinha `role="img"`;
   agora arte sem rótulo é renderizada com `aria-hidden` (o link já nomeia
   o destino).
4. **`label-content-name-mismatch`** — `aria-label` do logo não incluía o
   texto visível de forma contígua; rótulo removido — o nome acessível passa
   a vir do conteúdo ("RotaClara VIAJAR MELHOR COMEÇA COM DECISÕES MELHORES").
5. **Aviso do Next.js** — `scroll-behavior: smooth` no `<html>` resolvido
   com `data-scroll-behavior="smooth"` (`layout.tsx`).

## 9. Console

0 erros e 0 warnings de JavaScript em todas as 7 páginas principais
após as correções (único aviso anterior: o `scroll-behavior`, corrigido).

## 10. Achado estrutural corrigido (off-by-one de `bestMonths`)

`types.ts` documenta `bestMonths` como **0–11** e testes/UI usam 0–11, mas
os 10 arrays dos dados estavam em **1–12** (continham `12`). Efeitos
observados no navegador: meses exibidos deslocados +1, filtro de meses da
listagem errado (o mês `12` nunca casava com o índice de dezembro).
**Correção:** os 10 arrays reindexados para 0–11 (nenhum outro código
alterado — era a convenção já documentada e testada). Registrado em
`DESTINATION_AUDIT.md` §4.

## 11. Suíte automatizada

- `npm run verify` (typecheck + lint + test + build): **EXIT=0** com 171
  testes no baseline e após as correções da FASE 4 (evidências em
  `%TEMP%\opencode\verify-fase3.txt` e `verify-fase4.txt`; nova execução
  registrada ao final desta etapa).

---

## Resultado por ferramenta (resumo)

| Ferramenta | Status | Achados |
|---|---|---|
| Planejador | ✅ | 1 corrigido (título do dia sem acento) |
| Calculadora | ✅ | 2 corrigidos (valor negativo/texto descartado em silêncio; validação de orçamento) |
| Comparador | ✅ | 3 corrigidos (off-by-one de meses, plural, "pela Aeroporto") |
| Construtor de roteiros | ✅ | 0 (7 casos OK: criação, atividade, sobrecarga, persistência, exclusão, validação, exportação) |
| Hospedagens/experiências | ✅ | 1 corrigido (hierarquia de títulos H1→H3) |
| Descoberta de destinos | ✅ | 2 corrigidos (estado vazio com dois-pontos duplicados; off-by-one de meses no filtro) |

**Acessibilidade:** 8/8 páginas com 0 violações axe; Lighthouse 100/100/100.
**Console:** 0 erros.
**Suíte:** 171 testes, EXIT=0.
**Limitação de ambiente:** viewport mobile não pôde ser simulado (§7).
