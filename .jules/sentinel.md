## $(date +%Y-%m-%d) - Prevent Path Traversal using startswith check
**Vulnerability:** Path traversal when loading local image files in API routes using path.join()
**Learning:** Checking absolutePath.startsWith(baseDir) without path separator lets attackers access sibling directories sharing the same prefix (e.g., /public_secrets matching /public).
**Prevention:** Always append path.sep when doing a strict boundary enforcement: absolutePath.startsWith(baseDir + path.sep) && absolutePath !== baseDir
