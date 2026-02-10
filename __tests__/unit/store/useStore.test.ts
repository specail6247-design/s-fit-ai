import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '@/store/useStore';
import { mockClothingItems } from '@/data/mockData';

describe('useStore Phase 7 Features', () => {
  beforeEach(() => {
    useStore.setState({
      savedLooks: [],
      isVaultOpen: false,
      isAudioEnabled: false,
    });
  });

  it('should toggle vault', () => {
    expect(useStore.getState().isVaultOpen).toBe(false);
    useStore.getState().toggleVault();
    expect(useStore.getState().isVaultOpen).toBe(true);
    useStore.getState().toggleVault();
    expect(useStore.getState().isVaultOpen).toBe(false);
  });

  it('should save look', () => {
    const item = mockClothingItems[0];
    useStore.getState().saveLook(item);
    expect(useStore.getState().savedLooks).toContainEqual(item);
    expect(useStore.getState().savedLooks).toHaveLength(1);

    // Test duplicate prevention
    useStore.getState().saveLook(item);
    expect(useStore.getState().savedLooks).toHaveLength(1);
  });

  it('should remove look', () => {
    const item = mockClothingItems[0];
    useStore.getState().saveLook(item);
    expect(useStore.getState().savedLooks).toHaveLength(1);

    useStore.getState().removeLook(item.id);
    expect(useStore.getState().savedLooks).toHaveLength(0);
  });

  it('should toggle audio', () => {
    expect(useStore.getState().isAudioEnabled).toBe(false);
    useStore.getState().setAudioEnabled(true);
    expect(useStore.getState().isAudioEnabled).toBe(true);
  });
});
