'use client';

import { motion } from 'framer-motion';
import { getAIModelById } from '@/data/aiModels';
import { useStore } from '@/store/useStore';

export function AnalysisSummary() {
  const {
    selectedMode,
    selectedAIModels,
    faceAnalysis,
    poseAnalysis,
    clothingAnalysis,
    userStats,
  } = useStore();

  if (!selectedMode) return null;

  const modelId = selectedAIModels[selectedMode];
  const model = modelId ? getAIModelById(modelId) : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 mb-8"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-soft-gray">
          AI Analysis Report
        </span>
        {model && (
          <span className="text-[10px] text-cyber-lime font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-lime animate-pulse" />
            {model.name}
          </span>
        )}
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Slot 1: Body/Base Analysis */}
        <div className="glass-card p-4">
          <p className="text-[10px] text-soft-gray uppercase tracking-wider mb-2">Body Identity</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-pure-white">
              {poseAnalysis ? 'Verified' : userStats ? 'Synced' : 'Pending'}
            </span>
          </div>
          <p className="text-[10px] text-soft-gray/70 mt-1">
            {poseAnalysis ? `${poseAnalysis.landmarkCount} points detected` : 'Direct input mode'}
          </p>
        </div>

        {/* Slot 2: Style/Fit Analysis */}
        <div className="glass-card p-4 border-t border-t-pure-white/5">
          <p className="text-[10px] text-soft-gray uppercase tracking-wider mb-2">Fit Profile</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-cyber-lime">
              {clothingAnalysis?.fitType || (selectedMode === 'easy-fit' ? 'Standard' : 'Analyzing...')}
            </span>
          </div>
          <p className="text-[10px] text-soft-gray/70 mt-1 capitalize">
            {clothingAnalysis?.material || 'Fiber detected'}
          </p>
        </div>
      </div>

      {/* Phase 2: Deep Insight Card */}
      {clothingAnalysis && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-5 border-l-4 border-l-cyber-lime relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyber-lime/10 blur-3xl rounded-full" />
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✨</span>
            <div>
              <h4 className="text-xs font-bold text-pure-white italic tracking-wide uppercase">AI Masterpiece Insight</h4>
              <p className="text-[10px] text-soft-gray/60">Professional Grade Analysis</p>
            </div>
          </div>
          
          <p className="text-xs text-soft-gray leading-relaxed mb-4 italic">
            &ldquo;{clothingAnalysis.description}&rdquo;
          </p>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-charcoal/50 p-2 rounded-lg border border-border-color">
                <p className="text-[9px] text-soft-gray uppercase mb-1">Draping Quality</p>
                <div className="h-1 bg-void-black rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${clothingAnalysis.drapingLevel * 10}%` }}
                    className="h-full bg-cyber-lime" 
                   />
                </div>
             </div>
             <div className="bg-charcoal/50 p-2 rounded-lg border border-border-color">
                <p className="text-[9px] text-soft-gray uppercase mb-1">Fabric Stretch</p>
                <div className="h-1 bg-void-black rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${clothingAnalysis.stretchLevel * 10}%` }}
                    className="h-full bg-cyber-lime" 
                   />
                </div>
             </div>
          </div>
        </motion.div>
      )}

      {/* Status Note */}
      {(poseAnalysis?.note || faceAnalysis?.note) && (
        <p className="text-[10px] text-center text-soft-gray/40 italic px-4">
          * {poseAnalysis?.note || faceAnalysis?.note}
        </p>
      )}
    </motion.div>
  );
}
