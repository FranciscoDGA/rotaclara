import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // O projeto vive dentro do diretório do usuário (OneDrive). Sem esta
  // configuração o Turbopack ignora o package-lock.json local.
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // A v1 usa arte vetorial local gerada em SVG. Nenhuma fonte externa de
    // imagens é carregada por padrão — mantém o site rápido e sem dependência
    // de terceiros. Adicionar domínios aqui quando houver CDN aprovado.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
