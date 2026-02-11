# Sentinel's Security Journal 🛡️

## 2025-05-21 - [CRITICAL] Path Traversal in File-to-DataURI Conversion
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join` with user-controlled input (`garmentImageUrl`), allowing directory traversal via `../` sequences to access arbitrary files on the server (e.g., `/etc/passwd` or `.env`).
**Learning:** `path.join` resolves `..` segments, meaning it does not enforce directory confinement. A simple check for `fs.existsSync` acts as a blind oracle, revealing file existence even if content isn't directly returned.
**Prevention:** Always use `path.resolve` to canonicalize paths and verify that the resolved absolute path starts with the trusted root directory (e.g., `publicDir + path.sep`).
