import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md border border-white/20 transition-all z-40"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-[#0a0a0a] border-l border-white/10 z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white tracking-wider">SUPPORT HUB</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest">How to Fit</h3>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 hide-scrollbar">
                    <div className="snap-center shrink-0 w-full flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">📸</div>
                      <h4 className="text-white font-bold mb-1">1. Take a Photo</h4>
                      <p className="text-sm text-white/60">Stand clearly in frame.</p>
                    </div>
                    <div className="snap-center shrink-0 w-full flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">👕</div>
                      <h4 className="text-white font-bold mb-1">2. Upload Garment</h4>
                      <p className="text-sm text-white/60">Clear image of the clothing.</p>
                    </div>
                    <div className="snap-center shrink-0 w-full flex flex-col items-center text-center">
                      <div className="text-4xl mb-2">✨</div>
                      <h4 className="text-white font-bold mb-1">3. Generate</h4>
                      <p className="text-sm text-white/60">AI works its magic.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest">Cautions</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-red-500/10 text-red-400 p-3 rounded-lg border border-red-500/20">
                    <span className="text-xl">💡</span>
                    <div>
                      <h4 className="font-bold text-sm">Lighting Matters</h4>
                      <p className="text-xs opacity-80">Ensure you are well-lit from the front. Avoid harsh backlighting.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-yellow-500/10 text-yellow-400 p-3 rounded-lg border border-yellow-500/20">
                    <span className="text-xl">📏</span>
                    <div>
                      <h4 className="font-bold text-sm">Camera Distance</h4>
                      <p className="text-xs opacity-80">Stand 3-5 feet away. Ensure your full body (or top half) is visible.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest">FAQ</h3>
                <div className="space-y-2">
                  {[
                    { q: "Is my photo safe?", a: "Yes, photos are processed securely and not shared." },
                    { q: "How long does it take?", a: "Generation typically takes 10-15 seconds." },
                    { q: "What clothing works best?", a: "Plain backgrounds and flat-lay clothing images yield the best results." }
                  ].map((faq, i) => (
                    <details key={i} className="group bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                      <summary className="p-4 cursor-pointer text-sm font-medium text-white hover:bg-white/5 transition-colors list-none flex justify-between items-center">
                        {faq.q}
                        <span className="text-white/50 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-4 pt-0 text-sm text-white/60 border-t border-white/10 mt-2 bg-black/20">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
