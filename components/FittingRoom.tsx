'use client';

// S_FIT AI - 3D Fitting Room Component
// Consolidated Version: Masterpiece Engine + Physics (Ammo.js) + Full UI Features
// Includes: Accessory & Layering, Cinematic Video, AI Stylist, Comparison, Sharing

import React, { Suspense, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  useTexture,
  SpotLight,
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import type { UserStats } from '@/store/useStore';
import { getItemsByBrand, ClothingItem } from '@/data/mockData';
import type { PoseProportions } from '@/lib/mediapipe';
import { 
  calculateRecommendedSize, 
  generateFitHeatmap,
  ClothingStyleAnalysis 
} from '@/lib/visionService';
import * as THREE from 'three';
import { AvatarLoader } from './AvatarLoader';

// Masterpiece Components
import { FabricMaterial } from './masterpiece/FabricMaterial';
import { StudioStage } from './masterpiece/StudioStage';
import { FabricType } from './masterpiece/types';
import CinematicViewer from '@/components/ui/CinematicViewer';
import { layeringEngine } from '@/lib/layering';

// --- PHYSICS ENGINE (Ammo.js) ---

type AmmoVector3 = {
  x: () => number;
  y: () => number;
  z: () => number;
};

type AmmoWorldInfo = {
  set_m_gravity: (gravity: AmmoVector3) => void;
};

type AmmoNode = {
  get_m_x: () => AmmoVector3;
  addForce: (force: AmmoVector3) => void;
};

type AmmoNodeArray = {
  size: () => number;
  at: (index: number) => AmmoNode;
};

type AmmoSoftBody = {
  get_m_cfg: () => { set_kDP: (damping: number) => void };
  get_m_materials: () => { at: (index: number) => { set_m_kLST: (stiffness: number) => void } };
  setTotalMass: (mass: number, fromFaces: boolean) => void;
  get_m_nodes: () => AmmoNodeArray;
};

type AmmoWorld = {
  setGravity: (gravity: AmmoVector3) => void;
  getWorldInfo: () => AmmoWorldInfo;
  addSoftBody: (body: AmmoSoftBody, group: number, mask: number) => void;
  removeSoftBody: (body: AmmoSoftBody) => void;
  stepSimulation: (delta: number, maxSubSteps: number) => void;
};

type AmmoSoftBodyHelpers = {
  CreatePatch: (
    worldInfo: AmmoWorldInfo,
    c00: AmmoVector3,
    c10: AmmoVector3,
    c01: AmmoVector3,
    c11: AmmoVector3,
    resx: number,
    resy: number,
    fixeds: number,
    gendiags: boolean
  ) => AmmoSoftBody;
};

type AmmoModule = {
  btSoftBodyRigidBodyCollisionConfiguration: new () => unknown;
  btCollisionDispatcher: new (config: unknown) => unknown;
  btDbvtBroadphase: new () => unknown;
  btSequentialImpulseConstraintSolver: new () => unknown;
  btDefaultSoftBodySolver: new () => unknown;
  btSoftRigidDynamicsWorld: new (
    dispatcher: unknown,
    broadphase: unknown,
    solver: unknown,
    collisionConfiguration: unknown,
    softBodySolver: unknown
  ) => AmmoWorld;
  btVector3: new (x: number, y: number, z: number) => AmmoVector3;
  btSoftBodyHelpers: AmmoSoftBodyHelpers;
};

type AmmoLoader = () => Promise<AmmoModule>;

let Ammo: AmmoModule | null = null;
const initPhysics = async () => {
  if (Ammo) return Ammo;
  const ammoImport = await import('ammo.js');
  const loadAmmo = ammoImport.default as AmmoLoader | undefined;
  if (!loadAmmo) return null;
  Ammo = await loadAmmo();
  return Ammo;
};

const PhysicsContext = React.createContext<AmmoWorld | null>(null);

const PHYSICS_PRESETS: Record<string, { stiffness: number; mass: number; damping: number }> = {
  'silk': { stiffness: 0.1, mass: 0.5, damping: 0.01 },
  'denim': { stiffness: 0.8, mass: 1.2, damping: 0.05 },
  'leather': { stiffness: 0.9, mass: 2.0, damping: 0.1 },
  'default': { stiffness: 0.5, mass: 1.0, damping: 0.02 }
};

function PhysicsProvider({ children }: { children: React.ReactNode }) {
  const [world, setWorld] = useState<AmmoWorld | null>(null);

  useEffect(() => {
    initPhysics().then((ammoModule) => {
        if (!ammoModule) return;
        const collisionConfiguration = new ammoModule.btSoftBodyRigidBodyCollisionConfiguration();
        const dispatcher = new ammoModule.btCollisionDispatcher(collisionConfiguration);
        const broadphase = new ammoModule.btDbvtBroadphase();
        const solver = new ammoModule.btSequentialImpulseConstraintSolver();
        const softBodySolver = new ammoModule.btDefaultSoftBodySolver();
        const physicsWorld = new ammoModule.btSoftRigidDynamicsWorld(
          dispatcher, broadphase, solver, collisionConfiguration, softBodySolver
        );
        physicsWorld.setGravity(new ammoModule.btVector3(0, -9.8, 0));
        physicsWorld.getWorldInfo().set_m_gravity(new ammoModule.btVector3(0, -0.5, 0));
        setWorld(physicsWorld);
    });
  }, []);

  useFrame((state, delta) => {
    if (world) {
      world.stepSimulation(delta, 10);
    }
  });

  return <PhysicsContext.Provider value={world}>{children}</PhysicsContext.Provider>;
}

interface SoftBodyPlaneProps {
  position: [number, number, number];
  args: [number, number, number?, number?];
  materialProps?: THREE.MeshStandardMaterialParameters;
  stiffness?: number;
  mass?: number;
  damping?: number;
  renderOrder?: number;
  children?: React.ReactNode;
}

function SoftBodyPlane({
  position,
  args,
  materialProps,
  stiffness = 0.5,
  mass = 1.0,
  damping = 0.02,
  renderOrder,
  children
}: SoftBodyPlaneProps) {
  const world = React.useContext(PhysicsContext);
  const meshRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<AmmoSoftBody | null>(null);
  const camera = useThree((state) => state.camera);
  const [isMicroMode, setMicroMode] = useState(false);

  useEffect(() => {
    const ammo = Ammo;
    if (!world || !meshRef.current || !ammo) return;

    const width = args[0];
    const height = args[1];
    const nx = args[2] || 32;
    const ny = args[3] || 32;

    const pos = new THREE.Vector3(...position);
    const c00 = new ammo.btVector3(pos.x - width/2, pos.y + height/2, pos.z);
    const c10 = new ammo.btVector3(pos.x + width/2, pos.y + height/2, pos.z);
    const c01 = new ammo.btVector3(pos.x - width/2, pos.y - height/2, pos.z);
    const c11 = new ammo.btVector3(pos.x + width/2, pos.y - height/2, pos.z);

    const softBodyHelper = ammo.btSoftBodyHelpers;
    const sb = softBodyHelper.CreatePatch(
      world.getWorldInfo(),
      c00, c10, c01, c11,
      nx + 1, ny + 1,
      1+2, 
      true
    );

    sb.get_m_cfg().set_kDP(damping);
    sb.get_m_materials().at(0).set_m_kLST(stiffness);
    sb.setTotalMass(mass, false);

    world.addSoftBody(sb, 1, -1);
    bodyRef.current = sb;

    return () => {
      world.removeSoftBody(sb);
    };
  }, [world, position, args, stiffness, mass, damping]);

  useFrame(() => {
    const ammo = Ammo;
    if (!bodyRef.current || !meshRef.current || !ammo || !meshRef.current.geometry.attributes.position) return;

    const sb = bodyRef.current;
    const geometry = meshRef.current.geometry;
    const positions = geometry.attributes.position.array as Float32Array;
    const nodes = sb.get_m_nodes();
    const nodeCount = nodes.size();

    for (let i = 0; i < nodeCount; i++) {
      const node = nodes.at(i);
      const nodePos = node.get_m_x();
      positions[i * 3] = nodePos.x();
      positions[i * 3 + 1] = nodePos.y();
      positions[i * 3 + 2] = nodePos.z();
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    const dist = camera.position.distanceTo(new THREE.Vector3(positions[0], positions[1], positions[2]));
    if (dist < 2.0 && !isMicroMode) setMicroMode(true);
    if (dist >= 2.0 && isMicroMode) setMicroMode(false);
  });

  const handleClick = () => {
     const ammo = Ammo;
     if (!bodyRef.current || !ammo) return;
     const force = new ammo.btVector3(0, 0, 10 * mass);
     const nodes = bodyRef.current.get_m_nodes();
     if(nodes.size() > 0) {
        nodes.at(Math.floor(nodes.size()/2)).addForce(force);
     }
  };

  const finalMaterialProps = { ...(materialProps ?? {}) };
  if (isMicroMode) {
      finalMaterialProps.normalScale = new THREE.Vector2(3, 3);
  }

  return (
    <mesh ref={meshRef} position={[0,0,0]} renderOrder={renderOrder} onClick={handleClick} castShadow receiveShadow>
       <planeGeometry args={args} />
       {children ? children : <meshStandardMaterial {...finalMaterialProps} />}
    </mesh>
  );
}

// --- UI COMPONENTS ---

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-void-black">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-soft-gray border-t-cyber-lime rounded-full animate-spin mb-4" />
        <p className="text-soft-gray text-sm">Loading Fitting Room...</p>
      </div>
    </div>
  );
}

const colorMap: Record<string, string> = {
  'Black': '#1a1a1a', 'White': '#f5f5f5', 'Navy': '#1a2744', 'Beige': '#d4c4a8', 
  'Camel': '#c19a6b', 'Gray': '#6b6b6b', 'Cream': '#fffdd0', 'Brown': '#5c4033', 
  'Red': '#b22222', 'Blue': '#2563eb', 'Pink': '#ec4899', 'Green': '#16a34a',
  'Gold': '#ffd700', 'Silver': '#c0c0c0'
};

function mapToFabricType(analysisType?: string): FabricType {
  const type = analysisType?.toLowerCase() || 'cotton';
  if (type.includes('silk')) return 'silk';
  if (type.includes('denim') || type.includes('jean')) return 'denim';
  if (type.includes('wool') || type.includes('knit') || type.includes('cashmere')) return 'wool';
  if (type.includes('leather')) return 'leather';
  return 'cotton'; 
}

export const getCategoryIcon = (category: ClothingItem['category']) => {
  switch (category) {
    case 'tops': return '👔';
    case 'bottoms': return '👖';
    case 'outerwear': return '🧥';
    case 'dresses': return '👗';
    case 'accessories': return '👜';
    default: return '👔';
  }
};

// --- 3D ENGINE COMPONENTS ---

function Mannequin({ 
  height = 170
}: { height?: number; opacity?: number; bodyShape?: string; proportions?: PoseProportions | null }) {
  const scale = height / 170;
  const animationUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb";
  
  return (
    <group scale={[scale, scale, scale]}>
      {/* Generic RPM Avatar Buffer */}
      <AvatarLoader 
        url="https://models.readyplayer.me/64f0263b8655b32115ba9269.glb" 
        animationUrl={animationUrl}
        scale={1.0}
      />
    </group>
  );
}

interface ClothingProps {
  item: ClothingItem;
  widthScale?: number;
  shapeScale?: { shoulders: number; waist: number; hips: number };
  fabricType?: FabricType;
  useMasterpiece?: boolean;
}

function TopClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton' }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.65;
  const physics = PHYSICS_PRESETS[fabricType] || PHYSICS_PRESETS['default'];
  const zIndex = layeringEngine.getItemZIndex(item);

  return (
    <SoftBodyPlane
      position={[0, 0.95, 0.1 + (zIndex - 25) * 0.01]}
      args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 32, 32]}
      renderOrder={zIndex}
      {...physics}
    >
      <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
    </SoftBodyPlane>
  );
}

function BottomsClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton' }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.55;
  const physics = PHYSICS_PRESETS[fabricType] || PHYSICS_PRESETS['denim'];
  const zIndex = layeringEngine.getItemZIndex(item);

  return (
    <SoftBodyPlane
      position={[0, 0.35, 0.1 + (zIndex - 20) * 0.01]}
      args={[baseWidth * widthScale * shapeScale.hips, (baseWidth * widthScale * shapeScale.hips) / aspect, 32, 32]}
      renderOrder={zIndex}
      {...physics}
    >
      <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
    </SoftBodyPlane>
  );
}

function DressClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton' }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.65;
  const physics = PHYSICS_PRESETS[fabricType] || PHYSICS_PRESETS['silk'];
  const zIndex = layeringEngine.getItemZIndex(item);

  return (
    <SoftBodyPlane
      position={[0, 0.65, 0.1 + (zIndex - 27) * 0.01]}
      args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 32, 32]}
      renderOrder={zIndex}
      {...physics}
    >
      <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
    </SoftBodyPlane>
  );
}

function OuterwearClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton' }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.70;
  const physics = PHYSICS_PRESETS[fabricType] || PHYSICS_PRESETS['leather'];
  const zIndex = layeringEngine.getItemZIndex(item);

  return (
    <SoftBodyPlane
      position={[0, 0.95, 0.15 + (zIndex - 30) * 0.01]}
      args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 32, 32]}
      renderOrder={zIndex}
      {...physics}
    >
      <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
    </SoftBodyPlane>
  );
}

function AccessoryClothing({ item }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const zIndex = layeringEngine.getItemZIndex(item);
  
  const baseWidth = item.subCategory === 'bag' ? 0.4 : 0.2;
  const position: [number, number, number] = item.subCategory === 'bag' ? [0.35, 0.8, 0.2] : [0, 1.45, 0.15];

  return (
    <mesh position={position} renderOrder={zIndex} castShadow receiveShadow>
      <planeGeometry args={[baseWidth, baseWidth / aspect, 32, 32]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} roughness={0.4} metalness={item.isLuxury ? 0.5 : 0.2} alphaTest={0.5} />
    </mesh>
  );
}

function ClothingOverlay({ 
  item, 
  widthScale,
  shapeScale,
  clothingAnalysis,
}: {
  item: ClothingItem | null;
  widthScale: number;
  shapeScale: { shoulders: number; waist: number; hips: number };
  clothingAnalysis?: ClothingStyleAnalysis | null; 
  useMasterpiece: boolean;
}) {
  if (!item) return null;
  const fabricType = mapToFabricType(clothingAnalysis?.materialType);

  return (
    <Suspense fallback={null}>
      {item.category === 'tops' && <TopClothing item={item} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} />}
      {item.category === 'bottoms' && <BottomsClothing item={item} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} />}
      {item.category === 'dresses' && <DressClothing item={item} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} />}
      {item.category === 'outerwear' && <OuterwearClothing item={item} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} />}
      {item.category === 'accessories' && <AccessoryClothing item={item} widthScale={widthScale} shapeScale={shapeScale} />}
    </Suspense>
  );
}

function BackgroundImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const { viewport, camera } = useThree();
  const distToBg = camera.position.z - (-5);
  const distToViewport = camera.position.z;
  const scaleFactor = distToBg / distToViewport;

  const img = texture.image as HTMLImageElement;
  const ratio = img ? img.width / img.height : 0.75;
  const scaleY = viewport.height * scaleFactor;
  const scaleX = scaleY * ratio;

  return (
    <mesh position={[0, 0, -5]} scale={[scaleX, scaleY, 1]}> 
      <planeGeometry /><meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function MacroController({ active }: { active: boolean }) {
  const { camera } = useThree();
  const initialPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 2.8));
  useFrame(() => {
    const targetPos = active ? new THREE.Vector3(0, 0.9, 1.2) : initialPos.current;
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(0, active ? 0.9 : 0.5, 0);
  });
  return null;
}

function Scene({
  userStats,
  selectedItem,
  isMasterpieceMode,
  isMacroView,
  showHeatmap
}: {
  userStats: UserStats | null;
  selectedItem: ClothingItem | null;
  isMasterpieceMode: boolean;
  isMacroView: boolean;
  showHeatmap: boolean;
}) {
  const { poseAnalysis, clothingAnalysis, selfieData, selectedMode, selectedBrand } = useStore();
  const landmarks = poseAnalysis?.landmarks;
  const { viewport } = useThree();
  const height = userStats?.height || 170;
  const scale = height / 170;
  const fabricType = mapToFabricType(clothingAnalysis?.materialType);
  let mannequinPosition: [number, number, number] = [0, -0.9, 0];
  const animationUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RobotExpressive/glTF-Binary/RobotExpressive.glb";

  const heatmapData = useMemo(() => {
    if (!showHeatmap || !poseAnalysis?.proportions || !selectedBrand || !selectedItem) return null;
    return generateFitHeatmap(poseAnalysis.proportions, height, selectedBrand, selectedItem.category);
  }, [showHeatmap, poseAnalysis, height, selectedBrand, selectedItem]);
  
  if (selectedMode === 'digital-twin' && selfieData.fullBodyImage && landmarks && landmarks.length >= 24) {
    const cy = (landmarks[23].y + landmarks[24].y) / 2;
    const cx = (landmarks[23].x + landmarks[24].x) / 2;
    mannequinPosition = [(cx - 0.5) * viewport.width, (0.5 - cy) * viewport.height - (0.6 * scale), 0]; 
  }

  return (
    <>
      <MacroController active={isMacroView} />
      {isMasterpieceMode ? <StudioStage fabricType={fabricType} /> : (
        <>
          <ambientLight intensity={0.8} />
          <SpotLight position={[5, 10, 7.5]} intensity={200} castShadow />
          <Environment preset="studio" blur={0.8} />
        </>
      )}
      {selectedMode === 'digital-twin' && selfieData.fullBodyImage && <BackgroundImage imageUrl={selfieData.fullBodyImage} />}
      <group position={mannequinPosition} scale={[scale, scale, scale]}>
        {(selectedMode === 'vibe-check' || selectedMode === 'digital-twin') ? (
          <AvatarLoader 
            url={selectedMode === 'vibe-check' 
              ? "https://models.readyplayer.me/64f0263b8655b32115ba9269.glb" 
              : "https://models.readyplayer.me/64f0263b8655b32115ba9269.glb" 
            }
            animationUrl={animationUrl}
            scale={1.0}
          />
        ) : (
          <Mannequin height={height} opacity={1.0} />
        )}
        
        {/* Fit Heatmap Visual Overlay */}
        {showHeatmap && heatmapData && (
          <group position={[0, 0, 0.05]}>
            <mesh position={[0, 1.1, 0.01]}>
              <planeGeometry args={[0.5, 0.6]} />
              <meshBasicMaterial color={new THREE.Color().setHSL((1 - heatmapData.chest) * 0.4, 1, 0.5)} transparent opacity={0.4} />
            </mesh>
            <mesh position={[0, 0.9, 0.01]}>
              <planeGeometry args={[0.4, 0.2]} />
              <meshBasicMaterial color={new THREE.Color().setHSL((1 - heatmapData.waist) * 0.4, 1, 0.5)} transparent opacity={0.4} />
            </mesh>
          </group>
        )}
        <ClothingOverlay
          item={selectedItem} 
          widthScale={1}
          shapeScale={{ shoulders: 1, waist: 1, hips: 1 }}
          clothingAnalysis={clothingAnalysis}
          useMasterpiece={isMasterpieceMode}
        />
      </group>
    </>
  );
}

// --- FULL UI COMPONENTS ---

interface ItemCardProps {
  item: ClothingItem;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended?: boolean;
  fitScore: number;
}

function ItemCard({
  item, isSelected, onSelect, isRecommended, fitScore
}: ItemCardProps) {
  const primaryColor = colorMap[item.colors?.[0] || 'Black'] || '#555';
  return (
    <motion.button
      onClick={onSelect}
      className={`flex-shrink-0 w-24 p-2 rounded-lg border transition-all snap-start ${isSelected ? 'border-cyber-lime bg-charcoal' : 'border-border-color bg-void-black hover:border-soft-gray/50'}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="aspect-square rounded-md mb-2 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
        <span className="text-2xl drop-shadow-lg">{getCategoryIcon(item.category)}</span>
        {item.isLuxury && <div className="absolute top-0 right-0 w-4 h-4 bg-luxury-gold rounded-bl flex items-center justify-center"><span className="text-[0.5rem]">✦</span></div>}
        {isRecommended && <div className="absolute top-0 left-0 rounded-br bg-cyber-lime px-1.5 py-0.5 text-[0.55rem] font-bold text-void-black">AI Pick</div>}
      </div>
      <p className="text-[0.6rem] text-pure-white truncate">{item.name}</p>
      <p className="text-[0.55rem] text-soft-gray">${item.price}</p>
      <p className="text-[0.55rem] text-cyber-lime">Fit {fitScore}%</p>
    </motion.button>
  );
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  brandName?: string;
  fitScore: number;
  recommendedSize?: string;
}

function ShareModal({ isOpen, onClose, itemName, brandName, fitScore, recommendedSize }: ShareModalProps) {
  const [hasPublished, setHasPublished] = useState(false);
  if (!isOpen) return null;

  const safeItemName = itemName ?? 'this fit';
  const safeBrandName = brandName ?? 'S_FIT AI';
  const shareText = `I just tried on ${safeItemName} from ${safeBrandName} using S_FIT AI! Fit score ${fitScore}% ${recommendedSize ? `(Size ${recommendedSize})` : ''} #SFIT #VirtualTryOn #Fashion`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent('https://s-fit.ai');
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
    else if (platform === 'instagram') { navigator.clipboard.writeText(shareText); alert('Text copied for Instagram! 📱'); return; }
    else if (platform === 'kakao') shareUrl = `https://story.kakao.com/share?url=${url}&text=${encodedText}`;
    
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
    onClose();
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative glass-card p-6 max-w-sm w-full" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
        <h3 className="text-lg font-bold text-center mb-4">Share Your Fit! 📸</h3>
        <p className="text-soft-gray text-xs mb-6 text-center">{shareText}</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => handleShare('twitter')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] text-xs"><span>𝕏</span> Twitter</button>
          <button onClick={() => handleShare('facebook')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1877F2] text-xs"><span>📘</span> Facebook</button>
          <button onClick={() => handleShare('instagram')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-[#833AB4] to-[#F77737] text-xs"><span>📷</span> Instagram</button>
          <button onClick={() => handleShare('kakao')} className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#FEE500] text-black text-xs"><span>💬</span> KakaoStory</button>
        </div>
        <div className="pt-4 border-t border-border-color">
          {hasPublished ? (
            <div className="bg-cyber-lime/10 border border-cyber-lime/30 rounded-lg p-2 text-center text-[10px] text-cyber-lime font-bold">✨ Published to Community Runway!</div>
          ) : (
            <button onClick={() => { setHasPublished(true); setTimeout(() => setHasPublished(false), 3000); }} className="btn-primary w-full py-2 text-xs">✨ Publish to Community</button>
          )}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2 text-soft-gray hover:text-white transition-colors text-xs">Close</button>
      </motion.div>
    </motion.div>
  );
}

interface FitPick {
  item: ClothingItem;
  score: number;
  recommendedSize: string;
  reasons: string[];
}

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  picks: FitPick[];
  onSelect: (item: ClothingItem) => void;
}

function CompareModal({ isOpen, onClose, picks, onSelect }: CompareModalProps) {
  if (!isOpen) return null;
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative glass-card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
        <div className="flex justify-between items-center mb-6">
          <div><h3 className="text-lg font-bold">Compare AI Picks</h3><p className="text-[10px] text-soft-gray">Ranked by your unique body signals</p></div>
          <button onClick={onClose} className="text-soft-gray hover:text-white">✕</button>
        </div>
        <div className="space-y-4">
          {picks.map((pick, idx) => (
            <div key={pick.item.id} className="p-4 rounded-xl border border-border-color bg-void-black/60 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(pick.item.category)}</span>
                  <div><p className="text-xs font-bold text-white">{pick.item.name}</p><p className="text-[9px] text-soft-gray">#{idx+1} Recommendation</p></div>
                </div>
                <div className="text-right"><p className="text-cyber-lime font-bold text-sm">{pick.score}%</p><p className="text-[9px] text-soft-gray">Size {pick.recommendedSize}</p></div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {pick.reasons.map((r: string) => (<span key={r} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] text-soft-gray">{r}</span>))}
              </div>
              <button onClick={() => { onSelect(pick.item); onClose(); }} className="w-full py-2 text-[10px] font-bold uppercase tracking-wider bg-white/5 hover:bg-cyber-lime hover:text-void-black transition-all rounded-lg border border-white/10">Try this fit</button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- AI TRY-ON MODAL (WITH CINEMATIC VIEWER) ---

interface AITryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: ClothingItem | null;
  userPhotoPreview: string | null;
  onPhotoSelect: (file: File | null) => void;
  isLoading: boolean;
  result: string | null;
  error?: string | null;
  onGenerateTryOn: () => void;
}

function AITryOnModal({
  isOpen,
  onClose,
  selectedItem,
  userPhotoPreview,
  onPhotoSelect,
  isLoading,
  result,
  error,
  onGenerateTryOn
}: AITryOnModalProps) {
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void-black/80 backdrop-blur-md p-4">
            <div className="glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-pure-white flex items-center gap-2"><span className="animate-pulse">✨</span> Masterpiece Try-On</h3>
                        <p className="text-xs text-soft-gray mt-1">Hollywood-grade virtual fitting engine</p>
                    </div>
                    <button onClick={onClose} className="text-soft-gray hover:text-white text-2xl">✕</button>
                </div>

                <div className="space-y-6">
                    {!userPhotoPreview ? (
                        <div className="h-48 border-2 border-dashed border-border-color rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyber-lime/50 transition-all bg-charcoal/20" 
                             onClick={() => fileInputRef.current?.click()}>
                            <span className="text-4xl mb-2">👤</span>
                            <span className="text-sm font-medium">Upload Full Body Photo</span>
                            <span className="text-[10px] text-soft-gray mt-1">Optimal for 3D alignment</span>
                        </div>
                    ) : (
                        <div className="relative group h-40 w-full rounded-xl border border-border-color bg-charcoal/40">
                            <Image
                              src={userPhotoPreview}
                              alt="User Preview"
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 400px"
                              unoptimized
                            />
                            <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-[9px] px-3 py-1 rounded-full group-hover:opacity-100 transition-opacity">Change Photo</button>
                        </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onPhotoSelect(e.target.files?.[0] ?? null)}
                    />

                    {(result || videoUrl) && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-cyber-lime">⚡️</span><span className="text-xs font-bold uppercase tracking-wider">Analysis Result</span></div>
                                {result && <button onClick={() => { const a = document.createElement('a'); a.href = result; a.download = 'sfit-result.png'; a.click(); }} className="text-[9px] text-cyber-lime hover:underline">Download Image</button>}
                            </div>
                            {videoUrl ? (
                              <CinematicViewer videoUrl={videoUrl} posterUrl={result || undefined} className="w-full aspect-[9/16] rounded-xl shadow-2xl" />
                            ) : result && (
                                <div className="relative w-full aspect-[9/16] rounded-xl border-2 border-cyber-lime/20 shadow-xl overflow-hidden">
                                  <Image
                                    src={result}
                                    alt="AI Try-On Result"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 420px"
                                    unoptimized
                                  />
                                  <div className="absolute top-2 right-2 bg-cyber-lime/90 text-void-black text-[10px] font-bold px-2 py-0.5 rounded">ULTRA-FIT</div>
                                </div>
                            )}
                            {result && !videoUrl && (
                                <button onClick={async () => {
                                    setIsVideoLoading(true);
                                    try {
                                        const res = await fetch('/api/cinematic-try-on', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({imageUrl: result}) });
                                        const data = await res.json();
                                        if(data.success) setVideoUrl(data.videoUrl);
                                    } finally { setIsVideoLoading(false); }
                                }} disabled={isVideoLoading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-xs">
                                    {isVideoLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '🎬 Generate Cinematic Motion'}
                                </button>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px]">
                            <p className="font-bold mb-1">{error}</p>
                            {error.includes('REPLICATE') && (<div className="mt-2 text-soft-gray/70">Ensure <code className="bg-black/40 px-1 rounded">REPLICATE_API_TOKEN</code> is set in <code className="bg-black/40 px-1 rounded">.env.local</code></div>)}
                        </div>
                    )}

                    {!result && (
                        <button onClick={onGenerateTryOn} disabled={isLoading || !userPhotoPreview || !selectedItem} className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 text-xs">
                            {isLoading ? <><div className="w-4 h-4 border-2 border-void-black/30 border-t-void-black rounded-full animate-spin" /><span>Rendering...</span></> : <><span className="text-base">👕</span><span>Generate AI Masterpiece Fit</span></>}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- MAIN FITTING ROOM ---

export function FittingRoom() {
  const {
    userStats, selectedBrand, selectedItem, setSelectedItem, selectedMode, faceAnalysis, poseAnalysis,
  } = useStore();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showAITryOnModal, setShowAITryOnModal] = useState(false);
  const [aiTryOnResult, setAITryOnResult] = useState<string | null>(null);
  const [aiTryOnLoading, setAITryOnLoading] = useState(false);
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
  const [isMasterpieceMode, setIsMasterpieceMode] = useState(true);
  const [isMacroView, setIsMacroView] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('sfit-ai-auto-cycle') === 'true';
    }
    return false;
  });
  const cycleIndexRef = useRef(0);
  const [isMiniBarCollapsed, setMiniBarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('sfit-ai-picks-collapsed') === 'true';
    }
    return false;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const brandItems = useMemo(() => selectedBrand ? getItemsByBrand(selectedBrand) : [], [selectedBrand]);
  const currentItem = selectedItem || null;

  const fitScore = useMemo(() => {
    if (selectedMode === 'vibe-check' && faceAnalysis) return Math.round(Math.min(95, 60 + faceAnalysis.score * 0.4));
    if (selectedMode === 'digital-twin' && poseAnalysis) return Math.round(Math.min(98, 55 + poseAnalysis.score * 0.45));
    return 72;
  }, [selectedMode, faceAnalysis, poseAnalysis]);

  const topPicks = useMemo(() => {
    return brandItems.slice(0, 3).map(item => ({
      item,
      score: fitScore + (item.isLuxury ? 5 : 0),
      recommendedSize: 'M',
      reasons: ['Style Match', 'Best Fit']
    }));
  }, [brandItems, fitScore]);

  // Effect to sync storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sfit-ai-picks-collapsed', String(isMiniBarCollapsed));
    }
  }, [isMiniBarCollapsed]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sfit-ai-auto-cycle', String(autoCycleEnabled));
    }
  }, [autoCycleEnabled]);

  useEffect(() => {
    if (!autoCycleEnabled) return;
    if (topPicks.length < 2) return;

    const interval = window.setInterval(() => {
      cycleIndexRef.current = (cycleIndexRef.current + 1) % topPicks.length;
      const nextItem = topPicks[cycleIndexRef.current]?.item;
      if (nextItem) setSelectedItem(nextItem);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [autoCycleEnabled, topPicks, setSelectedItem]);

  const handleGenerateAITryOn = useCallback(async () => {
    if (!userPhotoPreview || !currentItem?.imageUrl) return;
    setAITryOnLoading(true);
    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhotoPreview,
          garmentImageUrl: currentItem.imageUrl,
          category: currentItem.category 
        })
      });
      const data = await response.json();
      if (data.success) setAITryOnResult(data.imageUrl);
    } catch (e) { console.error(e); }
    finally { setAITryOnLoading(false); }
  }, [userPhotoPreview, currentItem]);

  const resolvedHeight = userStats?.height ?? 170;
  const recommendedFit = useMemo(() => {
    if (!poseAnalysis?.proportions || !currentItem) return null;
    return calculateRecommendedSize(
      poseAnalysis.proportions,
      resolvedHeight,
      currentItem.brand,
      currentItem.category
    );
  }, [poseAnalysis, currentItem, resolvedHeight]);

  return (
    <div className="w-full h-full flex flex-col bg-void-black text-pure-white">
      <div className="flex-1 relative min-h-[350px]">
        {webglFailed ? (
          /* 2D Fallback View */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
            <div className="relative w-64 h-96">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 100 160" className="w-full h-full">
                  <ellipse cx="50" cy="20" rx="12" ry="15" fill="#444" />
                  <path d="M38 35 L30 80 L35 80 L40 55 L45 80 L55 80 L60 55 L65 80 L70 80 L62 35 Z" fill="#444" />
                  <path d="M35 80 L30 140 L40 140 L45 100 L50 100 L55 100 L60 140 L70 140 L65 80 Z" fill="#444" />
                </svg>
              </div>
              {currentItem && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ marginTop: currentItem.category === 'bottoms' ? '30%' : (currentItem.category === 'dresses' ? '0%' : '-20%') }}
                >
                  <div className="relative w-[70%] h-[50%]">
                    <Image
                      src={currentItem.imageUrl}
                      alt={currentItem.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 768px) 60vw, 280px"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-t from-charcoal to-transparent rounded-full opacity-50" />
            </div>
          </div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas 
              ref={canvasRef}
              shadows 
              camera={{ position: [0, 0.5, 2.8], fov: 45 }}
              gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); setWebglFailed(true); });
                gl.domElement.addEventListener('webglcontextrestored', () => setWebglFailed(false));
              }}
            >
              <PhysicsProvider>
                <Scene 
                  userStats={userStats} selectedItem={currentItem} 
                  isMasterpieceMode={isMasterpieceMode} isMacroView={isMacroView} 
                  showHeatmap={showHeatmap}
                />
              </PhysicsProvider>
              <OrbitControls enabled={!isMacroView && selectedMode !== 'digital-twin'} />
            </Canvas>
          </Suspense>
        )}
        
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button onClick={() => setIsMasterpieceMode(!isMasterpieceMode)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${isMasterpieceMode ? 'bg-cyber-lime text-black border-cyber-lime' : 'bg-black/50 text-gray-400 border-gray-600'}`}>
                {isMasterpieceMode ? '✨ Masterpiece ON' : '🌑 Masterpiece OFF'}
            </button>
            <button onClick={() => setIsMacroView(!isMacroView)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${isMacroView ? 'bg-white text-black border-white' : 'bg-black/50 text-gray-400 border-gray-600'}`}>
                🔍 Macro View
            </button>
            <button onClick={() => setShowHeatmap(!showHeatmap)} className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${showHeatmap ? 'bg-orange-500 text-white border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-black/50 text-gray-400 border-gray-600'}`}>
                🔥 Fit Heatmap
            </button>
        </div>

        {/* Rotation hint */}
        {!webglFailed && (
          <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-soft-gray/60 text-xs bg-void-black/50 px-3 py-1 rounded-full z-10"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <span>↔️ Drag to rotate</span>
          </motion.div>
        )}

        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={() => setShowShareModal(true)} className="bg-charcoal/60 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-charcoal/80 transition-colors">
                <span>📤</span>
            </button>
            <motion.button onClick={() => setShowAITryOnModal(true)} 
                           className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl flex items-center gap-2 border border-white/20"
                           whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <span>✨</span> AI 피팅 <span className="text-[0.6rem] bg-white/20 px-1.5 py-0.5 rounded-full">NEW</span>
            </motion.button>
        </div>

        {topPicks.length > 0 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20">
            {isMiniBarCollapsed ? (
              <div className="glass-card px-3 py-2 flex items-center justify-between gap-3">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray">AI Picks</span>
                <button onClick={() => setMiniBarCollapsed(false)} className="text-[0.55rem] text-soft-gray hover:text-white transition-colors">Show</button>
              </div>
            ) : (
              <div className="glass-card px-3 py-2 flex items-center gap-2 relative overflow-hidden">
                 <span className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray">AI Picks</span>
                 <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
                    {topPicks.map((entry) => (
                      <button key={`mini-${entry.item.id}`} onClick={() => setSelectedItem(entry.item)}
                              className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.6rem] transition-colors whitespace-nowrap ${currentItem?.id === entry.item.id ? 'border-cyber-lime text-pure-white bg-cyber-lime/10' : 'border-border-color text-soft-gray'}`}>
                        <span>{getCategoryIcon(entry.item.category)}</span>
                        <span className="max-w-[60px] truncate">{entry.item.name}</span>
                        <span className="text-cyber-lime">{entry.score}</span>
                      </button>
                    ))}
                 </div>
                 <button onClick={() => setAutoCycleEnabled(!autoCycleEnabled)} className={`text-[0.55rem] uppercase ${autoCycleEnabled ? 'text-cyber-lime' : 'text-soft-gray'}`}>
                    {autoCycleEnabled ? 'Auto On' : 'Auto Off'}
                 </button>
                 <button onClick={() => setMiniBarCollapsed(true)} className="text-[0.55rem] text-soft-gray ml-1">✕</button>
                 {autoCycleEnabled && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-lime/30"><div className="h-full bg-cyber-lime auto-cycle-bar" /></div>}
              </div>
            )}
          </div>
        )}

        {/* AI Consultant Advice Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
            <AnimatePresence>
                {currentItem && poseAnalysis?.proportions && recommendedFit && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl pointer-events-auto max-w-sm"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-cyber-lime/20 flex items-center justify-center text-cyber-lime text-xs font-bold ring-1 ring-cyber-lime/30">
                                {recommendedFit.recommendedSize}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-soft-gray font-bold">AI Recommended Fit</p>
                                <p className="text-xs font-bold text-white">Masterpiece Fit Consultant</p>
                            </div>
                        </div>
                        <ul className="space-y-1">
                            {recommendedFit.fitNotes.map((note, i) => (
                                <li key={i} className="text-[9px] text-soft-gray flex items-start gap-1.5 leading-relaxed">
                                    <span className="text-cyber-lime mt-1 flex-shrink-0">●</span>
                                    {note}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* Item Selector Footer */}
      <div className="p-4 border-t border-border-color bg-void-black">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] uppercase tracking-widest text-soft-gray">{selectedBrand} Collection</h3>
          <button onClick={() => setShowCompareModal(true)} className="text-[10px] text-cyber-lime hover:underline">Compare Picks →</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {brandItems.map((item) => (
                <ItemCard 
                    key={item.id} item={item} 
                    isSelected={currentItem?.id === item.id} 
                    onSelect={() => setSelectedItem(item)}
                    fitScore={fitScore + (item.isLuxury ? 5 : 0)}
                />
            ))}
        </div>
      </div>

      {/* AI Stylist & Complementary Items */}
      {currentItem && (
        <div className="p-4 bg-charcoal/30 border-t border-border-color">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs">🎨</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-lime">AI Stylist&apos;s Choice</span>
            </div>
            <span className="text-[8px] text-soft-gray italic">Complete the Look</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {/* These would normally come from lib/visionService.getComplementaryItems */}
            {brandItems.filter(i => i.id !== currentItem.id).slice(0, 3).map((compItem) => (
              <button key={`comp-${compItem.id}`} onClick={() => setSelectedItem(compItem)}
                        className="flex-shrink-0 w-20 p-2 rounded-lg border border-white/5 bg-void-black/40 hover:border-cyber-lime/30 transition-all text-left">
                <div className="aspect-square bg-charcoal/30 rounded flex items-center justify-center mb-1 text-base">{getCategoryIcon(compItem.category)}</div>
                <p className="text-[8px] text-pure-white truncate font-medium">{compItem.name}</p>
                <p className="text-[7px] text-soft-gray">${compItem.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        itemName={currentItem?.name} 
        brandName={currentItem?.brand} 
        fitScore={fitScore}
        recommendedSize={recommendedFit?.recommendedSize}
      />
      <CompareModal isOpen={showCompareModal} onClose={() => setShowCompareModal(false)} picks={topPicks} onSelect={setSelectedItem} />
      <AITryOnModal
        isOpen={showAITryOnModal}
        onClose={() => { setShowAITryOnModal(false); setAITryOnResult(null); }}
        selectedItem={currentItem}
        userPhotoPreview={userPhotoPreview}
        onPhotoSelect={(file) => {
          if (!file) return;
          setUserPhotoPreview(URL.createObjectURL(file));
        }}
        isLoading={aiTryOnLoading}
        result={aiTryOnResult}
        onGenerateTryOn={handleGenerateAITryOn}
      />
    </div>
  );
}
