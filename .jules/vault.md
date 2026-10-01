## Phase 7: The Vault & Proactive Innovations

**Learnings**:
- Created a robust "Vault" functionality in Zustand (`store/useStore.ts`) capable of adding, toggling, and removing `savedItems` directly linked to the user's local session via `partialize`.
- Designed an intuitive side-drawer in `components/FittingRoom.tsx` mapping to the Vault to allow effortless comparing of luxury fashion.
- Implemented "Countdown Drop" functionality in `ItemCard` for exclusive items matching the `availableInSeconds` schema.
- Built a native Audio auto-player within the FittingRoom using React's `useEffect`, defaulting to muted (in some modern browsers autoplay with sound is blocked, so a UI toggle was also created).
