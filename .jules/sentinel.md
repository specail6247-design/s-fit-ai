## 2025-06-15 - OpenAI Hardcoded API Key Mock
**Vulnerability:** Hardcoded fallback `your-key-here` and `dangerouslyAllowBrowser: true` used for OpenAI client initialization in `lib/visionService.ts`.
**Learning:** Hardcoded placeholders, even if intended as fallbacks or "mocks", can bypass standard security scanners. Additionally, `dangerouslyAllowBrowser: true` allows client-side execution, which leaks the key if it's set on the client.
**Prevention:** Do not provide hardcoded fallback keys. Remove `dangerouslyAllowBrowser`. In browser context, use an empty key or fail securely without instantiating the client dangerously if missing.
