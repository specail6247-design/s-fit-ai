'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { FabricType, FABRIC_PRESETS } from './masterpiece/types';

// --- 3D AVATAR COMPONENT ---
function RealisticAvatar({ fabricType = 'silk' }: { fabricType?: FabricType }) {
  const group = useRef<THREE.Group>(null);
  // Using jsDelivr CDN for stable access to GitHub assets
  const modelUrl = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Xbot.glb"; 
  const animUrl = modelUrl;

  const { scene } = useGLTF(modelUrl);
  const { animations } = useGLTF(animUrl);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Traverse the scene and update materials to simulate Fabric properties
    if (scene) {
      const config = FABRIC_PRESETS[fabricType];
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material && child.material.name !== 'Alpha_Surface' && child.material.name !== 'Alpha_Joints') {
            // Apply physical material properties to simulate the fabric texture on zoom
            if (!(child.material instanceof THREE.MeshPhysicalMaterial)) {
              // Convert to PhysicalMaterial if possible, or just apply properties
              const newMat = new THREE.MeshPhysicalMaterial().copy(child.material);
              child.material = newMat;
            }
            const mat = child.material as THREE.MeshPhysicalMaterial;
            mat.roughness = config.roughness;
            mat.metalness = config.metalness;
            // Displacement and normal scales give it the micro-fiber detail bump
            if (mat.normalMap) mat.normalScale.set(config.normalScale, config.normalScale);
            mat.clearcoat = config.clearcoat || 0;
            mat.clearcoatRoughness = config.clearcoatRoughness || 0;
            mat.needsUpdate = true;
          }
        }
      });
    }
  }, [scene, fabricType]);

  useEffect(() => {
    // Play idle animation if available
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  return (
    <group ref={group} position={[0, -1, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// --- MAIN CANVAS EXPORT ---
export default function AvatarCanvas({ fabricType = 'silk' }: { fabricType?: FabricType }) {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas shadows camera={{ position: [0, 0.5, 3], fov: 45 }}>
        <Environment preset="city" />
        
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[5, 5, 5]} 
          angle={0.15} 
          penumbra={1} 
          intensity={10} 
          color="#007AFF" 
          castShadow 
        />
        <pointLight position={[-5, 5, -5]} intensity={5} color="#ff00ff" />

        <RealisticAvatar fabricType={fabricType} />

        <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={10} color="#000000" />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI/2.5} 
          maxPolarAngle={Math.PI/2} 
        />
      </Canvas>
    </div>
  );
}
