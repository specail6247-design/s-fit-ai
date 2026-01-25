
export type FabricType = 'silk' | 'denim' | 'wool' | 'cotton' | 'leather' | 'velvet' | 'sequin';

export interface FabricMaterialConfig {
  roughness: number;
  metalness: number;
  displacementScale: number;
  normalScale: number;
  sheen?: number;
  sheenRoughness?: number;
  sheenColor?: string;
  clearcoat?: number;
  clearcoatRoughness?: number;
}

export interface LightingConfig {
  keyIntensity: number;
  fillIntensity: number;
  rimIntensity: number;
  ambientIntensity: number;
  keyPosition: [number, number, number];
  keyColor: string;
}

export interface MasterpieceConfig {
  fabric: FabricType;
  material: FabricMaterialConfig;
  lighting: LightingConfig;
}

// Default Configurations
export const FABRIC_PRESETS: Record<FabricType, FabricMaterialConfig> = {
  silk: {
    roughness: 0.2,
    metalness: 0.3,
    displacementScale: 0.015,
    normalScale: 0.5,
    sheen: 0.5,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1
  },
  denim: {
    roughness: 0.8,
    metalness: 0.0,
    displacementScale: 0.04,
    normalScale: 1.2,
    sheen: 0.0
  },
  wool: {
    roughness: 0.9,
    metalness: 0.0,
    displacementScale: 0.05,
    normalScale: 0.8,
    sheen: 0.5
  },
  cotton: {
    roughness: 0.7,
    metalness: 0.0,
    displacementScale: 0.02,
    normalScale: 0.5
  },
  leather: {
    roughness: 0.4,
    metalness: 0.2,
    displacementScale: 0.02,
    normalScale: 0.8,
    clearcoat: 0.5,
    clearcoatRoughness: 0.4
  },
  velvet: {
    roughness: 0.8,
    metalness: 0.1,
    displacementScale: 0.03,
    normalScale: 0.6,
    sheen: 1.0,
    sheenRoughness: 0.5,
    sheenColor: '#eeeeee'
  },
  sequin: {
    roughness: 0.1,
    metalness: 0.8,
    displacementScale: 0.05,
    normalScale: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  }
};

export type EnvironmentType = 'office' | 'romantic' | 'club' | 'rainy';

export interface EnvironmentConfig {
  preset: 'city' | 'sunset' | 'night' | 'park' | 'studio' | 'apartment' | 'forest' | 'lobby' | 'warehouse' | 'dawn';
  lighting?: Partial<LightingConfig>;
  windFactor: number;
  wetness: boolean;
}
