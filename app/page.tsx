'use client';

// S_FIT AI - Main Landing Page
// Features the 3-Tier Entry System and brand selection

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeSelector } from '@/components/ModeSelector';
import { BrandSelector } from '@/components/BrandSelector';
import { EasyFitMode } from '@/components/EasyFitMode';
import { VibeCheckMode } from '@/components/VibeCheckMode';
import { DigitalTwinMode } from '@/components/DigitalTwinMode';
import { AnalysisSummary } from '@/components/AnalysisSummary';
import { PremiumModal } from '@/components/PremiumModal';
import { FittingRoom } from '@/components/FittingRoom';
import { VirtualRunway } from '@/components/VirtualRunway';
import { ARFittingMode } from '@/components/ARFittingMode';
import { TrainingMode } from '@/components/TrainingMode';
import { AuthButton } from '@/components/AuthButton';
import { useStore } from '@/store/useStore';
import { useDailyLimit } from '@/hooks/useDailyLimit';

type AppStep = 'mode-select' | 'mode-input' | 'brand-select' | 'fitting';

export default function Home() {
  const { selectedMode, selectedBrand, resetSession } = useStore();
  const { remaining, isPremium } = useDailyLimit();
  const [currentStep, setCurrentStep] = useState<AppStep>('mode-select');
  const [activeTab, setActiveTab] = useState<'try-on' | 'runway'>('try-on');

  const handleModeComplete = () => {
    setCurrentStep('brand-select');
  };

  const handleBrandComplete = () => {
    setCurrentStep('fitting');
  };

  const handleStartOver = () => {
    resetSession();
    setCurrentStep('mode-select');
  };

  const handleContinueToMode = () => {
    if (selectedMode) {
      setCurrentStep('mode-input');
    }
  };

  return (
    <div className="min-h-screen bg-void-black flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-void-black/80 backdrop-blur-md border-b border-border-color">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={handleStartOver} className="flex items-center gap-1">
            <span className="logo-text text-xl text-pure-white">S</span>
            <span className="logo-text text-xl text-pure-white logo-underscore">_</span>
            <span className="logo-text text-xl text-pure-white">FIT</span>
            <span className="text-xs text-soft-gray ml-2 uppercase tracking-wider">AI</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Usage Counter */}
            {!isPremium && (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i < remaining ? 'bg-cyber-lime' : 'bg-soft-gray/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {isPremium && (
              <span className="premium-badge">Premium</span>
            )}

            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-8 px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'runway' ? (
            <motion.div
              key="runway"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full"
            >
              <VirtualRunway />
            </motion.div>
          ) : (
            <motion.div
              key="try-on"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full"
            >
              {/* Step 1: Mode Selection */}
              {currentStep === 'mode-select' && (
                <div className="max-w-md mx-auto">
                  {/* Hero Section */}
                  <div className="text-center mb-12 pt-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="logo-text">S</span>
                        <span className="logo-text logo-underscore">_</span>
                        <span className="logo-text">FIT</span>
                      </h1>
                      <p className="text-soft-gray text-sm uppercase tracking-[0.3em]">
                        AI Virtual Try-On
                      </p>
                    </motion.div>

                    <motion.p
                      className="text-soft-gray mt-6 max-w-xs mx-auto leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Experience the future of fashion fitting. 
                      <span className="text-pure-white"> Zero Barrier. </span>
                      Results in seconds.
                    </motion.p>
                  </div>

                  {/* Mode Selector */}
                  <ModeSelector />

                  {/* Continue Button */}
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button
                      onClick={handleContinueToMode}
                      disabled={!selectedMode}
                      className={`
                        btn-primary w-full transition-all
                        ${!selectedMode ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {selectedMode ? 'Continue →' : 'Select a mode to continue'}
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Step 2: Mode-specific Input */}
              {currentStep === 'mode-input' && (
                <div className="max-w-md mx-auto pt-8">
                  {/* Back Button */}
                  <button
                    onClick={() => setCurrentStep('mode-select')}
                    className="mb-6 text-soft-gray hover:text-pure-white transition-colors flex items-center gap-2"
                  >
                    ← Back to modes
                  </button>

                  {selectedMode === 'easy-fit' && (
                    <EasyFitMode onComplete={handleModeComplete} />
                  )}
                  {selectedMode === 'vibe-check' && (
                    <VibeCheckMode onComplete={handleModeComplete} />
                  )}
                  {selectedMode === 'digital-twin' && (
                    <DigitalTwinMode onComplete={handleModeComplete} />
                  )}
                  {selectedMode === 'ar-fit' && (
                    <ARFittingMode onBack={() => setCurrentStep('mode-select')} />
                  )}
                  {selectedMode === 'training' && (
                    <TrainingMode onBack={() => setCurrentStep('mode-select')} />
                  )}
                </div>
              )}

              {/* Step 3: Brand Selection */}
              {currentStep === 'brand-select' && (
                <div className="max-w-md mx-auto pt-8">
                  {/* Back Button */}
                  <button
                    onClick={() => setCurrentStep('mode-input')}
                    className="mb-6 text-soft-gray hover:text-pure-white transition-colors flex items-center gap-2"
                  >
                    ← Back
                  </button>

                  <AnalysisSummary />

                  <BrandSelector />

                  {/* Continue Button */}
                  <motion.div className="mt-8">
                    <button
                      onClick={handleBrandComplete}
                      disabled={!selectedBrand}
                      className={`
                        btn-primary w-full transition-all
                        ${!selectedBrand ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {selectedBrand ? 'Enter Fitting Room →' : 'Select a brand'}
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Step 4: Fitting Room */}
              {currentStep === 'fitting' && (
                <div className="w-full max-w-2xl mx-auto">
                  {/* Back Button */}
                  <button
                    onClick={() => setCurrentStep('brand-select')}
                    className="mb-4 text-soft-gray hover:text-pure-white transition-colors flex items-center gap-2"
                  >
                    ← Back to brands
                  </button>

                  <AnalysisSummary />

                  {/* 3D Fitting Room */}
                  <div className="glass-card overflow-hidden" style={{ height: '70vh', minHeight: '500px' }}>
                    <FittingRoom />
                  </div>

                  <button onClick={handleStartOver} className="btn-secondary mt-4 w-full">
                    Start Over
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center border-t border-border-color">
        <p className="text-xs text-soft-gray/50">
          © 2026 S_FIT AI. Snap, Smart, Style.
        </p>
      </footer>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-void-black/80 backdrop-blur-md border-t border-border-color">
        <div className="max-w-md mx-auto flex items-center">
          <button
            onClick={() => setActiveTab('try-on')}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              activeTab === 'try-on' ? 'text-cyber-lime' : 'text-soft-gray'
            }`}
          >
            <span className="text-xl">👕</span>
            <span className="text-[10px] uppercase tracking-wider mt-1">Try-On</span>
          </button>
          <button
            onClick={() => setActiveTab('runway')}
            className={`flex-1 flex flex-col items-center py-3 transition-colors ${
              activeTab === 'runway' ? 'text-cyber-lime' : 'text-soft-gray'
            }`}
          >
            <span className="text-xl">✨</span>
            <span className="text-[10px] uppercase tracking-wider mt-1">Runway</span>
          </button>
        </div>
      </nav>

      {/* Premium Modal */}
      <PremiumModal />
    </div>
  );
}
