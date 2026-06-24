## 2025-06-24 - [Preventing Hardcoded Secrets on Client-Side]
**Vulnerability:** A hardcoded placeholder API key along with dangerouslyAllowBrowser was found in the OpenAI Node.js SDK initialization on the client-side, risking real key exposure.
**Learning:** The OpenAI SDK requires the dangerouslyAllowBrowser flag to run in the browser. Removing just the flag causes functional regressions. The secure approach is migrating API logic entirely to a server-side route.
**Prevention:** Always implement AI API generation logic within server-side API routes (e.g., Next.js /api/* routes) and call them securely from the frontend to keep keys hidden.
