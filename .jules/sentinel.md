## 2024-05-24 - [Path Traversal in API]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` local file reading due to insufficient boundary checking on user-provided path resolving.
**Learning:** Using `path.join` with user input without ensuring the resulting path is constrained to the intended root directory allows escaping boundaries via `../`. Validating the absolute path via `absolutePath.startsWith(baseDir)` is vulnerable to partial-path bypass attacks unless strictly enforced with `path.sep`.
**Prevention:** Always use `path.resolve` combined with an explicit check enforcing that the absolute path starts exactly with `baseDir + path.sep` or strictly equals the `baseDir`.
