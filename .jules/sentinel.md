## 2026-08-07 - Prevent Path Traversal Using Strict Prefix Matching
**Vulnerability:** The API endpoint `app/api/try-on/route.ts` used `path.join(process.cwd(), 'public', relativePath)` which was vulnerable to path traversal. A malicious user could provide `../../etc/passwd` to read arbitrary files.
**Learning:** Using `startsWith` without a trailing path separator allows partial directory matches (e.g., `/public_secrets` matching `/public`).
**Prevention:** Always use `path.resolve` to resolve absolute paths. Ensure the absolute path strictly starts with the target directory plus `path.sep` and handle exact root matches.
