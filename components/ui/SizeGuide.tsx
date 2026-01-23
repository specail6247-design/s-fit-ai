import React from 'react';
import { motion } from 'framer-motion';

interface SizeGuideProps {
  recommendedSize: string;
  confidence: number;
  measurements?: {
    chest?: string;
    waist?: string;
    hips?: string;
  };
}

export const SizeGuide: React.FC<SizeGuideProps> = ({
  recommendedSize,
  confidence,
  measurements,
}) => {
  return (
    <div className="glass-card p-6 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm uppercase tracking-widest text-[var(--color-text-secondary)]">
          Size Analysis
        </h3>
        <span className="text-xs text-[var(--color-accent)] border border-[var(--color-accent)] px-2 py-0.5 rounded-full">
          {confidence}% Match
        </span>
      </div>

      <div className="flex items-center justify-center py-6 relative">
        {/* Animated Rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-20"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-24 h-24 rounded-full border border-[var(--color-primary)]" />
        </motion.div>

        <div className="text-center z-10">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Recommended</p>
          <h2 className="text-4xl font-[family-name:var(--font-display)] text-[var(--color-surface)]">
            {recommendedSize}
          </h2>
        </div>
      </div>

      {measurements && (
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
          {Object.entries(measurements).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="text-[0.65rem] uppercase text-[var(--color-text-secondary)] mb-1">
                {key}
              </p>
              <p className="text-sm font-mono text-[var(--color-text-primary)]">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
