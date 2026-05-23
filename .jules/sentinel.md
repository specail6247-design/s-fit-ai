## 2025-03-08 - Fixed Path Traversal Vulnerability in API Route
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where user-provided file paths were resolved using `path.join(process.cwd(), 'public', relativePath)` without bounds checking, allowing potential access to files outside the `public` directory.
**Learning:** `path.join` normalizes paths but does not prevent traversal out of the base directory if the user input contains `../`.
**Prevention:** Use `path.resolve(baseDir, userInput)` to get an absolute path, and then explicitly verify that the resolved path starts with the base directory path plus the system path separator (`baseDir + path.sep`) before accessing the file.
