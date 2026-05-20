## 2025-05-20 - Prevent Path Traversal in File Access APIs
**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` was vulnerable to Path Traversal (CWE-22) because it used `path.join()` without validating that the resolved absolute path actually resided within the intended base directory.
**Learning:** In Next.js and Node.js APIs, merely stripping leading slashes or using `path.join()` is insufficient to prevent directory climbing (e.g., via `/../`).
**Prevention:** Always use `path.resolve()` to compute the absolute path and explicitly verify containment using `absolutePath.startsWith(baseDir + path.sep)` before reading local files.
