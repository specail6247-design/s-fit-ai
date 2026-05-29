"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const DistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHoverState: 0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHoverState;

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

      // Add displacement based on noise and hover state
      float noise = snoise(vec2(pos.x * 2.0 + uTime, pos.y * 2.0 + uTime)) * 0.1;
      pos.z += noise * uHoverState;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHoverState;

    void main() {
      // Create liquid/silk distortion effect on UV coordinates
      vec2 uv = vUv;

      // Calculate offset using sine waves and hover state
      float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.02 * uHoverState;
      uv.x += wave;

      vec4 texColor = texture2D(uTexture, uv);

      gl_FragColor = texColor;
    }
  `
);

// Register material to R3F
import { extend } from '@react-three/fiber';
extend({ DistortionMaterial });

type DistortionMaterialImpl = {
  uTime: number;
  uTexture: THREE.Texture;
  uHoverState: number;
} & JSX.IntrinsicElements['shaderMaterial'];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      distortionMaterial: DistortionMaterialImpl;
    }
  }
}

interface ImageMeshProps {
  imageUrl: string;
}

const ImageMesh = ({ imageUrl }: ImageMeshProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const targetHoverState = useRef(0);

  // Load texture
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    return loader.load(imageUrl);
  }, [imageUrl]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth interpolation for hover state
      targetHoverState.current = THREE.MathUtils.lerp(
        targetHoverState.current,
        hovered ? 1 : 0,
        0.1
      );
      materialRef.current.uniforms.uHoverState.value = targetHoverState.current;
    }
  });

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[1, 1.5, 1]} // Adjust aspect ratio to match typical product images
    >
      <planeGeometry args={[5, 5, 64, 64]} />
      {/* @ts-expect-error Typescript incorrectly flags custom JSX element */}
      <distortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent={true}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ src }: { src: string }) {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <ImageMesh imageUrl={src} />
      </Canvas>
    </div>
  );
}
