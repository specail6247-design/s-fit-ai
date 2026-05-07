'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader for the displacement effect
const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
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
  vUv = uv;

  // Calculate distance from mouse
  float dist = distance(vUv, uMouse);
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.5 + 0.5;

  // Apply noise displacement, amplified on hover
  float noise = snoise(vUv * 5.0 + uTime * 0.5);
  vec3 pos = position;

  // Apply a subtle continuous wave, plus stronger displacement when hovered
  float displacement = (noise * 0.1) + (ripple * uHover * 0.2) * exp(-dist * 5.0);
  pos.z += displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uHover;

void main() {
  // Add subtle color grading: saturate(0.9) contrast(1.1)
  vec4 texColor = texture2D(uTexture, vUv);

  // Contrast
  texColor.rgb = (texColor.rgb - 0.5) * 1.1 + 0.5;

  // Saturation
  float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  texColor.rgb = mix(vec3(luminance), texColor.rgb, 0.9);

  gl_FragColor = texColor;
}
`;

const ImageMesh = ({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [texture] = useTexture([imageUrl]);

  // Target values for smooth interpolation
  const hoverRef = useRef(0);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouseRef = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smoothly interpolate hover state
      hoverRef.current = THREE.MathUtils.lerp(hoverRef.current, isHovered ? 1 : 0, 0.1);
      materialRef.current.uniforms.uHover.value = hoverRef.current;

      // Smoothly interpolate mouse position
      mouseRef.current.lerp(targetMouseRef.current, 0.1);
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
  });

  const handlePointerMove = (e: { uv: { x: number, y: number } }) => {
    // Map UV coordinates (0 to 1)
    targetMouseRef.current.set(e.uv.x, e.uv.y);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[4, 5, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
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

export const LuxuryImageDistortion: React.FC<LuxuryImageDistortionProps> = ({ imageUrl, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-xl ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ImageMesh imageUrl={imageUrl} isHovered={isHovered} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default LuxuryImageDistortion;
