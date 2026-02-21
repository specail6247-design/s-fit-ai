import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  brand: string;
  price: string;
  imageUrl: string;
  onTryOn?: () => void;
  className?: string;
  selected?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  brand,
  price,
  imageUrl,
  onTryOn,
  className = '',
  selected = false,
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <motion.div
      className={`group relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] border ${selected ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]' : 'border-[var(--border-color)]'} ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer Effect */}
      {selected && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-background)]">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={() => setImgSrc('https://placehold.co/600x400.png?text=Image+Not+Found')}
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center z-20">
          <motion.button
            onClick={onTryOn}
            className="rounded-full bg-[var(--color-surface)] px-6 py-2 text-sm font-semibold text-[var(--color-secondary)] hover:bg-[var(--color-primary)] transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try On
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative z-20 bg-[var(--color-surface)]">
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
