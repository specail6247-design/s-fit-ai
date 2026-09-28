## 2026-09-28 - Path Traversal in API Route
**Vulnerability:** Insecure concatenation of user-provided paths with local file reads (LFI) in Next.js API routes.
**Learning:** Path traversal vulnerabilities can occur even when resolving within a public directory if 'path.resolve' isn't explicitly checked against the intended base directory using 'path.sep'.
**Prevention:** Always use 'path.resolve()' to compute the absolute path and verify it begins strictly with the base directory plus 'path.sep' (e.g. 'absolutePath.startsWith(baseDir + path.sep)').
