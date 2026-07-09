## 2024-07-09 - Secure External API Client Initialization
**Vulnerability:** External API clients (like OpenAI) were initialized in client-side code, exposing sensitive keys via NEXT_PUBLIC_ variables and dangerouslyAllowBrowser flags.
**Learning:** Storing sensitive keys in client-side bundles allows attackers to easily extract them.
**Prevention:** Always initialize external API clients securely within server-side API routes using private environment variables.
