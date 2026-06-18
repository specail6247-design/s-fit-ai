## 2025-02-27 - Exposed OpenAI API Key configuration
**Vulnerability:** The `NEXT_PUBLIC_OPENAI_API_KEY` environment variable was used for the OpenAI API key, which causes Next.js to bundle the key in the client-side JavaScript, exposing it to the browser.
**Learning:** Using the `NEXT_PUBLIC_` prefix for sensitive environment variables automatically exposes them to the client-side in Next.js applications. In combination with `dangerouslyAllowBrowser: true` in the OpenAI SDK, this means the key is fully exposed.
**Prevention:** Never use the `NEXT_PUBLIC_` prefix for sensitive secrets. Move any logic requiring these secrets to server-side code (e.g., API routes) and use securely loaded server-only environment variables (e.g., `OPENAI_API_KEY`).
