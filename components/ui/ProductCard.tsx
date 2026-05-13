import React from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  stylingTip?: string;
  isLocked?: boolean;
  availableIn?: string;
  onSave?: () => void;
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  onTryOn?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  brand,
  price,
  imageUrl,
  onTryOn,
  className = '',
  stylingTip,
  isLocked,
  availableIn,
  onSave,
}) => {
  return (
    <motion.div
      className={`group relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--border-color)] ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-background)]">
        <motion.img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay Actions */}
        {isLocked && availableIn ? (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-opacity duration-300">
             <span className="material-symbols-outlined text-white mb-2 text-3xl">lock</span>
             <p className="text-xs uppercase tracking-widest text-[#ecab13] font-bold mb-1">Locked Drop</p>
             <p className="text-white font-mono text-sm">{availableIn}</p>
          </div>
        ) : (
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3 z-10">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onTryOn?.(); }}
              className="rounded-full bg-[var(--color-surface)] px-6 py-2 text-sm font-semibold text-[var(--color-secondary)] hover:bg-[var(--color-primary)] transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try On
            </motion.button>
            {onSave && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); onSave?.(); }}
                className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors shadow-lg border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Save Look"
              >
                <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-full justify-between gap-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              {brand}
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--color-text-primary)] leading-tight">
              {name}
            </h3>
          </div>
          <span className="font-mono text-sm text-[var(--color-text-primary)] whitespace-nowrap">
            {price}
          </span>
        </div>

        {stylingTip && (
          <div className="pt-3 border-t border-[var(--border-color)] mt-auto">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[var(--color-text-secondary)] shrink-0 mt-0.5">auto_awesome</span>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed italic">
                <span className="font-semibold text-[var(--color-text-primary)] not-italic mr-1">AI Stylist:</span>
                {stylingTip}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
