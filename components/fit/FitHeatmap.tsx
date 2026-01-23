'use client';

import React, { useEffect, useState, useRef } from 'react';
import { analyzePose, PoseLandmark } from '@/lib/mediapipe';
import { FitZone } from '@/lib/visionService';
import { motion } from 'framer-motion';

interface FitHeatmapProps {
  imageUrl: string;
  zones: FitZone[];
}

export function FitHeatmap({ imageUrl, zones }: FitHeatmapProps) {
  const [landmarks, setLandmarks] = useState<PoseLandmark[] | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    async function analyze() {
      try {
        setLoading(true);
        const result = await analyzePose(imageUrl);
        if (mounted && result.landmarks) {
          setLandmarks(result.landmarks);
        }
      } catch (e) {
        console.error("Heatmap analysis failed", e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    analyze();
    return () => { mounted = false; };
  }, [imageUrl]);

  if (loading) {
    return (
       <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
         <div className="animate-spin w-8 h-8 border-2 border-cyber-lime border-t-transparent rounded-full" />
       </div>
    );
  }

  if (!landmarks || landmarks.length === 0) {
    return null;
  }

  // Helper to get coords in %
  const getPos = (idx: number) => {
    const l = landmarks[idx];
    if (!l) return null;
    return { left: `${l.x * 100}%`, top: `${l.y * 100}%` };
  };

  // Helper to get midpoint
  const getMid = (idx1: number, idx2: number) => {
    const l1 = landmarks[idx1];
    const l2 = landmarks[idx2];
    if (!l1 || !l2) return null;
    return { left: `${(l1.x + l2.x) / 2 * 100}%`, top: `${(l1.y + l2.y) / 2 * 100}%` };
  };

  const renderZone = (zone: FitZone) => {
    let pos: { left: string, top: string } | null = null;
    let size = 20; // Default size % of container

    switch (zone.zone) {
      case 'shoulders':
        // 11 & 12
        return (
          <React.Fragment key="shoulders">
            <Blob pos={getPos(11)} color={zone.color} size={15} />
            <Blob pos={getPos(12)} color={zone.color} size={15} />
          </React.Fragment>
        );
      case 'chest':
        // Between 11-12 and slightly down
        pos = getMid(11, 12);
        if (pos) {
             // adjust down manually a bit? MP landmarks are normalized 0-1
             // Chest is approx 15% down from shoulders to hips
             const y1 = (landmarks[11].y + landmarks[12].y) / 2;
             const y2 = (landmarks[23].y + landmarks[24].y) / 2;
             const chestY = y1 + (y2 - y1) * 0.3;
             const chestX = (landmarks[11].x + landmarks[12].x) / 2;
             pos = { left: `${chestX * 100}%`, top: `${chestY * 100}%` };
             size = 25;
        }
        break;
      case 'waist':
        // 23 & 24 (Hips in MP are the waistline usually for pants)
        // Actually MP hips are hips. Waist is higher.
        // Let's use midpoint of 23/24 but slightly higher.
        {
          const y1 = (landmarks[11].y + landmarks[12].y) / 2;
          const y2 = (landmarks[23].y + landmarks[24].y) / 2;
          const waistY = y1 + (y2 - y1) * 0.8; // 80% down torso
          const waistX = (landmarks[23].x + landmarks[24].x) / 2;
          pos = { left: `${waistX * 100}%`, top: `${waistY * 100}%` };
          size = 20;
        }
        break;
      case 'hips':
         pos = getMid(23, 24);
         size = 22;
         break;
      case 'arms':
        // Elbows 13, 14
        return (
          <React.Fragment key="arms">
            <Blob pos={getPos(13)} color={zone.color} size={12} />
            <Blob pos={getPos(14)} color={zone.color} size={12} />
          </React.Fragment>
        );
      case 'thighs':
        // 25, 26 (Knees) - Thigh is mid hip-knee
        return (
            <React.Fragment key="thighs">
                <MidBlob idx1={23} idx2={25} color={zone.color} size={18} landmarks={landmarks} />
                <MidBlob idx1={24} idx2={26} color={zone.color} size={18} landmarks={landmarks} />
            </React.Fragment>
        );
    }

    if (!pos) return null;
    return <Blob key={zone.zone} pos={pos} color={zone.color} size={size} />;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg z-10">
      {zones.map(renderZone)}
    </div>
  );
}

function Blob({ pos, color, size }: { pos: { left: string, top: string } | null, color: string, size: number }) {
  if (!pos) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      className="absolute rounded-full blur-xl"
      style={{
        left: pos.left,
        top: pos.top,
        width: `${size}%`,
        height: `${size}%`, // Aspect ratio might be an issue if container isn't square, but usually OK for blob
        backgroundColor: color,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

function MidBlob({ idx1, idx2, landmarks, color, size }: { idx1: number, idx2: number, landmarks: PoseLandmark[], color: string, size: number }) {
    const l1 = landmarks[idx1];
    const l2 = landmarks[idx2];
    if (!l1 || !l2) return null;
    const left = `${(l1.x + l2.x) / 2 * 100}%`;
    const top = `${(l1.y + l2.y) / 2 * 100}%`;
    return <Blob pos={{ left, top }} color={color} size={size} />;
}
