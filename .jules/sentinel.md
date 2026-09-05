## 2024-05-24 - Path Traversal in Local File Reader

**Vulnerability:** The `localFileToDataUri` function in `app/api/try-on/route.ts` used `path.join(process.cwd(), 'public', relativePath)` which allowed path traversal. If `relativePath` was something like `../../etc/passwd`, it resolved out of the `public` directory and allowed reading arbitrary server files, leading to a critical path traversal vulnerability.
**Learning:** Node.js's `path.join` resolves `..` components regardless of the preceding base directory, so it does not restrict paths to the base directory. Always use `path.resolve` combined with a string prefix check (`startsWith`) to verify the resolved path remains inside the intended directory.
**Prevention:** When dealing with local file handling based on user input, strictly use `path.resolve` and validate that the resolved absolute path starts with the intended base directory using `resolvedPath.startsWith(baseDir + path.sep)`.
