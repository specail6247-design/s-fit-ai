'use client';

import LandingPage from '@/components/LandingPage';
import { useStore } from '@/store/useStore';
import { FittingRoom } from '@/components/FittingRoom';
import { EasyFitMode } from '@/components/EasyFitMode';
import { BrandSelector } from '@/components/BrandSelector';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const { selectedMode, selectedBrand } = useStore();
  const [statsConfirmed, setStatsConfirmed] = useState(false);
  const [brandSelectionConfirmed, setBrandSelectionConfirmed] = useState(false);

  // Helper to determine active step
  const renderStep = () => {
    if (!selectedMode) return 'landing';
    if (selectedMode === 'easy-fit' && !statsConfirmed) return 'stats';
    if (!brandSelectionConfirmed) return 'brand';
    return 'fitting-room';
  };

  const activeStep = renderStep();

  return (
    <AnimatePresence mode="wait">
      {activeStep === 'landing' && (
        <motion.div key="landing" exit={{ opacity: 0, y: -20 }}>
          <LandingPage />
        </motion.div>
      )}

      {activeStep === 'stats' && (
        <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="min-h-screen flex items-center justify-center p-4">
             <EasyFitMode onComplete={() => setStatsConfirmed(true)} />
          </div>
        </motion.div>
      )}

      {activeStep === 'brand' && (
        <motion.div key="brand" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full">
             <BrandSelector />
             <div className="mt-8 w-full max-w-md">
                <button
                    onClick={() => setBrandSelectionConfirmed(true)}
                    disabled={!selectedBrand}
                    className="btn-primary w-full disabled:opacity-50"
                >
                    Enter Fitting Room →
                </button>
             </div>
          </div>
        </motion.div>
      )}

      {activeStep === 'fitting-room' && (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FittingRoom />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
