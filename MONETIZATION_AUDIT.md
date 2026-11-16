# MONETIZATION_AUDIT.md — Auditoria de monetização (Etapa 2, FASE 5/7)

- **Data da auditoria:** 15/11/2026
- **Escopo:** camada de afiliados (`src/lib/affiliate/`), vitrine de
  hospedagens, página `/afiliados`, divulgações, `.env.example` e a
  documentação existente `MONETIZATION.md`
- **Relação com o existente:** este documento **complementa** o
  `MONETIZATION.md` (que descreve o desenho/proposto). Aqui está o
  **estado real verificado no código**, os achados e o que foi corrigido
  nesta etapa.
- **Referência oficial Stay22:** `dev.stay22.com/docs` — Allez
  (`/docs/allez`), parâmetros (`/docs/allez/parameters`), Roam
  (`/docs/allez/roam`). Consultada em 15/11/2026.

Legenda: ✅ conforme · 🔧 corrigido nesta etapa · ⚠️ pendência (não é
bug, exige decisão/configuração externa)

---

## 1. Estado real da camada (verificado no código)

| Item | Estado verificado | Status |
| --- | --- | --- |
| Parceiros declarados | 9 em `PARTNERS` (`affiliate.ts`): Stay22, Booking, Expedia, Civitatis, Viator, GetYourGuide, Skyscanner, Aluguel, Seguros | ✅ |
| Ativação por env | `isPartnerEnabled()` lê `STAY22_PUBLISHER_ID`, `BOOKING_AFFILIATE_ID`, `GETYOURGUIDE_PARTNER_ID`, `VIATOR_AFFILIATE_ID`, `CIVITATIS_AFFILIATE_ID`; Expedia/Skyscanner/Aluguel/Seguros **sempre** `false` (sem env dedicada) | ✅ |
| Parceiros configurados hoje | **Nenhum** (nenhuma env preenchida no repositório nem na Vercel) → todos os links são editoriais internos | ✅ |
| Script injetado | Nenhum script de terceiros é carregado (sem AdSense/GA configurados) | ✅ |
| `.env.example` | Existe e documenta todas as envs, incluindo `STAY22_PUBLISHER_ID`, com aviso de nunca commitar valores reais | ✅ |
| Testes | `tests/affiliate.test.ts` — 15 testes: modo editorial nunca fabrica URL de rastreio; com env, URL real com o parâmetro correto; clique registrado sem dado pessoal | ✅ |
| Preço/nota/disponibilidade | Nenhum valor de cotação é exibido em lugar nenhum (`hasRealTimePricing: false`; disclosure `ESTIMATE_DISCLOSURE` em toda ferramenta) | ✅ |

## 2. Divulgação e conformidade

| Item | Verificação | Status |
| --- | --- | --- |
| `AffiliateDisclosure` | Presente no topo de `/hospedagens`, em `/afiliados` e na home | ✅ |
| Rótulo nos links monetizados | Cada link de listagem exibe a palavra **"(afiliado)"** ao lado do rótulo | ✅ |
| `rel` nos links monetizados | `rel="noopener noreferrer sponsored"` no único local que renderiza link monetizado (`/hospedagens`) | ✅ |
| Página `/afiliados` | Lista os 9 parceiros com status **Configurado / Não configurado**; com nenhum configurado, exibe "Nenhum parceiro está configurado" (verificado no navegador) | ✅ |
| Rodapé | Linka `/afiliados` ("divulgação de afiliados") em todas as páginas + aviso de estimativas | ✅ |
| Links de fonte (INMET, fontes de atração) | `rel="noopener noreferrer"` **sem** `sponsored` — correto: são citações editoriais, não afiliados | ✅ |
| LGPD no clique | `registerAffiliateClick()` grava apenas `partner`, `kind`, `destinationSlug`, `at` — nenhum identificador pessoal; buffer em memória, máx. 500 eventos | ✅ |

## 3. Achados e correções

### 🔧 MON-1 (MÉDIO) — Stay22 "pronto" mas sem rastreio real

**Antes:** `PARTNERS` trazia Stay22 com `baseUrl: "https://www.stay22.com/"`
e `trackingParam: null`. Mesmo com `STAY22_PUBLISHER_ID` preenchida, o
link apontava só para a home do Stay22 — **sem `aid`, sem conversão
rastreada**, ao passo que a página `/afiliados` mostraria "Configurado".
Isso criaria uma expectativa falsa de monetização ativa.

**Correção (baseada em fonte oficial, nada inventado):**

- Endpoint documentado: `https://www.stay22.com/allez/{provider}` com
  parâmetro **obrigatório** `aid` (`dev.stay22.com/docs/allez/parameters`).
- Adotado `/allez/roam` (recomendado pela doc para links de hospedagem
  sem afinidade a um OTA específico — `/docs/allez/roam`), que exige
  destino resolvível (`address` ou `lat`/`lng`).
- **Verificação empírica em 15/11/2026** (HTTP, sem credencial real):
  - `…/allez/roam?aid=<id>&address=Gramado%20Brazil` → **302** →
    `booking.com/searchresults.html?…&label=<aid>` (cidade resolvida)
  - `…/allez/roam?aid=<id>` (sem address) → **302** → home do Booking
    (funciona, mas sem destino — por isso o código envia `address`)
- Implementação: `baseUrl = https://www.stay22.com/allez/roam`,
  `trackingParam = "aid"`; `buildOfferLink()` acrescenta
  `address=<destinationSlug>` quando há destino e o chamador não
  informou `address` no `query`. Sem destino, gera só `aid=` (nunca um
  parâmetro inventado).
- Testes atualizados/criados: formato exato
  `/allez/roam?aid=pub-42&address=gramado`; Stay22 sem destino → só
  `aid=`; o caso "parceiro habilitado sem trackingParam" passou a usar
  **Civitatis** (tem env própria e continua `trackingParam: null` — é o
  caso real que restou).
- `MONETIZATION.md` atualizado para refletir o comportamento real.

**Nota de honestidade:** a correção foi validada com um `aid` de teste
(`test-rotaclara-audit`) apenas para provar o formato do redirecionamento.
Nenhuma credencial real foi usada, criada ou presumida, e nenhum clique
de produção passou a ser rastreado — sem `STAY22_PUBLISHER_ID` no
ambiente, o comportamento segue 100% editorial.

### 🔧 MON-2 (MÉDIO) — `registerAffiliateClick()` definido, nunca chamado

**Antes:** a função existia (e o `MONETIZATION.md` a descrevia como parte
do comportamento LGPD), mas **nenhum componente a chamava** — o buffer
sempre ficaria vazio, mesmo com parceiro configurado.

**Correção:** novo componente client
`src/components/affiliate/AffiliateLink.tsx` que registra o clique
(`partner`, `kind`, `destinationSlug`) no `onClick` e mantém
`target="_blank"` + `rel="noopener noreferrer sponsored"`. A vitrine de
`/hospedagens` passou a usá-lo nos links monetizados. Links editoriais
internos continuam sendo `next/link` (não são afiliados).

### ⚠️ MON-3 (BAIXO) — Página do destino não tem link monetizado

`MONETIZATION.md` alegava "página do destino (quando houver listagem)"
como local de links. Verificado: os cartões de listagem na página do
destino são **informativos** (nome, perfil, descrição) e não renderizam
`links[]`; o convite é o "Ver todas as opções" → `/hospedagens`, onde os
links existem com disclosure.

**Decisão:** corrigir a **documentação** (feito) em vez de duplicar links
monetizados na página do destino — a disclosure única em `/hospedagens`
fica mais clara e a página do destino mantém foco editorial. Se no
futuro houver link monetizado ali, ele deve usar `AffiliateLink` e a
página deve ganhar o `AffiliateDisclosure` primeiro.

### ⚠️ MON-4 (BAIXO) — Stay22 sem `address` cai na home do provedor

Mesmo com o formato corrigido, listagens sem `destinationSlug` geram
`/allez/roam?aid=…` sem destino (302 → home do OTA, sem página de
busca). Hoje **todas** as listagens informam destino, então o caso não
ocorre; fica registrado para quem for adicionar listagem sem slug.

### ⚠️ MON-5 (MÉDIO) — Nenhum parceiro configurado = receita zero

Fato declarado e verdadeiro: a v1 **não gera receita**. Ativar exige
obter credencial real junto ao parceiro (eterna do usuário/empresa),
preencher a env na Vercel e fazer deploy — **fora do escopo desta
etapa** (sem deploy, sem push). A página `/afiliados` já reflete isso
com honestidade ("Nenhum parceiro está configurado").

### ⚠️ MON-6 (BAIXO) — Parceiros sem env dedicada

Expedia, Skyscanner, Aluguel e Seguros aparecem em `PARTNERS` como
**sempre desabilitados**. É intencional e documentado (nenhuma env
fictícia), mas o `/afiliados` os lista como "Não configurado" —
correto, sem alegação de prontidão.

## 4. Auditoria × `MONETIZATION.md` (desenho × realidade)

| Alegação do `MONETIZATION.md` | Realidade verificada |
| --- | --- |
| "Todo link monetizado é rotulado com `rel=… sponsored`" | ✅ verdadeiro (único ponto de renderização: `/hospedagens`) |
| "Sem configuração, sem monetização; URL nunca fabricada" | ✅ verdadeiro (testes garantem) |
| "Clique registrado guarda só partner/kind/destino/horário" | 🔧 era falso (função nunca chamada) → **verdadeiro agora** (`AffiliateLink`) |
| "Onde aparecem: página do destino (quando houver listagem)" | 🔧 era falso → **documentação corrigida** (MON-3) |
| "Stay22: sem `trackingParam` → aponta ao site oficial" | 🔧 comportamento superado → **endpoint oficial Allez com `aid`** (MON-1) |
| "A v1 não gera receita" | ✅ verdadeiro (MON-5) |

## 5. Classificação da FASE 5

**APROVADO COM PENDÊNCIAS**

- ✅ Camada coerente, testada, sem URL inventada, sem script fantasma,
  disclosure completo e consistente com LGPD.
- 🔧 2 achados corrigidos (MON-1 Stay22/Allez, MON-2 clique não
  registrado) + documentação alinhada.
- ⚠️ Pendências externas (não bloqueiam, exigem ação fora do repositório):
  MON-5 (credenciais reais + env na Vercel + deploy autorizado),
  MON-6 (decisão de manter parceiros sem env), MON-4 (listagem sem slug).
