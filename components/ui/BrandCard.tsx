import React from 'react';
import { motion } from 'framer-motion';

interface BrandCardProps {
  name: string;
  tier?: string;
  isActive?: boolean;
  isLuxury?: boolean;
  isRecommended?: boolean;
  onClick?: () => void;
  className?: string;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  name,
  tier,
  isActive = false,
  isLuxury = false,
  isRecommended = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-6 rounded-xl border transition-all duration-300
        flex flex-col items-center justify-center gap-2 w-full
        ${
          isActive
            ? 'border-[var(--color-surface)] bg-[#1a1a1a]'
            : 'border-[var(--border-color)] bg-[var(--color-secondary)] hover:border-[var(--color-text-secondary)]'
        }
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Badges */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {isLuxury && (
          <span className="bg-gradient-to-br from-[var(--color-primary)] to-[#e8d282] text-[var(--color-secondary)] px-1.5 py-0.5 rounded-[var(--radius-sm)] text-[0.6rem] font-semibold uppercase tracking-wider">
            Luxury
          </span>
        )}
        {isRecommended && (
          <span className="rounded-full bg-[var(--color-accent)]/20 px-2 py-0.5 text-[0.55rem] text-[var(--color-accent)]">
            AI Pick
          </span>
        )}
      </div>

      {/* Brand Name */}
      <span
        className={`
          font-mono font-bold text-lg tracking-[0.1em] uppercase
          ${isActive ? 'text-[var(--color-surface)]' : 'text-[var(--color-text-secondary)]'}
        `}
      >
        {name}
      </span>

      {/* Tier Indicator */}
      {tier && (
        <span className="text-[0.65rem] uppercase tracking-wider text-[var(--color-text-secondary)]/50">
          {tier}
        </span>
      )}
    </motion.button>
  );
};
