## 2025-06-25 - Prevent Client-Side Secret Exposure
**Vulnerability:** NEXT_PUBLIC_OPENAI_API_KEY was used for the OpenAI SDK initialization on the client side.
**Learning:** Using the NEXT_PUBLIC_ prefix in Next.js automatically bundles the environment variable into the client-side code, exposing sensitive keys to the browser.
**Prevention:** Never use the NEXT_PUBLIC_ prefix for sensitive environment variables, and use definitive mock keys for client-side SDK demos to prevent accidental real key exposure.
