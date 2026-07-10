## 2024-07-10 - Secure Path Resolution
**Vulnerability:** Unsanitized user input was used in path construction, allowing arbitrary file reads.
**Learning:** User-provided paths must always be resolved securely and validated against the intended base directory.
**Prevention:** Use path.resolve(baseDirectory, userInput) and verify with .startsWith(baseDirectory + path.sep) to ensure the path remains scoped.
