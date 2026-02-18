# Sentinel Journal 🛡️

## 2026-02-18 - Path Traversal in Local File Access
**Vulnerability:** The `localFileToDataUri` utility function blindly joined `process.cwd()`, `'public'`, and a user-provided `relativePath` without validation, allowing attackers to access files outside the `public` directory using `..` sequences.
**Learning:** `path.join` alone is insufficient for path sanitization. Path traversal attacks can bypass simple checks if the input is not resolved to an absolute path first.
**Prevention:** Always resolve the target path to an absolute path using `path.resolve` and verify that it starts with the resolved root directory path (ensuring a trailing separator check to prevent partial matches like `/public-backup`).
