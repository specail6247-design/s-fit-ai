## 2026-07-01 - [Remove exposed API key]
**Vulnerability:** Found an exposed default API key in `lib/visionService.ts` and `NEXT_PUBLIC_OPENAI_API_KEY` which can be exposed to the client.
**Learning:** The OpenAI key should not be exposed in a `NEXT_PUBLIC_` prefix because it's sensitive. It was set in client-side code with `dangerouslyAllowBrowser: true`.
**Prevention:** Remove `NEXT_PUBLIC_` prefix from secrets. Remove client-side usage of sensitive API keys unless they are strictly proxy endpoints or securely managed on the backend.
