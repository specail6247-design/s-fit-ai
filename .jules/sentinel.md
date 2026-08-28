## 2024-05-24 - Fix Path Traversal in Try-On API
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where `path.join` was used without validating the resolved path against the target directory, allowing arbitrary file reads.
**Learning:** `path.join` does not prevent path traversal if user input contains `../`. Local file reads based on user input must explicitly validate the final resolved path.
**Prevention:** Use `path.resolve(baseDir, userInput)` and explicitly validate that the resolved path begins with the target directory string (`absolutePath.startsWith(baseDir + path.sep)`). Do not rely solely on `path.join`.
