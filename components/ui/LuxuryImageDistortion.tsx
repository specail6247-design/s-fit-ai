"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHoverState: 0,
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
    uniform float uHoverState;
    varying vec2 vUv;

    // Simplex noise functions
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
      m = m*m;
      m = m*m;
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

      // Calculate noise
      float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHoverState;

      // Apply distortion
      uv.x += noise;
      uv.y += noise;

      vec4 color = texture2D(uTexture, uv);

      // Luxury filter adjustments: saturate(0.9) contrast(1.1)
      const mat3 saturateMatrix = mat3(
        0.213, 0.715, 0.072,
        0.213, 0.715, 0.072,
        0.213, 0.715, 0.072
      );
      vec3 satColor = mix(color.rgb, saturateMatrix * color.rgb, 1.0 - 0.9);

      vec3 finalColor = (satColor - 0.5) * 1.1 + 0.5;

      gl_FragColor = vec4(finalColor, color.a);
    }
  `
);

extend({ DistortionMaterial });

interface ImageMeshProps {
  imageUrl: string;
  isHovered: boolean;
}

const ImageMesh: React.FC<ImageMeshProps> = ({ imageUrl, isHovered }) => {
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number; uHoverState: number }>(null);
  const texture = useTexture(imageUrl);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      // Smooth interpolation for hover state
      materialRef.current.uHoverState = THREE.MathUtils.lerp(
        materialRef.current.uHoverState,
        isHovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2.5]} />
      {/* @ts-expect-error R3F extension types */}
      <distortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export const LuxuryImageDistortion: React.FC<LuxuryImageDistortionProps> = ({
  imageUrl,
  alt = 'Product image',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-alt={alt}
    >
      {/* Fallback image for accessibility or when WebGL fails */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />

      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
          <React.Suspense fallback={null}>
            <ImageMesh imageUrl={imageUrl} isHovered={isHovered} />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
};
