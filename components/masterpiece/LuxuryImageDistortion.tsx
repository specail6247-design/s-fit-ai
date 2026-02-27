"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simple noise function in GLSL
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
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

  // Fluid distortion effect - subtle
  float noise = snoise(uv * 2.0 + uTime * 0.1);

  // Add some automatic subtle movement
  float autoMovement = sin(uv.y * 5.0 + uTime * 0.5) * 0.002;

  uv.x += autoMovement + noise * 0.005;
  uv.y += noise * 0.005;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

const FluidDistortionMaterial = shaderMaterial(
  { uTexture: null, uTime: 0 },
  vertexShader,
  fragmentShader
);

extend({ FluidDistortionMaterial });

// Add type definition for the custom element
declare module '@react-three/fiber' {
  interface ThreeElements {
    // Using any to bypass complex type issues with Object3DNode export location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fluidDistortionMaterial: any;
  }
}

const Scene = ({ imageUrl }: { imageUrl: string }) => {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[4, 5, 32, 32]} />
      {/* @ts-expect-error - Custom element not fully typed in JSX */}
      <fluidDistortionMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 3.5] }} gl={{ alpha: true }}>
        <Scene imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
