# Sentinel's Journal

## 2026-02-03 - Path Traversal in Local File Handler
**Vulnerability:** A path traversal vulnerability existed in `app/api/try-on/route.ts` within the `localFileToDataUri` helper. The function used `path.join` to resolve user-provided paths without checking if the resulting path remained within the intended `public` directory. This allowed attackers to read arbitrary files on the server using `../` sequences.
**Learning:** `path.join` alone is insufficient for security. It resolves paths but does not enforce boundaries. Developers often assume that prepending a root directory is enough, but `../` can escape it.
**Prevention:** Always use `path.resolve` to obtain the canonical path of both the root directory and the target file. Then, strictly verify that the target path starts with the root path using `.startsWith()`.
