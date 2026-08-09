## 2024-08-09 - Client-side Secret Exposure

**Vulnerability:** The OpenAI API key (`NEXT_PUBLIC_OPENAI_API_KEY`) is exposed on the client side in `lib/visionService.ts` and allows running the OpenAI SDK dangerously in the browser (`dangerouslyAllowBrowser: true`).
**Learning:** Next.js `NEXT_PUBLIC_` environment variables are embedded into the client-side JavaScript bundle, making them accessible to any user who inspects the network traffic or the source code. The OpenAI API should always be called from a secure backend route (e.g., Next.js API routes).
**Prevention:** Never prefix sensitive API keys with `NEXT_PUBLIC_`. Instead, create a backend endpoint (e.g., `app/api/vision/route.ts`) to handle the API calls securely and ensure the frontend only communicates with this internal API route.
