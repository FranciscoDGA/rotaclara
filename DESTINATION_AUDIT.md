# DESTINATION_AUDIT.md — Auditoria dos destinos e atrações (Etapa 2)

- **Data da auditoria:** 2026-11-14
- **Escopo:** 10 destinos, 56 atrações, 10 guias editoriais (`src/data/destinations/`, `src/data/guides/`, `src/data/listings.ts`)
- **Método:** leitura integral dos dados · alegações geográficas confirmadas por verificação web (fontes citadas abaixo) · checagem HTTP das URLs de `sources` · alinhamento `bestMonths` × `bestTimeNotes` × guia
- **Relacionado:** `AUDIT_BEFORE.md` (achados), `DATA_SOURCES.md` (fontes), `COST_METHODOLOGY.md` (custos)

Legenda de status: **✅ verificado** = conferido e correto · **🔧 corrigido** = problema real corrigido nesta etapa · **⏳ pendência** = não alterado sem confirmação (declarado em `notes` ou neste relatório).

---

## 1. Quadro-resumo por destino

| Destino | Status | Correções aplicadas | Pendências |
|---|---|---|---|
| **Rio de Janeiro** | 🔧 corrigido | Cristo Redentor `isFree: true` → **pago R$ 60–139** (tremdocorcovado.rio, 14/11/2026); rodovias SP→Rio (Bandeirantes/Régis Bittencourt → **Dutra, Anchieta, Imigrantes**); superlativo "trecho mais curto" removido; `bestMonths` + FAQ do guia alinhados (março–maio, set–nov); Jardim Botânico com fonte nova (`gov.br/jbrj`); Galeão "trem e BRT" → "BRT e ônibus"; Museu do Amanhã removido do guia de **SP** (CRÍT-4); typos ("outuno", "cobre a", "showmecos") | — |
| **São Paulo** | 🔧 corrigido | `bestMonths` → mar–mai e set–nov (batia com o próprio texto, não com a lista); BRT removido do aeroporto/rodoviário (SP não tem BRT); Museu do Amanhã removido dos custos do guia; Mercado Municipal → fonte `mercadomunicipalsp.com` (200) | — |
| **Salvador** | 🔧 corrigido | Fonte do Farol da Barra: `ihgbahia.org.br` (DNS inexistente) → **IPAC** `ipac.ba.gov.br` (200); typo "3 a a 5 dias"; atrações do guia (Praia do Forte etc.) conferidas | — |
| **Olinda** | 🔧 corrigido | **Baía de Todos-os-Santos → Oceano Atlântico/Orla da RM do Recife** (CRÍT-3); aeroporto → "Recife/Guararapes–Gilberto Freyre (REC)"; `rain` realinhado ao período seco set–mar declarado; fontes `olinda.pe.gov.br` sem `www` (308→200); Museu do Mamulengo → fonte **UNIMA/WEPa** (200) em vez de Funj (DNS inexistente); terminal rodoviário reescrito (terminais integrados metropolitanos; interestadual via Recife) | Conferência do clima mês a mês com **normais do INMET** (não publicada em fonte única nesta auditoria — texto mantido aderente ao `bestTimeNotes` do próprio destino) |
| **Paraty** | 🔧 corrigido | `distanceKm` 400 → **270 km rodoviários** (Rio-Santos/Imigrantes) com `notes` explícito da métrica; "Baía das Ilhas" → **"Ilhas da Baía de Paraty"** (toponimo sem respaldo; passeios são pela Baía de Paraty); fonte `visitorio.rj.gov.br` (DNS inexistente) e `iel.rj.gov.br` → **Prefeitura de Paraty** `paraty.rj.gov.br` (200) | **Estrada da Graúna**: existência confirmada (bairro e cachoeira da Graúna, em Paraty), mas fonte **oficial específica** pendente — marcado em `notes` do item |
| **Gramado** | 🔧 corrigido | **"no Vale dos Vinhedos" → Serra Gaúcha** (CRÍT-2): destino, guia e 2 listagens reescritos tratando o Vale como **deslocamento entre localidades** (Bento Gonçalves, Garibaldi, Monte Belo do Sul); MED-2 "no mesmo vale"/"Praia do Lino" corrigido; `distanceKm` 1100 mantido como **rodoviário** com `notes` declarando a métrica; fonte `vinhorgs.com.br` (DNS) → **valedosvinhedos.com.br** (200); `bestMonths` +dezembro (Natal Luz, conforme guia) | — |
| **Bonito** | 🔧 corrigido | `bestMonths` → abr–set (alinha ao "estação seca abril–setembro" de `bestTimeNotes` e guia); Buraco das Araras confirmado **em Bonito/MS** (achado preliminar de revisor descartado por conferência) | — |
| **Chapada Diamantina** | 🔧 corrigido | **Poço Azul: Andaraí → Nova Redenção** (ALTO-4, fonte `pocoazul.com.br` 200); **Cachoeira da Fumaça: "Vão do Gavião/Lençóis" → "Vale do Capão — Palmeiras/BA"** (ALTO-5, fonte `gov.br/icmbio` 200); `distanceKm` 1600 → **1360**; `bestMonths` → mai–set ("maio a setembro" no guia e notes) | — |
| **Manaus** | 🔧 corrigido | **Museu do Índio: fonte FUNAI → Irmãs Salesianas** (ALTO-8, fonte Arquidiocese de Manaus 200, com `notes` distinguindo do museu da FUNAI no Rio); `distanceKm` 2700 mantido (aéreo conferido); `bestMonths` → jun–set ("junho a setembro"); frase truncada do guia ("…e museus.") corrigida; fontes `am.gov.br`/`inpa.gov.br`/`teatroamazonas` → `amazonas.am.gov.br`, `gov.br/inpa`, `cultura.am.gov.br` (todas 200) | — |
| **João Pessoa** | 🔧 corrigido | **José Lins do Rego: "antigo casarão no Centro" → centro de convenções moderno em Tambauzinho** (ALTO-6), `id` `jp-banco-imobiliario` → `jp-jose-lins-do-rego` (nenhuma referência externa ao id antigo); fonte → **Funesc** `funesc.pb.gov.br` (200); `distanceKm` 1750 → **2210** (aéreo confirmado) | — |

### 1.1 Convenção de distância (MED-3 — resolvido)

Documentada em `types.ts` (`referenceFromSaoPaulo`): **aéreo quando há voo comercial; rodoviária quando não há voo próprio** (Gramado, Paraty), com `flightMinutes: null` e `notes` informando a métrica. Valores corrigidos nesta etapa:

| Destino | Antes | Depois | Métrica |
|---|---|---|---|
| Olinda | 1660 | **2130** | aérea (SP–Recife) |
| Paraty | 400 | **270** | rodoviária (declarada) |
| João Pessoa | 1750 | **2210** | aérea |
| Chapada Diamantina | 1600 | **1360** | aérea (GRU–SSA) + trecho regional declarado |
| Gramado | 1100 | 1100 | rodoviária (declarada — o valor antigo já era rodoviário) |
| Rio, SP, Salvador, Bonito, Manaus | — | mantidos | aéreos conferidos (SP→Rio 360/70min etc.) |

---

## 2. Auditoria de atrações (56)

### 2.1 Atrações corrigidas

| ID | Atração | Problema | Correção | Verificação |
|---|---|---|---|---|
| `rio-cristo` | Cristo Redentor | `isFree: true`, taxa {0,0} — acesso é obrigatoriamente pago | `isFree: false`, taxa **R$ 60–139**, 2ª fonte (tremdocorcovado.rio) e `notes` com data | Sites oficiais consultados em 14/11/2026 (trem R$ 139; a pé/van ~R$ 60) |
| `chap-poço-azul` | Poço Azul | `area: "Andaraí"` + fonte inexistente | `area: "Nova Redenção"` + fonte oficial `pocoazul.com.br` (HTTP 200) | Wikipédia/Atlas/site oficial: Povoado Peruca, Nova Redenção |
| `chap-cachoeira-fumaca` | Cachoeira da Fumaça | `area: "Vão do Gavião — região de Lençóis"` | `"Vale do Capão — Palmeiras/BA"` + fonte ICMBio | Município de Palmeiras (Wikipédia/ICMBio) |
| `man-museu-do-indio` | Museu do Índio (Manaus) | Fonte FUNAI (outro museu, no Rio) | Fonte Irmãs Salesianas + `notes` de distinção | Wikidata/Arquidiocese: mantido pelas Salesianas |
| `jp-jose-lins-do-rego` | Espaço Cultural José Lins do Rego | "antigo casarão", `area: "Centro"`, id `jp-banco-imobiliario` | Centro de convenções moderno, `area: "Tambauzinho"`, id novo, fonte Funesc | Wikipédia/Maps: Av. Abdias Gomes de Almeida, 800, Tambauzinho |
| `gra-vale-dos-vinhedos` | Vale dos Vinhedos (listagem em Gramado) | Apresentado como parte de Gramado | Listagens reescritas como **passeio/deslocamento** de Gramado para Bento Gonçalves e vizinhas | Geografia pública (Vale = Bento Gonçalves, Garibaldi, Monte Belo do Sul, Pinto Bandeira) |
| `par-baia-das-ilhas` | "Baía das Ilhas" | Toponimo sem respaldo em Paraty | Renomeada **"Ilhas da Baía de Paraty"** (`area: "Baía de Paraty"`) + guia ajustado | Passeios de barco de Paraty são pela Baía de Paraty |
| Fontes de 14 atrações | Jardim Botânico, Mercado Municipal, Farol da Barra, Rua do Amparo, Museu do Mamulengo, Ilhas/Cachoeiras de Paraty, Vale dos Vinhedos, Teatro Amazonas, Governo do AM, INPA ×2, José Lins do Rego, (e guia do INPA) | URLs com DNS inexistente/timeout | Substituídas por URLs oficiais **testadas (HTTP 200)** — ver §3 | `scripts/audit-links.mjs` |

### 2.2 Atrações verificadas sem problema (amostragem integral)

- **Rio:** Pão de Açúcar, Jardim Botânico, Museu do Amanhã, Ipanema, Tijuca — pertencimento à cidade correto, faixas com fonte.
- **SP:** MASP, Pinacoteca, Mercado Municipal, Ibirapuera — ok.
- **Salvador:** Pelourinho, Elevador Lacerda, Farol da Barra (fonte trocada), Praia do Forte — ok.
- **Olinda:** Igrejas do Sítio Histórico, Rua do Amparo, Museu do Mamulengo (fonte trocada) — ok.
- **Bonito:** Flutuação, Gruta do Lago Azul, **Buraco das Araras (corretamente em Bonito/MS, não na Chapada)**, Rio Sucuri, Buraco Verde — ok.
- **Chapada:** Buracão, Vale do Pati, Lençóis — ok.
- **Manaus:** Encontro das Águas, Teatro Amazonas (fonte trocada), Palácio Rio Negro, Bosque da Ciência — ok.
- **João Pessoa:** Ponta do Seixas, Centro Histórico, Cabo Branco, Manaíra — ok.
- **Gramado:** Mini Mundo, Lago Negro, Rua Coberta, Snowland, Natal Luz — ok.

### 2.3 Atrações com pendência declarada (não alteradas)

| Item | Pendência | Como está declarado |
|---|---|---|
| Cachoeiras do entorno (Paraty, `par-cachoeiras`, área "Estrada da Graúna e região") | Estrada da Graúna **existe** (bairro/cachoeira em Paraty), mas falta fonte oficial específica | `notes`: "Fonte oficial específica pendente de verificação — confirme a abertura com a prefeitura ou com o operador local antes de ir." |
| Clima de Olinda (mês a mês) | Conferência com normais oficiais do INMET não concluída em fonte única | `rain` alinhado ao período seco set–mar do próprio `bestTimeNotes` do destino |
| `geo` no JSON-LD (`destinationJsonLd`) | Sem coordenadas verificadas na base | Campo **removido** (antes: `geo: undefined`) — preferir omitir a publicar localização imprecisa (BAIXO-3) |

---

## 3. Auditoria das fontes (`sources`) — resultado final

Rodada de `scripts/audit-links.mjs` após as correções (2026-11-14, 1 requisição/URL):

```
TOTAL=60  OK=47  PROBLEM=13   →  13 são HTTP 403 anti-bot (IBGE ×11, Viator, GetYourGuide, minimundo)
Falhas reais (DNS/timeout): 0   (antes: 14)
```

- Os 403 são bloqueio de automação em URLs **oficiais e válidas** (padrões canônicos do IBGE etc.) — não são links quebrados. A checagem manual é registrada no cabeçalho de `group-one.ts`.
- 13 URLs novas foram testadas individualmente (HTTP 200) antes de entrar no código: `pocoazul.com.br`, `gov.br/icmbio`, `funesc.pb.gov.br`, `arquidiocesedemanaus.org.br` (artigo), `gov.br/jbrj`, `mercadomunicipalsp.com`, `ipac.ba.gov.br`, `olinda.pe.gov.br` (sem www), `wepa.unima.org`, `paraty.rj.gov.br`, `valedosvinhedos.com.br`, `cultura.am.gov.br`, `gov.br/inpa`.

---

## 4. Alinhamento calendário (MED-4 — resolvido)

Regra aplicada: `bestMonths` = meses que **o próprio texto** (`bestTimeNotes` + FAQ do guia) recomenda.

> **Convenção de índice (importante):** `bestMonths` segue o contrato de
> `types.ts` — **índices 0–11 (0 = janeiro)**, como já faziam os testes e a
> UI do explorador. Os arrays abaixo estão nessa convenção. Na FASE 4 foi
> corrigido um **off-by-one**: os dados estavam em 1–12 (continham `12`),
> o que deslocava +1 todos os meses exibidos (cards, tabela de clima,
> comparador) e o filtro de meses da listagem.

| Destino | `bestMonths` final (0–11) | Texto de referência |
|---|---|---|
| Rio | [2,3,4,8,9,10] = mar–abr–mai, set–out–nov | "Primavera e outono…" (destino) + FAQ do guia (março a maio, set–nov) |
| São Paulo | [2,3,4,8,9,10] = mar–abr–mai, set–out–nov | "Março a maio e setembro a novembro" (destino + guia) |
| Salvador | [8,9,10,11,0,1,2] = set–mar | estação seca set–mar (destino + guia) ✅ já coerente |
| Olinda | [8,9,10,11,0,1,2] = set–mar | estação seca set–mar (destino + guia) — `rain` realinhado |
| Paraty | [3,4,5,6,7,8] = abr–set | "Abril a setembro" (destino + guia) ✅ |
| Gramado | [3,4,5,6,10,11] = abr–jul + nov–dez | inverno jun–ago + amenos out–prim + **dezembro (Natal Luz)** (guia) |
| Bonito | [3,4,5,6,7,8] = abr–set | "estação seca abril a setembro" (destino + guia) |
| Chapada | [4,5,6,7,8] = mai–set | "maio a setembro" (destino + guia) |
| Manaus | [5,6,7,8] = jun–set | "junho a setembro" (destino + guia) |
| João Pessoa | [8,9,10,11,0,1,2] = set–mar | estação seca set–mar (destino + guia) ✅ |

FAQ do Rio corrigida de "Abril, maio, outubro e novembro" para "Março a maio e de setembro a novembro" (alinha com o destino).

---

## 5. Lista final de pendências (não resolvidas por falta de fonte — sem invenção)

1. **Normais climáticas do INMET para Olinda** (conferência mês a mês) — enquanto isso, `rain` segue o período seco declarado pelo próprio destino.
2. **Fonte oficial específica para as cachoeiras da Estrada da Graúna (Paraty)** — existência da estrada confirmada; abertura/preço dependem de fonte oficial (declarado em `notes`).
3. **`iel.rj.gov.br`** (item original do AUDIT_BEFORE): domínio inexistente; substituído por Prefeitura de Paraty — se o órgão original (IEF-RJ) for necessário, precisa de nova verificação.
4. **Coordenadas geográficas verificadas** para preencher `geo` do JSON-LD (hoje o campo é omitido).
5. **Conferência dos 403 (IBGE etc.) manualmente no navegador** na próxima revisão editorial (fora do alcance de automação).

---

**Declaração:** este relatório descreve apenas verificações realmente executadas (leitura de código, consultas web com fontes citadas, testes HTTP individuais, execução do checador de links). Nenhum número, fonte ou fato foi inventado; onde não havia fonte confiável, a pendência está declarada no código e nesta lista.
