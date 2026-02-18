'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader Material
const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
    uMouse: new THREE.Vector2(0, 0),
    uHover: 0,
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
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    // Simplex noise (simplified)
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

      // Fluid distortion based on mouse and noise
      float noise = snoise(uv * 3.0 + uTime * 0.2);
      float dist = distance(uv, uMouse);

      // Ripple effect localized to mouse
      float ripple = sin(dist * 20.0 - uTime * 2.0) * 0.02 * uHover;

      // Apply noise and ripple
      uv.x += noise * 0.005 * uHover + ripple;
      uv.y += noise * 0.005 * uHover + ripple;

      vec4 textureColor = texture2D(uTexture, uv);

      // Apply "Luxury" filter: saturate(0.9) contrast(1.1)
      // Contrast
      textureColor.rgb = (textureColor.rgb - 0.5) * 1.1 + 0.5;

      // Saturation
      float gray = dot(textureColor.rgb, vec3(0.299, 0.587, 0.114));
      textureColor.rgb = mix(vec3(gray), textureColor.rgb, 0.9);

      gl_FragColor = textureColor;
    }
  `
);

extend({ WaveShaderMaterial });

// Type augmentation
declare module '@react-three/fiber' {
  interface ThreeElements {
    waveShaderMaterial: any; // Simplified type to avoid R3F version conflicts
  }
}

const DistortionMesh = ({ imageSrc }: { imageSrc: string }) => {
  const ref = useRef<any>(null);
  const texture = useTexture(imageSrc);
  const { viewport, pointer } = useThree();
  const [hovered, setHover] = React.useState(false);

  // Calculate aspect ratio to fit image within viewport while maintaining aspect ratio
  const imgElement = texture.image as HTMLImageElement;
  const imgWidth = imgElement?.width || 1;
  const imgHeight = imgElement?.height || 1;
  const imgAspect = imgWidth / imgHeight;
  const viewportAspect = viewport.width / viewport.height;

  // Calculate dimensions to cover the viewport (like object-cover)
  let width, height;
  if (imgAspect > viewportAspect) {
     // Image is wider, so match height
     height = viewport.height;
     width = height * imgAspect;
  } else {
     // Image is taller, so match width
     width = viewport.width;
     height = width / imgAspect;
  }

  // If we want "contain" behavior instead of cover:
  // Use the logic I had before
  let scale: [number, number, number] = [1, 1, 1];
  if (imgAspect > viewportAspect) {
     scale = [viewport.width, viewport.width / imgAspect, 1];
  } else {
     scale = [viewport.height * imgAspect, viewport.height, 1];
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.getElapsedTime();

      // Lerp hover value for smooth transition
      const targetHover = hovered ? 1.0 : 0.0;
      ref.current.uHover = THREE.MathUtils.lerp(ref.current.uHover, targetHover, 0.1);

      // Mouse interaction (normalized to 0..1 for UVs)
      // UVs are 0..1, pointer is -1..1
      const mouseX = (pointer.x + 1) / 2;
      const mouseY = (pointer.y + 1) / 2;
      ref.current.uMouse.lerp(new THREE.Vector2(mouseX, mouseY), 0.1);
    }
  });

  return (
    <mesh
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <waveShaderMaterial ref={ref} uTexture={texture} transparent />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <React.Suspense fallback={null}>
          <DistortionMesh imageSrc={imageSrc} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
