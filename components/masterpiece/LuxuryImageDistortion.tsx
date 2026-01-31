'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- SHADER DEFINITION ---
// A custom shader material that implements Simplex noise for fluid distortion.
// We also apply the requested editorial filter: saturate(0.9) contrast(1.1)

const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
    uMouse: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;

      // Calculate distance from mouse for interaction
      float dist = distance(uv, uMouse);
      float proximity = 1.0 - smoothstep(0.0, 0.5, dist);

      // Simple wave effect based on time and interaction
      vec3 pos = position;
      float wave = sin(pos.x * 5.0 + uTime) * 0.1 * uHover * proximity;
      pos.z += wave;
      vWave = wave;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;
    varying float vWave;

    // Simplex noise function (simplified)
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
      vec2 uv = vUv;

      // Liquid distortion effect
      float noise = snoise(uv * 3.0 + uTime * 0.5);
      vec2 distortion = vec2(noise * 0.05 * uHover, noise * 0.05 * uHover);

      vec4 color = texture2D(uTexture, uv + distortion);

      // Editorial Filter: Saturate 0.9, Contrast 1.1
      // Saturation
      float luminance = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 gray = vec3(luminance);
      color.rgb = mix(gray, color.rgb, 0.9);

      // Contrast
      color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;

      // Add subtle shimmer based on wave
      color.rgb += vWave * 0.2;

      gl_FragColor = color;
    }
  `
);

extend({ FluidDistortionMaterial });

// --- SCENE COMPONENT ---

function FluidPlane({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useTexture(imageUrl);
  const { viewport, mouse } = useThree();
  const [hovered, setHover] = React.useState(false);

  // Adjust plane size to image aspect ratio within viewport
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  // Fit within viewport (simplified logic)
  const width = viewport.width * 0.8;
  const height = width / aspect;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      // Lerp hover value for smooth transition
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1 : 0,
        0.1
      );
      // Map mouse coordinates to UV space (roughly)
      // mouse is -1 to 1. UV is 0 to 1.
      materialRef.current.uMouse = new THREE.Vector2(
        (mouse.x + 1) / 2,
        (mouse.y + 1) / 2
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[width, height, 32, 32]} />
      {/* @ts-expect-error - FluidDistortionMaterial is generated at runtime */}
      <fluidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

// --- MAIN EXPORT ---

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <FluidPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
