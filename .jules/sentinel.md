## 2024-05-24 - Path Traversal in API Route
**Vulnerability:** A path traversal vulnerability existed in the `/api/try-on` endpoint where user input (`garmentImageUrl`) was used to construct a local file path (`path.join(process.cwd(), 'public', relativePath)`) without strict validation, potentially allowing access to files outside the intended `public` directory.
**Learning:** `path.join` does not sanitize or restrict paths by itself. If the input contains `../` sequences, it can resolve to arbitrary locations.
**Prevention:** Always use `path.resolve` to get the absolute path and explicitly verify that the resulting path starts with the intended base directory using `startsWith(baseDir + path.sep)`.
