'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define the shader material
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
  },
  // Vertex Shader
  `
    precision mediump float;
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;

    // Simplex Noise (simplified 2D)
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
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

      float noiseFreq = 2.0;
      float noiseAmp = 0.15 * uHover;
      vec2 noisePos = vec2(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.5);

      float noiseVal = snoise(noisePos);

      pos.z += noiseVal * noiseAmp;
      vWave = noiseVal;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    precision mediump float;
    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    varying vec2 vUv;
    varying float vWave;

    void main() {
      vec2 uv = vUv;

      // Distortion
      float waveStrength = 0.02 * uHover;
      uv.x += vWave * waveStrength;
      uv.y += vWave * waveStrength;

      vec4 textureColor = texture2D(uTexture, uv);

      // Subtle darkening on edges of ripple for depth
      float shadow = smoothstep(0.0, 1.0, vWave) * 0.1 * uHover;

      gl_FragColor = textureColor - vec4(shadow);
    }
  `
);

// Register the material
extend({ WaveShaderMaterial });

// Type augmentation
declare module '@react-three/fiber' {
  interface ThreeElements {
    waveShaderMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
      uTime?: number;
      uColor?: THREE.Color;
      uTexture?: THREE.Texture | null;
      uMouse?: THREE.Vector2;
      uHover?: number;
    };
  }
}

const Scene = ({ image }: { image: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useTexture(image);
  const [hovered, setHover] = useState(false);

  // Maintain aspect ratio of the plane based on texture
  // Or force it to fill the container.
  // Assuming 3:4 aspect ratio for now as per `aspect-[3/4]` in `LuxuryGarmentDetail`.
  const planeArgs: [number, number, number, number] = [3, 4, 32, 32];

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();

      // Lerp uHover
      const targetHover = hovered ? 1.0 : 0.0;
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        targetHover,
        delta * 2.5 // Speed of transition
      );

      // Mouse interaction (optional, based on UV or pointer)
      // materialRef.current.uMouse = state.pointer;
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={planeArgs} />
      {/* @ts-expect-error - Custom material element */}
      <waveShaderMaterial
        ref={materialRef}
        uTexture={texture}
        uColor={new THREE.Color(0.0, 0.0, 0.0)}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ image }: { image: string }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene image={image} />
      </Canvas>
    </div>
  );
}
