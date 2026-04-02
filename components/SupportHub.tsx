'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const carouselSteps = [
    { title: "01. Upload Photo", desc: "Use a clear, front-facing photo with good lighting.", icon: "person" },
    { title: "02. Select Garment", desc: "Choose a garment with a visible front view.", icon: "checkroom" },
    { title: "03. Generate", desc: "Hit Try It On and wait for the AI to composite your fit.", icon: "magic_button" }
  ];

  const faqs = [
    { q: "Why is the result blurry?", a: "Ensure your uploaded photo is high resolution and well-lit. Shadows can affect the AI output." },
    { q: "Can I try on bottoms?", a: "Currently, we only support 'tops' for the demo version." },
    { q: "Is my data saved?", a: "Photos are processed temporarily for the session and not permanently stored." }
  ];

  return (
    <>
      {/* Trigger Button - Hidden until needed style */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-10 h-10 bg-black/40 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-lg backdrop-blur-md"
        aria-label="Help & Support"
      >
        <span className="text-lg font-serif italic">?</span>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[70] flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                <h2 className="text-xl font-serif text-[#ecab13] tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                  SUPPORT HUB
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-12">

                {/* 1. Carousel - User Guide */}
                <section>
                  <h3 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gray-500"></span>
                    How to Fit
                  </h3>

                  <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 min-h-[160px] flex flex-col justify-center items-center text-center overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center"
                      >
                         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 bg-black/50 text-[#ecab13]">
                           {/* Fallback to emoji if material symbols aren't loaded, though they should be via next.config or global */}
                           <span className="material-symbols-outlined text-xl">{carouselSteps[activeStep].icon}</span>
                         </div>
                         <h4 className="text-sm font-bold text-white mb-2 font-mono uppercase tracking-widest">{carouselSteps[activeStep].title}</h4>
                         <p className="text-xs text-gray-400">{carouselSteps[activeStep].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    <div className="absolute bottom-4 flex gap-2">
                      {carouselSteps.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${activeStep === idx ? 'bg-[#ecab13] w-3' : 'bg-gray-600 hover:bg-gray-400'}`}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* 2. Caution / Warnings */}
                <section>
                  <h3 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gray-500"></span>
                    Caution
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-4 flex flex-col gap-2">
                      <span className="material-symbols-outlined text-red-400">lightbulb</span>
                      <h4 className="text-xs font-bold text-red-200">Lighting</h4>
                      <p className="text-[10px] text-red-400/70">Avoid harsh shadows or extreme backlighting.</p>
                    </div>
                    <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4 flex flex-col gap-2">
                      <span className="material-symbols-outlined text-orange-400">photo_camera</span>
                      <h4 className="text-xs font-bold text-orange-200">Distance</h4>
                      <p className="text-[10px] text-orange-400/70">Keep camera at eye-level, showing full upper body.</p>
                    </div>
                  </div>
                </section>

                {/* 3. FAQ Accordion */}
                <section>
                  <h3 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-gray-500"></span>
                    Q&A
                  </h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 bg-white/5 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                          className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xs font-mono text-gray-300">{faq.q}</span>
                          <span className="text-gray-500 text-lg">{expandedFaq === idx ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {expandedFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-[11px] text-gray-500 leading-relaxed border-t border-white/5 mt-2">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
