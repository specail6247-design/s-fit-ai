## 2025-04-26 - [Path Traversal in localFileToDataUri]
**Vulnerability:** The API endpoint `app/api/try-on/route.ts` permitted an attacker to provide a malicious file path like `/../.env` which was passed directly to `path.join()`, allowing access to arbitrary files on the server.
**Learning:** `path.join()` does not automatically ensure that a path is confined to its base directory, as it simplifies parent directory (`..`) references.
**Prevention:** Always use `path.resolve()` with a predefined root directory and verify the resulting path string starts with the expected base directory root (e.g., `path.resolve(base, input).startsWith(base + path.sep)`).
