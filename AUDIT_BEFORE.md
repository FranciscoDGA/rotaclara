# AUDIT_BEFORE.md — Diagnóstico antes das alterações (Etapa 2)

- **Data da auditoria:** 2026-11-14
- **Projeto:** RotaClara — plataforma de descoberta, comparação e planejamento de viagens
- **Site de referência:** https://rotaclara-theta.vercel.app/ (somente leitura)
- **Repositório:** `https://github.com/FranciscoDGA/rotaclara` (branch `main`, commit `9565b5e`)
- **Regra observada:** nenhum arquivo do produto foi alterado antes deste relatório.

**Arquivos tocados até aqui:**

| Arquivo | Natureza |
|---|---|
| `scripts/audit-links.mjs` | NOVO — script de auditoria de links (somente leitura, 1 requisição por URL) |
| Demais arquivos do produto | **NENHUM alterado** |

**Método:** inspeção completa do repositório · baseline `npm run verify` · revisão editorial dos 10 destinos e 10 guias por 2 agentes de pesquisa (todos os achados relevantes **confirmados pessoalmente** por leitura do código e/ou verificação web) · checagem HTTP de 59 URLs externas únicas · inspeção do HTML publicado (canonical, title, sitemap).

---

## 1. INVENTÁRIO

### 1.1 Stack e comandos

| Item | Estado |
|---|---|
| Framework | Next.js 16.4.6 (App Router), React 19.3.1, TypeScript 5.9.3 (strict) |
| Estilo | Tailwind CSS 4.3.5 · identidade visual navy + creme + dourado preservada |
| Testes | Vitest 5.1.0 + jsdom + Testing Library |
| Lint | ESLint 9.39.5 |
| Comandos | `npm run typecheck \| lint \| test \| build \| verify` |
| Dependências | 4 runtime (`next`, `react`, `react-dom`, `lucide-react`) — sem serviços pagos, sem Docker |
| Git | 1 commit, working tree limpa na entrada da Etapa 2 |

### 1.2 Rotas públicas (17 rotas + robots + sitemap)

| Rota | Página |
|---|---|
| `/` | Home com busca |
| `/destinos` · `/destinos/[slug]` | Explorador + página de destino (10 slugs) |
| `/guias` | Índice de guias editoriais |
| `/planejador` | Planejador Inteligente |
| `/calculadora` | Calculadora de Viagem |
| `/comparador` | Comparador de Destinos |
| `/roteiro` | Construtor de Roteiros |
| `/hospedagens` | Hospedagens e Experiências |
| `/metodologia` | Metodologia de custos |
| `/sobre` · `/contato` · `/afiliados` | Institucionais |
| `/privacidade` · `/cookies` · `/termos` | Legais |
| `/not-found`, `robots.ts`, `sitemap.ts` | Suporte |

Build de produção: **29 páginas estáticas geradas**.

### 1.3 Ferramentas (6)

1. **Planejador Inteligente** (`src/components/tools/PlannerTool.tsx`)
2. **Calculadora de Viagem** (`CalculatorTool.tsx`)
3. **Comparador de Destinos** (`CompareTool.tsx`)
4. **Construtor de Roteiros** (`ItineraryTool.tsx` + `src/lib/storage/itineraryStore.ts`)
5. **Descoberta de Destinos** (`DestinationExplorer.tsx` + `HeroSearch.tsx`)
6. **Hospedagens e Experiências** (`src/data/listings.ts` + `/hospedagens`)

> O teste funcional detalhado (cálculos, entradas inválidas, extremos, mobile) é da **FASE 4** e ainda **não foi executado** neste diagnóstico.

### 1.4 Destinos e atrações

**10 destinos** em `src/data/destinations/`:

| Grupo | Destinos |
|---|---|
| `group-one.ts` | Rio de Janeiro, São Paulo, Salvador, Olinda, Paraty |
| `group-two.ts` | Gramado, Bonito, Chapada Diamantina, Manaus, João Pessoa |

**56 atrações** cadastradas (30 no grupo 1, 26 no grupo 2), cada uma com `sources` (nome + URL + data de consulta).

### 1.5 Guias

10 guias editoriais (`src/data/guides/group-one.ts` e `group-two.ts`), todos com `updatedAt: 2026-11-13`.

### 1.6 Listagens (hospedagens e experiências)

`src/data/listings.ts` — hospedagens e experiências por destino; 2 listagens vinculadas ao slug `gramado` tratam do Vale dos Vinhedos (ver problema **CRÍT-2**).

### 1.7 Links externos

- **59 URLs únicas** extraídas dos dados e páginas institucionais.
- Checagem com `scripts/audit-links.mjs` (HEAD com fallback GET, 1 req/URL, timeout 12 s).
- Resultado (2ª execução): **33 OK · 26 com problema** = 12 × HTTP 403 + 14 falhas de resolução/tempo limite.
  - **403** em `cidades.ibge.gov.br`, `minimundo.com.br`, `viator.com`, `getyourguide.com` → bloqueio de automação, **não link quebrado** (o IBGE é citado como fonte legítima; confirmado que as URLs são as oficiais).
  - **14 ERR** (ENOTFOUND/timeout) → ver problema **ALTO-7**.

### 1.8 Integrações e monetização (estado real)

| Integração | Estado |
|---|---|
| **Stay22** | **Somente estrutura preparada.** `src/lib/affiliate/affiliate.ts` tem `PARTNERS`, `isPartnerEnabled()` e `buildOfferLink()`; sem credencial, sem script, sem endpoint real. Sem `STAY22_PUBLISHER_ID` → modo editorial (link sem rastreio). **Não há reserva, comissão ou conversão acontecendo.** |
| Booking / Viator / GetYourGuide / Civitatis | Estrutura + variáveis em `.env.example`, todas vazias → desabilitados |
| Expedia / Skyscanner / aluguel / seguros | `isPartnerEnabled()` retorna `false` fixo — sem variável, sem engano |
| Google Analytics / AdSense / Search Console | Variáveis em `.env.example`, vazias → **nenhum script é carregado** (confirmado: nenhum `next/script` no código) |
| API de clima / mapos / IA | Variáveis vazias; nada é chamado |

`.env.example` não contém segredos. Nenhuma chave privada no repositório.

### 1.9 Privacidade / LGPD (estado atual)

- **Sem backend**: o formulário de contato monta `mailto:` e abre o cliente de e-mail (`ContactForm.tsx:51-55`) — nenhum dado é enviado a servidor da RotaClara.
- **Cookies**: nenhum. Só `localStorage` do roteiro (`itineraryStore.ts`), declarado nas páginas `/privacidade` e `/cookies`.
- **Scripts externos de terceiros**: nenhum carregado (envs vazias).
- Páginas `/privacidade`, `/cookies`, `/termos`, `/sobre`, `/contato`, `/afiliados` existem e são linkadas no rodapé.

---

## 2. BASELINE DE QUALIDADE (antes de qualquer alteração)

Executado em 2026-11-14: `npm run verify` (= `typecheck && lint && test && build`)

| Verificação | Resultado |
|---|---|
| TypeScript | ✅ sem erros |
| ESLint | ✅ sem erros |
| Testes unitários/componentes | ✅ **171 testes em 7 arquivos — todos passaram** |
| Build de produção | ✅ 29 páginas estáticas |
| **EXIT** | **0** |

> O aviso `configLoader: 'native'` do Vite nos testes é informativo, não é falha.
> Este é o baseline que deve continuar verde ao final da Etapa 2.

---

## 3. PROBLEMAS ENCONTRADOS

Severidade: **CRÍTICO** = informação falsa / erro funcional grave / risco ao usuário · **ALTO** = informação incorreta / falha importante de SEO · **MÉDIO** = inconsistência / usabilidade · **BAIXO** = melhoria textual/visual.

### CRÍTICO

| ID | Problema | Evidência (arquivo:linha) | Verificação pessoal | Correção prevista (FASE 2) |
|---|---|---|---|---|
| **CRÍT-1** | **Canonical, Open Graph e sitemap de produção apontam para `http://localhost:3000`.** A env `NEXT_PUBLIC_SITE_URL` não está configurada na Vercel; `getSiteUrl()` cai no fallback. O sitemap publicado tem as 25 URLs todas em localhost; o canonical de `/destinos/gramado` também. Isso corrompe a indexação (Google recebe canônicos inválidos). | `src/lib/seo/seo.ts:14-24`, `src/app/sitemap.ts` | Confirmado via `https://rotaclara-theta.vercel.app/sitemap.xml` e HTML de `/destinos/gramado` | Definir `NEXT_PUBLIC_SITE_URL=https://rotaclara-theta.vercel.app` na Vercel (configuração de env, **sem deploy por minha conta**) + tornar o fallback mais explícito/documentado |
| **CRÍT-2** | **Gramado é apresentado como estando "no Vale dos Vinhedos"** — erro de identidade do destino. O Vale dos Vinhedos fica em **Bento Gonçalves, Garibaldi, Monte Belo do Sul e Pinto Bandeira**, não em Gramado. O erro aparece no destino, no guia e **2 listagens** do `/hospedagens` estão vinculadas ao slug `gramado` tratando do Vale. | `destinations/group-two.ts:41-42` (intro), `guides/group-two.ts:24-26`, `listings.ts:177-180` (`lod-gramado-vinhedos`), `listings.ts:337-340` (`exp-gramado-vinhedos`) | Confirmado por leitura + geografia pública (Vale dos Vinhedos = Bento Gonçalves e cidades vizinhas) | Reescrever a intro indicando Serra Gaúcha; tratar o Vale como **passeio entre localidades distintas** (deslocamento); vincular as listagens ao destino/região correta ou rotulá-las explicitamente como "passeio regional a partir de Gramado" |
| **CRÍT-3** | **Guia de Olinda diz que os mirantes abrem vista para a "Baía de Todos-os-Santos"** — essa baía é em Salvador. Olinda está voltada para o **Oceano Atlântico / orla da Região Metropolitana do Recife**. | `guides/group-one.ts:719-721` | Confirmado por leitura + verificação (Olinda: leste = Oceano Atlântico, sul = Recife) | Corrigir para "Oceano Atlântico" (formulação segura e verificável) |
| **CRÍT-4** | **Guia de São Paulo lista o "Museu do Amanhã" entre atrações cobradas de SP** — o museu fica no **Rio de Janeiro** (Praça Mauá). | `guides/group-one.ts:393` (seção "Custos" do guia de SP) | Confirmado por leitura; Museu do Amanhã = Rio (a própria base o cadastra como `rio-museu-do-amanha`, `group-one.ts:260`) | Remover do guia de SP (substituir por atração cobrada real de SP) |

### ALTO

| ID | Problema | Evidência | Verificação | Correção prevista |
|---|---|---|---|---|
| **ALTO-1** | **Cristo Redentor marcado como `isFree: true` com `admissionFeeBRL {0,0}`.** O acesso ao monumento é **obrigatoriamente pago** (trem do Corcovado ~R$ 139; van/pé ~R$ 60–87). As próprias `notes` do item admitem "o ingresso do trem é cobrado" — contradição interna. | `destinations/group-one.ts:145-146, 155-157` | Confirmado via sites oficiais (tremdocorcovado.rio: R$ 139; parquenacionaldatijuca.rio: R$ 60 a pé) | `isFree: false`, faixa real com fonte e data; manter `notes` |
| **ALTO-2** | **Rodovias erradas no acesso SP→Rio:** "Bandeirantes/Régis Bittencourt" — a Bandeirantes liga SP a Campinas/interior e a Régis Bittencourt vai SP→Curitiba. Nenhuma das duas vai ao Rio. | `destinations/group-one.ts:68-70` | Confirmado: rotas SP→Rio = **Dutra (BR-116), Anchieta e Imigrantes** | Corrigir o texto das rodovias |
| **ALTO-3** | **Distâncias `referenceFromSaoPaulo` incorretas** — o tipo define o valor como **deslocamento aéreo** (`types.ts:142`), mas os números não batem com nenhuma métrica: | `group-one.ts:877` (Olinda **1660**), `group-one.ts:1105` (Paraty **400**), `group-two.ts:1011` (João Pessoa **1750**), `group-two.ts:54` (Gramado **1100**) | Verificado: SP→Olinda/Recife aéreo ≈ **2.130 km**; SP→Paraty aéreo ≈ **205 km** (rodoviária ≈ 260 km); SP→João Pessoa aéreo ≈ **2.100 km**; SP→Gramado aéreo ≈ **840 km** (rodoviária ≈ 1.100 km — o valor 1100 parece ser rodoviário usado como aéreo) | Corrigir os 4 valores para a distância aérea e revisar os demais 6 destinos com a mesma régua |
| **ALTO-4** | **Poço Azul com `area: "Andaraí"` e fonte "Prefeitura de Andaraí"** — a gruta fica em **Nova Redenção/BA** (Povoado Peruca), Chapada Diamantina. | `destinations/group-two.ts:659, 662-663` | Confirmado (Wikipédia/Atlas Obscura/site oficial: Nova Redenção) | Corrigir `area` e fonte |
| **ALTO-5** | **Cachoeira da Fumaça com `area: "Vão do Gavião — região de Lençóis"`** — fica em **Palmeiras/BA, Vale do Capão** (município próprio, não "região de Lençóis"). | `destinations/group-two.ts:617` | Confirmado (Wikipédia: município de Palmeiras, Vale do Capão) | Corrigir para "Vale do Capão — Palmeiras/BA" |
| **ALTO-6** | **Espaço Cultural José Lins do Rego descrito como "antigo casarão" no "Centro"** — é um **centro de convenções moderno** (Av. Abdias Gomes de Almeida, 800, bairro **Tambauzinho**). O `id` do item é `jp-banco-imobiliário`, rótulo sem respaldo no conteúdo. | `destinations/group-two.ts:1150-1159` | Confirmado (Wikipédia, Apple Maps, Tripadvisor: Tambauzinho, centro de convenções) | Corrigir descrição, `area` e `id` |
| **ALTO-7** | **14 URLs de fonte falham em resolução DNS/tempo limite** — possivelmente inexistentes ou erradas, o que viola a regra "não inventar fontes": `jardimbotanico.jbrj.gov.br`, `mercadomunicipal.com.br`, `ihgbahia.org.br`, `funj.gov.br`, `visitorio.rj.gov.br`, `iel.rj.gov.br`, `vinhorgs.com.br`, `teatroamazonas.am.gov.br`, `am.gov.br`, `cultura.pb.gov.br`, `cultura.ba.gov.br`, `olinda.pe.gov.br`, `inpa.gov.br` (timeout) | Ocorrências em `destinations/group-one.ts` (L253, 521, 736, 796, 994, 1013, 1033, 1202, 1224) e `group-two.ts` (L225, 878, 918, 937, 976, 1163) + `guides/group-two.ts:896` | Executado 2× com o script (1 req/URL) | FASE 2/3: localizar as URLs oficiais corretas ou **remover a fonte** (não substituir por fonte inventada); itens sem fonte confiável ficam marcados como pendentes |
| **ALTO-8** | **Museu do Índio de Manaus com fonte FUNAI** — o museu de Manaus é mantido pela congregação **Salesiana** (Irmãs Salesianas); o Museu do Índio da FUNAI é outro, no Rio. | `destinations/group-two.ts:897-898` | Confirmado (Wikipédia "Museu do Índio (Manaus)": administração Salesianos; boletim salesiano) | Trocar a fonte/atribuição para a instituição correta ou remover |

### MÉDIO

| ID | Problema | Evidência |
|---|---|---|
| **MED-1** | **`<title>` duplicado "RotaClara – RotaClara"** no HTML publicado. Causa raiz: `layout.tsx:35` aplica `title.template = "%s · RotaClara"` **e** `buildMetadata()` já acrescenta o sufixo (`seo.ts:73`) — dupla composição. | `src/app/layout.tsx:33-35`, `src/lib/seo/seo.ts:73` |
| **MED-2** | **"Cidades vizinhas (Bento Gonçalves, Canela, Praia do Lino) — base alternativa no mesmo vale"**: Canela **não** está no Vale dos Vinhedos (fica na Rota Romântica); "no mesmo vale" reforça o erro do CRÍT-2. | `destinations/group-two.ts:112-113` |
| **MED-3** | **Critério de `distanceKm` misto**: Gramado = 1.100 (valor rodoviário) enquanto o tipo documenta aéreo — inconsistência entre destinos (ver ALTO-3). | `group-two.ts:54` vs `types.ts:142` |
| **MED-4** | **Divergências `bestMonths` × texto do guia** (Rio, São Paulo) e clima de Olinda: `climateByMonth` marca setembro como "chuvoso"… conferir contra o texto do guia que descreve setembro como seco. | `destinations/group-one.ts` (Rio, SP, Olinda) |
| **MED-5** | **Links para "museu/casa" com domínios oficiais suspeitos** (ver ALTO-7): até a correção, itens como Jardim Botânico (RJ), Mercado Municipal (SP), Igreja de São Francisco (BA), Museu Mamulengo (PE) dependem de fontes que não respondem. | `group-one.ts:253, 521, 736, 796, 1013` |
| **MED-6** | **Referências de transporte potencialmente imprecisas**: "conexões de trem e BRT" no aeroporto do Rio; "BRT" em São Paulo; metrô do Rio citado para a Barra (a Barra não é atendida pelo metrô convencional). | `group-one.ts:104, 106` (Rio), guias |
| **MED-7** | **Pendências geográficas não confirmadas** (não alterar sem verificação): "Estrada da Graúna" (Paraty), "Baía das Ilhas" (Paraty), terminal rodoviário de Olinda, `iel.rj.gov.br`. | `group-one.ts:1189, 1224` etc. |

### BAIXO

| ID | Problema | Evidência |
|---|---|---|
| **BAIXO-1** | Typos/texto: "3 a a 5 dias" (Salvador), "cobre"/"outuno" (Rio), "showmecos" (SP), frase aparentemente truncada no guia de Manaus. | `destinations/group-one.ts`, `group-two.ts`, `guides/group-two.ts` |
| **BAIXO-2** | Superlativo não verificável "trecho aéreo mais curto entre capitais brasileiras" (Rio) — há pares mais curtos. | `group-one.ts:69` |
| **BAIXO-3** | `geo: undefined` no JSON-LD de destino (`destinationJsonLd`) — campo declarado mas vazio; ou remover ou preencher com coordenadas verificadas. | `seo.ts:170` |

---

## 4. PENDÊNCIAS DE VERIFICAÇÃO (não alterar sem confirmação)

1. Domínios oficiais corretos para as 14 fontes do **ALTO-7** (priorizar: IBGE é válido; os demais precisam de pesquisa).
2. "Estrada da Graúna" e "Baía das Ilhas" em Paraty.
3. Terminal rodoviário de Olinda.
4. `iel.rj.gov.br` (Olimpíadas/IEL) — destino exato da fonte.
5. Termos exatos do programa Stay22 (documentação oficial) — FASE 5.
6. Melhores meses × clima × guia para os 10 destinos (revisão sistematizada — FASE 3).

---

## 5. VERIFICADO E CONSIDERADO ADEQUADO

- Baseline `verify` verde (171 testes, build OK).
- Sem credenciais ou chaves no repositório; `.env.example` limpo.
- Sem scripts de terceiros carregados sem consentimento (nenhum script existe).
- Formulário de contato sem coleta em servidor (mailto).
- Persistência local apenas do roteiro, declarada nas páginas de privacidade/cookies.
- Links afiliados: modo editorial sem env (não há link afiliado falso ativo).
- Identidade visual (navy+creme+dourado) consistente entre páginas.
- Atrações do Rio, São Paulo e Salvador: pertencimento à cidade correto (Museu do Amanhã no Rio está certo no destino; o erro é só no guia de SP — CRÍT-4).
- Buraco das Araras cadastrado em **Bonito/MS** (e não na Chapada) — correto; o achado preliminar de um revisor foi descartado por conferência.
- Bloqueios 403 do IBGE/Viator/GetYourGuide = proteção anti-bot, link válido.

---

## 6. PLANO DE CORREÇÃO POR FASE (decorrente deste diagnóstico)

| Fase | Escopo | Problemas atacados |
|---|---|---|
| **2 — Correções críticas** | Geografia e fatos em `destinations/`, `guides/`, `listings.ts` | CRÍT-2/3/4, ALTO-1..6, ALTO-8, MED-2, BAIXO-1 |
| **3 — Dados e conteúdo** | `COST_METHODOLOGY.md`, `DATA_SOURCES.md`, `DESTINATION_AUDIT.md`, fontes do ALTO-7, distâncias (ALTO-3), clima/bestMonths | ALTO-3, ALTO-7, MED-4, MED-7 |
| **4 — Ferramentas** | Teste real das 6 ferramentas (cálculos, inválidos, extremos, mobile) | (novo — sem problema pré-listado) |
| **5 — Monetização** | Stay22 pela doc oficial + divulgação; `MONETIZATION_AUDIT.md` | Status real (estrutura apenas) |
| **6 — SEO/privacidade/experiência** | `NEXT_PUBLIC_SITE_URL`, title duplicado, `SEO_AUDIT.md`, LGPD, acessibilidade | CRÍT-1, MED-1, MED-6, BAIXO-3 |
| **7 — Testes finais** | `verify` completo + relatórios (`TEST_REPORT.md`, `AUDIT_AFTER.md`, `ROADMAP.md`) | — |

---

**Declaração:** este relatório descreve apenas atividades realmente executadas (leitura de código, execução de `npm run verify`, checagem HTTP de links com 1 requisição por URL, consulta web pontual para confirmar alegações geográficas, inspeção do HTML publicado). Nenhum deploy, push, alteração de serviço externo ou alteração em arquivo do produto foi realizado até aqui.
