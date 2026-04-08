## 2024-05-24 - [Path Traversal in API Route]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` allowed reading arbitrary files outside the `public` directory via unsanitized `garmentImageUrl` input.
**Learning:** `path.join` alone does not normalize paths to prevent traversal. Unsanitized user input concatenated into paths is highly dangerous.
**Prevention:** Always use `path.resolve` with a known base directory and explicitly check that the resolved absolute path starts with `baseDir + path.sep` (or strictly matches the base directory) to prevent escaping.
