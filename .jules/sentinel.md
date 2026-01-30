# Sentinel's Journal 🛡️

## 2025-02-18 - Path Traversal in File Uploads
**Vulnerability:** A path traversal vulnerability existed in `app/api/try-on/route.ts` where `localFileToDataUri` allowed accessing files outside the public directory using `..` in the path.
**Learning:** `path.join` resolves `..` segments but does not prevent traversal out of the root. Assuming `path.join('public', userInput)` is safe is a common mistake.
**Prevention:** Always verify that the resolved absolute path starts with the expected root directory path (ending with `path.sep` to prevent prefix matching attacks).
