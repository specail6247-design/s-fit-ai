## 2024-05-24 - Path Traversal in File to URI Helper
**Vulnerability:** The `/api/try-on` endpoint was vulnerable to path traversal because `localFileToDataUri` used `path.join(process.cwd(), 'public', relativePath)` to resolve user-provided image paths, allowing `../` payloads to traverse outside the public directory.
**Learning:** `path.join` does not normalize and validate directory containment. If user input starts with `/../`, it will simply navigate up from the base path.
**Prevention:** Always use `path.resolve` to get the absolute path, and strictly enforce containment by asserting that the resolved absolute path starts with `baseDir + path.sep` to prevent both traversal (`../`) and partial directory matches (e.g. `public_secret/`).
