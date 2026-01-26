## 2024-05-22 - Client-Side OpenAI Key Exposure
**Vulnerability:** The OpenAI SDK was initialized in `lib/visionService.ts` using `process.env.NEXT_PUBLIC_OPENAI_API_KEY`. This exposes the API key to the browser, allowing any user to steal the key and use the OpenAI quota.
**Learning:** Developers sometimes reach for `NEXT_PUBLIC_` variables to get things working quickly on the frontend, especially when prototyping services that will eventually be server-side.
**Prevention:** Strictly enforce that third-party service SDKs (OpenAI, Replicate, etc.) are never initialized in client-side components. Use Next.js Server Actions or API routes as the only gateway to these services.
