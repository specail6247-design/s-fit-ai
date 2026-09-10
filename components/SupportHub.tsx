'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-all z-40 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]"
        aria-label="Support Hub"
      >
        <span className="text-xl">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0A0A] border-l border-white/10 z-[999] overflow-y-auto"
              style={{ scrollbarWidth: 'none' }}
            >
              <div className="p-8 pb-20">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 text-white/50 hover:text-white text-xl"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-['Geist'] tracking-widest text-[#F4E4BC] mb-10 uppercase">Support Hub</h2>

                {/* User Guide Carousel */}
                <section className="mb-12">
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">How to Fit</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                    <div className="min-w-[85%] bg-white/5 border border-white/10 p-5 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-3">📸</div>
                      <h4 className="font-bold text-white mb-2 tracking-wide">1. Take a Photo</h4>
                      <p className="text-sm text-white/60">Full body shot, well lit. Ensure your whole body is visible.</p>
                    </div>
                    <div className="min-w-[85%] bg-white/5 border border-white/10 p-5 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-3">👕</div>
                      <h4 className="font-bold text-white mb-2 tracking-wide">2. Select Garment</h4>
                      <p className="text-sm text-white/60">Choose a garment from our exclusive luxury catalog.</p>
                    </div>
                    <div className="min-w-[85%] bg-white/5 border border-white/10 p-5 rounded-xl snap-center shrink-0">
                      <div className="text-3xl mb-3">✨</div>
                      <h4 className="font-bold text-white mb-2 tracking-wide">3. Generate</h4>
                      <p className="text-sm text-white/60">Wait a few seconds for our AI precision fitting.</p>
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section className="mb-12 bg-red-950/20 border border-red-900/30 p-6 rounded-xl">
                  <h3 className="text-xs font-bold text-red-400/80 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <span className="text-red-500">⚠️</span> Best Practices
                  </h3>
                  <ul className="space-y-4 text-sm text-white/80">
                    <li className="flex gap-4 items-start">
                      <span className="text-xl leading-none">💡</span>
                      <span>Ensure bright, even lighting. Avoid harsh shadows across your body.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-xl leading-none">🧍</span>
                      <span>Stand straight, directly facing the camera, about 2-3 meters away.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-xl leading-none">👚</span>
                      <span>Wear form-fitting clothes for the best AI generation accuracy.</span>
                    </li>
                  </ul>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {[
                      { q: "How accurate is the sizing?", a: "Our AI maps 3D body contours to ensure up to 95% accuracy compared to standard size charts." },
                      { q: "Is my photo stored?", a: "No. Photos are processed in memory for the try-on and are immediately discarded. We value your privacy." },
                      { q: "Can I try multiple items at once?", a: "Currently, our engine processes one garment at a time to ensure maximum generation quality." }
                    ].map((faq, i) => (
                      <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                        <button
                          className="w-full text-left px-5 py-4 bg-white/5 hover:bg-white/10 text-sm font-bold text-white flex justify-between items-center transition-colors"
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        >
                          {faq.q}
                          <span className="text-white/50">{activeFaq === i ? '−' : '+'}</span>
                        </button>
                        {activeFaq === i && (
                          <div className="px-5 py-4 bg-black/40 text-sm text-white/60 leading-relaxed border-t border-white/5">
                            {faq.a}
                          </div>
                        )}
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
