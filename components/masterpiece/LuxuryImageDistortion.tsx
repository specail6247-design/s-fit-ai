'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// A Simplex noise displacement shader to create a rippling fluid/silk effect.
const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;

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
    vUv = uv;
    vec3 pos = position;

    // Calculate noise based on position and time
    float noise = snoise(vec2(pos.x * 2.0 + uTime * 0.5, pos.y * 2.0 + uTime * 0.5));

    // Apply displacement only on hover, smooth out
    pos.z += noise * 0.1 * uHover;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    // Add subtle UV distortion on hover
    if (uHover > 0.0) {
      uv.x += sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
      uv.y += cos(uv.x * 10.0 + uTime) * 0.02 * uHover;
    }

    vec4 texColor = texture2D(uTexture, uv);
    gl_FragColor = texColor;
  }
`;

interface DistortionMaterialProps {
  imageUrl: string;
  isHovered: boolean;
}

const DistortionMesh: React.FC<DistortionMaterialProps> = ({ imageUrl, isHovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Try loading the texture safely
  const texture = useTexture(imageUrl);

  // Preserve aspect ratio
  const aspect = useMemo(() => {
    if (!texture) return 1;
    return texture.image.width / texture.image.height;
  }, [texture]);

  // Use lerping for smooth hover transitions
  const hoverValue = useRef(0);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smoothly interpolate hover state
      hoverValue.current = THREE.MathUtils.lerp(
        hoverValue.current,
        isHovered ? 1 : 0,
        0.1
      );
      materialRef.current.uniforms.uHover.value = hoverValue.current;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: 0 },
    }),
    [texture]
  );

  return (
    <mesh ref={meshRef} scale={[1, 1 / aspect, 1]}>
      {/* High segment count for smooth displacement */}
      <planeGeometry args={[1, 1, 64, 64]} />
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

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Canvas
        camera={{ position: [0, 0, 1.5] }}
        style={{ width: '100%', height: '100%' }}
        // Optional: dpr handling for sharper rendering on high-DPI screens
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} isHovered={isHovered} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
