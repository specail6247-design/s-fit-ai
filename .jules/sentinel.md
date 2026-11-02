## 2025-03-05 - Refactor Vision Service

**Vulnerability:** Client-side instantiation of the OpenAI SDK in `lib/visionService.ts` using `dangerouslyAllowBrowser: true` exposed the API key (`NEXT_PUBLIC_OPENAI_API_KEY`) to the browser client.
**Learning:** For testing or demo purposes, the API key was passed directly to the browser. Any client-side secrets are fully exposed to end-users and can be abused.
**Prevention:** Always create server-side API routes (e.g. Next.js `app/api/.../route.ts`) to handle sensitive SDK operations (like calls to OpenAI or other proprietary AI models) and use environment variables that are strictly server-side (without `NEXT_PUBLIC_`). The frontend should only make standard HTTP `fetch` requests to these secure endpoints without any knowledge of the underlying API keys.
