## 2025-03-08 - Secure initialization of OpenAI client
**Vulnerability:** Hardcoded API key (`your-key-here`) and the `dangerouslyAllowBrowser: true` configuration in `lib/visionService.ts` for the OpenAI client.
**Learning:** Hardcoded keys are a bad practice that exposes secrets (even dummy keys can lead to security theater or cause strict SDK validations to fail/flag). Enabling `dangerouslyAllowBrowser: true` exposes the client to use in client-side code where API keys can be compromised by end users.
**Prevention:** Use a lazy initialization pattern within a try/catch block that pulls the key exclusively from environment variables (e.g., `process.env.OPENAI_API_KEY`) ensuring it's running in a server-side context where `dangerouslyAllowBrowser` is not required.
