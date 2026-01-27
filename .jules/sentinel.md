## 2025-05-20 - Client-Side API Key Exposure
**Vulnerability:** Found `OpenAI` client initialized in `lib/visionService.ts` using `NEXT_PUBLIC_OPENAI_API_KEY` and `dangerouslyAllowBrowser: true`.
**Learning:** Developers might use `dangerouslyAllowBrowser` for quick prototypes, but `NEXT_PUBLIC_` variables bake secrets into the client bundle, leaking them to anyone.
**Prevention:** Never use `NEXT_PUBLIC_` for API keys. Always move API interactions to Server Actions or API Routes (`app/api/`).
