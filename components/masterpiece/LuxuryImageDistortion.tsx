'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// WebGL Simplex Noise Displacement Shader
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uTime;
uniform float uHover;

varying vec2 vUv;
varying vec3 vPosition;

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

  // Calculate distance to mouse
  float dist = distance(uv, uMouse);

  // Create ripple effect
  float noise = snoise(vec2(uv.x * 5.0 + uTime * 0.5, uv.y * 5.0 + uTime * 0.5));
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.5 + 0.5;

  // Smoothly apply distortion based on hover state and distance
  float strength = smoothstep(0.5, 0.0, dist) * uHover * 0.05;

  vec2 distortedUv = uv + noise * strength * ripple;

  vec4 color = texture2D(uTexture, distortedUv);

  // Subtle silk shading based on normal/noise
  float light = snoise(vec2(distortedUv.x * 10.0, distortedUv.y * 10.0 + uTime)) * 0.1 * uHover;
  color.rgb += light;

  gl_FragColor = color;
}
`;

interface SceneProps {
  imageUrl: string;
}

const ImageScene: React.FC<SceneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetHover = useRef(0);
  const currentHover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);
      mouse.current.set(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uMouse.value.lerp(mouse.current, 0.1);
      currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.1);
      materialRef.current.uniforms.uHover.value = currentHover.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => (targetHover.current = 1)}
      onPointerOut={() => (targetHover.current = 0)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
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

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <React.Suspense fallback={null}>
          <ImageScene imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
