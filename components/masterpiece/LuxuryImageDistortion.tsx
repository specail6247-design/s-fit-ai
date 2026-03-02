import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform vec2 uHover;
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

  // Calculate distance from mouse hover
  float dist = distance(uv, uHover);

  // Create ripple effect
  float noise = snoise(vec2(uv.x * 10.0 + uTime, uv.y * 10.0 + uTime)) * 0.02;

  // Apply distortion based on hover state and distance
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.01;
  uv += (noise + ripple) * uHoverState * smoothstep(0.5, 0.0, dist);

  vec4 color = texture2D(tDiffuse, uv);
  gl_FragColor = color;
}
`;

interface SceneProps {
  imageUrl: string;
}

const Scene: React.FC<SceneProps> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = React.useState(false);
  const targetHover = useRef(0);
  const currentHover = useRef(0);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const texture = useLoader(THREE.TextureLoader, imageUrl);

  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: texture },
      uTime: { value: 0 },
      uHover: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverState: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth hover state transition
      targetHover.current = hovered ? 1 : 0;
      currentHover.current = THREE.MathUtils.lerp(currentHover.current, targetHover.current, 0.1);
      materialRef.current.uniforms.uHoverState.value = currentHover.current;

      // Smooth mouse transition
      materialRef.current.uniforms.uHover.value.lerp(mouse.current, 0.1);
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.uv) {
      mouse.current.x = e.uv.x;
      mouse.current.y = e.uv.y;
    }
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const LuxuryImageDistortion: React.FC<{ imageUrl: string; className?: string }> = ({ imageUrl, className }) => {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <React.Suspense fallback={null}>
          <Scene imageUrl={imageUrl} />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default LuxuryImageDistortion;
