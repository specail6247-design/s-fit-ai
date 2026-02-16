'use client';

/* eslint-disable @typescript-eslint/no-namespace */
import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, extend, useThree, ReactThreeFiber } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- Shader Definition ---

const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
    uHover: 0, // 0.0 to 1.0
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    // Simplex noise function
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

      // Calculate distance from mouse (normalized)
      float dist = distance(uv, uMouse);

      // Create ripple effect based on mouse proximity and hover state
      float noise = snoise(uv * 10.0 - uTime * 0.5);

      // Displacement strength
      float strength = uHover * 0.02; // Gentle displacement

      // Apply displacement
      vec2 displacedUv = uv + vec2(noise * strength, noise * strength);

      // Fetch texture color
      vec4 color = texture2D(uTexture, displacedUv);

      // Add a subtle shine/highlight based on noise (liquid silk effect)
      float shine = smoothstep(0.4, 0.6, noise) * uHover * 0.15;
      color.rgb += shine;

      // Apply saturation/contrast adjustment for "Masterpiece" look directly in shader
      // Contrast
      color.rgb = (color.rgb - 0.5) * 1.1 + 0.5;
      // Saturation (simplified)
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(vec3(gray), color.rgb, 0.9);

      gl_FragColor = color;
    }
  `
);

// Register the shader material
extend({ WaveShaderMaterial });

// TypeScript Augmentation
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      waveShaderMaterial: any;
    }
  }
}

// --- Component ---

interface LuxuryImageDistortionProps {
  imageUrl: string;
  className?: string;
}

// Custom interface for our shader material
interface WaveShaderMaterialType extends THREE.ShaderMaterial {
  uTime: number;
  uColor: THREE.Color;
  uTexture: THREE.Texture;
  uHover: number;
  uMouse: THREE.Vector2;
  uResolution: THREE.Vector2;
}

const Wave = ({ imageUrl }: { imageUrl: string }) => {
  // Use the custom type for the ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  const { viewport, mouse } = useThree();
  const [hovered, setHover] = React.useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.uTime += delta;

      // Smoothly interpolate hover state
      ref.current.uHover = THREE.MathUtils.lerp(ref.current.uHover, hovered ? 1 : 0, delta * 5);

      // Map normalized mouse coordinates (-1 to 1) to UV space (0 to 1)
      const uvMouse = new THREE.Vector2((mouse.x + 1) / 2, (mouse.y + 1) / 2);
      ref.current.uMouse.lerp(uvMouse, 0.1); // Smooth mouse movement
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <waveShaderMaterial
        ref={ref}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
        <Canvas
            camera={{ position: [0, 0, 1], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
        >
            <Suspense fallback={null}>
                <Wave imageUrl={imageUrl} />
            </Suspense>
        </Canvas>
    </div>
  );
}
