/**
 * =====================================================================
 * RotaClara — Helpers de SEO
 * ---------------------------------------------------------------------
 * Gera metadata, canonical, Open Graph e dados estruturados
 * compatíveis com as diretrizes do Google.
 * =====================================================================
 */

import type { Metadata } from "next";
import type { Article } from "@/lib/domain/articles";
import { ARCHETYPE_LABEL } from "@/lib/domain/articles";
import type { Destination, Guide } from "@/lib/domain/types";

/** URL base do site. Usa env; em produção na Vercel usa domínio do projeto antes do fallback canônico. */
export function getSiteUrl(): string {
  const prodFallback =
    process.env.NODE_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://rotaclara-theta.vercel.app"
      : "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || prodFallback;
  try {
    const url = new URL(raw);
    // Remove barra final para concatenação previsível.
    return url.origin;
  } catch {
    return prodFallback;
  }
}

export function getSiteName(): string {
  return process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "RotaClara";
}

/** Monta URL absoluta a partir de um caminho relativo. */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

/** Normaliza caminho para canonical (remove query e barra final). */
export function canonicalPath(path: string): string {
  const clean = path.split("?")[0] ?? "/";
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Override de imagem social (caminho local). */
  image?: string;
  /** `false` para páginas que não devem ser indexadas. */
  index?: boolean;
  /** Data de atualização em ISO para `article:modified_time`. */
  modifiedAt?: string;
  /** Tipo Open Graph. */
  type?: "website" | "article";
}

/**
 * Cria metadata completo com canonical, Open Graph e robots.
 * Mantém todas as páginas consistentes.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/og-default.png",
  index = true,
  modifiedAt,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(canonicalPath(path));
  const siteName = getSiteName();
  const fullTitle = title.includes(siteName) ? title : `${title} · ${siteName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: "pt_BR",
      type,
      ...(modifiedAt ? { modifiedTime: modifiedAt } : {}),
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}

/* =====================================================================
   Dados estruturados (JSON-LD)
   ===================================================================== */

/** Garante que o objeto não contenha `undefined` (inválido em JSON-LD). */
function sanitize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** JSON-LD do site (Organization + WebSite). */
export function websiteJsonLd() {
  return sanitize({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}#organizacao`,
        name: getSiteName(),
        url: absoluteUrl("/"),
        slogan: "Viajar melhor começa com decisões melhores.",
        description:
          "Plataforma brasileira de descoberta, comparação e planejamento de viagens.",
        inLanguage: "pt-BR",
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#site`,
        name: getSiteName(),
        url: absoluteUrl("/"),
        inLanguage: "pt-BR",
        publisher: { "@id": `${absoluteUrl("/")}#organizacao` },
      },
    ],
  });
}

/** JSON-LD de página de destino (TouristDestination + BreadcrumbList). */
export function destinationJsonLd(destination: Destination) {
  return sanitize({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": absoluteUrl(`/destinos/${destination.slug}#destino`),
        name: destination.name,
        description: destination.tagline,
        url: absoluteUrl(`/destinos/${destination.slug}`),
        address: {
          "@type": "PostalAddress",
          addressLocality: destination.name,
          addressRegion: destination.stateUF,
          addressCountry: "BR",
        },
        touristType: destination.tags.map(tagLabel),
        // Sem `geo`: a base não declara coordenadas verificadas —
        // preferimos omitir a campo vazio a publicar localização imprecisa.
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Destinos",
            item: absoluteUrl("/destinos"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: destination.name,
            item: absoluteUrl(`/destinos/${destination.slug}`),
          },
        ],
      },
    ],
  });
}

/** JSON-LD de FAQ — usado apenas quando as perguntas são visíveis na página. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  if (items.length === 0) return null;
  return sanitize({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
}

/** JSON-LD de artigo/guia editorial. */
export function articleJsonLd(guide: Guide, destinationName: string) {
  return sanitize({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Guia de ${destinationName}: o que saber antes de viajar`,
    description: guide.sections[0]?.paragraphs[0] ?? undefined,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: getSiteName() },
    publisher: { "@type": "Organization", name: getSiteName() },
    mainEntityOfPage: absoluteUrl(`/destinos/${guide.slug}`),
  });
}

/** JSON-LD de artigo de cauda longa (BlogPosting + BreadcrumbList). */
export function blogPostJsonLd(article: Article) {
  return sanitize({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${absoluteUrl(`/artigos/${article.slug}`)}#artigo`,
        headline: article.title,
        description: article.description,
        datePublished: article.updatedAt,
        dateModified: article.updatedAt,
        inLanguage: "pt-BR",
        articleSection: ARCHETYPE_LABEL[article.archetype],
        author: { "@type": "Organization", name: getSiteName() },
        publisher: { "@type": "Organization", name: getSiteName() },
        mainEntityOfPage: absoluteUrl(`/artigos/${article.slug}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
          {
            "@type": "ListItem",
            position: 2,
            name: "Artigos",
            item: absoluteUrl("/artigos"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: absoluteUrl(`/artigos/${article.slug}`),
          },
        ],
      },
    ],
  });
}

/** Rótulo legível de uma tag de viagem. */
export function tagLabel(tag: string): string {
  const map: Record<string, string> = {
    praia: "Praia",
    natureza: "Natureza",
    cidade: "Cidade",
    cultura: "Cultura",
    gastronomia: "Gastronomia",
    aventura: "Aventura",
    familia: "Família",
    romantico: "Romântico",
    economico: "Econômico",
    luxo: "Luxo",
    historico: "Histórico",
    vida_noturna: "Vida noturna",
  };
  return map[tag] ?? tag;
}

/** Rótulo legível de categoria de despesa. */
export function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    transporte: "Transporte",
    hospedagem: "Hospedagem",
    alimentacao: "Alimentação",
    passeios: "Passeios",
    combustivel: "Combustível",
    pedagios: "Pedágios",
    estacionamento: "Estacionamento",
    seguro: "Seguro",
    outras: "Outras despesas",
  };
  return map[category] ?? category;
}
