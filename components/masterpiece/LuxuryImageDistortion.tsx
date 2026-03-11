'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Define the custom shader material
const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Simplex noise displacement)
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

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

      // Calculate distance from mouse
      float dist = distance(uv, uMouse);

      // Calculate noise
      float noise = snoise(uv * 5.0 + uTime * 0.5);

      // Fluid distortion effect based on hover and noise
      float distortion = noise * uHover * 0.05 * smoothstep(0.5, 0.0, dist);

      vec2 distortedUv = uv + vec2(distortion);

      vec4 texColor = texture2D(uTexture, distortedUv);
      gl_FragColor = texColor;
    }
  `
);

// Register the custom material
extend({ FluidDistortionMaterial });

interface ImagePlaneProps {
  url: string;
  isHovered: boolean;
  mousePos: THREE.Vector2;
}

function ImagePlane({ url, isHovered, mousePos }: ImagePlaneProps) {
  const texture = useTexture(url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  // Calculate aspect ratio
  const aspect = useMemo(() => {
    if (!texture || !texture.image) return 1;
    return (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height;
  }, [texture]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly interpolate hover value
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        isHovered ? 1 : 0,
        0.1
      );
      // Update mouse position
      materialRef.current.uMouse = mousePos;
    }
  });

  return (
    <mesh scale={[aspect, 1, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-expect-error Types for dynamic react-three-fiber elements can be incorrect */}
      <fluidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        uResolution={new THREE.Vector2(aspect, 1.0)}
        transparent={true}
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  src: string;
  className?: string;
  alt?: string;
}

export default function LuxuryImageDistortion({ src, className = '', alt = '' }: LuxuryImageDistortionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGL uses bottom-left as (0,0)
    setMousePos(new THREE.Vector2(x, y));
  };

  return (
    <div
      className={`relative overflow-hidden w-full h-full ${className}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setMousePos(new THREE.Vector2(0.5, 0.5));
      }}
      onPointerMove={handlePointerMove}
      aria-label={alt}
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <React.Suspense fallback={null}>
          <ImagePlane url={src} isHovered={isHovered} mousePos={mousePos} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
