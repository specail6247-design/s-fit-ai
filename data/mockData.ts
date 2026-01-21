// S_FIT AI - Mock Data
// 15 items: 5 Mass Market (ZARA), 5 Luxury (Gucci), 5 Basic (Uniqlo)

export interface ClothingItem {
  id: string;
  name: string;
  brand: 'ZARA' | 'Gucci' | 'Uniqlo';
  category: 'tops' | 'bottoms' | 'outerwear' | 'dresses';
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

// Brand Data
export const brands: Brand[] = [
  {
    id: 'zara',
    name: 'ZARA',
    logo: 'https://placehold.co/100x100?text=ZARA',
    isLuxury: false,
    tier: 'mass',
  },
  {
    id: 'gucci',
    name: 'GUCCI',
    logo: 'https://placehold.co/100x100?text=GUCCI',
    isLuxury: true,
    tier: 'luxury',
  },
  {
    id: 'uniqlo',
    name: 'UNIQLO',
    logo: 'https://placehold.co/100x100?text=UNIQLO',
    isLuxury: false,
    tier: 'basic',
  },
];

// Mock Clothing Items
export const mockClothingItems: ClothingItem[] = [
  // ZARA - Mass Market (5 items)
  {
    id: 'zara-001',
    name: 'Oversized Structured Blazer',
    brand: 'ZARA',
    category: 'outerwear',
    price: 89.99,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=ZARA+Blazer',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Blazer',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Beige'],
    description: 'Relaxed fit blazer with structured shoulders',
  },
  {
    id: 'zara-002',
    name: 'High-Waisted Wide Leg Trousers',
    brand: 'ZARA',
    category: 'bottoms',
    price: 49.99,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=ZARA+Trousers',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Trousers',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Camel'],
    description: 'Elegant wide leg trousers with pleats',
  },
  {
    id: 'zara-003',
    name: 'Cropped Knit Top',
    brand: 'ZARA',
    category: 'tops',
    price: 35.99,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=ZARA+Knit',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Knit',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Black', 'Sage'],
    description: 'Minimalist cropped sweater',
  },
  {
    id: 'zara-004',
    name: 'Satin Midi Dress',
    brand: 'ZARA',
    category: 'dresses',
    price: 69.99,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=ZARA+Dress',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Dress',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Champagne', 'Black', 'Burgundy'],
    description: 'Elegant satin dress with cowl neck',
  },
  {
    id: 'zara-005',
    name: 'Leather-Effect Bomber Jacket',
    brand: 'ZARA',
    category: 'outerwear',
    price: 79.99,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=ZARA+Bomber',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Bomber',
    isLuxury: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    description: 'Faux leather bomber with ribbed trim',
  },

  // GUCCI - Luxury (5 items with isLuxury: true)
  {
    id: 'gucci-001',
    name: 'GG Jacquard Wool Blazer',
    brand: 'Gucci',
    category: 'outerwear',
    price: 2890.00,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Gucci+Blazer',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Gucci+Blazer',
    isLuxury: true,
    sizes: ['IT 44', 'IT 46', 'IT 48', 'IT 50', 'IT 52'],
    colors: ['Beige/Ebony'],
    description: 'Iconic GG pattern wool blazer with silk lining',
  },
  {
    id: 'gucci-002',
    name: 'Horsebit Silk Blouse',
    brand: 'Gucci',
    category: 'tops',
    price: 1450.00,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Gucci+Blouse',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Blouse',
    isLuxury: true,
    sizes: ['IT 38', 'IT 40', 'IT 42', 'IT 44', 'IT 46'],
    colors: ['Ivory', 'Black'],
    description: 'Pure silk blouse with signature horsebit print',
  },
  {
    id: 'gucci-003',
    name: 'Web Stripe Track Pants',
    brand: 'Gucci',
    category: 'bottoms',
    price: 980.00,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Gucci+Pants',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Pants',
    isLuxury: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy'],
    description: 'Technical jersey pants with Web stripe',
  },
  {
    id: 'gucci-004',
    name: 'Flora Print Georgette Dress',
    brand: 'Gucci',
    category: 'dresses',
    price: 3200.00,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Gucci+Dress',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Dress',
    isLuxury: true,
    sizes: ['IT 38', 'IT 40', 'IT 42', 'IT 44'],
    colors: ['Pink Flora'],
    description: 'Flowing silk georgette dress with iconic Flora print',
  },
  {
    id: 'gucci-005',
    name: 'Leather Bomber with Patches',
    brand: 'Gucci',
    category: 'outerwear',
    price: 5500.00,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Gucci+Bomber',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Bomber',
    isLuxury: true,
    sizes: ['IT 46', 'IT 48', 'IT 50', 'IT 52'],
    colors: ['Black'],
    description: 'Genuine leather bomber with embroidered patches',
  },

  // UNIQLO - Basic (5 items)
  {
    id: 'uniqlo-001',
    name: 'Ultra Light Down Jacket',
    brand: 'Uniqlo',
    category: 'outerwear',
    price: 79.90,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Uniqlo+Down',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Down',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Olive', 'Wine'],
    description: 'Lightweight, compact down jacket',
  },
  {
    id: 'uniqlo-002',
    name: 'Supima Cotton Crew Neck T-Shirt',
    brand: 'Uniqlo',
    category: 'tops',
    price: 14.90,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Uniqlo+Tee',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Tee',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    colors: ['White', 'Black', 'Gray', 'Navy', 'Olive'],
    description: 'Premium Supima cotton basic tee',
  },
  {
    id: 'uniqlo-003',
    name: 'Smart Ankle Pants',
    brand: 'Uniqlo',
    category: 'bottoms',
    price: 39.90,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Uniqlo+Pants',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Pants',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Gray', 'Beige'],
    description: 'Easy care stretch ankle pants',
  },
  {
    id: 'uniqlo-004',
    name: 'Merino Blend Sweater',
    brand: 'Uniqlo',
    category: 'tops',
    price: 49.90,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Uniqlo+Sweater',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Sweater',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Wine', 'Cream'],
    description: 'Soft merino wool blend crew neck',
  },
  {
    id: 'uniqlo-005',
    name: 'Rayon Long Sleeve Dress',
    brand: 'Uniqlo',
    category: 'dresses',
    price: 39.90,
    currency: 'USD',
    imageUrl: 'https://placehold.co/600x800?text=Uniqlo+Dress',
    textureUrl: 'https://placehold.co/600x800?text=Texture+Dress',
    isLuxury: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Olive'],
    description: 'Comfortable everyday rayon dress',
  },
];

// Helper functions
export const getItemsByBrand = (brandId: string): ClothingItem[] => {
  return mockClothingItems.filter(
    (item) => item.brand.toLowerCase() === brandId.toLowerCase()
  );
};

export const getLuxuryItems = (): ClothingItem[] => {
  return mockClothingItems.filter((item) => item.isLuxury);
};

export const getItemById = (id: string): ClothingItem | undefined => {
  return mockClothingItems.find((item) => item.id === id);
};

export const getItemsByCategory = (category: ClothingItem['category']): ClothingItem[] => {
  return mockClothingItems.filter((item) => item.category === category);
};

export const getAllItems = (): ClothingItem[] => {
  return mockClothingItems;
};
