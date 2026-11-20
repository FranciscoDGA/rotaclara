/**
 * =====================================================================
 * RotaClara — robots.txt
 * ---------------------------------------------------------------------
 * Libera tudo para indexação (incluindo bots de busca por IA) e aponta
 * o sitemap. Bloqueia apenas URLs com parâmetros duplicados.
 * =====================================================================
 */

import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/seo";

const AI_BOTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/destinos?*", "/hospedagens?*"],
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/destinos?*", "/hospedagens?*"],
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
