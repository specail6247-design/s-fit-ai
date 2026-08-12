## 2026-08-12 - Path Traversal Vulnerability in Local File Loading
**Vulnerability:** A path traversal vulnerability existed in `localFileToDataUri` within `app/api/try-on/route.ts` where `path.join` was used with unvalidated user input, allowing arbitrary file reading on the server via directory climbing (e.g., `../../`).
**Learning:** Using `path.join` does not prevent directory climbing. Even if the base directory is appended, `../../` sequences in the user-provided path can traverse above it.
**Prevention:** Always use `path.resolve()` to get the absolute path, and verify that the resulting `absolutePath` strictly starts with the intended base directory plus a separator (`publicDir + path.sep`).
