import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

const DistortionMesh = ({ imageUrl }: LuxuryImageDistortionProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  // Simplex noise displacement shader
    const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: texture },
          uHover: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uTime;
          uniform float uHover;

          // Simplex noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                               -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
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
            vUv = uv;
            vec3 pos = position;

            // Add distortion
            float noise = snoise(vec2(pos.x * 2.0 + uTime * 0.5, pos.y * 2.0 + uTime * 0.5));
            pos.z += noise * 0.1 * uHover;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D uTexture;

          void main() {
            vec4 color = texture2D(uTexture, vUv);
            // saturate(0.9) contrast(1.1)
            // Adjust saturation
            float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            vec3 saturatedColor = mix(vec3(luminance), color.rgb, 0.9);

            // Adjust contrast
            vec3 finalColor = (saturatedColor - 0.5) * 1.1 + 0.5;

            gl_FragColor = vec4(finalColor, color.a);
          }
        `,
      }),
    [texture]
  );

  useFrame((state) => {
    if (material) {
      // eslint-disable-next-line react-hooks/immutability
      material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => {
        if (material) { // eslint-disable-next-line react-hooks/immutability
          material.uniforms.uHover.value = 1;
        }
      }}
      onPointerOut={() => {
        if (material) { // eslint-disable-next-line react-hooks/immutability
          material.uniforms.uHover.value = 0;
        }
      }}
    >
      <planeGeometry args={[2, 3, 32, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="w-full h-full aspect-[2/3]">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <React.Suspense fallback={null}>
          <DistortionMesh imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
