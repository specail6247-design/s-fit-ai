'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'caution' | 'faq'>('guide');
  const [guideStep, setGuideStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: 'Upload Front Photo', desc: 'Ensure good lighting and stand straight.' },
    { title: 'Select Garment', desc: 'Choose from our luxury collection.' },
    { title: 'AI Processing', desc: 'Wait a few seconds for the magic.' },
  ];

  const faqs = [
    { q: 'Is my data secure?', a: 'Yes, photos are processed and immediately deleted.' },
    { q: 'Why is the fit sometimes off?', a: 'Lighting and baggy clothes can affect AI accuracy.' },
    { q: 'How many tries do I get?', a: '5 free tries daily for standard users.' },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      {/* Floating Button (Hidden until needed style, keeping main screen pure) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-10 h-10 bg-white/5 border border-white/20 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-[#C9B037] transition-all z-40 backdrop-blur-sm"
        aria-label="Support Hub"
      >
        ?
      </button>

      {/* Drawer Overlay */}
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

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#050505] border-l border-[#C9B037]/30 z-50 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-[#C9B037] font-serif uppercase tracking-widest text-lg">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors uppercase text-xs tracking-widest"
                >
                  Close
                </button>
              </div>

              {/* Navigation */}
              <div className="flex border-b border-white/10">
                {(['guide', 'caution', 'faq'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-xs uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? 'text-[#C9B037] border-b-2 border-[#C9B037]'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="p-6 flex-1 overflow-y-auto">

                {/* 1. User Guide: Visual Carousel */}
                {activeTab === 'guide' && (
                  <div className="space-y-6">
                    <h3 className="text-white text-sm font-serif uppercase tracking-widest border-b border-white/10 pb-2">How to Fit</h3>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative h-48 flex flex-col items-center justify-center text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={guideStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-4"
                        >
                          <div className="text-3xl text-[#C9B037]">
                            {guideStep === 0 ? '📸' : guideStep === 1 ? '👔' : '✨'}
                          </div>
                          <div>
                            <h4 className="text-white text-sm font-bold">{guideSteps[guideStep].title}</h4>
                            <p className="text-white/50 text-xs mt-2">{guideSteps[guideStep].desc}</p>
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Dots */}
                      <div className="absolute bottom-4 flex gap-2">
                        {guideSteps.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setGuideStep(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === guideStep ? 'bg-[#C9B037] w-4' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Caution: Warnings */}
                {activeTab === 'caution' && (
                  <div className="space-y-6">
                    <h3 className="text-white text-sm font-serif uppercase tracking-widest border-b border-white/10 pb-2">Best Practices</h3>

                    <div className="space-y-4">
                      <div className="flex gap-4 items-start p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                        <span className="text-2xl mt-1">⚠️</span>
                        <div>
                          <h4 className="text-red-400 text-sm font-bold uppercase tracking-wider">Lighting is Critical</h4>
                          <p className="text-white/70 text-xs mt-1 leading-relaxed">Avoid strong backlighting or dark shadows. Even, natural light yields the best results.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
                        <span className="text-2xl mt-1">📏</span>
                        <div>
                          <h4 className="text-yellow-400 text-sm font-bold uppercase tracking-wider">Camera Distance</h4>
                          <p className="text-white/70 text-xs mt-1 leading-relaxed">Stand 3-5 feet away. Ensure your full torso is visible within the frame.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                        <span className="text-2xl mt-1">👕</span>
                        <div>
                          <h4 className="text-blue-400 text-sm font-bold uppercase tracking-wider">Form Fitting Clothes</h4>
                          <p className="text-white/70 text-xs mt-1 leading-relaxed">Wear tight-fitting clothes (like a tank top) for the most accurate generation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FAQ: Accordion */}
                {activeTab === 'faq' && (
                  <div className="space-y-6">
                    <h3 className="text-white text-sm font-serif uppercase tracking-widest border-b border-white/10 pb-2">Questions</h3>

                    <div className="space-y-2">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
                          <button
                            onClick={() => toggleFaq(i)}
                            className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-white/5 transition-colors"
                          >
                            <span className="text-sm text-white/90">{faq.q}</span>
                            <span className={`text-[#C9B037] transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`}>
                              ▼
                            </span>
                          </button>
                          <AnimatePresence>
                            {expandedFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1 text-xs text-white/50 leading-relaxed border-t border-white/5">
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
