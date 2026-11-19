/**
 * =====================================================================
 * RotaClara — Sitemap XML (App Router)
 * ---------------------------------------------------------------------
 * Lista todas as páginas indexáveis com `lastmod` real vindo dos dados
 * editoriais. Páginas utilitárias e institucionais usam a data de
 * referência editorial.
 * =====================================================================
 */

import type { MetadataRoute } from "next";
import { allArticles } from "@/data/articles";
import { allDestinations } from "@/data/destinations";
import { allGuides } from "@/data/guides";
import { absoluteUrl } from "@/lib/seo/seo";

/** Data de referência editorial (atualizar a cada revisão de conteúdo). */
const EDITORIAL_DATE = "2026-11-13";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(EDITORIAL_DATE);

  /* Rotas principais. */
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { path: "/", priority: 1, changefreq: "weekly" },
      { path: "/destinos", priority: 0.9, changefreq: "weekly" },
      { path: "/diagnostico", priority: 0.9, changefreq: "weekly" },
      { path: "/guias", priority: 0.8, changefreq: "weekly" },
      { path: "/artigos", priority: 0.8, changefreq: "weekly" },
      { path: "/comparador", priority: 0.8, changefreq: "monthly" },
      { path: "/planejador", priority: 0.8, changefreq: "monthly" },
      { path: "/calculadora", priority: 0.8, changefreq: "monthly" },
      { path: "/roteiro", priority: 0.7, changefreq: "monthly" },
      { path: "/hospedagens", priority: 0.7, changefreq: "monthly" },
      { path: "/metodologia", priority: 0.6, changefreq: "yearly" },
      { path: "/sobre", priority: 0.5, changefreq: "yearly" },
      { path: "/contato", priority: 0.4, changefreq: "yearly" },
      { path: "/afiliados", priority: 0.3, changefreq: "yearly" },
      { path: "/privacidade", priority: 0.3, changefreq: "yearly" },
      { path: "/cookies", priority: 0.3, changefreq: "yearly" },
      { path: "/termos", priority: 0.3, changefreq: "yearly" },
    ] as const
  ).map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));

  /* Páginas de destino — `lastmod` = última revisão editorial real. */
  const guideBySlug = new Map(allGuides.map((g) => [g.slug, g]));

  const destinationRoutes: MetadataRoute.Sitemap = allDestinations.map((d) => {
    const guide = guideBySlug.get(d.slug);
    const modified = new Date(guide?.updatedAt ?? d.updatedAt);

    return {
      url: absoluteUrl(`/destinos/${d.slug}`),
      lastModified: modified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    };
  });

  /* Artigos de cauda longa — `lastmod` = data editorial real. */
  const articleRoutes: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: absoluteUrl(`/artigos/${a.slug}`),
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...destinationRoutes, ...articleRoutes];
}
