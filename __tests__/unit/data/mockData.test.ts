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

  it('should filter items by new luxury brands', () => {
    const hermesItems = getItemsByBrand('Hermes');
    expect(hermesItems.length).toBeGreaterThan(0);
    hermesItems.forEach(item => {
      expect(item.brand).toBe('Hermes');
      expect(item.isLuxury).toBe(true);
    });

    const gmItems = getItemsByBrand('Gentle Monster');
    expect(gmItems.length).toBeGreaterThan(0);
    gmItems.forEach(item => {
      expect(item.brand).toBe('Gentle Monster');
      expect(item.isLuxury).toBe(true);
    });
  });

  it('should correctly categorize accessories', () => {
    const accessories = getItemsByCategory('accessories');
    expect(accessories.length).toBeGreaterThan(0);
    const birkin = accessories.find(item => item.id === 'hermes-birkin');
    expect(birkin).toBeDefined();
    expect(birkin?.subCategory).toBe('bag');
  });
});
