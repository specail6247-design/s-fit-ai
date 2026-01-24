'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D AVATAR COMPONENT ---
function RealisticAvatar() {
  const group = useRef<THREE.Group>(null);
  // Using jsDelivr CDN for stable access to GitHub assets
  const modelUrl = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Xbot.glb"; 
  const animUrl = modelUrl;

  const { scene } = useGLTF(modelUrl);
  const { animations } = useGLTF(animUrl);
  const { actions } = useAnimations(animations, group);

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
export default function AvatarCanvas() {
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

        <RealisticAvatar />

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
