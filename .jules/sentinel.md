## 2026-05-31 - Client-Side OpenAI API Key Exposure
**Vulnerability:** The application instantiated the OpenAI client on the client-side using `dangerouslyAllowBrowser: true` and a public environment variable `NEXT_PUBLIC_OPENAI_API_KEY`.
**Learning:** Instantiating external service SDKs (like OpenAI) on the client with a public key exposes the key to end users, potentially leading to unauthorized usage, quota exhaustion, or financial loss.
**Prevention:** Always interact with external services requiring secret API keys through secure, server-side API endpoints. Never use `dangerouslyAllowBrowser: true` with sensitive keys in production code.
