## 2025-03-05 - Path Traversal Vulnerability in Local File Loading
**Vulnerability:** Path traversal risk found in `app/api/try-on/route.ts` where `path.join` was used with user-provided input (`localPath`) to construct a file path for reading local files, allowing potential access to unauthorized files outside the `public` directory.
**Learning:** `path.join` does not inherently prevent path traversal if the user input contains `../` sequences. When handling user-provided file paths, it's crucial to explicitly validate the resolved path.
**Prevention:** Strictly use `path.resolve(baseDir, userInput)` and explicitly validate that the resolved absolute path begins with the target base directory string (e.g., `absolutePath.startsWith(baseDir + path.sep)`). Do not rely solely on `path.join`.
