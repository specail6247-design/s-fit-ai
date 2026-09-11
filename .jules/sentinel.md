## 2024-05-18 - Client-Side API Key Exposure via NEXT_PUBLIC Prefix
**Vulnerability:** The OpenAI client was initialized on the frontend with the API key exposed via the `NEXT_PUBLIC_` prefix, combined with `dangerouslyAllowBrowser: true`.
**Learning:** Prefixing sensitive API keys with `NEXT_PUBLIC_` bundles them into the client bundle, exposing them to anyone inspecting the browser source, even if the intent was only for client-side demo purposes.
**Prevention:** Always handle sensitive API instantiations on a backend server route (e.g., Next.js API route or Server Action) and have the frontend communicate with the backend proxy to keep keys secure.
