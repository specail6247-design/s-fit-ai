import { describe, it, expect } from 'vitest';
import { LayeringEngine, LAYER_Z_INDEX } from '@/lib/layering';
import { ClothingItem } from '@/data/mockData';

const mockItems: Partial<ClothingItem>[] = [
  { id: '1', name: 'Skin', category: 'tops', zIndex: 0 }, // Fake skin item
  { id: '2', name: 'T-Shirt', category: 'tops' }, // Default 25
  { id: '3', name: 'Jeans', category: 'bottoms' }, // Default 20
  { id: '4', name: 'Jacket', category: 'outerwear' }, // Default 30
  { id: '5', name: 'Necklace', category: 'accessories', subCategory: 'jewelry' }, // Default 35
  { id: '6', name: 'Bag', category: 'accessories', subCategory: 'bag' }, // Default 50
  { id: '7', name: 'Hat', category: 'accessories', subCategory: 'hat' }, // Default 45
];

describe('LayeringEngine', () => {
  const engine = new LayeringEngine();

  it('should sort items correctly by Z-Index', () => {
    // Shuffle items first
    const items = [...mockItems] as ClothingItem[];
    items.sort(() => Math.random() - 0.5);

    const sorted = engine.sortItemsForTryOn(items);

    const names = sorted.map(i => i.name);

    // Expected Order:
    // Skin (0)
    // Jeans (20)
    // T-Shirt (25)
    // Jacket (30)
    // Necklace (35)
    // Hat (45)
    // Bag (50)

    expect(names).toEqual([
      'Skin',
      'Jeans',
      'T-Shirt',
      'Jacket',
      'Necklace',
      'Hat',
      'Bag'
    ]);
  });

  it('should respect explicit zIndex overrides', () => {
    const items = [
      { id: 'a', name: 'Underwear', category: 'bottoms', zIndex: 10 },
      { id: 'b', name: 'Pants', category: 'bottoms', zIndex: 20 },
    ] as ClothingItem[];

    const sorted = engine.sortItemsForTryOn(items);
    expect(sorted[0].name).toBe('Underwear');
    expect(sorted[1].name).toBe('Pants');
  });

  it('should generate composite strategy with mask requirements', () => {
    const items = [
      { id: 'a', name: 'Shirt', category: 'tops' },
      { id: 'b', name: 'Bag', category: 'accessories', subCategory: 'bag' },
    ] as ClothingItem[];

    const strategy = engine.generateCompositeStrategy(items);

    expect(strategy.layers).toHaveLength(2);
    expect(strategy.layers[0].item.name).toBe('Shirt');
    expect(strategy.layers[0].maskRequired).toBe(false);

    expect(strategy.layers[1].item.name).toBe('Bag');
    expect(strategy.layers[1].maskRequired).toBe(true);
  });

  it('should validate outfit for conflicts', () => {
    const items = [
      { id: 'a', name: 'Dress', category: 'dresses' },
      { id: 'b', name: 'Jeans', category: 'bottoms' },
    ] as ClothingItem[];

    const warnings = engine.validateOutfit(items);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]).toContain('Wearing a Dress with Tops/Bottoms');
  });
});
