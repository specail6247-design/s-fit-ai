## 2025-05-15 - [Path Traversal in File Utils]
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join(process.cwd(), 'public', localPath)` without validation, allowing directory traversal via `../`.
**Learning:** Blindly joining user-provided paths with a trusted root is unsafe. `path.resolve` resolves `..` segments, potentially escaping the root.
**Prevention:** Always use `path.resolve` to get the absolute path, then verify it starts with the trusted root directory (defense in depth: also use an allowlist for extensions).
