## 2024-06-26 - [Path Traversal in API Route]
**Vulnerability:** Found a Path Traversal vulnerability in app/api/try-on/route.ts where unsanitized user input (garmentImageUrl) was passed to path.join() and fs.readFileSync(), allowing arbitrary file reads outside the public directory.
**Learning:** Using path.join() with user-controlled input can lead to path traversal if the input contains '../'. It's essential to use path.resolve() and verify the resulting path is contained within the intended directory.
**Prevention:** Always sanitize and validate file paths derived from user input. Use path.resolve() and explicitly check if the resolved path starts with the expected base directory path.
