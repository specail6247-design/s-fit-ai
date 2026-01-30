"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Shader
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
uniform float uHover;
varying vec2 vUv;

// Simplex Noise (simplified for brevity or standard implementation)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
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

  // Create ripple/liquid effect based on hover and noise
  float noise = snoise(uv * 3.0 + uTime * 0.5);
  float distortion = uHover * noise * 0.05;

  // Distort UV
  vec2 distortedUv = uv + vec2(distortion);

  vec4 color = texture2D(uTexture, distortedUv);

  // Add a slight sheen/highlight based on noise
  float sheen = uHover * smoothstep(0.3, 0.7, noise) * 0.1;
  color.rgb += sheen;

  gl_FragColor = color;
}
`;

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // Configure texture encoding for consistency
  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      // Lerp hover value for smooth transition
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        meshRef.current.userData.hover ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (meshRef.current!.userData.hover = true)}
      onPointerOut={() => (meshRef.current!.userData.hover = false)}
    >
      <planeGeometry args={[3, 4, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
