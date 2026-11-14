# Monetização — RotaClara

> Como a plataforma pode gerar receita **sem mentir para o usuário**.
> Regra número um: nenhuma decisão editorial é tomada por comissão.

## 1. Princípios

1. **Transparência total.** Todo link monetizado é rotulado com a palavra
   "afiliado" no próprio link, com `rel="noopener noreferrer sponsored"`.
2. **Nunca inventamos oferta.** Não exibimos preço, desconto, nota ou
   disponibilidade — não temos integração de inventário na v1.
3. **Sem configuração, sem monetização.** A camada só ativa com variável de
   ambiente válida; caso contrário o link é **editorial interno** (uma URL
   de rastreamento nunca é fabricada).
4. **Comissão não compra posição.** Um destino não entra em guia nem ganha
   vantagem em comparação por ter parceiro.

## 2. Mecanismos suportados na v1

### 2.1 Links de afiliado (pronto, aguardando credenciais)

Implementado em `src/lib/affiliate/affiliate.ts`:

| Parceiro | Variável de ambiente | Situação na v1 |
| --- | --- | --- |
| Stay22 (hospedagem) | `STAY22_PUBLISHER_ID` | Pronto; sem `trackingParam` configurado → aponta ao site oficial |
| Booking.com | `BOOKING_AFFILIATE_ID` | Pronto; monta `?aid=<id>` |
| GetYourGuide | `GETYOURGUIDE_PARTNER_ID` | Pronto |
| Viator | `VIATOR_AFFILIATE_ID` | Pronto |
| Civitatis | `CIVITATIS_AFFILIATE_ID` | Pronto |
| Expedia, Skyscanner, aluguel de veículos, seguros | — | Declarados como "não configurados" até haver variável dedicada |

Comportamento:

```ts
buildOfferLink({ partner: "booking", kind: "monetized", ... })
// sem env  → { kind: "editorial", href: "/hospedagens" }      ← link interno
// com env  → { kind: "monetized", href: "https://www.booking.com/?aid=…" }
```

Onde aparecem: página `/hospedagens` (listagens), página do destino (quando
houver listagem) e qualquer bloco de "ofertas". O componente `Notice`
(`AffiliateDisclosure`) explica comissão no topo das vitrines.

### 2.2 Afiliados de conteúdo (futuro próximo)

- Passeios e ingressos via GetYourGuide/Viator/Civitatis nos guias, sempre
  com rótulo.
- Aluguel de veículo e seguros quando houver parceiro definido.

### 2.3 Publicidade (futuro, opcional)

- Google AdSense via `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — **só** com valor
  válido; sem env, nenhum script é carregado (a política de cookies
  permanece verdadeira).
- Critério de aceitação: nenhum anúncio pode imitar conteúdo editorial nem
  aparecer dentro de blocos de estimativa.

### 2.4 Parcerias institucionais (futuro)

- Turismo de cidades/estados (patrocínio de guia, com selo de conteúdo
  patrocinado **visível** e separado do editorial).
- Newsletter/sorteios — fora do escopo da v1.

## 3. O que a v1 NÃO faz

- ❌ Exibir "a partir de R$ X" como se fosse oferta real.
- ❌ Gerar link de rastreamento sem credencial configurada.
- ❌ Esconder natureza de afiliado (badge + `rel="sponsored"` + página
  `/afiliados`).
- ❌ Priorizar destino por receita potencial (o comparador é cego a
  parceiro).
- ❌ Rastrear usuário para personalização — o clique registrado guarda
  apenas `partner`, `kind`, `destinationSlug` e horário (buffer local,
  nenhum dado pessoal; LGPD).

## 4. Divulgação obrigatória

- **`AffiliateDisclosure`** no topo de `/hospedagens` e em páginas com
  links monetizados.
- **`/afiliados`** — política completa, lista de parceiros e status
  (configurado/não configurado), linkada no rodapé de todas as páginas.
- **`EstimateDisclosure`** em toda ferramenta que mostra número — deixa
  claro que é estimativa, não cotação.
- Textos oficiais: `AFFILIATE_DISCLOSURE` e `ESTIMATE_DISCLOSURE` em
  `src/lib/affiliate/affiliate.ts` (testados em `tests/affiliate.test.ts`).

## 5. Como ativar um parceiro

1. Copie `.env.example` para `.env.local`.
2. Preencha a variável do parceiro com o valor **real** do programa
   (obtido junto ao parceiro — nada é inventado aqui).
3. Reinicie o servidor. A página `/afiliados` mostrará "Configurado".
4. Em produção (Vercel): configure como Environment Variable e faça novo
   deploy. Sem a env, o link continua editorial.

> ⚠️ Nunca commite valores reais. `.env*` está no `.gitignore`.

## 6. Receita esperada (honestidade de planejamento)

A v1 **não gera receita** — nenhum parceiro está configurado neste
repositório. Este documento descreve capacidade, não resultado. Qualquer
projeção futura de receita deve vir acompanhada de metodologia, como o
resto do produto.
