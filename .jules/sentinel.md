## 2023-10-27 - Fix path traversal in local file resolution
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` where unsanitized user input (`garmentImageUrl`) could be used to read arbitrary files from the server filesystem via the `localFileToDataUri` helper.
**Learning:** `path.join` with unsanitized user input can allow path traversal.
**Prevention:** Always use `path.resolve` to get the absolute path, and verify that the absolute path strictly starts with the expected base directory plus a path separator (e.g., `publicDir + path.sep`) before accessing the file system.
