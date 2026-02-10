"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Simplex Noise GLSL function
const simplexNoise = `
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
  i = mod289(i); // Avoid truncation effects in permutation
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
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform sampler2D uTexture;
varying vec2 vUv;

${simplexNoise}

void main() {
  vec2 uv = vUv;

  // Mouse interaction
  float dist = distance(uv, uMouse);
  float decay = clamp(1.0 - dist * 3.0, 0.0, 1.0);

  // Create ripple/liquid effect
  float noise = snoise(vec2(uv.x * 10.0 + uTime * 0.5, uv.y * 10.0 + uTime * 0.5));
  float distortion = noise * 0.02 * uHover + (decay * 0.05 * sin(uTime * 2.0));

  vec2 distortedUv = uv + vec2(distortion);

  vec4 color = texture2D(uTexture, distortedUv);

  // Asset Curation: Saturate(0.9) Contrast(1.1)
  // Simple contrast
  color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

  // Simple saturation
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = mix(vec3(gray), color.rgb, 0.9);

  gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface DistortionPlaneProps {
  imageUrl: string;
}

const DistortionPlane: React.FC<DistortionPlaneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const hovered = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uTexture: { value: texture },
    }),
    [texture]
  );

  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smooth hover transition
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hovered.current ? 1 : 0,
        0.1
      );

      // Map mouse to UV space (0-1)
      const mouse = state.pointer; // -1 to 1
      material.uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5);
    }
  });

  // Handle aspect ratio
  const scale: [number, number, number] = [viewport.width, viewport.height, 1];

  return (
    <mesh
      ref={meshRef}
      scale={scale}
      onPointerOver={() => (hovered.current = true)}
      onPointerOut={() => (hovered.current = false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
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
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 2]} // Handle high DPI
      >
        <React.Suspense fallback={null}>
          <DistortionPlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
