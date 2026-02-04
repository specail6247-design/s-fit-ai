'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;

// Simplex noise function (simplified)
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
  return 105.0 * dot( m*m, vec3( dot(p.x,x0), dot(p.y,x12.xy), dot(p.z,x12.zw) ) );
}

void main() {
  vUv = uv;
  vec3 pos = position;

  float noise = snoise(uv * 3.0 + uTime * 0.5);
  pos.z += noise * 0.1 * uHover;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;

void main() {
  vec2 uv = vUv;

  // Fluid distortion
  float noise = sin(uv.y * 10.0 + uTime) * 0.005 * uHover;
  uv.x += noise;
  uv.y += noise;

  vec4 color = texture2D(uTexture, uv);

  // Editorial filter: saturate(0.9) contrast(1.1)
  vec3 c = color.rgb;
  // Saturation
  float luminance = dot(c, vec3(0.2126, 0.7152, 0.0722));
  vec3 gray = vec3(luminance);
  c = mix(gray, c, 0.9);
  // Contrast
  c = (c - 0.5) * 1.1 + 0.5;

  gl_FragColor = vec4(c, color.a);
}
`;

const Scene = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  const clonedTexture = useMemo(() => {
    const t = texture.clone();
    t.needsUpdate = true;
    return t;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: clonedTexture },
      uHover: { value: 0 },
    }),
    [clonedTexture]
  );

  const [hovered, setHover] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uHover.value = THREE.MathUtils.lerp(
        material.uniforms.uHover.value,
        hovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[3, 4, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const LuxuryImageDistortion: React.FC<LuxuryImageDistortionProps> = ({ imageUrl }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <Suspense fallback={null}>
          <Scene imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
};
