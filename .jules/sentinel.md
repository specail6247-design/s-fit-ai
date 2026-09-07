## 2025-02-23 - Remove Hardcoded API Key Fallback
**Vulnerability:** Hardcoded API key fallback ('your-key-here') in OpenAI client initialization.
**Learning:** Providing a string literal as a fallback for an API key makes it trivial for an attacker to spot it, and if it were accidentally a real key, it would be exposed to the client side.
**Prevention:** Always rely strictly on environment variables without string literal fallbacks for sensitive keys, even in demo mode. Ensure correct environment setup rather than hardcoding defaults in code.
