## 2026-03-20 - Exposed OpenAI API Key and dangerouslyAllowBrowser
**Vulnerability:** The OpenAI client was instantiated with a `NEXT_PUBLIC_` prefixed API key and `dangerouslyAllowBrowser: true` in `lib/visionService.ts`, which is imported by client-side components (`'use client'`). This exposed the API key to the browser.
**Learning:** Never initialize server-side SDKs (e.g., OpenAI) with `NEXT_PUBLIC_` prefixed environment variables or `dangerouslyAllowBrowser: true` in files that may be imported by client components.
**Prevention:** Ensure API keys are kept entirely server-side. Remove `dangerouslyAllowBrowser: true`. Use API routes or server actions for any calls that require secret keys to avoid exposing them in the client bundle.
