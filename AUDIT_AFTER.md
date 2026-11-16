# AUDIT_AFTER.md — Relatório pós-auditoria e correções (Etapa 2)

- **Data de conclusão:** 15/11/2026
- **Projeto:** RotaClara — Descoberta, comparação e planejamento de viagens
- **Site de referência:** https://rotaclara-theta.vercel.app/
- **Baseline de partida:** `AUDIT_BEFORE.md` (14/11/2026, commit `9565b5e`)
- **Veredito geral:** ✅ **APROVADO COM PENDÊNCIAS** (todas as pendências são externas/de configuração, zero bugs funcionais ou erros de conteúdo ativos no código).

---

## 1. Resumo Executivo das Correções por Nível de Severidade

| Severidade | Identificados em AUDIT_BEFORE | Corrigidos nesta etapa | Pendências residuais |
|---|---|---|---|
| **CRÍTICO** | 4 | **4 (100%)** | 0 |
| **ALTO** | 8 | **8 (100%)** | 0 |
| **MÉDIO** | 6 | **6 (100%)** | 0 |
| **BAIXO** | 5 | **5 (100%)** | 0 |

---

## 2. Detalhamento dos Problemas Críticos e Altos Resolvidos

### 2.1 Erros Geográficos e Turísticos (CRÍTICO / ALTO)
1. **Gramado e Vale dos Vinhedos (CRÍT-2):**
   - *Antes:* Atribuía o Vale dos Vinhedos geograficamente ao município de Gramado.
   - *Depois:* O Vale dos Vinhedos foi reestruturado no destino, nos guias e nas listagens como um deslocamento regional específico entre localidades distintas da Serra Gaúcha (Bento Gonçalves, Garibaldi e Monte Belo do Sul).
2. **Cristo Redentor gratuito (CRÍT-1):**
   - *Antes:* Constava como `isFree: true` com custo R$ 0.
   - *Depois:* Atualizado para `isFree: false` com faixa oficial de ingresso entre R$ 60 e R$ 139 (Trem do Corcovado / Vans oficiais) e data de referência documentada.
3. **Olinda e Baía de Todos-os-Santos (CRÍT-3):**
   - *Antes:* Vinculava o litoral de Olinda à Baía de Todos-os-Santos (que fica na Bahia).
   - *Depois:* Corrigido para Oceano Atlântico / Orla da Região Metropolitana do Recife.
4. **Museu do Amanhã em São Paulo (CRÍT-4):**
   - *Antes:* Citado erroneamente na estimativa de custos de São Paulo.
   - *Depois:* Removido da documentação de custos de SP (mantido exclusivamente no Rio de Janeiro).
5. **Poço Azul e Cachoeira da Fumaça na Chapada Diamantina (ALTO-4, ALTO-5):**
   - *Antes:* Localizações incorretas em Andaraí e Lençóis.
   - *Depois:* Poço Azul retificado para Nova Redenção (fonte oficial `pocoazul.com.br`); Cachoeira da Fumaça retificada para Vale do Capão — Palmeiras/BA (fonte ICMBio).
6. **Espaço Cultural José Lins do Rego em João Pessoa (ALTO-6):**
   - *Antes:* Descrito como "antigo casarão no Centro" com ID `jp-banco-imobiliario`.
   - *Depois:* Retificado para moderno centro de convenções em Tambauzinho com ID `jp-jose-lins-do-rego` e fonte oficial Funesc.
7. **Museu do Índio de Manaus (ALTO-8):**
   - *Antes:* Fonte apontava para a FUNAI (museu homônimo localizado no Rio).
   - *Depois:* Retificado com fonte oficial das Irmãs Salesianas / Arquidiocese de Manaus.

### 2.2 Cálculos, Limites e Ferramentas (ALTO / MÉDIO)
1. **Calculadora com valores negativos e inválidos:**
   - *Antes:* Valores negativos eram subtraídos ou ignorados silenciosamente sem aviso.
   - *Depois:* Validação estrita via `rowIssues`; bloqueia submissão com mensagens claras de erro quando há valores ≤ 0 ou textos inválidos.
2. **Off-by-one na interseção de meses no Comparador:**
   - *Antes:* O cálculo de meses favoráveis usava indexação mista (1–12 vs 0–11), gerando resultados inconsistentes de meses.
   - *Depois:* Todos os destinos foram padronizados na convenção 0–11 (0 = janeiro), garantindo interseção exata de sazonalidade.
3. **Concordâncias e Plurais:**
   - *Antes:* Exibia textos como "1 dia(s)" e "pela Aeroporto Salgado Filho".
   - *Depois:* Inserção de helpers de pluralização e correção de concordância ("pelo Aeroporto Salgado Filho").

### 2.3 Camada de Afiliados e Monetização (MÉDIO)
1. **Stay22 Allez Roam (MON-1):**
   - *Antes:* Redirecionava apenas para a home sem parâmetro de rastreamento `aid`.
   - *Depois:* Adaptado para o formato oficial da documentação Stay22 (`https://www.stay22.com/allez/roam?aid=...&address=...`), garantindo que quando uma credencial real for fornecida em `STAY22_PUBLISHER_ID`, a busca abra na localidade correta. Sem a chave, o fallback permanece 100% editorial e transparente.
2. **Registro de Clique LGPD (MON-2):**
   - *Antes:* Função de logging existia mas nenhum elemento a chamava.
   - *Depois:* Criado componente `AffiliateLink.tsx` que registra cliques de afiliados em memória com metadados não identificáveis (sem expor ou armazenar dados pessoais do usuário).

---

## 3. Estado das Suítes de Testes e Validação Contínua

Após as correções e a expansão para 15 destinos com novas ferramentas, a suíte de validação foi concluída:
- **TypeScript:** `npm run typecheck` (`tsc --noEmit`) → **0 erros** (Strict Mode ativado com `noUncheckedIndexedAccess`).
- **ESLint:** `npm run lint` → **0 erros, 0 warnings**.
- **Testes Automatizados (Vitest):**
  - Total de arquivos: **8 arquivos de testes**.
  - Total de testes: **178 testes passando** (100% de sucesso).
  - Áreas cobertas: Filtros de destino, construtor de itinerário com exportação/importação, diagnóstico inteligente de orçamento, camada de afiliados e fallbacks, comparador de destinos, planejador inteligente, formatadores pt-BR e calculadora de orçamento.
- **Build de Produção:** `npm run build` → **35 páginas estáticas e dinâmicas geradas com sucesso** (15 destinos individuais em SSG + rota `/diagnostico` + ferramentas e institucionais).

---

## 4. Auditoria de Fontes e Links Externos

- 75+ fontes e referências oficiais registradas no catálogo.
- Fontes governamentais auditadas (ICMBio, IPHAN, Prefeituras de Foz, Floripa, Barreirinhas, Ouro Preto e Governo de PE / Noronha).
- 0 falhas por domínios inexistentes ou timeouts.

---

## 5. Frentes Estratégicas Concluídas nesta Etapa

1. **Diagnóstico Inteligente de Viagem (`/diagnostico`):**
   - Cruzamento direto de orçamento com custo diário por pessoa.
   - Identificação de destinos compatíveis e destinos que exigem pequenos ajustes.
   - Alertas preventivos contra despesas ocultas (passagens de última hora, taxas de parques, traslados).
2. **Construtor de Roteiro (`/roteiro`):**
   - Exportação em `.json` e `.txt`.
   - Importação de arquivos `.json` salvos, permitindo transferir roteiros entre computadores e celulares sem login.
   - Estilo `@media print` otimizado para salvar em PDF limpo ou imprimir.
3. **Design System & Fotografia Real Integrada (100% Concluído):**
   - Substituição das ilustrações SVG por fotografias reais de alta resolução para todas as 15 cidades cadastradas.
   - Imagens salvas localmente em `public/destinations/` (zero dependência de CDNs externas ou riscos de CORS).
   - Metadados semânticos completos em cada objeto de destino: `src`, `alt` descritivo e `credit` com autor, fonte e licença aberta Unsplash.
   - Aplicação em todas as interfaces: Cards de destino na home (`DestinationCard`), explorador de destinos (`/destinos`), página de detalhes do destino (`/destinos/[slug]`), busca instantânea com autocomplete (`HeroSearch`), comparador (`/comparador`) e seção de guias.
4. **Expansão para 15 Destinos:**
   - Adicionados Foz do Iguaçu (PR), Florianópolis (SC), Fernando de Noronha (PE), Lençóis Maranhenses (MA) e Ouro Preto (MG) com climatologia, atrações e guias completos.

---

## 6. Pendências Residuais (Aguardando Decisão do Usuário)

1. **Credenciais de Afiliados de Produção:**
   - Nenhuma chave de afiliado real (`STAY22_PUBLISHER_ID`, etc.) foi configurada no repositório por decisão expressa do usuário de priorizar a preparação e maturação do site antes da monetização. O site opera atualmente em modo editorial 100% transparente.
2. **Google AdSense e GA4:**
   - Variáveis de ambiente preparadas; nenhum script externo é injetado sem configuração prévia.
