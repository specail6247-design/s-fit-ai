'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const LuxuryImageDistortionShader = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uIntensity: { value: 0.1 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uIntensity;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Luxury subtle wave effect
      uv.y += sin(uv.x * 10.0 + uTime * 0.5) * uIntensity * 0.05;
      uv.x += cos(uv.y * 10.0 + uTime * 0.5) * uIntensity * 0.05;

      vec4 tex = texture2D(uTexture, uv);

      // Slight gold/warm tint
      vec3 tint = vec3(1.0, 0.95, 0.9);

      gl_FragColor = vec4(tex.rgb * tint, tex.a);
    }
  `,
};

function DistortedImage({ imageUrl }: { imageUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const texture = useTexture(imageUrl);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uIntensity: { value: 0.2 }, // Soft intensity for luxury feel
    }),
    [texture]
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[5, 7, 32, 32]} />
      <shaderMaterial
        ref={material}
        vertexShader={LuxuryImageDistortionShader.vertexShader}
        fragmentShader={LuxuryImageDistortionShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({
  imageUrl,
  className = '',
}: {
  imageUrl: string;
  className?: string;
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <React.Suspense fallback={null}>
          <DistortedImage imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
