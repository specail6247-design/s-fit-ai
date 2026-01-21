// S_FIT AI - Brand Size Charts (Dimensions in cm)

export interface SizeDimensions {
  chest: number;
  shoulder: number;
  length: number;
  waist?: number;
  hips?: number;
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
      'XS': { chest: 88, shoulder: 42, length: 68 },
      'S': { chest: 96, shoulder: 44, length: 70 },
      'M': { chest: 104, shoulder: 46, length: 72 },
      'L': { chest: 112, shoulder: 48, length: 74 },
      'XL': { chest: 120, shoulder: 50, length: 76 },
    }
  },
  {
    brand: 'UNIQLO',
    category: 'tops',
    chart: {
      'XS': { chest: 90, shoulder: 41, length: 66 },
      'S': { chest: 98, shoulder: 43, length: 68 },
      'M': { chest: 106, shoulder: 45, length: 70 },
      'L': { chest: 114, shoulder: 47, length: 72 },
      'XL': { chest: 122, shoulder: 49, length: 74 },
      'XXL': { chest: 130, shoulder: 51, length: 76 },
    }
  },
  {
    brand: 'Gucci',
    category: 'tops',
    chart: {
      'IT 38': { chest: 84, shoulder: 38, length: 62 },
      'IT 40': { chest: 88, shoulder: 40, length: 64 },
      'IT 42': { chest: 92, shoulder: 42, length: 66 },
      'IT 44': { chest: 96, shoulder: 44, length: 68 },
      'IT 46': { chest: 100, shoulder: 46, length: 70 },
    }
  }
];

export const getSizeChart = (brand: string, category: string): BrandSizeChart | undefined => {
  return brandSizeCharts.find(c => 
    c.brand.toLowerCase() === brand.toLowerCase() && 
    c.category === category
  );
};
