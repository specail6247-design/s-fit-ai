// S_FIT AI - Brand Size Charts (Dimensions in cm)

export interface SizeDimensions {
  chest: number;
  shoulder: number;
  length: number;
  waist?: number;
  hips?: number;
  sleeve_length?: number; // Center back to wrist or shoulder seam to wrist depending on brand context, standardizing to Shoulder Seam to Wrist here.
  thigh?: number;
  inseam?: number;
  neck?: number;
}

export interface BrandSizeChart {
  brand: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'dresses';
  chart: Record<string, SizeDimensions>;
}

export const brandSizeCharts: BrandSizeChart[] = [
  {
    brand: 'ZARA',
    category: 'tops',
    chart: {
      'XS': { chest: 88, shoulder: 42, length: 68, sleeve_length: 60, neck: 37, waist: 78 },
      'S': { chest: 96, shoulder: 44, length: 70, sleeve_length: 61, neck: 38, waist: 82 },
      'M': { chest: 104, shoulder: 46, length: 72, sleeve_length: 62, neck: 39, waist: 86 },
      'L': { chest: 112, shoulder: 48, length: 74, sleeve_length: 63, neck: 40, waist: 90 },
      'XL': { chest: 120, shoulder: 50, length: 76, sleeve_length: 64, neck: 41, waist: 94 },
    }
  },
  {
    brand: 'ZARA',
    category: 'bottoms',
    chart: {
      'XS': { waist: 72, hips: 90, length: 100, inseam: 78, thigh: 54, chest: 0, shoulder: 0 },
      'S': { waist: 76, hips: 94, length: 102, inseam: 79, thigh: 56, chest: 0, shoulder: 0 },
      'M': { waist: 80, hips: 98, length: 104, inseam: 80, thigh: 58, chest: 0, shoulder: 0 },
      'L': { waist: 84, hips: 102, length: 106, inseam: 81, thigh: 60, chest: 0, shoulder: 0 },
      'XL': { waist: 88, hips: 106, length: 108, inseam: 82, thigh: 62, chest: 0, shoulder: 0 },
    }
  },
  {
    brand: 'UNIQLO',
    category: 'tops',
    chart: {
      'XS': { chest: 90, shoulder: 41, length: 66, sleeve_length: 58, neck: 36, waist: 80 },
      'S': { chest: 98, shoulder: 43, length: 68, sleeve_length: 59.5, neck: 37, waist: 84 },
      'M': { chest: 106, shoulder: 45, length: 70, sleeve_length: 61, neck: 38, waist: 88 },
      'L': { chest: 114, shoulder: 47, length: 72, sleeve_length: 62.5, neck: 40, waist: 94 },
      'XL': { chest: 122, shoulder: 49, length: 74, sleeve_length: 64, neck: 42, waist: 100 },
      'XXL': { chest: 130, shoulder: 51, length: 76, sleeve_length: 65, neck: 44, waist: 108 },
    }
  },
  {
    brand: 'UNIQLO',
    category: 'bottoms',
    chart: {
      'XS': { waist: 68, hips: 88, length: 98, inseam: 74, thigh: 52, chest: 0, shoulder: 0 },
      'S': { waist: 72, hips: 92, length: 100, inseam: 75, thigh: 54, chest: 0, shoulder: 0 },
      'M': { waist: 76, hips: 96, length: 102, inseam: 76, thigh: 56, chest: 0, shoulder: 0 },
      'L': { waist: 82, hips: 102, length: 104, inseam: 77, thigh: 59, chest: 0, shoulder: 0 },
      'XL': { waist: 88, hips: 108, length: 106, inseam: 78, thigh: 62, chest: 0, shoulder: 0 },
    }
  },
  {
    brand: 'Gucci',
    category: 'tops',
    chart: {
      'IT 38': { chest: 84, shoulder: 38, length: 62, sleeve_length: 58, waist: 74 },
      'IT 40': { chest: 88, shoulder: 40, length: 64, sleeve_length: 59, waist: 78 },
      'IT 42': { chest: 92, shoulder: 42, length: 66, sleeve_length: 60, waist: 82 },
      'IT 44': { chest: 96, shoulder: 44, length: 68, sleeve_length: 61, waist: 86 },
      'IT 46': { chest: 100, shoulder: 46, length: 70, sleeve_length: 62, waist: 90 },
    }
  }
];

export const getSizeChart = (brand: string, category: string): BrandSizeChart | undefined => {
  return brandSizeCharts.find(c => 
    c.brand.toLowerCase() === brand.toLowerCase() && 
    c.category === category
  );
};
