"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, ThreeEvent } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform vec2 uResolution;
varying vec2 vUv;

// Simple wave distortion + Mouse interaction
void main() {
    vec2 uv = vUv;

    // Silk-like sine waves
    float waveX = sin(uv.y * 10.0 + uTime) * 0.002;
    float waveY = cos(uv.x * 10.0 + uTime * 0.8) * 0.002;

    // Mouse distortion
    float dist = distance(uv, uMouse);
    float decay = smoothstep(0.4, 0.0, dist);
    vec2 mouseDistort = (uv - uMouse) * decay * 0.03 * uHover;

    vec2 distortedUV = uv + vec2(waveX, waveY) + mouseDistort;

    // Texture lookup
    vec4 color = texture2D(uTexture, distortedUV);

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

interface SceneProps {
    image: string;
}

function Scene({ image }: SceneProps) {
    const mesh = useRef<THREE.Mesh>(null!);
    const texture = useLoader(TextureLoader, image);
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uHover: { value: 0 },
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
        }),
        [texture, viewport]
    );

    useFrame((state) => {
        if (mesh.current) {
            const material = mesh.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;

            // Decay hover intensity
            material.uniforms.uHover.value = THREE.MathUtils.lerp(
                material.uniforms.uHover.value,
                0,
                0.05
            );
        }
    });

    const handleMove = (e: ThreeEvent<PointerEvent>) => {
        if (!mesh.current) return;
        const material = mesh.current.material as THREE.ShaderMaterial;
        // e.uv gives UV coordinates of the intersection
        if (e.uv) {
            material.uniforms.uMouse.value.set(e.uv.x, e.uv.y);
            material.uniforms.uHover.value = 1.0; // Reset decay on move
        }
    };

    return (
        <mesh
            ref={mesh}
            onPointerMove={handleMove}
        >
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

export default function LuxuryImageDistortion({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="w-full h-full relative bg-black">
            <Canvas>
                <React.Suspense fallback={null}>
                   <Scene image={imageUrl} />
                </React.Suspense>
            </Canvas>
        </div>
    );
}
