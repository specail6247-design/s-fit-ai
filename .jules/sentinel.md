## 2024-05-18 - [Path Traversal in API Route]
**Vulnerability:** The API route for fetching local images (`app/api/try-on/route.ts`) used `path.join` with unsanitized user input (`garmentImageUrl`), allowing path traversal outside the intended `public` directory (e.g. `../../etc/passwd`).
**Learning:** `path.join` does not prevent traversing upwards if the input contains `../`.  Next.js API routes that proxy local assets or handle file paths based on user input are vulnerable to this.
**Prevention:** Always construct the absolute path using `path.resolve()` with a known base directory, and explicitly verify that the result begins with `baseDir + path.sep` (e.g., `!absolutePath.startsWith(publicDir + path.sep) && absolutePath !== publicDir`) before attempting to access the file system.
