'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Create fluid distortion effect
  float noise = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHoverState;
  noise += cos(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHoverState;

  uv.x += noise;
  uv.y += noise;

  vec4 color = texture2D(uTexture, uv);

  // Slight brightness boost on hover
  color.rgb += uHoverState * 0.1;

  gl_FragColor = color;
}
`;

const vertexShader = `
uniform float uHoverState;
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Slight subtle wave effect on hover
  float wave = sin(pos.x * 3.0 + uTime * 2.0) * 0.05 * uHoverState;
  pos.z += wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

interface DistortionMeshProps {
  imageUrl: string;
  isHovered: boolean;
  aspectRatio: number;
}

const DistortionMesh: React.FC<DistortionMeshProps> = ({ imageUrl, isHovered, aspectRatio }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  // Clone texture to allow modification without mutating useTexture cache
  const originalTexture = useTexture(imageUrl);
  const texture = useMemo(() => {
    const t = originalTexture.clone();
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }, [originalTexture]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHoverState: { value: 0.0 },
      uTime: { value: 0.0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth interpolation for hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        isHovered ? 1.0 : 0.0,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1 / aspectRatio, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export function LuxuryImageDistortion({ imageUrl, className, alt }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(3 / 4);

  // Preload and get image aspect ratio
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      if (img.width && img.height) {
        setAspectRatio(img.width / img.height);
      }
    };
  }, [imageUrl]);

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={alt || 'Product image'}
      style={{ width: '100%', height: '100%' }}
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} isHovered={isHovered} aspectRatio={aspectRatio} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

export default LuxuryImageDistortion;
