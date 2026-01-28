'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStore, FittingMode } from '@/store/useStore';

const modes = [
  {
    id: 'vibe-check',
    title: 'VIBE CHECK',
    subtitle: 'Instant Headshot Fit',
    icon: '⚡️',
    description: 'Upload a selfie and try on sunglasses & hats instantly. Uses Ready Player Me half-body avatar.',
    badge: 'FASTEST',
  },
  {
    id: 'digital-twin',
    title: 'DIGITAL TWIN',
    subtitle: 'Full Body Precision',
    icon: '🧬',
    description: 'Create your exact 3D replica for precise fit analysis. Requires full-body photo upload.',
    badge: 'RECOMMENDED',
  },
  {
    id: 'easy-fit',
    title: 'EASY FIT',
    subtitle: 'Quick Stats Fit',
    icon: '📏',
    description: 'No photos? Just enter your height & weight to generate a base model.',
    badge: null,
  },
];

export function ModeSelector() {
  const { setSelectedMode, resetSession } = useStore();

  const handleSelect = (modeId: string) => {
    resetSession();
    setSelectedMode(modeId as FittingMode);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full px-4">
      {modes.map((mode, index) => (
        <motion.button
          key={mode.id}
          type="button"
          aria-label={`Select ${mode.title} - ${mode.subtitle}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mode-card group relative flex flex-col items-center text-center h-[400px] justify-between focus-visible:ring-2 focus-visible:ring-cyber-lime focus-visible:outline-none"
          onClick={() => handleSelect(mode.id)}
        >
          {/* Badge */}
          {mode.badge && (
            <div className="absolute top-4 right-4 bg-cyber-lime text-void-black text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
              {mode.badge}
            </div>
          )}

          {/* Icon/Visual */}
          <div
            className="mt-8 mb-4 w-24 h-24 rounded-full bg-void-black border border-white/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            role="img"
            aria-label={`${mode.title} icon`}
          >
            {mode.icon}
          </div>

          {/* Content */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold font-mono tracking-tighter text-white group-hover:text-cyber-lime transition-colors">
              {mode.title}
            </h3>
            <p className="text-sm font-medium text-cyber-lime uppercase tracking-widest border-b border-cyber-lime/20 pb-2 inline-block">
              {mode.subtitle}
            </p>
            <p className="text-soft-gray text-xs leading-relaxed max-w-[80%] mx-auto">
              {mode.description}
            </p>
          </div>

          {/* CTA - Visual only, parent is the button */}
          <div className="w-full">
            <div className="w-full py-4 border-t border-white/10 text-xs font-bold uppercase tracking-widest text-soft-gray group-hover:bg-white group-hover:text-void-black transition-all duration-300">
              Select Mode_
            </div>
          </div>
          
          {/* Hover Line Animation */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-cyber-lime w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </motion.button>
      ))}
    </div>
  );
}
