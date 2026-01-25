import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../../store/useStore';

describe('Vault Store Logic', () => {
  beforeEach(() => {
    useStore.setState({ vaultItems: [], isVaultOpen: false });
  });

  it('should add item to vault', () => {
    const { addToVault } = useStore.getState();
    addToVault('item-1');
    expect(useStore.getState().vaultItems).toContain('item-1');
    expect(useStore.getState().vaultItems).toHaveLength(1);
  });

  it('should not add duplicate items to vault', () => {
    const { addToVault } = useStore.getState();
    addToVault('item-1');
    addToVault('item-1');
    expect(useStore.getState().vaultItems).toHaveLength(1);
  });

  it('should remove item from vault', () => {
    const { addToVault, removeFromVault } = useStore.getState();
    addToVault('item-1');
    addToVault('item-2');
    removeFromVault('item-1');
    expect(useStore.getState().vaultItems).not.toContain('item-1');
    expect(useStore.getState().vaultItems).toContain('item-2');
  });

  it('should toggle vault open state', () => {
    const { setVaultOpen } = useStore.getState();
    setVaultOpen(true);
    expect(useStore.getState().isVaultOpen).toBe(true);
    setVaultOpen(false);
    expect(useStore.getState().isVaultOpen).toBe(false);
  });
});
