'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: 'Upload Your Photo', desc: 'Stand straight facing the camera. Keep your arms slightly apart.', icon: 'person' },
    { title: 'Select Garment', desc: 'Choose a garment with a clear front view. Avoid folded clothes.', icon: 'checkroom' },
    { title: 'AI Generation', desc: 'Our engine maps the garment to your body in 10-15 seconds.', icon: 'model_training' },
  ];

  const faqs = [
    { q: 'Why is the fit inaccurate?', a: 'Ensure you are wearing form-fitting clothes in your original photo for the best AI mapping.' },
    { q: 'How long does it take?', a: 'Usually 10-15 seconds depending on server load.' },
    { q: 'Is my data safe?', a: 'Photos are processed and immediately deleted. We do not store your images.' },
  ];

  return (
    <>
      {/* Trigger Button - Hidden until needed */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 size-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ecab13] hover:text-black hover:border-[#ecab13] transition-all shadow-lg group"
        aria-label="Support Hub"
      >
        <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">help</span>
      </button>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] z-50 overflow-y-auto no-scrollbar shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-bold tracking-widest uppercase text-[#ecab13] font-serif">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-white transition-colors p-2"
                    aria-label="Close Support Hub"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* User Guide Carousel */}
                <div className="mb-12">
                  <h3 className="text-xs text-gray-400 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">How to Fit</h3>
                  <div className="relative bg-[#111] border border-white/5 rounded-xl p-6 overflow-hidden min-h-[160px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col items-center text-center gap-3"
                      >
                        <span className="material-symbols-outlined text-4xl text-[#ecab13]">{guideSteps[activeStep].icon}</span>
                        <h4 className="text-white font-bold tracking-wider uppercase text-sm">{guideSteps[activeStep].title}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{guideSteps[activeStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {guideSteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`size-1.5 rounded-full transition-all ${activeStep === idx ? 'bg-[#ecab13] w-3' : 'bg-gray-600 hover:bg-gray-400'}`}
                          aria-label={`Step ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Caution Section */}
                <div className="mb-12">
                  <h3 className="text-xs text-gray-400 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">Caution</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#111] border border-red-900/30 rounded-lg p-4 flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-red-500">lightbulb</span>
                      <p className="text-[10px] text-gray-300 uppercase tracking-wider">Avoid shadows or harsh lighting</p>
                    </div>
                    <div className="bg-[#111] border border-red-900/30 rounded-lg p-4 flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-red-500">crop_free</span>
                      <p className="text-[10px] text-gray-300 uppercase tracking-wider">Keep camera at waist level</p>
                    </div>
                  </div>
                </div>

                {/* Q&A Accordion */}
                <div className="mb-8">
                  <h3 className="text-xs text-gray-400 tracking-widest uppercase mb-4 border-b border-white/10 pb-2">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/5 rounded-lg bg-[#111] overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-bold text-gray-200 tracking-wide">{faq.q}</span>
                          <span className="material-symbols-outlined text-gray-500 text-sm transform transition-transform" style={{ transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4"
                            >
                              <p className="text-xs text-gray-400 leading-relaxed pt-2 border-t border-white/5">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}
