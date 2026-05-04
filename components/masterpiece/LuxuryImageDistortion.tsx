import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom Shader Material for Liquid/Silk Distortion
const DistortionMaterial = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uHover: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Simplex noise inspired ripple
      float noise = sin(uv.y * 10.0 + uTime) * cos(uv.x * 10.0 + uTime) * 0.05 * uHover;
      uv.y += noise;
      uv.x += noise;

      vec4 texColor = texture2D(uTexture, uv);
      gl_FragColor = texColor;
    }
  `
};

export default function LuxuryImageDistortion({ src, className }: { src: string, className?: string }) {
  // Need to handle texture loading and shader updates
  return (
    <div className={className} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
         <ambientLight />
         <DistortedImage src={src} />
      </Canvas>
    </div>
  );
}

function DistortedImage({ src }: { src: string }) {
  const texture = useTexture(src);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHover] = React.useState(false);
  const hoverValue = useRef(0);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, hovered ? 1 : 0, 0.1);
      materialRef.current.uniforms.uHover.value = hoverValue.current;
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={[5, 5, 1]} // Adjust scale as needed
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uHover: { value: 0 }
        }}
        vertexShader={DistortionMaterial.vertexShader}
        fragmentShader={DistortionMaterial.fragmentShader}
      />
    </mesh>
  );
}
