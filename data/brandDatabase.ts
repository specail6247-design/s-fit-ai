export interface BrandAesthetic {
  id: string;
  name: string;
  tier: 'Mass' | 'Basic' | 'K-Fashion' | 'Luxury';
  styleKeywords: string[];
  colorPalette: string[];
  accessoryLayerSupport: boolean;
  materialInteractionRules: Record<string, string>;
}

export const GlobalBrandLibrary: Record<string, BrandAesthetic> = {
  'gucci': {
    id: 'gucci',
    name: 'Gucci',
    tier: 'Luxury',
    styleKeywords: ['maximalist', 'eclectic', 'vintage-inspired', 'bold'],
    colorPalette: ['#175E3F', '#D3202A', '#D3A422', '#000000'],
    accessoryLayerSupport: true,
    materialInteractionRules: {
      'heavy_necklace_on_silk': 'Creates dynamic draping and slight pulling at the neckline.',
      'leather_belt_on_wool': 'Causes bunching and distinct shadow mapping.'
    }
  },
  'chanel': {
    id: 'chanel',
    name: 'Chanel',
    tier: 'Luxury',
    styleKeywords: ['classic', 'elegant', 'tweed', 'monochrome'],
    colorPalette: ['#000000', '#FFFFFF', '#EAD5B9', '#A81C26'],
    accessoryLayerSupport: true,
    materialInteractionRules: {
      'pearls_on_tweed': 'Pearls cast soft shadows and settle into tweed texture variations.',
      'chain_bag_on_silk': 'Chain indents the fabric, high tension mapping required.'
    }
  },
  'musinsa': {
    id: 'musinsa',
    name: 'Musinsa Standard',
    tier: 'K-Fashion',
    styleKeywords: ['minimalist', 'street', 'oversized', 'utilitarian'],
    colorPalette: ['#1A1A1A', '#F5F5F5', '#4A5568', '#718096'],
    accessoryLayerSupport: true,
    materialInteractionRules: {
      'crossbody_on_oversized': 'Causes deep folds across the chest and gathers fabric.',
      'cap_on_hoodie': 'Hoodie shapes around the cap, modifying silhouette.'
    }
  }
};
