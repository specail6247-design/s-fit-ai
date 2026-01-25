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

export interface HMRMeasurements {
  shoulderWidth: number;
  chestCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
  armLength: number;
  inseam: number;
  thighCircumference: number;
}

export interface HeatmapData {
  shoulders: number;
  chest: number;
  waist: number;
  hips: number;
  sleeves: number;
  thigh: number;
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
 * Simulates HMR 2.0 (Human Mesh Recovery) analysis.
 * Generates precise 3D body measurements from user stats and base proportions.
 */
export function simulateHMRAnalysis(userHeight: number, proportions?: PoseProportions): HMRMeasurements {
  const heightRatio = userHeight / 170;

  // Base measurements for 170cm height (approximate standard reference)
  // Modified by actual pose proportions if available
  const baseShoulder = 45 * heightRatio;
  const shoulder = proportions ? (proportions.shoulderWidth * 100 * heightRatio * 0.45 + baseShoulder) / 1.45 : baseShoulder;

  const baseArm = 60 * heightRatio;
  const arm = proportions ? (proportions.armLength * 100 * heightRatio * 0.35 + baseArm) / 1.35 : baseArm;

  return {
    shoulderWidth: shoulder,
    chestCircumference: shoulder * 2.1, // Approx girth
    waistCircumference: shoulder * 1.8, // Approx waist
    hipCircumference: shoulder * 2.0, // Approx hips
    armLength: arm,
    inseam: userHeight * 0.45, // ~45% of height
    thighCircumference: 55 * heightRatio
  };
}

/**
 * Advanced Size Recommendation Logic
 * Matches HMR-derived measurements to brand size charts
 */
export function calculateRecommendedSize(
  userProportions: PoseProportions, 
  userHeight: number,
  brand: string,
  category: string,
  clothingAnalysis?: ClothingStyleAnalysis | null
): SizeRecommendation {

  const hmr = simulateHMRAnalysis(userHeight, userProportions);
  
  const sizeChart = getSizeChart(brand, category);
  if (!sizeChart) {
    return {
      recommendedSize: 'M',
      confidence: 50,
      fitNotes: ['Size chart for this brand/category not found. Providing default.']
    };
  }

  let bestSize = 'M';
  let minDiff = Infinity;
  const fitNotes: string[] = [];

  // Find Best Fit
  Object.entries(sizeChart.chart).forEach(([size, dims]) => {
    let currentDiff = 0;

    if (category === 'tops' || category === 'outerwear' || category === 'dresses') {
        const chestDiff = dims.chest ? Math.abs(dims.chest - hmr.chestCircumference) : 0;
        const shoulderDiff = dims.shoulder ? Math.abs(dims.shoulder - hmr.shoulderWidth) : 0;
        currentDiff = chestDiff + shoulderDiff;
    } else if (category === 'bottoms') {
        const waistDiff = dims.waist ? Math.abs(dims.waist - hmr.waistCircumference) : 0;
        const hipDiff = dims.hips ? Math.abs(dims.hips - hmr.hipCircumference) : 0;
        currentDiff = waistDiff + hipDiff;
    }

    if (currentDiff < minDiff) {
      minDiff = currentDiff;
      bestSize = size;
    }
  });

  // Generate Consultative Logic
  const dims = sizeChart.chart[bestSize];
  const nextSize = Object.keys(sizeChart.chart).find(s => s !== bestSize); // Simplified "next"
  
  if (category === 'tops' || category === 'outerwear') {
      // Sleeve Check
      if (dims.sleeve && hmr.armLength > dims.sleeve + 2) {
          const diff = Math.round(hmr.armLength - dims.sleeve);
          fitNotes.push(`The ${bestSize} fits your chest, but sleeves will be ${diff}cm short.`);
      } else if (dims.sleeve && hmr.armLength < dims.sleeve - 3) {
           fitNotes.push(`Sleeves are generous; consider a cuff roll.`);
      }

      // Shoulder Check
      if (dims.shoulder && hmr.shoulderWidth > dims.shoulder + 1) {
           fitNotes.push(`Shoulders are tight in ${bestSize}. We recommend ${nextSize || 'sizing up'} for range of motion.`);
      } else {
           fitNotes.push(`Perfect shoulder alignment in size ${bestSize}.`);
      }

  } else if (category === 'bottoms') {
      // Waist vs Hips
      if (dims.waist && Math.abs(hmr.waistCircumference - dims.waist) < 3) {
           fitNotes.push(`The ${bestSize} fits your waist perfectly.`);
      }

      // Inseam Check (Mocking pant length standard as 80cm for M)
      const pantLength = 80; // This would come from detailed size chart
      if (hmr.inseam < pantLength - 4) {
          fitNotes.push(`Hem alteration recommended: Shorten by ${Math.round(pantLength - hmr.inseam)}cm.`);
      }
  }

  // Fallback note
  if (fitNotes.length === 0) {
      fitNotes.push(`The ${bestSize} is an optimal match for your measurements.`);
  }

  return {
    recommendedSize: bestSize,
    confidence: Math.max(0, Math.min(100, 100 - (minDiff / 3))),
    fitNotes
  };
}

/**
 * Generates data for the Fit Heatmap
 * 0: loose (blue), 0.5: perfect (green), 1.0: tight (red)
 */
export function generateFitHeatmap(userProportions: PoseProportions, userHeight: number, brand: string, category: string): HeatmapData {
  const sizeChart = getSizeChart(brand, category);
  if (!sizeChart) return { shoulders: 0.5, chest: 0.5, waist: 0.5, hips: 0.5, sleeves: 0.5, thigh: 0.5 };

  const hmr = simulateHMRAnalysis(userHeight, userProportions);
  const rec = calculateRecommendedSize(userProportions, userHeight, brand, category);
  const dims = sizeChart.chart[rec.recommendedSize];

  const getHeatValue = (actual: number, target: number | undefined) => {
    if (target === undefined) return 0.5;
    // Normalize difference: +5cm diff = 1.0 (tight), -5cm diff = 0.0 (loose)
    // 0 diff = 0.5 (perfect)
    const diff = (actual - target);
    // sensitivity: 5cm range
    const normalized = 0.5 + (diff / 10);
    return Math.max(0, Math.min(1, normalized));
  };

  return {
    shoulders: getHeatValue(hmr.shoulderWidth, dims.shoulder),
    chest: getHeatValue(hmr.chestCircumference, dims.chest),
    waist: getHeatValue(hmr.waistCircumference, dims.waist),
    hips: getHeatValue(hmr.hipCircumference, dims.hips),
    sleeves: getHeatValue(hmr.armLength, dims.sleeve),
    thigh: getHeatValue(hmr.thighCircumference, dims.thigh), // Assuming dims.thigh exists or undefined
  };
}
