import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { FabricType, EnvironmentType } from './types';
import * as THREE from 'three';

interface StudioStageProps {
  fabricType: FabricType;
  intensity?: number;
  environment?: EnvironmentType;
}

export function StudioStage({ fabricType = 'cotton', intensity = 1, environment = 'office' }: StudioStageProps) {
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const keyLightRef = useRef<THREE.SpotLight>(null);

  // Dynamic Lighting Configuration based on Fabric and Environment
  const config = useMemo(() => {
    const base = {
      key: 2.0,
      fill: 0.8,
      rim: 1.5,
      env: 0.6,
      keyColor: '#ffffff',
      rimColor: '#ffffff'
    };

    let fabricConfig = { ...base };

    switch (fabricType) {
      case 'silk':
        fabricConfig = {
          ...base,
          key: 3.5,
          rim: 2.0,
          env: 1.0,
          keyColor: '#fffaf0'
        };
        break;
      case 'leather':
        fabricConfig = {
          ...base,
          key: 3.0,
          rim: 3.0,
          env: 0.8
        };
        break;
      case 'wool':
        fabricConfig = {
          ...base,
          key: 1.5,
          rim: 4.0,
          fill: 1.2,
          rimColor: '#fffdd0'
        };
        break;
      case 'denim':
        fabricConfig = {
          ...base,
          key: 2.5,
          rim: 1.0,
          env: 0.5
        };
        break;
    }

    // Apply Environment Modifiers
    if (environment === 'romantic') {
       fabricConfig.key *= 0.6;
       fabricConfig.fill *= 0.4;
       fabricConfig.env *= 0.5;
       fabricConfig.keyColor = '#ffaa88'; // Warm candlelight
    } else if (environment === 'club') {
       fabricConfig.keyColor = '#aa00ff'; // Purple/Neon key
       fabricConfig.rimColor = '#00ffff'; // Cyan rim
       fabricConfig.fill = 0.2; // High contrast
       fabricConfig.env *= 0.8;
    } else if (environment === 'rainy') {
       fabricConfig.keyColor = '#dbeeff'; // Cold blueish
       fabricConfig.fill *= 0.7;
       fabricConfig.env *= 0.6;
    }

    return fabricConfig;
  }, [fabricType, environment]);

  const envPreset = useMemo(() => {
      switch(environment) {
          case 'romantic': return 'sunset';
          case 'club': return 'night';
          case 'rainy': return 'park';
          case 'office': default: return 'city';
      }
  }, [environment]);

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

      <Environment preset={envPreset} blur={0.8} background={false} />

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
