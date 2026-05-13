
## 2024-05-24 - [Path Traversal in API Route]
**Vulnerability:** The API route `app/api/try-on/route.ts` processed user input to read files by joining paths using `path.join()`, allowing for Directory Traversal (CWE-22) attacks.
**Learning:** Using `path.join()` allows `..` segments to traverse directories. When reading files based on user-supplied input, simple string operations can be exploited to access sensitive system files outside the intended directory.
**Prevention:** To prevent this, always resolve the path using `path.resolve(baseDir, userInput)` and explicitly validate that the resulting absolute path is contained within the base directory (`if (!absolutePath.startsWith(baseDir + path.sep))`).
