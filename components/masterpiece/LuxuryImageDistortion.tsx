'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

const DistortionMesh = ({ imageUrl }: { imageUrl: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => new THREE.TextureLoader().load(imageUrl), [imageUrl]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  const noise3D = useMemo(() => createNoise3D(), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly transition hover state
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.05
      );
    }

    if (meshRef.current) {
      const positionAttribute = meshRef.current.geometry.attributes.position;
      const vertex = new THREE.Vector3();
      const time = state.clock.elapsedTime;
      const hoverIntensity = materialRef.current?.uniforms.uHoverState.value || 0;

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        // Base coordinate without displacement
        const ox = vertex.x;
        const oy = vertex.y;

        // Simplex noise displacement
        const noise = noise3D(ox * 2.0, oy * 2.0, time * 0.5);

        // Apply z displacement, modulated by hover state for ripple effect
        vertex.z = noise * 0.2 * hoverIntensity;

        positionAttribute.setZ(i, vertex.z);
      }
      positionAttribute.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Filter effect to apply saturate(0.9) contrast(1.1) in shader
  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHoverState;
    varying vec2 vUv;

    // Helper for contrast
    vec3 applyContrast(vec3 color, float contrast) {
      return (color - 0.5) * max(contrast, 0.0) + 0.5;
    }

    // Helper for saturation
    vec3 applySaturation(vec3 color, float saturation) {
      float luma = dot(color, vec3(0.299, 0.587, 0.114));
      return mix(vec3(luma), color, saturation);
    }

    void main() {
      // Small UV distortion based on time and hover
      vec2 distortedUv = vUv;
      if (uHoverState > 0.0) {
        distortedUv.x += sin(vUv.y * 10.0 + uTime) * 0.01 * uHoverState;
        distortedUv.y += cos(vUv.x * 10.0 + uTime) * 0.01 * uHoverState;
      }

      vec4 texColor = texture2D(uTexture, distortedUv);

      // Apply strict asset curation grading: saturate(0.9) contrast(1.1)
      vec3 finalColor = applyContrast(texColor.rgb, 1.1);
      finalColor = applySaturation(finalColor, 0.9);

      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `;

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <DistortionMesh imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
