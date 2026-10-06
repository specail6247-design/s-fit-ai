## 2025-03-04 - Path Traversal in localFileToDataUri
**Vulnerability:** Path traversal vulnerability in `app/api/try-on/route.ts` via `garmentImageUrl` processing in `localFileToDataUri`.
**Learning:** In the S_FIT AI project, API routes integrating with the Replicate SDK often process local files as data URIs. These are critical injection points for LFI/Path Traversal.
**Prevention:** Always validate input paths strictly by using `path.resolve` for both the base and target directories and asserting that the resolved target path strictly starts with the base directory plus a path separator.
