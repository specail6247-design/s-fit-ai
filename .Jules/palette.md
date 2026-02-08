## 2025-03-04 - Unused Components Trap
**Learning:** I spent time analyzing and fixing `FittingRoom.tsx` only to discover it's currently unused in the main application flow (orphaned or legacy code), as `RealLifeFitting` and `LuxuryGarmentDetail` have replaced it.
**Action:** Always verify *where* a component is used (grep usage, check routes) before committing to fixing it, even if it looks like a core component. Focus on `app/` routes first to identify active UI surfaces.
