'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs font-mono text-gray-400 tracking-[0.3em] uppercase hover:text-white transition-colors"
      >
        Support
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[400px] bg-[#050505] border-l border-[#C9B037]/20 shadow-[0_0_50px_rgba(201,176,55,0.05)] z-[1000] flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-serif italic text-[#C9B037]">Support Hub</h2>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">S_FIT Assistance</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white text-xl">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                <section>
                  <h3 className="text-sm tracking-widest uppercase text-white/60 mb-4 border-l-2 border-[#C9B037] pl-3">How to Fit</h3>
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="min-w-[200px] bg-white/5 rounded-xl p-4 snap-center border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-[#C9B037]/20 text-[#C9B037] flex items-center justify-center font-bold mb-3">{step}</div>
                        <p className="text-xs text-white/80">Step {step} instruction goes here for the VIP experience.</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm tracking-widest uppercase text-white/60 mb-4 border-l-2 border-[#C9B037] pl-3">Caution</h3>
                  <div className="space-y-3 bg-red-900/10 border border-red-500/20 p-5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400">💡</span>
                      <p className="text-xs text-red-200/80 leading-relaxed">Ensure bright, even lighting. Avoid strong backlights or deep shadows.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400">📷</span>
                      <p className="text-xs text-red-200/80 leading-relaxed">Maintain 1.5m - 2m distance from the camera for full-body shots.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm tracking-widest uppercase text-white/60 mb-4 border-l-2 border-[#C9B037] pl-3">Q&A</h3>
                  <div className="space-y-2">
                    {['How long does it take?', 'Is my data secure?'].map((q, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-xl">
                        <summary className="p-4 cursor-pointer text-xs font-medium text-white/80 group-open:text-[#C9B037] group-open:border-b border-white/10 list-none flex justify-between">
                          {q}
                          <span className="group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="p-4 text-xs text-white/50 leading-relaxed">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Premium service answer here.
                        </div>
                      </details>
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
