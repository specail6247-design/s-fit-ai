'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "Identify", desc: "Upload a clear, front-facing photo." },
    { title: "Select", desc: "Choose a garment from our premium collection." },
    { title: "Generate", desc: "Let S_FIT NEO AI do the rest." },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-void-black/80 backdrop-blur-md border border-white/10 text-soft-gray flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] z-40 hover:text-white hover:border-white/30 transition-all"
        aria-label="Support Hub"
      >
        <span className="text-lg">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-void-black border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold italic tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>SUPPORT HUB</h2>
                  <button onClick={() => setIsOpen(false)} className="text-soft-gray hover:text-white text-xl transition-colors">✕</button>
                </div>

                <div className="mb-10">
                  <h3 className="text-xs uppercase tracking-widest text-cyber-lime mb-4 font-bold">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                    <div className="h-32 bg-black/50 rounded-xl mb-4 flex flex-col items-center justify-center text-soft-gray border border-white/5">
                       <span className="text-3xl mb-2">{currentSlide === 0 ? '📸' : currentSlide === 1 ? '👕' : '✨'}</span>
                       <span className="text-sm font-bold text-white">{slides[currentSlide].title}</span>
                    </div>
                    <p className="text-[10px] text-soft-gray text-center mb-4 h-6">{slides[currentSlide].desc}</p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                        disabled={currentSlide === 0}
                        className="text-[10px] text-soft-gray disabled:opacity-30 hover:text-white transition-colors uppercase tracking-wider"
                      >
                        Prev
                      </button>
                      <div className="flex gap-1">
                        {slides.map((_, i) => (
                           <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-cyber-lime' : 'bg-white/20'}`} />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                        disabled={currentSlide === slides.length - 1}
                        className="text-[10px] text-soft-gray disabled:opacity-30 hover:text-white transition-colors uppercase tracking-wider"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-xs uppercase tracking-widest text-red-400 mb-4 font-bold flex items-center gap-2">
                    Caution
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-2xl flex items-start gap-4">
                      <span className="text-2xl mt-1">📏</span>
                      <div>
                        <p className="text-xs font-bold text-pure-white mb-1">Camera Distance</p>
                        <p className="text-[10px] text-soft-gray leading-relaxed">Ensure full body is visible for accurate proportions and mapping.</p>
                      </div>
                    </div>
                    <div className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-2xl flex items-start gap-4">
                      <span className="text-2xl mt-1">💡</span>
                      <div>
                        <p className="text-xs font-bold text-pure-white mb-1">Lighting Setup</p>
                        <p className="text-[10px] text-soft-gray leading-relaxed">Avoid harsh shadows. Use soft, frontal lighting for best AI results.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-soft-gray mb-4 font-bold">F.A.Q</h3>
                  <div className="space-y-2">
                    {[
                      { q: "Is my data stored securely?", a: "We do not store your photos permanently. They are processed in real-time and deleted." },
                      { q: "What brands are supported?", a: "We currently support ZARA, Gucci, Uniqlo, H&M, COS, and GAP." },
                      { q: "How accurate is the sizing?", a: "Our Masterpiece AI uses strict proportion analysis for highly accurate estimations." }
                    ].map((faq, i) => (
                      <div key={i} className="border border-white/5 rounded-xl overflow-hidden bg-white/5">
                        <button
                          onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                          className="w-full text-left p-4 text-[11px] font-bold text-white flex justify-between items-center hover:bg-white/5 transition-colors"
                        >
                          {faq.q}
                          <span className="text-cyber-lime text-lg font-light">{activeFAQ === i ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {activeFAQ === i && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="p-4 pt-0 text-[10px] text-soft-gray leading-relaxed">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
