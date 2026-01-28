import { describe, it, expect } from 'vitest';
import { getAllItems } from '@/data/mockData';

describe('Phase 7 Data Verification', () => {
  it('should have items with styling tips', () => {
    const items = getAllItems();
    const itemsWithTips = items.filter(item => item.stylingTip);
    expect(itemsWithTips.length).toBeGreaterThan(0);
  });

  it('should have a locked item', () => {
    const items = getAllItems();
    const lockedItems = items.filter(item => item.lockedUntil);
    expect(lockedItems.length).toBeGreaterThan(0);

    // Check if the locked date is in the future
    const lockedItem = lockedItems[0];
    if (lockedItem.lockedUntil) {
       expect(new Date(lockedItem.lockedUntil).getTime()).toBeGreaterThan(Date.now());
    }
  });
});
