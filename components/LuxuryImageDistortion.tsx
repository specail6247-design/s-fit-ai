"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uHover;
uniform float uHoverState;
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
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
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

  // Fluid/liquid ripple effect
  float noise = snoise(uv * 3.0 + uTime * 0.2);

  // Create distortion based on noise and hover state
  float dist = distance(uv, uHover);
  float radius = 0.5;
  float strength = smoothstep(radius, 0.0, dist) * uHoverState;

  // Apply distortion
  vec2 distortedUv = uv + noise * 0.05 * strength;

  // Sample texture
  vec4 color = texture2D(uTexture, distortedUv);

  // Slight color shift on hover
  color.r += noise * 0.05 * strength;
  color.b -= noise * 0.05 * strength;

  gl_FragColor = color;
}
`;

interface ImageDistortionProps {
  imageUrl: string;
}

const ImagePlane = ({ imageUrl }: ImageDistortionProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  // Target values for smooth interpolation
  const targetHoverState = useRef(0);
  const targetHoverPos = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: texture },
    uHover: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverState: { value: 0.0 }
  }), [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth interpolation for hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        targetHoverState.current,
        0.05
      );

      // Smooth interpolation for hover position
      materialRef.current.uniforms.uHover.value.lerp(targetHoverPos.current, 0.1);
    }
  });

  const handlePointerMove = (e: { uv?: { x: number; y: number } }) => {
    if (e.uv) {
      // Convert pointer position to UV coordinates (0 to 1)
      targetHoverPos.current.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => targetHoverState.current = 1}
      onPointerOut={() => targetHoverState.current = 0}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[viewportWidth(), viewportHeight(), 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

// Helper for viewport dimensions mapped to 3D space
const viewportWidth = () => 20;
const viewportHeight = () => 20;

export default function LuxuryImageDistortion({ imageUrl }: ImageDistortionProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <React.Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
