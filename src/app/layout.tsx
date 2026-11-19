/**
 * =====================================================================
 * RotaClara — Layout raiz
 * =====================================================================
 */

import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/Navigation";
import { getSiteName, getSiteUrl, websiteJsonLd } from "@/lib/seo/seo";
import "./globals.css";

/* Fontes auto-hospedadas em build — sem requisição em tempo de execução. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const siteName = getSiteName();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  // String simples (em Next 16 o objeto `title` exige `template` junto
  // com `default`). Sem `title.template`: todas as páginas passam por
  // `buildMetadata()`, que já acrescenta "· <siteName>" uma única vez —
  // um template aqui duplicava o sufixo ("… · RotaClara · RotaClara").
  title: `${siteName} — Viajar melhor começa com decisões melhores`,
  description:
    "Descubra destinos, compare custos, monte roteiros e calcule o orçamento " +
    "da sua viagem. Ferramentas de planejamento com estimativas transparentes " +
    "e conteúdo verificado sobre o Brasil.",
  applicationName: siteName,
  authors: [{ name: siteName }],
  keywords: [
    "planejamento de viagem",
    "calculadora de viagem",
    "roteiro de viagem",
    "destinos do Brasil",
    "comparar destinos",
    "orçamento de viagem",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    url: getSiteUrl(),
    images: [
      {
        // PNG: WhatsApp/Twitter/Facebook não renderizam SVG na prévia do link.
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = websiteJsonLd();

  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SkipLink />
        <Header />
        <main id="conteudo-principal" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
