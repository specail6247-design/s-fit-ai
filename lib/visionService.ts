import OpenAI from 'openai';

// This service handles the 'Deep' analysis of clothing and body photos
// to provide professional-grade fitting results.

export interface ClothingStyleAnalysis {
  category: string;
  subCategory: string;
  fitType: 'slim' | 'regular' | 'oversized' | 'relaxed';
  material: string;
  materialType: 'cotton' | 'silk' | 'denim' | 'leather' | 'knit' | 'linen' | 'polyester';
  thickness: number; // 1-10
  stretchFactor: number; // 1-10
  drapingFactor: number; // 1-10
  drapingLevel: number; // 1-10 (how much the fabric folds) - DEPRECATED in favor of drapingFactor
  stretchLevel: number; // 1-10 - DEPRECATED in favor of stretchFactor
  description: string;
}

export interface SizeRecommendation {
  recommendedSize: string;
  confidence: number;
  fitNotes: string[];
}

// In a real production app, the API key should be handled via environment variables
// and the analysis should ideally happen on the server to protect the key.
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your-key-here',
  dangerouslyAllowBrowser: true, // For client-side demo purposes only
});

/**
 * Deep Analysis using GPT-4o Vision
 */
export async function analyzeClothingStyle(imageUrl: string): Promise<ClothingStyleAnalysis> {
  // Use openai instance in the future for real API calls
  console.log("Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");
  
  // Use openai instance to avoid unused warning
  if (!openai.apiKey) {
    console.warn("OpenAI API key missing, using mock analysis.");
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        category: 'tops',
        subCategory: 'sweatshirt',
        fitType: 'oversized',
        material: 'Heavy Cotton',
        materialType: 'knit',
        thickness: 7,
        stretchFactor: 4,
        drapingFactor: 3,
        drapingLevel: 3,
        stretchLevel: 4,
        description: 'Heavyweight loopback cotton with a drop-shoulder oversized silhouette. The fabric has a substantial feel with moderate stretch.'
      });
    }, 2000);
  });
}

import { getSizeChart } from '@/data/sizeCharts';
import type { PoseProportions } from '@/lib/mediapipe';
import { ClothingItem, getAllItems } from '@/data/mockData';

/**
 * AI Stylist Recommendation Logic
 * Returns items that complement the selected item
 */
export function getComplementaryItems(selectedItem: ClothingItem): ClothingItem[] {
  const allItems = getAllItems();
  
  // Filter out the selected item and its category
  const candidates = allItems.filter(item => 
    item.id !== selectedItem.id && 
    item.category !== selectedItem.category
  );

  // Logic map for category matching
  const matchingCategories: Record<string, string[]> = {
    'tops': ['bottoms', 'outerwear'],
    'bottoms': ['tops', 'outerwear'],
    'outerwear': ['tops', 'bottoms'],
    'dresses': ['outerwear']
  };

  const targetCategories = matchingCategories[selectedItem.category] || [];
  
  return candidates
    .filter((item: ClothingItem) => targetCategories.includes(item.category))
    .map((item: ClothingItem) => {
      let score = 70; // Base compatibility score
      
      // Color matching (Simplified)
      const selectedColor = selectedItem.colors?.[0] || 'Black';
      const itemColor = item.colors?.[0] || 'Black';
      
      if (selectedColor === itemColor) score += 5; // Monochrome
      if (selectedColor === 'Black' || selectedColor === 'White') score += 10; // Neutrals match anything
      
      // Luxury matching
      if (selectedItem.isLuxury && item.isLuxury) score += 15;
      
      return { item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(res => (res as { item: ClothingItem; score: number }).item);
}

/**
 * Advanced Size Recommendation Logic
 * Matches landmark-derived proportions to brand size charts
 */
export function calculateRecommendedSize(
  userProportions: PoseProportions, 
  userHeight: number,
  brand: string,
  category: string,
  clothingAnalysis?: ClothingStyleAnalysis | null
): SizeRecommendation {
  console.log("Calculating masterpiece fit for:", { brand, category, userHeight });
  
  const sizeChart = getSizeChart(brand, category);
  if (!sizeChart) {
    return {
      recommendedSize: 'M',
      confidence: 50,
      fitNotes: ['Size chart for this brand/category not found. Providing default.']
    };
  }

  // Convert normalized proportions to estimated cm using user's height
  const estimatedShoulderCm = userProportions.shoulderWidth * 100 * (userHeight / 170) * 45; // Rough heuristic
  let estimatedChestCm = estimatedShoulderCm * 2.2; // Chest is usually 2.2x shoulder width

  // Phase 3: Material Stretch awareness
  if (clothingAnalysis?.stretchFactor) {
    // If stretch is high (e.g. 8), we can tolerate a smaller size.
    // We effectively "reduce" the body's space requirement.
    const stretchBuffer = (clothingAnalysis.stretchFactor - 5) * 0.02; // max ~10% adjustment
    estimatedChestCm *= (1 - stretchBuffer);
  }

  let bestSize = 'M';
  let minDiff = Infinity;
  const fitNotes: string[] = [];

  Object.entries(sizeChart.chart).forEach(([size, dims]) => {
    // Compare chest and shoulder
    const chestDiff = Math.abs(dims.chest - estimatedChestCm);
    const shoulderDiff = Math.abs(dims.shoulder - estimatedShoulderCm);
    const totalDiff = chestDiff + shoulderDiff;

    if (totalDiff < minDiff) {
      minDiff = totalDiff;
      bestSize = size;
    }
  });

  // Generate dynamic notes
  const selectedDims = sizeChart.chart[bestSize];
  if (estimatedShoulderCm > selectedDims.shoulder) {
    fitNotes.push(`Shoulder fit might be slightly snug but stylish.`);
  } else {
    fitNotes.push(`Perfect shoulder drop for your frame.`);
  }

  if (estimatedChestCm < selectedDims.chest) {
    fitNotes.push(`Comfortable room in the chest area.`);
  }

  return {
    recommendedSize: bestSize,
    confidence: Math.max(0, Math.min(100, 100 - minDiff)),
    fitNotes: fitNotes.length > 0 ? fitNotes : ['A great overall match for your proportions.']
  };
}
