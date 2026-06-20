## YYYY-MM-DD - [Title]\n**Vulnerability:** [What you found]\n**Learning:** [Why it existed]\n**Prevention:** [How to avoid next time]
## 2024-05-24 - OpenAI API Key Exposure Risk
**Vulnerability:** Client-side initialization of the OpenAI SDK in `lib/visionService.ts` using `dangerouslyAllowBrowser: true` and the `NEXT_PUBLIC_OPENAI_API_KEY` environment variable.
**Learning:** Hardcoding or exposing API keys with the `NEXT_PUBLIC_` prefix makes them accessible to the browser, leading to severe credential leakage. SDK configurations using `dangerouslyAllowBrowser: true` are a strong indicator of client-side key usage.
**Prevention:** Remove client-side API key usage entirely. If an API key is required, initialize the SDK on the server (e.g., in a Next.js API route) and access it via an absolute URL `fetch()` request from the client without exposing the key.
