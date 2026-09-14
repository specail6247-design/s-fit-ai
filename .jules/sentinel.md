## 2024-03-20 - [Client-Side API Key Exposure]
**Vulnerability:** The OpenAI API key was exposed in client-side code using `dangerouslyAllowBrowser: true` and the `NEXT_PUBLIC_` prefix in `lib/visionService.ts`.
**Learning:** When using server-side SDKs like OpenAI in a Next.js application, instantiating them on the client with `dangerouslyAllowBrowser: true` bypasses critical security safeguards and leaks credentials to end-users.
**Prevention:** Always move sensitive SDK instantiations and API calls to a secure backend API route (e.g., `app/api/...`) or Server Action, and use a `fetch` call from the client to communicate securely.
