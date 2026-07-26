## 2025-07-26 - Path Traversal in localFileToDataUri
**Vulnerability:** Path traversal in `app/api/try-on/route.ts` allowed reading arbitrary files by utilizing `../` in `garmentImageUrl`.
**Learning:** `path.join` with user input doesn't restrict traversal. `path.resolve` should be used alongside string validation to ensure containment.
**Prevention:** Use `path.resolve(baseDir, userInput)` and explicitly validate `absolutePath.startsWith(baseDir + path.sep)` to ensure boundaries.
