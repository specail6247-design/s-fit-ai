'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define the shader material
const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uResolution: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;

    // Simplex Noise (short version)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      float noise = snoise(uv * 3.0 + uTime * 0.5);

      // Distort UV based on hover and noise
      // Create a liquid ripple effect
      vec2 distortedUv = uv + vec2(noise * 0.02 * uHover, noise * 0.02 * uHover);

      vec4 color = texture2D(uTexture, distortedUv);

      gl_FragColor = color;
    }
  `
);

extend({ FluidDistortionMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fluidDistortionMaterial: any;
  }
}

interface LuxuryImageDistortionProps {
  image: string;
  className?: string;
  aspectRatio?: number;
}

const ImagePlane = ({ image, aspectRatio = 0.75 }: { image: string, aspectRatio?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useTexture(image);
  const hoverRef = useRef(0);

  // Maintain aspect ratio
  const width = 5;
  const height = width / aspectRatio;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      // Smooth hover transition
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hoverRef.current,
        delta * 5
      );
    }
  });

  const handlePointerOver = () => { hoverRef.current = 1; };
  const handlePointerOut = () => { hoverRef.current = 0; };

  return (
    <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <planeGeometry args={[width, height, 32, 32]} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <fluidDistortionMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ image, className, aspectRatio = 0.75 }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <ImagePlane image={image} aspectRatio={aspectRatio} />
      </Canvas>
    </div>
  );
}
