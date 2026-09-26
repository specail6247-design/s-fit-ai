## 2024-05-15 - [Fix Path Traversal in Try-On API]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used directly with user-provided paths without checking if the resulting path escaped the intended directory.
**Learning:** `path.join(base, user_input)` combined with `absolutePath.startsWith(baseDir)` is insufficient if `path.sep` isn't appended, but additionally `path.resolve` combined with proper prefix checking is robust. Replicate SDK endpoints that process local files as data URIs are a common injection point for these vulnerabilities.
**Prevention:** Always use `path.resolve` to normalize paths, and strictly enforce directory boundaries by verifying that `absolutePath.startsWith(baseDir + path.sep) && absolutePath !== baseDir`.
