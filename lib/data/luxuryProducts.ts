import { ClothingItem } from '../../data/mockData';

export interface LuxuryBrand {
  name: string;
  logo: string;
  bannerImage: string;
  description: string;
  priceRange: { min: number; max: number };
}

class SmartImageAllocator {
  private decks: Map<string, string[]> = new Map();
  private used: Map<string, Set<string>> = new Map();

  constructor(initialDecks: { clothing: string[], accessories: string[] }) {
    this.decks.set('clothing', this.shuffle([...initialDecks.clothing]));
    this.decks.set('accessories', this.shuffle([...initialDecks.accessories]));
    this.used.set('clothing', new Set());
    this.used.set('accessories', new Set());
  }

  private shuffle(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public allocate(category: 'clothing' | 'accessories'): string {
    const deck = this.decks.get(category) || [];
    const usedSet = this.used.get(category)!;

    // Find first unused image
    const available = deck.find(img => !usedSet.has(img));

    if (available) {
      usedSet.add(available);
      return `https://images.unsplash.com/photo-${available}?auto=format&fit=crop&w=800&q=80`;
    }

    // Fallback: pick random if exhausted
    const randomId = deck[Math.floor(Math.random() * deck.length)];
    return `https://images.unsplash.com/photo-${randomId}?auto=format&fit=crop&w=800&q=80`;
  }
}

// Data Pools
const clothingImages = [
  '1553544260-f87e671974ee', '1645996830739-8fe3df27c33f', '1562151270-c7d22ceb586a', '1664868839770-ef9a76e21ab6',
  '1580478491436-fd6a937acc9e', '1603189343302-e603f7add05a', '1574015974293-817f0ebebb74', '1604284195847-88dc4b5a9faa',
  '1596993100471-c3905dafa78e', '1664076458686-3449062080ac', '1621036570283-e270d46d3901', '1629511617783-dc852a6e3768',
  '1595882669314-919b3d51f2c7', '1673758902772-f6dd74fce69a', '1645561305502-63a9ba09ab09', '1629511565591-a1d494ad6c58'
];

const accessoryImages = [
  '1738862176036-48a7a3d86891', '1590739225287-bd31519780c3', '1548036328-c9fa89d128fa', '1583623733237-4d5764a9dc82',
  '1591348278900-019a8a2a8b1d', '1584917865442-de89df76afd3', '1603009135528-7ad60fc1ffe4', '1691480288782-142b953cf664'
];

const globalAllocator = new SmartImageAllocator({
  clothing: clothingImages,
  accessories: accessoryImages
});

export const luxuryBrands: LuxuryBrand[] = [
  {
    name: 'Hermès',
    logo: 'https://placehold.co/100x100?text=Hermes',
    bannerImage: 'https://images.unsplash.com/photo-1514179974491-a7885781ed87?auto=format&fit=crop&w=1200&q=80',
    description: 'Contemporary artisans since 1837.',
    priceRange: { min: 5000, max: 50000 }
  },
  {
    name: 'Chanel',
    logo: 'https://placehold.co/100x100?text=Chanel',
    bannerImage: 'https://images.unsplash.com/photo-1641973841453-b9db2229b54c?auto=format&fit=crop&w=1200&q=80',
    description: 'To be irreplaceable, one must always be different.',
    priceRange: { min: 3000, max: 15000 }
  },
  {
    name: 'Louis Vuitton',
    logo: 'https://placehold.co/100x100?text=LV',
    bannerImage: 'https://images.unsplash.com/photo-1526743851649-2282229bac05?auto=format&fit=crop&w=1200&q=80',
    description: 'Art of Travel.',
    priceRange: { min: 2000, max: 10000 }
  },
  {
    name: 'Dior',
    logo: 'https://placehold.co/100x100?text=Dior',
    bannerImage: 'https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?auto=format&fit=crop&w=1200&q=80',
    description: 'Women, with their intuitive instinct, understood that I dreamed not only of making them more beautiful, but happier.',
    priceRange: { min: 1500, max: 8000 }
  },
  {
    name: 'Gucci',
    logo: 'https://placehold.co/100x100?text=Gucci',
    bannerImage: 'https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Influential, innovative and progressive.',
    priceRange: { min: 600, max: 5000 }
  },
  {
    name: 'Prada',
    logo: 'https://placehold.co/100x100?text=Prada',
    bannerImage: 'https://images.unsplash.com/photo-1608494604059-7971195e13e1?auto=format&fit=crop&w=1200&q=80',
    description: 'Thinking about fashion.',
    priceRange: { min: 800, max: 4000 }
  },
  {
    name: 'Saint Laurent',
    logo: 'https://placehold.co/100x100?text=YSL',
    bannerImage: 'https://images.unsplash.com/photo-1580250729659-e5cb6c5c110d?auto=format&fit=crop&w=1200&q=80',
    description: 'Fashions fade, style is eternal.',
    priceRange: { min: 700, max: 4000 }
  },
  {
    name: 'Balenciaga',
    logo: 'https://placehold.co/100x100?text=Balenciaga',
    bannerImage: 'https://images.unsplash.com/photo-1664202526047-405824c633e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Master of us all.',
    priceRange: { min: 600, max: 3000 }
  },
  {
    name: 'Fendi',
    logo: 'https://placehold.co/100x100?text=Fendi',
    bannerImage: 'https://images.unsplash.com/photo-1606132653399-36248f2e2a99?auto=format&fit=crop&w=1200&q=80',
    description: 'Italian luxury fashion house.',
    priceRange: { min: 800, max: 5000 }
  },
  {
    name: 'Burberry',
    logo: 'https://placehold.co/100x100?text=Burberry',
    bannerImage: 'https://images.unsplash.com/photo-1684407261522-48ad66a060e9?auto=format&fit=crop&w=1200&q=80',
    description: 'British luxury fashion.',
    priceRange: { min: 400, max: 3000 }
  }
];

export const LUXURY_PRODUCTS: ClothingItem[] = [];

// Generate Products
luxuryBrands.forEach((brand) => {
  // Generate 4 items per brand
  const items: Partial<ClothingItem>[] = [
    { name: `Classic ${brand.name} Coat`, category: 'outerwear', isLuxury: true },
    { name: `${brand.name} Silk Top`, category: 'tops', isLuxury: true },
    { name: `${brand.name} Tailored Trousers`, category: 'bottoms', isLuxury: true },
    { name: `${brand.name} Signature Bag`, category: 'accessories', subCategory: 'bag', isLuxury: true }
  ];

  items.forEach((item, index) => {
    const isAccessory = item.category === 'accessories';
    const imageUrl = globalAllocator.allocate(isAccessory ? 'accessories' : 'clothing');
    const price = Math.floor(Math.random() * (brand.priceRange.max - brand.priceRange.min) + brand.priceRange.min);

    LUXURY_PRODUCTS.push({
      id: `${brand.name.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
      name: item.name!,
      brand: brand.name as ClothingItem['brand'],
      category: item.category!,
      subCategory: item.subCategory,
      price: price,
      currency: 'USD',
      imageUrl: imageUrl,
      textureUrl: imageUrl,
      isLuxury: true,
      sizes: isAccessory ? ['One Size'] : ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Beige', 'White'],
      description: `Authentic ${brand.name} product. ${brand.description}`
    });
  });
});
