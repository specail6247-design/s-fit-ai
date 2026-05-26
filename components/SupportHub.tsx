'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'qa'>('guide');
  const [expandedQAs, setExpandedQAs] = useState<number[]>([]);
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: 'Upload Photo', desc: 'Take a clear, full-body photo with good lighting.' },
    { title: 'Select Garment', desc: 'Choose the luxury item you wish to try on.' },
    { title: 'AI Fitting', desc: 'Let our AI perform a high-fidelity virtual fitting.' },
  ];

  const qas = [
    { q: 'How long does processing take?', a: 'High-fidelity generation typically takes 20-30 seconds.' },
    { q: 'Is my data secure?', a: 'We do not permanently store your photos. They are deleted after the session.' },
    { q: 'What is Masterpiece Mode?', a: 'An ultra-realistic 4K rendering mode for premium users.' },
  ];

  const toggleQA = (index: number) => {
    if (expandedQAs.includes(index)) {
      setExpandedQAs(expandedQAs.filter((i) => i !== index));
    } else {
      setExpandedQAs([...expandedQAs, index]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Support Hub"
        className="fixed bottom-6 right-6 z-40 bg-void-black border border-white/20 p-3 rounded-full hover:bg-white/10 transition-colors shadow-2xl group flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-white text-xl group-hover:scale-110 transition-transform">
          support_agent
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#111]">
                <h2 className="text-xl font-bold tracking-widest text-white uppercase font-sans">
                  Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Support Hub"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex border-b border-white/10">
                <button
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'guide' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}
                  onClick={() => setActiveTab('guide')}
                >
                  Guide
                </button>
                <button
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'caution' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}
                  onClick={() => setActiveTab('caution')}
                >
                  Caution
                </button>
                <button
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest ${activeTab === 'qa' ? 'text-cyber-lime border-b-2 border-cyber-lime' : 'text-gray-500 hover:text-gray-300'}`}
                  onClick={() => setActiveTab('qa')}
                >
                  Q&A
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-sm text-gray-400 uppercase tracking-widest font-bold">How to Fit</h3>
                    <div className="relative h-40 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
                        <div className="text-3xl mb-4">
                            {guideStep === 0 && '📸'}
                            {guideStep === 1 && '👕'}
                            {guideStep === 2 && '✨'}
                        </div>
                        <h4 className="text-lg font-bold text-white">{guideSteps[guideStep].title}</h4>
                        <p className="text-sm text-gray-400 mt-2">{guideSteps[guideStep].desc}</p>
                    </div>
                    <div className="flex justify-center gap-2">
                        {guideSteps.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setGuideStep(idx)}
                                aria-label={`Go to step ${idx + 1}`}
                                className={`h-1.5 rounded-full transition-all ${idx === guideStep ? 'w-6 bg-cyber-lime' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === 'caution' && (
                  <div className="space-y-4">
                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-start gap-4">
                      <span className="material-symbols-outlined text-orange-400 mt-0.5">light_mode</span>
                      <div>
                        <h4 className="text-sm font-bold text-orange-400">Lighting Matters</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Ensure you are in a well-lit room. Harsh shadows may affect the quality of the 3D mesh generation.</p>
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-4">
                      <span className="material-symbols-outlined text-red-400 mt-0.5">straighten</span>
                      <div>
                        <h4 className="text-sm font-bold text-red-400">Distance & Framing</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Stand 1-2 meters away from the camera. Make sure your full body (head to toe) is visible for accurate scaling.</p>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-4">
                      <span className="material-symbols-outlined text-blue-400 mt-0.5">checkroom</span>
                      <div>
                        <h4 className="text-sm font-bold text-blue-400">Clothing</h4>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">Wear form-fitting clothes for best pose detection. Baggy clothes may reduce accuracy.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-2">
                    {qas.map((qa, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => toggleQA(idx)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-sm font-bold text-white">{qa.q}</span>
                          <span className="material-symbols-outlined text-gray-500 transition-transform" style={{ transform: expandedQAs.includes(idx) ? 'rotate(180deg)' : 'rotate(0)' }}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedQAs.includes(idx) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                {qa.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10 bg-[#050505]">
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">policy</span>
                        Privacy
                    </button>
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">report</span>
                        Report
                    </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
