'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function SupportHub() {
  const { isSupportOpen, setIsSupportOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      title: "Clear Background",
      desc: "Ensure your photo has a simple, uncluttered background for best AI isolation.",
      icon: "🖼️"
    },
    {
      title: "Good Lighting",
      desc: "Natural, even lighting works best. Avoid harsh shadows or strong backlighting.",
      icon: "💡"
    },
    {
      title: "Front-Facing Pose",
      desc: "Stand straight and face the camera directly. Arms slightly away from the body.",
      icon: "🧍"
    }
  ];

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % guideSteps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + guideSteps.length) % guideSteps.length);

  return (
    <AnimatePresence>
      {isSupportOpen && (
        <>
          <motion.div
            key="support-hub-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSupportOpen(false)}
          />
          <motion.div
            key="support-hub-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-void-black border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-widest uppercase text-white font-cinzel">Support Hub</h2>
                <p className="text-xs text-gray-500 font-mono">Assistance & Guidelines</p>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="text-gray-500 hover:text-white transition-colors p-2"
                aria-label="Close Support Hub"
              >
                ✕
              </button>
            </div>

            {/* Navigation */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'guide' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                How to Fit
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === 'faq' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                FAQ
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'guide' ? (
                <div className="space-y-8">
                  {/* Visual Guide Carousel */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-white/10 pb-2">Step-by-Step Guide</h3>

                    <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden p-6 min-h-[200px] flex flex-col justify-center items-center text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col items-center gap-4"
                        >
                          <div className="text-4xl" role="img" aria-label="Step Icon">{guideSteps[currentStep].icon}</div>
                          <div>
                            <h4 className="font-bold text-white text-lg mb-2">{guideSteps[currentStep].title}</h4>
                            <p className="text-sm text-gray-400">{guideSteps[currentStep].desc}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {guideSteps.map((_, idx) => (
                          <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentStep ? 'bg-white' : 'bg-white/20'}`} />
                        ))}
                      </div>

                      <button onClick={prevStep} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors" aria-label="Previous Step">‹</button>
                      <button onClick={nextStep} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors" aria-label="Next Step">›</button>
                    </div>
                  </div>

                  {/* Cautions */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest border-b border-red-500/20 pb-2 flex items-center gap-2">
                      <span role="img" aria-label="Warning">⚠️</span> Important Cautions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                        <div className="text-xl mb-2" role="img" aria-label="Camera Distance">📸</div>
                        <p className="text-xs text-gray-400">Maintain a distance of at least 1-2 meters from the camera.</p>
                      </div>
                      <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                        <div className="text-xl mb-2" role="img" aria-label="No Loose Clothing">🚫</div>
                        <p className="text-xs text-gray-400">Avoid overly loose clothing in the source image.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Accordion FAQ */}
                  <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-white/10 pb-2">Common Questions</h3>

                  <div className="space-y-2">
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 cursor-pointer font-bold text-sm text-white flex justify-between items-center outline-none">
                        How long does fitting take?
                        <span className="transition group-open:rotate-180">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/10 mt-2">
                        Processing typically takes 10-15 seconds depending on server load and image complexity.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 cursor-pointer font-bold text-sm text-white flex justify-between items-center outline-none">
                        Is my data safe?
                        <span className="transition group-open:rotate-180">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/10 mt-2">
                        Yes. We use standard encryption and do not store your photos after the session ends unless explicitly saved to The Vault.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <summary className="p-4 cursor-pointer font-bold text-sm text-white flex justify-between items-center outline-none">
                        Why did my fitting fail?
                        <span className="transition group-open:rotate-180">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/10 mt-2">
                        Common reasons include poor lighting, complex backgrounds, or unsupported image formats. Try following the guide for best results.
                      </div>
                    </details>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Report Issue */}
            <div className="p-6 border-t border-white/10 bg-black/40 mt-auto">
                <button className="w-full py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors tracking-widest uppercase flex items-center justify-center gap-2">
                  <span role="img" aria-label="Bug">🐞</span> Report an Issue
                </button>
                <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-[10px] font-mono border border-green-500/20">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        Data Safety Verified
                    </span>
                </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
