// S_FIT AI - Type Definitions

export interface ClothingItem {
  id: string;
  name: string;
  brand: string; // 'ZARA' | 'Gucci' | 'Uniqlo' | 'H&M' | 'COS' | 'GAP' | 'Chanel' | 'Supreme' | 'Tiffany' | 'Loro Piana' | 'Hermes';
  category: 'tops' | 'bottoms' | 'outerwear' | 'dresses' | 'accessories';
  subCategory?: 'bag' | 'hat' | 'jewelry' | 'scarf' | 'glasses';
  zIndex?: number;
  price: number;
  currency: string;
  imageUrl: string;
  textureUrl: string;
  isLuxury: boolean;
  sizes: string[];
  colors: string[];
  description: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  isLuxury: boolean;
  tier: 'mass' | 'luxury' | 'basic';
}
