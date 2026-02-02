# Sentinel Journal - Critical Security Learnings

## 2024-05-22 - Path Traversal in Try-On API
**Vulnerability:** A Path Traversal vulnerability was identified in `app/api/try-on/route.ts`. The `localFileToDataUri` function blindly joined `process.cwd()` with user-controlled input using `path.join`, allowing access to sensitive files outside the `public` directory (e.g., `../../.env`).
**Learning:** Using `path.join` with user input is dangerous when resolving file paths, as it automatically normalizes `../` segments. Simply checking for `..` in the string is insufficient as there are many ways to represent paths.
**Prevention:** Always use `path.resolve` to generate the absolute path of the target directory and the requested file, then strictly verify that the requested file's path starts with the target directory's path.
