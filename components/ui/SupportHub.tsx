'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-40 shadow-lg"
        aria-label="Support Hub"
      >
        <span className="text-lg font-serif">?</span>
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

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] sticky top-0 z-10">
                <h2 className="text-xl font-normal tracking-widest text-white font-serif">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-soft-gray hover:text-white rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close Support Hub"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 p-6 space-y-12">

                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037] tracking-[0.2em] mb-6 uppercase">How to Fit</h3>
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
                    {/* Step 1 */}
                    <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-5 snap-center flex-shrink-0">
                      <div className="w-10 h-10 bg-[#C9B037]/20 text-[#C9B037] rounded-full flex items-center justify-center font-bold mb-4 font-serif">1</div>
                      <h4 className="text-sm font-bold text-white tracking-widest mb-2 uppercase">Upload Photo</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Select a clear, front-facing full-body photo against a plain background.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-5 snap-center flex-shrink-0">
                      <div className="w-10 h-10 bg-[#C9B037]/20 text-[#C9B037] rounded-full flex items-center justify-center font-bold mb-4 font-serif">2</div>
                      <h4 className="text-sm font-bold text-white tracking-widest mb-2 uppercase">Select Garment</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Choose from our SPA or Luxury collections, or upload a product image.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-5 snap-center flex-shrink-0">
                      <div className="w-10 h-10 bg-[#C9B037]/20 text-[#C9B037] rounded-full flex items-center justify-center font-bold mb-4 font-serif">3</div>
                      <h4 className="text-sm font-bold text-white tracking-widest mb-2 uppercase">AI Processing</h4>
                      <p className="text-xs text-soft-gray leading-relaxed">Our IDM-VTON model drapes the garment naturally onto your digital twin.</p>
                    </div>
                  </div>
                </section>

                {/* Cautions */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037] tracking-[0.2em] mb-6 uppercase">Cautions & Best Practices</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center group hover:border-[#C9B037]/50 transition-colors">
                      <span className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">💡</span>
                      <h4 className="text-xs font-bold text-white tracking-wider mb-1 uppercase">Lighting</h4>
                      <p className="text-[10px] text-soft-gray leading-relaxed">Ensure even, bright lighting. Avoid harsh shadows across the body.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center group hover:border-[#C9B037]/50 transition-colors">
                      <span className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">📷</span>
                      <h4 className="text-xs font-bold text-white tracking-wider mb-1 uppercase">Distance</h4>
                      <p className="text-[10px] text-soft-gray leading-relaxed">Position camera at waist level, capturing full body from head to toe.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center group hover:border-[#C9B037]/50 transition-colors">
                      <span className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">👕</span>
                      <h4 className="text-xs font-bold text-white tracking-wider mb-1 uppercase">Attire</h4>
                      <p className="text-[10px] text-soft-gray leading-relaxed">Wear form-fitting clothes for accurate AI body tracking.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center group hover:border-[#C9B037]/50 transition-colors">
                      <span className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">🧍</span>
                      <h4 className="text-xs font-bold text-white tracking-wider mb-1 uppercase">Posture</h4>
                      <p className="text-[10px] text-soft-gray leading-relaxed">Stand straight with arms slightly apart from torso.</p>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section className="pb-12">
                  <h3 className="text-xs font-bold text-[#C9B037] tracking-[0.2em] mb-6 uppercase">FAQ</h3>
                  <div className="space-y-3">
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-white tracking-widest uppercase">Is my photo secure?</span>
                        <span className="transition group-open:rotate-180 text-[#C9B037]">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-[10px] text-soft-gray leading-relaxed border-t border-white/5 mt-2 pt-4">
                        Yes. Photos are processed temporarily for the AI model and are deleted from our active servers immediately after the session. We do not use user photos for model training.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-white tracking-widest uppercase">Why is the fit distorted?</span>
                        <span className="transition group-open:rotate-180 text-[#C9B037]">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-[10px] text-soft-gray leading-relaxed border-t border-white/5 mt-2 pt-4">
                        Distortion usually occurs due to poor lighting, wearing loose clothing in the source photo, or objects blocking the body. Review our Cautions section for optimal photo setup.
                      </div>
                    </details>

                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-white/5 transition-colors">
                        <span className="text-xs font-bold text-white tracking-widest uppercase">What is the daily limit?</span>
                        <span className="transition group-open:rotate-180 text-[#C9B037]">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-[10px] text-soft-gray leading-relaxed border-t border-white/5 mt-2 pt-4">
                        Free users get 5 tries daily, which resets at midnight UTC. Upgrade to Premium for unlimited access and exclusive luxury drops.
                      </div>
                    </details>
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
