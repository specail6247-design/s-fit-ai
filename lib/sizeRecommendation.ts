import { getSizeChart } from '@/data/sizeCharts';
import type { PoseProportions } from '@/lib/mediapipe';
import type { ClothingStyleAnalysis } from '@/lib/visionService';

export interface BodyMeasurements {
  shoulderWidth: number; // cm
  chestCircumference: number; // cm
  waistCircumference: number; // cm
  hipCircumference: number; // cm
  armLength: number; // cm
  legLength: number; // cm
}

export interface SizeRecommendation {
  recommendedSize: string;
  confidence: number;
  fitNotes: string[];
  estimatedMeasurements: BodyMeasurements;
}

/**
 * Calculates estimated body measurements in CM based on MediaPipe proportions and user height.
 */
export function calculateBodyMeasurements(
  proportions: PoseProportions,
  userHeightCm: number
): BodyMeasurements {
  // MediaPipe "overallHeight" is (torso + leg).
  // Typically, head height is ~1/7.5 of total height.
  // Shoulder to Ankle is approx 80-85% of total height.
  // We use the proportion of (torso + leg) in normalized space vs expected body fraction.

  // normalizedHeight = torsoHeight + legLength (from mediapipe.ts)
  // We assume this covers the body from Shoulder Midpoint to Ankle Midpoint.
  const normalizedBodyHeight = proportions.torsoHeight + proportions.legLength;

  // Avoid division by zero
  if (normalizedBodyHeight < 0.001) {
    return {
      shoulderWidth: 0,
      chestCircumference: 0,
      waistCircumference: 0,
      hipCircumference: 0,
      armLength: 0,
      legLength: 0,
    };
  }

  // Scale factor: How many cm does 1 unit of normalized distance represent?
  // We estimate that the measured normalized path (shoulder to ankle) is ~82% of the user's total height.
  const effectiveHeightCm = userHeightCm * 0.82;
  const cmPerUnit = effectiveHeightCm / normalizedBodyHeight;

  // Linear measurements in cm
  const shoulderWidthLinear = proportions.shoulderWidth * cmPerUnit;
  const hipWidthLinear = proportions.hipWidth * cmPerUnit;
  const legLengthCm = proportions.legLength * cmPerUnit;

  // Circumference estimations (Heuristics)
  // Chest: Roughly 2.2x to 2.5x shoulder width depending on build.
  // We'll use 2.3 as a baseline.
  const chestCircumference = shoulderWidthLinear * 2.3;

  // Waist: Usually smaller than chest. We don't have direct waist landmarks.
  // We can estimate it relative to hips and shoulders.
  // For 'rectangle' shape (default assumption if unknown), waist is ~0.85-0.9 of hips.
  const waistCircumference = hipWidthLinear * 2.0 * 0.9;

  // Hips: Hip width is linear. Circumference is roughly 2 * width * depth_factor.
  // Depth factor ~1.2
  const hipCircumference = hipWidthLinear * 2.4;

  // Arm Length: Estimated from height if not available, or we could add arm landmarks to PoseProportions.
  // For now, standard anthropometry: Arm span ~ Height. Arm length (shoulder to wrist) ~ 0.35 * Height.
  const armLength = userHeightCm * 0.35;

  return {
    shoulderWidth: shoulderWidthLinear,
    chestCircumference,
    waistCircumference,
    hipCircumference,
    armLength,
    legLength: legLengthCm,
  };
}

/**
 * Advanced Size Recommendation Logic
 * Matches landmark-derived measurements to brand size charts
 */
export function calculateRecommendedSize(
  userProportions: PoseProportions,
  userHeight: number,
  brand: string,
  category: string,
  clothingAnalysis?: ClothingStyleAnalysis | null
): SizeRecommendation {

  const measurements = calculateBodyMeasurements(userProportions, userHeight);

  const sizeChart = getSizeChart(brand, category);
  if (!sizeChart) {
    return {
      recommendedSize: 'M',
      confidence: 50,
      fitNotes: ['Size chart for this brand/category not found. Providing default.'],
      estimatedMeasurements: measurements
    };
  }

  // Adjustments based on clothing analysis (material, fit type)
  let targetChest = measurements.chestCircumference;
  const targetShoulder = measurements.shoulderWidth;

  // Phase 3: Material Stretch awareness
  if (clothingAnalysis?.stretchFactor) {
    // If stretch is high (e.g. 8), the garment can stretch to fit a larger body.
    // So we can match a slightly smaller garment size to the body.
    // We compare Body Measurements vs Garment Dimensions.
    // If garment has stretch, effective garment dimension is larger.
    // Equivalently, we can "shrink" the target body measurement for lookup.
    const stretchBuffer = (clothingAnalysis.stretchFactor - 5) * 0.02; // max ~10% adjustment
    targetChest *= (1 - stretchBuffer);
  }

  // Oversized Fit awareness
  if (clothingAnalysis?.fitType === 'oversized') {
    // If item is oversized, the user might want to size down for a regular fit,
    // OR the size chart already accounts for it.
    // Usually size charts show BODY measurements, not garment measurements.
    // If the chart shows GARMENT measurements (common in some detailed charts), we'd need to know.
    // Assuming sizeChart contains BODY measurements appropriate for that size:
    // We match body to body.
  }

  let bestSize = 'M';
  let minDiff = Infinity;
  const fitNotes: string[] = [];

  Object.entries(sizeChart.chart).forEach(([size, dims]) => {
    // Weighted difference calculation
    // Chest is usually most critical for tops.
    // Hips/Waist for bottoms.

    let diff = 0;

    if (category === 'tops' || category === 'outerwear' || category === 'dresses') {
        const chestDiff = dims.chest ? Math.abs(dims.chest - targetChest) : 0;
        const shoulderDiff = dims.shoulder ? Math.abs(dims.shoulder - targetShoulder) : 0;
        diff = chestDiff * 0.7 + shoulderDiff * 0.3; // Weight chest more
    } else if (category === 'bottoms') {
        const hipDiff = dims.hips ? Math.abs(dims.hips - measurements.hipCircumference) : 0;
        const waistDiff = dims.waist ? Math.abs(dims.waist - measurements.waistCircumference) : 0;

        if (dims.hips && dims.waist) {
            diff = hipDiff * 0.6 + waistDiff * 0.4;
        } else if (dims.hips) {
            diff = hipDiff;
        } else if (dims.waist) {
            diff = waistDiff;
        } else {
            // Fallback if no hip/waist data
            diff = dims.chest ? Math.abs(dims.chest - targetChest) : 0; 
        }
    }

    if (diff < minDiff) {
      minDiff = diff;
      bestSize = size;
    }
  });

  // Calculate Confidence Score
  // minDiff is in cm. If minDiff is 0, confidence is 100.
  // If minDiff is 10cm, confidence drops.
  const confidence = Math.max(0, Math.min(100, 100 - (minDiff * 2)));

  // Generate dynamic notes based on the BEST size
  const selectedDims = sizeChart.chart[bestSize];

  if (category === 'tops' || category === 'outerwear') {
      if (selectedDims.shoulder && measurements.shoulderWidth > selectedDims.shoulder) {
        fitNotes.push(`Shoulders might be slightly snug.`);
      } else if (selectedDims.shoulder && measurements.shoulderWidth < selectedDims.shoulder - 4) {
        fitNotes.push(`Relaxed drop-shoulder look.`);
      } else if (selectedDims.shoulder) {
        fitNotes.push(`Perfect shoulder alignment.`);
      }

      if (selectedDims.chest && measurements.chestCircumference > selectedDims.chest) {
         fitNotes.push(`Form-fitting around the chest.`);
      } else if (selectedDims.chest) {
         fitNotes.push(`Comfortable room in the chest.`);
      }
  } else if (category === 'bottoms') {
       if (selectedDims.hips && measurements.hipCircumference > selectedDims.hips) {
           fitNotes.push(`Tight fit around the hips.`);
       } else if (selectedDims.hips) {
           fitNotes.push(`Comfortable hip fit.`);
       }
  }

  return {
    recommendedSize: bestSize,
    confidence,
    fitNotes: fitNotes.length > 0 ? fitNotes : ['A great overall match for your proportions.'],
    estimatedMeasurements: measurements
  };
}
