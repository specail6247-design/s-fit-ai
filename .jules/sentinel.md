## 2024-05-18 - Client-Side API Key Exposure
**Vulnerability:** OpenAI SDK instantiation in client-side code (`lib/visionService.ts`) uses `NEXT_PUBLIC_OPENAI_API_KEY` and sets `dangerouslyAllowBrowser: true`.
**Learning:** Next.js explicitly warns against using `NEXT_PUBLIC_` prefixes for API keys as they get bundled into the client bundle, exposing them to attackers. The `dangerouslyAllowBrowser` flag in the OpenAI SDK is another strong signal of insecure client-side initialization. Memory notes explicitly call out this exact vulnerability pattern.
**Prevention:** Always move sensitive AI generation or external API calls to server-side API routes (e.g., `app/api/...`) and use server-side environment variables without the `NEXT_PUBLIC_` prefix. For immediate mitigation in client-side mocks, completely remove real API key instantiation if not strictly necessary, or replace with a definitive mock configuration.

## 2024-05-18 - Client-Side API Key Exposure
**Vulnerability:** OpenAI SDK instantiation in client-side code (`lib/visionService.ts`) uses `NEXT_PUBLIC_OPENAI_API_KEY` and sets `dangerouslyAllowBrowser: true`.
**Learning:** Next.js explicitly warns against using `NEXT_PUBLIC_` prefixes for API keys as they get bundled into the client bundle, exposing them to attackers. The `dangerouslyAllowBrowser` flag in the OpenAI SDK is another strong signal of insecure client-side initialization.
**Prevention:** Always move sensitive AI generation or external API calls to server-side API routes (e.g., `app/api/...`) and use server-side environment variables without the `NEXT_PUBLIC_` prefix.
