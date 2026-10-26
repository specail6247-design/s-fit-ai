## 2024-10-26 - Prevent Path Traversal
**Vulnerability:** Found a vulnerability in the `app/api/try-on/route.ts` local file reading endpoint where user inputs were combined using `path.join` and passed directly to `fs.readFileSync`.
**Learning:** `path.join` inherently normalizes dot-dot sequences (`..`), allowing an attacker to escape the designated base directory.
**Prevention:** In Node.js, to prevent path traversal issues when handling local files, use `path.resolve` for safer resolution and enforce bounds checking by validating that the resolved `absolutePath` strictly starts with the base directory combined with the platform-specific separator (`publicDir + path.sep`).
