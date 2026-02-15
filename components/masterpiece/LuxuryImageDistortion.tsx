'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, ThreeElement } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- Custom Shader Material ---
class WaveShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;

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
          vUv = uv;
          vec3 pos = position;

          float noiseFreq = 2.0;
          float noiseAmp = 0.15; // Amplitude of ripple
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);

          // Apply displacement only based on hover intensity
          pos.z += snoise(noisePos.xy) * noiseAmp * uHover;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        uniform float uHover;

        void main() {
          // Slight chromatic aberration based on hover
          float r = texture2D(uTexture, vUv + uHover * 0.005).r;
          float g = texture2D(uTexture, vUv).g;
          float b = texture2D(uTexture, vUv - uHover * 0.005).b;
          vec3 color = vec3(r, g, b);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uTexture: { value: null }
      }
    });
  }

  get uTime() {
    return this.uniforms.uTime.value;
  }
  set uTime(v) {
    this.uniforms.uTime.value = v;
  }
  get uHover() {
    return this.uniforms.uHover.value;
  }
  set uHover(v) {
    this.uniforms.uHover.value = v;
  }
  get uTexture() {
    return this.uniforms.uTexture.value;
  }
  set uTexture(v) {
    this.uniforms.uTexture.value = v;
  }
}

// Register the custom shader material
extend({ WaveShaderMaterial });

// Declare module for TypeScript compatibility
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: ThreeElement<typeof THREE.ShaderMaterial> & {
        uTexture?: THREE.Texture | null;
        uHover?: number;
        uTime?: number;
        ref?: React.Ref<WaveShaderMaterial>;
      };
    }
  }
}

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane: React.FC<ImagePlaneProps> = ({ imageUrl }) => {
  const materialRef = useRef<WaveShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const hoverTarget = useRef(0);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      // Lerp current hover value to target
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hoverTarget.current,
        delta * 3 // Speed of transition
      );
    }
  });

  return (
    <mesh
      onPointerOver={() => (hoverTarget.current = 1)}
      onPointerOut={() => (hoverTarget.current = 0)}
    >
      <planeGeometry args={[3, 4, 64, 64]} />
      <waveShaderMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <React.Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
