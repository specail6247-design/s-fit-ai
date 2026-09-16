## 2025-03-04 - Exposed OpenAI API Key
**Vulnerability:** The OpenAI API key was exposed in client-side code (`lib/visionService.ts`) via the `NEXT_PUBLIC_OPENAI_API_KEY` environment variable and `dangerouslyAllowBrowser: true`.
**Learning:** Instantiating the OpenAI client in Next.js client components exposes the API key to users, leading to potential unauthorized usage.
**Prevention:** Always handle sensitive API operations in secure backend endpoints (e.g., Next.js API routes) and avoid using `NEXT_PUBLIC_` prefixes for secret keys.
