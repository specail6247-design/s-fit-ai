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
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { getItemsByBrand, ClothingItem } from '@/data/mockData';
import type { PoseProportions } from '@/lib/mediapipe';
import { getComplementaryItems, ClothingStyleAnalysis } from '@/lib/visionService';
import { calculateRecommendedSize } from '@/lib/sizeRecommendation';
import { ClothingBillboard } from '@/lib/clothingRenderer';
import * as THREE from 'three';

// Loading Component
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

  // If we have AI proportions, refine the widthScale
  if (proportions?.overallRatio) {
    const averageRatio = 0.25;
    const ratioAdjustment = proportions.overallRatio / averageRatio;
    widthScale *= Math.min(1.2, Math.max(0.8, ratioAdjustment));
  }
  
  // Body shape adjustments
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
  
  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      // Small idle sway
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  // Skin-tone material
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
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        {skinMaterial}
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.12, 16]} />
        {skinMaterial}
      </mesh>
      
      {/* Shoulders (visible) */}
      <mesh position={[0, 1.32, 0]} scale={[shapeScale.shoulders * widthScale, 1, 1]}>
        <boxGeometry args={[0.48, 0.08, 0.2]} />
        {skinMaterial}
      </mesh>
      
      {/* Arms - visible skin */}
      {/* Left Arm */}
      <mesh position={[-0.32 * shapeScale.shoulders * widthScale, 1.15, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.045, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[-0.38 * shapeScale.shoulders * widthScale, 0.82, 0]} rotation={[0, 0, 0.1]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      {/* Left Hand */}
      <mesh position={[-0.42 * shapeScale.shoulders * widthScale, 0.52, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {skinMaterial}
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.32 * shapeScale.shoulders * widthScale, 1.15, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.045, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      <mesh position={[0.38 * shapeScale.shoulders * widthScale, 0.82, 0]} rotation={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.04, 0.28, 8, 16]} />
        {skinMaterial}
      </mesh>
      {/* Right Hand */}
      <mesh position={[0.42 * shapeScale.shoulders * widthScale, 0.52, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        {skinMaterial}
      </mesh>
    </group>
  );
}

// Fallback placeholder when texture fails to load
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
}: {
  item: ClothingItem | null;
  isLuxury: boolean;
  widthScale: number;
  shapeScale: { shoulders: number; waist: number; hips: number };
  clothingAnalysis?: ClothingStyleAnalysis | null; 
}) {
  if (!item) return null;

  return (
    <Suspense fallback={<FallbackPlaceholder position={[0, 0.7, 0.1]} scale={[0.5, 0.7, 0.02]} />}>
       <ClothingBillboard
         item={item}
         isLuxury={isLuxury}
         widthScale={widthScale}
         shapeScale={shapeScale}
         position={[0, 0, item.category === 'outerwear' ? 0.15 : 0.1]}
       />
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

// Improved Background Image
// Uses high opacity and proper scaling to be clearly visible
function BackgroundImage({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  
  // Calculate scale factor to fill screen at z=-5
  // Camera is at z=2.8 roughly (default) or whatever is set in Canvas
  const distToBg = (camera.position.z - (-5));
  const distToViewport = camera.position.z; // viewport is at 0
  const scaleFactor = distToBg / distToViewport;

  const img = texture.image as HTMLImageElement;
  // Fit background to cover screen
  const ratio = img ? img.width / img.height : 0.75;
  const scaleY = viewport.height * scaleFactor;
  const scaleX = scaleY * ratio;

  return (
    <mesh position={[0, 0, -5]} scale={[scaleX, scaleY, 1]}> 
      <planeGeometry />
      <meshBasicMaterial 
        map={texture} 
        transparent={false} 
        opacity={1.0} // Full visibility
        toneMapped={false} 
      />
    </mesh>
  );
}

// Scene Component containing the logic
function Scene({ 
  userStats, 
  selectedItem, 
  isLuxury 
}: { 
  userStats: { height: number; weight: number; bodyShape: string } | null;
  selectedItem: ClothingItem | null;
  isLuxury: boolean;
}) {
  const { poseAnalysis, clothingAnalysis, selfieData, selectedMode } = useStore();
  const landmarks = poseAnalysis?.landmarks;
  const viewport = useThree((state) => state.viewport);
  
  const height = userStats?.height || 170;
  const scale = height / 170;

  // Calculate alignment position
  let mannequinPosition: [number, number, number] = [0, -0.9, 0];
  
  // If we have landmarks, align using viewport logic
  if (selectedMode === 'digital-twin' && selfieData.fullBodyImage && landmarks && landmarks.length >= 24) {
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    
    if (leftHip && rightHip) {
      // Background Image fills viewport at z=-5?
      // Wait, BackgroundImage logic above uses `viewport.height` and `scaleY`.
      // If we put background at z=-5, and scale it to fill viewport, it visually fills the screen.
      // But 3D objects at z=0 need to align with "image features" as seen by camera.
      // Since camera is perspective, and we match background to viewport size,
      // mapping normalized coordinates (0-1) to (viewport.width, viewport.height) at z=0 usually works well for UI overlay feel.
      // BUT, BackgroundImage is at z=-5.
      
      const cx = (leftHip.x + rightHip.x) / 2;
      const cy = (leftHip.y + rightHip.y) / 2;
      
      // Calculate world position at z=0 corresponding to image coordinates
      // Map 0..1 to -viewport.width/2 .. viewport.width/2
      
      // Image X increases left to right. ThreeJS X increases left to right.
      // Image Y increases top to bottom (0 at top). ThreeJS Y increases bottom to top (0 at center).
      
      const x = (cx - 0.5) * viewport.width;
      const y = (0.5 - cy) * viewport.height; 
      
      // Mannequin hips in local space are approx at Y +0.6 (waist/hips)
      // So if we want hips at world 'y', we place mannequin root at y - 0.6.
      
      // Scale correction: MediaPipe landmarks are normalized.
      // If background fills viewport, then we use full viewport dimensions.
      // Adjust slightly for perspective if needed, but z=0 is standard plane.
      
      mannequinPosition = [x, y - (0.6 * scale), 0]; 
    }
  }

  return (
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
      
      {/* Background for Digital Twin */}
      {selectedMode === 'digital-twin' && selfieData.fullBodyImage && (
        <Suspense fallback={null}>
          <BackgroundImage imageUrl={selfieData.fullBodyImage} />
        </Suspense>
      )}

      {/* Main content */}
      <group position={mannequinPosition} scale={[scale, scale, scale]}>
        {/* Only show Mannequin Ghost if needed for reference, or hide it to just show clothes */}
        {selectedMode !== 'digital-twin' && (
           <Mannequin
             height={height}
             weight={userStats?.weight || 65}
             bodyShape={userStats?.bodyShape || 'rectangle'}
             proportions={poseAnalysis?.proportions}
           />
        )}
        
        {/* If Digital Twin, show faint outline */}
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

// Item Card Component
function ItemCard({
  item,
  isSelected,
  onSelect,
  isRecommended,
  recommendedSize,
  fitScore,
  reasons,
  rank,
}: {
  item: ClothingItem;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended: boolean;
  recommendedSize: string | null;
  fitScore: number;
  reasons: string[];
  rank?: number;
}) {
  const primaryColor = colorMap[item.colors?.[0] || 'Black'] || '#555';
  
  return (
    <motion.button
      onClick={onSelect}
      className={`
        flex-shrink-0 w-24 p-2 rounded-lg border transition-all snap-start scroll-ml-4
        ${isSelected
          ? 'border-cyber-lime bg-charcoal'
          : 'border-border-color bg-void-black hover:border-soft-gray/50'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="aspect-square rounded-md mb-2 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: primaryColor }}
      >
        <span className="text-2xl drop-shadow-lg">
          {getCategoryIcon(item.category)}
        </span>
        {item.isLuxury && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-luxury-gold rounded-bl flex items-center justify-center">
            <span className="text-[0.5rem]">✦</span>
          </div>
        )}
        {isRecommended && (
          <div className="absolute top-0 left-0 rounded-br bg-cyber-lime px-1.5 py-0.5 text-[0.55rem] font-bold text-void-black">
            AI Pick
          </div>
        )}
        {typeof rank === 'number' && (
          <div className="absolute bottom-0 right-0 rounded-tl bg-void-black/70 px-1.5 py-0.5 text-[0.55rem] text-soft-gray">
            #{rank}
          </div>
        )}
      </div>
      <p className="text-[0.6rem] text-pure-white truncate">{item.name}</p>
      <p className="text-[0.55rem] text-soft-gray">${item.price}</p>
      <p className="text-[0.55rem] text-soft-gray">Fit {fitScore}</p>
      {recommendedSize && (
        <p className="text-[0.55rem] text-cyber-lime">Size {recommendedSize}</p>
      )}
      {reasons.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {reasons.slice(0, 2).map((reason) => (
            <span
              key={reason}
              className="rounded-full border border-border-color px-1.5 py-0.5 text-[0.5rem] text-soft-gray/80"
            >
              {reason}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
}

// SNS Share Modal Component
function ShareModal({ 
  isOpen, 
  onClose, 
  itemName, 
  brandName,
  fitScore,
  recommendedSize,
}: { 
  isOpen: boolean; 
  onClose: () => void;
  itemName: string;
  brandName: string;
  fitScore?: number;
  recommendedSize?: string | null;
}) {
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasPublished, setHasPublished] = useState(false);

  const details = [
    typeof fitScore === 'number' ? `Fit score ${fitScore}/100` : null,
    recommendedSize ? `Size ${recommendedSize}` : null,
  ].filter(Boolean);
  const detailText = details.length ? ` ${details.join(' • ')}.` : '';
  const shareText = `I just tried on ${itemName} from ${brandName} using S_FIT AI!${detailText} #SFIT #VirtualTryOn #Fashion`;
  
  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent('https://s-fit.ai');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
        break;
      case 'instagram':
        navigator.clipboard.writeText(shareText);
        alert('Text copied! Open Instagram to share your fitting result! 📱');
        return;
      case 'kakao':
        shareUrl = `https://story.kakao.com/share?url=${url}&text=${encodedText}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative glass-card p-6 max-w-sm w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <h3 className="text-lg font-bold text-pure-white mb-4 text-center">Share Your Fit! 📸</h3>
        <p className="text-soft-gray text-sm mb-6 text-center">{shareText}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1DA1F2] hover:bg-[#1a8cd8] transition-colors"
          >
            <span>𝕏</span>
            <span className="text-sm">Twitter</span>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] transition-colors"
          >
            <span>📘</span>
            <span className="text-sm">Facebook</span>
          </button>
          <button
            onClick={() => handleShare('instagram')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 transition-opacity"
          >
            <span>📷</span>
            <span className="text-sm">Instagram</span>
          </button>
          <button
            onClick={() => handleShare('kakao')}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#FEE500] text-black hover:bg-[#e6cf00] transition-colors"
          >
            <span>💬</span>
            <span className="text-sm">KakaoStory</span>
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border-color">
          {hasPublished ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-cyber-lime/10 border border-cyber-lime/30 rounded-lg p-3 text-center"
            >
              <p className="text-cyber-lime text-xs font-bold">✨ Published to Community Runway!</p>
              <p className="text-[10px] text-soft-gray mt-1">Your fit is now visible to others.</p>
            </motion.div>
          ) : (
            <button
              onClick={() => {
                setIsPublishing(true);
                setTimeout(() => {
                  setIsPublishing(false);
                  setHasPublished(true);
                }, 1500);
              }}
              disabled={isPublishing}
              className="btn-primary w-full flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {isPublishing ? (
                <>
                  <div className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <span>✨</span> Publish to Community
                </>
              )}
            </button>
          )}
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-soft-gray hover:text-pure-white transition-colors text-sm"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function CompareModal({
  isOpen,
  onClose,
  picks,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  picks: Array<{
    item: ClothingItem;
    score: number;
    recommendedSize: string | null;
    reasons: string[];
  }>;
  onSelect: (item: ClothingItem) => void;
}) {
  if (!isOpen) return null;

  const topScore = picks[0]?.score ?? 0;
  const getSummary = (score: number, reasons: string[]) => {
    const detail = reasons.length ? reasons.join(' · ') : 'Best overall match';
    if (score === topScore) {
      return `Top fit score · ${detail}`;
    }
    if (topScore - score <= 3) {
      return `Close second · ${detail}`;
    }
    return `Alternate fit · ${detail}`;
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-void-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative glass-card p-6 max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-pure-white">Compare AI Picks</h3>
            <p className="text-xs text-soft-gray/70">Quick compare top matches.</p>
          </div>
          <button
            onClick={onClose}
            className="text-soft-gray hover:text-pure-white text-sm"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {picks.map((pick, index) => (
            <div
              key={`compare-${pick.item.id}`}
              className="rounded-lg border border-border-color bg-void-black/60 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getCategoryIcon(pick.item.category)}</span>
                    <p className="text-sm text-pure-white font-medium">{pick.item.name}</p>
                    <span className="text-[0.6rem] text-soft-gray">#{index + 1}</span>
                  </div>
                  <p className="text-xs text-soft-gray">{pick.item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-pure-white">{pick.score} / 100</p>
                  {pick.recommendedSize && (
                    <p className="text-[0.65rem] text-cyber-lime">Size {pick.recommendedSize}</p>
                  )}
                </div>
              </div>
              {pick.item.colors?.length ? (
                <div className="flex items-center gap-2 mt-2">
                  {pick.item.colors.map((color) => (
                    <span
                      key={color}
                      className="h-3 w-3 rounded-full border border-white/20"
                      style={{ backgroundColor: colorMap[color] || '#555' }}
                      title={color}
                    />
                  ))}
                  <span className="text-[0.6rem] text-soft-gray">
                    {pick.item.colors.join(' / ')}
                  </span>
                </div>
              ) : null}
              {pick.reasons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {pick.reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-border-color px-2 py-1 text-[0.6rem] text-soft-gray/80"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-[0.65rem] text-soft-gray/70 mt-2">
                {getSummary(pick.score, pick.reasons)}
              </p>
              <button
                onClick={() => {
                  onSelect(pick.item);
                  onClose();
                }}
                className="btn-secondary w-full mt-3"
              >
                Try this fit
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
    }
  };

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
            <p className="text-xs text-soft-gray/70">인스타그램에서 본 그 AI 피팅!</p>
          </div>
          <button
            onClick={onClose}
            className="text-soft-gray hover:text-pure-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Step 1: Upload User Photo */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-wider text-soft-gray mb-2 block">
            1. 전신 사진 업로드
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {userPhotoPreview ? (
            <div className="relative">
              <img
                src={userPhotoPreview}
                alt="User photo"
                className="w-full h-48 object-contain rounded-lg border border-border-color bg-charcoal/30"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-void-black/80 text-pure-white text-xs px-2 py-1 rounded"
              >
                변경
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 border-2 border-dashed border-border-color rounded-lg flex flex-col items-center justify-center gap-2 hover:border-cyber-lime/50 transition-colors"
            >
              <span className="text-3xl">📷</span>
              <span className="text-sm text-soft-gray">전신 사진을 업로드하세요</span>
              <span className="text-xs text-soft-gray/60">정면 전신 샷이 가장 좋아요!</span>
            </button>
          )}
        </div>

        {/* Step 2: Selected Clothing */}
        <div className="mb-4">
          <label className="text-xs uppercase tracking-wider text-soft-gray mb-2 block">
            2. 선택한 옷
          </label>
          {selectedItem ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border-color bg-charcoal/30">
              <span className="text-2xl">{getCategoryIcon(selectedItem.category)}</span>
              <div>
                <p className="text-sm text-pure-white font-medium">{selectedItem.name}</p>
                <p className="text-xs text-soft-gray">{selectedItem.brand} • ${selectedItem.price}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-soft-gray/60 text-center py-4">
              먼저 아래에서 옷을 선택해주세요
            </p>
          )}
        </div>

        {/* Error Message with Setup Guide */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">{error}</p>
            {error.includes('REPLICATE') && (
              <div className="mt-2 p-2 rounded bg-charcoal/50 text-xs text-soft-gray">
                <p className="font-bold text-pure-white mb-1">🔧 설정 방법:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li><a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="text-cyber-lime hover:underline">replicate.com</a> 가입</li>
                  <li><a href="https://replicate.com/account/api-tokens" target="_blank" rel="noopener noreferrer" className="text-cyber-lime hover:underline">API Tokens</a> 페이지에서 토큰 생성</li>
                  <li><code className="bg-void-black px-1 rounded">.env.local</code> 파일에 추가:</li>
                </ol>
                <pre className="mt-2 bg-void-black p-2 rounded text-[0.65rem] overflow-x-auto">REPLICATE_API_TOKEN=r8_your_token_here</pre>
                <p className="mt-2 text-soft-gray/70">💡 비용: 이미지 1개당 약 $0.05</p>
              </div>
            )}
          </div>
        )}

        {/* Result Image */}
        {result && (
          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider text-cyber-lime mb-2 block">
              ✨ AI 피팅 결과
            </label>
            <img
              src={result}
              alt="AI Try-On Result"
              className="w-full rounded-lg border border-cyber-lime/30"
            />
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = result;
                link.download = 'sfit-ai-tryon.png';
                link.click();
              }}
              className="w-full mt-2 btn-secondary"
            >
              📥 이미지 다운로드
            </button>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={onGenerateTryOn}
          disabled={isLoading || !userPhotoPreview || !selectedItem}
          className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isLoading || !userPhotoPreview || !selectedItem
              ? 'bg-charcoal text-soft-gray cursor-not-allowed'
              : 'bg-gradient-to-r from-cyber-lime to-green-400 text-void-black hover:opacity-90'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-void-black border-t-transparent rounded-full animate-spin" />
              AI가 피팅 중... (약 30초)
            </>
          ) : (
            <>
              <span>👕</span> AI 피팅 시작하기
            </>
          )}
        </button>

        {/* Info Note */}
        <p className="text-[0.65rem] text-soft-gray/50 text-center mt-3">
          💡 Replicate IDM-VTON API 사용 • 호출당 약 $0.04
        </p>
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
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('sfit-ai-auto-cycle') === 'true';
    }
    return false;
  });
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isMiniBarCollapsed, setMiniBarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('sfit-ai-picks-collapsed') === 'true';
    }
    return false;
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Get items for selected brand
  const brandItems = useMemo(() => {
    return selectedBrand ? getItemsByBrand(selectedBrand) : [];
  }, [selectedBrand]);
  
  let currentItem: ClothingItem | null = selectedItem || null;

  const getRecommendedSize = useCallback((
    sizes: string[] | undefined,
    stats: { height: number; weight: number } | null,
    item?: ClothingItem
  ) => {
    if (!sizes?.length || !stats) return null;

    // Phase 2: Use Masterpiece logic if possible
    if (poseAnalysis?.proportions && stats.height && item) {
      const masterpiece = calculateRecommendedSize(
        poseAnalysis.proportions,
        stats.height,
        item.brand,
        item.category,
        clothingAnalysis
      );
      return masterpiece.recommendedSize;
    }

    // Fallback to legacy BMI logic
    const bmi = stats.weight / Math.pow(stats.height / 100, 2);
    const hasNumeric = sizes.some((size) => /\d/.test(size));

    if (hasNumeric) {
      const target = bmi < 21 ? 44 : bmi < 24 ? 46 : bmi < 27 ? 48 : bmi < 30 ? 50 : 52;
      const parsed = sizes
        .map((size) => ({
          size,
          value: Number.parseInt(size.replace(/[^0-9]/g, ''), 10),
        }))
        .filter((entry) => Number.isFinite(entry.value));

      if (!parsed.length) return sizes[0];
      return parsed.reduce((closest, entry) =>
        Math.abs(entry.value - target) < Math.abs(closest.value - target) ? entry : closest
      ).size;
    }

    const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
    const targetIndex = bmi < 20 ? 1 : bmi < 23 ? 2 : bmi < 26 ? 3 : bmi < 29 ? 4 : 5;
    const available = sizes
      .map((size) => size.toUpperCase())
      .filter((size) => order.includes(size));

    if (!available.length) return sizes[0];
    const availableIndices = available.map((size) => order.indexOf(size));
    const closestIndex = availableIndices.reduce((closest, index) =>
      Math.abs(index - targetIndex) < Math.abs(closest - targetIndex) ? index : closest
    );
    return order[closestIndex];
  }, [poseAnalysis, clothingAnalysis]);

  const getFitScore = () => {
    if (selectedMode === 'vibe-check' && faceAnalysis) {
      return Math.round(Math.min(95, 60 + faceAnalysis.score * 0.4));
    }
    if (selectedMode === 'digital-twin' && poseAnalysis) {
      const bonus = faceAnalysis ? faceAnalysis.score * 0.15 : 0;
      return Math.round(Math.min(98, 55 + poseAnalysis.score * 0.45 + bonus));
    }
    if (userStats) {
      const bmi = userStats.weight / Math.pow(userStats.height / 100, 2);
      const delta = Math.min(18, Math.abs(bmi - 22) * 2.5);
      return Math.round(Math.max(60, 90 - delta));
    }
    return 72;
  };

  const fitScore = getFitScore();
  const fitLabel =
    fitScore >= 86
      ? 'Great fit'
      : fitScore >= 78
        ? 'Good fit'
        : fitScore >= 70
          ? 'Relaxed fit'
          : 'Check sizing';

  const getItemBoost = useCallback((item: ClothingItem) => {
    let boost = 0;
    if (selectedMode === 'vibe-check' && item.isLuxury) boost += 5;
    if (selectedMode === 'digital-twin' && item.category === 'outerwear') boost += 3;
    if (selectedMode === 'easy-fit' && item.category === 'tops') boost += 2;
    return boost;
  }, [selectedMode]);

  const getItemReasons = useCallback((
    item: ClothingItem,
    score: number,
    size: string | null
  ) => {
    const reasons: string[] = [];
    const clamp = (value: number) => Math.max(72, Math.min(98, Math.round(value)));
    const baseScore = clamp(score);

    if (selectedMode === 'vibe-check' && faceAnalysis) {
      const faceScore = clamp(faceAnalysis.score);
      const necklineScore = clamp(faceScore + (item.category === 'tops' ? 4 : 1));
      reasons.push(`Neckline ${necklineScore}%`);
    }

    if (selectedMode === 'digital-twin' && poseAnalysis) {
      const poseScore = clamp(poseAnalysis.score);
      const silhouetteScore = clamp(poseScore + (item.category === 'dresses' ? 4 : 2));
      reasons.push(`Silhouette ${silhouetteScore}%`);
    }

    if (selectedMode === 'easy-fit' && userStats) {
      const bmi = userStats.weight / Math.pow(userStats.height / 100, 2);
      const sizeScore = clamp(90 - Math.abs(bmi - 22) * 2.5);
      reasons.push(`Sizing ${sizeScore}%`);
    }

    if (selectedMode === 'vibe-check') {
      const styleScore = clamp(baseScore - 4);
      reasons.push(
        item.category === 'tops' || item.category === 'outerwear'
          ? `Frame ${styleScore}%`
          : `Balance ${styleScore}%`
      );
    }

    if (selectedMode === 'digital-twin') {
      const movementScore = clamp(baseScore - 6);
      reasons.push(item.category === 'dresses' ? `Flow ${movementScore}%` : `Motion ${movementScore}%`);
    }

    if (selectedMode === 'easy-fit') {
      const fitScoreTag = clamp(baseScore - 8);
      reasons.push(size ? `Fit ${fitScoreTag}%` : `Ease ${fitScoreTag}%`);
    }

    if (item.isLuxury && score >= 85) {
      reasons.push(`Premium ${clamp(baseScore + 3)}%`);
    }

    if (score >= 88) {
      reasons.push(`Top ${clamp(baseScore + 2)}%`);
    }

    return reasons.slice(0, 2);
  }, [selectedMode, faceAnalysis, poseAnalysis, userStats]);

  const { scoredItemsById, topPicks, topPickRanks, sortedItems, recommendedItemId } = useMemo(() => {
    const scored = brandItems
      .map((item) => {
        const score = fitScore + getItemBoost(item);
        const recommendedSize = getRecommendedSize(item.sizes, userStats, item);

        return {
          item,
          score,
          recommendedSize,
          reasons: getItemReasons(item, score, recommendedSize),
        };
      })
      .sort((a, b) => b.score - a.score);

    const recId = scored[0]?.item.id ?? null;
    const sorted = scored.map((entry) => entry.item);
    const picks = scored.slice(0, 3);
    const scoredById = new Map(scored.map((entry) => [entry.item.id, entry]));
    const ranks = new Map(picks.map((entry, index) => [entry.item.id, index + 1]));

    return {
      scoredItems: scored,
      scoredItemsById: scoredById,
      topPicks: picks,
      topPickRanks: ranks,
      sortedItems: sorted,
      recommendedItemId: recId,
    };
  }, [brandItems, fitScore, userStats, getRecommendedSize, getItemBoost, getItemReasons]);

  currentItem = currentItem || sortedItems[0] || null;
  const currentRecommendedSize = currentItem
    ? getRecommendedSize(currentItem.sizes, userStats)
    : null;
  const isLuxury = currentItem?.isLuxury || false;

  const handleSelectItem = useCallback(
    (item: ClothingItem) => {
      setAutoCycleEnabled(false);
      setSelectedItem(item);
      
      const index = topPicks.findIndex((entry) => entry.item.id === item.id);
      if (index >= 0) {
        setCycleIndex(index);
      }
    },
    [setSelectedItem, topPicks]
  );

  // AI Try-On handlers
  const handlePhotoSelect = useCallback((file: File) => {
    setUserPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUserPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateAITryOn = useCallback(async () => {
    if (!userPhotoPreview || !currentItem?.imageUrl) {
      setAITryOnError('사진과 옷을 모두 선택해주세요');
      return;
    }

    setAITryOnLoading(true);
    setAITryOnError(null);
    setAITryOnResult(null);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPhotoUrl: userPhotoPreview,
          garmentImageUrl: currentItem.imageUrl,
          category: currentItem.category === 'tops' || currentItem.category === 'outerwear' 
            ? 'upper_body' 
            : currentItem.category === 'bottoms' 
              ? 'lower_body' 
              : 'dresses'
        })
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setAITryOnResult(data.imageUrl);
      } else {
        setAITryOnError(data.error || 'AI 피팅 생성에 실패했습니다');
      }
    } catch (error) {
      setAITryOnError('네트워크 오류가 발생했습니다');
      console.error('AI Try-On error:', error);
    } finally {
      setAITryOnLoading(false);
    }
  }, [userPhotoPreview, currentItem]);

  // Effect to sync storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(
        'sfit-ai-picks-collapsed',
        String(isMiniBarCollapsed)
      );
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
      setCycleIndex((prev) => {
        const nextIndex = (prev + 1) % topPicks.length;
        const nextItem = topPicks[nextIndex]?.item;
        if (nextItem) {
          setSelectedItem(nextItem);
        }
        return nextIndex;
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [autoCycleEnabled, topPicks, setSelectedItem]);

  useEffect(() => {
    if (!selectedItem && recommendedItemId) {
      const entry = scoredItemsById.get(recommendedItemId);
      if (entry) {
        setSelectedItem(entry.item);
      }
    }
  }, [recommendedItemId, scoredItemsById, selectedItem, setSelectedItem]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 3D Canvas or 2D Fallback */}
      <div className="flex-1 relative min-h-[350px]">
        {webglFailed ? (
          /* 2D Fallback View - CSS based image overlay */
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
          >
            <div className="relative w-64 h-96">
              {/* Mannequin silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 160" className="w-full h-full opacity-30">
                  <ellipse cx="50" cy="20" rx="12" ry="15" fill="#444" />
                  <path d="M38 35 L30 80 L35 80 L40 55 L45 80 L55 80 L60 55 L65 80 L70 80 L62 35 Z" fill="#444" />
                  <path d="M35 80 L30 140 L40 140 L45 100 L50 100 L55 100 L60 140 L70 140 L65 80 Z" fill="#444" />
                </svg>
              </div>
              
              {/* Selected clothing overlay */}
              {currentItem && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={currentItem.imageUrl}
                    alt={currentItem.name}
                    className="max-w-[70%] max-h-[50%] object-contain drop-shadow-2xl"
                    style={{
                      marginTop: currentItem.category === 'tops' || currentItem.category === 'outerwear' 
                        ? '-20%' 
                        : currentItem.category === 'bottoms' 
                          ? '30%' 
                          : '0%'
                    }}
                  />
                </div>
              )}
              
              {/* Platform */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-4 bg-gradient-to-t from-charcoal to-transparent rounded-full opacity-50" />
            </div>
            
            {/* 2D Mode indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-soft-gray/50 bg-void-black/50 px-3 py-1 rounded-full">
              2D Preview Mode
            </div>
          </div>
        ) : (
          /* 3D Canvas */
          <Suspense fallback={<LoadingSpinner />}>
            <Canvas
              ref={canvasRef}
              shadows
              camera={{ position: [0, 0.5, 2.8], fov: 45 }}
              gl={{ 
                antialias: true, 
                alpha: true, 
                preserveDrawingBuffer: true,
                powerPreference: 'high-performance',
                failIfMajorPerformanceCaveat: false
              }}
              style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' }}
              onCreated={({ gl }) => {
                const canvas = gl.domElement;
                canvas.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('WebGL context lost, switching to 2D fallback...');
                  setWebglFailed(true);
                });
                canvas.addEventListener('webglcontextrestored', () => {
                  console.log('WebGL context restored');
                  setWebglFailed(false);
                });
              }}
            >
              <Scene 
                userStats={userStats} 
                selectedItem={currentItem}
                isLuxury={isLuxury}
              />
              <OrbitControls
                enabled={selectedMode !== 'digital-twin'}
                enablePan={false}
                enableZoom={true}
                minDistance={1.8}
                maxDistance={4}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate
                autoRotateSpeed={0.5}
                enableDamping
                dampingFactor={0.05}
                onChange={() => setIsRotating(true)}
                onEnd={() => setIsRotating(false)}
              />
            </Canvas>
          </Suspense>
        )}
        
        {/* Rotation hint */}
        {!isRotating && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-soft-gray/60 text-xs bg-void-black/50 px-3 py-1 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <span>↔️ Drag to rotate</span>
          </motion.div>
        )}
        
        {/* Luxury indicator */}
        {isLuxury && (
          <div className="absolute top-4 right-4">
            <div className="premium-badge flex items-center gap-1">
              <span>✦</span> LUXURY
            </div>
          </div>
        )}
        
        {/* Share Button */}
        <button
          onClick={() => setShowShareModal(true)}
          className="absolute top-4 left-4 bg-cyber-lime text-void-black px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-cyber-lime/90 transition-colors"
        >
          <span>📤</span> Share
        </button>

        {/* AI Try-On Button - Enhanced & Prominent */}
        <motion.button
          onClick={() => setShowAITryOnModal(true)}
          className="absolute top-4 left-28 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-xl shadow-purple-500/30 border border-white/20"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.3)',
              '0 0 30px rgba(236, 72, 153, 0.4)',
              '0 0 20px rgba(168, 85, 247, 0.3)'
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            scale: { duration: 0.2 }
          }}
        >
          <span className="text-lg">✨</span> 
          <span>AI 피팅</span>
          <span className="text-[0.6rem] bg-white/20 px-1.5 py-0.5 rounded-full">NEW</span>
        </motion.button>

        {topPicks.length > 0 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20">
            {isMiniBarCollapsed ? (
              <div className="glass-card px-3 py-2 flex items-center justify-between gap-3">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray">
                  AI Picks
                </span>
                <div className="flex items-center gap-2">
                  {autoCycleEnabled && (
                    <span className="text-[0.55rem] text-cyber-lime">
                      Auto {cycleIndex + 1}/{topPicks.length}
                    </span>
                  )}
                  <button
                    onClick={() => setMiniBarCollapsed(false)}
                    className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray hover:text-pure-white transition-colors"
                  >
                    Show
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card px-3 py-2 flex items-center gap-2 relative">
                <span className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray">
                  AI Picks
                </span>
                <div className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide">
                  {topPicks.map((entry) => (
                    <button
                      key={`mini-${entry.item.id}`}
                      onClick={() => handleSelectItem(entry.item)}
                      className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[0.6rem] transition-colors whitespace-nowrap ${
                        currentItem?.id === entry.item.id
                          ? 'border-cyber-lime text-pure-white'
                          : 'border-border-color text-soft-gray hover:border-soft-gray/60 hover:text-pure-white'
                      }`}
                    >
                      <span className="text-xs">{getCategoryIcon(entry.item.category)}</span>
                      <span className="max-w-[72px] truncate">{entry.item.name}</span>
                      <span className="text-cyber-lime">{entry.score}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray hover:text-pure-white transition-colors"
                >
                  Compare
                </button>
                <button
                  onClick={() => setAutoCycleEnabled((prev) => !prev)}
                  className={`text-[0.55rem] uppercase tracking-[0.2em] transition-colors ${
                    autoCycleEnabled
                      ? 'text-cyber-lime'
                      : 'text-soft-gray hover:text-pure-white'
                  }`}
                >
                  {autoCycleEnabled ? 'Auto on' : 'Auto off'}
                </button>
                <span className="text-[0.55rem] text-soft-gray/70">
                  {cycleIndex + 1}/{topPicks.length}
                </span>
                <button
                  onClick={() => setMiniBarCollapsed(true)}
                  className="text-[0.55rem] uppercase tracking-[0.2em] text-soft-gray hover:text-pure-white transition-colors"
                >
                  Hide
                </button>
                {autoCycleEnabled && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-full bg-border-color/60">
                    <div className="auto-cycle-bar h-full bg-cyber-lime/80" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {topPicks.length > 0 && (
        <div className="p-4 border-t border-border-color bg-void-black">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm text-soft-gray">AI Picks</h3>
                  <p className="text-[0.65rem] text-soft-gray/60">
                    Ranked by fit score and mode signals.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowCompareModal(true)}
                    className="text-[0.6rem] uppercase tracking-[0.2em] text-soft-gray hover:text-pure-white transition-colors"
                  >
                    Compare
                  </button>
                  <button
                    onClick={() => setAutoCycleEnabled((prev) => !prev)}
                    className={`text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
                      autoCycleEnabled
                        ? 'text-cyber-lime'
                        : 'text-soft-gray hover:text-pure-white'
                    }`}
                  >
                    {autoCycleEnabled ? 'Auto on' : 'Auto off'}
                  </button>
                  <span className="text-[0.6rem] text-cyber-lime uppercase tracking-[0.2em]">
                    Top {topPicks.length}
                  </span>
                </div>
              </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {topPicks.map((entry) => (
              <ItemCard
                key={`pick-${entry.item.id}`}
                item={entry.item}
                isSelected={currentItem?.id === entry.item.id}
                isRecommended={entry.item.id === recommendedItemId}
                recommendedSize={entry.recommendedSize ?? null}
                fitScore={entry.score}
                reasons={entry.reasons}
                rank={topPickRanks.get(entry.item.id)}
                onSelect={() => handleSelectItem(entry.item)}
              />
            ))}
          </div>
        </div>
      )}
       
      {/* Item selector */}
      <div className="p-4 border-t border-border-color bg-void-black">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-soft-gray">
            {selectedBrand?.toUpperCase()} Collection
          </h3>
          {recommendedItemId && (
            <span className="text-[0.6rem] text-cyber-lime uppercase tracking-[0.2em]">
              AI ranked
            </span>
          )}
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {sortedItems.map((item, index) => {
            const entry = scoredItemsById.get(item.id);
            return (
              <ItemCard
                key={item.id}
                item={item}
                isSelected={
                  selectedItem?.id === item.id || (!selectedItem && index === 0)
                }
                isRecommended={item.id === recommendedItemId}
                recommendedSize={entry?.recommendedSize ?? null}
                fitScore={entry?.score ?? fitScore}
                reasons={entry?.reasons ?? []}
                rank={topPickRanks.get(item.id)}
                onSelect={() => handleSelectItem(item)}
              />
            );
          })}
        </div>
      </div>
      
      {/* Selected item info */}
      {currentItem && (
        <div className="p-4 bg-charcoal/50 border-t border-border-color">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-pure-white font-medium">{currentItem.name}</h4>
                {currentItem.id === recommendedItemId && (
                  <span className="rounded-full bg-cyber-lime/20 px-2 py-0.5 text-[0.6rem] text-cyber-lime">
                    AI Pick
                  </span>
                )}
              </div>
              <p className="text-soft-gray text-sm">{currentItem.description}</p>
              <div className="flex gap-2 mt-2">
                {currentItem.colors?.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: colorMap[color] || '#555' }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-pure-white">
                ${currentItem.price.toFixed(2)}
              </p>
              <p className="text-xs text-soft-gray">
                {currentItem.sizes.join(' / ')}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border-color bg-void-black/60 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-soft-gray">
                Fit Prediction
              </span>
              <span className="text-xs text-cyber-lime">{fitLabel}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-soft-gray">Fit score</span>
              <span className="text-pure-white">{fitScore} / 100</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border-color">
              <div
                className="h-full rounded-full bg-cyber-lime"
                style={{ width: `${Math.min(100, Math.max(0, fitScore))}%` }}
              />
            </div>
            {currentRecommendedSize && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-soft-gray">Recommended size</span>
                <span className="text-pure-white font-bold text-cyber-lime">{currentRecommendedSize}</span>
              </div>
            )}
            <p className="text-xs text-soft-gray/70 mt-2">
              Based on {selectedMode?.replace('-', ' ') || 'your profile'} inputs.
            </p>
            
            {/* Masterpiece Insights */}
            {poseAnalysis?.proportions && userStats?.height && currentItem && (
              <div className="mt-4 pt-3 border-t border-border-color/30 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">✨</span>
                  <span className="text-[0.65rem] font-bold text-pure-white uppercase tracking-wider italic">Masterpiece Fit Insight</span>
                </div>
                {calculateRecommendedSize(
                  poseAnalysis.proportions,
                  userStats.height,
                  currentItem.brand,
                  currentItem.category,
                  clothingAnalysis
                ).fitNotes.map((note, idx) => (
                  <p key={idx} className="text-[0.65rem] text-soft-gray bg-void-black/40 px-2 py-1 rounded border-l-2 border-cyber-lime/50">
                    {note}
                  </p>
                ))}
              </div>
            )}
            {/* AI Stylist Recommendations */}
            {currentItem && (
              <div className="mt-4 pt-3 border-t border-border-color/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">🎨</span>
                    <span className="text-[0.65rem] font-bold text-cyber-lime uppercase tracking-wider">AI Stylist&apos;s Choice</span>
                  </div>
                  <span className="text-[0.55rem] text-soft-gray/60 italic">Complete the Look</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {getComplementaryItems(currentItem).map((compItem) => (
                    <button
                      key={`comp-${compItem.id}`}
                      onClick={() => handleSelectItem(compItem)}
                      className="flex-shrink-0 w-24 p-2 rounded-lg border border-border-color/50 bg-void-black/40 hover:border-cyber-lime/50 transition-all text-left"
                    >
                      <div className="aspect-square bg-charcoal/30 rounded flex items-center justify-center mb-1 text-lg">
                        {getCategoryIcon(compItem.category)}
                      </div>
                      <p className="text-[0.55rem] text-pure-white truncate font-medium">{compItem.name}</p>
                      <p className="text-[0.5rem] text-soft-gray">${compItem.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 space-y-1 text-[0.65rem] text-soft-gray/70">
              {selectedMode === 'vibe-check' && faceAnalysis && (
                <p>
                  Face score {faceAnalysis.score}/100 favors sharper necklines and top layers.
                </p>
              )}
              {selectedMode === 'digital-twin' && poseAnalysis && (
                <p>
                  Pose readiness {poseAnalysis.score}/100 confirms full-body fit accuracy.
                </p>
              )}
              {selectedMode === 'easy-fit' && userStats && (
                <p>
                  Body stats tuned for {userStats.bodyShape.replace('-', ' ')} shape.
                </p>
              )}
              {recommendedItemId && currentItem?.id === recommendedItemId && (
                <p>AI Pick aligned with your strongest fit signals.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        itemName={currentItem?.name || 'this item'}
        brandName={selectedBrand?.toUpperCase() || 'S_FIT'}
        fitScore={fitScore}
        recommendedSize={currentRecommendedSize}
      />

      <CompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        picks={topPicks}
        onSelect={(item) => handleSelectItem(item)}
      />

      {/* AI Try-On Modal */}
      <AITryOnModal
        isOpen={showAITryOnModal}
        onClose={() => {
          setShowAITryOnModal(false);
          setAITryOnResult(null);
          setAITryOnError(null);
        }}
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
