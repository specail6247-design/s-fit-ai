import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uHover;
uniform float uHoverState;

varying vec2 vUv;

// Simplex 2D noise
// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
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

    float noise = snoise(uv * 3.0 + uTime * 0.5);

    // Distance from hover center
    float dist = distance(uv, uHover);

    // Smooth ripple effect based on hover
    float ripple = smoothstep(0.5, 0.0, dist) * uHoverState;

    // Displace UVs
    vec2 displacedUv = uv + vec2(noise * 0.05 * ripple, noise * 0.05 * ripple);

    vec4 tex = texture2D(uTexture, displacedUv);
    gl_FragColor = tex;
}
`;

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const DistortionMesh = ({ imageUrl }: { imageUrl: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [hovered, setHovered] = useState(false);
    const hoverRef = useRef({ x: 0.5, y: 0.5 });

    useMemo(() => {
        new THREE.TextureLoader().load(imageUrl, (tex) => {
            setTexture(tex);
        });
    }, [imageUrl]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

            // Smooth transition for hover state
            const targetHoverState = hovered ? 1.0 : 0.0;
            materialRef.current.uniforms.uHoverState.value += (targetHoverState - materialRef.current.uniforms.uHoverState.value) * 0.1;

            materialRef.current.uniforms.uHover.value.set(hoverRef.current.x, hoverRef.current.y);
        }
    });

    return (
        <mesh
            ref={meshRef}
            onPointerMove={(e) => {
                hoverRef.current = { x: e.uv?.x || 0.5, y: e.uv?.y || 0.5 };
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[2, 3, 32, 32]} />
            {texture && (
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        uTime: { value: 0 },
                        uTexture: { value: texture },
                        uHover: { value: new THREE.Vector2(0.5, 0.5) },
                        uHoverState: { value: 0.0 }
                    }}
                />
            )}
        </mesh>
    );
};

export default function LuxuryImageDistortion({ imageUrl, className }: { imageUrl: string, className?: string }) {
    return (
        <div className={`w-full h-full ${className || ''}`}>
            <Canvas camera={{ position: [0, 0, 2] }}>
                <DistortionMesh imageUrl={imageUrl} />
            </Canvas>
        </div>
    );
}
