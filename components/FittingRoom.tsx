'use client';

// S_FIT AI - 3D Fitting Room Component
// React Three Fiber based virtual fitting room with enhanced clothing visualization

import { Suspense, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  useTexture,
  SpotLight,
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemsByBrand, ClothingItem } from '@/data/mockData';
import type { PoseProportions } from '@/lib/mediapipe';
import { calculateRecommendedSize, getComplementaryItems, ClothingStyleAnalysis } from '@/lib/visionService';
import * as THREE from 'three';

// Masterpiece Components
import { FabricMaterial } from './masterpiece/FabricMaterial';
import { StudioStage } from './masterpiece/StudioStage';
import { FabricType } from './masterpiece/types';

// Loading Component
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-void-black">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-soft-gray border-t-cyber-lime rounded-full animate-spin mb-4" />
        <p className="text-soft-gray text-sm">Loading Masterpiece Engine...</p>
      </div>
    </div>
  );
}

// Color mapping for items
const colorMap: Record<string, string> = {
  'Black': '#1a1a1a',
  'White': '#f5f5f5',
  'Navy': '#1a2744',
  'Beige': '#d4c4a8',
  'Camel': '#c19a6b',
  'Gray': '#6b6b6b',
  'Cream': '#fffdd0',
  'Brown': '#5c4033',
  'Red': '#b22222',
  'Blue': '#2563eb',
  'Pink': '#ec4899',
  'Green': '#16a34a',
};

// Helper to map analysis type to Masterpiece FabricType
function mapToFabricType(analysisType?: string): FabricType {
  const type = analysisType?.toLowerCase() || 'cotton';
  if (type.includes('silk')) return 'silk';
  if (type.includes('denim') || type.includes('jean')) return 'denim';
  if (type.includes('wool') || type.includes('knit') || type.includes('cashmere')) return 'wool';
  if (type.includes('leather')) return 'leather';
  return 'cotton'; // Default including linen, polyester
}

export const getCategoryIcon = (category: ClothingItem['category']) => {
  switch (category) {
    case 'tops':
      return '👔';
    case 'bottoms':
      return '👖';
    case 'outerwear':
      return '🧥';
    case 'dresses':
      return '👗';
    default:
      return '👔';
  }
};

// 3D Mannequin Body Component with skin color
function Mannequin({ 
  height = 170, 
  weight = 65, 
  bodyShape = 'rectangle',
  proportions = null,
  opacity = 1.0,
}: { 
  height?: number; 
  weight?: number; 
  bodyShape?: string;
  proportions?: PoseProportions | null;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Calculate body proportions based on stats
  const scale = height / 170;
  const bmi = weight / Math.pow(height / 100, 2);
  let widthScale = Math.min(1.3, Math.max(0.8, bmi / 22));

  if (proportions?.overallRatio) {
    const averageRatio = 0.25;
    const ratioAdjustment = proportions.overallRatio / averageRatio;
    widthScale *= Math.min(1.2, Math.max(0.8, ratioAdjustment));
  }
  
  const getBodyShapeScale = () => {
    switch (bodyShape) {
      case 'hourglass': return { shoulders: 1.0, waist: 0.8, hips: 1.0 };
      case 'pear': return { shoulders: 0.9, waist: 0.9, hips: 1.1 };
      case 'apple': return { shoulders: 1.0, waist: 1.1, hips: 0.9 };
      case 'inverted-triangle': return { shoulders: 1.1, waist: 0.9, hips: 0.85 };
      default: return { shoulders: 1.0, waist: 1.0, hips: 1.0 };
    }
  };
  
  const shapeScale = getBodyShapeScale();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const skinMaterial = (
    <meshStandardMaterial 
      color="#e0b8a0"
      roughness={0.6}
      metalness={0.0}
      transparent={opacity < 1.0}
      opacity={opacity}
    />
  );

  return (
    <group ref={meshRef} scale={[scale, scale, scale]}>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.12, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0, 1.32, 0]} scale={[shapeScale.shoulders * widthScale, 1, 1]}>
        <boxGeometry args={[0.48, 0.08, 0.2]} />
        {skinMaterial}
      </mesh>
      <mesh position={[-0.32 * shapeScale.shoulders * widthScale, 1.15, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.045, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[-0.38 * shapeScale.shoulders * widthScale, 0.82, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[-0.42 * shapeScale.shoulders * widthScale, 0.52, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0.32 * shapeScale.shoulders * widthScale, 1.15, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.045, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0.38 * shapeScale.shoulders * widthScale, 0.82, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0.42 * shapeScale.shoulders * widthScale, 0.52, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {skinMaterial}
      </mesh>
    </group>
  );
}

// 2.5D Mockup Clothing Components with Masterpiece Support
interface ClothingProps {
  item: ClothingItem;
  isLuxury?: boolean;
  widthScale?: number;
  shapeScale?: { shoulders: number; waist: number; hips: number };
  fabricType?: FabricType;
  useMasterpiece?: boolean;
}

function TopClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton', useMasterpiece = false }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.65;

  return (
    <mesh position={[0, 0.95, 0.1]} renderOrder={2} castShadow receiveShadow>
      <planeGeometry args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 64, 64]} />
      {useMasterpiece ? (
        <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
      ) : (
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.7}
          metalness={item.isLuxury ? 0.3 : 0.1}
        />
      )}
    </mesh>
  );
}

function BottomsClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton', useMasterpiece = false }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.55;

  return (
    <mesh position={[0, 0.35, 0.1]} renderOrder={2} castShadow receiveShadow>
      <planeGeometry args={[baseWidth * widthScale * shapeScale.hips, (baseWidth * widthScale * shapeScale.hips) / aspect, 64, 64]} />
      {useMasterpiece ? (
        <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
      ) : (
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      )}
    </mesh>
  );
}

function DressClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton', useMasterpiece = false }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.65;

  return (
    <mesh position={[0, 0.65, 0.1]} renderOrder={2} castShadow receiveShadow>
      <planeGeometry args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 64, 64]} />
      {useMasterpiece ? (
        <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
      ) : (
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.5}
          metalness={item.isLuxury ? 0.2 : 0.0}
        />
      )}
    </mesh>
  );
}

function OuterwearClothing({ item, widthScale = 1, shapeScale = { shoulders: 1, waist: 1, hips: 1 }, fabricType = 'cotton', useMasterpiece = false }: ClothingProps) {
  const texture = useTexture(item.textureUrl || item.imageUrl);
  const img = texture.image as HTMLImageElement;
  const aspect = img ? img.width / img.height : 1;
  const baseWidth = 0.70;

  return (
    <mesh position={[0, 0.95, 0.15]} renderOrder={3} castShadow receiveShadow>
      <planeGeometry args={[baseWidth * widthScale * shapeScale.shoulders, (baseWidth * widthScale * shapeScale.shoulders) / aspect, 64, 64]} />
      {useMasterpiece ? (
        <FabricMaterial textureUrl={item.textureUrl || item.imageUrl} fabricType={fabricType} />
      ) : (
        <meshStandardMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
          roughness={0.6}
          metalness={0.1}
        />
      )}
    </mesh>
  );
}

function FallbackPlaceholder({ position, scale }: { position: [number, number, number], scale: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshBasicMaterial color="#3a3a3a" transparent opacity={0.5} />
    </mesh>
  );
}

function ClothingOverlay({ 
  item, 
  isLuxury, 
  widthScale,
  shapeScale,
  clothingAnalysis,
  useMasterpiece
}: {
  item: ClothingItem | null;
  isLuxury: boolean;
  widthScale: number;
  shapeScale: { shoulders: number; waist: number; hips: number };
  clothingAnalysis?: ClothingStyleAnalysis | null; 
  useMasterpiece: boolean;
}) {
  if (!item) return null;

  const fabricType = mapToFabricType(clothingAnalysis?.materialType);

  return (
    <Suspense fallback={<FallbackPlaceholder position={[0, 0.7, 0.1]} scale={[0.5, 0.7, 0.02]} />}>
      {item.category === 'tops' && <TopClothing item={item} isLuxury={isLuxury} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} useMasterpiece={useMasterpiece} />}
      {item.category === 'bottoms' && <BottomsClothing item={item} isLuxury={isLuxury} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} useMasterpiece={useMasterpiece} />}
      {item.category === 'dresses' && <DressClothing item={item} isLuxury={isLuxury} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} useMasterpiece={useMasterpiece} />}
      {item.category === 'outerwear' && <OuterwearClothing item={item} isLuxury={isLuxury} widthScale={widthScale} shapeScale={shapeScale} fabricType={fabricType} useMasterpiece={useMasterpiece} />}
    </Suspense>
  );
}

function Platform() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
      <circleGeometry args={[1, 64]} />
      <meshStandardMaterial color="#0d0d0d" roughness={0.9} opacity={0.5} transparent />
    </mesh>
  );
}

function BackgroundImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  
  const distToBg = (camera.position.z - (-5));
  const distToViewport = camera.position.z;
  const scaleFactor = distToBg / distToViewport;

  const img = texture.image as HTMLImageElement;
  const ratio = img ? img.width / img.height : 0.75;
  const scaleY = viewport.height * scaleFactor;
  const scaleX = scaleY * ratio;

  return (
    <mesh position={[0, 0, -5]} scale={[scaleX, scaleY, 1]}> 
      <planeGeometry />
      <meshBasicMaterial 
        map={texture} 
        transparent={false} 
        opacity={1.0}
        toneMapped={false} 
      />
    </mesh>
  );
}

// Macro Camera Controller
function MacroController({ active }: { active: boolean }) {
  const { camera } = useThree();
  const initialPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 2.8));

  useFrame((state) => {
    const targetPos = active
      ? new THREE.Vector3(0, 0.9, 1.2) // Zoom in on chest/fabric
      : initialPos.current;

    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(0, active ? 0.9 : 0.5, 0);
  });

  return null;
}

// Scene Component
function Scene({ 
  userStats, 
  selectedItem, 
  isLuxury,
  isMasterpieceMode,
  isMacroView
}: { 
  userStats: { height: number; weight: number; bodyShape: string } | null;
  selectedItem: ClothingItem | null;
  isLuxury: boolean;
  isMasterpieceMode: boolean;
  isMacroView: boolean;
}) {
  const { poseAnalysis, clothingAnalysis, selfieData, selectedMode } = useStore();
  const landmarks = poseAnalysis?.landmarks;
  const viewport = useThree((state) => state.viewport);
  
  const height = userStats?.height || 170;
  const scale = height / 170;
  const fabricType = mapToFabricType(clothingAnalysis?.materialType);

  let mannequinPosition: [number, number, number] = [0, -0.9, 0];
  
  if (selectedMode === 'digital-twin' && selfieData.fullBodyImage && landmarks && landmarks.length >= 24) {
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    
    if (leftHip && rightHip) {
      const cx = (leftHip.x + rightHip.x) / 2;
      const cy = (leftHip.y + rightHip.y) / 2;
      const x = (cx - 0.5) * viewport.width;
      const y = (0.5 - cy) * viewport.height; 
      mannequinPosition = [x, y - (0.6 * scale), 0]; 
    }
  }

  return (
    <>
      <MacroController active={isMacroView} />

      {/* Dynamic Lighting Switch */}
      {isMasterpieceMode ? (
        <StudioStage fabricType={fabricType} />
      ) : (
        <>
          <ambientLight intensity={0.8} />
          <SpotLight
            position={[5, 10, 7.5]}
            angle={0.3}
            penumbra={1}
            intensity={200}
            castShadow
            shadow-bias={-0.0001}
          />
          <Environment preset="studio" blur={0.8} />
        </>
      )}
      
      {selectedMode === 'digital-twin' && selfieData.fullBodyImage && (
        <Suspense fallback={null}>
          <BackgroundImage imageUrl={selfieData.fullBodyImage} />
        </Suspense>
      )}

      <group position={mannequinPosition} scale={[scale, scale, scale]}>
        {selectedMode !== 'digital-twin' && (
           <Mannequin
             height={height}
             weight={userStats?.weight || 65}
             bodyShape={userStats?.bodyShape || 'rectangle'}
             proportions={poseAnalysis?.proportions}
           />
        )}
        
        {selectedMode === 'digital-twin' && (
             <Mannequin
               height={height}
               weight={userStats?.weight || 65}
               bodyShape={userStats?.bodyShape || 'rectangle'}
               proportions={poseAnalysis?.proportions}
               opacity={0.2}
             />
        )}

        <ClothingOverlay 
          item={selectedItem} 
          isLuxury={isLuxury} 
          widthScale={1}
          shapeScale={{ shoulders: 1, waist: 1, hips: 1 }}
          clothingAnalysis={clothingAnalysis}
          useMasterpiece={isMasterpieceMode}
        />
      </group>
      
      {selectedMode !== 'digital-twin' && (
        <>
          <Platform />
          <ContactShadows
            position={[0, -0.29, 0]}
            opacity={0.5}
            scale={2.5}
            blur={2}
            far={1.5}
          />
        </>
      )}
    </>
  );
}

function ItemCard({ item, isSelected, onSelect, isRecommended, recommendedSize, fitScore, reasons, rank }: any) {
    const primaryColor = colorMap[item.colors?.[0] || 'Black'] || '#555';
    return (
      <motion.button onClick={onSelect} className={`flex-shrink-0 w-24 p-2 rounded-lg border transition-all snap-start scroll-ml-4 ${isSelected ? 'border-cyber-lime bg-charcoal' : 'border-border-color bg-void-black hover:border-soft-gray/50'}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="aspect-square rounded-md mb-2 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
          <span className="text-2xl drop-shadow-lg">{getCategoryIcon(item.category)}</span>
          {item.isLuxury && <div className="absolute top-0 right-0 w-4 h-4 bg-luxury-gold rounded-bl flex items-center justify-center"><span className="text-[0.5rem]">✦</span></div>}
          {isRecommended && <div className="absolute top-0 left-0 rounded-br bg-cyber-lime px-1.5 py-0.5 text-[0.55rem] font-bold text-void-black">AI Pick</div>}
          {typeof rank === 'number' && <div className="absolute bottom-0 right-0 rounded-tl bg-void-black/70 px-1.5 py-0.5 text-[0.55rem] text-soft-gray">#{rank}</div>}
        </div>
        <p className="text-[0.6rem] text-pure-white truncate">{item.name}</p>
        <p className="text-[0.55rem] text-soft-gray">${item.price}</p>
        <p className="text-[0.55rem] text-soft-gray">Fit {fitScore}</p>
        {recommendedSize && <p className="text-[0.55rem] text-cyber-lime">Size {recommendedSize}</p>}
      </motion.button>
    );
}

function ShareModal({ isOpen, onClose, itemName, brandName, fitScore, recommendedSize }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-sm" onClick={onClose}>
            <div className="glass-card p-6 max-w-sm w-full">
                <h3 className="text-lg font-bold text-pure-white mb-4">Share Your Fit!</h3>
                <p className="text-soft-gray text-sm mb-4">{`I tried on ${itemName} from ${brandName}!`}</p>
                <button onClick={onClose} className="w-full py-2 bg-cyber-lime text-void-black rounded">Close</button>
            </div>
        </div>
    );
}
function CompareModal({ isOpen, onClose, picks, onSelect }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void-black/80 backdrop-blur-sm" onClick={onClose}>
             <div className="glass-card p-6 max-w-md w-full relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white">X</button>
                <h3 className="text-lg font-bold text-pure-white mb-4">Compare</h3>
                <div className="space-y-2">
                    {picks.map((p: any) => (
                        <div key={p.item.id} className="p-2 border border-white/20 rounded cursor-pointer" onClick={() => { onSelect(p.item); onClose(); }}>
                            {p.item.name} - Score {p.score}
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
}

// AI Try-On Modal Component
function AITryOnModal({
  isOpen,
  onClose,
  selectedItem,
  userPhotoPreview,
  onPhotoSelect,
  isLoading,
  result,
  error,
  onGenerateTryOn,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: ClothingItem | null;
  userPhotoPreview: string | null;
  onPhotoSelect: (file: File) => void;
  isLoading: boolean;
  result: string | null;
  error: string | null;
  onGenerateTryOn: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    if (!result) return;
    setIsVideoLoading(true);
    try {
        const res = await fetch('/api/runway-motion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: result, upscale: true })
        });
        const data = await res.json();
        if (data.success) setVideoUrl(data.videoUrl);
        else alert('Video generation failed: ' + data.error);
    } catch (e) {
        alert('Network error');
    } finally {
        setIsVideoLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-void-black/90 backdrop-blur-md" onClick={onClose} />
      <motion.div
        className="relative glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-pure-white flex items-center gap-2">
              <span>✨</span> AI Virtual Try-On
            </h3>
            <p className="text-xs text-soft-gray/70">Masterpiece AI Engine</p>
          </div>
          <button onClick={onClose} className="text-soft-gray hover:text-pure-white text-xl">✕</button>
        </div>

        {/* Step 1: Upload User Photo */}
        <div className="mb-4">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if(f) onPhotoSelect(f); }} className="hidden" />
          {userPhotoPreview ? (
            <div className="relative">
              <img src={userPhotoPreview} alt="User photo" className="w-full h-48 object-contain rounded-lg border border-border-color bg-charcoal/30" />
              <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-2 right-2 bg-void-black/80 text-pure-white text-xs px-2 py-1 rounded">Change</button>
            </div>
          ) : (
            <button onClick={() => fileInputRef.current?.click()} className="w-full h-32 border-2 border-dashed border-border-color rounded-lg flex flex-col items-center justify-center gap-2 hover:border-cyber-lime/50 transition-colors">
              <span className="text-3xl">📷</span>
              <span className="text-sm text-soft-gray">Upload Full Body Photo</span>
            </button>
          )}
        </div>

        {/* Result Image */}
        {result && (
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider text-cyber-lime mb-2 block">✨ Result</label>
            <img src={result} alt="AI Try-On Result" className="w-full rounded-lg border border-cyber-lime/30" />

            {/* Runway Motion Button */}
            {!videoUrl ? (
                <button
                    onClick={handleGenerateVideo}
                    disabled={isVideoLoading}
                    className="w-full mt-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                    {isVideoLoading ? 'Generating Runway Video...' : '🎬 Generate Runway Motion (3-5s)'}
                </button>
            ) : (
                <div className="mt-3">
                    <label className="text-xs uppercase tracking-wider text-purple-400 mb-2 block">🎬 Runway Motion</label>
                    <video src={videoUrl} controls autoPlay loop className="w-full rounded-lg border border-purple-500/30" />
                </div>
            )}
          </div>
        )}

        {/* Generate Button */}
        {!result && (
            <button
            onClick={onGenerateTryOn}
            disabled={isLoading || !userPhotoPreview || !selectedItem}
            className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isLoading || !userPhotoPreview || !selectedItem
                ? 'bg-charcoal text-soft-gray cursor-not-allowed'
                : 'bg-gradient-to-r from-cyber-lime to-green-400 text-void-black hover:opacity-90'
            }`}
            >
            {isLoading ? 'Generating Fit...' : 'Generate Try-On'}
            </button>
        )}
      </motion.div>
    </motion.div>
  );
}

// Main Fitting Room Component
export function FittingRoom() {
  const {
    userStats,
    selectedBrand,
    selectedItem,
    setSelectedItem,
    selectedMode,
    faceAnalysis,
    poseAnalysis,
    clothingAnalysis,
  } = useStore();
  const [isRotating, setIsRotating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showAITryOnModal, setShowAITryOnModal] = useState(false);
  const [aiTryOnResult, setAITryOnResult] = useState<string | null>(null);
  const [aiTryOnLoading, setAITryOnLoading] = useState(false);
  const [aiTryOnError, setAITryOnError] = useState<string | null>(null);
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null);
  const [userPhotoPreview, setUserPhotoPreview] = useState<string | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isMiniBarCollapsed, setMiniBarCollapsed] = useState(false);

  // Masterpiece State
  const [isMasterpieceMode, setIsMasterpieceMode] = useState(true);
  const [isMacroView, setIsMacroView] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const brandItems = useMemo(() => {
    return selectedBrand ? getItemsByBrand(selectedBrand) : [];
  }, [selectedBrand]);
  
  let currentItem: ClothingItem | null = selectedItem || null;

  // Restore full logic for item scoring
  const getRecommendedData = useCallback((sizes: string[] | undefined, stats: any, item?: ClothingItem) => {
    if (!sizes?.length || !stats) return { size: null, score: 75, reasons: ['Standard sizing'] };

    if (poseAnalysis?.proportions && stats.height && item) {
      const masterpiece = calculateRecommendedSize(poseAnalysis.proportions, stats.height, item.brand, item.category, clothingAnalysis);
      return {
        size: masterpiece.recommendedSize,
        score: Math.round(masterpiece.confidence),
        reasons: masterpiece.fitNotes
      };
    }

    // Basic BMI fallback
    const bmi = stats.weight / Math.pow(stats.height / 100, 2);
    let baseScore = 80;
    if (bmi > 25 || bmi < 18.5) baseScore -= 5;

    return { size: sizes[0], score: baseScore, reasons: ['Based on height/weight'] };
  }, [poseAnalysis, clothingAnalysis]);

  // Re-enable item scoring logic
  const { scoredItemsById, topPicks, topPickRanks, sortedItems, recommendedItemId } = useMemo(() => {
      const scored = brandItems.map(item => {
          const data = getRecommendedData(item.sizes, userStats, item);
          return {
              item,
              score: data.score,
              recommendedSize: data.size,
              reasons: data.reasons
          };
      }).sort((a, b) => b.score - a.score);

     return {
         scoredItemsById: new Map(scored.map(s => [s.item.id, s])),
         topPicks: scored.slice(0,3),
         topPickRanks: new Map(scored.slice(0,3).map((s,i) => [s.item.id, i+1])),
         sortedItems: scored.map(s=>s.item),
         recommendedItemId: scored[0]?.item.id
    };
  }, [brandItems, userStats, getRecommendedData]);

  const currentData = currentItem ? scoredItemsById.get(currentItem.id) : null;
  const currentRecommendedSize = currentData?.recommendedSize || null;
  const isLuxury = currentItem?.isLuxury || false;
  const currentFitScore = currentData?.score || 85;

  const handleSelectItem = useCallback((item: ClothingItem) => {
      setSelectedItem(item);
  }, [setSelectedItem]);

  const handlePhotoSelect = useCallback((file: File) => {
    setUserPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUserPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateAITryOn = useCallback(async () => {
    if (!userPhotoPreview || !currentItem?.imageUrl) return;
    setAITryOnLoading(true);
    setAITryOnError(null);
    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhotoPreview,
          garmentImageUrl: currentItem.imageUrl,
          category: currentItem.category === 'tops' || currentItem.category === 'outerwear' ? 'upper_body' : currentItem.category === 'bottoms' ? 'lower_body' : 'dresses'
        })
      });
      const data = await response.json();
      if (data.success) setAITryOnResult(data.imageUrl);
      else setAITryOnError(data.error);
    } catch (e) { setAITryOnError('Network error'); }
    finally { setAITryOnLoading(false); }
  }, [userPhotoPreview, currentItem]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 relative min-h-[350px]">
        {webglFailed ? (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-white">WebGL Failed</div>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas
              ref={canvasRef}
              shadows
              camera={{ position: [0, 0.5, 2.8], fov: 45 }}
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
              style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
            >
              <Scene 
                userStats={userStats} 
                selectedItem={currentItem}
                isLuxury={isLuxury}
                isMasterpieceMode={isMasterpieceMode}
                isMacroView={isMacroView}
              />
              <OrbitControls enabled={!isMacroView} minDistance={1.8} maxDistance={4} autoRotate={!isMacroView} autoRotateSpeed={0.5} onStart={()=>setIsRotating(true)} onEnd={()=>setIsRotating(false)} />
            </Canvas>
          </Suspense>
        )}
        
        {/* Masterpiece Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {isLuxury && <div className="premium-badge flex items-center gap-1 self-end"><span>✦</span> LUXURY</div>}

            <button
                onClick={() => setIsMasterpieceMode(!isMasterpieceMode)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${isMasterpieceMode ? 'bg-cyber-lime text-black border-cyber-lime' : 'bg-black/50 text-gray-400 border-gray-600'}`}
            >
                {isMasterpieceMode ? '✨ Masterpiece ON' : '🌑 Masterpiece OFF'}
            </button>

            <button
                onClick={() => setIsMacroView(!isMacroView)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${isMacroView ? 'bg-white text-black border-white' : 'bg-black/50 text-gray-400 border-gray-600'}`}
            >
                {isMacroView ? '🔍 Macro View ON' : '🔍 Macro View OFF'}
            </button>
        </div>

        <motion.button
          onClick={() => setShowAITryOnModal(true)}
          className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <span>✨</span> AI Try-On
        </motion.button>
      </div>
      
      {/* Restored Details Panel */}
      {currentItem && (
        <div className="p-4 bg-charcoal/50 border-t border-border-color">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-pure-white font-medium">{currentItem.name}</h4>
                {currentItem.id === recommendedItemId && (
                  <span className="rounded-full bg-cyber-lime/20 px-2 py-0.5 text-[0.6rem] text-cyber-lime">AI Pick</span>
                )}
              </div>
              <p className="text-soft-gray text-sm">{currentItem.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-pure-white">${currentItem.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Masterpiece Insights */}
          <div className="mt-4 pt-3 border-t border-border-color/30 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs">✨</span>
              <span className="text-[0.65rem] font-bold text-pure-white uppercase tracking-wider italic">Masterpiece Fit Insight</span>
            </div>
            <p className="text-[0.65rem] text-soft-gray bg-void-black/40 px-2 py-1 rounded border-l-2 border-cyber-lime/50">
               Fabric analysis confirms {clothingAnalysis?.materialType || 'high-quality'} texture rendering.
            </p>
          </div>
        </div>
      )}

      {/* Footer Items List */}
      <div className="p-4 border-t border-border-color bg-void-black overflow-x-auto whitespace-nowrap">
        {sortedItems.map((item, idx) => (
             <button key={item.id} onClick={() => handleSelectItem(item)} className="inline-block w-20 h-20 bg-gray-800 rounded mr-2 align-top relative">
                 {item.id === currentItem?.id && <div className="absolute inset-0 border-2 border-cyber-lime rounded"></div>}
                 <div className="text-[10px] text-white p-1 truncate">{item.name}</div>
             </button>
        ))}
      </div>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} itemName={currentItem?.name} brandName="S_FIT" fitScore={currentFitScore} />
      <CompareModal isOpen={showCompareModal} onClose={() => setShowCompareModal(false)} picks={topPicks} onSelect={handleSelectItem} />
      <AITryOnModal
        isOpen={showAITryOnModal}
        onClose={() => setShowAITryOnModal(false)}
        selectedItem={currentItem}
        userPhotoPreview={userPhotoPreview}
        onPhotoSelect={handlePhotoSelect}
        isLoading={aiTryOnLoading}
        result={aiTryOnResult}
        error={aiTryOnError}
        onGenerateTryOn={handleGenerateAITryOn}
      />
    </div>
  );
}
