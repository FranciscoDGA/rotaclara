# Fontes de dados — RotaClara

> Quais fontes sustentam o conteúdo, como são consultadas, o que cada uma
> suporta e quais limitações ficam declaradas. **Data de referência das
> fontes desta versão: 13/11/2026.**

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
| INPA | `inpa.gov.br` | Pesquisa e área da Amazônia | Contexto ambiental (Manaus) |
| FUNAI | `gov.br/funai/pt-br` | Referências indígenas oficiais | Avisos culturais e restrições |
| Visit Brasil | `visitbrasil.com` | Conteúdo promocional oficial de destinos | Material de apoio editorial |
| Turisimo municipal (ex.: Rio, Salvador) | `riotur.rio`, prefeituras | Pontos turísticos, transporte urbano | Seções locais |

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

## 7. Registro de acessos do agente

Nesta versão, as únicas verificações automatizadas de disponibilidade
feitas em fontes externas foram:

| Data | Fonte | Resultado |
| --- | --- | --- |
| 13/11/2026 | `gov.br/turismo` | HTTP 200 |
| 13/11/2026 | `visitbrasil.com` | HTTP 200 |
| 13/11/2026 | `portal.inmet.gov.br` | HTTP 200 |
| 13/11/2026 | `cidades.ibge.gov.br` | HTTP 403 (bloqueio de automação) — ver limitação acima |

Qualquer nova verificação que vire rotina deve ser registrada nesta tabela
com data e resultado.
