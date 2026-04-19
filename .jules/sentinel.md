## 2024-05-18 - Path Traversal in localFileToDataUri
**Vulnerability:** Unsanitized user input (`garmentImageUrl`) in `/api/try-on` route was combined with `path.join`, allowing arbitrary file reading outside the `public` directory (Path Traversal).
**Learning:** Using `path.join` with user input without validating the resolved absolute path allows users to use `../` to access sensitive files on the server.
**Prevention:** Always use `path.resolve()` with a known base directory and strictly enforce that the resulting absolute path starts with `baseDir + path.sep`.
