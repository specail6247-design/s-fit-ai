import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface AccessoryConfig {
  type: 'bag' | 'ring' | 'necklace' | 'scarf' | 'hat';
  modelUrl: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

interface Props {
  accessories: AccessoryConfig[];
}

export function AccessoryLayer({ accessories }: Props) {
  return (
    <group>
      {accessories.map((acc, index) => (
        <AccessoryItem key={index} config={acc} />
      ))}
    </group>
  );
}

function AccessoryItem({ config }: { config: AccessoryConfig }) {
  // Try to load model, fallback to primitive if fails or missing url
  try {
    const gltf = useLoader(GLTFLoader, config.modelUrl);
    return (
      <primitive
        object={gltf.scene}
        position={config.position}
        rotation={config.rotation}
        scale={config.scale}
      />
    );
  } catch (e) {
    // Fallback simple shapes based on type
    const color = config.type === 'ring' || config.type === 'necklace' ? '#FFD700' : '#8B4513';
    return (
      <mesh position={config.position} rotation={config.rotation} scale={config.scale}>
        {config.type === 'ring' ? (
          <torusGeometry args={[0.05, 0.01, 16, 100]} />
        ) : config.type === 'necklace' ? (
          <torusGeometry args={[0.2, 0.02, 16, 100]} />
        ) : config.type === 'hat' ? (
          <cylinderGeometry args={[0.1, 0.15, 0.2, 32]} />
        ) : (
          <boxGeometry args={[0.2, 0.2, 0.1]} />
        )}
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    );
  }
}
