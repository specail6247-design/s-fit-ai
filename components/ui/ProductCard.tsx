import React from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
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
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 flex items-center justify-center">
          <motion.button
            onClick={onTryOn}
            aria-label={`Try on ${name}`}
            className="rounded-full bg-[var(--color-surface)] px-6 py-2 text-sm font-semibold text-[var(--color-secondary)] hover:bg-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try On
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
              {brand}
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-medium text-[var(--color-text-primary)]">
              {name}
            </h3>
          </div>
          <span className="font-mono text-sm text-[var(--color-text-primary)]">
            {price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
