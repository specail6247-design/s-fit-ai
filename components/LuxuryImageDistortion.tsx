'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;

varying vec2 vUv;

void main() {
  // Preserve aspect ratio
  vec2 ratio = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // Distortion effect based on hover state and time
  float wave = sin(uv.x * 10.0 + uTime * 2.0) * 0.02 * uHoverState;
  vec2 distortedUv = vec2(uv.x, uv.y + wave);

  vec4 color = texture2D(uTexture, distortedUv);

  // Slight brightness increase on hover
  color.rgb += vec3(0.1) * uHoverState;

  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uHoverState;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Slight bulge effect on hover
  float dist = distance(uv, vec2(0.5));
  pos.z += sin(dist * 3.14) * 0.1 * uHoverState;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

interface ImageDistortionProps {
  imageUrl: string;
  isHovered: boolean;
}

function DistortionMesh({ imageUrl, isHovered }: ImageDistortionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  // Safe default for plane sizes, updated properly if container size available
  const [planeSize] = useState([1, 1]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHoverState: { value: 0 },
      uTime: { value: 0 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      uImageSize: { value: new THREE.Vector2((texture as any).image.width, (texture as any).image.height) },
      uPlaneSize: { value: new THREE.Vector2(planeSize[0], planeSize[1]) },
    }),
    [texture, planeSize]
  );

  useFrame((state) => {
    if (materialRef.current) {
      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        isHovered ? 1 : 0,
        0.1
      );
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string; alt?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  // Fallback to regular image if context lost or failing, but currently assumed solid
  const [hasError] = useState(false);

  if (hasError) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img src={imageUrl} alt={alt || ""} className="h-full w-full object-cover" />;
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        className="h-full w-full"
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
      >
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} isHovered={isHovered} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
