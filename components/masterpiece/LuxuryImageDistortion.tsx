"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// Define the custom shader material
const FluidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0,
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Simple wave effect on hover
      float noiseFreq = 1.5;
      float noiseAmp = 0.1;
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);

      // Displacement
      pos.z += sin(pos.y * 3.0 + uTime) * 0.05 * uHover;

      vWave = pos.z;

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

      // Liquid distortion based on noise and hover
      float noise = snoise(uv * 3.0 + uTime * 0.2);
      vec2 distortion = vec2(noise * 0.02, noise * 0.02) * uHover;

      vec4 textureColor = texture2D(uTexture, uv + distortion);

      // Add a slight shimmer/highlight
      float shimmer = (noise + 1.0) * 0.5 * uHover * 0.1;

      gl_FragColor = textureColor + vec4(shimmer, shimmer, shimmer, 0.0);

      // Apply contrast and saturation
      // Contrast (1.1)
      gl_FragColor.rgb = ((gl_FragColor.rgb - 0.5) * 1.1) + 0.5;

      // Saturation (0.9)
      float gray = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
      gl_FragColor.rgb = mix(vec3(gray), gl_FragColor.rgb, 0.9);
    }
  `
);

extend({ FluidDistortionMaterial });

// Add type definition for the custom material
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fluidDistortionMaterial: any;
    }
  }
}

interface ImagePlaneProps {
  imageUrl: string;
}

const ImagePlane = ({ imageUrl }: ImagePlaneProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Type as any to bypass strict type checking for the custom material
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const [hovered, setHover] = React.useState(false);

  // Maintain aspect ratio
  const ratio = texture.image.width / texture.image.height;
  const width = 4;
  const height = width / ratio;

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();

      // Lerp uHover
      const targetHover = hovered ? 1.0 : 0.0;
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        targetHover,
        delta * 3.0
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
      {/* @ts-expect-error - fluidDistortionMaterial is dynamically extended */}
      <fluidDistortionMaterial ref={materialRef} uTexture={texture} uHover={0} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ImagePlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
