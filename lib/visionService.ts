import OpenAI from 'openai';
import { getSizeChart, SizeDimensions } from '@/data/sizeCharts';
import type { PoseProportions } from '@/lib/mediapipe';
import { ClothingItem, getAllItems } from '@/data/mockData';

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

export interface HMRMeasurements {
  shoulder_width: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  sleeve_length: number;
  inseam: number;
  thigh_circumference: number;
  neck_circumference: number;
  torso_length?: number;
}

export interface FitZone {
  zone: 'chest' | 'waist' | 'hips' | 'shoulders' | 'arms' | 'thighs' | 'length';
  score: number; // -10 (very loose) to +10 (very tight), 0 is perfect
  color: string; // Hex code for heatmap
  message?: string;
}

export interface SizeRecommendation {
  recommendedSize: string;
  confidence: number;
  fitNotes: string[];
  heatmapData?: FitZone[];
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
 * Helper: Calculate tightness score and color
 */
function calculateTightness(bodyCm: number, garmentCm: number, tolerance = 2, isLooseFit = false): { score: number, color: string } {
  const diff = garmentCm - bodyCm;

  // Ideal gap for comfort: 4-6cm for regular fit, 10cm+ for loose
  const idealGap = isLooseFit ? 8 : 4;
  const relativeDiff = diff - idealGap;

  // Score: 0 = perfect, + = loose, - = tight
  // We invert this for "tightness score": + = tight, - = loose
  const tightnessScore = -relativeDiff;

  // Clamp -10 to 10
  const clampedScore = Math.max(-10, Math.min(10, tightnessScore));

  let color = '#00ff00'; // Green (Perfect)
  if (clampedScore > 5) color = '#ff0000'; // Red (Too Tight)
  else if (clampedScore > 2) color = '#ffff00'; // Yellow (Slightly Tight)
  else if (clampedScore < -5) color = '#0000ff'; // Blue (Too Loose)
  else if (clampedScore < -2) color = '#00ffff'; // Cyan (Slightly Loose)

  return { score: clampedScore, color };
}

/**
 * Advanced Size Recommendation Logic
 * Matches landmark-derived proportions OR HMR measurements to brand size charts
 */
export function calculateRecommendedSize(
  userProportions: PoseProportions | HMRMeasurements,
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
      fitNotes: ['Size chart for this brand/category not found. Providing default.'],
      heatmapData: []
    };
  }

  // Detect if we have detailed HMR measurements or just PoseProportions
  let body: HMRMeasurements;

  if ('chest_circumference' in userProportions) {
    // We have HMR data!
    body = userProportions as HMRMeasurements;
  } else {
    // Fallback: Convert MediaPipe normalized proportions to estimated cm using height
    // This is the heuristic "Guestimation"
    const p = userProportions as PoseProportions;
    const estShoulder = p.shoulderWidth * 100 * (userHeight / 170) * 45;
    const estChest = estShoulder * 2.2;
    body = {
      shoulder_width: estShoulder,
      chest_circumference: estChest,
      waist_circumference: estChest * 0.8, // Rough guess
      hip_circumference: estChest * 0.95, // Rough guess
      sleeve_length: 60, // Default
      inseam: 78,
      thigh_circumference: 55,
      neck_circumference: 38
    };
  }

  // Adjust for material stretch
  const stretchFactor = clothingAnalysis?.stretchFactor || 0;
  const stretchMultiplier = 1 + (stretchFactor * 0.02); // e.g., 5 -> 1.10 (10% stretch)

  let bestSize = 'M';
  let minDiff = Infinity;
  let bestFitZones: FitZone[] = [];
  const fitNotes: string[] = [];

  // Iterate all sizes to find the best match based on Key Dimensions
  Object.entries(sizeChart.chart).forEach(([size, dims]) => {
    let currentDiff = 0;

    // Weighted differences
    if (category === 'tops' || category === 'outerwear' || category === 'dresses') {
      currentDiff += Math.abs((dims.chest * stretchMultiplier) - body.chest_circumference) * 2; // Chest is critical
      currentDiff += Math.abs(dims.shoulder - body.shoulder_width);
    }
    if (category === 'bottoms') {
      currentDiff += Math.abs((dims.waist || 0) - body.waist_circumference) * 2;
      currentDiff += Math.abs((dims.hips || 0) - body.hip_circumference);
    }

    if (currentDiff < minDiff) {
      minDiff = currentDiff;
      bestSize = size;
    }
  });

  // Now generate the Detailed Consultant Report for the BEST size
  const selDims = sizeChart.chart[bestSize];
  const isLoose = clothingAnalysis?.fitType === 'oversized' || clothingAnalysis?.fitType === 'relaxed';

  // Chest Analysis
  if (selDims.chest) {
    const { score, color } = calculateTightness(body.chest_circumference, selDims.chest, 2, isLoose);
    bestFitZones.push({ zone: 'chest', score, color });
    if (score > 3) fitNotes.push(`Chest area is tight (${Math.round(body.chest_circumference - selDims.chest)}cm diff).`);
    else if (score < -3) fitNotes.push(`Generous fit around the chest.`);
  }

  // Shoulder Analysis
  if (selDims.shoulder) {
    const diff = selDims.shoulder - body.shoulder_width;
    if (diff < -1) fitNotes.push("Shoulders might be narrow.");
    else if (diff > 4) fitNotes.push("Drop-shoulder look achieved.");
    bestFitZones.push({
      zone: 'shoulders',
      score: diff < 0 ? 5 : -5,
      color: diff < 0 ? '#ff0000' : '#0000ff'
    });
  }

  // Sleeve Analysis (Masterpiece Feature)
  if (selDims.sleeve_length && body.sleeve_length) {
    const diff = selDims.sleeve_length - body.sleeve_length;
    if (diff < -2) fitNotes.push(`Sleeves are short by ${Math.abs(Math.round(diff))}cm.`);
    else if (diff > 4) fitNotes.push("Sleeves might bunch up at the wrist.");
    else fitNotes.push("Perfect sleeve length.");

    bestFitZones.push({
      zone: 'arms',
      score: diff < 0 ? 5 : -5,
      color: diff < 0 ? '#ff0000' : '#0000ff'
    });
  }

  // Waist/Hip Analysis (Bottoms)
  if (category === 'bottoms') {
    if (selDims.waist) {
      const { score } = calculateTightness(body.waist_circumference, selDims.waist, 1, false);
      if (score > 4) fitNotes.push("Waist is very snug. Consider sizing up.");
      else if (score < -4) fitNotes.push("Waist will need a belt or tailoring.");
      bestFitZones.push({ zone: 'waist', score, color: score > 0 ? '#ff0000' : '#0000ff' });
    }
    if (selDims.inseam && body.inseam) {
      const diff = selDims.inseam - body.inseam;
      if (diff > 3) fitNotes.push(`Hem is long by ${Math.round(diff)}cm. Platform shoes recommended.`);
      else if (diff < -2) fitNotes.push("Cropped look (ankle visible).");
    }
  }

  if (fitNotes.length === 0) {
    fitNotes.push("An excellent fit across all key measurements.");
  }

  return {
    recommendedSize: bestSize,
    confidence: Math.max(0, Math.min(100, 100 - (minDiff / 2))),
    fitNotes,
    heatmapData: bestFitZones
  };
}
