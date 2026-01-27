
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

// NOTE: Real analysis logic that requires secrets (like OpenAI API keys)
// MUST be implemented in a Server Action or API Route.
// Do NOT initialize OpenAI clients with NEXT_PUBLIC_ keys here.
// This is currently a mock implementation.

/**
 * Deep Analysis using GPT-4o Vision
 */
export async function analyzeClothingStyle(imageUrl: string): Promise<ClothingStyleAnalysis> {
  // Use openai instance in the future for real API calls
  console.log("Starting Deep Vision Analysis for image:", imageUrl.substring(0, 50) + "...");
  
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

  // Convert normalized proportions to estimated cm
  // Refined heuristics for Masterpiece Fit
  const estimatedShoulderCm = userProportions.shoulderWidth * 100 * (userHeight / 170) * 45;
  const estimatedChestCm = estimatedShoulderCm * 2.1;
  const estimatedWaistCm = userProportions.waistWidth * 100 * (userHeight / 170) * 45 * 2.0;
  const estimatedSleeveCm = userProportions.armLength * 100 * (userHeight / 170) * 35;

  let bestSize = 'M';
  let minDiff = Infinity;
  const fitNotes: string[] = [];

  Object.entries(sizeChart.chart).forEach(([size, dims]) => {
    // Multi-dimensional comparison
    const chestDiff = dims.chest ? Math.abs(dims.chest - estimatedChestCm) : 0;
    const shoulderDiff = dims.shoulder ? Math.abs(dims.shoulder - estimatedShoulderCm) : 0;
    const sleeveDiff = dims.sleeve ? Math.abs(dims.sleeve - estimatedSleeveCm) : 0;
    const totalDiff = chestDiff + shoulderDiff + (sleeveDiff * 0.5);

    if (totalDiff < minDiff) {
      minDiff = totalDiff;
      bestSize = size;
    }
  });

  // Generate dynamic professional notes
  const dims = sizeChart.chart[bestSize];
  
  // Shoulder & Slope analysis
  if (userProportions.shoulderSlope > 0.15) {
    fitNotes.push(`Your shoulders have a sharp slope; this ${category.slice(0, -1)}'s structure will complement your silhouette.`);
  }

  if (dims.shoulder && estimatedShoulderCm > dims.shoulder + 2) {
    fitNotes.push(`Shoulder fit will be "Power Fit" (slightly snug). Size up if you prefer a relaxed look.`);
  } else if (dims.shoulder && estimatedShoulderCm < dims.shoulder - 2) {
    fitNotes.push(`Perfect "Drop Shoulder" effect for your frame.`);
  }

  // Sleeve analysis
  if (dims.sleeve && estimatedSleeveCm > dims.sleeve + 3) {
    fitNotes.push(`Sleeves might be slightly cropped/fashionably short on your arms.`);
  }

  // Waist analysis
  if (dims.waist && estimatedWaistCm > dims.waist && clothingAnalysis?.fitType === 'slim') {
    fitNotes.push(`The waist area is tailored; expect a defined, close-to-body fit.`);
  }

  // Stretch adjustment
  if (clothingAnalysis?.stretchFactor && clothingAnalysis.stretchFactor > 7) {
    fitNotes.push(`High stretch fabric (${clothingAnalysis.materialType}) ensures comfort despite the precise fit.`);
  }

  return {
    recommendedSize: bestSize,
    confidence: Math.max(0, Math.min(100, 100 - (minDiff / 3))),
    fitNotes: fitNotes.length > 0 ? fitNotes : ['Balanced fit across all key measurements.']
  };
}

/**
 * Generates data for the Fit Heatmap
 * 0: loose (blue), 0.5: perfect (green), 1.0: tight (red)
 */
export function generateFitHeatmap(userProportions: PoseProportions, userHeight: number, brand: string, category: string) {
  const sizeChart = getSizeChart(brand, category);
  if (!sizeChart) return { shoulders: 0.5, chest: 0.5, waist: 0.5, sleeves: 0.5 };

  const rec = calculateRecommendedSize(userProportions, userHeight, brand, category);
  const dims = sizeChart.chart[rec.recommendedSize];

  const estimatedShoulderCm = userProportions.shoulderWidth * 100 * (userHeight / 170) * 45;
  const estimatedChestCm = estimatedShoulderCm * 2.1;
  const estimatedWaistCm = userProportions.waistWidth * 100 * (userHeight / 170) * 45 * 2.0;
  const estimatedSleeveCm = userProportions.armLength * 100 * (userHeight / 170) * 35;

  const getHeatValue = (actual: number, target: number | undefined) => {
    if (target === undefined) return 0.5;
    const diff = (actual - target) / 10; 
    return Math.max(0, Math.min(1, 0.5 + diff));
  };

  return {
    shoulders: getHeatValue(estimatedShoulderCm, dims.shoulder),
    chest: getHeatValue(estimatedChestCm, dims.chest),
    waist: getHeatValue(estimatedWaistCm, dims.waist),
    sleeves: getHeatValue(estimatedSleeveCm, dims.sleeve)
  };
}
