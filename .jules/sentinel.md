## 2024-05-18 - Path Traversal in Try-On API
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` allowed reading arbitrary files outside the `public/` directory via `path.join(process.cwd(), 'public', relativePath)` combined with unsanitized `../` input.
**Learning:** Using `path.join` with unsanitized input is unsafe even when prefixed with a base directory. Node.js resolves `..` components across the boundary.
**Prevention:** Always use `path.resolve()` with a known base directory, and explicitly verify that the resulting absolute path starts with `baseDir + path.sep` (or matches exactly) to ensure the path does not escape the intended directory.
