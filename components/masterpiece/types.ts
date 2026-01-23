
export type FabricType = 'silk' | 'denim' | 'wool' | 'cotton' | 'leather';

export interface FabricMaterialConfig {
  roughness: number;
  metalness: number;
  displacementScale: number;
  normalScale: number;
  sheen?: number;
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
    metalness: 0.1,
    displacementScale: 0.015,
    normalScale: 0.5,
    sheen: 1.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1
  },
  denim: {
    roughness: 0.8,
    metalness: 0.0,
    displacementScale: 0.04,
    normalScale: 1.2, // Strong weave
    sheen: 0.0
  },
  wool: {
    roughness: 0.9,
    metalness: 0.0,
    displacementScale: 0.05, // Fluffy
    normalScale: 0.8,
    sheen: 0.5 // Soft fuzz light interaction
  },
  cotton: {
    roughness: 0.7,
    metalness: 0.0,
    displacementScale: 0.02,
    normalScale: 0.5
  },
  leather: {
    roughness: 0.4,
    metalness: 0.0,
    displacementScale: 0.02,
    normalScale: 0.8,
    clearcoat: 0.5,
    clearcoatRoughness: 0.4
  }
};
