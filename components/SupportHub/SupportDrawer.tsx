'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all z-40 backdrop-blur-md"
        aria-label="Support Hub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>

      {/* Drawer */}
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

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
                <h2 className="text-xl font-bold tracking-tight">Support Hub</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* How to Fit (Carousel) */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <div className="text-4xl mb-3">📸</div>
                    <h4 className="font-bold mb-2">Step 1: Front Facing Photo</h4>
                    <p className="text-xs text-gray-400">Ensure your whole body is visible for the best AI generation results.</p>
                    <div className="flex justify-center gap-2 mt-4">
                      <div className="w-2 h-2 rounded-full bg-[#007AFF]"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                      <div className="w-2 h-2 rounded-full bg-white/20"></div>
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">Caution</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">💡</div>
                      <p className="text-[10px] text-red-200">Avoid harsh backlighting</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">📏</div>
                      <p className="text-[10px] text-amber-200">Stand 2-3 meters away</p>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section>
                  <h3 className="text-xs font-bold text-[#007AFF] uppercase mb-4 tracking-widest">FAQ</h3>
                  <div className="space-y-2">
                    {[
                      { q: "How long does it take?", a: "Generation typically takes 10-20 seconds depending on server load." },
                      { q: "What photos work best?", a: "Clear, well-lit photos facing forward with limbs visible." }
                    ].map((faq, i) => (
                      <details key={i} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <summary className="p-4 cursor-pointer font-medium text-sm flex justify-between items-center list-none">
                          {faq.q}
                          <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 pt-0 text-xs text-gray-400 border-t border-white/5 mt-2">
                          {faq.a}
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
