## 2024-09-24 - AI Orchestration with Next.js and FastAPI
**Learning:** When splitting architecture between Next.js and a Python FastAPI backend for AI orchestration, Next.js API routes can serve as a proxy layer. Using environment variables (e.g., `FASTAPI_BACKEND_URL`) ensures smooth transitions between local development and production.
**Action:** Always wrap proxy calls in a fallback block if the backend URL is missing to prevent breaking changes during local development testing.
