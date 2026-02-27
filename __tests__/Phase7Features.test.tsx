import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useStore } from '../store/useStore';
import { mockClothingItems } from '../data/mockData';

// Mock persist middleware to avoid storage issues in tests
vi.mock('zustand/middleware', () => ({
  persist: (config: any) => (set: any, get: any, api: any) => config(set, get, api),
}));

describe('Phase 7 Features', () => {
  beforeEach(() => {
    useStore.getState().resetSession();
    // Reset other parts of the store manually if resetSession doesn't cover them
    useStore.setState({ savedLooks: [], isAudioMuted: false });
  });

  it('should have styling tips in mock data', () => {
    const item = mockClothingItems[0];
    expect(item.stylingTip).toBeDefined();
    expect(typeof item.stylingTip).toBe('string');
    expect(item.stylingTip.length).toBeGreaterThan(0);
  });

  it('should identify locked items correctly', () => {
    const lockedItem = mockClothingItems.find(i => i.isLocked);
    expect(lockedItem).toBeDefined();
    expect(lockedItem?.isLocked).toBe(true);
    expect(lockedItem?.unlockDate).toBeDefined();
  });

  it('should add items to the vault', () => {
    const item = mockClothingItems[0];
    const { addToVault } = useStore.getState();

    addToVault(item);

    const { savedLooks } = useStore.getState();
    expect(savedLooks).toHaveLength(1);
    expect(savedLooks[0].id).toBe(item.id);
  });

  it('should prevent duplicate items in the vault', () => {
    const item = mockClothingItems[0];
    const { addToVault } = useStore.getState();

    addToVault(item);
    addToVault(item); // Try adding again

    const { savedLooks } = useStore.getState();
    expect(savedLooks).toHaveLength(1);
  });

  it('should remove items from the vault', () => {
    const item = mockClothingItems[0];
    const { addToVault, removeFromVault } = useStore.getState();

    addToVault(item);
    removeFromVault(item.id);

    const { savedLooks } = useStore.getState();
    expect(savedLooks).toHaveLength(0);
  });

  it('should toggle ambient audio state', () => {
    const { toggleAudio } = useStore.getState();

    // Initial state is false (unmuted)
    expect(useStore.getState().isAudioMuted).toBe(false);

    toggleAudio();
    expect(useStore.getState().isAudioMuted).toBe(true);

    toggleAudio();
    expect(useStore.getState().isAudioMuted).toBe(false);
  });
});
