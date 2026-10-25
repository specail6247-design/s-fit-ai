## 2024-05-18 - Prevent Path Traversal in API Routes
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` through `path.join` with unsanitized user input (`garmentImageUrl`). This allowed reading arbitrary files outside the `public` directory.
**Learning:** Using `path.join` on user-provided path segments does not prevent path traversal (`../`). An attacker could supply `/../../../etc/passwd` to read sensitive files.
**Prevention:** Always use `path.resolve` against a base directory, and explicitly verify that the resolved path `startsWith` the base directory + `path.sep` to ensure bounds checking and prevent partial path traversal.
