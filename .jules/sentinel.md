
## 2025-07-07 - Path Traversal Vulnerability in Virtual Try-On API
**Vulnerability:** Path traversal vulnerability in `localFileToDataUri` inside `app/api/try-on/route.ts` where unsanitized user input was combined with `path.join()`, allowing access to arbitrary files outside of the `public/` directory via `../` combinations (e.g. `../../../../etc/passwd`).
**Learning:** `path.join()` normalizes the path and resolves `..` elements but does not restrict the result to a base directory if the resolved path goes up past it. User inputs describing local files need to be verified after being resolved against the base directory.
**Prevention:** Use `path.resolve()` with a base directory and explicitly check that the resulting absolute path still starts with the base directory (`resolvedPath.startsWith(baseDir + path.sep)`) before attempting to read the file.
