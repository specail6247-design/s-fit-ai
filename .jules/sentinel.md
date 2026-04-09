## 2024-05-20 - [OpenAI API Key Exposure]
**Vulnerability:** [The OpenAI API key was exposed to the client by using the NEXT_PUBLIC_ prefix and dangerouslyAllowBrowser: true]
**Learning:** [Prefixing environment variables with NEXT_PUBLIC_ makes them available to the browser. dangerouslyAllowBrowser: true in OpenAI initialization also exposes the key.]
**Prevention:** [Do not use the NEXT_PUBLIC_ prefix for secret keys. Only initialize OpenAI on the server side and avoid dangerouslyAllowBrowser.]
