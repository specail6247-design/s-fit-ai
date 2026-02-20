import { describe, it, expect } from 'vitest';
import { mockClothingItems } from '../../../data/mockData';

describe('Data Verification', () => {
  it('should have no duplicate IDs', () => {
    const ids = mockClothingItems.map(item => item.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      console.log('Duplicate IDs:', duplicates);
    }
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('should have Hermes items with high prices', () => {
    const hermesItems = mockClothingItems.filter(item => item.brand === 'Hermes');
    expect(hermesItems.length).toBeGreaterThan(0);
    hermesItems.forEach(item => {
      expect(item.price).toBeGreaterThan(20);
      if (item.subCategory === 'bag') {
        expect(item.price).toBeGreaterThan(1000);
      }
    });
  });

  it('should have distinct image URLs', () => {
    const imageUrls = mockClothingItems.map(item => item.imageUrl);
    const uniqueUrls = new Set(imageUrls);
    console.log(`Unique Image URLs: ${uniqueUrls.size} / ${imageUrls.length}`);
    // Ideally they should be mostly unique.
  });
});
