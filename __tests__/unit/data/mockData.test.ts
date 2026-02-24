import { describe, it, expect } from 'vitest';
import {
  getItemsByBrand,
  getLuxuryItems,
  getItemById,
  getItemsByCategory,
  getAllItems,
  mockClothingItems
} from '@/data/mockData';

describe('Mock Data Helpers', () => {
  it('should retrieve all items', () => {
    const items = getAllItems();
    expect(items.length).toBe(mockClothingItems.length);
  });

  it('should filter items by brand', () => {
    const zaraItems = getItemsByBrand('ZARA');
    expect(zaraItems.length).toBeGreaterThan(0);
    zaraItems.forEach(item => {
      expect(item.brand).toBe('ZARA');
    });

    const gucciItems = getItemsByBrand('Gucci');
    expect(gucciItems.length).toBeGreaterThan(0);
    gucciItems.forEach(item => {
      expect(item.brand).toBe('Gucci');
    });

    // Test case insensitivity
    const zaraItemsLower = getItemsByBrand('zara');
    expect(zaraItemsLower.length).toBe(zaraItems.length);
  });

  it('should filter luxury items', () => {
    const luxuryItems = getLuxuryItems();
    expect(luxuryItems.length).toBeGreaterThan(0);
    luxuryItems.forEach(item => {
      expect(item.isLuxury).toBe(true);
    });

    const nonLuxuryCount = mockClothingItems.length - luxuryItems.length;
    expect(nonLuxuryCount).toBeGreaterThan(0);
  });

  it('should retrieve item by id', () => {
    const targetItem = mockClothingItems[0];
    const foundItem = getItemById(targetItem.id);
    expect(foundItem).toEqual(targetItem);

    const notFound = getItemById('non-existent-id');
    expect(notFound).toBeUndefined();
  });

  it('should filter items by category', () => {
    const tops = getItemsByCategory('tops');
    expect(tops.length).toBeGreaterThan(0);
    tops.forEach(item => {
      expect(item.category).toBe('tops');
    });
  });

  it('should verify new fields: stylingTip and locked status', () => {
    const gucci001 = getItemById('gucci-001');
    expect(gucci001).toBeDefined();
    expect(gucci001?.stylingTip).toBeDefined();

    const gucci005 = getItemById('gucci-005');
    expect(gucci005).toBeDefined();
    expect(gucci005?.stylingTip).toBeDefined();
    expect(gucci005?.locked).toBe(true);
    expect(gucci005?.unlockDate).toBeDefined();
  });
});
