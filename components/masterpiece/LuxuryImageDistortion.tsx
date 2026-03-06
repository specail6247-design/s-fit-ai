'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Simplex noise function
const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uHoverState;
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

  // Create liquid distortion based on hover state
  float noise = snoise(uv * 3.0 + uTime * 0.5) * 0.05 * uHoverState;

  // Apply distortion to UV
  vec2 distortedUv = uv + vec2(noise);

  vec4 color = texture2D(tDiffuse, distortedUv);
  gl_FragColor = color;
}
`;

interface FluidDistortionProps {
  imageUrl: string;
}

const FluidDistortion = ({ imageUrl }: FluidDistortionProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [hovered, setHover] = useState(false);

  // Target value for smooth interpolation
  const targetHoverState = useRef(0);
  const [aspectRatio, setAspectRatio] = useState(1);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageUrl, (t) => {
      const img = t.image;
      if (img && img.width && img.height) {
        setAspectRatio(img.width / img.height);
      }
    });
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  }, [imageUrl]);

  const uniforms = useMemo(() => ({
    tDiffuse: { value: texture },
    uTime: { value: 0 },
    uHoverState: { value: 0 }
  }), [texture]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smoothly interpolate hover state
      targetHoverState.current = THREE.MathUtils.lerp(
        targetHoverState.current,
        hovered ? 1 : 0,
        0.1
      );

      materialRef.current.uniforms.uHoverState.value = targetHoverState.current;
    }
  });

  // Calculate scaled plane sizes to cover viewport while keeping aspect ratio.
  // The camera covers from -1 to 1 by default roughly if distance is calculated,
  // but simpler to use viewport hook or just manual scale if we want it to fill a 2x2.
  // Assuming the canvas fills its container, we adjust the scale.
  // If ratio > 1, width is larger. If ratio < 1, height is larger.
  // We want to "cover" or "contain". Since the container handles aspect ratio with w-full h-full,
  // and the texture defaults to stretching on the plane, we can adjust the UVs or plane args.
  // The easiest way is mapping the plane to the aspect ratio and then scaling down/up based on camera projection.
  // Actually, we can scale the mesh to match aspect ratio.

  // By scaling plane geometry to aspect ratio, but we want it to "cover".
  // A simple way is planeGeometry args=[2 * aspectRatio, 2] and camera position adjusted, OR
  // just pass aspect ratio to shader to fix UVs. Since Next.js has standard <img> fallback we'll
  // adjust plane scaling. But for now, we'll scale the mesh.
  // For a camera at [0,0,1], ortho height is ~1.15. Let's just adjust plane size:
  const planeWidth = aspectRatio > 1 ? 2 : 2 * aspectRatio;
  const planeHeight = aspectRatio > 1 ? 2 / aspectRatio : 2;

  // Let's use scale to fill the 2x2 area if needed, or just let it match the aspect ratio.
  // If we just use args={[2, 2 / aspectRatio]}, it will keep ratio.
  // To simulate object-fit: cover, we can let it stretch but adjust UVs.
  // To keep it simple, we just adjust args based on ratio.

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2, 2 / aspectRatio]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl, className = "" }: { imageUrl: string, className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <FluidDistortion imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
