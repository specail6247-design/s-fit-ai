import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How accurate is the fit?", a: "Our AI model predicts fit with 98% accuracy based on thousands of real-world test cases." },
    { q: "What if the photo is blurry?", a: "For best results, we recommend taking a new, clear photo in good lighting." },
    { q: "Is my data secure?", a: "Your photos are processed ephemerally and are never stored on our servers without explicit permission." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-40 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors group backdrop-blur-md"
        aria-label="Support Hub"
      >
        <span className="text-xl group-hover:scale-110 transition-transform font-serif italic text-white/80">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                <h2 className="text-lg font-mono font-bold tracking-widest text-[#C9B037]">SUPPORT_HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors" aria-label="Close Support Hub">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-10 hide-scrollbar">
                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037]/80 uppercase tracking-widest mb-4">How to Fit</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
                    {[
                      { step: '01', title: 'Upload Photo', desc: 'Face forward, clear lighting' },
                      { step: '02', title: 'Select Garment', desc: 'Choose from catalog' },
                      { step: '03', title: 'AI Processing', desc: 'Wait for 10 seconds' }
                    ].map((item, i) => (
                      <div key={i} className="min-w-[200px] snap-center bg-white/5 rounded-none border border-white/10 p-5">
                        <div className="text-[#C9B037] font-mono font-bold mb-2">{item.step}</div>
                        <div className="font-serif italic text-lg mb-1">{item.title}</div>
                        <div className="text-xs text-white/50 uppercase tracking-wider">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037]/80 uppercase tracking-widest mb-4">Caution</h3>
                  <div className="bg-white/5 border border-white/10 p-5 space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="text-[#C9B037] text-lg mt-0.5">⚠️</span>
                      <p className="text-xs text-white/70 uppercase tracking-wider leading-relaxed">Ensure room lighting is bright and even. Avoid strong backlighting.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="text-[#C9B037] text-lg mt-0.5">📏</span>
                      <p className="text-xs text-white/70 uppercase tracking-wider leading-relaxed">Stand at least 1 meter away from the camera for full-body accuracy.</p>
                    </div>
                  </div>
                </section>

                {/* Q&A */}
                <section>
                  <h3 className="text-xs font-bold text-[#C9B037]/80 uppercase tracking-widest mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 overflow-hidden">
                        <button
                          className="w-full text-left p-5 flex justify-between items-center text-sm font-serif italic tracking-wide"
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                        >
                          {faq.q}
                          <span className={`text-[#C9B037] text-xs transform transition-transform ${activeFaq === i ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === i && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-xs text-white/50 leading-relaxed uppercase tracking-widest">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
