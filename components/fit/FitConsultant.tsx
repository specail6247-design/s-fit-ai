import React from 'react';
import { motion } from 'framer-motion';
import { FitZone } from '@/lib/visionService';

interface FitConsultantProps {
  recommendedSize: string;
  fitNotes: string[];
  heatmapData: FitZone[];
  confidence: number;
}

export function FitConsultant({ recommendedSize, fitNotes, heatmapData, confidence }: FitConsultantProps) {
  return (
    <div className="bg-void-black/80 backdrop-blur-md rounded-lg border border-cyber-lime/30 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧵</span>
          <div>
            <h3 className="text-sm font-bold text-pure-white uppercase tracking-wider">Masterpiece Fit</h3>
            <p className="text-[0.6rem] text-soft-gray">AI Tailor Consultation</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyber-lime">{recommendedSize}</div>
          <div className="text-[0.6rem] text-soft-gray">{Math.round(confidence)}% Confidence</div>
        </div>
      </div>

      {/* Tailor's Notes */}
      <div className="space-y-2">
        <h4 className="text-xs text-soft-gray uppercase tracking-widest mb-1">Tailor&apos;s Notes</h4>
        {fitNotes.map((note, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-2 text-xs text-pure-white bg-white/5 p-2 rounded"
          >
            <span className="text-cyber-lime mt-0.5">▪</span>
            <span>{note}</span>
          </motion.div>
        ))}
      </div>

      {/* Zone Analysis */}
      {heatmapData && heatmapData.length > 0 && (
        <div className="space-y-2 pt-2">
           <h4 className="text-xs text-soft-gray uppercase tracking-widest mb-1">Zone Analysis</h4>
           {heatmapData.map((zone) => (
             <div key={zone.zone} className="space-y-1">
               <div className="flex justify-between text-[0.65rem] text-soft-gray uppercase">
                 <span>{zone.zone}</span>
                 <span>{zone.score > 2 ? 'Tight' : zone.score < -2 ? 'Loose' : 'Perfect'}</span>
               </div>
               <div className="h-1.5 w-full bg-charcoal rounded-full overflow-hidden flex relative">
                 {/* Center Marker */}
                 <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 -translate-x-1/2 z-10" />

                 {/* The Bar */}
                 {/* Score is -10 (Loose) to +10 (Tight). Center is 0. */}
                 {/* We map -10..10 to 0..100% relative to center? No, let's just map 0..100% of the bar width. */}
                 {/* 0 -> 50%. -10 -> 0%. +10 -> 100%. */}
                 <motion.div
                   className="h-full absolute"
                   style={{
                     left: zone.score < 0 ? `${50 + (zone.score * 5)}%` : '50%',
                     width: `${Math.abs(zone.score * 5)}%`,
                     backgroundColor: zone.color
                   }}
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.abs(zone.score * 5)}%` }}
                 />
               </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}
