'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SupportHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guideSteps = [
    { title: "STEP 01: PREPARE", desc: "Wear form-fitting clothes. Remove bulky outer layers for accurate measurements." },
    { title: "STEP 02: POSITION", desc: "Stand straight, feet shoulder-width apart, arms slightly away from your body." },
    { title: "STEP 03: CAPTURE", desc: "Ensure your full body is visible within the frame." }
  ];

  const faqs = [
    { q: "What should I wear?", a: "For best results, wear form-fitting neutral clothing to allow the AI to accurately map your body shape." },
    { q: "How long does the fitting take?", a: "Our AI processing is optimized for speed and takes approximately 10-15 seconds." },
    { q: "Is my data secure?", a: "Absolutely. Images are processed securely on our servers and are never stored permanently." }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/50 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg"
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 z-50 p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold tracking-widest uppercase">Support Hub</h2>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
              </div>

              {/* User Guide Carousel */}
              <section className="mb-10">
                <h3 className="text-xs text-[#007AFF] font-bold tracking-widest mb-4">HOW TO FIT</h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative min-h-[180px] flex flex-col justify-center items-center text-center">
                   <div className="text-xs font-mono text-white/50 mb-2">{step + 1} / {guideSteps.length}</div>
                   <h4 className="font-bold mb-2 text-white">{guideSteps[step].title}</h4>
                   <p className="text-sm text-gray-400">{guideSteps[step].desc}</p>

                   <div className="absolute bottom-4 flex gap-2">
                     {guideSteps.map((_, i) => (
                       <button
                         key={i}
                         onClick={() => setStep(i)}
                         className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-[#007AFF]' : 'bg-white/20'}`}
                       />
                     ))}
                   </div>
                </div>
              </section>

              {/* Caution */}
              <section className="mb-10">
                <h3 className="text-xs text-[#007AFF] font-bold tracking-widest mb-4">CAUTION</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                    <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-bold text-red-200">Lighting</h4>
                      <p className="text-xs text-red-200/70 mt-1">Avoid harsh shadows or strong backlighting. Ensure even, bright frontal light.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-orange-900/10 border border-orange-500/20 p-4 rounded-xl">
                    <svg className="w-6 h-6 text-orange-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-bold text-orange-200">Camera Distance</h4>
                      <p className="text-xs text-orange-200/70 mt-1">Place the camera at waist height, roughly 2-3 meters away from your body.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Q&A */}
              <section>
                <h3 className="text-xs text-[#007AFF] font-bold tracking-widest mb-4">Q&A</h3>
                <div className="space-y-2 pb-8">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left p-4 bg-white/5 hover:bg-white/10 flex justify-between items-center text-sm font-bold transition-colors"
                      >
                        <span className="text-white">{faq.q}</span>
                        <span className={`transform transition-transform text-white/50 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-4 text-xs text-gray-400 border-t border-white/10">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
