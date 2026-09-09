'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

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
uniform vec2 uHover;
uniform float uHoverState;
varying vec2 vUv;

// Simplex noise function
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

void main() {
  vec2 uv = vUv;

  // Create a ripple effect based on distance to hover position
  float dist = distance(uv, uHover);
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.05 * uHoverState;

  // Add some fluid noise
  float noise = snoise(uv * 5.0 + uTime * 0.5) * 0.05 * uHoverState;

  // Combine distortion
  vec2 distortedUv = uv + ripple + noise;

  // Clamp UVs to avoid edge artifacts
  distortedUv = clamp(distortedUv, 0.0, 1.0);

  vec4 color = texture2D(uTexture, distortedUv);

  // Apply saturate(0.9) contrast(1.1)
  // Contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;
  // Saturation
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(luminance), color.rgb, 0.9);

  gl_FragColor = color;
}
`;

function ImageDistortionPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);

  // Adjust plane size based on image aspect ratio
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={(e) => {
        if (materialRef.current) {
          materialRef.current.uniforms.uHover.value.set(e.uv?.x || 0.5, e.uv?.y || 0.5);
        }
      }}
    >
      <planeGeometry args={[1 * aspect, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string; className?: string }) {
  if (!imageUrl) return null;
  return (
    <div className={`w-full h-full relative ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 1.5], fov: 45 }}>
        <React.Suspense fallback={null}>
          <ImageDistortionPlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
