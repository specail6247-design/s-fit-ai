import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  diffuseMapUrl: string;
  normalMapUrl?: string;
  displacementMapUrl?: string;
}

function FabricMesh({ diffuseMapUrl, normalMapUrl, displacementMapUrl }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use a default empty texture to avoid breaking the hooks order when maps are missing
  const dummyTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

  const diffMapUrl = diffuseMapUrl || dummyTexture;
  const normMapUrl = normalMapUrl || dummyTexture;
  const dispMapUrl = displacementMapUrl || dummyTexture;

  const diffuseTex = useTexture(diffMapUrl);
  const normalTex = useTexture(normMapUrl);
  const displacementTex = useTexture(dispMapUrl);

  const diffuseMap = useMemo(() => {
    const tex = diffuseTex.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.needsUpdate = true;
    return tex;
  }, [diffuseTex]);

  const normalMap = useMemo(() => {
    const tex = normalTex.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.needsUpdate = true;
    return tex;
  }, [normalTex]);

  const displacementMap = useMemo(() => {
    const tex = displacementTex.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    tex.needsUpdate = true;
    return tex;
  }, [displacementTex]);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <planeGeometry args={[2, 2, 256, 256]} />
      <meshStandardMaterial
        map={diffuseMapUrl ? diffuseMap : undefined}
        normalMap={normalMapUrl ? normalMap : undefined}
        displacementMap={displacementMapUrl ? displacementMap : undefined}
        displacementScale={0.05}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

export function HyperZoomCanvas({ diffuseMapUrl, normalMapUrl, displacementMapUrl }: Props) {
  return (
    <div className="absolute inset-0 bg-zinc-900">
      <Canvas shadows camera={{ position: [0, 0, 1.5], fov: 45 }}>
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        <FabricMesh
          diffuseMapUrl={diffuseMapUrl}
          normalMapUrl={normalMapUrl}
          displacementMapUrl={displacementMapUrl}
        />

        <OrbitControls
          enableZoom={true}
          minDistance={0.2}
          maxDistance={2}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
