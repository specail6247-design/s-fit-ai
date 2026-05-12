## 2024-05-24 - [Path Traversal in Try-On API]
**Vulnerability:** Path traversal (CWE-22) in `app/api/try-on/route.ts` where `localFileToDataUri` used `path.join` on unsanitized user input (`garmentImageUrl`), allowing reads outside the `public` directory.
**Learning:** `path.join` does not prevent traversing up directories. User input representing a relative file path can exploit this to read sensitive files (e.g. `../../../../etc/passwd`).
**Prevention:** Use `path.resolve(baseDir, userInput)` and verify containment with `!absolutePath.startsWith(baseDir + path.sep)`.
