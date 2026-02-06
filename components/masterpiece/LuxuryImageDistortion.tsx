/* eslint-disable @typescript-eslint/no-namespace */
'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber, useThree } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simple Simplex Noise GLSL function
const glslNoise = `
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

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    uniform float uTime;

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
    uniform vec2 uMouse;

    varying vec2 vUv;

    ${glslNoise}

    void main() {
      vec2 uv = vUv;

      // Silk/Liquid ripple effect
      float waveStrength = 0.03 * uHover; // Strength depends on hover

      // Create organic movement
      float noise1 = snoise(vec2(uv.x * 4.0 + uTime * 0.2, uv.y * 4.0 - uTime * 0.1));
      float noise2 = snoise(vec2(uv.x * 10.0 - uTime * 0.4, uv.y * 10.0 + uTime * 0.3));

      float finalNoise = mix(noise1, noise2, 0.5);

      // Mouse interaction (ripples around cursor)
      float dist = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.4, 0.0, dist) * uHover;

      // Distort UV
      vec2 distortedUV = uv + vec2(
        finalNoise * waveStrength + mouseInfluence * 0.02,
        finalNoise * waveStrength * 0.5 + mouseInfluence * 0.02
      );

      vec4 color = texture2D(uTexture, distortedUV);

      // Add "silk" sheen
      float sheen = smoothstep(0.3, 0.7, finalNoise) * 0.1 * uHover;
      color.rgb += vec3(sheen);

      // Slight chromatic aberration on edges based on noise
      float r = texture2D(uTexture, distortedUV + vec2(0.002 * uHover, 0.0)).r;
      float b = texture2D(uTexture, distortedUV - vec2(0.002 * uHover, 0.0)).b;
      if(uHover > 0.0) {
        color.r = r;
        color.b = b;
      }

      gl_FragColor = color;
    }
  `
);

extend({ DistortionMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      distortionMaterial: any;
    }
  }
}

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const [hover, setHover] = useState(false);
  const { viewport } = useThree();

  // Using CSS 'cover' logic in shader is complex without passing correct aspect ratios.
  // Instead, we can scale the mesh to cover the viewport if needed, or just fit it.
  // Let's make it cover the viewport.

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hover ? 1 : 0,
        0.05
      );
    }
  });

  const handlePointerMove = (e: { uv: THREE.Vector2 }) => {
    if (materialRef.current) {
        materialRef.current.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      {/* @ts-expect-error - Custom shader material not fully typed in JSX */}
      <distortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ImagePlane imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
