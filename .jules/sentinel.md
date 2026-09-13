## 2024-09-13 - [CRITICAL] Prevented OpenAI API Key Leakage to Client
**Vulnerability:** The OpenAI client was being instantiated directly on the client-side inside `lib/visionService.ts` using `process.env.NEXT_PUBLIC_OPENAI_API_KEY` and `dangerouslyAllowBrowser: true`. This would expose the sensitive API key to the frontend in a production environment.
**Learning:**  When working with Next.js client components and third-party APIs (like OpenAI), API logic must be securely proxied through backend API routes (`app/api/`) or Server Actions. Using `NEXT_PUBLIC_` variables for secrets is a severe security risk.
**Prevention:** Always keep API keys in server-only `process.env.*` variables (without the `NEXT_PUBLIC_` prefix) and interact with external services only from backend environments.
