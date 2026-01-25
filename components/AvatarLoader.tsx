import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarLoaderProps {
  url: string;
  animationUrl?: string;
  scale?: number;
  position?: [number, number, number];
  onLoaded?: () => void;
}

export function AvatarLoader({ 
  url, 
  animationUrl, 
  scale = 1, 
  position = [0, -0.9, 0],
  onLoaded 
}: AvatarLoaderProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  
  // Clone scene to avoid mutation issues if reused
  const clone = React.useMemo(() => scene.clone(), [scene]);
  
  // If we have a separate animation file (Mixamo)
  const { animations: mixamoAnimations } = useGLTF(animationUrl || url); 
  const { actions, names } = useAnimations(mixamoAnimations, group);

  useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  useEffect(() => {
    // Play the first animation found by default
    if (actions && names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => action?.fadeOut(0.5));
      }
    };
  }, [actions, names]);

  return (
    <group ref={group} position={position} scale={[scale, scale, scale]} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

// Preload handy RPM models
useGLTF.preload('https://models.readyplayer.me/6421516e68072c1c3c4372e3.glb');
