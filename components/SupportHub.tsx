'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent border border-white/20 text-white px-4 py-2 rounded-full text-xs font-serif tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2"
      >
        <span className="text-[#ecab13] font-bold">?</span> SUPPORT
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[1000] overflow-y-auto shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
                  <h2 className="text-xl font-serif text-[#ecab13] tracking-wider">Support Hub</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors p-2"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6 space-y-10 flex-1">
                  {/* How to Fit Carousel */}
                  <section>
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">How to Fit</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                      <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 snap-start shrink-0">
                        <div className="text-2xl mb-2">📸</div>
                        <h4 className="font-bold text-white mb-1">1. Snap Photo</h4>
                        <p className="text-xs text-gray-400">Take a clear, full-body photo facing forward.</p>
                      </div>
                      <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 snap-start shrink-0">
                        <div className="text-2xl mb-2">👕</div>
                        <h4 className="font-bold text-white mb-1">2. Select Garment</h4>
                        <p className="text-xs text-gray-400">Choose an item from our SPA or Luxury lines.</p>
                      </div>
                      <div className="min-w-[240px] bg-white/5 border border-white/10 rounded-xl p-4 snap-start shrink-0">
                        <div className="text-2xl mb-2">✨</div>
                        <h4 className="font-bold text-white mb-1">3. Generate</h4>
                        <p className="text-xs text-gray-400">Let S_FIT AI create your digital twin try-on.</p>
                      </div>
                    </div>
                  </section>

                  {/* Caution Section */}
                  <section>
                    <h3 className="text-sm font-bold text-orange-400 mb-4 uppercase tracking-widest border-b border-orange-500/30 pb-2 flex items-center gap-2">
                      <span>⚠️</span> Caution
                    </h3>
                    <div className="space-y-3 bg-orange-950/20 border border-orange-500/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-orange-400 text-lg mt-0.5">💡</div>
                        <div>
                          <h4 className="text-sm font-bold text-orange-200">Lighting Matters</h4>
                          <p className="text-xs text-orange-400/80 mt-1">Ensure even, bright lighting. Avoid harsh shadows or strong backlighting for accurate fabric rendering.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="text-orange-400 text-lg mt-0.5">📏</div>
                        <div>
                          <h4 className="text-sm font-bold text-orange-200">Camera Distance</h4>
                          <p className="text-xs text-orange-400/80 mt-1">Stand approximately 2-3 meters from the camera. The entire body should be visible in the frame.</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* FAQ Accordion */}
                  <section>
                    <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Q&A</h3>
                    <div className="space-y-2">
                      <details className="group bg-white/5 border border-white/10 rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium text-sm text-gray-300 hover:text-white transition-colors flex justify-between items-center list-none">
                          <span>What image format is required?</span>
                          <span className="transition group-open:rotate-180">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">
                          We currently support JPG and PNG formats up to 5MB. Ensure the image is clear and not blurry.
                        </div>
                      </details>
                      <details className="group bg-white/5 border border-white/10 rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium text-sm text-gray-300 hover:text-white transition-colors flex justify-between items-center list-none">
                          <span>How accurate is the sizing?</span>
                          <span className="transition group-open:rotate-180">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">
                          Our AI engine maps clothing to your body shape with ~95% accuracy, but we always recommend checking the brand&apos;s specific size guide for final decisions.
                        </div>
                      </details>
                      <details className="group bg-white/5 border border-white/10 rounded-lg">
                        <summary className="cursor-pointer p-4 font-medium text-sm text-gray-300 hover:text-white transition-colors flex justify-between items-center list-none">
                          <span>Is my data private?</span>
                          <span className="transition group-open:rotate-180">▼</span>
                        </summary>
                        <div className="px-4 pb-4 text-xs text-gray-500">
                          Yes. Photos are processed securely and deleted immediately after the try-on session ends unless you explicitly choose to save them to your account.
                        </div>
                      </details>
                    </div>
                  </section>
                </div>

                {/* Footer Logo */}
                <div className="p-6 border-t border-white/10 text-center">
                   <span className="font-serif text-[#ecab13] tracking-[0.3em] text-xs opacity-50">S_FIT AI</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
