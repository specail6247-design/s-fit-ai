## 2026-02-21 - [Path Traversal in API Route]
**Vulnerability:** The `app/api/try-on/route.ts` allowed reading arbitrary files via path traversal (e.g. `/../package.json`) because it blindly joined user input with `process.cwd()/public`.
**Learning:** `path.join` resolves `..` segments, meaning checking `startsWith` on the input path is insufficient. You must check that the resolved path is still contained within the intended base directory using `path.relative` and checking for `..` prefixes.
**Prevention:** Use a dedicated `localFileToDataUri` utility that enforces `path.resolve` + containment check and whitelists allowed file extensions.
