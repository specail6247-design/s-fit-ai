## 2026-07-31 - Critical API Key Exposure via dangerouslyAllowBrowser
**Vulnerability:** The OpenAI client was instantiated directly in client-side code (`lib/visionService.ts`) with `dangerouslyAllowBrowser: true` and a `NEXT_PUBLIC_` prefixed API key. This exposed the API key to all users.
**Learning:** Client-side libraries should never be forced to run in the browser if they require secret API keys. The `dangerouslyAllowBrowser` flag is a massive red flag.
**Prevention:** Always proxy calls to external AI APIs through server-side endpoints (e.g., Next.js API routes) and use secret `process.env` variables without the `NEXT_PUBLIC_` prefix.
