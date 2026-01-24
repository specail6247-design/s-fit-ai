'use client';

// S_FIT AI - Brand Selector Component
// Displays brand logos and allows selection

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { brands } from '@/data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function BrandSelector() {
  const {
    selectedBrand,
    setSelectedBrand,
    selectedMode,
    faceAnalysis,
    poseAnalysis,
    userStats,
  } = useStore();

  const getRecommendedBrandId = () => {
    if (!selectedMode) return null;

    if (selectedMode === 'easy-fit') {
      return 'uniqlo';
    }

    if (selectedMode === 'digital-twin') {
      if ((poseAnalysis?.score ?? 0) >= 82 || (faceAnalysis?.score ?? 0) >= 85) {
        return 'gucci';
      }
      return 'zara';
    }

    if (selectedMode === 'vibe-check') {
      if ((faceAnalysis?.score ?? 0) >= 85) {
        return 'gucci';
      }

      if ((faceAnalysis?.score ?? 0) >= 72) {
        return 'zara';
      }

      if (userStats) {
        return 'uniqlo';
      }

      return 'zara';
    }

    return null;
  };

  const recommendedBrandId = getRecommendedBrandId();
  const recommendedBrand = brands.find((brand) => brand.id === recommendedBrandId);
  const [autoSelectEnabled, setAutoSelectEnabled] = useState(true);

  const getRecommendationNote = () => {
    if (!recommendedBrandId) return null;
    if (selectedMode === 'easy-fit') {
      return 'Stats-first sizing performs best with consistent basics.';
    }
    if (selectedMode === 'digital-twin') {
      if ((poseAnalysis?.score ?? 0) >= 82 || (faceAnalysis?.score ?? 0) >= 85) {
        return 'Full-body clarity unlocks premium tailoring picks.';
      }
      return 'Balanced body capture matches dependable fits.';
    }
    if (selectedMode === 'vibe-check') {
      if ((faceAnalysis?.score ?? 0) >= 85) {
        return 'High vibe score leans luxury for statement pieces.';
      }
      if ((faceAnalysis?.score ?? 0) >= 72) {
        return 'Strong face match points to versatile silhouettes.';
      }
      return 'Everyday essentials keep the vibe easy and sharp.';
    }
    return null;
  };

  const recommendationNote = getRecommendationNote();

  useEffect(() => {
    if (autoSelectEnabled && !selectedBrand && recommendedBrandId) {
      setSelectedBrand(recommendedBrandId);
    }
  }, [autoSelectEnabled, recommendedBrandId, selectedBrand, setSelectedBrand]);

  const handleBrandSelect = (brandId: string) => {
    setAutoSelectEnabled(false);
    setSelectedBrand(brandId);
  };

  const handleToggleAuto = () => {
    if (autoSelectEnabled) {
      setAutoSelectEnabled(false);
      setSelectedBrand(null);
      return;
    }

    setAutoSelectEnabled(true);
    if (recommendedBrandId) {
      setSelectedBrand(recommendedBrandId);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-sm uppercase tracking-[0.2em] text-soft-gray mb-2">
          Select Brand
        </h2>
        <p className="text-xs text-soft-gray/60">
          Choose from mass market to luxury
        </p>
        {recommendedBrandId && (
          <p className="text-[0.65rem] text-cyber-lime mt-2">
            AI preselected a brand for you.
          </p>
        )}
        {recommendedBrandId && (
          <button
            type="button"
            onClick={handleToggleAuto}
            className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-soft-gray hover:text-pure-white transition-colors"
          >
            {autoSelectEnabled ? 'Manual select' : 'Use AI pick'}
          </button>
        )}
      </motion.div>

      {recommendedBrand && recommendationNote && (
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-soft-gray">
              AI Recommendation
            </span>
            <span className="text-xs text-cyber-lime">
              {recommendedBrand.name}
            </span>
          </div>
          <p className="text-xs text-soft-gray/80 mt-2">{recommendationNote}</p>
        </div>
      )}

      <motion.div
        className="grid grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {brands.map((brand) => (
          <motion.button
            key={brand.id}
            variants={itemVariants}
            onClick={() => handleBrandSelect(brand.id)}
            className={`
              relative p-6 rounded-xl border transition-all duration-300
              flex flex-col items-center justify-center gap-2
              ${
                selectedBrand === brand.id
                  ? 'border-pure-white bg-charcoal'
                  : 'border-border-color bg-void-black hover:border-soft-gray/50'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Badges */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              {brand.isLuxury && (
                <span className="premium-badge text-[0.6rem]">Luxury</span>
              )}
              {recommendedBrandId === brand.id && (
                <span className="rounded-full bg-cyber-lime/20 px-2 py-0.5 text-[0.55rem] text-cyber-lime">
                  AI Pick
                </span>
              )}
            </div>

            {/* Brand Name as Logo */}
            <span
              className={`
                logo-text text-lg
                ${selectedBrand === brand.id ? 'text-pure-white' : 'text-soft-gray'}
              `}
            >
              {brand.name}
            </span>

            {/* Tier Indicator */}
            <span className="text-[0.65rem] uppercase tracking-wider text-soft-gray/50">
              {brand.tier}
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
