## 2025-02-14 - Fix Path Traversal in API
**Vulnerability:** Local File Inclusion (LFI) in `app/api/try-on/route.ts` via unsanitized `path.join` on local URIs, allowing paths like `../../.env`.
**Learning:** `path.join` does not prevent traversing out of the base directory if the input contains `../`. The application used it to read files requested via `garmentImageUrl`.
**Prevention:** Use `path.resolve` for both the base directory and the target path, and strictly verify that the resolved target path starts with the base directory plus a path separator (`baseDir + path.sep`) before reading any file.
