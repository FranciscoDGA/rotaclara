# Plano de Gestão de Melhorias — RotaClara

> Data: 16/11/2026. Vive após a ETAPA 2 (`e8bb7be`).
> Regra: nada aqui é executado sem autorização; nada é marcado ✅ antes de
> `npm run verify` passar.

## 1. Posicionamento — qual pedaço da pizza

**Não disputamos com:** Booking, TripAdvisor, Decolar, Panrotas, Google
Viagens, passagens/voo. Eles dominam descoberta massiva, reviews em volume e
reserva. Qualquer tentativa de competir nesses eixos é gasto perdido.

**Nosso pedaço — "decisão de planejamento com números claros":**

> O viajante brasileiro que **já sabe que vai viajar**, mas não sabe
> **quanto custa, quando ir e onde cabe no bolso** — e não confia em sites que
> mostram preço sem fonte.

### O que sustenta esse pedaço (já construído, não refazer)

| Ativo | Papel no nicho |
| --- | --- |
| Calculadora, Comparador, Planejador, Diagnóstico, Roteiro | Ferramentas utilitárias — o viajante volta por elas, não pela vitrine |
| Custo por destino com perfil (econômico/moderado/confortável) + `COST_METHODOLOGY.md` | Diferencial impossível de copiar rápido: transparência declarada |
| Fontes com data + `DATA_SOURCES.md` | Prova de que nada é inventado |
| Guias com "Atualizado em" + autoria editorial | Confiança editorial vs. conteúdo gerado em massa |
| Fotos reais com crédito/licença | Sinais de quem cuida do detalhe |

### Onde pescar (praças de captura)

1. **Cauda longa de intenção** — "quanto custa ir a Gramado", "melhor época
   Lençóis Maranhenses", "roteiro 3 dias Ouro Preto". Nunca head terms
   ("viagens", "passagens").
2. **Destinos médios esquecidos** — onde concorrente grande não tem página
   boa: Jalapão, Tiradentes, Chapada dos Veadeiros, São Miguel do Gostoso,
   Monte Pascoal. Página nova com dado verificável > página genérica.
3. **Ferramentas como isca de busca** — "calculadora de viagem" é consulta
   de intenção alta e baixa disputa de confiança.

### O que nunca faremos (protege contra o efeito "site de golpe")

- Preço, vaga ou disponibilidade inventados — **regra permanente já no ROADMAP**.
- Urgência falsa ("última vaga!", contador regressivo), pop-up de saída,
  autoplay de áudio, banner de cookie enganoso.
- Depoimentos, selos ou números de usuários inventados ("10 mil viajantes").
- Cadastro obrigatório para usar qualquer ferramenta.
- Texto genérico preenchido para "ter conteúdo" — melhor guia curto e
  verificado do que guia longo suspeito.

## 2. Confiança — o que faz o usuário desconfiar e o estado atual

Verificado no código em 16/11/2026:

| # | Item | Risco se ficar assim | Estado |
| --- | --- | --- | --- |
| T1 | OG image é **SVG** (`og-default.svg`) | WhatsApp/Twitter/Facebook **não renderizam SVG** → link compartilhado aparece sem imagem = cara de site quebrado | 🔴 Pendente |
| T2 | **Não existe favicon** (nenhum `icon.*`/`apple-icon.*` no App Router) | Aba sem ícone = amadorismo imediato no primeiro contato | 🔴 Pendente |
| T3 | `NEXT_PUBLIC_SITE_URL` ausente em produção | canonicals/OG apontando para `localhost:3000` → dados estruturados e compartilhamentos inválidos | 🔴 Pendente (CRÍT-1 já conhecido) |
| T4 | Sem medida de uso real (GSC/GA4) | Decidir no escuro; não detectar queda de performance | 🟡 v1.1 |
| T5 | Hero sem `fetchPriority="lazy"/"eager"` | LCP mais lento que o necessário em 4G | 🟡 Baixo |
| T6 | JSON-LD nunca validado no Rich Results Test | Erro silencioso em rich results | 🟡 Pós-deploy |
| T7 | Contato/identidade existem (`/sobre`, `/contato`) mas são "escondidos" no rodapé | Usuário desconfia quando não acha como falar com alguém | 🟡 Revisar visibilidade |
| — | Transparência de afiliados rotulada, metodologia pública, fontes datadas, 404 com saídas, 178 testes, axe 0 violações | Contramedidas **já ativas** | ✅ |

## 3. Estabilidade — "não trava, funciona"

| # | Item | Estado |
| --- | --- | --- |
| E1 | 178 testes (vitest) cobrindo cálculos das ferramentas | ✅ |
| E2 | `npm run verify` (typecheck+lint+test+build) como porta de qualidade | ✅ |
| E3 | Mobile 390px sem overflow horizontal | ✅ |
| E4 | Estados vazios explicam **qual** filtro zerou a lista | ✅ |
| E5 | Roteiro sobrevive a reload (localStorage) + import/export/print | ✅ |
| E6 | Roteiro **offline (PWA básica)** — ferramenta que perde o trabalho do usuário = desconfiança garantida | 🔜 v1.1 |
| E7 | Testes de regressão visual/interação após cada mudança de UI | ✅ (manual em Etapa 2; padronizar) |

## 4. Execução por fases

### Fase 0 — Percepção de legitimidade (pequeno, desbloqueia o resto)

| Item | Esforço |
| --- | --- |
| Gerar `og-default.png` 1200×630 (nítido, marca+promessa) e apontar metadata OG | Pequeno |
| Criar ícones (PNG 32/180 + `icon.svg`) e ligar no `layout.tsx` | Pequeno |
| Definir `NEXT_PUBLIC_SITE_URL` no ambiente de produção | Minúsculo (env) |
| `fetchPriority` na imagem do hero | Minúsculo |

**Critério de saída:** link compartilhado no WhatsApp mostra imagem; aba tem
ícone; canonicals apontam ao domínio real.

### Fase 1 — Confiança sustentada

| Item | Esforço |
| --- | --- |
| Selo/linha de transparência visível nos destinos: "Metodologia de custos · Fontes com data · Atualizado em ⟨data⟩" | Pequeno |
| Encontrar `/contato` a partir do header/rodapé em lugar óbvio | Pequeno |
| Auditoria de links das 60 fontes (script agendado manual ou checklist) | Médio |
| Validar JSON-LD no Rich Results Test (pós-deploy) | Pequeno |

### Fase 2 — Pedaço da pizza (nicho/SEO)

| Item | Esforço |
| --- | --- |
| Motor de artigos: 4 arquétipos (custo/época/comparativo/roteiro) a partir dos dados auditados — ver §5 | Contínuo (2/semana) |
| Busca na homepage com sugestões → `/destinos?q=` | Médio |
| +5 destinos e guias na cauda longa (Jalapão, Tiradentes, Chapada dos Veadeiros...) com fontes datadas | Grande (por destino: pequeno) |
| Página-ferramenta indexada: `/calculadora` reforçada como landing de "calculadora de viagem" | Pequeno |

### Fase 3 — Resiliência

| Item | Esforço |
| --- | --- |
| PWA básica: roteiro offline (service worker só para a rota `/roteiro`) | Médio |

### Fase 4 — Medição (antes de especular)

| Item | Esforço |
| --- | --- |
| Search Console + verificação via env | Minúsculo |
| GA4 ou Plausible via env (consentimento LGPD primeiro) | Pequeno |
| Primeira leitura de CWV reais após 2–4 semanas | Contínuo |

## 5. Tráfego orgânico e monetização (Stay22)

> Resposta à pergunta: "como trazer tráfego orgânico se não há blog com
> artigos otimizados?"

### 5.1 O site já tem a matéria-prima — falta o motor de artigos

Não é "site sem conteúdo": existem **15 páginas de destino (pilares)**,
**15 guias datados** e **5 páginas-ferramenta** indexáveis. O que falta é o
**motor de artigos de cauda longa** que alimenta esses pilares — o item
"Blog/editorial com artigos de baixa concorrência" já previsto em
`SEO_STRATEGY.md` §9.

### 5.2 O funil — 4 passos

**Passo 0 — Medir antes de publicar.** Fase 0 (OG/favicon/SITE_URL) +
verificar Search Console. Sem isso, todo artigo publicado é invisível.

**Passo 1 — Reforçar os pilares.** Cada `/destinos/[slug]` revisa title
(≤60), description (≤160), H1 único, FAQ espelhando o JSON-LD. Intenção
"[cidade] o que fazer / quando ir" já coberta.

**Passo 2 — Motor de artigos (o "blog").** Quatro arquétipos que usam dados
**já auditados no repo** — nada inventado:

| Arquétipo | Exemplo | Fonte interna |
| --- | --- | --- |
| Custo | "Quanto custa ir a Gramado" | `destinations` + `COST_METHODOLOGY.md` |
| Época | "Melhor época para ir aos Lençóis Maranhenses" | `climate.ts` (clima mensal) |
| Comparativo | "Gramado ou Canela: qual vale mais a pena" | `comparador` (critérios) |
| Roteiro | "Roteiro de 3 dias em Ouro Preto" | `guides` + `planejador` |

Mais pautas sazonais de baixa disputa: "onde ir em julho", "férias com
R$ 2.000", "feriados prolongados para onde ir".

- **Cadência:** 2 artigos/semana, constância > volume.
- **Cada artigo linka:** pilar do destino + ferramenta contextual + seção
  "onde ficar" (Stay22).
- **Regra anti-spam (§7 do SEO_STRATEGY):** nada de página doorway com keyword
  trocada por cidade; cada artigo precisa de ângulo e dado próprio.

**Passo 3 — Link interno e distribuição.** Hub destino ↔ guia ↔ artigo ↔
ferramenta; compartilhamento (WhatsApp/redes) — a Fase 0 (OG PNG) faz o link
viralizado renderizar imagem.

### 5.3 Stay22 no funil — tráfego primeiro, comissão depois

| Ponto de inserção | Contexto |
| --- | --- |
| Seção "onde ficar" das páginas de destino (já existe) | Pilar com custos e clima → decisão de hospedagem |
| CTA contextual no fim de cada guia/artigo novo | "Onde ficar em X" após ler o roteiro |
| Após a Calculadora/Diagnóstico | usuário acabou de fechar orçamento → intenção alta |
| Comparador (3 destinos) | escolheu o destino → hospedagem |

Regras mantidas: rótulo de afiliado visível, `rel="sponsored"`, fallback
editorial sem credenciais (`MONETIZATION_AUDIT.md`), **sem preço
inventado** — Stay22/Booking exibem o preço real, não nós.

### 5.4 Expectativa realista

- Indexação dos pilares: dias a semanas após GSC + deploy.
- Primeiros cliques orgânicos: 4–8 semanas após publicar artigos.
- Tráfego relevante: 4–6 meses de cadência constante.
- Medição: impressões e CTR por query no GSC → decide quais pautas publicar
  a seguir (dados, não palpite).

## 6. Fora de escopo permanente (mantido do ROADMAP)

- Reservas/pagamentos; ranking sem critério; preço inventado; cadastro
  obrigatório — mais: depoimento inventado, urgência falsa, pop-up de saída.

---

**Regra de atualização:** mover para ✅ apenas com data real e `npm run verify`
passando.
