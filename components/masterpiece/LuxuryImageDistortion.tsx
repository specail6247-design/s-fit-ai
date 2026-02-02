'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Simple noise function for the shader
const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v - i + dot(i, C.xx);
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
  uniform float uHover;
  varying vec2 vUv;

  ${noiseGLSL}

  void main() {
    vec2 uv = vUv;

    // Liquid distortion effect
    float noiseValue = snoise(uv * 3.0 + uTime * 0.5);
    vec2 distortion = vec2(noiseValue) * 0.05 * uHover; // Reduced intensity for elegance

    // Apply distortion
    vec4 color = texture2D(uTexture, uv + distortion);

    // Slight RGB shift for chromatic aberration feeling
    float shift = 0.005 * uHover;
    float r = texture2D(uTexture, uv + distortion + vec2(shift, 0.0)).r;
    float b = texture2D(uTexture, uv + distortion - vec2(shift, 0.0)).b;

    gl_FragColor = vec4(r, color.g, b, color.a);
  }
`;

interface ImageMeshProps {
  imageUrl: string;
}

function ImageMesh({ imageUrl }: ImageMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const hoverValue = useRef(0);
  const targetHover = useRef(0);

  // Cast texture.image to HTMLImageElement to access width/height as per memory guidelines
  const { width, height } = texture.image as HTMLImageElement;
  const aspectRatio = width / height;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Smooth lerp for hover effect
      hoverValue.current += (targetHover.current - hoverValue.current) * 0.1;
      materialRef.current.uniforms.uHover.value = hoverValue.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(_e: ThreeEvent<PointerEvent>) => {
        targetHover.current = 1;
      }}
      onPointerOut={(_e: ThreeEvent<PointerEvent>) => {
        targetHover.current = 0;
      }}
      scale={[aspectRatio, 1, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
       <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ImageMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
