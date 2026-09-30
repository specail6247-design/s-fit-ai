## 2024-09-30 - Fix Path Traversal in Try-On API
**Vulnerability:** Path traversal (LFI) via `localFileToDataUri` in `app/api/try-on/route.ts`. Local paths weren't strictly checked against the intended `public` directory, allowing arbitrary file reading (like `/etc/passwd`).
**Learning:** `path.join` resolves `../` or `/` in `relativePath` allowing an escape from the base directory. This is especially risky when converting local files to data URIs in Next.js backend for AI integrations.
**Prevention:** Use `path.resolve` for both the base directory and the target directory, then assert that the resolved target path strictly starts with the resolved base directory path plus a path separator.
