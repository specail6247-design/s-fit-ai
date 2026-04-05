## 2024-05-18 - Isomorphic Next.js Utility API Key Leakage
**Vulnerability:** The OpenAI API key was exposed to the client-side because it was instantiated using `process.env.NEXT_PUBLIC_OPENAI_API_KEY` and `dangerouslyAllowBrowser: true` in an isomorphic utility file (`lib/visionService.ts`).
**Learning:** In Next.js, code inside `lib/` or similar utility folders might be executed on both the client and server. Prefixing an environment variable with `NEXT_PUBLIC_` exposes it to the browser bundle. If sensitive services like OpenAI are instantiated globally in these files, their configuration (and API keys) can be leaked.
**Prevention:**
1. Do not prefix server-side API key environment variables with `NEXT_PUBLIC_`.
2. Do not use `dangerouslyAllowBrowser: true` for production API clients.
3. Wrap server SDK instantiations (e.g., OpenAI) in a function that returns `null` if `typeof window !== 'undefined'`, preventing the client from instantiating it. Or better yet, ensure the logic happens exclusively in Next.js Server Components or API Routes.
