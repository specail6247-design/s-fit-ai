1. **Update `data/mockData.ts`**: Add `stylingTip` and `isLocked` properties to the `ClothingItem` interface. Populate these fields for luxury items, setting at least one item as locked.
2. **Update `store/useStore.ts`**: Add global state for "The Vault" (`savedItems`, `isVaultOpen`, etc.) and ambient audio (`isAudioMuted`).
3. **Create `components/AmbientAudio.tsx`**: Implement an audio component that plays a subtle base64 background hum when `isAudioMuted` is false, including a visible toggle button.
4. **Create `components/modals/TheVault.tsx`**: Implement a minimalist drawer to display saved items ("Save Look" feature).
5. **Update `app/luxury/layout.tsx`**: Inject `Cinzel` and `Space Grotesk` fonts via `next/font/google` CSS variables. Mount `AmbientAudio` and `TheVault` components.
6. **Update `components/LuxuryGarmentDetail.tsx`**: Display the AI Stylist Note (`stylingTip`), the Exclusive Access countdown for locked items (`isLocked`), and add a "Save Look" button.
7. **Complete pre commit steps**: Ensure proper testing, verification, review, and reflection are done.
8. **Submit the change**: Submit the code.
