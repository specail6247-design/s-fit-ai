'use client';

import React, { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simplex Noise Function (Classic GLSL implementation)
const noiseGLSL = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
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
`;

const ImageDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;

    ${noiseGLSL}

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Subtle vertex displacement
      float noiseFreq = 1.5;
      float wave = snoise(pos.xy * noiseFreq - uTime * 0.5) * uHover;
      vWave = wave;

      pos.z += wave * 0.05;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;
    varying vec2 vUv;
    varying float vWave;

    ${noiseGLSL}

    void main() {
      vec2 uv = vUv;

      // Fluid distortion effect on UVs
      float noiseValue = snoise(uv * 4.0 + uTime * 0.2);
      vec2 distortion = vec2(noiseValue) * uHover * 0.02; // Strength of distortion

      vec4 color = texture2D(uTexture, uv + distortion);

      // Add a "silk" sheen based on noise
      float sheen = smoothstep(0.3, 0.7, noiseValue + vWave * 2.0) * uHover * 0.15;
      color.rgb += sheen * vec3(1.0, 0.95, 0.8); // Gold/Cream tint

      gl_FragColor = color;
    }
  `
);

extend({ ImageDistortionMaterial });

// Add types for React Three Fiber
declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageDistortionMaterial: any;
  }
}

type LuxuryImageDistortionProps = {
  imageUrl: string;
  isHovered: boolean;
};

export default function LuxuryImageDistortion({ imageUrl, isHovered }: LuxuryImageDistortionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);

  // Fix texture encoding/color space if needed, though R3F usually handles it
  // texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      // Smooth transition for hover state
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        isHovered ? 1 : 0,
        delta * 4
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[1, 1, 32, 32]} />
      <imageDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}
