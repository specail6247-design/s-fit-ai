export interface MaterialProperties {
  name: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  transmission?: number;
  thickness: number;
  color: string;
  // Physics-related properties
  stretchFactor: number; // 0-1
  drapingFactor: number; // 0-1
  stiffness: number; // 0-1
}

export type MaterialType = 'cotton' | 'silk' | 'denim' | 'leather' | 'knit' | 'linen' | 'polyester';

export const materialLibrary: Record<MaterialType, MaterialProperties> = {
  cotton: {
    name: 'Cotton',
    roughness: 0.8,
    metalness: 0,
    thickness: 1,
    color: '#ffffff',
    stretchFactor: 0.3,
    drapingFactor: 0.4,
    stiffness: 0.5,
  },
  silk: {
    name: 'Silk',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.5,
    thickness: 0.2,
    color: '#f0f0f0',
    stretchFactor: 0.1,
    drapingFactor: 0.9,
    stiffness: 0.1,
  },
  denim: {
    name: 'Denim',
    roughness: 0.9,
    metalness: 0,
    thickness: 1.5,
    color: '#3b5998',
    stretchFactor: 0.1,
    drapingFactor: 0.2,
    stiffness: 0.8,
  },
  leather: {
    name: 'Leather',
    roughness: 0.3,
    metalness: 0.2,
    thickness: 2,
    color: '#3d2b1f',
    stretchFactor: 0.05,
    drapingFactor: 0.3,
    stiffness: 0.9,
  },
  knit: {
    name: 'Knit',
    roughness: 0.85,
    metalness: 0,
    thickness: 2.5,
    color: '#e0e0e0',
    stretchFactor: 0.6,
    drapingFactor: 0.6,
    stiffness: 0.4,
  },
  linen: {
    name: 'Linen',
    roughness: 0.7,
    metalness: 0,
    thickness: 0.8,
    color: '#faf0e6',
    stretchFactor: 0.1,
    drapingFactor: 0.5,
    stiffness: 0.6,
  },
  polyester: {
    name: 'Polyester',
    roughness: 0.4,
    metalness: 0.1,
    thickness: 0.5,
    color: '#f5f5f5',
    stretchFactor: 0.4,
    drapingFactor: 0.7,
    stiffness: 0.3,
  },
};

export const getMaterialProps = (type: MaterialType): MaterialProperties => {
  return materialLibrary[type] || materialLibrary.cotton;
};
