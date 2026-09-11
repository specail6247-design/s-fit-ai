'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uHover;
uniform float uHoverState;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

varying vec2 vUv;

// Simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  0.366025403784439, -0.577350269189626,  0.024390243902439);
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
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  float dist = distance(uv, uHover);
  float radius = 0.5;
  float intensity = uHoverState * smoothstep(radius, 0.0, dist);

  float noise = snoise(uv * 6.0 + uTime * 0.8);
  vec2 distortedUv = uv + intensity * noise * 0.08 * vec2(1.0, 1.0);

  vec4 color = texture2D(uTexture, distortedUv);
  color.rgb += intensity * 0.15;

  gl_FragColor = color;
}
`;

function FluidDistortion({ imageUrl }: { imageUrl: string }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uImageResolution: { value: new THREE.Vector2((texture.image as HTMLImageElement).width, (texture.image as HTMLImageElement).height) },
    }),
    [texture, viewport]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        hovered ? 1 : 0,
        0.1
      );
      materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <mesh
      onPointerMove={(e) => {
        if (materialRef.current) {
          materialRef.current.uniforms.uHover.value.set(e.uv?.x || 0.5, e.uv?.y || 0.5);
        }
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <FluidDistortion imageUrl={imageUrl} />
      </Canvas>
    </div>
  );
}
