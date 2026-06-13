1. **Update `mockData.ts` to include Phase 7 properties**:
   - Add `stylingTip`, `isLocked`, and `unlockDate` fields to the `ClothingItem` interface.
   - Update some mock items to include `stylingTip`.
   - Update the `chanel-bag-001` item to be locked and have an `unlockDate`.

2. **Update Global Store (`useStore.ts`)**:
   - Add the Vault properties (`vaultItems`, `isVaultOpen`) and methods (`saveToVault`, `removeFromVault`, `setVaultOpen`).
   - Add Sensory Ambience properties (`isSensoryAmbienceEnabled`) and method (`setSensoryAmbience`).

3. **Create `useSensoryAmbience` hook (`hooks/useSensoryAmbience.ts`)**:
   - Implement an audio hook that uses the browser's Web Audio API to create a background synth hum (432Hz sine wave) when `isSensoryAmbienceEnabled` is true.

4. **Update `ItemCard` (within `components/FittingRoom.tsx` or its own file if external)**:
   - Make sure `ItemCard` can show a "Locked" countdown overlay if an item is locked.

5. **Update `FittingRoom.tsx`**:
   - Call the `useSensoryAmbience` hook to instantiate the background hum (linked to state).
   - Display the "Styling Tip" below the item information or in the AI Consultant overlay.
   - Add "Save to Vault" button and Vault Drawer UI.
   - Add "Sensory Ambience" toggle control.

6. **Fix TypeScript / Testing Errors**:
   - Update `__tests__/unit/lib/visionService.test.ts` to mock the correct type definitions.
   - Run tests and lint to ensure no regressions.

7. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
8. Submit code.
