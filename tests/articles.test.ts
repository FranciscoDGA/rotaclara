/**
 * =====================================================================
 * RotaClara — Testes do motor de artigos
 * ---------------------------------------------------------------------
 * Garantias centrais:
 * 1. Artigo só referencia destinos/attrações que existem na base
 *    (slug quebrado falha no build, nunca publica "undefined").
 * 2. Números do artigo batem com a base auditada — se a base mudar,
 *    o teste falha antes do usuário ver dado divergente.
 * 3. Metadados dentro dos limites (description ≤ 160, data ISO válida).
 * =====================================================================
 */

import { describe, expect, it } from "vitest";
import {
  allArticles,
  getAllArticleSlugs,
  getArticle,
} from "@/data/articles";
import { getDestination } from "@/data/destinations";
import {
  ARCHETYPE_LABEL,
  ARCHETYPE_SUMMARY,
} from "@/lib/domain/articles";

describe("motor de artigos — integridade", () => {
  it("slugs são únicos e não vazios", () => {
    const slugs = allArticles.map((a) => a.slug);
    expect(slugs.every((s) => /^[a-z0-9-]+$/.test(s))).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada artigo referencia apenas destinos existentes na base", () => {
    for (const article of allArticles) {
      expect(article.destinationSlugs.length).toBeGreaterThan(0);
      for (const slug of article.destinationSlugs) {
        expect(
          getDestination(slug),
          `artigo "${article.slug}" referencia destino inexistente "${slug}"`,
        ).toBeDefined();
      }
    }
  });

  it("cada artigo tem seção, FAQ, data ISO e description ≤ 160 caracteres", () => {
    for (const article of allArticles) {
      expect(article.sections.length).toBeGreaterThan(0);
      expect(article.faq.length).toBeGreaterThan(0);
      expect(article.description.length).toBeLessThanOrEqual(160);
      expect(article.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(article.updatedAt))).toBe(false);
      // Seções sem parágrafo vazio (evita buraco no render).
      for (const section of article.sections) {
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.paragraphs.every((p) => p.trim().length > 0)).toBe(true);
      }
    }
  });

  it("lote 1 cobre os quatro arquétipos", () => {
    const archetypes = new Set(allArticles.map((a) => a.archetype));
    expect([...archetypes].sort()).toEqual([
      "comparativo",
      "custo",
      "epoca",
      "roteiro",
    ]);
    // Rótulos e resumos definidos para todo arquétipo em uso.
    for (const a of allArticles) {
      expect(ARCHETYPE_LABEL[a.archetype]).toBeTruthy();
      expect(ARCHETYPE_SUMMARY[a.archetype]).toBeTruthy();
    }
  });

  it("acessores devolvem o mesmo conjunto da lista", () => {
    expect(getAllArticleSlugs()).toEqual(allArticles.map((a) => a.slug));
    for (const slug of getAllArticleSlugs()) {
      expect(getArticle(slug)?.slug).toBe(slug);
    }
    expect(getArticle("slug-inexistente")).toBeUndefined();
  });
});

describe("motor de artigos — números derivados da base", () => {
  it("artigo de custo de Gramado usa a faixa diária da base", () => {
    const article = getArticle("quanto-custa-ir-a-gramado");
    const gramado = getDestination("gramado");
    expect(article).toBeDefined();
    expect(gramado).toBeDefined();
    if (!article || !gramado) return;

    const body = JSON.stringify(article.sections);
    expect(body).toContain(`R$ ${gramado.cost.minPerDayBRL}`);
    expect(body).toContain(`R$ ${gramado.cost.maxPerDayBRL}`);
    // Data de referência da estimativa aparece no artigo.
    expect(body).toContain(gramado.cost.referenceDate.slice(0, 4));
  });

  it("artigo de época lista os 12 meses do clima de Lençóis", () => {
    const article = getArticle("melhor-epoca-lencois-maranhenses");
    const lencois = getDestination("lencois-maranhenses");
    expect(article).toBeDefined();
    expect(lencois).toBeDefined();
    if (!article || !lencois) return;

    const climaSection = article.sections.find((s) => s.id === "clima-mes-a-mes");
    expect(climaSection?.bullets).toHaveLength(lencois.climateByMonth.length);
  });

  it("roteiro do Rio usa as 8 atrações mapeadas na base", () => {
    const article = getArticle("roteiro-4-dias-rio-de-janeiro");
    const rio = getDestination("rio-de-janeiro");
    expect(article).toBeDefined();
    expect(rio).toBeDefined();
    if (!article || !rio) return;

    // Cada atração da base aparece em algum bullet do roteiro.
    const bullets = article.sections
      .flatMap((s) => s.bullets ?? [])
      .join("\n");
    for (const attraction of rio.attractions) {
      expect(
        bullets,
        `atração "${attraction.name}" não aparece no roteiro`,
      ).toContain(attraction.name);
    }
    // Duração mínima do destino = nº de dias do roteiro.
    expect(
      article.sections.filter((s) => s.id.startsWith("dia-")),
    ).toHaveLength(rio.recommendedDays.min);
  });

  it("comparativo cita as faixas dos dois destinos", () => {
    const article = getArticle("rio-ou-sao-paulo");
    const rio = getDestination("rio-de-janeiro");
    const sp = getDestination("sao-paulo");
    expect(article).toBeDefined();
    expect(rio).toBeDefined();
    expect(sp).toBeDefined();
    if (!article || !rio || !sp) return;

    const body = JSON.stringify(article.sections);
    expect(body).toContain(`R$ ${rio.cost.minPerDayBRL}`);
    expect(body).toContain(`R$ ${sp.cost.minPerDayBRL}`);
    expect(article.destinationSlugs).toEqual([rio.slug, sp.slug]);
  });

  it("nenhum artigo publica placeholder óbvio de dado quebrado", () => {
    const body = JSON.stringify(allArticles);
    for (const bad of ["undefined", "NaN", "[object Object]", "null dias"]) {
      expect(body, `artigos contêm "${bad}"`).not.toContain(bad);
    }
  });
});
