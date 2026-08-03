'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const faqs = [
    { q: "How long does processing take?", a: "Usually under 10 seconds for standard fitting. High-res output might take up to 30 seconds." },
    { q: "What types of garments work best?", a: "Tops and bottoms with clear, distinct edges against the background. Avoid overly busy backgrounds." },
    { q: "Is my data secure?", a: "Yes. All images are processed securely and deleted immediately after the fitting session ends." }
  ];

  const slides = [
    { title: "Upload Photo", desc: "Start with a clear, full-body photo of yourself." },
    { title: "Select Garment", desc: "Choose the item you want to try on." },
    { title: "AI Magic", desc: "Our engine maps the garment to your body." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-40 backdrop-blur-md shadow-lg"
        aria-label="Support Hub"
      >
        <span className="text-lg font-serif italic">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div key="support-hub-container" className="fixed inset-0 z-50 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto pointer-events-auto"
            >
              <div className="p-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-8 right-8 text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest"
                >
                  [ Close ]
                </button>

                <h2 className="text-2xl font-serif text-[#C9B037] mb-10 tracking-wide">Support Hub</h2>

                <div className="mb-12">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">How to Fit</h3>
                  <div className="bg-white/5 border border-white/10 p-6 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl border border-white/10">
                          {currentSlide === 0 ? '📸' : currentSlide === 1 ? '👕' : '✨'}
                        </div>
                        <h4 className="text-white font-serif mb-2">{slides[currentSlide].title}</h4>
                        <p className="text-white/50 text-sm font-light">{slides[currentSlide].desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2 mt-6">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentSlide ? 'bg-[#C9B037]' : 'bg-white/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">Crucial Guidelines</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-red-950/20 border border-red-500/20 rounded-sm">
                      <span className="text-red-400 text-xl">💡</span>
                      <div>
                        <h4 className="text-red-400 font-serif text-sm mb-1">Lighting Matters</h4>
                        <p className="text-white/50 text-xs font-light">Ensure even, natural lighting. Avoid harsh shadows across the body or garments.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-orange-950/20 border border-orange-500/20 rounded-sm">
                      <span className="text-orange-400 text-xl">📷</span>
                      <div>
                        <h4 className="text-orange-400 font-serif text-sm mb-1">Camera Distance</h4>
                        <p className="text-white/50 text-xs font-light">Stand exactly 2-3 meters from the lens. The entire body should be in frame.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-4">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-white/10 bg-white/5 overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                          className="w-full text-left p-4 flex justify-between items-center hover:bg-white/5 transition-colors text-sm text-white/80"
                        >
                          <span className="font-serif">{faq.q}</span>
                          <span className="text-[#C9B037] font-mono">{activeFaq === i ? '-' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-white/50 text-xs font-light border-t border-white/5">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
