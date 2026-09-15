## 2024-05-24 - Fix API Key Exposure in Vision Service
**Vulnerability:** The OpenAI API key was exposed to the client bundle via `process.env.NEXT_PUBLIC_OPENAI_API_KEY` and the SDK was explicitly permitted to run in the browser using `dangerouslyAllowBrowser: true`.
**Learning:** Client-side evaluation of SDKs containing sensitive keys is a common anti-pattern during rapid prototyping, which leads to immediate secret compromise if pushed to production.
**Prevention:** Never prefix sensitive API keys with `NEXT_PUBLIC_`. Always proxy sensitive SDK interactions through secure server-side API routes (e.g., `app/api/.../route.ts`) or Server Actions.
