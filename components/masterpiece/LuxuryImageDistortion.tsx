"use client";

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader Material for Luxury Distortion (Golden Ripple / Liquid Glass)
const LuxuryShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Subtle slow breathing wave
      float wave = sin(pos.x * 1.5 + uTime * 0.5) * 0.02;
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Micro-distortion for glass effect
      float distortion = sin(uv.y * 20.0 + uTime * 0.8) * 0.001;
      uv.x += distortion;

      vec4 color = texture2D(uTexture, uv);

      // Luxury Color Grading (Warm Gold Tint in shadows)
      float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      vec3 gold = vec3(1.0, 0.9, 0.7);

      // Mix gold into dark areas slightly
      // color.rgb = mix(color.rgb, color.rgb * gold, 0.1);

      gl_FragColor = color;
    }
  `
};

function DistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // Use a fallback image if imageUrl is empty or invalid to prevent crash
  const validUrl = imageUrl && imageUrl.length > 0 ? imageUrl : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000";
  const originalTexture = useTexture(validUrl);

  const texture = useMemo(() => {
    const t = originalTexture.clone();
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.minFilter = THREE.LinearFilter;
    t.needsUpdate = true;
    return t;
  }, [originalTexture]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      // @ts-expect-error - Uniforms are dynamic
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  // Fullscreen plane
  // Adjust plane size to cover camera view approximately
  // At z=0, camera z=5, height visible is 2 * 5 * tan(fov/2).
  // FOV 75 deg. tan(37.5) ~= 0.76. Height ~= 7.6. Width depends on aspect.
  // We use a large plane to cover.
  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <planeGeometry args={[16, 12, 32, 32]} />
      <shaderMaterial
        args={[LuxuryShaderMaterial]}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <DistortionPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
      {/* Luxury Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)'
        }}
       />
       {/* Grain Overlay */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
    </div>
  );
}
