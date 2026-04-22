'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, ShaderMaterial } from 'three';
import { OrbitControls, useTexture } from '@react-three/drei';

interface HyperZoomViewerProps {
  materialType: 'silk' | 'denim' | 'wool';
  imageUrl: string;
}

const MaterialMesh = ({ imageUrl }: HyperZoomViewerProps) => {
  const meshRef = useRef<Mesh>(null);

  // Placeholder textures - in a real app, these would be high-res micro-fiber maps
  const baseTexture = useTexture(imageUrl);

  useFrame((state) => {
    if (meshRef.current) {
      // Calculate effective zoom based on camera distance
      const distance = state.camera.position.distanceTo(meshRef.current.position);
      // As distance decreases, zoom level increases
      const zoom = Math.max(1.0, 5.0 - distance);

      // Update shader uniforms
      const material = meshRef.current.material as ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uZoomLevel.value = zoom;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 5, 128, 128]} />
      <shaderMaterial
        uniforms={{
          uTexture: { value: baseTexture },
          uZoomLevel: { value: 1.0 },
          uTime: { value: 0.0 }
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform float uZoomLevel;
          varying vec2 vUv;
          varying vec3 vPosition;

          // Simple procedural noise for micro-fibers
          float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

          float noise(vec2 x) {
              vec2 i = floor(x);
              vec2 f = fract(x);
              float a = hash(i);
              float b = hash(i + vec2(1.0, 0.0));
              float c = hash(i + vec2(0.0, 1.0));
              float d = hash(i + vec2(1.0, 1.0));
              vec2 u = f * f * (3.0 - 2.0 * f);
              return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          void main() {
            vec4 baseColor = texture2D(uTexture, vUv);

            // Generate micro-fiber texture procedurally
            // Scale noise based on zoom
            float fiberScale = 200.0 * uZoomLevel;
            float n = noise(vUv * fiberScale);

            // Silk: Shimmering, fine directional fibers
            // Denim: Diagonal twill lines, coarser
            // Wool: Fuzzy, random clumps

            // Generic fiber overlay for demonstration
            float fiberIntensity = smoothstep(2.0, 5.0, uZoomLevel); // Fade in at high zoom
            vec4 fiberColor = vec4(vec3(n), 1.0) * 0.2; // Subtle overlay

            // Blend base color with micro-fibers when zoomed in
            vec4 finalColor = mix(baseColor, baseColor + fiberColor, fiberIntensity * 0.5);

            gl_FragColor = finalColor;
          }
        `}
      />
    </mesh>
  );
};

export default function HyperZoomViewer({ materialType, imageUrl }: HyperZoomViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] bg-black relative overflow-hidden rounded-xl border border-white/10 group cursor-crosshair">
      <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs text-[#C9B037] font-mono border border-[#C9B037]/30">
        HYPER-ZOOM ENABLED // {materialType.toUpperCase()}
      </div>
      <div className="absolute bottom-4 left-0 w-full text-center z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white/50 text-[10px] tracking-widest uppercase">Scroll to reveal micro-fibers</span>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <MaterialMesh materialType={materialType} imageUrl={imageUrl} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={false}
          minDistance={1.5}
          maxDistance={5}
        />
      </Canvas>
    </div>
  );
}
