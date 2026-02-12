"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber, useThree, ThreeElement } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simplex Noise GLSL
const noiseGLSL = `
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

class LuxuryDistortionMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uHover: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) }
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
        uniform vec2 uMouse;
        uniform float uHover;
        varying vec2 vUv;

        ${noiseGLSL}

        void main() {
          vec2 uv = vUv;

          float noise = snoise(uv * 3.0 + uTime * 0.1);
          float dist = distance(uv, uMouse);

          // Distortion effect
          float distortion = noise * 0.03 * uHover + (sin(uv.y * 10.0 + uTime) * 0.01 * uHover);

          // Apply distortion
          vec2 distortedUv = uv + vec2(distortion);

          vec4 color = texture2D(uTexture, distortedUv);

          // Subtle gold shimmer
          float shimmer = snoise(uv * 10.0 - uTime * 0.5) * 0.15 * uHover;
          // color.rgb += vec3(1.0, 0.84, 0.0) * shimmer; // Gold tint

          gl_FragColor = color;
        }
      `,
      transparent: true
    });
  }
}

extend({ LuxuryDistortionMaterial });

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      luxuryDistortionMaterial: ThreeElement<typeof LuxuryDistortionMaterial>;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

const ImageMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<LuxuryDistortionMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport, mouse } = useThree();

  const img = texture.image as HTMLImageElement;
  const aspect = img.width / img.height;

  // Cover logic
  // const scaleX = viewport.width > viewport.height * aspect ? viewport.width : viewport.height * aspect;
  // const scaleY = viewport.width > viewport.height * aspect ? viewport.width / aspect : viewport.height;

  // Contain logic (fit within height)
  const scaleY = viewport.height * 0.8; // 80% height
  const scaleX = scaleY * aspect;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Assume always active for the effect
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(materialRef.current.uniforms.uHover.value, 1.0, 0.05);

      // Update mouse position (normalized 0-1)
      // mouse is -1 to 1
      materialRef.current.uniforms.uMouse.value.set((mouse.x + 1) / 2, (mouse.y + 1) / 2);
    }
  });

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      {/* @ts-expect-error - custom shader material uniforms */}
      <luxuryDistortionMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <React.Suspense fallback={null}>
            <ImageMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
