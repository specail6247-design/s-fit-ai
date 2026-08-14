## 2024-05-24 - Path Traversal in Try-On API
**Vulnerability:** Path traversal vulnerability in app/api/try-on/route.ts allowed reading arbitrary files via garmentImageUrl starting with / followed by ../.
**Learning:** path.join resolves ../, bypassing the intended directory confinement.
**Prevention:** Always validate that the resolved absolute path starts with the intended base directory plus a path separator to prevent partial path bypass, and is not the base directory itself.
