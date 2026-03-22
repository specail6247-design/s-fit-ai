'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What is Masterpiece Fit?", a: "A premium 3D virtual try-on utilizing our advanced pipeline for the highest fidelity textures and physics-based draping." },
    { q: "What should I wear in my photo?", a: "For best results, wear form-fitting clothes. Avoid baggy layers or heavily patterned backgrounds." },
    { q: "How long does generation take?", a: "Typically under 20 seconds. Masterpiece Fit may take slightly longer due to 4K upscaling." }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-lg hover:scale-105"
        aria-label="Open Support Hub"
      >
        <span className="text-xl font-mono">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-out Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/50 hover:text-white transition-colors p-2"
                    aria-label="Close Support Hub"
                  >
                    ✕
                  </button>
                </div>

                {/* Section 1: User Guide (Carousel) */}
                <div className="mb-12">
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase tracking-widest mb-4">01. How To Fit</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {[
                      { step: "1", title: "Upload", desc: "Front-facing photo" },
                      { step: "2", title: "Select", desc: "Choose a garment" },
                      { step: "3", title: "Try On", desc: "Generate 3D Fit" }
                    ].map((item, idx) => (
                      <div key={idx} className="min-w-[140px] flex-shrink-0 snap-center bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-[#007AFF] font-mono font-bold text-lg mb-2">0{item.step}</div>
                        <div className="text-white font-bold text-sm mb-1">{item.title}</div>
                        <div className="text-white/50 text-xs">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Caution */}
                <div className="mb-12">
                  <h3 className="text-xs font-bold text-[#ecab13] uppercase tracking-widest mb-4">02. Best Practices</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                      <span className="text-2xl">☀️</span>
                      <div>
                        <div className="text-white text-sm font-bold">Good Lighting</div>
                        <div className="text-white/50 text-xs">Ensure even lighting across your body.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                      <span className="text-2xl">📸</span>
                      <div>
                        <div className="text-white text-sm font-bold">Clear Distance</div>
                        <div className="text-white/50 text-xs">Stand 2-3 meters from the camera.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Q&A */}
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">03. FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full text-left p-4 flex justify-between items-center text-sm font-bold text-white hover:bg-white/5 transition-colors"
                        >
                          {faq.q}
                          <span className="text-white/50 font-mono">{activeFaq === idx ? '-' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 text-xs text-white/60 leading-relaxed"
                            >
                              {faq.a}
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
    </>
  );
}
