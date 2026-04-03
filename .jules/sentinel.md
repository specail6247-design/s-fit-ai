## 2024-05-18 - Leaked OpenAI API Key via NEXT_PUBLIC
**Vulnerability:** The OpenAI API key was exposed in the browser bundle because `NEXT_PUBLIC_OPENAI_API_KEY` was used in an isomorphic utility file (`lib/visionService.ts`), combined with `dangerouslyAllowBrowser: true`.
**Learning:** Isomorphic files (used on both client and server) can easily leak secrets if server-side environment variables are prefixed with `NEXT_PUBLIC_` or if server SDKs are instantiated globally without checking the runtime environment.
**Prevention:** Do not prefix server-side API keys with `NEXT_PUBLIC_`. Avoid `dangerouslyAllowBrowser: true`. Wrap server SDK instantiations in a function that returns `null` when `typeof window !== "undefined"` to prevent execution in the client bundle.
