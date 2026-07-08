'use client';

import React, { useRef, useEffect, useState } from 'react';
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
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    if (!isMuted) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContext();

        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        // Create a subtle low-frequency hum (e.g., 100Hz sine wave)
        oscillator.type = 'sine';
        oscillator.frequency.value = 100;

        // Very low volume
        gainNode.gain.value = 0.05;

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
      } catch (err) {
        console.error("Web Audio API error", err);
      }
    }

    return () => {
      if (oscillator) oscillator.stop();
      if (audioCtx && audioCtx.state !== 'closed') audioCtx.close();
    };
  }, [isMuted]);

  return (
    <div className="absolute inset-0 z-10">
      {/* Audio Control */}
      <div className="absolute bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {isMuted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>

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
