export type Material = 'Silk' | 'Denim' | 'Wool' | 'Leather' | 'Cashmere';

export interface Accessory {
  id: string;
  name: string;
  type: 'Bag' | 'Ring' | 'Necklace' | 'Scarf' | 'Hat';
  material: Material;
  weight: number;
  aesthetic: 'High-End Luxury' | 'K-Fashion Leaders';
  price: number;
}

export interface Brand {
  id: string;
  name: string;
  category: 'High-End Luxury' | 'K-Fashion Leaders';
  accessories: Accessory[];
}

export const brandLibrary: Brand[] = [
  {
    id: 'luxury_01',
    name: 'Gucci',
    category: 'High-End Luxury',
    accessories: [
      { id: 'a1', name: 'Heavy Gold Chain', type: 'Necklace', material: 'Leather', weight: 500, aesthetic: 'High-End Luxury', price: 12500 }
    ]
  }
];

export function calculateMaterialInteraction(accessoryWeight: number, garmentMaterial: Material) {
  if (garmentMaterial === 'Silk' && accessoryWeight > 300) {
    return 'Heavy sagging on delicate fabric';
  } else if (garmentMaterial === 'Denim') {
    return 'Stiff support, minimal deformation';
  }
  return 'Standard draping';
}
