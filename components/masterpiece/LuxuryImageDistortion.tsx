'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface DistortionMaterialProps {
  texture: THREE.Texture;
  hoverValue: number;
}

const DistortionMaterial = ({ texture, hoverValue }: DistortionMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hoverValue,
        0.1
      );
    }
  });

  const vertexShader = `
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

      // Calculate noise based displacement
      float noiseFreq = 2.0;
      float noiseAmp = 0.15;
      vec2 noisePos = vec2(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.5);
      float noiseValue = snoise(noisePos) * noiseAmp * uHoverState;

      pos.z += noiseValue;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float uHoverState;
    uniform float uTime;

    void main() {
      // Subtle UV distortion for liquid effect
      vec2 distortedUv = vUv;
      distortedUv.y += sin(vUv.x * 10.0 + uTime) * 0.02 * uHoverState;

      vec4 texColor = texture2D(uTexture, distortedUv);

      // Luxury color grading: saturate(0.9) contrast(1.1)
      // Contrast
      texColor.rgb = (texColor.rgb - 0.5) * 1.1 + 0.5;

      // Saturation
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      texColor.rgb = mix(vec3(luminance), texColor.rgb, 0.9);

      gl_FragColor = texColor;
    }
  `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
    />
  );
};

interface LuxuryImageDistortionProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

const ImageMesh = ({ imageUrl }: { imageUrl: string }) => {
  const texture = useTexture(imageUrl);
  const [hovered, setHovered] = React.useState(false);
  const { viewport } = useThree();

  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <DistortionMaterial texture={texture} hoverValue={hovered ? 1 : 0} />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className = "" }: LuxuryImageDistortionProps) {
  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <React.Suspense fallback={null}>
          <ImageMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
