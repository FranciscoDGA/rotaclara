/**
 * =====================================================================
 * RotaClara — robots.txt
 * ---------------------------------------------------------------------
 * Libera tudo para indexação e aponta o sitemap. Não há área privada.
 * =====================================================================
 */

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Bloqueia URLs de parâmetro que não agregam em resultados de busca.
      {
        userAgent: "*",
        disallow: ["/destinos?*", "/hospedagens?*"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
