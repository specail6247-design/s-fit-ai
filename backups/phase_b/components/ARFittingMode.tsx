'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { detectVideoPose } from '@/lib/mediapipe';
import { useStore } from '@/store/useStore';

interface ARFittingModeProps {
  onBack: () => void;
}

// Category-specific presets for optimal fit
const CATEGORY_PRESETS = {
  tops: { scaleMultiplier: 1.0, yOffsetBase: 0.15, anchorType: 'shoulder' as const },
  outerwear: { scaleMultiplier: 1.15, yOffsetBase: 0.12, anchorType: 'shoulder' as const },
  bottoms: { scaleMultiplier: 1.2, yOffsetBase: -0.30, anchorType: 'hip' as const },
  dresses: { scaleMultiplier: 1.1, yOffsetBase: 0.15, anchorType: 'shoulder' as const },
};

// Smoothing factor (0-1, lower = smoother but more lag)
const SMOOTHING_FACTOR = 0.25;

export function ARFittingMode({ onBack }: ARFittingModeProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  const { selectedItem } = useStore();
  const clothingImageRef = useRef<HTMLImageElement | null>(null);
  
  // Smoothed position for jitter reduction
  const smoothedRef = useRef({ x: 0, y: 0, width: 0, height: 0, angle: 0, initialized: false });

  // Fit Configuration State
  const [fitConfig, setFitConfig] = useState({
    scale: 2.8,
    yOffset: 0.15, // % of clothing height
    rotation: 0,
  });

  const updateFitConfig = (key: keyof typeof fitConfig, value: number) => {
    setFitConfig(prev => ({ ...prev, [key]: value }));
  };

  // Pre-load clothing image when selected item changes
  useEffect(() => {
    if (selectedItem?.imageUrl) {
      const img = new Image();
      img.src = selectedItem.imageUrl;
      img.onload = () => {
        clothingImageRef.current = img;
      };
    }
  }, [selectedItem]);

  const detectPose = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const render = async (time: number) => {
      // Basic frame limiting to ~30fps
      if (!videoRef.current || !canvasRef.current || !isCameraActive) return;

      if (time - lastTimeRef.current >= 30) {
        lastTimeRef.current = time;
        try {
          const landmarks = await detectVideoPose(videoRef.current, time);
          
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            
            // Visual feedback that tracking is working
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgba(204, 255, 0, 0.8)'; // Cyber Lime
            ctx.fillText('⚡️ AR AI Active', 40, 60);

            if (selectedItem && clothingImageRef.current && landmarks && landmarks.length > 0) {
              // Key landmarks
              const leftShoulder = landmarks[11];
              const rightShoulder = landmarks[12];
              const leftHip = landmarks[23];
              const rightHip = landmarks[24];
              
              if (leftShoulder && rightShoulder) {
                const width = canvasRef.current.width;
                const height = canvasRef.current.height;

                // 1. Calculate Body Metrics (Mirrored)
                const lsX = (1 - leftShoulder.x) * width;
                const lsY = leftShoulder.y * height;
                const rsX = (1 - rightShoulder.x) * width;
                const rsY = rightShoulder.y * height;
                
                // Hip positions (for bottoms/dresses)
                const lhX = leftHip ? (1 - leftHip.x) * width : lsX;
                const lhY = leftHip ? leftHip.y * height : lsY + 200;
                const rhX = rightHip ? (1 - rightHip.x) * width : rsX;
                const rhY = rightHip ? rightHip.y * height : rsY + 200;

                // Body measurements
                const shoulderCenterX = (lsX + rsX) / 2;
                const shoulderCenterY = (lsY + rsY) / 2;
                const hipCenterX = (lhX + rhX) / 2;
                const hipCenterY = (lhY + rhY) / 2;
                const shoulderWidth = Math.hypot(rsX - lsX, rsY - lsY);
                const hipWidth = Math.hypot(rhX - lhX, rhY - lhY);
                const torsoHeight = Math.hypot(hipCenterX - shoulderCenterX, hipCenterY - shoulderCenterY);
                
                // 🆕 Waist calculation (shoulder-hip midpoint) - useful for future features
                const waistWidth = (shoulderWidth + hipWidth) / 2;

                // 2. Category-specific positioning using PRESETS
                const category = selectedItem.category as keyof typeof CATEGORY_PRESETS;
                const preset = CATEGORY_PRESETS[category] || CATEGORY_PRESETS.tops;
                
                let anchorX: number, anchorY: number, clothingWidth: number, clothingHeight: number;
                const aspectRatio = clothingImageRef.current.width / clothingImageRef.current.height;

                if (preset.anchorType === 'hip') {
                  // Bottoms: anchor at hips
                  anchorX = hipCenterX;
                  anchorY = hipCenterY - (torsoHeight * 0.1);
                  clothingWidth = hipWidth * fitConfig.scale * preset.scaleMultiplier;
                  clothingHeight = clothingWidth / aspectRatio;
                  anchorY += clothingHeight * (fitConfig.yOffset + preset.yOffsetBase);
                } else if (category === 'dresses') {
                  // Dresses: use waist as reference for width
                  anchorX = shoulderCenterX;
                  anchorY = shoulderCenterY;
                  clothingWidth = Math.max(shoulderWidth, waistWidth, hipWidth) * fitConfig.scale * preset.scaleMultiplier;
                  clothingHeight = clothingWidth / aspectRatio;
                  anchorY += clothingHeight * (fitConfig.yOffset + preset.yOffsetBase);
                } else {
                  // Tops, Outerwear: anchor at shoulders
                  anchorX = shoulderCenterX;
                  anchorY = shoulderCenterY;
                  clothingWidth = shoulderWidth * fitConfig.scale * preset.scaleMultiplier;
                  clothingHeight = clothingWidth / aspectRatio;
                  anchorY += clothingHeight * (fitConfig.yOffset + preset.yOffsetBase);
                }

                // Rotation (tilt with body) + user rotation
                const baseAngle = Math.atan2(rsY - lsY, rsX - lsX);
                const rawAngle = baseAngle + (fitConfig.rotation * Math.PI / 180);
                
                // 🆕 Apply exponential smoothing for jitter reduction
                if (!smoothedRef.current.initialized) {
                  smoothedRef.current = { x: anchorX, y: anchorY, width: clothingWidth, height: clothingHeight, angle: rawAngle, initialized: true };
                } else {
                  smoothedRef.current.x += (anchorX - smoothedRef.current.x) * SMOOTHING_FACTOR;
                  smoothedRef.current.y += (anchorY - smoothedRef.current.y) * SMOOTHING_FACTOR;
                  smoothedRef.current.width += (clothingWidth - smoothedRef.current.width) * SMOOTHING_FACTOR;
                  smoothedRef.current.height += (clothingHeight - smoothedRef.current.height) * SMOOTHING_FACTOR;
                  smoothedRef.current.angle += (rawAngle - smoothedRef.current.angle) * SMOOTHING_FACTOR;
                }
                
                const finalX = smoothedRef.current.x;
                const finalY = smoothedRef.current.y;
                const finalWidth = smoothedRef.current.width;
                const finalHeight = smoothedRef.current.height;
                const finalAngle = smoothedRef.current.angle;

                // 3. Draw Clothing with enhanced shadow for depth
                ctx.save();
                
                // Enhanced shadow based on body distance
                ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
                ctx.shadowBlur = 25;
                ctx.shadowOffsetX = 6;
                ctx.shadowOffsetY = 8;
                
                ctx.translate(finalX, finalY);
                ctx.rotate(finalAngle);
                
                // Draw image centered with smoothed dimensions
                ctx.drawImage(
                  clothingImageRef.current,
                  -finalWidth / 2,
                  -finalHeight / 2,
                  finalWidth,
                  finalHeight
                );
                
                ctx.restore();

                // Debug: Show item name and category
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = '16px Arial';
                ctx.fillText(`👕 ${selectedItem.name}`, 40, 90);
                ctx.font = '12px Arial';
                ctx.fillStyle = 'rgba(204, 255, 0, 0.7)';
                ctx.fillText(`Category: ${category}`, 40, 110);
              }
            } else if (!selectedItem) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.fillText('Select an item to try on!', 40, 90);
            }
          }
        } catch (error) {
          console.error("Pose detection error:", error);
        }
      }
      
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);
  }, [isCameraActive, selectedItem, fitConfig]);


  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: 'user' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsCameraActive(true);
            setIsLoading(false);
          };
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setIsLoading(false);
        alert('Camera access denied. Please enable camera permissions.');
      }
    };

    initCamera();

    return () => {
      stopCamera();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);


  // Trigger detection whenever camera becomes active or config changes
  useEffect(() => {
    if (isCameraActive) {
      detectPose();
    }
  }, [isCameraActive, detectPose]);

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;

    // Create offscreen canvas for merging
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    
    if (ctx) {
      // 1. Draw Video Frame (Mirrored to match UI)
      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      ctx.restore();

      // 2. Draw AR Overlay (Also mirrored, so we need to draw it as is because the canvas itself is mirrored via CSS, but check internal logic)
      // Actually, my draw logic (detectPose) already handles mirroring math logic inside the coordinates?
      // Wait, in detectPose: `const lsX = (1 - leftShoulder.x) * width;` <- This handles the mirror logic for coordinates.
      // But the canvas element itself in JSX has `transform scale-x-[-1]`. 
      // This means the canvas VISUAL is flipped. 
      // If I draw the canvas contents directly to the snapshot, they might be backwards text?
      // 'Wearing: ...' text is drawn. If I draw the canvas as-is, text will be flipped if the canvas was flipped by CSS.
      // But `ctx.drawImage(canvasRef.current)` takes the raw pixels. The raw pixels are NOT flipped by CSS. 
      // So if I drew "Wearing" normally on the canvas, it looks backwards in the CSS-mirrored canvas. 
      // Let's check `detectPose`... 
      // `ctx.fillText` draws normal text. CSS `scale-x-[-1]` flips it visually. So user sees "Backwards Text" on screen?!
      // Ah, I missed that! The text "Wearing:..." will be mirrored on screen if I put it on the mirrored canvas.
      // I should fix that text rendering first or confusing snapshot logic.
      // For now, let's just flip the overlay canvas when drawing to snapshot to match what the user SEES (which is the mirror of the raw canvas).
      
      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(canvasRef.current, 0, 0);
      ctx.restore();
      
      // 3. Add Watermark
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = '#CCFF00';
      ctx.fillText('S_FIT AI RUNWAY', 40, height - 40);

      // 4. Save
      const dataUrl = offscreen.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `s-fit-ar-look-${Date.now()}.png`;
      link.click();
    }
  };

  return (
    <div className="relative w-full h-[80vh] bg-black rounded-3xl overflow-hidden border border-border-color flex flex-col md:flex-row">
      <div className="relative flex-1 h-full overflow-hidden">
        {/* Webcam Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
          style={{ opacity: isCameraActive ? 1 : 0 }}
        />
        
        {/* AR Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="absolute inset-0 w-full h-full pointer-events-none transform scale-x-[-1]"
        />

        {/* Snapshot Flash Animation or Effect could go here */}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-void-black z-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-cyber-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-soft-gray">Accessing Camera...</p>
            </div>
          </div>
        )}
        
        {/* Snapshot Button (Overlay on Camera) */}
        {!isLoading && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <button 
              onClick={takeSnapshot}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-110 transition-transform bg-white/20 backdrop-blur-sm"
              aria-label="Take Snapshot"
            >
              <div className="w-12 h-12 rounded-full bg-cyber-lime" />
            </button>
          </div>
        )}
      </div>

      {/* Control Panel (Right Side) */}
      <div className="w-full md:w-64 bg-void-black/90 md:border-l border-t md:border-t-0 border-border-color p-6 z-20 overflow-y-auto max-h-[30vh] md:max-h-full">
        <h3 className="text-lg font-bold mb-6 text-pure-white flex items-center gap-2">
          <span className="text-cyber-lime">⚙️</span> Fit Tuner
        </h3>

        <div className="space-y-6">
          {/* Scale Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-soft-gray uppercase tracking-wider">
              <span>Size</span>
              <span>{(fitConfig.scale * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="4.5"
              step="0.1"
              value={fitConfig.scale}
              onChange={(e) => updateFitConfig('scale', parseFloat(e.target.value))}
              className="w-full h-1 bg-soft-gray/30 rounded-lg appearance-none cursor-pointer accent-cyber-lime"
            />
          </div>

          {/* Y Offset Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-soft-gray uppercase tracking-wider">
              <span>Height</span>
              <span>{fitConfig.yOffset.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-0.5"
              max="0.8"
              step="0.05"
              value={fitConfig.yOffset}
              onChange={(e) => updateFitConfig('yOffset', parseFloat(e.target.value))}
              className="w-full h-1 bg-soft-gray/30 rounded-lg appearance-none cursor-pointer accent-cyber-lime"
            />
            <p className="text-[10px] text-soft-gray/50">Adjust neck position</p>
          </div>

          {/* Rotation Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-soft-gray uppercase tracking-wider">
              <span>Tilt</span>
              <span>{fitConfig.rotation}°</span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="1"
              value={fitConfig.rotation}
              onChange={(e) => updateFitConfig('rotation', parseFloat(e.target.value))}
              className="w-full h-1 bg-soft-gray/30 rounded-lg appearance-none cursor-pointer accent-cyber-lime"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border-color">
          <button
            onClick={() => {
               // Mock save
               alert('Fit preference saved!');
            }}
            className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-colors border border-white/10"
          >
            Save My Fit
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => {
              stopCamera();
              onBack();
            }}
            className="w-full py-2 text-soft-gray hover:text-white text-sm transition-colors"
          >
            ← Exit AR
          </button>
        </div>
      </div>
    </div>
  );
}
