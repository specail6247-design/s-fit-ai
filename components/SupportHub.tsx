"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white transition-all z-40 group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <React.Fragment key="support-hub-fragment">
            <motion.div
              key="support-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              key="support-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-mono tracking-tighter">SUPPORT HUB</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white p-2"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* How to Fit */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                     <p className="text-xs text-soft-gray mb-4">Follow these steps for the perfect virtual try-on.</p>
                     <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
                        <div className="min-w-[200px] h-32 bg-black/50 rounded-lg flex-shrink-0 snap-center border border-white/5 p-4 flex flex-col justify-between">
                            <span className="text-cyber-lime font-mono text-xs">01</span>
                            <span className="text-sm font-bold">Good Lighting</span>
                        </div>
                        <div className="min-w-[200px] h-32 bg-black/50 rounded-lg flex-shrink-0 snap-center border border-white/5 p-4 flex flex-col justify-between">
                            <span className="text-cyber-lime font-mono text-xs">02</span>
                            <span className="text-sm font-bold">Full Body</span>
                        </div>
                        <div className="min-w-[200px] h-32 bg-black/50 rounded-lg flex-shrink-0 snap-center border border-white/5 p-4 flex flex-col justify-between">
                            <span className="text-cyber-lime font-mono text-xs">03</span>
                            <span className="text-sm font-bold">Fitted Clothes</span>
                        </div>
                     </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">Caution</h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-0.5">⚠️</span>
                      <p className="text-xs text-red-200">Ensure the camera is at least 2 meters away for accurate full-body capture.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-0.5">💡</span>
                      <p className="text-xs text-red-200">Avoid strong backlighting or very dark environments.</p>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-sm font-bold text-cyber-lime uppercase tracking-widest mb-4">F.A.Q</h3>
                  <div className="space-y-2">
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer">
                      <summary className="p-4 text-sm font-bold group-open:text-cyber-lime select-none">How accurate is the sizing?</summary>
                      <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                        Our AI analyzes over 30 body points to match you with brand-specific sizing charts. Accuracy is typically within a 5% margin of physical fittings.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer">
                      <summary className="p-4 text-sm font-bold group-open:text-cyber-lime select-none">Is my data saved?</summary>
                      <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                        No. All processing is done securely, and your photos are deleted immediately after the session unless you explicitly choose to save them.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer">
                      <summary className="p-4 text-sm font-bold group-open:text-cyber-lime select-none">Can I try on my own clothes?</summary>
                      <div className="px-4 pb-4 text-xs text-soft-gray leading-relaxed">
                        Currently, we support the curated catalogue provided in the app. Custom garment uploads are planned for a future update.
                      </div>
                    </details>
                  </div>
                </section>

              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
