## 2025-02-14 - Fix Path Traversal in Virtual Try-On API
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where user-controlled input (`garmentImageUrl`) was used to read local files via `path.join(process.cwd(), 'public', relativePath)` without verifying if the resolved path stayed within the intended `public` directory boundary.
**Learning:** `path.join` does not normalize or enforce boundaries against `../` relative traversal sequences.
**Prevention:** Always use `path.resolve` to get absolute paths and enforce directory boundaries by checking if the resolved path starts with the allowed base directory path appended with `path.sep` (e.g., `absolutePath.startsWith(publicDir + path.sep)`).
