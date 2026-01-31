'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment Shader with Simplex Noise
const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
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

    // Create liquid effect
    float noise = snoise(uv * 3.0 + uTime * 0.5);

    // Distortion strength based on hover
    // We displace uv.x and uv.y based on noise
    float strength = uHover * 0.02; // Subtle effect

    uv.x += noise * strength;
    uv.y += noise * strength;

    vec4 color = texture2D(uTexture, uv);

    // Editorial filter in shader
    // Saturation
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 saturated = mix(vec3(gray), color.rgb, 0.9); // Saturate 0.9

    // Contrast
    vec3 contrasted = (saturated - 0.5) * 1.1 + 0.5; // Contrast 1.1

    gl_FragColor = vec4(contrasted, color.a);
  }
`;

interface DistortedImageProps {
  imageUrl: string;
}

const DistortedImage: React.FC<DistortedImageProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const hoverValue = useRef(0);
  const { viewport } = useThree();

  // Handle texture aspect ratio to cover the plane properly
  // Since we scale plane to viewport, uv mapping stretches.
  // Ideally we should adjust UVs or use a specialized shader for cover,
  // but for now simple stretch is acceptable or assuming image matches aspect.
  // To keep it high quality, let's just rely on the distortion.

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

      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hoverValue.current,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => (hoverValue.current = 1)}
      onPointerOut={() => (hoverValue.current = 0)}
    >
      <planeGeometry args={[1, 1]} />
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

export default function LuxuryImageDistortion({ imageUrl, className = '' }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Suspense fallback={null}>
          <DistortedImage imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
