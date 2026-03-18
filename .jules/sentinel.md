## 2024-05-30 - Prevent Path Traversal in Server APIs

**Vulnerability:** A path traversal vulnerability was present in `app/api/try-on/route.ts` because it joined a user-provided file path parameter (`garmentImageUrl`) directly to the base directory (`public`) and read it using `fs.readFileSync` without validation, allowing users to specify paths like `../../../etc/passwd` to read arbitrary files.
**Learning:** `path.join` does not prevent a path from escaping a parent directory. If a user inputs `../`, `path.join` will happily traverse upwards. Server-side code that reads files based on user input must explicitly validate that the resolved path stays within the intended directory boundaries.
**Prevention:** Use `path.resolve(baseDir, userInput)` to get the absolute path, and verify that the absolute path starts with the expected base directory (e.g., `if (!absolutePath.startsWith(publicDir + path.sep))`).
