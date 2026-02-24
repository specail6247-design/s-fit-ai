'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { TextureLoader, ShaderMaterial, Texture } from 'three';
import { useLoader } from '@react-three/fiber';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle breathing/floating effect
    pos.z += sin(uTime * 0.5) * 0.1;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  // Simplex 2D noise (simplified)
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

    // Fluid distortion
    float noise = snoise(uv * 3.0 + uTime * 0.2) * 0.005;
    uv.x += noise;
    uv.y += noise;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`;

class FluidDistortionMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
      },
      vertexShader,
      fragmentShader,
    });
  }

  set uTime(v: number) { this.uniforms.uTime.value = v; }
  set uTexture(v: Texture | null) { this.uniforms.uTexture.value = v; }
}

extend({ FluidDistortionMaterial });

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '@react-three/fiber' {
  interface ThreeElements {
    fluidDistortionMaterial: any;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function Scene({ imageUrl }: { imageUrl: string }) {
  const texture = useLoader(TextureLoader, imageUrl);
  const materialRef = useRef<FluidDistortionMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[5, 7]} />
      <fluidDistortionMaterial ref={materialRef} uTexture={texture} transparent />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className, style }: { imageUrl: string, className?: string, style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
         <React.Suspense fallback={null}>
            <Scene imageUrl={imageUrl} />
         </React.Suspense>
      </Canvas>
    </div>
  );
}
