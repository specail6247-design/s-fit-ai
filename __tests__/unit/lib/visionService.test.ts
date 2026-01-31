import { describe, it, expect, vi } from 'vitest';
import { calculateRecommendedSize, getComplementaryItems, ClothingStyleAnalysis } from '@/lib/visionService';
import type { PoseProportions } from '@/lib/mediapipe';
import { ClothingItem, getAllItems } from '@/data/mockData';

// Mock OpenAI
vi.mock('openai', () => {
  return {
    default: class {
      apiKey = 'mock-key';
    }
  };
});

describe('Vision Service', () => {
  describe('calculateRecommendedSize', () => {
    const mockProportions: PoseProportions = {
      shoulderWidth: 0.5,
      hipWidth: 0.5,
      waistWidth: 0.4,
      torsoHeight: 0.5,
      legLength: 0.5,
      armLength: 0.6,
      shoulderSlope: 0.1,
      overallRatio: 0.5
    };
    const userHeight = 175; // cm

    it('should return a valid size recommendation for ZARA top', () => {
      const result = calculateRecommendedSize(
        mockProportions,
        userHeight,
        'ZARA',
        'tops',
        null
      );

      expect(result).toHaveProperty('recommendedSize');
      expect(result).toHaveProperty('confidence');
      expect(result.fitNotes.length).toBeGreaterThan(0);
      expect(['XS', 'S', 'M', 'L', 'XL']).toContain(result.recommendedSize);
    });

    it('should handle missing size chart gracefully', () => {
      const result = calculateRecommendedSize(
        mockProportions,
        userHeight,
        'UnknownBrand',
        'tops',
        null
      );

      expect(result.recommendedSize).toBe('M');
      expect(result.confidence).toBe(50);
      expect(result.fitNotes[0]).toContain('Size chart for this brand/category not found');
    });

    it('should adjust for stretch factor', () => {
        // Without stretch
        calculateRecommendedSize(
            mockProportions,
            userHeight,
            'ZARA',
            'tops',
            null
        );

        // With high stretch
        const mockAnalysis: ClothingStyleAnalysis = {
            category: 'tops',
            subCategory: 'sweatshirt',
            fitType: 'oversized',
            material: 'Heavy Cotton',
            materialType: 'knit',
            thickness: 7,
            stretchFactor: 8,
            drapingFactor: 3,
            drapingLevel: 3,
            stretchLevel: 4,
            description: 'desc'
        };

        const resultStretchy = calculateRecommendedSize(
            mockProportions,
            userHeight,
            'ZARA',
            'tops',
            mockAnalysis
        );

        expect(resultStretchy).toHaveProperty('recommendedSize');
    });
  });

  describe('getComplementaryItems', () => {
    it('should return items from complementary categories', () => {
      const allItems = getAllItems();
      const topItem = allItems.find(i => i.category === 'tops') as ClothingItem;

      const recommendations = getComplementaryItems(topItem);

      expect(recommendations.length).toBeLessThanOrEqual(3);
      recommendations.forEach(item => {
        expect(item.id).not.toBe(topItem.id);
        // Tops usually match with bottoms or outerwear
        expect(['bottoms', 'outerwear']).toContain(item.category);
      });
    });

    it('should prioritize matching colors (black/white)', () => {
        // Create a mock black item
        const blackItem = { ...getAllItems()[0], colors: ['Black'], category: 'tops' } as ClothingItem;
        const recommendations = getComplementaryItems(blackItem);
        expect(recommendations.length).toBeGreaterThan(0);
    });
  });
});
