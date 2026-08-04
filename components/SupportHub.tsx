'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [guideStep, setGuideStep] = useState(0);

  const guideSteps = [
    { title: "01. Snap", desc: "Take a clear, well-lit photo of yourself." },
    { title: "02. Select", desc: "Choose a garment from our collection or upload one." },
    { title: "03. Style", desc: "Our AI blends them seamlessly in seconds." }
  ];

  const faqs = [
    { q: "How long does it take?", a: "Most generations finish in under 10 seconds." },
    { q: "Is my data secure?", a: "We delete all uploaded photos immediately after processing." },
    { q: "What's the best lighting?", a: "Natural daylight facing the camera yields the best results." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-12 h-12 bg-white/5 border border-white/20 hover:border-white/50 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all z-40"
        aria-label="Support Hub"
      >
        <span className="font-mono text-sm">?</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          >
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 relative z-10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50">
                <h2 className="text-xl font-bold tracking-widest text-white">SUPPORT HUB</h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-12">
                {/* User Guide Carousel */}
                <section>
                  <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-widest uppercase">How to Fit</h3>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="h-24 flex flex-col justify-center">
                      <h4 className="text-lg font-bold text-white mb-2">{guideSteps[guideStep].title}</h4>
                      <p className="text-sm text-gray-400">{guideSteps[guideStep].desc}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {guideSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 flex-1 rounded-full cursor-pointer transition-colors ${idx === guideStep ? 'bg-[#007AFF]' : 'bg-white/20'}`}
                          onClick={() => setGuideStep(idx)}
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Caution */}
                <section>
                  <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-widest uppercase">Caution</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">💡</span>
                      <span className="text-xs text-red-200">Avoid harsh shadows or backlighting</span>
                    </div>
                    <div className="bg-orange-900/20 border border-orange-500/20 rounded-xl p-4 flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">📸</span>
                      <span className="text-xs text-orange-200">Keep camera at chest level, 2m away</span>
                    </div>
                  </div>
                </section>

                {/* Q&A Accordion */}
                <section>
                  <h3 className="text-xs font-mono text-gray-500 mb-4 tracking-widest uppercase">FAQ</h3>
                  <div className="space-y-2">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full text-left p-4 bg-white/5 hover:bg-white/10 flex justify-between items-center transition-colors text-sm font-medium text-gray-200"
                        >
                          {faq.q}
                          <span className={`transform transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 text-sm text-gray-400 border-t border-white/5 bg-black/20">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
