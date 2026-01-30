'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { LandingPage } from '@/components/LandingPage';
import { EasyFitMode } from '@/components/EasyFitMode';
import { VibeCheckMode } from '@/components/VibeCheckMode';
import { DigitalTwinMode } from '@/components/DigitalTwinMode';
import { BrandSelector } from '@/components/BrandSelector';
import { FittingRoom } from '@/components/FittingRoom';

export default function Home() {
  const { selectedMode, selectedBrand, setSelectedMode } = useStore();
  const [modeCompleted, setModeCompleted] = useState(false);
  const [fittingStarted, setFittingStarted] = useState(false);

  // Reset handler (can be passed to components or used in UI)
  const handleReset = () => {
    setSelectedMode(null); // Type assertion handled in store
    setModeCompleted(false);
    setFittingStarted(false);
  };

  // 1. Landing Page (No mode selected)
  if (!selectedMode) {
    return <LandingPage />;
  }

  // 4. Fitting Room (Fitting started)
  if (fittingStarted) {
    // FittingRoom has its own back navigation usually, or we wrap it
    return (
      <div className="h-screen w-full relative">
        <FittingRoom />
        <button
          onClick={() => setFittingStarted(false)}
          className="absolute top-4 left-4 z-50 px-4 py-2 bg-black/50 text-white text-xs rounded-full border border-white/10 hover:bg-black/80"
        >
          ← Back to brands
        </button>
      </div>
    );
  }

  // 3. Brand Selection (Mode completed)
  if (modeCompleted) {
    return (
      <main className="min-h-screen bg-void-black text-pure-white p-8 flex flex-col items-center justify-center relative">
        <button
          onClick={() => setModeCompleted(false)}
          className="absolute top-8 left-8 text-xs text-soft-gray hover:text-white transition-colors"
        >
          ← Back to stats
        </button>

        <div className="w-full max-w-4xl">
          <BrandSelector />

          <div className="mt-12 flex justify-center">
             <button
                onClick={() => setFittingStarted(true)}
                disabled={!selectedBrand}
                className="btn-primary w-full max-w-sm py-4 text-sm font-bold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] transition-all"
             >
                Enter Fitting Room
             </button>
          </div>
        </div>
      </main>
    );
  }

  // 2. Mode Configuration (Mode selected, not complete)
  return (
    <main className="min-h-screen bg-void-black text-pure-white p-8 pt-20 relative">
       <button
         onClick={handleReset}
         className="absolute top-8 left-8 text-xs text-soft-gray hover:text-white transition-colors"
       >
         ← Back to home
       </button>

       <AnimatePresence mode="wait">
         {selectedMode === 'easy-fit' && (
           <EasyFitMode key="easy" onComplete={() => setModeCompleted(true)} />
         )}
         {selectedMode === 'vibe-check' && (
           <VibeCheckMode key="vibe" onComplete={() => setModeCompleted(true)} />
         )}
         {selectedMode === 'digital-twin' && (
           <DigitalTwinMode key="digital" onComplete={() => setModeCompleted(true)} />
         )}
       </AnimatePresence>
    </main>
  );
}
