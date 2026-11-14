import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "*.config.{js,mjs,ts}",
    ],
  },
  {
    rules: {
      // O projeto usa <Link> do Next e componentes de cliente com estados
      // controlados; regras de hooks são mantidas, apenas relaxamos avisos
      // que travam o CI sem reduzir segurança real.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "react/jsx-key": "error",
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
