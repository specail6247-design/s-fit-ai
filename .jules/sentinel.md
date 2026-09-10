## 2024-05-24 - [NEXT_PUBLIC_ OpenAI API Key Exposure]
**Vulnerability:** The OpenAI client was configured with `NEXT_PUBLIC_OPENAI_API_KEY` and `dangerouslyAllowBrowser: true`, exposing the API key in the client-side bundle.
**Learning:** Never use `NEXT_PUBLIC_` prefixes for sensitive secrets like API keys when instantiating SDKs that could run on the client, as Next.js will inline them.
**Prevention:** Use server-side only environment variables (e.g., `OPENAI_API_KEY`) and avoid `dangerouslyAllowBrowser: true` for production.
