## 2024-06-03 - Escape JSX strings to fix CI
**Learning:** `react/no-unescaped-entities` will trigger a fatal exit code 1 in Next.js CI pipelines.
**Action:** Always escape single (`&apos;`) and double (`&quot;`) quotes in raw JSX text, especially when fixing immediate CI breaks.
