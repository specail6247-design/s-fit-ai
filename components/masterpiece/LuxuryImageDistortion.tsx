'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

const DistortionMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: texture },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            vUv = uv;
            vec3 pos = position;
            // Subtle wave distortion based on time
            pos.z += sin(pos.x * 5.0 + uTime) * 0.05;
            pos.z += sin(pos.y * 5.0 + uTime * 0.5) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;

          void main() {
            vec2 uv = vUv;
            // Chromatic aberration / RGB shift effect
            float shift = sin(uTime * 2.0) * 0.005;

            vec4 colorR = texture2D(uTexture, vec2(uv.x + shift, uv.y));
            vec4 colorG = texture2D(uTexture, uv);
            vec4 colorB = texture2D(uTexture, vec2(uv.x - shift, uv.y));

            // Vignette effect for luxury feel
            float dist = distance(uv, vec2(0.5));
            float vignette = smoothstep(0.8, 0.2, dist * 1.2);

            vec4 finalColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
            gl_FragColor = finalColor * vignette;
          }
        `,
        transparent: true,
      }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material && material.uniforms && material.uniforms.uTime) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 8, 32, 32]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className, alt }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className || ''}`} aria-label={alt || "Distorted image view"}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
