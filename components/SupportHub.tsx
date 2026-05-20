'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#0a0a0a] text-white p-4 rounded-full border border-[#2d2d2d] shadow-2xl hover:bg-[#1a1a1a] transition-all hover:scale-105 group"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:text-[#ecab13] transition-colors">ℹ️</span>
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
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-[#2d2d2d] z-50 overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-[#2d2d2d] flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur z-10">
                <h2 className="text-xl font-serif text-white tracking-widest uppercase">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-soft-gray hover:text-white transition-colors p-2"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col gap-8">

                {/* User Guide: Visual Carousel */}
                <section>
                  <h3 className="text-sm font-mono text-[#ecab13] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>01</span>
                    <span className="h-px bg-[#ecab13]/30 flex-1"></span>
                    <span>How to Fit</span>
                  </h3>
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {[
                      { step: 1, title: 'Upload Selfie', desc: 'Clear lighting, front-facing.' },
                      { step: 2, title: 'Select Garment', desc: 'Choose from our luxury catalog.' },
                      { step: 3, title: 'AI Processing', desc: 'Wait 10s for the cinematic render.' },
                    ].map((item) => (
                      <div key={item.step} className="min-w-[80%] bg-white/5 border border-white/10 p-5 rounded-xl snap-center shrink-0">
                        <div className="text-3xl font-serif text-white/20 mb-2">0{item.step}</div>
                        <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                        <p className="text-xs text-soft-gray">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Caution Section */}
                <section>
                  <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>02</span>
                    <span className="h-px bg-white/10 flex-1"></span>
                    <span>Caution</span>
                  </h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 space-y-4">
                    <div className="flex gap-3 items-start">
                      <span className="text-red-400 mt-0.5">⚠️</span>
                      <div>
                        <h4 className="text-red-400 text-sm font-bold mb-1">Lighting Matters</h4>
                        <p className="text-xs text-red-400/80">Avoid heavy shadows or backlighting for accurate fabric rendering.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <span className="text-red-400 mt-0.5">📸</span>
                      <div>
                        <h4 className="text-red-400 text-sm font-bold mb-1">Camera Distance</h4>
                        <p className="text-xs text-red-400/80">Stand 1-2 meters away. Ensure full body is visible for Digital Twin mode.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span>03</span>
                    <span className="h-px bg-white/10 flex-1"></span>
                    <span>Q&A</span>
                  </h3>
                  <div className="space-y-2">
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <span className="text-sm font-bold text-white">How accurate is the fit?</span>
                        <span className="transition group-open:rotate-180 text-white/50">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5 mt-2">
                        Our IDM-VTON AI uses millimeter-precise body mapping. However, results may vary slightly based on the looseness of your original clothing in the photo.
                      </div>
                    </details>
                    <details className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer">
                        <span className="text-sm font-bold text-white">Is my data secure?</span>
                        <span className="transition group-open:rotate-180 text-white/50">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-xs text-soft-gray leading-relaxed border-t border-white/5 mt-2">
                        Yes. Photos are securely processed and never used for training without explicit consent. See our Privacy Policy for details.
                      </div>
                    </details>
                  </div>
                </section>

                {/* Trust & Growth Overlays */}
                <section className="pt-4 border-t border-[#2d2d2d] mt-4">
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button className="text-left bg-transparent border border-[#2d2d2d] hover:border-white/30 p-4 rounded-xl transition-colors">
                      <span className="block text-lg mb-1">📄</span>
                      <span className="block text-xs font-bold text-white mb-1">Terms</span>
                      <span className="block text-[10px] text-soft-gray">Service Agreement</span>
                    </button>
                    <button className="text-left bg-transparent border border-[#2d2d2d] hover:border-white/30 p-4 rounded-xl transition-colors">
                      <span className="block text-lg mb-1">🔒</span>
                      <span className="block text-xs font-bold text-white mb-1">Privacy</span>
                      <span className="block text-[10px] text-soft-gray">Data Handling</span>
                    </button>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#2d2d2d]">
                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <span>🛡️</span> Data Safety Badge
                    </h4>
                    <p className="text-xs text-soft-gray mb-4">
                      S_FIT AI is committed to protecting your digital identity.
                    </p>
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded text-xs font-bold transition-colors uppercase tracking-widest">
                      Report Issue
                    </button>
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
