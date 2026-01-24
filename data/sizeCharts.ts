// S_FIT AI - Brand Size Charts (Dimensions in cm)

export interface SizeDimensions {
  chest?: number;
  shoulder?: number;
  length?: number;
  waist?: number;
  hips?: number;
  sleeve?: number;
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
      'XS': { chest: 88, shoulder: 42, length: 68, waist: 72, sleeve: 60 },
      'S': { chest: 96, shoulder: 44, length: 70, waist: 80, sleeve: 62 },
      'M': { chest: 104, shoulder: 46, length: 72, waist: 88, sleeve: 64 },
      'L': { chest: 112, shoulder: 48, length: 74, waist: 96, sleeve: 66 },
      'XL': { chest: 120, shoulder: 50, length: 76, waist: 104, sleeve: 68 },
    }
  },
  {
    brand: 'UNIQLO',
    category: 'tops',
    chart: {
      'XS': { chest: 90, shoulder: 41, length: 66, waist: 74, sleeve: 59 },
      'S': { chest: 98, shoulder: 43, length: 68, waist: 82, sleeve: 61 },
      'M': { chest: 106, shoulder: 45, length: 70, waist: 90, sleeve: 63 },
      'L': { chest: 114, shoulder: 47, length: 72, waist: 98, sleeve: 65 },
      'XL': { chest: 122, shoulder: 49, length: 74, waist: 106, sleeve: 67 },
      'XXL': { chest: 130, shoulder: 51, length: 76, waist: 114, sleeve: 69 },
    }
  },
  {
    brand: 'Gucci',
    category: 'tops',
    chart: {
      'IT 38': { chest: 84, shoulder: 38, length: 62, waist: 68, sleeve: 58 },
      'IT 40': { chest: 88, shoulder: 40, length: 64, waist: 72, sleeve: 59 },
      'IT 42': { chest: 92, shoulder: 42, length: 66, waist: 76, sleeve: 60 },
      'IT 44': { chest: 96, shoulder: 44, length: 68, waist: 80, sleeve: 61 },
      'IT 46': { chest: 100, shoulder: 46, length: 70, waist: 84, sleeve: 62 },
    }
  }
];

export const getSizeChart = (brand: string, category: string): BrandSizeChart | undefined => {
  return brandSizeCharts.find(c => 
    c.brand.toLowerCase() === brand.toLowerCase() && 
    c.category === category
  );
};
