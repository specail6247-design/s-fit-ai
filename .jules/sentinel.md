## 2025-01-01 - Fix Path Traversal in localFileToDataUri
**Vulnerability:** The API endpoint `app/api/try-on/route.ts` used `path.join` with unsanitized user input (`garmentImageUrl`), allowing malicious users to access arbitrary files on the server by supplying paths like `../../etc/passwd`.
**Learning:** Node.js `path.join` does not prevent path traversal if the input contains `../`. It just resolves the path.
**Prevention:** Always use `path.resolve(baseDir, userInput)` and strictly validate that the resulting absolute path begins with `baseDir + path.sep`.