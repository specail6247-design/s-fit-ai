import * as THREE from 'three';

export type LuxuryFabricType = 'silk' | 'velvet' | 'leather' | 'denim' | 'cotton' | 'sequin';

interface MaterialPreset {
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenRoughness?: number;
  sheenColor?: THREE.Color;
  transmission?: number; // For sheer fabrics
  bumpScale?: number;
}

export const LUXURY_PRESETS: Record<LuxuryFabricType, MaterialPreset> = {
  silk: {
    roughness: 0.2,
    metalness: 0.3,
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffffff),
  },
  velvet: {
    roughness: 0.8,
    metalness: 0.1,
    sheen: 1.0,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color(0xeeeeee),
  },
  leather: {
    roughness: 0.4,
    metalness: 0.2,
    clearcoat: 0.5,
    clearcoatRoughness: 0.4,
    bumpScale: 0.02,
  },
  denim: {
    roughness: 0.8,
    metalness: 0.0,
    bumpScale: 0.05,
  },
  cotton: {
    roughness: 0.9,
    metalness: 0.0,
    sheen: 0.0,
  },
  sequin: {
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }
};

export const createLuxuryMaterial = (type: LuxuryFabricType, color: string | THREE.Color, texture?: THREE.Texture): THREE.MeshPhysicalMaterial => {
  const preset = LUXURY_PRESETS[type] || LUXURY_PRESETS.cotton;
  
  const material = new THREE.MeshPhysicalMaterial({
    color: color,
    map: texture || null,
    ...preset
  });

  if (type === 'velvet') {
    // Velvet typically needs specific sheen handling which MeshPhysicalMaterial supports well
  }

  return material;
};
