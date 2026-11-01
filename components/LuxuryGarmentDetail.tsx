import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClothingItem } from '@/data/mockData';

// Re-using some standard components to avoid duplication, but styled for luxury
// Note: In a real app, this would use next/image

interface Props {
  item: ClothingItem;
  onClose: () => void;
  onTryOn: () => void;
}

export default function LuxuryGarmentDetail({ item, onClose, onTryOn }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock multiple angles based on the single image for demo purposes
  const images = [
    item.imageUrl,
    // Add variations or placeholders if available. Here we just duplicate for UI demo.
    item.imageUrl,
    item.imageUrl
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="relative w-full max-w-7xl max-h-[90vh] bg-[var(--color-surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-[var(--shadow-premium)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
            aria-label="Close details"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 bg-[var(--color-surface-dark)] relative flex flex-col">
            <div className="flex-1 relative overflow-hidden group min-h-[400px] lg:min-h-0">
               {/* Main Image */}
               <motion.img
                 key={activeImageIndex}
                 src={images[activeImageIndex]}
                 alt={item.name}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.5 }}
                 className="absolute inset-0 w-full h-full object-cover"
               />

               {/* Brand Watermark Overlay */}
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-overlay">
                 <span className="font-[family-name:var(--font-display)] text-[8vw] font-black uppercase whitespace-nowrap -rotate-45">
                   {item.brand}
                 </span>
               </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 p-6 bg-black/20 backdrop-blur-md overflow-x-auto no-scrollbar absolute bottom-0 left-0 right-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[var(--color-primary)]' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col">

             {/* Brand & Title */}
             <div className="mb-8">
               <motion.p
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                 className="text-[var(--color-text-secondary)] font-[family-name:var(--font-mono)] text-sm tracking-[0.2em] uppercase mb-4"
               >
                 {item.brand}
               </motion.p>
               <motion.h2
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                 className="text-4xl lg:text-5xl font-[family-name:var(--font-display)] font-light leading-tight text-[var(--color-text-primary)]"
               >
                 {item.name}
               </motion.h2>
               <motion.p
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                 className="text-2xl font-[family-name:var(--font-mono)] mt-4 text-[var(--color-text-primary)]"
               >
                 ${item.price.toFixed(2)}
               </motion.p>
             </div>

             {/* Divider */}
             <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent my-8" />

             {/* Description */}
             <div className="mb-10 space-y-6">
               <p className="text-[var(--color-text-secondary)] leading-relaxed font-light">
                 {item.description}
               </p>

               {/* Details Grid */}
               <div className="grid grid-cols-2 gap-6 pt-4">
                 <div>
                   <h4 className="text-xs font-[family-name:var(--font-mono)] tracking-widest text-[var(--color-text-secondary)] uppercase mb-2">Material</h4>
                   <p className="text-sm font-medium text-[var(--color-text-primary)]">Premium Silk Blend</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-[family-name:var(--font-mono)] tracking-widest text-[var(--color-text-secondary)] uppercase mb-2">Origin</h4>
                   <p className="text-sm font-medium text-[var(--color-text-primary)]">Made in Italy</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-[family-name:var(--font-mono)] tracking-widest text-[var(--color-text-secondary)] uppercase mb-2">Fit</h4>
                   <p className="text-sm font-medium text-[var(--color-text-primary)]">Tailored</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-[family-name:var(--font-mono)] tracking-widest text-[var(--color-text-secondary)] uppercase mb-2">Care</h4>
                   <p className="text-sm font-medium text-[var(--color-text-primary)]">Dry Clean Only</p>
                 </div>
               </div>
             </div>

             {/* Spacer */}
             <div className="flex-1" />

             {/* Actions */}
             <div className="space-y-4 mt-8">
                <button
                  onClick={onTryOn}
                  className="w-full py-5 bg-[var(--color-text-primary)] text-[var(--color-background)] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-[var(--color-primary)] transition-all duration-500 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Virtual Try-On
                  </span>
                  {/* Hover Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button>

                <button className="w-full py-5 border border-[var(--border-color)] text-[var(--color-text-primary)] font-bold tracking-[0.2em] uppercase rounded-xl hover:border-[var(--color-text-primary)] transition-colors duration-300">
                  Add to Wishlist
                </button>
             </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
