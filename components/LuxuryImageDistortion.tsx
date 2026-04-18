import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface DistortionProps {
  imageUrl: string;
}

function DistortionMesh({ imageUrl }: DistortionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const baseTexture = useLoader(THREE.TextureLoader, imageUrl);

  const texture = React.useMemo(() => {
    const tex = baseTexture.clone();
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, [baseTexture]);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float and rotation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 4, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: DistortionProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />
        <DistortionMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
