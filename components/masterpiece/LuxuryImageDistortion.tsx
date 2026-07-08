'use client';
import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

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

    // Calculate distance from mouse for ripple center
    float dist = distance(uv, uMouse);
    float falloff = smoothstep(0.5, 0.0, dist);

    // Fluid noise displacement
    float noise = snoise(vec2(pos.x * 2.0 + uTime * 0.5, pos.y * 2.0 + uTime * 0.5));

    // Displace z based on noise and hover state
    pos.z += noise * 0.1 * uHover * falloff;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uMouse;

  void main() {
    // Slight UV distortion for a glass/water ripple effect
    vec2 distortedUv = vUv;
    float dist = distance(vUv, uMouse);
    float falloff = smoothstep(0.3, 0.0, dist);

    distortedUv.x += sin(vUv.y * 10.0 + uTime) * 0.02 * uHover * falloff;
    distortedUv.y += cos(vUv.x * 10.0 + uTime) * 0.02 * uHover * falloff;

    vec4 texColor = texture2D(uTexture, distortedUv);

    gl_FragColor = texColor;
  }
`;

interface SceneProps {
  imageUrl: string;
}

function Scene({ imageUrl }: SceneProps) {
  const texture = useTexture(imageUrl);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Need to track target hover value for smooth interpolation
  const [hoverState, setHoverState] = useState({ current: 0, target: 0 });
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  const targetMousePos = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: texture },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [texture]
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;

      // Smooth damp hover
      hoverState.current = THREE.MathUtils.damp(hoverState.current, hoverState.target, 5, delta);
      materialRef.current.uniforms.uHover.value = hoverState.current;

      // Smooth damp mouse position
      mousePos.x = THREE.MathUtils.damp(mousePos.x, targetMousePos.current.x, 5, delta);
      mousePos.y = THREE.MathUtils.damp(mousePos.y, targetMousePos.current.y, 5, delta);
      materialRef.current.uniforms.uMouse.value.copy(mousePos);
    }
  });

  return (
    <mesh
      onPointerMove={(e) => {
        setHoverState(prev => ({ ...prev, target: 1 }));
        targetMousePos.current.set(e.uv?.x || 0.5, e.uv?.y || 0.5);
      }}
      onPointerOut={() => {
        setHoverState(prev => ({ ...prev, target: 0 }));
      }}
    >
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface LuxuryImageDistortionProps {
  imageUrl: string;
}

export default function LuxuryImageDistortion({ imageUrl }: LuxuryImageDistortionProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene imageUrl={imageUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}