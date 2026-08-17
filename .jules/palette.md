## 2025-02-18 - Missing ARIA Labels on Close Buttons
**Learning:** Found multiple close buttons (represented by '✕') across different modals (e.g., AuthButton.tsx, DigitalTwinMode.tsx, VibeCheckMode.tsx, RealLifeFitting.tsx, FittingRoom.tsx) that are missing `aria-label` attributes, which makes them inaccessible to screen readers since '✕' is not semantically clear.
**Action:** Always add `aria-label="Close"` to icon-only buttons, especially generic close buttons across modals, to ensure accessibility.
