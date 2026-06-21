## 2024-06-21 - Hardcoded OpenAI Key on Client

**Vulnerability:** A hardcoded `NEXT_PUBLIC_OPENAI_API_KEY` alongside `dangerouslyAllowBrowser: true` was found in `lib/visionService.ts`, exposing the OpenAI API Key directly to the client browser, which is a critical security vulnerability and allows unauthorized usage bypassing server boundaries.

**Learning:** This existed because the codebase was likely quickly scaffolding mock capabilities or client-side demonstrations. The OpenAI Node SDK requires `dangerouslyAllowBrowser: true` for browser operation, meaning you cannot securely run real OpenAI queries from client components.

**Prevention:** Always proxy calls to external AI services through an internal API route (e.g., `app/api/...`), and keep the API Keys configured securely via purely server-side environment variables (`process.env.*` rather than `process.env.NEXT_PUBLIC_*`). If a client-side mock is essential, do not include real library instantiations with flags like `dangerouslyAllowBrowser`.
