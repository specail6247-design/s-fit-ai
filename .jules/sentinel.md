## Sentinel's Journal

## 2024-03-01 - [SSRF / Input Validation in API Route]
**Vulnerability:** Found a lack of URL validation in `app/api/cinematic-try-on/route.ts` where the `imageUrl` field is passed directly to the `generateCinematicVideo` process without verifying if the format is safe.
**Learning:** Accepting unvalidated string inputs for image fetch URLs opens the door for SSRF or potentially injecting malicious file schemes (`file://`, `ftp://`).
**Prevention:** Implement strict string prefix checks allowing only `http://`, `https://`, or `data:image/` formats before handing data off to processing or external requests.
