## 2025-02-28 - Testing Isolated Components with Playwright
**Learning:** When using Playwright to visually verify an isolated component (like `AuthButton`) that might not be easily accessible on the main page without setup (or if you can't easily find it), creating a temporary Next.js route (e.g., `app/test-auth/page.tsx`) to mount it is a reliable and fast way to isolate the test.
**Action:** Next time I need to test a specific UI component, I will immediately create a temporary route to mount it directly for the Playwright script, rather than navigating complex existing UI flows.
