# COST_METHODOLOGY.md — Metodologia das estimativas de custo da RotaClara

- **Versão da metodologia:** 2.0 (Etapa 2)
- **Data de referência das faixas atuais:** 13/11/2026 (`referenceDate` de cada destino)
- **Moeda:** BRL (sem conversão de câmbio)
- **Relacionado:** `DATA_SOURCES.md` (fontes), página pública `/metodologia`

---

## 1. Princípio central

> **A RotaClara não apresenta número sem explicar de onde ele veio.**

Nenhum preço, disponibilidade ou cotação é consultado em tempo real nesta
versão. Tudo o que aparece como valor é rotulado em uma de **cinco
categorias**, e a interface distingue as categorias:

| Categoria | O que é | Onde aparece | Exemplo real na plataforma |
|---|---|---|---|
| **1. Faixa de referência do destino** | Estimativa editorial de custo diário por pessoa, com metodologia, data e limitações declaradas | Página do destino, planejador, comparador | Rio de Janeiro: R$ 260–720/dia por pessoa |
| **2. Preço confirmado em fonte externa** | Valor publicado por fonte oficial, com URL e data de consulta | Fichas de atração (`admissionFeeBRL`) | Cristo Redentor: R$ 60–139 (tremdocorcovado.rio, consultado em 14/11/2026) |
| **3. Valor informado pelo usuário** | Número digitado pelo usuário; é o **único** insumo da Calculadora | Calculadora de Viagem | "Hospedagem: R$ 350/dia — o que eu pago" |
| **4. Estimativa gerada pela ferramenta** | Combinação matemática dos itens 1 e 3 (sempre acompanhada da fórmula usada) | Planejador, calculadora | Total estimado = ponto médio da faixa × dias × pessoas |
| **5. Sem dado disponível** | Quando não há fonte suficiente, **nenhum número é produzido** | Planejador sem destino na base; atrações sem preço | "Sem estimativa de custo — destino fora da base" |

**Regra de ouro:** se não há fonte confiável, a plataforma **não gera
número fictício** — ela informa a ausência e convida o usuário a inserir o
valor dele (categoria 3).

---

## 2. Faixa de referência do destino (categoria 1)

### 2.1 O que a faixa cobre

Cada destino declara `minPerDayBRL` e `maxPerDayBRL`:

- **Unidade: por pessoa, por dia.** (Não é por quarto, não é por grupo, não
  é o total da viagem.)
- **Cobre:** hospedagem, alimentação, transporte local e passeios — em nível
  de preço usual do destino.
- **Não cobre:** passagens aéreas, temporada alta, câmbio, promoções,
  pedágio/combustível de carro próprio entre cidades (declarado em
  `limitations` de cada destino).

### 2.2 Como a faixa foi construída

1. Levantamento dos **níveis de preço usuais** do destino para os quatro
   blocos acima (hospedagem, alimentação, transporte local, passeios),
   usando os padrões de preço praticados no destino para o perfil
   intermediário.
2. Arredondamento proposital de valores (dezenas) — a faixa serve para
   **dimensionar orçamento**, não para fechar conta.
3. Registro em `cost.methodology` (texto exibido ao usuário),
   `cost.referenceDate` (data de referência) e `cost.limitations` (o que
   fica de fora).
4. Classificação em `costLevel` (ver §3) e `confidence` (ver §4).

> **Limitação declarada:** estas faixas são uma **síntese editorial de
> planejamento**, não uma cotação de mercado nem uma média estatística
> publicada por órgão oficial. Nenhum órgão (IBGE, INMET, Ministério do
> Turismo) publica "preço médio de diária por destino" — por isso a faixa é
> rotulada como estimativa e datada, e não como preço.

### 2.3 Tabela atual (data de referência 13/11/2026)

| Destino | Faixa (R$/dia por pessoa) | `costLevel` | `confidence` |
|---|---|---|---|
| João Pessoa | 180 – 520 | econômico | média |
| Olinda | 190 – 540 | econômico | média |
| Salvador | 220 – 620 | moderado | média |
| Paraty | 230 – 650 | moderado | média |
| São Paulo | 240 – 700 | moderado | média |
| Rio de Janeiro | 260 – 720 | moderado | média |
| Chapada Diamantina | 280 – 720 | moderado | média |
| Gramado | 300 – 850 | conforto | média |
| Manaus | 300 – 850 | conforto | **baixa** |
| Bonito | 350 – 950 | conforto | média |

> Manaus tem `confidence: "baixa"`: as excursões fluviais têm grande
> variação por operador e temporada, e isso é informado ao usuário no guia.

---

## 3. Perfis de viagem (`costLevel`)

`costLevel` é um **custo relativo entre os destinos cadastrados**, usado
para ordenação e vantagem no comparador — não é uma promessa de preço.

| Nível | Significado operacional |
|---|---|
| `economico` | Faixa inferior entre os destinos da base |
| `moderado` | Faixa intermediária |
| `conforto` | Faixa superior entre os destinos da base |

O comparador usa `COST_LEVEL_RANK` para apontar vantagem econômica
("menor custo relativo entre os destinos comparados") — **sem inventar
pontuação numérica** além da ordenação por nível.

---

## 4. Grau de confiança (`confidence`)

| Valor | Uso |
|---|---|
| `alta` | Faixa estreita e com fontes primárias abundantes do destino (nenhum destino nesta versão) |
| `media` | Faixa construída com padrões de preço usuais e fontes oficiais de contexto |
| `baixa` | Alto grau de variação por operador/temporada declarado no próprio conteúdo |

---

## 5. Como cada ferramenta usa (ou não usa) esses números

### 5.1 Planejador Inteligente (`planner.ts`)

```
total estimado = ponto médio da faixa do destino
               × multiplicador de hospedagem
               × dias
                 × (adultos + crianças)
```

- **Multiplicadores de hospedagem** (sobre a faixa do destino):
  `econômico 0,7 · padrão 1,0 · conforto 1,35 · luxo 2,1`.
- O resultado **sempre** exibe `methodology` e `referenceDate` junto do valor.
- Se não há destino na base: **nenhum número é gerado** — o planejador
  orienta o usuário para a Calculadora.
- Alertas automáticos: estimativa acima do orçamento informado, duração
  acima da recomendada, crianças sem faixa etária, viagem < 2 dias.

### 5.2 Distribuição do orçamento (fatias por categoria)

Percentuais de referência **por estilo de viagem** (econômico, relaxado,
equilibrado, intenso, aventura, luxo) aplicados ao total estimado.

> **Transparência:** esses percentuais são um **modelo editorial do
> projeto** para sugerir como dividir o orçamento — **não são médias de
> mercado coletadas**. A interface declara isso explicitamente
> ("modelo editorial de divisão por estilo de viagem — não é média de
> mercado coletada"). Para dividir com valores reais do usuário, a
> Calculadora é a ferramenta indicada.

### 5.3 Calculadora de Viagem (`calculator.ts`)

- **100% dos números vêm do usuário.** A calculadora não consulta nem
  multiplica faixas de destino.
- Soma itens por categoria, calcula total, custo por pessoa, custo diário,
  participação percentual de cada categoria, diferença para o orçamento
  informado e economia mensal necessária quando o total excede o
  orçamento.
- Validação antes do cálculo: dias 1–365, pessoas 1–50, orçamento não
  negativo, valores de despesa não negativos. **Nada é calculado com entrada
  inválida** (a função `validate()` retorna os erros por campo).
- Limites de aritmética: `people` e `days` têm mínimo 1 (evita divisão por
  zero); percentuais somam 100% quando há despesas e 0% quando não há.

### 5.4 Comparador de Destinos (`compare.ts`)

- Compara: `costLevel` (custo relativo), distância de referência,
  duração recomendada e critérios declarados no destino.
- Não atribui nota 0–10 nem ranking inventado: a "vantagem" aponta o índice
  do destino vencedor por critério e explica o porquê em texto
  (ex.: "Menor custo diário estimado entre os destinos comparados").
- Empate ou dado ausente → sem vantagem declarada (`index: null`).

### 5.5 Construtor de Roteiros (`itinerary.ts`)

- Trabalha com o que o usuário monta; não calcula deslocamento geográfico
  otimizado nem apresenta itinerário como "otimizado" — não há cálculo de
  rota real na base.

### 5.6 Hospedagens e Experiências

- Exibem **nível de preço** (`priceLevel`: econômico/moderado/conforto) e
  descrição — **nunca** um valor monetário, porque não há integração de
  reservas.

---

## 6. Fatores que fazem o preço variar (declarados ao usuário)

- Época (temporada alta, feriados, Natal Luz, férias escolares)
- Nível de hospedagem (o multiplicador do planejador)
- Perfil do grupo (adultos/crianças, nº de pessoas para dividir custos
  coletivos)
- Operador de excursão (Bonito, Chapada, Manaus)
- Local de hospedagem (centro vs. bairro; cidade vizinha vs. base turística)
- Distância entre a hospedagem e as atrações (custo de deslocamento diário)

---

## 7. O que a RotaClara NUNCA faz com custos

- ❌ Apresentar preço como "atual" sem data de consulta.
- ❌ Misturar valor por pessoa com valor por quarto.
- ❌ Gerar número quando não há fonte (usa a categoria "sem dado").
- ❌ Simular reserva, desconto, comissão ou disponibilidade.
- ❌ Tratar estimativa de planejamento como cotação contratável.
- ❌ Converter moeda sem fonte cambial declarada.

---

## 8. Rotina de revisão

1. **A cada revisão editorial de destino:** atualizar `referenceDate` das
   faixas tocadas e `updatedAt` do destino/guia.
2. **Anual (ou antes):** revisão geral das faixas — valores de um ano não
   valem necessariamente para o próximo.
3. **Ao detectar preço publicado por fonte oficial** (ex.: ingresso de
   atração): registrar em `admissionFeeBRL` com URL e `consultedAt`.
4. **Se uma faixa não puder ser sustentada:** reduzir a confiança, marcar a
   limitação — ou remover o número.

---

## 9. Histórico de mudanças desta metodologia

| Data | Mudança |
|---|---|
| 13/11/2026 | Versão 1 — faixas por destino com `methodology`/`referenceDate`/`limitations` |
| 14/11/2026 | v2 (Etapa 2) — classificação explícita das 5 categorias de valor; transparência dos percentuais de distribuição do planejador (modelo editorial, não média de mercado); registro de preço verificado do Cristo Redentor como exemplo de categoria 2 |
