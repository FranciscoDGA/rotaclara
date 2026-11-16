# Fontes de dados — RotaClara

> Quais fontes sustentam o conteúdo, como são consultadas, o que cada uma
> suporta e quais limitações ficam declaradas. **Data de referência das
> fontes desta versão: 14/11/2026** (Etapa 2 — ver §7 e §8).

## 1. Política geral

1. **Toda alegação relevante tem fonte e data.** No código, cada destino
   declara `sources: [{ name, url, consultedAt }]` e cada atração pode
   declarar a fonte própria. A data aparece na página do destino.
2. **Fonte oficial primeiro.** Preferimos governo, instituto oficial e site
   próprio do atrativo antes de conteúdo comercial.
3. **Sem dado, sem número.** Se a fonte não responde ou não cobre o caso,
   o campo exibe "Sem dado disponível" — nunca estimativa disfarçada de
   fato.
4. **Estimativa é rotulada como estimativa**, com metodologia e data, mesmo
   quando a fonte é confiável (faixas mudam; por isso são faixas).
5. **Revisão datada.** Ao revisar um guia, o `updatedAt` é atualizado e
   reflete no `lastmod` do sitemap.
6. **URL só entra no código se responder HTTP 200 na verificação**
   (Etapa 2). Quando não há fonte oficial encontrada, a pendência é
   declarada em `notes` do item e em `DESTINATION_AUDIT.md` — nunca
   substituímos por URL inventada.

## 2. Fontes consultadas e o que cada uma suporta

| Fonte | URL | Suporta | Uso na v1 |
| --- | --- | --- | --- |
| IBGE — Cidades | `cidades.ibge.gov.br` | População, território, gentílico, dados municipais | Contexto geográfico/demográfico de cada destino |
| Ministério do Turismo | `gov.br/turismo/pt-br` | Referências gerais de turismo, campanhas, dados setoriais | Seção "como chegar/contexto", metodologia |
| INMET | `portal.inmet.gov.br` | Boletins e normais climáticas | Seção de clima mensal (temperatura, chuva) |
| Prefeituras e institutos estaduais de turismo | sites oficiais de cada município/estado | Atrações, horários, transporte local, eventos | Atrações e logística local |
| Sites oficiais dos atrativos | ex.: `masp.org.br`, `museudoamanha.org.br`, `bondinho.com.br` | Horário, ingresso, regras de visita | Fichas de atração |
| ICMBio / Parques nacionais | `gov.br/icmbio/pt-br` | Acesso a áreas protegidas, regras de visitação | Destinos de natureza (ex.: Lençóis, Bonito) |
| IPHAN | `gov.br/iphan/pt-br` | Patrimônio tombado, centros históricos | Destinos com valor histórico |
| INPA (portal gov.br) | `gov.br/inpa/pt-br` | Pesquisa e área da Amazônia | Contexto ambiental (Manaus) |
| FUNAI | `gov.br/funai/pt-br` | Referências indígenas oficiais | Avisos culturais e restrições |
| Visit Brasil | `visitbrasil.com` | Conteúdo promocional oficial de destinos | Material de apoio editorial |
| Turismo municipal (ex.: Rio, Salvador) | `riotur.rio`, prefeituras | Pontos turísticos, transporte urbano | Seções locais |

### 2.1 Fontes novas/validadas na Etapa 2 (todas testadas HTTP 200 em 14/11/2026)

| Fonte | URL | Suporta | Substituiu |
| --- | --- | --- | --- |
| Instituto de Pesquisas Jardim Botânico do Rio de Janeiro | `gov.br/jbrj/pt-br` | Jardim Botânico do Rio | `jardimbotanico.jbrj.gov.br` (DNS inexistente) |
| Mercado Municipal de São Paulo (site oficial) | `mercadomunicipalsp.com` | Mercadão de SP | `mercadomunicipal.com.br` (DNS inexistente) |
| IPAC — Instituto do Patrimônio Artístico e Cultural da Bahia | `ipac.ba.gov.br` | Patrimônio baiano (Farol da Barra) | `ihgbahia.org.br` (DNS inexistente) |
| Prefeitura de Olinda | `olinda.pe.gov.br` (sem `www` — `www` dá 308) | Atrações do Sítio Histórico | idem com `www` (timeout) |
| UNIMA — Enciclopédia de Marionetes (WEPa) | `wepa.unima.org` | Museu do Mamulengo (Olinda) | `funj.gov.br` (DNS inexistente) |
| Prefeitura de Paraty | `paraty.rj.gov.br` | Atrações e passeios de Paraty | `visitorio.rj.gov.br` e `iel.rj.gov.br` (DNS inexistente) |
| Vale dos Vinhedos (site oficial do destino) | `valedosvinhedos.com.br` | Enoturismo do vale | `vinhorgs.com.br` (DNS inexistente) |
| Poço Azul (site oficial) | `pocoazul.com.br` | Gruta do Poço Azul, Nova Redenção | `andarai.ba.gov.br` (fonte errada: o atrativo não fica em Andaraí) |
| ICMBio | `gov.br/icmbio/pt-br` | Cachoeira da Fumaça (Palmeiras/Vale do Capão) | Prefeitura de Lençóis (município errado) |
| Secretaria de Estado da Cultura do Amazonas | `cultura.am.gov.br` | Teatro Amazonas | `teatroamazonas.am.gov.br` (DNS inexistente) |
| Governo do Estado do Amazonas | `amazonas.am.gov.br` | Contexto do Amazonas | `am.gov.br` (DNS inexistente) |
| Arquidiocese de Manaus — Irmãs Salesianas | `arquidiocesedemanaus.org.br` (artigo) | Mantenedoras do Museu do Índio de Manaus | FUNAI (administra outro museu, no Rio) |
| Funesc — Fundação Espaço Cultural da Paraíba | `funesc.pb.gov.br` | Espaço Cultural José Lins do Rego (Tambauzinho) | `cultura.pb.gov.br` (timeout) |
| Trem do Corcovado (site oficial) | `tremdocorcovado.rio` | Ingresso do Cristo Redentor (R$ 60–139, 14/11/2026) | — (2ª fonte do item, antes só IBAMA) |

> Cada linha acima é exemplificada **por destino no próprio código** —
> `src/data/destinations/group-one.ts` e `group-two.ts` guardam URL e data
> de consulta de cada fonte realmente usada.

## 3. Limitações conhecidas (honestidade documentada)

| Limitação | Efeito | Como mitigamos |
| --- | --- | --- |
| **IBGE bloqueia acesso automatizado (HTTP 403)** | Não é possível coletar dados municipais por robô | Dados usados vêm de material publicado e revisados manualmente; a limitação é registrada aqui e na página de metodologia |
| Fontes oficiais podem mudar de URL | Link pode quebrar | Revisão por data de consulta; correções têm prioridade pelo canal de contato |
| Horários e preços de atrações mudam com frequência | Ficha pode desatualizar | Exibimos a data da consulta e orientamos a confirmar no site oficial (link presente) |
| Não há integração de reservas (v1) | Sem preço/disponibilidade em tempo real | Não exibimos esses campos — nenhum dado é simulado |
| Clima é normal histórica, não previsão | "Quando ir" é orientação, não previsão | Rotulamos como normais climáticas com fonte INMET |
| Conferência mês a mês das normais do INMET nem sempre concluída por destino (ex.: Olinda) | Classificação mensal de chuva pode ser aproximada | O `rain` é mantido aderente ao período seco/chuvoso declarado no próprio `bestTimeNotes` do destino; pendência registrada em `DESTINATION_AUDIT.md` §5 |

## 4. O que NUNCA fazemos

- ❌ Inserir preço, nota, desconto ou disponibilidade sem fonte real.
- ❌ Copiar texto de terceiros sem atribuição (todo fato é reescrito com
  fonte declarada).
- ❌ Manter número antigo sem data — ou a data é atualizada, ou o número sai.
- ❌ Misturar estimativa com fato: estimativa sempre carrega `methodology`
  e `referenceDate`.

## 5. Rotina de revisão

1. **A cada revisão de destino/guia:** atualizar `updatedAt` e o
   `consultedAt` das fontes tocadas.
2. **Ao notificar erro (contato):** correção tratada com prioridade; se a
   fonte primária caiu, o dado é removido ou marcado como não verificado.
3. **Anual (ou antes):** revisão geral das datas de referência das faixas
   de custo — os valores podem não valer para o ano seguinte.
4. **Se uma família de fonte inteira ficar indisponível:** registrar em
   "Limitações conhecidas" desta página e na metodologia.

## 6. Como uma estimativa de custo é construída

- Faixas diárias por pessoa (`minPerDayBRL`–`maxPerDayBRL`) por destino,
  cobrindo hospedagem, alimentação, transporte local e passeios.
- Arredondadas de propósito: servem para **dimensionar orçamento**, não
  para fechar conta.
- Cada destino declara `methodology` (como a faixa foi montada),
  `referenceDate` e `limitations` (o que ela não inclui — normalmente
  passagens).
- As ferramentas (planejador, calculadora) apenas **combinam** essas faixas
  com o que o usuário informa; nenhuma consulta externa é feita.
- A classificação completa das categorias de valor, multiplicadores do
  planejador, limites da calculadora e política "sem dado → usuário
  informa" está em **`COST_METHODOLOGY.md`** (v2.0).

## 7. Auditoria de links (Etapa 2)

Executada com `scripts/audit-links.mjs` (HEAD com fallback GET,
**1 requisição por URL**, timeout 12 s) em 14/11/2026, antes e depois das
correções:

| Rodada | Total | OK | Problemas | Falhas reais (DNS/timeout) |
| --- | --- | --- | --- | --- |
| Antes (FASE 1) | 59 | 33 | 26 | **14** |
| Depois (FASE 2/3) | 60 | 47 | 13 | **0** |

- As 13 ocorrências restantes são **HTTP 403 anti-bot** em URLs oficiais
  válidas: `cidades.ibge.gov.br` (11), `viator.com`, `getyourguide.com`,
  `minimundo.com.br` — bloqueio de automação, não link quebrado. Conferido
  manualmente que são os padrões canônicos.
- As 14 falhas reais da rodada inicial foram resolvidas com as fontes da
  §2.1 (todas testadas individualmente com HTTP 200 antes de entrar no
  código).
- Reexecutar: `node scripts/audit-links.mjs` (requer rede).

## 8. Registro de acessos do agente

Verificações automatizadas de disponibilidade feitas em fontes externas:

| Data | Fonte | Resultado |
| --- | --- | --- |
| 13/11/2026 | `gov.br/turismo` | HTTP 200 |
| 13/11/2026 | `visitbrasil.com` | HTTP 200 |
| 13/11/2026 | `portal.inmet.gov.br` | HTTP 200 |
| 13/11/2026 | `cidades.ibge.gov.br` | HTTP 403 (bloqueio de automação) — ver limitação acima |
| 14/11/2026 | 14 URLs candidatas da §2.1 (1 req cada) | 13 × HTTP 200; `teatroamazonas.am.gov.br` e demais domínios errados descartados por DNS inexistente |
| 14/11/2026 | `tremdocorcovado.rio` | HTTP 200 — preço do Cristo Redentor (R$ 60–139) |
| 14/11/2026 | Rodadas do `audit-links.mjs` (59 → 60 URLs, 1 req/URL) | 14 falhas reais → 0; restam 403 anti-bot |
| 14/11/2026 | Consultas web de confirmação geográfica (Poço Azul, Fumaça, José Lins do Rego, Museu do Índio/Manaus, distâncias SP→Olinda/Paraty/João Pessoa) | Alegações do `AUDIT_BEFORE.md` confirmadas; correções aplicadas em `DESTINATION_AUDIT.md` |

Qualquer nova verificação que vire rotina deve ser registrada nesta tabela
com data e resultado.
