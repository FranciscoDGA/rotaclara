/**
 * =====================================================================
 * RotaClara — Testes da camada de afiliados
 * ---------------------------------------------------------------------
 * Garantias centrais:
 *  1. Sem variável de ambiente, o link é EDITORIAL interno — nunca uma
 *     URL de rastreamento inventada.
 *  2. Com env válida, o link aponta para o parceiro com o parâmetro
 *     real de rastreamento.
 *  3. Clique é registrado sem dados pessoais (LGPD).
 * =====================================================================
 */

import { afterEach, describe, expect, it, vi } from "vitest";

/** Importa o módulo fresco para que `PARTNERS` releia o ambiente. */
async function loadAffiliateModule() {
  vi.resetModules();
  return await import("@/lib/affiliate/affiliate");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("modo editorial (sem configuração)", () => {
  it("nenhum parceiro está habilitado por padrão", async () => {
    const mod = await loadAffiliateModule();
    expect(mod.getStay22PublisherId()).toBeNull();
    expect(mod.PARTNERS.every((p) => !p.enabled)).toBe(true);
  });

  it("buildOfferLink devolve link interno editorial", async () => {
    const mod = await loadAffiliateModule();
    const link = mod.buildOfferLink({
      partner: "booking",
      kind: "monetized",
      label: "Ver hospedagens",
      fallbackPath: "/destinos/salvador",
    });

    expect(link.kind).toBe("editorial");
    expect(link.href).toBe("/destinos/salvador");
    // Nenhum parâmetro de rastreamento inventado.
    expect(link.href).not.toContain("aid=");
  });

  it("caí no fallback padrão quando nenhum caminho é informado", async () => {
    const mod = await loadAffiliateModule();
    const link = mod.buildOfferLink({
      partner: "stay22",
      kind: "monetized",
      label: "Reservar",
    });
    expect(link.href).toBe("/hospedagens");
    expect(link.kind).toBe("editorial");
  });
});

describe("modo com parceiro configurado", () => {
  it("Booking.com habilitado gera URL real com o aid", async () => {
    vi.stubEnv("BOOKING_AFFILIATE_ID", "test-aid-123");
    const mod = await loadAffiliateModule();

    expect(mod.isPartnerEnabled("booking")).toBe(true);

    const link = mod.buildOfferLink({
      partner: "booking",
      kind: "monetized",
      label: "Ver hotéis",
      query: { destino: "salvador" },
    });

    expect(link.kind).toBe("monetized");
    expect(link.href).toContain("https://www.booking.com/");
    expect(link.href).toContain("aid=test-aid-123");
    expect(link.href).toContain("destino=salvador");
  });

  it("parceiro habilitado SEM parâmetro de rastreamento aponta ao site oficial", async () => {
    vi.stubEnv("STAY22_PUBLISHER_ID", "pub-42");
    const mod = await loadAffiliateModule();

    const link = mod.buildOfferLink({
      partner: "stay22",
      kind: "monetized",
      label: "Reservar estadia",
    });

    // Stay22 não tem trackingParam configurado: sem URL inventada.
    expect(link.href).toBe("https://www.stay22.com/");
    expect(link.kind).toBe("monetized");
  });

  it("só o parceiro da env habilita; os demais seguem editoriais", async () => {
    vi.stubEnv("BOOKING_AFFILIATE_ID", "test-aid-123");
    const mod = await loadAffiliateModule();

    expect(mod.isPartnerEnabled("booking")).toBe(true);
    expect(mod.isPartnerEnabled("viator")).toBe(false);
    expect(mod.isPartnerEnabled("skyscanner")).toBe(false);

    const editorial = mod.buildOfferLink({
      partner: "viator",
      kind: "monetized",
      label: "Passeios",
    });
    expect(editorial.kind).toBe("editorial");
  });

  it("parceiros sem variável dedicada permanecem desabilitados", async () => {
    vi.stubEnv("EXPEDIA_AFFILIATE_ID", "nunca-lido");
    const mod = await loadAffiliateModule();
    expect(mod.isPartnerEnabled("expedia")).toBe(false);
  });

  it("env em branco conta como ausente", async () => {
    vi.stubEnv("BOOKING_AFFILIATE_ID", "   ");
    const mod = await loadAffiliateModule();
    expect(mod.isPartnerEnabled("booking")).toBe(false);
  });
});

describe("getPartner", () => {
  it("retorna a configuração pública do parceiro", async () => {
    const mod = await loadAffiliateModule();
    const p = mod.getPartner("booking");
    expect(p?.name).toBe("Booking.com");
    expect(p?.baseUrl).toBe("https://www.booking.com/");
    expect(mod.getPartner("inexistente" as never)).toBeUndefined();
  });
});

describe("registro de cliques (LGPD)", () => {
  it("registra sem dados pessoais", async () => {
    const mod = await loadAffiliateModule();
    const event = mod.registerAffiliateClick("booking", "monetized", "salvador");

    expect(event.partner).toBe("booking");
    expect(event.destinationSlug).toBe("salvador");
    expect(event.at).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    // Só os campos estruturais — nenhum identificador de usuário.
    expect(Object.keys(event).sort()).toEqual([
      "at",
      "destinationSlug",
      "kind",
      "partner",
    ]);

    expect(mod.getAffiliateClicks()).toHaveLength(1);
  });

  it("limita o buffer a 500 eventos", async () => {
    const mod = await loadAffiliateModule();
    for (let i = 0; i < 510; i++) {
      mod.registerAffiliateClick("booking", "editorial");
    }
    expect(mod.getAffiliateClicks().length).toBe(500);
  });
});

describe("textos de aviso", () => {
  it("o disclosure menciona comissão e preço", async () => {
    const mod = await loadAffiliateModule();
    expect(mod.AFFILIATE_DISCLOSURE).toContain("comissão");
    expect(mod.AFFILIATE_DISCLOSURE).toContain("preço");
  });

  it("o aviso de estimativa deixa claro que não é cotação", async () => {
    const mod = await loadAffiliateModule();
    expect(mod.ESTIMATE_DISCLOSURE).toContain("estimativas");
    expect(mod.ESTIMATE_DISCLOSURE).toContain("não cotações");
  });
});
