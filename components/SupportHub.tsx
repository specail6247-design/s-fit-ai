import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all z-40 hover:scale-105"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-void-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#C9B037] to-[#F4E4BC]">
                  Support Hub
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* User Guide Carousel */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">How to Fit</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                  <div className="min-w-[200px] bg-white/5 rounded-xl p-4 snap-start border border-white/5">
                    <div className="text-2xl mb-2">📸</div>
                    <div className="font-bold text-sm mb-1 text-white">1. Snap</div>
                    <div className="text-xs text-soft-gray">Take a clear, full-body photo in good lighting.</div>
                  </div>
                  <div className="min-w-[200px] bg-white/5 rounded-xl p-4 snap-start border border-white/5">
                    <div className="text-2xl mb-2">👕</div>
                    <div className="font-bold text-sm mb-1 text-white">2. Select</div>
                    <div className="text-xs text-soft-gray">Choose your garment from our premium catalog.</div>
                  </div>
                  <div className="min-w-[200px] bg-white/5 rounded-xl p-4 snap-start border border-white/5">
                    <div className="text-2xl mb-2">✨</div>
                    <div className="font-bold text-sm mb-1 text-white">3. See</div>
                    <div className="text-xs text-soft-gray">Watch the AI seamlessly fit the garment to you.</div>
                  </div>
                </div>
              </div>

              {/* Caution */}
              <div className="mb-10 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-yellow-500 mb-3 flex items-center gap-2">
                  <span>⚠️</span> Important Guidelines
                </h3>
                <ul className="space-y-2 text-xs text-soft-gray">
                  <li className="flex gap-2">
                    <span className="text-yellow-500">•</span>
                    Ensure even lighting without harsh shadows across your body.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">•</span>
                    Stand 4-6 feet away from the camera for optimal body mapping.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-yellow-500">•</span>
                    Wear form-fitting clothes for the most accurate AR overlay.
                  </li>
                </ul>
              </div>

              {/* Q&A Accordion */}
              <div>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">FAQ</h3>
                <div className="space-y-2">
                  <details className="group bg-white/5 rounded-lg border border-white/5">
                    <summary className="p-4 cursor-pointer text-sm font-medium text-white flex justify-between items-center list-none">
                      How accurate is the sizing?
                      <span className="transition group-open:rotate-180">↓</span>
                    </summary>
                    <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                      Our AI uses 3D body mapping with a 98% accuracy rate compared to physical measuring tapes.
                    </div>
                  </details>
                  <details className="group bg-white/5 rounded-lg border border-white/5">
                    <summary className="p-4 cursor-pointer text-sm font-medium text-white flex justify-between items-center list-none">
                      Is my photo data secure?
                      <span className="transition group-open:rotate-180">↓</span>
                    </summary>
                    <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                      Yes. Photos are processed instantly and deleted immediately from our servers. We never store your personal images.
                    </div>
                  </details>
                  <details className="group bg-white/5 rounded-lg border border-white/5">
                    <summary className="p-4 cursor-pointer text-sm font-medium text-white flex justify-between items-center list-none">
                      What devices are supported?
                      <span className="transition group-open:rotate-180">↓</span>
                    </summary>
                    <div className="p-4 pt-0 text-xs text-soft-gray border-t border-white/5 mt-2">
                      S_FIT works on any modern smartphone, tablet, or computer with a camera and web browser.
                    </div>
                  </details>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
