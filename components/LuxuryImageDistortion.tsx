"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, extend, ThreeElement, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Define the shader material
const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  `
    precision mediump float;
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Subtle wave movement
      pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 0.05;
      pos.y += cos(pos.y * 2.0 + uTime * 0.5) * 0.05;

      vWave = pos.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    precision mediump float;
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec2 vUv;
    varying float vWave;

    void main() {
      // Fluid distortion in texture lookup
      vec2 distortedUv = vUv;
      distortedUv.x += sin(vUv.y * 10.0 + uTime) * 0.002;
      distortedUv.y += cos(vUv.x * 10.0 + uTime) * 0.002;

      vec4 textureColor = texture2D(uTexture, distortedUv);
      gl_FragColor = textureColor;
    }
  `
);

extend({ WaveShaderMaterial });

/* eslint-disable @typescript-eslint/no-namespace */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: ThreeElement<typeof WaveShaderMaterial>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

const ImagePlane = ({ image }: { image: string }) => {
  const ref = useRef<any>(null);
  const texture = useTexture(image);
  const { viewport } = useThree();

  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      {/* @ts-ignore */}
      <waveShaderMaterial ref={ref} uTexture={texture} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ image }: { image: string }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <React.Suspense fallback={null}>
           <ImagePlane image={image} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
