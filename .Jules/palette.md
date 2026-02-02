# UX & Accessibility Journal

## Phase 7 Learnings

### Sensory Design
- **Audio Context:** Implementing ambient audio (`SensoryAmbience`) requires careful state management. Audio must not auto-play without user interaction policies in mind, though we start it on interaction in the Fitting Room.
- **Controls:** A clear, visible mute toggle is essential for accessibility. Used a visual indicator (icon + text) and animation to confirm state changes.

### The Vault (Digital Wardrobe)
- **Drawer Pattern:** Used a slide-out drawer (`TheVault`) to manage saved looks without navigating away from the fitting experience.
- **Feedback:** Added "Save" (Heart) interaction with immediate visual feedback in the main UI, synced with the drawer state.

### Micro-Interactions
- **Countdown Timers:** Used for "Locked" items to create urgency/desire, with a clear visual overlay that disables interaction to prevent frustration.
- **Styling Tips:** Displayed as concise text overlays to add value without cluttering the UI.
