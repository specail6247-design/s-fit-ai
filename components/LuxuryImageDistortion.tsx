'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
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

    // Mouse influence
    float dist = distance(uv, uMouse);
    float decay = smoothstep(0.6, 0.0, dist);

    // Noise based distortion
    float noise = snoise(uv * 4.0 + uTime * 0.15);

    // Liquid effect: displace UVs
    vec2 distortedUv = uv + vec2(noise * 0.015 * decay, noise * 0.015 * decay);

    vec4 color = texture2D(uTexture, distortedUv);

    // Add subtle gold tint on high noise areas / interaction
    color.rgb += vec3(0.92, 0.67, 0.07) * noise * 0.08 * decay;

    gl_FragColor = color;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const DistortionPlane = ({ imageUrl }: { imageUrl: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const originalTexture = useTexture(imageUrl);
  // Clone texture to avoid modifying the cached version and to satisfy linter
  const texture = useMemo(() => originalTexture.clone(), [originalTexture]);
  const { viewport } = useThree();

  // Update texture wrapping and filtering for better quality
  React.useEffect(() => {
    const t = texture;
    // eslint-disable-next-line
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (mesh.current) {
        (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
        // Map mouse from (-1 to 1) to (0 to 1) for UV space
        const mouseX = (state.mouse.x + 1) / 2;
        const mouseY = (state.mouse.y + 1) / 2;
        // Lerp could be added here for smoother uniform updates
        (mesh.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.set(mouseX, mouseY);
    }
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-full relative bg-black">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <DistortionPlane imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
