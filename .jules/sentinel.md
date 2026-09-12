## 2025-03-12 - OpenAI API Key Exposure via dangerouslyAllowBrowser
**Vulnerability:** The OpenAI client in `lib/visionService.ts` was instantiated using `dangerouslyAllowBrowser: true` and exposed the API key to the client side. This exposes the API key to anyone who inspected the client-side code, allowing malicious usage.
**Learning:** The OpenAI client should not be exposed to the client side. `dangerouslyAllowBrowser: true` bundles secrets into client-side code creating a critical vulnerability.
**Prevention:** Always use environment variables on the backend (e.g., Next.js API Routes or Server Actions) to communicate with third-party APIs that require secret keys. Never instantiate API clients with `dangerouslyAllowBrowser: true` in Next.js frontend code.
