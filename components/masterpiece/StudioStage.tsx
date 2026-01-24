import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { FabricType } from './types';
import * as THREE from 'three';

interface StudioStageProps {
  fabricType: FabricType;
  intensity?: number;
}

export function StudioStage({ fabricType = 'cotton', intensity = 1 }: StudioStageProps) {
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);

  // Dynamic Lighting Configuration based on Fabric
  const config = useMemo(() => {
    const base = {
      key: 2.0,
      fill: 0.8,
      rim: 1.5,
      env: 0.6,
      keyColor: '#ffffff',
      rimColor: '#ffffff'
    };

    switch (fabricType) {
      case 'silk':
        return {
          ...base,
          key: 3.5, // Strong specular highlights
          rim: 2.0,
          env: 1.0, // High reflections
          keyColor: '#fffaf0' // Slightly warm
        };
      case 'leather':
        return {
          ...base,
          key: 3.0,
          rim: 3.0, // Accentuate the silhouette
          env: 0.8
        };
      case 'wool':
        return {
          ...base,
          key: 1.5, // Softer key
          rim: 4.0, // VERY strong rim to catch "fuzz" (subsurface fake)
          fill: 1.2, // Fill shadows
          rimColor: '#fffdd0'
        };
      case 'denim':
        return {
          ...base,
          key: 2.5,
          rim: 1.0,
          env: 0.5
        };
      default:
        return base;
    }
  }, [fabricType]);

  // Gentle animation for the lights to create "life" in reflections
  useFrame((state) => {
    if (rimLightRef.current) {
      rimLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    }
    if (keyLightRef.current && fabricType === 'silk') {
      // Subtle movement for silk to show off sheen
      keyLightRef.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3 * intensity} />

      <Environment preset="studio" blur={0.8} background={false} />

      {/* KEY LIGHT - Main source */}
      <SpotLight
        ref={keyLightRef}
        position={[4, 5, 4]}
        angle={0.3}
        penumbra={0.5}
        intensity={config.key * intensity * 100} // Scaled for physics-based units
        color={config.keyColor}
        castShadow
        shadow-bias={-0.0001}
      />

      {/* FILL LIGHT - Softens shadows */}
      <pointLight
        position={[-4, 2, 4]}
        intensity={config.fill * intensity * 50}
        color="#e6e6fa"
      />

      {/* RIM LIGHT - Separates object from background */}
      <SpotLight
        ref={rimLightRef}
        position={[0, 5, -5]}
        angle={0.5}
        penumbra={1}
        intensity={config.rim * intensity * 150}
        color={config.rimColor}
      />

      {/* Floor Shadows */}
      <AccumulativeShadows
        temporal
        frames={60}
        color="#000000"
        colorBlend={0.5}
        opacity={0.6}
        scale={10}
        alphaTest={0.85}
      >
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.5}
          intensity={1}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
    </group>
  );
}
