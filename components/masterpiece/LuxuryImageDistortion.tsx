"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uHover: { value: 0 },
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
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Gentle wave distortion
      float wave = sin(uv.y * 10.0 + uTime) * 0.005;
      float wave2 = cos(uv.x * 8.0 + uTime * 0.8) * 0.005;

      uv.x += wave * uHover;
      uv.y += wave2 * uHover;

      vec4 color = texture2D(uTexture, uv);
      gl_FragColor = color;
    }
  `
};

function ImagePlane({ image }: { image: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uHover: { value: 0.8 }, // Always slightly active for "luxury" feel
      },
      vertexShader: WaveShaderMaterial.vertexShader,
      fragmentShader: WaveShaderMaterial.fragmentShader,
    }),
    [texture]
  );

  useFrame((state) => {
    if (mesh.current) {
      (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3.2, 4]} />
      <shaderMaterial args={[shaderArgs]} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ image }: { image: string }) {
  return (
    <div className="w-full h-full relative min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <React.Suspense fallback={null}>
          <ImagePlane image={image} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
