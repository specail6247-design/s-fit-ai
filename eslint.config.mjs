import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals.map(config => ({
    ...config,
    rules: {
      ...config.rules,
      "@next/next/no-page-custom-font": "off",
      "@next/next/google-font-display": "off",
      "@next/next/no-img-element": "off",
      "jsx-a11y/alt-text": "off"
    }
  })),
  ...nextTs.map(config => ({
    ...config,
    rules: {
      ...config.rules,
      "@typescript-eslint/no-unused-vars": "off"
    }
  })),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**"
  ]),
]);

export default eslintConfig;
