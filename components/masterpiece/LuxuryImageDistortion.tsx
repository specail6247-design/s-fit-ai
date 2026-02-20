"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree, ReactThreeFiber } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Shader definition
const WaveShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: new THREE.Texture() },
    uHover: { value: 0.8 }, // Constant low-level distortion for "luxury fluid" feel
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Subtle slow vertex displacement
      float noise = sin(pos.y * 2.0 + uTime * 0.5) * 0.05 * uHover;
      pos.z += noise;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Fluid distortion (liquid glass effect)
      float waveX = sin(uv.y * 3.0 + uTime * 0.3) * 0.005;
      float waveY = cos(uv.x * 3.0 + uTime * 0.2) * 0.005;

      uv.x += waveX * uHover;
      uv.y += waveY * uHover;

      vec4 color = texture2D(uTexture, uv);

      // Slight chromatic aberration
      float r = texture2D(uTexture, uv + vec2(0.0015, 0.0) * uHover).r;
      float b = texture2D(uTexture, uv - vec2(0.0015, 0.0) * uHover).b;

      gl_FragColor = vec4(r, color.g, b, color.a);
    }
  `
};

// Extend to make it available in JSX
class WaveMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: undefined },
        uHover: { value: 0.8 },
      },
      vertexShader: WaveShaderMaterial.vertexShader,
      fragmentShader: WaveShaderMaterial.fragmentShader,
    });
  }
}

extend({ WaveMaterial });

// Add type definition for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof WaveMaterial>;
    }
  }
}

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const { viewport } = useThree();
  const texture = useTexture(imageUrl);
  const materialRef = useRef<any>(null); // Use any to avoid strict type issues with custom shader uniforms

  // Correct texture encoding/color space if needed, though R3F handles this mostly
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      {/* @ts-ignore - waveMaterial is a custom element */}
      <waveMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, alt }: { imageUrl: string, alt: string }) {
  if (!imageUrl) return null;

  return (
    <div className="w-full h-full relative bg-black" aria-label={alt}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
