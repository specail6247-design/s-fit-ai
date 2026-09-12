import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

interface LuxuryImageDistortionProps {
  imageUrl: string;
  intensity?: number;
}

function ImageDistortionMesh({ imageUrl, intensity = 0.5 }: LuxuryImageDistortionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  useFrame(({ clock, pointer }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = clock.elapsedTime;
        // Smoothly interpolate mouse position
        material.uniforms.uMouse.value.lerp(
          new THREE.Vector2(pointer.x * intensity, pointer.y * intensity),
          0.1
        );
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        transparent
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uIntensity: { value: intensity }
        }}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uIntensity;

          void main() {
            vUv = uv;
            vec3 pos = position;

            // Subtle wave distortion based on mouse and time
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            pos.z += sin(dist * 10.0 - uTime * 2.0) * 0.1 * uIntensity;

            gl_Position = vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uIntensity;

          void main() {
            vec2 uv = vUv;

            // Chromatic aberration effect based on mouse distance
            float dist = distance(uv, uMouse * 0.5 + 0.5);
            float strength = smoothstep(0.5, 0.0, dist) * 0.02 * uIntensity;

            float r = texture2D(uTexture, uv + vec2(strength, 0.0)).r;
            float g = texture2D(uTexture, uv).g;
            float b = texture2D(uTexture, uv - vec2(strength, 0.0)).b;

            gl_FragColor = vec4(r, g, b, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export function LuxuryImageDistortion(props: LuxuryImageDistortionProps) {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas>
                <ImageDistortionMesh {...props} />
            </Canvas>
        </div>
    )
}
