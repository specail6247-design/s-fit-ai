"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
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
  vec2 p = vUv;
  float noise = snoise(p * 2.0 + uTime * 0.5) * 0.1 * uHover;
  vec2 offset = vec2(noise, noise);
  vec4 color = texture2D(tDiffuse, p + offset);

  // Vignette effect for luxury feel
  float dist = distance(p, vec2(0.5));
  color.rgb *= smoothstep(0.8, 0.2, dist * 0.8);

  gl_FragColor = color;
}
`;

function Scene({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load(imageUrl);
  }, [imageUrl]);

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      uTime: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Smoothly transition hover state
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        isHovered ? 1 : 0,
        0.05
      );
    }
  });

  const { viewport } = useThree();

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className = "", alt = "Product Image" }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label={alt}
    >
        <div className="absolute inset-0 z-10" />
      <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} gl={{ alpha: true }}>
        <Scene imageUrl={imageUrl} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
