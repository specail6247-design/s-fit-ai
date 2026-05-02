## YYYY-MM-DD - [Path Traversal in API Route]
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts`. The `localPath` argument from user input (`garmentImageUrl`) is passed to `path.join(process.cwd(), 'public', relativePath)` without verifying that the resolved path is actually within the `public` directory.
**Learning:** Even when reading local static assets for an API, user input must be sanitized and bounds-checked against the expected base directory using strict `startsWith(baseDir + path.sep)` to prevent reading arbitrary system files.
**Prevention:** Always use `path.resolve` and verify that the absolute path starts exactly with the expected base directory (including the trailing path separator or strict equality).
